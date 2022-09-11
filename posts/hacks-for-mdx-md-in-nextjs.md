---
title: 'Hacks for MDX/Markdown in Next.js: implementation in mylmoe'
createdDate: 2022-08-28
updatedDate: 2022-09-09
abstract: The post shows some hacks used in mylmoe v0.5 to leverage MDX/Markdown for writing posts with next-mdx-remote, including custom remark plugins and webpack loaders.
tags: mdx markdown nextjs ssg edge-runtime remark-plugin remark webpack-loader webpack mylmoe
---

<!-- Copyright (C) 2022 myl7 -->
<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

## TOC

## Introduction

Next.js has already had usable MDX support.
[_Using MDX with Next.js_](https://nextjs.org/docs/advanced-features/using-mdx) in Next.js documentation and [_Markdown/MDX with Next.js_](https://nextjs.org/blog/markdown) in the Next.js blog should be enough for simple use.
If you do not want to import MDX/Markdown files as modules but rather take them as data and transform them in SSG, you can use the tool mentioned in the _Markdown/MDX with Next.js_, [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote).
Its README has a more detailed description of the implementation, advantages, and caveats.

But things get complicated when you need more customization like plugins and to work with new Next.js features like edge runtime.
The post will show some hacks used in [mylmoe](https://github.com/myl7/mylmoe) (what you are viewing) to leverage MDX/Markdown for writing posts.

## Frontmatter only

next-mdx-remote only provides a `parseFrontmatter` option in `serialize` to control whether to parse frontmatter.
If you only need frontmatter to, e.g., show post list, next-mdx-remote has no API for that.
According to its source code, [this line](https://github.com/hashicorp/next-mdx-remote/blob/b3809656ea35fb18eb2fbcf7af2e3aaeaf0e09cf/src/serialize.ts#L47) shows how it parses frontmatter.
Just use [vfile-matter](https://github.com/vfile/vfile-matter) on your own to fit your requirement.

## Raw HTML

Though MDX declares you can use raw HTML in Markdown input, setting format to `md` can not have raw HTML correctly parsed.
You can switch to MDX input to resolve it, but that may require manual changes as MDX is not a superset of Markdown.
An example is comments, which are `<!-- a -->` in Markdown but `{/* a */}` in MDX.
The workaround to use Markdown input with raw HTML is in [this discussion](https://github.com/orgs/mdx-js/discussions/2023#discussioncomment-2649772): Pass option `passThrough: nodeTypes` to rehype-raw.
You can find `nodeTypes` in [this file](https://github.com/mdx-js/mdx/blob/996771aeb5302cb9d081f38e23bd06411e6bc03e/packages/mdx/lib/node-types.js).
Since @mdx-js/mdx exports its, you can add @mdx-js/mdx as a dependency to import it or copy the definition to your code.

## Copy code block content

With the plugin rehype-highlight, code blocks are highlighted so there are `<span>` in `<pre><code>`.
This time the original code text is unavailable if you want to add a button to copy the code block content.
Do not regenerate code text from the children of `<pre><code>`.
You can create a remark plugin (also available in [this file](https://github.com/myl7/mylmoe/blob/main/utils/mdx/plugins/remarkCodeAsProp.js)):

```js
// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

// remark/rehype plugins are widely used in no-ts envs (e.g. Next.js config)
// Use js to avoid extra compilation

import { visit } from 'unist-util-visit'

export default function remarkCodeAsProp() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      const data = node.data || (node.data = {})
      const props = data.hProperties || (data.hProperties = {})
      if (props.dataCode) {
        throw new Error('hast prop data-code has been occupied')
      } else {
        props.dataCode = node.value
      }
    })
  }
}
```

To store the code text in HTML attribute `data-code` and then use it in your custom `code` component.

## Edge runtime

When using Next.js edge runtime (experimental so far), you can not use Node native modules like `fs`.
But with next-mdx-remote, you need to read the post file content from the filesystem to provide them.
Pages with only `getStaticProps` should still be fine, but API routes for things like RSS and sitemap will break.

An easy-to-think solution is to embed the post content into the server bundle.
But there will be many posts in a folder, and without other helpers, we need to import all MDX/Markdown posts manually.
To resolve it, we can create a webpack loader to import all files in a folder as a map (also available in [this file](https://github.com/myl7/mylmoe/blob/main/utils/webpack/dirLoader.js)):

```js
// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

// Webpack plugin to import all files in the dir
// Used for embedding posts to get rid of fs module

const path = require('path')
const fs = require('fs')

module.exports = function () {
  const callback = this.async()

  const options = this.getOptions()
  /** @type {(string|RegExp)[]|string|RegExp|null} */
  const include = Array.isArray(options.include) ? options.include : options.include ? [options.include] : null
  /** @type {(string|RegExp)[]|string|RegExp} */
  const exclude = Array.isArray(options.exclude) ? options.exclude : options.exclude ? [options.exclude] : []

  const dpath = path.dirname(this.resourcePath)
  fs.readdir(dpath, (err, allFnames) => {
    if (err) return callback(err)
    const fnames = allFnames.filter((fname) =>
      include ? include.some((pattern) => fname.match(pattern)) : !exclude.some((pattern) => fname.match(pattern))
    )
    // Add the folder and selected files to dependencies
    this.addContextDependency(dpath)
    fnames.forEach((fname) => this.addDependency(path.join(dpath, fname)))
    const fpaths = fnames.map((fname) => path.join(dpath, fname))
    let src = fpaths.map((fpath, i) => `import p${i} from '${fpath}';`).join('\n') + '\n'
    src += 'const map = {\n' + fnames.map((fname, i) => `  '${fname}': p${i},`).join('\n') + '\n};\n'
    src += 'export default map;'
    callback(null, src)
  })
}
```

Then add a webpack loader configuration for it (also available in [this line](https://github.com/myl7/mylmoe/blob/main/next.config.js#L82)):

```js
{
  test: /_dir\.[jt]sx?$/,
  use: { loader: path.resolve('utils/dirLoader.js'), options: { include: /\.mdx?$/ } },
  type: 'javascript/auto',
}
```

Finally, put a file named `_dir.ts` into the post folder.
Though the content of `_dir.ts` has no effect, you can still export corresponding types to mock TypeScript and IDE like (also available in [this file](https://github.com/myl7/mylmoe/blob/main/posts/_dir.ts)):

```ts
// These files named /dir\.[jt]sx?$/ will be matched and processed by dirLoader
// See dirLoader for the impl
// The content will be dropped and has no effect on build output
// However you can still export corresponding types to mock TS and IDE

const posts = {} as { [fname: string]: string }
export default posts
```

## Color mode switching for code highlighting

When using rehype-highlight to highlight code blocks, you must include highlight.js CSS to add themes manually.
Some highlight.js themes are for different color modes, and you may want to change highlight.js themes according to the color mode.

But wrapping the `<link>` component in Next.js `next/head` `<Head>` with a condition check will not work.
Moreover, Next.js will raise a warning:

```
Do not add stylesheets using next/head (see <link rel="stylesheet"> tag with href="..."). Use Document instead.
See more info here: https://nextjs.org/docs/messages/no-stylesheets-in-head-component
```

Which tells you to move the `<link>` to `Document`.
But putting it into `Document` will still not work.
Loaded CSS will not change according to the current color mode because `next/head` `<Head>` uses side effects to add tags to head and can not cancel it.
To fulfill the requirement, use the raw `<Helmet>` instead (better from `react-helmet-async` other than `react-helmet`).
An example is available in [this line](https://github.com/myl7/mylmoe/blob/main/pages/%5Bpath%5D.tsx#L39).
As for this method, I am not sure if it will work as bad as the `<Head>` warning says, but the worst case should be that only one of the themes for different color modes is loaded.
That is not perfect, but it can be recognized as an acceptable fine fallback and keep the shown content still.

## Differ inline code with code blocks

next-mdx-remote, while emitting HTML-like AST, give inline code with `<code>` only and code blocks with `<pre><code>`.
To differentiate the two situations in custom `<code>` components, you can use `React.cloneElement` to recreate children in `<pre>` to pass a particular property like `isInPre: true` to indicate to the children that they are in a `<pre>`.
An example is available in [this line](https://github.com/myl7/mylmoe/blob/main/utils/mdx/components.tsx#L119).

## Reuse Next.js `<Image>`

The idea is to lookup `/public` dir to get all pending images.
Then like what we do for edge runtime, add a custom loader to generate static image imports.

The loader is (also available in [this file](https://github.com/myl7/mylmoe/blob/main/utils/webpack/collectedImageLoader.js)):

```js
// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

// Collect all images in /public to generate static imports of them to reuse Next.js image optimization

const path = require('path')

module.exports = function () {
  const callback = this.async()

  const options = this.getOptions()
  /** @type {string[]} */
  const glob = Array.isArray(options.glob)
    ? options.glob
    : options.glob
    ? [options.glob]
    : // The default extensions are from Next.js https://github.com/vercel/next.js/blob/03eb4b1d612513506a441137a4997bd137e3b014/packages/next/build/webpack-config.ts#L406,
      // except svg is removed since svg has been changed to be loaded by @svgr/webpack
      ['**/*.{png,jpg,jpeg,gif,webp,avif,ico,bmp}']
  const include = Array.isArray(options.include) ? options.include : options.include ? [options.include] : null
  const exclude = Array.isArray(options.exclude) ? options.exclude : options.exclude ? [options.exclude] : []

  ;(async () => {
    const { globby } = await import('globby')

    const ipaths = (await Promise.all(glob.map((g) => globby(path.join(__dirname, '../../public', g)))))
      .flat()
      .map((ipath) => path.join('/', path.relative(path.join(__dirname, '../../public'), ipath)))
      .filter((ipath) =>
        include ? include.some((pattern) => ipath.match(pattern)) : !exclude.some((pattern) => ipath.match(pattern))
      )
      .sort((a, b) => a.localeCompare(b))

    this.addContextDependency(path.join(__dirname, '../../public'))
    ipaths.forEach((ipath) => this.addDependency(path.join(__dirname, '../../public', ipath)))

    let src = ''
    ipaths.forEach((ipath, i) => {
      const importPath = path.join('../public', ipath)
      src += `import i${i} from '${importPath}';\n`
    })
    src += 'export default {\n'
    ipaths.forEach((ipath, i) => {
      src += `  '${ipath}': i${i},\n`
    })
    src += '};\n'
    return src
  })()
    .then((src) => callback(null, src))
    .catch(callback)
}
```

<details>
<summary>Implementation attempt notes</summary>

The basic idea is to filter all images in the posts and generate corresponding import statements in a webpack loader, like embedding post content for edge runtime.
Then import it and use the result in next-mdx-remote `<MDXRemote>` with `scope` property.
A custom rehype plugin is required to turn `src` attribute from a literal string to a variable.

Problem 1: Using `scope` to pass variables can only work for MDX posts.
Markdown posts do not allow variables.

Fix 1: Using a React context to pass image metadata to Next.js `<Image>` component.

Problem 2: While Next.js successfully generated the image metadata, it does not copy imported images to `.next/static/media` folder, no matter the loader order.

To be more detailed, a webpack loader to generate import statements is available in [this file](https://github.com/myl7/mylmoe/blob/main/utils/webpack/collectedImageLoader.js) and a rehype plugin to collect image data is available in [this file](https://github.com/myl7/mylmoe/blob/main/utils/mdx/plugins/rehypeCollectImages.mjs).
We can get width/height from the image import correctly with them.
But since Next.js does not copy the images to the target folder and src/blurDataUrl (in development) point there, the website failed to load the pictures with 404.
It feels like that Next.js has extra operations on image imports before webpack invokes the loaders of Next.js.
Anyway, we can not modify Next.js internal logic and have to admit that this method fails.

Fix 3: Other than loaders, use webpack plugin API to generate image import statements before running.
And there is no need to re-parse MDX/Markdown posts.
On the contrary, glob the image dir to get the image list.
If we need to know which images are required by a specified post, since the image paths (relative to `/public` folder) always literally exist in the post content, use text searching to check.

Problem 4: Next.js can not still automatically move images to `.next/static/media` even when using webpack plugin API.

Fix 4: After checking, the real issue is the React context. We wrapped `src` into a context, so Next.js could not recognize the relationship and failed to ship the images.
So we ship the image metadata of all pages.
Considering we have at most 100 images, this will not increase the client bundle size too much.

</details>

## Separate components and plugins of next-mdx-remote

This is more like a caveat:
You may have heard that Next.js can strip server dependencies from the client bundle, as long as you only use them in `getStaticProps` or other data fetching hooks.
But it seems to work on the module level.
I am not so familiar with Next.js bundling methods, but at least for this situation:
If you imported a and b from one module and used a for client and b for server only, then Next.js will (happily) bundle b into the client bundle.

When it comes to next-mdx-remote, it exports `serialize` for the server and `<MDXRemote>` for the client.
If you are careful enough, you may notice that `serialize` is from `next-mdx-remote/serialize` but `<MDXRemote>` is from `next-mdx-remote`, which are different and may serve as an example.
As for your code, you may want to provide `remarkPlugins` and `rehypePlugins` for `serialize` and `components` for `<MDXRemote>`.
The point is that you need to make sure `remarkPlugins`/`rehypePlugins` and `components` are not in the same module.
Otherwise, Next.js will falsely bundle some remark/rehype plugin code into the client bundle.
An example is available in [this folder](https://github.com/myl7/mylmoe/tree/main/utils/mdx).
[An `IMPORTANT` notice about this](https://github.com/hashicorp/next-mdx-remote#:~:text=IMPORTANT%3A%20Be%20very,filing%20an%20issue.) is also available in next-mdx-remote README.
