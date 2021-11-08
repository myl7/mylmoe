import {FC} from 'react'
import site from '../content/site'
import {default as NextHead} from 'next/head'
import Icon from './icon'

export interface HeadProps {
  title: string,
  description: string,
  path: string
}

const Head: FC<HeadProps> = props => {
  const {title, description: d, path, children} = props

  const description = d ? d : '...No description currently'

  return (
    <NextHead>
      <title>{title} | {site.title}</title>
      <meta name={'description'} content={`${description} | ${site.title}: ${site.description}`} />
      <link rel="canonical" href={site.url + path} />
      <Icon />
      {children}
    </NextHead>
  )
}

export default Head
