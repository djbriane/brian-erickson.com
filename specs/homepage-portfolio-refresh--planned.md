# Homepage Portfolio Refresh

Status: Superseded by [portfolio-theme-refresh--planned.md](portfolio-theme-refresh--planned.md).

Superseded on: 2026-06-05.

Decision summary: this spec kept the first viewport anchored to the original Ghost/Casper cover and scoped the work primarily around a homepage refresh. The active direction is now a whole-site portfolio theme replacement adapted from `specs/refs/astro-theme`, including an Astro current-major upgrade before theme implementation.

The historical plan below is retained for decision context only.

## Summary

The v1 migration successfully preserves the original Ghost/Casper home cover, typography, and archive feel, but the new site structure is portfolio-first rather than blog-first. Keep the first-viewport home cover/header as the strongest continuity signal, then let the below-fold homepage diverge from Casper where needed for the current professional-presence goal.

## Goals

- Retain the existing full-screen home cover image, centered name/title, and overlay navigation.
- Make the first below-fold section state Brian's current professional thesis clearly.
- Promote GPXplore from a generic project card to the primary homepage proof point.
- Keep the writing archive visible, but quieter and clearly secondary.
- Preserve the Casper-style editorial treatment on `/blog` and post detail pages.

## Non-Goals

- Do not redesign the home cover/header in this pass.
- Do not add JavaScript islands or new frontend frameworks.
- Do not require a GPXplore screenshot before the page works.
- Do not rewrite project, resume, or blog route content models.

## Design Direction

Use the original cover as the continuity layer and a simpler modern portfolio layout below it:

- A compact professional thesis band with two to three capability notes.
- A full-width featured-work panel for GPXplore with status, tags, summary, and direct links.
- A compact archive preview that uses less vertical space than the full `/blog` index.
- Restrained neutral surfaces, 6px-or-less radii, and the existing Open Sans/Merriweather font pairing.

## Acceptance

- Homepage first viewport remains recognizably the current cover/header design.
- GPXplore is visually more prominent than archive posts on the homepage.
- Archive posts no longer dominate the first full scroll after the hero.
- Layout works at 375px, 768px, and desktop widths without text overlap.
- `npm test` and `npm run build` pass.
