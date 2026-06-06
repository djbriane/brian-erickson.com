# Domain Glossary — brian-erickson.com

This file is a glossary and source-of-truth map only. No implementation scratch pad.
When terms here conflict with code or specs, update this file to reflect the resolved meaning.

---

## Professional Presence

The main job of the site: help someone evaluating Brian professionally understand his product judgment, technical fluency, and shipped work quickly. The homepage leads with current identity and GPXplore, not old blog posts.

## Current Identity

Brian's present professional framing. Canonical source: `src/data/resume.json`, especially `basics.title` and `basics.summary`.

Current v1 focus line:

```text
Senior Product Manager at Mailgun (Sinch) building B2B SaaS products for enterprise adoption and product-led growth.
```

## Resume Data

Structured current resume content stored in `src/data/resume.json`. This drives `/resume`, homepage identity, and contact basics. Production builds should reject placeholder resume content.

## Writing Archive

The migrated Ghost blog. It is historical context, not the homepage lead. Homepage label is **From the Archive** until Brian has newer writing to feature. Blog route remains `/blog/`; nav label is **Writing**.

## Migrated Post

A historical archive post imported from the old Ghost site with `ghost_id` in frontmatter. Migrated posts should display a subtle "Originally published" cue.

## Published Post

A blog post where `draft !== true` and `date <= todayUtcDateString`. Future-dated posts are treated as scheduled/unpublished.

## GPXplore

Brian's active personal project and the single featured v1 project. It lives at `/projects/gpxplore/` on the personal site and links to `https://gpxplore.net`.

Positioning:

- Title: `GPXplore`
- Subtitle: `Backcountry route planner`
- Summary: `A local-first backcountry route planner for building GPX routes, assembling multi-day rides, and carrying printable or mobile day references into the field.`

## Project Cover Image

Optional project screenshot/image under `public/images/projects/`. GPXplore should render cleanly without one until Brian provides a real screenshot.

## Domain Alias Email

Public contact email for the site. Default: `contact@brian-erickson.com`.

## Analytics

Optional Cloudflare Web Analytics. Include the script only when `CLOUDFLARE_ANALYTICS_TOKEN` is configured. Never render a placeholder token.

## Redirects

Cloudflare Pages redirects in `public/_redirects`. Ghost used root slug URLs (`/:slug/`), so v1 redirects both `/slug` and `/slug/` to `/blog/slug/`. Old `/about/` redirects to `/resume/`.

## Static Output

Astro static output deployed to Cloudflare Pages. No Cloudflare adapter is needed in v1 unless future runtime code is introduced.
