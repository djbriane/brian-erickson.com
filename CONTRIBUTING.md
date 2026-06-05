# Contributing

Thanks for helping improve `brian-erickson.com`. This project is spec-driven: larger work starts as a short markdown spec, ships on a feature branch, and lands in `specs/built/` after merge.

## Before You Start

1. Read [CONTEXT.md](CONTEXT.md) for source-of-truth and vocabulary decisions.
2. Check [specs/roadmap--ongoing.md](specs/roadmap--ongoing.md), [specs/backlog--ongoing.md](specs/backlog--ongoing.md), and active specs under `specs/`.
3. For non-trivial features, write or extend a spec before large code changes. Quick fixes and obvious bugs can skip a spec.

## Branch Naming

Use feature branches off `main`:

```text
feature/<short-kebab-description>
```

Examples:

- `feature/v1-static-site`
- `feature/ghost-migration`
- `feature/gpxplore-case-study`
- `feature/rss-feed`

Rules:

- Lowercase kebab-case after `feature/`.
- Keep names short but recognizable.
- One logical feature or refactor per branch.
- Do not commit directly to `main` for feature work.
- Spec-driven work should use the spec file base as the branch name.

## Commit Messages

Use Conventional Commits with an optional scope:

```text
<type>(<scope>): <imperative summary>
```

Subject line: 72 characters or less, imperative mood.

Types:

| Type | When to use |
|------|-------------|
| `feat` | New user-facing behavior |
| `fix` | Bug fix |
| `docs` | Specs, README, comments-only doc changes |
| `refactor` | Code change without behavior change |
| `test` | Tests only |
| `chore` | Tooling, deps, generated files |
| `perf` | Performance improvement |
| `build` | Build system or bundler |
| `ci` | CI workflow changes |

Suggested scopes: `content`, `blog`, `projects`, `resume`, `migration`, `seo`, `styles`, `spec`, `specs`, `deps`, `ci`

Examples:

```text
feat(blog): migrate Ghost archive to content collection
feat(projects): add GPXplore case study
fix(seo): omit analytics script when token is absent
docs(spec): refine v1 handoff criteria
test(migration): cover no-overwrite and force modes
```

## Pull Requests

Title: Conventional Commit style for the main outcome.

Description template:

```markdown
## Summary
- One to three bullets: what changed and why.

## Test plan
- [ ] `npm test`
- [ ] `npm run build`
- [ ] Manual: <specific UI flow exercised>

## Spec
- Link to spec under `specs/` if applicable.
- Note any deviations from the spec.
```

Review expectations:

- `npm test` and `npm run build` should pass once the project exists.
- Run migration-specific tests when touching Ghost migration.
- Run manual responsive checks for layout changes.
- Keep scope tight; avoid unrelated refactors.
- When behavior changes, update the relevant spec or add implementation notes.

## Spec Workflow

| Location | Purpose |
|----------|---------|
| `specs/<name>--planned.md` | Active or draft spec for planned work |
| `specs/<name>--orchestrator.md` | Execution plan for multi-phase work |
| `specs/built/` | Shipped features, as-built reference |
| `specs/backlog--ongoing.md` | Ideas not yet scheduled |
| `specs/refs/` | Stable reference docs |

When a feature ships, move its completed spec to `specs/built/`, add implementation notes for deviations, update [specs/spec-status--ongoing.md](specs/spec-status--ongoing.md), and add an entry to [specs/release-notes--ongoing.md](specs/release-notes--ongoing.md).

## Code Guidelines

- Minimize scope: smallest correct diff.
- Match the active stack: Astro static output, content collections, vanilla CSS custom properties.
- Do not add a CMS, Ghost API client, auth, comments, forms, or client-side framework islands unless a spec changes.
- Validate production content contracts, especially resume data and content frontmatter.
- Render optional assets gracefully: resume PDF, GPXplore cover image, analytics token.
- Keep draft and future-dated posts unpublished everywhere.
- Commit `.env.example`, never `.env`.

