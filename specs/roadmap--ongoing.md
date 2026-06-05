# Product Roadmap

Read this first for forward work. Shipped work lives in `specs/built/`; implementation audit lives in [spec-status--ongoing.md](spec-status--ongoing.md); unscheduled ideas live in [backlog--ongoing.md](backlog--ongoing.md).

For vocabulary and content-source decisions, see [CONTEXT.md](../CONTEXT.md).

---

## Product Vision

A static personal site where Brian can:

1. Present a current professional identity and complete resume.
2. Showcase GPXplore as a real product/project case study.
3. Preserve the Ghost writing archive with working URLs and images.
4. Publish new writing and resume/project updates through Git-based content files.
5. Deploy through Cloudflare Pages without maintaining a server or CMS.

---

## Global Decisions

- **Stack:** Astro static output, vanilla CSS custom properties, Astro content collections.
- **Deployment:** Cloudflare Pages; Brian owns GitHub/Cloudflare/DNS account setup.
- **No runtime backend in v1:** no auth, comments, forms, server-side CMS, or Ghost API.
- **Current identity source:** `src/data/resume.json`.
- **Archive source:** migrated Ghost markdown under `src/content/blog/`.
- **Featured project:** GPXplore only for v1.
- **Analytics:** optional and config-gated.
- **Publication filter:** not draft and date is today or earlier in UTC.

---

## Active Specs

| Spec | Summary |
|------|---------|
| [brian-erickson-com-v1--planned.md](brian-erickson-com-v1--planned.md) | Primary v1 build: Astro site, Ghost migration, GPXplore project, resume, redirects, authoring docs. |
| [portfolio-theme-refresh--planned.md](portfolio-theme-refresh--planned.md) | Whole-site portfolio theme replacement adapted from the Astro theme reference, preceded by an Astro current-major upgrade. |

Promote larger backlog items into `specs/*--planned.md` before implementation.

---

## Fast Follow Themes

| Theme | Notes |
|-------|-------|
| RSS feed | P1 if cheap via `@astrojs/rss`; exclude drafts/future posts. |
| Blog tags | Tag filtering and `/blog/tags/[tag]/` pages. |
| Now page | Single markdown file once Brian wants a lightweight current-status page. |
| Search | Pagefind when content volume justifies it. |
| Dark mode | Token swap only after light theme ships cleanly. |

---

## Spec Index

| Location | Role |
|----------|------|
| `specs/roadmap--ongoing.md` | Forward work index |
| [spec-status--ongoing.md](spec-status--ongoing.md) | Shipped / partial / outstanding audit |
| [backlog--ongoing.md](backlog--ongoing.md) | Unscheduled ideas |
| [release-notes--ongoing.md](release-notes--ongoing.md) | Chronological PR/release history |
| [../CONTEXT.md](../CONTEXT.md) | Domain glossary and content-source decisions |
| `specs/built/` | Shipped feature specs |
| `specs/refs/` | Stable reference docs |
