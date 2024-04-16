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
})
