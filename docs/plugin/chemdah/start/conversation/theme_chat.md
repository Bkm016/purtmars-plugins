---
sidebar_position: 2
---

# Chat 主题

Chat 是最常用的对话主题，通过聊天栏展示 NPC 对话和玩家回复选项。在 `core/conversation.yml` 的 `theme-chat:` 节点下配置。

## 显示格式

`format` 定义整个对话界面的行结构，每一个字符串对应一行：

| 变量 | 说明 |
|------|------|
| `{title}` | NPC 名称（对话标题） |
| `{npc_side}` | NPC 发言内容 |
| `{reply}` | 玩家回复选项 |

```yaml title="core/conversation.yml"
theme-chat:
  format:
    - "{title}"
    - "{npc_side}"
    - "{reply}"
```

`format-line` 可以对每一条 NPC 发言行单独格式化，支持 `default` 作为兜底：

```yaml title="core/conversation.yml"
theme-chat:
  format-line:
    default: "&7[&f{index}&7/&f{total}&7] &f{npc_side}"
```

## 回复样式

`select` 控制回复选项的高亮方式，`1` 是当前光标选中的样式，`0` 是其他选项的样式：

```yaml title="core/conversation.yml"
theme-chat:
  select:
    reply:
      "1": "&7▶ &f&n{player_side}&r &8(&6&lF&8)"
      "0": "&8▶ &7{player_side}&r   &r"
    reply-selected:
      "1": "&7▶ &f&n{player_side}&r &8(&6&lF&8)"
      "0": "&8▶ &7{player_side}&r   &r"
```

`reply-selected` 对曾经选过的回复单独设置样式，让玩家知道哪些选项已经选过了。

## 动画与速度

`animation` 开启打字机效果，NPC 发言逐字显示：

```yaml title="core/conversation.yml"
theme-chat:
  animation: true
  speed: 1
```

`speed` 单位是 tick，每隔多少 tick 刷新一次字符。设为 `0` 时近乎即时显示。

`talking` 是 NPC 发言动画进行中、回复选项区域显示的占位文本：

```yaml title="core/conversation.yml"
theme-chat:
  talking: "&7..."
```

## 悬浮提示

`hover-text` 为每条回复选项附加鼠标悬停提示，显示回复的完整文本：

```yaml title="core/conversation.yml"
theme-chat:
  hover-text: true
```

## 空行

`space-line` 控制对话界面上方插入的空行数，用于把聊天栏内容推到屏幕底部：

```yaml title="core/conversation.yml"
theme-chat:
  space-line: 30
```

`space-filling` 控制在对话内容后自动补充的空行数，用于撑满聊天框避免内容贴底：

```yaml title="core/conversation.yml"
theme-chat:
  space-filling: 5
```

默认值为 `5`。

## 回复交互方式

`reply-interaction` 指定玩家触发回复选项的交互方式列表：

```yaml title="core/conversation.yml"
theme-chat:
  reply-interaction:
    - SWAP
```

默认值为 `["SWAP"]`（切换副手物品触发）。可配置多种方式同时生效。

## 滚轮选择

`use-scroll` 开启后，切换回复选项的方式改为鼠标滚轮而非物品栏格子：

```yaml title="core/conversation.yml"
theme-chat:
  use-scroll: false
```

关闭时，玩家通过切换手持物品槽位（1~9）来对应回复选项。

## 单行回复模式

把所有回复选项显示在同一行里，适合回复较短的场景：

```yaml title="core/conversation.yml"
theme-chat:
  single-line:
    enable: false
    auto-swap: 12
    reply-separator: " "
```

| 字段 | 说明 |
|------|------|
| `enable` | 是否启用单行模式 |
| `auto-swap` | 单行总字符数超过此值时自动换行 |
| `reply-separator` | 回复之间的分隔字符，`\n` 表示换行 |

## 音效

选中回复时播放音效：

```yaml title="core/conversation.yml"
theme-chat:
  select:
    sound:
      name: UI_BUTTON_CLICK
      v: 1.0
      p: 1.0
```

## 完整示例

```yaml title="core/conversation.yml"
theme-chat:
  format:
    - "{title}"
    - "{npc_side}"
    - "{reply}"
  format-line:
    default: "&7{npc_side}"
  select:
    reply:
      "1": "&7▶ &f&n{player_side}&r &8(&6&lF&8)"
      "0": "&8▶ &7{player_side}&r   &r"
    reply-selected:
      "1": "&7▶ &a&n{player_side}&r &8(&6&lF&8)"
      "0": "&8▶ &2{player_side}&r   &r"
    sound:
      name: UI_BUTTON_CLICK
      v: 1.0
      p: 1.0
  talking: "&7..."
  animation: true
  speed: 1
  hover-text: true
  space-line: 30
  space-filling: 5
  close-distance: 0.5           # 玩家移动超过此距离后自动关闭对话
  reply-interaction:
    - SWAP
  use-scroll: false
  single-line:
    enable: false
    auto-swap: 12
    reply-separator: " "
```

:::tip

`format` 中各变量的顺序决定界面布局。`{npc_side}` 和 `{reply}` 所在行的格式由对应的 `format-line` 和 `select` 控制，其余行原样输出（支持内联 Kether 脚本）。

:::
