// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

import { serialize } from 'next-mdx-remote/serialize'

import MDXRemote from '@/app/mdx/mdxRemote'
import { remarkPlugins, rehypePlugins } from '@/app/mdx/plugins'

import privacySrc from './privacy.md?raw'

import type { Metadata } from 'next'

const meta = {
  title: 'Privacy policy',
  description:
    'We value your privacy. NO personal information is collected by us. However, we use third-party services to power some website functionality, which may collect personal information. Check ALL of them in the post.',
  url: '/privacy',
  pubDate: '2022-08-25',
  updDate: '2022-12-28',
}

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: meta.url,
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.url,
    siteName: 'mylmoe',
    type: 'article',
    publishedTime: `${meta.pubDate}T00:00:00.000Z`,
    modifiedTime: `${meta.updDate}T00:00:00.000Z`,
  },
}

export default async function Page() {
  const mdxSrc = await serialize(privacySrc, { mdxOptions: { remarkPlugins, rehypePlugins, format: 'md' } })

  return (
    <main>
      <section className="flex flex-col gap-2 rounded border-2 border-bg-l4 bg-bg-l1 p-2 font-serif dark:border-bg-d4 dark:bg-bg-d1">
        <h1 className="text-2xl">{meta.title}</h1>
        <hr className="border-bg-l4 dark:border-bg-d4" />
        <p className="text-sm">
          {meta.pubDate == meta.updDate ? (
            <>
              updated & published on <time>{meta.updDate}</time>
            </>
          ) : (
            <>
              updated on <time>{meta.updDate}</time> & published on <time>{meta.pubDate}</time>
            </>
          )}
        </p>
        <hr className="border-bg-l4 dark:border-bg-d4" />
        <p>
          <span className="italic">Abstract:</span> {meta.description}
        </p>
        <hr className="border-bg-l4 dark:border-bg-d4" />
        <MDXRemote {...mdxSrc} />
      </section>
    </main>
  )
}
