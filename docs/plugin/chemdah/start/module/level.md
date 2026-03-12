---
sidebar_position: 2
---

# 等级系统

等级系统配置文件位于 `Chemdah/module/level.yml`，支持同时定义多套独立的等级体系，每套用唯一 ID 区分。

## 基本结构

```yaml title="module/level.yml"
# 顶层 key 就是等级体系的 ID，可以有多个
combat:                        # 战斗等级体系
  min: 1                       # 最低等级（玩家数据低于此值时强制修正）
  max: 100                     # 最高等级上限
  experience:
    type: kether               # 算法类型：kether 或 javascript
    math: "( * level 100 )"   # 升到下一级所需经验，level 为当前等级
  reward:
    1: |                       # 升到第 1 级时执行
      tell "恭喜升到 1 级！"
    5-10: |                    # 升到 5~10 级时都执行（用 - 或 ~ 分隔范围）
      tell "恭喜升级！"

crafting:                      # 另一套独立的等级体系
  min: 0
  max: 50
  experience:
    type: javascript
    math: "level * 200 + 500"  # JS 表达式，同样可用 level 变量
```

## 经验算法

`experience.type` 支持两种写法：

| 类型 | `math` 写法 | 说明 |
|------|------------|------|
| `kether` | Kether 脚本表达式 | 使用 Kether 语法计算 |
| `javascript` | JS 表达式 | 使用 JavaScript 引擎计算 |

两种类型中都可以用 `level` 变量，代表玩家当前等级，返回值为升级所需的经验量。

:::tip

`math` 的返回值是**升到下一级所需的经验**，不是累计总经验。等级系统会自动根据公式逐级计算升级所需量。

:::

## 等级奖励

`reward` 下的 key 支持单个等级或等级范围，value 是 Kether 脚本，升级时自动执行。

```yaml title="奖励配置示例"
combat:
  reward:
    10: |                        # 精确匹配第 10 级
      tell "你达到了 10 级！"
      command "give {player} diamond 1"
    20-30: |                     # 20 到 30 级，每升一级都触发
      tell "继续努力！"
    50~99: |                     # ~ 和 - 效果相同
      tell "接近满级了！"
```

奖励脚本中可以用 `level` 变量获取玩家当前升到的等级。

## 相关命令

```
/chemdah level <玩家> <等级体系ID> set|give|take <数值>
```

用于管理员手动设置或调整玩家的等级和经验。
