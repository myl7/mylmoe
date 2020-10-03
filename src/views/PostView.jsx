import React, {useState, useEffect} from 'react'
import {Card, CardContent} from '@material-ui/core'

export default (props) => {
  let {slug} = props

  const [body, setBody] = useState('')
  useEffect(() => {
    fetch(`/posts-html/${slug}.html`).then((resp) => {
      setBody(resp.body.toString())
    }).catch((e) => throw e)
  }, [setBody])

  return (
    <Card>
      <CardContent dangerouslySetInnerHTML={{__html: body}} />
    </Card>
  )
}
