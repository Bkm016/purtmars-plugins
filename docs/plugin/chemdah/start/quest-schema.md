---
sidebar_position: 100
---

# 任务 Schema

完整的任务配置字段参考。所有字段均已标注类型、默认值和使用说明。

## 文件级选项

任务文件中的 `__option__` 节点为当前文件中的所有任务提供默认值。任务自身定义的同名字段会覆盖此处的值。

```yaml title="__option__ 节点"
__option__:
  # 数据隔离标识（字符串）
  # 启用后该文件中的任务数据独立建表，分担主表压力
  # 不设置则使用主表
  data-isolation: ~

  # 是否记录任务完成时间
  # 记录到 user_data 表，key: quest.complete.<id>
  # 禁用会影响依赖判断和重复接受检查
  record-quest-completed: true

  # 是否记录条目完成时间
  # 记录到 user_data 表，key: quest.complete.<id>.<task_id>
  record-task-completed: true

  # 兼容旧配置的字段
  # 同时作为 record-quest-completed 和 record-task-completed 的后备值
  record-completed: true
```

## 任务结构

```yaml title="完整任务结构"
# ═══════════════════════════════════════════════════
# 任务 ID（全局唯一标识符）
# ═══════════════════════════════════════════════════
quest_id:

  # ─── 直接字段 ──────────────────────────────────
  # 以下字段直接写在任务根节点下
  # 它们会覆盖 __option__ 中的同名字段

  # 数据隔离标识
  data-isolation: ~

  # 是否记录任务完成时间
  record-quest-completed: true

  # 是否记录条目完成时间
  record-task-completed: true

  # 兼容旧字段（后备值）
  record-completed: true

  # ─── 元数据 ────────────────────────────────────
  meta:
    # 任务名称（字符串）
    # 支持 & 颜色代码
    name: "&e开采矿石"

    # 任务类型（字符串 | 列表）
    # 用于 UI 分类和分组控制
    # 单个类型：type: 日常
    # 多个类型：type: [日常, 采集]
    # 逗号分隔：type: "日常,采集"
    type: 日常

    # 导入其他任务的元数据
    # 被导入的任务 ID 列表
    import:
      - other_quest_id

  # ─── 条目列表 ──────────────────────────────────
  task:
    # 条目 ID（同一任务内唯一）
    task_id:

      # 条目类型（必填）
      # 在游戏中使用 /chemdah objective 查看可用类型
      # 常见类型：
      #   block break          破坏方块
      #   block place          放置方块
      #   player kill          击杀实体
      #   player attack        攻击实体
      #   entity interact      与实体交互
      #   player chat          聊天
      #   player command       执行命令
      #   trigger              主动触发
      #   player inventory     持有物品
      #   player permission    持有权限
      #   player conversation  完成对话
      #   player conversation closed  关闭对话
      #   always               自动触发
      #   mythicmobs kill      击杀 MythicMobs 怪物
      #   anpc interact        右键 Adyeshach NPC
      #   anpc damage          左键 Adyeshach NPC
      #   custom level         Chemdah 等级变化
      #   player data          Chemdah 数据变化
      #   quest data           任务数据变化
      objective: block break

      # 触发条件
      # 不同 objective 支持不同的条件字段
      # 值支持分号分隔的列表语法：material: "iron_ore;gold_ore"
      condition:
        material: iron_ore

      # 完成目标
      # 计数器类型默认支持 amount（触发次数）
      goal:
        amount: 10

      # 条目元数据
      meta:
        name: "&7挖掘铁矿"

      # ─── 条目级别组件 ────────────────────────
      addon:

        # --- depend（依赖）---
        # 类型：字符串 | 列表
        # 控制条目的激活顺序
        # 值类型：
        #   "task_id"        依赖指定条目完成
        #   "*"              依赖同任务中所有其他条目
        #   "group:组名"     依赖指定组中的所有任务
        depend:
          - other_task_id

        # --- optional（可选）---
        # 类型：布尔值
        # true 表示该条目不影响任务完成判定
        optional: false

        # --- stats（进度统计）---
        # 类型：配置节
        stats:
          # 是否显示进度条
          # true: 进度变化时临时显示
          # false: 不显示
          # "always": 始终显示
          visible: true

          # BossBar 临时显示时长（tick）
          # 默认从 config.yml 的 default-stats.stay 读取
          stay: 100

          # BossBar 样式
          # 可选：SOLID, SEGMENTED_6, SEGMENTED_10, SEGMENTED_12, SEGMENTED_20
          style: SOLID

          # BossBar 颜色
          # 可选：PINK, BLUE, RED, GREEN, YELLOW, PURPLE, WHITE
          color: WHITE

          # 显示文本模板
          # 支持变量：{name} {value} {target} {percent}
          content: "&f{name} &7{value}/{target} &8({percent}%)"

          # BossBar 附加效果
          boss-music: false
          darken-sky: false

          # 自定义进度计算脚本（Kether）
          # 需要设置 value、target、percent 变量
          $:
            - "set value to quest progress value"
            - "set target to quest progress target"

        # --- track（追踪）---
        # 类型：配置节
        # 条目级和任务级均可写，条目级优先
        track:
          # 追踪目标坐标
          # 格式："world x y z"（固定坐标）
          # 格式："adyeshach <实体ID>"（NPC 坐标）
          center: "world 100 64 100"

          # 显示名称
          name: "铁矿石"

          # 描述文本（纯文本列表，不做变量替换）
          # 仅在 scoreboard-option.content 中通过 {description} 引用展开
          description:
            - "前往矿洞开采铁矿石"

          # 开始追踪时的提示信息
          # 支持 {name} 变量
          message:
            - "&a开始追踪：{name}"

        # --- timeout（超时）---
        # 类型：字符串
        # 支持的格式：
        #   "1h30m"              持续时间
        #   "day 4 0"            每天 4:00
        #   "week 3 4 0"          每周三 4:00（参数：星期 1-7, 时, 分）
        #   "month 1 4 0"        每月 1 日 4:00
        #   "2025/1/1 0:0"       绝对日期
        timeout: "1h"

        # --- party（队伍）---
        # 类型：配置节
        party:
          # 是否允许分享给队员
          share: false
          # 仅队长可分享
          share-only-leader: false
          # 队员可以代替完成条目
          continue: false
          # 最少需要的队伍人数
          require-members: 0

        # --- reset-data-on-accepted（接受时重置数据）---
        # 类型：布尔值
        # 接受或重新接受任务时清除条目的持久化数据
        # 仅对实现了 IPlayerData 接口的 objective 生效
        reset-data-on-accepted: false

      # ─── 条目级别脚本代理 ────────────────────
      agent:
        # 条目持续进行时执行（每次条目被检查时）
        continued: |
          tell colored "&7任务进行中..."

        # 条目完成后执行
        completed: |
          tell colored "&a条目已完成！"

        # 条目重新开始时执行
        restarted: |
          tell colored "&e条目已重置。"

  # ─── 任务级别组件 ──────────────────────────────
  # 与 task 同级
  addon:

    # --- ui（任务页面）---
    # 类型：配置节
    # 仅在任务级别使用
    ui:
      # 是否在 UI 中显示
      visible:
        # 接受前是否可见
        start: false
        # 完成后是否可见
        complete: true
      # 显示材质（物品名）
      icon: iron_pickaxe
      # 任务描述
      description:
        - "&7开采铁矿石和金矿石。"

    # --- control（控制）---
    # 类型：列表（每项是一个规则）
    # 仅在任务级别使用
    control:
      # 脚本代理型（直接写 Kether 脚本）
      - $:
          - "check permission example.quest"

      # 共存限制：限制同类型任务同时进行的数量
      - type: coexist
        amount:
          日常: 3
          周常: 5

      # 重复限制：限制接受（或完成）次数
      - type: repeat accept
        amount: 3
        # 周期：每个周期内独立计数
        period: "day 1 6 0"
        # 分组：同 group 的任务共享计数
        group: daily_quest

      # 冷却限制：接受（或完成）后的冷却时间
      - type: cooldown complete
        time: "24h"
        group: daily_quest

    # --- automation（自动化）---
    # 类型：配置节
    # 仅在任务级别使用
    automation:
      # 玩家登录时自动接受
      auto-accept: false
      # 计划任务：按时间规律自动分配
      plan:
        # 计时基准
        # START_IN_MONDAY: 以周一为起点
        # START_IN_SUNDAY: 以周日为起点
        method: START_IN_MONDAY
        # 每个周期分配几个任务
        count: 1
        # 分组名：同组内随机分配
        group: daily_quest
        # 时间表达式
        # "hour <分钟>"                     每小时的第 N 分钟
        # "day <数量> [时] [分]"            每天（别名：daily）
        # "week <数量> <星期> [时] [分]"    每周（别名：weekly），星期 1-7
        type: "day 1 6 0"

    # --- depend（依赖）---
    # 类型：字符串 | 列表
    # 任务级：控制前置任务
    depend:
      - prerequisite_quest_id
      - "group:chapter_one"

    # --- restart（重启条件）---
    # 类型：字符串 | 列表（Kether 脚本）
    # 所有脚本返回 true 时允许重新接受
    restart:
      - "check permission quest.restart"

    # --- timeout（超时）---
    timeout: "7d"

    # --- party（队伍）---
    party:
      share: true
      share-only-leader: false
      continue: true
      require-members: 1

    # --- stats（进度统计）---
    stats:
      visible: "always"
      color: GREEN
      content: "&f{name} &7{value}/{target}"

    # --- track（追踪）---
    # 任务级和条目级均可写
    # 条目级有 track 时使用条目级的；没有时回退到任务级
    track:
      center: "adyeshach npc_elder"
      name: "寻找村长"
      description:
        - "前往村庄中心广场"
      message:
        - "&a开始追踪：{name}"

      # 信标：在目标位置显示粒子光柱
      beacon: true
      beacon-option:
        # 粒子类型
        type: HAPPY_VILLAGER
        # 粒子宽度
        size: 0.3
        # 粒子数量
        count: 2
        # 最大显示距离（方块）
        distance: 128
        # true: 固定在目标位置
        # false: 在玩家前方显示方向指引
        fixed: false
        # 粒子刷新间隔（tick）
        period: 10

      # 地标：在目标位置显示全息文字
      landmark: true
      landmark-option:
        # 最大显示距离（方块）
        distance: 128
        # 靠近目标时自动隐藏
        hide-near: true
        # 显示内容
        # 支持变量：{distance}（距离）、{name}（名称）
        # 注意：{description} 在地标中不生效
        content:
          - "&e{name}"
          - "&7{distance}m"

      # 导航：沿路径播放粒子引导
      navigation: true
      navigation-option:
        # 是否主线程寻路（建议 false）
        sync: false
        # 最大寻路距离（方块）
        distance: 64
        # 显示类型：POINT（粒子点）或 ARROW（箭头）
        type: POINT

        # POINT 模式参数
        point:
          # 粒子发送间隔（tick）
          period: 20
          # 粒子类型
          type: CRIT
          # Y 轴偏移
          y: 0.5
          # 粒子散布范围
          size:
            x: 0.1
            y: 0.1
          # 每个节点的粒子数
          count: 1
          # 节点间延迟（tick）
          speed: 2

        # ARROW 模式参数
        arrow:
          period: 20
          type: CRIT
          y: 1.0
          # 箭头密度
          density: 3
          # 箭头长度
          length: 0.5
          # 箭头张角
          angle: 0.5
          speed: 2

      # 记分板：在屏幕右侧显示任务信息
      scoreboard: true
      scoreboard-option:
        # 每行最大字符数
        length: 20
        # 显示内容
        # 支持变量：{name}（名称）、{description}（展开描述文本）
        content:
          - "&e{name}"
          - "{description}"

  # ─── 任务级别脚本代理 ──────────────────────────
  # 与 task 同级
  # 代理值为 Kether 脚本（字符串或多行字符串）
  agent:
    # 接受前执行，返回 false 可拦截接受
    accept: |
      check permission quest.accept

    # 接受后执行
    accepted: |
      tell colored "&a已接受任务！"

    # 接受被拦截后执行
    accept_cancelled: |
      tell colored "&c无法接受此任务。"

    # 完成前执行，返回 false 可拦截完成
    complete: |
      pass

    # 完成后执行
    completed: |
      tell colored "&a任务完成！"
      command inline "give {{ player name }} diamond 5" as console

    # 失败前执行，返回 false 可拦截失败
    fail: |
      pass

    # 失败后执行
    failed: |
      tell colored "&c任务失败。"

    # 重新接受前执行
    restart: |
      pass

    # 重新接受后执行
    restarted: |
      tell colored "&e任务已重置。"

    # 代理支持 @restrict 后缀
    # @self: 仅触发玩家自己（默认）
    # @all / @*: 广播给队伍所有成员
    accepted@all: |
      tell colored "&a队伍成员接受了任务！"
```

## 变量替换速查

| 变量 | 生效位置 | 来源 |
|------|---------|------|
| `{name}` | `landmark-option.content`、`scoreboard-option.content`、`message` | `track.name` 或任务显示名 |
| `{distance}` | `landmark-option.content` | 玩家到目标的实时距离 |
| `{description}` | `scoreboard-option.content` | 展开 `track.description` 列表 |
| `{value}` | `stats.content` | 当前进度值 |
| `{target}` | `stats.content` | 目标值 |
| `{percent}` | `stats.content` | 百分比 |

:::tip

`track.description` 是纯文本列表，其中不做任何变量替换。`{distance}` 和 `{name}` 只在 `landmark-option.content` 等显示模板中生效。

:::

## 脚本代理类型速查

### 任务级别

| YAML 键 | 触发时机 | 可拦截 |
|---------|---------|-------|
| `accept` | 接受前 | 是 |
| `accepted` | 接受后 | 否 |
| `accept_cancelled` | 接受被拦截后 | 否 |
| `complete` | 完成前 | 是 |
| `completed` | 完成后 | 否 |
| `fail` | 失败前 | 是 |
| `failed` | 失败后 | 否 |
| `restart` | 重新接受前 | 是 |
| `restarted` | 重新接受后 | 否 |

### 条目级别

| YAML 键 | 触发时机 | 可拦截 |
|---------|---------|-------|
| `continued` | 条目被检查时 | 否 |
| `completed` | 条目完成后 | 否 |
| `restarted` | 条目重置后 | 否 |

:::tip

代理键名解析规则：转为大写后，空格和冒号替换为下划线。因此 `accept_cancelled` 和 `accept cancelled` 等价，但连字符 `-` 不会被替换（`accept-cancelled` 无效）。

:::
