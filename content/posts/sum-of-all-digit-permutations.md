---
title: A Sum of All Digit Permutations
date: '2023-04-10'
layout: post
tags:
  - nerd-sniping
  - combinatorics
categories:
  - mathematics
excerpt: Finding the sum of all digit permutations
mastodon: 'https://mathstodon.xyz/@janmr/110184431051809645'
redirect: /blog/2023/04/sum-of-all-digit-permutations/
---
Recently, user [preshtalwalkar](https://twitter.com/preshtalwalkar) on Twitter posed the following
[question](https://twitter.com/preshtalwalkar/status/1640552185296551938):

> What is the sum of all 5 digit numbers using 1, 2, 3, 4, 5 without repetition?

I will present two solutions: The solution I came up with and a smart one.

My solution: Notice that at each position (the 1's, 10's, 100's, etc.) the sum of the digits is
$$
4! \cdot (1+2+3+4+5) = 24 \cdot 15 = 360,
$$
since there are $4!$ permutations each time a given digit is fixed.
Now, summing up the 1's, 10's, 100's, etc. gives
$$
a_5 = 1 \cdot 360 + 10 \cdot 360 + 100 \cdot 360 + \cdots = 11111 \cdot 360 = 3999960
$$
which is the solution.

The smart solution:
Note that there are $5!=120$ permutations and at each position the average digit value is 3.
Therefore, the answer is
$$
a_5 = 120 \cdot 33333 = 3999960.
$$

This is easily generalized to $n$-digit numbers, $n \leq 9$, as
$$
a_n = \frac{n+1}{2} \frac{10^n - 1}{9} n! = \tfrac{1}{18} (10^n - 1) (n + 1)!,
$$
since $(n+1)/2$ is the average digit value and $\sum_{k=0}^{n-1} 10^k=(10^n-1)/9$,
which is a [finite sum of a geometric progression](https://personal.math.ubc.ca/~cbm/aands/page_10.htm).
The sequence $a_n$ is [A071268](https://oeis.org/A071268) at [OEIS](https://oeis.org).

We can generalize further if we consider $d$-digit numbers using $1, \ldots, n$ as the digits,
$1 \leq d \leq n \leq 9$. We then have
$$
b_{nd} = \frac{(10^d-1)(n+1)!}{18(n-d)!}
$$
where, of course, $a_n=b_{nn}$.
