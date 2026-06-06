# Portfolio Theme Refresh Orchestrator

## Summary

Execution order:

1. Upgrade Astro and official Astro integrations to the current supported major.
2. Replace the old Casper/Ghost visual system with the adapted portfolio theme.
3. Perform focused final browser QA across the main public routes.

Top risks:

- Mixing the framework upgrade with visual changes makes failures hard to diagnose.
- Accidentally importing the reference theme's `/writing` routes or schema would violate v1 content decisions.
- Astro/Cloudflare adapter docs can pull the project toward runtime deployment it does not need.
- Whole-site visual changes can pass build while still failing responsive layout or accessibility.

## Current Implementation Status (Resume Context)

Last updated: 2026-06-05

Branch: `feature/v1-static-site`

Known working context:

- Current site is Astro 4 static output with Cloudflare Pages target.
- Existing homepage/style draft was based on the superseded Casper-continuity direction and may be replaced.
- Reference theme lives at `specs/refs/astro-theme/`.
- New canonical spec is `specs/portfolio-theme-refresh--planned.md`.

Done:

- Decision tree resolved for scope, typography, hero, homepage order, route/content invariants, deployment posture, QA cadence, and out-of-scope work.
- Phase 1 complete: Astro toolchain upgraded to v6 with Content Layer API migration.
- Phase 2 complete: portfolio theme tokens, fonts, sticky header, shorter hero, page/component styling, and default social image metadata applied.

Next:

- Begin Phase 3 final browser QA and polish.

## Execution Policy

- Do not commit unless the user explicitly asks.
- Use phase/commit-group sections as planning and handoff units, not as automatic commit instructions.
- Preserve user/unrelated work in the worktree.
- Keep changes scoped to the active spec.
- Do not add new features while performing the theme refresh.
- Reimplement/adapt reference theme patterns inside the existing app structure.
- Do not wholesale copy the reference theme's routes, content structure, or sample content.

## Global Locked Decisions

- Whole-site visual replacement, not homepage-only.
- Astro portfolio-theme-first, not Casper-continuity-first.
- Upgrade to the current supported Astro major before theme implementation proceeds.
- Keep default/static Astro output to `dist/` for Cloudflare Pages.
- Do not add `@astrojs/cloudflare`, Wrangler, SSR, Workers, Pages Functions, or runtime bindings in v1.
- Switch to Space Grotesk Variable and DM Sans Variable.
- Create `src/styles/tokens.css` and keep `src/styles/global.css` slimmer.
- Use a restrained sticky global header.
- Replace the full-screen cover with the reference-style portfolio hero.
- Keep the existing cover image as the initial hero background.
- Homepage order: hero, GPXplore, optional short bridge, compact archive.
- Remove standalone proof-point trio.
- Keep `/blog/` as the route and `Writing` as the nav label.
- Keep `blog` and `projects` collection schemas.
- Keep GPXplore as the single featured v1 project.
- Keep contact simple/static with no form.
- Include `/404/` in the refresh.
- No new routes/features such as RSS, tag pages, search, dark mode, or now page.
- Dark mode is out of scope, but tokens should make it easy later.
- Image optimization is out of scope.
- Preserve the current favicon unless clearly broken or placeholder.
- Non-blog-post copy is fair game.
- Blog post bodies are not to be rewritten.
- Final substantive resume content is out of scope.
- Build validation should still protect launch from placeholder resume content.

## Invariants

- `/blog/` remains the writing route, and nav label remains `Writing`.
- Ghost slug redirects stay intact.
- Blog collection stays `blog`; no rename to `writing`.
- Project collection keeps current schema.
- Resume/homepage identity still source from `src/data/resume.json`.
- GPXplore remains the single featured v1 project.
- Draft/future-dated posts remain unpublished everywhere public.
- Analytics remain config-gated by `CLOUDFLARE_ANALYTICS_TOKEN`.
- No JavaScript islands or frontend framework additions.

## Verification Cadence

After each implementation phase:

- `npm test`
- `npm run build`

Browser QA:

- Reserve for the final visual checkpoint unless an intermediate layout change is especially risky.
- Keep browser work intentional because it is comparatively expensive.

## Model And Effort Recommendations

- Phase 1 can be handled by a coding model with strong dependency-upgrade/debugging skills.
- Phase 2 benefits from a model comfortable with Astro layouts, CSS architecture, and responsive design.
- Phase 3 benefits from a visually careful model with browser inspection discipline.

## Phase 1: Astro Current-Major Upgrade

Suggested subject: `chore(deps): upgrade astro toolchain`

Size: Small to medium.

Files likely touched:

- `package.json`
- `package-lock.json`
- `astro.config.mjs` only if required by the upgrade.
- Minor source files only if Astro upgrade requires syntax/API updates.

Entry criteria:

- Current worktree reviewed.
- No theme visual changes are mixed into this phase.

Acceptance targets:

- Astro and official Astro integrations upgraded to the current supported major.
- `npm test` passes.
- `npm run build` passes.
- Static output remains `dist/`.
- No Cloudflare adapter or runtime deployment config added.

Risks:

- Content collection API changes.
- Type-check behavior changes.
- Transitive dependency or lockfile churn.

Done criteria:

- Tests and build pass.
- Any upgrade-specific source changes are documented in the handoff/final note.
- If upgrade blocks, document the exact blocker and do not begin phase 2.

### Phase 1 handoff (2026-06-05)

- **Astro version:** 6.4.4 (`@astrojs/check` 0.9.9, `@astrojs/sitemap` 3.7.3, `vitest` 3.2.6).
- **Node engines:** bumped to `>=22.12.0` (Astro 6 requirement).
- **Content Layer API:** migrated `src/content/config.ts` → `src/content.config.ts` with `glob()` loaders; Zod imports from `astro/zod`; URL validators use `z.url()`.
- **Entry API:** `entry.slug` → `entry.id`; `entry.render()` → `render(entry)` from `astro:content`; `post.body` guarded with `?? ""` for optional body typing.
- **Config unchanged:** `astro.config.mjs` untouched; static output still `dist/`; no Cloudflare adapter added.
- **Verification:** `npm test` (32 passed), `npm run build` (27 pages, 0 check errors).

## Phase 2: Theme Token, Layout, And Component Replacement

Suggested subject: `feat(styles): apply portfolio theme system`

Size: Large.

Files likely touched:

- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/layouts/Base.astro`
- `src/layouts/Page.astro`
- `src/components/Nav.astro`
- `src/components/Footer.astro`
- `src/components/SiteCover.astro` or replacement hero component.
- `src/components/ProjectCard.astro`
- `src/components/PostListItem.astro`
- `src/components/TagChip.astro`
- `src/components/ResumeSection.astro`
- `src/pages/index.astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/page/[page].astro`
- `src/pages/blog/[slug].astro`
- `src/pages/projects/index.astro`
- `src/pages/projects/[slug].astro`
- `src/pages/resume.astro`
- `src/pages/contact.astro`
- `src/pages/404.astro`
- `package.json`
- `package-lock.json`

Entry criteria:

- Phase 1 passes tests and build.
- New spec is the source of truth.

Acceptance targets:

- Space Grotesk Variable and DM Sans Variable are installed and used.
- Old unused font packages are removed.
- `tokens.css` contains theme tokens.
- Global CSS uses tokens rather than scattering hard-coded theme colors.
- Sticky global header is implemented.
- Homepage hero uses the adapted portfolio hero pattern.
- GPXplore appears immediately after hero.
- Standalone proof-point trio is removed.
- Archive preview is compact and visually secondary.
- Blog pages use the new prose/list treatment while preserving archive behavior.
- Project pages/cards use the new sparse treatment while preserving schema.
- Resume/contact/404 are visually integrated.
- Default `og:image` and Twitter image metadata use the hero image.
- `npm test` passes.
- `npm run build` passes.

Risks:

- Replacing CSS broadly can create hidden responsive regressions.
- Existing markdown content may expose prose edge cases.
- Sticky header may obscure anchor targets or reduce small-screen space.
- Color palette may need tuning against the existing cover image.

Done criteria:

- Automated verification passes.
- Known visual caveats are listed for phase 3.

### Phase 2 handoff (2026-06-05)

- **Fonts:** switched to `@fontsource-variable/space-grotesk` and `@fontsource-variable/dm-sans`; removed Open Sans and Merriweather packages.
- **Theme foundation:** added `src/styles/tokens.css`; rebuilt `src/styles/global.css` around warm paper, dark ink, coral accent, cool tag accent, soft rules, sticky header, sparse lists/cards, prose, resume, contact, pagination, and print styles.
- **Layouts and metadata:** `Base.astro` now emits default `og:image` and Twitter image metadata using `/images/cover.jpg`; `Page.astro` uses the sticky header globally and the hero as a standalone section.
- **Homepage:** replaced the full-screen cover with the shorter portfolio hero; GPXplore now follows immediately after the hero; standalone proof-point trio removed; compact archive remains secondary.
- **Routes/components:** blog index/detail, project index/detail, resume, contact, and 404 share the new visual system while preserving `/blog/`, schemas, published-post filtering, migrated-post cues, and static output.
- **Verification:** `npm test` (32 passed), `npm run build` (27 pages, 0 check errors), browser smoke at default desktop route set plus 375px homepage check.
- **Known visual caveats for Phase 3:** only smoke-tested visually; full 375px, 768px, and desktop route-by-route polish remains Phase 3.

## Phase 3: Final Browser QA And Polish

Suggested subject: `fix(styles): polish portfolio theme responsiveness`

Size: Small to medium.

Files likely touched:

- CSS and markup files from phase 2 as needed.

Entry criteria:

- Phase 2 tests and build pass.
- No major unfinished layout work remains.

Browser targets:

- 375px mobile.
- 768px tablet.
- Desktop width.

Routes:

- `/`
- `/projects/`
- `/projects/gpxplore/`
- `/blog/`
- At least one migrated post.
- `/resume/`
- `/contact/`
- `/404/`

Acceptance targets:

- Header remains legible and usable.
- Hero is framed correctly.
- GPXplore is clearly the primary homepage proof point.
- Archive remains secondary.
- Cards, lists, tags, and metadata have consistent rhythm.
- Blog prose is readable.
- Migrated-post cues are visible but subtle.
- Resume works structurally with current incomplete data.
- No text overlap, clipped controls, or incoherent layering.
- Keyboard-visible focus states exist.
- Contrast is adequate for body text, metadata, tags, links, and buttons.
- Content-bearing images have meaningful alt text; decorative images have empty alt text.

Risks:

- Browser QA can expand if every route gets polished at once.
- Avoid slipping new content/features into polish.

Done criteria:

- Browser QA checklist passes.
- `npm test` passes.
- `npm run build` passes.

## Sequencing And Handoff Protocol

Suggested validation commands:

```bash
npm test
npm run build
```

Suggested implementation order:

1. Complete Phase 1 and stop if upgrade verification fails.
2. Complete Phase 2 with automated verification.
3. Complete Phase 3 with focused browser QA and final automated verification.

Handoff notes should include:

- Astro version after upgrade.
- Any upgrade caveats.
- Any intentional design deviations from `specs/refs/astro-theme`.
- Verification commands run and outcomes.
- Browser QA routes/viewports checked.
