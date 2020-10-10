import React, {useState, useEffect} from 'react'
import {Card, CardContent} from '@material-ui/core'
import {useParams} from 'react-router-dom'
import bash from 'highlight.js/lib/languages/bash'
import python from 'highlight.js/lib/languages/python'
import vim from 'highlight.js/lib/languages/vim'
import json from 'highlight.js/lib/languages/json'
import posts from '../posts'

export default () => {
  const {slug} = useParams()

  const [body, setBody] = useState('')
  useEffect(() => {
    fetch(posts.find((p, _i) => p.slug === slug).url).then((resp) => {
      resp.text().then((content) => {
        content = content.substring(content.indexOf('---') + 4)

        setBody(content.replace(/\n\n/g, '<br>'))

        const markedPromise = import(/* webpackChunkName: "marked" */ 'marked')
        const highlightJsPromise = import(/* webpackChunkName: "highlight.js" */ 'highlight.js/lib/core')

        markedPromise.then(({default: marked}) => {
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

          setBody(marked(content))

          highlightJsPromise.then(hljs => {
            hljs.registerLanguage('bash', bash)
            hljs.registerLanguage('python', python)
            hljs.registerLanguage('vim', vim)
            hljs.registerLanguage('json', json)

            document.querySelectorAll('div#root pre > code').forEach(elem => {
              hljs.highlightBlock(elem)
            })
          })
        })
      })
    })
  }, [setBody])

  return (
    <Card>
      <CardContent dangerouslySetInnerHTML={{__html: body}} />
    </Card>
  )
}
