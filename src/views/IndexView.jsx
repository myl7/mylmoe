import React from 'react'
import {Card, CardContent, Link, Typography} from '@material-ui/core'
import {Link as RouterLink} from 'react-router-dom'
import posts from '../posts'

export default () => {
  return (<div>{
    posts.map((post, i) => (
      <Card key={i}>
        <CardContent>
          <Link component={RouterLink} to={`/posts/${post.slug}`}>
            <Typography variant={'subtitle1'}>{post.title}</Typography>
          </Link>
        </CardContent>
      </Card>
    ))
  }</div>)
}
