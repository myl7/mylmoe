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
        },
      ],
      rehypeKatex,
    ],
  },
  output: 'hybrid',
  adapter: vercel({
    edgeMiddleware: true,
  }),
})
