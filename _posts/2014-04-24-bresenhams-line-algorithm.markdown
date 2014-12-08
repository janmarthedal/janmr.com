---
layout: post
title: Bresenham's Line Algorithm
author: Jan Marthedal Rasmussen
excerpt: ! "In 1965 Jack Elton Bresenham published the paper Algorithm for computer control of a
digital plotter in the IBM Systems Journal, volume 4, number 1. It explained how a line could be
approximated on an integer grid. The algorithm is still used today as a rasterization technique
for rendering lines on video displays or printers. As Bresenham's paper suggests, however, it was
originally devised for a plotter, capable of moving from one grid point to one of the adjacent
eight grid points. We consider drawing a line..."
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

We consider drawing a line from {% imath (0, 0) %} to {% imath (\Delta x, \Delta y) %} on an
integer grid by choosing the points that lie close to the true line. We also assume that
{% imath \Delta x > 0 %} and {% imath \Delta x \geq \Delta y \geq 0 %}. The method is easily
extended to the general case with arbitrary starting and ending points.

The line has the form
{% dmath y = f(x) = \frac{\Delta y}{\Delta x} x %}
and we aim to sample the line at the grid points {% imath (x_k, y_k) %} with {% imath x_k = k %} for {% imath k = 0, 1, \ldots, \Delta x %} and {% imath y_0 = 0 %}.

We now associate with each step an *error* term,
{% dmath \nabla_k = 2\Delta x \left[f(x_k) - (y_{k-1} + \textstyle\frac{1}{2})\right] = 2x_k\Delta y - (2y_{k-1} + 1) \Delta x \; . %}

The interpretation of this error term is important: It expresses the difference at
{% imath x = x_k %} between the line's true {% imath y %}-coordinate, {% imath f(x_k) %}, and the
midpoint between the previously chosen {% imath y %}-coordinate, {% imath y_{k-1} %}, and its
successor, {% imath y_{k-1}+1 %}. The factor {% imath 2\Delta x %} is there to make all
quantities integral. The sign of {% imath \nabla_k %} is thus crucial:

 * If {% imath \nabla_k \leq 0 %} then {% imath y_k = y_{k-1} %} lies closest to the line (it is a tie for {% imath \nabla_k = 0 %}).
 * If {% imath \nabla_k > 0 %} then {% imath y_k = y_{k-1}+1 %} should be chosen.

Note how the magnitude of {% imath \nabla_k %} also tells exactly how far from the true line the
chosen grid point is. It is straightforward to show that {% imath -2\Delta x < \nabla_k \leq 2\Delta x %} for {% imath k = 1, 2, \ldots, \Delta x %}.

<figure>
  <img src="/media/bresenham.svg">
  <figcaption><strong>Figure 1.</strong> Given that the previous point is at \((x_{k-1}, y_{k-1})\),
    the dashed lines indicate the two extreme cases for the line being approximated. \(\nabla_k\)
    will be negative if the line goes through the red area and positive if it goes through the blue
    area.</figcaption>
</figure>

To determine the {% imath \nabla_k %}'s we start with the base case:
{% dmath \nabla_1 = 2\cdot 1\cdot \Delta y - (2\cdot 0 + 1) \Delta x = 2\Delta y - \Delta x \; . %}

For {% imath k=1, 2, \ldots, \Delta x - 1 %} we get
{% dmath \nabla_{k+1} - \nabla_k = 2(x_{k+1}-x_k)\Delta y - 2(y_k-y_{k-1})\Delta x \; . %} 
We now split into the two cases for {% imath \nabla_k %} and get
{% dmath \nabla_{k+1} = \begin{cases} \nabla_k + 2\Delta y & \mbox{for } \nabla_k \leq 0 \; , \\ \nabla_k + 2\Delta y - 2\Delta x & \mbox{for } \nabla_k > 0 \; , \end{cases} %}
for {% imath k=1, 2, \ldots, \Delta x - 1 %}.

These expressions determine all the {% imath \nabla_k %}'s which, in turn, determines all the {% imath y_k %}'s.
