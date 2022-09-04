// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

// Available admonition types and respective styles/icons are from Material for MkDocs which is at https://squidfunk.github.io/mkdocs-material/reference/admonitions/ and licensed under:
// Copyright (c) 2016-2022 Martin Donath <martin.donath@squidfunk.com>
// SPDX-License-Identifier: MIT
// We used these things on 2022-09-04.
// A LICENSE file is shipped in the same directory for the use.

import React from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import Pencil from './icons/pencil.svg'
import ClipboardText from './icons/clipboard-text.svg'
import Information from './icons/information.svg'
import Fire from './icons/fire.svg'
import CheckBold from './icons/check-bold.svg'
import HelpCircle from './icons/help-circle.svg'
import Alert from './icons/alert.svg'
import CloseThick from './icons/close-thick.svg'
import LightningBolt from './icons/lightning-bolt.svg'
import Bug from './icons/bug.svg'
import FormatListNumbered from './icons/format-list-numbered.svg'
import FormatQuoteClose from './icons/format-quote-close.svg'

export interface AdmonitionProps {
  type: string
  title?: string
  autoTitle?: string
  children?: React.ReactNode
}

export default function Admonition(props: AdmonitionProps) {
  const { type, title, autoTitle, children, ...rest } = props
  console.log('OK', type)
  const typeName = TYPES[type?.toLowerCase()]
  if (!typeName) {
    throw new Error(`Unknown admonition type: ${type}`)
  }
  const { icon, color } = TYPE_STYLES[typeName]
  const arrChildren = React.Children.toArray(children)
  // typeName is always ASCII so it is safe to simply capitalize it
  let titleElem: React.ReactNode = <Text>{title || typeName[0].toUpperCase() + typeName.substring(1)}</Text>
  if (autoTitle) {
    const { child, i } =
      arrChildren
        .map((child, i) => ({ child, i }))
        .filter(({ child }) =>
          React.isValidElement(child)
            ? typeof child.type != 'string' && child.type.name == 'p'
            : typeof child == 'string' && child.trim().length > 0
        )[0] ?? {}
    arrChildren[i] = ''
    titleElem = child
  }
  return (
    <Box my={2} borderRadius="md" borderLeftWidth={5} borderLeftColor={color} shadow="md" fontSize="sm" {...rest}>
      <Flex px={1} py={1} backgroundColor={color + '1a'} flexWrap="wrap" alignItems="center" gap={1}>
        <Icon as={icon} mt={-1} w={5} h={5} fill={color} />
        <Box fontWeight="bold">{titleElem}</Box>
      </Flex>
      <Box px={2} py={1}>
        {arrChildren}
      </Box>
    </Box>
  )
}

// The colors from Material for MkDocs can work fine in both light and dark mode
const TYPE_STYLES: { [key: string]: { icon: any; color: string } } = {
  note: { icon: Pencil, color: '#448aff' },
  abstract: { icon: ClipboardText, color: '#00b0ff' },
  info: { icon: Information, color: '#00b8d4' },
  tip: { icon: Fire, color: '#00bfa5' },
  success: { icon: CheckBold, color: '#00c853' },
  question: { icon: HelpCircle, color: '#64dd17' },
  warning: { icon: Alert, color: '#ff9100' },
  failure: { icon: CloseThick, color: '#ff5252' },
  danger: { icon: LightningBolt, color: '#ff1744' },
  bug: { icon: Bug, color: '#f50057' },
  example: { icon: FormatListNumbered, color: '#7c4dff' },
  quote: { icon: FormatQuoteClose, color: '#9e9e9e' },
}
const TYPES: { [key: string]: string } = {
  note: 'note',
  abstract: 'abstract',
  summary: 'abstract',
  tldr: 'abstract',
  info: 'info',
  todo: 'info',
  tip: 'tip',
  hint: 'tip',
  important: 'tip',
  success: 'success',
  check: 'success',
  done: 'success',
  question: 'question',
  help: 'question',
  faq: 'question',
  warning: 'warning',
  caution: 'warning',
  attention: 'warning',
  failure: 'failure',
  fail: 'failure',
  missing: 'failure',
  danger: 'danger',
  error: 'danger',
  bug: 'bug',
  example: 'example',
  quote: 'quote',
  cite: 'quote',
}
