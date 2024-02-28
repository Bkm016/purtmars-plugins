---
sidebar_position: 2
---

# 配置插件

若插件成功安装，你将会在服务端插件目录下看到一个名为 Chemdah 的目录，其结构如下。

```yaml
Chemdah
├── core ······················· 核心目录
│   ├── conversation ··········· 对话目录
│   │   └── example.yml
│   ├── quest ·················· 任务目录
│   │   └── example.yml
│   ├── conversation.yml ······· 对话配置文件
│   └── group.yml ·············· 任务组配置文件
├── lang ······················· 语言文件
│   └── zh_CN.yml
├── module ····················· 模块目录
│   ├── generator ·············· 生成器目录
│   ├── script ················· 脚本目录
│   ├── wizard ················· 向导目录
│   ├── level.yml ·············· 等级配置文件
│   ├── party.yml ·············· 队伍配置文件
│   ├── realms.yml ············· 领域配置文件
│   ├── scenes.yml ············· 场景配置文件
│   ├── synchronous.yml ········ 数据同步配置文件
│   └── ui.yml ················· 任务页面配置文件
├── config.yml ················· 主要配置文件
├── data.db ···················· 本地数据库
├── datasource.yml ············· 数据库连接池配置文件
└── kether.yml ················· Kether 配置文件
```

## 修改数据库配置

打开主要配置文件 `config.yml` 后，你将看到如下内容：

```yaml
# 数据库相关配置
database:
  # 数据加载延迟
  # 玩家进入服务器后多久开始加载数据
  join-select-delay: 20
  # 数据索引类型
  # 在投入生产环境后不可修改
  # 可用：NAME、UUID
  user-index: UUID
  # 数据储存类型
  # 可用: LOCAL, SQL
  use: LOCAL
  # 数据源
  source:
    SQL:
      host: localhost
      port: 3306
      user: root
      password: root
      database: test
      table: chemdah
  # 是否禁用自动保存
  # 使用 profile save 语句主动写入数据
  disable-auto-save: false

...
```

:::tip

您在修改数据库配置后，需要重新启动服务器，推荐您使用 SQL 储存数据。

:::

其他配置将在后续章节中介绍。

## 关于大型服务器

经过测试，在 MySQL 负载正常的情况下，Chemdah 的数据同步模式可以稳定的在中小型服务器中保持数据的一致性。但对于有特殊要求的大型服务器，Chemdah 提供了 API 允许您接管数据加载和保存的时机。

1. 禁用 Chemdah 原生的数据加载和保存:
```kotlin
ChemdahDatabase.isLoadInJoinEvent = false
ChemdahDatabase.isReleaseInQuitEvent = false
```

2. 在您的生命周期下手动加载和保存数据:
```kotlin
@SubscribeEvent
fun onJoin(e: CustomPlayerJoinEvent) {
    ChemdahDatabase.loadProfile(e.player)
}

@SubscribeEvent
fun onQuit(e: CustomPlayerQuitEvent) {
    val future = ChemdahDatabase.releaseProfile(e.player)
    if (e.isAsync) {
        future.get() // 等待 Chemdah 数据保存完成
    }
}
```

:::tip

这种操作的前提是您的服务器有一套专用的数据同步机制。

:::