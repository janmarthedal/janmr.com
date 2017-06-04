---
layout: post.html
title: Good Rational Bounds
tags: continued-fraction, rational-approximation
categories: mathematics
excerpt: "Say we have a k-bit integer and we want to allocate a character array to hold the decimal digits of this number. How large must the array be? Well, the exact formula is [...]"
---

Say we have a k-bit integer and we want to allocate a character array to hold the decimal digits of this number. How large must the array be? Well, the exact formula is

$$\left\lfloor \log_{10}(2^k) \right\rfloor + 1 = \left\lfloor k \frac{\ln(2)}{\ln(10)} \right\rfloor + 1,$$

but we are concerned about efficiency and don't want to use floating point calculations. So we fire up a calculator and get $\ln(2) / \ln(10) \simeq 0.3010299957$. This means that we can use, e.g., $1/3$ as an upper bound for $\ln(2) / \ln(10)$ and allocate $\lfloor k / 3 \rfloor + 1$ characters. But we are also concerned about memory and think it is a waste to use little more than 10% more memory than needed. We could just use $30103/100000$ as an upper bound, but we don't want to use too large constants because we are also concerned about arithmetic overflow.

This is where continued fractions come in, see an [earlier post](/2009/11/continued-fractions-and-continuants.html) for some basic notation and properties. Let $x = a_0 + /\!/a_1, a_2, \ldots, a_n/\!/$ where all $a_k$ are non-negative integers. Such a representation has some very desirable properties regarding rational approximations and bounds (the &#8220;truncated&#8221; continued fraction $a_0 + /\!/a_1, a_2, \ldots, a_k/\!/$ for $0 \leq k \leq n$ is called the $k$th convergent of $x$):

1. The even convergents $a_0, a_0 + /\!/ a_1, a_2 /\!/, a_0 + /\!/ a_1, a_2, a_3, a_4 /\!/, \ldots$ are always less than $x$. Similarly, the odd convergents $a_0 + /\!/ a_1 /\!/, a_0 + /\!/ a_1, a_2, a_3 /\!/, \ldots$ are always greater than $x$.
2. The $k$th convergent is a very good rational approximation to $x$. (We will not make this statement exact, but just say that a rational fraction is a *best approximation* if every other rational fraction with the same or smaller denominator differs from $x$ by a greater amount.)

We will now apply these facts to our example. We start by obtaining any rational upper bound with the restriction that it must be tighter than the good rational bound that we are aiming for. We have $\ln(2) / \ln(10) < 0.30103$ and we compute the continued fraction for this upper bound,

$$30103/100000 = /\!/ 3, 3, 9, 2, 2, 4, 5, 1, 1, 1, 2 /\!/.$$

We now begin to compute the odd convergents, and keeping an eye on how tight they are:

*   $/\!/ 3 /\!/ = 1/3$ (too much by about 11%)
*   $/\!/ 3, 3, 9 /\!/ = 28/93$ (too much by about 0.015%)
*   $/\!/ 3, 3, 9, 2, 2 /\!/ = 146/485$ (too much by about 0.00031%)

There are more odd convergents to consider, but we probably don't need to go any further for this use case. So we can allocate $\lfloor 146 k / 485 \rfloor + 1$ characters, knowing that it is a very tight upper bound.

(Note how a similar approach could be used if we were looking for a lower bound instead.)
