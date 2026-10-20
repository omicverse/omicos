#!/usr/bin/env node
// Release notes for the public omicverse/omicos repo.
//
// The only hand-written files are releases/<line>/<version>.md (one per
// version) and releases/<line>/README.md (the line's intro). Everything else —
// changelogs/<line>.md, releases.json, CHANGELOG.md and the version table in
// README.md — is generated from them.
//
//   node scripts/release-notes.mjs new <line> <version> [--date YYYY-MM-DD]
//   node scripts/release-notes.mjs build     regenerate every generated file
//   node scripts/release-notes.mjs check     lint notes + fail if generated files are stale (CI)
//   node scripts/release-notes.mjs publish   create the GitHub Release for each line's newest
//                                            version if it doesn't have one yet (CI, needs gh)
//
// Used by the release scripts, so one deploy also ships its public notes:
//
//   node scripts/release-notes.mjs ready <line> <version>
//       preflight: the note for this version exists and passes the lint
//   node scripts/release-notes.mjs ship <line> <version> [--site <ssh-host>:<path>] [--site-url <url>]
//       build, commit and push to main, create the GitHub Release, then copy
//       releases.json to the website (the /changelog page reads it at runtime)
//   node scripts/release-notes.mjs sync --site <ssh-host>:<path> [--site-url <url>]
//       only the website copy
//
// Node >= 18, no dependencies.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = "omicverse/omicos";
const BLOB = `https://github.com/${REPO}/blob/main`;

// githubRelease: whether the newest version gets a GitHub Release (tag `<tag>-<version>`).
// The web UI ships silently via OTA many times a week, so it only gets changelog entries;
// otherwise "Watch → Releases" would be mostly web UI noise.
const LINES = {
  core: {
    name: "omicos-core",
    tag: "core",
    githubRelease: true,
    latest: true,
    zh: "分析内核 / 运行时(命令行 `omicos`,桌面 App 内置)",
    en: "Analysis kernel / runtime (`omicos` CLI, bundled in the desktop app)",
  },
  webui: {
    name: "omicos webui",
    tag: "webui",
    githubRelease: false,
    zh: "浏览器 / 桌面 App 内的界面,静默 OTA 更新",
    en: "The in-browser / in-desktop interface, delivered silently via OTA",
  },
  desktop: {
    name: "omicos desktop",
    tag: "desktop",
    githubRelease: true,
    latest: false,
    zh: "Windows / macOS 桌面客户端(外壳)",
    en: "Windows / macOS desktop client (the shell)",
  },
};

const GENERATED_NOTE = (src) =>
  `<!-- 由 scripts/release-notes.mjs 从 ${src} 生成,请勿直接编辑。 / Generated from ${src} by scripts/release-notes.mjs — do not edit. -->`;

// Things that must never reach the public notes (see the release runbook).
const LEAKS = [
  [/(^|[^\w&/])#\d{2,}\b/, "PR / issue number"],
  [/\b(?:PrimorDecode|primor)\/[\w.-]+/i, "private repository"],
  [/\bomicos-(?:core|ui|server|admin|server-ui)#\d+/i, "private PR reference"],
  [/(^|[\s`'"(])\/api\//, "internal API path"],
  [/\b[\w-]+\.(?:rs|tsx?|vue|py)\b/, "source file name"],
  [/\b[0-9a-f]{12,40}\b/, "commit hash"],
];

const CJK = /[㐀-鿿]/;
const SEMVER = /^\d+\.\d+\.\d+$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

// ---------------------------------------------------------------- parsing

function cmpVersion(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] - pb[i];
  return 0;
}

// releases/<line>/<version>.md:
//
//   ---
//   version: 0.5.0
//   date: 2026-10-19
//   ---
//
//   ## 中文
//   - ...
//
//   ## English
//   - ...
function parseNote(file, errors) {
  const text = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const m = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(text);
  if (!m) {
    errors.push(`${file}: missing front matter`);
    return null;
  }
  const meta = Object.fromEntries(
    m[1]
      .split("\n")
      .map((l) => /^(\w+):\s*(.*?)\s*$/.exec(l))
      .filter(Boolean)
      .map((x) => [x[1], x[2]]),
  );
  const sections = {};
  let current = null;
  for (const line of m[2].split("\n")) {
    const h = /^## (中文|English)\s*$/.exec(line);
    if (h) {
      current = h[1] === "中文" ? "zh" : "en";
      sections[current] = [];
    } else if (current) {
      sections[current].push(line);
    } else if (line.trim()) {
      errors.push(`${file}: text before the "## 中文" heading`);
    }
  }
  const body = (lang) => (sections[lang] || []).join("\n").trim();
  return { meta, zh: body("zh"), en: body("en") };
}

function bullets(md) {
  // A bullet is a "- " line plus any indented continuation lines.
  const out = [];
  for (const line of md.split("\n")) {
    if (line.startsWith("- ")) out.push(line.slice(2));
    else if (/^\s+\S/.test(line) && out.length) out[out.length - 1] += "\n" + line;
  }
  return out;
}

function lintNote(rel, note, version, errors, warnings) {
  if (note.meta.version !== version) errors.push(`${rel}: front matter version "${note.meta.version}" ≠ file name`);
  if (!DATE.test(note.meta.date || "")) errors.push(`${rel}: date must be YYYY-MM-DD`);
  for (const lang of ["zh", "en"]) {
    const md = note[lang];
    if (!md) {
      errors.push(`${rel}: empty "## ${lang === "zh" ? "中文" : "English"}" section`);
      continue;
    }
    for (const line of md.split("\n")) {
      if (/^-\s*$/.test(line)) errors.push(`${rel}: empty bullet`);
      else if (/^- TODO\b/.test(line)) errors.push(`${rel}: TODO placeholder left in`);
      else if (line.trim() && !line.startsWith("- ") && !/^\s+\S/.test(line))
        errors.push(`${rel}: only "- " bullets are allowed, got: ${line.slice(0, 60)}`);
      for (const [re, what] of LEAKS) if (re.test(line)) errors.push(`${rel}: possible leak (${what}): ${line.slice(0, 80)}`);
    }
  }
  if (note.zh && !CJK.test(note.zh)) errors.push(`${rel}: 中文 section has no Chinese text`);
  const nz = bullets(note.zh).length;
  const ne = bullets(note.en).length;
  if (nz && ne && nz !== ne) warnings.push(`${rel}: ${nz} 中文 bullets vs ${ne} English bullets`);
}

function load() {
  const errors = [];
  const warnings = [];
  const lines = {};
  for (const [id, cfg] of Object.entries(LINES)) {
    const dir = join(ROOT, "releases", id);
    const intro = existsSync(join(dir, "README.md")) ? readFileSync(join(dir, "README.md"), "utf8").trim() : "";
    if (!intro) errors.push(`releases/${id}/README.md is missing`);
    const releases = [];
    for (const f of existsSync(dir) ? readdirSync(dir) : []) {
      if (f === "README.md") continue;
      const rel = `releases/${id}/${f}`;
      const version = f.replace(/\.md$/, "");
      if (!f.endsWith(".md") || !SEMVER.test(version)) {
        errors.push(`${rel}: file name must be <major>.<minor>.<patch>.md`);
        continue;
      }
      const note = parseNote(join(dir, f), errors);
      if (!note) continue;
      lintNote(rel, note, version, errors, warnings);
      releases.push({ version, date: note.meta.date, zh: note.zh, en: note.en });
    }
    releases.sort((a, b) => cmpVersion(b.version, a.version));
    lines[id] = { ...cfg, id, intro, releases };
  }
  return { lines, errors, warnings };
}

// ---------------------------------------------------------------- rendering

const entryMd = (r) => `## ${r.version} — ${r.date}\n\n${r.zh}\n\n${r.en}\n`;

function changelogMd(line) {
  const parts = [GENERATED_NOTE(`releases/${line.id}/`), "", line.intro, ""];
  if (line.releases.length) parts.push("---", "");
  for (const r of line.releases) parts.push(entryMd(r));
  return parts.join("\n").replace(/\n+$/, "\n");
}

function releasesJson(lines) {
  const out = { $comment: `Generated from releases/ by scripts/release-notes.mjs — do not edit. Source: https://github.com/${REPO}` };
  for (const line of Object.values(lines)) {
    out[line.id] = {
      name: line.name,
      latest: line.releases[0]?.version ?? null,
      changelog: `${BLOB}/changelogs/${line.id}.md`,
      github_releases: line.githubRelease ? `https://github.com/${REPO}/releases?q=${line.tag}-` : null,
      releases: line.releases.map((r) => ({ version: r.version, date: r.date, zh: bullets(r.zh), en: bullets(r.en) })),
    };
  }
  return JSON.stringify(out, null, 2) + "\n";
}

function versionTable(lines) {
  const rows = [
    "| 组件 / Component | 说明 / What it is | 最新版本 / Latest | 更新记录 / Changelog |",
    "|---|---|---|---|",
  ];
  for (const line of Object.values(lines)) {
    const top = line.releases[0];
    const latest = top ? `**${top.version}** · ${top.date}` : "暂无独立记录<br>No separate notes yet";
    rows.push(`| **${line.name}** | ${line.zh}<br>${line.en} | ${latest} | [changelogs/${line.id}.md](changelogs/${line.id}.md) |`);
  }
  return rows.join("\n");
}

const TABLE_START = "<!-- versions:start -->";
const TABLE_END = "<!-- versions:end -->";

function readmeMd(lines) {
  const readme = readFileSync(join(ROOT, "README.md"), "utf8");
  const i = readme.indexOf(TABLE_START);
  const j = readme.indexOf(TABLE_END);
  if (i < 0 || j < i) throw new Error(`README.md must contain ${TABLE_START} … ${TABLE_END}`);
  return readme.slice(0, i + TABLE_START.length) + "\n" + versionTable(lines) + "\n" + readme.slice(j);
}

function overviewMd(lines) {
  return `${GENERATED_NOTE("releases/")}

# omicOS 更新记录总览 / Changelog Overview

omicOS 由三个相互独立发版的组件组成,版本号不共用。
omicOS ships as three independently versioned components with separate version numbers.

${versionTable(lines)}

> 想第一时间收到新版通知?点右上角 **Watch → Custom → Releases**。GitHub Releases 跟随**内核**与**桌面 App**;网页端随桌面 App 静默更新,只记在 changelog 里。
> Want release notifications? Click **Watch → Custom → Releases**. GitHub Releases follow the **kernel** and the **desktop app**; the web UI updates silently and is listed in its changelog only.
>
> 机器可读的完整记录 / Machine-readable history: [\`releases.json\`](releases.json)

本仓库仅含发布说明,不含源代码(见 [\`NOTICE.md\`](NOTICE.md))。
This repository contains release notes only, no source code (see [\`NOTICE.md\`](NOTICE.md)).
`;
}

function outputs(lines) {
  const files = {
    "releases.json": releasesJson(lines),
    "CHANGELOG.md": overviewMd(lines),
    "README.md": readmeMd(lines),
  };
  for (const line of Object.values(lines)) files[`changelogs/${line.id}.md`] = changelogMd(line);
  return files;
}

// ---------------------------------------------------------------- commands

function report({ errors, warnings }) {
  for (const w of warnings) console.warn(`warning: ${w}`);
  for (const e of errors) console.error(`error: ${e}`);
  if (errors.length) process.exit(1);
}

function build() {
  const state = load();
  report(state);
  for (const [path, content] of Object.entries(outputs(state.lines))) {
    const abs = join(ROOT, path);
    if (existsSync(abs) && readFileSync(abs, "utf8") === content) continue;
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, content);
    console.log(`wrote ${path}`);
  }
}

function check() {
  const state = load();
  report(state);
  const stale = Object.entries(outputs(state.lines))
    .filter(([path, content]) => !existsSync(join(ROOT, path)) || readFileSync(join(ROOT, path), "utf8") !== content)
    .map(([path]) => path);
  if (stale.length) {
    console.error(`error: out of date: ${stale.join(", ")} — run \`node scripts/release-notes.mjs build\` and commit`);
    process.exit(1);
  }
  const n = Object.values(state.lines).reduce((s, l) => s + l.releases.length, 0);
  console.log(`ok: ${n} release notes, generated files are current`);
}

function today() {
  // Release dates follow China time, like the rest of the release tooling.
  return new Date(Date.now() + 8 * 3600e3).toISOString().slice(0, 10);
}

function create(args) {
  const [id, version] = args;
  const dateFlag = args.indexOf("--date");
  const date = dateFlag >= 0 ? args[dateFlag + 1] : today();
  if (!LINES[id]) throw new Error(`unknown line "${id}" (expected ${Object.keys(LINES).join(" / ")})`);
  if (!SEMVER.test(version || "")) throw new Error("version must look like 1.2.3");
  if (!DATE.test(date || "")) throw new Error("--date must be YYYY-MM-DD");
  const { lines } = load();
  const newest = lines[id].releases[0];
  if (newest && cmpVersion(version, newest.version) <= 0)
    throw new Error(`${id} ${version} is not newer than the latest ${newest.version}`);
  const file = join(ROOT, "releases", id, `${version}.md`);
  writeFileSync(file, `---\nversion: ${version}\ndate: ${date}\n---\n\n## 中文\n\n- TODO\n\n## English\n\n- TODO\n`);
  console.log(`created releases/${id}/${version}.md — fill in both sections, then run build`);
}

function gh(args, opts = {}) {
  return execFileSync("gh", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opts });
}

// Without `only`, every line (the CI backstop); `ship` passes its own line so a
// release never creates another line's Release ahead of that line's deploy.
function publish(only) {
  const state = load();
  report(state);
  for (const line of Object.values(state.lines)) {
    const top = line.releases[0];
    if (!line.githubRelease || !top || (only && line.id !== only)) continue;
    const tag = `${line.tag}-${top.version}`;
    try {
      gh(["release", "view", tag, "-R", REPO, "--json", "tagName"]);
      console.log(`${tag}: already released`);
      continue;
    } catch {
      // not released yet
    }
    const notes = join(tmpdir(), `${tag}.md`);
    writeFileSync(
      notes,
      `### ${line.name} ${top.version}\n\n${top.zh}\n\n${top.en}\n\n---\n\n` +
        `完整记录 / Full changelog: [changelogs/${line.id}.md](${BLOB}/changelogs/${line.id}.md)\n`,
    );
    const args = ["release", "create", tag, "-R", REPO, "--title", `${line.name} ${top.version}`, "--notes-file", notes];
    const target = process.env.GITHUB_SHA || git(["rev-parse", "HEAD"]).trim();
    args.push("--target", target, line.latest ? "--latest" : "--latest=false");
    try {
      gh(args);
    } catch (e) {
      // The publish workflow and a release script can race on the same push.
      try {
        gh(["release", "view", tag, "-R", REPO, "--json", "tagName"]);
        console.log(`${tag}: already released`);
        continue;
      } catch {
        throw new Error(`gh release create ${tag} failed: ${e.stderr || e.message}`);
      }
    }
    console.log(`${tag}: released`);
  }
}

function git(args, opts = {}) {
  return execFileSync("git", ["-C", ROOT, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opts });
}

function flag(args, name) {
  const i = args.indexOf(name);
  if (i < 0) return undefined;
  if (!args[i + 1] || args[i + 1].startsWith("--")) throw new Error(`${name} needs a value`);
  return args[i + 1];
}

function noteFile(id, version) {
  if (!LINES[id]) throw new Error(`unknown line "${id}" (expected ${Object.keys(LINES).join(" / ")})`);
  if (!SEMVER.test(version || "")) throw new Error("version must look like 1.2.3");
  return `releases/${id}/${version}.md`;
}

function ready([id, version]) {
  const rel = noteFile(id, version);
  if (!existsSync(join(ROOT, rel)))
    throw new Error(
      `no public release note for ${id} ${version}: write ${join(ROOT, rel)} ` +
        `(\`node scripts/release-notes.mjs new ${id} ${version}\`), Chinese + English, no PR numbers or internal names`,
    );
  const state = load();
  report(state);
  console.log(`ok: ${rel} is ready`);
}

async function ship(args) {
  const [id, version] = args;
  const rel = noteFile(id, version);
  const branch = git(["rev-parse", "--abbrev-ref", "HEAD"]).trim();
  if (branch !== "main") throw new Error(`${ROOT} is on "${branch}"; ship from main`);
  git(["pull", "--ff-only", "--quiet", "origin", "main"], { stdio: "inherit" });
  ready([id, version]);
  build();
  git(["add", "--", rel, "releases.json", "CHANGELOG.md", "README.md", "changelogs"]);
  try {
    git(["diff", "--cached", "--quiet"]);
    console.log(`${rel}: already on main`);
  } catch {
    git(["commit", "--quiet", "-m", `docs: ${LINES[id].name} ${version} release notes`], { stdio: "inherit" });
    git(["push", "--quiet", "origin", "HEAD:main"], { stdio: "inherit" });
    console.log(`pushed ${rel}`);
  }
  publish(id);
  if (flag(args, "--site")) await sync(args);
}

// Copies releases.json to the website box with an atomic rename, then reads
// it back over HTTPS. Host and path come from the (private) release scripts.
async function sync(args) {
  const site = flag(args, "--site");
  const url = flag(args, "--site-url");
  const m = /^([^:]+):(\/.+)$/.exec(site || "");
  if (!m) throw new Error("--site must look like user@host:/absolute/path/changelog.json");
  const [, host, path] = m;
  const state = load();
  report(state);
  const json = releasesJson(state.lines);
  const local = join(tmpdir(), `omicos-releases-${process.pid}.json`);
  writeFileSync(local, json);
  const tmp = `${path}.tmp-${process.pid}`;
  const ssh = ["-o", "ConnectTimeout=15", "-o", "ServerAliveInterval=8"];
  execFileSync("scp", ["-q", ...ssh, local, `${host}:${tmp}`], { stdio: "inherit" });
  execFileSync("ssh", [...ssh, host, `chmod 644 '${tmp}' && mv -f '${tmp}' '${path}'`], { stdio: "inherit" });
  console.log(`synced releases.json → ${host}:${path}`);
  if (!url) return;
  const res = await fetch(`${url}?t=${Date.now()}`, { cache: "no-store", signal: AbortSignal.timeout(30000) });
  const live = await res.json().catch(() => ({}));
  const want = JSON.parse(json);
  const stale = Object.keys(LINES).filter((id) => live[id]?.latest !== want[id].latest);
  if (!res.ok || stale.length) throw new Error(`${url} does not serve this build yet (${stale.join(", ") || res.status})`);
  console.log(`verified ${url}: ${Object.keys(LINES).map((id) => `${id} ${want[id].latest ?? "—"}`).join(", ")}`);
}

const [cmd, ...rest] = process.argv.slice(2);
try {
  if (cmd === "build") build();
  else if (cmd === "check") check();
  else if (cmd === "new") create(rest);
  else if (cmd === "publish") publish();
  else if (cmd === "ready") ready(rest);
  else if (cmd === "ship") await ship(rest);
  else if (cmd === "sync") await sync(rest);
  else {
    console.error(
      "usage: node scripts/release-notes.mjs <new <line> <version> [--date YYYY-MM-DD] | build | check | publish |\n" +
        "       ready <line> <version> | ship <line> <version> [--site host:path] [--site-url url] | sync --site host:path [--site-url url]>",
    );
    process.exit(2);
  }
} catch (e) {
  console.error(`error: ${e.message}`);
  process.exit(1);
}
