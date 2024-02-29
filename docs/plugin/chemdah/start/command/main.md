---
sidebar_position: 1
---

# 命令结构

插件主命令为 `/chemdah`，也可以是 `/ch`，所有的功能入口都在这里。

```
 Usage: /chemdah
         ├── api
         │   ├── createscenes <player> <scenes> <index>
         │   ├── cancelscenes <player> <scenes> <index>
         │   ├── conversation
         │                ├── npc <player> <id> look
         │                └── self <player> <id> <name>
         │   ├── generate <name> [<amount>]
         │   ├── blockinfo
         │   ├── position
         │            ├── self
         │            └── target
         │   ├── wizard info <id>
         │   └── objective <name>
         ├── data
         │    ├── set <player> <key> <value>
         │    ├── add <player> <key> <value>
         │    ├── remove <player> <key>
         │    └── clear <player>
         ├── level
         │     ├── addlevel <player> <level> <value>
         │     ├── setlevel <player> <level> <value>
         │     ├── addexp <player> <level> <value>
         │     └── setexp <player> <level> <value>
         ├── quest
         │     ├── accept <player> <quest>
         │     ├── failure <player> <quest>
         │     ├── complete <player> <quest>
         │     ├── complete-task <player> <quest> <task>
         │     ├── restart <player> <quest>
         │     ├── stop <player> <quest>
         │     ├── trigger <player> <value>
         │     ├── triggerAll <value>
         │     ├── info <player> [<quest>]
         │     ├── ui <player> <ui>
         │     └── track <player> <quest>
         │                    └── cancel
         ├── script
         │      ├── run <file> [<viewer>] [<args>]
         │      ├── stop [<file>]
         │      ├── list
         │      ├── reload
         │      ├── debug
         │      ├── invoke <script>
         │      ├── invoke-now <script>
         │      └── invoke-wait <script>
         ├── variable
         │        ├── get <key>
         │        ├── set <key> <value>
         │        ├── add <key> <value>
         │        ├── remove <key>
         │        └── list
         ├── info <player> [<page>]
         ├── save <player>
         ├── mirror
         └── reload
```

主要包含以下几个部分：

+ 开发工具 —— `api`
+ 玩家数据 —— `data`
+ 玩家等级 —— `level`
+ 任务系统 —— `quest`
+ 脚本系统 —— `script`
+ 变量系统 —— `variable`
+ 其他

详见子页面。

:::tip

玩家数据在默认配置下自动保存，无需使用 `/ch save` 命令。

:::