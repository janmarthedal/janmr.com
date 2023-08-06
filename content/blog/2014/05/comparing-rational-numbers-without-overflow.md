---
title: Comparing Rational Numbers Without Overflow
date: '2014-05-18'
layout: post
type: post
tags:
  - arithmetic
  - algorithms
  - fractions
categories:
  - programming
excerpt: >-
  Say you want to know if the inequality n_1/d_1 < n_2/d_2 is true (n_1, n_2,
  d_1, d_2 are all assumed to be positive integers). Of course, one could just
  multiply both sides with d_1 d_2, obtaining the equivalent n_1 d_2 < n_2 d_1,
  and we were done. But if our number representation allowed only numbers up to
  a certain size, say 32 bit unsigned integers, the multiplication could
  overflow. Of course, double-precision could be used to do the multiplication
  anyway, but this post will present a different method. The method effectively
  computes the continued fraction representation of each fraction
  simultaneously, but stops as soon as they differ. It is also the algorithm
  used for comparisons in the Boost C++ library Rational.
---
Say you want to know if the inequality

$$
\frac{n_1}{d_1} < \frac{n_2}{d_2}
$$

is true ($n_1, n_2, d_1, d_2$ are all assumed to be positive integers). Of course, one could just multiply both sides with $d_1 d_2$, obtaining the equivalent

$$
n_1 d_2 < n_2 d_1 \; ,
$$

and we were done. But if our number representation allowed numbers only up to a certain size, say 32 bit unsigned integers, the multiplication could overflow.

Of course, double-precision could be used to do the multiplication anyway, but this post will present a different method. The method effectively computes the [continued fraction representation](/blog/2009/11/continued-fractions-and-continuants) of each fraction simultaneously, but stops as soon as they differ. It is also the algorithm used for comparisons in the Boost C++ library [Rational](http://www.boost.org/doc/libs/release/libs/rational/).

We start by doing the (integer) division on each side of the inequality to obtain the representation

$$
q_1 + \frac{r_1}{d_1} < q_2 + \frac{r_2}{d_2}
$$

with $q_k = \lfloor n_k/d_k \rfloor \geq 0$ the quotient and $r_k = n_k - q_k d_k$ the remainder ($k=1,2$).

Now if $q_1 < q_2$ we have (using [properties of the floor function](/blog/2009/09/useful-properties-of-the-floor-and-ceil-functions))

$$
\frac{n_1}{d_1} < q_1 + 1 \leq q_2 \leq \frac{n_2}{d_2} \; .
$$

Analogously, if $q_1 > q_2$ we get $n_1/d_1 > n_2/d_2$. In either case, we are done.

When $q_1 = q_2$ we have transformed the truth value of the first inequality into

$$
\frac{r_1}{d_1} < \frac{r_2}{d_2}
$$

with $0 \leq r_k < d_k$. Now if $r_1=0$ or $r_2=0$ the truth value of the inequality is easily determined. For $r_k \geq 1$ we get

$$
\frac{d_1}{r_1} > \frac{d_2}{r_2} \; ,
$$

effectively by flipping the fractions and reversing the inequality sign (obtained by multiplying each side of the inequality by $d_1 d_2 / (r_1 r_2)$).

We now recursively apply the same approach until the quotients differ or one or both of the remainders is zero.

Let us finish with a small example:

$$
\begin{aligned} \frac{355}{113} &< \frac{22}{7} \quad \Leftrightarrow \\ 3 + \frac{16}{113} &< 3 + \frac{1}{7} \quad \Leftrightarrow \\ \frac{113}{16} &> \frac{7}{1} \quad \Leftrightarrow \\ 7 + \frac{1}{16} &> 7 + \frac{0}{1} \; , \end{aligned}
$$

so yes, $355/113 < 22/7$.
