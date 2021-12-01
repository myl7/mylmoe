import {FC} from 'react'
import site from '../content/site'
import {default as NextHead} from 'next/head'

export interface HeadProps {
  title?: string,
  description?: string,
  path: string
}

const Head: FC<HeadProps> = props => {
  const {title: t, description: d, path, children} = props
  const title = t ? `${t} | ${site.title}` : site.title
  const description = d ? `${d} | ${site.title}: ${site.description}` : (
    t ? `${site.title}: ${site.description}` : site.description
  )

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={site.url + path} />
      {children}
    </NextHead>
  )
}

export default Head
