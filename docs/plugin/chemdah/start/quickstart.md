---
sidebar_position: 3
---

# 快速上手

这个页面会带你从零开始创建一个完整的任务，涵盖任务结构的核心概念。

## 创建任务文件

在 `Chemdah/core/quest/` 目录下创建一个 YAML 文件，文件名随意，比如 `my_first_quest.yml`。

```yaml title="Chemdah/core/quest/my_first_quest.yml"
# 任务 ID（全局唯一）
mine_iron:
  # 元数据
  meta:
    name: 开采铁矿
  # 条目列表
  task:
    # 条目 ID（同一任务内唯一）
    dig:
      # 条目类型
      objective: block break
      # 触发条件
      condition:
        material: iron_ore
      # 完成目标
      goal:
        amount: 10
```

保存文件后，在游戏中执行 `/chemdah reload` 重载配置。

## 测试任务

用以下命令接受并测试这个任务：

```
/chemdah quest accept mine_iron
```

破坏 10 个铁矿石后，任务自动完成。其他常用命令：

| 命令 | 说明 |
|------|------|
| `/chemdah quest accept <ID>` | 接受任务 |
| `/chemdah quest stop <ID>` | 放弃任务 |
| `/chemdah quest complete <ID>` | 强制完成任务 |
| `/chemdah quest status` | 查看当前任务状态 |

:::tip

游戏中执行 `/chemdah objective` 可以查看所有可用的条目类型。

:::

## 添加元数据

`meta` 节点存储任务的附加信息。目前最常用的是 `name`（名称）和 `type`（类型）。

```yaml title="示例"
mine_iron:
  meta:
    name: 开采铁矿
    # 任务类型，可用于 UI 分类
    # 也可以写成列表：type: [日常, 采集]
    type: 日常
  task:
    dig:
      objective: block break
      condition:
        material: iron_ore
      goal:
        amount: 10
```

## 添加组件

组件（addon）为任务提供附加功能，写在 `addon` 节点下。`addon` 可以写在任务级别，也可以写在条目级别。

```yaml title="任务级别的组件"
mine_iron:
  meta:
    name: 开采铁矿
  task:
    dig:
      objective: block break
      condition:
        material: iron_ore
      goal:
        amount: 10
  # 任务级别组件，与 task 同级
  addon:
    # UI 组件：在任务页面中显示
    ui:
      icon: iron_pickaxe
      description: |-
        &7开采 10 个铁矿石。
```

```yaml title="条目级别的组件"
mine_iron:
  meta:
    name: 开采铁矿
  task:
    dig:
      objective: block break
      condition:
        material: iron_ore
      goal:
        amount: 10
      # 条目级别组件，与 objective 同级
      addon:
        # 追踪组件：引导玩家前往目标
        track:
          name: 铁矿石
          center: world 100 64 100
        # 统计组件：显示进度
        stats:
          visible: true
```

:::tip

组件的详细说明在左侧「组件」分类下，每种组件都有独立的文档页。

:::

## 添加脚本代理

脚本代理（agent）在任务生命周期的特定节点执行 Kether 脚本，写在 `agent` 节点下。

```yaml title="任务级别的脚本代理"
mine_iron:
  meta:
    name: 开采铁矿
  task:
    dig:
      objective: block break
      condition:
        material: iron_ore
      goal:
        amount: 10
  addon:
    ui:
      icon: iron_pickaxe
  # 任务级别代理，与 task 同级
  agent:
    # 接受任务后执行
    accepted: |
      tell colored "&a已接受任务：开采铁矿"
    # 完成任务后执行
    completed: |
      tell colored "&a任务完成！"
      command inline "give {{ player name }} diamond 5" as console
```

任务级别支持的代理类型：

| 类型 | 触发时机 |
|------|---------|
| `accept` | 接受前（可拦截） |
| `accepted` | 接受后 |
| `complete` | 完成前（可拦截） |
| `completed` | 完成后 |
| `fail` | 失败前（可拦截） |
| `failed` | 失败后 |
| `restart` | 重新接受时 |

条目级别也有自己的代理：

```yaml title="条目级别的脚本代理"
mine_iron:
  task:
    dig:
      objective: block break
      condition:
        material: iron_ore
      goal:
        amount: 10
      # 条目级别代理，与 objective 同级
      agent:
        completed: |
          tell colored "&a条目完成：铁矿已开采完毕"
```

## 多条目任务

一个任务可以包含多个条目。通过 `depend` 组件可以控制条目之间的先后顺序。

```yaml title="多条目 + 依赖"
mine_ores:
  meta:
    name: 矿石采集
  task:
    iron:
      objective: block break
      condition:
        material: iron_ore
      goal:
        amount: 10
      addon:
        stats:
          visible: true
    gold:
      objective: block break
      condition:
        material: gold_ore
      goal:
        amount: 5
      addon:
        # 依赖 iron 条目完成后才会激活
        depend:
          - iron
        stats:
          visible: true
  addon:
    ui:
      icon: iron_pickaxe
      description: |-
        &7依次开采铁矿石和金矿石。
  agent:
    accepted: |
      tell colored "&a已接受任务：矿石采集"
    completed: |
      tell colored "&a任务完成！奖励已发放。"
      command inline "give {{ player name }} diamond 10" as console
```

## 完整参考

把上面所有概念组合在一起，一个完整的任务结构如下：

```yaml title="完整结构参考"
quest_id:
  meta:
    name: 任务名称
    type: 任务类型
  task:
    task_id:
      objective: 条目类型
      condition:
        # 触发条件...
      goal:
        amount: 10
      addon:
        # 条目级别组件...
      agent:
        # 条目级别代理...
  addon:
    # 任务级别组件...
  agent:
    # 任务级别代理...
```

到这里你已经掌握了 Chemdah 任务系统的基本用法。接下来可以浏览左侧导航，深入了解各种[条目类型](/plugin/chemdah/start/quest/task/type)、[组件](/plugin/chemdah/start/quest/addon/track)和[脚本代理](/plugin/chemdah/start/quest/agent/quest)。
