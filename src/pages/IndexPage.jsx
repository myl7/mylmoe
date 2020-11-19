import React, {useEffect} from 'react'
import {Card, CardContent, Typography, Box, Grid} from '@material-ui/core'
import RouterLink from '../components/links/RouterLink'
import {useDispatch, useSelector} from 'react-redux'
import PostApi from '../apis/PostApi'
import BodyPage from './BodyPage'

export default () => {
  const dispatch = useDispatch()

  const posts = useSelector(s => s.posts)

  useEffect(() => {
    new PostApi().posts().then(posts => {
      dispatch({
        type: 'post.all',
        payload: posts
      })
    })
  }, [dispatch])

  const cmp = (a, b) => {
    const i = -a.publishDate.localeCompare(b.publishDate)
    if (i === 0) {
      return -(a.id - b.id)
    }
    return i
  }

  return (
    <BodyPage>{
      posts.sort(cmp).map(post => (
        <Card key={post.id}>
          <CardContent>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item>
                <RouterLink to={`/posts/${post.slug}`}>
                  <Typography variant={'subtitle1'}>{post.title}</Typography>
                </RouterLink>
              </Grid>
              <Grid item>
                <Box fontWeight={'fontWeightLight'} fontSize={14}>
                  published at {post.publishDate}, updated at {post.updateDate}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))
    }</BodyPage>
  )
}
