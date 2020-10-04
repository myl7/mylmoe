import React, {useState, useEffect} from 'react'
import {Card, CardContent} from '@material-ui/core'
import {useParams} from 'react-router-dom'
import hljs from 'highlight.js'
import bash from 'highlight.js/lib/languages/bash'
import python from 'highlight.js/lib/languages/python'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('python', python)

export default () => {
  const {slug} = useParams()

  const [body, setBody] = useState('')
  useEffect(() => {
    fetch(`/posts-html/${slug}.html`).then((resp) => {
      resp.text().then((content) => {
        setBody(content)
        hljs.initHighlighting()
      })
    }).catch((e) => throw e)
  }, [setBody, hljs])

  return (
    <Card>
      <CardContent dangerouslySetInnerHTML={{__html: body}} />
    </Card>
  )
}
