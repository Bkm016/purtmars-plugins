---
sidebar_position: 4
---

# 玩家等级

指令入口为 `/ChemdahPlayerLevel`（别名 `/chpl`）。

```
 Usage: /chemdahplayerlevel
         ├── addlevel <player> <level> <value>
         ├── setlevel <player> <level> <value>
         ├── addexp <player> <level> <value>
         └── setexp <player> <level> <value>
```

该命令用于修改 [等级模块](/plugin/chemdah/start/module/level) 中的数据，而非原版 Minecraft 等级。

## addlevel

给玩家某个等级系统增加等级。

```
/chpl addlevel <player> <level> <value>
```

| 参数       | 说明                    |
|----------|-----------------------|
| `player` | 玩家名                   |
| `level`  | 等级系统 ID（配置文件中定义的键名）   |
| `value`  | 增加的等级数，可为负数           |

```text title="示例"
/chpl addlevel Steve combat 1
```

## setlevel

将玩家某个等级系统的等级设为指定值。

```
/chpl setlevel <player> <level> <value>
```

```text title="示例"
/chpl setlevel Steve combat 10
```

## addexp

给玩家某个等级系统增加经验值。经验满足升级条件时会自动升级。

```
/chpl addexp <player> <level> <value>
```

```text title="示例"
/chpl addexp Steve combat 500
```

## setexp

将玩家某个等级系统的经验值设为指定值，不触发升级判断。

```
/chpl setexp <player> <level> <value>
```

```text title="示例"
/chpl setexp Steve combat 0
```
