// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { Box, Flex, Icon, Link, Spacer } from '@chakra-ui/react'
import { FaCreativeCommons, FaCreativeCommonsBy, FaCreativeCommonsSa } from 'react-icons/fa'
import { MdLaunch } from 'react-icons/md'
import colorHooks from '../utils/colors'

const moeCode = '20210016'

export default function Footer() {
  const colors = {
    textColor: colorHooks.useTextColor(),
    linkColor: colorHooks.useLinkColor(),
    highlightBackgroundColor: colorHooks.useHighlightBackgroundColor(),
  }

  return (
    <Flex
      direction="column"
      as="footer"
      fontSize="sm"
      px={4}
      py={2}
      borderWidth="1.5px 0"
      borderColor={colors.textColor}
    >
      <Box>Copyright (C) 2020, 2021, 2022 myl7</Box>
      <Box>
        <Box>
          The posts are licensed under <Icon as={FaCreativeCommons} w={4} h={4} verticalAlign="top" />
          <Icon as={FaCreativeCommonsBy} w={4} h={4} verticalAlign="top" />
          <Icon as={FaCreativeCommonsSa} w={4} h={4} verticalAlign="top" />{' '}
          <Link href="https://creativecommons.org/licenses/by-sa/4.0/" rel="license" textColor={colors.linkColor}>
            CC BY-SA 4.0
            <Icon as={MdLaunch} w={3} h={3} />
          </Link>{' '}
          by default unless otherwise explicitly stated.
        </Box>
        <Box>
          The posts with different licenses would contain a section named{' '}
          <Box as="span" fontStyle="italic">
            License
          </Box>{' '}
          to indicate their respective licenses.
        </Box>
      </Box>
      <Box>
        The website source code and raw post text/image files are available on{' '}
        <Link textColor={colors.linkColor} href="https://github.com/myl7/mylmoe">
          myl7/mylmoe
          <Icon as={MdLaunch} w={3} h={3} />
        </Link>
      </Box>
      <Spacer />
      <Box>
        <Link textColor={colors.linkColor} href="https://icp.gov.moe">
          萌ICP备
          <Icon as={MdLaunch} w={3} h={3} />
        </Link>{' '}
        <Link textColor={colors.linkColor} href={`https://icp.gov.moe/?keyword=${moeCode}`}>
          {moeCode}
          <Icon as={MdLaunch} w={3} h={3} />
        </Link>{' '}
        号
      </Box>
      <Spacer />
      <Box>
        The website favicon is made and authorized for the use by{' '}
        <Link textColor={colors.linkColor} href="https://www.freepik.com" title="Freepik">
          Freepik
          <Icon as={MdLaunch} w={3} h={3} />
        </Link>{' '}
        from{' '}
        <Link textColor={colors.linkColor} href="https://www.flaticon.com/" title="Flaticon">
          flaticon.com
          <Icon as={MdLaunch} w={3} h={3} />
        </Link>
      </Box>
    </Flex>
  )
}
