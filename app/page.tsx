import { serialize } from 'next-mdx-remote/serialize'

import { MDXRemote } from './mdxRemote'
import { remarkPlugins, rehypePlugins } from './mdxPlugins'

import myl7Src from './myl7.md?raw'

export default async function HomePage() {
  const mdxSrc = await serialize(myl7Src, { mdxOptions: { remarkPlugins, rehypePlugins, format: 'md' } })

  return (
    <main className="flex flex-col gap-4 p-4">
      <section className="bg-bg-l1 dark:bg-bg-d1 p-2 rounded flex flex-col gap-2">
        <h1 className="font-serif text-2xl">Welcome to mylmoe: myl7's blog!</h1>
        <h2 className="font-serif text-xl">I am myl7:</h2>
        <MDXRemote {...mdxSrc} />
      </section>
      <section className="bg-bg-l1 dark:bg-bg-d1 py-2 px-4 rounded">Hello, world!</section>
    </main>
  )
}
