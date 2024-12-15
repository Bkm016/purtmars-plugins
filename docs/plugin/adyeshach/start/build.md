---
sidebar_position: 2
---

# 构建插件

:::tip

如果你是付费用户，那么可以跳过这一步。

:::

从 [Adyeshach 仓库](https://github.com/taboolib/adyeshach) 中克隆完整项目在你的工作环境中。

```bash
git clone --depth=1 https://github.com/taboolib/adyeshach
```

## 构建

```bash title="1. 构建"
gradlew build
```

```bash
Executing 'build'...

> Configure project :
> Apply "ink.ptms.adyeshach:api-data-serializer:2.0.0"
> Apply "ink.ptms.adyeshach:common:2.0.0"
> Apply "ink.ptms.adyeshach:common-impl:2.0.0"
> Apply "ink.ptms.adyeshach:common-impl-nms:2.0.0"
> Apply "ink.ptms.adyeshach:common-impl-nms-j17:2.0.0"
> Apply "ink.ptms.adyeshach:compat-model-engine-v2:2.0.0"
> Apply "ink.ptms.adyeshach:compat-model-engine-v3:2.0.0"
> Apply "ink.ptms.adyeshach:module-bukkit:2.0.0"
> Apply "ink.ptms.adyeshach:module-editor:2.0.0"
> Apply "ink.ptms.adyeshach:module-language:2.0.0"
> Apply "ink.ptms.adyeshach:module-legacy-api:2.0.0"

> Task :compileJava NO-SOURCE
> Task :processResources NO-SOURCE
> Task :classes UP-TO-DATE
> Task :jar
> Task :assemble
> Task :compileTestJava NO-SOURCE
> Task :processTestResources NO-SOURCE
> Task :testClasses UP-TO-DATE
> Task :test NO-SOURCE
> Task :check UP-TO-DATE
> Task :build

...

BUILD SUCCESSFUL in 5s
59 actionable tasks: 8 executed, 51 up-to-date
````

在这之后，插件文件位于 `plugin/build/libs/plugin-2.0.0.jar`。