# brian-erickson.com

Static personal site for Brian Erickson: professional presence, resume, GPXplore project showcase, and migrated Ghost writing archive.

Current build spec: [brian-erickson-com-v1-spec.md](brian-erickson-com-v1-spec.md).

## Project Docs

| File | Purpose |
|------|---------|
| [CONTEXT.md](CONTEXT.md) | Domain glossary and content source-of-truth decisions |
| [AGENTS.md](AGENTS.md) | AI assistant workflow and repo conventions |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Human-oriented contribution workflow |
| [CODEX.md](CODEX.md) | Codex quick reference |
| [CLAUDE.md](CLAUDE.md) | Claude Code quick reference |
| [specs/roadmap--ongoing.md](specs/roadmap--ongoing.md) | Forward work index |
| [specs/backlog--ongoing.md](specs/backlog--ongoing.md) | Unscheduled follow-ups |
| [specs/spec-status--ongoing.md](specs/spec-status--ongoing.md) | Implementation status |
| [specs/release-notes--ongoing.md](specs/release-notes--ongoing.md) | Release history |

## Local Development

```bash
npm install
npm run dev      # local dev server at http://localhost:4321
npm test         # migration + content smoke tests
npm run build    # astro check + static build into dist/
```

## Authoring Guide

All content is plain files in Git. Edit, commit, push to `main`, and Cloudflare Pages deploys.

### Publish a blog post

Create `src/content/blog/my-slug.md` (the filename becomes the URL: `/blog/my-slug/`):

```markdown
---
title: My Post Title
date: 2026-06-10            # YYYY-MM-DD, UTC. A future date keeps it unpublished.
tags: [Product, Process]
description: One or two sentences used for the card excerpt and meta description.
draft: false               # true keeps it out of every public surface
---

Body in Markdown.
```

`ghost_id` is only on migrated archive posts; leave it off new posts. Posts with a
`ghost_id` show an "Originally published" cue.

### Add a project

Create `src/content/projects/my-slug.md`:

```markdown
---
title: Project Name
date: 2026-01-01
status: active             # active | shipped | archived
tags: [React, Cloudflare]
summary: One-line hook shown on the project card.
subtitle: Short clarifier            # e.g. "Backcountry route planner"
featured: true             # true => shows in homepage Featured Work
cover_image: /images/projects/my-slug.png   # optional; cards render fine without it
links:
  live: https://example.com           # all optional
  github: https://github.com/you/repo
  case_study: https://example.com/writeup
---

Full case study in Markdown.
```

### Update the resume

Edit `src/data/resume.json`. It is the single source for the homepage tagline,
`/resume`, and `/contact`. Required production fields: `basics` name/title/summary/
location/email/linkedin, at least one complete experience entry, education entries,
and non-empty skill groups (`github` is optional). The homepage hero uses
`basics.name` (cover title) and `basics.title` (cover tagline).

### Resume PDF

Drop a `public/resume.pdf` to surface a "Download PDF" link on `/resume`; omit the
file and no dead link renders.

### GPXplore screenshots

Place real screenshots under `public/images/projects/` and set `cover_image` in
`src/content/projects/gpxplore.md`.

### Drafts and scheduled posts

Set `draft: true`, or use a future UTC `date`, to keep a post out of the build,
sitemap, and listings until you're ready.

## Ghost Migration

The published Ghost archive has already been migrated. To regenerate it from the
sanitized export (`specs/refs/brian-erickson.ghost.2026-06-05.json`):

```bash
npm run migrate:ghost            # idempotent: never overwrites existing markdown
npm run migrate:ghost -- --force # regenerate posts, images, About, and redirects
```

It writes posts to `src/content/blog/`, copies referenced images to
`public/images/blog/`, extracts the stale About page to `src/data/about.md` (reference
only — not published), and rebuilds `public/_redirects` (preserving the manual section).

## Deployment

Static `dist/` output deploys to Cloudflare Pages (build command `npm run build`,
output `dist/`, Node 20). Set `CLOUDFLARE_ANALYTICS_TOKEN` in the Pages dashboard only
if you want Cloudflare Web Analytics; the snippet is omitted when it is unset. Account
setup (GitHub repo, Pages connection, DNS) is owner-managed — see the build spec.
