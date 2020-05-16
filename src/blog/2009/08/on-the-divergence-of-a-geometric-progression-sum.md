---
title: On the Divergence of a Geometric Progression Sum
date: '2009-08-28'
layout: post
tags:
  - proof
  - infinite-series
  - post
categories:
  - mathematics
excerpt: >-
  Let us revisit the geometric progression sum considered in an earlier article,
  s_r = sum_{k=0}^infty r^k = 1 + r + r^2 + r^3 + ..., where r here is a complex
  number. For what values of r does this infinite sum make sense? [...]
---
Let us revisit the geometric progression sum considered in an [earlier article](/blog/2008/10/nice-geometric-progression-proof),

$$
s_r = \sum_{k=0}^\infty r^k = 1 + r + r^2 + r^3 + \ldots,
$$

where $r$ here is a [complex number](http://en.wikipedia.org/wiki/Complex_number). For what values of $r$ does this infinite sum make sense? Can we find a [closed-form expression](http://en.wikipedia.org/wiki/Closed-form_expression) for $s_r$ in such cases? To investigate this, we fix $r$ to some value and consider the partial sums:

$$
s_r(n) = \sum_{k=0}^n r^k = 1 + r + r^2 + \ldots + r^{n-1},
$$

where we just add the first $n$ terms of $s_r$. Now if $s_r(n)$ tends to a finite limit&nbsp;$v$ as $n \rightarrow \infty$ (can we for any $\delta > 0$ find an $n_0$ such that $|v-s_r(n)| \leq \delta$ for all $n \geq n_0$?) then we have $s_r = v$.

Let us first single out the special case $r=1$. Since $s_r(n) = n$ we cannot assign any well-defined, finite value to $s_1$, so $s_r$ is divergent for $r=1$. For $r \neq 1$ we get

$$
(1-r) s_r(n) = 1-r^n \quad \Longleftrightarrow \quad s_r(n) = \frac{1-r^n}{1-r}.
$$

Let us consider three different cases. If $|r| < 1$ we see that the only term that depends on $n$ tends to zero so we suspect that the limit is $1/(1-r)$,

$$
\left| \frac{1}{1-r} - \frac{1-r^n}{1-r} \right| = \left| \frac{r^n}{1-r} \right| = \frac{|r|^n}{|1-r|}.
$$

Since the magnitude of the difference between our suspected limit and the partial sums can be made as small as we like (as long as we choose $n$ sufficiently large), we have

$$
s_r = \frac{1}{1-r}, \quad \text{for } |r| < 1.
$$

What about $|r| > 1$? We get

$$
|s_r(n)| = \left| \frac{1-r^n}{1-r} \right| \geq \frac{|r^n|-1}{|r-1|} \geq \frac{|r|^n-1}{|r|+1},
$$

and we see that $|s_r(n)| \rightarrow \infty$ as $n \rightarrow \infty$. We can thus not find a finite limit to which $s_r(n)$ tends as $n \rightarrow \infty$, so the series $s_r$ is divergent for $|r| > 1$.

Left to consider is the case $|r|=1$, $r \neq 1$, and this is where it gets interesting. We get

$$
|s_r(n)| = \left| \frac{1-r^n}{1-r} \right| = \frac{|1-r^n|}{|1-r|} \leq \frac{1 + |r^n|}{|1-r|} = \frac{2}{|1-r|}.
$$

So the partial sums $s_r(n)$ are bounded by some constant independent of $n$. Does the value $1/(1-r)$ work as a limit in this case also? We set $r = e^{i \theta}$ with $0 < \theta < 2\pi$ and subtract,

$$
\begin{aligned} s_r(n) - \frac{1}{1-r} &= \frac{e^{i \theta n}}{e^{i \theta}-1} = \frac{e^{i \theta n} (e^{-i \theta}+1)}{(e^{i \theta}-1)(e^{-i \theta}+1)} = \frac{e^{i \theta (n-1)} + e^{i \theta n}}{2i\sin \theta} \\ &= \frac{e^{i(\theta(2n-1)-\pi)/2}}{2\sin(\theta/2)} \end{aligned}
$$

(using $e^{i x} + e^{i y} = 2 \cos((x-y)/2) e^{i(x+y)/2}$ and $\sin \theta = 2\sin(\theta/2)\cos(\theta/2)$). So $s_r(n)$ does <em>not</em> converge to $1/(1-r)$ as $n \rightarrow \infty$. Indeed, we see that $s_r(n)$ follows a circle in the complex plane; a circle centered in $1/(1-r)$ with radius $1/(2\sin(\theta/2))$. And this is what I find interesting: $s_r(n)$ does not converge to any value,

$$
\text{the series } s_r \text{ is divergent for } |r| \geq 1,
$$

but circles around the value $1/(1-r)$ when $|r|=1$, $r \neq 1$. In fact, $1/(1-r)$ makes sense for all $r \neq 1$, so can this value be assigned to $s_r$ in some meaningful way? (When $|r| < 1$, I would suspect that the values of $s_r(n)$ spirals inward towards $1/(1-r)$ as $n$ grows and spirals outwards when $|r| > 1$; I have not verified this, though.)

<div style="float:right"><a href="https://en.wikipedia.org/wiki/Special:BookSources/0821826492"><img src="/media/books/hardy-div.jpg" alt=""></a></div>

This reminded me that [G. H. Hardy](http://en.wikipedia.org/wiki/G._H._Hardy) has written a book called <em>Divergent Series</em>, where he manipulates infinite series with an &#8220;entirely uncritical spirit&#8221;. Therein, he also considers the series $s_r$ and, e.g., $s_{-1} = 1/2$ can somehow make sense. I have only flicked through the book ([excerpt](http://books.google.com/books?id=jPccoUKsLdQC&#038;printsec=frontcover&#038;source=gbs_v2_summary_r&#038;cad=0)), but I think I should take a closer look&#8230;
