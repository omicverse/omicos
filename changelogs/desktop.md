# omicOS 桌面 App 更新记录 / Changelog

Windows / macOS 桌面客户端。它是一个会**自动更新的外壳**,内置分析内核(omicos-core)与网页端(webui),两者各自静默 OTA 升级。
The Windows / macOS desktop client. It is an **auto-updating shell** that bundles the analysis kernel (omicos-core) and the web UI (webui), both of which upgrade silently via OTA.

> 从 [omicos.cn](https://omicos.cn) 下载,应用内自动更新。
> Download from [omicos.cn](https://omicos.cn); it updates itself in place.

---

绝大多数用户可见的变化来自**内核**与**网页端**,请查看它们的更新记录:
Almost all user-facing changes come from the **kernel** and the **web UI** — see their changelogs:

- 内核 / Kernel — [`core.md`](core.md)
- 网页端 / Web UI — [`webui.md`](webui.md)

外壳本身(安装器、自动更新、窗口 / 托盘、系统集成)很少单独发版;当某项变化确实属于桌面外壳时,会在上面两份记录里注明「需重装桌面端」或「桌面版」。此文件将在外壳出现独立于内核 / 网页端的用户可见变化时开始逐版记录。
The shell itself (installer, auto-update, window / tray, OS integration) rarely ships on its own; when a change genuinely belongs to the desktop shell it is flagged as "desktop reinstall required" or "(desktop)" in the two changelogs above. This file will start listing per-version entries once the shell has user-facing changes independent of the kernel / web UI.
