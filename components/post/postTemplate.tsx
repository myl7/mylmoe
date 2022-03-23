// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import '../../utils/highlight.css'
import { FC } from 'react'
import { PostMeta } from '../../remark/post'
import { CardContent, CardHeader, Chip, Divider } from '@mui/material'
import Head from '../head'
import PostDate from './postDate'
import Comment from '../comment'
import { useRouter } from 'next/router'

export interface PostProps {
  meta: PostMeta
}

const PostTemplate: FC<PostProps> = ({ meta, children }) => {
  const { title, pubDate, updDate, excerpt, tags, path } = meta

  const router = useRouter()

  const handleGo = (tag: string) => () => router.push(`/tags/${tag}/`)

  return (
    <>
      <Head title={title} description={excerpt} path={path} />
      <CardHeader
        title={title}
        titleTypographyProps={{ component: 'h1' }}
        subheader={
          <div>
            <PostDate updDate={updDate} pubDate={pubDate}>
              {excerpt}
            </PostDate>
            {tags.split(' ').map(tag => (
              <Chip label={tag} key={tag} clickable onClick={handleGo(tag)} style={{ marginRight: '0.5em' }} />
            ))}
          </div>
        }
      />
      <Divider />
      <CardContent>
        <div style={{ marginBottom: '1em' }}>{children}</div>
        <Comment />
      </CardContent>
    </>
  )
}

export default PostTemplate
