---
title: “个人桌面美化配置分享项目”投稿
pubDate: 2021-12-01
updDate: 2021-12-01
abstract: 我的 Linux 桌面解决方案，投稿到 ustclug/Open-Source-Desktop-Show 个人桌面美化配置分享项目。
tags: linux-desktop gnome-extension linux gnome wayland font
lang: zh-hans
---

<!-- Copyright (C) 2021, 2022 myl7 -->
<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

## TOC

## 缘由

[USTCLUG](https://lug.ustc.edu.cn/) 的[个人桌面美化配置分享项目](https://github.com/ustclug/Open-Source-Desktop-Show)久经筹备终于正式开始了。
我也来参与一下，展示一下我的基于 Gnome on Wayland 的 Linux desktop solution。

## 前言

TL;DR：[最终效果展示](#最终效果展示)

由于本人使用的是 Arch Linux，下文的包管理器会使用 pacman。
如果你希望在 Ubuntu 等 Debian 系 Linux distro 上使用类似方案，需要安装的包则需你自行查找了。
不必担心，配置的大头在 Gnome extensions 上，这部分是 distro 无关的。

这里不会介绍我的 shell 配置。
如果你对此感兴趣的话，可以在 [myl7/config](https://github.com/myl7/config) repo 里获得我的 shell 配置文件。
一句话概括的话，我的 shell 是 zsh without oh-my-zsh + theme powerlevel10K + zsh plugins in pacman。

## 提交要求

> 提交内容
>
> 提交的配置方案应当包含如下具体内容：
>
> - 缩略图
> - 类型：
>   - 教程：应附带文字说明，阐述配置过程，列出所用软件，并附带高清图
>   - 展示：应有一张或多张高清图，图片内容包含壁纸，终端，窗口和 dock 等，可以附带文字说明
> - 环境：
>   - linux 内核版本/其他开源系统
>   - 发行版本
>   - 窗口系统
>   - 桌面环境
>   - 运行时内存/cpu 占用（optional）
> - 桌面截图
> - 配置的文字说明
> - 链接（配置文件，相关参考）

## 基本部件

Linux kernel version：5.15.5-arch1-1，不过不一样也应该没有影响

OS：Arch Linux，应该只会在包管理器上有差异

对于 DE（desktop environment），我选择了 Gnome

Pros：

- 比较 modern，有些新的地方会很舒适
- 手势、动画不错，流畅而不拖沓
- 没有桌面文件夹的概念，桌面上不会显示可点击项~~可以挂美图作壁纸看个够~~，对于个人而言是优点

Cons：

- 由于太过激进，有些功能是缺失的，需要用插件来补齐，比如**托盘图标**
  - 由于是插件支持而非桌面系统支持，会存在一些难受的地方无法调和
- 资源占用似乎不小，老电脑需要测试测试再换

对于 display server，我选择了 Wayland

Pros：

- **注重隐私**
- 比较 modern，虽然我并没有用它的 modern feature，但是相比于 Xorg，他还是称得上 in active development 的
- 似乎 Gnome 触摸板手势需要它才能使用，反正 Gnome on Xorg 的触摸屏手势是不能开箱即用的

Cons：

- 由于太注重隐私，一些常见操作会无法完成
  - **拖拽文件到浏览器会经常失败，例如拖拽文件到 Gmail 里上传**
  - **无法使用三方软件录屏，比如 OBS 就不行，即便是录窗口也只有特定软件的窗口才行**
  - **主流会议软件无法分享屏幕，包括 Zoom、Teams、腾讯会议等**

由于 Cons 太致命，Wayland 在日常使用的同时，我还备有 Gnome on Xorg，需要时 logout 切换即可。

BTW，Linux 下主流会议软件除了 Zoom 都有收音问题，似乎是麦克风录入了电脑风扇的声音，软件没有进行处理以排除此部分杂音。
可以靠外接麦克风解决。

对于以上两者的安装，参考 ArchWiki 对应页即可。
其中对于 Gnome 而言，安装 `gnome` group 即可。
`gnome-extra` group 不必全部安装，但其中有些重要软件可能会很有用。
对于我而言，我在 `gnome-extra` group 中安装了且认为比较重要的有：

- gnome-tweaks 改 Gnome advanced 配置，我认为应该归到 `gnome` group 级别的重要的软件，必装
- dconf-editor：方便改 Gnome 配置文件，后面关 notification sound 要用
- gnome-documents：开 PDF
- gnome-sound-recorder：录音

## 资源占用

`gnome-shell`（虽然叫 shell，但其实是 DE 的 core 部分）process 占用 mem 400——450MB，占用 single cpu 10——20%。
作为参考，这台电脑对应的硬件配置为：mem 16GB，CPU R7-5800H 8C16T，GPU AMD Renoir 核显。

## Gnome 配置

完整的 Gnome 配置文件可以用 `dconf dump / > dconf-settings.ini` 来导出。
但导出的文件很长且难以进行解释，这里还是用 GUI Panel 来讲解配置过程。

### Settings

第一个处理的是 Settings 这个配置处，搜索软件名就能在 Gnome 中打开它。

以下是各个 tab 的配置方案：

- Wi-Fi 不管
- Network 不管，Network Proxy 处会记住选 Manual 时的配置，想的话可以先配好
- Bluetooth 不管
  - BTW，最新的 Linux 内核似乎一直在蓝牙上有问题（据身边人的反馈），有需要的话可以降级内核或者先忍忍，还没到完全不能用的程度
- Notifications 不管，想要设置 per-app policy 可以在这里配置
- Search、Multitasking 不管
- Applications 不管，这里也可以配置一些 per-app policy
- Privacy，Screen Lock 里可以改自动锁屏的配置，不过直接在 Power 里改更方便，也不清楚这俩是不是独立的
- Online Accounts 不管，要登来同步可以登，但是需要保证同步的网络状况
- Sharing 不管，需要 share 时再来
- Sound 不管，需要调麦克风和扬声器时再来
- Power 可以改电源方案，更重要的是可以改睡眠和休眠（指 suspend 和 hibernate）时间等
  - BTW，Linux 下 Hibernate 不是开箱即用，要启用 Hibernate 需要动 systemd 配置，可以参考 ArchWiki 进行配置
- Display
  - 注意 Scale 缩放率。Gnome 目前不提供分数缩放（非整数倍率缩放）。似乎有 workaround 强制启用分数缩放但效果很差，不必尝试。我的屏幕是 2880x1800，选择 200% 缩放的话尽管 UI 偏大但还能够接受。最佳选择就要按你的屏幕的实际情况定了。
- Mouse & Touchpad 按个人习惯调节即可。刚装 Linux 如果无法使用触摸板的话可以先来这里看看 Touchpad 启用没有。
- Keyboard 应该不用改
- Printers、Removable Media、Color 不管
- Region & Language 可以改语言和格式显示，想要英文系统中文格式的话可以改这里
- Accessibility 如果你需要就改这里
- Users 不管
- Default Applications 可以改默认应用，但是你在 Files 里双击文件启动时调用的应用并不会用这里的配置，所以这里意义不大
- Date & Time 日期时间时区，以及 24 小时制
- About 可以看一部分电脑配置

特别的，我为了关闭通知声音，还参考[这个回答](https://unix.stackexchange.com/questions/444681/how-to-turn-off-alert-sounds-sound-effects-on-gnome-from-terminal)用 dconf-editor 如下改了配置：

```bash
dconf write /org/gnome/desktop/sound/event-sounds "false"
```

### Tweaks

`gnome-tweaks` 提供了非常多有意义的 advanced 配置项，其意义甚至可能高过 Settings

以下还是历遍各个 tab 的配置方案：

- General
  - Suspend when laptop lid is closed 开启后笔记本可以合盖自动睡眠（指 suspend）
  - Over-Amplification 允许声音超过 100%，虽说有品质损失但是其实还好
- Appearance
  - 可以改主题，我只将 Applications 项改为了 **Adwaita-dark** 主题
  - 壁纸也可以在这里改，不过之后我会用一个插件来自动改壁纸
- Fonts
  - Monospace Text 我选择了 DM Mono，这是我目前最喜欢的 monospace，目前这个博客的 monospace 也是用的这个字体
  - Antialiasing 选 Standard (grayscale)。要知道这是什么意思以及为什么可以参考这篇文章：[Text Rendering Hates You](https://gankra.github.io/blah/text-hates-you/)，体会 text rendering 的辛酸历程。
- Keyboard & Mouse 按需求即可
- Startup Applications 可以配开机启动的**桌面应用**，而不必自己写脚本或是动 systemd 配置，按需添加即可
- Top Bar
  - Battery Percentage 电池显示数字百分比，开启后可以方便准确地获知电池剩余量
  - Seconds 开启后时间显示秒，方便简单的计时
- Window Titlebars
  - 可以关掉窗口最大化/最小化的按钮，以后直接用 Win + Up/Down 来最大化/最小化
- Windows
  - 窗口自动磁吸贴边我一直不喜欢，不方便用鼠标把窗口拖来拖去，所以关闭了 Edge Tiling，需要时用 Win + Left/Right 可以实现左/右贴边
- Workspaces 不管

## Gnome 插件配置

Gnome 里所以已安装的插件可以在在 Extensions 应用中查看和配置。
要搜索和安装新的插件则需要在浏览器中于 https://extensions.gnome.org 网站下，配合浏览器插件和本地一个 package 来实现。
具体的插件安装方案还是敬请参考 ArchWiki 里的详细描述。

以下是我安装并启用了的插件及其配置，大部分都是排名前列的、比较热门的插件：

**AltTab Mod by Leleat**

> Alt/Super+Tab can also be navigated with WASD and hjkl. Q just closes the selected item and only the first window will be raised on app activation. Optionally, only show windows from the current workspace or monitor and remove the slight popup delay.

**BackSlide by p91paul**

> Automatic background-image (wallpaper) slideshow for Gnome Shell

自动切换壁纸，有托盘图标可以对切换做参数配置，备选壁纸可以自行指定

**Bluetooth Quick Connect by bjarosze**

> Allow to connect to paired devices from gnome control panel.

**Clipboard Indicator by Tudmotu**

> Clipboard Manager extension for Gnome-Shell - Adds a clipboard indicator to the top panel, and caches clipboard history.

剪贴板历史，太好用了导致现在已经离不开它了。
History Size 调大就是了，我是 200 条。
Max cache file size (kb) 也要调大，我是 16384（= 16MB）。

**Color Picker by grroot**

> Simple color picker for gnome shell

由于 Wayland 的隐私保护，gpick 这样的三方取色软件是无法取色的，而这个插件可以弥补这一功能缺失

**Disconnect Wifi by kgshank**

> Adds a Disconnect option for Wifi in status menu, when a network is connected. Shows a Reconnect option, after network is disconnected.

**Espresso by tharbold**

> Set conditions to disable the screensaver and auto suspend. Espresso is a fork of the Caffeine extension, and Espresso only supports Gnome 40 and Gnome 41. Please leave feedback or report issues through the Extension Homepage

方便电脑挂机

**GSConnect by dlandau**

> GSConnect is a complete implementation of KDE Connect especially for GNOME Shell with Nautilus, Chrome and Firefox integration. It does not rely on the KDE Connect desktop application and will not work with it installed.

其实没用过，直接插 USB 线也不算麻烦

**Hide Activities Button by zeten30**

> Hides the Activities button from the status bar (the hot corner and keyboard shortcut keeps working). To disable top left hot corner use 'No Topleft Hot Corner' extension — https://extensions.gnome.org/extension/118/no-topleft-hot-corner/ .

**Just Perfection by JustPerfection**

> Tweak Tool to Customize GNOME Shell and Disable UI Elements

**Mpris Indicator Button by JasonLG1979**

> A full featured MPRIS indicator.

**No overview at start-up by fthx**

> No overview at start-up. For GNOME Shell 40+.

似乎没用，刚开机时还是会进入按 Win 键会进入的窗口预览界面，说到底不确定这个插件到底是不是针对的这个 feature

**Proxy Switcher by flannable**

> Switches between the system proxy settings profiles defined in Network Settings.

**Refresh Wifi Connections by kgshank**

> This extension adds a refresh button to the Wi-Fi connection selection dialog to manually request for a network scan.

**Removable Drive Menu by fmuellner**

> A status menu for accessing and unmounting removable devices.

**Remove Alt+Tab Delay v2 by bjoerndaase**

> Another extension that removes the 0.15 second popup delay in switcher pop-ups. This extension is actively maintained. It fixes at least this known issue: https://gitlab.gnome.org/GNOME/mutter/issues/888.

**Screenshot Locations by TimurKiyivinski (outdated)**

> Change the default GNOME screenshot directory

**Sound Input & Output Device Chooser by kgshank**

> Shows a list of sound output and input devices (similar to gnome sound settings) in the status menu below the volume slider. Various active ports like HDMI , Speakers etc. of the same device are also displayed for selection. V20+ needs python as dependency. If you want to continue with the old method without Python, use options to switch off New Port identification. But it works with only English

**System Action - Hibernate by TimurKiyivinski (outdated)**

> A GNOME extension that adds the option to hibernate amongst other system actions

**Tray Icons: Reloaded by MartinPL**

> Tray Icons Reloaded is a GNOME Shell extension which bring back Tray Icons to top panel, with additional features.

托盘图标框架，个人认为本来应该 Gnome 自带的功能

**Vitals by corecoding**

> A glimpse into your computer's temperature, voltage, fan speed, memory usage, processor load, system resources, network speed and storage stats. This is a one stop shop to monitor all of your vital sensors. Uses asynchronous polling to provide a smooth user experience. Feature requests or bugs? Please use GitHub.

可以实时显示当前资源占用，支持的资源项也比较多

Sensors 可以按需启动，我是除了 Battery（可以直接看右上角电池百分比）其余都启用。
如果都启用的话，将 Position in panel 设为 Left 才能够始终完整地显示所有信息，而不会挤压其他按钮。

**Window Is Ready - Notification Remover by nunofarruca**

> Removes window is ready Notification

移除 Gnome “Window is ready” 这种意义不明的通知，减少专注力损失

## 最终效果展示

整体效果：

![general](../public/images/open-source-desktop-show/general.png)

空置效果：

![empty](../public/images/open-source-desktop-show/empty.png)

系统性能数据界面：

![statistics](../public/images/open-source-desktop-show/statistics.png)

日期时间界面：

![datetime](../public/images/open-source-desktop-show/datetime.png)

壁纸自动切换界面：

![wallpaper switcher](../public/images/open-source-desktop-show/wallpaper_switcher.png)

历史剪切板界面：

![clipboard history](../public/images/open-source-desktop-show/clipboard_history.png)

被收纳的操作的界面：

![more actions](../public/images/open-source-desktop-show/actions.png)
