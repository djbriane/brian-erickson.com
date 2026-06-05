import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.string().default('In progress'),
    focus: z.array(z.string()).default([]),
    started: z.string().optional(),
    role: z.string().optional(),
    url: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, writing };
