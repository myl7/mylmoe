import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const posts = await getCollection('posts')
  return rss({
    title: "myl7's blog",
    description: "myl7's blog",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      link: `/p/${post.slug}`,
      pubDate: post.data.pubDate,
      // description: '' // TODO
      author: 'myl@myl.moe (myl7)',
    })),
  })
}
