// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import type { Meta } from './posts'

export type RawPageMeta =
  | {
      title: string
      abstract?: string
      type?: string
      image?: string
      locale?: string
    }
  | Meta

interface PageMetaCleaned {
  title: string
  abstract: string
  type: string
  image: string
  locale: string
}

export function cleanPageMeta(m: RawPageMeta) {
  const meta: PageMetaCleaned = {
    title: m.title,
    abstract: m.abstract ?? '',
    type: ('type' in m ? m.type : isPost(m) ? 'article' : null) || 'website',
    locale: ('lang' in m ? m.lang : m.locale) || 'en_US',
    image: m.image || 'https://myl.moe/icon-512.png',
  }
  if (meta.locale == 'en') meta.locale = 'en_US'
  // Validate
  if (!meta.title) throw new Error('title is required in page meta')
  return meta
}

const isPost = (m: RawPageMeta) => 'categories' in m
