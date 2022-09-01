// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import type { Meta } from '../utils/posts'

export type PageMeta =
  | {
      title: string
      abstract?: string
      type?: string
      image?: string
      locale?: string
    }
  | Meta

export interface HeadMetaProps {
  pageMeta: PageMeta
  ppath: string
  children?: React.ReactNode
}

export default function HeadMeta(props: HeadMetaProps) {
  const { pageMeta, ppath, children } = props
  const meta = cleanPageMeta(pageMeta)
  const postMeta = pageMeta as Meta
  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.abstract} />
      <link rel="canonical" href={'https://myl.moe' + ppath} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:url" content={'https://myl.moe' + ppath} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:description" content={meta.abstract} />
      <meta property="og:locale" content={meta.locale} />
      <meta property="og:site_name" content="mylmoe" />
      {isPost(pageMeta) && (
        <>
          <meta property="article:published_time" content={postMeta.createdDate} />
          <meta property="article:modified_time" content={postMeta.updatedDate} />
          <meta property="article:author" content="myl7" />
          {postMeta.tags.map((tag) => (
            <meta property="article:tag" content={tag} key={tag} />
          ))}
        </>
      )}
      {children}
    </>
  )
}

interface PageMetaCleaned {
  title: string
  abstract: string
  type: string
  image: string
  locale: string
}

function cleanPageMeta(m: PageMeta) {
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

const isPost = (m: PageMeta) => 'categories' in m
