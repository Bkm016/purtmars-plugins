---
sidebar_position: 11
---

# 下级页面：控制器

    控制器可以理解为 AI，是指这个单位的行为。

控制器页面是基于 **预设控制器** 的，也可以通过 `/npc edit <id> controller` 打开。

<img id="game_img" src="/img/command-edit-17.png" width="600" style={{marginBottom: "1rem"}}/>

这个页面中的所有控制器均来自文件 `Adyeshach/editor/controller.yml`。

```yaml
Controllers:
  - icon:
      material: ENDER_EYE
      name: '&7看向玩家 (1%)'
      lore:
        - ''
        - '&8模拟原版生物的视线效果'
        - '&8参数:'
        - '&f1% &7的概率看向 &f8 &7格内的玩家持续至少 &f40 &7游戏刻'
    instance: LOOK_AT_PLAYER:8d,0.01d,false,40i
  - icon:
      material: ENDER_EYE
      name: '&7看向玩家 (100%)'
      lore:
        - ''
        - '&8固定看向玩家的视线效果'
        - '&8参数:'
        - '&f100% &7的概率看向 &f8 &7格内的玩家持续至少 &f100 &7游戏刻'
    instance: LOOK_AT_PLAYER:8d,1.00d,false,100i
  - icon:
      material: ENDER_EYE
      name: '&7看向周围 (1%)'
      lore:
        - ''
        - '&8模拟原版生物的视线效果'
        - '&8参数:'
        - '&f1% &7的概率看向周围随机方向'
    instance: RANDOM_LOOKAROUND:0.01d
```

截止到目前版本，能够写到这个页面里的控制器类型只有：

- 看玩家：`LOOK_AT_PLAYER`
- 看风景：`RANDOM_LOOKAROUND`

:::tip

如果你想创建新的控制器类型，请参考 **进阶功能** 中的[控制器](/plugin/adyeshach/start/advance/controller)部分。

:::

### 看玩家

    LOOK_AT_PLAYER:8d,0.01d,false,40i

- `8d`：看向玩家的最大距离。
- `0.01d`：看向玩家的概率。
- `false`：是否看仅水平角度看向玩家。
- `40i`：看向玩家的最短持续时间。

:::tip

参数后的字母代表参数的类型，不可省略。同样也不可打乱参数顺序。

:::

### 看风景

    RANDOM_LOOKAROUND:0.01d

- `0.01d`：看向周围的概率。

:::tip

看向周围的时间是随机的，为 `20 + (0 ~ 20)` 游戏刻。

:::

### 参数类型解释

- `b`：代表 `byte` 类型，具体写法为：`0b`。
- `s`：代表 `short` 类型，具体写法为：`0s`。
- `i`：代表 `int` 类型，具体写法为：`0i`。
- `l`：代表 `long` 类型，具体写法为：`0l`。
- `f`：代表 `float` 类型，具体写法为：`0f`。
- `d`：代表 `double` 类型，具体写法为：`0d`。
- `t`：代表 `String` 类型，具体写法为：`ababt`。
- `b]`：代表 `byte[]` 类型，具体写法为：`0,1,2b]`。
- `i]`：代表 `int[]` 类型，具体写法为：`0,1,2i]`。

:::tip

布尔值固定为 `true` 或 `false`。

:::