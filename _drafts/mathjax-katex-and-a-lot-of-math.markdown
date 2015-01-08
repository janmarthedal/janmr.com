---
layout: post
title: MathJax, KaTeX and a lot of Math
author: Jan Marthedal Rasmussen
categories:
- programming
tags:
- jekyll
- mathjax
- katex
---
Prior to the current post, this blog contained 45&nbsp;posts with a total of 2307&nbsp;math items, where math item is anything from single-letter variable identifiers to large, multi-line equations. That's an avarage of 51&nbsp;mathematical items per post, ranging from a few posts containing no math at all to [one](/2009/04/the-game-of-nim.html) containing 267&nbsp;items.

From the beginning I have used [MathJax](http://www.mathjax.org) to display the math (actually, the first few years I used [jsMath](http://www.math.union.edu/~dpvc/jsmath/), the predecessor to MathJax). MathJax does a great job of typesetting the math according to the rules of [TeX](http://en.wikipedia.org/wiki/TeX). It is basically a JavaScript library which takes care of scanning a web page for math content and then typesetting it using HTML+CSS *on the fly* by inserting elements into the DOM, loading fonts, querying DOM elements for, e.g., widths when doing alignments and so on. (Note that MathJax has other [output modes](http://docs.mathjax.org/en/latest/output.html) than HTML+CSS, but this is what I use and by far the most used.) This on-the-fly behaviour is necessary to enable all the complex scenarious when typesetting math:

> The HTML-CSS output is highly browser and client dependent. From basic things like installed fonts to tricky things
> like hacks around browser and OS bugs, MathJax does a lot of work to guarantee identical display across all browsers.
> So in a very real sense, you cannot store the HTML-CSS output -- as soon as it gets somewhat complex, it will not
> render well across browsers.&nbsp;&nbsp;&nbsp;&horbar;[Peter Krautzberger](https://groups.google.com/d/msg/mathjax-users/O--eKm9elRU/zNZx24gnI3gJ), MathJax manager

I have been quite pleased with MathJax, and I still am. There is one caveat, though: Speed. This need for on-the-fly processing comes at a cost. Every time a page loads in someone's browser, everything has to be typeset from scratch. Often, this is not a problem. By the time the page has loaded and your eyes has found the opening paragraph, MathJax is done. But sometimes you want to view a very math-heavy page and MathJax has to work hard for so long that it becomes annoying.

I won't attempt to say anything general about the speed of MathJax. One thing I can do is use this blog to present some measurements.

A bit of JavaScript was added to each post that listened for when MathJax had [finished typesetting](http://docs.mathjax.org/en/latest/startup.html) and then it could redirect to the next blog post. This way, it could then be measured how long it took for the browser to run through all the posts. A similar experiment was then performed, but this time leaving out the script tag that loads the MathJax library (the next page would load as soon as the browser triggered the [onload event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers.onload)). This way, the same pages and resources would be loaded&mdash;with the exception of MathJax, of course.

The results can be summarized as follows:

*  Posts: 45
*  Math items: 2307 in total, 51 items/post on average
*  Loading and typesetting all posts: 986 ms/post on average
*  As above but with MathJax disabled: 290 ms/post on average

So it takes an average of one second to load a page and typeset the math. That doesn't sound too bad. But many of the 45 posts contain no or little math, and some contain *a lot*. So let's try to focus on the 10 posts that contain most math items. The results were:

*  Posts: 10
*  Math items: 1523 in total, 152 items/post on average
*  Loading and typesetting all posts: 2106 ms/post on average
*  As above but with MathJax disabled: 281 ms/post on average

More than two seconds before a user sees the final page is generally not good. And these numbers even benefit from fast hosting (the MathJax CDN and [GitHub pages](https://pages.github.com)), a fast internet connection, and the fact that loading all the posts in succession allows the browser to make heavy use of caching.

In September 2014, the [KaTeX project](https://khan.github.io/KaTeX/) was [announced](https://twitter.com/jeresig/status/511586911669211136). The KaTeX library takes LaTeX as input and produces HTML as output. When this output is then put on a web page together with the KaTeX CSS file, the math is rendered using just the HTML and CSS (the CSS points to a number of special-purpose [web fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)). Why is this possible without any JavaScript? Mainly because only a small subset of LaTeX is supported and because old browsers are not supported.

I recently tried to use KaTeX for the math on this blog. This was an obvious thing to try since this blog is statically generated using [Jekyll](http://jekyllrb.com). When each instance of LaTeX markup is processed as part of the Markdown to HTML conversion, a small (node.js) program is executed so the KaTeX library can produce and insert the corresponding HTML code.

The KaTeX conversion failed in many cases, though, because unsupported LaTeX commands/symbols were being used. But in these cases it was straightforward to insert the LaTeX markup with appropriate delimeters so MathJax could take care of the typesetting upon page load. (It should be noted that some of the unsupported symbols were easy to add. These additions along with a few bug fixes can be found in my [KaTeX fork](https://github.com/janmarthedal/KaTeX).)

How fast do the posts load now? The numbers:

*  Posts: 45
*  Math items: A total of 2079 using KaTeX, 228 using MathJax
*  Loading and typesetting all posts: 637 ms per post on average
*  As above but with MathJax disabled: 296 ms per post on average

And the most math-heavy posts:

*  Posts: 10
*  Math items: A total of 1330 using KaTeX, 193 using MathJax
*  Loading and typesetting all posts: 1256 ms per post on average
*  As above but with MathJax disabled: 349 ms per post on average

A significant improvement. And in fact, my own personal experience of loading posts before and after introducing KaTeX to my blog was even more noticable that these number seem to reflect. This is probably due to the fact that the initial paragraphs of posts generally contain fairly simple math items and thus items that KaTeX can handle. This gives MathJax time to work on the items [below the fold](http://en.wikipedia.org/wiki/Above_the_fold).

I am quite pleased with this MathJax+KaTeX hybrid solution and I plan to keep on using it. One negative aspect is that the fonts used by MathJax and KaTeX are not identical, but it is so little that it doesn't bother me. Another is that the the static post conversion takes *much* longer than before.

Note that I have deliberately not provided details on how I have run these experiments. This is because not too much should be put into the actual numbers, at least for making generalized conclusions on MathJax vs KaTeX. These are just my own experiences using my own blog as a test case.

