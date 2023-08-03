// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

import { postMetas } from '@/app/posts'

export const config = { runtime: 'edge' }

let sitemapStore: string
const sitemap = async () => {
  if (sitemapStore) return sitemapStore
  const origin = 'https://myl.moe'
  const urls = Object.entries(postMetas).map(([slug]) => origin + '/posts/' + slug)
  // Other non-post pages
  urls.push(...['/', '/privacy', '/brotli'].map((path) => origin + path))
  sitemapStore = urls.join('\n') + '\n'
  return sitemapStore
}

export default async function handler() {
  return new Response(await sitemap(), { status: 200 })
}
