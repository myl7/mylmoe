## 基本环境：开发版，初始设置，初始应用

首先切换到开发公测版，因为它有 root。
我可以不用，但它不能没有。

初始设置中，其余无所谓，小米云服务只同步文本文件减少流量。
后面一页各种设置中只开启位置服务，关闭其余几项。

卸载一切能卸载的应用。
删除 `/sdcard` 下一切文件/文件夹，除了 `Android` 和 `Download`。

可选地，刷入 TWRP 为 recovery。
关闭 AVB 检验，并设置防止 TWRP 被覆盖。

## 基本工具：Proxy 和 Google

Prepare <bdo dir="rtl">yar2v</bdo> apk and    url to setup proxy.

这里不能直接刷入 opengapps，至少对于 Redmi Note 8 Pro 而言会使它无法 boot。

从 APKMirror 安装：

- Google Play Services
- Google Play Store
- Google Services Framework
- Google Account Manager
- Google Contacts Sync
- Google Calendar Sync

## Island

Island 可以隔离应用。
从 Google Play 安装的和开源的 app 安装在原系统中，其余的安装在 Island 中。

## 密码填充

浏览器里靠 Chrome，其他时候靠 Keepass2Droid，并用 Nextcloud 同步，Keepass2Droid 里直接填入 Nextcloud 的 WebDAV 链接。

## 游戏加速

针对音游，屏蔽通知，更改 Telegram 里 chat 的默认 level 为非 urgent。

## 零散配置

原本想在此一一列出需要改的设置项的，但后来发现 MIUI 需要改的实在太多了。
推荐的方法是打开设置，然后 DFS 历遍来调节。
对于新安装的应用最好也这么来一下。
当然小米云服务备份下一份设置也是一个解决方案。
这里就用来记录一些不是那么好解决的问题了：

- Google Chrome 无法检测已登录的 Google 帐号：为它打开读取手机账户的权限即可。
