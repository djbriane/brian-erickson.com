---
title: GPXplore
date: 2026-05-24
status: active
tags:
  - Product
  - Maps
  - GPX
  - Cloudflare
summary: A local-first backcountry route planner for building GPX routes, assembling multi-day rides, and carrying printable or mobile day references into the field.
subtitle: Backcountry route planner
links:
  live: https://gpxplore.net
featured: true
---

GPXplore is a local-first planning tool for backcountry motorcycle and bicycle trips. It grew out of a practical problem: planning off-pavement rides means juggling GPX files, route geometry, camps, fuel, water, hazards, printouts, and the field devices riders actually use once they leave the desk.

The app combines a route planner, route library, multi-day trip assembly, printable day sheets, and a mobile ride-reference mode. The product shape is intentionally pragmatic: keep route and trip data in the browser, avoid accounts until there is a real need, and make export workflows work for the devices riders already carry.

Technically, GPXplore uses React, TanStack, Leaflet, Chart.js, Zustand, GPX parsing/export logic, Web Workers for heavier file work, and Cloudflare Workers for deployment and selected API proxying. The project has shipped route thumbnails, elevation and effort metrics, campground and wildfire overlays, DMD2 import/export support, and local backup/restore.

It is active and evolving, but already substantial enough to represent the kind of product work I enjoy: technically ambitious, rooted in real workflows, and shaped by the small frictions people hit when software meets the physical world.

