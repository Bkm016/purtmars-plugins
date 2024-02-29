---
sidebar_position: 7
---

# 变量系统

指令入口为 `/chemdah vars` 或 `/chv`。

```
 Usage: /chemdahvariables
         ├── get <key>
         ├── set <key> <value>
         ├── add <key> <value>
         ├── remove <key>
         └── list
```

全局变量系统。该命令用法十分直观，不做过多介绍。

:::tip

全局变量可通过 `var` 语法在 [Kether](https://kether.tabooproject.org/list.html#Variable) 脚本，或 [PlaceholderAPI](/plugin/chemdah/start/placeholder) 变量中访问。

:::

## Kether

### 设置变量

```
$ var test to Hello World
```

### 获取变量

```
$ var test
```

```
> Hello World
```

### 获取所有

```
$ var keys
```

```
> [test, test2]
```

## PlaceholderAPI

```
%chemdah_var test%
```

:::tip

其实就是执行 Kether 脚本 `var test`。

:::