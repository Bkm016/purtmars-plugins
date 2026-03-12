---
sidebar_position: 1
---

# 引入依赖

Chemdah 几乎完全由 Kotlin 语言编写。在开始前，请确保你已经安装了 Kotlin 插件。

:::tip

其实用 Java 也能写，不过无法享受顶层函数带来的便利。

:::

## 仓库地址

```
https://repo.tabooproject.org/repository/releases/
```

## 添加依赖

```
ink.ptms.chemdah:api:1.1.0
```

:::tip

文档中的版本号可能会落后于最新版本，请以 [仓库](https://repo.tabooproject.org/service/rest/repository/browse/releases/ink/ptms/chemdah/api/) 中的版本号为准。

:::

如果你使用 IntelliJ IDEA，可以通过 `[Download Sources]` 下载并访问源代码。

## 基本使用

### 获取玩家 Profile

`PlayerProfile` 是玩家数据的核心载体，包含任务状态、等级数据等。

```kotlin title="获取 Profile"
import ink.ptms.chemdah.api.ChemdahAPI.chemdahProfile
import ink.ptms.chemdah.api.ChemdahAPI.isChemdahProfileLoaded

fun example(player: Player) {
    // 检查数据是否已加载（异步加载，加入时可能未就绪）
    if (!player.isChemdahProfileLoaded) return

    val profile = player.chemdahProfile

    // 读取持久化数据
    val value = profile.persistentDataContainer["my_key"]

    // 写入持久化数据
    profile.persistentDataContainer["my_key"] = "hello"
}
```

### 操作任务

```kotlin title="任务操作示例"
import ink.ptms.chemdah.api.ChemdahAPI
import ink.ptms.chemdah.api.ChemdahAPI.chemdahProfile

fun questExample(player: Player) {
    val profile = player.chemdahProfile

    // 检查是否接受了某个任务
    val quest = profile.getQuestById("main_quest_01", openAPI = false)
    println("是否接受: ${quest != null}")

    // 检查是否完成
    println("是否完成: ${profile.isQuestCompleted("main_quest_01")}")

    // 获取任务模板
    val template = ChemdahAPI.getQuestTemplate("main_quest_01") ?: return

    // 检查是否可接受（返回 CompletableFuture）
    template.checkAccept(profile).thenAccept { result ->
        println("接受检查结果: ${result.type}")
    }
}
```

## 事件监听

Chemdah 提供了一系列事件，可以通过标准的 Bukkit 事件系统监听。

```kotlin title="监听任务完成事件"
import ink.ptms.chemdah.api.event.collect.QuestEvents
import taboolib.common.platform.event.SubscribeEvent

object QuestListener {

    @SubscribeEvent
    fun onQuestComplete(e: QuestEvents.Complete) {
        val player = e.profile.player ?: return
        val questId = e.quest.id
        player.sendMessage("任务完成: $questId")
    }

    @SubscribeEvent
    fun onQuestAccept(e: QuestEvents.Accept) {
        val player = e.profile.player ?: return
        player.sendMessage("接受任务: ${e.quest.id}")
    }
}
```

:::tip

事件类均位于 `ink.ptms.chemdah.api.event.collect` 包下，可在源码中浏览完整的事件列表。

:::
