// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import path from 'path'
import fs from 'fs'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'
import type { Frontmatter } from '../posts'

export type Meta = Omit<Required<Frontmatter>, 'tags'> & { tags: string[] }

export function getMeta(fm: Frontmatter) {
  const meta: Meta = {
    title: fm.title,
    abstract: fm.abstract ?? '',
    createdDate: date2str(fm.createdDate),
    updatedDate: fm.updatedDate ? date2str(fm.updatedDate) : date2str(fm.createdDate),
    tags: fm.tags ? fm.tags.split(' ') : [],
    lang: fm.lang ?? 'en',
  }
  // Validate
  if (!meta.title) throw new Error('title is required in post frontmatter')
  if (!meta.createdDate) throw new Error('createdDate is required in post frontmatter')
  return meta
}

const date2str = (date: string | Date) => (typeof date == 'string' ? date : date.toISOString().replace(/T.+$/, ''))

export async function getPPathsWithExts() {
  const dpath = path.join(process.cwd(), 'posts')
  const pslugs = (await fs.promises.readdir(dpath)).flatMap((p) => {
    if (p.endsWith('.mdx')) {
      return [{ pslug: p.slice(0, -'.mdx'.length), ext: 'mdx' }]
    } else if (p.endsWith('.md')) {
      return [{ pslug: p.slice(0, -'.md'.length), ext: 'md' }]
    } else {
      return []
    }
  })
  const ppaths = pslugs.map(({ pslug, ext }) => ({ ppath: path.join('/', pslug), ext }))
  return ppaths
}

export async function getMetasWithPPaths() {
  const ppaths = await getPPathsWithExts()
  const metas = [] as { meta: Meta; ppath: string }[]
  for (const { ppath, ext } of ppaths) {
    const text = (await fs.promises.readFile(path.join(process.cwd(), 'posts', ppath + '.' + ext))).toString()
    const fm = getFM(text)
    const meta = getMeta(fm)
    metas.push({ meta, ppath })
  }
  return metas
}

// Get frontmatter like next-mdx-remote does
function getFM(text: string) {
  const vf = new VFile({ value: text })
  matter(vf, { strip: true })
  return vf.data.matter as Frontmatter
}
