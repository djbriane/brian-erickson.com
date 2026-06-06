# Portfolio Theme Refresh

Status: Built.

Shipped on `main`. The site runs as static Astro output on Cloudflare Pages (`npm run build` → `dist/`).

Supersedes the homepage-only portfolio refresh direction that kept the Casper/Ghost first viewport as the primary design constraint.

Implementation note: the copied Astro theme reference was removed after the design was adapted into the live app, so this spec remains the canonical record for the refresh direction.

## Summary

Replace the current Ghost/Casper-inspired visual direction with a whole-site portfolio theme adapted from the Astro theme reference. The refresh should make the site feel like a current professional portfolio for evaluating Brian's product judgment, technical fluency, and shipped work, while preserving the existing v1 content model, routes, migrated archive content, legacy redirects, and static Cloudflare Pages deployment posture.

Before theme implementation proceeds, upgrade the project to the current supported Astro major and verify the existing site still passes tests and build.

## Goals

- Upgrade Astro and official Astro integrations to the current supported major before visual replacement work begins.
- Apply a whole-site portfolio visual system reimplemented inside the existing app structure.
- Replace the full-screen Ghost cover with the reference theme's shorter portfolio hero pattern.
- Use `Brian Erickson` as the dominant homepage hero signal, with the current identity line as supporting copy.
- Put GPXplore immediately after the hero as the primary evidence section.
- Keep the homepage GPXplore treatment as a strong featured-work teaser, not a mini case study.
- Keep a compact `From the Archive` writing section near the bottom of the homepage.
- Restyle blog, project, resume, contact, and 404 pages into the new portfolio/prose system.
- Add default Open Graph and Twitter image support using the hero image.
- Keep the theme token-ready for a future dark mode pass.

## Non-Goals

- Do not preserve the current Casper/Ghost visual direction as a constraint.
- Do not add new routes or features such as RSS, tag pages, search, dark mode, or a now page.
- Do not add React, Vue, Svelte, or other JavaScript islands.
- Do not add a contact form.
- Do not add `@astrojs/cloudflare`, Wrangler, SSR, Pages Functions, Workers configuration, or runtime bindings.
- Do not add MDX unless a separate content decision requires it.
- Do not rename `/blog/` to `/writing/`.
- Do not rename the `blog` content collection.
- Do not change the project content schema to match the reference theme.
- Do not implement image optimization or migrate to Astro image components in this pass.
- Do not replace the current favicon unless it is clearly broken or placeholder.
- Do not rewrite blog post bodies.
- Do not finalize substantive resume content in this phase.

## Locked Invariants

- `/blog/` remains the writing route, and the nav label remains `Writing`.
- Ghost slug redirects stay intact.
- Blog collection stays `blog`; no rename to `writing`.
- Project collection keeps the current schema.
- Resume/homepage identity continues to source from `src/data/resume.json`.
- GPXplore remains the single featured v1 project.
- Draft and future-dated posts remain unpublished everywhere public.
- Migrated posts keep a subtle historical/originally-published cue.
- Analytics remain config-gated by `CLOUDFLARE_ANALYTICS_TOKEN`.
- Static output remains the v1 deployment model.

## Astro Upgrade

The site should not launch on Astro 4 unless a concrete blocker is discovered. Upgrade to the current supported Astro major before starting theme implementation.

Acceptance for the upgrade gate:

- Astro and official Astro integrations are upgraded together.
- `npm test` passes.
- `npm run build` passes.
- Static output still builds to `dist/`.
- No Cloudflare adapter, SSR, Workers, or Pages Functions are introduced.

If the current major introduces an unexpected blocker, document the exact blocker in the orchestrator before deciding whether to pin to an older major.

## Cloudflare Deployment Posture

Keep the v1 deployment model simple:

- Astro static/default output.
- Cloudflare Pages builds with `npm run build`.
- Cloudflare Pages publishes `dist/`.
- No Cloudflare adapter for v1.
- No runtime backend for v1.

Re-evaluate this only if a future feature needs server rendering, bindings, sessions, Actions, or runtime APIs.

## Design Direction

Adapt, do not wholesale copy, the reference theme.

Use the useful reference patterns:

- `tokens.css` as the design-token boundary.
- Space Grotesk Variable for display text.
- DM Sans Variable for body text.
- Warm paper background, dark ink, muted text, deep coral accent, cool slate tag accent, and soft rule lines.
- Restrained sticky global header.
- Sparse sections, cards, metadata rows, tags, and prose/list rhythm.
- A shorter image-backed portfolio hero.

Do not copy reference assumptions:

- `/writing` routes.
- `writing` collection.
- Reference sample content.
- Reference project schema fields such as `focus`, `started`, `url`, or `order`.
- MDX dependency unless separately justified.

Exact color token values may be tuned during implementation and visual QA, but the palette direction is locked.

## Typography

Switch from the Ghost-era Open Sans and Merriweather pairing to:

- `@fontsource-variable/space-grotesk`
- `@fontsource-variable/dm-sans`

Remove unused old font packages as part of the implementation.

## Homepage

The homepage flow should be:

1. Hero with `Brian Erickson` as the dominant text and the current identity line as supporting copy.
2. GPXplore featured-work teaser.
3. Optional short bridge to resume/contact if it helps the flow.
4. Compact `From the Archive` writing section near the bottom.

Remove the standalone proof-point trio from the old draft implementation. Language such as product judgment, technical fluency, and real-world fit may be reused in hero, GPXplore, resume, project, or contact framing copy where it is supported by evidence.

Keep the existing cover image as the initial hero background. Use the new theme treatment to desaturate, brighten, overlay, or crop it as needed. Replacing the asset is out of scope unless the image proves unusable.

## GPXplore

Homepage GPXplore treatment should include:

- Title.
- Subtitle.
- Summary.
- Status.
- Tags/focus labels from the current project schema.
- `Read case study` link.
- `Visit GPXplore` link when `links.live` is present.
- Optional two or three concise capability bullets.

Do not require a screenshot for the section to work. The project cover image remains optional.

## Writing Archive

The blog archive should feel integrated into the new portfolio theme, not visually trapped in the Ghost/Casper era.

Change:

- Remove Casper ornamentation such as centered dot dividers and old index rhythm.
- Use the new theme's metadata, tag, list, and prose styles.

Preserve:

- `/blog/` route.
- `Writing` nav label.
- Published-post filtering.
- Tags.
- Migrated-post cues.
- Blog post body content.

The homepage archive preview should remain compact, show no more than three posts, and stay visually secondary to GPXplore.

## Projects

Project index/cards and project detail pages should adopt the new sparse theme treatment while keeping the current project schema:

- `title`
- `subtitle`
- `summary`
- `status`
- `tags`
- optional `cover_image`
- `links.live`
- `links.github`
- `links.case_study`

Do not switch to the reference theme's project schema in this pass.

## Resume

Theme the `/resume/` route structurally, but do not treat final resume content quality as part of this spec.

Acceptance:

- The page works with the current structured resume data.
- Sections, dates, lists, and contact basics are readable.
- Empty or missing optional fields do not break layout.
- Visual treatment matches the new theme.

Substantive resume content population is out of scope until design/layout is finalized. Production/build validation should still protect launch from obvious placeholder resume content.

## Contact

Keep `/contact/` simple and static:

- No form.
- No runtime backend.
- Clear contact copy and links.
- Visual treatment matches the new theme.

## 404

Include `/404/` in the theme refresh. It should use the shared theme, communicate clearly, and provide a route back to useful site areas without being over-designed.

## SEO And Social

Keep existing title, description, canonical, and analytics behavior. Add default social image support:

- Default `og:image` uses the hero image.
- Twitter image metadata uses the same default.
- No dynamic OG image generation.

## Copy Boundaries

Non-blog-post copy is fair game where it supports the new theme and site purpose:

- Homepage headings and CTAs.
- Project index/detail framing.
- Resume page framing.
- Contact copy.
- Labels, metadata language, and empty states.

Do not rewrite blog post bodies. Do not finalize substantive resume content in this phase.

## Accessibility

Acceptance includes light manual accessibility checks:

- Single sensible `h1` per page.
- Keyboard-visible focus states.
- Header/nav links remain readable over sticky backgrounds.
- Color contrast is adequate for text, metadata, tags, and buttons.
- Images keep meaningful `alt` text where content-bearing and empty alt where decorative.
- No text overlap, clipped content, or incoherent layering at target viewports.

Automated accessibility tooling is out of scope for this spec.

## Verification

Run after each implementation phase:

- `npm test`
- `npm run build`

Final visual QA should be an intentional orchestrator step, not mixed casually into every edit loop. Check at 375px, 768px, and desktop widths across:

- `/`
- `/projects/`
- `/projects/gpxplore/`
- `/blog/`
- At least one migrated post.
- `/resume/`
- `/contact/`
- `/404/`

Visual QA should check header legibility, hero framing, card/list rhythm, readable prose, archive cues, color contrast, and absence of text overlap.
