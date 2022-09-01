// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkToc from 'remark-toc'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import remarkCodeAsProp from './remarkCodeAsProp'
import rehypeRelativeImage from './rehypeRelativeImage'
import rehypeWrapImage from './rehypeWrapImage'

// Node types that have to be passed through from `mdx`, which is from `mdast-util-mdx`
// Copy here other than import to avoid huge new dependencies
const mdxNodeTypes = ['mdxFlowExpression', 'mdxJsxFlowElement', 'mdxJsxTextElement', 'mdxTextExpression', 'mdxjsEsm']

export const remarkPlugins = [
  remarkGfm,
  remarkDirective,
  remarkDirectiveRehype,
  remarkToc,
  remarkMath,
  remarkCodeAsProp, // Save code content to data-code prop
]

export const rehypePlugins = [
  [rehypeRaw, { passThrough: mdxNodeTypes }],
  rehypeKatex,
  rehypeSlug,
  [
    rehypeHighlight,
    {
      subset: [], // No language auto-detection but still add hljs class
    },
  ],
  rehypeRelativeImage,
  rehypeWrapImage,
]
