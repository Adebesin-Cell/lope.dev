import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string(),
        readingTime: z.string().optional(),
        lang: z.string().optional(),
        draft: z.boolean().optional(),
        canonical: z.string().optional(),
      }),
    }),
  },
})
