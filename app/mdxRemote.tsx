'use client'

import { MDXRemote as MDXRemoteInner, MDXRemoteSerializeResult } from 'next-mdx-remote'

import components from './mdxComponents'

// TODO: Downgrade MDX to 2.1.5 to fix the error:
// TypeError: _jsxDEV is not a function
// See https://github.com/hashicorp/next-mdx-remote/issues/307 for details.
// Remove the overrides in package.json when fixed by upstream.

export function MDXRemote(props: MDXRemoteSerializeResult) {
  return (
    <div className="flex flex-col items-start gap-4 font-serif">
      <MDXRemoteInner components={components} {...props} />
    </div>
  )
}
