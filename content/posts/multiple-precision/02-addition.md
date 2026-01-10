---
title: Multiple-Precision Addition
date: 2011-10-12T12:00Z
layout: post
tags:
  - algorithms
  - multiple-precision
  - numbers-project
categories:
  - programming
excerpt: "This post will cover a basic addition algorithm for multiple-precision non-negative integers. The algorithm is based upon that presented in Section\_4.3.1, The Classical Algorithms, of The Art of Computer Programming, Volume\_2, by Donald E. Knuth. The notation and bounds used in this post were presented in a previous post. We consider adding two n-digit numbers [...]"
redirect: /blog/2011/10/multiple-precision-addition/
---
<div class="pull-right"><a href="https://en.wikipedia.org/wiki/Special:BookSources/0201896842"><img src="/media/books/taocp2.jpg" alt=""></a></div>

This post will cover a basic addition algorithm for multiple-precision non-negative integers. The algorithm is based upon that presented in Section 4.3.1, *The Classical Algorithms*, of [The Art of Computer Programming, Volume 2](/refs/taocp2/), by [Donald E. Knuth](http://www-cs-faculty.stanford.edu/~uno/). The notation and bounds used in this post were presented in a [previous post](/posts/multiple-precision-number-representation/).

We consider adding two $n$-digit numbers with $n \geq 1$, $u=(u_{n-1} \ldots u_1 u_0)_b$ and $v=(v_{n-1} \ldots v_1 v_0)_b$. Since $b^{n-1} \leq u, v \leq b^n - 1$ we have $2 b^{n-1} \leq u+v \leq 2 b^n - 2$ which, when using the fact that $b \geq 2$, leads to $b^{n-1} \leq u+v \leq b^{n+1} - 1$ (note how a tighter bound of the form $b^p \leq u+v \leq b^q - 1$ is not possible).

This means that $u+v$ can be represented using $n$ or $n+1$ digits, so we set $w=(w_n \ldots w_1 w_0)_b$.

Assuming $k_0$ is set to some initial value (more on this below) we now have the following algorithm:

$$
\begin{aligned}
w_i     &\leftarrow (u_i + v_i + k_i) \;\text{mod}\; b \\
k_{i+1} &\leftarrow \lfloor (u_i + v_i + k_i)/b \rfloor
\end{aligned}
$$

for $i = 0, 1, \ldots, n-1$, and finally $w_n \leftarrow k_n$.

The algorithm sets the digits of $w$ such that $w = u+v+k_0$. This can be seen by first observing that $p = p \;\text{mod}\; b + \lfloor p/b \rfloor b$ for any integer $p$. Using this relation on the variables set during the algorithm, we have

$$
u_i + v_i + k_i = w_i + k_{i+1} b
$$

for $i = 0, 1, \ldots, n-1$. We now have

$$
\begin{aligned} u+v &= \sum_{i=0}^{n-1} (u_i+v_i) b^i = \sum_{i=0}^{n-1} (u_i+v_i+k_i) b^i - \sum_{i=0}^{n-1} k_i b^i \\ &= \sum_{i=0}^{n-1} (w_i+k_{i+1} b) b^i - \sum_{i=0}^{n-1} k_i b^i = \sum_{i=0}^{n-1} w_i b^i + k_n b^n - k_0, \end{aligned}
$$

showing that $w=u+v+k_0$.

It is clear that each resulting digits of $w$ satisfies $0 \leq w_i \leq b-1$ for $i = 0, \ldots, n-1$, as it should. The value of $w_n$, though, depends on $k_n$.

Assume that $0 \leq k_i \leq 1$ for some $i=0, \ldots, n-1$. Since $u_i+v_i+k_i \leq b-1+b-1+1 = 2b-1$ we see that $k_{i+1} = \lfloor (u_i + v_i + k_i)/b \rfloor \leq 1$. So if we have $0 \leq k_0 \leq 1$ as initial value for the algorithm we have, by induction, that $0 \leq k_i \leq 1$ for all $i=0, \ldots, n$.

This shows how (not surprisingly) $k_0$ can be seen as an &#8220;initial carry&#8221; and how each $k_{i+1}$ is $0$ or $1$, depending on whether a carry was produced from the $i$th digit addition.
