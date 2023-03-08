---
sidebar_position: 1
---

# 语句入门

> 本文主要借助一些常见的语句来展开讲解几个语句的基本概念。


## 语句的简单使用

---

我们先来从几个比较基础的语句开始说起

### Print 语句
「展开 / 收起详情」💠 Print 语句[官方文档引用 Reference](https://www.yuque.com/sacredcraft/kether/reference?view=doc_embed&inner=pPdnb)

这个语句可以将消息打印到控制台，语句后面写了什么它就会在控制台上打印什么<br />例如在控制台中使用 `Vulpecula` 插件试着玩一下这个语句，能得到这样的效果
:::tip
>`/vul eval print 今天翻的是书`<br />[Vulpecula] **今天翻的是书**<br />[Result] kotlin1510.Unit
:::


### Tell 语句
「展开 / 收起详情」💠 Tell 语句[引用](https://www.yuque.com/sacredcraft/kether/reference?view=doc_embed&inner=Yif7z)

这个语句跟刚才的 `print` 语句是差不多的功能，都是发送一段消息<br />只不过区别在于，`print` 语句是把消息打印到控制台，而这个语句会把消息发给 **脚本的执行者**
:::tip
>`/vul eval tell "明天数的是钱！"`<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/26025412/1675437758282-3e617b62-7b3f-4190-9ddc-b123a5232cd3.png#averageHue=%23415327&clientId=udb2cf93c-e43a-4&from=paste&height=141&id=u716dfef9&name=image.png&originHeight=141&originWidth=854&originalType=binary&ratio=1&rotation=0&showTitle=false&size=45568&status=done&style=none&taskId=ua43c53d0-3ea7-4d3d-866e-ae79f7b3048&title=&width=854)
:::
对于 `/vul eval <kether>` 这个命令来说，如果是玩家使用该命令，则脚本执行者是玩家，如果是控制台执行命令，那么脚本执行者便是玩家。

因此，如果脚本执行者是玩家，那这段消息会被发给玩家<br />如果脚本执行者是控制台，那这段消息会被打印到控制台，此时 `tell` 语句跟 `print` 语句并无差别


### Color Text 语句
「展开 / 收起详情」💠 Color Text 语句[官方文档引用 Reference](https://www.yuque.com/sacredcraft/kether/reference?view=doc_embed&inner=kNtJ1)

这个语句，从名字上看就能猜出大致功能，没错，就是颜色转换。<br />如果你尝试发送有颜色代码的文本 `tell "&d丈母娘喜欢有学历的女婿"` 你会发现颜色代码并不起作用<br />这是因为，`tell` 和 `print` 语句都没有转换颜色的功能，要实现颜色的转换，还需要通过 `color` 这个语句才行。

:::tip
>`/vul eval tell color "&d丈母娘喜欢有学历的女婿"`<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/26025412/1675437781392-ee67050d-6dd1-480f-a449-cd1c56bd3867.png#averageHue=%23405327&clientId=udb2cf93c-e43a-4&from=paste&height=137&id=ue9059f72&name=image.png&originHeight=137&originWidth=854&originalType=binary&ratio=1&rotation=0&showTitle=false&size=46107&status=done&style=none&taskId=uac80a96f-cb0b-40bb-aa1a-a75f77164d6&title=&width=854)
:::
这里涉及到一个语句的执行顺序问题，解释起来有点麻烦，这里先不急着解释<br />在后面 **语句参数——Action 参数类型** 段落里再慢慢细说


## 脚本执行者

---

想象一下，你是个魔法师，在你释放魔法的时候，那么这个魔法的释放者毫无疑问是你自己对吧<br />再换成技能类比一下，假设某个 MythicMobs 怪物释放了某种牛逼的技能，那么这个技能的释放者必然是这个怪物吧。

Kether 脚本也是类似的，运行脚本，或者说执行脚本的时候，也会有脚本执行者这个概念。<br />你可以理解为：**通常情况下，谁触发的脚本的运行，谁就是这次脚本的执行者**<br />只不过需要注意的是：脚本执行者是由插件开发者来指定的，谁触发的脚本跟他是不是脚本执行者并不一定有直接联系，但多数情况确实如此，所以你也可以这样去简单理解。

在某些特殊情况下，脚本执行者也未必一定会是玩家，也有可能会是控制台哦~<br />就好像除了玩家可以释放魔法之外，魔法也可以由某种提前布置好的陷阱来释放一样<br />玩家通过命令 `/vul eval` 执行脚本时，玩家是脚本执行者，那么控制台也可以通过命令执行脚本呐，此时毫无疑问控制台也便是脚本执行者。

现在你应该理解了什么是脚本执行者的概念了，那么接下来看个稍微复杂一点的语句


### Command 语句
「展开 / 收起详情」💠 Command 语句[引用](https://www.yuque.com/sacredcraft/kether/reference?view=doc_embed&inner=UJFJf)
> 需要注意的是，上面中括号括住的内容 `as (console|player|op)` 代表可选的意思


这个语句主要是用来执行命令的<br />众所周知，指令的执行者不是玩家就是控制台，其他情况不作讨论（命令方块等...）<br />那么文档里也提到，指令的默认执行者是玩家，就是后面 `as (console|player|op)` 这段如果不写默认以玩家为命令执行者

问题来了，服务器里玩家肯定不止一个，那默认情况下以哪个玩家为命令执行者呢？？<br />答案还是前面提到的：**脚本执行者**<br />系统会把脚本执行者强行看作玩家，然后让其执行给定的命令

那如果此时脚本执行者是控制台呢？默认情况下它还会以控制台为命令执行者吗？<br />不会！这个时候你能从控制台收到一片黄黄的警告报错~<br />并且你会在报错的第一行会看到几个很显眼的单词：`No player selected.`

如果你想让控制台来执行命令，记得 `as console` 千万不能漏掉
:::tip
>`/vul eval command "say 疯狂星期四 Vivo 50" as console`<br />[Server] **疯狂星期四 Vivo 50**<br />[Result] null
:::

需要注意的是，我上面执行的命令 `say 疯狂星期四 Vivo 50` 当中含有多处空格。<br />请一定要养成良好的习惯，若文本当中含有空格时，文本前后务必加上英文的引号 `"` 或 `'`，否则解析时会出现不可意料的问题。<br />若文本当中不含空格，如前面 `print` 和 `tell` 语句的例子，则引号可以省略。

此外还有一个小细节官方文档里没有提到：<br />如果我想在命令里使用玩家的名字做参数该怎么办？<br />答案是：`@sender`<br />语句在运行前会将命令当中的 `@sender` 替换为脚本执行者的名字

- 如果脚本执行者是玩家，那就替换为玩家的名字
- 如果脚本执行者是控制台，就替换为 `console`

同样，`print`、`tell`、`actionbar` 等语句也支持这种用法<br />如果你还在通过 `inline` + `sender` 语句来替换命令中的玩家名字，那么我建议更换为上述写法


## 语句的返回值

---

在查阅官方文档的时候会遇到不少具有返回值的语句，比如常见的有：

### Name 语句
「展开 / 收起详情」💠 Name 语句[官方文档引用 Reference](https://www.yuque.com/sacredcraft/kether/reference?view=doc_embed&inner=ZskyS)<br />这个语句的作用是返回玩家的名字/展示名/列表名<br />这里我们只取 `player name` 来讲，你可以通俗地理解为获取玩家的 ID 名字
:::tip
>`/vul eval tell player name`<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/26025412/1675439229114-317e054e-f6aa-4156-8beb-76c0ec44248b.png#averageHue=%23405227&clientId=udb2cf93c-e43a-4&from=paste&height=137&id=u22d0af3e&name=image.png&originHeight=137&originWidth=854&originalType=binary&ratio=1&rotation=0&showTitle=false&size=38330&status=done&style=none&taskId=uc51b6b0e-ba2b-4095-ae90-77a9208c8a4&title=&width=854)
:::

运行时系统会将 **脚本执行者 **强行看作玩家来获取他的名字<br />那如果脚本执行者不是玩家，是控制台呢？或者脚本执行者不存在呢？<br />那当然是直接报错啦~ 这个时候你能从控制台收到一片黄黄的警告报错~

官方文档里绝大多数与玩家相关的语句，都是通过将脚本执行者强制转换为玩家来操作的<br />因此在使用这些与玩家相关的语句时，尽量明确当前脚本的运行环境里脚本执行者是不是玩家，避免出现报错。


### Permission 语句
「展开 / 收起详情」💠 Permission 语句[官方文档引用 Reference](https://www.yuque.com/sacredcraft/kether/reference?view=doc_embed&inner=G3m75)<br />这个语句是用来判断玩家是否拥有某种权限<br />与上面的 `Name` 语句类似，也是将脚本执行者强行看作玩家来判断权限<br />因此使用之前同样需要明确脚本执行者是不是玩家

例如我想判断玩家是否拥有 `Essentials` 指令 `/hat` 的权限 `essentials.hat `<br />那么我就可以这样去写：<br />`perm essentials.hat`<br />很简单明了，也很容易上手<br />那么这个语句的返回值也很容易猜到，若玩家拥有权限就返回 `true` 否则返回 `false`


### Check 语句
「展开 / 收起详情」💠 Check 语句[官方文档引用 Reference](https://www.yuque.com/sacredcraft/kether/reference?view=doc_embed&inner=iWbHm)<br />这个语句虽然看上去很复杂，但其实也很容易理解上手<br />主要的结构是：`check {A} {判断符号} {B}`<br />根据中间不同的判断符号，来判断左右两边的 `{A}` 和 `{B}` 是否满足判断<br />满足判断则返回 `true` 反之 `false`

例如判断左右两边是否相等的判断符号是 `==`<br />那么我们就可以用它来做一些简单的例子：判断玩家名字
:::tip
>`/vul eval tell check player name == "Lanscarlos"`<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/26025412/1675439121999-6d2e5731-46e9-4a7c-bf6a-d41ac5923e39.png#averageHue=%23415327&clientId=udb2cf93c-e43a-4&from=paste&height=140&id=u36bd3f15&name=image.png&originHeight=140&originWidth=854&originalType=binary&ratio=1&rotation=0&showTitle=false&size=40318&status=done&style=none&taskId=u4638ac51-2e5a-499b-8cc1-a3523468224&title=&width=854)
:::


## 语句的参数

---

在你查阅官方文档的时候，经常会看到不少语句都带着参数

「展开 / 收起详情」💠 Sound 语句[引用](https://www.yuque.com/sacredcraft/kether/reference?view=doc_embed&inner=Ocx0U)
> 需要注意的是，上面中括号括住的内容 `by {double} {double}` 代表可选的意思

可以看到，这里 Sound 语句最多可以带三个参数<br />参数的类型是这两种：`token`、`double`


「展开 / 收起详情」💠 Title 语句[引用](https://www.yuque.com/sacredcraft/kether/reference?view=doc_embed&inner=Vvhbz)
> 同理，上面中括号括住的内容 `subtitle {action}` 和 `by {int} {int} {int}` 代表可选的意思

可以看到，这里 Title 语句最多可以带五个参数<br />参数的类型是这两种：`action`、`int`

如此看来，在官方文档里，参数大多被花括号 `{...}` 括起来<br />如：`{token}`、`{action}`、`{int}`、`{double}` 等等...

那么它们都分别代表啥意思呢？有啥区别呢？我该咋写呢？


### Token 参数类型
我们先来看 `{token}` 这个类型，它是指代一种文本类型的参数<br />系统在读取这个位置的参数时，会将其视作一段文本（字符串）读取，也就是你写了什么，系统它就读取到什么。

来看看刚才提到的 `Sound` 语句
「展开 / 收起详情」💠 Sound 语句[引用](https://www.yuque.com/sacredcraft/kether/reference?view=doc_embed&inner=Ocx0U)<br />注意看，第一个参数类型就是 `{token}`，这里要我们填入的是音效的文本ID<br />这里我们以末影人死亡的音效 `ENTITY_ENDERMAN_DEATH` 为例
:::tip
>`/vul eval sound ENTITY_ENDERMAN_DEATH`<br />[Result] kotlin1510.Unit
:::
音效自行进游戏里听啊~


### Action 参数类型
从参数的名字我们不难猜出，`Action` 一词其实就是指代 **动作**，也就是指 **Kether 语句**。

所以顾名思义，这个参数就是让我们填入 Kether 语句。还记得前面我们讲到的 **语句返回值 **吗？<br />当时讲到返回值的时候估计会有一些哥们纳闷，这返回值有啥用？现在应该就能理解了。

系统在读取 `{action}` 这个位置的参数时，会将其视作独立的语句去解析。在获取到它的返回值后，再将返回值传给前面的语句。

例如前面讲到的 `tell` 和 `name` 语句
「展开 / 收起详情」💠 Tell 语句[引用](https://www.yuque.com/sacredcraft/kether/reference?view=doc_embed&inner=Yif7z)
「展开 / 收起详情」💠 Name 语句[官方文档引用 Reference](https://www.yuque.com/sacredcraft/kether/reference?view=doc_embed&inner=ZskyS)
:::tip
>`/vul eval tell player name`<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/26025412/1675439229114-317e054e-f6aa-4156-8beb-76c0ec44248b.png#averageHue=%23405227&clientId=udb2cf93c-e43a-4&from=paste&height=137&id=pTv0e&name=image.png&originHeight=137&originWidth=854&originalType=binary&ratio=1&rotation=0&showTitle=false&size=38330&status=done&style=none&taskId=uc51b6b0e-ba2b-4095-ae90-77a9208c8a4&title=&width=854)
:::
很好理解，`tell` 语句的参数恰好是 `{action}`，它接受了 `player name` 语句的返回值后，再向控制台打印出了这个结果。


### Token 与 Action 的区别
先总结一下：<br />`{token}` 参数类型是解析文本，将文本作为参数<br />`{action}` 参数类型是解析语句，将语句的返回值作为参数

看到这里，你可能还是有点疑惑：`{token}` 跟 `{action}` 这俩玩意在实际用法上有什么差异？<br />很好，现在让我们来想象一下：<br />假设现在有一个语句长这样：`output {token}`，它的功能与 `print {action}` 完全一模一样，都是把消息打印到控制台上。唯独它俩的参数类型不一样，前者是 `{token}`，后者是 `{action}`<br />现在让这两个语句尝试去打印玩家的名字<br />`output player name`<br />`print player name`<br />结果会是怎样的呢？假如真有这样的语句并且成功运行，那么结果必然是这样：
:::tip
> `/vul eval output player name`<br />[Vulpecula] **player**<br />[Result] name

> `/vul eval print player name`<br />[Vulpecula] **Lanscarlos**<br />[Result] kotlin1510.Unit
:::
应该也不用我多说了。<br />`{token}` 解析的是文本，`{action}` 解析的是语句<br />所以 `output` 将后面的 `player` 识别成文本并直接打印到控制台了。<br />而 `print` 将后面的整个 `player name` 识别为一条完整的语句，将其返回值打印到控制台。

然后可能还有人比较好奇，`output` 把 `player` 识别为参数之后，那后面的 `name` 会怎么处理？<br />当然是被系统当做是一个新的独立语句去解析咯，如果系统里恰好有名为 `name` 的语句，那么它就会被正常解析；如果没有这样的语句，那一般会将其**隐式转换**为一段文本


### 关于隐式参数转换
还记得 `print` 语句的参数类型是什么吗？哦当然，刚刚才讲完，是 `{action}`<br />那还记得我们一开始介绍 `print` 时演示的那个示例吗？我给你复制过来了：
:::tip
>`/vul eval print 今天翻的是书`<br />[Vulpecula] **今天翻的是书**<br />[Result] kotlin1510.Unit
:::
这个时候也许会有人好奇，`print` 应该是会把后面的 `今天翻的是书` 作为语句去解析，但系统里显然不可能存在这样的语句。可为什么没有报错，还能正常运行并且输出了这段文本呢？

分析的不错，`今天翻的是书` 确实是一段文本（字符串），而且 `print` 语句也确实把后面的内容作为语句去解析了。但很显然系统里存在这种语句的概率小的可怜，为什么没有报错呢？

因为我们漏掉了一个被很多人忽略，但又无处不在的语句<br />隆重介绍：`Literal` 语句<br />[官方文档引用 Reference](https://www.yuque.com/sacredcraft/kether/reference?view=doc_embed&inner=foFTZ)<br />从文档中我们得知，这个语句的主要作用就是创建字符串，并且它支持三种写法：

1. `literal {token}`
2. `*{token}`
3. `{token}`

是的，你没有看错，其中两种写法出奇的简洁：`*{token}`、`{token}`<br />这意味着，不管你写的什么鬼它都能给你变成 `literal` 语句，而且这个语句的返回值就是这段文本。<br />神奇吧！这也解释了为什么我们刚才那个例子里 `print 今天翻的是书` 没有出现报错了。

诶不对啊，照我们这样分析下来，那岂不是我写什么最后都是 `literal` 语句了吗？那其他语句呢？<br />这就要解释一下它具体的工作流程了。

众所周知，`kether` 一般是根据空格来划分脚本的，而英文单双引号 `"` 和 `'` 的作用是让这一段文字能够被 `kether` 系统看做是一个整体，**仅仅只是将它看做一个整体**。随后系统才开始对这段文字进行解析。<br />如果系统内部能够**找得到**这段文字对应的语句，那么就会开始按照语句解析的流程一步步往下走。<br />如果系统内部**找不到**这段文字对应的语句，那么才会自动将这段文字转换为 `literal` 语句。<br />这种悄悄把 `{token}` 转成 `literal` 语句供给 `{action}` 参数的操作，是不是很像 Java 里的隐式类型转换呢？

注意哦！是“当系统找不到对应的语句时”，才会给你隐式转换成 `literal` 语句哦~

很好，那么来做两个简单的练习吧：<br />练习一：如果我以玩家身份执行命令：`/vul eval "tell" "hello"`，会发生什么？<br />（好像投票需要登录语雀？好麻烦，不过无所谓啦，不想登录可以直接不投qwq）

练习二：
「展开 / 收起详情」💠 Date Year 语句[官方文档引用 Reference](https://www.yuque.com/sacredcraft/kether/reference?view=doc_embed&inner=NmRSA)<br />已知系统中存在这样一个语句 `year`，能够获取当前的年份，详情如上<br />那么请问如果我这样写 `print "year"` 最后会在控制台打印出什么？是 `"year"` 还是 `"2022"`

哦对了，这里需要说明一下，`Literal` 语句的第三种写法 `{token}` 是较新版本 Kether 才支持的写法，如果你当前使用的插件比较旧，可能会出现报错。<br />不过问题不大，你依旧可以使用 `literal` 的另外两种写法，但不是长久之计，建议苏苏更新插件版本~


### 关于其他参数类型
前面我们介绍了 `{token}` 和 `{action}` 这两种参数类型<br />不过官方文档里给出的参数类型似乎远不止这两个，还有其他的诸如 `{int}`、`{double}`、`{symbol}` 等等类型。

不过吧，我个人认为，虽然明面上看着参数种类繁多，但其实可以归为四个种类：<br />`{token}`、`{action}`、`{action list}` 和 `{duration}`

至于刚才提到的 `{int}`、`{double}`、`{symbol}` 仔细想想其实是算作是 `{token}` 里的更细分的类型<br />`{int}` 表示整型类型参数，这里只允许填入整数。系统会读取这段文本并将其强制转换为整数。所以如果你填的不是整数，那么控制台可能会迎来红红火火的报错。<br />`{double}` 表示双精度浮点型类型参数，相当于实数。系统会读取这段文本并将其强制转换为实数。同理，填字母这些非数字肯定也是不行的。<br />`{symbol}` 则是语句 `check` 中定义的参数，本质上还是 `{token}`，系统读取文本，`check` 语句再分析里面的判断符合。

至于 `{action list}` 参数类型，我们放到下一个文章《判断语句 If & Else》里再详细讲<br />而 `{duration}` 参数类型嘛，等以后讲到 `Delay` 语句再说吧。（挖坑...）



## 关于换行和空格
有的小伙伴可能会对换行和空格这方面有疑惑，这里顺便解答一下，先说结论：
:::tip
Kether 通过 **空格** 来区分前后两个元素，双引号单引号包裹住的内容视为一个元素<br />连续多个空格会被视为一个空格，所有的换行都会被转换为一个空格
:::

Kether 在解析开始之前，会先把所有的换行符号 `\n` 全部替换成空格符号，并且多个连续的空格只会被视为一个空格。

因此，多个语句同时写在一行里跟每行一个语句是等价的
:::tip
`tell "今天读的是书" tell "明天数的是钱" tell "丈母娘喜欢有学历的女婿"`
:::
等价于
:::tip
`tell "今天读的是书"`<br />`tell "明天数的是钱"`<br />`tell "丈母娘喜欢有学历的女婿"`
:::


甚至嵌套语句也可以换行来写
:::tip
`tell color "&d今天翻的是书，明天数的是钱！"`
:::
等价于
:::tip
`tell`<br />`color "&d今天翻的是书，明天数的是钱！"`
:::

当然了，至于你自己想怎样写都是可以的，看着舒服就好



