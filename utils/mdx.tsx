// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import { MdLaunch, MdLink } from 'react-icons/md'
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
  Icon,
} from '@chakra-ui/react'
import colorHooks from './colors'

export const remarkPlugins = [remarkGfm, remarkToc, remarkMath]

export const rehypePlugins = [
  rehypeKatex,
  rehypeSlug,
  [
    rehypeHighlight,
    {
      subset: false, // No language auto-detection
    },
  ],
]

export const components = {
  a: (props: any) => {
    const colors = {
      linkColor: colorHooks.useLinkColor(),
    }
    if (props.href.startsWith('http')) {
      // External link
      const newProps = { ...props }
      const children = newProps.children
      delete newProps.children
      return (
        <Link textColor={colors.linkColor} isExternal {...newProps}>
          {children}
          <Icon as={MdLaunch} w={4} h={4} />
        </Link>
      )
    } else {
      return (
        <NextLink href={props.href} passHref>
          <Link textColor={colors.linkColor} {...props} />
        </NextLink>
      )
    }
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
  h1: (_props: any) => {
    // h1 will be set by other elements and should only be set once
    throw new Error('h1 should not be used in post body')
  },
  h2: hx(2),
  h3: hx(3),
  h4: hx(4),
  h5: hx(4),
  h6: hx(4), // h5, h6 are set the same as h4 as fallback. They rarely occur.
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

// For h2 - h4
function hx(x: number) {
  const elem = `h${x}`
  const size = ['md', 'sm', 'xs'][x - 2]
  return function (props: any) {
    const colors = {
      linkColor: colorHooks.useLinkColor(),
    }
    const newProps = { ...props }
    const children = newProps.children
    delete newProps.children
    return (
      <Heading as={elem} size={size} {...newProps}>
        <Link href={`#${props.id}`} textColor={colors.linkColor}>
          <Icon as={MdLink} w={5} h={5} verticalAlign="top" mr={1} />
        </Link>
        {children}
      </Heading>
    )
  }
}

// Not used since no hastscript is required
// function react2hast(node: React.ReactElement) {
//   const html = renderToStaticMarkup(node)
//   const tree = unified().use(rehypeParse, { fragment: true }).parse(html)
//   return tree.children[0]
// }
