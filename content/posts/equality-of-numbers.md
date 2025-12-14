---
title: Equality of Floating-Point Numbers
date: '2023-12-03'
layout: page
categories:
  - mathematics
  - programming
excerpt: >-
  When using floating-point numbers then exact, bit-for-bit, equality is almost
  never what you want.
redirect: /blog/2023/12/equality-of-numbers/
---
When using floating-point numbers then exact, bit-for-bit, equality is almost never what you want.
The result of most floating-point operations like addition, multiplication and trigonometric functions cannot be represented exactly due to the [limited precision](/refs/floating-point-arithmetic/) of floating-point numbers.
Furthermore, in most practical situations we are just interested in a result that is "close enough" and not correct with every digit available.

Say you want to compare two floating-point numbers $u$ and $v$ and consider the error $|u-v|$.
It is natural to compare this error to some bound which is *relative* to the size of the numbers,

$$
|u-v| \leq \epsilon_{\text{rel}} \cdot \max(|u|, |v|)
$$

Using $\max(|u|, |v|)$ ensures that this relation is *symmetric* in $u$ and $v$.
This is a nice property to have as it would be unfortunate if we could have that $u$ was close to $v$, but that $v$ was *not* close to $u$.
We could also use $\min(|u|, |v|)$, which would result in a stronger requirement, or $\tfrac{1}{2}(|u|+|v|)$, which would lead to a behaviour between the $\min$ and $\max$ expressions.

In the inequality above, the quantity $\epsilon_{\text{rel}}$ controls how close the numbers must be to be considered approximately equal.
Using $\epsilon_{\text{rel}}=10^{-k}$ means that roughly the $k$ most significant decimal digits are correct.
For example, $|3 \cdot 10^8 - 299792458| \leq \epsilon_{\text{rel}} \cdot 3 \cdot 10^8$ is true for $\epsilon_{\text{rel}}=10^{-3}$ but not for $\epsilon_{\text{rel}}=10^{-4}$.
Also, $|\pi-3.14159| \leq \epsilon_{\text{rel}} \cdot \pi$ is true for $\epsilon_{\text{rel}}=10^{-6}$ but not for $\epsilon_{\text{rel}}=10^{-7}$.

This way of checking closeness brakes down, however, when comparing numbers to zero or close to zero.
For instance, is $10^{-8}$ close to zero? Since $(10^{-8} - 0)/10^{-8} = 1$ we see that it would require a relative tolerance of at least $1$ to be viewed as approximately equal according to the test above.
In such cases it makes sense to look at the absolute error instead,

$$
|u-v| \leq \epsilon_{\text{abs}}.
$$

Combining these two inequalities we get that $u$ and $v$ are approximately equal, $u \sim v$, when
$$
|u-v| \leq \max\Big( \epsilon_{\text{rel}} \cdot \max(|u|, |v|), \epsilon_{\text{abs}} \Big).
$$

This is the function suggested for approximate equality in a [Python Enhancement Proposals](https://peps.python.org/pep-0485/) from 2015.
It is implemented as [`isclose`](https://docs.python.org/3.12/library/math.html#math.isclose) in the `math` module
([CPython implementation](https://github.com/python/cpython/blob/3.12/Modules/mathmodule.c#L3146)).

Some rules of thumb for choosing $\epsilon_{\text{rel}}$ and $\epsilon_{\text{abs}}$:
* Use $\epsilon_{\text{rel}}=10^{-k}$ when you want (roughly) $k$ correct decimal digits.
* Let $\epsilon_{\text{abs}}$ determine when a number is considered (close to) zero,
  $|u| \leq \epsilon_{\text{abs}} \Leftrightarrow u \sim 0$.
  Use $\epsilon_{\text{abs}}=0$ if you don't need to consider numbers close to zero.

Some extra resources to check out:
- [Comparing Floating Point Numbers](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) by Bruce Dawson.
- [The Art of Computer Programming, Volume&nbsp;2](/refs/taocp2/), Section&nbsp;4.2.2, by Donald&nbsp;E. Knuth.
- [Theory behind floating point comparisons](https://www.boost.org/doc/libs/1_83_0/libs/test/doc/html/boost_test/testing_tools/extended_comparison/floating_point/floating_points_comparison_theory.html) from the Boost C++ library.
- [What Every Computer Scientist Should Know About Floating-Point Arithmetic](/refs/floating-point-arithmetic/) by David Goldberg.
