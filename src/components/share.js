import React, {useEffect, useRef} from 'react'
import {graphql, useStaticQuery} from 'gatsby'

const Share = () => {
  const data = useStaticQuery(graphql`
    query ShareQuery {
      site {
        siteMetadata {
          addThisId
        }
      }
    }
  `)
  const {addThisId} = data.site.siteMetadata

  const ref = useRef()

  useEffect(() => {
    const elem = ref.current
    if (elem) {
      const script = document.createElement('script')
      script.src = 'https://s7.addthis.com/js/300/addthis_widget.js#pubid=' + addThisId
      script.async = true

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
  }, [ref, addThisId])

  return (
    <div ref={ref} />
  )
}

export default Share
