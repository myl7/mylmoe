import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'
import {Link as RouterLink} from 'react-router-dom'
import posts from '../posts.json'

export default () => {
  return (<div>{
    Object.keys(posts).map((slug) => (
      <Card>
        <CardContent>
          <Typography variant={'subtitle1'} color={'inherit'} style={{textDecoration: 'none'}}
                      component={RouterLink} to={`/posts/${slug}`}>
            {posts[slug].title}
          </Typography>
        </CardContent>
      </Card>
    ))
  }</div>)
}
