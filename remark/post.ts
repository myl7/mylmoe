// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

export interface RawMeta {
  title: string
  pubDate: string
  updDate?: string
  excerpt?: string
  tags?: string
  wip?: boolean
}

export interface PostMeta {
  slug: string
  title: string
  pubDate: string
  updDate: string
  excerpt: string
  tags: string
  wip: boolean
  path: string
}

export interface PostInfo {
  meta: PostMeta
  html?: string
}
