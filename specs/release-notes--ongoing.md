# Release Notes

One entry per merged PR or closely related PR group. Newest at the top. Docs-only PRs are optional unless they affect project workflow or specs.

When opening a PR: add an entry here as part of the PR. Format: bold date + title + PR link(s) + optional spec link, one sentence summary, up to three bullets.

---

**2026-06-05 — Portfolio theme refresh** — [PR #1](https://github.com/djbriane/brian-erickson.com/pull/1), [spec](portfolio-theme-refresh--planned.md)

Replaces the Casper/Ghost-inspired presentation with a whole-site portfolio theme while preserving the v1 content model and static deployment posture.

- Upgrades Astro to v6 and migrates the content layer API.
- Adds portfolio theme tokens, fonts, sticky navigation, refreshed homepage/project/blog/resume/contact/404 treatments, and default social image metadata.
- Completes final responsive browser QA at 375px, 768px, and desktop widths with contrast polish for metadata, links, and tags.
