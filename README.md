# omicOS · 更新记录 / Release Notes

**中文** ｜ [English below](#english)

**omicOS** 是一款智能体驱动的组学分析平台。本仓库**只发布版本更新记录**,方便你了解每次更新改了什么、订阅新版通知、反馈问题。

> ⚠️ omicOS 是**商业化闭源产品**,本仓库**不包含任何源代码**,仅有面向用户的发布说明与文档链接。

### 更新记录

| 组件 | 说明 | 记录 |
|---|---|---|
| **omicos-core** | 分析内核 / 运行时(命令行 `omicos`、桌面内置) | [changelogs/core.md](changelogs/core.md) |
| **omicos 网页端(webui)** | 浏览器 / 桌面内的界面 | [changelogs/webui.md](changelogs/webui.md) |
| **omicos 桌面 App** | Windows / macOS 桌面客户端 | [changelogs/desktop.md](changelogs/desktop.md) |

三条更新线相互独立(内核、网页端、桌面外壳各自发版),因此版本号不共用。

### 获取与更新

- **命令行 / 服务器**:`npm install -g @omicverse/omicos`,内置自动更新器会静默升级。
- **桌面 App**:从 [omicos.cn](https://omicos.cn) 下载,应用内自动更新。
- **网页端**:随桌面 App 静默 OTA 更新,无需手动操作。

### 反馈

发现问题或有功能建议,欢迎在本仓库 **[Issues](../../issues)** 提交(已提供 bug / 建议模板)。产品咨询与账号问题请通过 [omicos.cn](https://omicos.cn) 或应用内客服联系。

---

<a name="english"></a>
## English

**omicOS** is an agentic omics-analysis platform. This repository publishes **release notes only** — so you can see what each update changes, subscribe to new releases, and report issues.

> ⚠️ omicOS is a **commercial, closed-source product**. This repository contains **no source code** — only user-facing release notes and documentation links.

### Changelogs

| Component | What it is | Notes |
|---|---|---|
| **omicos-core** | Analysis kernel / runtime (`omicos` CLI, bundled in the desktop app) | [changelogs/core.md](changelogs/core.md) |
| **omicos webui** | The in-browser / in-desktop interface | [changelogs/webui.md](changelogs/webui.md) |
| **omicos desktop app** | Windows / macOS desktop client | [changelogs/desktop.md](changelogs/desktop.md) |

The three release lines are independent (kernel, web UI, and desktop shell each ship separately), so their version numbers are not shared.

### Get & update

- **CLI / servers**: `npm install -g @omicverse/omicos`; the built-in updater upgrades silently.
- **Desktop app**: download from [omicos.cn](https://omicos.cn); updates in-app.
- **Web UI**: delivered silently via OTA with the desktop app — nothing to do.

### Feedback

Found a bug or have a feature request? Open an **[Issue](../../issues)** (bug / request templates provided). For product or account questions, reach us via [omicos.cn](https://omicos.cn) or in-app support.
