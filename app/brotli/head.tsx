// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

import GHead from '@/app/ghead'

export const meta = {
  title: 'Brotli encode/decode tool working locally in browser',
  abstract:
    'Encode/decode (a.k.a. compress/decompress) data in Brotli format. All processing is literally done locally with WebAssembly to keep data safe.',
}

export default function Head() {
  return (
    <>
      <title>{`${meta.title} | mylmoe: myl7's blog`}</title>
      <meta name="description" content={meta.abstract} />
      <link rel="canonical" href="https://myl.moe/brotli" />
      <GHead />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.abstract} />
      <meta property="og:url" content="https://myl.moe/brotli" />
      <meta property="og:site_name" content="mylmoe" />
    </>
  )
}
