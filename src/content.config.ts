import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: ({ image }) => z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string().trim().min(1)).default([]),
    // Missing draft flags fail safe: publication is an explicit choice.
    draft: z.boolean().default(true),
    cover: image().optional(),
  }).refine(({ date, updatedDate }) => !updatedDate || updatedDate >= date, {
    message: 'updatedDate must not precede date', path: ['updatedDate'],
  }),
});

export const collections = { writing };
