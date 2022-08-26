// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'system',
}

const theme = extendTheme({ config })

export default theme
