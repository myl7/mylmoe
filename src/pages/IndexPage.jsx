import React from 'react'
import {Card, CardContent, Typography, Box, Grid} from '@material-ui/core'
import RouterLink from '../components/RouterLink'

const posts = [
  {
    'title': 'First impression to Javascript',
    'id': 7,
    'slug': '2020-11-06-first-impression-to-js',
    'pubDate': '2020-11-06',
    'updDate': '2020-11-07',
    'hash': '7585fd0453a4d7c7bf826479d446f24e',
    'abstract': '',
    'url': '/raw/posts/2020-11-06-first-impression-to-js.md',
    'bodyLen': 12883
  },
  {
    'title': 'Use SSH to deploy in GitHub Action',
    'id': 6,
    'abstract': 'Do not reinvent the wheel. Use appleboy/ssh-action or appleboy/scp-action.',
    'slug': '2020-10-23-github-action-ssh-deploy',
    'pubDate': '2020-10-23',
    'updDate': '2020-10-29',
    'hash': '6bb7d108ea4e4f3c824e2d5be325ca9b',
    'url': '/raw/posts/2020-10-23-github-action-ssh-deploy.md',
    'bodyLen': 3642
  }
]

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
