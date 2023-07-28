---
title: MathJax 2.4 vs 2.5
date: '2015-03-08'
layout: post
tags:
  - mathjax
  - post
categories:
  - programming
excerpt: >-
  MathJax version 2.5 was released around a month ago. One of that version's
  features were speed improvements and that's always a good thing. Seen in the
  light of my recent experiments with MathJax and KaTeX, it was straightforward
  to set up an experiment that compared MathJax versions 2.4 and 2.5 with
  respect to rendering speed. [...]
---
MathJax version 2.5 was [released around a month ago](http://www.mathjax.org/mathjax-v2-5-now-available/). One of that version's features were speed improvements and that's always a good thing. Seen in the light of my recent [experiments with MathJax and KaTeX](/blog/2015/01/mathjax-katex-and-a-lot-of-math), it was straightforward to set up an experiment that compared MathJax versions 2.4 and 2.5 with respect to rendering speed.

All instances of math were set up to be typeset using MathJax, so no KaTeX. A small piece of JavaScript code was added to each blog post in order to load all posts in succession. Each page load was considered done as soon as MathJax emitted its ['End' signal](http://docs.mathjax.org/en/v2.5-latest/startup.html). To have a base case, all posts were also loaded with MathJax *disabled*, this time loading the next blog post as soon as a page's [`load` event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload) fired.

The results were as follows:

*  Posts: 47
*  Math items: 2312, 49 items/post on average
*  **MathJax disabled**: 0.26 s/post on average
*  **MathJax 2.4**: 0.93 s/post on average (0.67 s/post typesetting)
*  **MathJax 2.5, no previews**: 0.89 s/post on average (0.63 s/post typesetting)
*  **MathJax 2.5, with previews**: 1.10 s/post on average (0.84 s/post typesetting)

The time spent on typesetting per post is estimated by subtracting the "MathJax disabled" base case from each of the cases with MathJax enabled. The entry "MathJax 2.5, with previews" represents a new feature of MathJax 2.5 where a fast, but limited, rendering method (called CommonHTML) will typeset each math item first, followed by the actual typesetting.

Above a speed improvement of around 5% was achieved when comparing MathJax 2.4 to 2.5 (without previews). Not much, but let's consider the most math-heavy posts only:

*  Posts: 10
*  Math items: 1330, 133 items/post on average
*  **MathJax disabled**: 0.28 s/post on average
*  **MathJax 2.4**: 2.27 s/post on average (1.98 s/post typesetting)
*  **MathJax 2.5, no previews**: 1.67 s/post on average (1.38 s/post typesetting)
*  **MathJax 2.5, with previews**: 2.33 s/post on average (2.04 s/post typesetting)

Here, a considerable difference between the two versions can be observed. The typesetting is close to 30% faster when comparing MathJax 2.5 (no previews) to MathJax 2.4. Quite nice.

So switching to version 2.5 seems like a no-brainer. It's faster and there seems to be no difference in the visual appearance. I have no intention of using the [CHTML preview extension](http://docs.mathjax.org/en/v2.5-latest/options/CHTML-preview.html), however. An annoying page reflow is still needed when switching from the preview to the "real" typesetting and I would rather see the final page as soon as possible. (Note that the preview extension is *enabled* by default.) My [use of KaTeX](/blog/2015/01/mathjax-katex-and-a-lot-of-math) for most of the inline, simple math, also makes the need for a fast preview even smaller.
