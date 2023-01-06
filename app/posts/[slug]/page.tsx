// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import '@/app/hljs.scss'
import 'katex/dist/katex.min.css'

import { serialize } from 'next-mdx-remote/serialize'
import { jsonLdScriptProps } from 'react-schemaorg'

import MDXRemote from '@/app/mdx/mdxRemote'
import MDXImages from '@/app/mdx/mdxImages'
import { remarkPlugins, rehypePlugins } from '@/app/mdx/plugins'
import { postMetas, rawPosts } from '@/app/posts'

import type { Article } from 'schema-dts'

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const meta = postMetas[slug]
  const rawPost = rawPosts[slug]
  if (!meta || !rawPost) {
    throw new Error(`Post ${slug} not found`)
  }
  const src = rawPost.src
  const format = rawPost.format ?? 'md'

  const { frontmatter: _, ...mdxSrc } = await serialize(src, {
    mdxOptions: { remarkPlugins, rehypePlugins, format },
    parseFrontmatter: true,
  })

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
        <MDXImages images={rawPost.images ?? {}}>
          <MDXRemote {...mdxSrc} />
        </MDXImages>
      </section>
    </main>
  )
}

// TODO: Fix the error when using generateStaticParams with next/headers:
// Error: Dynamic server usage: headers
// See https://github.com/vercel/next.js/issues/43427 and https://github.com/vercel/next.js/issues/43392 for following progress.
export const generateStaticParams =
  process.env.NODE_ENV != 'development'
    ? async function (): Promise<{ slug: string }[]> {
        return Object.entries(postMetas).map(([slug]) => ({ slug }))
      }
    : undefined
