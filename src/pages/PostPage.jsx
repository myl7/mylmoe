import React, {useEffect} from 'react'
import {CardContent, Divider, Grid, Typography, makeStyles} from '@material-ui/core'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Markdown from 'markdown-to-jsx'
import hljs from '../utils/hljs'
import PostApi from '../apis/PostApi'
import {formatDate} from '../utils/dayjs'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {md2jsxOptions} from '../utils/md2jsx'
import ContentCard from '../components/ContentCard'

const useStyles = makeStyles({
  titleBodyDivider: {
    marginTop: '1em',
    marginBottom: '1em'
  }
})

export default () => {
  const {slug} = useParams()

  const classes = useStyles()

  const dispatch = useDispatch()

  const post = useSelector(s => s.posts[slug])

  useEffect(() => {
    document.title = 'Post | mylmoe'
  })

  useEffect(() => {
    if (post) {
      document.title = post.title + ' | mylmoe'
    }
  }, [post])

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
      <Divider />
      <ContentCard>
        {post ? (
          <CardContent>
            <Grid container alignItems={'center'} spacing={1}>
              <Grid item>
                <Typography variant={'h5'}>
                  {post.title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant={'caption'}>
                  | pubDate: {formatDate(post.pubDate)} | updDate: {formatDate(post.updDate)} |
                </Typography>
              </Grid>
            </Grid>
            <Divider className={classes.titleBodyDivider} />
            <Markdown options={md2jsxOptions}>{post.body ? post.body : ''}</Markdown>
          </CardContent>
        ) : ''}
      </ContentCard>
      <Footer />
    </div>
  )
}
