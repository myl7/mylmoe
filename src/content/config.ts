import { z, defineCollection } from 'astro:content'

const postScheme = z.object({
  title: z.string(),
  pubDate: z.date(),
  updDate: z.date().optional(),
})
export type PostScheme = z.infer<typeof postScheme>
const posts = defineCollection({
  type: 'content',
  schema: postScheme,
})

export const collections = {
  posts,
}
