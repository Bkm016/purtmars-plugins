---
sidebar_position: 2
---

# 控制器

除了让虚拟实体能够正常的显示在客户端之外，还需要控制器来控制虚拟实体的行为。控制器定义了虚拟实体的行为，会挂载到虚拟实体上在生命周期中被调用。

控制器的运行逻辑与原版相近，解释起来需要不少文字，因此本文只做简单介绍。想要了解原版 AI 的运行机制，请移步 [聊聊生物和 AI](https://izzel.io/2021/12/19/living-things/)（作者：IzzelAliz）。

## 生命周期

控制器类 `Controller` 的构成大致（为了演示方便、修改了一些内容）如下所示：

```kotlin
package ink.ptms.adyeshach.core.entity.controller

abstract class Controller {

    abstract fun shouldExecute(): Boolean
    abstract fun continueExecute(): Boolean
    abstract fun start()
    abstract fun stop()
    abstract fun tick()
    
    abstract fun group(): String
    abstract fun isInterruptable(): Boolean
}
```

前五个方法的运行流程如下图所示：

![](/img/controller-1.png)

以插件中的预设控制器 `LOOK_AT_PLAYER` 为例，它的运行逻辑如下：

- `shouldExecute`：是否可以开始执行，进行概率判定、搜索附近的玩家。然后把结果缓存起来。
- `continueExecute`：是否可以继续执行，看那个玩家是否活着、是否在附近、是否超时（看够了）。
- `start`：开始执行时，设定一下看的时间。
- `stop`：停止执行时，把缓存清空。
- `tick`：控制虚拟实体看向那个玩家，然后减少看的时间。

## 协调机制

尽管控制器存在与原版相同的协调机制，但在预设控制器中并未体现出来。

- `group`：控制器组，用于区分不同种类的控制器，类似于原版的 `MOVE`、`LOOK`、`JUMP` 等。
- `isInterruptable`：控制器是否可以被打断，如果可以被打断，那么在执行时，如果有更高优先级的控制器被执行，那么当前控制器会被打断。触发 `stop` 方法。

## Brain & Memory

因为 Adyeshach 的设计初衷并不是为了制造或是模拟原版生物，因此并无 `Brain` 系统来处理更复杂的行为，也没有 `Memory` 系统来存储数据。

但是，你可以用一些特殊手段代替 `Memory` 系统来储存数据，详见 **开发文档** 中的[控制器](/plugin/adyeshach/start/dev/entity/controller)部分。