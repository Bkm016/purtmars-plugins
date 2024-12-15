---
sidebar_position: 7
---

# 单位骑乘

你可以使用骑乘命令使单位骑乘另一个单位。

```
/npc passenger <id>
                ├──── add <other-id>
                ├──── remove <other-id>
                └──── reset
```

### 添加一个乘客

使指定单位头顶上坐个单位，若名称重复则展开二次确认页面。

```
/npc passenger test add test_2
```

:::tip

如果乘客的名称重复，会全部坐上去。

:::

### 移除一个乘客

让指定单位头顶上坐着的单位下来。

```
/npc passenger test remove test_2
```

:::tip

单位离开载具时，不一定会回到原来的位置，这是正常现象。

:::

### 重置乘客

让指定单位头顶上坐着的单位全部下来。

```
/npc passenger test reset
```