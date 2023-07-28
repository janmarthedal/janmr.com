---
title: An Infinite Series Involving a Sideways Sum
date: '2013-07-03'
layout: post
tags:
  - infinite-series
  - binary-numbers
  - stackexchange
  - nerd-sniping
  - post
categories:
  - mathematics
excerpt: >-
  I found a recent question on Mathematics Stack Exchange quite interesting. It
  simply asked: How does one easily calculate ...
---

I found a recent [question](http://math.stackexchange.com/questions/432250/how-does-one-easily-calculate-sum-limits-n-1-infty-frac-mathrmpopn) on [Mathematics Stack Exchange](http://math.stackexchange.com) quite interesting. It simply asked

> How does one easily calculate $\sum\limits_{n=1}^\infty\frac{\mathrm{pop}(n)}{n(n+1)}$ ?

Here $\mathrm{pop}(n)$ denotes the &#8220;population count&#8221; or &#8220;sideways sum&#8221;, which is the number of 1s in the binary representation of $n$ ([A000120](http://oeis.org/A000120)).<span></span>

The user [achille hui](http://math.stackexchange.com/users/59379/achille-hui) provided a [very nice answer](http://math.stackexchange.com/a/432336/2043) which I would like to describe in some detail here. First, he introduces the function

$$
\theta_k(n) = \begin{cases}1,&\text{ if the $k$th bit of $n$ is set,}\\0,&\text{ otherwise.}\end{cases}
$$

which makes it possible to write the series as

$$
\sum_{n=1}^\infty\frac{\mathrm{pop}(n)}{n(n+1)} = \sum_{n=1}^\infty \sum_{k=0}^\infty \frac{\theta_k(n)}{n(n+1)} = \sum_{k=0}^\infty \sum_{n=1}^\infty \frac{\theta_k(n)}{n(n+1)}.
$$

After reversing the order of summation (which requires [justification](http://www.math.ubc.ca/~feldman/m321/twosum.pdf)), he asks: For fixed $k$, which values of $n$ has $\theta_k(n)=1$? Note here that $n$ has the $k$th bit set if and only if $\lfloor n/2^k \rfloor$ has the zeroth bit set. And a number has the zeroth bit set if and only if that number is odd. So $\theta_k(n)=1$ if and only if $\lfloor n/2^k \rfloor = 2 l + 1$ for some $l = 0, 1, 2, \ldots$. This means

$$
\begin{aligned} \theta_k(n)=1 \quad&\Leftrightarrow\quad 2 l + 1 \leq n/2^k < 2 l + 2 \\ &\Leftrightarrow\quad (2 l + 1) 2^k \leq n \leq (2 l + 2) 2^k - 1, \end{aligned}
$$

for some $l = 0, 1, 2, \ldots$. This provides us with the intervals of $n$ that we are interested in, so we have

$$
\begin{aligned} \sum_{n=1}^\infty\frac{\mathrm{pop}(n)}{n(n+1)} &= \sum_{k=0}^\infty \sum_{n=1}^\infty \frac{\theta_k(n)}{n(n+1)} \\ &= \sum_{k=0}^\infty \sum_{l=0}^\infty \sum_{n=(2 l + 1) 2^k}^{(2 l + 2) 2^k - 1} \frac{1}{n(n+1)} \\ &= \sum_{k=0}^\infty \sum_{l=0}^\infty \sum_{n=(2 l + 1) 2^k}^{(2 l + 2) 2^k - 1} \left( \frac{1}{n} - \frac{1}{n+1} \right) \\ &= \sum_{k=0}^\infty \sum_{l=0}^\infty \left( \frac{1}{(2 l + 1) 2^k} - \frac{1}{(2 l + 2) 2^k} \right) \\ &= \left( \sum_{k=0}^\infty 2^{-k} \right) \left( \sum_{m=1}^\infty (-1)^{m+1} \frac{1}{m} \right) \\ &= 2 \ln 2 \end{aligned}
$$

Here, both a [telescoping sum](http://en.wikipedia.org/wiki/Telescoping_series), a geometric progression sum (see [Nice Proof of a Geometric Progression Sum](/blog/2008/10/nice-geometric-progression-proof) with $r=1/2$) and the [power series](https://en.wikipedia.org/wiki/Taylor_series#List_of_Maclaurin_series_of_some_common_functions) for the natural logarithm of 2 occurs.

Very nice.
