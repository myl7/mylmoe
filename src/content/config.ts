import { z, defineCollection } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updDate: z.date().optional(),
  }),
})

export interface PostFrontmatter {
  title: string
  pubDate: Date
  updDate?: Date
}

export const collections = {
  posts,
}
