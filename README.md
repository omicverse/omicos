<p align="center">
  <img src="assets/omicos-logo.png" alt="omicOS" width="140">
</p>

<h1 align="center">omicOS</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@omicverse/omicos"><img src="https://img.shields.io/npm/v/@omicverse/omicos?logo=npm&color=cb3837" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@omicverse/omicos"><img src="https://img.shields.io/npm/dm/@omicverse/omicos?color=cb3837" alt="npm downloads"></a>
  <img src="https://img.shields.io/node/v/@omicverse/omicos?color=00795c" alt="node version">
  <img src="https://img.shields.io/badge/platform-Linux%20%7C%20macOS%20%7C%20Windows-informational" alt="platforms">
  <a href="https://docs.omicos.cn/en/"><img src="https://img.shields.io/badge/docs-omicos.cn-00795c" alt="docs"></a>
  <a href="https://omicos.cn"><img src="https://img.shields.io/badge/website-omicos.cn-00795c" alt="website"></a>
  <a href="NOTICE.md"><img src="https://img.shields.io/badge/license-Proprietary-lightgrey" alt="license"></a>
</p>

**omicOS** is an agent-driven omics-analysis platform. This repository publishes **release notes only** — so you can see what each update changes, subscribe to new releases, and report issues.

## Installation

### Desktop app (recommended)

Download the Windows or macOS client from **[omicos.cn](https://omicos.cn)**. The app updates itself in place — the analysis kernel and web UI are bundled in and upgrade silently.

### Command line (npm)

For servers, headless use, or driving omicOS from a terminal, install the `omicos` CLI from npm:

```bash
npm install -g @omicverse/omicos
omicos --version
```

Or run it once without installing:

```bash
npx @omicverse/omicos
```

- **Requirements:** Node.js ≥ 16.
- **Platforms:** Linux, macOS, and Windows on both x64 and arm64. The correct native binary is fetched automatically on install.
- **Updates:** the built-in updater upgrades the kernel silently; no manual steps needed.

## Documentation & tutorials

- **Docs & tutorials (English):** https://docs.omicos.cn/en/
- **Docs home:** https://docs.omicos.cn/

## Release notes

| Component | What it is | Changelog |
|---|---|---|
| **omicos-core** | Analysis kernel / runtime (`omicos` CLI, bundled in the desktop app) | [changelogs/core.md](changelogs/core.md) |
| **omicos webui** | The in-browser / in-desktop interface | [changelogs/webui.md](changelogs/webui.md) |
| **omicos desktop app** | Windows / macOS desktop client | [changelogs/desktop.md](changelogs/desktop.md) |

The three release lines ship independently (kernel, web UI, and desktop shell), so their version numbers are not shared.

## Feedback

Found a bug or have a feature request? Open an **[Issue](../../issues)** — bug-report and feature-request templates are provided. For product or account questions, reach us via [omicos.cn](https://omicos.cn) or in-app support.

---

Copyright © 2026 PrimorDecode (北京源境解码科技有限公司). All rights reserved. "omicOS", "OmicVerse", and related marks are trademarks of PrimorDecode. See [NOTICE.md](NOTICE.md).
