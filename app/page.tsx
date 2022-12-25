import { serialize } from 'next-mdx-remote/serialize'

import { MDXRemote } from './mdxRemote'
import { remarkPlugins, rehypePlugins } from './mdxPlugins'

import myl7Src from './myl7.md?raw'

export default async function HomePage() {
  const mdxSrc = await serialize(myl7Src, { mdxOptions: { remarkPlugins, rehypePlugins, format: 'md' } })

  return (
    <>
      <section className="flex flex-col gap-2 rounded border-2 border-bg-l4 bg-bg-l1 p-2 dark:border-bg-d4 dark:bg-bg-d1">
        <h1 className="font-serif text-2xl">Welcome to mylmoe: myl7's blog!</h1>
        <h2 className="font-serif text-xl">I am myl7:</h2>
        <MDXRemote {...mdxSrc} />
      </section>
      <section className="rounded border-2 border-bg-l4 bg-bg-l1 p-2 dark:border-bg-d4 dark:bg-bg-d1">
        Hello, world!
      </section>
    </>
  )
}
