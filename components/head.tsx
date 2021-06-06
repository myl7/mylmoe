import React from 'react'
import {Helmet} from 'react-helmet'
import site from '../config/site'

export interface HeadProps {
  title: string,
  description: string,
  path: string
}

const Head: React.FC<HeadProps> = props => {
  const {title, description: d, path, children} = props

  const description = d ? d : '...No description currently'

  return (
    <Helmet>
      <title>{title} | {site.title}</title>
      <meta name={'description'} content={`${description} | ${site.title}: ${site.description}`} />
      <link rel="canonical" href={site.url + path} />
      {children}
    </Helmet>
  )
}

export default Head
