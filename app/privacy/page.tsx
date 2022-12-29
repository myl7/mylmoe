// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { serialize } from 'next-mdx-remote/serialize'

import { MDXRemote } from '@/app/mdx/mdxRemote'
import { remarkPlugins, rehypePlugins } from '@/app/mdx/plugins'

import { meta } from './head'

import privacySrc from './privacy.md?raw'

export default async function Page() {
  const mdxSrc = await serialize(privacySrc, { mdxOptions: { remarkPlugins, rehypePlugins, format: 'md' } })

  return (
    <main>
      <section className="flex flex-col gap-2 rounded border-2 border-bg-l4 bg-bg-l1 p-2 font-serif dark:border-bg-d4 dark:bg-bg-d1">
        <h1 className="text-2xl">{meta.title}</h1>
        <hr className="border-bg-l4 dark:border-bg-d4" />
        <p className="text-sm">
          {meta.pubDate == meta.updDate
            ? `updated & published on ${meta.updDate}`
            : `updated on ${meta.updDate} & published on ${meta.pubDate}`}
        </p>
        <hr className="border-bg-l4 dark:border-bg-d4" />
        <p>
          <span className="italic">Abstract:</span> {meta.abstract}
        </p>
        <hr className="border-bg-l4 dark:border-bg-d4" />
        <MDXRemote {...mdxSrc} />
      </section>
    </main>
  )
}
