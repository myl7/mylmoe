// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { serialize } from 'next-mdx-remote/serialize'

import { MDXRemote } from '@/app/mdx/mdxRemote'
import { remarkPlugins, rehypePlugins } from '@/app/mdx/plugins'
import { postMetas, rawPosts } from '@/app/posts'

interface Params {
  slug: string
}

export default async function PostPage({ params: { slug } }: { params: Params }) {
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
    <>
      <section className="flex flex-col gap-2 rounded border-2 border-bg-l4 bg-bg-l1 p-2 dark:border-bg-d4 dark:bg-bg-d1">
        {/* TODO: Metadata display */}
        <h1 className="font-serif text-2xl">{meta.title}</h1>
        {/* <h2 className="font-serif text-xl"></h2> */}
        <MDXRemote {...mdxSrc} />
      </section>
    </>
  )
}

// TODO: Fix the error when using generateStaticParams with next/headers:
// Error: Dynamic server usage: headers
// See https://github.com/vercel/next.js/issues/43427 and https://github.com/vercel/next.js/issues/43392 for following progress.
export const generateStaticParams =
  process.env.NODE_ENV != 'development'
    ? async function (): Promise<Params[]> {
        return Object.entries(postMetas).map(([slug]) => ({ slug }))
      }
    : undefined
