---
sidebar_position: 4
---

# 事件系统

Adyeshach 提供了一个完整的事件系统，用于监听和处理虚拟实体的各种行为。事件系统分为以下几类：

- `[B]` **Bukkit 事件**：标准的 Bukkit 事件，可通过 `@EventHandler` 或 `@SubscribeEvent` 监听
- `[A]` **内部事件**：Adyeshach 特有事件，需通过 `Adyeshach.api().getEventBus()` 监听
- `[C]` **可取消事件**：事件可以被取消（通过设置 `isCancelled = true`）

## 实体生命周期事件

### 创建与销毁

#### [BC] AdyeshachEntityCreateEvent
当通过管理器创建新的虚拟实体时触发。
```kotlin
class AdyeshachEntityCreateEvent(
    val entity: EntityInstance,  // 被创建的实体
    var location: Location       // 创建位置
) : BukkitProxyEvent()
```

#### [BC] AdyeshachEntityRemoveEvent
当通过管理器移除虚拟实体时触发。
```kotlin
class AdyeshachEntityRemoveEvent(
    val entity: EntityInstance   // 被移除的实体
) : BukkitProxyEvent()
```

#### [B] AdyeshachEntitySpawnEvent
当虚拟实体在世界中生成时触发。

#### [B] AdyeshachEntityDestroyEvent
当虚拟实体从世界中销毁时触发。

### 玩家交互事件

#### [BC] AdyeshachEntityInteractEvent
当玩家与虚拟实体进行交互（右键）时触发。
```kotlin
class AdyeshachEntityInteractEvent(
    val entity: EntityInstance,  // 被交互的实体
    val player: Player,         // 交互的玩家
    var isMainHand: Boolean,    // 是否主手交互
    var vector: Vector          // 交互位置向量
) : BukkitProxyEvent()
```

#### [BC] AdyeshachEntityDamageEvent
当玩家攻击（左键）虚拟实体时触发。
```kotlin
class AdyeshachEntityDamageEvent(
    val entity: EntityInstance,  // 被攻击的实体
    val player: Player          // 攻击的玩家
) : BukkitProxyEvent()
```

### 实体控制事件

#### [BC] AdyeshachControllerAddEvent
当向虚拟实体添加控制器时触发。
```kotlin
class AdyeshachControllerAddEvent(
    val entity: EntityInstance,  // 目标实体
    val controller: Controller   // 被添加的控制器
) : BukkitProxyEvent()
```

#### [BC] AdyeshachControllerRemoveEvent
当从虚拟实体移除控制器时触发。

### 可见性与状态事件

#### [BC] AdyeshachEntityVisibleEvent
当虚拟实体的可见状态发生改变时触发。
```kotlin title="示例：视野检查"
@SubscribeEvent
fun onVisible(e: AdyeshachEntityVisibleEvent) {
    if (e.visible && !checkView(e.entity, e.viewer)) {
        e.isCancelled = true
    }
}
```

#### [B] AdyeshachGameProfileGenerateEvent
当生成玩家类型虚拟实体的游戏档案时触发。

### 命令相关事件

#### [B] AdyeshachEntityCreateByCommandEvent
当通过命令创建虚拟实体时触发。
```kotlin
class AdyeshachEntityCreateByCommandEvent(
    val type: EntityTypes,      // 实体类型
    val id: String,             // 实体ID
    val player: CommandSender   // 执行命令的发送者
) : BukkitProxyEvent()
```

#### [B] AdyeshachEntityRemoveByCommandEvent
当通过命令删除虚拟实体时触发。

#### [B] AdyeshachEntityCloneByCommandEvent
当通过命令克隆虚拟实体时触发。

#### [B] AdyeshachEntityRenameByCommandEvent
当通过命令重命名虚拟实体时触发。

### 标签与数据事件

#### [BC] AdyeshachTagUpdateEvent
当更新虚拟实体的标签时触发。

#### [BC] AdyeshachPersistentTagUpdateEvent
当更新虚拟实体的持久化标签时触发。

#### [BC] AdyeshachItemHookEvent
当解析物品时触发的钩子事件。
```kotlin title="示例：自定义物品解析"
@SubscribeEvent
fun onHook(e: AdyeshachItemHookEvent) {
    if (e.namespace == "myplugin") {
        e.itemStack = MyPlugin.getItem(e.source)
    }
}
```

## 预处理事件

这些事件通过 `Adyeshach.api().getEventBus()` 注册，可以在特定操作前执行自定义逻辑。

### [AC] prepareSpawn
在实体生成前的预处理。
```kotlin title="示例：ModelEngine 集成"
Adyeshach.api().getEventBus().prepareSpawn { e -> 
    !e.entity.showModelEngine(e.viewer) 
}
```

### [AC] prepareDestroy
在实体销毁前的预处理。

### [AC] prepareTick
在 tick 更新前的预处理。

### [A] prepareMove
在移动状态变更后的预处理。

### [AC] prepareTeleport
在传送前的预处理。

### [AC] prepareVelocity
在设置速度前的预处理。

### [AC] prepareMetaUpdate
在元数据更新前的预处理。

### [AC] prepareMaskedMetaGenerate
在生成 MetaMasked 前的预处理。

### [AC] prepareNaturalMetaGenerate
在生成 MetaNatural 前的预处理。

:::tip 预处理事件说明

标注为 `[AC]` 的预处理事件通过返回 `false` 来取消（拦截）该操作

:::