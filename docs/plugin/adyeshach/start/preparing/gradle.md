---
sidebar_position: 5
---

# 安装 Gradle

:::tip

如果你是付费用户，那么可以跳过这一步。

:::

Gradle 是一个基于 JVM 的构建工具，所有基于 TabooLib 的插件必须在 Gradle 工具下开发。

    本篇文章使用 COPILOT 生成。

## 下载

在 [Gradle 官方下载页面](https://gradle.org/releases/) 中可以找到所有的 Gradle 发行版本，其中包括了最新的稳定版本和旧版本的归档。

## 安装

### Windows 平台

在 Windows 系统中，可以使用 [Chocolatey](https://chocolatey.org/) 来安装 Gradle。

```bash
choco install gradle
```

### macOS 平台

在 macOS 系统中，可以使用 [Homebrew](https://brew.sh/) 来安装 Gradle。

```bash
brew install gradle
```

### Linux 和 Unix 平台

在 Linux 系统中，可以使用包管理器来安装 Gradle。

:::tip

你也许需要在命令前加上 `sudo`。

:::

#### Debian 或 Ubuntu
```bash
apt install gradle
```

#### Fedora
```bash
dnf install gradle
```

#### Arch Linux
```bash
pacman -S gradle
```

## 验证

在安装完成后，可以使用 `gradle -v` 命令来验证 Gradle 是否安装成功。

```bash
gradle -v
```

```bash
------------------------------------------------------------
Gradle 7.0.2
------------------------------------------------------------
```

## 配置

在安装完成后，可以使用 `gradle init` 命令来初始化一个 Gradle 项目。

```bash
gradle init
```

```bash
Select type of project to generate:
  1: basic
  2: application
  3: library
  4: Gradle plugin
Enter selection (default: basic) [1..4] 2
```

```bash
Select implementation language:
  1: C++
  2: Groovy
  3: Java
  4: Kotlin
  5: Scala
  6: Swift
Enter selection (default: Java) [1..6] 3
```

```bash
Select build script DSL:
  1: Groovy
  2: Kotlin
Enter selection (default: Groovy) [1..2] 2
```

```bash
Select test framework:
  1: JUnit 4
  2: TestNG
  3: Spock
  4: JUnit Jupiter
Enter selection (default: JUnit 4) [1..4] 4
```

```bash
Project name (default: gradle):
Source package (default: gradle):
```

```bash
> Task :init
Get more help with your project: https://docs.gradle.org/7.0.2/samples/sample_building_java_applications.html
```

```bash
BUILD SUCCESSFUL in 1m 1s
1 actionable task: 1 executed
```

## 构建

在初始化完成后，可以使用 `gradle build` 命令来构建项目。

```bash
gradle build
```

```bash
> Task :compileJava
Note: Some input files use unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.

> Task :processResources NO-SOURCE
> Task :classes

> Task :jar
> Task :assemble
> Task :compileTestJava
> Task :processTestResources NO-SOURCE
> Task :testClasses
> Task :test

BUILD SUCCESSFUL in 1s
6 actionable tasks: 6 executed
```

## 运行

在构建完成后，可以使用 `gradle run` 命令来运行项目。

```bash
gradle run
```

```bash
> Task :compileJava
Note: Some input files use unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.

> Task :processResources NO-SOURCE
> Task :classes

> Task :run
Hello world.

BUILD SUCCESSFUL in 1s
5 actionable tasks: 5 executed
```

## 清理

在运行完成后，可以使用 `gradle clean` 命令来清理项目。

```bash
gradle clean
```

```bash
> Task :clean

BUILD SUCCESSFUL in 0s
1 actionable task: 1 executed
```

## 参考

- [Gradle 官方文档](https://docs.gradle.org/current/userguide/userguide.html)
- [Gradle 官方下载页面](https://gradle.org/releases/)
- [Gradle 官方安装页面](https://gradle.org/install/)