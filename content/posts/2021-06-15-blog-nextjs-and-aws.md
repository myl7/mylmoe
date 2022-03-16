---
title: 关于我把 blog 迁移到 Next.js 并上了一下 AWS 这件事
pubDate: 2021-06-15
updDate: 2021-06-15
excerpt: 最近把 blog 从 Gatsby 换到 Next.js 了，并迁移了部分功能到 AWS Lambda 和 S3 上。这是我在此过程中的一些经历、体验和思考。
tags: blog nextjs frontend serverless
---

<!-- Copyright (c) 2020-2022 myl7 -->
<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

## TOC

## 起因

三大前端框架 Vue、React、Angular，我只有 React 能使得得心应手。
我看到过这样一个对 React 的评价：学会后是不需要文档的。
React 的 API 称得上精炼：JSX、Hook、再加点和 DOM 交互的实践、再配合一个足够强大的 UI 库（例如 Material-UI）就基本足够写出一个称得上工程级别的前端项目了。

相比之下，对于 Vue，虽然我有兴趣，但是一直不太能看得进它的官方文档。
虽然这份文档被人广为称赞，但是我由于个人原因有些地方不太接受：
例如开头它就表示自己是一个渐进式前端框架，可以直接加个 `<script>` 就开写——我觉得最后还是得在 npm 里干事，不妨直接讲 `*.vue` 文件的组织和使用吧，实际一些。
另外 Vue 也有好几套 API，喜欢的人会说这是灵活的体现，你想用哪套就用哪套——我是那种写得了 Java 和 Rust 的人，其实不在乎限制多一些，但确实希望能看到 Best Practice，那份感情就像我想看到《Effective C++》一样。
几套 API 给了我选择困难症的感觉。
我还看见过有人称赞 Vue 能像以前的前端那样分离 HTML 和 CSS，比较有传统气息，方便过渡——我个人是这几年才接触前端的，自然希望学到最新的东西，更何况我个人也相当喜欢 All-in-JS，觉得在 JS 里很灵活，能轻松实现很多功能。
HTML 变成了 JSX，而 CSS 我就不太想深究了，搞清楚几个 `display` 是怎么排版的就差不多了。
我一般会在用 React 时加上 Material-UI，CSS 也就靠 Material-UI 里的 inline style 和 `useStyles` 外加 theme，也还挺行的。
不过话归如此，Vue 3 出来了的当下我应该还是会在某一天找时间再学学 Vue 吧。
Angular 就完全没有接触过了，国内也不太有 Angular 的环境。

有点偏题了。
总之我就用 React 写了自己 blog，代码在 [myl7/mylmoe](https://github.com/myl7/mylmoe)。
开始时用的 Vanilla React，也就是单纯的 React，结果 JS 文件近 1MB，优化后也慢得不行，配合 Cloudflare 打开首页要近 10s，这基本是不行的。
由于 React 官方推荐的 SSR 框架是 Gatsby，我就接着用 Gatsby 重写了一遍。
Gatsby 的槽点实际体会后实在是蛮多的，例如 `gatsby-node.js`、`gatsby-ssr.js`、`gatsby-config.js`、`gatsby-browser.js` 一堆配置文件，外加这些文件里一堆 API，让人眼花缭乱。
GraphQL 看起来高端，但是一小博客实在是不需要那么高端的东西，更何况 JSON 和 GraphQL 这样的中间部分终归是不如直接 JS 来得灵活，它们带来的解耦也在不大的项目里表现得不太出彩。
除此之外还有一些令人无语的功能缺失，例如由于 Gatsby 里对 GraphQL 的限制（不允许 optional field），导致 Markdown 的 frontmatter schema 必须一样，否则需要自己额外处理，非常麻烦。
另外还有：由于数据集中存储、用 GraphQL 取用，所以完全不知道数据有哪些，得在 GraphQL debug page 里自行查看，虽然方便了一些统计性的工作（例如 sitemap、RSS 的生成），但常规取用不明确，WebStorm 也没法对 GraphQL query 出的数据作类型推断。

不过这不是我弃用 Gatsby 的最终理由。
最终理由是，几个星期前我突然想改自己的 blog，结果忘了 API，一查发现 Gatsby 滚 major 版本号了。
我自然要用最新版，毕竟自己的 OS 都是 Arch Linux。
结果没想到跟着一滚，除了官方的插件外，其他的社区插件炸了一堆，还有好一些是承载重要功能的。
一起炸的还有 npm 的版本管理，`npm audit fix` 报了一堆 BUG 后还没法自动修复，因为分析出来的修复方法是把 Gatsby 的一个核心插件回退到老版本。
这还不是刚变更 major 版本号的时间节点，实际上距离更新已经有相当一段时间了，可见社区中相当一部分是没有跟上的。
恰好又在几天前，我和一位同学闲聊时谈到了 React SSR，他向我强烈推荐 Next.js，并批判 Gatsby 搞得太复杂了。
最终我还是决定趁这机会直接换到 Next.js 了，来体验一下 React SSR 框架的另一极。
弃用的 Vanilla React 和 Gatsby 实现就移到 `vanilla-react` 和 `gatsby` 分支上去了。

## 上 Next.js

换 Next.js 的过程并不麻烦，之前已经尽可能地分离出 components 了，所以主要工作是把 GraphQL 删掉，然后换成直接 import config。
换的过程中顺带解决了一些问题：

我之前其实没搞对 SSR 是什么。以下几个概念是同级的：

- SSG：Static site generation，导出 HTML、CSS、JS、JSON，直接用 nginx 就能 serve
- SSR: Server-side rendering，除了普通的 static files，还会有 runtime，需要用支持对应 runtime 的工具来 serve，例如自带的 `next run start`，能防止 SSG 生成海量的 static files 浪费空间
- CSR: Client-side rendering，这就没啥迷惑的了，就是发一干瘦的 HTML 和一堆 JS、JSON 经客户端运行来完成渲染。

当中自然是 SSG 比较好。
SSR 和 SSG 都能解决 SEO 问题，但 SSR 的自行部署还是麻烦了，而且没有 SSR 的必要，一 blog 也就 SSG 够了

但新的问题就出现了，我还用了 redux 来存储主题暗色与否，redux 在 SSR 时应该怎么处理呢？
直接 wrap `<Provider store={store}>` 的话是不行的，得分离开 SSR 中的 redux 和 Browser 中的 redux。
对于这个问题，经调研后我决定还是用库了。
[kirill-konshin/next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper) 的教程里描述了究竟该怎么处理 redux，与 Next.js [官方 exmaples](https://github.com/vercel/next.js/tree/canary/examples/with-redux) 的处理方法是一致的。

再有一个就是重构了 `Link` component。
原先是总是 wrap 一个 `Link` 来实现跳转，现在对于无需 link style 的地方改用 `window.location.assign` 和 `router.push` 作为 `onClick` 事件，从而解决了一些很迷惑的问题，例如点了一个含 `Link` 的 `Button`，结果半天不跳转。

Next.js 的 API 有 React 的味道，很精炼很基本，使用起来很直观。
就是 `_app.js` 和 `_document.js` 还不支持 data fetching API，缺了点功能，但问题不大。

但之后迎来了一个大问题：不像 Gatsby 有成套的 Markdown 处理插件，Next.js 的 Markdown 得自己处理。

## 上 unified

我最终在 `remark` 和 `marked` 中选择了 `remark` 作为 Markdown 解析器。
由于我希望 Markdown 的解析在 SSG 时就完成，而 SSG API 传给 React component 的 props 必须是 serializable 的，所以 `remark` 得把 Markdown 转成 HTML 再嵌到页面中，而不能直接生成 JSX。

此时我注意到 `remark` 在是 `unified` 框架的一员，我就查阅了一下 `unified` 整个生态圈。
这里面插件工具链齐全，方便了我自写插件处理 Markdown 或者生成的 HTML，让人体验良好。
基于 `unified` 这套框架，我实现了 Markdown post 到 HTML fragment 的转换。
这里我自己做的处理插件暂时就两个：

- 为 `<a>` 添加 Material-Ui 对应的 classes，从而统一连接样式
- 处理 `<img>` 的属性，实现 src 转换和 responsive image（靠 `<picture>` 和 `<source>`），设置长宽减少 Cumulative Layout Shift（这是 Google SEO 的一个明确的重要指标）

另外一个比较 hacky 的用法，用 `ReactDOM.renderToString` 获得 React component 的 HTML，然后用 `unified` 的一套工具链解析后插入到 AST 某处，这样就能方便地引用 UI 库的样式。

处理好了 post 的显示后，我还要迁移一个实用工具，Brotli 在线编解码。
这个 Brotli 工具的解码靠的是我自己写的一个 WASM 库，简单包装了一下 Rust 里的一个 Cloudflare 写并用的 `brotli-decompressor` crate，但细调参数后可以把库大小压到 300KB，就有了实用价值。

结果装上后发现 Next.js 总是加载不了，一番折腾后打开 Webpack 5 的 `syncWebAssembly: true` 就行了，因为 `wasm-pack` 生成的 JS 还是 static import WASM 的。这应该只能等 `wasm-pack` 更新了。

解码解决了，就该解决编码了。原先我编码用的是 Azure Functions，但现在订阅已经过期。
外加 Azure 的控制面板实在是慢（Office Web Apps 也是慢，我也不知道为什么微软的东西都这么慢）（不过 Azure 的各个配置都挺好用的，解释明确文档充足选项下有说明），我就决定直接换到 AWS 了，正好充分利用首年的优惠。

## 上 AWS

Brotli 编码我选择了 Python，因为 Python 是官方支持（Brotli 的源码在 google/brotli，是 Google 搞的一个更强的压缩标准，Clouflare 就有支持）。
AWS Lambda 不允许安装依赖，而是要求把依赖一起打包上传，但也算常见的做法。
搞了几下就搞好了。

实现了 Brotli 编码的 Lambda 后，我开始着手另一个 Lambda，实现 image resizing 并转换为 WebP，用于提供 responsive image 给不同大小的屏幕。
自此开始，我就遇到了麻烦透顶的一堆问题：

- 方案 1：Python Pillow
  - 一个约 1.5MB 的图片耗时 3s，太慢了
- 方案 2：Python OpenCV
  - 竟然和方案 1 时间相近，太慢了
- 方案 3：Go [h2non/bimg](https://github.com/h2non/bimg)
  - 需要自行安装 libvips
  - 有已编译好的 [stechstudio/libvips-lambda](https://github.com/stechstudio/libvips-lambda)，但很久没更了（2018 起），外加 AWS Lambda 报错 Glib2 和另一个库找不到。用他的自行编译脚本编译失败。
  - 自行编译 libvips，结果 `./configure` 自动搜索 optional dependencies，手动 disable 要加一堆选项，外加我不熟 autoconf
  - 在 Docker image lambci/lambda 中 build libvips，`./configure` 报错要求 Glib2 >= 2.40，而环境里最新只有 Glib2 2.36

到此我就放弃了。其实可以自己 build 一个 Docker image，然后让 AWS Lambda 跑 Docker image，但这样收费就不一样了。
最终我还是放弃了这个想法，直接在本地 resize 出不同尺寸的 WebP image 一起传到 S3 serve publicly。

除此之外 AWS 还有很坑的一点，在 Lambda 处创建触发器并创建 API Gateway 的话，会默认创建一个 `default` 阶段，让 URL 变长，属实没必要，用默认的 `$default` 即可。而且还会创建一个路由 `/` 并绑定一个集成，这个集成和路由会显示“由 API Gateway”并且无法删除，非常烦。建议的做法是创建好 Lambda 后，直接在 API Gateway 面板处创建 API Gateway，然后新建路由，再为此路由创建集成，将此集成指向对应的 Lambda，这样上述问题都不会发生，也会在 Lambda 的触发器处正常显示一个触发器。如果你发现明明 App Gateway 有对应路由，但是 Lambda 根本不被调用，就可以检查一下此 Lambda 的触发器，看触发器是否还有效。

再除此之外还有些 S3 的小问题。S3 是可以设自定义域的，只要 CNAME 到对应域名，并保证**自定义域与 Bucket 同名**即可。以及 S3 设为公开后是没有公开的，要设置 ACL 或者 Bucket 策略。

最后似乎还是变成了碎碎念形式的文章，不过这大概也算是我的本愿吧。
