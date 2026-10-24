<!-- 由 scripts/release-notes.mjs 从 releases/desktop/ 生成,请勿直接编辑。 / Generated from releases/desktop/ by scripts/release-notes.mjs — do not edit. -->

# omicOS 桌面 App 更新记录 / Changelog

Windows / macOS 桌面客户端。它是一个会**自动更新的外壳**,内置分析内核(omicos-core)与网页端(webui),两者各自静默 OTA 升级。
The Windows / macOS desktop client. It is an **auto-updating shell** that bundles the analysis kernel (omicos-core) and the web UI (webui), both of which upgrade silently via OTA.

> 从 [omicos.cn](https://omicos.cn) 下载,应用内自动更新。
> Download from [omicos.cn](https://omicos.cn); it updates itself in place.

绝大多数用户可见的变化来自**内核**与**网页端**,请查看它们的更新记录:
Almost all user-facing changes come from the **kernel** and the **web UI** — see their changelogs:

- 内核 / Kernel — [`changelogs/core.md`](/changelogs/core.md)
- 网页端 / Web UI — [`changelogs/webui.md`](/changelogs/webui.md)

外壳本身(安装器、自动更新、窗口 / 托盘、系统集成)很少单独发版;当某项变化确实属于桌面外壳时,会在上面两份记录里注明「需重装桌面端」或「桌面版」。此文件将在外壳出现独立于内核 / 网页端的用户可见变化时开始逐版记录。
The shell itself (installer, auto-update, window / tray, OS integration) rarely ships on its own; when a change genuinely belongs to the desktop shell it is flagged as "desktop reinstall required" or "(desktop)" in the two changelogs above. This file will start listing per-version entries once the shell has user-facing changes independent of the kernel / web UI.

---

## 0.1.26 — 2026-10-24

- 内置分析内核更新至 0.5.4，改进靶点图谱排序、分析流程兼容性与文件移动保护。
- 内置最新完整界面；靶点图谱按文献关注度、组织和靶点属性分组，编码值显示为可读标签。
- 内置桌面伴侣支持独立窗口，并加入桌面扩展宿主支持。

- Bundles Core 0.5.4 with improved Target Atlas ranking, pipeline compatibility and protection against overwriting files during moves.
- Includes the latest complete interface, with Target Atlas groups for literature attention, tissue and target properties, and readable labels for coded values.
- Built-in desktop companions support independent windows, alongside desktop extension host support.

## 0.1.25 — 2026-10-23

- 桌面宠物新增独立桌面窗口，首次启用时按需下载运行资源，可查看下载进度并重试。
- 内置最新完整界面，包含 Mirage 主题、靶点图谱、工具搜索和对话导航改进。
- 内置分析内核更新至 0.5.3，支持云端内核和分析流程；云算力仍需要账号获准并由用户确认。
- 更新内置分析环境，并修正 Intel Mac 的 R 运行库架构。

- Desktop pets gain their own desktop window. Runtime resources download on first use, with progress and retry controls.
- Includes the complete updated interface, with Mirage themes, Target Atlas, tool search and chat navigation improvements.
- Bundles Core 0.5.3 with cloud kernels and analysis pipelines. Cloud compute still requires account access and user confirmation.
- Updates the bundled analysis environment and corrects the R runtime architecture on Intel Macs.

## 0.1.24 — 2026-10-20

- **Windows 恢复界面自动更新**——装上本版后，之后发布的界面更新会在后台下载，下次启动时生效，不必再等新的安装包。
- **多工作区登录更稳定**——登录同步不再清掉其他工作区已有的身份，启动和远程重连时身份保持一致。
- 内置内核更新到 0.5.1，内置界面更新到 0.3.10。

- **Windows UI updates are back** — after installing this version, new UI releases download in the background and apply on the next launch instead of waiting for a new installer.
- **Steadier sign-in across workspaces** — sign-in sync no longer clears the identity other workspaces already hold, so launches and remote reconnects keep the same identity.
- The bundled kernel is now 0.5.1 and the bundled UI 0.3.10.
