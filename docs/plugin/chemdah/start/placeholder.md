---
sidebar_position: 8
---

# PlaceholderAPI

## Literal

明文定义获取什么东西，前缀均为 `%ch_`。

| 变量名 | 描述 |
|--------|------|
| `%ch_data_<KEY>%` | 获取玩家持久化数据，支持默认值语法 `<KEY>?:<DEFAULT>` |
| `%ch_level_<ID>%` | 获取指定等级线的当前等级 |
| `%ch_exp_<ID>%` | 获取指定等级线的当前经验值 |
| `%ch_maxExp_<ID>%` | 获取指定等级线当前等级所需最大经验 |
| `%ch_tracking%` | 当前追踪的任务 ID，未追踪返回 `null` |
| `%ch_accepted_<QUEST>%` | 是否已接受指定任务（`true` / `false`） |
| `%ch_proceed_<QUEST>%` | 是否正在进行指定任务，含组队共享（`true` / `false`） |
| `%ch_completed_<QUEST>%` | 是否已完成指定任务（`true` / `false`） |
| `%ch_checkAccept_<QUEST>%` | 检查任务接受条件，返回 `AcceptResult.Type` 枚举值 |
| `%ch_questData_<QUEST>:<KEY>%` | 获取任务持久化数据，支持默认值语法 `<KEY>?:<DEFAULT>` |
| `%ch_progressValue_<QUEST>:<TASK>%` | 获取指定条目的进度当前值 |
| `%ch_progressTarget_<QUEST>:<TASK>%` | 获取指定条目的进度目标值 |
| `%ch_progressPercent_<QUEST>:<TASK>%` | 获取指定条目的进度百分比（0.00 ~ 100.00） |
| `%ch_realm%` | 获取玩家当前所在领域 ID，不在任何领域返回 `null` |

:::tip

`<QUEST>` 和 `<TASK>` 填写任务/条目的 ID，`<ID>` 填写等级线 ID，均在对应配置文件中定义。

:::

示例：

```yaml title="记分板配置示例"
- "追踪任务: %ch_tracking%"
- "击杀进度: %ch_progressValue_main_quest:kill_boss% / %ch_progressTarget_main_quest:kill_boss%"
- "战斗等级: %ch_level_combat%"
```

## Kether

执行 Kether 脚本，写法为 `%chemdah_<KetherScript>%`。

```
%chemdah_profile data test%          获取玩家数据中的 "test" 变量
%chemdah_quest accepted main_quest%  检查是否接受了 main_quest
```

:::tip

Kether 变量在执行时会等待脚本完成，若脚本出错会返回 `<ERROR>`；玩家数据未加载时返回 `...`。

:::

## 自定义变量（API）

如果你是开发者，可以通过 API 注册自定义 Literal 变量：

```kotlin title="注册自定义变量"
PlaceholderForLiteral.registerPlaceholder("mykey", PlaceholderData(plugin) { profile, body ->
    // body 是 %ch_mykey_<body>% 中的 body 部分
    profile.persistentDataContainer[body]?.toString() ?: "null"
})
```

注册后即可使用 `%ch_mykey_<body>%` 访问。
