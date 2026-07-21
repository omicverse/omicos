# omicos 网页端(webui)更新记录 / Changelog

浏览器 / 桌面 App 内的界面。随桌面 App 静默 OTA 更新,无需手动操作。
The in-browser / in-desktop interface. Delivered silently via OTA with the desktop app.

> 网页端与内核是相互独立的两条发版线,版本号不共用。部分改动需配合对应版本的内核。
> The web UI and the kernel are independent release lines with separate version numbers; some changes require a matching kernel version.

---

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
