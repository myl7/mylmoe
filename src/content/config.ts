import { z, defineCollection } from "astro:content";

const LOCALE_REGEX = /^[a-z]+_[A-Z]+$/;

const postScheme = z.object({
  title: z.string(),
  pubDate: z.date(),
  updDate: z.date().optional(),
  unlisted: z.boolean().optional(),
  description: z.string(),
  locale: z
    .string()
    .optional()
    .refine((locale) => (locale ? LOCALE_REGEX.test(locale) : true), {
      message: "locale must be of the format `language_TERRITORY`",
    }),
});
export type PostScheme = z.infer<typeof postScheme>;
const posts = defineCollection({
  type: "content",
  schema: postScheme,
});

export const collections = {
  posts,
};
