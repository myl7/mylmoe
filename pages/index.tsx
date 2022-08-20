// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import type { NextPage } from 'next'
import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import Footer from '../components/footer'
import Header, { headerHeight } from '../components/header'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>mylmoe</title>
        <meta name="description" content="myl7's blog & utils" />
        <link rel="canonical" href="https://myl.moe" />
      </Head>
      <Header />
      <Box as="main" pt={headerHeight + 4} pb={2} px={2}>
        <h1>title</h1>
        <p>description</p>
        <div>content</div>
      </Box>
      <Footer />
    </div>
  )
}

export default Home
