import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts", ({ data: { unlisted } }) => unlisted != true);
  return rss({
    title: "myl7's Blog",
    description: "myl7's blog",
    site: context.site!,
    items: posts.map((post) => {
      const { title, pubDate, description } = post.data;
      return {
        title,
        link: `/p/${post.slug}`,
        pubDate,
        description,
        author: "myl@myl.moe (myl7)",
      };
    }),
  });
}
