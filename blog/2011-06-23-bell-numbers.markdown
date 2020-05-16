---
path: /blog/2011/06/bell-numbers
date: '2011-06-23'
title: Bell Numbers
tags:
  - combinatorics
  - ode
categories:
  - mathematics
excerpt: >-
  I recently studied a system of linear ODEs, where n parameters, [...]
  described the system. It turned out that the structure of the solutions
  depended on whether any of the parameters where equal to each other. For
  instance, with three parameters there were five possibilities: [...] We can
  quickly go through small values of n and we get (starting with n=0): 1, 1, 2,
  5, 15, .... How do we obtain a general formula? [...]
---
I recently studied a system of linear [ODE](http://en.wikipedia.org/wiki/Ordinary_differential_equation)s, where $n$ parameters, $k_1, \ldots, k_n$ described the system. It turned out that the structure of the solutions depended on whether any of the parameters where equal to each other. For instance, with three parameters there were five possibilities:

1. $k_1 = k_2 = k_3$
2. $k_1 = k_2$, $k_1 \neq k_3$
3. $k_1 = k_3$, $k_1 \neq k_2$
4. $k_2 = k_3$, $k_1 \neq k_2$
5. $k_1 \neq k_2$, $k_1 \neq k_3$, $k_2 \neq k_3$

We can quickly go through small values of $n$ and we get (starting with $n=0$): 1, 1, 2, 5, 15, &#8230;. How do we obtain a general formula? Observe first that the number of possibilities corresponds to the number of equivalence relations in a set of $n$ elements. We can then list the equivalence classes for each possible equivalence relation. For the example $n=3$ we get, corresponding to the list above:

1. $\{\{k_1,k_2,k_3\}\}$
2. $\{\{k_1,k_2\}, \{k_3\}\}$
3. $\{\{k_1,k_3\}, \{k_2\}\}$
4. $\{\{k_2,k_3\}, \{k_1\}\}$
5. $\{\{k_1\}, \{k_2\}, \{k_3\}\}$

So the number of possibilities also corresponds to the number of partitions of a set of $n$ elements. Actually, there are *many* ways to interpret these numbers, see, e.g., the comments for [sequence A000110](http://oeis.org/A000110) at [OEIS](http://oeis.org).

These numbers are typically called [Bell Numbers](http://en.wikipedia.org/wiki/Bell_number) and we will denote them by $B_n$. We thus have $B_0 = B_1 = 1$, $B_2 = 2$, $B_3 = 5$.

How can we derive a formula for $B_n$? Let us assume we already know $B_0, \ldots, B_{n-1}$ and consider the number of partitions of the set $S_n=\{1,2,\ldots,n\}$. For each partition we will focus on the subset that contains one particular element, say the element $n$.

How many partitions have $\{n\}$ as a separate subset, i.e., are of the form $\{\{n\}, \ldots \}$? Exactly $B_{n-1}$, as that is the number of partitions of $S_n - \{n\}$.

How many partitions have $\{n,a\}$ as a separate subset, i.e., are of the form $\{\{n,a\}, \ldots \}$? Well, there are $n-1 \choose 1$ ways of choosing $a$ and for each of these, there are $B_{n-2}$ ways of partitioning $S_n - \{n,a\}$. Thus, there are ${n-1 \choose 1} B_{n-2}$ ways.

How many partitions have $\{n,a,b\}$ as a separate subset, i.e., are of the form $\{\{n,a,b\}, \ldots \}$? Well, there are $n-1 \choose 2$ ways of choosing $a$ and $b$ and for each of these, there are $B_{n-3}$ ways of partitioning $S_n - \{n,a,b\}$. Thus, there are ${n-1 \choose 2} B_{n-3}$ ways.

And so on. We get that

$$
B_n = \sum_{k=0}^{n-1} {n-1 \choose k} B_{n-1-k} = \sum_{k=0}^{n-1} {n-1 \choose n-1-k} B_{n-1-k} = \sum_{k=0}^{n-1} {n-1 \choose k} B_k
$$

for $n \geq 1$ and using $B_0 = 1$ we can now compute $B_n$ for any value of $n$ (no closed-form expression is known).

Bell numbers are closely related to Stirling numbers of the second kind, see, e.g., my previous post [Twelve Ways of Counting](/blog/2008/12/twelve-ways-of-counting).

The excellent books [The Book of Numbers](https://en.wikipedia.org/wiki/Special:BookSources/038797993X) and [Concrete Mathematics](https://en.wikipedia.org/wiki/Special:BookSources/0201558025) have more information on Bell numbers.

