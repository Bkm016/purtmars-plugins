---
sidebar_position: 2
---

# Chemdah API 扩展开发指南

> 本页由 [枫溪](https://github.com/FxRayHughes) 编写

## 概述

本文档将详细介绍如何通过 API 注册自定义的 `Objective`、`Selector`、`Meta`、`Addon` 等组件。

## 核心概念

### 1. Objective（任务目标）
**定义**：Objective 是任务系统的核心组件，用于定义玩家需要完成的具体目标，如破坏方块、杀死怪物、收集物品等。

**作用**：
- 监听特定的游戏事件
- 检查完成条件
- 跟踪任务进度
- 处理任务状态变化

### 2. Addon（任务扩展/组件）
**定义**：Addon 是为任务或任务条目提供额外功能的扩展组件。

**作用**：
- 提供任务的附加功能（如进度显示、自动化处理等）
- 扩展任务的行为逻辑
- 增强用户体验

### 3. Meta（元数据）
**定义**：Meta 用于存储任务的元信息和配置数据。

**作用**：
- 存储任务的基本信息（名称、类型、描述等）
- 提供任务的配置选项
- 支持任务的分类和管理

### 4. Selector（选择器）
**定义**：Selector 用于匹配和识别游戏中的特定对象（如物品、实体、方块等）。

**作用**：
- 提供灵活的对象匹配机制
- 支持复杂的条件判断
- 扩展对第三方插件物品/实体的支持

## API 注册机制

### 自动注册系统

Chemdah 使用反射机制自动扫描和注册扩展组件。注册过程在 `QuestLoader` 的 `registerAll()` 方法中进行：

```kotlin
// QuestLoader.kt 中的自动注册逻辑
@Awake(LifeCycle.ENABLE)
fun registerAll() {
    val checkDependency = !File(getDataFolder(), "api.json").exists()
    runningClasses.forEach {
        if (Objective::class.java.isAssignableFrom(it) && !it.isAnnotationPresent(Abstract::class.java)) {
            // 检测依赖环境
            if (checkDependency && it.isAnnotationPresent(Dependency::class.java)) {
                val dependency = it.getAnnotation(Dependency::class.java)
                // 不支持的扩展
                if (dependency.plugin != "minecraft" && Bukkit.getPluginManager().getPlugin(dependency.plugin) == null) {
                    return@forEach
                }
                // 不支持的版本
                if (MinecraftVersion.majorLegacy < dependency.version) {
                    return@forEach
                }
            }
            // 注册目标
            try {
                (it.getInstance()?.get() as? Objective<*>)?.register()
            } catch (ignored: NoClassDefFoundError) {
                // 例如版本问题导致的错误，无法被精确的判断
            }
        } else if (it.isAnnotationPresent(Id::class.java)) {
            val id = it.getAnnotation(Id::class.java).id
            when {
                Meta::class.java.isAssignableFrom(it) -> {
                    ChemdahAPI.questMeta[id] = it as Class<out Meta<*>>
                }
                Addon::class.java.isAssignableFrom(it) -> {
                    ChemdahAPI.questAddon[id] = it as Class<out Addon>
                }
            }
        }
    }
}
```

### Objective 注册方法

Objective 通过 `QuestLoader` 的扩展方法进行注册：

```kotlin
fun <T : Any> Objective<T>.register() {
    ChemdahAPI.questObjective[name] = this
    // 是否注册监听器
    if (isListener) {
        // 对该条目注册独立监听器
        registerEvent(event, EventPriority.values()[priority.ordinal], ignoreCancelled) { e ->
            e as T
            // 回调事件
            ChemdahAPI.eventFactory.callObjectiveCall(this@register, e)
            // 若该事件被任何任务使用
            if (using) {
                val player = handler.apply(e) ?: return@registerEvent
                if (player.isChemdahProfileLoaded) {
                    handleEvent(player, e)
                }
            }
        }
    }
}
```

## 1. 自定义 Objective 开发

### 基础结构

#### Kotlin 实现

```kotlin
@Dependency("minecraft")  // 依赖声明
object MyCustomObjective : ObjectiveCountableI<MyEvent>() {
    
    override val name = "my custom objective"  // 目标名称
    override val event = MyEvent::class.java   // 监听的事件类型
    
    init {
        // 设置事件处理器
        handler { event ->
            event.player  // 返回触发事件的玩家
        }
        
        // 添加条件检查
        addSimpleCondition("position") { data, event ->
            data.toPosition().inside(event.location)
        }
        
        // 添加条件变量
        addConditionVariable("custom_value") { event ->
            event.someValue
        }
    }
}
```

#### Java 实现

```java
@Dependency("minecraft")
public class MyCustomObjective extends ObjectiveCountableI<MyEvent> {
    
    public static final MyCustomObjective INSTANCE = new MyCustomObjective();
    
    @Override
    public String getName() {
        return "my custom objective";
    }
    
    @Override
    public Class<MyEvent> getEvent() {
        return MyEvent.class;
    }
    
    private MyCustomObjective() {
        // 设置事件处理器
        handler(event -> event.getPlayer());
        
        // 添加条件检查
        addSimpleCondition("position", (data, event) -> 
            data.toPosition().inside(event.getLocation())
        );
        
        // 添加条件变量
        addConditionVariable("custom_value", event -> event.getSomeValue());
    }
}
```

### 详细实现示例

#### Kotlin 实现

```kotlin
@Dependency("minecraft")
object IBlockBreak : ObjectiveCountableI<BlockBreakEvent>() {

    override val name = "block break"
    override val event = BlockBreakEvent::class.java

    init {
        // 设置玩家提取器
        handler { it.player }
        
        // 位置条件
        addSimpleCondition("position") { data, it ->
            data.toPosition().inside(it.block.location)
        }
        
        // 方块类型条件
        addSimpleCondition("material") { data, it ->
            data.toInferBlock().isBlock(it.block)
        }
        
        // 经验条件
        addSimpleCondition("exp") { data, it ->
            data.toConditionNumber().check(it.expToDrop)
        }
        
        // 唯一性条件（非玩家放置）
        addSimpleCondition("unique") { data, it ->
            if (data.toBoolean()) !it.block.isPlaced() else true
        }
        
        // 添加条件变量
        addConditionVariable("exp") { it.expToDrop }
    }
}
```

#### Java 实现

```java
@Dependency("minecraft")
public class IBlockBreak extends ObjectiveCountableI<BlockBreakEvent> {
    
    public static final IBlockBreak INSTANCE = new IBlockBreak();
    
    @Override
    public String getName() {
        return "block break";
    }
    
    @Override
    public Class<BlockBreakEvent> getEvent() {
        return BlockBreakEvent.class;
    }
    
    private IBlockBreak() {
        // 设置玩家提取器
        handler(BlockBreakEvent::getPlayer);
        
        // 位置条件
        addSimpleCondition("position", (data, event) -> 
            data.toPosition().inside(event.getBlock().getLocation())
        );
        
        // 方块类型条件
        addSimpleCondition("material", (data, event) -> 
            data.toInferBlock().isBlock(event.getBlock())
        );
        
        // 经验条件
        addSimpleCondition("exp", (data, event) -> 
            data.toConditionNumber().check(event.getExpToDrop())
        );
        
        // 唯一性条件（非玩家放置）
        addSimpleCondition("unique", (data, event) -> {
            if (data.toBoolean()) {
                return !QuestDevelopment.isPlaced(event.getBlock());
            } else {
                return true;
            }
        });
        
        // 添加条件变量
        addConditionVariable("exp", BlockBreakEvent::getExpToDrop);
    }
}
```

### 注册方式

**重要提示**：所有组件的注册都是通过 `QuestLoader.registerAll()` 方法自动完成的。开发者只需要：

1. **确保类在 classpath 中**：类必须能被 `runningClasses` 扫描到
2. **正确使用注解**：
   - Objective：不需要 `@Id` 注解，但需要 `@Dependency` 注解
   - Addon/Meta：必须使用 `@Id` 注解标识组件ID
3. **遵循命名规范**：建议使用单例模式（object 或 static final INSTANCE）

Objective 的具体注册逻辑：

```kotlin
fun <T : Any> Objective<T>.register() {
    ChemdahAPI.questObjective[name] = this
    // 注册事件监听器
    if (isListener) {
        registerEvent(event, EventPriority.values()[priority.ordinal], ignoreCancelled) { e ->
            // 事件处理逻辑
        }
    }
}
```

**Java 开发者注意事项**：
- 使用静态单例模式：`public static final MyObjective INSTANCE = new MyObjective();`
- 构造函数设为私有，防止外部实例化
- 确保类能被反射访问

### 使用示例

```yaml
# 任务配置文件
task:
  0:
    objective: block break  # 使用自定义目标
    condition:
      material: diamond_ore
      position: "world 100 64 100 ~ 10"
      unique: true
    goal:
      amount: 10
```

## 2. 自定义 Addon 开发

### 基础结构

#### Kotlin 实现

```kotlin
@Id("my_addon")                    // 组件ID
@Option(Option.Type.SECTION)       // 配置类型
class MyAddon(
    config: ConfigurationSection,  // 配置数据
    questContainer: QuestContainer  // 所属容器
) : Addon(config, questContainer) {
    
    // 组件逻辑实现
    private val enabled = config.getBoolean("enabled", true)
    
    init {
        // 初始化逻辑
    }
    
    companion object {
        // 扩展方法
        fun QuestContainer.myAddon() = addon<MyAddon>("my_addon")
    }
}
```

#### Java 实现

```java
@Id("my_addon")
@Option(Option.Type.SECTION)
public class MyAddon extends Addon {
    
    private final boolean enabled;
    
    public MyAddon(ConfigurationSection config, QuestContainer questContainer) {
        super(config, questContainer);
        this.enabled = config.getBoolean("enabled", true);
        // 初始化逻辑
    }
    
    public boolean isEnabled() {
        return enabled;
    }
    
    // 静态方法用于获取组件实例
    public static MyAddon getMyAddon(QuestContainer container) {
        return container.addon("my_addon");
    }
}
```

### 详细实现示例

```kotlin
@Id("stats")
@Option(Option.Type.SECTION)
class AddonStats(config: ConfigurationSection, questContainer: QuestContainer) : Addon(config, questContainer) {

    // 配置选项
    val visible = config["visible"] == "true"
    val visibleAlways = config["visible"] == "always"
    val stay = config.getInt("stay", 100)
    val style = BarStyle.valueOf(config.getString("style", "SOLID")!!.uppercase())
    val color = BarColor.valueOf(config.getString("color", "WHITE")!!.uppercase())
    val content = config.getString("content", "&7{name} &8{value}/{target}")
    
    // 功能方法
    fun getProgress(profile: PlayerProfile, task: Task? = null): CompletableFuture<Progress> {
        // 获取进度逻辑
    }
    
    companion object {
        // 扩展方法
        fun QuestContainer.stats() = addon<AddonStats>("stats")
        
        // 事件监听
        @SubscribeEvent
        private fun onContinuePost(e: ObjectiveEvents.Continue.Post) {
            e.task.refreshStats(e.playerProfile)
        }
    }
}
```

### 使用示例

```yaml
# 任务配置文件
addon:
  stats:
    visible: always
    style: SEGMENTED_20
    color: GREEN
    content: "&a{name} &7{value}/{target} &8({percent}%)"
```

## 3. 自定义 Meta 开发

### 基础结构

#### Kotlin 实现

```kotlin
@Id("my_meta")                     // 元数据ID
@Option(Option.Type.TEXT)          // 配置类型
class MyMeta(
    source: String?,               // 源数据
    questContainer: QuestContainer // 所属容器
) : Meta<String?>(source, questContainer) {
    
    val value = source
    
    companion object {
        // 扩展方法
        fun QuestContainer.myMeta() = meta<MyMeta>("my_meta")
    }
}
```

#### Java 实现

```java
@Id("my_meta")
@Option(Option.Type.TEXT)
public class MyMeta extends Meta<String> {
    
    private final String value;
    
    public MyMeta(String source, QuestContainer questContainer) {
        super(source, questContainer);
        this.value = source;
    }
    
    public String getValue() {
        return value;
    }
    
    // 静态方法用于获取元数据实例
    public static MyMeta getMyMeta(QuestContainer container) {
        return container.meta("my_meta");
    }
}
```

### 详细实现示例

```kotlin
@Id("name")
@Option(Option.Type.TEXT)
class MetaName(source: String?, questContainer: QuestContainer) : Meta<String?>(source, questContainer) {

    val displayName = source

    companion object {
        /** 获取展示名称 */
        fun QuestContainer.displayName(colored: Boolean = true): String {
            val displayName = meta<MetaName>("name")?.displayName 
                ?: if (this is Task) template.displayName(colored) else id
            return if (colored) displayName.colored() else displayName
        }
    }
}
```

### 使用示例

```yaml
# 任务配置文件
meta:
  name: "收集钻石"
  type: "daily"
  description: "每日收集任务"
```

## 4. 自定义 Selector 开发

### 物品选择器扩展

```kotlin
// 通过事件钩子扩展
@SubscribeEvent
private fun onItemHook(e: InferItemHookEvent) {
    when (e.id.lowercase()) {
        "myplugin" -> {
            e.itemClass = MyPluginItem::class.java
        }
    }
}

class MyPluginItem(material: String, flags: List<Flags>, data: List<DataMatch>) 
    : InferItem.Item(material, flags, data) {
    
    override fun match(item: ItemStack): Boolean {
        return matchType(item.getMyPluginId()) && matchMetaData(item)
    }
    
    override fun matchMetaData(item: ItemStack, itemMeta: ItemMeta?, dataMatch: DataMatch): Boolean {
        return when (dataMatch.key) {
            "level" -> dataMatch.check(item.getMyPluginLevel())
            "quality" -> dataMatch.check(item.getMyPluginQuality())
            else -> super.matchMetaData(item, itemMeta, dataMatch)
        }
    }
    
    private fun ItemStack.getMyPluginId(): String {
        // 获取自定义物品ID的逻辑
        return MyPluginAPI.getItemId(this) ?: "@vanilla"
    }
}
```

### 实体选择器扩展

```kotlin
class MyPluginEntity(material: String, flags: List<Flags>, data: List<DataMatch>) 
    : InferEntity.Entity(material, flags, data) {
    
    override fun match(entity: org.bukkit.entity.Entity): Boolean {
        return matchType(entity.getMyPluginId()) && matchData(entity)
    }
    
    override fun matchData(entity: org.bukkit.entity.Entity): Boolean {
        return data.all { dataMatch ->
            when (dataMatch.key) {
                "level" -> dataMatch.check(entity.getMyPluginLevel())
                "type" -> dataMatch.check(entity.getMyPluginType())
                else -> super.matchData(entity)
            }
        }
    }
}
```

## 注解说明

### @Id 注解
用于标识组件的唯一ID，在配置文件中通过此ID引用组件。

```kotlin
@Id("my_component")
class MyComponent { ... }
```

### @Option 注解
指定组件接受的配置数据类型：

- `Option.Type.TEXT` - 字符串
- `Option.Type.NUMBER` - 数字
- `Option.Type.BOOLEAN` - 布尔值
- `Option.Type.LIST` - 列表
- `Option.Type.MAP_LIST` - 映射列表
- `Option.Type.SECTION` - 配置节
- `Option.Type.ANY` - 任意类型

### @Dependency 注解
声明组件的依赖插件和版本要求：

```kotlin
@Dependency("MyPlugin", version = 11300)
object MyObjective { ... }
```

## 最佳实践

### 1. 错误处理
```kotlin
init {
    addSimpleCondition("my_condition") { data, event ->
        try {
            // 条件检查逻辑
            data.toMyCustomType().check(event)
        } catch (ex: NoSuchMethodError) {
            warning("条件 \"my_condition\" 与当前版本不兼容: ${ex.message}")
            false
        }
    }
}
```

### 2. 异步处理
```kotlin
override fun checkGoal(profile: PlayerProfile, quest: Quest, task: Task): CompletableFuture<Boolean> {
    return CompletableFuture.supplyAsync {
        // 异步检查逻辑
        performExpensiveCheck()
    }
}
```

### 3. 资源清理
```kotlin
companion object {
    @SubscribeEvent
    private fun onPlayerQuit(e: PlayerQuitEvent) {
        // 清理玩家相关资源
        myDataMap.remove(e.player.name)
    }
}
```

### 4. 配置验证
```kotlin
init {
    if (config.getString("required_field").isNullOrEmpty()) {
        warning("组件 ${questContainer.id} 缺少必需的配置项 'required_field'")
    }
}
```

## 完整示例项目

### 自定义击杀特定怪物目标

#### Kotlin 实现

```kotlin
@Dependency("minecraft")
object IKillCustomMob : ObjectiveCountableI<EntityDeathEvent>() {
    
    override val name = "kill custom mob"
    override val event = EntityDeathEvent::class.java
    
    init {
        handler { event ->
            event.entity.killer
        }
        
        addSimpleCondition("mob_type") { data, event ->
            data.asList().any { 
                it.equals(event.entity.type.name, true) 
            }
        }
        
        addSimpleCondition("mob_name") { data, event ->
            val customName = event.entity.customName
            if (customName != null) {
                data.asList().any { 
                    customName.contains(it, true) 
                }
            } else false
        }
        
        addSimpleCondition("position") { data, event ->
            data.toPosition().inside(event.entity.location)
        }
        
        addConditionVariable("mob_type") { 
            it.entity.type.name 
        }
        
        addConditionVariable("mob_name") { 
            it.entity.customName ?: "Unknown" 
        }
    }
}
```

#### Java 实现

```java
@Dependency("minecraft")
public class IKillCustomMob extends ObjectiveCountableI<EntityDeathEvent> {
    
    public static final IKillCustomMob INSTANCE = new IKillCustomMob();
    
    @Override
    public String getName() {
        return "kill custom mob";
    }
    
    @Override
    public Class<EntityDeathEvent> getEvent() {
        return EntityDeathEvent.class;
    }
    
    private IKillCustomMob() {
        // 设置玩家提取器
        handler(event -> event.getEntity().getKiller());
        
        // 怪物类型条件
        addSimpleCondition("mob_type", (data, event) -> {
            List<String> types = data.asList();
            String entityType = event.getEntity().getType().name();
            return types.stream().anyMatch(type -> 
                type.equalsIgnoreCase(entityType)
            );
        });
        
        // 怪物名称条件
        addSimpleCondition("mob_name", (data, event) -> {
            String customName = event.getEntity().getCustomName();
            if (customName != null) {
                List<String> names = data.asList();
                return names.stream().anyMatch(name -> 
                    customName.toLowerCase().contains(name.toLowerCase())
                );
            }
            return false;
        });
        
        // 位置条件
        addSimpleCondition("position", (data, event) -> 
            data.toPosition().inside(event.getEntity().getLocation())
        );
        
        // 添加条件变量
        addConditionVariable("mob_type", event -> 
            event.getEntity().getType().name()
        );
        
        addConditionVariable("mob_name", event -> {
            String customName = event.getEntity().getCustomName();
            return customName != null ? customName : "Unknown";
        });
    }
}
```

### 任务配置示例

```yaml
custom_kill_quest:
  meta:
    name: "击杀自定义怪物"
    type: "special"
  task:
    0:
      objective: kill custom mob
      condition:
        mob_type: 
          - "ZOMBIE"
          - "SKELETON"
        mob_name:
          - "Boss"
          - "Elite"
        position: "world 0 0 0 ~ 100"
      goal:
        amount: 5
      addon:
        stats:
          visible: always
          content: "&c击杀Boss怪物 &7{value}/{target}"
  addon:
    ui:
      icon: diamond_sword
      description: 
        - "&7击杀指定的Boss怪物"
        - "&7奖励丰厚！"
```
