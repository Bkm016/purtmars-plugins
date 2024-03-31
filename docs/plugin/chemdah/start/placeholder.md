---
sidebar_position: 8
---

# PlaceholderAPI

### Literal

明文定义获取什么东西。

| 变量名                                 | 描述            |
|-------------------------------------|---------------|
| %ch_data_<KEY>%                     | 获取数据          |
| %ch_level_<ID>%                     | 获取等级          |
| %ch_exp_<ID>%                       | 获取当前经验        |
| %ch_maxExp_<ID>%                    | 获取最大经验        |
| %ch_tracking%                       | 当前追踪任务        |
| %ch_accepted_<QUEST>%               | 是否接受任务        |
| %ch_proceed_<QUEST>%                | 是否正在进行任务（含组队） |
| %ch_completed_<QUEST>%              | 是否完成任务        |
| %ch_checkAccept_<QUEST>%            | 检查任务接受条件      |
| %ch_questData_<QUEST>:<KEY>%        | 获取任务数据        |
| %ch_progressValue_<QUEST>:<TASK>%   | 获取任务进度（当前值）   |
| %ch_progressTarget_<QUEST>:<TASK>%  | 获取任务进度（目标值）   |
| %ch_progressPercent_<QUEST>:<TASK>% | 获取任务进度（百分比）   |
| %ch_realm%                          | 获取所在领域        |

### Kether

执行 Kether 脚本，写法为 `%chemdah_<KetherScript>%`。

```
%chemdah_profile data test% ······· 获取玩家数据中的 "test" 变量
```