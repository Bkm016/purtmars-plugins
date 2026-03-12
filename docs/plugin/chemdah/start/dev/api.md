---
sidebar_position: 3
---

# API 参考

`ChemdahAPI` 是插件的主要入口，所有核心功能都从这里获取。

## 扩展属性

在 `ChemdahAPI` 的 `import` 作用域内，以下属性以扩展形式挂载在 `Player` 上：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `Player.chemdahProfile` | `PlayerProfile` | 获取玩家档案，数据未加载时抛出异常 |
| `Player.isChemdahProfileLoaded` | `Boolean` | 玩家数据是否已加载完成 |
| `Player.nonChemdahProfileLoaded` | `Boolean` | 玩家数据是否尚未加载 |
| `Player.conversationSession` | `Session?` | 获取玩家当前进行中的对话，无对话返回 null |

:::tip

`chemdahProfile` 是异步加载的。玩家刚进入服务器时数据可能还没就绪，使用前务必检查 `isChemdahProfileLoaded`，否则会抛出 `NullPointerException`。

:::

## 扩展方法

| 方法 | 说明 |
| --- | --- |
| `Player.callTrigger(value: String)` | 手动触发 `trigger` 类型条目，先触发 `PlayerEvents.Trigger` 事件 |

## ChemdahAPI 对象方法

| 方法 | 返回值 | 说明 |
| --- | --- | --- |
| `getQuestTemplate(id)` | `Template?` | 获取任务模板 |
| `getConversation(id)` | `Conversation?` | 获取已注册的对话 |
| `getConversationTheme(id)` | `Theme<*>?` | 获取对话主题 |
| `getQuestObjective(id)` | `Objective<*>?` | 获取任务目标类型 |
| `getVariable(key)` | `String?` | 读取全局变量 |
| `setVariable(key, value, append, default)` | `Unit` | 设置全局变量，`value` 为 null 时删除 |
| `getVariables()` | `List<String>` | 获取所有全局变量的 key 列表 |
| `invokeKether(source, player, vars)` | `CompletableFuture<Any?>` | 异步执行 Kether 脚本 |
| `parseFunction(source, player, vars)` | `String` | 解析 Kether 行内函数 |
| `reloadAll()` | `Unit` | 重载所有配置（对话、任务、模块等） |

## PlayerProfile 常用方法

`PlayerProfile` 是玩家数据的核心载体，通过 `player.chemdahProfile` 获取。

| 方法 | 返回值 | 说明 |
| --- | --- | --- |
| `getQuests(openAPI)` | `List<Quest>` | 获取所有进行中的任务，`openAPI = true` 时包含内部任务 |
| `getQuestById(id, openAPI)` | `Quest?` | 按 id 获取任务，未接受返回 null |
| `isQuestCompleted(id)` | `Boolean` | 检查任务是否已完成 |
| `persistentDataContainer` | `DataContainer` | 持久化数据容器，用于读写玩家自定义数据 |

## 代码示例

```kotlin title="获取玩家档案并读写数据"
import ink.ptms.chemdah.api.ChemdahAPI.chemdahProfile
import ink.ptms.chemdah.api.ChemdahAPI.isChemdahProfileLoaded

fun onPlayerJoin(player: Player) {
    if (!player.isChemdahProfileLoaded) return

    val profile = player.chemdahProfile
    val container = profile.persistentDataContainer

    // 读取数据
    val kills = container["total_kills"]?.toString()?.toIntOrNull() ?: 0

    // 写入数据
    container["total_kills"] = (kills + 1).toString()
}
```

```kotlin title="任务操作：接受、完成、失败"
import ink.ptms.chemdah.api.ChemdahAPI
import ink.ptms.chemdah.api.ChemdahAPI.chemdahProfile

fun handleQuest(player: Player) {
    val profile = player.chemdahProfile

    // 获取任务模板
    val template = ChemdahAPI.getQuestTemplate("main_quest_01") ?: return

    // 检查接受条件（不实际接受）
    template.checkAccept(profile).thenAccept { result ->
        if (result.type.isSuccess) {
            // 接受任务
            template.acceptTo(profile)
        }
    }

    // 获取进行中的任务
    val quest = profile.getQuestById("main_quest_01") ?: return

    // 完成任务
    quest.completeQuest()

    // 失败任务
    quest.failQuest()

    // 重置任务
    quest.restartQuest()
}
```

```kotlin title="触发 Trigger 类型条目"
import ink.ptms.chemdah.api.ChemdahAPI.callTrigger

fun onPlayerCraft(player: Player) {
    // 唤起所有监听 "player_crafted" 的 trigger 条目
    player.callTrigger("player_crafted")
}
```

```kotlin title="全局变量操作"
import ink.ptms.chemdah.api.ChemdahAPI

fun globalVarExample() {
    // 读取
    val count = ChemdahAPI.getVariable("server_event_count")?.toIntOrNull() ?: 0

    // 写入
    ChemdahAPI.setVariable("server_event_count", (count + 1).toString())

    // 追加（数值累加）
    ChemdahAPI.setVariable("server_kill_total", "1", append = true, default = "0")

    // 删除
    ChemdahAPI.setVariable("temp_key", null)
}
```
