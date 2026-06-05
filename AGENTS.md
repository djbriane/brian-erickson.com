# Agent instructions

Guidance for AI coding assistants working in this repository. Human contributors: see [CONTRIBUTING.md](CONTRIBUTING.md).

## Project context

`brian-erickson.com` is Brian Erickson's static personal site: a professional portfolio, resume, GPXplore project showcase, and migrated Ghost writing archive. The build target is Astro static output deployed to Cloudflare Pages.

Current baseline spec: [brian-erickson-com-v1-spec.md](brian-erickson-com-v1-spec.md).

Domain vocabulary and content-source rules: [CONTEXT.md](CONTEXT.md).

## Workflow

1. Read [CONTEXT.md](CONTEXT.md), [specs/roadmap--ongoing.md](specs/roadmap--ongoing.md), and the relevant spec before changing behavior.
2. For non-trivial features, confirm or draft a spec first. Keep specs in `specs/` unless the user explicitly asks for a root-level planning doc.
3. Work on `feature/<short-kebab-description>` branches. Do not commit features directly to `main`.
4. Run the relevant verification before finishing:
   - `npm test` once the project exists
   - `npm run build` once the project exists
   - migration tests for Ghost migration changes
   - manual responsive checks for visual/layout changes
5. When opening a PR, add an entry to [specs/release-notes--ongoing.md](specs/release-notes--ongoing.md). Format: bold date + title + PR link(s) + optional spec link, one sentence summary, up to three bullets. Add it at the top of the file.

Do not create git commits or open PRs unless the user explicitly asks.

## Branch names

```text
feature/<short-kebab-description>
```

Examples:

- `feature/v1-static-site`
- `feature/ghost-migration`
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

Suggested scopes: `content`, `blog`, `projects`, `resume`, `migration`, `seo`, `styles`, `spec`, `specs`, `deps`, `ci`

Examples:

```text
feat(blog): migrate Ghost archive to content collection
feat(projects): add GPXplore case study
fix(seo): omit analytics script when token is absent
docs(spec): refine v1 handoff criteria
test(migration): cover no-overwrite and force modes
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

## Orchestrator docs

For any spec that ships in multiple commit groups or phases, write a companion orchestrator before implementation:

```text
specs/<name>--orchestrator.md
```

The spec is canonical for behavior; the orchestrator is the execution plan.

Required sections:

- **Summary** — execution order and top risks
- **Current implementation status (resume context)** — last-updated date, branch, done/next steps
- **Execution policy** — branch/PR strategy, invariants, verification cadence
- **Model and effort recommendations** — per commit group when useful
- **Global locked decisions** — resolved choices that must not be relitigated mid-build
- **Per commit-group sections** — size, files, acceptance targets, risks, entry/done criteria
- **Sequencing and handoff protocol** — suggested commit subjects and validation commands

Lifecycle: orchestrators are working docs. After merge, mark them superseded and move the shipped spec to `specs/built/`.

## Code principles

- Smallest correct diff; no drive-by refactors.
- Prefer Astro static output and content collections. Do not add React/Vue/Svelte islands unless the spec changes.
- Keep content source-of-truth clear:
  - Current identity/resume: `src/data/resume.json`
  - Writing: `src/content/blog/*.md`
  - Projects: `src/content/projects/*.md`
  - Historical Ghost About: `src/data/about.md`
- Build validation should catch placeholder production content, but optional assets should render gracefully.
- Treat draft/future-dated posts as unpublished everywhere public.
- Keep Cloudflare Web Analytics config-gated; never emit a broken placeholder token.
- Do not commit secrets. Commit `.env.example`, not `.env`.

## Key paths

| Path | Role |
|------|------|
| `brian-erickson-com-v1-spec.md` | Active v1 build spec |
| `CONTEXT.md` | Project vocabulary and content-source decisions |
| `specs/roadmap--ongoing.md` | Forward work index |
| `specs/backlog--ongoing.md` | Unscheduled ideas |
| `specs/release-notes--ongoing.md` | PR/release history |
| `specs/built/` | Shipped specs |
| `src/content/blog/` | Blog post markdown after build scaffold exists |
| `src/content/projects/` | Project markdown after build scaffold exists |
| `src/data/resume.json` | Current resume/homepage identity source |
| `scripts/migrate-ghost.js` | Ghost migration script after build scaffold exists |

## Commands

These commands are expected after the Astro project is scaffolded:

```bash
npm run dev
npm test
npm run build
npm run format
```

