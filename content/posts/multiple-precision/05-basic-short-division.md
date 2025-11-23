---
title: Basic Multiple-Precision Short Division
date: '2012-11-28'
layout: page
tags:
  - algorithms
  - multiple-precision
  - numbers-project
categories:
  - programming
excerpt: >-
  Let us consider short division, by which we mean a multiple-digit number u
  divided by a single digit v [...]
redirect: /blog/2012/11/basic-multiple-precision-short-division/
---
Let us consider short division, by which we mean a multiple-digit number $u = (u_{m-1} \ldots u_1 u_0)_b$ divided by a single digit $v$ (see, e.g., [post on number representation](/posts/multiple-precision-number-representation)). We will assume $m \geq 1$, $u_{m-1} \neq 0$ and $0 < v < b$.

We are interested in a quotient $q = \lfloor u/v \rfloor$ and a remainder $r$ such that $u = q v + r$ with $0 \leq r < v$. Using that $b^{m-1} \leq u < b^m$ and $0 < v < b$ we can deduce that $b^{m-2} < q < b^m$ which means that $q$ can be represented using $m-1$ or $m$ digits: $q = (q_{m-1} \ldots q_1 q_0)_b$ (we may have $q_{m-1} = 0$ in which case $q_{m-2} \neq 0$).

We now have the following straightforward algorithm:

**Algorithm S**. Given $u = (u_{m-1} \ldots u_1 u_0)_b$ and $0 < v < b$ with $m \geq 1$ and $u_{m-1} \neq 0$, this algorithm computes the quotient $q = (q_{m-1} \ldots q_1 q_0)_b = \lfloor u/v \rfloor$ (we may have $q_{m-1} = 0$ in which case $q_{m-2} \neq 0$ if $m > 1$) and the remainder $r_0$ such that $u = q v + r_0$, $0 \leq r_0 < v$.

*   **S1**. Set $r_m \leftarrow 0$, $k \leftarrow m-1$.
*   **S2**. Set $q_k \leftarrow \lfloor (r_{k+1} b + u_k)/v \rfloor$, $r_k \leftarrow (r_{k+1} b + u_k) \text{ mod } v$.
*   **S3**. If $k=0$ then exit. Otherwise set $k \leftarrow k-1$ and go to step&nbsp;**S2**.

By the definition of integer division and modulus, the quantities in step **S2** imply $r_{k+1} b + u_k = q_k v + r_k$ for $k = 0, 1, \ldots, m-1$. Using this, we can show the correctness of the algorithm:

$$
\begin{aligned}
u &= \sum_{k=0}^{m-1} u_k b^k = \sum_{k=0}^{m-1} (q_k v + r_k - r_{k+1} b) b^k \\
&= \sum_{k=0}^{m-1} q_k b^k v + \sum_{k=0}^{m-1} r_k b^k - \sum_{k=1}^m r_k b^k \\
&= q v + r_0 - r_m b^m = q v + r_0 \end{aligned}
$$

since $r_m = 0$. It is clear from the definition of $r_k$ that $0 \leq r_k < v$ for $k = 0, 1, \ldots, m$. Considering now the definition of $q_k$ we see that since $r_{k+1} b + u_k \leq (v-1) b + b-1 = b v - 1$ we will have $0 \leq q_k < b$ for $k = 0, 1, \ldots, m-1$.

Note two important things: During the course of the algorithm, we only need to keep track of one $r$-value, not one for each $k$ (it just made the analysis easier). Note also that each entry of $u$ can be overwritten with the coefficients/digits of $q$, possibly saving some storage.
