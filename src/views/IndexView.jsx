import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'
import {Link as RouterLink} from 'react-router-dom'
import posts from '../posts'

export default () => {
  return (<div>{
    posts.map((post, i) => (
      <Card key={i}>
        <CardContent>
          <Typography variant={'subtitle1'} color={'inherit'} style={{textDecoration: 'none'}}
                      component={RouterLink} to={`/posts/${post.slug}`}>
            {post.title}
          </Typography>
        </CardContent>
      </Card>
    ))
  }</div>)
}
