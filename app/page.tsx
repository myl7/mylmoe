// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

import { serialize } from 'next-mdx-remote/serialize'
import { MdLaunch } from 'react-icons/md'

import MDXRemote from '@/app/mdx/mdxRemote'
import { remarkPlugins, rehypePlugins } from '@/app/mdx/plugins'
import { postMetas } from '@/app/posts'

import myl7Src from './myl7.md?raw'
import friends from './friends'

import type { Metadata } from 'next'

const meta = {
  title: "mylmoe: myl7's blog",
  description:
    'Welcome to mylmoe! I am myl7, and mylmoe is my blog containing my profile with a CV, posts mainly about computer science, and other fun or useful stuff like utilities and file sharing.',
  url: '/',
}

export const metadata: Metadata = {
  description: meta.description,
  alternates: {
    canonical: meta.url,
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.url,
    siteName: 'mylmoe',
    type: 'website',
  },
}

export default async function Page() {
  const mdxSrc = await serialize(myl7Src, { mdxOptions: { remarkPlugins, rehypePlugins, format: 'md' } })

  return (
    <main className="flex flex-col gap-4">
      <section className="flex flex-col gap-2 rounded border-2 border-bg-l4 bg-bg-l1 p-2 font-serif dark:border-bg-d4 dark:bg-bg-d1">
        <h1 className="text-2xl">{"Welcome to mylmoe: myl7's blog!"}</h1>
        <h2 className="text-xl">I am myl7:</h2>
        <MDXRemote {...mdxSrc} />
      </section>
      <section>
        <details open>
          <summary className="cursor-pointer rounded border-2 border-bg-l4 bg-bg-l1 p-2 marker:text-xl dark:border-bg-d4 dark:bg-bg-d1">
            <h2 className="inline-block text-xl">Subprojects in the website:</h2>
          </summary>
          <div className="grid grid-cols-1 gap-4 pt-4 font-serif md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div>
              <a href="/brotli" className="group block">
                <article className="flex flex-col gap-1 rounded border-2 border-t-[6px] border-bg-l4 bg-bg-l1 p-2 pt-1 ring-blue group-hover:ring-2 dark:border-bg-d4 dark:bg-bg-d1">
                  <h2 className="text-xl">Brotli encode/decode tool</h2>
                  <hr className="border-bg-l4 dark:border-bg-d4" />
                  <p>
                    Encode/decode (a.k.a. compress/decompress) data in Brotli format locally in browser. All processing
                    is literally done locally with WebAssembly to keep data safe.
                  </p>
                </article>
              </a>
            </div>
            <div>
              <a href="/nmconn" className="group block">
                <article className="flex flex-col gap-1 rounded border-2 border-t-[6px] border-bg-l4 bg-bg-l1 p-2 pt-1 ring-blue group-hover:ring-2 dark:border-bg-d4 dark:bg-bg-d1">
                  <h2 className="text-xl">
                    Generate the NetworkManager nmconnection file for the Wi-Fi with WPA & WPA2 Enterprise + PEAP
                  </h2>
                  <hr className="border-bg-l4 dark:border-bg-d4" />
                  <p>
                    Wi-Fi with WPA & WPA2 Enterprise + PEAP is commonly used in the networks of universities, e.g.,
                    eduroam. Unlike Windows/Android which work out of the box, Linux, e.g., with GNOME, has issues when
                    connecting with the GUI. This tool generates the NetworkManager config file directly to make the
                    connection simple and painless. All processing is literally done locally to keep data safe.
                  </p>
                </article>
              </a>
            </div>
          </div>
        </details>
      </section>
      <section>
        <details open>
          <summary className="cursor-pointer rounded border-2 border-bg-l4 bg-bg-l1 p-2 marker:text-xl dark:border-bg-d4 dark:bg-bg-d1">
            <h2 className="inline-block text-xl">Blog posts:</h2>
          </summary>
          <div className="grid grid-cols-1 gap-4 pt-4 font-serif md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Object.entries(postMetas)
              .sort(([slug1, meta1], [slug2, meta2]) => {
                const updCmp = -meta1.updDate.localeCompare(meta2.updDate)
                if (updCmp != 0) return updCmp
                const pubCmp = -meta1.pubDate.localeCompare(meta2.pubDate)
                if (pubCmp != 0) return pubCmp
                return slug1.localeCompare(slug2)
              })
              .map(([slug, meta]) => (
                <div key={slug}>
                  <a href={`/posts/${slug}`} className="group block">
                    <article className="flex flex-col gap-1 rounded border-2 border-t-[6px] border-bg-l4 bg-bg-l1 p-2 pt-1 ring-blue group-hover:ring-2 dark:border-bg-d4 dark:bg-bg-d1">
                      <h2 className="text-xl">{meta.title}</h2>
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
                      <p>{meta.abstract}</p>
                      <hr className="border-bg-l4 dark:border-bg-d4" />
                      <div className="flex w-full flex-wrap gap-1 py-0.5">
                        {meta.tags.map((tag) => (
                          <span
                            className="rounded border border-bg-l4 bg-bg-l2 px-1 dark:border-bg-d4 dark:bg-bg-d2"
                            key={tag}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  </a>
                </div>
              ))}
          </div>
        </details>
      </section>
      <section className="flex flex-col gap-2 rounded border-2 border-bg-l4 bg-bg-l1 p-2  font-serif dark:border-bg-d4 dark:bg-bg-d1">
        <details open>
          <summary className="cursor-pointer marker:text-xl">
            <h2 className="inline-block text-xl">Friends:</h2>
          </summary>
          <div className="flex flex-col gap-1 pt-1">
            <hr className="border-bg-l4 dark:border-bg-d4" />
            <ul className="flex list-inside list-disc flex-wrap gap-4">
              {friends.map((friend) => (
                <li key={friend.name}>
                  <a href={friend.url} rel="noopener" className="text-blue hover:underline">
                    {friend.name}
                    <MdLaunch className="inline-block h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
            <p>Feel free to request a friend link if you have met me in reality!</p>
          </div>
        </details>
      </section>
    </main>
  )
}
