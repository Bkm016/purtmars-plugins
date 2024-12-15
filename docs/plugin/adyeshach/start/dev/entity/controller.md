---
sidebar_position: 2
---

# 控制器

本文只介绍控制器 API 的使用方式，对于控制器的详细说明，请参考 **技术文档** 中的[控制器](/plugin/adyeshach/start/tech/controller)部分。

## 实现

以 **随便走走** 为例，下文将演示如何实现一个简单的控制器：

```kotlin
import ink.ptms.adyeshach.core.entity.EntityInstance
import ink.ptms.adyeshach.core.entity.controller.Controller
import ink.ptms.adyeshach.core.entity.path.PathFinderHandler
import ink.ptms.adyeshach.core.entity.path.Request
import ink.ptms.adyeshach.core.entity.path.ResultRandomPosition

class ControllerRandomStrollLand(entity: EntityInstance) : Controller(entity) {

    override fun id(): String {
        return "RANDOM_STROLL_LAND"
    }

    override fun group(): String {
        return "WALK"
    }

    override fun shouldExecute(): Boolean {
        // 当满足概率时触发控制器
        return entity != null && entity!!.random().nextDouble() < 0.001;
    }

    override fun continueExecute(): Boolean {
        // 不会继续执行
        return false
    }

    override fun start() {
        if (entity != null) {
            // 请求一个随机位置
            PathFinderHandler.request(entity!!.getLocation(), request = Request.RANDOM_POSITION) {
                // 移动到随机位置
                entity!!.controllerMoveTo((it as ResultRandomPosition).random.toLocation(entity!!.world))
            }
        }
    }
}
```

在这之后，我们便可以直接将该控制器添加到单位身上：

```kotlin
entity.registerController(ControllerRandomStrollLand(entity))
```

或是移除：

```kotlin
// 使用序号移除
entity.unregisterController("RANDOM_STROLL_LAND")
```

```kotlin
// 使用类移除
entity.unregisterController(ControllerRandomStrollLand::class.java)
```

尽管此时这个控制器已经可以使用，但是它还不能借助 `脚本` 或是 `编辑页面` 来添加到单位身上。

## 注册

想要使控制器可以被 `脚本` 或 `编辑页面` 访问，还需要借助控制器注册接口。

```kotlin
// 获取控制器注册接口
val registry = Adyeshach.api().getEntityControllerRegistry()
// 创建控制器生成器
val generator = ControllerGenerator(ControllerRandomStrollLand::class.java) { ControllerRandomStrollLand(it) }
// 注册控制器
registry.registerControllerGenerator("RANDOM_STROLL_LAND", generator)
```

此时这个控制器就可以被 `脚本` 或 `编辑页面` 访问了，但它还不够完善。

## 参数 & 持久化

对于需要使用额外参数的控制器，就没有那么简单了。现在，我们要为上面的演示控制器添加一个参数：`probability`，表示执行概率。

```kotlin
...
import com.google.gson.annotations.Expose

class ControllerRandomStrollLand(entity: EntityInstance, @Expose val probability: Double) : Controller(entity) {

    constructor(entity: EntityInstance) : this(entity, 0.01)

    ...

    override fun shouldExecute(): Boolean {
        // 当满足概率时触发控制器
        return entity != null && entity!!.random().nextDouble() < probability;
    }
    
    ...
    
    override fun toString(): String {
        return "${id()}:${"%.2f".format(probability)}"
    }
}    
```

同时，这个参数需要被持久化，否则会在重载时丢失。我们需要为其添加一个 `@Expose` 注解。并且，我们还要修改它的 `toString` 方法，使其能够被 `编辑页面` 在相同控制器的不同参数中鉴别。

两个及以上的参数之间使用 `,` 进行分割，例如：`RANDOM_STROLL_LAND:0.01,0.5`。

:::caution

对于浮点数必须保留两位小数，否则会因精度丢失导致 `编辑页面` 无法正常识别。

:::

### 自定义序列化

对于特殊的需求，Adyeshach 支持控制器的自定义序列化方式。

```kotlin
...

class ControllerRandomStrollLand(entity: EntityInstance, val probability: Double) : Controller(entity), CustomSerializable {

    ...
    
    override fun serialize(): JsonObject {
        return JsonObject().also { it.addProperty("probability", probability) }
    }
    
    companion object {
    
        @JvmStatic
        fun deserialize(data: JsonObject): ControllerGenerator {
            val probability = data["probability"].asDouble
            return ControllerGenerator(ControllerRandomStrollLand::class.java) { ControllerRandomStrollLand(it, probability) }
        }
    }
}    
```

使用自定义序列化的控制器，必须在类中声明一个静态方法 `deserialize`。