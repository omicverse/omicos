<!-- 由 scripts/release-notes.mjs 从 releases/webui/ 生成,请勿直接编辑。 / Generated from releases/webui/ by scripts/release-notes.mjs — do not edit. -->

# omicos 网页端(webui)更新记录 / Changelog

浏览器 / 桌面 App 内的界面。随桌面 App 静默 OTA 更新,无需手动操作。
The in-browser / in-desktop interface. Delivered silently via OTA with the desktop app.

> 网页端与内核是相互独立的两条发版线,版本号不共用。部分改动需配合对应版本的内核。
> The web UI and the kernel are independent release lines with separate version numbers; some changes require a matching kernel version.

---

## 0.3.9 — 2026-10-20

- 编辑精选自动发现与你研究方向相关的新课题，可查看论文来源并新建讨论；研究历史较少时提供随机探索。
- 精选按天缓存，普通版、Plus、Pro、Lab 每日分别可生成 3、10、25、30 批；生成失败不计次数。
- 新建任务页可直接选择运行位置和工作空间。

- Editorial picks automatically suggest new topics for your research, with source papers and a new-discussion shortcut. New researchers can explore a random selection.
- Picks are cached daily. Generate 3, 10, 25 or 30 batches per day on Community, Plus, Pro or Lab; failed generations do not count.
- Choose the execution location and workspace directly from a new task.

## 0.3.8 — 2026-10-20

- 个人信息页可查看云算力余额和使用流水；充值仅向获准账号开放，云端执行暂未开放。
- 建议任务卡支持展示独立任务背景，远程工作区中的子任务继续在原工作区运行。

- View cloud compute credits and usage history in your profile. Recharge is limited to approved accounts; cloud execution is not yet open.
- Suggested task cards show standalone task context, while subtasks in remote workspaces stay in their original workspace.

## 0.3.7 — 2026-10-19

- 首页新增科研方向建议和编辑精选，可查看借鉴来源、验证思路，并一键带入对话讨论。
- 推荐按天缓存，重复打开更快；后台更新时保留已有内容，也可随时手动刷新。

- Explore research directions and editorial picks on the home page, inspect their sources and validation ideas, and bring a suggestion into a conversation.
- Daily recommendation caching makes repeat visits faster. Existing suggestions stay visible during updates, with manual refresh available.

## 0.3.6 — 2026-10-19

- 新建任务页面加入轻盈的序列字符背景动效，适配深浅色主题，并保持输入区域清晰。
- 动效仅在空白对话中显示，后台暂停，并遵循系统的减少动态效果设置。

- New tasks feature a subtle sequence-inspired animated backdrop that adapts to light and dark themes while keeping the input area clear.
- The backdrop appears only in empty conversations, pauses in the background, and respects reduced-motion preferences.

## 0.3.5 — 2026-10-19

- 执行轨迹详情按字段展示参数，正文支持标题、列表和表格，代码单独呈现。
- 支持展开详情阅读长文档，也可切换到原文查看原始参数和结果。

- Trajectory details display parameters as fields, render document headings, lists and tables, and separate code blocks.
- Expand details to read longer documents, or switch to Raw to inspect the original arguments and results.

## 0.3.4 — 2026-10-19

- 执行轨迹采用单行事件和紧凑搜索栏，按轮次标记，点击事件后再展开详情，为阅读留出更多空间。
- 加载页面改为展示 OmicOS 使用小提示，涵盖快捷键、工具调用和分屏操作。

- A cleaner trajectory view with single-line events, turn boundaries, a compact search bar, and details that open on selection.
- Loading screens now show OmicOS usage tips for keyboard shortcuts, tool calls, and split views.

## 0.3.3 — 2026-10-19

- 点击当前「对话」标签，可在对话与执行轨迹之间切换，查看消息、工具调用、参数和结果。
- 执行轨迹支持搜索、按轮次浏览和实时更新；查看时任务继续运行，需要确认时可直接返回对话处理。

- Click the active Chat tab to switch between the conversation and its trajectory, with messages, tool calls, arguments and results.
- Search and browse live events by turn while tasks keep running, with a direct return to the conversation when approval is needed.

## 0.3.2 — 2026-10-19

- 左上角品牌标识更清晰：加大图标并提高浅色、深色主题下的对比度。
- 收起的图标导航栏更窄，为内容留出更多空间；保留便于点击的按钮和原有展开宽度。

- A clearer brand mark: a larger icon with stronger contrast in light and dark themes.
- A narrower collapsed navigation rail leaves more room for content while keeping comfortable click targets and the existing expanded width.

## 0.3.1 — 2026-10-19

- 在「设置 → 外观」选择侧边栏常驻入口，偏好保存在当前设备；「更多」菜单改善了深色配色和小窗口显示。
- 智能体团队与对话协作列表使用和目录一致的专属图标。
- 多行排队消息保持单行预览，操作按钮不再被挤出窗口；已缓存模型也显示最新目录名称和停用提示。

- Choose sidebar entries in Settings → Appearance, saved on this device. The More menu is clearer in dark themes and fits smaller windows.
- Agent team and conversation collaboration lists use the same individual logos as the catalog.
- Queued multiline messages stay on one preview line so controls remain visible. Cached models show the latest catalog names and retirement notices.

## 0.3.0 — 2026-10-19

- **对话侧栏改版**——每个对话一行，状态一眼可见(运行中转圈、待你确认橙点、未读绿点)；可按项目、工作区或时间分组，顶部用「全部 / 运行中 / 未读 / 待确认」快速筛选。
- **建议任务改成一行**——点「开始」就开成子对话，默认带上本对话的数据和变量；想先改一改，点「编辑任务」在原地修改后再开。
- **智能体图标**——每个智能体都有了自己的图标，智能体列表的分类标题前也加上了图标，深浅色主题下都清晰。
- **中断恢复更可靠**——网络抖动或切换后能接着显示同一轮回答，不再重复出现工具步骤；远程会话在刷新列表时保持绑定。
- **其它**——画布按对话所在的文件夹找图，不再误报「文件缺失」；模型目录暂时取不到时会自动重试，且不改动你已选的模型。

- **A redesigned conversation sidebar** — one line per conversation with its state at a glance (a spinner while running, an orange dot when it needs you, a green dot when unread). Group by project, workspace or time, and filter with All / Running / Unread / Needs you at the top.
- **Suggested tasks are a single row** — Start opens it as a child conversation that brings this conversation's data and variables along; Edit brief lets you adjust the first message in place before starting.
- **Agent icons** — every agent now has its own icon, and the agent list's category headers carry one too, legible in both light and dark themes.
- **More reliable recovery** — after a network blip or a switch the same turn picks up without repeating tool steps, and remote conversations keep their binding while the list refreshes.
- **Also** — the canvas finds figures relative to the conversation's folder, so it no longer reports them missing; when the model catalog is briefly unavailable it retries on its own without changing the model you picked.

## 0.2.79 — 2026-10-18

- **子对话与建议任务**——模型可以把一件能单独完成的事提成「建议任务」，一键开成子对话；子对话做完会把报告写回原对话，你也可以在原对话里给它发消息。设了目标(/goal)的对话会在子对话报告后自动接着做。
- **回合任务清单**——做多步任务时，模型会在对话里列一张清单并随进度逐项勾掉。
- **以上两项需要本机 Core 0.4.19 及以上**——点左下角「更新」即可升级。
- **智能体与技能目录改为「列表 + 右侧详情」**——点一项即可看到它能做什么，以及近期的使用情况。
- **设置 → 「隐私与数据」新增「允许用我的使用数据改进 OmicOS」**——默认关闭，随时可以改。
- **其它**——可选的 DeepSeek 联网搜索；每个工作区记住所选的 R 环境；文件浏览器在列目录失败后能恢复，切换对话后不再残留旧预览。

- **Child conversations and suggested tasks** — the model can propose a self-contained piece of work as a suggested task and open it as a child conversation in one click. The child's report lands back in the parent, and you can message the child from the parent; a parent with a /goal carries on by itself once a child reports.
- **Per-turn task list** — on multi-step work the model keeps a checklist in the conversation and ticks items off as it goes.
- **Both need local Core 0.4.19 or newer** — use 「更新」 at the bottom left to upgrade.
- **The agent and skill catalog is now a list with a detail pane** — pick one to see what it does and how it has been used recently.
- **Settings → 「隐私与数据」 adds 「允许用我的使用数据改进 OmicOS」** — off by default, and you can change it at any time.
- **Also** — optional DeepSeek web search; each workspace remembers its chosen R environment; the file browser recovers after a failed listing and no longer leaves a stale preview when you switch chats.

## 0.2.78 — 2026-10-15

- **海外加载更稳**——静态资源节点连不上时，页面会自动改从备用地址加载，不再停在「加载没能完成」。
- **「机器容量」卡片说清原因**——区分 Core 连不上、响应超时、版本过旧和暂无读数，不再一律显示「无法连接」。
- **修复 PDF 查看器因版本不一致打不开的问题。**
- **已下线的模型不再被选中或用于发送。**

- **Steadier loading from overseas** — if the static asset edge cannot be reached, the page now loads from a fallback address instead of stopping at "loading didn't finish".
- **The machine capacity card says why** — it now distinguishes Core unreachable, a timeout, an outdated Core and no reading yet, instead of always showing "cannot be reached".
- **Fixed the PDF viewer failing to open because of a version mismatch.**
- **Retired models are no longer selected or used for sending.**

## 0.2.77 — 2026-10-13

- **云同步停止时会说明原因**——当这台设备的同步被服务端暂停时，顶部会出现提示，请你更新到最新客户端，并说明本地数据不受影响。
- **修复本地 Core 被反复重启的问题。**
- **已删除项目的同步不再卡住**——针对已删除项目的改名或移入操作会提示未应用，然后继续同步其它内容。
- **修复登录授权(OAuth)状态与实际连接不一致的问题。**

- **Cloud sync now tells you when it has stopped** — if sync is paused for this device by the server, a banner asks you to update to the latest client and notes that local data is kept.
- **Fixed the local Core being restarted repeatedly.**
- **Sync no longer stalls on deleted projects** — a rename or move into a project that no longer exists is reported as not applied, and sync carries on.
- **Fixed OAuth sign-in state drifting from the actual connection.**

## 0.2.76 — 2026-10-12

- **网页版加载更快**——脚本与样式重新从静态资源节点加载。
- **SSH 远端对话更稳**——修复并发刷新时旧结果覆盖新结果、连接恢复后仍残留「离线」错误而无法输入的问题；重连后不再误报断开。
- **桌面端里工作区文件链接留在应用内打开。**
- **Figure Studio 缺少 Tavotto 运行时时**——会直接给出跳转到设置的入口。

- **Faster web loading** — scripts and styles are served from the static asset edge again.
- **Steadier SSH remote conversations** — fixed stale refresh results overwriting newer ones and an "offline" error lingering after the connection came back and blocking input; reconnects no longer show a false disconnect.
- **Workspace file links stay inside the desktop app.**
- **When Figure Studio is missing the Tavotto runtime** — it now offers a jump straight to settings.

## 0.2.75 — 2026-10-09

- **修复侧栏「更多」点了没反应**——面板其实已渲染，只是被侧栏裁掉；现在点开即见，收进去的「智能体」「工具」「终端」「变量」「环境」也重新可达。

- **Fixed 「更多」 doing nothing in the left rail** — the panel was rendering but clipped by the rail; it now opens properly, so 「智能体」, 「工具」, 「终端」, 「变量」 and 「环境」 are reachable again.

## 0.2.74 — 2026-10-09

- **左侧栏瘦身**——「智能体」「工具」「终端」「变量」「环境」收进侧栏底部的「更多」(「···」)；常驻的只剩「分析」「笔记本」「Figure Studio」「商城」「团队」。原有的档位与功能限制不变。

- **A shorter left rail** — 「智能体」, 「工具」, 「终端」, 「变量」 and 「环境」 now live under 「更多」 (the 「···」 at the foot of the rail); 「分析」, 「笔记本」, 「Figure Studio」, 「商城」 and 「团队」 stay pinned. Existing plan and feature gates are unchanged.

## 0.2.73 — 2026-10-09

- **「画布」回到工具页**——修复 0.2.72 丢失画布入口的问题，多图拼版、标注、裁剪、导出都在原处。Figure Studio 需要额外的 Tavotto 运行时，在它就绪前原生画布始终可用。

- **「画布」is back on the tools page** — fixes 0.2.72 dropping the canvas entry; multi-panel layout, annotations, cropping and export are where they were. Figure Studio needs an extra Tavotto runtime, and until it is in place the native canvas always works.

## 0.2.72 — 2026-10-09

- **商城新增「课程与工作空间」**——可以购买论文 1:1 复现的工作空间，付款后导入到本机目录，随包附带的课程对话点「打开对话」即可继续看。导入需要本机 Core 0.4.15 及以上。
- **Figure Studio 独立成页**——自带编辑器、Tavotto 智能体面板和 Tavotto MCP 入口，可以把工作区图片导入画布。
- **对话可靠性修复**——明确失败的子代理不再显示为成功；冷重连后不再出现两条回答；云端会话的上下文统计恢复显示。
- **侧边聊天支持语音输入**——识别的文字填进草稿，不会自动发送；浅色主题下发送按钮显示正常。
- **窄输入区收成图标**——宽度不够时按钮隐去文字、只留图标，提示和无障碍名称保留。
- **其它**——启动登录更稳；浅色主题下工作区预览里的嵌套代码不再看不清。

- **The store gains 「课程与工作空间」** — buy a 1:1 paper-reproduction workspace, import it into a local directory after payment, and open the bundled course conversations with 「打开对话」. Import needs local Core 0.4.15 or newer.
- **Figure Studio is now its own page** — with the editor, the Tavotto agent panel and the Tavotto MCP entry, plus importing workspace images onto the canvas.
- **Conversation reliability fixes** — a sub-agent that failed no longer shows as successful; a cold reconnect no longer produces a duplicate answer; context statistics are back for cloud sessions.
- **Voice input in side chat** — recognised text goes into the draft and is not sent automatically; the send button now renders correctly in the light theme.
- **A narrow composer collapses to icons** — controls drop their labels when space is tight, keeping tooltips and accessible names.
- **Also** — steadier startup sign-in; nested code in the light theme's workspace preview is readable again.

## 0.2.71 — 2026-10-03

- **实验室版报价写清楚了**——卡片和购买弹窗显示该账号适用「学术价」还是「标准价」、每席单价、年付/月付和最少席位数。学术优惠按购买账号的机构与邮箱识别，同一团队成员可能看到不同报价。
- **修复设置里 OAuth 登录状态显示错误**——切换运行时或供应商后，迟到的响应不再写进错误的卡片；自定义供应商的草稿只在切换供应商时清空。
- **远端连接的 OAuth 对话框更稳**——关闭后不会被迟到的响应重新弹出，也不会重复轮询。

- **Lab plan pricing is explicit** — the card and purchase dialog show whether this account gets the academic or standard price, the per-seat price, yearly/monthly, and the seat minimum. Academic pricing follows the buying account's institution and email, so teammates may see different quotes.
- **Fixed OAuth sign-in in settings showing the wrong state** — after switching runtime or provider, late responses no longer write into the wrong card; a custom provider's draft is cleared only when the provider changes.
- **A steadier remote-connection OAuth dialog** — a closed dialog is no longer revived by a late response, and polls no longer overlap.

## 0.2.70 — 2026-10-02

- **画布可以放进你自己的图**——拖入文件、「从电脑导入」或「从工作区打开」；PDF 和 SVG 正常渲染，面板按图本身的比例显示。
- **画布新增标注与页面设置**——文字、方框、箭头、引线和裁剪；「页面」里可选版面尺寸、背景色、标尺和网格吸附(不进导出)。画布助手可以照着导入的图用合成数据重写绘图脚本。
- **证据模式回复更干净**——机器可读的记录不再显示为原始 JSON。
- **以上画布功能需要 Core 0.4.13 及以上**——0.4.11 / 0.4.12 上画布仍可用，但 PDF/SVG 面板显示为灰块。

- **Bring your own figure into the canvas** — drop a file, "Import from computer" or "Open from workspace"; PDF and SVG render properly and panels keep the figure's own proportions.
- **Canvas annotations and page settings** — text, boxes, arrows, leader lines and cropping; the Page tab offers page sizes, background colour, rulers and grid snapping (never exported). The figure assistant can rewrite a plotting script from an imported figure using synthetic data.
- **Cleaner evidence-mode replies** — machine-readable records no longer appear as raw JSON.
- **These canvas features need Core 0.4.13 or newer** — on 0.4.11 / 0.4.12 the canvas still works, but PDF/SVG panels show as grey blocks.

## 0.2.69 — 2026-10-01

- **画布支持多图拼版**——一页放多张图，可拖动、缩放或按毫米精确定位，调层级、锁比例、固定、一键平铺，改页面尺寸；每一步都可撤销。需要 Core 0.4.11 及以上。
- **小改进**——打开对话时显示「正在打开」；「免费模型」视图说明它与普通入口共用供应商和 API Key；内置 PDF 查看器起不来时退回逐页渲染并注明是降级显示。

- **Multi-figure layout on the canvas** — put several figures on one page; drag, resize or position them in millimetres, reorder, lock aspect ratio, pin, tile into a grid, and change the page size. Every step can be undone. Needs Core 0.4.11 or newer.
- **Smaller improvements** — the conversation list shows "opening" while a chat loads; the "Free models" view explains it shares the provider and API key with the normal one; when the built-in PDF viewer cannot start, the preview renders pages itself and says it is a degraded view.

## 0.2.68 — 2026-09-28

- **画布编辑器重做**——分析出的图可以直接改标题、轴标签、刻度、图例的文字、字号、颜色和位置，由内核真实重绘。需要 Core 0.4.11 及以上。
- **输入框语音听写**——按住说话，松开转成可编辑文字，不会自动发送。macOS 需要更新到下一个桌面端版本才能使用。
- **聊天链接显示预览卡片。**
- **其它**——模型选择器只显示当前模型真实支持的思考档位；修复切换对话后发送目标跑错、以及 macOS 窗口拖拽区域失效的问题。

- **A rebuilt canvas editor** — edit an analysis figure's title, axis labels, ticks and legend (text, size, colour, position) in place, re-rendered by the core. Needs Core 0.4.11 or newer.
- **Dictation in the composer** — hold to speak, release for editable text; nothing is sent automatically. On macOS this needs the next desktop build.
- **Links in chat show a preview card.**
- **Also** — the model picker shows only the reasoning levels the current model supports; fixed the send target following the wrong conversation after switching chats, and window dragging on macOS.

## 0.2.67 — 2026-09-22

- **设置 → MCP 服务器新增「Paper2Agent 社区」**——浏览社区发布的论文工具，下载后先核对 SHA-256 再一键安装，装好在对话里 @ 即可使用，也可分享给实验室。需要 Core 0.4.9 及以上；安装会运行第三方代码，哈希只验证文件与目录记录一致。
- **免费云端模型出错时说清楚**——被限流或暂不可用时给出说明和「去配置 API Key」的入口；选中免费模型时提示其共享额度与高峰限流。

- **Settings → MCP servers adds a "Paper2Agent community" tab** — browse community paper tooling, verify the SHA-256 on download, install in one step, @-mention it in chat, and optionally share it with your lab. Needs Core 0.4.9 or newer; installing runs third-party code, and the hash only proves the file matches the catalog record.
- **The free cloud model explains failures** — when rate-limited or unavailable it says so and offers to configure your own API key; while selected, a note explains its shared budget and peak-hour limits.

## 0.2.66 — 2026-09-20

- **@ 可以点名 MCP 服务器**——被 @ 的服务器会作为明确指示进入本轮，委派给子智能体时也会带上。界面上统一使用服务器自己声明的名称和 MCP 标识。
- **Paper2Agent**——从输入框的「+」把论文的配套代码装成 MCP 服务器；设置里标明每个服务器的来源，论文安装的可以分享给实验室或撤回。
- **修复状态读取失败时误显示「正在启动本地运行时」。**
- **其它修复**——模型菜单的键盘导航与滚动；已退役模型不再出现在选择器中；以及若干显示问题。

- **@ can name an MCP server** — a mentioned server enters the turn as an explicit instruction and travels with delegated tasks. The interface now uses each server's declared name and a single MCP mark.
- **Paper2Agent** — install a paper's companion code as an MCP server from the composer's 「+」; settings show where each server came from, and paper-installed servers can be shared with your lab or withdrawn.
- **Fixed a failed status read showing as "starting the local runtime".**
- **Other fixes** — keyboard navigation and scrolling in the model menu; retired models no longer appear in the picker; several display fixes.

## 0.2.65 — 2026-09-15

- **PDF 精准解析**——设置的搜索页可以填写 MinerU Token，用于更精确地解析 PDF 的版面、公式和表格；不填则自动使用本地解析。
- **环境选择器显示已注册的 Python 内核。**
- **首次打开 PDF 更快。**
- **已下线的 Moonshot 模型不再可选。**

- **Precise PDF parsing** — the Search page in settings accepts a MinerU token for more precise parsing of PDF layout, formulas and tables; without one, PDFs use the local parser automatically.
- **The environment picker lists registered Python kernels.**
- **The first PDF opens faster.**
- **Retired Moonshot models can no longer be selected.**

## 0.2.64 — 2026-09-13

- **材料科学工作台**——新增晶体结构查看器和谱图工作台，支持原位(operando)热图与等效电路。
- **设置新增「桌面代理」**——可为本地 Core 及其运行的工具单独设置 HTTP(S) 代理，并支持检测系统代理。
- **修复工作区内核控制按钮和已配置模型从选择器消失的问题。**
- **分享工作区变量前会先提醒。**

- **Materials workbench** — a crystal structure viewer and a spectra workbench with operando heatmaps and equivalent-circuit fitting.
- **Settings adds 「桌面代理」** — set an HTTP(S) proxy just for the local Core and the tools it runs, with system proxy detection.
- **Fixed workspace kernel controls and configured models disappearing from the picker.**
- **You are warned before sharing workspace variables.**

## 0.2.63 — 2026-09-11

- **对话搜索**——按标题搜索全部项目的对话(含已归档)。
- **修复内联图片路径被错误拼接到输出目录的问题。**

- **Conversation search** — search conversations by title across all projects, archived ones included.
- **Fixed inline image paths being wrongly joined to the output directory.**

## 0.2.62 — 2026-09-09

- **切换 Python 环境更可靠**——选择新环境后工作目录与内核同步切换，远端解释器不匹配时会直接报错。
- **连接状态更准确**——输入框不再把等待提交误报为「远程离线」。
- **修复分子查看器后台同步卡住、导致新对话发不出去的问题。**
- **证据模式**——列出没能落实的来源，并标出未核验或已撤稿的引用。

- **More reliable Python environment switching** — the working directory and kernel follow a newly chosen environment, and a mismatched remote interpreter is reported as an error.
- **More accurate connection status** — the composer no longer reports a pending submit as "remote offline".
- **Fixed molecule viewer sync hanging and blocking new conversations.**
- **Evidence mode** — lists sources that could not be grounded and flags unverified or retracted citations.

## 0.2.61 — 2026-09-08

- **按账号隔离本地数据**——切换账号或退出后，本地记忆状态随之重置，不会带到另一个账号。
- **修复同时提及项目文件和本轮输出文件时，项目文件路径被加错前缀的问题。**
- **修复笔记本侧栏与 Copilot 面板的宽度和标签显示。**

- **Local data scoped to the account** — switching accounts or signing out now resets local memory state, so it does not carry over to another account.
- **Fixed project file paths getting the wrong prefix when a message mentions both project files and this turn's output files.**
- **Fixed the notebook sidebar and Copilot panel width and labels.**

## 0.2.60 — 2026-09-07

- **宠物伙伴**——新增 XiXi、HuaHua、MoMo 三只应用内伙伴。
- **对话导航栏**——每条用户消息一个刻度，预览只显示你发的内容。
- **模型目录更新**——新增 GPT-6 Astra、Grok 4.6、Gemini 3.8 Flash 与 OpenCode Zen/Go；新装默认使用 OmicOS 云端模型。
- **登录与连接修复**——退出后重新登录不再变成「未登录」；模型偏好同步失败时不再误显示已保存；附件按会话所在工作区上传。

- **Companions** — three in-app companions: XiXi, HuaHua and MoMo.
- **Conversation navigation bar** — one tick per user message, with previews showing only what you sent.
- **Model catalog update** — adds GPT-6 Astra, Grok 4.6, Gemini 3.8 Flash and OpenCode Zen/Go; fresh setups default to the OmicOS cloud model.
- **Sign-in and connection fixes** — signing back in after logout no longer shows "not signed in"; a failed model preference sync no longer shows as saved; attachments upload to the conversation's own workspace.

## 0.2.59 — 2026-09-04

- **「雪白」主题配色更柔和**——用调校过的中性色替代纯灰。
- **修复**——附件保留原始文件名；流式输出时也遵循工具显示样式；文件操作始终限定在工作区内。

- **A softer Snow theme** — a tuned neutral palette replaces pure grey.
- **Fixes** — attachments keep their original filenames; the tool display style is honoured while streaming; file actions stay bound to the workspace.

## 0.2.58 — 2026-09-03

- **「订阅服务」更名为「商城」**——并新增「服务器」页签，可选购合作方提供的云服务器。

- **「订阅服务」 is now 「商城」** — with a new 「服务器」 tab offering cloud servers from a partner.

## 0.2.57 — 2026-09-03

- **工具面板由对话驱动**——智能体作答时自动打开对应面板，并接上内核里已加载的数据；也可以从对话记录里重新打开。
- **划词翻译**——选中文字即可翻译(PDF 里也可以)，注明所用模型，并有 DeepL/Google 兜底。
- **分子查看器**——新增剖面、标注和光照，智能体发出的视图命令能正确作用到查看器。
- **新增「雪白」浅色主题。**

- **Tool panels follow the conversation** — the matching panel opens when its agent answers and picks up data already loaded in the kernel; you can also reopen it from the transcript.
- **Selection translate** — select text to translate it (in PDFs too), with the model named and DeepL/Google as fallback.
- **Molecule viewer** — adds cutaways, captions and lighting, and the agent's view commands now reach the viewer.
- **A new Snow (「雪白」) light theme.**

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
