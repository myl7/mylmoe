// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import { renderToStaticMarkup } from 'react-dom/server'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import { MdLink } from 'react-icons/md'
import { Box, Link } from '@chakra-ui/react'
import colorHooks from './colors'
import ELinkSup from '../components/elinkSup'

export const remarkPlugins = [remarkGfm, remarkToc, remarkMath]

export const rehypePlugins = [
  rehypeKatex,
  rehypeSlug,
  rehypeHighlight,
  [
    rehypeAutolinkHeadings,
    {
      // Except className, others are no-merging default values
      properties: { className: 'hlink', ariaHidden: true, tabIndex: -1 },
      content: react2hast(<MdLink style={{ display: 'inline-block', verticalAlign: 'middle' }} />),
    },
  ],
  [
    rehypeExternalLinks,
    {
      contentProperties: { className: 'elink' },
      content: react2hast(<ELinkSup />),
    },
  ],
]

function MdxLink(props: any) {
  const colors = {
    linkColor: colorHooks.useLinkColor(),
  }

  if (props.className && props.className.split(' ').includes('elink')) {
    return <Link textColor={colors.linkColor} {...props} />
  } else {
    return (
      <NextLink href={props.href} passHref>
        <Link textColor={colors.linkColor} {...props} />
      </NextLink>
    )
  }
}

export const components = {
  img: Image,
  a: MdxLink,
  h2: (props: any) => <Box as="h2" fontWeight="bold" fontSize="lg" {...props} />,
  h3: (props: any) => <Box as="h3" fontWeight="bold" fontSize="md" {...props} />,
  h4: (props: any) => <Box as="h4" fontWeight="bold" fontSize="sm" {...props} />,
  h5: (props: any) => <Box as="h5" fontWeight="bold" fontSize="xs" {...props} />,
}

function react2hast(node: React.ReactElement) {
  const html = renderToStaticMarkup(node)
  const tree = unified().use(rehypeParse, { fragment: true }).parse(html)
  return tree.children[0]
}
