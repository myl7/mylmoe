// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { useColorModeValue } from '@chakra-ui/react'

const colorHooks = {
  // Borders also use this
  useTextColor: () => useColorModeValue('blackAlpha.800', 'whiteAlpha.800'),
  usePaleTextColor: () => useColorModeValue('blackAlpha.700', 'whiteAlpha.700'),
  useLinkColor: () => useColorModeValue('blue.500', 'blue.300'),
  // Unused
  useHighlightBackgroundColor: () => useColorModeValue('blue.100', 'blue.700'),
  useInlineCodeColor: () => useColorModeValue('green.500', 'green.300'),
}

export default colorHooks
