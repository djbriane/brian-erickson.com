---
title: The Trouble With Photos
date: "2016-03-15"
tags: []
description: "Over the past year, much has been made about Apple's declining software quality and while I'm not part of the 'Apple is doomed' camp, Walt Mossberg's…"
draft: false
ghost_id: 20
---

![Photos App Syncing Error](/images/blog/photosapp-hero-alt-copy.png)

Over the past year, [much has been made](https://marco.org/2015/01/04/apple-lost-functional-high-ground) about Apple's declining [software](http://www.loopinsight.com/2016/02/03/about-walt-mossberg-and-apples-app-problem/) [quality](http://daringfireball.net/2016/02/apples_app_problem) and while I'm not part of the 'Apple is doomed' camp, Walt Mossberg's [observation](http://www.theverge.com/2016/2/3/10900612/walt-mossberg-apple-iphone-ios-mac-osx-app-problems) about the Photos app hit home for me:

>iCloud Photo Library works quickly and accurately on my iPhone and iPads, but is slow and balky on the desktop. I am not one of those people with 50,000 or 100,000 pictures, but it still takes forever on the Mac to find older photos, and some show up as just blank thumbnails. That isn’t Apple quality. 

Mossberg doesn't provide much in the way of specifics surrounding his problems (something he's been criticized for) so I wanted to give a bit of detail on the Photos bug that has been frustrating me over the past year.

Before I dive into the problem, I think it's helpful to understand how far we've come in the way we manage our digital photo libraries. For me it started with saving the digital files off my camera memory card, possibly burning them to a CD for archiving but inevitably losing them during a move or upgrade to a new computer. Then came Flickr and suddenly it was possible to upload photos for backup and sharing, as long as I didn't want to download the originals again at full-resolution. Fast forward to a time where most photos are taken with our phones and Apple brought us iPhoto and Photo Stream, giving hope that all of the photos on our devices would be synced to our libraries (as long as you took care to backup the 40gb iPhoto library file). However, it turns out access to every photo you've taken created serious problems with organization and storage limits.

Therefore, when Apple launched the redesigned Photos app with iCloud Photo Library I was excited by the prospect of not having to worry about syncing photos to and from my devices or manually organizing them into albums if I ever hoped to find them again. Once I experienced the delight of snapping a photo on my iPhone and seeing it immediately available in Photos on my MacBook, I was hooked (it still makes me smile.. when it works). 

The reason I mention this is to note how far we've come but also that the frustrations with losing so many photos have conditioned me to be cautious in trusting a service to store them for me (especially now that I have children and hundreds of photos / videos I can never reproduce).

That brings me to the crux of the issue. About once a week when I open the Photos app on my Mac (usually to make a quick edit to a photo I took on my device) I get a message telling me that there are several photos waiting to be downloaded:

![Waiting to Download](/images/blog/photosapp-waiting.png)

This message will stay unchanged (and in true Apple style, provides no ability to see more detail about what is going on) until I fully REBOOT my computer, at which point syncing will resume. As a former Windows user, it's like a flashback to the days where daily reboots were par for the course (normally my MacBook will not need a reboot for weeks at a time). 

Sadly, that isn't the end of this story. Enter the dreaded circle of death:

![Circle of Death](/images/blog/photosapp-hero-1.png)

Because I've enabled 'Download Originals to this Mac' (tells Photos to store the full-resolution originals on my local drive), once a photo has finished syncing I presume I'll be able to make edits to it or export it at any time, even if I'm not online. I discovered recently that if Photos syncing is 'stuck', sometimes photos from months ago inexplicably show the circle of death icon in the corner, preventing me from editing or exporting (not exactly building confidence that my photos are safely saved). Behind the scenes it appears the photo is available locally but Photos thinks it needs to be synced with iCloud and prevents editing or exporting. 

Time for another reboot!

![Have you tried turning it off and back on again?](/images/blog/photosapp-turningitoffandonagain.jpg)

The experience of managing and archiving photos has improved dramatically in the past few years and I applaud Apple for making the syncing and backup process feel truly magical. However, now that we have experienced the magic, Apple has to take responsibility for making sure the cloud 'just works' every time for everyone (just like it has made OS X crashes a [thing of the past](http://www.macworld.com/article/2987277/operating-systems/os-x-el-capitan-review-mac-upgrade-thats-as-solid-as-a-rock.html)).
