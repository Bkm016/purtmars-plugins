---
sidebar_position: 1
---

# 模块

Chemdah 的功能通过模块系统拆分，每个模块独立加载、独立配置，按需启用。

所有模块的配置文件都在 `Chemdah/module/` 目录下。

## 可用模块

- [等级系统（level）](./level) — 自定义等级体系，支持多套并行
- [队伍系统（party）](./party) — 对接第三方队伍插件，支持任务共享与协作
- [脚本系统（script）](./script) — 通过脚本扩展任务逻辑
- [数据同步（synchronous）](./synchronous) — 将 Chemdah 数据同步到原版经验条或 Vault 经济
- [任务页面（ui）](./ui) — 配置任务列表 UI 界面
- [向导模块（wizard）](./wizard) — 引导式任务向导
- [演出方块（scenes）](./scenes) — 自定义演出方块
- [名称生成器（generator）](./generator) — 随机名称生成器
