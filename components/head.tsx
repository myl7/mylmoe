// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { FC } from 'react'
import site from '../content/site'
import { default as NextHead } from 'next/head'

export interface HeadProps {
  title?: string
  description?: string
  path: string
}

const Head: FC<HeadProps> = props => {
  const { title: t, description: d, path, children } = props
  const tail = `${site.title}: ${site.description}`
  const title = t ? `${t} | ${tail}` : tail
  const description = d ? `${d} | ${tail}` : tail

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
