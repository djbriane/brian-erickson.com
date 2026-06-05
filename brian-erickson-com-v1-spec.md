# brian-erickson.com v1 — Build Spec
**For:** Autonomous agent build  
**Stack:** Astro + Cloudflare Pages  
**Authored:** June 2026  
**Status:** Ready for implementation

---

## Problem Statement

Brian has a personal domain with a decade-old Ghost blog (v0.04, last updated 2016) running on a self-hosted Linux server with no active CDN, no CI/CD, and no Git remote. The site no longer reflects his current career, skills, or projects. He needs a modern personal portfolio that functions as a living professional presence — resume, project showcase, and a low-friction micro-blog — deployed on infrastructure he doesn't have to babysit. Content updates should flow through a Git-based markdown workflow with Cloudflare Pages auto-deploying on push.

---

## Goals

1. Prepare a production-ready static site for `brian-erickson.com` on Cloudflare Pages that can score 95+ on Lighthouse performance, accessibility, and SEO
2. Migrate all published Ghost blog posts (markdown content) into the new blog as a starting archive — stale content is fine, it's a history, not a homepage
3. Enable Brian to publish a new blog post or update his resume by editing a markdown or JSON file and pushing to GitHub — zero CMS UI required
4. Establish a visual identity that feels warm, personal, and technically credible — not a generic developer portfolio template
5. Structure the codebase so a second agent pass can add a Now page, dark/light toggle, and RSS feed without refactoring

---

## Non-Goals

- **No Ghost backend** — Ghost is being fully replaced; do not use ghost-astro connectors or the Ghost API
- **No authentication or member-gating** — no newsletter signups, no Mailchimp, no paid tiers in v1
- **No comments system** — no Disqus, no Giscus; blog posts are read-only in v1
- **No contact form with a backend** — contact section is links only (email, LinkedIn, GitHub); no server-side form handling
- **No CMS UI** — Keystatic, Decap CMS, and similar are explicitly out of scope; Brian has confirmed git-based authoring
- **No analytics dashboard** — Cloudflare Web Analytics may be added when configured, but no custom dashboard or event tracking in v1

---

## Site Architecture

```
brian-erickson.com/
├── /                   → Home (hero + brief bio + archive writing + featured GPXplore project)
├── /resume             → Work history, skills, education
├── /projects           → Project/case study index
├── /projects/[slug]    → Individual project detail page
├── /blog               → Post index (paginated, 10/page)
├── /blog/[slug]        → Individual post
└── /contact            → Links: email, LinkedIn, GitHub, optional Resume PDF
```

---

## Content Model

### Blog Posts — `src/content/blog/[slug].md`
```yaml
---
title: string
date: YYYY-MM-DD
tags: string[]
description: string        # used for meta + post card excerpt
draft: boolean             # true = excluded from build
ghost_id: number           # optional, for traceability back to original export
---
# post body in markdown
```

**Ghost migration:** The export contains 19 published blog posts plus one published `About Me` page. Convert the 19 items where `status: "published"` and `page: 0` to blog markdown. Map `markdown` field → body, `published_at` → date, `tags` → tags array, `slug` → filename. Strip the `bme_format_link` internal tag. Posts with `page: 1` (`About Me`) should become static reference content, not blog posts.

**Published post filter:** Draft posts and future-dated posts are unpublished everywhere. Use one shared helper for public blog queries: `draft !== true && date <= todayUtcDateString`.

**Migrated post display:** For posts with `ghost_id`, show a subtle "Originally published" date cue in post metadata. New posts without `ghost_id` show normal post metadata only.

### Projects — `src/content/projects/[slug].md`
```yaml
---
title: string
date: YYYY-MM-DD            # project start or launch date
status: "active" | "archived" | "shipped"
tags: string[]
summary: string             # 1-2 sentence hook for the index card
subtitle: string            # short clarifier, e.g. "Backcountry route planner"
cover_image?: string        # optional path relative to /public/images/projects/
links:
  live: string              # optional
  github: string            # optional
  case_study: string        # optional external link
featured: boolean           # shows on homepage if true
---
# Full case study / project writeup in markdown
```

**Seed content:** Create one real project entry for GPXplore at `src/content/projects/gpxplore.md`. Do not create placeholder project entries.

GPXplore positioning:
- Title: `GPXplore`
- Subtitle: `Backcountry route planner`
- Summary: `A local-first backcountry route planner for building GPX routes, assembling multi-day rides, and carrying printable or mobile day references into the field.`
- Status: `active`
- Featured: `true`
- Live link: `https://gpxplore.net`
- GitHub link: omit for v1 because the repo is not public yet
- Cover image: optional; Brian may provide a real screenshot later. Render project cards/pages gracefully without a cover image.

The GPXplore case study should be medium-depth and product-led. Cover the problem (planning off-pavement/backcountry rides across GPX files, camps, fuel, water, hazards, printouts, and field devices), the product (route planning, route library, multi-day trips, day sheets, ride mode), technical choices (React/TanStack, Leaflet, Chart.js, Zustand, GPX parsing/export, Web Worker, Cloudflare Workers), notable features (route thumbnails, elevation/effort metrics, campground and wildfire overlays, DMD2 import/export, local backup/restore), and current active-project status.

### Resume — `src/data/resume.json`
Structured JSON file Brian edits directly. This is the canonical source for current identity, homepage bio, and resume content. The build should validate required production content rather than shipping placeholder strings.

Shape:

```json
{
  "basics": {
    "name": "Brian Erickson",
    "title": "Product Manager building technically ambitious products for real-world users.",
    "summary": "",
    "location": "Denver, CO",
    "email": "",
    "linkedin": "",
    "github": ""
  },
  "experience": [
    {
      "company": "",
      "title": "",
      "start": "YYYY-MM",
      "end": "YYYY-MM | present",
      "description": "",
      "highlights": [""]
    }
  ],
  "education": [
    {
      "institution": "University of Colorado Boulder — Leeds School of Business",
      "degree": "MBA",
      "year": 2009
    },
    {
      "institution": "South Dakota School of Mines and Technology",
      "degree": "BS, Computer Science",
      "year": ""
    }
  ],
  "skills": {
    "Product": [""],
    "Technical": [""],
    "Tools": [""]
  }
}
```

Required for production validation: `basics.name`, `basics.title`, `basics.summary`, `basics.location`, domain-alias email, LinkedIn URL, at least one complete experience entry, education entries, and non-empty skill groups. GitHub may be optional. Homepage hero uses `basics.title` exactly; v1 wording is `Product Manager building technically ambitious products for real-world users.`

---

## Visual Design Direction

**Aesthetic:** Closely replicate the original Ghost/Casper site while modernizing the implementation for Astro. The site should still feel like Brian's old personal blog evolved forward, not a generic developer portfolio template. Use the preserved reference files in `specs/refs/original-site/` as the design source of truth.

**Typography:**
- Body/editorial copy: `Merriweather` (serif), matching the original Casper theme's article feel
- Headings/navigation: `Open Sans` (sans-serif), matching the original Casper theme's compact bold headings and buttons
- Monospace (code blocks, tags, dates): system monospace or `JetBrains Mono` if needed for readability
- Self-host fonts with Fontsource if practical for Lighthouse; otherwise load only the required weights

**Color palette:**
```css
--color-bg:        #FFFFFF;   /* original Casper content surface */
--color-hero-bg:   #222222;   /* fallback under cover images */
--color-text:      #3A4145;   /* original body copy */
--color-heading:   #2E2E2E;   /* original headings */
--color-link:      #4A4A4A;   /* original link color */
--color-link-hover:#111111;   /* original hover */
--color-muted:     #9EABB3;   /* original post metadata */
--color-border:    #EBF2F6;   /* original post dividers */
--color-code-bg:   #F7FAFB;   /* original code blocks */
--color-code-border:#E3EDF3;  /* original code borders */
--color-focus:     #1F6F7A;   /* accessible modern focus treatment */
```

**Layout principles:**
- Homepage uses the original full-viewport cover image treatment with centered title/description and overlay navigation
- Single-column reading width (`max-width: 710px`) for blog posts and resume, matching Casper's `.inner` and `.post` width
- Wider container (`max-width: 1100px`) only where the modern project/resume surfaces need comparison or grids
- Preserve generous Casper vertical rhythm and the list-style blog index, including light dividers
- Dates/tags use the original small uppercase sans-serif metadata style
- Do not use a profile photo in v1 page content, but keep the original profile image as a reference asset
- Use a simple `BE` favicon/brand mark; do not blend GPXplore motifs into the personal brand
- Homepage/default metadata must describe current Brian and GPXplore, not decade-old archive content

**No dark mode in v1** (listed as P2 — design tokens are set up to support it later).

---

## Requirements

### P0 — Must Ship

**Home page**
- [ ] Typographic hero with name, current title/focus (pulled from `resume.json basics`), and 2–3 sentence bio
- [ ] "From the Archive" section: 3 newest published archive posts by date (title, date, description)
- [ ] "Featured Work" section: projects where `featured: true` (GPXplore in v1; title, subtitle/summary, status badge)
- [ ] Navigation: brand/home link plus Resume, Projects, Writing, Contact. Display label is "Writing"; route remains `/blog`.
- [ ] No active job-searching/consulting CTA; a simple contact link is enough

**Resume page (`/resume`)**
- [ ] Renders from `src/data/resume.json` — no hardcoded content
- [ ] Sections: Summary, Experience (reverse-chron), Education, Skills
- [ ] Each experience entry shows: company, title, date range, description, highlights as bullet list
- [ ] "Download PDF" link only if `/public/resume.pdf` exists; do not render a dead link
- [ ] Page is print-friendly (basic `@media print` styles that hide nav/footer)

**Projects (`/projects` + `/projects/[slug]`)**
- [ ] Index: card grid, each card shows title, summary, status badge, tags
- [ ] Detail page: full markdown content rendered, links section (live / github / case study), cover image if present
- [ ] `/projects/gpxplore/` renders as the single real v1 case study
- [ ] Empty state handled gracefully if no projects exist yet, but do not seed fake placeholders

**Blog (`/blog` + `/blog/[slug]`)**
- [ ] Index: list layout (not cards), showing title, date, tags, description — 10 posts per page
- [ ] Pagination: prev/next controls at bottom of index
- [ ] Post detail: title, date, tags, reading time estimate, full markdown body
- [ ] Draft posts (`draft: true`) and future-dated posts excluded from all public surfaces, sitemap, and future RSS/tag pages
- [ ] 19 Ghost blog posts migrated as `.md` files in `src/content/blog/`
- [ ] Migrated posts with `ghost_id` display "Originally published" metadata

**Contact (`/contact`)**
- [ ] Domain-alias email (`contact@brian-erickson.com` unless Brian changes it), LinkedIn, GitHub — external links open in new tab
- [ ] No form, no backend

**Global**
- [ ] Cloudflare Web Analytics snippet is config-gated: include it only when `CLOUDFLARE_ANALYTICS_TOKEN` exists; never emit a broken placeholder script
- [ ] `sitemap.xml` auto-generated by `@astrojs/sitemap`
- [ ] `robots.txt` — allow all
- [ ] Canonical tags on all pages with consistent trailing-slash URLs
- [ ] Open Graph meta tags on all pages (title, description, type)
- [ ] 404 page with link back to home
- [ ] Responsive: works cleanly at 375px (mobile), 768px (tablet), 1280px (desktop)
- [ ] Favicon: SVG using initials "BE" in accent color
- [ ] `public/_redirects` contains generated Ghost redirects and a manual section
- [ ] `/about/` redirects to `/resume/`
- [ ] Explicit redirects for each migrated Ghost post slug, both `/slug` and `/slug/`, to `/blog/[slug]/`
- [ ] Content collection schemas validate required blog/project fields and accepted status/date values
- [ ] Resume data validation prevents production placeholder content

---

### P1 — Nice to Have (Fast Follow)

- [ ] Reading time estimate displayed on blog post cards (not just detail pages)
- [ ] Tag filtering on blog index — click a tag to see all posts with that tag
- [ ] `/blog/tags/[tag]` pages auto-generated from content collection
- [ ] RSS feed (`/rss.xml`) via `@astrojs/rss` if it remains cheap/simple
- [ ] Animated page transitions (Astro View Transitions API)
- [ ] `og:image` auto-generated per post using Satori or a static template
- [ ] Resume PDF auto-generated from `resume.json` at build time (removes manual upload step)

---

### P2 — Future / Design Around

- [ ] Dark mode (CSS variable swap — tokens already structured for it)
- [ ] Now page (`/now`) — single markdown file, manually updated
- [ ] Search (Pagefind — static, no backend required)
- [ ] Case study password protection (Cloudflare Access rule, no code changes)

---

## Tech Stack & Project Setup

```
Framework:     Astro 4.x
Deployment:    Cloudflare Pages
Adapter:       None for v1 (plain static Astro output; add Cloudflare adapter only if future runtime code needs it)
Styling:       Vanilla CSS with CSS custom properties (no Tailwind — keeps it lean and readable)
Content:       Astro Content Collections (blog, projects)
Data:          resume.json (imported directly in .astro pages)
Image opt:     Astro built-in <Image /> component
Sitemap:       @astrojs/sitemap
Analytics:     Optional Cloudflare Web Analytics (config-gated script tag, no npm package)
Fonts:         Fontsource (self-hosted, subset to latin)
```

**Do not use:**
- Tailwind CSS (overkill for a personal site; makes theme customization harder)
- React/Vue/Svelte components (Astro-only, zero JS islands in v1)
- Any headless CMS SDK
- Ghost API client

---

## File Structure

```
brian-erickson.com/
├── public/
│   ├── favicon.svg
│   ├── _redirects              # generated Ghost redirects + manual section
│   ├── resume.pdf              # optional, manually placed by Brian
│   ├── images/
│   │   ├── projects/           # cover images for project pages
│   │   └── blog/               # any images referenced in migrated Ghost posts
├── src/
│   ├── content/
│   │   ├── config.ts           # Astro content collection schemas
│   │   ├── blog/               # *.md — one file per post
│   │   └── projects/           # *.md — one file per project
│   ├── data/
│   │   ├── about.md            # extracted stale Ghost About content for reference
│   │   └── resume.json
│   ├── layouts/
│   │   ├── Base.astro          # <html>, <head>, global styles, analytics
│   │   ├── Page.astro          # Base + nav + footer
│   │   └── Post.astro          # Page + post-specific header (title, date, tags, reading time)
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── PostCard.astro      # used on /blog index
│   │   ├── ProjectCard.astro   # used on /projects index
│   │   ├── TagChip.astro       # reusable tag pill
│   │   ├── Pagination.astro    # prev/next for blog index
│   │   └── ResumeSection.astro # renders a single experience/education block
│   ├── pages/
│   │   ├── index.astro         # Home
│   │   ├── resume.astro
│   │   ├── contact.astro
│   │   ├── projects/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── 404.astro
│   └── styles/
│       └── global.css          # CSS custom properties, reset, base typography
├── .env.example                # CLOUDFLARE_ANALYTICS_TOKEN=
├── scripts/
│   ├── migrate-ghost.js        # idempotent migration; supports --force
│   └── audit-links.js          # optional external-link audit, not part of build
├── astro.config.mjs
├── package.json
└── README.md                   # authoring guide for Brian
```

---

## Ghost Content Migration

The agent should create and run a migration script (plain Node.js is fine) that:

1. Reads `specs/refs/brian-erickson.ghost.2026-06-05.json`, a sanitized export that intentionally excludes Ghost admin/user secrets
2. Filters to posts where `status: "published"` and `page: 0` (excludes the About Me page)
3. For each post, writes a `.md` file to `src/content/blog/` with frontmatter derived from the Ghost data:
   - `title` → title
   - `published_at` (unix ms → YYYY-MM-DD) → date
   - `slug` → filename
   - `tags` (joined from posts_tags + tags tables) → tags array, excluding `bme_format_link`
   - `description` → use `meta_description` only when it reads like prose; if it is blank or just a URL, derive the first 150-160 chars from the markdown body after stripping markdown
   - `ghost_id` → id
   - `draft: false`
   - Body → markdown content after safe internal cleanup
4. Copies referenced Ghost images from `specs/refs/original-site/ghost-images/` into `public/images/blog/` and rewrites markdown image paths to the clean `/images/blog/...` structure
5. Preserves compatibility for old image URLs (`/img/...` and `/content/images/...`) through copied files or redirects so old inbound image links do not break
6. Performs safe link cleanup only: convert known internal links to new URLs, fix image paths, and remove tracking cruft such as `utm_*`
7. Extracts external URLs into a link-audit report but does not check network status during migration
8. Generates `public/_redirects` from Ghost slugs:
   - Both `/slug` and `/slug/` redirect to `/blog/slug/` for each migrated post
   - `/about` and `/about/` redirect to `/resume/`
   - Preserve a marked manual redirects section if re-run
9. Does not overwrite existing markdown files by default; log skipped files
10. Supports explicit `--force` to regenerate migrated files/assets/redirects during initial build iteration

The `About Me` page content (`page: 1`) should be extracted and placed in `src/data/about.md` for historical reference only. It is stale (Closely/Perch era) and must not drive the live homepage bio; current homepage/resume bio comes from `resume.json`.

Add focused migration tests covering Ghost export mapping, tag joins, `bme_format_link` stripping, page exclusion, About extraction, image path rewriting, generated redirects, no-overwrite behavior, and `--force`.

---

## Cloudflare Pages Deployment

```
Build command:    npm run build
Output dir:       dist/
Node version:     20
Environment vars: CLOUDFLARE_ANALYTICS_TOKEN (set in Pages dashboard)
```

**DNS:** Point `brian-erickson.com` CNAME to the Cloudflare Pages deployment URL. www redirect handled by Cloudflare redirect rule.

**Ownership:** The implementation agent prepares a deployable static project and documents the steps. Brian owns external account actions: creating the GitHub repo, choosing public/private visibility, connecting Cloudflare Pages, setting DNS, and adding environment variables in the Cloudflare dashboard.

**GitHub repo:** Intended repo is `brian-erickson/brian-erickson.com`, but a remote is not required for v1 handoff. Every push to `main` should trigger a deploy once Brian connects GitHub to Cloudflare Pages.

---

## README.md (Authoring Guide)

The agent should generate a `README.md` that documents:

1. **Publishing a blog post** — copy the template frontmatter, create `src/content/blog/my-slug.md`, push to main
2. **Adding a project** — copy the template frontmatter, create `src/content/projects/my-slug.md`, push to main  
3. **Updating the resume** — edit `src/data/resume.json`, push to main
4. **Updating the resume PDF** — optionally add/replace `public/resume.pdf`, push to main
5. **Draft and scheduled posts** — set `draft: true` or use a future UTC date to keep a post unpublished
6. **Adding GPXplore screenshots** — place optional real screenshots under `public/images/projects/` and set `cover_image`
7. **Local dev** — `npm install && npm run dev`
8. **Deployment** — create/connect GitHub repo, configure Cloudflare Pages, set `CLOUDFLARE_ANALYTICS_TOKEN` only if using analytics

Include copy-paste frontmatter templates for blog and project entries, including the meaning of `draft`, `featured`, `subtitle`, and optional `cover_image`.

---

## Open Questions

| Question | Owner | Blocking? |
|---|---|---|
| Complete production resume data for `src/data/resume.json` | Brian | Yes — build validation should reject placeholders |
| Does Brian want `contact@brian-erickson.com` or another domain alias? | Brian | No — default to `contact@brian-erickson.com` |
| Does Brian want to provide a real GPXplore screenshot before launch? | Brian | No — project renders without cover image |
| Does Brian have LinkedIn and GitHub URLs to populate into `resume.json` and `/contact`? | Brian | LinkedIn yes for production resume validation; GitHub no, omit if blank |
| Should the GitHub repo be public or private? | Brian | No — Brian owns repo creation/config |

---

## Success Criteria for v1 Handoff

The agent build is considered complete when:

- [ ] `npm run build` completes with zero errors
- [ ] Migration tests pass
- [ ] Lightweight smoke tests pass: homepage renders archive/project sections, `/resume` renders from `resume.json`, `/projects/gpxplore/` exists, `/blog` paginates, at least one migrated post route exists, and `_redirects` contains expected old slugs
- [ ] 19 Ghost blog posts exist as `.md` files and render at `/blog/[slug]/`
- [ ] `src/data/about.md` contains the extracted Ghost About page
- [ ] `/resume` renders from validated `resume.json` with no hardcoded resume content
- [ ] `/projects/gpxplore/` renders as the single v1 featured project; no placeholder projects are required
- [ ] Local Lighthouse or equivalent preview checks are run where possible and results documented
- [ ] Production Lighthouse score ≥ 95 on Performance, Accessibility, Best Practices, SEO remains the deployment acceptance target after Brian connects Cloudflare Pages
- [ ] Static `dist/` output is ready for Cloudflare Pages; live `.pages.dev` deployment is not required unless Brian explicitly asks the agent to perform account-level setup
- [ ] `README.md` documents the authoring workflow
- [ ] `.env.example` documents all required environment variables
