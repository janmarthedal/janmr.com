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
- mathjax
# Posts: 47
# Math items: 2312 in total
# No MathJax: 8014
# MathJax 2.4: 34985
# MathJax 2.5, no previews: 37172
# MathJax 2.5, with previews: 44760
# Posts: 10
# Math items: 1528 in total
# No MathJax: 2620
# MathJax 2.4: 15599
# MathJax 2.5, no previews: 14704
# MathJax 2.5, with previews: 20934
---
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
