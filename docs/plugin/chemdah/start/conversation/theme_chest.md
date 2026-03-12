---
sidebar_position: 3
---

# Chest 主题

Chest 主题用箱子 GUI 界面展示对话，NPC 发言和玩家回复分别对应不同槽位的物品。在 `core/conversation.yml` 的 `theme-chest:` 节点下配置。

:::tip

Chest 主题中，玩家点击回复选项后对话结束；直接关闭 GUI 则触发 `refuse` 代理。

:::

## 界面配置

```yaml title="core/conversation.yml"
theme-chest:
  ui:
    title: "&8对话"
    rows: "if size > 4 then 4 else size + 1"
```

| 字段 | 说明 |
|------|------|
| `title` | 箱子界面标题，支持颜色代码 |
| `rows` | 界面行数，支持 Kether 脚本，变量 `size` 为当前回复数量 |

## NPC 侧物品

NPC 发言以物品形式显示在指定槽位，物品的 lore 中用 `{npc_side}` 展开多行发言：

```yaml title="core/conversation.yml"
theme-chest:
  npc-side:
    slot: 0
    item:
      material: PLAYER_HEAD
      name: "&f{title}"
      lore:
        - "{npc_side}"
```

| 字段 | 说明 |
|------|------|
| `slot` | NPC 物品所在槽位（从 0 开始） |
| `item` | 物品定义，支持标准物品格式 |

## 玩家侧物品

玩家回复选项按顺序放入 `slot` 列表对应的槽位：

```yaml title="core/conversation.yml"
theme-chest:
  player-side:
    slot:
      - 2
      - 3
      - 4
      - 5
    item:
      material: PAPER
      name: "&f{player_side}"
    item-selected:
      material: MAP
      name: "&a{player_side}"
```

| 字段 | 说明 |
|------|------|
| `slot` | 回复选项的槽位列表，按顺序对应第 1、2、3… 条回复 |
| `item` | 默认回复物品 |
| `item-selected` | 曾经选过的回复物品 |

`item-custom` 支持按名称定义特殊物品，在对话文件的回复节点中通过 `format` 字段指定：

```yaml title="core/conversation.yml"
theme-chest:
  player-side:
    item-custom:
      important:
        material: GOLD_NUGGET
        name: "&6{player_side}"
```

## 完整示例

```yaml title="core/conversation.yml"
theme-chest:
  ui:
    title: "&8与 {title} 对话"
    rows: "if size > 4 then 4 else size + 1"
  npc-side:
    slot: 0
    item:
      material: PLAYER_HEAD
      name: "&f{title}"
      lore:
        - "{npc_side}"
  player-side:
    slot:
      - 2
      - 3
      - 4
      - 5
      - 6
      - 7
    item:
      material: PAPER
      name: "&f{player_side}"
      lore:
        - "&7点击选择"
    item-selected:
      material: MAP
      name: "&a{player_side}"
      lore:
        - "&7已选择过"
    item-custom:
      important:
        material: GOLD_NUGGET
        name: "&6{player_side}"
```
