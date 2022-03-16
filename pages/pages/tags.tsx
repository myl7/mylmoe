// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import Head from '../../components/head'
import { Box, Card, CardActionArea, CardContent, CardHeader, Divider, Grid } from '@mui/material'
import { GetStaticProps } from 'next'
import getPosts from '../../utils/getPosts'
import { useRouter } from 'next/router'
import head from '../../content/head'
import PostDate from '../../components/post/postDate'

const Tag = (props: { tagInfos: { tag: string; updDate: string; pubDate: string }[] }) => {
  const { tagInfos } = props

  const router = useRouter()

  const handleClick = (tag: string) => () => router.push(`/tags/${tag}/`)

  return (
    <>
      <Head {...head['/pages/tags']} path="/pages/tags/" />
      <CardHeader title={head['/pages/tags'].title} titleTypographyProps={{ component: 'h1' }} />
      <Divider />
      <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Grid container spacing={2} justifyContent="center" style={{ paddingTop: '1em', paddingBottom: '1em' }}>
          {tagInfos.map(({ tag, pubDate, updDate }) => (
            <Grid item key={tag}>
              <Card variant="outlined" component="article">
                <CardActionArea onClick={handleClick(tag)}>
                  <CardHeader
                    title={tag}
                    titleTypographyProps={{ component: 'h2' }}
                    subheader={<PostDate updDate={updDate} pubDate={pubDate} />}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getPosts()
  const tags = Array.from(new Set(posts.flatMap(post => post.meta.tags.split(' '))))
  tags.sort()
  const tagInfos = tags.map(tag => {
    const posts = getPosts().filter(post => post.meta.tags.split(' ').indexOf(tag) != -1)
    const updDate = posts.map(post => post.meta.updDate).reduce((a, b) => (a > b ? a : b))
    const pubDate = posts.map(post => post.meta.pubDate).reduce((a, b) => (a > b ? a : b))
    return { tag, updDate, pubDate }
  })
  return { props: { tagInfos } }
}

export default Tag
