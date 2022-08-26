// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next'
import { SitemapStream, streamToPromise } from 'sitemap'
import { getMetasWithPPaths } from '../../utils/posts'

let SITEMAP = ''

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  if (SITEMAP == '') {
    SITEMAP = await getSitemap()
  }
  res.status(200).send(SITEMAP)
}

async function getSitemap() {
  const metas = await getMetasWithPPaths([])
  const smStream = new SitemapStream({ hostname: 'https://myl.moe' })
  metas.forEach(({ ppath }) => {
    smStream.write({ url: ppath })
  })
  // Extra pages in /pages folder
  smStream.write({ url: '/brotli' })
  smStream.end()
  const sm = (await streamToPromise(smStream)).toString()
  return sm
}
