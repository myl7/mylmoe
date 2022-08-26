// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import NextLink from 'next/link'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkToc from 'remark-toc'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import { MdContentCopy, MdDone, MdLaunch, MdLink } from 'react-icons/md'
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
  IconButton,
  VStack,
  Tag,
  useClipboard,
  chakra,
} from '@chakra-ui/react'
import remarkCodeAsProp from './remarkCodeAsProp'
import colorHooks from './colors'

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
]

export const components = {
  a: (props: any) => {
    const { href, children, ...rest }: { href: string; children: React.ReactNode } = props
    const colors = {
      linkColor: colorHooks.useLinkColor(),
    }

    let isExternal = false
    if (href.startsWith('http')) {
      try {
        const url = new URL(href)
        if (url.host != 'myl.moe') {
          isExternal = true
        }
      } catch (e) {}
    }

    return isExternal ? (
      <Link textColor={colors.linkColor} href={href} {...rest}>
        {children}
        <Icon as={MdLaunch} w={4} h={4} />
      </Link>
    ) : (
      <NextLink href={href} passHref>
        <Link textColor={colors.linkColor} {...rest}>
          {children}
        </Link>
      </NextLink>
    )
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
        filter="contrast(0.75)"
        // Exclude Code monospace font family config to reuse its styles
        fontFamily="initial"
        {...props}
      />
    )
  },
  code: ({ isInPre, ...rest }: { isInPre: boolean }) => (isInPre ? <CodeBlock {...rest} /> : <Code {...rest} />),
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
  pre: ({ children, ...rest }: { children: React.ReactNode }) => (
    <chakra.pre w="fit-content" {...rest}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { isInPre: true }) : child
      )}
    </chakra.pre>
  ),
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

// TODO: line numbers
function CodeBlock(props: any) {
  const { children, className, 'data-code': dataCode, ...rest } = props

  const lang = className
    ? (className as string)
        .split(' ')
        .find((cls) => cls.startsWith('language-'))
        ?.substring('language-'.length) ?? ''
    : ''

  const { hasCopied, onCopy } = useClipboard(dataCode)

  return children ? (
    <>
      <VStack float="right" pl={1} spacing={0.5} alignItems="flex-start">
        {lang && (
          <Tag size="sm" zIndex="docked" filter="contrast(0.8)">
            {lang}
          </Tag>
        )}
        <IconButton
          aria-label="Copy the code block to clipboard"
          icon={<Icon as={hasCopied ? MdDone : MdContentCopy} w={3} h={3} />}
          size="xs"
          rounded="full"
          float="right"
          zIndex="docked"
          filter="contrast(0.8)"
          onClick={onCopy}
        />
      </VStack>
      <Code
        px={4}
        py={2}
        borderRadius="md"
        maxW="120ch"
        overflow="auto"
        contentEditable
        onCut={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
        onKeyDown={(e) =>
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'End', 'Home', 'PageDown', 'PageUp'].includes(e.key) ||
          e.preventDefault()
        }
        spellCheck={false}
        {...rest}
      >
        {children}
      </Code>
    </>
  ) : (
    <Code px={4} py={2} borderRadius="md" {...rest} />
  )
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
