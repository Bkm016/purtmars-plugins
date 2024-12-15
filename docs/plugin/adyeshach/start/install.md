---
sidebar_position: 3
---

# 安装插件

将插件本体放入服务端插件目录下，重启服务端。在这之后你将看到如下相关信息。

:::tip

Adyeshach Docs 中的演示环境为 3619-Spigot-d90018e-6459934 (MC: 1.19.3)

:::

```log
[Adyeshach] Enabling Adyeshach v2.0.0
[Adyeshach] Loaded 114 entity type(s) from the "entity_types.desc"
[Adyeshach] Proxy classes has been generated (407ms)
[Adyeshach] Loaded 181 entity metadata from the "entity_meta.desc"
[Adyeshach] Loaded 87 unused entity metadata from the "entity_meta_unused.desc"
```

若启动过程中没有产生任何关于 Adyeshach 的错误信息，则表示插件已经成功安装。

## 关于依赖

:::tip

Adyeshach 需要联网从阿里云中央仓库下载依赖，所有依赖均为知名开源项目。

:::

目前需要联网下载的依赖有：

| 组 | 项目 | 版本 | 用途 | |
|-------------------------------|----------------------|--------| --- |
| org.jetbrains.kotlin | kotlin-stdlib | `1.5.31` | Kotlin 标准库 |
| org.jetbrains.kotlin | annotations | `13.0`   | Kotlin 注解库 |
| org.jetbrains.kotlin | kotlin-stdlib-common | `1.5.31` | Kotlin 标准库 |
| org.jetbrains.kotlin | kotlin-stdlib-jdk7 | `1.5.31` | Kotlin 标准库 |
| org.jetbrains.kotlin | kotlin-stdlib-jdk8 | `1.5.31` | Kotlin 标准库 |
| org.apache.commons | commons-jexl3 | `3.2.1`  | JEXL 表达式引擎 |
| org.yaml | snakeyaml | `1.32`   | YAML 解析器 |
| com.typesafe | config | `1.4.2`  | Typesafe 配置库 |
| com.electronwill.night-config | core | `3.6.6`  | NightConfig 配置库 |
| com.electronwill.night-config | json | `3.6.6`  | NightConfig 模块 |
| com.electronwill.night-config | yaml | `3.6.6`  | NightConfig 模块 |
| com.electronwill.night-config | toml | `3.6.6`  | NightConfig 模块 |
| com.electronwill.night-config | hocon | `3.6.6`  | NightConfig 模块 |
| org.mongodb | mongo-java-driver | `3.12.11` | MongoDB 驱动 |
| com.github.ben-manes.caffeine | caffeine | `2.9.3`  | Caffeine 缓存库 |

:::tip

这些依赖只会在服务端启动时下载，下载完成后会缓存到服务端的 `libs` 目录下。

:::