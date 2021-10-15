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
- Brotli: WASM local decoding and AWS Lambda remote encoding 
- Redux working pretty fine with Next.js

## Notice

All relative paths in the README are calculated from `mylmoe` project root,
which is at `packages/mylmoe` from GitHub repo root.
The README is located at `packages/mylmoe/README.md` from repo root,
and soft-linked to `README.md` from repo root for better readability.

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

To change most personal config, just edit files in `config` folder

You may also want to edit files in `api` dir, which wraps HTTP API.
Replace the URLs to your own ones with you own impl.

## License

- MIT by default
- Posts in `config/pages` and `config/posts` use CC BY-NC-SA 4.0
- Images in `public/images` use All Rights Reserved by default
- Unless otherwise stated, including a `LICENSE` file in a subdirectory, a file header description, or image Exif data
