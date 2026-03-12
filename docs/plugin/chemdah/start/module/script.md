---
sidebar_position: 4
---

# 脚本模块

Chemdah 在 TabooLib 的 Kether 脚本引擎基础上扩展了一批专属动作，用于操控任务、玩家数据、对话等。

脚本文件放在 `Chemdah/module/script/` 目录下，扩展名为 `.ks`。

可用命名空间：`chemdah`、`chemdah-quest`。

## 任务操作

关键字 `quest`，作用于当前选中的任务（通过 `quest select` 切换）。

| 动作 | 说明 |
| --- | --- |
| `quest select <id>` | 选中任务，后续操作均作用于该任务 |
| `quest accepted` | 返回玩家是否正在进行该任务 |
| `quest completed` | 返回任务是否已完成 |
| `quest accept` | 使玩家接受任务，返回接受结果 |
| `quest accept-check` | 检查接受条件，不实际接受 |
| `quest complete` | 完成任务 |
| `quest complete-task <task>` | 完成任务中的某个条目 |
| `quest close-task <task>` | 关闭任务中的某个条目 |
| `quest fail` | 使任务失败 |
| `quest reset` | 重置任务 |
| `quest stop` | 放弃任务 |
| `quest track` | 追踪任务 |
| `quest track cancel` | 取消追踪 |
| `quest count` | 返回玩家进行中的任务数量 |
| `quest tasks` | 返回当前任务的所有条目名列表 |
| `quest data <key>` | 读取任务数据 |
| `quest data <key> to <value>` | 设置任务数据 |
| `quest data <key> add <value>` | 累加任务数据 |
| `quest progress value/target/percent [task <task>]` | 读取任务或条目进度 |

```yaml title="示例：接受并追踪任务"
quest select "main_quest_01"
quest accept
quest track
```

```yaml title="示例：判断条件后完成任务"
quest select "daily_task"
if quest accepted {
  quest complete
}
```

关键字 `quests` 返回玩家当前所有进行中任务的 id 列表：

```yaml title="示例：列出所有任务"
set &list to quests
```

## 玩家数据

关键字 `profile`，操作玩家的持久化数据容器。

| 动作 | 说明 |
| --- | --- |
| `profile data <key>` | 读取数据，不存在返回 null |
| `profile data <key> default <val>` | 读取数据，不存在时返回默认值 |
| `profile data <key> to <value>` | 设置数据 |
| `profile data <key> add <value>` | 累加数据 |
| `profile data keys` | 返回所有 key 列表 |
| `profile save` | 立即将数据推送到数据库 |

```yaml title="示例：记录玩家杀敌数"
profile data "kill_count" add 1
```

## 等级操作

等级操作也通过 `profile level` 完成，需要对应 id 已在等级模块中定义。

| 动作 | 说明 |
| --- | --- |
| `profile level <id> level` | 读取等级值 |
| `profile level <id> exp` | 读取当前经验值 |
| `profile level <id> exp-max` | 读取升级所需经验值 |
| `profile level <id> level to <n>` | 设置等级 |
| `profile level <id> exp to <n>` | 设置经验 |
| `profile level <id> level add <n>` | 增加等级 |
| `profile level <id> exp add <n>` | 增加经验 |

```yaml title="示例：奖励经验"
profile level "default" exp add 100
```

## 全局变量

关键字 `var`，操作服务器级别的全局变量（所有玩家共享）。

| 动作 | 说明 |
| --- | --- |
| `var <key>` | 读取变量 |
| `var <key> to <value>` | 设置变量 |
| `var <key> add <value>` | 累加变量 |
| `var keys` | 返回所有 key 列表 |

```yaml title="示例：全服计数器"
var "server_kill_total" add 1
```

## 触发器

关键字 `trigger`，手动触发 `trigger` 类型的任务条目。

```yaml title="示例：单个触发器"
trigger "player_crafted"
```

```yaml title="示例：批量触发"
trigger in [ "step_a" "step_b" "step_c" ]
```

## 对话操作

对话相关动作仅在对话上下文（命名空间 `chemdah-conversation`）中有效。

| 动作 | 说明 |
| --- | --- |
| `open <id>` | 打开另一段对话 |
| `goto <id>` | 跳转到另一段对话（保留当前会话） |
| `close` | 关闭当前对话 |

```yaml title="示例：对话条件分支"
if &choice == "yes" {
  goto "quest_accept_conv"
} else {
  close
}
```

## 脚本互调

在脚本内部可以调用其他脚本文件。

| 动作 | 说明 |
| --- | --- |
| `script run <name>` | 运行脚本（全局唯一实例） |
| `script run <name> @self` | 运行脚本（每个玩家独立实例） |
| `script run <name> using [ <arg0> <arg1> ]` | 运行脚本并传参 |
| `script stop <name>` | 停止脚本 |

```yaml title="示例：调用奖励脚本并传参"
script run "give_reward" using [ "diamond" 5 ]
```

:::tip

脚本内通过 `&arg0`、`&arg1` 依次获取传入的参数。

:::

## 相关命令

脚本文件通过 `/chemdah script` 管理，详见 [脚本系统命令](/plugin/chemdah/start/command/script)。
