// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { Feed } from 'feed'
import { getMetasWithPPaths } from './posts'

export default async function getFeed() {
  const metas = await getMetasWithPPaths()
  const feed = new Feed({
    title: 'mylmoe',
    description: "myl7's blog & utils",
    id: 'https://myl.moe',
    link: 'https://myl.moe',
    language: 'en',
    favicon: 'https://myl.moe/favicon.ico',
    copyright: 'Copyright (C) 2020, 2021, 2022 myl7',
    // At least 1 post is required
    updated: new Date(
      metas
        .map(({ meta }) => meta.updatedDate)
        .sort()
        .reverse()[0]
    ),
    feedLinks: {
      rss: 'https://myl.moe/rss.xml',
      atom: 'https://myl.moe/atom.xml',
    },
    author: {
      name: 'myl7',
      email: 'myl@myl.moe',
      link: 'https://myl.moe',
    },
  })
  metas.forEach(({ meta, ppath }) => {
    feed.addItem({
      title: meta.title,
      id: 'https://myl.moe' + ppath,
      link: 'https://myl.moe' + ppath,
      description: meta.abstract,
      author: [
        {
          name: 'myl7',
          email: 'myl@myl.moe',
          link: 'https://myl.moe',
        },
      ],
      date: new Date(meta.updatedDate),
    })
  })
  return feed
}
