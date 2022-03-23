// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import 'highlight.js/styles/atom-one-dark.css'
import { GetStaticPaths, GetStaticProps } from 'next'
import { PostInfo } from '../../remark/post'
import { getMdPosts } from '../../utils/posts'
import PostTemplate from '../../components/post/postTemplate'

const Post = (props: { post: PostInfo }) => {
  const { meta, html } = props.post

  return (
    <PostTemplate meta={meta}>
      <div className="post-html" dangerouslySetInnerHTML={{ __html: html! }} />
    </PostTemplate>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getMdPosts()
  const paths = posts.filter(post => post.html).map(post => ({ params: { slug: post.meta.slug } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!['slug'] as string
  const post = getMdPosts().filter(post => post.meta.slug == slug)[0]!
  return {
    props: {
      post,
    },
  }
}

export default Post
