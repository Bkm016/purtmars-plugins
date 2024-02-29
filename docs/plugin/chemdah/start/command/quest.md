---
sidebar_position: 5
---

# 任务系统

指令入口为 `/chemdah quest` 或 `/chq`。

```
 Usage: /chemdahquest
         ├── accept <player> <quest>
         ├── failure <player> <quest>
         ├── complete <player> <quest>
         ├── complete-task <player> <quest> <task>
         ├── restart <player> <quest>
         ├── stop <player> <quest>
         ├── trigger <player> <value>
         ├── triggerAll <value>
         ├── info <player> [<quest>]
         ├── ui <player> <ui>
         └── track <player> <quest>
                        └── cancel
```

## accept

使玩家接受任务

```
/chq accept bukkitObj test_quest
```

## failure

使玩家的任务失败。

```
/chq failure bukkitObj test_quest
```

:::tip

使用 `*` 表示所有任务。

:::

## complete

使玩家的任务完成。

```
/chq complete bukkitObj test_quest
```

:::tip

使用 `*` 表示所有任务。

:::

## complete-task

是玩家任务中的特定条目完成。

```
/chq complete-task bukkitObj test_quest task_0
```

## restart

使玩家重新开始任务。

```
/chq restart bukkitObj test_quest
```

:::tip

使用 `*` 表示所有任务。

:::

## stop

停止玩家的任务。

```
/chq stop bukkitObj test_quest
```

:::tip

使用 `*` 表示所有任务。

:::

## trigger

触发玩家的 `trigger` 类型任务。

```
/chq trigger bukkitObj test_trigger
```

## triggerAll

触发所有玩家的 `trigger` 类型任务。

```
/chq triggerAll test_trigger
```

## info

查看玩家的任务信息。

### 所有任务

```
/chq info bukkitObj
```

### 特定任务

```
/chq info bukkitObj test_quest
```

<img id="game_img" src="/img/command-quest-info.png" width="600" style={{marginBottom: "1rem"}}/>

## ui

使玩家打开任务页面。

```
/chq ui bukkitObj test_ui
```

<img id="game_img" src="/img/command-quest-ui.png" width="600" style={{marginBottom: "1rem"}}/>

## track

使玩家追踪任务。

### 追踪任务

```
/chq track bukkitObj test_quest
```

### 取消追踪

```
/chq track bukkitObj cancel
```