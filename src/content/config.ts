import { z, defineCollection } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pub_date: z.string(),
    upd_date: z.string().optional(),
  }),
})

export const collections = {
  posts,
}
