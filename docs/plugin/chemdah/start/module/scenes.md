---
sidebar_position: 8
---

# 演出方块模块

演出方块（Scenes）可以让特定玩家看到与实际世界不同的方块，其他玩家不受影响。常用于任务演出效果，比如打开隐藏通道、展示宝箱、触发地形变化。

配置文件为 `Chemdah/module/scenes.yml`。

## 工作原理

每个演出配置包含若干 `state`（状态），每个状态定义一组方块替换规则。通过脚本动作发送（`scenes send`）或撤销（`scenes cancel`）对特定玩家生效。方块变化仅在客户端，服务端世界不变。

## 配置示例

```yaml title="Chemdah/module/scenes.yml"
# 演出 id
hidden_passage:
  # 所在世界
  in: world
  state:
    # 状态 0：打开通道
    0:
      # 相对原点偏移（可选）
      relative: "100 64 200"
      # 方块替换规则：坐标范围 > 方块类型
      set:
        # 单个方块
        - "0 0 0 > air"
        # 区域替换（起点~终点）
        - "0 0 1 ~ 0 2 3 > air"
      # 执行 Kether 脚本（可选）
      $:
        - "sound &player block.piston.extend"
      # 延迟自动切换到下一个状态（单位：tick，0 表示不自动切换）
      auto-next: 0

# 复制区域演出
chest_scene:
  in: world
  state:
    0:
      copy:
        # 从哪个世界复制（默认同 in）
        from-world: world_template
        # 源区域
        from: "50 60 100 ~ 60 70 110"
        # 目标起点
        to: "200 64 300"
        # 是否以掉落方块形式呈现
        falling: false
```

## 脚本动作

在任务脚本或对话脚本中操作演出方块：

```yaml title="任务脚本中使用演出方块"
# 对玩家发送演出（显示状态 0）
scenes send "hidden_passage" state 0

# 撤销演出（恢复原始方块）
scenes cancel "hidden_passage"
```

## 关联事件

玩家在演出方块上的操作会触发专属事件，不影响原始世界：

| 事件 | 说明 | 默认状态 |
| --- | --- | --- |
| `PlayerEvents.ScenesBlockBreak` | 玩家破坏演出方块 | 默认已取消（不会真正破坏） |
| `PlayerEvents.ScenesBlockInteract` | 玩家交互演出方块 | 不可取消 |

```kotlin title="监听演出方块交互"
import ink.ptms.chemdah.api.event.collect.PlayerEvents
import taboolib.common.platform.event.SubscribeEvent

object ScenesListener {

    @SubscribeEvent
    fun onInteract(e: PlayerEvents.ScenesBlockInteract) {
        val player = e.player
        val block = e.blockData
        player.sendMessage("你点击了演出方块：${block.material}")
    }
}
```

:::tip

演出方块的坐标系基于 `relative` 字段定义的原点偏移。如果不设置 `relative`，坐标就是世界绝对坐标。

:::
