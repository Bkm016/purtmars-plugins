---
sidebar_position: 1
---

# 安装插件

## 运行环境

- **Java**：17 或更高版本
- **服务端**：Paper / Purpur（支持 1.17 ~ 1.21），不支持 Spigot

## 前置插件

| 插件 | 是否必须 | 说明 |
|------|---------|------|
| TabooLib | 自动下载 | 首次启动时联网拉取，无需手动安装 |
| Adyeshach | 可选 | 启用 NPC 对话功能时需要，详见 [Adyeshach 文档](https://a.ptms.ink/docs/start/build) |

:::tip

Chemdah 在首次启动时，需要下载依赖，因此请确保你的服务器可以正常联网。

:::

## 安装步骤

1. 将 `Chemdah-*.jar` 放入服务器的 `plugins/` 目录
2. 启动（或重启）服务器
3. 确认以下目录和文件已生成：

```yaml
plugins/
└── Chemdah/
    ├── core ··················· 核心目录
    │   ├── conversation ······· 对话目录
    │   └── quest ·············· 任务目录
    ├── module ················· 模块目录
    │   └── level.yml ·········· 等级配置文件
    ├── config.yml ············· 主配置
    └── datasource.yml ········· 数据库配置
```

如果控制台没有报错且上述目录正常生成，说明安装成功。
