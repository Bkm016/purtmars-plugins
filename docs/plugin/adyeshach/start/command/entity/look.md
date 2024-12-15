---
sidebar_position: 6
---

# 单位视角

你可以使用视线命令使单位看向不同的角度。

```
/npc look <id>
           ├──── here
           ├──── like
           ├──── with <yaw> <pitch>
           └──── to <x> <y> <z>
```

:::tip

命令结构不那么好理解，你可以先看文档，再去游戏中尝试。

:::

### 使单位看你

这个命令并不是让单位看向你脚下的位置，而是看向你的头部。

```
/npc look test here
```

### 使单位学你

单位会模仿你的视角，看向你的视线方向。你看哪它就看哪。

```
/npc look test like
```

### 使单位看向指定方向

直接修改单位的 `yaw` 和 `pitch`，非常暴力。

```
/npc look test with 90 0
```

### 使单位看向指定位置

单位会看向指定的 X,Y,Z 位置，比 `with` 更容易调整。

```
/npc look test to 0 80 0
```