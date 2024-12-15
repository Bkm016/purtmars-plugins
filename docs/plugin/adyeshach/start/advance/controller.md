---
sidebar_position: 2
---

# 自定义控制器

自定义控制器是基于 Kether 的，在开始前请确保你已阅读 [脚本](/plugin/adyeshach/start/advance/script) 部分。

:::tip

因为脚本性能问题，我们并不推荐 **大量** 使用 Kether 制作自定义控制器。

:::

:::tip

自定义控制器是 **[标准控制器](/plugin/adyeshach/start/tech/controller)** 的简化版本，

:::

自定义控制器目录位于：

```
Adyeshach
└── npc ··················· 虚拟实体储存目录
    └── controller ········ 自定义控制器目录 ······ 默认没有，需自行创建
        └── def.yml ······· 自定义控制器文件
```

演示文件：

```yaml
example-custom-controller:
  # 概率
  chance: 0.001
  # 冷却
  cooldown: 20s
  # 异步
  async: false
  # 条件
  if: true
  # 行为
  # 当变量名为 "__XXX__" 形式时，会被临时持久化在当前控制器中
  then: |-
    if check &__num__ == null then {
      set __num__ to 0
    }
    set __num__ to math &__num__ + 1
    tell inline "你好, 我是傻逼。这是我第 {{ &__num__ }} 次发言。"
```

所有自定义控制器都会显示在 [下级页面：控制器](/plugin/adyeshach/start/command/editor/controller) 中。

## 名词解释

自定义控制器文件中各节点作用如下：

### 概率

指每个游戏刻中执行这个控制器的概率，最大为 `1` (`100%`)。

### 冷却

指触发这个控制器的最短间隔。

### 异步

指是否在 **非主线程** 中运行 Kether 脚本。

:::caution

不是所有语句都支持异步运行，请酌情使用。

:::

### 条件

指触发这个控制器的要求，在 `概率`、`冷却` 判定通过之后处理。

:::tip

不用条件做 **概率** 判断是因为 Java 代码的效率要远高于 Kether 脚本。

:::

:::tip

如果没有条件请删除 `if` 节点，不要使用 `if: true`，因为那是演示写法，会带来额外的性能损耗。

:::

### 行为

就是控制器的脚本部分，对于 `__名字__` 形式的变量会被临时储存（关服清空）在控制器中。

:::caution

控制器的执行频率非常高，如果你对你的脚本水平没有把握，请不要以身试险。

:::

## 交互

每个注册到 Adyeshach 中的控制器都拥有其唯一名称，例如预设控制器中的：

- 看玩家：`LOOK_AT_PLAYER`
- 看风景：`RANDOM_LOOKAROUND`

这个名称除了用于储存，也是使用 `代码` 或 `脚本` 交互的重要判别方式，例如：

**使用代码获取控制器**

```kotlin
Adyeshach.api().getEntityControllerRegistry().getControllerGenerator("LOOK_AT_PLAYER")
```

**使用脚本语句添加控制器**

```kotlin
controller add "LOOK_AT_PLAYER"
```

当然，自定义控制器也是如此。你注册的所有自定义控制器都将会以 `inner:[节点名称]` 作为唯一的判别名称。例如演示文件中的自定义控制器，就是 `inner:example-custom-controller`。

**使用代码获取控制器**

```kotlin
Adyeshach.api().getEntityControllerRegistry().getControllerGenerator("inner:example-custom-controller")
```

**使用脚本语句添加控制器**

```kotlin
controller add "inner:example-custom-controller"
```