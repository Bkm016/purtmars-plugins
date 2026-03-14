---
sidebar_position: 5
---

# 任务页面

任务页面（UI）模块提供一个基于箱子界面的任务列表，玩家可以在里面查看、筛选、接受任务。

配置文件：`Chemdah/module/ui.yml`

## UI 模板

`ui.yml` 中每个顶级键就是一个 UI 模板，id 即键名。每个模板独立配置界面布局和任务过滤规则。

```yaml title="ui.yml 基本结构"
main:                          # UI id
  name: "&8任务列表 &7第 {page} 页"
  name-filter: "&8任务分类 &7第 {page} 页"

  menu:
    quest:
      rows: 6                  # 任务列表界面行数
      slot: [ 0, 1, 2, ... ]   # 任务图标占用的槽位
      methods:
        info: 49               # 信息按钮槽位
        filter: 50             # 筛选按钮槽位
    filter:
      rows: 3                  # 筛选界面行数
      slot: [ 0, 1, 2, ... ]   # 分类图标占用的槽位

  exclude:                     # 排除的任务类型，匹配任务的 type 字段
    - hidden

  include:                     # 可选的任务分类筛选器
    main:
      active:                  # 选中状态的图标（XItemStack 格式）
        material: PAPER
        name: "&a主线任务"
      normal:                  # 未选中状态的图标
        material: PAPER
        name: "&7主线任务"

  item:
    info:                      # 信息按钮
      material: COMPASS
      name: "&f任务列表"

    filter:                    # 筛选按钮
      material: HOPPER
      name: "&f分类筛选"

    quest:
      started:                 # 进行中的任务（本人）
        material: BOOK
        name: "&a{{ quest name }}"
        lore:
          - "&7{{ quest desc }}"
      started-shared:          # 进行中的任务（共享成员）
        material: BOOK
        name: "&b{{ quest name }}"
      can-start:               # 可接受的任务
        material: PAPER
        name: "&f{{ quest name }}"
      cannot-start:            # 条件不足，无法接受
        material: GRAY_DYE
        name: "&8{{ quest name }}"
      completed:               # 已完成的任务
        material: MAP
        name: "&7{{ quest name }}"
      unavailable:             # 占位符（填满空槽）
        material: BLACK_STAINED_GLASS_PANE
        name: " "
```

:::tip

`item` 下各字段的 `name` 和 `lore` 支持 Kether 内联语法，可以用 `{{ }}` 读取任务变量，也支持 PlaceholderAPI。

:::

## 任务状态与显示优先级

UI 按以下优先级从高到低排列任务图标：

| 状态 | 配置键 | 说明 |
| --- | --- | --- |
| 进行中（本人） | `quest.started` | 该玩家自己接受的任务 |
| 进行中（共享） | `quest.started-shared` | 队伍共享的任务 |
| 可接受 | `quest.can-start` | 条件满足，可点击接受 |
| 条件不足 | `quest.cannot-start` | 条件不满足，灰显 |
| 已完成 | `quest.completed` | 已完成的历史任务 |

任务是否显示在 UI 中，由任务自身的 [UI 组件](/plugin/chemdah/start/quest/addon/ui)配置决定（`visible.start`、`visible.complete` 等字段）。

## 任务过滤

`include` 定义可选的分类标签，每个标签有激活和未激活两种图标。玩家在筛选界面点击分类后，列表只展示对应 `type` 的任务。

`exclude` 直接排除指定类型的任务，无论玩家如何筛选都不会显示。

任务的类型通过任务文件中的 `type` 字段指定，参见 [任务结构](/plugin/chemdah/start/quest/main#元数据)。

## 打开 UI

通过命令使玩家打开指定 UI：

```
/chemdah quest ui <player> <ui_id>
```

也可以在 Kether 脚本中调用：

```yaml title="脚本中打开 UI"
command "chq ui {{ player name }} main"
```

:::tip

`/chemdah quest ui` 的完整用法参见 [任务系统命令](/plugin/chemdah/start/command/quest)。

:::
