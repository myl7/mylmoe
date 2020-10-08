import React, {useState, useEffect} from 'react'
import {Card, CardContent} from '@material-ui/core'
import {useParams} from 'react-router-dom'
import bash from 'highlight.js/lib/languages/bash'
import python from 'highlight.js/lib/languages/python'
import marked from 'marked'
import posts from '../posts'

const renderer = new marked.Renderer()
const linkRenderer = renderer.link
renderer.link = (href, title, text) => {
  let html = linkRenderer.call(renderer, href, title, text)
  if (!href.startsWith('/')) {
    html = html.replace(/^<a /, '<a class="MuiLink-underlineHover" target="_blank" rel="noopener" ')
  }
  return html
}
const codeRenderer = renderer.code
renderer.code = (code, infostring, escaped) => {
  let html = codeRenderer.call(renderer, code, infostring, escaped)
  html = html.replace(/<code>/, '<code class="plaintext">')
  return html
}
marked.setOptions({renderer})

export default () => {
  const {slug} = useParams()

  const [body, setBody] = useState('')
  useEffect(() => {
    fetch(posts.find((p, _i) => p.slug === slug).url).then((resp) => {
      resp.text().then((content) => {
        setBody(marked(content))

        import(/* webpackChunkName: "highlight" */ 'highlight.js/lib/core').then((hljs) => {
          hljs.registerLanguage('bash', bash)
          hljs.registerLanguage('python', python)
          hljs.initHighlighting()
        }).catch(e => throw e)
      })
    }).catch((e) => throw e)
  }, [setBody])

  return (
    <Card>
      <CardContent dangerouslySetInnerHTML={{__html: body}} />
    </Card>
  )
}
