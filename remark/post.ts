export interface PostFM {
  title: string
  pubDate: string
  updDate?: string
  excerpt?: string
  tags?: string
  wip?: boolean
}

export interface PostMeta {
  slug: string,
  title: string
  pubDate: string
  updDate: string
  excerpt: string
  tags: string
  wip: boolean
  path: string
}

export interface PostInfo {
  meta: PostMeta,
  html: string
}
