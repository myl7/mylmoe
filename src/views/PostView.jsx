import React, {useState, useEffect} from 'react'
import {Card, CardContent} from '@material-ui/core'
import {useParams} from 'react-router-dom'

export default () => {
  const {slug} = useParams()

  const [body, setBody] = useState('')
  useEffect(() => {
    fetch(`/posts-html/${slug}.html`).then((resp) => {
      resp.text().then((content) => {
        setBody(content)
      })
    }).catch((e) => throw e)
  }, [setBody])

  return (
    <Card>
      <CardContent dangerouslySetInnerHTML={{__html: body}} />
    </Card>
  )
}
