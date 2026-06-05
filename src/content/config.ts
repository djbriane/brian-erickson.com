import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    description: z.string().min(1),
    draft: z.boolean().default(false),
    ghost_id: z.number().optional(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    status: z.enum(["active", "archived", "shipped"]),
    tags: z.array(z.string()).default([]),
    summary: z.string().min(1),
    subtitle: z.string().min(1),
    cover_image: z.string().optional(),
    links: z
      .object({
        live: z.string().url().optional(),
        github: z.string().url().optional(),
        case_study: z.string().url().optional(),
      })
      .default({}),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };

