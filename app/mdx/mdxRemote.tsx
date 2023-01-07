'use client'

// Copyright (C) 2022, 2023 myl7
// SPDX-License-Identifier: Apache-2.0

import { MDXRemote as MDXRemoteInner, MDXRemoteSerializeResult } from 'next-mdx-remote'

import components from './components'

export default function MDXRemote(props: MDXRemoteSerializeResult) {
  return (
    <div className="flex flex-col items-start gap-4">
      <MDXRemoteInner components={components} {...props} />
    </div>
  )
}
