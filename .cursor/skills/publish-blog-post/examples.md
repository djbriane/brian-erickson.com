# Link post shapes

Canonical patterns from the migrated archive. Prefer these lengths and rhythms.

## Attribution + quote + short take

From `prototype-first.md` (compressed shape):

```markdown
Nice post-mortem from [Hipmunk](https://example.com/article) explaining why prototyping is such a valuable tool:

> If you don't prototype your application before you start building, you're doing it wrong. It's just too much value for so little effort, you'd be nuts not to try it out.

I totally agree with this statement. I've done projects where we fully prototyped the solution prior to implementing and while it didn't catch everything it made us think through the solution before putting code to it.
```

## Attribution + quote + bridging take + second quote

From `the-hidden-costs-of-real-time-communication.md`:

```markdown
Jason Fried on the [pitfalls of group chat](https://example.com/article):

> At its very core, group chat and real-time communication are all about now. …

Jason makes a good argument that the presence of well-meaning features in group chat tools doesn't matter much if the design doesn't encourage them at a fundamental level:

> A product is a series of design decisions with a specific outcome in mind. …

More than any other group chat software I've used, Slack has gone out of its way to promote good behaviors. However, it's up to your team to be aware of the cost of real-time communication…
```

## Quote-only (rare)

From `coffee-cups-of-new-york-city.md` — use when the user wants no commentary:

```markdown
[Gear Patrol](https://example.com/article) presents a visual survey of New York's disposable coffee cups:

> The receptacle was not born in New York City, nor is it unique to NYC's busy streets — but the to-go cup's ubiquity is symbolic of a certain lifestyle…
```

## Frontmatter example (new post)

```yaml
---
title: Prototype First
date: "2026-08-07"
tags:
  - Process
description: "Nice post-mortem from Hipmunk explaining why prototyping is such a valuable tool: If you don't prototype your application before you start building…"
draft: false
---
```

No `ghost_id` on new posts.
