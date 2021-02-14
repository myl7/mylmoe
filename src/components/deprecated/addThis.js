import React from 'react'
import {Helmet} from 'react-helmet'
import {graphql, useStaticQuery} from 'gatsby'

const AddThis = () => {
  const data = useStaticQuery(graphql`
    query AddThisQuery {
      site {
        siteMetadata {
          addThisId
        }
      }
    }
  `)
  const {addThisId} = data.site.siteMetadata

  return (
    <Helmet>
      <script async src={'https://s7.addthis.com/js/300/addthis_widget.js#pubid=' + addThisId} />
    </Helmet>
  )
}

export default AddThis

export const followClass = 'addthis_inline_follow_toolbox'
