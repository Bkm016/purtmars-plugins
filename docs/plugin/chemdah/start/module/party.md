---
sidebar_position: 3
---

# 队伍系统

队伍系统配置文件位于 `Chemdah/module/party.yml`，负责将 Chemdah 与第三方队伍插件对接，实现任务共享和协作完成。

## 配置

```yaml title="module/party.yml"
default:
  plugin: BaiTeam  # 指定使用的队伍插件
```

`default.plugin` 填入对应插件的名称，Chemdah 会自动识别并接入。

目前内置支持的队伍插件：

- `BaiTeam`
- `CustomGo`
- `DungeonPlus`
- `DungeonXL`
- `FriendsPremium`
- `iTeamPro`
- `mcMMO`
- `MMOCore`
- `NyTeam`
- `Parties`
- `PartyAndFriends`
- `PxTeam`
- `QuantumRPG` / `PRORPG`

## 功能说明

队伍系统启用后，配合任务中的[队伍组件](/plugin/chemdah/start/quest/addon/party)使用，可以实现：

- **任务共享**：队伍成员看到队长（或其他成员）接取的任务
- **事件同步**：任务接取、完成、失败等事件同步广播给队伍成员
- **协作完成**：任务目标可以设置需要指定数量的队员同时在场才能推进

## 接入第三方插件

如果使用的队伍插件不在内置列表中，可以通过监听 `PartyHookEvent` 事件自行注入实现：

```java title="接入自定义队伍插件"
@EventHandler
public void onPartyHook(PartyHookEvent event) {
    if (event.getPlugin().equals("MyPartyPlugin")) {
        event.setParty(new Party() {
            @Override
            public PartyInfo getParty(Player player) {
                // 返回玩家所在队伍信息
            }
        });
    }
}
```
