# Backlog

Ideas and follow-ups that are out of scope for active work but worth keeping. When something is ready to build, promote it into a dedicated `specs/*--planned.md` file or add it to [roadmap--ongoing.md](roadmap--ongoing.md).

Status key: unchecked = idea; no implementation target yet.

---

## Quick Wins

- [ ] Polish the homepage cover hero on small screens (≤375px): the cover title and overlay nav are clipped on the right at the narrowest widths. Needs a responsive width/clamp pass on `.site-cover__inner`, `.site-cover__title`, and the overlay `.site-nav`. Desktop and tablet render correctly.
- [ ] Add RSS feed via `@astrojs/rss` if it remains simple.
- [ ] Add reading time to blog index rows.
- [ ] Add `/blog/tags/[tag]/` pages and tag-filtered archive views.
- [ ] Add a real GPXplore cover screenshot once Brian provides one.
- [ ] Add optional `og:image` defaults for homepage/project pages.

## Medium Enhancements

- [ ] Add `/now/` page backed by a single markdown file.
- [ ] Add Pagefind search once writing/project content volume warrants it.
- [ ] Add dark mode using existing design tokens.
- [ ] Auto-generate resume PDF from `resume.json`.
- [ ] Auto-generate per-post OG images with Satori or a static template.

## Content Follow-Ups

- [ ] Manually review external links flagged by the migration link audit.
- [ ] Refresh archive descriptions where generated excerpts feel weak.
- [ ] Add a second real project case study when there is enough substance.
- [ ] Decide whether to publish the GPXplore GitHub link once that repo is public.

## Out of Scope for v1

- CMS UI
- Ghost backend/API
- Auth or member gating
- Comments
- Contact form/backend
- Analytics dashboard or event tracking

