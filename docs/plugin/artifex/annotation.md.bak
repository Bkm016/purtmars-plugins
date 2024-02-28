---
sidebar_position: 4
---

# 通用注解

由 Artifex 内置的几种注解，提供编译时的部分特性。独立脚本或工程脚本均可以使用。

## @Include

嵌入脚本，被选择的脚本将与当前脚本一同编译。

> test_1.kts

```kotlin
@file:Include("test_2.kts")

test2()
```

> test_2.kts

```kotlin
fun test2() {
  info("你好，世界")
}
```

此时两个脚本将编译在一个文件内，但 `test_2` 不可引用 `test_1`，这个关系是单向的。

## @Import

引用脚本，与嵌入脚本作用相同，但被引用的脚本不会与当前脚本一同编译在一个文件内。被引用的脚本将会独立运行且唯一，这是一种极其特殊且危险的写法，是破坏 Kotlin Script 设计理念的，我们不建议这种写法。

>test_api.kts

```kotlin
var i = 0

fun testApi() {
  info("你好，世界 ${i++}")
}
```

> test_1.kts

```kotlin
@file:Import("test_api.kts")

testApi()
```

随着 `test_1` 的重复运行，计数器始终递增，直到 `test_api` 被重载或释放。

> 当你修改了这种作为引用使用的脚本，必须手动重载该脚本，无法通过编译检查或 --C 参数重新编译。

**同时该注解可作引用插件使用，从而自动导入插件的相关包。**

> test.kts

```kotlin
@file:Import("MythicMobs")

MythicMobs.inst()
BukkitShadowFactory.INSTANCE // Unresolved reference
```

> test.kts

```kotlin
@file:Import("MythicMobs:io.lumine.shadow,io.lumine.shadow.bukkit")

MythicMobs.inst()
BukkitShadowFactory.INSTANCE
```

这种搜索逻辑可能无法获取到所有包，但您可以通过追加包名来修正搜索结果。