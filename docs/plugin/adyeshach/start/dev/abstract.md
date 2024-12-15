---
sidebar_position: 2
---

# 接口概述

所有 Adyeshach 的 API 都是通过接口的形式提供的，你可以通过下面的方法访问中心 API 接口：

```kotlin
package ink.ptms.adyeshach.core

object Adyeshach {

    /** 获取开发者接口 */
    fun api(): AdyeshachAPI
}
```

之后便可以在中心 API 接口中访问 Adyeshach 的所有基础 API 接口：

```kotlin
package ink.ptms.adyeshach.core

interface AdyeshachAPI {

    /** 获取公共单位管理器 */
    fun getPublicEntityManager(type: ManagerType = ManagerType.TEMPORARY): Manager
    
    /** 获取私有单位管理器 */
    fun getPrivateEntityManager(player: Player, type: ManagerType = ManagerType.TEMPORARY): Manager
    
    /** 获取单位搜索工具 */
    fun getEntityFinder(): AdyeshachEntityFinder
    
    /** 获取单位序列化器 */
    fun getEntitySerializer(): AdyeshachEntitySerializer
    
    /** 获取单位类型注册器 */
    fun getEntityTypeRegistry(): AdyeshachEntityTypeRegistry
    
    /** 获取单位元数据注册器 */
    fun getEntityMetadataRegistry(): AdyeshachEntityMetadataRegistry
    
    /** 获取单位控制器注册器 */
    fun getEntityControllerRegistry(): AdyeshachEntityControllerRegistry
    
    /** 获取 Hologram 操作工具 */
    fun getHologramHandler(): AdyeshachHologramHandler
    
    /** 获取 Kether 操作工具*/
    fun getKetherHandler(): AdyeshachKetherHandler
    
    /** 获取服务端逆向操作工具 */
    fun getMinecraftAPI(): AdyeshachMinecraftAPI
    
    /** 获取网络相关操作工具 */
    fun getNetworkAPI(): AdyeshachNetworkAPI
    
    /** 获取语言文件接口 */
    fun getLanguage(): AdyeshachLanguage
    
    /** 获取事件总线 */
    fun getEventBus(): EventBus
}
```

## 接口说明

在下面的列表中将简要介绍每个接口的作用，更多的接口说明请参考对应的接口文档。

### Manager

作为单位管理器接口，其指责在于负责虚拟实体的生成、管理或储存等。

简单来说就是下面的这些方法：

```kotlin
package ink.ptms.adyeshach.core.entity.manager

interface Manager {
   
    /** 创建单位 */
    fun create(entityTypes: EntityTypes, location: Location): EntityInstance
    
    /** 添加单位 */
    fun add(entity: EntityInstance)
    
    /** 移除单位 */
    fun remove(entity: EntityInstance)
    
    /** 获取所有单位 */
    fun getEntities(): List<EntityInstance>
}
```

### EntityFinder

作为单位搜索工具接口，其指责在于提供各种条件的单位搜索方式，例如：

- 获取玩家可见单位
- 获取玩家附近单位
- ...

### EntitySerializer

作为单位序列化器接口，其指责在于提供单位的序列化与反序列化功能，例如：

- 将单位序列化为 Yaml，或从 Yaml 中读取单位
- 将单位序列化为 Json，或从 Json 中读取单位
- ...

### EntityTypeRegistry

虽说名为单位类型注册器接口，但因为原版实体类型是固定的，故不应开放对外注册，但是需要提供方法来获取实体类型或实体类型的相关信息，注册行为是在实现类中完成的。

这个接口是维持 Adyeshach 核心功能运转的基础，是非常复杂的。不过对于轻度使用一般用不到这个接口，最多可能会用到下面这些方法：

```kotlin
package ink.ptms.adyeshach.core

interface AdyeshachEntityTypeRegistry {

    /** 获取 Bukkit 对应的实体类型 **/
    fun getBukkitEntityType(entityType: EntityTypes): EntityType
    
    /** 获取实体类 */
    fun getEntityClass(entityType: EntityTypes): Class<EntityBase>

    /** 注册代理类生成前的回调函数 */
    fun prepareGenerate(callback: GenerateCallback)
}
```

### EntityMetadataRegistry

作为单位元数据注册器接口，其指责在于提供单位元数据的注册与获取，例如：

```kotlin
package ink.ptms.adyeshach.core

interface AdyeshachEntityMetadataRegistry {
    
    /** 注册元数据 */
    fun registerEntityMetaMask(type: Class<*>, index: Int, group: String, key: String, mask: Byte, def: Boolean = false)
    
    /** 注册元数据 */
    fun registerEntityMetaNatural(type: Class<*>, index: Int, group: String, key: String, def: Any)
    
    /** 获取元数据 */
    fun getEntityMeta(type: Class<*>): List<Meta<*>>
}
```

元数据是与客户端交互的重要组成部分，需要依照客户端注册与之对应的元数据类型与序号，因此 Adyeshach 会在启动时自动完成元数据的注册，不需要手动注册，也不可随意注册。

### EntityControllerRegistry

作为单位控制器注册器接口，其指责在于提供单位控制器的注册与获取，例如：

```kotlin
package ink.ptms.adyeshach.core

interface AdyeshachEntityControllerRegistry {
    
    /** 注册 Controller 生成器 */
    fun registerControllerGenerator(name: String, generator: ControllerGenerator)
    
    /** 注销 Controller 生成器 */
    fun unregisterControllerGenerator(name: String)
    
    /** 获取 Controller 生成器 */
    fun getControllerGenerator(name: String): ControllerGenerator?
    
    /** 获取所有 Controller 生成器（返回副本）*/
    fun getControllerGenerator(): Map<String, ControllerGenerator>
}
```

注册控制器是供 `指令` 和 `脚本` 使用的，并非必须注册才可使用的。

### HologramHandler

作为全息处理器接口，其指责在于提供全息的创建，例如：

```kotlin
package ink.ptms.adyeshach.core

interface AdyeshachHologramHandler {
    
    /** 创建全服可见的混合全息 */
    fun createHologram(location: Location, content: List<Any>, isolate: Boolean = false): AdyeshachHologram
}
```

:::tip

HologramHandler 是纯粹的开发接口，在没有其他插件访问的情况下，不会产生实际的作用。

:::

### KetherHandler

作为 Kether 处理器接口，其指责在于提供一种供其他插件访问 Kether 脚本的方式，例如：

```kotlin
package ink.ptms.adyeshach.core

interface AdyeshachKetherHandler {

    /** 执行 Kether 脚本 */
    fun invoke(source: String, player: Player? = null, vars: Map<String, Any> = emptyMap()): CompletableFuture<Any?>
    
    /** 识别并转换字符串中的 Kether 内联脚本 */
    fun parseInline(source: String, player: Player? = null, vars: Map<String, Any> = emptyMap()): String
}
```

:::tip

KetherHandler 是纯粹的开发接口，在没有其他插件访问的情况下，不会产生实际的作用。

:::

### MinecraftAPI

获取 Adyeshach 中所有有关 NMS 职责的接口。我们不建议直接调用该接口中的任何方法，除非你了解其内部实现原理，或是熟悉 Minecraft 客户端机制，否则将会对玩家客户端造成 **破坏性** 的影响。

因此，本文档不会对该相关接口进行任何说明，如有兴趣可自行浏览源码。

### NetworkAPI

作为网络接口，其指责在于提供 Adyeshach 与其他在线 API 的交互，例如：

```kotlin
package ink.ptms.adyeshach.core

interface AdyeshachNetworkAPI {
    
    /** 获取 Ashcon 接口（用于获取正版玩家皮肤）*/
    fun getAshcon(): Ashcon
    
    /** 获取 Skin 接口（用于上传自定义皮肤）*/
    fun getSkin(): Skin
}
```

### Language

作为语言文件接口，其指责在于提供 Adyeshach 的多语言支持，例如：

```kotlin
package ink.ptms.adyeshach.core

interface AdyeshachLanguage {
    
    /** 发送语言文件 */
    fun sendLang(sender: CommandSender, key: String, vararg args: Any)
    
    /** 获取语言文件文本 */
    fun getLang(sender: CommandSender, key: String, vararg args: Any): String?
    
    /** 获取语言文件文本列表 */
    fun getLangList(sender: CommandSender, key: String, vararg args: Any): List<String>
}
```

### EventBus

考虑到性能问题，部分 Adyeshach 事件将会通过 EventBus 进行分发，例如：

- 虚拟实体生成事件，当 Adyeshach 即将在客户端创建虚拟实体时。
- 虚拟实体移除事件，当 Adyeshach 即将移除客户端中的虚拟实体时。
- 虚拟实体移动事件，当 Adyeshach 即将移动客户端中的虚拟实体时。
- ...

这些事件通常拥有相同的特征，就是触发频率较高，因此我们不建议在这些事件中进行大量的计算，否则将会对服务器性能造成影响。而对于触发频率较低，或是对性能要求不高的事件，我们将会使用 Bukkit 本身的事件系统进行分发。

## 我是 Java 开发者

如果你是 Java 开发者，那么你可以通过下面的方式访问 Adyeshach 的中心 API 接口：

```java
AdyeshachAPI api = Adyeshach.INSTANCE.api();
```

对于 `object` 类型，你需要通过 `INSTANCE` 访问到它的单例对象。

:::tip

但是 Java 无法访问 Kotlin 的扩展函数。

:::