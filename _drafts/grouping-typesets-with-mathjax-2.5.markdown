---
layout: post
title: Grouping Typesets With MathJax 2.5
author: Jan Marthedal Rasmussen
excerpt: |
  This post will deal with one way of typesetting fractions, inspired by the approach taken by Kahn Academy's KaTeX project.
categories: [programming]
tags: [typesetting, mathjax]
---
When [MathJax](http://mathjax.org) processes a page and typesets all equations, it does a good job of grouping the work into chunks, so that a chunk of equations ([usually 50](http://docs.mathjax.org/en/latest/options/HTML-CSS.html)) will be typeset before they are displayed and the next chunk is processed. Typesetting and displaying one equation at a time leads to a lot of screen flickering and it also takes longer before the page is completed because of the increased work for the browser.

Some times you want to typeset and display a lot of equations dynamically. For the sake of this post, let us assume that we have an array `scripts` where each entry refers to a script HTML element such as

{% highlight html %}
<script type="math/tex; mode=display">
  \sum_{k=1}^n k^2
</script>
{% endhighlight %}

In this case it is easy to trigger the typesetting as

{% highlight javascript %}
MathJax.Hub.Queue(["Process", MathJax.Hub, scripts]);
{% endhighlight %}

This is an efficient way to do it and MathJax will take care of all the equation "chunking" ([demo](http://jsfiddle.net/janmr/g870rjLp/1/)). But sometimes you don't have all equations available in one big array and you wish to tell MathJax to process the equations as they become available. This use-case can be simulated by running

{% highlight javascript %}
for (var k = 0; k < scripts.length; k++)
  MathJax.Hub.Queue(["Process", MathJax.Hub, scripts[k]]);
{% endhighlight %}

Because of the asynchronous nature of MathJax's Queue and Process implementations (where control is handed back to the browser during execution), the second element of the `scripts` array is pushed onto MathJax's typesetting queue before the typesetting of the first item has finished. Similarly, the third element gets pushed to MathJax before it finishes typesetting the first two items, and so on. This way, MathJax can still leverage its chunking mechanism and make sure that the typesetting avoids flickering and is as fast as possible.

This is, until MathJax 2.5.

For some reason, one equation is typeset and displayed one at a time with a suboptimal result to follow ([demo](http://jsfiddle.net/janmr/6vk0v0cq/1/)). I don't know why this has suddenly changed or if some configuration option can restore the "old" behavior.

There is a workaround, however. Well, kind of. 

{% highlight javascript %}
var queue = [], typesetting = false;
function done() {
    if (queue && queue.length) start();
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
{% endhighlight %}

Here, a queue of elements to typeset is maintained "manually". If MathJax has not finished typesetting (when the `done` callback has not yet been called), new elements are put on the queue. Then, when `done` is called, all elements can be pushed to MathJax in one go. This simulates the pre-2.5 behaviour ([demo](http://jsfiddle.net/janmr/6vk0v0cq/2/)).

