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
    const id = parseInt(slug, 10)
    return isNaN(id) ? s.posts.find(p => p !== undefined && p.slug === slug) : s.posts[id]
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
  }, [dispatch])

  return (
    <BodyPage>
      <Card>
        {post ? <CardContent>
          <Grid container alignItems={'center'} spacing={1}>
            <Grid item><Box fontSize={'h5.fontSize'}>{post.title}</Box></Grid>
            <Grid item>
              <Box fontWeight={'fontWeightLight'}>
                published at {formatDate(post.publishDate)}, updated at {formatDate(post.updateDate)}
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
