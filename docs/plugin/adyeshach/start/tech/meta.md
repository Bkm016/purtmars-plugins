---
sidebar_position: 3
---

# 元数据

元数据是虚拟实体 **公共数据** 与 **专有数据** 的统称，是实体自身的属性。常见为：

- **着火**
    - 原版效果，指这个单位是否着火。
- **发光**
    - 原版效果，指这个单位是否发光。
- **生命值**
    - 原版效果，指这个单位的生命值。
    - 但其实对大多数实体类型来说这个东西都是无效的，因为虚拟实体并不能参与战斗。

## 数据类型

实体的元数据分为不同的数据类型，每种数据类型在编辑时都有不同的格式。

:::tip

格式是指使用 `脚本` 或 `命令` 时需遵循的文本形式，在编辑器中无需考虑。

:::

### 基本类型

| 类型                      | 说明      | 格式               |
|-------------------------|---------|------------------|
| Byte                  　 | 8 位整数   | `0`              |
| Int                     | 32 位整数  | `0`              |
| Long                    | 64 位整数  | `0`              |
| Float                   | 32 位浮点数 | `0.0`            |
| String                  | 字符串     | `string`         |
| Boolean                 | 布尔值     | `true` 或 `false` |

### 复合类型

| 类型                                                                                                                                                | 说明                         | 格式                |
|---------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|-------------------|
| Rotation                                                                                                                                          | 3 个浮点数：x 轴旋转、y 轴旋转、z 轴旋转   | `0.0,0.0,0.0`     |
| Position      　                                                                                                                                   | 3 个整数：x 轴位置、y 轴位置、z 轴位置    | `0,0,0`           |
| Color                                                                                                                                             | 3 个整数：红、绿、蓝                | `255,255,255`     |
| [Material](https://github.com/TabooLib/taboolib/blob/master/platform/platform-bukkit/src/main/java/taboolib/library/xseries/XMaterial.java)       | 枚举：材质                      | `STONE`           |
| [Direction](https://github.com/TabooLib/adyeshach/blob/2.0/project/common/src/main/kotlin/ink/ptms/adyeshach/core/bukkit/BukkitDirection.kt)      | 枚举：方向                      | `UP`              |
| [Particle](https://github.com/TabooLib/adyeshach/blob/2.0/project/common/src/main/kotlin/ink/ptms/adyeshach/core/bukkit/BukkitParticles.kt)       | 枚举：粒子                      | `FLAME`           |
| [VillagerData](https://github.com/TabooLib/adyeshach/blob/2.0/project/common/src/main/kotlin/ink/ptms/adyeshach/core/bukkit/data/VillagerData.kt) | 2 个枚举：类型、职业                | `DESERT:NONE`     |
| [Pose](https://github.com/TabooLib/adyeshach/blob/2.0/project/common/src/main/kotlin/ink/ptms/adyeshach/core/bukkit/BukkitPose.kt)                | 枚举：姿态                      | `STANDING`        |
| ItemStack                                                                                                                                         | 字符串：物品解析式                  | `minecraft:stone` |
| Vector3                                                                                                                                           | 3 个浮点数：x、y、z               | `0.0,0.0,0.0`     |
| Quaternion                                                                                                                                        | 4 个浮点数：x、y、z               | `0.0,0.0,0.0,0.0` |
| BrightnessOverride                                                                                                                                | 2 个浮点数：blockLight、skyLight | `1.0,1.0`         |


### 物品解析式

物品解析式是一种特殊的字符串，用于描述物品，常见的形式为 `minecraft:stone` 或直接 `stone`。

```bash
[(namespace):](material) [-amount (amount)] [-data (damage)]
                         [-name (name)] [-lore (lore)]
                         [-model (custom model data)]
                         [-color (R,G,B)]
                         [--shiny] [--unbreakable]
```

你可以根据不同的需求使用不同的参数，例如：

```bash
minecraft:stone -amount 1 -name "&f石头" -lore "&7这是一块石头" -model 1
```

一般情况下 `minecraft:` 可以省略，除非有其他插件为 Adyeshach 提供了物品扩展。

:::tip

不过对于虚拟实体来说，物品里的内容并不重要，只要能够显示出具体的材质就足够了。

:::

## 实体类型

在下面的表格中，你可以找到所有的实体类型与其对应的元数据。

- 包含 `[A]` 为基类，不可直接使用。
- 包含 `[E]` 为具体实体类型。

### [A] Entity

最基础的实体类型，所有的实体都是从这里开始的。

| 名称                          | 类型                                 | 说明               |
|-----------------------------|------------------------------------|------------------|
| `onFire`                    | Boolean                            | 是否着火             |
| `isCrouched`                | Boolean                            | 是否蹲下             |
| `unUsedRiding`              | Boolean                            | 是否骑乘             |
| `isSprinting`               | Boolean                            | 是否冲刺             |
| `isSwimming`                | Boolean                            | 是否游泳             |
| `isInvisible`               | Boolean                            | 是否隐身             |
| `isGlowing`                 | Boolean                            | 是否发光             |
| `isFlyingElytra`            | Boolean                            | 是否鞘翅飞行           |
| `customName`                | String                             | 自定义名称            |
| `isCustomNameVisible`       | Boolean                            | 自定义名称是否可见        |
| `noGravity`                 | Boolean                            | 是否无重力 (1.10+)    |
| `pose`                      | [Pose](/plugin/adyeshach/start/tech/meta#复合类型) | 姿态 (1.14+)       |
| `ticksFrozenInPowderedSnow` | Int                                | 被细雪冻住的时间 (1.17+) |

> Freezing ticks cap at `140` in the client for the player's snow overlay when stuck in powder snow. If the entity extends LivingEntity and freezing ticks
> reaches
> the cap, the mob will start shaking (this excludes the skeleton, which has its own indicator).

### [A] EntityLiving

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称                      | 类型                                  | 说明                   |
|-------------------------|-------------------------------------|----------------------|
| `isHandActive`          | Boolean                             | 是否在使用物品 (1.17+)    　 |
| `activeHand`            | Boolean                             | 是否主手 (1.17+)         |
| `isInRiptideSpinAttack` | Boolean                             | 是否在处于激流 (1.17+) 　    |
| `health`                | Float                               | 生命值                  |
| `potionEffectColor`     | [Color](/plugin/adyeshach/start/tech/meta#复合类型) | 药水效果颜色　              |

:::tip

原本位于 EntityLiving 中的 `arrowsInEntity` 和 `beeStingersInEntity` 因为只在玩家身上有用，所以不在这里列出。

:::

### [A] Mob

继承自 [EntityLiving](/plugin/adyeshach/start/tech/meta#a-entityliving)。

| 名称             | 类型      | 说明                |
|----------------|---------|-------------------|
| `isLeftHanded` | Boolean | 是否左撇子 (1.10+)     |
| `isAgressive`  | Boolean | 是否攻击性 (1.16+)   　 |

### [A] EntityAgeable

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称       | 类型      | 说明      |
|----------|---------|---------|
| `isBaby` | Boolean | 是否为幼年状态 |

### [A] EntityTameable

继承自 [EntityAgeable](/plugin/adyeshach/start/tech/meta#a-entityageable)。

| 名称          | 类型      | 说明   |
|-------------|---------|------|
| `isSitting` | Boolean | 是否坐下 |
| `isAngry`   | Boolean | 是否生气 |
| `isTamed`   | Boolean | 是否驯服 |

### [A] Fish

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称           | 类型      | 说明            |
|--------------|---------|---------------|
| `fromBucket` | Boolean | 是否来自桶 (1.13+) |

### [A] Raider

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称              | 类型      | 说明           |
|-----------------|---------|--------------|
| `isCelebrating` | Boolean | 是否庆祝 (1.14+) |

### [A] HorseBase

继承自 [EntityAgeable](/plugin/adyeshach/start/tech/meta#a-entityageable)。

| 名称            | 类型      | 说明            |
|---------------|---------|---------------|
| `isTame`      | Boolean | 是否驯服          |
| `isSaddled`   | Boolean | 是否骑上马鞍        |
| `hasChest`    | Boolean | 是否有箱子 (1.13-) |
| `hasBred`     | Boolean | 是否已繁殖         |
| `isEating`    | Boolean | 是否在吃草         |
| `isRearing`   | Boolean | 是否在抬头         |
| `isMouthOpen` | Boolean | 是否张嘴          |

### [A] HorseChested

继承自 [HorseBase](/plugin/adyeshach/start/tech/meta#a-horsebase)。

| 名称         | 类型      | 说明            |
|------------|---------|---------------|
| `hasChest` | Boolean | 是否有箱子 (1.11+) |

### [E] AreaEffectCloud

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称             | 类型                                     | 说明         |
|----------------|----------------------------------------|------------|
| `radius`       | Float                                  | 半径 (1.16+) |
| `color`        | [Color](/plugin/adyeshach/start/tech/meta#复合类型)    | 颜色         |
| `ignoreRadius` | Boolean                                | 是否忽略半径     |
| `particle`     | [Particle](/plugin/adyeshach/start/tech/meta#复合类型) | 粒子         |

### [E] ArmorStand

继承自 [EntityLiving](/plugin/adyeshach/start/tech/meta#a-entityliving)。

| 名称              | 类型                                     | 说明    |
|-----------------|----------------------------------------|-------|
| `isSmall`       | Boolean                                | 是否为小型 |
| `hasArms`       | Boolean                                | 是否有手臂 |
| `noBasePlate`   | Boolean                                | 是否无底座 |
| `isMarker`      | Boolean                                | 是否为标记 |
| `hasGravity`    | Boolean                                | 是否有重力 |
| `angleHead`     | [Rotation](/plugin/adyeshach/start/tech/meta#复合类型) | 头部角度  |
| `angleBody`     | [Rotation](/plugin/adyeshach/start/tech/meta#复合类型) | 身体角度  |
| `angleLeftArm`  | [Rotation](/plugin/adyeshach/start/tech/meta#复合类型) | 左手臂角度 |
| `angleRightArm` | [Rotation](/plugin/adyeshach/start/tech/meta#复合类型) | 右手臂角度 |
| `angleLeftLeg`  | [Rotation](/plugin/adyeshach/start/tech/meta#复合类型) | 左腿角度  |
| `angleRightLeg` | [Rotation](/plugin/adyeshach/start/tech/meta#复合类型) | 右腿角度  |

### [E] Arrow

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称              | 类型                                  | 说明           |
|-----------------|-------------------------------------|--------------|
| `isCritical`    | Boolean                             | 是否暴击         |
| `noclip`        | Boolean                             | 是否无碰撞        |
| `piercingLevel` | Byte                                | 穿透等级 (1.14+) |
| `color`         | [Color](/plugin/adyeshach/start/tech/meta#复合类型) | 效果颜色 (1.16+) |

### [E] Axolotl (1.17+)

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称      | 类型  | 说明                                          |
|---------|-----|---------------------------------------------|
| `color` | Int | 颜色 (0=lucy, 1=wild, 2=gold, 3=cyan, 4=blue) |

### [E] Bat

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称          | 类型      | 说明   |
|-------------|---------|------|
| `isHanging` | Boolean | 是否悬挂 |

### [E] Bee (1.15+)

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称           | 类型      | 说明    |
|--------------|---------|-------|
| `unUsed`     | Boolean | 未使用   |
| `isFlip`     | Boolean | 是否翻转  |
| `hasStung`   | Boolean | 是否已刺  |
| `hasNectar`  | Boolean | 是否有花蜜 |
| `angerTicks` | Int     | 恼怒时间  |

### [E] Blaze

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称     | 类型      | 说明   |
|--------|---------|------|
| `fire` | Boolean | 是否着火 |

### [E] Boat

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称                   | 类型      | 说明                                                            |
|----------------------|---------|---------------------------------------------------------------|
| `sinceLastHit`       | Int     | 上次受伤时间                                                        |
| `forwardDirection`   | Int     | 前进方向   　                                                      |
| `damageTaken`        | Float   | 受伤程度                                                          |
| `type`               | Int     | 类型 (0=oak, 1=spruce, 2=birch, 3=jungle, 4=acacia, 5=dark oak) |
| `leftPaddleTurning`  | Boolean | 左桨是否转动                                                        |
| `rightPaddleTurning` | Boolean | 右桨是否转动                                                        |
| `splashTimer`        | Int     | 水花时间 (1.13+)                                                  |

### [E] Camel (1.20+)

继承自 [HorseBase](/plugin/adyeshach/start/tech/meta#a-horsebase)。

| 名称     | 类型      | 说明   |
|--------|---------|------|
| `isDashing` | Boolean | 是否冲刺 |
| `lastPoseChangeTick` | Int | 最后姿势改变的时间 |

### [E] Cat (1.15+)

继承自 [EntityTameable](/plugin/adyeshach/start/tech/meta#a-entitytameable)。

| 名称          | 类型      | 说明                                                                                                                                                                |
|-------------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`      | Int     | 类型 (0=tabby, 1=black, 2=red, 3=siamese, 4=british_shorthair, 5=calico, 6=persian, 7=ragdoll, 8=white, 9=jellie, 10=all_black)                                     |
| `isLying`   | Boolean | 是否躺着                                                                                                                                                              |
| `isRelaxed` | Boolean | 是否放松                                                                                                                                                              |
| `color`     | Int     | 颜色 (0=white, 1=orange, 2=magenta, 3=light_blue, 4=yellow, 5=lime, 6=pink, 7=gray, 8=light_gray, 9=cyan, 10=purple, 11=blue, 12=brown, 13=green, 14=red, 15=black) |

### [E] Creeper

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称          | 类型      | 说明                   |
|-------------|---------|----------------------|
| `state`     | Int     | 状态 (-1=idle, 1=fuse) |
| `isCharged` | Boolean | 是否充能                 |
| `isIgnited` | Boolean | 是否着火                 |

### [E] Dolphin (1.13+)

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称             | 类型      | 说明     |
|----------------|---------|--------|
| `findTreasure` | Boolean | 是否寻找宝藏 |
| `hasFish`      | Boolean | 是否有鱼   |

### [E] EndCrystal

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称           | 类型                                     | 说明     |
|--------------|----------------------------------------|--------|
| `beamTarget` | [Position](/plugin/adyeshach/start/tech/meta#复合类型) | 光束目标   |
| `showBottom` | Boolean                                | 是否显示底部 |

### [E] EndDragon

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称            | 类型  | 说明         |
|---------------|-----|------------|
| `dragonPhase` | Int | 阶段 (默认：10) |

**关于阶段的解释:**

- 0: 绕行
- 1: 扫射 (准备发射火球)
- 2: 飞向传送门着陆 (过渡到着陆状态的一部分)
- 3: 在传送门上降落 (过渡到着陆状态的一部分)
- 4: 从传送门起飞 (脱离降落状态的部分过渡)
- 5: 着陆, 进行龙息攻击
- 6: 着陆, 寻找玩家进行龙息攻击
- 7: 着陆, 在开始龙息攻击前咆哮
- 8: 冲向玩家
- 9: 飞到传送门处死亡
- 10: 悬停

### [E] Enderman

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称             | 类型                                     | 说明           |
|----------------|----------------------------------------|--------------|
| `carriedBlock` | [Material](/plugin/adyeshach/start/tech/meta#复合类型) | 携带方块         |
| `isScreaming`  | Boolean                                | 是否尖叫         |
| `isStaring`    | Boolean                                | 是否盯着 (1.15+) |

### [E] ExperienceOrb

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称       | 类型  | 说明  |
|----------|-----|-----|
| `amount` | Int | 经验值 |

### [E] EyeOfEnder

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称     | 类型                                      | 说明  |
|--------|-----------------------------------------|-----|
| `item` | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) | 物品  |

### [E] FallingBlock

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称         | 类型                                      | 说明      |
|------------|-----------------------------------------|---------|
| `material` | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) | 方块材质    |
| `data`     | Byte                                    | 方块材质附加值 |

### [E] FireworkRocket

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称             | 类型                                      | 说明   |
|----------------|-----------------------------------------|------|
| `fireworkInfo` | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) | 烟花信息 |

:::tip

烟花信息是相对复杂的数据类型，并不能通过 [物品解析式](/plugin/adyeshach/start/tech/meta#物品解析式) 来设置。

:::

### [E] Fox (1.14+)

继承自 [EntityAgeable](/plugin/adyeshach/start/tech/meta#a-entityageable)。

| 名称              | 类型      | 说明                 |
|-----------------|---------|--------------------|
| `isSitting`     | Boolean | 是否坐下               |
| `isCrouching`   | Boolean | 是否蹲下               |
| `isSleeping`    | Boolean | 是否睡觉               |
| `isInterested`  | Boolean | 是否感兴趣 (1.15+)      |
| `isPouncing`    | Boolean | 是否跳跃 (1.15+)       |
| `isFaceplanted` | Boolean | 是否脸朝下 (1.15+)      |
| `isDefending`   | Boolean | 是否防御 (1.15+)       |
| `type`          | Int     | 类型 (0=red, 0=snow) |

### [E] Ghast

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称            | 类型      | 说明   |
|---------------|---------|------|
| `isAttacking` | Boolean | 是否攻击 |

### [E] Goat (1.19+)

继承自 [EntityAgeable](/plugin/adyeshach/start/tech/meta#a-entityageable)。

| 名称                | 类型      | 说明    |
|-------------------|---------|-------|
| `isScreamingGoat` | Boolean | 是否尖叫  |
| `hasLeftHorn`     | Boolean | 是否有左角 |
| `hasRightHorn`    | Boolean | 是否有右角 |

### [E] Guardian

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称                   | 类型      | 说明               |
|----------------------|---------|------------------|
| `isRetractingSpikes` | Boolean | 是否收回尖刺           |
| `isElderly`          | Boolean | 是否是远古守卫者 (1.12-) |
| `targetEntity`       | Int     | 目标实体序号           |

### [AE] Horse

继承自 [HorseBase](/plugin/adyeshach/start/tech/meta#a-horsebase)。

| 名称      | 类型  | 说明                                                                         |
|---------|-----|----------------------------------------------------------------------------|
| `color` | Int | 颜色 (0=white, 1=creamy, 2=chestnut, 3=brown, 4=black, 5=gray, 6=dark_brown) |
| `style` | Int | 样式 (0=none, 1=white, 2=whitefield, 3=white_dots, 4=black_dots)             |

### [E] Human

继承自 [EntityLiving](/plugin/adyeshach/start/tech/meta#a-entityliving)。

| 名称                    | 类型      | 说明                                                       |
|-----------------------|---------|----------------------------------------------------------|
| `skinCape`            | Boolean | 是否有披风                                                    |
| `skinJacket`          | Boolean | 是否有外套                                                    |
| `skinLeftSleeve`      | Boolean | 是否有左袖子                                                   |
| `skinRightSleeve`     | Boolean | 是否有右袖子                                                   |
| `skinLeftPants`       | Boolean | 是否有左裤子                                                   |
| `skinRightPants`      | Boolean | 是否有右裤子                                                   |
| `skinHat`             | Boolean | 是否有帽子                                                    |
| `arrowsInEntity`      | Int     | 身上的箭数量                                                   |
| `beeStingersInEntity` | Int     | 身上的蜂刺数量                                                  |
| `isHideFromTabList`   | Boolean | 是否隐藏在列表                                                  |
| `name`                | String  | 名字                                                       |
| `ping`                | Int     | 延迟                                                       |
| `pingBar`             | String  | 延迟条类型 (bar_1, bar_2, bar_3, bar_4, bar_5, no_connection) |
| `texture`             | String  | 皮肤                                                       |
| `sleeping`            | Boolean | 是否睡觉                                                     |

### [E] Interaction

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称           | 类型      | 说明     |
|--------------|---------|--------|
| `width`      | Float   | 宽度     |
| `height`     | Float   | 高度     |
| `responsive` | Boolean | 是否响应玩家 |

### [E] Item

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称     | 类型                                      | 说明  |
|--------|-----------------------------------------|-----|
| `item` | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) | 物品  |

### [E] ItemFrame

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称         | 类型                                      | 说明         |
|------------|-----------------------------------------|------------|
| `item`     | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) | 物品         |
| `rotation` | Int                                     | 物品旋转 (0-7) |

### [E] Fireball

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称     | 类型                                      | 说明         |
|--------|-----------------------------------------|------------|
| `item` | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) | 物品 (1.16+) |

### [E] Llama (1.10+)

继承自 [HorseChested](/plugin/adyeshach/start/tech/meta#a-horsechested)。

| 名称            | 类型  | 说明                                                                                                                                                                                         |
|---------------|-----|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `carpetColor` | Int | 毛毯颜色 (-1=no carpet equipped, 0=white, 1=orange, 2=magenta, 3=light_blue, 4=yellow, 5=lime, 6=pink, 7=gray, 8=light_gray, 9=cyan, 10=purple, 11=blue, 12=brown, 13=green, 14=red, 15=black) |
| `color`       | Int | 颜色 (0=creamy, 1=white, 2=brown, 3=gray)                                                                                                                                                    |

### [AE] Minecart

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称                    | 类型                                     | 说明        |
|-----------------------|----------------------------------------|-----------|
| `shakingPower`        | Int                                    | 振动强度      |
| `shakingDirection`    | Int                                    | 振动方向      |
| `shakingMultiplier`   | Float                                  | 振动倍率      |
| `customBlock`         | [Material](/plugin/adyeshach/start/tech/meta#复合类型) | 自定义方块     |
| `customBlockPosition` | [Position](/plugin/adyeshach/start/tech/meta#复合类型) | 自定义方块位置   |
| `showCustomBlock`     | Boolean                                | 是否显示自定义方块 |

If show custom block is false, then each type of Minecart will render its own type of block with its own properties. Note that one does not need to send these
values for the metadata fields, as the client will automatically select them if show custom block is false. They are only provided for reference to help with
swapping out other blocks.

- Rideable Minecarts contain air (0:0) and have a y position of 6
- Chest Minecarts contain chests facing north (54:0) and have a y position of 8
- Furnace Minecarts contain a normal furnace facing north when unpowered (61:0) and a lit furnace facing north when powered (62:0) and have a y position of 6 in
  both cases
- Hopper Minecarts contain a hopper (154:0) and have a y position of 1
- TNT Minecarts contain TNT (46:0) and have a y position of 6
- Command block minecarts contain a Command Block (137:0) and have a y position of 6
- Spawner Minecarts contain a spawner (52:0) and have a y position of 6

### [E] MinecartFurnace

继承自 [Minecart](/plugin/adyeshach/start/tech/meta#ae-minecart)。

| 名称        | 类型      | 说明    |
|-----------|---------|-------|
| `hasFuel` | Boolean | 是否有燃料 |

### [E] Mushroom

继承自 [EntityAgeable](/plugin/adyeshach/start/tech/meta#a-entityageable)。

| 名称     | 类型     | 说明              |
|--------|--------|-----------------|
| `type` | String | 类型 (red, brown) |

### [E] Ocelot (1.14-)

继承自 [EntityAgeable](/plugin/adyeshach/start/tech/meta#a-entityageable)。

| 名称           | 类型      | 说明                                           |
|--------------|---------|----------------------------------------------|
| `isSitting`  | Boolean | 是否坐下                                         |
| `isAngry`    | Boolean | 是否生气                                         |
| `isTamed`    | Boolean | 是否驯服                                         |
| `isTrusting` | Boolean | 是否信任                                         |
| `type`       | String  | 类型 (0=untamed, 1=tuxedo, 2=tabby, 3=siamese) |

### [E] Painting

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

:::caution

这个实体类型暂时不支持。

:::

### [E] Panda (1.14+)

继承自 [EntityAgeable](/plugin/adyeshach/start/tech/meta#a-entityageable)。

| 名称           | 类型      | 说明    |
|--------------|---------|-------|
| `isSneezing` | Boolean | 是否打喷嚏 |
| `isEating`   | Boolean | 是否吃东西 |
| `isSitting`  | Boolean | 是否坐下  |
| `isOnBack`   | Boolean | 是否在背上 |

### [E] Parrot (1.12+)

继承自 [EntityTameable](/plugin/adyeshach/start/tech/meta#a-entitytameable)。

| 名称      | 类型     | 说明                                          |
|---------|--------|---------------------------------------------|
| `color` | String | 类型 (0=red, 1=blue, 2=green, 3=cyan, 4=gray) |

### [E] Phantom (1.13+)

继承自 [EntityLiving](/plugin/adyeshach/start/tech/meta#a-entityliving)。

| 名称     | 类型  | 说明  |
|--------|-----|-----|
| `size` | Int | 大小  |

### [E] Pig

继承自 [EntityAgeable](/plugin/adyeshach/start/tech/meta#a-entityageable)。

| 名称          | 类型      | 说明     |
|-------------|---------|--------|
| `hasSaddle` | Boolean | 是否骑着马鞍 |

### [E] Piglin (1.16+)

继承自 [EntityLiving](/plugin/adyeshach/start/tech/meta#a-entityliving)。

| 名称                        | 类型      | 说明      |
|---------------------------|---------|---------|
| `isImmuneToZombification` | Boolean | 是否免疫僵尸化 |
| `isBaby`                  | Boolean | 是否是小猪灵  |
| `isChargingCrossbow`      | Boolean | 是否正在充能弩 |
| `isConverting`            | Boolean | 是否正在转换  |

### [E] Pillager (1.17+)

继承自 [Raider](/plugin/adyeshach/start/tech/meta#a-raider)。

| 名称           | 类型      | 说明    |
|--------------|---------|-------|
| `isCharging` | Boolean | 是否在拉弓 |

### [E] PolarBear (1.10+)

继承自 [EntityAgeable](/plugin/adyeshach/start/tech/meta#a-entityageable)。

| 名称           | 类型      | 说明   |
|--------------|---------|------|
| `isStanding` | Boolean | 是否站立 |

### [E] PrimedTNT

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称         | 类型  | 说明   |
|------------|-----|------|
| `fuseTime` | Int | 燃烧时间 |

### [E] Pufferfish (1.13+)

继承自 [Fish](/plugin/adyeshach/start/tech/meta#a-fish)。

| 名称          | 类型  | 说明         |
|-------------|-----|------------|
| `puffState` | Int | 膨胀状态 (0-2) |

### [E] Rabbit

继承自 [EntityAgeable](/plugin/adyeshach/start/tech/meta#a-entityageable)。

| 名称     | 类型     | 说明                                                                                       |
|--------|--------|------------------------------------------------------------------------------------------|
| `type` | String | 类型 (0=brown, 1=white, 2=black, 3=black&white, 4=gold, 5=salt&pepper, 6=the_killer_bunny) |

### [E] Sheep

继承自 [EntityAgeable](/plugin/adyeshach/start/tech/meta#a-entityageable)。

| 名称          | 类型      | 说明                                                                                                                          |
|-------------|---------|-----------------------------------------------------------------------------------------------------------------------------|
| `dyeColor`  | String  | 颜色 (white, orange, magenta, light_blue, yellow, lime, pink, gray, light_gray, cyan, purple, blue, brown, green, red, black) |
| `isSheared` | Boolean | 是否剪过                                                                                                                        |

### [E] Shulker

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称      | 类型  | 说明                                                                                                                                                                          |
|---------|-----|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `color` | Int | 颜色 (0=white, 1=orange, 2=magenta, 3=light_blue, 4=yellow, 5=lime, 6=pink, 7=gray, 8=light_gray, 9=cyan, 10=purple, 11=blue, 12=brown, 13=green, 14=red, 15=black, 16=reset) |

:::caution

暂不支持 `attachFace`, `attachPosition`, `shieldHeight` 三个属性。

:::

### [AE] Slime

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称     | 类型  | 说明  |
|--------|-----|-----|
| `size` | Int | 大小  |

### [E] SmallFireball

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称     | 类型                                      | 说明         |
|--------|-----------------------------------------|------------|
| `item` | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) | 物品 (1.16+) |

### [E] SnowGolem

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称                | 类型      | 说明      |
|-------------------|---------|---------|
| `hasPumpkinHat`   | Boolean | 是否戴着南瓜帽 |
| `hasNoPumpkinHat` | Boolean | 是否不戴南瓜帽 |

### [E] Sniffer (1.20+)

继承自 [EntityAgeable](/plugin/adyeshach/start/tech/meta#a-entityageable)。

| 名称                | 类型      | 说明      |
|-------------------|---------|---------|
| `snifferState`   | String | 状态 (idling, felling_happy, scenting, sniffing, searching, digging, rising) |
| `dropSeedAtTick` | Int | 掉落种子的时间 |

### [E] Snowball

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称     | 类型                                      | 说明         |
|--------|-----------------------------------------|------------|
| `item` | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) | 物品 (1.16+) |

### [AE] Spider

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称           | 类型      | 说明   |
|--------------|---------|------|
| `isClimbing` | Boolean | 是否爬墙 |

### [E] Strider

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称          | 类型      | 说明    |
|-------------|---------|-------|
| `isShaking` | Boolean | 是否在摇晃 |
| `hasSaddle` | Boolean | 是否有鞍  |

### [E] ThrownEgg

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称     | 类型                                      | 说明         |
|--------|-----------------------------------------|------------|
| `item` | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) | 物品 (1.16+) |

### [E] ThrownEnderPearl

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称     | 类型                                      | 说明         |
|--------|-----------------------------------------|------------|
| `item` | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) | 物品 (1.16+) |

### [E] ThrownExperienceBottle

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称     | 类型                                      | 说明         |
|--------|-----------------------------------------|------------|
| `item` | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) | 物品 (1.16+) |

### [E] ThrownPotion

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称     | 类型                                      | 说明         |
|--------|-----------------------------------------|------------|
| `item` | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) | 物品 (1.16+) |

### [E] ThrownTrident

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称                    | 类型      | 说明         |
|-----------------------|---------|------------|
| `loyaltyLevel`        | Int     | 忠诚等级 (0-3) |
| `hasEnchantmentGlint` | Boolean | 是否有附魔光泽    |

### [E] TropicalFish

继承自 [Fish](/plugin/adyeshach/start/tech/meta#a-fish)。

| 名称             | 类型  | 说明                                                                                                                                                                  |
|----------------|-----|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `bodyColor`    | Int | 身体颜色 (0=white, 1=orange, 2=magenta, 3=light_blue, 4=yellow, 5=lime, 6=pink, 7=gray, 8=light_gray, 9=cyan, 10=purple, 11=blue, 12=brown, 13=green, 14=red, 15=black) |
| `patternColor` | Int | 纹路颜色 (0=white, 1=orange, 2=magenta, 3=light_blue, 4=yellow, 5=lime, 6=pink, 7=gray, 8=light_gray, 9=cyan, 10=purple, 11=blue, 12=brown, 13=green, 14=red, 15=black) |
| `pattern`      | Int | 纹路 (0=kob, 1=sunstreak, 2=snooper, 3=dasher, 4=brinely, 5=soptty, 6=flopper, 7=stripey, 8=glitter, 9=blockfish, 10=betty, 11=clayfish)                              |

### [E] Turtle (1.13+)

继承自 [EntityAgeable](/plugin/adyeshach/start/tech/meta#a-entityageable)。

| 名称            | 类型      | 说明    |
|---------------|---------|-------|
| `hasEgg`      | Boolean | 是否有蛋  |
| `layingEgg`   | Boolean | 是否在下蛋 |
| `isGoingHome` | Boolean | 是否在回家 |
| `isTraveling` | Boolean | 是否在旅行 |

### [E] Vex (1.11+)

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称           | 类型      | 说明   |
|--------------|---------|------|
| `attackMode` | Boolean | 攻击模式 |

### [AE] Villager

继承自 [EntityAgeable](/plugin/adyeshach/start/tech/meta#a-entityageable)。

| 名称               | 类型                                         | 说明                                                                                 |
|------------------|--------------------------------------------|------------------------------------------------------------------------------------|
| `headShakeTimer` | Int                                        | 头部摇晃计时器                                                                            |
| `villagerData`   | [VillagerData](/plugin/adyeshach/start/tech/meta#复合类型) | 村民数据 (1.14+)                                                                       |
| `profession`     | Int                                        | 村民职业 (0=farmer, 1=librarian, 2=priest, 3=black_smith, 4=butcher, 5=nitwit) (1.14-) |

### [E] Witch

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称                 | 类型      | 说明     |
|--------------------|---------|--------|
| `isDrinkingPotion` | Boolean | 是否在喝药水 |

### [E] Wither

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称                 | 类型  | 说明          |
|--------------------|-----|-------------|
| `firstHeadTarget`  | Int | 第一个头的目标实体序号 |
| `secondHeadTarget` | Int | 第二个头的目标实体序号 |
| `thirdHeadTarget`  | Int | 第三个头的目标实体序号 |
| `invulnerableTime` | Int | 无敌时间        |

### [E] Warden

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称           | 类型  | 说明   |
|--------------|-----|------|
| `angerLevel` | Int | 愤怒等级 |

### [E] WitherSkull

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称             | 类型  | 说明   |
|----------------|-----|------|
| `invulnerable` | Int | 无敌时间 |

### [E] Wolf

继承自 [EntityTameable](/plugin/adyeshach/start/tech/meta#a-entitytameable)。

| 名称            | 类型      | 说明                                                                                                                                                                  |
|---------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `isBegging`   | Boolean | 是否在祈求                                                                                                                                                               |
| `collarColor` | Int     | 领带颜色 (0=white, 1=orange, 2=magenta, 3=light_blue, 4=yellow, 5=lime, 6=pink, 7=gray, 8=light_gray, 9=cyan, 10=purple, 11=blue, 12=brown, 13=green, 14=red, 15=black) |

### [AE] Zombie

继承自 [Mob](/plugin/adyeshach/start/tech/meta#a-mob)。

| 名称                  | 类型      | 说明               |
|---------------------|---------|------------------|
| `isBaby`            | Boolean | 是否是幼年            |
| `isBecomingDrowned` | Boolean | 是否即将成为溺尸 (1.17+) |
| `isDrowning`        | Boolean | 是否在溺水 (1.13+)    |
| `isConverting`      | Boolean | 是否在转换            |
| `isHandsHeldUp`     | Boolean | 是否举起手            |
| `zombieType`        | Int     | 类型 (1.14-)       |

### [E] ZombieVillager

继承自 [Zombie](/plugin/adyeshach/start/tech/meta#ae-zombie)。

| 名称             | 类型                                         | 说明                                                                                 |
|----------------|--------------------------------------------|------------------------------------------------------------------------------------|
| `isConverting` | Boolean                                    | 是否在转换 (1.17+)                                                                      |
| `villagerData` | [VillagerData](/plugin/adyeshach/start/tech/meta#复合类型) | 村民数据 (1.14+)                                                                       |
| `profession`   | Int                                        | 村民职业 (0=farmer, 1=librarian, 2=priest, 3=black_smith, 4=butcher, 5=nitwit) (1.14-) |

## 数据类型 (1.19.4+)

为了方便查找，于 `1.19.4` 版本新增的类型将会在此处列出。

### [E] Frog

继承自 [EntityAgeable](/plugin/adyeshach/start/tech/meta#a-entityageable)。

| 名称             | 类型     | 说明                         |
|----------------|--------|----------------------------|
| `frogVariant`  | String | 类型 (temperate, warn, cold) |
| `tongueTarget` | Int    | 舌头目标                       |

### [A] Display

继承自 [Entity](/plugin/adyeshach/start/tech/meta#a-entity)。

| 名称                      | 类型                                       | 说明                                              |
|-------------------------|------------------------------------------|-------------------------------------------------|
| `interpolationDelay`    | Int                                      | 插值延迟                                            |
| `interpolationDuration` | Int                                      | 插值持续时间                                          |
| `teleportInterpolationDuration` | Int                                      | 传送插值                                          |
| `translation`           | [Vector3](/plugin/adyeshach/start/tech/meta#复合类型)    | 位移                                              |
| `scale`                 | [Vector3](/plugin/adyeshach/start/tech/meta#复合类型)    | 缩放                                              |
| `rotationLeft`          | [Quaternion](/plugin/adyeshach/start/tech/meta#复合类型) | 左旋转                                             |
| `rotationRight`         | [Quaternion](/plugin/adyeshach/start/tech/meta#复合类型) | 右旋转                                             |
| `billboardConstraints`  | Int                                      | 面向约束 (0=fixed、1=vertical、2=horizontal、3=center) |
| `brightnessOverride`    | [Brightness](/plugin/adyeshach/start/tech/meta#复合类型) | 亮度                                              |
| `viewRange`             | Float                                    | 可见距离                                            |
| `shadowRadius`          | Float                                    | 阴影半径                                            |
| `shadowStrength`        | Float                                    | 阴影强度                                            |
| `width`                 | Float                                    | 宽度                                              |
| `height`                | Float                                    | 高度                                              |
| `glowColorOverride`     | [Color](/plugin/adyeshach/start/tech/meta#复合类型)      | 发光颜色                                            |

### [E] TextDisplay

继承自 [Display](/plugin/adyeshach/start/tech/meta#a-display)。

| 名称                          | 类型                                  | 说明         |
|-----------------------------|-------------------------------------|------------|
| `text`                      | String                              | 文字         |
| `lineWidth`                 | Int                                 | 行宽         |
| `backgroundColor`           | [Color](/plugin/adyeshach/start/tech/meta#复合类型) | 背景颜色       |
| `useDefaultBackgroundColor` | Boolean                             | 是否使用默认背景颜色 |
| `textOpacity`               | Byte                                | 文字透明度      |
| `shadow`                    | Boolean                             | 是否有阴影      |
| `seeThrough`                | Boolean                             | 是否透视       |
| `alignmentLeft`             | Boolean                             | 是否左对齐      |
| `alignmentRight`            | Boolean                             | 是否右对齐      |

:::tip

未启用 `alignmentLeft` 和 `alignmentRight` 时，会自动居中对齐。

:::

### [E] ItemDisplay

继承自 [Display](/plugin/adyeshach/start/tech/meta#a-display)。

| 名称              | 类型                                      | 说明                                                                                                                                                |
|-----------------|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `displayedItem` | [ItemStack](/plugin/adyeshach/start/tech/meta#复合类型) | 显示的物品                                                                                                                                             |
| `displayType`   | Byte                                    | 显示类型 (0=none、1=third_person_left_hand、2=third_person_right_hand、3=first_person_left_hand、4=first_person_right_hand、5=head、6=gui、7=ground、8=fixed) |

### [E] BlockDisplay

继承自 [Display](/plugin/adyeshach/start/tech/meta#a-display)。

| 名称                    | 类型                                     | 说明    |
|-----------------------|----------------------------------------|-------|
| `displayedBlockState` | [Material](/plugin/adyeshach/start/tech/meta#复合类型) | 显示的方块 |
