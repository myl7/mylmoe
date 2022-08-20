// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import '../index.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { HelmetProvider } from 'react-helmet-async'
import theme from '../utils/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <HelmetProvider>
        <Component {...pageProps} />
      </HelmetProvider>
    </ChakraProvider>
  )
}
