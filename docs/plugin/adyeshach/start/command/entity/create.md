---
sidebar_position: 1
---

# 创建单位

作为核心命令，它的用法非常简单。只需输入 `/npc create <类型> <名称>` 即可创建单位。

```
/npc create PLAYER test
```

插件会在编辑命令时建议出所有可用的单位类型：

![](/img/command-create-1.png)

若无任何错误信息，插件会在玩家位置生成一个玩家类型的单位：

<img id="game_img" src="/img/command-create-2.png" width="600" style={{marginBottom: "1rem"}}/>

:::tip

你可以重复使用相同的名称来生成单位，但是不建议这么做。

:::

## 附加参数

生成单位时，你可以使用一些附加参数来控制单位的生成，例如：

![](/img/command-create-3.png)

这里的参数也很好理解：

- `edit`：生成单位后立即进入编辑模式，简写为 `e`。
- `target`: 在玩家视角所看向的方块中心生成单位，简写为 `t`。

## 已知问题

截止到目前版本，依旧无法生成：

- **唤魔者尖牙** (`EVOKER_FANGS`)
- **浮漂** (`FISHING_HOOK`)
- **画**（`PAINTING`）

你认为不支持其实可以生成的类型：

- **拴绳结** (`LEASH_KNOT`)
- **经验球** (`EXPERIENCE_ORB`)
- **烟花火箭** (`FIREWORK_ROCKET`)

你认为可以生成其实不支持的类型：

- **闪电** (`LIGHTNING`)
