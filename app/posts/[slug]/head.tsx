// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

import GHead from '@/app/ghead'
import { postMetas } from '@/app/posts'

export default function Head({ params: { slug } }: { params: { slug: string } }) {
  const meta = postMetas[slug]
  if (!meta) {
    throw new Error(`Post ${slug} not found`)
  }

  return (
    <>
      <title>{`${meta.title} | mylmoe: myl7's blog`}</title>
      <meta name="description" content={meta.abstract} />
      <link rel="canonical" href={'https://myl.moe/posts/' + slug} />
      <GHead />
      <meta property="og:title" content={meta.title} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={'https://myl.moe/posts' + slug} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:description" content={meta.abstract} />
      <meta property="og:locale" content={meta.locale} />
      <meta property="og:site_name" content="mylmoe" />
      <meta property="article:published_time" content={meta.pubDate} />
      <meta property="article:modified_time" content={meta.updDate} />
      <meta property="article:author" content="myl7" />
      {meta.tags.map((tag) => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}
    </>
  )
}
