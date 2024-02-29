---
sidebar_position: 2
---

# 开发工具

指令入口为 `/chemdah api` 或 `/cha`。

```
 Usage: /chemdahapi
         ├── createscenes <player> <scenes> <index>
         ├── cancelscenes <player> <scenes> <index>
         ├── conversation
         │            ├── npc <player> <npc id> look
         │            └── self <player> <conversation id> <npc name>
         ├── generate <name> [<amount>]
         ├── blockinfo
         ├── position
         │        ├── self
         │        └── target
         ├── wizard info <id>
         └── objective <name>
```

以下命令未经过生产环境测试，不做介绍：

* `createscenes`
* `cancelscenes`
* `wizard`

## conversation

通过指令直接打开对话。

### 模拟交互

```
/chemdah api conversation npc bukkitObj my_npc
```

* `my_npc` 为 Adyeshach NPC 的 ID。

```
/chemdah api conversation npc bukkitObj my_npc look
```

* `look` 参数表示使 NPC 看向玩家。

### 直接对话

```
/chemdah api conversation self bukkitObj my_conversation Test NPC
```

* `my_conversation` 为对话的 ID。
* `Test NPC` 为对话中 NPC 的名称。

## generate

名称生成器。

```
>cha generate item 10
[00:00:00] [Server thread/INFO]: [Chemdah] 名称已生成:
[00:00:00] [Server thread/INFO]: [Chemdah] - Sparkler
[00:00:00] [Server thread/INFO]: [Chemdah] - Dido
[00:00:00] [Server thread/INFO]: [Chemdah] - Helverson
[00:00:00] [Server thread/INFO]: [Chemdah] - Brilliant Prize
[00:00:00] [Server thread/INFO]: [Chemdah] - Happy Return
[00:00:00] [Server thread/INFO]: [Chemdah] - Eclipse
[00:00:00] [Server thread/INFO]: [Chemdah] - Phlox
[00:00:00] [Server thread/INFO]: [Chemdah] - Good Hope
[00:00:00] [Server thread/INFO]: [Chemdah] - Dee
[00:00:00] [Server thread/INFO]: [Chemdah] - Monitor
```

```
>cha generate human 10
[00:00:00] [Server thread/INFO]: [Chemdah] 名称已生成:
[00:00:00] [Server thread/INFO]: [Chemdah] - DonellaHart
[00:00:00] [Server thread/INFO]: [Chemdah] - NicolettaJones
[00:00:00] [Server thread/INFO]: [Chemdah] - FaustHarrison
[00:00:00] [Server thread/INFO]: [Chemdah] - BobClark
[00:00:00] [Server thread/INFO]: [Chemdah] - RyanO'Connor
[00:00:00] [Server thread/INFO]: [Chemdah] - AlanisFlores
[00:00:00] [Server thread/INFO]: [Chemdah] - BrandanRamos
[00:00:00] [Server thread/INFO]: [Chemdah] - JusteeneMizell
[00:00:00] [Server thread/INFO]: [Chemdah] - AriaBurns
[00:00:00] [Server thread/INFO]: [Chemdah] - TyrMace
```

## blockinfo

查看当前看向的方块信息。

<img id="game_img" src="/img/command-api-blockinfo.png" width="600" style={{marginBottom: "1rem"}}/>

## position

查看当前位置信息。

<img id="game_img" src="/img/command-api-pos.png" width="600" style={{marginBottom: "1rem"}}/>

:::tip

位置信息均可点击复制。

:::

## objective

搜索当前服务器可用的任务目标。

```
>cha objective exp
[00:00:00] [Server thread/INFO]: [Chemdah] Objective found:
[00:00:00] [Server thread/INFO]: [Chemdah] - exp change
[00:00:00] [Server thread/INFO]: [Chemdah]   - Condition: amount, position, entity
[00:00:00] [Server thread/INFO]: [Chemdah]   - Condition Vars: amount
[00:00:00] [Server thread/INFO]: [Chemdah]   - Goal: amount
[00:00:00] [Server thread/INFO]: [Chemdah]   - Goal Vars: amount
```

```
>cha objective break
[00:00:00] [Server thread/INFO]: [Chemdah] Objective found:
[00:00:00] [Server thread/INFO]: [Chemdah] - item break
[00:00:00] [Server thread/INFO]: [Chemdah]   - Condition: item, position
[00:00:00] [Server thread/INFO]: [Chemdah]   - Condition Vars: 
[00:00:00] [Server thread/INFO]: [Chemdah]   - Goal: amount
[00:00:00] [Server thread/INFO]: [Chemdah]   - Goal Vars: amount
[00:00:00] [Server thread/INFO]: [Chemdah] - block break
[00:00:00] [Server thread/INFO]: [Chemdah]   - Condition: no-silk-touch, material, unique, position, exp
[00:00:00] [Server thread/INFO]: [Chemdah]   - Condition Vars: exp
[00:00:00] [Server thread/INFO]: [Chemdah]   - Goal: amount
[00:00:00] [Server thread/INFO]: [Chemdah]   - Goal Vars: amount
```

:::tip

这个功能在后面的任务系统中会用到。

:::