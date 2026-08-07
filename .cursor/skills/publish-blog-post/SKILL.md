---
name: publish-blog-post
description: >-
  Publish a Daring Fireball-style link post to src/content/blog/. Use when the
  user wants a new blog post, link post, writing about an article URL, a pull
  quote with commentary, or to ship a post to the Writing archive.
---

# Publish blog post

Default form: a **link post** — source article, one pull quote, short commentary.

Ready to ship means write a publishable markdown file. Do not commit or open a PR unless the user asks.

## Workflow

Copy and track:

```text
Link post:
- [ ] Inputs gathered
- [ ] Source read; pull quote chosen
- [ ] Body drafted in archive voice
- [ ] File written under src/content/blog/
- [ ] Smoke tests still green
- [ ] Path + URL preview shown to user
```

### 1. Gather inputs

Need:

| Input | Required? |
|-------|-----------|
| Source URL | Yes |
| Brian's angle / thoughts | Prefer yes — ask once if missing |
| Preferred pull quote | Optional |
| Title | Optional — derive from topic if absent |
| Tags | Optional — default `[]` |
| Publish date | Optional — default today UTC `YYYY-MM-DD` |

Done when: URL is known, and either thoughts exist or the user explicitly wants quote-only (attribution + quote, no commentary).

### 2. Read the source

Fetch the article. Choose one pull quote that carries the point — prefer a sharp paragraph over a long excerpt.

Done when: quote text is copied accurately (fix OCR/encoding artifacts; keep the author's wording).

### 3. Draft the body

Shape (see [examples.md](examples.md)):

1. **Attribution line** — author or outlet, linked to the source (or the specific piece), plus a short clause for why it matters.
2. **Pull quote** — markdown blockquote (`>`).
3. **Commentary** — usually 1–3 short paragraphs in first person. Connect to product, process, or lived experience when it fits. Skip this only for quote-only posts.

Voice: conversational, concise, opinionated without throat-clearing. Match the migrated archive link posts — not essay length.

Done when: body reads as one short composition (attribution → quote → take), not a summary of the whole article.

### 4. Write the file

Slug: kebab-case from the title. If `src/content/blog/<slug>.md` exists, pick a distinct slug.

Frontmatter (Astro collection in `src/content.config.ts`):

```yaml
---
title: Example Title
date: "YYYY-MM-DD"
tags: []
description: "One or two sentences for SEO/listings — usually attribution + start of the quote, truncated naturally."
draft: false
---
```

Rules:

- Omit `ghost_id` (new posts are not migrated).
- `draft: false` and `date` ≤ today UTC so `isPublishedPost` includes it.
- `description` is required and non-empty; write it for humans skimming `/blog/`, not as a keyword dump.
- Quote tags only when they clearly fit (see existing tag strings in the collection); otherwise `tags: []`.

Done when: the file exists at `src/content/blog/<slug>.md` with valid frontmatter and body.

### 5. Keep tests green

`test/contentSmoke.test.ts` must allow non-migrated posts (no `ghost_id` on every file; no fixed total equal only to the archive count).

If a new post would fail smoke checks, update those assertions in the same change — keep migrated-post guarantees (`ghost_id` present on archive entries) without blocking new writing.

Run `npm test`. Fix failures before stopping.

Done when: `npm test` passes.

### 6. Hand off

Tell the user:

- File path
- Public URL path: `/blog/<slug>/`
- That the file is ready to ship; commit/PR only if they ask

## Out of scope (for now)

Long original essays, image-heavy posts, and scheduled (`date` in the future) or `draft: true` posts — ask before doing those instead of stretching this workflow.
