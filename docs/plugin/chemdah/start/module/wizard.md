---
sidebar_position: 7
---

# 向导模块

向导模块（Wizard）让 NPC 能够引导玩家从一个地点走到另一个地点。需要安装 Adyeshach 插件。

配置文件放在 `Chemdah/module/wizard/` 目录下，每个文件可以包含多个向导配置。

## 工作原理

向导模块通过 `nodes`（路径节点）列表，利用 Minecraft 原生寻路算法自动计算 NPC 的行走路径。路径会缓存到本地，重启时直接读取，无需重新计算。

当玩家距离 NPC 超过 `waiting-distance` 时，NPC 会原地等待；玩家跟上来后继续前进。NPC 到达终点（最后一个节点 `finish-distance` 范围内）后，触发完成脚本。

## 配置示例

```yaml title="Chemdah/module/wizard/guide_to_village.yml"
guide_to_village:
  # 所在世界
  in: world
  # 路径节点（NPC 经过的坐标）
  nodes:
    - "100 64 200"
    - "120 64 210"
    - "150 65 230"
    - "180 64 250"
  # 到达终点的判定距离
  finish-distance: 2.0
  # 玩家超过此距离时 NPC 停下等待
  waiting-distance: 10.0
  # 是否在引导期间禁止触发对话
  disable-conversation: true
  # 各阶段触发的 Kether 脚本
  event:
    # 玩家跟上来，NPC 继续移动时
    continue: "tell &player '跟上来！'"
    # 玩家落后，NPC 暂停等待时
    waiting: "tell &player '等你呢，快点！'"
    # NPC 到达终点时
    finish: "tell &player '到了，这就是村子。'"
  # 事件触发冷却（避免频繁触发）
  event-cooldown: 5s
  # 寻路初始化最大重试次数（世界未加载时自动重试）
  init-retry: 3
  init-retry-delay: 20
```

## 在脚本中启动向导

在任务脚本或对话脚本中，通过 `wizard` 动作启动引导：

```yaml title="对话脚本中启动向导"
# 启动向导，NPC 通过上下文中的 @entities 变量传入
wizard to "guide_to_village"

# 取消当前向导
wizard cancel
```

:::tip

路径节点之间的距离建议不超过 30 格，相邻节点间距过大可能导致寻路失败。如果路径不连续（相邻坐标距离超过 2 格），会在控制台输出警告并跳过该向导。

:::
