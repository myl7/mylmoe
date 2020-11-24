import React, {useEffect} from 'react'
import {Box, Card, CardContent, Divider, Grid} from '@material-ui/core'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import hljs from '../utils/hljs'
import marked from '../utils/marked'
import PostApi from '../apis/PostApi'
import {formatDate} from '../utils/dayjs'
import BodyPage from './BodyPage'

export default () => {
  const {slug} = useParams()

  const dispatch = useDispatch()

  const post = useSelector(s => {
    if (/^\d+$/.test(slug)) {
      const id = parseInt(slug)
      return s.posts[id]
    } else {
      return s.posts.find(p => p !== undefined && p.slug === slug)
    }
  })

  useEffect(() => {
    if (post === undefined) {
      new PostApi().post(slug).then(post => {
        dispatch({
          type: 'post.single',
          payload: post
        })
      })
    }

    document.querySelectorAll('div#root pre > code').forEach(elem => {
      hljs.highlightBlock(elem)
    })
  }, [dispatch, post])

  return (
    <BodyPage>
      <Card>
        {post ? <CardContent>
          <Grid container alignItems={'center'} spacing={1}>
            <Grid item><Box fontSize={'h5.fontSize'}>{post.title}</Box></Grid>
            <Grid item>
              <Box fontWeight={'fontWeightLight'}>
                published at {formatDate(post.pub_date)}, updated at {formatDate(post.upd_date)}
              </Box>
            </Grid>
          </Grid>
          <Divider style={{marginTop: '1em', marginBottom: '1em'}} />
          <Box dangerouslySetInnerHTML={{__html: marked(post.body)}} />
        </CardContent> : ''}
      </Card>
    </BodyPage>
  )
}
