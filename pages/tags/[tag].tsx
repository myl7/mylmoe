// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import Head from '../../components/head'
import { CardContent, CardHeader, Divider } from '@mui/material'
import PostDate from '../../components/post/postDate'
import PostItem from '../../components/post/postItem'
import { GetServerSideProps } from 'next'
import { PostMeta } from '../../remark/post'
import head from '../../content/head'

const Tag = (props: { tag: string; metas: PostMeta[] }) => {
  const { tag, metas } = props
  const h = head['/tags/[tag]'](tag)
  const updDate = metas.map(meta => meta.updDate).reduce((a, b) => (a > b ? a : b))
  const pubDate = metas.map(meta => meta.pubDate).reduce((a, b) => (a > b ? a : b))

  return (
    <>
      <Head {...h} path={`/tags/${tag}/`} />
      <CardHeader
        title={h.title}
        titleTypographyProps={{ component: 'h1' }}
        subheader={<PostDate updDate={updDate} pubDate={pubDate} />}
      />
      <Divider />
      <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
        {metas.map(meta => {
          const { title, pubDate, updDate, excerpt, tags, path } = meta
          return (
            <PostItem
              title={title}
              pubDate={pubDate}
              updDate={updDate}
              excerpt={excerpt}
              tags={tags}
              path={path}
              key={path}
              style={{ margin: '1em' }}
            />
          )
        })}
      </CardContent>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const tag = ctx.params!!['tag'] as string
  const obj = await import(/* webpackMode: "eager" */ '../../data/tagrel.json')
  const map = new Map(obj.default as [string, PostMeta[]][])
  if (map.has(tag)) {
    return { props: { tag, metas: map.get(tag) } }
  } else {
    return { props: { tag: '', metas: [] } }
  }
}

export default Tag
