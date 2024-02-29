---
sidebar_position: 6
---

# 脚本系统

指令入口为 `/chemdah script` 或 `/chs`。

```
 Usage: /chemdahscript
         ├── run <file> [<viewer>] [<args>]
         ├── stop [<file>]
         ├── list
         ├── reload
         ├── debug
         ├── invoke <script>
         ├── invoke-now <script>
         └── invoke-wait <script>
```

该命令用于执行 [Kether](/function/kether) 脚本或控制 [脚本模块](/plugin/chemdah/start/module/script) 中的 [Kether](/function/kether) 脚本。

## run

执行一个脚本文件。

### 直接执行

```
/chemdah script run script.ks
```

### 以特定玩家身份执行

```
/chemdah script run script.ks bukkitObj
```

### 传递参数

```
/chemdah script run script.ks bukkitObj Hello World
```

* 参数 `Hello` 在脚本中可以通过 `&arg0` 获取。
* 参数 `World` 在脚本中可以通过 `&arg1` 获取。

## stop

停止一个正在执行的脚本。

```
/chemdah script stop script.ks
```

## list

列出所有正在执行的脚本。

```
>chs list
[00:00:00] [Server thread/INFO]: [Chemdah] 所有脚本: test.ks, script.ks
[00:00:00] [Server thread/INFO]: [Chemdah] 运行脚本: test.ks
```

## reload

重新加载所有脚本。

## debug

打印当前注册在 Chemdah 中的所有 Kether 动作。

## invoke

执行一段 Kether 脚本。

```
/chemdah script invoke info "Hello, World!"
```

```
>chemdah script invoke info "Hello, World!" 
[00:00:00] [Server thread/INFO]: [Chemdah] Hello, World!
[00:00:00] [Server thread/INFO]: [System] Result: Unit (Java Object)
```