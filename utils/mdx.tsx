// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import Image from 'next/image'
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
import {
  Link,
  Text,
  Heading,
  Divider,
  Code,
  OrderedList,
  UnorderedList,
  ListItem,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import colorHooks from './colors'
import ELinkSup from '../components/elinkSup'

export const remarkPlugins = [remarkGfm, remarkToc, remarkMath]

export const rehypePlugins = [
  rehypeKatex,
  rehypeSlug,
  [rehypeHighlight, { subset: false }],
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

export const components = {
  a: (props: any) => {
    const colors = {
      linkColor: colorHooks.useLinkColor(),
    }
    return <Link textColor={colors.linkColor} {...props} />
  },
  blockquote: (props: any) => {
    const colors = {
      textColor: colorHooks.useTextColor(),
    }
    return (
      <Code
        as="blockquote"
        px={4}
        py={2}
        borderRadius="md"
        borderLeftWidth={5}
        borderLeftColor={colors.textColor}
        sx={{ filter: 'contrast(0.75)' }}
        // Exclude Code monospace font family config to reuse its styles
        fontFamily="unset"
        {...props}
      />
    )
  },
  // TODO: Highlight according to color mode
  code: (props: any) => (
    <Code
      w="fit-content"
      sx={{
        'pre > &': { paddingLeft: 4, paddingRight: 4, paddingTop: 2, paddingBottom: 2, borderRadius: 'md' },
      }}
      {...props}
    />
  ),
  em: (props: any) => <Text as="em" {...props} />,
  h2: (props: any) => <Heading as="h2" size="md" {...props} />,
  h3: (props: any) => <Heading as="h3" size="sm" {...props} />,
  h4: (props: any) => <Heading as="h4" size="xs" {...props} />,
  hr: Divider,
  img: Image,
  li: ListItem,
  ol: OrderedList,
  p: Text,
  // pre
  strong: (props: any) => <Text as="strong" {...props} />,
  ul: UnorderedList,
  del: (props: any) => <Text as="del" {...props} />,
  // input
  // section
  sup: (props: any) => <Text as="sup" {...props} />,
  table: Table,
  tbody: Tbody,
  td: Td,
  th: Th,
  thead: Thead,
  tr: Tr,
  sub: (props: any) => <Text as="sub" {...props} />,
  i: (props: any) => <Text as="i" {...props} />,
  u: (props: any) => <Text as="u" {...props} />,
  abbr: (props: any) => <Text as="abbr" {...props} />,
  cite: (props: any) => <Text as="cite" {...props} />,
  ins: (props: any) => <Text as="ins" {...props} />,
  kbd: (props: any) => <Text as="kbd" {...props} />,
  mark: (props: any) => <Text as="mark" {...props} />,
  s: (props: any) => <Text as="s" {...props} />,
  samp: (props: any) => <Text as="samp" {...props} />,
}

function react2hast(node: React.ReactElement) {
  const html = renderToStaticMarkup(node)
  const tree = unified().use(rehypeParse, { fragment: true }).parse(html)
  return tree.children[0]
}
