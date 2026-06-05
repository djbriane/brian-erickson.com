# Brian Erickson — Astro Portfolio Theme

A static Astro 5 portfolio site for Product Management and Development work. Self-hosted fonts, zero JS by default, content collections for Projects and Writing.

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to ./dist
npm run preview  # serve the build locally
```

Requires Node 18.17+ or 20+.

## Project layout

```text
astro-theme/
├─ public/
│  ├─ favicon.svg
│  └─ images/hero-background.jpg   # swap to re-skin the hero
├─ src/
│  ├─ content/
│  │  ├─ config.ts                  # Zod schemas
│  │  ├─ projects/*.md              # one file per case study
│  │  └─ writing/*.md               # one file per post
│  ├─ layouts/BaseLayout.astro      # <head>, SEO, OG tags, header, footer
│  ├─ components/                   # SiteHeader, ProjectCard, NameLockup, …
│  ├─ pages/                        # routes: /, /projects, /writing, /contact, /resume
│  └─ styles/
│     ├─ tokens.css                 # palette + typography variables
│     └─ global.css                 # base styles, hero treatment
├─ astro.config.mjs                 # @astrojs/sitemap + @astrojs/mdx, static output
└─ package.json
```

## Editing content

- **Add a project**: drop a new `.md` file in `src/content/projects/`. Required frontmatter: `title`, `summary`. Optional: `status`, `focus[]`, `started`, `role`, `url`, `featured`, `order`.
- **Add a post**: drop a new `.md` file in `src/content/writing/`. Required: `title`, `date`, `summary`. Optional: `tags[]`.
- **Featured project on home**: set `featured: true` on one project. Falls back to the lowest `order` value.

## Re-skinning

Everything lives in `src/styles/tokens.css`:

| Token            | Use                                  |
| ---------------- | ------------------------------------ |
| `--ink`          | Body text                            |
| `--paper`        | Page background (warm sand)          |
| `--paper-soft`   | Cards, dividers                      |
| `--muted`        | Secondary text, meta                 |
| `--accent`       | Links, active nav (deep coral)       |
| `--accent-cool`  | Tag chips (muted slate blue)         |
| `--rule`         | Hairline rules                       |

To dial the warmth down on the page background, lower the chroma of `--paper`, e.g. `oklch(0.93 0.012 75)`.

## Swapping the hero background

Replace `public/images/hero-background.jpg`. The image is desaturated and brightened via CSS filters in `.hero::before` and gets a warm-paper overlay in `.hero::after` — tune both in `src/styles/global.css` if your image needs different treatment.

## Deploying

Fully static. Build and drop `dist/` on any static host:

- **Netlify**: build command `npm run build`, publish directory `dist`.
- **Vercel**: framework preset Astro, no extra config.
- **Cloudflare Pages**: build command `npm run build`, output `dist`.

Set `site` in `astro.config.mjs` to your final URL before building — that powers canonical tags, sitemap entries, and Open Graph URLs.

## SEO

- Per-page `<title>` and meta description set via `BaseLayout` props.
- Open Graph + Twitter card tags wired up; OG image defaults to the hero background.
- Sitemap auto-generated at `/sitemap-index.xml`.
- Single H1 per page, semantic landmark tags.
