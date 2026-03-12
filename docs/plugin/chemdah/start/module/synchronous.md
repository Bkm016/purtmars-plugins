---
sidebar_position: 6
---

# 数据同步

数据同步配置文件位于 `Chemdah/module/synchronous.yml`，将 Chemdah 的等级数据同步到其他系统，值填对应等级体系的 ID。

## 配置

```yaml title="module/synchronous.yml"
synchronous:
  # 将指定等级体系的等级和经验同步到原版经验条
  # 玩家看到的经验条会显示 Chemdah 的等级进度，原版经验变动被屏蔽
  player-level-to-minecraft: combat

  # 将指定等级体系的经验值作为 Vault 经济余额
  # 其他插件通过 Vault API 读写货币时实际操作的是这个等级体系的数据
  player-data-to-vault: gold
```

两项配置相互独立，可以只启用其中一项，也可以同时启用。

## player-level-to-minecraft

将 Chemdah 等级同步到原版经验条。启用后：

- 玩家的经验条显示对应等级体系的等级和经验进度
- 原版经验值变动（如挖矿、击杀）不再影响实际数值
- 切换世界和重生后自动重新同步

## player-data-to-vault

将 Chemdah 等级体系的经验值注册为 Vault 经济。启用后：

- Chemdah 以最高优先级接管 Vault Economy
- 其他插件通过 Vault 查询余额时，读取的是对应等级体系的经验数据
- 扣款和充值操作直接修改该等级体系的经验值

:::tip

使用这两项功能前，确保对应的等级体系已在 `module/level.yml` 中正确配置，且 ID 与此处填写的完全一致。

`player-data-to-vault` 需要服务器安装了 Vault 插件才会生效。

:::
