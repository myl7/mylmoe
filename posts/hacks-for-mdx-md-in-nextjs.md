---
title: 'Hacks for MDX/Markdown in Next.js: implementation in mylmoe'
createdDate: 2022-08-28
updatedDate: 2022-08-31
abstract: The post shows some hacks used in mylmoe v0.5 to leverage MDX/Markdown for writing posts with next-mdx-remote, including custom remark plugins and webpack loaders.
tags: mdx markdown nextjs ssg edge-runtime remark-plugin remark webpack-loader webpack mylmoe
---

<!-- Copyright (C) 2022 myl7 -->
<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

## TOC

## Introduction

Next.js has already have great MDX support.
[_Using MDX with Next.js_](https://nextjs.org/docs/advanced-features/using-mdx) in Next.js documentation and [_Markdown/MDX with Next.js_](https://nextjs.org/blog/markdown) in Next.js blog should be enough for simple use.
If you do not want to import MDX/Markdown files as modules, but rather take them as data and transform them in SSG, you can use the tool mentioned in the _Markdown/MDX with Next.js_, [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote).
Its README has more detailed description about the implementation, advantages, and caveats.

But things get complicated when you need more customization like plugins, and to work with new Next.js features like edge runtime.
The post will show some hacks used in [mylmoe](https://github.com/myl7/mylmoe) (which is what you are viewing) to leverage MDX/Markdown for writing posts.

## Frontmatter only

next-mdx-remote only provides a `parseFrontmatter` option in `serialize` to control whether to parse frontmatter.
If you only need frontmatter to e.g. show post list, next-mdx-remote has no API for that.
Refer to its source code, [this line](https://github.com/hashicorp/next-mdx-remote/blob/b3809656ea35fb18eb2fbcf7af2e3aaeaf0e09cf/src/serialize.ts#L47) shows how does it parse frontmatter.
Just use [vfile-matter](https://github.com/vfile/vfile-matter) on your own to fit your requirement.

## Raw HTML

Though MDX declares you can use raw HTML in Markdown input, setting format to `md` can not have raw HTML properly parsed.
You can just switch to MDX input to resolve it, but that may require some manual changes as MDX is not a superset of Markdown.
An example is comments, which are `<!-- a -->` in Markdown but `{/* a */}` in MDX.
To use Markdown input with raw HTML, the workaround is in [this discussion](https://github.com/orgs/mdx-js/discussions/2023#discussioncomment-2649772), which is to pass option `passThrough: nodeTypes` to rehype-raw.
`nodeTypes` can be found in [this file](https://github.com/mdx-js/mdx/blob/996771aeb5302cb9d081f38e23bd06411e6bc03e/packages/mdx/lib/node-types.js).
Since it is exported, you can either add @mdx-js/mdx as a dependency to import it or copy the definition to your code.

## Copy code block content

With plugin rehype-highlight, code blocks are highlighted so there are `<span>` in `<pre><code>`.
If you want to add a button to copy the code block content, the original code text is unavailable.
Do not regenerate code text from the children of `<pre><code>`.
You can create a remark plugin (also available in [this file](https://github.com/myl7/mylmoe/blob/42013f4f7aa60fc9581d6fbe4c116af0976dd938/utils/remarkCodeAsProp.js)):

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

To store the code text in HTML attribute `data-code`, and then use it in your custom `code` component.

## Edge runtime

When you are using Next.js edge runtime (experimental so far), you can not use Node native modules like `fs`.
But with next-mdx-remote, you need to read the post file content from filesystem to provide them.
Pages with only `getStaticProps` should be still fine, but API routes for like RSS and sitemap will break.

An easy-to-think solution is to embed the post content to the server bundle.
But there will be many posts in a folder and without other helpers we need to manually import all MDX/Markdown posts.
To resolve it, we can create a webpack loader to import all files in a folder as a map (also available in [this file](https://github.com/myl7/mylmoe/blob/42013f4f7aa60fc9581d6fbe4c116af0976dd938/utils/dirLoader.js)):

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

Then add a webpack loader configuration for it (also available in [this line](https://github.com/myl7/mylmoe/blob/42013f4f7aa60fc9581d6fbe4c116af0976dd938/next.config.js#L82)):

```js
{
  test: /_dir\.[jt]sx?$/,
  use: { loader: path.resolve('utils/dirLoader.js'), options: { include: /\.mdx?$/ } },
  type: 'javascript/auto',
}
```

Finally put a file named `_dir.ts` into the post folder.
Though the content of `_dir.ts` has no effect, you can still export corresponding types to mock TypeScript and IDE like (also available in [this file](https://github.com/myl7/mylmoe/blob/42013f4f7aa60fc9581d6fbe4c116af0976dd938/posts/dir.ts)):

```ts
// These files named /dir\.[jt]sx?$/ will be matched and processed by dirLoader
// See dirLoader for the impl
// The content will be dropped and has no effect on build output
// However you can still export corresponding types to mock TS and IDE

const posts = {} as { [fname: string]: string }
export default posts
```

## Color mode switching for code highlighting

When using rehype-highlight to highlight code blocks, you need to manually include highlight.js CSS to add themes.
Some highlight.js themes are for different color modes, and you may want to change highlight.js themes according to the color mode.

But wrapping the `<link>` component in Next.js `next/head` `<Head>` with a condition check will not work.
Morever a warning will be raised from Next.js:

```
Do not add stylesheets using next/head (see <link rel="stylesheet"> tag with href="..."). Use Document instead.
See more info here: https://nextjs.org/docs/messages/no-stylesheets-in-head-component
```

Which tells you to move the `<link>` to `Document`.
But putting it into `Document` will still not work.
Loaded CSS will not change according to current color mode.
This is beacause `next/head` `<Head>` uses side effects to add tags to head and can not cancel it.
To fulfill the requirement, instead use the raw `<Helmet>` (better from `react-helmet-async` other than `react-helmet`).
An example is available in [this line](https://github.com/myl7/mylmoe/blob/42013f4f7aa60fc9581d6fbe4c116af0976dd938/pages/%5Bpath%5D.tsx#L39).
As for this method I am not sure if it will work bad as the `<Head>` warning says, but the worst case should be that only one of the themes for different color modes is loaded.
That is not perfect, but can be recognized as a pretty fine fallback, and keep the shown content still.

## Differ inline code with code blocks

next-mdx-remote, while emitting HTML-like AST, give inline code with `<code>` only and code blocks with `<pre><code>`.
To differ the two situation in custom `<code>` components, you can use `React.cloneElement` to recreate children in `<pre>` to pass a special property like `isInPre: true` to indicate the children that they are in a `<pre>`.
An example is available in [this line](https://github.com/myl7/mylmoe/blob/42013f4f7aa60fc9581d6fbe4c116af0976dd938/utils/mdx/components.tsx#L101).

## Reuse Next.js `<Image>`

**TODO**: The section has not been completed or even implemented.
The basic idea is to filter all images in the posts and generated corresponding import statements in a webpack loader like embeding post content for edge runtime.
Then import it and use the result in next-mdx-remote `<MDXRemote>` with `scope` property.
A custom rehype plugin is required to turn `src` attribute from a literal string to a variable.

## Separate components and plugins of next-mdx-remote

This is more like a caveat:
You may have heard that Next.js can strip server dependencies from client bundle, as long as you only use them in `getStaticProps` or other data fetching hooks.
But it actually seems to work on module level.
I am not so familiar with Next.js bundling methods, but at least for this situation:
If you imported a and b from one module, and used a for client and b for server only, then Next.js will (happily) bundle b into client bundle.

When it comes with next-mdx-remote, it exports `serialize` for server and `<MDXRemote>` for client.
If you are careful enough, you may notice that `serialize` is from `next-mdx-remote/serialize` but `<MDXRemote>` is from `next-mdx-remote`, which are different and may serve as an example.
As for your code, you may want to provide `remarkPlugins` and `rehypePlugins` for `serialize` and `components` for `<MDXRemote>`.
The point is that you need to make sure `remarkPlugins`/`rehypePlugins` and `components` are not in the same module, otherwise some remark/rehype plugin code will be falsely bundled into client bundle.
An example is available in [this folder](https://github.com/myl7/mylmoe/tree/42013f4f7aa60fc9581d6fbe4c116af0976dd938/utils/mdx).
[An `IMPORTANT` notice about this](https://github.com/hashicorp/next-mdx-remote#:~:text=IMPORTANT%3A%20Be%20very,filing%20an%20issue.) is also available in next-mdx-remote README.
