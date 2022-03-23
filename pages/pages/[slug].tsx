// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { GetStaticPaths, GetStaticProps } from 'next'
import { CardContent, CardHeader, Divider } from '@mui/material'
import Head from '../../components/head'
import { PostInfo } from '../../remark/post'
import { getMdPosts } from '../../utils/posts'
import PostDate from '../../components/post/postDate'

const Page = (props: { post: PostInfo }) => {
  const { meta, html } = props.post
  const { title, updDate, excerpt, path } = meta

  return (
    <>
      <Head title={title} description={excerpt} path={path} />
      <CardHeader title={title} titleTypographyProps={{ component: 'h1' }} subheader={<PostDate updDate={updDate} />} />
      <Divider />
      <CardContent>
        <div className="post-html" dangerouslySetInnerHTML={{ __html: html! }} />
      </CardContent>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = getMdPosts('pages')
  const paths = pages.filter(post => post.html).map(pages => ({ params: { slug: pages.meta.slug } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!['slug'] as string
  const pages = getMdPosts('pages')
  const page = pages.filter(page => page.meta.slug == slug)[0]!
  return {
    props: {
      post: page,
    },
  }
}

export default Page
