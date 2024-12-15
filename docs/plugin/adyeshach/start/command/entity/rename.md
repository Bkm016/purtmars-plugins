---
sidebar_position: 3
---

# 单位更名

这里的更名指的是修改单位的**序号**（ID）而不是修改单位的**展示名称**（CustomName）。

```
/npc rename test test_2
```

插件会在编辑命令时建议出所有可用的单位名称：

![](/img/command-rename-1.png)

更名后：

![](/img/command-rename-2.png)

:::tip

更名命令与删除命令不同，不允许你进行快速操作，而是需要输入完整的命令参数。

:::

## 名称重复

若更名的单位名称与其他单位重复，插件将会进行二次确认：

<img id="game_img" src="/img/command-rename-3.png" width="600" style={{marginBottom: "1rem"}}/>

你可以点击确认信息中的 `黄色` 按钮**精确选择**，也可以点击 `橙色` 按钮传送至单位所在位置。

<img id="game_img" src="/img/command-rename-4.png" width="600" style={{marginBottom: "1rem"}}/>