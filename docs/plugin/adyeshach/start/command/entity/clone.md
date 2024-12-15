---
sidebar_position: 8
---

# 单位克隆

复制单位是一个很常见的操作。

```
/npc clone <id> [<new-id>]
```

:::tip

当然，这个命令也是支持重复名称的二次确认的。

:::

### 克隆单位并自动命名

你可以省略 `<new-id>` 参数，让插件自动命名。

```
/npc clone test
```

新的名称将会是 `test_2`，如果 `test_2` 已经存在，那么就会是 `test_3`，以此类推。

### 克隆单位并指定名称

你也可以指定新单位的名称。

```
/npc clone test new-test
```
