---
sidebar_position: 3
---

# 玩家数据

指令入口为 `/ChemdahPlayerData`（别名 `/chpd`）。

```
 Usage: /chemdahplayerdata
         ├── set <player> <key> <value>
         ├── add <player> <key> <value>
         ├── remove <player> <key>
         └── clear <player>
```

<img id="game_img" src="/img/command-data-suggest.png" width="600" style={{marginBottom: "1rem"}}/>

<img id="game_img" src="/img/command-data-info.png" width="600" style={{marginBottom: "1rem"}}/>

:::tip

查看玩家数据使用 `/chemdah info <player>` 命令。

:::

## set

设置玩家某个数据键的值，原有值会被覆盖。

```
/chpd set <player> <key> <value>
```

```text title="示例"
/chpd set Steve kill_count 10
```

## add

在玩家某个数据键的现有值上叠加。数值型会做加法，字符串型会拼接。

```
/chpd add <player> <key> <value>
```

```text title="示例"
/chpd add Steve kill_count 5
```

## remove

删除玩家的某个数据键。传入 `*` 时等同于清空全部数据。

```
/chpd remove <player> <key>
```

```text title="示例"
/chpd remove Steve kill_count
/chpd remove Steve *
```

## clear

清空玩家的全部数据，与 `remove <player> *` 效果相同。

```
/chpd clear <player>
```

```text title="示例"
/chpd clear Steve
```
