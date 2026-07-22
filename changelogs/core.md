# omicos-core 更新记录 / Changelog

分析内核 / 运行时(命令行 `omicos`,桌面 App 内置)。多数情况下内置自动更新器会静默升级,无需手动操作。
The analysis kernel / runtime (`omicos` CLI, bundled in the desktop app). The built-in updater upgrades silently in most cases.

> 记录起点为 0.3.0。更早版本不在此列。/ History starts at 0.3.0; earlier versions are not listed here.

---

## 0.3.14 — 2026-07-21

- **新增证据模式(Evidence mode)**:开启后,每个结论都用引用的文献或来自数据的具体数字支撑,并强制附上反方证据——新增引用文献、引用数据、查找反证三种能力,配合独立校验。面向 Pro 等级的组学(omics)分析。
- **分域权益判定修正**:同时拥有不同研究域权益的用户(例如「人文社科 Pro、组学社区版」),现在能按当前所在域正确解锁该域的付费 agent 与 skill,不再被其他域的等级误挡。
- **记忆系统重构**:记忆条目新增分类与「有效期」信息——失效的记忆是被标记为过期而非删除(文件保留作历史),默认只召回当前有效的事实;「常用」的记忆按最近一次被用到来衡量,越常用越保持在前,长期不用的逐渐淡出。
- **其它稳定性**:已保存连接的打开更稳、轮次事件按会话隔离、内核根目录与新建对话默认目录分离。

- **New: Evidence mode**: when on, every conclusion is backed by a cited reference or a concrete number from your data, and counter-evidence is required — adding cite-literature, cite-data and find-counter-evidence capabilities with an independent check. For Pro-tier omics analysis.
- **Per-domain entitlement fix**: users who hold entitlements in different research domains (e.g. "Humanities Pro, omics Community") now correctly unlock a domain's paid agents and skills based on the domain they're in, instead of being blocked by another domain's tier.
- **Memory system redesign**: memory entries gain a category and validity information — a superseded memory is marked expired rather than deleted (the file is kept as history), and only currently-valid facts are recalled by default; "frequently used" memories are measured by when they were last used, so the ones you rely on stay near the top while ignored ones fade out.
- **Other stability**: steadier opening of saved connections, per-conversation isolation of turn events, and separation of the kernel's root directory from the default directory for new conversations.

## 0.3.13 — 2026-07-21

- **会话行菜单**:每条会话可置顶 / 归档 / 标为未读,并跨设备同步。
- **本地会话的模型也同步到云端**:在另一台设备打开同一会话时能看到相同的模型。
- **修复:远程会话的「后续建议」不再报错**:SSH 隧道会话的后续建议面板此前总显示「建议暂不可用」,现已修正。

- **Conversation row menu**: each conversation can be pinned / archived / marked unread, synced across devices.
- **A local conversation's model now syncs to the cloud**: open the same conversation on another device and you'll see the same model.
- **Fixed: "follow-up suggestions" no longer error on remote conversations**: the suggestions panel for SSH-tunnel conversations used to always show "unavailable"; fixed.

## 0.3.12 — 2026-07-20

- **远程连接更稳定**:优化 SSH 远程内核的关闭、就绪判定与状态刷新,并按连接把工作区操作路由到正确的内核,减少抖动。
- **安全增强**:强化 API 密钥的本地保护——密钥默认只保留在你本机,仅在你明确同意时才同步到远程服务器。
- **「保存代码」修复**:修复在远程 / 云会话下导出代码时可能提示缺少某供应商 API Key 的问题(现经本机凭据完成导出)。
- **kimi 思考档**:kimi-coding-plan 现支持三档思考强度。

- **More stable remote connections**: improved shutdown, readiness detection and status refresh for SSH remote kernels, with per-connection routing of workspace actions to the right kernel.
- **Security hardening**: stronger local protection of API keys — keys stay on your machine by default and are synced to a remote server only when you explicitly consent.
- **"Save code" fix**: fixed a possible "missing API key" error when exporting code in a remote/cloud session (the export now uses this machine's credentials).
- **kimi thinking levels**: kimi-coding-plan now supports its three thinking levels.

## 0.3.11 — 2026-07-18

- **远程运行时与状态轮询更稳**:改进远程连接的运行时管理与状态查询,减少远程内核在连接、状态刷新上的抖动。
- **新增 Grok OAuth 登录**,并修复将 Anthropic 作为自定义供应商配置时的问题。

- **Steadier remote runtime & status polling**: improved runtime management and status queries for remote connections, reducing jitter on connect and status refresh.
- **Added Grok OAuth sign-in**, and fixed configuring Anthropic as a custom provider.

## 0.3.10 — 2026-07-17

- **看清内核「卡住还是在算」**:进程状态面板新增 AI 栈分析——采样共享 Python 内核的调用栈,再让你配置的模型解读它到底在忙什么(而不只是知道它还活着)。桌面端首次分析可经系统授权对话框临时提权(默认关闭)。
- **worker 死亡不再偷偷重跑**:Python worker 执行中途死掉(如内存不足被杀)时,不再静默重启并把整段代码再跑一遍,而是如实报出。
- **命令行 / 终端界面与网页端对齐**:发言人标签、复核 check 卡片、深度研究报告识别、计划模式等。
- **更快打开长会话**、修复自动更新回退清单、会话同步改为增量推送、PDF 阅读工具鼓励通读全文。

- **See whether a kernel is stuck or working**: the process panel adds an AI stack analysis — it samples the shared Python kernel's call stack and has your model explain what it is doing (not just that it is alive). On desktop the first analysis can request temporary elevation via a system dialog (off by default).
- **No more silent re-runs on worker death**: when a Python worker dies mid-execution (e.g. killed for memory), the kernel now reports it honestly instead of silently restarting and re-running the whole cell.
- **CLI / terminal UI aligned with the web app**: speaker labels, review check cards, deep-research report detection, plan mode, and more.
- **Faster long-conversation opens**, a fix so the auto-update rollback list is preserved, incremental conversation sync, and a PDF reader that encourages reading the full document.

## 0.3.9 — 2026-07-16

- **环境明明好了却说「没装环境」的问题修复**:内核是否能跑 Python 的判断会在真正拦下你之前重新探测,环境一好就自动放行(此前需重启才能恢复)。
- **会话在「将运行它的机器」上创建、执行**:面向 SSH 远程时,会话不再诞生在错的机器上。
- **进程监控只看自家进程**:共享 HPC 登录节点上运行时不再扫描整机进程,避免占用大量 CPU。
- **自动更新支持回退到指定旧版本**、远程离线会话可在本地保留只读镜像、网络诊断可询问远程能否连云。

- **Fix for "environment not installed" when it actually is**: the check for whether the kernel can run Python re-probes before it blocks you, and releases automatically once the environment is ready (previously a restart was required).
- **Conversations are created and executed on the machine that will run them**: for SSH remotes, a conversation no longer starts on the wrong machine.
- **Process monitoring watches only its own processes**: on shared HPC login nodes it no longer scans the whole machine, avoiding heavy CPU use.
- **Auto-update can roll back to a named older version**, remote/offline conversations keep a read-only local mirror, and network diagnostics can ask the remote whether it can reach the cloud.

## 0.3.8 — 2026-07-16

- **远程会话修复**:不再凭空生成打开为空的「幽灵会话」;对远程会话的操作正确作用到其所在机器。
- **生物数据库自助密钥新增两项**:Hugging Face 令牌(病理 / 蛋白基础模型需要)与 openFDA 密钥(可选提额)。
- **命令行终端输入体验稳定化**。

- **Remote-conversation fixes**: no more empty "ghost" conversations, and actions on a remote conversation reach the machine that holds it.
- **Two more self-serve database keys**: a Hugging Face token (for gated pathology/protein foundation models) and an openFDA key (optional, raises rate limits).
- **Steadier CLI terminal input**.

## 0.3.6 — 2026-07-16

- **连接 SSH 远程时又能看到远程会话**:侧栏可直接列出隧道另一端内核持有的会话。
- **进程凭据缺失也能自愈**,不再卡在离线状态。

- **Remote conversations visible again over SSH**: the sidebar can list conversations held by the kernel at the other end of the tunnel.
- **Self-healing when a process credential is missing**, instead of getting stuck offline.

## 0.3.5 — 2026-07-14

- **多工作区 + 会话级远程路由(重大更新)**:会话改为全局存储,任意目录启动都能看到本机所有会话;内核按工作区分池、按会话路由;SSH 远程改为每会话各自的目标(会话留本地、远程仅作执行器)。
- **会话删除双向同步**:本机删的不再在别处「复活」,别处删的也能同步回来。
- **网络诊断**:暴露本机真实出网状况(代理、TLS 信任根、系统时钟、按功能可达性),帮你定位「浏览器能连、omicOS 连不上」。
- **稳定性**:依赖安装加真实超时避免卡死;修复若干登录 / 凭据导致的循环;缓存 conda 环境发现(此前每次都要等 9–12 秒)。

- **Multi-workspace + per-conversation remote routing (major)**: conversations are now stored globally and visible from any launch directory; kernels are pooled per workspace and routed per conversation; SSH remotes become a per-conversation target (the conversation stays local, the remote is just an executor).
- **Two-way conversation deletion**: a conversation you delete here no longer "revives" elsewhere, and deletions made elsewhere sync back.
- **Network diagnostics**: surfaces this machine's real connectivity (proxy, TLS roots, clock, per-feature reachability) to explain "the browser connects but omicOS can't".
- **Stability**: real timeouts on dependency installs to avoid hangs; several login/credential loops fixed; cached conda-environment discovery (previously a 9–12s wait each time).

## 0.3.4 — 2026-07-14

- **修复不完整的打包 skill 缓存**:若资源只下载了一半,不再被误当作「已是最新」。

- **Fixed incomplete packaged-skill caches**: a half-downloaded resource tree is no longer treated as "already up to date".

## 0.3.3 — 2026-07-12

- **子调用「运行」行可查错、可回溯**:出上下文的子模型委派(网页抓取智能提取、PDF / 图像识别、整 agent worker)在界面显示为一行「运行」,此前失败只有一个点不开的红点;现在带上失败原因,并能回溯到发起它的父调用(如抓取失败可点开看 URL 与结果)。

- **Clickable, traceable "run" rows for sub-calls**: out-of-context sub-model delegations (web-fetch extraction, PDF/image vision, whole-agent workers) show as a "run" row; failures used to be a red dot you couldn't open — now they carry the failure reason and link back to the parent call (e.g. a failed fetch opens its URL and result).

## 0.3.2 — 2026-07-12

- **并行工具调用不再互相串味**:修复 Codex / Gemini 在一次响应里发出多个并行工具调用时,参数被错误拼接、导致某个工具戴着另一个工具参数的问题(对深度研究影响最大)。
- **上下文窗口修正**:将 Codex 的 gpt-5.5 上下文窗口离线回退值修正为 272k,避免自动压缩撑过真实窗口。

- **Parallel tool calls no longer bleed into each other**: fixed Codex/Gemini so multiple parallel tool calls in one response don't get their arguments merged (which made a tool run with another tool's arguments) — most impactful for deep research.
- **Context-window fix**: corrected the offline fallback for Codex gpt-5.5 to 272k so auto-compaction doesn't overshoot the real window.

## 0.3.1 — 2026-07-12

- **Skill 可携带打包程序(opt-in)**:skill 现可声明一个打包运行时入口,让它携带可直接运行的程序;未声明的 skill 行为不变。

- **Skills can carry a packaged runtime (opt-in)**: a skill may declare a packaged runtime entry point so it can ship a directly runnable program; skills that don't declare one behave as before.

## 0.3.0 — 2026-07-11

- **多研究域支持**:内核按研究域分别拉取并缓存各自的 agent / skill 阵容,切换域即切换整套;组学(omics)默认行为与之前完全一致。
- **深度研究能力(P0)**:新增并行网页抓取 / 批量搜索工具,内置严格的安全防护(防止访问内网 / 元数据地址、DNS 重绑定)与并发 / 内存上限,避免宽扇出把内核撑爆。
- **云端能渲染 agent 自存的图**:agent 用自定义文件名 / 绝对路径保存的图,现在也能在手机 / 网页端正确显示(仅上传工作区内的真实图片,不改动消息内容)。
- **云端会话过期能被感知**:会话过期时客户端会正确提示重新登录,而不是静默失败。
- **生物数据库调用也走本地转发**:无外网的远程内核发起的生物库请求经本机(持有密钥与外网)回传执行,**真实密钥自始至终不离开本机**。
- **新增 `fanout_only` agent 能力**:让特定 agent 只能扇出委派、不能回调,从根上消除深度研究的递归空转。

- **Multi-domain support**: the kernel fetches and caches a separate agent/skill lineup per research domain and switches the whole lineup when you switch domains; the omics domain behaves exactly as before.
- **Deep research (P0)**: new parallel web-fetch / batch-search tools with strict safety guards (blocking internal/metadata addresses and DNS rebinding) and concurrency/memory caps so a wide fan-out can't exhaust the kernel.
- **The cloud can render figures an agent saved itself**: figures saved with custom names/absolute paths now display correctly on mobile/web (only real in-workspace images are uploaded; message content is untouched).
- **Cloud session expiry is now surfaced**: when a session expires the client prompts a re-login instead of failing silently.
- **Biology-database calls can route through your machine**: for an offline remote kernel, biology-database requests are relayed through this machine (which holds the keys and internet), and the **real keys never leave your computer**.
- **New `fanout_only` agent capability**: lets a specific agent only fan out work and never call back, structurally eliminating recursive spinning in deep research.
