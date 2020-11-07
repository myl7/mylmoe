import React, {useState, useEffect} from 'react'
import {Box, Card, CardContent, Divider, Grid} from '@material-ui/core'
import {useParams} from 'react-router-dom'
import marked from 'marked'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import python from 'highlight.js/lib/languages/python'
import vim from 'highlight.js/lib/languages/vim'
import json from 'highlight.js/lib/languages/json'
import js from 'highlight.js/lib/languages/javascript'
import posts from '../posts.json'
import md2html from '../utils/md2html'

export default () => {
  const {slug} = useParams()

  const [title, setTitle] = useState(slug.substring(11))
  const [pubDate, setPubDate] = useState(slug.substring(0, 10))
  const [updDate, setUpdDate] = useState(slug.substring(0, 10))
  const [body, setBody] = useState('')

  useEffect(() => {
    const post = posts.find(p => p.slug === slug)

    setTitle(post.title)
    setPubDate(post.pubDate)
    setUpdDate(post.updDate)

    fetch(post.url).then((resp) => {
      resp.text().then((content) => {
        content = content.substring(content.indexOf('---') + 4)
        setBody(md2html(marked)(content))

        hljs.registerLanguage('bash', bash)
        hljs.registerLanguage('python', python)
        hljs.registerLanguage('vim', vim)
        hljs.registerLanguage('json', json)
        hljs.registerLanguage('js', js)
        hljs.registerLanguage('jsx', js)

        document.querySelectorAll('div#root pre > code').forEach(elem => {
          hljs.highlightBlock(elem)
        })
      })
    })
  }, [setBody])

  return (
    <Card>
      <CardContent>
        <Grid container alignItems={'center'} spacing={1}>
          <Grid item><Box fontSize={'h5.fontSize'}>{title}</Box></Grid>
          <Grid item>
            <Box fontWeight={'fontWeightLight'}>
              published at {pubDate}, updated at {updDate}
            </Box>
          </Grid>
        </Grid>
        <Divider style={{marginTop: '1em', marginBottom: '1em'}} />
        <Box dangerouslySetInnerHTML={{__html: body}} />
      </CardContent>
    </Card>
  )
}
