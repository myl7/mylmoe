// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import NextLink from 'next/link'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkToc from 'remark-toc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import { MdLaunch, MdLink } from 'react-icons/md'
import {
  Link,
  Text,
  Image,
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
  Box,
} from '@chakra-ui/react'
import colorHooks from './colors'

export const remarkPlugins = [remarkGfm, remarkDirective, remarkDirectiveRehype, remarkToc, remarkMath]

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
      const url = new URL(props.href)
      if (url.host == 'myl.moe') {
        return (
          <NextLink href={props.href} passHref>
            <Link textColor={colors.linkColor} {...props} />
          </NextLink>
        )
      }
      // External link
      const { children, ...rest } = props
      return (
        <Link textColor={colors.linkColor} {...rest}>
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
        fontFamily="initial"
        {...props}
      />
    )
  },
  // TODO: Show language, line numbers, copy to clipboard
  code: (props: any) => {
    const { isInPre, ...rest } = props
    return isInPre ? <Code px={4} py={2} borderRadius="md" {...rest} /> : <Code {...rest} />
  },
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
  pre: (props: any) => {
    const { children, ...rest } = props
    return (
      <Box as="pre" w="fit-content" {...rest}>
        {React.Children.map(children as React.ReactNode, (child) =>
          React.isValidElement(child) ? React.cloneElement(child, { isInPre: true }) : child
        )}
      </Box>
    )
  },
  strong: (props: any) => <Text as="strong" {...props} />,
  ul: UnorderedList,
  del: (props: any) => <Text as="del" {...props} />,
  // input
  // section
  sup: (props: any) => <Text as="sup" {...props} />,
  table: (props: any) => <Table w="fit-content" {...props} />,
  tbody: Tbody,
  td: Td,
  th: (props: any) => <Th fontSize="md" textTransform="initial" {...props} />,
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
  return function (props: any) {
    const colors = {
      linkColor: colorHooks.useLinkColor(),
    }
    const { children, ...rest } = props
    return (
      <Heading as={`h${x}`} size={['md', 'sm', 'xs'][x - 2]} {...rest} pl={x - 2}>
        <Link href={`#${props.id}`} textColor={colors.linkColor}>
          <Icon as={MdLink} w={7 - x} h={7 - x} verticalAlign="top" mr={1} />
        </Link>
        {children}
      </Heading>
    )
  }
}
