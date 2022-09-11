// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import NextLink from 'next/link'
import NextImage from 'next/future/image'
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
  Tag,
  useClipboard,
  chakra,
  HStack,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'
import colorHooks from '../colors'
import Admonition from '../../components/admonition'
import imageMap from '../../posts/_images'

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
        my={2}
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
  code: ({ isInPre, ...rest }: { isInPre: boolean }) =>
    isInPre ? (
      <CodeBlock {...rest} />
    ) : (
      <Code
        textDecoration="inherit" // For inline code in links
        {...rest}
      />
    ),
  em: (props: any) => <chakra.em {...props} />,
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
  img: (props: any) => {
    const { src, width, height, ...rest } = props
    if (imageMap[src]) {
      const w = px2int(width)
      // Notice that here height has no effect on Next.js Image
      const h = px2int(height)
      return <NextImage src={imageMap[src]} width={w ?? 1000} height={h} {...rest} />
    } else {
      return <Image {...props} />
    }
  },
  li: ListItem,
  ol: (props: any) => <OrderedList my={2} {...props} />,
  p: (props: any) => <Text my={2} {...props} />,
  pre: ({ children, ...rest }: { children: React.ReactNode }) => (
    <chakra.pre {...rest}>
      {React.Children.map(children, (child) =>
        // @ts-ignore New prop
        React.isValidElement(child) ? React.cloneElement(child, { isInPre: true }) : child
      )}
    </chakra.pre>
  ),
  strong: (props: any) => <chakra.strong {...props} />,
  ul: (props: any) => <UnorderedList my={2} {...props} />,
  del: (props: any) => <chakra.del {...props} />,
  // input
  // section
  sup: (props: any) => <chakra.sup {...props} />,
  table: (props: any) => <Table my={2} w="fit-content(100%)" {...props} />,
  tbody: Tbody,
  td: Td,
  th: (props: any) => <Th fontSize="md" textTransform="initial" {...props} />,
  thead: Thead,
  tr: Tr,
  sub: (props: any) => <chakra.sub {...props} />,
  i: (props: any) => <chakra.i as="i" {...props} />,
  u: (props: any) => <chakra.u {...props} />,
  abbr: (props: any) => <chakra.abbr {...props} />,
  cite: (props: any) => <chakra.cite {...props} />,
  ins: (props: any) => <chakra.ins {...props} />,
  kbd: (props: any) => <chakra.kbd {...props} />,
  mark: (props: any) => <chakra.mark {...props} />,
  s: (props: any) => <chakra.s {...props} />,
  samp: (props: any) => <chakra.samp {...props} />,
  div: (props: any) => {
    const { className }: { className?: string } = props
    const classes = className?.split(' ') || []
    if (classes.includes('math')) {
      return <chakra.div my={2} px={2} overflowX="auto" borderWidth={1.5} borderRadius="md" {...props} />
    } else {
      return <chakra.div {...props} />
    }
  },
  details: (props: any) => {
    const { children, ...rest }: { children: React.ReactNode } = props
    const arrChildren = React.Children.toArray(children)
    const { child: summary, i } =
      arrChildren
        .map((child, i) => ({ child, i }))
        .filter(
          ({ child }) => React.isValidElement(child) && typeof child.type != 'string' && child.type.name == 'summary'
        )[0] ?? {}
    arrChildren[i] = ''
    return (
      <Accordion my={2} {...rest} allowToggle>
        <AccordionItem>
          {summary}
          <AccordionPanel>{arrChildren}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    )
  },
  summary: (props: any) => {
    const { children, ...rest }: { children: React.ReactNode } = props
    return (
      <AccordionButton {...rest}>
        <Box flex="1" textAlign="left">
          {children}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    )
  },
  admonition: Admonition,
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
    <VStack my={2} alignItems="flex-start" spacing={0}>
      <HStack alignItems="stretch" spacing={1} pb={1}>
        {lang && (
          <Tag size="sm" filter="contrast(0.8)">
            {lang}
          </Tag>
        )}
        <IconButton
          aria-label="Copy the code block to clipboard"
          icon={<Icon as={hasCopied ? MdDone : MdContentCopy} w={3} h={3} />}
          size="xs"
          rounded="md"
          filter="contrast(0.8)"
          onClick={onCopy}
        />
      </HStack>
      <Code
        px={4}
        py={2}
        borderRadius="md"
        w="100%"
        overflowX="auto"
        // These break Tab focus toggling
        // contentEditable
        // onCut={(e) => e.preventDefault()}
        // onPaste={(e) => e.preventDefault()}
        // onKeyDown={(e) =>
        //   e.metaKey ||
        //   e.ctrlKey ||
        //   e.shiftKey ||
        //   e.altKey ||
        //   ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'End', 'Home', 'PageDown', 'PageUp'].includes(e.key) ||
        //   e.preventDefault()
        // }
        // spellCheck={false}
        // suppressContentEditableWarning
        {...rest}
      >
        {children}
      </Code>
    </VStack>
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
      <Heading my={2} as={`h${x}`} size={['md', 'sm', 'xs'][x - 2]} {...rest} pl={x - 2}>
        <Link href={`#${props.id}`} textColor={colors.linkColor}>
          <Icon as={MdLink} w={7 - x} h={7 - x} verticalAlign="top" mr={1} />
        </Link>
        {children}
      </Heading>
    )
  }
}

const px2int = (a: string | number | undefined) => {
  if (typeof a == 'number' || typeof a == 'undefined') {
    return a
  }
  if (/^\d+$/.test(a)) {
    return parseInt(a)
  }
  if (/^\d+px$/.test(a)) {
    return parseInt(a.substring(0, a.length - 2))
  }
  throw new Error('Invalid image width/height: The unit can only be px')
}
