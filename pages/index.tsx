// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../components/footer'
import Header from '../components/header'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>mylmoe</title>
        <meta name="description" content="myl7's blog & utils" />
      </Head>
      <Header />
      <main>
        <h1>title</h1>
        <p>description</p>
        <div>content</div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
