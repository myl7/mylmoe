---
title: 从零开始的 Ethereum 探索与火币资产转移
pubDate: 2021-10-15
updDate: 2021-10-15
excerpt: 用对个人而言更 ergonomic 的方式解释 Ethereum 的一些架构和名词，并描述我将资产从火币走 HECO chain 转移到 MetaMask 所遇到的一些坑和一些注意点。
tags: ethereum huobi heco-chain metamask blockchain digital-currency
---

<!-- Copyright (c) 2020-2022 myl7 -->
<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

## TOC

## Ethereum 基本知识

Ethereum 的[官网](https://ethereum.org)意外的全面，其上有完全称得上深入浅出的介绍性文章，能帮助初来者迅速理解 Ethereum 中的一些概念。我也是从那里开始调查的。接下来的介绍也会以其为主干，如果哪部分没讲清楚的话也就请参阅官网上的对应内容了。接下来的每一段都会把主要要介绍的名词放在段首加粗。

**EVM**：`EVM`（Ethereum virtual machine）可以理解为在 Ethereum 的 P2P 网络中，大家通过共识算法所构建起来的一个整体的、抽象的状态机。

**共识算法**：关于什么是共识算法，可以参考 PBFT（practical Byzantine fault tolerance）（[paper](http://pmg.csail.mit.edu/papers/osdi99.pdf)），其中后半部分字母 BFT 的理解可以参考 [wiki](https://en.wikipedia.org/wiki/Byzantine_fault)。总的、描述性地来说，就是在一些不能信任的机器上，保证计算出能够信任的、正确的结果。

**dapp**：在 `EVM` 上，运行着一些 app，这些 app 就是 dapp（decentralized application）。这些 app 就像普通的程序一样，提供一些功能。由于实际运行不是依赖于某一台机器、而是运行在 EVM 这么一个抽象的机器上，dapp 是 zero downtime 的，只要对应的 chain network 不停机，它也不会停。

**gas**：在 EVM 上进行像是 MOV、ADD 这样的操作（显然）是有开销的，称作 gas，就像汽车要加油一样。对于 gas 的消耗，Ethereum 在 London Upgrade（2021-08）之前和之后的行为有差距：在 London Upgrade 之前，你运行 EVM（比如做 ETH 交易就要运行 EVM）花的 gas 就是交给了矿工；而在其之后，gas 中一部分给矿工，另一部分会 burn，就是直接消耗掉了。

**gas fee**：为了运行 EVM 而花费 gas 对应的金钱开销就叫做 gas fee，和整个网络的复杂程度有关。Ethereum 已经有一定年头了，被主要使用的 Ethereum chain（chain 可以理解为就是一个网络，被称作 chain 是因为数据的链状结构）Ethereum Mainnet 已经足够复杂了，在上面做事例如交易 ETH 时 gas fee 就挺高的，后面讲从火币转出时会有实际例子。

**Web 3.0**：这里额外插一下 Web 3.0 的概念。各种直接针对 Web 3.0 的解释经常会因为太过抽象而难以理解，但结合 Ethereum 就比较直观了：世界中不再是有对应的服务平台，而是把服务部署在整个网络之上，这样在各人拥有对于某个 object 的所有权（基于密码学算法）的同时，某个人的 opt-in opt-out 不会影响整个世界。

**metaverse**：以及如果我没有理解错的话，metaverse 的概念也可以利用 Ethereum 来表述：当你加入到某个 chain 里时，你在这个 chain、这个世界里拥有了一些东西、可以进行一些行为。但同时你也可以连接到其他的 chain，不同的 chain 间似乎不同的世界一样，在互连需要额外费劲的同时，却又保证了匿名性和隐私。~~当然我个人觉得特地造个 metaverse 这词，和 AI 里特地造个 agent 一词一样，属于（在技术上）有用但没啥大用的范畴。~~

**DeFi**：还有一些名词，例如：`DeFi`（decentralized finance），字面意思，数字货币市场大了之后，大家开始期望把传统资本运作的一些部分与区块链结合后，产生出新的金融模式~~具体的没玩过，听某些人说通过合理运作可以稳赚，就像买银行股一样，不过幅度要大得多。~~

**NFT**：以及 NFT（non-fungible tokens），也是如字面意思，你可以证明只有你拥有这个 token，你拥有对于此 token 的所有权。再给 token 对应一些东西，你就唯一地拥有这些东西了，算是区块链中对于所有权的表现。

**token**：上面提到了 token，这里的 token 并不仅仅指一串符号。通过 Ethereum 一些标准的实现，支持这些标准的数字货币同样可以被看作一些 token。在相当一部分地方 token 就是指代的数字货币。

## 火币出逃遇险

经过上述的介绍之后，接下来就是实战了。

首先是从火币出逃的原因：当然并不是不信任火币，而是由于 <bdo dir="rtl">dnalniam NC</bdo> 政策的原因，对应用户肯定是要清退的，Binance 已经行动了。特定到火币上，由于从很早开始火币就不支持直接购币，而是让用户自行交易，如果真要清退的话，恐怕没法像 Binance 那样还能提现，（个人觉得）更可能是直接冻结。由于我本身不炒币，只是想保有数字货币支付能力，转移出来也就没什么可惜的了。

我选择了 MetaMask 作为钱包，新创建了一个钱包地址。接下来就是把火币上的币提取到这上面来。特别的我选择了 ETH 作为最终的储存货币，就不凑龙头 BTC 的热闹了。我在火币上把所有 USDT 换成了 ETH（其实从这里开始就已经错了，但是慢慢解释），然后查看了提币的方案。

提取的方案对于网络（也就是 chain）的选择有两个：一个是 ETH，也就是转到 Ethereum Mainnet，0.01 ETH 起步比较低，但约 100 CNY 的手续费很高，这也算是 Ethereum Mainnet 特征了，gas fee 高得不行，性能还不好（简单表现为交易生效比较慢）。各个交易所为了方便，会在有能力时自行搭建 chain，其中火币做的 HECO 和 Binance 做的 BSC 就是典型。这里的另一个选择就是 HECO，也就是走 HECO Mainnet，需要对应的钱包支持（能看到并操作你在这条 chain 上的资产）。0.05 ETH 起步相对较高（约 1000 CNY），但手续费不足 1 CNY 约等于没有，交易很方便。

MetaMask 是支持 HECO 的（需要自己添加 HECO Mainnet 这个 network），所以我就凑够了 0.05 ETH 走 HECO 把 ETH 转到 MetaMask 了（**败笔，原因见后**）。换到 MetaMask 查看时我发现了问题：MetaMask 里设置的、HECO Mainnet 里的单位是 HT，并不是 ETH，是之前疏忽了。不过打开 hecoscan 一看，ETH 作为 token 是到了我的钱包地址的，于是通过 import token 就把这些 ETH 导入了。自此我的资产就都转移到 MetaMask 了，但这只是麻烦的开始。

在玩了一下 MetaMask 后，我发现这些 ETH 没法 Send！等于说这些 ETH 根本没法用出去。HECO Mainnet 也并不像 BSC Mainnet 那样支持 Swap（token 间交换，或者说币间交换），我就找了其他的能交换 HECO chain 上的 ETH 的 dapp，至少[官网推荐](https://ethereum.org/en/dapps/?category=finance)中的 Token swaps 部分列出的 dapp 没一个支持，甚至是压根不支持 HECO Mainnet。HECO 文档有对于这个的[描述](https://docs.hecochain.com/#/hecobridge)，但是仅仅是原理，放出的地址一方面我（如前所述）转不过去，另一方面还得联系他们申请，几乎没有帮助。这就让人头大了，毕竟 1k 多也不是小数目，被某种形式地“冻结”了实在是有点心疼。

我甚至有点后悔没直接在转出时走 ETH 了，100 CNY 的手续费总比 1k 不能用好受些……中间还穿插了一些奇妙小问题，比如 MetaMask 在此 ETH 的街面上能点 Send 按钮，但是填 Amount 时会显示 No Conversion Rate Available，外加 Next 变灰无法下一步，外加 input box 在输入数字后会乱转变为其他数字。通过检索 MetaMask 文档后 No Conversion Rate Available 对应的是 gas fee 设得太低了。但实际上我根本还没到设置 gas fee 的那步，所以这错误信息实在让我匪夷所思。（后面来看其实是有道理的）

## 火币出逃解决

我首先是希望找到支持 HECO Mainnet 的 token swap dapp，在网上检索了一下，校验了权威性后又尝试了几个 dapp，倒是有支持从 ETH 转到 HECO 的，反过来的一个没有；有支持从 HECO 出发的，但只能选 HT，其他币的 token 不能进行 swap。

烦恼之中我打开了 [HECO 首页](https://www.hecochain.com/en-us/)，翻到了下方的 Dicover Apps，点进去之后一看，果然这里才是 HECO 上的 dapp 聚集的地方，尝试了这些 dapp 之后发现了当中 MakiSwap 的 bridge 可以交换 HECO 下的各种币的 token，这就能把 ETH 转成 HT 从而正常使用了，转到 BSC 或者 ETH 也是方便的了！赶紧一试，然后……发现 bridge 的转换需要 HT，而我是 0 HT。

我又想起了看到的一篇文章的描述，给出了很简单、很自然的一句话：Send HECO chain 上的 ETH 时，需要 HT 作为 gas fee。我顿时明白为什么无法用 MetaMask 转账了，因为对于 HT = 0 的我来书，gas fee 只能限制为 0，不能满足，所以显示 No Conversion Rate Available。那现在为了让这些 ETH 能活动，就需要搞点 HT 给 MakiSwap bridge 用了。

上火币，查看 HT 从 HECO 转出的需求，至少 2HT（几十块，很低），和 ETH 走 HECO 转出差不多的、几乎没有的手续费。那问题到此就结束了，只需要转出点 HT，用这些 HT 将之前的 ETH 也转为 HT（最低只花 0.5%），再在需要时把 HT 转成 BSC 或者 ETH（这其实是有 dapp 做的、是方便的）就行了。其实最开始只需要转成 HT 再提币到 MetaMask 就能方便地使用 HECO 上的 HT 了，一个败笔操作麻烦到了现在……

千言万语汇作 TL;DR：**火币里换成 HT 再走 HECO 提币**

另：笔者的数字货币实战经历真就只有不到一周，如有内容错误敬请在评论（Telegram discussion Widget 好！）中指出，感激不尽！
