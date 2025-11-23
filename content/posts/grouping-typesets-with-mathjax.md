---
title: Grouping Typesets With MathJax
date: '2015-03-03'
layout: post
tags:
  - mathjax
categories:
  - programming
excerpt: >-
  When MathJax typesets the equations on a web page, it does a good job of
  grouping the work into chunks, so that a chunk of equations (see the EqnChunk
  option) will be typeset before they are displayed and the next chunk is
  processed. Typesetting and displaying one equation at a time leads to a lot of
  screen flickering and it also takes longer before the page is completed
  because of the increased work for the browser.

  Sometimes you want to typeset and display a lot of equations dynamically [...]
_redirect: /blog/2015/03/grouping-typesets-with-mathjax/
---
When [MathJax](http://mathjax.org) typesets the equations on a web page, it does a good job of grouping the work into chunks, so that a chunk of equations (see the [EqnChunk option](http://docs.mathjax.org/en/v2.5-latest/options/HTML-CSS.html) will be typeset before they are displayed and the next chunk is processed. Typesetting and displaying only one equation at a time would lead to a lot of screen flickering and it would also take longer before the page has been completed because of the increased work for the browser.

Sometimes you want to typeset and display a lot of equations [dynamically](http://docs.mathjax.org/en/v2.5-latest/typeset.html). For the sake of this post, let us assume that we have an array `scripts` where each entry refers to an HTML script element containing some TeX to typeset. (Using script elements and [`MathJax.Hub.Process`](http://docs.mathjax.org/en/v2.5-latest/api/hub.html#Process) avoids the need for running any preprocessors, but the following is equally valid when using `MathJax.Hub.Typeset` and preprocessors.)

In this case it is easy to trigger the typesetting as

``` javascript
MathJax.Hub.Queue(["Process", MathJax.Hub, scripts]);
```

This is an efficient way to do it and MathJax will take care of all the equation chunking ([demo](http://jsfiddle.net/janmr/g870rjLp/1/)). If fact, it is *the best* way and should be used whenever possible. But sometimes the equations are not available in one big array and you wish to tell MathJax to process the equations as they become available. This use-case can be simulated by running

``` javascript
for (var k = 0; k < scripts.length; k++)
  MathJax.Hub.Queue(["Process", MathJax.Hub, scripts[k]]);
```

Submitting typesetting requests this way will lead to *no chunking*. Each equation will be typeset and put into the DOM one by one. Prior to version 2.5, control would not be returned to the browser's drawing layer before the whole queue had been emptied. This would make all equations appear at once when the queue was empty, but each equation insertion would *still require a page reflow*. With version 2.5, however, a short delay was inserted during the processing of each equation, leading to displaying the equations as they are inserted into the DOM ([demo](http://jsfiddle.net/janmr/c5tcvzyL/)). Note that this short delay can be removed by using `MathJax.Hub.processSectionDelay=0`, see the configuration in the previous demo. (Thanks to Davide Cervone, MathJax's main developer, for [clarifying these things](https://groups.google.com/d/msg/mathjax-dev/1QsO1B6OZ40/MLOAeaPzNFkJ) for me.)

Delay or not, queueing equations one by one leads to suboptimal performance. On my machine and browser, queueing the equations one by one (with the default `processSectionDelay`) takes about 20 seconds (!). Removing the delay reduces typesetting time to around 7 seconds, a huge improvement. The optimal, however, where all equations are submitted in one go, takes about 3 seconds.

So how can we submit equations for typesetting one by one, while still getting good performance? A near-optimal approach is to maintain a queue of yet-to-be-typeset equations and using the callback of `Process` to be notified of when a typesetting job is done:

``` javascript
var queue = [], typesetting = false;
function done() {
    if (queue.length) start();
    else typesetting = false;
}
function start() {
    var q = queue;
    queue = [];
    MathJax.Hub.Queue(['Process', MathJax.Hub, q, done]);
}
function typeset(script) {
    queue.push(script);
    if (!typesetting) {
        typesetting = true;
        start();
    }
}
for (var k = 0; k < scripts.length; k++)
    typeset(scripts[k]);
```

In this example, MathJax will go to work typesetting the first entry in the `scripts` array. While this is happening, the rest of the array will be pushed onto the `queue` variable. Now, when typesetting of the first equation is done, the remaining equations will be handled collectively ([demo](http://jsfiddle.net/janmr/6vk0v0cq/2/)). This leads to the example running in time comparable to submitting the whole array directly.
