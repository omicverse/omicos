<!-- 由 scripts/release-notes.mjs 从 releases/ 生成,请勿直接编辑。 / Generated from releases/ by scripts/release-notes.mjs — do not edit. -->

# omicOS 更新记录总览 / Changelog Overview

omicOS 由三个相互独立发版的组件组成,版本号不共用。
omicOS ships as three independently versioned components with separate version numbers.

| 组件 / Component | 说明 / What it is | 最新版本 / Latest | 更新记录 / Changelog |
|---|---|---|---|
| **omicos-core** | 分析内核 / 运行时(命令行 `omicos`,桌面 App 内置)<br>Analysis kernel / runtime (`omicos` CLI, bundled in the desktop app) | **0.5.5** · 2026-10-26 | [changelogs/core.md](changelogs/core.md) |
| **omicos webui** | 浏览器 / 桌面 App 内的界面,静默 OTA 更新<br>The in-browser / in-desktop interface, delivered silently via OTA | **0.3.21** · 2026-10-26 | [changelogs/webui.md](changelogs/webui.md) |
| **omicos desktop** | Windows / macOS 桌面客户端(外壳)<br>Windows / macOS desktop client (the shell) | **0.1.26** · 2026-10-24 | [changelogs/desktop.md](changelogs/desktop.md) |

> 想第一时间收到新版通知?点右上角 **Watch → Custom → Releases**。GitHub Releases 跟随**内核**与**桌面 App**;网页端随桌面 App 静默更新,只记在 changelog 里。
> Want release notifications? Click **Watch → Custom → Releases**. GitHub Releases follow the **kernel** and the **desktop app**; the web UI updates silently and is listed in its changelog only.
>
> 机器可读的完整记录 / Machine-readable history: [`releases.json`](releases.json)

本仓库仅含发布说明,不含源代码(见 [`NOTICE.md`](NOTICE.md))。
This repository contains release notes only, no source code (see [`NOTICE.md`](NOTICE.md)).
