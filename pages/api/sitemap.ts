// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next'
import { getMetasWithPPaths } from '../../utils/posts'

let SITEMAP = ''

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler() {
  if (SITEMAP == '') {
    SITEMAP = await getSitemap()
  }
  return new Response(SITEMAP, { status: 200 })
}

async function getSitemap() {
  const origin = 'https://myl.moe'
  const urls = (await getMetasWithPPaths([])).map(({ ppath }) => origin + ppath)
  // Extra pages in /pages folder
  urls.push(...[origin + '/brotli'])
  const sm = urls.map((url) => url + '\n').join('') + '\n'
  return sm
}
