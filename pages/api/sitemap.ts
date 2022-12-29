// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { cache } from 'react'

import { postMetas } from '@/app/posts'

export const config = { runtime: 'edge' }

const sitemap = cache(async () => {
  const origin = 'https://myl.moe'
  const urls = Object.entries(postMetas).map(([slug]) => origin + '/posts/' + slug)
  // Other non-post pages
  urls.push(...['/', '/privacy', '/brotli'].map((path) => origin + path))
  return urls.join('\n') + '\n'
})

export default async function handler() {
  return new Response(await sitemap(), { status: 200 })
}
