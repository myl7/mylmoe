// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import dayjs from 'dayjs'
import { PostMeta, RawMeta } from './post'

export const parseMeta = (name: string, rawMeta: RawMeta, pathPrefix: string = '/posts/'): PostMeta => {
  return {
    slug: name,
    title: rawMeta.title,
    pubDate: dayjs(rawMeta.pubDate).format('YYYY-MM-DD'),
    updDate: dayjs(rawMeta.updDate ? rawMeta.updDate : rawMeta.pubDate).format('YYYY-MM-DD'),
    excerpt: rawMeta.excerpt ? rawMeta.excerpt : '',
    tags: rawMeta.tags ? rawMeta.tags : '',
    wip: Boolean(rawMeta.wip),
    path: pathPrefix + name,
  }
}

export default parseMeta
