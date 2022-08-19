// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { Box, Flex, Icon, Link, Spacer } from '@chakra-ui/react'
import { FaCreativeCommons, FaCreativeCommonsBy, FaCreativeCommonsSa } from 'react-icons/fa'
import colorHooks from '../utils/colors'

const moeCode = '20210016'

export default function Footer() {
  const colors = {
    textColor: colorHooks.useTextColor(),
    linkColor: colorHooks.useLinkColor(),
    highlightBackgroundColor: colorHooks.useHighlightBackgroundColor(),
  }

  return (
    <Flex direction="column" as="footer" fontSize="sm" px={4} py={2} borderWidth={1.5} borderColor={colors.textColor}>
      <Box>Copyright (C) 2020, 2021, 2022 myl7</Box>
      <Box>
        <Box>
          Posts are licensed under <Icon as={FaCreativeCommons} w={4} h={4} verticalAlign="text-bottom" />
          <Icon as={FaCreativeCommonsBy} w={4} h={4} verticalAlign="text-bottom" />
          <Icon as={FaCreativeCommonsSa} w={4} h={4} verticalAlign="text-bottom" />{' '}
          <Link
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            rel="license noopener noreferrer"
            target="_blank"
            textColor={colors.linkColor}
          >
            <Box as="span">CC BY-SA 4.0</Box>
          </Link>{' '}
          by default unless otherwise explicitly stated.
        </Box>
        <Box>
          Posts with different licenses will contain a section{' '}
          <Box as="span" fontStyle="italic" backgroundColor={colors.highlightBackgroundColor}>
            License
          </Box>{' '}
          to indicate their respective licenses.
        </Box>
      </Box>
      <Box>
        Website source code and raw post text/image files are available on{' '}
        <Link
          textColor={colors.linkColor}
          href="https://github.com/myl7/mylmoe"
          rel="noopener noreferrer"
          target="_blank"
        >
          myl7/mylmoe
        </Link>
      </Box>
      <Spacer />
      <Box>
        <Link textColor={colors.linkColor} href="https://icp.gov.moe" rel="noopener noreferrer" target="_blank">
          萌 ICP 备
        </Link>{' '}
        <Link
          textColor={colors.linkColor}
          href={`https://icp.gov.moe/?keyword=${moeCode}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {moeCode}
        </Link>{' '}
        号
      </Box>
      <Spacer />
      <Box>
        Website favicon made by{' '}
        <Link
          textColor={colors.linkColor}
          href="https://www.freepik.com"
          title="Freepik"
          rel="noopener noreferrer"
          target="_blank"
        >
          Freepik
        </Link>{' '}
        from{' '}
        <Link
          textColor={colors.linkColor}
          href="https://www.flaticon.com/"
          title="Flaticon"
          rel="noopener noreferrer"
          target="_blank"
        >
          flaticon.com
        </Link>
      </Box>
    </Flex>
  )
}
