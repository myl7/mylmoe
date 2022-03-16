# mylmoe

Static & serverless blog system based on React and Next.js with some other utilities

Used by myself on [mylmoe](https://myl.moe)

## Website: mylmoe

[mylmoe](https://myl.moe), myl7's blog with some other utilities

Also available on Telegram: Channel [@mylmoe](https://t.me/mylmoe)

## Frameworks and features

- [Next.js](https://nextjs.org/)
- UI: [Material-UI](https://material-ui.com/)
- Markdown: [remark](https://github.com/remarkjs/remark) and [rehype](https://github.com/rehypejs/rehype) of [unified](https://github.com/unifiedjs/unified)
- Comment: [Telegram discussion widget](https://core.telegram.org/widgets/discussion)
- RSS and sitemap with self-impl
- Brotli: WASM local decoding and Azure Functions remote streaming encoding
- Redux working pretty fine with Next.js

## Quick Start

```bash
# Generate some required files to `public` in advance
npm run prebuild
# Build with Next.js
npm run build
# Next.js SSG, generate static files to `out`
next export
```

To enable SSR (not only SSG), follow Next.js doc to deploy the `out` dir
e.g. using a docker image or using a static serving service supporting SSR such as Cloudflare Pages

To change most personal config, just edit files in `content` folder

You may also want to edit files in `api` dir, which wraps HTTP API.
Replace the URLs to your own ones with you own impl.

## License

Posts SPDX-License-Identifier: CC-BY-SA-4.0

Code SPDX-License-Identifier: Apache-2.0 by default, unless otherwise explicitly stated

Icons in `public` and images in `public/images` are All Rights Reserved by default (since I am not the copyright holder), unless otherwise explicitly stated

An explicit statement includes a `LICENSE` file in a subdirectory, a file header description, or image EXIF data
