---
title: 红米 Note 8 Pro 联发科版刷入类原生安卓系统 crDroid
pubDate: 2020-09-30
updDate: 2021-12-01
excerpt: TWRP 需要额外刷入 misc 分区。最后还是换了 MIUI。
tags: mobile-flash xiaomi android mobile mtk
---

## TOC

## 意义

> 增补于 2021-12-01

在此文发布的前几年，联发科的 SoC 一直是阻碍刷机的重要因素之一。
在高通骁龙系列表现良好的同时，联发科手机在刷机时总会遇到一些 unexpected 的状况。
而如果你在遇到这些状况时没有正确处理使其回到正轨，那往往就该救砖甚至是直接报废换机了。
此文便是针对红米 Note 8 Pro 联发科版这一特定版本，提供一个亲测可行的刷机流程，并尝试解决其中遇到的一些匪夷所思的问题。

## 解锁 Bootloader

按照小米官方指引：[申请解锁小米手机](http://www.miui.com/unlock/download.html) 即可。

记得关闭“查找我的手机”此功能，否则在绑定账号与手机这一步时，会报“绑定失败”这样不明所以的错误。

## 获取手机信息

解锁 Bootloader 后手机会清空数据，进入新的、干净的 MIUI 系统。
此时不要急着进行刷机，先获取手机的一些信息。

从 [APKMirror](https://www.apkmirror.com/) 上下载 [Treble Check](https://www.apkmirror.com/apk/kevint/treble-check/) 来查看手机的一些信息：Arch, A/B or A-only, System-as-Root 等。

同时也记录一下当前 MIUI 的 Android 版本。
我的 MIUI Android 版本为 9，因为我特地卡在了 MIUI 11。

## 刷入专版 Recovery

这一步发生的 unexpected 情况卡了我很久。

[XDA](https://www.xda-developers.com/) 有刷入 recovery 的指引，[TWRP 官网](https://twrp.me/) 也有 TWRP 的下载和处理方案，包括对于 AVB 的处理。
但使用 TWRP 官网的 image，我无论如何也无法 boot 到 recovery，处理了 AVB 也一样。
后来通过观看这个 B 站视频视频：[【教程】谁说联发科无法搞机？Redmi Note 8 Pro刷入类原生教程](https://www.bilibili.com/video/BV1n64y1u7p4)，我发现他使用了一键刷机包。
结合到报告红米 Note 8 Pro 无法刷入 recovery 的人很少，我猜测一键刷机包中带有其他文件。
尤其是这些一键刷机包还区分了 Android 9 和 10（而 TWRP 官网的下载并未区分），这就更蹊跷了。
我这部手机是 MIUI 11，Android 9，在下载下来了一份 Android 9 一键刷机包后，我发现果然其中的 bat 脚本还刷入了 misc 分区。
在增加了 misc 分区的刷入后，我就能成功进入 TWRP recovery 了。

额外地，再次测试后，我确认了，所需用的一键刷机包（应该用的 recovery 和 misc）的 Android 版本确实需和当前手机中系统的 Android 版本对应才能生效，否则无法 boot 到 recovery。

过程中具体命令如下：

```bash
# 手机重启到 fastboot，可以用 `adb reboot bootloader` 或是开机时按特殊按键实现。
# 小米手机是同时按住音量 - 键和开机键。
fastboot flash recovery twrp.img # twrp.img 使用了一键刷机包中带有的 TWRP，以求兼容性。
fastboot flash recovery misc.bin # 不知道 misc.bin 内容是什么，可能是对硬件的一些参数配置。
fastboot reboot
# 在开机中按特殊按键进入 recovery。
# 小米手机是同时按住音量 + 键和开机键。
```

现在就能进入 TWRP 进行后续流程了。

## 刷入 System

继续按照视频 [【教程】谁说联发科无法搞机？Redmi Note 8 Pro刷入类原生教程](https://www.bilibili.com/video/BV1n64y1u7p4) 的指引操作即可。

根据他所提供的兼容性清单和推荐，我也选择了 crDroid。
从 [crDroid 官网下载页](https://crdroid.net/dl.php) 下载适合 Redmi Note 8 Pro 的版本，安装即可。
这里会下载下来一个 zip 包，和视频不同。
不必在意，安装这个 zip 包即可。
安装过程会很长，手机会不断重启。
不要把这些重启当作系统安装失败，耐心等待，象征成功的欢迎界面就会出现。

## 额外的应用

如 opengapps，magisk 之类的就可以自行安装了，按照官网指引即可。
在有 TWRP 的情况下，大部分时候只需要直接卡刷（从 TWRP 中安装）即可。

## 题外话

试了一夜 crDroid 之后，我发现还是 MIUI 好用，虽然功能受限性能不佳续航雪崩，但是勉强还算得上开箱即用。
比如 crDroid 就没有开箱即用的全面屏手势，文件管理之类的应用也得自己安装。
作为日用设备，手机还是稳定省心点更好。
