import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Markdown from 'markdown-to-jsx'
import hljs from '../utils/hljs'
import PostApi from '../apis/PostApi'
import {formatDate} from '../utils/dayjs'
import {md2jsxOptions} from '../utils/md2jsx'
import BodyPage from './templates/BodyPage'
import {Box} from '@material-ui/core'

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
    <BodyPage
      title={post && post.title ? post.title : 'Loading...'}
      description={post && post.excerpt ? post.excerpt : 'Loading...'}
      subheader={
        post && post.pubDate && post.updDate
          ? [
            post.excerpt ? post.excerpt + ' ' : '',
            'Updated at ',
            <Box component={'span'} fontWeight={'fontWeightBold'}>{formatDate(post.pubDate)}</Box>,
            ', Published at ',
            <Box component={'span'} fontWeight={'fontWeightBold'}>{formatDate(post.pubDate)}</Box>,
            '.'
          ] : 'Loading...'
      } path={'/posts/' + slug}>
      {post ? <Markdown options={md2jsxOptions}>{post.body ? post.body : ''}</Markdown> : 'Loading...'}
    </BodyPage>
  )
}
