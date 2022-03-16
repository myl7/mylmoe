// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { FC } from 'react'

export interface PostDateProps {
  updDate?: string
  pubDate?: string
}

const PostDate: FC<PostDateProps> = props => {
  const { updDate, pubDate, children } = props

  return (
    <div>
      <div>{children}</div>
      <div>
        {updDate ? `Updated on ${updDate}` : ''}
        {updDate && pubDate ? ' | ' : ''}
        {pubDate ? `Published on ${pubDate}` : ''}
      </div>
    </div>
  )
}

export default PostDate
