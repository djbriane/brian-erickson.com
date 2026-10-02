# GPXplore: building and releasing an app with agents

Status: first draft for author review, October 1, 2026. Branch: `feature/gpxplore-building-with-agents`.

## Editorial decision

One first-person feature post connects the real riding need, Lovable prototype, ownership, specification and orchestration, voice-driven work during recovery, native app expansion, launch, and the personal cost of sustained iteration. Technical implementation details can become a follow-up rather than interrupt this narrative. Audience: product managers, developers, and professional portfolio readers.

## Source of truth

The author's interview in the Codex conversation supplies personal recollections and judgments. Frozen repository statistics and milestone evidence are in `public/images/blog/gpxplore-building-with-agents/asset-notes.md`. May 18 is the initial Claude planning conversation; May 20 is the first recorded prototype activity. Approximate accident timing and uncertain Lovable credit exhaustion stay approximate. No exact historical model versions are asserted. The author explicitly said they did not write implementation code or review it line by line; agents handled coding and code/architecture reviews.

## Behavior

- Add one Markdown post with `draft: true`.
- Use three optimized illustrations in the article; include the other two as ready-to-use assets. Preserve editable SVG sources.
- Permit draft detail-page preview only in Astro development mode, labelled Draft preview.
- Keep draft/future posts excluded from production routes, homepage, blog listings and sitemap.
- Update the existing frontmatter smoke check to accept explicit true or false; a draft is valid content.
- Do not publish, commit, push, or change the existing project showcase as part of this draft.

## Review before publication

- Read for first-person voice and edit any phrasing Brian would not use.
- Confirm names and anecdotes Brian wants public (David, wrist injury/surgery, sleep and work examples). These were supplied for this post; this is an editorial reminder, not a required approval flow.
- Optionally add real app screenshots and a photograph; supplied graphics are sufficient for this draft.
- Confirm the Wayfinder attribution/title if linking its upstream source; currently attributed from the interview without an invented URL.
- Refresh the publish date when ready, set `draft: false`, verify, then publish through the site's normal workflow.

## Validation

`npm test`, `npm run build`; confirm production output omits the draft route and draft title from HTML/sitemap; inspect local desktop/mobile preview and asset loading.
