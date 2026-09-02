# omicos 网页端(webui)更新记录 / Changelog

浏览器 / 桌面 App 内的界面。随桌面 App 静默 OTA 更新,无需手动操作。
The in-browser / in-desktop interface. Delivered silently via OTA with the desktop app.

> 网页端与内核是相互独立的两条发版线,版本号不共用。部分改动需配合对应版本的内核。
> The web UI and the kernel are independent release lines with separate version numbers; some changes require a matching kernel version.

---

## 0.2.56 — 2026-08-28

- **审阅(自动纠错)模型选择器补上了「思考强度 / 速度」两行控制**,此前一直写死为「当前模型不支持」。现在与主对话选择器共用同一套解析:跟随对话模型时显示实际生效的档位,固定了审阅模型则显示该模型的目录默认值;审阅器的档位单独存储,不会改到主对话。(需内核 0.3.36。)
- **修复:视觉模型选「默认(跟随主模型)」保存后,重开设置却显示成免费云视觉模型**——内核现在能区分「从未配置」与「已保存为默认」,界面只在真正未配置时才预选免费模型。

- **The review (auto-correct) model picker gains thinking-strength & speed controls** — previously stuck on "not supported". It now shares the main composer's resolution logic (shows the real effective tier while following the conversation model, or a pinned reviewer model's catalog default), and stores the reviewer's tier separately from the main conversation. (Needs Core 0.3.36.)
- **Fixed: vision model set to "Default (follow main model)" showing as the free cloud model after reopening settings** — the core now distinguishes "never configured" from "saved as default", so the free model is preselected only when genuinely unconfigured.

## 0.2.55 — 2026-08-25

- **经本地转发(via-local)连接 SSH 远端时,会先确认账号身份对齐、再展示该远端的对话**,而不是先显示再补一次可能失败的同步。内核太旧、答不出这个确认的,会保持「未验证」并提示升级,不会露出可能属于别的账号的历史。仅影响 via-local 的 SSH 连接。

- **Via-local SSH connections now confirm the remote is account-aligned before showing that remote's chats**, instead of showing them first and patching sync afterward. A remote Core too old to confirm stays "unverified" with an upgrade prompt rather than risking exposure of another account's history. Only affects via-local SSH connections.

## 0.2.54 — 2026-08-24

- **重新设计了对话列表的滚动归属**:没主动上滑时一直跟随底部;一旦上滑就进入「阅读」模式,记住稳定的消息锚点与像素偏移(按账号 / 工作区 / 会话持久化),切换、刷新、重启都能回到原处。
- **真实执行 Python/R/shell 的工具卡补齐了源码 / 输出的展开、收起、复制**(复制取完整源码而非折叠后可见的一截)。
- **审阅(自动纠错)可固定一个独立于对话的模型**(composer 新增「审阅模型」pill,需内核 0.3.36);笔记本侧栏 NbCopilot 也能单独选择并记住自己的模型。
- **修复了几处会话切换的时序问题**(不再误把远端会话标成本地;打开未加载的对话不再闪屏)。

- **Reworked scroll ownership in the conversation list** — pinned to the bottom until you deliberately scroll up, then it remembers a stable message anchor and pixel offset (persisted per account/workspace/conversation) so switching, reloading, or restarting returns you to where you were reading.
- **Real Python/R/shell tool cards get full source & output expand / collapse / copy** (copy takes the full source, not the truncated view).
- **Review (auto-correct) can pin a model independent of the conversation** (a new "review model" pill in the composer; needs Core 0.3.36); NbCopilot in the notebook sidebar can also pick and remember its own model.
- **Fixed several conversation-switch timing issues** (a remote conversation is no longer mis-stamped as local; opening an unloaded conversation no longer flashes).

## 0.2.53 — 2026-08-22

- **修复:项目里的对话数量会自己跳、归属会丢**(叠加的写回时序问题 + 云端快照覆盖本地正确状态)。
- **模型上下文长度不再被低估成 32K**——供应商声明的真实能力现在按供应商缓存并用于聊天与 token 统计。
- **Antigravity OAuth 新增 Gemini 3.7 Flash(高 / 中),修正 Nemotron 3 Nano 免费版上下文。**(需内核 0.3.35。)

- **Fixed: project conversation counts jumping and ownership getting lost** (overlapping write-backs plus a cloud snapshot overwriting correct local state).
- **Model context length is no longer under-counted at 32K** — a provider's real advertised capabilities are cached per provider and used for chat and token stats.
- **Antigravity OAuth adds Gemini 3.7 Flash (high / medium); corrected the Nemotron 3 Nano free-tier context.** (Needs Core 0.3.35.)

## 0.2.52 — 2026-08-22

- **笔记本页新增 Colab 式目录**:Markdown 标题生成侧边目录、点击跳转、可折叠;含糊的「+ Cell」拆成明确的「+ 代码」「+ 文本」。
- **新增一批免费模型**(NVIDIA、Groq、Cerebras、ModelScope、OpenRouter、SiliconFlow、HuggingFace、Mistral、Google、OpenCode Zen),刷新时每个候选都会真跑一次简短对话才算可用。
- **修复**:勾选「同时删除项目记忆」时删除对话报错;绑定到非默认工作区的对话打不开图片 / 结果。
- **Google 个人账号登录改名为 Antigravity OAuth**(需内核 0.3.33)。

- **The notebook page gets a Colab-style table of contents** — Markdown headings build a side outline with click-to-jump and collapsing; the vague "+ Cell" splits into explicit "+ Code" and "+ Text".
- **A batch of free models added** (NVIDIA, Groq, Cerebras, ModelScope, OpenRouter, SiliconFlow, HuggingFace, Mistral, Google, OpenCode Zen), each verified with a short live exchange on refresh.
- **Fixed**: deleting a conversation with "also delete this conversation's project memory" erroring; figures/results not opening in a non-default workspace.
- **Google personal-account sign-in renamed Antigravity OAuth** (needs Core 0.3.33).

## 0.2.51 — 2026-08-17

- **修复:对话会自己换成限速的免费云端模型、一轮跑上几百分钟**。根因是每次发送前的「哪些 API Key 配好了」在挂着 SSH 时被问到了远端。

- **Fixed: a conversation silently switching to a rate-limited free cloud model and running for hundreds of minutes** — the pre-send "which API keys are configured" check was being answered by the remote while SSH was attached.

## 0.2.50 — 2026-08-17

- **新增「创建图片」**(输入框「+」菜单):描述画面即由模型生成,落在工作区 `outputs/` 并进入画廊;支持 OpenAI、Codex、xAI Grok、Google、智谱、通义千问、MiniMax(不支持的模型会置灰并说明原因)。
- **远程内核的运行状态改以远端实际内核池为准**,不再从「隧道是否连通」推断;停止内核也区分「已停止」与「本来就没在跑」。
- **修复:云端进程会话在一轮未跑完时被误判为已结束。**

- **New "Create image"** in the composer's "+" menu — describe it and a capable model generates it into the workspace `outputs/` and the gallery (OpenAI, Codex, xAI Grok, Google, Zhipu, Qwen, MiniMax; unsupported models are greyed out with a reason).
- **Remote-kernel running state now reflects the remote's actual kernel pool** rather than whether the tunnel is up; stopping also distinguishes "stopped" from "wasn't running".
- **Fixed: cloud-process sessions mis-detected as finished mid-turn.**

## 0.2.49 — 2026-08-16

- **修复:连接远程后流量持续偏高**——每 1.8 秒一次的「这轮还在跑吗」心跳把整段对话原样搬了回来(还重复了一份);现在只取运行状态。挂 SSH 时尤其明显。
- **DeepSeek V4 新增「首轮优化」开关**(默认开,仅新对话);并修复其在多轮工具调用中丢失推理上下文。(需内核 0.3.30。)

- **Fixed: sustained high traffic after connecting to a remote** — the every-1.8s "is this turn still running" heartbeat was hauling the whole conversation back (and duplicating it); it now carries only run state. Most noticeable over SSH.
- **DeepSeek V4 "first-turn optimization" toggle** (on by default, new conversations only), and fixed V4 losing reasoning context across multi-turn tool calls. (Needs Core 0.3.30.)

## 0.2.48 — 2026-08-15

- **修复:点「批准 / 拒绝」后按钮变灰、整轮再无下文**(决定可能被丢弃,投递失败也不恢复按钮)——两处都已堵上。
- **Windows**:修复残留锁导致的启动卡死;修复正式出图失败(内核现在自行生成并注入渲染授权密钥)。(需内核 0.3.29。)
- **桌面端只连接自己启动的那个 Core**(不再在冷启动一瞬误连另一个本机 Core);重新登录同一账号后 Core 身份会跟着同步。
- **SSH**:修复第一轮偶尔消失、远端改名被自动命名覆盖;可接管服务器上系统托管的 Core(只读,跨账号关闭)。

- **Fixed: after clicking Approve/Reject the buttons greyed out and the turn stalled** — the decision could be dropped and a failed send didn't re-enable the buttons; both are now closed.
- **Windows**: fixed a startup hang from a stale lock, and fixed figure rendering (Core now provisions and injects the renderer authority key). (Needs Core 0.3.29.)
- **Desktop connects only to the Core it started** (no longer grabbing another local Core during cold start); Core identity re-syncs after signing back into the same account.
- **SSH**: fixed the first turn occasionally vanishing and renamed remotes being overwritten by auto-naming; you can attach a system-managed Core on the server (read-only, cross-account off).

## 0.2.47 — 2026-08-13

- **项目现在有了自己的记忆**:同一项目下的对话共享结论 / 约定 / 关键产物,叠加在你的全局记忆之上,并严格按项目隔离。
- **「停止」现在能真正停下当前工作区的 Python 内核**(而非只停默认内核)。
- **修复:在某个研究域付费、另一域已到期的账号,会话检索被误当免费用户挡下**(现与服务端一致)。(需内核 0.3.28。)
- 导航与对话控件做了一轮打磨。

- **Projects now have their own memory** — conversations in a project share conclusions / conventions / key artifacts, layered on top of your global memory and strictly isolated per project.
- **"Stop" now actually stops the Python kernel of the current workspace** (not just the default one).
- **Fixed: session search wrongly blocked as a free user for accounts paid in one research domain but expired in another** (now consistent with the server). (Needs Core 0.3.28.)
- A round of navigation / conversation-control polish.

## 0.2.46 — 2026-08-11

- **输入框里用 @ 引用另一个对话当背景**——由 Core 在你自己的账号范围内重新读取真实历史(不用页面上显示的文字)。
- **病理切片查看器换成真正的深缩放画布**:放大时从 NDPI 金字塔现裁瓦片,越放越清晰。
- **可把本机文件直接上传到 SSH 远端工作区**(分块、带进度、核对字节数)。
- **Windows**:内核下拉里终于能看到自己的 conda 环境;另修多处(预览闪烁、根目录工作区、.fcs 路径输入、DeepSeek-V4 思考档、CLI→网页工作区交接)。

- **Reference another conversation as context with @** — Core re-reads the real history under your own account (not the text shown on the page).
- **The pathology slide viewer is now a true deep-zoom canvas** — sharp tiles cut from the NDPI pyramid as you zoom.
- **Upload local files straight into an SSH remote's workspace** (chunked, with progress and byte-count verification).
- **Windows**: your own conda environments finally show in the kernel picker; plus fixes (preview flicker, root-directory workspaces, .fcs path entry, the DeepSeek-V4 thinking picker, CLI→web workspace handoff).

## 0.2.45 — 2026-08-10

- **对话里的图片和文件现在能正确打开**——请求跟着文件所属的会话和运行时走,远端服务器上的文件也能直接预览。
- **文件 / 图片统一了右键菜单**(工作区中定位、下载 / 另存为、在文件管理器打开、复制路径);SSH 服务器上的文件可下载到本机。
- **SSH 会话的「从此处分支」不再报 404**(分支创建在真正持有历史的机器上)。需服务器上的 Core 一并更新。

- **Images and files in a conversation open correctly now** — requests follow the session and runtime that own the file, and remote-server files preview inline.
- **A unified right-click menu on files / images** (locate in workspace, download / save-as, open in file manager, copy path); SSH-server files download to this computer.
- **"Branch from here" in SSH sessions no longer 404s** (the branch is created on the machine that holds the history). Needs a matching Core on the server.

## 0.2.43 — 2026-08-08

- **聊天输入框有了本会话的输入历史**(行首 / 行尾按 ↑ ↓ 翻),**未发送的草稿也会持久化**(文字、引用、附件,按账号 / 工作区 / 会话)。
- **画廊可从工作区导入图片**(引用原图,不另存副本);图片的「笔记本中编辑」现在支持 SSH 远端工作区。
- 新建 / 连接时可直接建新文件夹。
- **修复**:服务器 Core 重新注册拿到新进程 id 后仍能自动改绑;身份卡按研究域分别显示套餐。

- **The composer gains per-conversation input history** (↑ / ↓ at the line edges) and **persistent unsent drafts** (text, references, attachments — per account / workspace / conversation).
- **Import workspace images into the gallery** (references to the originals, not copies); "Edit in notebook" for an image now supports SSH remote workspaces.
- Create a new folder while picking a local or remote directory.
- **Fixed**: rebinding after a server Core re-registers with a new process id; the identity card shows plans per research domain.

## 0.2.40 — 2026-08-06

- **可从工具栏 / 右键下载工作区文件**,单个或整批(边下边写、单项与整批进度、可取消)。
- **上下文用量指示器不再闪烁**;「思考强度 / 速度」菜单改为向内展开。
- **团队页重做成巡查台**;新增可浮起对照的**工作区图片画廊**。
- **修复**:CLI 设备授权页先校验登录;多处会话时序与 Windows 扩展路径修复。

- **Download workspace files** from the toolbar / right-click, singly or in batches (streamed to disk, per-file and batch progress, cancelable).
- **The context-usage indicator no longer flickers**; the thinking-strength / speed menus expand inward.
- **The team page is reworked into a review console**; a new **workspace image gallery** can float over the analysis view.
- **Fixed**: the CLI device-authorization page checks login first; assorted conversation-timing and Windows extended-path fixes.

## 0.2.31 — 2026-08-01

- **对话导航现在跟着你实际看到的位置走**(不再永远停在第一轮);新增「跳转」,「从此处开始」改叫「从此处分支」。
- **修复**:非启动目录的对话里图片显示为裂图。
- **修复(桌面版)**:笔记本状态现按实际选中的工作区隔离。
- **macOS**:窗口红绿灯位置对齐标题栏(需重装桌面端)。

- **The conversation navigator now tracks where you actually are** (no longer stuck on the first turn); "Jump" added, and "从此处开始" is renamed "branch from here".
- **Fixed**: figures showing as broken images in conversations outside the startup directory.
- **Fixed (desktop)**: notebook state is now isolated per selected workspace.
- **macOS**: the window traffic-light buttons align to the title bar (desktop reinstall required).

## 0.2.30 — 2026-08-01

- **修复:项目删除完全没反应**(不发请求、不报错、且永久)——被服务端拒绝的一次创建 / 删除也不再堵死整个同步队列。
- **修复:流式回答一边生成一边被切成一列一个词**。
- **远端笔记本不再被拽回本地**;重命名笔记本后不再「改完就断」。
- **付费后权限直接同步给运行中的内核**,不必重启。

- **Fixed: project deletion doing nothing** (no request, no error, and permanent) — and a server-rejected create/delete no longer jams the whole sync queue.
- **Fixed: streaming answers being chopped one word per line** while generating.
- **Remote notebooks stay on their remote runtime**; renaming a notebook no longer "disconnects" it.
- **Entitlements sync to a running kernel right after paying** — no restart.

## 0.2.29 — 2026-07-28

- **笔记本 Copilot 重做**:锁定你发消息时选中的那个单元格,思考时你仍可编辑,改动是精确替换并带冲突检测。
- **新增 Sanger 测序峰图查看器(.ab1/.scf)与流式细胞门控(.fcs)**,助手都能读懂并直接修改。
- **修复**:工作区图片失败后不再永久空白(自动重试);打不开的会话不再显示成空会话;Windows 盘符根 / UNC 工作区路径不再被截断。

- **Notebook Copilot reworked**: it targets the cell you had selected when you sent the message, you can keep editing while it thinks, and edits are precise replacements with conflict detection.
- **New Sanger trace viewer (.ab1/.scf) and flow-cytometry gating (.fcs)** — both readable and editable by the assistant.
- **Fixed**: workspace images retry instead of staying blank after one failure; unreadable conversations are no longer shown as empty; Windows drive-root / UNC workspace paths are no longer truncated.

## 0.2.28 — 2026-07-26

- **工具页改成卡片主页**:每个工具作为独立标签页运行,可并存、可关闭,切换标签不打断正在跑的分析。
- **新增 Motif 分子生物学工作台**(需先连接 motif MCP 服务):质粒图谱、酶切 / 凝胶、Gibson / Golden Gate、引物设计与 PCR、序列比对、Sanger、ORF / 翻译、CRISPR guide。
- **修复**:MCP 应用(如 Motif)现在能随助手结果实时更新。
- 分子查看器顶部新增带残基标尺的序列条。

- **The tools page becomes a card home** — each tool opens as its own tab, coexisting and closable, and switching tabs doesn't interrupt a running analysis.
- **New Motif molecular-biology workbench** (connect the motif MCP server first): plasmid maps, digests / gels, Gibson / Golden Gate, primer design & PCR, alignment, Sanger, ORF / translation, CRISPR guides.
- **Fixed**: MCP apps (e.g. Motif) now update live from the assistant's results.
- The molecular viewer adds a sequence bar with a residue ruler.

## 0.2.27 — 2026-07-25

- **团队版:任何人都能直接购买席位**(不再需要申请);新增只统计用量(绝不涉及对话内容)的团队控制台。
- **修复**:更新后偶尔白屏(现有启动进度条)。
- **修复**:人文社科用户的 Pro 权益被误锁(现按当前所在领域判断)。
- AI 自动生成的会话标题在侧栏以渐变动画显示。

- **Team plan: anyone can buy seats directly** (no application needed); a new team console shows per-member usage only (never any conversation content).
- **Fixed**: an occasional white screen after updating (there's a startup progress bar now).
- **Fixed**: humanities/social-science users' Pro entitlements being wrongly locked (now judged by the current research domain).
- AI-generated conversation titles animate into the sidebar.

## 0.2.22 — 2026-07-23

- **一键安装 MCP 服务器**:从服务端下发的精选目录直接拉取构建(含作者与开源许可证署名,国内走镜像加速);支持本地路径 MCP 服务器,MCP 工具返回的界面(MCP Apps)直接渲染成标签页。
- **真·左右分栏**:任意标签页可拖到右侧独立成栏,拖动中内容不重载。
- LLM 供应商改为一家一张卡;修复自定义模型上下文保存、内核在线时模型 / 技能列表偶尔空白。

- **One-click MCP server install** from a curated, server-provided catalog (with author and open-source-license attribution; CN mirror acceleration); local-path MCP servers are supported, and MCP-tool UIs (MCP Apps) render directly as tabs.
- **True split view** — drag any tab into a second column without reloading.
- One card per LLM provider; fixes for saving a custom model's context window and for the kernel model/skill list occasionally blanking.

## 0.2.21 — 2026-07-22

- **修复:切换目录领域时卡在「切换中…」**——切换现在即时完成,目录在后台刷新。
- **记忆管理**:打开一条记忆编辑时也能直接删除;手动「整理记忆」套用了新的质量标准。

- **Fixed: switching catalog domain hanging on "switching…"** — the switch is instant now and the catalog refreshes in the background.
- **Memory management**: delete a memory from within its editor; manual "organize memory" applies the new quality bar.

## 0.2.20 — 2026-07-22

- **记忆评审面板重做**:提案改为「标题 + 正文 + 分型标签 + 重要度圆点」,按来源(会话 / 做梦 / 手动)分组,更新用「改动前 / 改动后」两栏对照。
- **更聪明的做梦(Pro)**:新增耐久门——一次性的分析琐事不再被记成长期记忆,只留可复用的偏好与失败教训;一键清理旧的低质量做梦记忆(软归档、可恢复)。

- **The memory review panel is redesigned** — proposals now render as title + body with a type tag and an importance dot, grouped by source (conversation / dreaming / manual), with a before/after diff for updates.
- **Smarter dreaming (Pro)** — a durability gate keeps one-off analysis trivia out of long-term memory, keeping only reusable preferences and lessons; one-click cleanup retires old low-quality dream memories (soft-archived, recoverable).

## 0.2.14 — 2026-07-20

- **修复:SSH 远端重连后的一批问题**——502、页面卡住、远端内核启停无效,以及网络不稳时回答变空白。根因相同:对话记住的是一条会随每次重连改变的隧道编号,网络一抖就指向了已不存在的隧道。现在对话绑定的是稳定的连接名称,历史绑定会自动迁移。(需配合内核 0.3.12。)
- **新增:可把本机 API Key 同步到 SSH 服务器**。连接旁的「同步 API Key」会把你选中的 Key 复制到那台机器,让它在「走服务器」模式下用你自己的供应商——即使本机休眠或断开也能继续跑。同步前会逐条说明风险,随时可用「清除服务器上的 Key」撤回。
- **安全修复**:此前只要当前对话绑定了某台 SSH 远端,设置里读写的其实是那台远端上的密钥,而界面无任何提示。现在密钥始终属于本机,只有你主动同步并确认后才会离开这台电脑。
- **修复**:桌面端「断开并结束远端运行时」的确认框现在会正常弹出;终止时核对进程身份,不会误杀你复用的、别人已在跑的实例。
- **改进**:自定义供应商的模型按模型家族给出正确的思考等级,而非一律低 / 中 / 高。

- **Fixed: a cluster of issues after an SSH remote reconnects** — 502s, a stuck page, remote kernel start/stop doing nothing, and blank answers on a flaky network. One cause: a conversation remembered a tunnel id that changes on every reconnect. Conversations now bind to the stable connection name, and existing bindings are migrated. (Needs kernel 0.3.12.)
- **New: sync this computer's API keys to an SSH server**. "Sync API keys" copies the keys you pick to that machine so it can use your own providers in "via server" mode — and keep running while this computer is asleep or disconnected. Risks are spelled out first; "Clear keys on server" takes them back off.
- **Security fix**: previously, whenever the open conversation was bound to an SSH remote, the keys in Settings were read from/written to THAT machine, with nothing saying so. Keys now always belong to this computer and leave it only when you explicitly sync and confirm.
- **Fixed**: on desktop, the "disconnect and stop remote runtime" confirmation now actually appears; termination verifies process identity so a reused, pre-existing instance is never killed by mistake.
- **Improved**: a custom provider's models offer the thinking levels their family actually supports, instead of a single hardcoded low/medium/high.

## 0.2.13 — 2026-07-18

- **改进:断开 SSH 远端不再结束远端上正在跑的任务**。默认「断开」只关本机连接,远端内核和任务继续跑,回来重连即可接上;要真正释放服务器,用单独的「断开并结束远端运行时」(需二次确认,且只会结束由你这台客户端启动的实例)。
- **修复:SSH 远端会话的三个问题**——本地未绑定的对话不再被误标成远端进程;远端历史改名在离线镜像上不再「假成功」;桌面端删除对话现在会正常弹出确认框。
- **新增:设置里可配置 Grok 的 OAuth 登录**。

- **Improved: disconnecting an SSH remote no longer ends what's running on it**. Plain Disconnect now closes only the local connection; the remote kernel and its tasks keep running and reattach on reconnect. To actually free the server, use the separate "disconnect and stop remote runtime" (asks for confirmation, and only stops an instance your client started).
- **Fixed: three SSH-remote conversation problems** — a local unbound conversation is no longer mislabelled as a remote process; renaming a remote conversation against an offline mirror no longer reports false success; and deleting a conversation on desktop now shows its confirmation dialog.
- **New: Grok OAuth sign-in can be configured in Settings**.

## 0.2.10 — 2026-07-17

- **新增:内核「卡住还是在算」现在能看清了**。环境页某个内核旁的「AI 分析」按钮会用 py-spy 采样它的调用栈,再交给你配置的模型解读——内核长时间静默时,用来判断它是在跑耗时计算还是真卡死。(桌面端首次分析会弹系统授权对话框临时提权。)
- **改进:长会话打开更快**。会话先按最后一段消息打开,向上滚动时再按需加载更早内容。
- **修复:云端进程相关的路由**——取消 / 引导 / 记忆会话、以及「保存代码」都正确发往拥有该会话的机器;更新提示弹窗不再被侧栏裁掉。

- **New: see whether a kernel is stuck or just working**. The "AI 分析" button next to a kernel samples its call stack with py-spy and has your model read it — for when a kernel has gone quiet and you can't tell a long computation from a hang. (On desktop the first analysis asks for elevation.)
- **Improved: long conversations open faster**. A conversation opens on its most recent messages and loads earlier ones as you scroll up.
- **Fixed: cloud-process routing** — cancel / guidance / memory-session and "保存代码" now reach the machine that owns the conversation; the update popover is no longer clipped by the rail.

## 0.2.9 — 2026-07-17

- **新增:对话列表可按「来源」筛选**(本地 / 某台 SSH 远端 / 某个云端进程,可多选)。
- **新增:设置 → 关于 可回退到指定的历史稳定版**——列出经确认可安全回退的旧版本,一键装回。
- **改进:SSH 远端相关的一批修复**——关闭隧道后仍能从本地镜像只读查看远端历史;云端进程的 plan / 目标操作正确路由;诊断面板每一行标明它说的是哪台机器。

- **New: filter the conversation list by source** (this computer / a specific SSH remote / a cloud process; multi-select).
- **New: Settings → About can roll back to a named older stable build** — it lists versions confirmed safe to return to, one click to reinstall.
- **Improved: a batch of SSH-remote fixes** — a shut tunnel's history stays readable from the local mirror (read-only); a cloud process's plan/goal actions route correctly; each diagnostics row names the machine it's about.

## 0.2.8 — 2026-07-17

- **修复:SSH 远端的历史对话现在真的能用了**。上一版让它们回到侧栏,但打开是空的、删除没反应——因为操作仍问的是本机;现在打开、删除都作用到真正持有它的机器,空的 `turn_…` 条目也不再出现。
- **新增:设置 → 生物数据库 可自己填 Hugging Face 令牌与 openFDA 密钥**(前者是病理 / 蛋白基础模型的门槛,后者可选提额)。
- **其他**:Kimi Code 移到设置的「订阅」分组下,更好找。

- **Fixed: your history on an SSH remote is actually usable now**. The last release brought those conversations back, but opening one showed nothing and deleting did nothing — actions still asked this computer. Open and delete now reach the machine that holds it, and the empty `turn_…` rows are gone.
- **New: Settings → Biological databases takes your own Hugging Face token and openFDA key** (the first unlocks gated pathology/protein foundation models; the second is optional and raises rate limits).
- **Also**: Kimi Code is filed under Plans in settings, where it's easier to find.
