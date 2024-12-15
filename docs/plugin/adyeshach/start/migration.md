---
sidebar_position: 9
---

# 数据迁移

你可以从其他插件迁移 NPC 数据到 Adyeshach，但这种操作会有一定的风险。

## Citizens 2

使用指令 `/npc api migrate citizens` 进行迁移。由于 Citizens 的特殊加载机制，只能迁移处于已加载区块中的 NPC，你可以多次使用该指令来迁移所有 NPC。

对于绑定命令、巡逻的 NPC，你需要进行手动迁移。