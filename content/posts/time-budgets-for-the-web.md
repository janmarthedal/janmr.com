---
title: Time Budgets for the Web
date: 2015-04-26T12:00Z
layout: post
tags:
  - web-development
categories:
  - development
excerpt: >-
  I was recently introduced to the so-called RAIL principle in the Udacity MOOC
  Browser Rendering Optimization. It is an acronym for **R**esponsive,
  **A**nimation, **I**dle and **L**oad and introduces some time budgets to
  follow when creating a smooth and responsive web experience. It seems to have
  been a concept coined by the Google Chrome team and is also mentioned in a
  recent talk by Google's Paul Irish. [...]
redirect: /blog/2015/04/time-budgets-for-the-web/
---
I was recently introduced to the so-called RAIL principle in the Udacity MOOC [Browser Rendering Optimization](https://www.udacity.com/course/browser-rendering-optimization--ud860). It is an acronym for **R**esponsive, **A**nimation, **I**dle and **L**oad and introduces some time budgets to follow when creating a smooth and responsive web experience. It seems to have been a [concept](https://docs.google.com/document/d/1bYMyE6NdiAupuwl7pWQfB-vOZBPSsXCv57hljLDMV8E/) coined by the Google Chrome team and is also mentioned in a [recent talk](https://youtu.be/2ksXo2_Lfl0) by Google's [Paul Irish](http://www.paulirish.com/).

As Paul Irish mentions in his talk, the RAIL principles are built upon [research from 1993](http://www.nngroup.com/articles/response-times-3-important-limits/) by Jakob Nielsen which states that

   * **0.1s** is the limit for having the user feel that a system reacts instantanously.
   * **1s** is the limit for the user's flow of thoughts to stay uninterrupted.
   * **10s** is the limit for keeping the user's attention.

In short, the RAIL principles are as follows.

**Responsive**. When a user interacts with a page, e.g. clicks an item or presses a key, the page should react to that action within **100ms**.

**Animation**. When an animation runs on a page it should run at 60 frames per second. Since the browser also has some work to do per frame, [it leaves around](https://developers.google.com/web/fundamentals/performance/rendering/) **10ms** per frame for calculations, manipulating the DOM, etc. Note that scrolling or dragging objects also fall under this animation category.

**Idle**. When a page has been loaded and waits for user interaction, it is said to be idle. This creates an opportunity for the web page to load further assets and in general prepare for what the user may do next. When doing this, the background tasks should each take no more than **50ms**.

**Load**. Loading a page should take no more than **1 second**. Note that this refers to the [critical path content](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/), the content that relates to the primary action the user wants to take on a page.

I think that having well-defined goals as these is a good thing and I have no doubt that these principles will lead to great web experiences. It may not always be easy to live up to them, though, and I can only recommend the course mentioned above for ways to discover issues with your site and how to fix them.
