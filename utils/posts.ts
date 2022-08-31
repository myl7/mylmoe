// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { VFile } from 'vfile'
import { matter } from 'vfile-matter'
import type { Frontmatter } from '../posts'
import postMap from '../posts/_dir'

export interface Meta {
  title: string
  abstract: string
  createdDate: string
  updatedDate: string
  tags: string[]
  lang: string
  categories: string[]
}

export function getMeta(fm: Frontmatter) {
  const meta: Meta = {
    title: fm.title,
    abstract: fm.abstract ?? '',
    createdDate: date2str(fm.createdDate),
    updatedDate: fm.updatedDate ? date2str(fm.updatedDate) : date2str(fm.createdDate),
    tags: fm.tags ? (typeof fm.tags == 'string' ? fm.tags.split(' ') : fm.tags) : [],
    lang: fm.lang || 'en',
    categories: fm.categories
      ? typeof fm.categories == 'string'
        ? fm.categories.split(' ')
        : fm.categories
      : ['post'],
  }
  // Validate
  if (!meta.title) throw new Error('title is required in post frontmatter')
  if (!meta.createdDate) throw new Error('createdDate is required in post frontmatter')
  return meta
}

const date2str = (date: string | Date) => (typeof date == 'string' ? date : date.toISOString().replace(/T.+$/, ''))

export async function getPPathsWithExts() {
  const pslugs = Object.keys(postMap).flatMap((p) => {
    if (p.endsWith('.mdx')) {
      return [{ pslug: p.slice(0, -'.mdx'.length), ext: 'mdx' }]
    } else if (p.endsWith('.md')) {
      return [{ pslug: p.slice(0, -'.md'.length), ext: 'md' }]
    } else {
      return []
    }
  })
  // '/' + pslug is safe since we control all post files
  const ppaths = pslugs.map(({ pslug, ext }) => ({ ppath: '/' + pslug, ext }))
  return ppaths
}

export async function getMetasWithPPaths(categories: string[] = ['post']) {
  const ppaths = await getPPathsWithExts()
  const metas = [] as { meta: Meta; ppath: string }[]
  for (const { ppath, ext } of ppaths) {
    const text = postMap[ppath.substring(1) + '.' + ext]
    const fm = getFM(text)
    const meta = getMeta(fm)
    if (!categories.some((c) => !meta.categories.includes(c))) {
      metas.push({ meta, ppath })
    }
  }
  const sortedMetas = metas.sort((a, b) => -a.meta.updatedDate.localeCompare(b.meta.updatedDate))
  return sortedMetas
}

// Get frontmatter like next-mdx-remote does
function getFM(text: string) {
  const vf = new VFile({ value: text })
  matter(vf, { strip: true })
  return vf.data.matter as Frontmatter
}
