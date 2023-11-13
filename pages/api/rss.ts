// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

import { Feed } from 'feed'

import { postMetas } from '@/app/posts'

export async function feed() {
  const feed = new Feed({
    title: 'mylmoe',
    description: "myl7's blog",
    id: 'https://myl.moe',
    link: 'https://myl.moe',
    language: 'en',
    favicon: 'https://myl.moe/favicon.ico',
    copyright: 'Copyright (C) myl7',
    // At least 1 post is required
    updated: new Date(
      Object.entries(postMetas)
        .map(([_, meta]) => meta.updDate)
        .sort()
        .reverse()[0],
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
  Object.entries(postMetas).forEach(([slug, meta]) => {
    const path = '/posts/' + slug
    feed.addItem({
      title: meta.title,
      id: 'https://myl.moe' + path,
      link: 'https://myl.moe' + path,
      description: meta.abstract,
      author: [
        {
          name: 'myl7',
          email: 'myl@myl.moe',
          link: 'https://myl.moe',
        },
      ],
      date: new Date(meta.updDate),
    })
  })
  return feed
}

export const config = { runtime: 'edge' }

let rssStore: string
const rss = async () => {
  if (rssStore) return rssStore
  rssStore = (await feed()).rss2()
  return rssStore
}

export default async function handler() {
  return new Response(await rss(), { status: 200 })
}
