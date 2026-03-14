---
sidebar_position: 9
---

# 名称生成器模块

名称生成器（Generator）基于 Kether 脚本，按规则随机生成各类名称，比如城市名、人名、物品名等。

脚本文件放在 `Chemdah/module/generator/` 目录下，扩展名为 `.ks`。

## 内置生成器

插件首次启动时会自动释放以下内置生成器：

| 文件名 | 用途 |
| --- | --- |
| `city` | 城市名 |
| `dragon_1` / `dragon_2` / `dragon_3` | 龙族名字 |
| `dwarf_1` / `dwarf_2` | 矮人名字 |
| `elf_1` / `elf_2` / `elf_3` | 精灵名字 |
| `human` | 人类名字 |
| `item` | 物品名 |
| `kingdom` | 王国名 |
| `town` | 村庄名 |

## 命令

```
/chemdah api generate <name> [amount]
```

- `name`：生成器名称（对应文件名，不含扩展名）
- `amount`：生成数量，默认 1

```bash title="示例：生成 3 个人类名字"
/chemdah api generate human 3
```

## 在脚本中使用

在 Kether 脚本中通过 `name` 动作调用生成器：

```yaml title="生成一个随机城市名"
set &city_name to name "city"
tell &player "欢迎来到 &city_name"
```

:::tip

`name` 动作注册在 `chemdah_name_generator` 命名空间下，在任务代理和独立 `.ks` 脚本中可以直接使用。`name` 动作会自动将首字母大写。如果需要多次生成不同的名字，多次调用即可，每次结果独立随机。

:::

## 自定义生成器

在 `Chemdah/module/generator/` 目录下新建 `.ks` 文件即可创建自定义生成器。脚本最终 `return` 的字符串就是生成结果。

```yaml title="Chemdah/module/generator/tavern.ks"
# 自定义：酒馆名生成器
set &prefix to array random in [ "金" "银" "铁" "玫瑰" "龙骨" ]
set &suffix to array random in [ "酒馆" "旅店" "客栈" "驿站" ]
return "&prefix&suffix"
```

调用方式与内置生成器相同：

```yaml title="使用自定义生成器"
set &tavern to name "tavern"
tell &player "最近的酒馆是 &tavern"
```
