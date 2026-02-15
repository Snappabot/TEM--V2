import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string(),
    featuredImage: z.string().optional(),
    author: z.string().default('Troweled Earth'),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
