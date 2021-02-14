import React from 'react'
import {Helmet} from 'react-helmet'
import {graphql, useStaticQuery} from 'gatsby'

const ShareThis = () => {
  const data = useStaticQuery(graphql`
    query ShareThisQuery {
      site {
        siteMetadata {
          shareThisId
        }
      }
    }
  `)
  const {shareThisId} = data.site.siteMetadata

  return (
    <Helmet>
      <script async src={
        `https://platform-api.sharethis.com/js/sharethis.js#property=${shareThisId}&product=inline-share-buttons`
      } />
    </Helmet>
  )
}

export default ShareThis

export const shareClass = 'sharethis-inline-share-buttons'
export const reactionClass = 'sharethis-inline-reaction-buttons'
