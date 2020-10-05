import React, {useState, useEffect} from 'react'
import {Card, CardContent} from '@material-ui/core'
import {useParams} from 'react-router-dom'
import bash from 'highlight.js/lib/languages/bash'
import python from 'highlight.js/lib/languages/python'

export default () => {
  const {slug} = useParams()

  const [body, setBody] = useState('')
  useEffect(() => {
    fetch(`/posts-html/${slug}.html`).then((resp) => {
      resp.text().then((content) => {
        setBody(content)

        import(/* webpackChunkName: "highlight" */ 'highlight.js/lib/highlight').then((hljs) => {
          hljs.registerLanguage('bash', bash)
          hljs.registerLanguage('python', python)
          hljs.initHighlighting()
        })
      })
    }).catch((e) => throw e)
  }, [setBody])

  return (
    <Card>
      <CardContent dangerouslySetInnerHTML={{__html: body}} />
    </Card>
  )
}
