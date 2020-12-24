import React, {useEffect} from 'react'
import {Box, Card, CardContent, Divider, Grid} from '@material-ui/core'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Markdown from 'markdown-to-jsx'
import hljs from '../utils/hljs'
import PostApi from '../apis/PostApi'
import {formatDate} from '../utils/dayjs'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default () => {
  const {slug} = useParams()

  const dispatch = useDispatch()

  const post = useSelector(s => s.posts[slug])

  useEffect(() => {
    if (post === undefined || post.body === undefined) {
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
  }, [dispatch, post, slug])

  return (
    <div>
      <Header />
      <Card>
        {post ? <CardContent>
          <Grid container alignItems={'center'} spacing={1}>
            <Grid item><Box fontSize={'h5.fontSize'}>{post.title}</Box></Grid>
            <Grid item>
              <Box fontWeight={'fontWeightLight'}>
                published at {formatDate(post.pubDate)}, updated at {formatDate(post.updDate)}
              </Box>
            </Grid>
          </Grid>
          <Divider style={{marginTop: '1em', marginBottom: '1em'}} />
          <Markdown>{post.body ? post.body : ''}</Markdown>
        </CardContent> : ''}
      </Card>
      <Footer />
    </div>
  )
}
