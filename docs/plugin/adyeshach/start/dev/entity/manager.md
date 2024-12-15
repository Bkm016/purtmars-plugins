---
sidebar_position: 1
---

# 管理器

本文只介绍管理器 API 的使用方式，对于管理器的详细说明，请参考 **技术文档** 中的[管理器](/plugin/adyeshach/start/tech/manager)部分。

## 公共管理器

公共管理器获取方式如下，省略储存类型时默认为 `TEMPORARY` 类型。

```kotlin
val manager = Adyeshach.api().getPublicEntityManager()
```

## 私有管理器

私有管理器获取方式如下，省略储存类型时默认为 `TEMPORARY` 类型。

```kotlin
val manager = Adyeshach.api().getPrivateEntityManager(player)
```

:::caution

在未启用数据库的情况下，访问 `PERSISTENT` 类型的私有管理器会抛出异常。

:::

## 创建单位

下面列举几种创建单位的方式。

### 使用常规方法

使用最普通的方法创建单位，返回值固定为 `EntityInstance` 类型。

```kotlin
val entity: EntityInstance = manager.create(EntityTypes.PLAYER, location)
```

```kotlin
val entity: EntityInstance = manager.create(EntityTypes.PLAYER, location) {
    // 在单位生成前把它设置成傻子
    it.isNitwit = true
}
```

### 使用扩展方法

使用顶层函数创建单位，返回值根据单位类型而定。

```kotlin
val entity: AdyHuman = manager.create<AdyHuman>(location)
```

```kotlin
val entity: AdyHuman = manager.create<AdyHuman>(location) {
    // 在单位生成前把它设置成傻子
    it.isNitwit = true
}
```

:::tip

单位类型均为 `AdyEntity` 的子类，可以通过代码补全查看所有可用的单位类型。

:::

### 使用类 Bukkit 方法

使用与 Bukkit 相同的方法创建单位，上手难度低。

```kotlin
val entity: EntityInstance = world.spawnEntity(location, EntityTypes.PLAYER)
```

```kotlin
val entity: AdyHuman = world.spawn(location, AdyHuman::class.java)
```

```kotlin
val entity: AdyHuman = world.spawn<AdyHuman>(location)
```

## 编辑单位

单位的编辑方式与 Bukkit 的 `Entity` 十分相似，如下所示：

```kotlin
val armorStand = world.spawn<AdyArmorStand>(location)
armorStand.setSmall(true)
armorStand.setMarker(true)
armorStand.setBasePlate(false)
armorStand.setInvisible(true)
armorStand.setCustomName("我是傻逼")
armorStand.setCustomNameVisible(true)
```

## 删除单位

对于单位的删除有两种说法，分别为 `despawn` 和 `remove`。

- `despawn`: 销毁虚拟实体，但在管理器中保留，可通过 `respawn` 方法重新生成。
- `remove`: 销毁虚拟实体，并从管理器中移除。

源代码中的解释如下：

```kotlin
package ink.ptms.adyeshach.core.entity

...

interface EntityInstance {

    ...
    
    /**
     * 销毁实体
     * @param destroyPacket 是否销毁数据包
     * @param removeFromManager 是否从管理器中移除
     */
    fun despawn(destroyPacket: Boolean = true, removeFromManager: Boolean = false)

    /**
     * 重新生成实体
     * 如果实体已从管理器中移除则会抛出异常
     */
    fun respawn()

    /**
     * 销毁实体，并从管理器中移除
     */
    fun remove() = despawn(removeFromManager = true)
    
    ...
}
```