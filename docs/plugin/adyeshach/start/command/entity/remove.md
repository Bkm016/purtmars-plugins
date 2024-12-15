---
sidebar_position: 2
---

# 删除单位

作为核心命令，它的用法非常简单。只需输入 `/npc remove <名称>` 即可删除单位。

```
/npc remove test
```

插件会在编辑命令时建议出所有可用的单位名称：

![](/img/command-remove-1.png)

删除后，单位将会消失：

![](/img/command-remove-2.png)

:::tip

对于公共单位，将会在删除后移送至回收站，以便于管理员进行恢复。

:::

## 名称重复

若删除的单位名称与其他单位重复，插件将会进行二次确认：

<img id="game_img" src="/img/command-remove-3.png" width="600" style={{marginBottom: "1rem"}}/>

你可以点击确认信息中的 `红色` 按钮**精确删除**，也可以点击 `橙色` 按钮传送至单位所在位置。

<img id="game_img" src="/img/command-remove-4.png" width="600" style={{marginBottom: "1rem"}}/>

## 就近删除

你也可以省略单位名称，直接输入 `/npc remove` 来删除你所在位置附近（16）的单位：

<img id="game_img" src="/img/command-remove-5.png" width="600" style={{marginBottom: "1rem"}}/>

:::caution

如果附近（16）只有一个单位，将不会出现二次确认信息。

:::