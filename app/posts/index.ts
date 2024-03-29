// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

// TODO: Next.js API routes are wrongly considered as client code
// See https://github.com/vercel/next.js/issues/43700 for details
// import 'server-only'

import { VFile } from 'vfile'
import { matter } from 'vfile-matter'

import p0Src from '@/assets/posts/open-source-desktop-show.md?raw'
import p1Src from '@/assets/posts/aria2-socks-proxy-trouble.md?raw'
import p2Src from '@/assets/posts/raspi-headless-init.md?raw'
import p3Src from '@/assets/posts/mylmoe-demo.md?raw'
import p4Src from '@/assets/posts/hacks-for-mdx-md-in-nextjs.md?raw'
import p5Src from '@/assets/posts/tree-shaking-on-object-exports.md?raw'
import p6Src from '@/assets/posts/golang-error-handling.md?raw'
import p7Src from '@/assets/posts/cityu-ta-canvas-grade-upload.md?raw'

// To use Next.js Image optimization, static imports are required
import p0i0 from '@/assets/images/open-source-desktop-show/general.png'
import p0i1 from '@/assets/images/open-source-desktop-show/empty.png'
import p0i2 from '@/assets/images/open-source-desktop-show/wallpaper_switcher.png'
import p0i3 from '@/assets/images/open-source-desktop-show/statistics.png'
import p0i4 from '@/assets/images/open-source-desktop-show/clipboard_history.png'
import p0i5 from '@/assets/images/open-source-desktop-show/datetime.png'
import p0i6 from '@/assets/images/open-source-desktop-show/actions.png'
import p3i0 from '@/assets/images/pixiv_86286793_p0.jpg'

import type { StaticImageData } from 'next/image'

/**
 * rawPosts is a low-cost singleton. Feel free to import it when needed.
 * By default format is md.
 */
export const rawPosts: {
  [slug: string]: { src: string; format?: 'mdx' | 'md'; images?: { [path: string]: StaticImageData } }
} = {
  'open-source-desktop-show': {
    src: p0Src,
    images: {
      '/images/open-source-desktop-show/general.png': p0i0,
      '/images/open-source-desktop-show/empty.png': p0i1,
      '/images/open-source-desktop-show/wallpaper_switcher.png': p0i2,
      '/images/open-source-desktop-show/statistics.png': p0i3,
      '/images/open-source-desktop-show/clipboard_history.png': p0i4,
      '/images/open-source-desktop-show/datetime.png': p0i5,
      '/images/open-source-desktop-show/actions.png': p0i6,
    },
  },
  'aria2-socks-proxy-trouble': { src: p1Src },
  'raspi-headless-init': { src: p2Src },
  'mylmoe-demo': { src: p3Src, images: { '/images/pixiv_86286793_p0.jpg': p3i0 } },
  'hacks-for-mdx-md-in-nextjs': { src: p4Src },
  'tree-shaking-on-object-exports': { src: p5Src },
  'golang-error-handling': { src: p6Src },
  'cityu-ta-canvas-grade-upload': { src: p7Src },
}

/**
 * postMetas is relatively high-cost since it parses all front matters.
 * Currently posts are not so many so it is fine to just parse them all.
 * TODO: Lazy parse
 */
export const postMetas: {
  [slug: string]: { format?: string } & FMCleaned
} = Object.fromEntries(
  Object.entries(rawPosts).map(([slug, { src, format }]) => [slug, { format, ...cleanFM(parseFM(src)) }]),
)

function cleanFM(fm: FM): FMCleaned {
  return {
    title: fm.title,
    pubDate: formatDate(fm.pubDate),
    updDate: formatDate(fm.updDate ?? fm.pubDate),
    abstract: fm.abstract ?? '',
    tags: Array.isArray(fm.tags) ? fm.tags : fm.tags?.split(/ +/) ?? [],
    lang: fm.lang ?? 'en',
    locale: lang2locale(fm.lang),
    categories: Array.isArray(fm.categories) ? fm.categories : fm.categories?.split(/ +/) ?? [],
    // TODO: Better default og image / add an image for all/most posts
    image: fm.image ?? 'https://myl.moe/icon-512.png',
  }
}

/** Parse front matter only */
function parseFM(src: string) {
  const vf = new VFile({ value: src })
  matter(vf, { strip: true })
  return vf.data.matter as FM
}

/** Always use UTC */
function formatDate(date: string | Date) {
  return typeof date == 'string' ? date : date.toISOString().replace(/T.+$/, '')
}

/**
 * Convert lang tags to Open Graph compatible locales.
 * Return "" when failing to convert.
 * The mapping is made according to my preference.
 * Customize it if you are not.
 */
function lang2locale(lang?: string) {
  return lang
    ? {
        en: 'en_US',
        'zh-Hans': 'zh_CN',
      }[lang] ?? ''
    : ''
}

// Front matter
export interface FM {
  title: string
  // First published date
  pubDate: string | Date
  // Latest update date, by default use pubDate
  updDate?: string | Date
  abstract?: string
  tags?: string | string[]
  // HTML lang attr compatible language tag.
  // Set in HTML lang attr, and may be used to select fonts and make i18n in the future.
  // Empty string by default, which is treated as en.
  lang?: string
  // Currently unimplemented
  categories?: string | string[]
  // Path to the cover image in the public dir.
  // Only selfhosted ones are allowed.
  // Currently unimplemented.
  image?: string
}

// Cleaned front matter
export interface FMCleaned {
  title: string
  pubDate: string
  updDate: string
  abstract: string
  tags: string[]
  lang: string
  locale: string
  categories: string[]
  image: string
}
