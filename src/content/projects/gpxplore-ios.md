---
title: GPXplore for iOS
date: 2026-10-01
status: shipped
tags:
  - Product
  - iOS
  - SwiftUI
  - Maps
summary: A native backcountry motorcycle trip planner, built with coding agents and released on the App Store. Turn a long route into rideable days, choose where to stop, and take the plan with you.
subtitle: From a personal planning problem to the App Store
cover_image: /images/projects/gpxplore-ios.webp
highlights:
  - Plan a long route day by day, with distance, dirt, and effort to guide each stop.
  - Choose campgrounds or towns and see how a new endpoint changes the day.
  - Import GPX tracks, keep plans on your device, and export the route for your GPS.
links:
  app_store: https://apps.apple.com/us/app/gpxplore-backcountry-planner/id6814602855
  live: https://www.gpxplore.net/
featured: true
---

I built GPXplore because planning an adventure motorcycle trip meant juggling maps, GPX files, campground research, and separate GPS tools. My friend David and I take a fall trip each year, and I wanted a better way to plan our Montana and Idaho ride: enough information to make good decisions, with room to change the plan as we went.

The [web planner](/projects/gpxplore/) began as a tool for trimming GPX tracks. The iPhone app initially had a much smaller job: carry the plan on the bike so I didn't need a printed sheet. It grew into a native app that can build the trip itself.

## The product challenge

The hard part wasn't displaying a route. It was making a long ride manageable, one day at a time.

A route's published sections don't necessarily match the days you want to ride. We often stop in town for fuel, then continue into the wilderness to camp. Moving an endpoint needs to change today's ride and leave the remaining route ready for tomorrow.

I rebuilt the planning flow around those decisions. Choose a route, work through the days, find a place to stop, and see what the choice does to distance, dirt, and effort before committing. That also meant rethinking interactions that had worked with a mouse on the web so they could feel natural on a phone.

## Building with agents

This was also an experiment: could I ship a substantial app while having agents write the code?

I used Claude and Codex for implementation, with specs, questioning sessions, phased execution plans, and periodic agent-led architecture and code reviews. SwiftUI guidance, Apple's Human Interface Guidelines, and design references gave the agents concrete constraints.

My work was defining the behavior and judging the result. Dictation, screenshots, and Apple Pencil annotations helped communicate the details. Getting trimming, map interactions, spacing, and the transitions between planning steps to feel right took repeated use and feedback.

## Three connected projects

GPXplore spans a web planner, a data pipeline, and this native iOS app. The pipeline prepares planning data, including road surface information. The web and iOS products share a trip-file contract so plans can move between them.

The native app supports GPX import and export, route exploration, campground discovery, and multi-day planning. Trips stay on the device without requiring an account. Saved plans can be opened without a signal; map availability is a separate concern.

## Released, and still learning

Apple approved GPXplore, and it is now available on the App Store. That is a milestone in a project that started with a trip I wanted to take and became a test of how much I could build with agents.

The next challenge is getting it into the hands of riders. Success for me is an engaged group of people using it, sharing where it falls short, and helping shape what comes next.
