---
sidebar_position: 4
---

# 配置插件

若插件成功安装，你将会在服务端插件目录下看到一个名为 `Adyeshach` 的目录，其结构如下。

```text
Adyeshach
├── core ······················· 核心文件
│   ├── description ············ 描述目录 ········· 不可修改
│   │   ├── entity_meta.desc
│   │   ├── entity_meta-unused.desc
│   │   └── entity_types.desc
│   ├── lang ··················· 语言文件
│   │   └── zh_CN.yml
│   ├── block_height.json ······ 方块高度数据 ······ 不可修改
│   └── config.yml ············· 主要配置文件
├── editor ····················· 编辑器配置目录
│   └── controller.yml ········· 预设控制器文件
├── npc ························ 虚拟实体储存目录
│   ├── controller ············· 自定义控制器目录 ······ 默认没有，需自行创建
│   │   └── def.yml
│   ├── traits ················· 特性储存目录
│   │   ├── command.yml
│   │   ├── patrol.yml
│   │   ├── title.yml
│   │   └── view-condition.yml 
│   └── trash ·················· 回收站 ··········· 默认没有，自动创建
├── skin ······················· 皮肤储存目录 ······ 默认没有，需自行创建
│   ├── upload ················· 皮肤上传目录 ······ 默认没有，需自行创建
│   │   └── steve.png
│   └── steve ·················· 皮肤缓存文件 ······ 上传成功后自动生成
└── kether.yml ················· Kether 配置文件
```

## 主要配置文件

打开主要配置文件 `config.yml` 后，你将看到如下内容：

:::tip

因兼容性需要，因此文件结构与功能和 `1.x` 版本无异。

:::

```yaml
Settings:
  # 是否启用调试模式
  # 调试模式下将显示单位移动路径等调试信息
  debug: false
  # 默认可视距离
  # 必须小于 server.properties 中的 "view-distance"
  visible-distance: 64
  # 单位生成触发器
  # JOIN: 当玩家加入服务器时
  # KEEP_ALIVE: 当玩家发送第一个位置数据包时
  spawn-event: KEEP_ALIVE
  # 是否在主线程上进行路径计算
  # 异步计算会带来延迟
  pathfinder-sync: true
  # 当指定的世界不存在时删除单位文件
  delete-file-in-unknown-world:
    - 'dungeon_world_1'
    - 'dungeon_world_2'
    - 'custom?'
  # 可视条件的刷新周期
  view-condition-interval: 40
```

:::tip

大多数情况下，其实不需要修改这个文件。

:::