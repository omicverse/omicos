# omicos-core 更新记录 / Changelog

分析内核 / 运行时(命令行 `omicos`,桌面 App 内置)。多数情况下内置自动更新器会静默升级,无需手动操作。
The analysis kernel / runtime (`omicos` CLI, bundled in the desktop app). The built-in updater upgrades silently in most cases.

> 记录起点为 0.3.0。更早版本不在此列。/ History starts at 0.3.0; earlier versions are not listed here.

---

## 0.3.33 — 2026-08-21

- **配额感知的免费模型路由**:按各账号/供应商的剩余配额自动挑选可用的免费模型,配额用尽的不再被反复选中。
- **Google 个人账号登录改用 Antigravity**:设置里显示为 Antigravity OAuth,授权改为在官方回调页粘贴授权码,并可从 Antigravity CLI(`agy`)或企业版 Gemini CLI 凭据导入;个人 Google AI Pro/Ultra/免费账号不再走 Gemini CLI。
- **经本地转发时不再把"模型在思考"误判为断线**:此前本地模型在建链、重试或尚未输出首字时,远端收不到任何帧,即使连接正常也会在 180 秒后误报连接超时;现在把"连接是否存活"与"模型是否有进度"分开计时,只有真正的模型输出才算进度。旧版本内核仍按原有超时行为工作。
- **应用更新比较改用语义化版本**:判断是否有新版本时按 SemVer 大小比较,不再按字符串,避免 0.3.9 被误判为高于 0.3.10。
- **安全:不再误取消他人的计算作业**:shell 拒绝直接执行 `scancel`,取消作业只允许针对本会话自己提交的任务。
- **工具报错更清楚**:参数出错时会指出具体是哪个参数不对、以及哪个传入项从未被使用。
- **供应商修复**:OpenAI key 校验与运行时解析口径对齐;对齐最新的推理参数协议。

- **Quota-aware free-model routing** — free models are picked automatically based on each account/provider's remaining quota, and ones whose quota is used up are no longer repeatedly selected.
- **Google personal-account sign-in moved to Antigravity** — shown as Antigravity OAuth in settings, authorization is now done by pasting the code on the official callback page, and credentials can be imported from the Antigravity CLI (`agy`) or an enterprise Gemini CLI; personal Google AI Pro/Ultra/free accounts no longer go through the Gemini CLI.
- **"Model is thinking" is no longer mistaken for a disconnect over local forwarding** — previously, while a local model was connecting, retrying, or had not yet produced its first token, the remote end received no frames and would falsely report a connection timeout after 180s even when the link was fine; connection liveness and model progress are now timed separately, and only real model output counts as progress. Older kernels keep their previous timeout behavior.
- **App-update comparison now uses semantic versioning** — "is there a newer version" is decided by SemVer ordering rather than string comparison, so 0.3.9 is no longer treated as higher than 0.3.10.
- **Safety: no longer cancels someone else's compute jobs** — the shell refuses to run `scancel` directly, and job cancellation is restricted to jobs submitted by the current session.
- **Clearer tool errors** — on a bad argument, it now points out which argument is wrong and which passed-in field was never used.
- **Provider fixes** — OpenAI key validation is aligned with how the runtime parses it, and request parameters are aligned with the latest reasoning-parameter protocol.

## 0.3.32 — 2026-08-18

- **并发远程会话的 SSH 账号状态相互隔离**:同时连接多个远程 Core 会话时,各自的 SSH 账号状态不再相互串扰,彼此独立。
- **触及安全上限时明确告知**:某个回合因触及安全上限而停止时,会明确说明原因,而不再静默结束。

- **SSH account state is isolated across concurrent remote sessions** — when several remote Core sessions are connected at once, each keeps its own SSH account state instead of interfering with the others.
- **Clear notice when a safety limit is reached** — when a turn stops because it hit a safety limit, that reason is now stated explicitly rather than the turn ending silently.

## 0.3.31 — 2026-08-16

- **图像生成按目录声明的接口路由,支持更多供应商**:此前图像生成只在少数供应商上可用,其它能出图的供应商会中途失败;现在改为按目录中声明的图像生成接口路由,凡是支持出图的供应商都可用。
- **SSH 运行时的所有权与更新生命周期加固**:强化了 SSH 运行时的生命周期与受管更新的稳健性,并隔离不同账号的远程运行时。
- **修复 exFAT 磁盘上的渲染授权发布**:在 exFAT 文件系统上,图形渲染所需的授权凭据现在能正确发布。

- **Image generation routes by the catalog-declared API, covering more providers** — image generation previously worked only on a few providers and failed partway on others that can actually produce images; it now routes by the image-generation API declared in the catalog, so any provider that supports it works.
- **Hardened SSH-runtime ownership and update lifecycle** — the SSH runtime's lifecycle and managed-update robustness are strengthened, and remote runtimes are isolated across accounts.
- **Fixed rendering-authority publishing on exFAT** — on exFAT filesystems, the credential needed for graphics rendering is now published correctly.

## 0.3.30 — 2026-08-15

- **新增 Agent2Agent(A2A)v1.0 协议**:内置 A2A 服务端(基于 JSON-RPC 2.0,支持消息发送与流式、任务查询/列举/取消/订阅、扩展 agent-card)、agent-card 发现、鉴权与文件/推送;也可作为客户端把外部 agent 当作工具调用。
- **A2A 外呼单独审批分级**:调用外部 A2A agent 会把对话/分析内容发给第三方,现改为独立的审批级别,自动模式下也会先暂停等你确认(与 MCP 一致),而不再被当作只读操作静默执行。
- **A2A 前向兼容加固**:对方使用更新版本的协议、回以本版本尚不认识的取值时,不再整条解析失败,而是当作"未知"继续处理。
- **DeepSeek V4 更稳**:保留其工具调用的推理历史,并加入按模型的首请求配置,绝不把初始化阶段的中间答案当作最终结果返回。
- **会话历史查询新增"仅运行时状态"选项**:存活轮询只需运行时状态时不再重复加载整段历史。
- **`omicos serve` 的复用提示在终端里可见**:当已有健康实例、第二个 serve 复用并退出时,提示不再被吞掉,也不会把终端留在原始模式。

- **New Agent2Agent (A2A) v1.0 protocol** — a built-in A2A server (JSON-RPC 2.0: message send and streaming, task get/list/cancel/subscribe, extended agent-card), agent-card discovery, authentication, and files/push; the app can also act as a client and call external agents as tools.
- **Separate approval tier for outbound A2A calls** — calling an external A2A agent sends conversation/analysis content to a third party, so these now have their own approval tier and pause for confirmation even in automatic mode (like MCP), instead of being treated as a silent read-only operation.
- **Hardened A2A forward compatibility** — when a peer on a newer protocol version replies with values this build doesn't recognize, the whole message no longer fails to parse; unknown values are treated as "unknown" and processing continues.
- **Steadier DeepSeek V4** — reasoning history for its tool calls is preserved, and a per-model first-request profile is added; intermediate bootstrap answers are never returned to you as the final result.
- **A "runtime-only" option for session-history queries** — liveness polling that only needs runtime state no longer reloads the whole history.
- **The `omicos serve` reuse notice is visible in the terminal** — when a healthy instance already exists and a second serve reuses it and exits, the notice is no longer swallowed and the terminal isn't left in raw mode.

## 0.3.29 — 2026-08-14

- **对齐各模型当前的推理接口契约**:请求/响应字段按各家最新的 reasoning 接口契约校准。
- **工具调用身份在审批前后保持一致**:经过审批后工具调用的身份不再错乱,进度与结果正确对应。
- **会话 ID 使用完整 UUID**:会话标识使用完整 UUIDv4,降低碰撞风险。
- **浏览器文件路径的查询参数正确解码**:浏览器文件路径中经表单编码的查询参数(如路径里的空格)现在能正确解码。
- **为 Python 运行时下发渲染授权**:图形渲染所需的授权凭据会下发给 Python 运行时。
- **可挂接外部管理的 SSH 运行时**:支持接入由外部管理的 SSH 运行时。
- **Windows:不再被残留的服务锁卡住**:能识别已退出的服务锁持有者,启动不再被过期锁阻塞。

- **Aligned with each model's current reasoning API contract** — request/response fields are calibrated to each provider's latest reasoning contract.
- **Consistent tool-call identity across approval** — a tool call's identity is no longer scrambled after approval, so progress and results map correctly.
- **Full UUID session IDs** — sessions now use a full UUIDv4 identifier, reducing collision risk.
- **Correct decoding of browser file-path query parameters** — form-encoded query parameters in browser file paths (such as spaces in a path) are now decoded correctly.
- **Rendering authority for the Python runtime** — the credential needed for graphics rendering is provided to the Python runtime.
- **Attach an externally managed SSH runtime** — you can now hook up an SSH runtime managed outside the app.
- **Windows: no longer stuck on a stale serve lock** — an exited serve-lock holder is detected, so startup isn't blocked by a leftover lock.

## 0.3.28 — 2026-08-12

- **按项目划分的记忆与召回**:记忆可以按项目归档、按项目召回,资料随当前模型组织。
- **可中断当前工作区内核**:新增"中断活动工作区内核"的能力,长任务可以及时打断。
- **历史检索的权限判定更合理**:检索自己历史的权限改为按你在任意研究域里持有的最高档位判定——持 Pro 的用户不会因某个领域的档位过期而被误判成免费、进而拒绝访问自己的历史。
- **桌面更新健康检查对中国大陆网络更友好**:诊断改为同时探测国内更新节点并与海外节点竞速,任一可达即视为正常(此前只探测海外节点,国内网络会一律误报"无法连接更新主机",而更新其实经国内节点正常)。

- **Per-project memory and recall** — memories can be filed and recalled per project, with the dossier organized around the current model.
- **Interruptible active-workspace kernel** — a new "interrupt the active workspace kernel" capability lets you stop long-running tasks promptly.
- **Fairer entitlement check for history search** — permission to search your own history is now decided by the highest tier you hold across any research domain, so a Pro user isn't misread as free (and denied their own history) just because one domain's tier has lapsed.
- **Desktop update health check is friendlier to networks in mainland China** — the diagnostic now also probes the in-region update node and races it against the overseas one, treating either as healthy; previously it probed only the overseas node and would always report "cannot reach the update host" from within China even though updates were served fine in-region.

## 0.3.27 — 2026-08-11

- **HE 切片查看器改为真·深度缩放**:此前把整张切片渲染成一张定分辨率图片、前端用 CSS 放大,超过约 2 倍就发糊;现在改为按需生成对应层级的清晰瓦片,像 NDP.view / QuPath 那样平滑放大。
- **流式工作区上传**:大文件上传改为流式,不再一次性占用内存。
- **支持 DeepSeek V4 的推理模式**:可通过自定义供应商启用 DeepSeek V4 的 reasoning。
- **Windows 解释器选择器能找到 conda 环境**:在 Windows 上正确发现 conda 环境。
- **自更新更稳**:重启前先恢复被替换的可执行文件路径(仅在确认新文件存在后处理),避免更新后找不到自身。
- **会话上下文解析修复**:更准确地准备约束引用、复位新一轮状态并收敛缓存清理范围。
- **CLI 与 Web 之间交接工作区与会话**。

- **True deep-zoom in the HE slide viewer** — previously the whole slide was rendered to a single fixed-resolution image and enlarged with CSS, which got blurry past ~2×; it now serves sharp tiles at the appropriate level on demand, zooming smoothly like NDP.view / QuPath.
- **Streamed workspace uploads** — large-file uploads now stream instead of being held in memory all at once.
- **DeepSeek V4 reasoning support** — DeepSeek V4's reasoning mode can be enabled via custom providers.
- **The Windows interpreter picker finds conda environments** — conda envs are now discovered correctly on Windows.
- **More robust self-update** — the replaced executable path is restored before restart (only once the new file is confirmed present), so the app can always find itself after an update.
- **Conversation context resolution fixes** — constraint references are prepared more accurately, per-turn state is reset, and cache cleanup is scoped more tightly.
- **Workspace and session hand-off between the CLI and the web app**.

## 0.3.26 — 2026-08-10

- **上下文用量统计更准**:token 统计按实际生效的历史上报,与真正送进 prompt 的内容一致。
- **CLI 选择器滚动时保持高亮**:滚动候选列表时当前选中项不再消失。
- **SSH 分叉会话保留上下文**:从 SSH 远程连接分叉会话时,继承的上下文得以保留。

- **More accurate context-usage stats** — token counts are reported against the history that actually takes effect, matching what is really sent into the prompt.
- **The CLI picker keeps its highlight while scrolling** — the current selection no longer disappears when scrolling the candidate list.
- **SSH forked conversations keep their context** — forking a conversation from an SSH remote connection now preserves the inherited context.

## 0.3.25 — 2026-08-08

- **修复 Anthropic OAuth(Claude Code 形态)登录**:按 Claude Code 的请求形态发起 Anthropic OAuth,登录不再失败;中继探测也改用当前活动的 Anthropic 模型。
- **CLI 连对本地 Core、跟随其上报端口**:CLI 复用预期的本地 Core 实例并跟随它实际上报的端口(端口即使未变也能唤醒监听),避免连错实例或端口漂移。
- **工作区可新建文件夹**:工作区选择器/文件浏览器现在能直接创建目录。
- **远程更新时保护进行中的工作**;回放的 SSH 导出改走命名连接。
- **文件保存/重命名/移动按会话工作区隔离**:保存、重命名、移动文件时的相对路径按当前会话自己的工作区解析(与打开文件一致)——从图表打开的 notebook 会存回该会话的工作区,而不是内核启动目录;越界写入保护照旧,会话内写入无法逃出其工作区。

- **Fixed Anthropic OAuth (Claude Code style) sign-in** — Anthropic OAuth is now initiated in the shape Claude Code expects, so sign-in no longer fails; relay probing also uses the currently active Anthropic model.
- **The CLI connects to the right local Core and follows its reported port** — the CLI reuses the intended local Core instance and follows the port it actually reports (waking the listener even when the port is unchanged), avoiding wrong-instance connections and port drift.
- **Create folders in the workspace** — the workspace picker / file browser can now create directories directly.
- **In-progress work is protected during remote updates**; replay's SSH export now goes over a named connection.
- **File save / rename / move are scoped to the conversation's workspace** — relative paths for saving, renaming, and moving files now resolve against the current conversation's own workspace (matching how files are opened) — a notebook opened from a figure is saved back into that conversation's workspace rather than the kernel's startup directory; the existing out-of-bounds write protection still applies, so writes within a conversation cannot escape its workspace.

## 0.3.24 — 2026-08-06

- **远程内核的文件下载改为流式传输**:远程内核下载文件时改经 WebSocket 桥接流式传输,大文件不再一次性占用内存。
- **模型 API 契约对齐**:请求/响应字段按各家当前的接口契约校准,减少新模型上的兼容问题。
- **并发远程启动不再互相覆盖**:每次远程启动的日志与 PID 文件按启动唯一命名,并发启动不再抢占彼此的 PID;失败的启动会在退出时清理自己的临时文件。
- **目录订阅缓存状态更一致**:保持订阅缓存的一致性,避免刷新时状态错乱。

- **Streamed file downloads from remote kernels** — downloading a file from a remote kernel now streams over the WebSocket bridge, so large files no longer have to be held in memory all at once.
- **Model API contract alignment** — request/response fields are calibrated to each provider's current API contract, reducing compatibility issues with new models.
- **Concurrent remote launches no longer clobber each other** — each remote launch's log and PID file is uniquely named per launch, so concurrent launches don't steal each other's PID; a failed launch cleans up its own temp files on exit.
- **More consistent catalog subscription cache** — subscription cache state is kept consistent to avoid it getting confused on refresh.

## 0.3.23 — 2026-08-05

- **长任务不再因反复压缩上下文而中途卡死**:上下文压缩此前每轮硬性最多 2 次,即使一次压缩已经把上下文大幅缩小,仍可能因"压完还是偏大"直接把这一轮判死;现在改为根据"压缩是否真的在起作用"来决定是否继续,并修复了一处会把关键查找信息一并压掉的路径。
- **并行/嵌套工具的进度归因更准**:进度显示为每次工具执行保留正确归因,不再把并行或嵌套工具的进度错挂到别处。
- **更安全地检查与恢复「无主」会话**:对没有明确归属的旧会话提供只读检查与安全的重新认领,仅在确认这份数据从未被别的账号共用过时才认领,确认属于别人的会话保持不动。

- **Long tasks no longer stall on repeated context compaction** — context compaction was capped at 2 attempts per turn, so even when a single pass had already shrunk the context substantially, the turn could still be killed for being "too large after compacting"; it now continues based on whether compaction is actually making progress, and a path that could compact away key lookup information is fixed.
- **More accurate progress attribution for parallel/nested tools** — the progress display keeps the correct attribution for each tool execution instead of mis-attaching parallel or nested tool progress.
- **Safer inspection and recovery of "ownerless" conversations** — older conversations without a clear owner get a read-only inspection and a safe re-claim path, claimed only when the data was never shared with another account; conversations confirmed to belong to someone else are left untouched.

## 0.3.22 — 2026-08-04

- **新模型不再退化成 32K 上下文**:供应商 `/models` 返回的能力信息此前被丢弃,导致每个新模型都落回通用 32K 默认窗口;现在保留一小组通用能力元数据(不含定价等易变字段），新模型的真实上下文窗口得以正确显示。
- **排队消息不再丢附加图片**:排队期间贴的图片此前会在恢复排队消息时被悄悄覆盖丢失;现已修复,并顺带整理了 CLI 与 App 之间的队列/跨端会话对齐。
- **图表 PDF 里的文字可再编辑**:自动导出的图表 PDF 改用 TrueType 字体,在 Illustrator 等工具里文字可编辑(此前为不可编辑的 Type 3)。
- **目录「刷新」按钮真正刷新**:手动刷新不再被后台的缓存捷径接住,现在保证真的向服务端请求一次。
- **新增按连接的远程 OAuth**:可直接在某台已连接的远程内核上完成 OAuth 登录,凭据由那台机器自己持有和续期。
- **安全恢复「无主」会话**:账号隔离上线前留下的旧会话有了安全的重新认领路径,仅在确认数据从未被别的账号共用时才认领,属于别人的会话保持原样。
- **停止远程内核时清理更彻底**:改为对整个进程组发信号,顺带收掉旧版包装脚本遗留的孤儿内核进程。

- **New models no longer degrade to a 32K context** — capability info from the provider's `/models` endpoint was being discarded, so every new model fell back to a generic 32K window; a small set of general capability metadata (no volatile fields like pricing) is now retained, so new models show their real context window.
- **Queued messages no longer drop attached images** — images added while a message was queued could be silently overwritten and lost when the queued message was restored; fixed, along with tidying up queue / cross-device session alignment between the CLI and app.
- **Text in exported chart PDFs is editable again** — auto-exported chart PDFs now use TrueType fonts, so text is editable in tools like Illustrator (previously non-editable Type 3).
- **The catalog "Refresh" button actually refreshes** — a manual refresh is no longer caught by the background cache shortcut and now always asks the server.
- **Per-connection remote OAuth** — you can complete an OAuth sign-in directly on a connected remote kernel, with the credentials held and renewed by that machine.
- **Safe recovery of "ownerless" conversations** — older conversations left before account isolation now have a safe re-claim path, claimed only when the data was never shared with another account; conversations confirmed to belong to someone else are left untouched.
- **Cleaner shutdown of remote kernels** — stopping a remote kernel now signals the whole process group and also reaps orphaned kernel processes left by an older wrapper script.

## 0.3.21 — 2026-08-03

- **远程内核更新后不再误报「已更新」**:更新判断改为探测「实际在跑的运行时」版本,而不是磁盘上的可执行文件——新文件已就位、但内核进程还是旧版本时,连接界面现在会正确进入更新流程;同时修复了终止信号未被转发、导致原生内核进程被落下、继续占用端口的问题。
- **迭代发现(campaign)三方面改进**:正确性——补齐了此前未真正生效的几处判据、修正标准化相关的判定失真、并区分「结果是自己测出来的还是从文献读到的」;性能——大幅优化拟合与整批读取的耗时,大规模候选空间也能跑;工作流——探索性工作时会主动开始记录,新建记录不再强制先声明优化目标。
- **Windows 稳定性**:修复一处会导致 Windows 版内核编译不出来的问题。

- **Remote kernels no longer falsely report "up to date"** — the update check now probes the *running* runtime's version rather than the on-disk executable, so when a new file is in place but the kernel process is still the old version, the connection screen correctly enters the update flow; also fixes termination signals not being forwarded, which could leave the native kernel process orphaned and holding its port.
- **Iterative-discovery (campaign) improvements across three areas** — correctness: several criteria that weren't actually taking effect are now wired in, a normalization-related distortion is fixed, and results now distinguish "measured here" from "read from the literature"; performance: fitting and full-record reads are much faster, scaling to large candidate spaces; workflow: exploratory work now starts a record on its own, and creating a record no longer forces you to declare an optimization goal up front.
- **Windows stability** — fixed an issue that could prevent the Windows kernel from building.

## 0.3.20 — 2026-08-01

- **修复:某些情况下助手「什么都没回」**——一次内部写入竞争会在回答开始输出之前就让整轮失败;现在这类非关键写入失败不再中断本轮。
- **修复:非默认工作区里的图表打不开**——图片现在按会话自己的工作区解析,而不是内核启动时的固定目录(文件一直好好在磁盘上)。

- **Fixed: the assistant occasionally "returned nothing"** — an internal write race could fail the whole turn before the answer began streaming; such non-critical write failures no longer interrupt the turn.
- **Fixed: figures wouldn't open in a non-default workspace** — figures now resolve against the conversation's own workspace rather than the kernel's fixed startup directory (the files were always safely on disk).

## 0.3.19 — 2026-07-31

- **目录同步大幅省流量**:agent/skill 清单同步改为协商 gzip 压缩(同一份清单从 28KB 降到约 6KB),内容没变时用条件请求换回空响应,不再重复下载已有字节。
- **服务端主动推送目录更新**:管理端改动后,在线内核会被直接通知并立即同步对应类别,不必等下一次轮询;定时轮询保留为兜底。
- **续期不再顺带重拉整个目录**:只有权益真的变动(升级/降级/新购一个研究领域)才立即重同步,权益不变时不再无谓重拉。
- **每个请求带上版本号**:内核访问云端时带上 `omicos-core/<版本>`,便于线上排查区分内核版本。
- **Notebook Copilot 锁定当前选中单元格**:每轮以编辑器里选中的单元格为准,过期坐标直接拒绝而非猜测;单元格编号改为与编辑器一致的从 1 开始。

- **Much leaner catalog sync**: agent/skill catalog sync now negotiates gzip (a catalog dropping from ~28KB to ~6KB) and uses conditional requests to get an empty response when nothing changed, instead of re-downloading bytes it already has.
- **Server-pushed catalog updates**: after an admin change, online kernels are notified directly and sync the affected category immediately, without waiting for the next poll; periodic polling remains as a fallback.
- **Renewal no longer re-pulls the whole catalog**: a full re-sync happens only when entitlements actually change (upgrade / downgrade / buying a new research domain), not on every credential renewal.
- **A version header on every request**: the kernel now identifies itself as `omicos-core/<version>` when calling the cloud, making it possible to tell kernel versions apart when investigating issues.
- **Notebook Copilot locks to the selected cell**: each turn targets the cell selected in the editor and refuses stale coordinates instead of guessing; cell numbers now start at 1 to match the editor.

## 0.3.18 — 2026-07-26

- **文件搜索更省、结果可完整取回**:搜索新增「只列匹配文件」「按文件计数」两种模式,便于先廉价定位再钻入内容;当内联结果被截断时,完整结果会写到临时文件供取回。
- **更可靠的会话保存与损坏历史恢复**:会话库写入加了跨进程锁与原子替换,保存失败时如实报错而非留下半截;并能从可解析的旧历史恢复标题与正文,覆盖前先备份。
- **委派的专家用自己的技能**:被委派的 agent 现在按它自己的授权集运行,而不是发起这一轮的 agent 的。
- **Notebook Copilot 更安全**:每次改写/执行都绑定到当前锁定的 notebook 与已校验的单元格,信息过期即安全拒绝,并采用带完整性校验的原子保存,避免切换标签或同步把操作误导到别的 notebook。
- **Windows 稳定性**:修复根目录/驱动器路径导致内核起不来的问题(含从 `E:\` 保存后被历史损坏成裸 `E:` 的工作区),内核中断时干净地清理整棵进程树。
- **登录后不再被暂显为 Community**:CLI 登录后权限就绪前,Pro 用户不会被短暂判成社区版。
- **诊断更清楚**:分别报告「网络可达」与「登录鉴权」,并且绝不输出任何令牌或身份信息。

- **Leaner file search with retrievable full results**: search adds "list matching files only" and "count per file" modes for cheap location before drilling into content; when the inline result is truncated, the full result is written to a temp file you can retrieve.
- **More reliable conversation saves and corrupted-history recovery**: the conversation store now uses a cross-process lock and atomic replacement, reports errors honestly instead of leaving a half-written file, and can recover titles and content from parseable legacy history (with a backup before overwrite).
- **Delegated experts use their own skills**: a delegated agent now runs under its own authorizations rather than the agent that started the turn.
- **Safer Notebook Copilot**: each edit/execution is bound to the currently pinned notebook and verified cells, safely refuses when that information is stale, and saves atomically with an integrity check — so switching tabs or a sync can't redirect an action to a different notebook.
- **Windows stability**: fixed root/drive paths that could stop the kernel from starting (including workspaces saved from `E:\` and historically corrupted to a bare `E:`), and clean whole-process-tree cleanup on kernel interrupt.
- **No brief "Community" after sign-in**: Pro users are no longer momentarily treated as Community while permissions initialize after a CLI login.
- **Clearer diagnostics**: network reachability and login authentication are reported separately, and no token or identity information is ever printed.

## 0.3.17 — 2026-07-24

- **更聪明的会话标题**:新会话在第一轮完成后由模型生成一个简洁标题(侧边栏动画更新),不再只是截断你的第一句话;并保护无法读取的历史、恢复会话标题。
- **文件搜索更快更干净,并修复超大会话拖垮云同步**:文件搜索 / 通配 / 列目录改用更强的引擎,统一忽略 `.omicos`、`node_modules`、`target` 等目录,搜索输出加了上限——修复了个别会话因体积异常膨胀(数百 MB)而云同步卡死的问题。
- **同步自愈**:遇到异常巨大的单条记录时自动修复,不再无限重试、卡住整个同步。

- **Smarter conversation titles**: a new conversation gets a concise model-generated title after its first turn (the sidebar animates the update), instead of just truncating your first message; unreadable history is protected and conversation titles are restored.
- **Faster, cleaner file search, and a fix for oversized conversations stalling cloud sync**: file search / glob / list now use a stronger engine, consistently ignore directories like `.omicos`, `node_modules` and `target`, and cap search output — fixing cases where a conversation grew abnormally large (hundreds of MB) and jammed cloud sync.
- **Self-healing sync**: an abnormally large single record is now repaired automatically instead of retrying forever and stalling the whole sync.

## 0.3.16 — 2026-07-23

- 本次更新修复了服务器连接 bug。
- This update fixes a server connection bug.

## 0.3.15 — 2026-07-22

- **MCP 服务器可以带界面了(MCP Apps)**:支持 MCP 服务器提供交互式界面并在对话中渲染;已渲染的界面在该回合结束后仍能继续调用其工具。
- **可以用本地路径的 MCP 服务器**,并把原来含糊的「握手失败」换成明确的预检提示(目录是否存在、命令是否可执行等),不用再猜哪里配错了。
- **一键安装精选的非 npm MCP 服务器**:无需打开终端;来源固定、安装前校验文件完整性,并会先征得你的同意。
- **可安装的服务器目录改为云端下发**:新增服务器或修复失效的下载链接不再需要你升级客户端。
- **自定义供应商的上下文窗口以你的设置为准**:此前若与某个内置模型同名,你填写的窗口会被内置值悄悄覆盖,现已修正。
- **长时间运行更省资源**:修复「运行状态」进程采样在长期运行下的内存与文件句柄增长。

- **MCP servers can now ship a UI (MCP Apps)**: MCP servers may provide an interactive interface rendered inside the conversation, and a rendered app can keep calling its tools after that turn ends.
- **Use MCP servers from a local path**, with the vague "handshake failed" replaced by specific pre-flight checks (does the directory exist, is the command executable, …) so you no longer have to guess what's misconfigured.
- **One-click install for curated non-npm MCP servers**: no terminal needed; sources are fixed, file integrity is verified before install, and your consent is requested first.
- **The installable-server catalog is now served from the cloud**: adding a server or fixing a dead download link no longer requires you to update the client.
- **A custom provider's context window now wins**: if it shared a name with a built-in model, your configured window was silently overridden — fixed.
- **Lighter long-running resource use**: fixed memory and file-handle growth in the process sampler behind the runtime status view.

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
