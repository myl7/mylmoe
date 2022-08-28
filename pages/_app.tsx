// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import '../index.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import { HelmetProvider } from 'react-helmet-async'
import theme from '../utils/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ChakraProvider theme={theme}>
        <HelmetProvider>
          <Component {...pageProps} />
        </HelmetProvider>
      </ChakraProvider>
    </>
  )
}
