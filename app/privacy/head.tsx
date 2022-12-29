// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import GHead from '@/app/ghead'

export const meta = {
  title: 'Privacy policy',
  pubDate: '2022-08-25',
  updDate: '2022-12-28',
  abstract:
    'We value your privacy. NO personal information is collected by us. However, we use third-party services to power some website functionality, which may collect personal information. Check ALL of them in the post.',
}

export default function Head() {
  return (
    <>
      <title>{`${meta.title} | mylmoe: myl7's blog`}</title>
      <meta name="description" content={meta.abstract} />
      <link rel="canonical" href="https://myl.moe/privacy" />
      <GHead />
    </>
  )
}
