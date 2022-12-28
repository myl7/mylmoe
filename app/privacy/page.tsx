// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { serialize } from 'next-mdx-remote/serialize'
import { jsonLdScriptProps } from 'react-schemaorg'

import { MDXRemote } from '@/app/mdx/mdxRemote'
import { remarkPlugins, rehypePlugins } from '@/app/mdx/plugins'

import privacySrc from './privacy.md?raw'

import type { Article } from 'schema-dts'

export default async function Page() {
  const { frontmatter: metaUnchecked, ...mdxSrc } = await serialize(privacySrc, {
    mdxOptions: { remarkPlugins, rehypePlugins, format: 'md' },
    parseFrontmatter: true,
  })
  // TODO: Here specially the front matter of these seperate Markdown/MDX files needs to match the type declared here.
  // This means you may need to wrap dates in the front matter to strings.
  // Refactor front matter cleaner to support select fields in the future, but now this is enough.
  const meta = metaUnchecked as {
    title: string
    pubDate: string
    updDate: string
    abstract: string
  }

  return (
    <main>
      {/* Next.js currently does not accept un-async <script> in <head>, so put this in <body> */}
      <script
        {...jsonLdScriptProps<Article>({
          '@context': 'https://schema.org',
          '@type': 'Article',
          author: {
            '@type': 'Person',
            name: 'myl7',
            url: 'https://myl.moe',
          },
          datePublished: meta.pubDate,
          dateModified: meta.updDate,
          headline: meta.title,
        })}
      />
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
