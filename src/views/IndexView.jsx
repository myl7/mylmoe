import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'
import RouterLink from '../components/RouterLink'
import posts from '../posts.js'

export default () => {
  return (<div>{
    posts.map((post, i) => (
      <Card key={i}>
        <CardContent>
          <RouterLink to={`/posts/${post.slug}`}>
            <Typography variant={'subtitle1'}>{post.title}</Typography>
          </RouterLink>
        </CardContent>
      </Card>
    ))
  }</div>)
}
