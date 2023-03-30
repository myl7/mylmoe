// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

import GHead from '@/app/ghead'

const description =
  'Welcome to mylmoe! I am myl7, and mylmoe is my blog containing my profile with a CV, posts mainly about computer science, and other fun or useful stuff like utilities and file sharing.'

export default function Head() {
  return (
    <>
      <title>mylmoe: myl7's blog</title>
      <meta name="description" content={description} />
      <link rel="canonical" href="https://myl.moe/" />
      <meta property="og:title" content="mylmoe: myl7's blog" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://myl.moe/" />
      {/* TODO: Better default og image */}
      <meta property="og:image" content="https://myl.moe/icon-512.png" />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="mylmoe" />
      <GHead />
    </>
  )
}
