# Authoring Guide

How to add and update content on `brian-erickson.com`.

This site is a static Astro app. Content lives in Git as Markdown and JSON. There is no CMS. Edit files locally, push to `main`, and Cloudflare Pages rebuilds automatically.

## Workflow

```bash
npm install
npm run dev      # preview at http://localhost:4321
npm test         # content smoke checks
npm run build    # astro check + static build into dist/
```

Then commit and push to `main`. Cloudflare Pages runs `npm run build` and publishes `dist/`.

## Content map

| What you want to change | Source file(s) | Public URL |
|-------------------------|----------------|------------|
| Blog post | `src/content/blog/<slug>.md` | `/blog/<slug>/` |
| Project case study | `src/content/projects/<slug>.md` | `/projects/<slug>/` |
| Homepage hero, résumé, contact | `src/data/resume.json` | `/`, `/resume/`, `/contact/` |
| Images | `public/images/...` | served at `/images/...` |
| Legacy URL redirects | `public/_redirects` | n/a |

Schema definitions live in `src/content.config.ts`. Shared helpers (publish rules, dates, reading time) live in `src/lib/content.ts`.

---

## Blog

### Current framing

The writing section is intentionally framed as a **historical archive**, not active publishing:

- Homepage section: **From the Archive** / “Past musings, preserved as context.”
- `/blog/` page: **From the Archive** / “Older posts preserved as history, with newer writing to follow.”
- Migrated Ghost posts carry `ghost_id` and show an **Originally published** cue on the post page.

The `/blog/` route and nav label **Writing** stay as-is. Only the surrounding copy treats the collection as archive material for now.

### Adding a post today (mechanically)

Create `src/content/blog/my-slug.md`. The filename becomes the URL slug: `/blog/my-slug/`.

```markdown
---
title: My Post Title
date: 2026-06-06
tags: [Product, Process]
description: One or two sentences for the listing card and meta description.
draft: false
---

Body in Markdown.
```

**Frontmatter fields**

| Field | Required | Notes |
|-------|----------|-------|
| `title` | yes | Post headline |
| `date` | yes | `YYYY-MM-DD`, interpreted as UTC |
| `description` | yes | Card excerpt and SEO meta description |
| `tags` | optional | Topic labels; defaults to `[]` |
| `draft` | optional | Defaults to `false` |
| `ghost_id` | optional | Only for migrated Ghost posts |

**Images**

Place files under `public/images/blog/` and reference them in the post:

```markdown
![Alt text](/images/blog/my-photo.jpg)
```

**Publish rules**

A post is public when both are true (`src/lib/content.ts`):

- `draft` is not `true`
- `date` is today or earlier (UTC)

Draft or future-dated posts are excluded from the build output, sitemap, `/blog/` listings, and the homepage preview.

**Where published posts appear**

- Post page: `/blog/<slug>/`
- Writing index: `/blog/` (10 posts per page, paginated)
- Homepage: latest 3 published posts in the archive preview section
- Sitemap: generated automatically

### Smoke test caveat

`test/contentSmoke.test.ts` currently assumes the blog is a **fixed migrated archive**:

- exactly **19** posts
- every post has `ghost_id`
- every post has `draft: false`

Leave that test as-is for now. Adding new writing will require test updates (post count, and likely splitting migrated-post checks from new-post checks) before `npm test` passes again.

### Before publishing new writing

The site copy still describes writing as archive-only. When you are ready to publish new posts, plan a small content pass to reframe the section—for example:

| File | Current archive framing |
|------|-------------------------|
| `src/pages/index.astro` | Eyebrow “From the Archive”; heading “Past musings, preserved as context.” |
| `src/pages/blog/index.astro` | Eyebrow “From the Archive”; lede “Older posts preserved as history, with newer writing to follow.” |
| `src/pages/404.astro` | Refers to “the writing archive” |
| `CONTEXT.md` | **Writing Archive** glossary entry |

New posts without `ghost_id` already render **Published** (not “Originally published”) on the post page. The index and homepage copy are what still need updating when new writing goes live.

Optional follow-ups when reframing:

- Update `CONTEXT.md` to reflect active writing, not archive-only
- Adjust smoke tests for a mix of migrated and new posts
- Consider whether homepage section title should change from **From the Archive**

---

## Projects

Projects have no draft gate. Every file in `src/content/projects/` becomes a live page at build time.

Create `src/content/projects/my-project.md`:

```markdown
---
title: My Project
date: 2026-06-06
status: active
tags: [Product, Maps]
summary: One-line hook for cards and SEO.
subtitle: Short clarifier under the title
cover_image: /images/projects/my-project.png
links:
  live: https://example.com
  github: https://github.com/you/repo
featured: false
---

Full case study in Markdown.
```

**Frontmatter fields**

| Field | Required | Notes |
|-------|----------|-------|
| `title` | yes | Project name |
| `date` | yes | Shown on detail page; sorts `/projects/` newest first |
| `status` | yes | `active`, `shipped`, or `archived` |
| `summary` | yes | Card blurb and meta description |
| `subtitle` | yes | Short line under the title |
| `tags` | optional | Topic labels |
| `cover_image` | optional | Path under `public/`; cards render without one |
| `links.live` | optional | “Live site” button |
| `links.github` | optional | “GitHub” button |
| `links.case_study` | optional | External writeup link |
| `featured` | optional | Homepage spotlight; defaults to `false` |

**Images**

Optional screenshots live in `public/images/projects/`. Reference with a root-relative path such as `/images/projects/my-project.png`.

**Where projects appear**

- Project index: `/projects/` (all projects, sorted by date)
- Case study: `/projects/<slug>/`
- Homepage: only one project with `featured: true` gets the large **Featured Work** panel

The homepage uses `.find()` on featured projects, so only the first match is shown. GPXplore is currently `featured: true`. Set `featured: false` on GPXplore before featuring a different project, or update `src/pages/index.astro` to support multiple featured items.

**Reference**

`src/content/projects/gpxplore.md` is the canonical example for frontmatter shape and long-form case study structure.

---

## Résumé and site identity

Structured résumé data lives in `src/data/resume.json`. It drives:

- Homepage hero (`basics.name`, `basics.title`, `basics.summary`)
- `/resume/`
- `/contact/` (email, LinkedIn, GitHub links)

**`basics` fields**

| Field | Used on |
|-------|---------|
| `name` | Homepage hero title, résumé page heading |
| `title` | Homepage hero tagline, résumé page lede |
| `summary` | Homepage about section, résumé intro |
| `location` | Résumé page |
| `email` | Contact page (`contact@brian-erickson.com` by default) |
| `linkedin` | Contact page |
| `github` | Contact page (optional) |

**`experience` entries**

Each entry supports `company`, `title`, `start`, `end`, `description`, and optional `highlights` (bullet list).

**`education` entries**

Each entry supports `institution`, `degree`, and optional `year`.

**`skills`**

Object of named groups to string arrays, rendered on `/resume/`.

**Résumé PDF**

Drop `public/resume.pdf` to show a **Download PDF** link on `/resume/`. Omit the file and no link is rendered.

There is no separate “publish” step for résumé changes. Edit the JSON, verify locally, and push to `main`.

---

## Quick reference

**Draft a blog post while writing**

```yaml
draft: true
```

**Schedule a blog post**

```yaml
draft: false
date: 2026-06-15   # publishes on or after this UTC date
```

**Spotlight a project on the homepage**

```yaml
featured: true
```

**Legacy Ghost redirects**

Old root-level post URLs are hand-maintained in `public/_redirects`. New posts do not need redirects unless you are preserving an old URL path.
