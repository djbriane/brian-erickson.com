# brian-erickson.com

Static personal site for Brian Erickson: professional presence, resume, project showcase, and migrated Ghost writing archive.

Spec status: [specs/spec-status--ongoing.md](specs/spec-status--ongoing.md). Latest shipped build-out: [specs/built/portfolio-theme-refresh--built.md](specs/built/portfolio-theme-refresh--built.md).

## Project Docs

| File | Purpose |
|------|---------|
| [CONTEXT.md](CONTEXT.md) | Domain glossary and content source-of-truth decisions |
| [AUTHORING.md](AUTHORING.md) | How to add blog posts, projects, and résumé content |
| [AGENTS.md](AGENTS.md) | AI assistant workflow and repo conventions |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Human-oriented contribution workflow |
| [CODEX.md](CODEX.md) | Codex quick reference |
| [CLAUDE.md](CLAUDE.md) | Claude Code quick reference |
| [specs/spec-status--ongoing.md](specs/spec-status--ongoing.md) | Active and built spec status |
| [specs/built/portfolio-theme-refresh--built.md](specs/built/portfolio-theme-refresh--built.md) | Shipped portfolio theme refresh spec |

## Local Development

```bash
npm install
npm run dev      # local dev server at http://localhost:4321
npm test         # content smoke tests
npm run build    # astro check + static build into dist/
```

## Authoring Guide

All content is plain files in Git. Edit, commit, push to `main`, and Cloudflare Pages deploys.

See [AUTHORING.md](AUTHORING.md) for how to add blog posts, projects, and résumé content—including publish rules, frontmatter fields, and notes on the current archive framing for writing.

## Writing Archive

The Ghost archive has already been migrated. The canonical archive now lives in
`src/content/blog/`, with referenced images in `public/images/blog/` and legacy
redirects in `public/_redirects`.

## Deployment

Static `dist/` output deploys to Cloudflare Pages (build command `npm run build`, output `dist/`, Node 22.12+). Set `CLOUDFLARE_ANALYTICS_TOKEN` in the Pages dashboard only if you want Cloudflare Web Analytics; the snippet is omitted when it is unset. Account setup (GitHub repo, Pages connection, DNS) is owner-managed.
