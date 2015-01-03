---
layout: post
title: Multiple-Precision Subtraction
author: Jan Marthedal Rasmussen
date: 2011-10-26 11:00:10.000000000 +02:00
categories:
- programming
tags:
- algorithms
- multiple-precision
- numbers project
- basic theory
---
We now turn to multiple-precision subtraction for non-negative integers. The algorithm is very similar to that of [multiple-precision addition](/2011/10/multiple-precision-addition.html), but some minor differences make it worth while considering subtraction separately.

We consider two {% imath n %}-digit numbers, {% imath u=(u_{n-1} \ldots u_1 u_0)_b %} and {% imath v=(v_{n-1} \ldots v_1 v_0)_b %}, with {% imath n \geq 1 %} (see a [previous post](/2011/10/multiple-precision-number-representation.html) on the number notation). We wish to compute an {% imath n %}-digit result {% imath w=(w_{n-1} \ldots w_1 w_0)_b %} such that

{% dmath w = (u - v - k_0) \;\text{mod}\; b^n %}

where {% imath k_0 %} is some initial [borrow](http://mathworld.wolfram.com/Borrow.html), {% imath 0 \leq k_0 \leq 1 %}. Furthermore, a final borrow {% imath k_n %} will indicate whether {% imath u < v+k_0 %}.<span></span>

Let us first introduce a notation which [Donald E. Knuth](http://www-cs-faculty.stanford.edu/~uno/) refers to as [Iverson's convention](http://en.wikipedia.org/wiki/Iverson_bracket): {% imath [P] %} has value {% imath 1 %} if {% imath P %} is true and {% imath 0 %} otherwise.

We now have the algorithm:

{% dmath \begin{aligned} w_i     &\leftarrow (u_i - v_i - k_i) \;\text{mod}\; b, \\ k_{i+1} &\leftarrow [u_i < v_i + k_i], \end{aligned} %}

for {% imath i = 0, 1, \ldots, n-1 %}. This is really just a formalization of the familiar pencil-and-paper method, but let us show that it does the right thing.

Note first that {% imath 0 \leq k_i \leq 1 %} for {% imath i = 0, 1, \ldots, n-1 %}. This is a consequence of the assumption {% imath 0 \leq k_0 \leq 1 %} for the initial borrow and the range of the {% imath [\cdot] %} operator. We next establish the relation

{% dmath -\left\lfloor \frac{u_i-v_i-k_i}{b} \right\rfloor = [u_i < v_i + k_i], %}

which holds since we have {% imath -b = 0-(b-1)-1 \leq u_i-v_i-k_i \leq (b-1)-0-0 = b-1 %}. We now observe that

{% dmath \begin{aligned} u_i-v_i-k_i &= (u_i - v_i - k_i) \;\text{mod}\; b + \left\lfloor \frac{u_i-v_i-k_i}{b} \right\rfloor b \\ &= (u_i - v_i - k_i) \;\text{mod}\; b - [u_i < v_i + k_i] b \\ &= w_i - k_{i+1} b. \end{aligned} %}

We finally have

{% dmath \begin{aligned} u - v &= \sum_{i=0}^{n-1} (u_i-v_i) b^i = \sum_{i=0}^{n-1} (u_i-v_i-k_i) b^i + \sum_{i=0}^{n-1} k_i b^i \\ &= \sum_{i=0}^{n-1} (w_i-k_{i+1} b) b^i + \sum_{i=0}^{n-1} k_i b^i = \sum_{i=0}^{n-1} w_i b^i - \sum_{i=0}^{n-1} k_{i+1} b^{i+1} + \sum_{i=0}^{n-1} k_i b^i \\ &= w - k_n b^n + k_0, \end{aligned} %}

so {% imath u-v-k_0 = w-k_n b^n %}. Since {% imath 0 \leq w \leq b^n-1 %} we have now established

{% dmath w = (u - v - k_0) \;\text{mod}\; b^n, %}

and {% imath k_n %} indicates whether {% imath u < v+k_0 %}.

