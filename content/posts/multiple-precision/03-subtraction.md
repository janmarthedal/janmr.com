---
title: Multiple-Precision Subtraction
date: 2011-10-26T12:00Z
layout: post
tags:
  - algorithms
  - multiple-precision
  - numbers-project
categories:
  - programming
excerpt: >-
  We now turn to multiple-precision subtraction for non-negative integers. The
  algorithm is very similar to that of multiple-precision addition, but some
  minor differences make it worth while considering subtraction separately.
  [...]
redirect: /blog/2011/10/multiple-precision-subtraction/
---
We now turn to multiple-precision subtraction for non-negative integers. The algorithm is very similar to that of [multiple-precision addition](/posts/multiple-precision/02-addition/), but some minor differences make it worth while considering subtraction separately.

We consider two $n$-digit numbers, $u=(u_{n-1} \ldots u_1 u_0)_b$ and $v=(v_{n-1} \ldots v_1 v_0)_b$, with $n \geq 1$ (see a [previous post](/posts/multiple-precision-number-representation/) on the number notation). We wish to compute an $n$-digit result $w=(w_{n-1} \ldots w_1 w_0)_b$ such that

$$
w = (u - v - k_0) \;\text{mod}\; b^n
$$

where $k_0$ is some initial [borrow](http://mathworld.wolfram.com/Borrow.html), $0 \leq k_0 \leq 1$. Furthermore, a final borrow $k_n$ will indicate whether $u < v+k_0$.

Let us first introduce a notation which [Donald E. Knuth](http://www-cs-faculty.stanford.edu/~uno/) refers to as [Iverson's convention](http://en.wikipedia.org/wiki/Iverson_bracket): $[P]$ has value $1$ if $P$ is true and $0$ otherwise.

We now have the algorithm:

$$
\begin{aligned} w_i     &\leftarrow (u_i - v_i - k_i) \;\text{mod}\; b, \\ k_{i+1} &\leftarrow [u_i < v_i + k_i], \end{aligned}
$$

for $i = 0, 1, \ldots, n-1$. This is really just a formalization of the familiar pencil-and-paper method, but let us show that it does the right thing.

Note first that $0 \leq k_i \leq 1$ for $i = 0, 1, \ldots, n-1$. This is a consequence of the assumption $0 \leq k_0 \leq 1$ for the initial borrow and the range of the $[\cdot]$ operator. We next establish the relation

$$
-\left\lfloor \frac{u_i-v_i-k_i}{b} \right\rfloor = [u_i < v_i + k_i],
$$

which holds since we have $-b = 0-(b-1)-1 \leq u_i-v_i-k_i \leq (b-1)-0-0 = b-1$. We now observe that

$$
\begin{aligned} u_i-v_i-k_i &= (u_i - v_i - k_i) \;\text{mod}\; b + \left\lfloor \frac{u_i-v_i-k_i}{b} \right\rfloor b \\ &= (u_i - v_i - k_i) \;\text{mod}\; b - [u_i < v_i + k_i] b \\ &= w_i - k_{i+1} b. \end{aligned}
$$

We finally have

$$
\begin{aligned} u - v &= \sum_{i=0}^{n-1} (u_i-v_i) b^i = \sum_{i=0}^{n-1} (u_i-v_i-k_i) b^i + \sum_{i=0}^{n-1} k_i b^i \\ &= \sum_{i=0}^{n-1} (w_i-k_{i+1} b) b^i + \sum_{i=0}^{n-1} k_i b^i = \sum_{i=0}^{n-1} w_i b^i - \sum_{i=0}^{n-1} k_{i+1} b^{i+1} + \sum_{i=0}^{n-1} k_i b^i \\ &= w - k_n b^n + k_0, \end{aligned}
$$

so $u-v-k_0 = w-k_n b^n$. Since $0 \leq w \leq b^n-1$ we have now established

$$
w = (u - v - k_0) \;\text{mod}\; b^n,
$$

and $k_n$ indicates whether $u < v+k_0$.
