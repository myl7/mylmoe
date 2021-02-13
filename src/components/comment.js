import React, {useEffect, useRef} from 'react'
import {Card} from '@material-ui/core'
import {useSelector} from 'react-redux'
import {graphql, useStaticQuery} from 'gatsby'

const Comment = props => {
  const data = useStaticQuery(graphql`
    query CommentQuery {
      site {
        siteMetadata {
          telegramChannel
        }
      }
    }
  `)
  const {telegramChannel} = data.site.siteMetadata

  const ref = useRef()

  const dark = useSelector(state => state.theme.dark)

  useEffect(() => {
    const elem = ref.current
    if (elem) {
      const script = document.createElement('script')
      script.src = 'https://telegram.org/js/telegram-widget.js?14'
      script.async = true
      script.dataset.telegramDiscussion = telegramChannel
      script.dataset.commentsLimit = '5'
      script.dataset.colorful = '1'
      if (dark) {
        script.dataset.dark = '1'
      }

      if (elem.firstChild) {
        elem.removeChild(elem.firstChild)
      }
      elem.appendChild(script)
      return () => {
        try {
          elem.removeChild(script)
        } catch {
        }
      }
    }
  }, [ref, dark, telegramChannel])

  return (
    <Card variant="outlined" ref={ref} {...props} />
  )
}

export default Comment
