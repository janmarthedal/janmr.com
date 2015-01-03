---
layout: post
title: Basic Multiple-Precision Long Division
author: Jan Marthedal Rasmussen
excerpt: ! "We consider the task of dividing a positive integer u by another positive integer v, thus obtaining a quotient q=u/v and a remainder r such that u = q v + r with 0 <= r < v.
The method presented here is based on The Classical Algorithms, Section 4.3.1, of The Art of Computer Programming, Volume 2, by Donald E. Knuth. The material is quite theory-heavy and if you are just looking for the main algorithm, you can skip to the bottom and Algorithm L."
categories:
- programming
tags:
- arithmetic
- algorithms
- multiple-precision
---
<div style="float:right"><a href="{% amazon taocp2 %}"><img src="{% bookcover taocp2 %}"></a></div>

We consider the task of dividing a positive integer {% imath u %} by another positive integer {% imath v %}, thus obtaining a quotient {% imath q=\lfloor u/v \rfloor %} and a remainder {% imath r %} such that {% imath u = q v + r %} with {% imath 0 \leq r < v %}.

The method presented here is based on *The Classical Algorithms*, Section&nbsp;4.3.1, of [The Art of Computer Programming](http://www-cs-faculty.stanford.edu/~uno/taocp.html), Volume&nbsp;2, by [Donald E. Knuth](http://www-cs-faculty.stanford.edu/~uno/). The material is quite theory-heavy and if you are just looking for the main algorithm, you can skip to the bottom and [Algorithm&nbsp;L](#algorithm-L).

We represent the numbers using radix {% imath b \geq 2 %} and set

{% dmath u = (u_{m-1} \ldots u_1 u_0)_b \quad \text{and} \quad v = (v_{n-1} \ldots v_1 v_0)_b \; , %}

so {% imath u %} is an {% imath m %}-digit number and {% imath v %} is an {% imath n %}-digit number (see [previous post](/2011/10/multiple-precision-number-representation.html) for more details on representing multiple-precision numbers).

Two special cases are easily dealt with:

 * If {% imath m < n %} then {% imath u < v %} and so {% imath q = 0 %} and {% imath r = u %} is the simple answer.
 * If {% imath n = 1 %} then {% imath v %} is just a single digit and we use a [short division algorithm](/2012/11/basic-multiple-precision-short-division.html) instead.

So in the following we assume that {% imath m \geq n > 1 %}.

We will approach the division algorithm from a top-level point of view. It is actually just a formalization of the well-known pencil-and-paper method:

**Algorithm G**. Given {% imath u = (u_{m-1} \ldots u_1 u_0)_b %}, {% imath u_{m-1} \neq 0 %} and {% imath v = (v_{n-1} \ldots v_1 v_0)_b %}, {% imath v_{n-1} \neq 0 %}, with {% imath m \geq n > 0 %}, this algorithm outlines how to compute the quotient {% imath q = (q_{m-n} \ldots q_1 q_0)_b = \lfloor u/v \rfloor %} (we may have {% imath q_{m-n} = 0 %} in which case {% imath q_{m-n-1} \neq 0 %} if {% imath m > n %}) and the remainder {% imath r %} such that {% imath u = q v + r %}, {% imath 0 \leq r < v %}.

 * **G1**. {% imath u^{(m-n+1)} \leftarrow (0 u_{m-1} \ldots u_1 u_0)_b %}.
 * **G2**. {% imath k \leftarrow m-n %}.
 * **G3**. {% imath q_k \leftarrow \left\lfloor (u^{(k+1)}_{k+n} \ldots u^{(k+1)}_{k+1} u^{(k+1)}_k)_b / v \right\rfloor %}.
 * **G4**. Set {% imath u^{(k)} \leftarrow u^{(k+1)} - q_k b^k v %} or, equivalently, {% dmath \begin{aligned} (u^{(k)}_{k+n} \ldots u^{(k)}_{k+1} u^{(k)}_k)_b &\leftarrow (u^{(k+1)}_{k+n} \ldots u^{(k+1)}_{k+1} u^{(k+1)}_k)_b - q_k v, \\ (u^{(k)}_{k-1} \ldots u^{(k)}_1 u^{(k)}_0)_b &\leftarrow (u^{(k+1)}_{k-1} \ldots u^{(k+1)}_1 u^{(k+1)}_0)_b. \end{aligned} %}
 * **G5**. If {% imath k=0 %} then set {% imath r \leftarrow u^{(0)} %} and exit. Otherwise set {% imath k \leftarrow k-1 %} and go to step&nbsp;**G3**.

An essential invariant of this algorithm is

{% dmath (u^{(k)}_{k+n-1} \ldots u^{(k)}_{k+1} u^{(k)}_k)_b < v \quad \text{for} \quad k=0, 1, \ldots, m-n+1. %}

This can be seen as follows. For {% imath k=m-n+1 %} the invariant is ensured by introducing a zero as the most significant digit of {% imath u^{(m-n+1)} %} in step&nbsp;**G1**. For {% imath k=0,1,\ldots,m-n %} we see from steps&nbsp;**G3** and&nbsp;**G4** that {% imath (u^{(k)}_{k+n} \ldots u^{(k)}_{k+1} u^{(k)}_k)_b = (u^{(k+1)}_{k+n} \ldots u^{(k+1)}_{k+1} u^{(k+1)}_k)_b \text{ mod } v %} and the inequality follows.

Note that the invariant implies that {% imath u^{(k)}_{k+n}=0 %} for {% imath k=0, 1, \ldots, m-n %}. Furthermore we have that

{% dmath (u^{(k+1)}_{k+n} \ldots u^{(k+1)}_{k+1} u^{(k+1)}_k)_b = (u^{(k+1)}_{k+n} \ldots u^{(k+1)}_{k+1})_b \cdot b + u^{(k+1)}_k \leq (v-1) b + (b-1) = v b - 1 %}

from which we see that the quotients {% imath q_k %} computed in step&nbsp;**G3** are non-negative and smaller than {% imath b %}, as they should be.

Finally, we can verify that the algorithm computes what we intended. We have

{% dmath \begin{aligned} r &= u^{(0)} = u^{(1)} - q_0 b^0 v = u^{(2)} - q_1 b^1 v - q_0 b^0 v = \ldots \\ &= u^{(m-n+1)} - (q_{m-n} b^{m-n} + \cdots + q_0 b^0) v = u - q v. \end{aligned} %}

Now for some practical aspects. Note first that all of the {% imath u^{(k)} %} variables can in fact be represented by a single variable and simply overwrite its digits along the way &ndash; thus ending up with the remainder. Note also that any of the remainder's digits may be zero.

Finally, how do we compute the quotient in step&nbsp;**G3**? That is in fact the central part of the division algorithm and is the subject of the rest of this post.

Let us now consider computing the quotient in step&nbsp;**G3** in the case {% imath n > 1 %}. We therefore assume {% imath u = (u_n \ldots u_1 u_0)_b %}, {% imath u < b^{n+1} %}, and {% imath v = (v_{n-1} \ldots v_1 v_0)_b %}, {% imath b^{n-1} \leq v < b^n %}, with {% imath n \geq 2 %} and {% imath 0 \leq \lfloor u/v \rfloor < b %}.

We wish to compute {% imath q = \lfloor u/v \rfloor %} as fast as possible. How good is a 'first order' approximation, where we use just the two most-significant digits of {% imath u %} and the most-significant digit of {% imath v %}: {% imath (u_n b + u_{n-1})/v_{n-1} %}? First of all, if {% imath u_n = v_{n-1} %} this quantity equals {% imath b %} and we know that {% imath q \leq b-1 %} by assumption, so let us therefore study

{% dmath \hat{q} = \text{min} \left( \left\lfloor \frac{u_n b + u_{n-1}}{v_{n-1}} \right\rfloor, b-1 \right) %}

This approximate quotient is never too small, as the following theorem states.

**Theorem 1.** With {% imath \hat{q} %} as defined above we have {% imath q \leq \hat{q} %}.

<button class="btn btn-default btn-xs" onclick="togglevis('prf1');">*Proof*</button>
<div class="proof" id="prf1" style="display: none;">
If {% imath \hat{q}=b-1 %} then since {% imath q \leq b-1 %} by assumption, the statement is true.

Assume then that {% imath \hat{q} = \lfloor (u_n b + u_{n-1})/v_{n-1} \rfloor %}. From the properties of the [floor function](/2009/09/useful-properties-of-the-floor-and-ceil-functions.html) we have {% imath u_n b + u_{n-1} \leq \hat{q} v_{n-1} + v_{n-1} - 1 %} and therefore {% imath \hat{q} v_{n-1} \geq u_n b + u_{n-1} - v_{n-1} + 1 %}. We then get

{% dmath \begin{aligned} u - \hat{q} v &\leq u - \hat{q} v_{n-1} b^{n-1} \\ &\leq u_n b^n + \cdots + u_0 - (u_n b + u_{n-1} - v_{n-1} + 1) b^{n-1} \\ &= u_{n-2} b^{n-2} + \cdots + u_0 - b^{n-1} + v_{n-1} b^{n-1} < v_{n-1} b^{n-1} \leq v. \end{aligned} %}

So {% imath u - \hat{q} v < v %} and since {% imath 0 \leq u - q v < v %} we must have {% imath q \leq \hat{q} %}.
</div>

If {% imath u %} and {% imath v %} are scaled appropriately, {% imath \hat{q} %} will never be too large, either.

**Theorem 2.** With {% imath \hat{q} %} as defined above and {% imath v_{n-1} \geq \lfloor b/2 \rfloor %}, we have {% imath \hat{q} \leq q+2 %}.

<button class="btn btn-default btn-xs" onclick="togglevis('prf2');">*Proof*</button>
<div class="proof" id="prf2" style="display: none;">
Assume that {% imath \hat{q} \geq q+3 %}. We get

{% dmath \hat{q} \leq \frac{u_n b u_{n-1}}{v_{n-1}} = \frac{u_n b^n u_{n-1} b^{n-1}}{v_{n-1} b^{n-1}} \leq \frac{u}{v_{n-1} b^{n-1}} < \frac{u}{v - b^{n-1}}, %}

since {% imath v = v_{n-1} b^{n-1} + \cdots + v_0 \leq v_{n-1} b^{n-1} + b^{n-1} %}. We cannot have {% imath v = b^{n-1} %} since that would imply {% imath \hat{q} = q = u_n %}. The relation {% imath q = \lfloor u/v \rfloor %} implies {% imath q > u/v - 1 %}, from which we get

{% dmath 3 \leq \hat{q} - q < \frac{u}{v - b^{n-1}} - \frac{u}{v} + 1 = \frac{u}{v} \left( \frac{b^{n-1}}{v - b^{n-1}} \right) + 1. %}

We then have

{% dmath \frac{u}{v} \geq 2 \left( \frac{v - b^{n-1}}{b^{n-1}} \right) \geq 2(v_{n-1} - 1), %}

and finally

{% dmath b-4 \geq \hat{q}-3 \geq q = \lfloor u/v \rfloor \geq 2(v_{n-1}-1), %}

which implies {% imath v_{n-1} < \lfloor b/2 \rfloor %}.
</div>

We would expect to come even closer if we consider the 'second order' approximate quotient,

{% dmath \left\lfloor \frac{u_n b^2 + u_{n-1} b + u_{n-2}}{v_{n-1} b + v_{n-2}} \right\rfloor, %}

but how much closer? Given some approximate quotient {% imath \hat{q} %}, let us compute the corresponding second order residual

{% dmath u_n b^2 + u_{n-1} b + u_{n-2} - \hat{q} (v_{n-1} b + v_{n-2}) = \hat{r} b + u_{n-2} - \hat{q} v_{n-2}, %}

where {% imath \hat{r} %} is the first order residual,

{% dmath \hat{r} = u_n b + u_{n-1} - \hat{q} v_{n-1}. %}

By studying the sign of the second order residual we can now get closer to the true quotient.

**Theorem 3.** Let {% imath \hat{q} %} be any approximate quotient and {% imath \hat{r} %} the corresponding first order residual. Now if {% imath \hat{q} v_{n-2} > b \hat{r} + u_{n-2} %} then {% imath q < \hat{q} %}.

<button class="btn btn-default btn-xs" onclick="togglevis('prf3');">*Proof*</button>
<div class="proof" id="prf3" style="display: none;">
Assume {% imath \hat{q} v_{n-2} > b \hat{r} + u_{n-2} %}, equivalent to {% imath \hat{r} b + u_{n-2} - \hat{q} v_{n-2} + 1 \leq 0 %}. We then have

{% dmath \begin{aligned} u - \hat{q} v &\leq u - \hat{q} v_{n-1} b^{n-1} - \hat{q} v_{n-2} b^{n-2} \\ &=    b^{n-1} (u_n b + u_{n-1} - \hat{q} v_{n-1}) + u_{n-2} b^{n-2} + \cdots + u_0 - \hat{q} v_{n-2} b^{n-2} \\ &<    b^{n-1} \hat{r} + u_{n-2} b^{n-2} + b^{n-2} - \hat{q} v_{n-2} b^{n-2} \\ &=    b^{n-2} (\hat{r} b + u_{n-2} - \hat{q} v_{n-2} + 1) \leq 0. \end{aligned} %}

So {% imath u - \hat{q} v < 0 \leq u - q v %} which implies {% imath q < \hat{q} %}.
</div>

**Theorem 4.** Let {% imath \hat{q} %} be any approximate quotient and {% imath \hat{r} %} the corresponding first order residual. Now if {% imath \hat{q} v_{n-2} \leq b \hat{r} + u_{n-2} %} then {% imath \hat{q} \leq q+1 %}.

<button class="btn btn-default btn-xs" onclick="togglevis('prf4');">*Proof*</button>
<div class="proof" id="prf4" style="display: none;">
Let {% imath \hat{q} v_{n-2} \leq b \hat{r} + u_{n-2} %} and assume {% imath \hat{q} \geq q+2 %}. Now since {% imath u - q v < v %} we get

{% dmath \begin{aligned} u &< (q+1) v \leq (\hat{q}-1) v < \hat{q} (v_{n-1} b^{n-1} + v_{n-2} b^{n-2} + b^{n-2}) - v \\ &< \hat{q} v_{n-1} b^{n-1} + \hat{q} v_{n-2} b^{n-2} + b^{n-1} - v \\ &\leq \hat{q} v_{n-1} b^{n-1} + (b \hat{r} + u_{n-2}) b^{n-2} + b^{n-1} - v \\ &= u_n b^n + u_{n-1} b^{n-1} + u_{n-2} b^{n-2} + b^{n-1} - v \\ &\leq u_n b^n + u_{n-1} b^{n-1} + u_{n-2} b^{n-2} \leq u. \end{aligned} %}

This claims that {% imath u < u %}, a contradiction, so our assumption {% imath \hat{q} \geq q+2 %} must have been wrong.
</div>

We now have the following procedure for computing {% imath \hat{q} %}, a very close estimate to {% imath q %}:

**Algorithm Q**. Let {% imath u = (u_n \ldots u_1 u_0)_b %} and {% imath v = (v_{n-1} \ldots v_1 v_0)_b %}, {% imath v_{n-1} \neq 0 %}, with {% imath n \geq 2 %} and {% imath 0 \leq \lfloor u/v \rfloor < b %} (any digit of {% imath u %} can be zero and note that the only digits accessed are {% imath u_n %}, {% imath u_{n-1} %}, {% imath u_{n-2} %}, {% imath v_{n-1} %}, and {% imath v_{n-2} %}). The algorithm computes an integer {% imath \hat{q} %} such that {% imath \hat{q}-1 \leq \lfloor u/v \rfloor \leq \hat{q} %} (Theorems&nbsp;1 and&nbsp;4).

 * **Q1**. Set {% imath \hat{q} \leftarrow \lfloor (u_n b + u_{n-1})/v_{n-1} \rfloor %} and {% imath \hat{r} \leftarrow (u_n b + u_{n-1}) \text{ mod } v_{n-1} %}. If {% imath \hat{q} = b %} (division overflow when {% imath b=b_T %}) set {% imath \hat{q} \leftarrow \hat{q} - 1 %} and {% imath \hat{r} \leftarrow \hat{r} + v_{n-1} %} (dealing with division overflow can be avoided by setting {% imath \hat{q} \leftarrow b-1 %} and {% imath \hat{r} \leftarrow u_n + u_{n-1} %} if {% imath v_{n-1} = u_n %}).
 * **Q2**. While {% imath \hat{r} < b %} and {% imath \hat{q} v_{n-2} > b \hat{r} + u_{n-2} %}, set {% imath \hat{q} \leftarrow \hat{q} - 1 %} and {% imath \hat{r} \leftarrow \hat{r} + v_{n-1} %} (Theorem&nbsp;2 assures that this while-loop is executed at most two times if {% imath v_{n-1} \geq \lfloor b/2 \rfloor %}. The check {% imath \hat{r} < b %} is not necessary but makes sure that we don't deal with numbers that are {% imath b^2 %} or larger in the subsequent comparison).

We can now combine Algorithm G with the just obtained knowledge of approximating the quotient in the following algorithm for long division:

<span id="algorithm-L"></span>**Algorithm L**. Given {% imath u = (u_{m-1} \ldots u_1 u_0)_b %}, {% imath u_{m-1} \neq 0 %} and {% imath v = (v_{n-1} \ldots v_1 v_0)_b %}, {% imath v_{n-1} \neq 0 %}, with {% imath m \geq n > 1 %}, this algorithm computes the quotient {% imath q = (q_{m-n} \ldots q_1 q_0)_b = \lfloor u/v \rfloor %} (we may have {% imath q_{m-n} = 0 %} in which case {% imath q_{m-n-1} \neq 0 %} if {% imath m > n %}) and the remainder {% imath r %} such that {% imath u = q v + r %}, {% imath 0 \leq r < v %}.

 * **L1**. Set {% imath v \leftarrow d \cdot v %} such that {% imath v_{n-1} \geq \lfloor b/2 \rfloor %} (letting {% imath d %} be a power of two is usually the best choice). Similarly, set {% imath (u_m \ldots u_1 u_0)_b \leftarrow d \cdot u %} (ensure {% imath u %} gets {% imath n+1 %} digits, setting {% imath u_m=0 %} if necessary).
 * **L2**. Set {% imath k \leftarrow m - n %}.
 * **L3**. Find {% imath \hat{q} %} such that {% imath \hat{q}-1 \leq \lfloor (u_{k+n} \ldots u_{k+1} u_k)_b /v \rfloor \leq \hat{q} %} (use Algorithm&nbsp;Q described above).
 * **L4**. Make the update {% imath (u_{k+n} \ldots u_{k+1} u_k)_b \leftarrow (u_{k+n} \ldots u_{k+1} u_k)_b - \hat{q} v %}.
 * **L5**. If the subtraction of step&nbsp;**L4** produces a borrow (the result is negative) do {% imath \hat{q} \leftarrow \hat{q} - 1 %} and {% imath (u_{k+n} \ldots u_{k+1} u_k)_b \leftarrow (u_{k+n} \ldots u_{k+1} u_k)_b + v %}.
 * **L6**. Set {% imath q_k = \hat{q} %}.
 * **L7**. If {% imath k=0 %} set {% imath r \leftarrow u/d %} and exit. Otherwise set {% imath k \leftarrow k-1 %} and go to step&nbsp;**L3**.

The normalization in step&nbsp;**L1** such that {% imath v_{n-1} \geq \lfloor b/2 \rfloor %} does two things. Firstly, it makes sure that the while-loop of the {% imath \hat{q} %}-computation executes at most two times. Secondly, the probability that the adding back in step&nbsp;**L5** must be executed is of order {% imath 2/b %} (a proof can be found in Knuth's book).

