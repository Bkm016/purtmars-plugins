---
sidebar_position: 4
---

# 特性

特性是指基于插件所添加的特性，是实体自身数据之外的功能。常见为：

- **傻子**
    - 指禁用控制器等功能。
- **装备**
    - 指这个单位身上装备的物品。
- **绑定命令**
    - 通过点击这个单位，可以执行的一些命令。

## 特性列表

在下面的表格中，你可以找到所有特性以及其功能解释。

- 包含 `[M]` 表示可以通过 **指令** 或 **脚本** 进行快速修改。
- 包含 `[E]` 表示只能通过 **编辑器** 进行修改。

### [M] 傻子

如果开启, 这个单位的控制器和移动逻辑会被立刻禁用, 可减少性能损耗。

| 名称       | 类型      | 
|----------|---------|
| `nitwit` | Boolean |

### [M] 移动速度

这个单位的移动速度，单位为：格/秒。

| 名称          | 类型    |
|-------------|-------|
| `moveSpeed` | Float |

### [M] 可视距离

这个单位的可视距离，单位为：格。

| 名称                | 类型    |
|-------------------|-------|
| `visibleDistance` | Float |

### [M] 加载后可见

如果关闭, 这个单位在数据加载后不会立刻显现, 直到玩家重新进入可视范围或手动刷新。

| 名称                   | 类型      |
|----------------------|---------|
| `visibleAfterLoaded` | Boolean |

### [M] 死亡状态

利用客户端渲染漏洞实现的特殊状态, 无法保证稳定性。

| 名称    | 类型      |
|-------|---------|
| `die` | Boolean |

<img id="game_img" src="/img/trait-die.png" width="600" style={{marginBottom: "1rem"}}/>

### [M] 装备

这个单位身上装备的物品。

| 名称           | 类型                                      |
|--------------|-----------------------------------------|
| `helmet`     | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) |
| `chestplate` | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) |
| `leggings`   | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) |
| `boots`      | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) |
| `hand`       | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) |
| `offhand`    | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) |

### [M] 是否显示名称

如果关闭, 这个单位的名称将不会显示。鼠标指上去也不会显示的那种。

| 名称               | 类型      |
|------------------|---------|
| `nameTagVisible` | Boolean |

<img id="game_img" src="/img/trait-name.png" width="600" style={{marginBottom: "1rem"}}/>

### [M] 是否启用碰撞

如果关闭, 你将不会被这个单位阻挡移动。

| 名称          | 类型      |
|-------------|---------|
| `collision` | Boolean |

### [M] 发光颜色

这个单位的发光颜色，需要实体启用发光才会生效。

| 名称             | 类型     | 格式                                                                                                                     |
|----------------|--------|------------------------------------------------------------------------------------------------------------------------|
| `glowingColor` | String | white, orange, magenta, light_blue, yellow, lime, pink, gray, light_gray, cyan, purple, blue, brown, green, red, black | 

<img id="game_img" src="/img/trait-color.png" width="600" style={{marginBottom: "1rem"}}/>

### [M] 是否可见隐形单位

如果开启，那么玩家将可以看到隐形的这个单位，以半透明的方式。

但是，如果启用了这个选项，那么玩家将无法在服务器中加入任何记分板队伍。同时，需要上面三个选项处于默认值。

| 名称                | 类型      | 
|-------------------|---------|
| `canSeeInvisible` | Boolean |

### [M] 冻结

如果开启，这个单位将无法移动。

| 名称       | 类型      |
|----------|---------|
| `frozen` | Boolean |

:::tip

冻结与停止移动不同，它不会打断当前移动路径。

:::

### [M] 坐下

在单位脚下生成一个隐形的盔甲架，随后使单位坐在上面。

<img id="game_img" src="/img/trait-sit.png" width="600" style={{marginBottom: "1rem"}}/>

```title="Kether"
trait sit to true
```

### [M] 头衔

在单位头顶生成全息字，且会跟随单位移动。

<img id="game_img" src="/img/trait-title.png" width="600" style={{marginBottom: "1rem"}}/>

```title="Kether"
trait title to [ "我是傻逼" ]
```

### [M] 头衔高度

头衔的高度修正，默认为 `0.25`。

```title="Kether"
trait title-height to 0.1
```

### [M] 绑定命令

绑定命令到单位，当玩家点击单位时，会执行绑定的命令。

| 格式                | 说明         |
|-------------------|------------|
| `say 我是傻逼`        | 以玩家权限执行命令  |
| `op:say 我是傻逼`     | 以管理员权限执行命令 |
| `server:say 我是傻逼` | 以控制台视角执行命令 |

同时可以使用 `~left` 或 `~right` 约束点击方式。

| 格式               | 说明               |
|------------------|------------------|
| `say 我是傻逼~left`  | 以玩家权限执行命令（仅限左键）  |
| `say 我是傻逼~right` | 以管理员权限执行命令（仅限右键） |

```title="Kether"
trait command to [ "say 我是傻逼" ]
```

### [M] 可视条件

绑定一个 Kether 脚本到单位，当玩家满足脚本条件时，单位才会显示。

<img id="game_img" src="/img/trait-vc.png" width="600" style={{marginBottom: "1rem"}}/>

```title="Kether"
trait view-condition to [ "check player level > 10" ]
```

### [E] 巡逻

让单位遵循特定的轨迹持续移动，游戏内编辑，本文不做介绍。

