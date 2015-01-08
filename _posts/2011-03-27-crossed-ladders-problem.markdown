---
layout: post
title: The Crossed Ladders Problem
author: Jan Marthedal Rasmussen
excerpt: ! "I was recently reminded of the crossed ladders problem. The following simple figure should
  be adequate in defining the problem: [...]. If
  you haven't seen the problem before, I highly recommend trying to solve it before
  reading on."
date: 2011-03-27 22:50:08.000000000 +02:00
categories:
- mathematics
tags:
- geometry
- nerd-sniping
---
I was [recently reminded](https://twitter.com/divbyzero/status/44871018350784512) of the crossed ladders problem. The following simple figure should be adequate in defining the problem:

<figure>
  <img src="{{site.baseurl}}media/crossed-ladders.jpg" class="img-responsive" alt="The Crossed Ladders Problem">
  <figcaption><strong>Figure 1.</strong> The crossed ladders problem</figcaption>
</figure>

If you haven't seen the problem before, I highly recommend trying to solve it before reading on.<span></span>

I had previously tried to solve it, but without success. This time I couldn't get it out of my mind. I had become a (self-inflicted) victim of *nerd sniping*.

<figure>
  <a href="http://xkcd.com/356/"><img class="img-responsive" title="xkcd: Nerd sniping" src="http://imgs.xkcd.com/comics/nerd_sniping.png" alt="Nerd sniping"></a>
  <figcaption><strong>Figure 2.</strong> xkcd explains nerd sniping</figcaption>
</figure>

The thing is that it looks simple. But [it isn't](http://www.reddit.com/r/math/comments/fy6iu/35_years_on_and_i_still_cant_solve_it/). Below is my solution to the problem (using some [inspiration](http://en.wikipedia.org/wiki/Crossed_ladders_problem) for making it a bit more pretty).

First, some variables must be introduced. Consider the following figures:

<figure>
  <img src="{{site.baseurl}}media/crossed-ladders-vars.jpg" class="img-responsive" alt="Variables for the Crossed Ladders Problem">
  <figcaption><strong>Figure 3.</strong> Variables for the crossed ladders problem</figcaption>
</figure>

So {% imath a=|AF| %}, {% imath b=|BE| %}, and {% imath h=|CD| %} are given while the width {% imath w=|AB| %} is the sought quantity. Furthermore, {% imath p=|BF| %} and {% imath q=|AE| %} are auxilliary variables.

Consider first the special case {% imath a=b %}. It is then clear that

{% dmath w = \sqrt{a^2-4h^2} \quad\text{for } a=b. %}

Assume now, without loss of generality, that {% imath a > b %}. The Pythegorean theorem gives us

<div class="pull-right">(1)</div>
{% dmath w^2 = a^2-p^2 = b^2-q^2 \quad \Leftrightarrow \quad a^2-b^2 = p^2-q^2 = (p+q)(p-q). %}

We then use that the triangle ACD is similar to AFB, just like the triangle BDC is similar to BAE, and get

{% dmath \frac{|AD|}{w} = \frac{h}{p} \quad\text{and}\quad \frac{|BD|}{w} = \frac{h}{q}. %}

This gives us

{% dmath w = |AD|+|BD| = w \left( \frac{h}{p} + \frac{h}{q} \right) \quad \Leftrightarrow \quad pq = h(p+q). %}

We use this equality to get

<div class="pull-right">(2)</div>
{% dmath \begin{align} (p-q)^2 &= p^2+q^2-2 p q = p^2+q^2+2 p q-4 p q \\ &= (p+q)^2-4 h(p+q) = (p+q)(p+q-4h). \end{align} %}

We now start from (1) and use (2) to get

{% dmath (a^2-b^2)^2 = (p+q)^2 (p-q)^2 = (p+q)^3 (p+q-4h). %}

We finally divide each side by {% imath \sqrt{a^2-b^2}^4 %} and obtain

<div class="pull-right">(3)</div>
{% dmath x^3 (x-c) - 1 = 0 %}

where

<div class="pull-right">(4)</div>
{% dmath x = \frac{p+q}{\sqrt{a^2-b^2}} \quad\text{and}\quad c = \frac{4h}{\sqrt{a^2-b^2}}. %}

Let us take a closer look at (3) by considering the fourth degree polynomium {% imath Q(x)=x^3 (x-c) - 1 %}. Note first that {% imath c %} is positive. Next that {% imath Q %} is decreasing for {% imath x < 0 %} and {% imath 0 < x < 3c/4 %} and increasing for {% imath x > 3c/4 %} (seen from the derivative {% imath Q'(x)=x^2(4x-3c) %}). And since {% imath Q(0)=-1 %} we then know that {% imath Q %} *always* has exactly two zeros, one negative and one positive. We are naturally interested in the positive one.

Assume now that we have found the (positive) root {% imath x %}. We then have from (4) and (1),

{% dmath p+q = x \sqrt{a^2-b^2} \quad \text{and} \quad p-q = \frac{a^2-b^2}{p+q} = \frac{1}{x} \sqrt{a^2-b^2}, %}

and then

{% dmath p = \tfrac{1}{2} \left( x + \frac{1}{x} \right) \sqrt{a^2-b^2}, %}

and finally

{% dmath w = \sqrt{a^2-p^2}. %}

And that is the width we were looking for. Note, however, that if {% imath p > a %} then no solution is possible. This can happen, for example, if the crossing height {% imath h %} is larger than the shortest ladder.

But how do we solve (3) and find {% imath x %}? It is possible to solve a quartic equation analytically, so let us turn to <a href="{% amazon abramowitz %}">Abramowitz and Stegun</a> and [solve it](http://people.math.sfu.ca/~cbm/aands/page_17.htm). By carefully inserting to retrieve the positive root we get

{% dmath x = \tfrac{1}{4} c + \tfrac{1}{4} \sqrt{c^2 + 4 u} + \tfrac{1}{2} \sqrt{\left( \tfrac{1}{2} c + \tfrac{1}{2} \sqrt{c^2 + 4 u} \right)^2 + 2 \sqrt{u^2+4} - 2 u} %}

where

{% dmath u = \sqrt[3]{\sqrt{\tfrac{64}{27}+\tfrac{1}{4} c^4}-\tfrac{1}{2} c^2} - \sqrt[3]{\sqrt{\tfrac{64}{27}+\tfrac{1}{4} c^4}+\tfrac{1}{2} c^2}. %}

That concludes the solution to the crossed ladders problem. Let us finish by inserting some numbers.

From the initial illustration of the problem, we have {% imath a=12 %}, {% imath b=10 %} and {% imath h=5 %}. This gives us

{% dmath w \simeq 4.2973280047205172448618937103219913746175. %}

There are actually lengths that have an integer solution. Take, [for instance](http://users.softlab.ntua.gr/~ttsiod/ladders.html), {% imath a=119 %}, {% imath b=70 %}, {% imath h=30 %} and {% imath w=56 %}.

A simple, but tricky, problem.

