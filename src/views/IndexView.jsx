import React from 'react'
import {Card, CardContent, Typography, Box, Grid} from '@material-ui/core'
import RouterLink from '../components/RouterLink'
import posts from '../posts.json'

export default () => {
  return (<div>{
    posts.map((post, i) => (
      <Card key={i}>
        <CardContent>
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item>
              <RouterLink to={`/posts/${post.slug}`}>
                <Typography variant={'subtitle1'}>{post.title}</Typography>
              </RouterLink>
            </Grid>
            <Grid item>
              <Box fontWeight={'fontWeightLight'} fontSize={14}>
                published at {post.pubDate}, updated at {post.updDate}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    ))
  }</div>)
}
