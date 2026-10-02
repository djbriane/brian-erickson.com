# GPXplore: building and releasing an app with agents — asset pack

Prepared October 1, 2026. These are assets and evidence notes for a future post, not a finished post.

## Files

1. `01-entire-journey`: overview and seven dated milestones, 1600 × 2040.
2. `02-how-the-repos-fit`: conceptual repo and contract map, 1600 × 1290.
3. `03-agent-workflow`: the documented process, 1600 × 1280.
4. `04-building-rhythm`: activity across one shared calendar, 1600 × 1170.
5. `05-first-prompt`: the exact opening request, 1600 × 1540.

Each graphic comes as a PNG for blog uploads and an editable, scalable SVG. The palette follows the marketing site's forest / sand / clay direction. No external photography or tool logos are used. `index.html` is a local gallery.

## Headline statistics

| Repo | Main-history commits | GitHub merged PRs | Active days | Product source lines | Test source lines |
|---|---:|---:|---:|---:|---:|
| Web | 976 | 130 | 51 | 61,533 | 25,620 |
| Pipeline | 114 | 19 | 22 | 18,410 | 6,500 |
| iOS | 731 | 52 | 65 | 68,951 | 46,797 |
| Combined | **1,821** | **201** | **100 unique dates** | **148,894** | **78,917** |

Earliest non-template product commits: **May 20, 2026**. Native iOS first commit: **June 8, 2026**. Pipeline first commit: **July 1, 2026**. App Store live: **October 1, 2026**, confirmed by the owner.

May 20 to October 1: **134 elapsed days**, or 135 calendar dates inclusive. The initial idea may predate the first recorded commit. We have not claimed its exact conception date.

## Definitions and scope

- Commits: all commits reachable from each repository's remote `main` at the captured SHA, including merge commits. Excludes the one inherited Lovable template commit, dated January 1, 2025. Commit totals include docs, data and configuration work, not just code changes.
- The recently pushed marketing launch/badge commit on `feature/marketing-app-store-launch` is not in web main and is excluded. Unmerged branches and uncommitted local edits are excluded in every repo.
- PRs: GitHub PR records with a non-null `merged_at`, across each repository. These are counts, not the last PR number. Two merged web PRs (#153/#154) have merge SHAs absent from captured main; the main-reachable merged PR count is 128 for web / 199 combined. The graphics consistently use the repository-wide GitHub merged count of 130 / 201.
- Active days: distinct commit **author dates**, converted to **America/Denver**, from the included main histories. Combined active days are the union of dates, not 51 + 22 + 65. Author dates may differ from merge dates and do not prove hours worked on a date.
- Product/test lines: physical tracked text lines, including comments and blanks. Tests are separate. Rounded graphic figures are 149k product and 79k tests. Combined physical lines: 227,811.
- iOS: Swift under `gpxplore/` (product); `gpxploreTests/` and `gpxploreUITests/` (tests).
- Web: maintained TS/TSX/JS/MJS/CSS/HTML under app/package `src` trees, plus the marketing workspace. `.d.ts` files excluded. Test paths/filenames (`test`, `tests`, `__tests__`, `.test.`, `.spec.`) classified separately. Root tooling and tests outside this source-path policy are excluded.
- Pipeline: Python/shell/JS/MJS/TS/CSS/HTML under `pipeline/`, `deploy/`, `scripts/`, `tests/`. Prototypes excluded.
- Data snapshots, GPX source data, vendored code, node modules, binary assets, generated build output, documentation and configuration files are excluded from line totals. These are selected maintained source counts, not a claim to count every executable file in the repositories.

The figures describe project history and source size. They do not measure productivity, quality, hours, cost, agent-written percentage or human-vs-agent contribution.

## Milestone evidence

- **May 20 / Lovable**: earliest non-template commits attributed to `gpt-engineer-app[bot]`; subjects include GPX segment trimming, elevation profile, map-hover synchronization and layer switching. [GPX segment trimmer commit](https://github.com/djbriane/gpx-route-planner/commit/224d9ac). Lovable attribution is also supported by the retained build dependency and earlier docs.
- **May 23 / repeatable work**: [README, contributing guide and agent workflow docs](https://github.com/djbriane/gpx-route-planner/commit/debba3c22a22407fa726849169f233e63e56b1d8).
- **June 8 / iOS begins**: [initial Xcode scaffold](https://github.com/djbriane/gpxplore-ios/commit/6f94de5).
- **June 16 / shared trip contract in iOS**: [gpxtrip mapper](https://github.com/djbriane/gpxplore-ios/commit/8e44702a9c9cbec816d035f3547d66558f96f7bd). Web transfer support began June 12; the graphic's June 16 milestone marks the native consumer, not invention of the file format.
- **July 1 / pipeline begins**: [first campground ingestion pipeline](https://github.com/djbriane/gpxplore-pipeline/commit/ec39b33); downstream publishing followed the same day.
- **September 23 / TestFlight preparation**: [release preparation commit](https://github.com/djbriane/gpxplore-ios/commit/8013e884d6bf97c65a3d9ba8599f9cfd3d063586). This is preparation, not an asserted first tester installation date.
- **October 1 / launch**: owner confirmed approval and live listing; [App Store](https://apps.apple.com/us/app/gpxplore-backcountry-planner/id6814602855), [v1.0 release](https://github.com/djbriane/gpxplore-ios/releases/tag/v1.0).

## Repo map evidence

Pipeline README's downstream-publishing section and `specs/refs/system-architecture--ref.md` describe the build-time data publication and separate runtime enrichment path. Web owns the Cloudflare API gateway; pipeline owns normalization, snapshots, route artifacts and runtime/build tooling; iOS owns the native app. The shared `.gpxtrip` contract is documented in both client repos. The map intentionally abstracts deployment hosts and secrets.

The workflow graphic summarizes repository conventions: specs/ADRs/agent instructions, implementation, verification, PR review, release. It does not establish that every action was automated, which agent authored each change, or how often the human intervened.

## Details to fill in from memory before writing

- When the idea first occurred, before the recorded May 20 prototype activity.
- The problem or ride that made the prototype worth building.
- The actual sequence of coding agents/tools used beyond Lovable.
- Two or three specific moments: a helpful agent decision, a mistake you caught, a hard handoff or debugging session.
- Any hours, spending, retries or rejection history you want to discuss (not available from these metrics).

These are evidence gaps for the future narrative; the graphics are usable without inventing answers.

## Suggested alt text

1. GPXplore's 134-day journey from Lovable prototype to App Store launch across web, pipeline and iOS, with 1,821 commits, 201 merged pull requests and 100 active days.
2. Diagram showing the pipeline preparing shared data for web and iOS, trip plans moving through the gpxtrip contract, and both clients accessing shared runtime services through the web API.
3. Five steps in building with agents: explore, specify, implement, verify and release, grounded in GPXplore's documented repository workflow.
4. Calendar grids showing days with at least one commit in each of the web, iOS and pipeline main histories, across May 20 through October 1, 2026.

## Frozen main refs

- gpxplore-web: `35821ff6250d055ad210373b2005abdc67094f3e`
- gpxplore-pipeline: `2c5cf09a244edf96ded1b1a1fe4c4ee7f9e3a399`
- gpxplore-ios: `bfa6438879c26318e7e2d2795121f09cd921ca47`

## Original first prompt — supplied by the creator

> Help me build a tool that takes GPX files (with or without elevation profiles and waypoints), displays them on a topographical map, enriches them with elevation data if its missing and allows me to trim the GPX from the start and finish (kind of like you can do in the Photos app on iOS or in Quicktime to edit a movie) to create a segment of the overall route I can then save as a new GPX file

The creator identified this as the first prompt. Its exact date has not been supplied. The graphic keeps the original wording, spelling and punctuation; line wrapping is only for display. May 20 remains the first documented product commit date.

This adds a concrete origin to the future narrative: a familiar Photos/QuickTime trimming interaction applied to GPX, before the separate native app and pipeline existed. That growth is evidenced by the three repo histories; motivations beyond the supplied prompt should come from the creator.

Alt text for graphic 5: GPXplore’s original prompt asks for a tool to open GPX files, display them on a topographical map, fill missing elevation, trim both ends like a video, and save the resulting route segment as a new GPX.
