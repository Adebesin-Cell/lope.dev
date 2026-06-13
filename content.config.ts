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
        // Points search engines at the original (e.g. Medium) so a self-hosted
        // copy isn't flagged as duplicate content.
        canonical: z.string().optional(),
      }),
    }),
  },
})
