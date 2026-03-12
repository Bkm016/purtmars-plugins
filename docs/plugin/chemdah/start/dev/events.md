---
sidebar_position: 2
---

# 事件参考

Chemdah 的所有事件均继承自 TabooLib 的 `BukkitProxyEvent`，通过 `@SubscribeEvent` 注解监听。

:::tip

`BukkitProxyEvent` 默认支持取消（`isCancelled = true`），但部分事件标注了 `allowCancelled = false`，表示该事件不可取消。

:::

## 任务事件（QuestEvents）

| 事件 | 主要字段 | 可取消 | 说明 |
| --- | --- | :---: | --- |
| `Accept.Pre` | `quest: Template`, `playerProfile`, `reason: String?` | ✓ | 任务被接受前，可修改 `reason` |
| `Accept.Post` | `quest: Quest`, `playerProfile` | ✗ | 任务接受后 |
| `Complete.Pre` | `quest: Quest`, `playerProfile` | ✓ | 任务完成前 |
| `Complete.Post` | `quest: Quest`, `playerProfile` | ✗ | 任务完成后 |
| `Fail.Pre` | `quest: Quest`, `playerProfile` | ✓ | 任务失败前 |
| `Fail.Post` | `quest: Quest`, `playerProfile` | ✗ | 任务失败后 |
| `Restart.Pre` | `quest: Quest`, `playerProfile` | ✓ | 任务重置前 |
| `Restart.Post` | `quest: Quest`, `playerProfile` | ✗ | 任务重置后 |
| `Registered` | `quest: Quest`, `playerProfile` | ✗ | 任务注册到玩家数据时 |
| `Unregistered` | `quest: Quest`, `playerProfile` | ✗ | 任务从玩家数据注销时 |
| `Agent` | `questContainer`, `playerProfile`, `agentType`, `restrict` | ✓ | 任务脚本代理执行时 |
| `DataSet.Pre` | `player`, `playerProfile: PlayerProfile`, `quest`, `dataContainer`, `key`, `value: Data` | ✓ | 任务数据设置前，可修改 `value` |
| `DataSet.Post` | `player`, `playerProfile: PlayerProfile`, `quest`, `dataContainer`, `key`, `value: Data` | ✗ | 任务数据设置后 |
| `DataRemove.Pre` | `player`, `playerProfile: PlayerProfile`, `quest`, `dataContainer`, `key` | ✓ | 任务数据移除前 |
| `DataRemove.Post` | `player`, `playerProfile: PlayerProfile`, `quest`, `dataContainer`, `key` | ✗ | 任务数据移除后 |
| `ScoreboardTrack` | `content: MutableList<String>`, `playerProfile` | ✗ | 追踪记分板内容更新时，可修改列表 |

## 条目事件（ObjectiveEvents）

| 事件 | 主要字段 | 可取消 | 说明 |
| --- | --- | :---: | --- |
| `Continue.Pre` | `objective`, `task`, `quest`, `playerProfile` | ✓ | 条目进度推进前 |
| `Continue.Post` | `objective`, `task`, `quest`, `playerProfile` | ✗ | 条目进度推进后 |
| `Complete.Pre` | `objective`, `task`, `quest`, `playerProfile` | ✓ | 条目完成前 |
| `Complete.Post` | `objective`, `task`, `quest`, `playerProfile` | ✗ | 条目完成后 |
| `Restart.Pre` | `objective`, `task`, `quest`, `playerProfile` | ✓ | 条目重置前 |
| `Restart.Post` | `objective`, `task`, `quest`, `playerProfile` | ✗ | 条目重置后 |

## 对话事件（ConversationEvents）

| 事件 | 主要字段 | 可取消 | 说明 |
| --- | --- | :---: | --- |
| `Load` | `file: File?`, `option`, `root` | ✓ | 对话文件加载时 |
| `Select` | `player`, `namespace`, `id`, `conversation?`, `source?` | ✓ | 玩家触发对话选择时，可替换 `conversation` |
| `Pre` | `conversation`, `session`, `relay` | ✓ | 对话开始前 |
| `Begin` | `conversation`, `session`, `relay` | ✗ | 对话渲染时 |
| `Post` | `conversation`, `session`, `relay` | ✗ | 对话开始后 |
| `SelectReply` | `player`, `session`, `reply: PlayerReply` | ✓ | 玩家选择回复时 |
| `Agent` | `conversation`, `session`, `agentType` | ✓ | 对话脚本代理执行时 |
| `Close` | `session`, `refuse`, `conversation` | ✓ | 对话结束前 |
| `Closed` | `session`, `refuse`, `conversation` | ✗ | 对话结束后 |
| `ReplyClosed` | `session`, `conversation` | ✗ | 玩家通过回复正常结束对话时（先于 Closed） |
| `Cancelled` | `conversation`, `session`, `relay` | ✗ | 对话被取消时 |
| `ChestThemeBuild` | `session`, `message`, `canReply`, `inventory` | ✗ | 箱子主题页面构建完成后 |

## 玩家事件（PlayerEvents）

| 事件 | 主要字段 | 可取消 | 说明 |
| --- | --- | :---: | --- |
| `Selected` | `player`, `playerProfile` | ✗ | 玩家数据加载完成 |
| `Released` | `player` | ✗ | 玩家离开服务器，可通过 `await()` 挂起异步任务 |
| `Updated` | `player`, `playerProfile` | ✗ | 玩家数据更新时 |
| `Track` | `player`, `playerProfile`, `trackingQuest?`, `cancel` | ✓ | 玩家切换任务追踪时 |
| `LevelChange` | `player`, `option`, `oldLevel`, `oldExperience`, `newLevel`, `newExperience` | ✓ | 自定义等级数据变动，可修改 `newLevel`/`newExperience` |
| `ScenesBlockBreak` | `player`, `blockData` | ✓ | 玩家破坏演出方块（默认已取消） |
| `ScenesBlockInteract` | `player`, `blockData` | ✗ | 玩家交互演出方块 |
| `Trigger` | `player`, `value: String` | ✓ | 玩家唤起 Trigger 类型任务时 |
| `DataSet.Pre` | `player`, `playerProfile`, `dataContainer`, `key`, `value: Data` | ✓ | 玩家数据设置前 |
| `DataSet.Post` | `player`, `playerProfile`, `dataContainer`, `key`, `value: Data` | ✗ | 玩家数据设置后 |
| `DataRemove.Pre` | `player`, `playerProfile`, `dataContainer`, `key` | ✓ | 玩家数据移除前 |
| `DataRemove.Post` | `player`, `playerProfile`, `dataContainer`, `key` | ✗ | 玩家数据移除后 |

## 模板事件（TemplateEvents）

| 事件 | 主要字段 | 可取消 | 说明 |
| --- | --- | :---: | --- |
| `Load` | `file: File?`, `id: String`, `root` | ✓ | 任务模板加载时 |
| `ControlHook` | `template`, `type`, `map`, `control?` | ✗ | 控制器挂钩，可通过设置 `control` 注入自定义控制器 |

## Hook 事件

用于第三方插件注册自定义实体、方块、物品或队伍的识别器。

| 事件 | 主要字段 | 说明 |
| --- | --- | --- |
| `InferEntityHookEvent` | `id: String`, `entityClass` | 注册自定义实体识别器 |
| `InferBlockHookEvent` | `id: String`, `blockClass` | 注册自定义方块识别器 |
| `InferItemHookEvent` | `id: String`, `itemClass` | 注册自定义物品识别器 |
| `PartyHookEvent` | `id: String`, `partyClass` | 注册自定义队伍实现 |
| `PlaceholderHookEvent` | `player`, `profile`, `identifier: String`, `parameter: String`, `result` | 注册自定义 Placeholder 处理器 |

## 监听示例

```kotlin title="监听任务接受与完成"
import ink.ptms.chemdah.api.event.collect.QuestEvents
import taboolib.common.platform.event.SubscribeEvent

object QuestListener {

    @SubscribeEvent
    fun onAcceptPre(e: QuestEvents.Accept.Pre) {
        // 阻止特定任务被接受
        if (e.quest.id == "forbidden_quest") {
            e.isCancelled = true
            e.reason = "该任务当前不可接受"
        }
    }

    @SubscribeEvent
    fun onComplete(e: QuestEvents.Complete.Post) {
        val player = e.playerProfile.player ?: return
        player.sendMessage("恭喜完成任务：${e.quest.id}")
    }
}
```

```kotlin title="监听玩家数据加载"
import ink.ptms.chemdah.api.event.collect.PlayerEvents
import taboolib.common.platform.event.SubscribeEvent

object ProfileListener {

    @SubscribeEvent
    fun onSelected(e: PlayerEvents.Selected) {
        // 玩家数据就绪后执行初始化逻辑
        val profile = e.playerProfile
        if (profile.persistentDataContainer["first_join"] == null) {
            profile.persistentDataContainer["first_join"] = System.currentTimeMillis().toString()
        }
    }
}
```

```kotlin title="监听对话选择"
import ink.ptms.chemdah.api.event.collect.ConversationEvents
import taboolib.common.platform.event.SubscribeEvent

object ConversationListener {

    @SubscribeEvent
    fun onSelect(e: ConversationEvents.Select) {
        // 可以在这里替换或取消对话
        if (e.player.hasPermission("vip.bypass")) {
            e.conversation = null
            e.isCancelled = true
        }
    }
}
```
