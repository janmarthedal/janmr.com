---
layout: post
title: Comparing Rational Numbers Without Overflow
author: Jan Marthedal Rasmussen
excerpt: ! ""
categories:
- programming
tags:
- arithmetic
- algorithms

---
Say you want to know if the inequality
{% dmath \frac{n_1}{d_1} < \frac{n_2}{d_2} %}
is true ({% imath n_1, n_2, d_1, d_2 %} are all assumed to be positive integers). Of course, one could just multiply both sides with {% imath d_1 d_2 %}, obtaining the equivalent
{% dmath n_1 d_2 < n_2 d_1 \; , %}
and we were done. But if our number representation allowed only numbers up to a certain size, say 32 bit unsigned integers, the multiplication could overflow.

Of course, double-precision could be used to do the multiplication anyway, but this post will present a different method.

We start by doing the division on each side of the inequality and obtain
{% dmath q_1 + \frac{r_1}{d_1} < q_2 + \frac{r_2}{d_2} %}
with {% imath q_k = \lfloor d_k/n_k \rfloor \geq 1 %} the quotient and {% imath r_k = n_k - q_k d_k %} the remainder.

Now if {% imath q_1 < q_2 %} we have (using [properties of the floor function](/2009/09/useful-properties-of-the-floor-and-ceil-functions.html))
{% dmath \frac{n_1}{d_1} < q_1 + 1 \leq q_2 \leq \frac{n_2}{d_2} %}
and we are done. Analogously, if {% imath q_1 > q_2 %} we get {% imath n_1/d_1 > n_2/d_2 %}.

When {% imath q_1 = q_2 %} we have transformed the truth value of the first inequality into
{% dmath \frac{r_1}{d_1} < \frac{r_2}{d_2} %}
with {% imath 0 \leq r_k < d_k %}. Now if {% imath r_1=0 %} or {% imath r_2=0 %} the truth value of the inequality is easily determined. For {% imath r_k > 0 %} we get
{% dmath \frac{d_1}{r_1} > \frac{d_2}{r_2} \; , %}
by flipping the fractions and reversing the inequality sign.

We now recursively apply the same approach until the quotients differ or one or both of the remainders is zero.

The method effectively computes the continued fraction representation of each fraction, but stopping as soon as they differ. It is also the algorithm used in the Boost C++ library [Rational](http://www.boost.org/doc/libs/release/libs/rational/).

Let us finish with a small example:
{% dmath \begin{aligned} \frac{355}{113} &< \frac{22}{7} \quad \Leftrightarrow \\ 3 + \frac{16}{113} &< 3 + \frac{1}{7} \quad \Leftrightarrow \\ \frac{113}{16} &> \frac{7}{1} \quad \Leftrightarrow \\ 7 + \frac{1}{16} &> 7 + \frac{0}{1} \; , \end{aligned} %}
so yes, {% imath 355/113 < 22/7 %}.

