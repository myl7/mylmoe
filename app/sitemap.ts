// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

import { postMetas } from '@/app/posts'
import { meta as privacyMeta } from '@/app/privacy/page'

import type { MetadataRoute } from 'next'

// Other non-post pages without updDate
const OTHER_URLS = ['/', '/brotli', '/nmconn']

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = 'https://myl.moe'
  const pages = Object.entries(postMetas).map(([slug]) => ({
    url: `${origin}/posts/${slug}`,
    lastModified: `${postMetas[slug].updDate}T00:00:00.000Z`,
  }))
  pages.push(
    // @ts-ignore
    // TODO: Next.js do intend to allow non-lastModified items. See the TS definition for details.
    // But TS seems not to work as expected and reports type errors still.
    // Disable to temporarily suppress them.
    ...OTHER_URLS.map((path) => ({
      url: `${origin}${path}`,
    }))
  )
  pages.push({
    url: `${origin}/privacy`,
    lastModified: `${privacyMeta.updDate}T00:00:00.000Z`,
  })
  return pages
}
