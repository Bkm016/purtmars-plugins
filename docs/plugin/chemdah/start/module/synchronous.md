---
sidebar_position: 6
---

# 数据同步

数据同步配置文件位于 `Chemdah/module/synchronous.yml`，用于将 Chemdah 的数据同步到其他系统。

## 配置

```yaml title="module/synchronous.yml"
synchronous:
  # 将指定等级体系的等级和经验同步到原版经验条
  # 玩家看到的经验条会显示 Chemdah 的等级进度，原版经验变动被屏蔽
  player-level-to-minecraft: combat

  # 将玩家持久化数据容器中指定 key 的值注册为 Vault 经济余额
  # 其他插件通过 Vault API 读写货币时实际操作的是这个数据键
  player-data-to-vault: gold
```

两项配置相互独立，可以只启用其中一项，也可以同时启用。

## player-level-to-minecraft

将 Chemdah 等级同步到原版经验条。启用后：

- 玩家的经验条显示对应等级体系的等级和经验进度
- 原版经验值变动（如挖矿、击杀）不再影响实际数值
- 切换世界和重生后自动重新同步

## player-data-to-vault

将玩家持久化数据容器（`persistentDataContainer`）中指定 key 的值注册为 Vault 经济。启用后：

- Chemdah 以最高优先级接管 Vault Economy
- 其他插件通过 Vault 查询余额时，读取的是玩家数据容器中对应 key 的值
- 扣款和充值操作直接修改该数据键的值

:::tip

`player-level-to-minecraft` 的值填等级体系 ID（需在 `module/level.yml` 中配置）。

`player-data-to-vault` 的值填玩家持久化数据的 key 名（不依赖等级系统），需要服务器安装了 Vault 插件才会生效。

:::
