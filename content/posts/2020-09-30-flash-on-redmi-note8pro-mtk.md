---
title: 红米 Note 8 Pro 联发科版刷机
pubDate: 2020-09-30
updDate: 2021-12-01
excerpt: 为了解决此版本无法 boot 到 recovery 的问题，刷入 TWRP 时除了刷入 recovery 分区镜像，还需要额外刷入 misc 分区镜像。
tags: mobile-flash xiaomi android mobile mtk
lang: zh
---

<!-- Copyright (c) 2020-2022 myl7 -->
<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

## TOC

## 意义

> 此节增补于 2021-12-01

在此文发布的前几年里，联发科的 SoC 一直是阻碍刷机的重要因素之一。
在使用高通骁龙系列 SoC 的手机刷机表现良好的同时，使用联发科 SoC 的手机在刷机过程中总会遇到一些 unexpected 的状况。
而如果你在遇到这些状况时没有正确处理使其回到正轨，那往往就该救砖甚至是直接报废换机了。

此文的动机就是希望针对红米 Note 8 Pro 联发科版这一特定版本，提供一个亲测可行的刷机流程，并尝试解释其中遇到的一些匪夷所思的问题。

一年后的当下，不知道联发科 SoC 手机的刷机体验是否已有改善……

## 解锁 Bootloader

按照小米官方指引：[申请解锁小米手机](http://www.miui.com/unlock/download.html) 操作即可。

值得一提的是记得关闭“查找我的手机”此功能，否则在绑定账号与手机这一步时，会报“绑定失败”这样不明所以、无法 debug 的错误。

## 获取手机信息

解锁 Bootloader 后手机会清空数据，进入一个新的、干净的 MIUI 系统。
此时不要急着开始刷机操作，先获取手机的一些信息。

从 [APKMirror](https://www.apkmirror.com/) 上下载 [Treble Check](https://www.apkmirror.com/apk/kevint/treble-check/) 来查看手机一些可能会用到的信息：Arch, A/B or A-only, System-as-Root 等。

同时也记录一下当前 MIUI 的 Android 版本。
这里我的 MIUI Android 版本为 9，因为我特地停留在了 MIUI 11。

## 刷入专版 Recovery

这一步发生的 unexpected 情况卡了我很久。

[XDA](https://www.xda-developers.com/) 上有刷入 recovery 的指引，[TWRP 官网](https://twrp.me/) 也有 TWRP 的下载和使用方法，包括对于 AVB 的处理等。

但使用 TWRP 官网的 image，我无论如何也无法 boot 到 recovery，处理了 AVB 也一样。

后来通过观看这个 B 站视频：[【教程】谁说联发科无法搞机？Redmi Note 8 Pro 刷入类原生教程](https://www.bilibili.com/video/BV1n64y1u7p4)，我发现他使用了一键刷机包。
结合到报告红米 Note 8 Pro 无法刷入 recovery 的人很少（准确的说，一个也没见到），我猜测一键刷机包中带有其他的、是重要成败要素的文件。
尤其是这些一键刷机包还区分了 Android 9 和 10（而 TWRP 官网的下载并未区分），这就更蹊跷了。

我这部手机是 MIUI 11，Android 9，在下载了一份 Android 9 一键刷机包来查看后，我发现果然其中的 bat 脚本还额外刷入了 misc 分区。
使用一键刷机包中的 misc 分区镜像，在增加了 misc 分区的刷入后，我就能成功进入到 TWRP recovery 了。

额外地，经测试确认，所需用的一键刷机包（应该用的 recovery 和 misc 分区镜像）的 Android 版本确实须和当前手机中系统的 Android 版本对应才能刷入并使用，否则会无法 boot 到 recovery、失败后 boot 到 system。

过程中的具体命令如下：

```bash
# 手机重启到 fastboot，可以用 `adb reboot bootloader` 或是开机时按特殊按键实现。
# 小米手机是同时按住音量 - 键和开机键。
fastboot flash recovery twrp.img # twrp.img 使用了一键刷机包中带的 TWRP，以求兼容性。
fastboot flash recovery misc.bin # 不知道 misc.bin 内容是什么，可能是对硬件的一些参数配置。
fastboot reboot
# 在开机中按特殊按键进入 recovery。
# 小米手机是同时按住音量 + 键和开机键。
```

现在就能成功进入 TWRP 进行后续流程了。

## 刷入 System

继续按照视频 [【教程】谁说联发科无法搞机？Redmi Note 8 Pro 刷入类原生教程](https://www.bilibili.com/video/BV1n64y1u7p4) 的指引操作即可。

根据他所提供的兼容性清单和推荐，我也选择了 crDroid。
从 [crDroid 官网下载页](https://crdroid.net/dl.php) 下载适合 Redmi Note 8 Pro 的版本，安装即可。

不同的是这里会下载下来一个 zip 包，不必在意，在 TWRP 中安装这个 zip 包即可。

安装过程会很长，手机会不断重启。
不要把这些重启当作系统安装失败，耐心等待，直到象征成功的欢迎界面出现。

## 额外的应用

如 opengapps，magisk 之类的应用，如有需求就可以自行安装了，按照官网指引即可。
在有 TWRP 的情况下，大部分时候只需要直接卡刷（在 TWRP 中安装）即可。

## 题外话

试了一夜 crDroid 之后，我发现还是 MIUI 方便好使，虽然功能受限性能不佳续航雪崩……，但是还是勉强算得上开箱即用。
而 crDroid 就需要额外配置来增加功能了，例如 crDroid 没有开箱即用的全面屏手势，文件管理之类的应用也得自行安装。

作为日用设备，手机还是稳定省心点比较好，我也就换回了 MIUI。
