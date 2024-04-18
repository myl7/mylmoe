import { defineConfig } from 'astro/config'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import remarkToc from 'remark-toc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel/serverless'
import { Link2 } from 'lucide'
import { visit } from 'unist-util-visit'
import { heading } from 'hast-util-heading'
import iconNodeToHast from './src/lib/iconNodeToHast'
import { h } from 'hastscript'

// https://astro.build/config
export default defineConfig({
  site: 'https://myl.moe',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  redirects: {
    '/ssh': {
      status: 301,
      destination: '/ssh.pub',
    },
    '/gpg': {
      status: 301,
      destination: '/gpg.asc',
    },
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'one-dark-pro',
      },
    },
    remarkPlugins: [remarkToc, remarkMath],
    rehypePlugins: [
      rehypeRaw,
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          content: [iconNodeToHast([Link2[0], { ...Link2[1], class: 'inline w-5 h-5' }, Link2[2]])],
        },
      ],
      function () {
        return (tree) => {
          visit(
            tree,
            (node) => heading(node),
            (_, index, parent) => {
              parent!.children.splice(index! + 1, 0, h('hr'))
            },
          )
        }
      },
      rehypeKatex,
    ],
  },
  output: 'hybrid',
  adapter: vercel({
    edgeMiddleware: true,
  }),
})
