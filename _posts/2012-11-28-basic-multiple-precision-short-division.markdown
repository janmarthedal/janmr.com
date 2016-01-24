---
layout: post
title: Basic Multiple-Precision Short Division
author: Jan Marthedal Rasmussen
excerpt: ! "Let us consider short division, by which we mean a multiple-digit number u
  divided by a single digit v [...]"
date: 2012-11-28 13:34:47.000000000 +01:00
categories:
- programming
tags:
- algorithms
- multiple-precision
- numbers-project
---
Let us consider short division, by which we mean a multiple-digit number {% imath u = (u_{m-1} \ldots u_1 u_0)_b %} divided by a single digit {% imath v %} (see, e.g., [post on number representation](/2011/10/multiple-precision-number-representation.html)). We will assume {% imath m \geq 1 %}, {% imath u_{m-1} \neq 0 %} and {% imath 0 < v < b %}.

We are interested in a quotient {% imath q = \lfloor u/v \rfloor %} and a remainder {% imath r %} such that {% imath u = q v + r %} with {% imath 0 \leq r < v %}. Using that {% imath b^{m-1} \leq u < b^m %} and {% imath 0 < v < b %} we can deduce that {% imath b^{m-2} < q < b^m %} which means that {% imath q %} can be represented using {% imath m-1 %} or {% imath m %} digits: {% imath q = (q_{m-1} \ldots q_1 q_0)_b %} (we may have {% imath q_{m-1} = 0 %} in which case {% imath q_{m-2} \neq 0 %}).

We now have the following straightforward algorithm:

**Algorithm S**. Given {% imath u = (u_{m-1} \ldots u_1 u_0)_b %} and {% imath 0 < v < b %} with {% imath m \geq 1 %} and {% imath u_{m-1} \neq 0 %}, this algorithm computes the quotient {% imath q = (q_{m-1} \ldots q_1 q_0)_b = \lfloor u/v \rfloor %} (we may have {% imath q_{m-1} = 0 %} in which case {% imath q_{m-2} \neq 0 %} if {% imath m > 1 %}) and the remainder {% imath r_0 %} such that {% imath u = q v + r_0 %}, {% imath 0 \leq r_0 < v %}.

*   **S1**. Set {% imath r_m \leftarrow 0 %}, {% imath k \leftarrow m-1 %}.
*   **S2**. Set {% imath q_k \leftarrow \lfloor (r_{k+1} b + u_k)/v \rfloor %}, {% imath r_k \leftarrow (r_{k+1} b + u_k) \text{ mod } v %}.
*   **S3**. If {% imath k=0 %} then exit. Otherwise set {% imath k \leftarrow k-1 %} and go to step&nbsp;**S2**.

By the definition of integer division and modulus, the quantities in step **S2** imply {% imath r_{k+1} b + u_k = q_k v + r_k %} for {% imath k = 0, 1, \ldots, m-1 %}. Using this, we can show the correctness of the algorithm:

{% dmath \begin{align} u &= \sum_{k=0}^{m-1} u_k b^k = \sum_{k=0}^{m-1} (q_k v + r_k - r_{k+1} b) b^k = \sum_{k=0}^{m-1} q_k b^k v + \sum_{k=0}^{m-1} r_k b^k - \sum_{k=1}^m r_k b^k \\ &= q v + r_0 - r_m b^m = q v + r_0 \end{align} %}

since {% imath r_m = 0 %}. It is clear from the definition of {% imath r_k %} that {% imath 0 \leq r_k < v %} for {% imath k = 0, 1, \ldots, m %}. Considering now the definition of {% imath q_k %} we see that since {% imath r_{k+1} b + u_k \leq (v-1) b + b-1 = b v - 1 %} we will have {% imath 0 \leq q_k < b %} for {% imath k = 0, 1, \ldots, m-1 %}.

Note two important things: During the course of the algorithm, we only need to keep track of one {% imath r %}-value, not one for each {% imath k %} (it just made the analysis easier). Note also that each entry of {% imath u %} can be overwritten with the coefficients/digits of {% imath q %}, possibly saving some storage.
