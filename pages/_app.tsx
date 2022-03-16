// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import '../styles.css'
import type { AppProps } from 'next/app'
import Theme from '../components/theme'
import Footer from '../content/footer'
import { Card } from '@mui/material'
import FloatAction from '../components/floatAction'
import Header from '../components/header'
import { storeWrapper } from '../redux/store'
import Fireworks from '../components/fireworks'
import { MDXProvider } from '@mdx-js/react'
import mdxComponents from '../remark/mdxComponents'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={mdxComponents}>
      <Theme>
        <Header />
        <Card variant="outlined" style={{ margin: 'calc(64px + 1em) 1em 0 1em' }} component="main">
          <Component {...pageProps} />
        </Card>
        <Footer />
        <Fireworks />
        <FloatAction />
      </Theme>
    </MDXProvider>
  )
}

export default storeWrapper.withRedux(MyApp)
