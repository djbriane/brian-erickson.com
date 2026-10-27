---
title: Closing a ten-year-old wallabag issue
date: 2026-10-27
tags: [Open Source, AI, Software Development]
description: I wanted my saved articles on a small e-ink reader. That led to an OPDS catalog for wallabag, a feature first requested in 2015, built with agents and merged upstream.
draft: false
---

This morning, [wallabag/wallabag#9074](https://github.com/wallabag/wallabag/pull/9074) was merged. It adds an OPDS catalog to wallabag, so e-reader apps can browse your saved articles and download them as EPUBs. Merging it closed [issue #1253](https://github.com/wallabag/wallabag/issues/1253), "OPDS Catalog service," which was opened in July 2015.

I didn't set out to close a ten-year-old issue. I wanted to read my saved articles on a new e-reader.

## The problem: articles on a small e-ink screen

[wallabag](https://wallabag.org/) is a self-hosted read-it-later service. You save an article from the browser or your phone, and it keeps a clean copy for later. I run it on a small server at home.

The [Xteink X4](https://www.xteink.com) is a small e-ink reader. I run the open-source [CrossPoint Reader](https://github.com/crosspoint-reader/crosspoint-reader) firmware on it. CrossPoint can browse an [OPDS](https://specs.opds.io/opds-1.2) catalog, the standard e-readers use to list and download books from a server.

wallabag could already export articles as EPUB, but only from a logged-in browser session. It had no OPDS catalog. To get an article onto the reader, I would have to export it on a computer and then move the file over. I wanted to pick articles from the reader itself.

## A request from 2015

Before building anything, I searched wallabag's issues. Issue #1253 asked for exactly this, and the thread read like a short history of the problem.

In 2016, a contributor laid out how it could work. E-readers mostly can't log in, so the catalog should live at a URL with a token in it, "kinda like RSS feeds," with a new controller and an XML template. Another person was running a cron job to export unread articles into an EPUB and serve it from a separate OPDS server. Someone else gave up on OPDS and wrote [wallabako](https://gitlab.com/anarcat/wallabako/), a Kobo client that uses wallabag's API instead. Others asked for it from rooted Kindles and KOReader. Earlier this year, one of the maintainers pointed to a PHP OPDS library that might help.

Nobody had opened a pull request. That meant there was steady interest and no competing design to work around. The original request had also scoped it as read-only. You could browse and download, but not mark articles as read or tag them. I had come to the same boundary on my own.

## Planning the design first

I worked the way I had on [GPXplore](/blog/building-and-releasing-an-app-with-agents/). Before any code, I went through a grilling session with Claude and wrote a spec. Eleven decisions came out of it, each with a reason, including:

- **OPDS 1.2, the Atom/XML version.** CrossPoint's parser only reads Atom, wallabag already generates Atom for its RSS feeds, and most readers support it.
- **A feed token in the URL**, reusing wallabag's existing RSS token. This is the approach suggested in the issue in 2016.
- **Shelves that match wallabag's:** unread, starred, archive, and all, paginated like the RSS feeds.
- **A digest:** one EPUB with your 20 most recent unread articles, each as a chapter, capped at 50.
- **No write-back.** Downloading an article doesn't mark it read. Doing that on a plain download could lose unread articles without warning.

The spec also listed what I was leaving out: tags, cover images, search, Basic auth, and OPDS 2.0. Each is a reasonable feature. Leaving them out kept the first pull request small enough for a maintainer to review.

Most of the feature already existed in wallabag. The RSS feed controller showed how to authenticate by token and paginate. The EPUB export already generated EPUBs. The work was connecting those pieces in the shape OPDS expects.

## What the code needed

Two problems came up during the build.

**The EPUB export assumed a logged-in user.** It read the current user from the browser session to get settings such as reading speed. A token-authenticated OPDS request has no session, so the export failed. The fix was to let the caller pass in the user explicitly. When a caller doesn't, the export still reads the user from the session, so existing code behaves the same.

That also meant adding an ownership check. The normal permission check doesn't run on token routes, so without one, a valid token could download another user's article by ID. Requesting someone else's article now returns a 404.

**Titles showed up with HTML entities on the device.** Before I tried the real hardware, I had the agent reimplement CrossPoint's OPDS parser in Python and run it against the feeds. That showed what the reader would actually display. A title like _l'occasion_ came through as `l&#039;occasion`. The templates I had copied from the RSS feed escaped the text and then wrapped it in a CDATA block, so the parser never decoded the entity. Plain escaped text fixed it, and a test now catches it if it comes back.

The pull request ended up as 559 added lines across ten files. It included 15 functional tests covering the feeds, pagination, the digest limits, single-article downloads, bad tokens, and cross-user access. It also added a user guide and a link to the catalog from wallabag's feed settings page.

## Using it before sharing it

I built the first version in June and didn't open the pull request until October. In between, I used it.

I set the fork up as a Docker image on my home server and pointed the X4 at it. That surfaced problems that had nothing to do with OPDS, such as a production config error that broke the cache build. I wanted to be sure the feature held up in daily use before asking a maintainer to review it.

[![The wallabag OPDS catalog on an Xteink X4: a Digest of the 20 most recent unread articles, then Unread, Starred, Archive, and All.](/images/blog/wallabag-opds/device-root.jpg)](/images/blog/wallabag-opds/device-root.jpg)

[![A wallabag shelf on the X4, listing saved articles ready to download as EPUBs.](/images/blog/wallabag-opds/device-shelf.jpg)](/images/blog/wallabag-opds/device-shelf.jpg)

## Opening the pull request

On October 7, I merged in the latest wallabag changes, opened the pull request, and left a comment on the 2015 issue linking to it. I followed wallabag's PR template, referenced the 2016 suggestion I was following, and explained why I hadn't used the library a maintainer had suggested. The feed is small and mirrors the existing RSS template, but I said I'd switch if they preferred the library. The next day I posted photos of it running on the X4.

Twenty days later, a maintainer approved it with "This looks good to me 👍🏼" and merged it. Within the hour, someone on the issue asked when it would reach the hosted version of wallabag. The answer was wallabag 2.7, which doesn't have a release date yet.

## What I took from it

With GPXplore, the question was whether I could ship my own product with agents. This was a different test: contributing to someone else's established codebase, with its own conventions, its own reviewers, and ten years of discussion behind the request.

The same habits applied. The spec and the grilling session made me find the existing patterns in wallabag before writing anything new. That meant reusing the RSS feed's auth and pagination and keeping the scope narrow. Simulating the reader's parser caught a bug I would otherwise have found on the device, or that a reviewer would have found for me. Running it at home before opening the PR meant I was offering something I already relied on.

The agents wrote the code. My part was deciding what belonged in the first PR and what didn't, checking it against a real device, and presenting it in a way that respected the maintainers' time. That part may matter more in open source than anywhere else. Reviewers' time is limited, and a small, well-scoped PR that follows the project's own patterns is much easier to say yes to.

The issue's first reply, in 2015, guessed that OPDS "wouldn't be much difficult" because wallabag already exported EPUBs. That turned out to be right. The pieces were there for years. Someone just needed to want it on a specific device badly enough to put them together.
