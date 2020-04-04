---
path: /blog/2014/06/deriving-closed-form-for-square-pyramidal-numbers
date: '2014-06-14'
title: Deriving the Closed Form for Square Pyramidal Numbers
tags:
  - pyramidal-numbers
categories:
  - mathematics
excerpt: >-
  The sum of the first n squares is s_n = 1/6 n (n+1) (2n+1). The numbers s_0,
  s_1, s_2, ... are called the square pyramidal numbers. Many different proofs
  exist. Seven different proofs can be found in Concrete Mathematics and even a
  visual proof has been published. One of the simplest proofs uses induction on
  n. This approach assumes that you know (or guess) the correct formula
  beforehand, though. This post will show a derivation which is a formalization
  of the derivation shown on wikipedia.
---
The sum of the first *n* squares is

$$s_n = \sum_{k=1}^n k^2 = \textstyle\frac{1}{6} n (n+1) (2n+1) \quad .$$

The numbers $s_0, s_1, s_2, \ldots$ are called the [square pyramidal numbers](http://oeis.org/A000330).

Many different proofs exist. Seven different proofs can be found in [Concrete Mathematics](https://en.wikipedia.org/wiki/Special:BookSources/0201558025) and even a [visual proof](http://www.maa.org/programs/faculty-and-departments/classroom-capsules-and-notes/proof-without-words-sum-of-squares-0) has been published (via [@MathUpdate](https://twitter.com/MathUpdate)).

One of the simplest proofs uses induction on *n*. This approach assumes that you know (or guess) the correct formula beforehand, though.

This post will show a derivation which is a formalization of the derivation shown on [wikipedia](http://en.wikipedia.org/wiki/Square_pyramidal_number#Derivation_of_the_summation_formula).<span></span> It revolves around manipulating sums and the fact that

$$k^2 = \sum_{j=1}^k (2j-1)$$

since $k^2 - (k-1)^2 = 2k-1$.

We will now write $s_n$ in three different ways. The first simply inserts the above expression for $k^2$:

$$s_n = \sum_{k=1}^n \sum_{j=1}^k (2j-1) \quad .$$

The second reverses the order of summation for the inner sum:

$$s_n = \sum_{k=1}^n \sum_{j=1}^k (2(k-j)+1) \quad .$$

The third starts as the first and does a series of manipulations:

$$\begin{aligned} s_n &= \sum_{k=1}^n \sum_{j=1}^k (2j-1) = \sum_{j=1}^n \sum_{k=j}^n (2j-1) = \sum_{j'=1}^n \sum_{k=n+1-j'}^n (2(n+1-j')-1) \\ &= \sum_{j'=1}^n \sum_{k'=1}^{j'} (2(n-j')+1) = \sum_{k=1}^n \sum_{j=1}^k (2(n-k)+1) \end{aligned}$$

(the manipulations being: Switching the order of summation, change of variable $j' = n+1-j$, change of variable $k' = k+j'-n$, renaming $j' \rightarrow k$, $k' \rightarrow j$).

We now add together these three expressions for $s_n$ and get

$$3 s_n = \sum_{k=1}^n \sum_{j=1}^k (2n+1) = (2n+1) \sum_{k=1}^n k = (2n+1) \frac{n (n+1)}{2}$$

which, after dividing each side by 3, produces the wanted formula.
