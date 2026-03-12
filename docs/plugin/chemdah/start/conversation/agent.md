---
sidebar_position: 4
---

# 对话代理

对话代理（Agent）是在对话生命周期特定时机自动执行的 Kether 脚本，可以用来触发任务、播放动画、检查条件或修改对话流程。

## 代理类型

| 类型 | 说明 |
|------|------|
| `begin` | 对话开始前执行，阻塞后续流程直到脚本完成 |
| `begin_async` | 对话开始前执行，不阻塞 |
| `start` | 对话界面就绪后执行，阻塞 |
| `start_async` | 对话界面就绪后执行，不阻塞 |
| `goto` | 跳转到新对话节点时执行 |
| `refuse` | 玩家拒绝（关闭）对话时执行，阻塞 |
| `refuse_async` | 玩家拒绝对话时执行，不阻塞 |
| `end` | 对话正常结束时执行，阻塞 |
| `end_async` | 对话正常结束时执行，不阻塞 |

`begin` 和 `start` 的区别：`begin` 在对话主题初始化之前触发，`start` 在界面已经展示后触发。

## 基本写法

在对话文件的 `agent:` 节点下按类型写入 Kether 脚本：

```yaml title="对话文件.yml"
agent:
  begin:
    - "tell &a对话开始了"
  end:
    - "tell &7对话结束"
```

多行脚本按列表顺序依次执行：

```yaml title="对话文件.yml"
agent:
  begin:
    - "set quest_flag value true"
    - "tell &a任务已标记"
```

## 限制符

在类型后加 `@restrict` 后缀，可以限制代理仅在满足条件时触发：

```yaml title="对话文件.yml"
agent:
  begin@restrict:
    - "check quest_flag value true"
  start:
    - "tell &a欢迎回来"
```

:::tip

`@restrict` 中的脚本返回 `false` 时，整个对话代理的对应事件不会触发。可以用来做条件分支控制。

:::

## 可用 Kether 动作

对话代理中可以使用以下专属动作：

| 动作 | 说明 |
|------|------|
| `talk <文本>` | 向玩家发送对话消息 |
| `set <变量> <值>` | 设置对话会话变量 |
| `cancel` | 取消当前对话（仅在 `begin` 中有效） |
| `goto <节点>` | 跳转到指定对话节点 |

## 完整示例

```yaml title="npc_merchant.yml"
__option__:
  title: "商人王五"
  theme: chat

merchant_main:
  agent:
    begin:
      - "tell &7正在检查任务状态..."
    begin_async:
      - "actionbar &7正在与商人交谈"
    start:
      - "set greeted true"
    goto:
      - "tell &7跳转到新节点"
    refuse:
      - "tell &7好吧，下次再来"
    end:
      - "set quest_merchant_done true"
  npc:
    - "你好，旅行者，需要什么吗？"
  player:
    - reply: "我需要购买物品。"
    - reply: "只是随便问问。"
      agent:
        end:
          - "tell &7再见"
```

:::tip

代理脚本写在对话根节点时对整个对话生效。也可以在具体的对话节点或回复选项下写 `agent:`，让代理只在该节点或选项触发时执行。

:::
