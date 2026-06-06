# Agent instructions

Guidance for AI coding assistants working in this repository. Human contributors: see [CONTRIBUTING.md](CONTRIBUTING.md).

## Project context

`brian-erickson.com` is Brian Erickson's static personal site: a professional portfolio, resume, GPXplore project showcase, and migrated Ghost writing archive. The build target is Astro static output deployed to Cloudflare Pages.

Current build-out spec: [specs/portfolio-theme-refresh--planned.md](specs/portfolio-theme-refresh--planned.md).

Domain vocabulary and content-source rules: [CONTEXT.md](CONTEXT.md).

## Workflow

1. Read [CONTEXT.md](CONTEXT.md) and the current build-out spec before changing behavior.
2. For non-trivial features, confirm or draft a spec first. Keep the current build-out spec in `specs/` unless the user explicitly asks for a root-level planning doc.
3. Work on `feature/<short-kebab-description>` branches. Do not commit features directly to `main`.
4. Run the relevant verification before finishing:
   - `npm test` once the project exists
   - `npm run build` once the project exists
   - manual responsive checks for visual/layout changes

Do not create git commits or open PRs unless the user explicitly asks.

## Branch names

```text
feature/<short-kebab-description>
```

Examples:

- `feature/v1-static-site`
- `feature/gpxplore-case-study`
- `feature/rss-feed`

When work is driven by a spec, name the branch after the spec file base. Drop `--planned`, `--orchestrator`, and `.md`.

Example: `rss-feed--planned.md` -> `feature/rss-feed`.

## Commit messages

Use Conventional Commits, GPG-signed when committing locally:

```text
<type>(<scope>): <imperative summary>
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`, `build`, `ci`

Suggested scopes: `content`, `blog`, `projects`, `resume`, `seo`, `styles`, `spec`, `specs`, `deps`, `ci`

Examples:

```text
feat(projects): add GPXplore case study
fix(seo): omit analytics script when token is absent
docs(spec): refine v1 handoff criteria
```

## Pull requests

Title: same Conventional Commit style as the main outcome.

Body:

```markdown
## Summary
- ...

## Test plan
- [ ] `npm test`
- [ ] `npm run build`
- [ ] Manual: ...
```

Keep the body short. Add what a reviewer would otherwise miss: skipped tests, deliberate scope cuts, follow-ups already filed, or deviations from a spec.

## Code principles

- Smallest correct diff; no drive-by refactors.
- Prefer Astro static output and content collections. Do not add React/Vue/Svelte islands unless the spec changes.
- Keep content source-of-truth clear:
  - Current identity/resume: `src/data/resume.json`
  - Writing: `src/content/blog/*.md`
  - Projects: `src/content/projects/*.md`
- Build validation should catch placeholder production content, but optional assets should render gracefully.
- Treat draft/future-dated posts as unpublished everywhere public.
- Keep Cloudflare Web Analytics config-gated; never emit a broken placeholder token.
- Do not commit secrets. Commit `.env.example`, not `.env`.

## Key paths

| Path | Role |
|------|------|
| `specs/portfolio-theme-refresh--planned.md` | Current build-out spec |
| `CONTEXT.md` | Project vocabulary and content-source decisions |
| `src/content/blog/` | Blog post markdown after build scaffold exists |
| `src/content/projects/` | Project markdown after build scaffold exists |
| `src/data/resume.json` | Current resume/homepage identity source |

## Commands

These commands are expected after the Astro project is scaffolded:

```bash
npm run dev
npm test
npm run build
npm run format
```
