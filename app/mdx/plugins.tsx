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
import { selectAll } from 'hast-util-select'
import { h } from 'hastscript'

import hljsLangLatex from 'highlight.js/lib/languages/latex'

import type { Root, Element } from 'hast'

/**
 * Node types that have to be passed through from `mdx`, which is from `mdast-util-mdx`.
 * Copy here other than import to avoid huge new dependencies.
 */
const mdxNodeTypes = ['mdxFlowExpression', 'mdxJsxFlowElement', 'mdxJsxTextElement', 'mdxTextExpression', 'mdxjsEsm']

/** Allow users to use `/public` path prefix in image src for compatibility */
function rehypeImageDir() {
  return (tree: Root) => {
    selectAll('img', tree)
      .filter((image) => {
        const src = image.properties?.src
        return src && typeof src == 'string' && src.startsWith('/public/')
      })
      .forEach((image) => {
        const src = image.properties!.src as string
        image!.properties!.src = src.substring('/public'.length)
      })
  }
}

/** Paragraph-like images in posts should be wrapped with a <p> */
function rehypeWrapImage() {
  return (tree: Root) => {
    tree.children.forEach((child, i) => {
      if (typeof child == 'object' && (child as Element).tagName == 'img') {
        tree.children[i] = h('p', [child])
      }
    })
  }
}

// Suppress type errors by any due to plguin options passed by a list

export const remarkPlugins = [
  [remarkGfm, { singleTilde: false }],
  remarkDirective,
  remarkDirectiveRehype,
  remarkToc,
  remarkMath,
] as any

export const rehypePlugins = [
  [rehypeRaw, { passThrough: mdxNodeTypes }],
  rehypeKatex,
  rehypeSlug,
  [
    rehypeHighlight,
    {
      // No language auto-detection but still add hljs class
      subset: [],
      languages: {
        latex: hljsLangLatex,
      },
    },
  ],
  rehypeImageDir,
  rehypeWrapImage,
] as any
