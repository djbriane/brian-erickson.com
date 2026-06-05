import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
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
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
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
        live: z.url().optional(),
        github: z.url().optional(),
        case_study: z.url().optional(),
      })
      .default({}),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
