import React from 'react'
import {Helmet} from 'react-helmet'
import {graphql, useStaticQuery} from 'gatsby'

const HtmlHead = props => {
  const {title, description, path, children} = props

  const data = useStaticQuery(graphql`
    query HtmlHeadQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)
  const {title: siteTitle, description: siteDescription, siteUrl} = data.site.siteMetadata

  return (
    <Helmet>
      <title>{title} | {siteTitle}</title>
      <meta name={'description'} content={description + ' mylmoe, ' + siteDescription} />
      <link rel="canonical" href={siteUrl + path} />
      {children}
    </Helmet>
  )
}

export default HtmlHead
