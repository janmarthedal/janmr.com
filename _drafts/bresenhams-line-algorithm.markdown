---
layout: post
title: Bresenham's Line Algorithm
author: Jan Marthedal Rasmussen
excerpt: ! "."
categories:
- programming
- mathematics
tags:
- raster
- algorithms
---
In 1965 Jack Elton Bresenham published the paper *Algorithm for computer control of a digital
plotter* in the IBM Systems Journal, volume&nbsp;4, number&nbsp;1. It explained how a line could be
approximated on an integer grid. The algorithm is still used today as a
[rasterization](http://en.wikipedia.org/wiki/Rasterisation) technique for rendering lines on video
displays or printers. As Bresenham's paper suggests, however, it was originally devised for a
[plotter](http://en.wikipedia.org/wiki/Plotter), capable of moving from one grid point to one of
the adjacent eight grid points.

The present presentation of the algorithm is based on Bresenham's original paper together with
Section&nbsp;3.2.2 of [Computer Graphics: Principles and Practice](http://www.amazon.com/gp/product/0201848406/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0201848406&linkCode=as2&tag=sputmathandco-20) by Foley, van Dam, Feiner and&nbsp;Hughes.

We consider drawing a line from {% imath (x_0, y_0) %} to {% imath (x_1, y_1) %} on an integer grid
by choosing the points that lie close to the true line. Let
{% imath \Delta x = x_1 - x_0 %} and {% imath \Delta y = y_1 - y_0 %}. To simplify the
presentation, we make the following assumptions:

 * The line is drawn from {% imath (0, 0) %} to {% imath (\Delta x, \Delta y) %}.
 * {% imath \Delta x \geq \Delta y \geq 0 %}.

The method is easily generalized to the general case by

 * reversing the roles of {% imath x %} and {% imath y %} if {% imath \Delta y \geq \Delta x \geq 0 %}.
 * negating {% imath \Delta x %} and swapping every increment of {% imath x %} with a decrement if
   {% imath \Delta x < 0 %}.

and similar steps.

The exact line has the form {% imath y = \Delta y / \Delta x \cdot x %} and we introduce the function
{% dmath F(x, y) = 2 \Delta y \cdot x - 2 \Delta x \cdot y \; . %}
We note that {% imath F(x, y) %} is zero/positive/negative exactly when {% imath (x, y) %} is
on/below/above the line (the factor of 2 is introduced to keep all numbers integral). 

We let {% imath (x_k, y_k) %} be the grid points that the approximate line goes through. 
The algorithm will start at {% imath (x_0, y_0) = (0, 0) %} and because of the assumptions above,
we need to consider only two different "movements":

 * **M1**: {% imath (x_k, y_k) = (x_{k-1} + 1, y_{k-1}) %}.
 * **M2**: {% imath (x_k, y_k) = (x_{k-1} + 1, y_{k-1} + 1) %}.

Note how {% imath x_k = k %} for {% imath k = 0, 1, \ldots, \Delta x %}. We set
{% dmath \nabla_k = F(x_{k-1} + 1, y_{k-1} + \tfrac{1}{2}) %}
as a way to probe what movement to make in the {% imath k %}'s step:

 * If {% imath \nabla_k < 0 %} choose **M1** (the probe point {% imath (x_{k-1} + 1, y_{k-1} + \tfrac{1}{2}) %} lies above the line).
 * If {% imath \nabla_k \geq 0 %} choose **M2** (the probe point lies on or below the line).

To determine the {% imath \nabla_k %}'s we start with the base case:
{% dmath \nabla_1 = F(x_0 + 1, y_0 + \tfrac{1}{2}) = F(1, \tfrac{1}{2}) = 2\Delta y - \Delta x \; . %}

For {% imath k=1, 2, \ldots, \Delta x - 1 %} we get
{% dmath \begin{aligned} \nabla_{k+1} - \nabla_k &= F(x_k + 1, y_k + \tfrac{1}{2}) - F(x_{k-1} + 1, y_{k-1} + \tfrac{1}{2}) \\ &= 2\Delta y(x_k - x_{k-1}) - 2\Delta x(y_k - y_{k-1}) \; . \end{aligned} %}
We now split into the two movement cases and get
{% dmath \nabla_{k+1} = \begin{cases} \nabla_k + 2\Delta y & \mbox{for } \nabla_k < 0 \\ \nabla_k + 2\Delta y - 2\Delta x & \mbox{for } \nabla_k \geq 0 \end{cases} %}
for {% imath k=1, 2, \ldots, \Delta x - 1 %}.

Finally, we can wrap everything into the following pseudocode:

 * visit {% imath (0,0) %}
 * {% imath \nabla \leftarrow 2\Delta y - \Delta x %}
 * {% imath y \leftarrow 0 %}
 * for {% imath x=1, 2, \ldots, \Delta x %}
    * if {% imath \nabla \geq 0 %}
        * {% imath \nabla \leftarrow \nabla + 2\Delta y - 2\Delta x %}
        * {% imath y \leftarrow y + 1 %}
    * else
        * {% imath \nabla \leftarrow \nabla + 2\Delta y %}
    * visit {% imath (x, y) %}

