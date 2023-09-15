// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

import 'katex/dist/katex.min.css'

import './hljs.scss'

import { serialize } from 'next-mdx-remote/serialize'
import { jsonLdScriptProps } from 'react-schemaorg'
import Link from 'next/link'

import MDXRemote from '@/app/mdx/mdxRemote'
import MDXImages from '@/app/mdx/mdxImages'
import { remarkPlugins, rehypePlugins } from '@/app/mdx/plugins'
import { postMetas, rawPosts } from '@/app/posts'

import Giscus from './giscus'

import type { Article } from 'schema-dts'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params: { slug } }: Props, _parent: ResolvingMetadata): Promise<Metadata> {
  const _meta = postMetas[slug]
  if (!_meta) {
    throw new Error(`Post ${slug} not found`)
  }
  const meta: typeof _meta & { description: typeof _meta.abstract; url: string } = {
    ..._meta,
    description: _meta.abstract,
    url: `/posts/${slug}`,
  }

  return {
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
      locale: meta.locale,
      publishedTime: `${meta.pubDate}T00:00:00.000Z`,
      modifiedTime: `${meta.updDate}T00:00:00.000Z`,
      authors: 'myl7',
      tags: meta.tags,
    },
  }
}

export default async function Page({ params: { slug } }: Props) {
  const meta = postMetas[slug]
  const rawPost = rawPosts[slug]
  if (!meta || !rawPost) {
    throw new Error(`Post ${slug} not found`)
  }
  const src = rawPost.src
  const format = rawPost.format ?? 'md'

  const mdxSrc = await serialize(src, {
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
          {meta.pubDate == meta.updDate ? (
            <>
              updated & published on <time>{meta.updDate}</time>
            </>
          ) : (
            <>
              updated on <time>{meta.updDate}</time> & published on <time>{meta.pubDate}</time>
            </>
          )}{' '}
          <Link href={`/raw/posts/${slug}.md`} className="text-blue hover:underline">
            raw
          </Link>
        </p>
        <hr className="border-bg-l4 dark:border-bg-d4" />
        <p>
          <span className="italic">Abstract:</span> {meta.abstract}
        </p>
        <hr className="border-bg-l4 dark:border-bg-d4" />
        <MDXImages images={rawPost.images ?? {}}>
          <MDXRemote {...mdxSrc} />
        </MDXImages>
        {/* Cuz post body uses gap-4 but the card uses gap-2, add pt-2 to increase the gap */}
        <div className="flex flex-col gap-1 pt-2">
          <hr className="border-bg-l4 dark:border-bg-d4" />
          <hr className="border-bg-l4 dark:border-bg-d4" />
        </div>
        <Giscus />
      </section>
    </main>
  )
}

// TODO: See root layout
export async function generateStaticParams() {
  return Object.entries(postMetas).map(([slug]) => ({ slug }))
}

export const dynamicParams = false
