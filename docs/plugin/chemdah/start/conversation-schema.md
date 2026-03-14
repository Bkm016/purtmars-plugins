---
sidebar_position: 101
---

# 对话 Schema

完整的对话配置字段参考。所有字段均已标注类型、默认值和使用说明。

## 文件级选项

对话文件中的 `__option__` 节点为当前文件中的所有对话提供默认值。

```yaml title="__option__ 节点"
__option__:
  # 对话主题
  # 可选：chat（聊天框）、chest（箱子界面）
  theme: chat

  # NPC 标题模板
  # {name} 会被替换为 NPC 的显示名称
  title: "{name}"

  # 全局标志
  # 应用到本文件中的所有对话
  global-flags:
    - IGNORE_TURN_HEAD
    - "NO_EFFECT:SOUND"
```

## 对话结构

```yaml title="完整对话结构"
# ═══════════════════════════════════════════════════
# 对话 ID（全局唯一标识符）
# ═══════════════════════════════════════════════════
conversation_id:

  # ─── NPC 绑定 ──────────────────────────────────
  # 格式："命名空间 ID [世界名 ...]"
  # 命名空间：adyeshach（Adyeshach NPC）
  # 世界名可选，限制对话只在指定世界中触发
  npc id:
    - "adyeshach npc_elder"
    - "adyeshach npc_guard world_1 world_2"

  # ─── NPC 发言 ──────────────────────────────────
  # 字符串列表，支持 & 颜色代码和 Kether 内联表达式 {{ expr }}
  npc:
    - "&7你好, {{ sender }}。"
    - "&7有什么需要帮忙的吗？"

  # ─── NPC 图标 ──────────────────────────────────
  # 仅 chest 主题使用
  npc icon: "player_head:Steve"

  # ─── 行格式 ────────────────────────────────────
  # 引用 conversation.yml 中 format-line 下的格式名
  # 不填则使用 default
  format: default

  # ─── 开启条件 ──────────────────────────────────
  # Kether 表达式，返回 false 时对话不会打开
  # "if" 是旧名兼容
  condition: "check player level > 5"

  # ─── 玩家回复选项 ──────────────────────────────
  player:
    - # 回复文本（必填）
      # 支持 & 颜色代码和 Kether 内联表达式
      reply: "&f你好！"

      # 显示条件（可选）
      # Kether 表达式，返回 false 时该选项不显示
      # "if" 是旧名兼容
      if: "permission admin"

      # 选中后执行的脚本（可选）
      # Kether 脚本，选择该选项后执行
      then: |
        goto conversation_next

      # 异步执行的脚本（可选）
      # 不阻塞对话流程
      then-async: |
        log "player selected option"

      # 回复样式（可选）
      # 引用 conversation.yml 中 reply-custom 下的格式名
      # 别名：type
      format: main

      # 唯一标识（可选）
      # 设置后，玩家选择过一次就不再显示该选项
      unique: "quest_hint_shown"

      # 换行标记（可选）
      # true 时在该选项后添加一个空行
      swap: false

      # 图标（可选）
      # 仅 chest 主题使用，XItemStack 格式
      icon: "player_head:Steve"

  # ─── 脚本代理 ──────────────────────────────────
  # 在对话生命周期的不同阶段执行 Kether 脚本
  agent:
    # 对话打开前（阻塞）
    # 在脚本中设置 @Cancelled = true 可取消对话
    begin: |
      set chooseA to round random 10

    # 对话打开前（异步，不阻塞）
    begin_async: |
      log "conversation opening"

    # 对话渲染后（阻塞）
    start: |
      tell "welcome"

    # 对话渲染后（异步，不阻塞）
    start_async: |
      pass

    # 玩家关闭或走开时
    refuse: |
      tell "再见。"

    # 同上，异步
    refuse_async: |
      pass

    # 玩家选择回复后
    end: |
      give diamond 1

    # 同上，异步
    end_async: |
      pass

    # 对话跳转时（goto 动作触发）
    goto: |
      pass

    # 代理支持 @restrict 后缀
    # 用于区分同类型的多个代理
    begin@self: |
      pass

  # ─── 标志 ──────────────────────────────────────
  # 控制对话行为的标志列表
  # 会与 __option__.global-flags 合并
  flags:
    # 玩家移动时关闭对话
    - NO_MOVE
    # 禁用所有特效
    - NO_EFFECT
    # 仅禁用音效
    - "NO_EFFECT:SOUND"
    # 仅禁用粒子
    - "NO_EFFECT:PARTICLE"
    # NPC 转向面对玩家（支持 Adyeshach、Citizens、MythicMobs）
    - LOOK_PLAYER
    # 强制玩家视角转向 NPC
    - FORCE_LOOK
    # 强制显示模式：禁止跳过、屏蔽玩家伤害和物品丢弃
    - FORCE_DISPLAY
    # 禁止跳过 NPC 打字动画
    - NO_SKIP
    # 忽略 NPC 转头行为
    - IGNORE_TURN_HEAD
    # 忽略距离过远检测
    - IGNORE_TOO_FAR

  # ─── 对话转移 ──────────────────────────────────
  # 对话过程中切换到另一个 NPC 实体
  transfer:
    id: "adyeshach_npc_id"
```

## 对话分支（Switch）

当对话节点包含 `when` 列表时，会被注册为分支对话，根据条件跳转到不同的对话。

```yaml title="分支对话结构"
conversation_switch:
  # NPC 绑定（与普通对话相同）
  npc id:
    - "adyeshach npc_elder"

  # 分支列表，按顺序匹配
  when:
    # 满足条件时跳转到指定对话
    - if: "check player level < 10"
      open: conversation_newbie

    # 满足条件时执行脚本（不打开对话）
    - if: "permission admin"
      run: |
        tell "管理员你好。"

    # 兜底分支（条件始终为真）
    - if: "true"
      open: conversation_default
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `if` / `condition` | string | Kether 条件表达式（互为别名） |
| `open` | string | 条件满足时跳转的对话 ID，支持 Kether 内联 |
| `run` | string | 条件满足时执行的 Kether 脚本（不打开对话） |

## 对话代理类型速查

| YAML 键 | 触发时机 | 阻塞 | 命名空间 |
|---------|---------|------|---------|
| `begin` | 对话打开前 | 是 | npc |
| `begin_async` | 对话打开前 | 否 | npc |
| `start` | 对话渲染后 | 是 | npc |
| `start_async` | 对话渲染后 | 否 | npc |
| `refuse` | 玩家关闭/走开 | 是 | player |
| `refuse_async` | 玩家关闭/走开 | 否 | player |
| `end` | 玩家选择回复后 | 是 | player |
| `end_async` | 玩家选择回复后 | 否 | player |
| `goto` | 对话跳转时 | 是 | npc |

:::tip

对话代理键名解析规则：转为大写后直接匹配枚举名。`begin_async` 有效（大写后为 `BEGIN_ASYNC`），但 `begin async`（含空格）和 `begin-async`（含连字符）均无效。

:::

## 对话主题配置

对话主题在 `Chemdah/core/conversation.yml` 中配置。

### Chat 主题

```yaml title="conversation.yml — theme-chat"
theme-chat:
  # 聊天框格式
  # 变量：{title} {npc_side}/{npcSide} {reply}
  format:
    - " "
    - " {title}:"
    - "  {npc_side}"
    - "  {reply}"

  # 行格式定义
  # 每个格式名可在对话的 format 字段中引用
  format-line:
    # 默认格式
    default:
      # NPC 只有一行发言时
      single: '&f" &7{text}&r &f"'
      # 多行发言的第一行
      top: '&f" &7{text}&r'
      # 中间行
      body: '  &7{text}&r'
      # 最后一行
      bottom: '  &7{text}&r &f"'
    # 自定义格式
    main:
      single: '&e* {text}'
      top: '&e* {text}'
      body: '  &e{text}'
      bottom: '  &e{text}'

  # 选项显示格式
  select:
    # 标准回复
    reply:
      1: '&7▶ &f&n{player_side}&r'    # 选中状态
      0: '&8▶ &7{player_side}&r'      # 未选中状态
    # 已选择过的回复（unique 标记）
    reply-selected:
      1: '&7▶ &7&n{player_side}&r'
      0: '&8▶ &8{player_side}&r'
    # 自定义回复格式（通过回复的 format 字段引用）
    reply-custom:
      main:
        1: '&6▶ &7&n{player_side}&r'
        0: '&7▶ &8{player_side}&r'
    # 选择时的音效
    sound:
      name: ENTITY_EXPERIENCE_ORB_PICKUP
      p: 2.0
      v: 0.0

  # 对话打开时的音效
  sound:
    name: ENTITY_ITEM_PICKUP
    p: 1.0
    v: 0.0

  # NPC 正在打字时显示的文本
  talking: "    &8..."

  # 是否启用打字机动画
  animation: true

  # 动画速度（tick 间隔）
  speed: 1

  # 清屏用空行数
  space-line: 30

  # 回复文本悬浮提示
  hover-text: true

  # 使用鼠标滚轮切换选项
  use-scroll: false

  # 最小显示行数（不足时补空行）
  space-filling: 5

  # 单行模式：所有选项显示在一行
  single-line:
    enable: true
    # 超过此字符数自动换行
    auto-swap: 36
    # 选项之间的分隔符
    reply-separator: " "

  # 玩家移动多远后关闭对话（方块距离）
  close-distance: 0.5

  # 玩家选择选中选项的交互方式
  reply-interaction:
    - SWAP              # F 键（副手切换）
    # - LEFT_CLICK
    # - RIGHT_CLICK
    # - DROP
    # - SNEAK_TOGGLE
```

### Chest 主题

```yaml title="conversation.yml — theme-chest"
theme-chest:
  # 界面设置
  ui:
    # 箱子标题
    # {title} 会被替换为 NPC 名称
    title: "正在与 {title} 交流..."
    # 行数计算（Kether 表达式）
    rows: 'max ceil math add [ math div [ &size 5 ] 2 ] 3'

  # NPC 发言区域
  npc-side:
    # 显示物品（XItemStack 格式）
    item:
      material: book
      name: "&f {title}"
      lore:
        - " &7{npc_side} "
    # 物品放置的槽位
    slot: 10

  # 玩家回复区域
  player-side:
    # 回复选项物品
    item:
      material: paper
      name: "&7{index}. &f{player_side}"
    # 已选择过的选项物品（unique 标记）
    item-selected:
      material: paper
      name: "&8{index}. &7{player_side}"
    # 自定义选项物品（通过回复的 format 字段引用）
    item-custom:
      custom_key:
        material: diamond
        name: "..."
    # 选项放置的槽位列表
    slot: [12, 13, 14, 15, 16]

  # 对话打开时的音效
  sound:
    name: ENTITY_ITEM_PICKUP
    p: 1.0
    v: 0.0
```
