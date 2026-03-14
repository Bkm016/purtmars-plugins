---
sidebar_position: 1
---

# 对话系统

对话文件放在 `Chemdah/core/conversation/` 目录下，支持 `.yml`、`.yaml`、`.json`、`.toml` 格式，可以用子目录分类管理。

一个文件里可以定义多个对话节点，每个节点是一个独立的 key。`__option__` 是文件级全局设置，不会被当作对话节点加载。每个对话节点也可以有自己的 `flags:` 字段，会与 `global-flags` 合并生效。

## 基本结构

```yaml title="core/conversation/village.yml"
__option__:
  theme: chat          # 对话主题，chat（聊天框）或 chest（箱子界面）
  title: "村民"        # NPC 名称，显示在对话界面上
  global-flags:        # 对此文件所有对话生效的标签
    - NO_EFFECT:PARTICLE

greeting:
  npc id:              # 绑定 NPC，格式为 "命名空间 ID"
    - adyeshach villager_1
    - adyeshach villager_2
  condition: "quest has villager_quest"   # 对话开启条件（Kether），不填则无限制
  npc:                 # NPC 台词，支持多行，支持 Kether 内联脚本
    - "你好，旅行者。"
    - "今天天气不错。"
  player:              # 玩家回复选项列表
    - reply: "你好！"
      then: "tell player 感谢你的问候！"
    - reply: "再见。"
      then: "tell player 旅途平安。"
  agent:               # 对话代理脚本
    begin: "..."
    start: "..."
```

## `__option__` 全局设置

| 字段 | 说明 | 默认值 |
|------|------|--------|
| `theme` | 对话主题（`chat` / `chest`） | `chat` |
| `title` | NPC 名称 | `NPC` |
| `global-flags` | 全局标签，对文件内所有对话生效 | 空 |
| `agent` | 全局代理脚本，合并到所有对话中 | 空 |

## NPC 台词

`npc` 字段接受字符串列表，每行作为一条单独的台词按顺序播放。台词内支持 Kether 内联脚本（`{{ }}`）。

```yaml title="示例"
npc:
  - "你好，{{ player name }}。"
  - "我有些事情想请你帮忙。"
```

## 玩家回复

`player` 是一个列表，每项是一个回复选项。

```yaml title="示例"
player:
  - if: "quest has main_quest"      # 显示条件（Kether），条件不满足时此选项不显示
    reply: "我愿意帮你。"
    then:                           # 选择后同步执行的 Kether 脚本
      - conversation open side_quest
    then-async:                     # 选择后异步执行的脚本（不阻塞对话关闭）
      - data set "flag_helped" true

  - reply: "我没时间。"
    unique: "refused_villager_1"    # 唯一选择 ID，选过一次后此选项永久隐藏
    then: "tell player 好吧。"

  - reply: "告诉我更多..."
    swap: true                      # 此选项前换行，用于视觉分组
    then: "conversation open more_info"
```

| 字段 | 说明 |
|------|------|
| `if` | Kether 表达式，为 false 时选项不显示（`condition` 也可以） |
| `reply` | 回复文本，支持颜色代码和 Kether 内联脚本 |
| `format` | 回复格式名，关联主题中的自定义回复格式 |
| `then` | 同步执行的 Kether 脚本，执行完毕后对话关闭 |
| `then-async` | 异步执行的 Kether 脚本，与 `then` 同时触发但不阻塞 |
| `unique` | 唯一 ID，选过之后永不再显示此选项 |
| `swap` | 为 `true` 时在此选项前插入换行 |

## 对话代理

`agent` 用于在对话生命周期的各个阶段执行 Kether 脚本。

```yaml title="示例"
agent:
  begin: "tell player 对话即将开始"         # NPC 台词显示前执行，可取消对话
  begin_async: "..."                         # 同上，但不阻塞流程
  start: "tell player 对话已经显示出来了"   # NPC 台词显示后执行
  start_async: "..."
  end: "tell player 对话结束了"             # 玩家关闭对话时执行
  end_async: "..."
  refuse: "tell player 玩家拒绝了对话"      # 玩家按 ESC 拒绝对话时执行
  refuse_async: "..."
  goto: "tell player 跳转到了另一个对话"    # 跳转到其他对话时执行
```

在 `begin` 代理脚本中将变量 `@Cancelled` 设为 `true` 可以取消对话开启。

:::tip

代理脚本中可以访问会话变量（如 `@Session`），也可以使用 `chemdah-conversation` 命名空间下的所有 Kether 动作。

:::

## 对话主题

**chat（聊天框）**：台词以打字机效果逐字显示在聊天栏，玩家点击文字选择回复。这是默认主题。

**chest（箱子界面）**：台词显示在箱子 GUI 的物品 lore 上，玩家点击物品选择回复。适合需要图标化选项的场景。

主题的具体样式在 `Chemdah/core/conversation.yml` 的 `theme-chat` 和 `theme-chest` 节点下配置。

## 命令触发

除了 NPC 点击触发外，也可以用命令直接打开对话：

```
/chemdah api conversation open <对话ID> [玩家名]
```

## 完整示例

```yaml title="core/conversation/blacksmith.yml"
__option__:
  theme: chat
  title: "铁匠"

blacksmith_main:
  npc id:
    - adyeshach blacksmith_npc
  condition: "permission has chemdah.conversation"
  npc:
    - "需要什么武器吗，朋友？"
    - "我这里什么都能打。"
  player:
    - if: "quest has blacksmith_quest not"      # 未接任务时显示
      reply: "我想接一个任务。"
      then:
        - quest accept blacksmith_quest
        - tell player 任务已接受！
      then-async:
        - data set "met_blacksmith" true

    - reply: "我只是看看。"
      then: "tell player 随便看。"

    - reply: "再见。"
      then: "tell player 路上小心。"
  agent:
    begin: |-
      set &greeted to data get "met_blacksmith"
      if &greeted is true
        then tell player （铁匠向你点了点头）
    end: "tell player 铁匠目送你离开。"
    refuse: "tell player 铁匠耸了耸肩。"
```
