import React, {useEffect} from 'react'
import {Card, CardContent, Typography, Box, Grid} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import BodyPage from './BodyPage'
import RouterLink from '../components/link/RouterLink'
import PostApi from '../apis/PostApi'
import {formatDate} from '../utils/dayjs'

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
    const i = -a.pub_date.localeCompare(b.pub_date)
    if (i === 0) {
      return -(a.id - b.id)
    }
    return i
  }

  return (
    <BodyPage>{
      [...posts].filter(p => p !== undefined).sort(cmp).map(post => (
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
                  published at {formatDate(post.pub_date)}, updated at {formatDate(post.upd_date)}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))
    }</BodyPage>
  )
}
