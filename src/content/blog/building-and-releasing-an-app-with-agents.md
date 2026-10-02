---
title: Building and releasing an app with agents
date: 2026-10-01
tags: [Product Management, AI, GPXplore, Software Development]
description: A motorcycle trip plan became a web planner, a data pipeline, and an iPhone app. What I learned about directing agents, owning the result, and knowing when to stop.
draft: false
---

On October 1, GPXplore was approved and live in the App Store. I had built a web planner, a data pipeline, and a native iPhone app without writing the code myself.

I had spent plenty of time working on it. I defined the product, worked through designs, tested interactions, asked agents to review the architecture, and went back over details until they felt right. But the implementation was handled by agents.

I started with a much smaller problem: planning a motorcycle trip with my friend David.

## A trip, a GPX file, and a first prompt

David and I take an adventure motorcycle trip every fall. Last year we rode the Colorado Backcountry Discovery Route; the year before, Wyoming. I enjoy doing a lot of the planning: working with GPS tools, researching routes, and finding places we might camp.

For this fall, we were planning to ride Montana, cross into Canada, and come back down through Idaho. Around May 18, I had the sections laid out and had researched camping options. I gave that material to Claude and asked it to help organize a day-by-day plan I could share with David.

I don't want every day locked down to a particular campsite. I want options. I want to know where the good stopping places are so we can make decisions as we ride.

Claude produced a document that looked pretty good. Then I wondered whether I could make that more programmatic, with actual routes displayed on maps.

I had already been using Lovable to build a spelling tutor and a typing app for my kids. So I tried this:

> Help me build a tool that takes GPX files (with or without elevation profiles and waypoints), displays them on a topographical map, enriches them with elevation data if its missing and allows me to trim the GPX from the start and finish (kind of like you can do in the Photos app on iOS or in Quicktime to edit a movie) to create a segment of the overall route I can then save as a new GPX file

That was the first prompt. The first product commits in the web repository are from May 20.

There was a practical reason for the trimming. I use a Beeline GPS device on the bike, and it works best for me when I can load one track at the beginning of the day and follow it. BDR files can have multiple sections, branches, and harder alternatives. Turning those into the track I actually wanted to ride took work across several tools.

I was surprised by what Lovable produced. What I had thought might be difficult for an agent to build was already possible. That made me want to see how far I could take it.

## Taking ownership

I have a development background. I've built iOS and web apps before, both as a developer and as a product manager. But my day-to-day role is product management, and I wanted to try a different way of building.

At some point, the prototype felt substantial enough that I wanted to own it on my terms. I may also have been running out of Lovable credits, but I don't remember a single decisive moment. I was getting interested in the mechanics and wanted more control over the project.

I moved the code into GitHub, cloned it locally, and started working with Claude and Codex. I wanted to use Cloudflare's free Workers plan, partly to learn how it worked and partly to control my own hosting. There wasn't a grand technology strategy behind that choice. I wanted to own it on my terms and not Lovable's terms.

The web product came first. I got it to the point where I could recreate the Montana–Canada–Idaho trip plan, shared it with some riders, and used their feedback to keep developing it.

The people I wanted to help weren't necessarily comfortable with complex mapping software. Even terminology could get in the way. The puzzle became how to make a complicated planning task approachable.

## Specs became the way I worked

Matt Pocock's skills for working with agents helped me get interested in spec-driven development. In particular, I liked the idea of a grilling session: describe what I wanted, then have the agent question it, expose gaps, and help me work through the decisions before implementation.

Once I tried that, it became pretty addictive. I could describe a thing I wanted, refine the spec, have it built, and go back as many times as I needed until it was right.

That fit how I like to work as a PM. I could direct a project I cared about personally, with agents handling implementation.

The early repository history reflects that shift. By May 22, I was writing specs for GPX export behavior, including how to produce files that worked well with the Beeline. Those specs also simplified the export choices around what a rider wanted the file to do, rather than just which brand of app would open it.

I also started using an orchestrator alongside a spec. The spec defined the behavior; the orchestrator broke implementation into phases, recommended models for the work, and gave the agent a step-by-step plan with verification between milestones. An early version appears in the repo on May 27.

I found that more manageable than handing over a large spec and asking for the entire thing at once. It also helped me work within my subscriptions. I was using the entry-level paid plans for Claude and Codex, and when I ran out of usage on one, I would switch to the other. Written decisions and a phased plan made those handoffs easier.

I switched models as they evolved and according to the task. I don't remember every model version, and I don't think that is the most useful part of the story. The durable part was the process: make the decisions explicit, give the agent context, and build toward a milestone.

[![The workflow used to build GPXplore: explore, specify, implement, verify, and release.](/images/blog/gpxplore-building-with-agents/agent-workflow.png)](/images/blog/gpxplore-building-with-agents/agent-workflow.png)

## I still had to use the thing

Getting the trimming interaction right took a lot of back and forth. The trim control, map, and elevation chart all needed to work together smoothly. An implementation could function and still feel awkward when I used it.

The agents weren't able to judge that feel the way I could. I had to try it, notice what bothered me, and communicate it. The early fixes include reducing the work triggered while dragging a trim handle and stopping the map from rezooming when I adjusted the trim.

I used dictation, screenshots, and annotations. Sometimes I pulled a screenshot onto my iPad, marked it up with Apple Pencil, and gave that back to the agent. At one point I let an agent drive the browser to investigate an issue, which worked well, although I don't remember the specific bug.

The hardest details were often the same ones that are hard with any development team: alignment, spacing, and the small interaction choices that make something feel finished. Getting those details to a point where I could look at the app and be proud of it took sustained attention.

I wasn't reviewing code line by line. I asked agents to review code and architecture, used skills and concrete guidelines, and periodically checked for unnecessary complexity or duplication. For the native app, that included Xcode skills for SwiftUI and Apple's Human Interface Guidelines. I also used Claude Design to produce designs for the coding agents to follow.

I put a lot of instruction up front, then tested the result. My development background helped me direct that work, even though I wasn't writing the implementation.

## Walking and talking through the product

In July, I had a motorcycle accident and broke my wrist. Eventually I learned I needed surgery, which meant the trip we were planning wasn't going to happen.

I was far enough into the project that I wanted to keep going. While typing was difficult, I started dictating almost everything.

I would go for a walk with my phone, talk through an idea for fifteen minutes, and give the transcript to an LLM to turn into a spec or refine an existing one. I also did grilling sessions on walks, answering the agent's questions aloud.

Speaking let me explore without being constrained by how much I could type. Walking helped me think, and capturing the ideas as they happened meant I didn't have to wait until I was back at my desk.

One idea that came out of a walk was using a small elevation-profile sparkline on each trip card. I wanted the trip list to be visually distinctive, so you could get a feel for a route from the shape of its profile. I could talk through that idea, capture it, and move it into the development process.

That unlocked a lot for me. The project kept progressing during a period when sitting down and typing wasn't easy.

## From carrying a plan to making one on the phone

The iPhone app started in June, before the accident. Initially, I just wanted to take the web plan with me on the bike without carrying a printed document. It was going to be a read-only companion: plan on the web, then bring the result to the phone.

There was an older connection, too. The first iPhone app I ever built was [MapNotes](https://github.com/djbriane/MapNotes), written in Objective-C as a skunkworks project with a designer at the company where I worked. Its beta release notes go back to 2009. I don't think we ever got it into the App Store, but the idea of attaching notes to places on a map stayed with me.

As GPXplore's native app grew, I wondered whether I could make full trip planning work on the phone as well.

The central problem was shaping the days. A BDR might have eight sections, but that doesn't mean I want an eight-day ride. David and I generally don't want to finish the day in town. We want to get fuel, leave town, and find somewhere to camp.

I wanted to judge whether a section called for a short day or whether we could ride farther and leave more time for harder terrain later. I wanted to move an endpoint to a campground twenty miles beyond a section boundary, then have the next day adjust to that decision. Turning eight sections into six riding days meant handling those changes without making the rider manage all the underlying track details.

The web interactions I'd built relied heavily on a mouse and clicking on the map. I didn't think that approach would translate well to a phone.

I used Matt Pocock's Wayfinder skill to reconsider Ride Plan as an approachable, step-by-step process. I went back to the web, replanned and rebuilt that flow, then brought the approach back to iOS. It took multiple iterations to get the movement between days, stopping places, and route adjustments to feel coherent.

## One product, three repositories

The project eventually needed three distinct homes: the web planner, the native iOS app, and a pipeline for preparing the data they used.

The pipeline handled work such as normalizing campground data and preparing route templates and enrichment. The web repo also became home to shared APIs, marketing, and operations. The native app owned the iPhone experience. A shared `.gpxtrip` file contract connected the planning experiences.

[![How the pipeline supplies prepared data to web and iOS, and how shared trip files and APIs connect the product.](/images/blog/gpxplore-building-with-agents/repo-map.png)](/images/blog/gpxplore-building-with-agents/repo-map.png)

By the October 1 launch milestone, the three main histories contained 1,821 commits, and GitHub recorded 201 merged pull requests across the repositories. There were 100 distinct days with at least one commit. The maintained source counted for this snapshot was about 149,000 product lines and 79,000 test lines, including comments and blank lines.

Those numbers describe the scale of the project, not how good the software is. The more important test for me was whether I could use it to do what I had set out to do. A few other people tested the app, but much of the product validation came from my own use and judgment. That is something I want to broaden now that it is available to riders.

[![GPXplore's journey from the first documented Lovable prototype commits on May 20 to the App Store launch on October 1, 2026.](/images/blog/gpxplore-building-with-agents/journey.png)](/images/blog/gpxplore-building-with-agents/journey.png)

_The 134 days shown here begin with the first recorded prototype commits. The trip-planning conversation that led to the tool was already underway on May 18. Commit totals include merges and exclude the inherited template; PR totals count merged PR records, not the highest PR number. [Counting details and snapshot sources](/images/blog/gpxplore-building-with-agents/asset-notes.md)._

## What changed for me as a PM

Part of the experiment was professional curiosity. People were talking about agents doing all the coding, and there was plenty of skepticism. I wanted to find out whether I could actually ship software that way.

Apple's approval felt great. I had answered that question for this project. It has given me confidence to contribute more directly to production software, including work on the Mailgun CLI and MCP servers. Before this, I might not have tried. Even with my development background, I didn't see myself as a practicing developer anymore.

As a PM, I can now go further than documents and spreadsheets. I can show people what I mean by building it, and participate in getting it to a production-ready state. I still need to understand the limits and put guardrails around the work.

I also think there is an opportunity for developers who want to participate more in product decisions: what are we building, why, and how should it work? My experience made those questions feel even more central to the work.

I wouldn't generalize a solo project into a conclusion about every development team or every kind of software. This was a product I understood personally, with a scope I could direct and test. My technical background mattered. But it changed my sense of what I could take on myself.

## I'm still trying to make sense of the change

Looking at the history of this project, I find it hard to make sense of how much has changed.

I spent multiple years of my career working on Perch, a mobile app that helped small businesses keep track of their social presence, reviews, and deals, alongside what their competitors were doing. We built it with a team. GPXplore isn't an equivalent product, but it isn't a simple app either. It brings together multiple data sources, a separate pipeline, road surface information, and the work of reading, modifying, and exporting GPX tracks.

Before these tools, I don't think I could have built this on my own. I would have expected to invest tens of thousands of dollars and get a team to help me. Being able to take it this far in a few months is still mind-blowing to me.

I've worked in software for more than thirty years, on both the development and product sides. I've seen plenty of change. This project made the current change tangible in a way that reading about agents hadn't. And the tools are still improving. I don't know where that leaves software teams, or what building products will look like as more people can execute on an idea this way.

I also wonder what the speed let me skip.

If I had needed to make that financial investment up front, I would have interviewed users, made prototypes, and put them in front of people before committing to the build. With GPXplore, I was the user. I did share it and get feedback, but I didn't let that slow me down. I kept moving forward.

Maybe a slower process would have produced a better product. I don't know yet. I know I could build and release it. I still need to learn how well it works for people whose planning habits are different from mine.

That is part of what makes this change so hard to assess. The ability to build much faster has opened up possibilities I wouldn't have pursued before. I'm still finding out what it asks of my product judgment, and what the downsides might be.

## The part I need to get better at

There is a downside I didn't expect to feel so strongly. This way of working made it easy to spend more time on the project.

One more prompt. One more adjustment. Get the agent working before bed so there is something to look at in the morning. I was passionate about the project, and it was hard to leave it alone.

I noticed that I was spending too many late nights on it and not getting the sleep I needed. I don't have a neat answer to that. The ability to keep making progress doesn't make the time and attention free. Finding a healthier balance is part of learning to work this way.

## The next test is reaching riders

GPXplore is now [on the App Store](https://apps.apple.com/us/app/gpxplore-backcountry-planner/id6814602855), with the [web planner](https://app.gpxplore.net/) alongside it. I'm looking at other Apple device formats and ways to get it into the hands of actual riders.

As building software becomes more accessible, I expect more niche apps like this. Shipping one doesn't automatically mean people will discover it or keep using it.

For me, success would be a group of riders who are passionate about the app, use it, and give me feedback that helps make it better. People willing to pay for it would be even better. But an engaged user base is the thing I most want next.

I started by asking whether an agent could build a GPX trimmer. Then I wanted to know whether I could take that way of working all the way to a release. Now I want to find out what happens when other riders take it into their own planning.
