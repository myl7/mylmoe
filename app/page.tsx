// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import { serialize } from 'next-mdx-remote/serialize'

import { MDXRemote } from './mdxRemote'
import { remarkPlugins, rehypePlugins } from './mdxPlugins'
import { postMetas } from './posts/posts'

import myl7Src from './myl7.md?raw'

export default async function HomePage() {
  const mdxSrc = await serialize(myl7Src, { mdxOptions: { remarkPlugins, rehypePlugins, format: 'md' } })

  return (
    <main className="flex flex-col gap-4">
      <section className="flex flex-col gap-2 rounded border-2 border-bg-l4 bg-bg-l1 p-2 font-serif dark:border-bg-d4 dark:bg-bg-d1">
        <h1 className="text-2xl">Welcome to mylmoe: myl7's blog!</h1>
        <h2 className="text-xl">I am myl7:</h2>
        <MDXRemote {...mdxSrc} />
      </section>
      <section className="grid grid-cols-1 gap-4 font-serif md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Object.entries(postMetas).map(([slug, meta]) => (
          <div key={slug}>
            <a href={`/posts/${slug}`} className="group">
              <article className="flex flex-col gap-1 rounded border-2 border-bg-l4 bg-bg-l1 p-2 ring-blue group-hover:ring-2 dark:border-bg-d4 dark:bg-bg-d1">
                <h2 className="text-xl">{meta.title}</h2>
                <hr className="border-bg-l4 dark:border-bg-d4" />
                <p className="text-sm">
                  {meta.pubDate == meta.updDate
                    ? `updated & published on ${meta.updDate}`
                    : `updated on ${meta.updDate} & published on ${meta.pubDate}`}
                </p>
                <hr className="border-bg-l4 dark:border-bg-d4" />
                <p>{meta.abstract}</p>
                <hr className="border-bg-l4 dark:border-bg-d4" />
                <div className="flex w-full flex-wrap gap-1 py-0.5">
                  {meta.tags.map((tag) => (
                    <span className="rounded border border-bg-l4 bg-bg-l2 px-1 dark:border-bg-d4 dark:bg-bg-d2">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </a>
          </div>
        ))}
      </section>
    </main>
  )
}
