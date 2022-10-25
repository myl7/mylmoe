---
title: Tree shaking would not work on object exports
createdDate: 2022-10-25
updatedDate: 2022-10-25
abstract: Exporting multiple things as an object (as expected) means always bundling them together. And there are more discussions about how to export multiple things.
tags: javascript tree-shaking esm
---

<!-- Copyright (C) 2022 myl7 -->
<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

Assume a module `export.js` for exports:

```js
export default {
  a: a,
  b: b,
}

export const a = 'short'

export const b = 'long: ...'
// b is not used and very long, e.g., 1MB
```

Then we try to import `a` only from `export.js` in different ways:

```js
// A
import obj from './export.js'
console.log(obj.a)
```

```js
// B
import * as obj from './export.js'
console.log(obj.a)
```

```js
// C
import * as obj from './export.js'
K = 'a'
console.log(obj[K])
```

```js
// D
import(/* webpackMode: "eager" */ './export.js').then(({ a }) => console.log(a))
```

Finally, bundle them respectively with webpack.
Then check the output sizes.

The result is that, ONLY B is small, and others all include the unused `b`.

> The post is related with Next.js image optimization together with next-mdx-remote.
> More experiments are required so I can not just assert here.
> To put simply, ordinary solutions to reuse Next.js image optimization in next-mdx-remote cause any post page to include all image metadata, even though it does not use the images.
