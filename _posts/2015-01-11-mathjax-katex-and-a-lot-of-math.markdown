---
layout: post
title: MathJax, KaTeX and a lot of Math
author: Jan Marthedal Rasmussen
excerpt: ! "Prior to the current post, this blog contained 45 posts with a total
  of 2307 math items, where a math item is anything from single-letter variable
  identifiers to large, multi-line equations. That's an avarage of 51 math items
  per post, ranging from a few posts containing no math at all to one containing
  267 items.
  
  From the beginning I have used MathJax to display the math [...]"
categories:
- programming
tags:
- jekyll
- mathjax
- katex
- typesetting
- blogging
# Posts: 45
# Math items: 2307 in total, 51 items/post on average
# Loading and typesetting all posts: 0.99 s/post <!--986 ms/post--> on average
# As above but with MathJax disabled: 290 ms/post on average
# Posts: 10
# Math items: 1523 in total, 152 items/post on average
# Loading and typesetting all posts: 2106 ms/post on average
# As above but with MathJax disabled: 281 ms/post on average
# Posts: 45
# Math items: A total of 2079 using KaTeX, 228 using MathJax
# Loading and typesetting all posts: 637 ms per post on average
# As above but with MathJax disabled: 296 ms per post on average
# Posts: 10
# Math items: A total of 1330 using KaTeX, 193 using MathJax
# Loading and typesetting all posts: 1256 ms per post on average
# As above but with MathJax disabled: 349 ms per post on average
---
Prior to the current post, this blog contained 45&nbsp;posts with a total of 2307&nbsp;math items, where a math item is anything from single-letter variable identifiers to large, multi-line equations. That's an avarage of 51&nbsp;math items per post, ranging from a few posts containing no math at all to [one](/2009/04/the-game-of-nim.html) containing 267&nbsp;items.

From the beginning I have used [MathJax](http://www.mathjax.org) to display the math (actually, the first few years I used [jsMath](http://www.math.union.edu/~dpvc/jsmath/), the predecessor of MathJax). MathJax does a great job of typesetting math according to the rules of [TeX](http://en.wikipedia.org/wiki/TeX). It is basically a JavaScript library which takes care of scanning a web page for math content and then typesetting it using HTML and CSS *on the fly* by inserting elements into the DOM, loading fonts, querying DOM elements for, e.g., widths when doing alignments, and so on. (Note that MathJax has other [output modes](http://docs.mathjax.org/en/latest/output.html) than HTML+CSS, but this is what I use and by far the most used.) This on-the-fly behaviour is necessary to enable all the complex scenarious that MathJax support:

> The HTML-CSS output is highly browser and client dependent. From basic things like installed fonts to tricky things
> like hacks around browser and OS bugs, MathJax does a lot of work to guarantee identical display across all browsers.
> So in a very real sense, you cannot store the HTML-CSS output -- as soon as it gets somewhat complex, it will not
> render well across browsers.&nbsp;&nbsp;&nbsp;&horbar;[Peter Krautzberger](https://groups.google.com/d/msg/mathjax-users/O--eKm9elRU/zNZx24gnI3gJ), MathJax manager

I have been quite pleased with MathJax, and I still am. There is one caveat, though: It can be a bit slow. This need for on-the-fly processing comes at a cost. Every time a page loads in someone's browser, everything has to be typeset from scratch. Often, this is not a problem. By the time the page has loaded and your eyes has found the opening paragraph, MathJax is done. But sometimes the page is very math-heavy and MathJax has to work hard for so long that it becomes annoying.

In September 2014, the [KaTeX project](https://khan.github.io/KaTeX/) was [announced](https://twitter.com/jeresig/status/511586911669211136). The KaTeX library takes LaTeX as input and produces HTML as output. When such output is then put on a web page together with the KaTeX CSS file, the math is rendered by the browser using just the HTML and CSS (the CSS points to a number of special-purpose [web fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)). Why is this possible without any JavaScript? Mainly because only a small subset of LaTeX is supported and because old browsers are not supported.

I recently tried using KaTeX for the math on this blog. This was an obvious thing to try since the blog is statically generated using [Jekyll](http://jekyllrb.com). When each instance of LaTeX markup was processed as part of the Markdown to HTML conversion, a small ([node.js](http://nodejs.org)) web service wrapping the KaTeX libray was queried to produce the corresponding HTML code.

The KaTeX conversion failed in about 10% of time, though, because LaTeX commands and symbols not supported by KaTeX were being used (mostly multi-line environments). In these cases the conversion would fall back on using MathJax. (It should be noted that some of the unsupported symbols were easy to add. These additions along with a few bug fixes can be found in my [KaTeX fork](https://github.com/janmarthedal/KaTeX).)

I was quite pleased with this hybrid solution and the increase in speed was clearly noticable. But how much faster? Was it possible to quantify the increase in speed?

An experiment was set up where my browser would run through all the blog's posts in succession. By listening to [MathJax's `End` signal](http://docs.mathjax.org/en/latest/startup.html), the next post would be loaded as soon as MathJax had finished typesetting the current page. For comparison, a similar experiment was performed, but this time *without* loading the MathJax library (the next page would now load as soon as the browser triggered the [onload event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers.onload)). This way, the same pages and resources would be loaded&mdash;with the exception of MathJax, of course.

First, I timed running through all the posts using just MathJax and no KaTeX. The results can be summarized as follows:

*  Posts: 45
*  Math items: 2307 in total, 51 items/post on average
*  Loading and typesetting all posts: 0.99 s/post on average
*  As above but with MathJax disabled: 0.29 s/post on average

So it took an average of about one second to load a page and typeset the math. That didn't sound too bad. But many of the 45 posts contained no or little math, and some contained a lot. Focusing on just the 10 posts that contained most math items, the results were:

*  Posts: 10
*  Math items: 1523 in total, 152 items/post on average
*  Loading and typesetting all posts: 2.1 s/post on average
*  As above but with MathJax disabled: 0.28 s/post on average

More than two seconds before a user sees the final page is generally not good. And these numbers even benefit from fast hosting (the MathJax CDN and [GitHub pages](https://pages.github.com)), a fast internet connection, and the fact that loading all the posts in succession allows the browser to make heavy use of caching.

How about when around 90% of the math was pre-converted to HTML by KaTeX? The numbers:

*  Posts: 45
*  Math items: A total of 2079 using KaTeX, 228 using MathJax
*  Loading and typesetting all posts: 0.64 s/post on average
*  As above but with MathJax disabled: 0.30 s/post on average

And the most math-heavy posts:

*  Posts: 10
*  Math items: A total of 1330 using KaTeX, 193 using MathJax
*  Loading and typesetting all posts: 1.3 s/post on average
*  As above but with MathJax disabled: 0.35 s/post on average

A significant improvement. And in fact, my own personal experience of loading posts before and after introducing KaTeX to my blog was even more noticable that these number seem to reflect. This is probably due to the fact that the initial paragraphs of posts generally contain fairly simple math items and thus items that KaTeX can handle. That gives MathJax time to work on the items [below the fold](http://en.wikipedia.org/wiki/Above_the_fold#Below_the_fold).

I was quite pleased with this MathJax+KaTeX hybrid solution and I decided to keep on using it. One negative aspect is that the fonts used by MathJax and KaTeX are not identical, but the difference it is so small that it doesn't bother me.

I won't attempt to make any general conclusions regarding the speed of MathJax and KaTeX. Factors like browser, CPU speed, network bandwidth and especially the specific use case all influence the performance of both approaches. But in my case, with this blog, using KaTeX together with MathJax turned out to be a good fit.
