// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { Box, Flex, Icon, Link, Spacer } from '@chakra-ui/react'
import { FaCreativeCommons, FaCreativeCommonsBy, FaCreativeCommonsSa } from 'react-icons/fa'
import colorHooks from '../utils/colors'

export default function Footer() {
  const colors = {
    textColor: colorHooks.useTextColor(),
    linkColor: colorHooks.useLinkColor(),
  }

  return (
    <Flex
      direction="column"
      as="footer"
      fontSize="sm"
      px={4}
      py={2}
      borderWidth={1.5}
      borderColor={colors.textColor}
      w="100%"
    >
      <Box>Copyright (C) 2020, 2021, 2022 myl7</Box>
      <Box>
        Posts are licensed under <Icon as={FaCreativeCommons} w={4} h={4} />
        <Icon as={FaCreativeCommonsBy} w={4} h={4} />
        <Icon as={FaCreativeCommonsSa} w={4} h={4} />{' '}
        <Link
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          rel="license noopener noreferrer"
          target="_blank"
          textColor={colors.linkColor}
        >
          <Box as="span">CC BY-SA 4.0</Box>
        </Link>{' '}
        by default unless otherwise explicitly stated. Posts with different licenses will contain a section{' '}
        <Box as="span" fontStyle="italic">
          License
        </Box>{' '}
        to indicate their respective licenses.
      </Box>
      <Box>
        Website source code is available on{' '}
        <Link textColor={colors.linkColor} href="https://github.com/myl7/mylmoe">
          myl7/mylmoe@GitHub
        </Link>
      </Box>
      <Spacer />
      <Box></Box>
    </Flex>
  )
}
