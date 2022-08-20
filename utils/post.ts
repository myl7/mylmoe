// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

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

const date2str = (date: string | Date) => (typeof date == 'string' ? date : date.toISOString())
