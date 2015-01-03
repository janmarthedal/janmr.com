---
layout: post
title: Multiple-Precision Addition
author: Jan Marthedal Rasmussen
excerpt: ! "This post will cover a basic addition algorithm for multiple-precision
  non-negative integers. The algorithm is based upon that presented in Section 4.3.1,
  The Classical Algorithms, of The Art of Computer Programming, Volume 2,
  by Donald E. Knuth. The notation and bounds used in this post were presented in a 
  previous post. We consider adding two n-digit numbers [...]"
date: 2011-10-12 12:27:47.000000000 +02:00
categories:
- programming
tags:
- algorithms
- multiple-precision
- numbers project
- basic theory
---
<div class="pull-right"><a href="{% amazon taocp2 %}"><img src="{% bookcover taocp2 %}" /></a></div>
This post will cover a basic addition algorithm for multiple-precision non-negative integers. The algorithm is based upon that presented in Section 4.3.1, *The Classical Algorithms*, of [The Art of Computer Programming](http://www-cs-faculty.stanford.edu/~uno/taocp.html), Volume 2, by [Donald E. Knuth](http://www-cs-faculty.stanford.edu/~uno/). The notation and bounds used in this post were presented in a [previous post](/2011/10/multiple-precision-number-representation.html).

We consider adding two {% imath n %}-digit numbers with {% imath n \geq 1 %}, {% imath u=(u_{n-1} \ldots u_1 u_0)_b %} and {% imath v=(v_{n-1} \ldots v_1 v_0)_b %}. <span></span>Since {% imath b^{n-1} \leq u, v \leq b^n - 1 %} we have {% imath 2 b^{n-1} \leq u+v \leq 2 b^n - 2 %} which, when using the fact that {% imath b \geq 2 %}, leads to {% imath b^{n-1} \leq u+v \leq b^{n+1} - 1 %} (note how a tighter bound of the form {% imath b^p \leq u+v \leq b^q - 1 %} is not possible).

This means that {% imath u+v %} can be represented using {% imath n %} or {% imath n+1 %} digits, so we set {% imath w=(w_n \ldots w_1 w_0)_b %}.

Assuming {% imath k_0 %} is set to some initial value (more on this below) we now have the following algorithm:

{% dmath \begin{aligned} w_i     &\leftarrow (u_i + v_i + k_i) \;\text{mod}\; b \\ k_{i+1} &\leftarrow \lfloor (u_i + v_i + k_i)/b \rfloor \end{aligned} %}

for {% imath i = 0, 1, \ldots, n-1 %}, and finally {% imath w_n \leftarrow k_n %}.

The algorithm sets the digits of {% imath w %} such that {% imath w = u+v+k_0 %}. This can be seen by first observing that {% imath p = p \;\text{mod}\; b + \lfloor p/b \rfloor b %} for any integer {% imath p %}. Using this relation on the variables set during the algorithm, we have

{% dmath u_i + v_i + k_i = w_i + k_{i+1} b %}

for {% imath i = 0, 1, \ldots, n-1 %}. We now have

{% dmath \begin{aligned} u+v &= \sum_{i=0}^{n-1} (u_i+v_i) b^i = \sum_{i=0}^{n-1} (u_i+v_i+k_i) b^i - \sum_{i=0}^{n-1} k_i b^i \\ &= \sum_{i=0}^{n-1} (w_i+k_{i+1} b) b^i - \sum_{i=0}^{n-1} k_i b^i = \sum_{i=0}^{n-1} w_i b^i + k_n b^n - k_0, \end{aligned} %}

showing that {% imath w=u+v+k_0 %}.

It is clear that each resulting digits of {% imath w %} satisfies {% imath 0 \leq w_i \leq b-1 %} for {% imath i = 0, \ldots, n-1 %}, as it should. The value of {% imath w_n %}, though, depends on {% imath k_n %}.

Assume that {% imath 0 \leq k_i \leq 1 %} for some {% imath i=0, \ldots, n-1 %}. Since {% imath u_i+v_i+k_i \leq b-1+b-1+1 = 2b-1 %} we see that {% imath k_{i+1} = \lfloor (u_i + v_i + k_i)/b \rfloor \leq 1 %}. So if we have {% imath 0 \leq k_0 \leq 1 %} as initial value for the algorithm we have, by induction, that {% imath 0 \leq k_i \leq 1 %} for all {% imath i=0, \ldots, n %}.

This shows how (not surprisingly) {% imath k_0 %} can be seen as an &#8220;initial carry&#8221; and how each {% imath k_{i+1} %} is {% imath 0 %} or {% imath 1 %}, depending on whether a carry was produced from the {% imath i %}th digit addition.


