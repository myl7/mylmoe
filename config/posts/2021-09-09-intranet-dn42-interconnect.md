---
title: 内网互连转发及多机接入 DN42 的配置解析
pubDate: 2021-09-09
updDate: 2021-09-09
excerpt: 指 Wireguard 如何不受 AllowIPs 限制地连接和如何把 DN42 官方的 BIRD2 配置文件改成带 iBGP、能在内网传播路由的版本，特别地 debug 了一个 BIRD IPv6 不 bind 的 BUG。
tags: vpn bgp intranet dn42 wireguard bird
---

## TOC

## 基本信息

在此文章开始处我们先明确一下作为目标的几个阶段：

1. 内网内几台机器能够互连
2. 内网内几台机器能够互连并转发发向任意目标的包
3. 内网内几台机器能够互连并自动维护到达任意目标的路由

具体而言，由于各方面优势（以及个人喜好）我选择了 Wireguard 作为 VPN 软件、选择了 BIRD2（2 指 major version，以下就直接称作 BIRD 了）作为 BGP 软件来实现以上目标

将模型简化~~受财力限制~~，我们只考虑三台机器以及连接 DN42 的硬件情况

## 内网互连

仅仅是三台机器用 Wireguard 互连是很简单的，参考官方文档就是了。
我的初版内网就是这样的，通过分配各个 peer 的 AllowIPs 生成合适的路由，将三台机器连成星形，星形中心可以连接其他的星形中心。
我之前就有[一篇文章](/posts/2020-12-26-wg-simple-intranet)讲对此的一些详细信息，虽然很简略但本来也不复杂。

## 内网转发

为了实现转发，一些 Linux 上的基本配置可以参考 [Lan Tian dalao 的 DN42 guide][lan-tian-dn42]，主要是 sysctl 的 options，in short：

```
net.ipv4.conf.default.rp_filter = 2
net.ipv4.conf.all.rp_filter = 2
net.ipv4.ip_forward = 1
net.ipv6.conf.all.forwarding = 1
net.ipv6.conf.default.forwarding = 1
```

麻烦的是 Wireguard AllowIPs 的限制，即便添加 `Table = off` 关闭了路由生成，AllowIPs 也会滤掉对应 interface 里从不满足 AllowIPs 的 IP 发来的包。
为了不滤掉这些包，需要设置 `AllowIps = 0.0.0.0/0, ::/0`。

但真正麻烦的地方就在这里，截至目前一个 Wireguard 配置文件对应的一个 type wireguard 的 interface 里，配置文件中的 AllowIps 是不允许重叠的，这个错误可以通过 `wg show` 看到。
所以当设置了 `AllowIps = 0.0.0.0/0, ::/0` 时，这个配置文件里就只有一个 peer 了，这样连接内网内另外两台机器时就需要考虑好 Listen 的端口不能重叠、interface name 要有辨识度。

在此基础上，我们加上 `Table = off` 关闭 Wireguard 自己的基于 AllowIPs 的路由生成（其实是 wg-quick 干的，wg-quick 可以配合 systemd 使用直接 `systemctl enable wg-quick@wg0` 很方便，所以我就直接用它而不必用 ip command 慢慢加了），然后通过配置中添加 PostUp 和 PostDown 使用 ip command 添加 IP 到 interface。
不使用配置中的 Address 选项是因为我们这里添加 IP 的过程与 Address 的有所不同。
我参考了前面说过的 [Lan Tian dalao 的 DN42 guide][lan-tian-dn42]，但略有不同，具体配置是：

```
[Interface]
ListenPort = ...
PrivateKey = ...
Table = off
PostUp = ip addr add <my ipv4> peer <your ipv4> dev %i
PostUp = ip addr add <my ipv6 link local> dev %i
PostUp = ip addr add <my ipv6> dev %i
PostUp = ip route add <your ipv6> src <my ipv6> dev %i
PostDown = ip route del <your ipv6> src <my ipv6> dev %i
PostUp = ip route add <your ipv6 link local> src <my ipv6> dev %i
PostDown = ip route del <your ipv6 link local> src <my ipv6> dev %i

[Peer]
PublicKey = ...
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = ...
```

具体不同之处在 IPv6 link local 给了具体的 IP，以及通过 ip route 添加了路由，尤其是后者，我不加的话就直接 Network is unreachable 了

这里解释一下 ip addr 里的处理。
IPv4 中的 `<my ipv4> peer <your ipv4>` 的配置在 iproute（就是 ip command 对应的软件的名字）的文档里有讲，在 p2p tunnel interface 上直接指定对端 IP，这样都不需要 ip route add 都能直接完成路由了。
IPv6 其实也可以用 peer，但是这里还是用更常见的方法，额外指定一个 IPv6 link local IP，然后 ip route add 添加路由让系统直到对端是可达的、只需发给这个 interface 即可。
这样 `ping6 <your ipv6>` 或者 `ping6 <your ipv6 link local>%<interface>` 就都能通了。

## 单机接入 DN42

DN42 官方给的 BIRD 配置是能用的，不过你可能会疑惑：为什么只有一份配置文件、也完全没提先内网连通然后再单点接入 DN42 的情况。
我估计是因为太麻烦了：仅靠官方的配置，再给每台机器找个 peer 就能够让每台机器接入 DN42 了。
不过这样每台机器都要有至少一个 peer，而且内网内的连通性是没有被利用的。
如果需要先内网连通，然后通过一台机器接入 DN42 完成所有机器的 DN42 接入，需要在内网内配好 iBGP。

这里岔开一下，额外讲一下 BGP 对应在 BIRD 上的情况（也是我一开始没有搞清楚的部分）：
为了让所有机器接入 DN42，你需要在**所有**机器上配好 BIRD。
即便在内网内、在同一个 AS 内，你也需要为相邻的机器间配好 BGP session，在 BIRD 里体现为内网内机器间也有一个 protocol bgp 块。

又双叒叕要拿出 [Lan Tian dalao 的 DN42 guide][lan-tian-dn42] 了，里面虽然没有细讲内网内的 BIRD 配置，但是 peer 的处理讲得很清楚了，不过 Wireguard 也得像前面那样加上 ip route。
这里面 1xRTT Peering 的概念我觉得非常好，需要推广。

按上述配置好，peer 了的那台机器就能接入 DN42 了。
可以用 burble 的两个 pingable IP address 做测试：

```bash
ping 172.20.129.5
ping6 fd42:4242:2601:ac05::1
```

接下来就要将内网内的其他机器通过这台机器接入 DN42 了

## （不 work 的）内网 iBGP

为了在内网内传播路由，需要配置好 iBGP。
这里我们终于要上手 BIRD、自己写配置了。
这里我推荐 [Soha Jin dalao 的 BIRD 和 BGP guide](https://soha.moe/post/bird-bgp-kickstart.html)，把基本的东西大体上都讲清楚了。
不过就像这篇文章里说的，读者得先知道一些 BGP 的基本知识。
完全不懂 BGP 的话可以找大学的计算机网络教科书《计算机网络：自顶向下方法》看看，这里面讲得已经比较细了（更细致的具体算法和实现虽然没细讲，不过应该也不太需要）。

这里我们以 DN42 官方给的 BIRD 配置为基础，添加上 iBGP：

首先 OWNIP 和 OWNIPv6 设为此机器的 IPv4 和 IPv6 而非随便从自己的网段里选一个

然后把 template bgp dnpeers 复制后改一下，改成：

```
template bgp myibgp {
  local as OWNAS;
  path metric 1;
  ipv4 {
    export filter { if is_valid_network() && source ~ [RTS_STATIC, RTS_BGP] then accept; else reject; };
    import limit 1000 action block;
    next hop self;
  };
  ipv6 {
    export filter { if is_valid_network_v6() && source ~ [RTS_STATIC, RTS_BGP] then accept; else reject; };
    import limit 1000 action block;
    next hop self;
  };
}
```

具体是删去 is_valid_network 即 ROA 的过滤，因为从其他 AS 传播过来、进这个 AS 时已经过滤过了；
删去 is_self_net，不然本来就在这个 AS 内，全被过滤了；
加上 `next hop self`，把自己推荐为下一跳，这样路由发给其他机器时其他机器知道可以经这台机器完成收到的路由。

然后用这个 template 生成具体配置，按惯例在 `/etc/bird/peers` 下新建配置文件写入：

```
protocol bgp <name>_v4 from myibgp {
  neighbor <your ipv4> as OWNAS;
  direct;
  ipv6 {
    import none;
    export none;
  };
}

protocol bgp <name>_v6 from myibgp {
  neighbor <your ipv6> as OWNAS;
  direct;
  ipv4 {
    import none;
    export none;
  };
}
```

这里 `<your ipv6>` 暂时可以换成 `<your ipv6 link local>%<interface>`，但后面最终 work 的配置里不行，我就直接一直用 `<your ipv6>` 算了

由于 iBGP 的要求，内网内**所有两两机器间**都需要配置这个 iBGP。
有其他的方案，不过我只有三台机器就直接两两配置算了。

这样配好后 IPv4 的 iBGP 就通了，但是 IPv6 的 iBGP 就完全没通

## Debug IPv6 iBGP

通过 `birdc show protocol` 以及 `birdc show protocol all <name>` 查看详细信息可以发现，IPv6 iBGP 处于 idle 状态，查阅 BGP state 可以得知此状态下 BGP session 压根没建立起来。

接下来为了方便区分，我们将已经接入 DN42 的机器称作 a，将 IPv6 尚未接入 DN42 的机器称作 b

首先受怀疑的是 iptables，但我仔细查看后没有发现问题。
接下来在对端上安装 nmap 直接 `nmap -6 -Pn <ipv6>` 扫一遍端口，发现 IPv6 下 b 的 port 179 不通（IPv4 下正常）。
再在 b 上 `netstat -tunlp | grep bird`，问题就很明显了：BIRD 只 bind 了 0.0.0.0:179，没有 bind :::179！
我直接震惊，这 BIRD 抽风了？bind 都没 bind？

还是得硬着头皮查下去，先是配好 log，`log "/var/log/bird/all.log" all`，然而没有任何报错。
systemd 关掉，`strace -Tfe trace=bind birdc -f`，看到 BIRD 压根没尝试 bind IPv6。
到此我就没思路了，只能 Google 和翻 BIRD mail list。

我有怀疑是 Linux IPv6 的问题，但是各种排查和尝试都显示 Linux IPv6 一切正常

然后我在 BIRD mail list 中翻到了 [Unable to get Bird 2 to listen on the BGP socket](https://marc.info/?l=bird-users&m=159908794004974&w=2)，但是没有发现有效的解决方法，除了有一位提到可以尝试 enable multihop。
我翻了一下 BIRD 文档，两机直接相连的状况下确实可以用 direct 而不用 multihop，我不觉得这是问题所在~~实际上这就是问题所在~~。

然后我翻到了[这个回答][ibgp-answer]，这里他最终解决了问题，其中一点结合前面让我很感兴趣：
除了一些其他的操作，他还关闭了 direct，之后就 work 了，他也不知道为什么要关了 direct 才 work。

我又倒过去翻了一下 BIRD 的文档，里面对于 direct 的解释是这样的：

>direct
>
> Specify that the neighbor is directly connected. The IP address of the neighbor must be from a directly reachable IP range (i.e. associated with one of your router's interfaces), **otherwise the BGP session wouldn't start but it would wait for such interface to appear**. The alternative is the multihop option. Default: enabled for eBGP.

这样就清楚了，direct 下 BIRD 不认为 neighbor 和此机器直接相连了，又没有其他 peer，所以 b 的 IPv6 iBGP 就直接 idle 了。
BIRD 不承认直接相连的原因我不太清楚，IPv4 下能 work 应该是因为 `<my ipv4> peer <your ipv4>` 很直接地表明了对端，够 direct，这样的话 IPv6 依靠 link local 和路由似乎不太能体现出 direct。

总之在 a 和 b 两台机器上删去 direct（BIRD iBGP 默认 multihop，eBGP 默认 direct），再按文档推荐的加上 source address，a 和 b 的 BGP session 就通了，不过 b 上 `ip -6 r` 列出的 IPv6 route 都是 Unreachable

这一点前面提到的[那个回答][ibgp-answer]也有解释，multihop 下 BIRD 不知道连接 neighbor 的路由，需要：

> To get this routes I've to add a static route at the static protocol block or I've to get theme dynamically with a direct protocol definition.

后者是他的最终解决方法，添加了：

```
protocol direct {
  interface "*";
}
```

我试了这方法，没 work，所以选择了前者，即在 b 的配置里找一个 protocol static，添加一行 `route <a ipv6> via <interface>` 就行了。
a 的 IPv6 route 没问题我就没改 a（理解之后也明白不需要改 a）。
这样 a 和 b 间的 IPv6 iBGP 就完全通了，burble 的两个 pingable IP address 测试也能过了。

完整的 BIRD 配置在 `bird.conf` 里相较前面给出的配置只需要按需加上 route 语句，peer 配置变为：

```
protocol bgp <name>_v4 from myibgp {
  neighbor <your ipv4> as OWNAS;
  direct;
  ipv6 {
    import none;
    export none;
  };
}

protocol bgp <name>_v6 from myibgp {
  neighbor <your ipv6> as OWNAS;
  source address <my ipv6>;
  ipv4 {
    import none;
    export none;
  };
}
```

Mission accomplished！

[lan-tian-dn42]: https://lantian.pub/article/modify-website/dn42-experimental-network-2020.lantian/#%E9%9D%9E%E5%B8%B8%E9%87%8D%E8%A6%81%E7%9A%84%E7%B3%BB%E7%BB%9F%E9%85%8D%E7%BD%AE
[ibgp-answer]: https://networkengineering.stackexchange.com/questions/25056/establish-an-ibgp-connection-using-bird
