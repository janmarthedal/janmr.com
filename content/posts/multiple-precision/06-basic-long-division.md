---
title: Basic Multiple-Precision Long Division
date: 2014-04-14T12:00Z
layout: post
tags:
  - arithmetic
  - algorithms
  - multiple-precision
categories:
  - programming
excerpt: >-
  We consider the task of dividing a positive integer u by another positive
  integer v, thus obtaining a quotient q=u/v and a remainder r such that u = q v
  + r with 0 <= r < v. The method presented here is based on The Classical
  Algorithms, Section 4.3.1, of The Art of Computer Programming, Volume 2, by
  Donald E. Knuth. The material is quite theory-heavy and if you are just
  looking for the main algorithm, you can skip to the bottom and Algorithm L.
redirect: /blog/2014/04/basic-multiple-precision-long-division/
---
We consider the task of dividing a positive integer $u$ by another positive integer $v$, thus obtaining a quotient $q=\lfloor u/v \rfloor$ and a remainder $r$ such that $u = q v + r$ with $0 \leq r < v$.

The method presented here is based on *The Classical Algorithms*, Section&nbsp;4.3.1, of [The Art of Computer Programming, Volume&nbsp;2](/refs/taocp2/), by [Donald E. Knuth](http://www-cs-faculty.stanford.edu/~uno/). The material is quite theory-heavy and if you are just looking for the main algorithm, you can skip to the bottom and [Algorithm&nbsp;L](#algorithm-L).

We represent the numbers using radix $b \geq 2$ and set

$$
u = (u_{m-1} \ldots u_1 u_0)_b \quad \text{and} \quad v = (v_{n-1} \ldots v_1 v_0)_b \; ,
$$

so $u$ is an $m$-digit number and $v$ is an $n$-digit number (see [previous post](/posts/multiple-precision-number-representation/) for more details on representing multiple-precision numbers).

Two special cases are easily dealt with:

 * If $m < n$ then $u < v$ and so $q = 0$ and $r = u$ is the simple answer.
 * If $n = 1$ then $v$ is just a single digit and we use a [short division algorithm](/posts/multiple-precision/05-basic-short-division/) instead.

So in the following we assume that $m \geq n > 1$.

We will approach the division algorithm from a top-level point of view. It is actually just a formalization of the well-known pencil-and-paper method:

**Algorithm G**. Given $u = (u_{m-1} \ldots u_1 u_0)_b$, $u_{m-1} \neq 0$ and $v = (v_{n-1} \ldots v_1 v_0)_b$, $v_{n-1} \neq 0$, with $m \geq n > 0$, this algorithm outlines how to compute the quotient $q = (q_{m-n} \ldots q_1 q_0)_b = \lfloor u/v \rfloor$ (we may have $q_{m-n} = 0$ in which case $q_{m-n-1} \neq 0$ if $m > n$) and the remainder $r$ such that $u = q v + r$, $0 \leq r < v$.

*   **G1**. $u^{(m-n+1)} \leftarrow (0 u_{m-1} \ldots u_1 u_0)_b$.
*   **G2**. $k \leftarrow m-n$.
*   **G3**. $q_k \leftarrow \left\lfloor (u^{(k+1)}_{k+n} \ldots u^{(k+1)}_{k+1} u^{(k+1)}_k)_b / v \right\rfloor$.
*   **G4**. Set $u^{(k)} \leftarrow u^{(k+1)} - q_k b^k v$ or, equivalently,

$$
\begin{aligned} (u^{(k)}_{k+n} \ldots u^{(k)}_{k+1} u^{(k)}_k)_b &\leftarrow (u^{(k+1)}_{k+n} \ldots u^{(k+1)}_{k+1} u^{(k+1)}_k)_b - q_k v, \\ (u^{(k)}_{k-1} \ldots u^{(k)}_1 u^{(k)}_0)_b &\leftarrow (u^{(k+1)}_{k-1} \ldots u^{(k+1)}_1 u^{(k+1)}_0)_b. \end{aligned}
$$

*   **G5**. If $k=0$ then set $r \leftarrow u^{(0)}$ and exit. Otherwise set $k \leftarrow k-1$ and go to step&nbsp;**G3**.

An essential invariant of this algorithm is

$$
(u^{(k)}_{k+n-1} \ldots u^{(k)}_{k+1} u^{(k)}_k)_b < v \quad \text{for} \quad k=0, 1, \ldots, m-n+1.
$$

This can be seen as follows. For $k=m-n+1$ the invariant is ensured by introducing a zero as the most significant digit of $u^{(m-n+1)}$ in step&nbsp;**G1**. For $k=0,1,\ldots,m-n$ we see from steps&nbsp;**G3** and&nbsp;**G4** that $(u^{(k)}_{k+n} \ldots u^{(k)}_{k+1} u^{(k)}_k)_b = (u^{(k+1)}_{k+n} \ldots u^{(k+1)}_{k+1} u^{(k+1)}_k)_b \text{ mod } v$ and the inequality follows.

Note that the invariant implies that $u^{(k)}_{k+n}=0$ for $k=0, 1, \ldots, m-n$. Furthermore we have that

$$
(u^{(k+1)}_{k+n} \ldots u^{(k+1)}_{k+1} u^{(k+1)}_k)_b = (u^{(k+1)}_{k+n} \ldots u^{(k+1)}_{k+1})_b \cdot b + u^{(k+1)}_k \leq (v-1) b + (b-1) = v b - 1
$$

from which we see that the quotients $q_k$ computed in step&nbsp;**G3** are non-negative and smaller than $b$, as they should be.

Finally, we can verify that the algorithm computes what we intended. We have

$$
\begin{aligned} r &= u^{(0)} = u^{(1)} - q_0 b^0 v = u^{(2)} - q_1 b^1 v - q_0 b^0 v = \ldots \\ &= u^{(m-n+1)} - (q_{m-n} b^{m-n} + \cdots + q_0 b^0) v = u - q v. \end{aligned}
$$

Now for some practical aspects. Note first that all of the $u^{(k)}$ variables can in fact be represented by a single variable and simply overwrite its digits along the way &ndash; thus ending up with the remainder. Note also that any of the remainder's digits may be zero.

Finally, how do we compute the quotient in step&nbsp;**G3**? That is in fact the central part of the division algorithm and is the subject of the rest of this post.

Let us now consider computing the quotient in step&nbsp;**G3** in the case $n > 1$. We therefore assume $u = (u_n \ldots u_1 u_0)_b$, $u < b^{n+1}$, and $v = (v_{n-1} \ldots v_1 v_0)_b$, $b^{n-1} \leq v < b^n$, with $n \geq 2$ and $0 \leq \lfloor u/v \rfloor < b$.

We wish to compute $q = \lfloor u/v \rfloor$ as fast as possible. How good is a 'first order' approximation, where we use just the two most-significant digits of $u$ and the most-significant digit of $v$: $(u_n b + u_{n-1})/v_{n-1}$? First of all, if $u_n = v_{n-1}$ this quantity equals $b$ and we know that $q \leq b-1$ by assumption, so let us therefore study

$$
\hat{q} = \text{min} \left( \left\lfloor \frac{u_n b + u_{n-1}}{v_{n-1}} \right\rfloor, b-1 \right)
$$

This approximate quotient is never too small, as the following theorem states.

**Theorem 1.** With $\hat{q}$ as defined above we have $q \leq \hat{q}$.

*Proof*. If $\hat{q}=b-1$ then since $q \leq b-1$ by assumption, the statement is true.

Assume then that $\hat{q} = \lfloor (u_n b + u_{n-1})/v_{n-1} \rfloor$. From the properties of the [floor function](/posts/useful-properties-of-the-floor-and-ceil-functions/) we have $u_n b + u_{n-1} \leq \hat{q} v_{n-1} + v_{n-1} - 1$ and therefore $\hat{q} v_{n-1} \geq u_n b + u_{n-1} - v_{n-1} + 1$. We then get

$$
\begin{aligned} u - \hat{q} v &\leq u - \hat{q} v_{n-1} b^{n-1} \\ &\leq u_n b^n + \cdots + u_0 - (u_n b + u_{n-1} - v_{n-1} + 1) b^{n-1} \\ &= u_{n-2} b^{n-2} + \cdots + u_0 - b^{n-1} + v_{n-1} b^{n-1} < v_{n-1} b^{n-1} \leq v. \end{aligned}
$$

So $u - \hat{q} v < v$ and since $0 \leq u - q v < v$ we must have $q \leq \hat{q}$.&emsp;&#9724;

If $u$ and $v$ are scaled appropriately, $\hat{q}$ will never be too large, either.

**Theorem 2.** With $\hat{q}$ as defined above and $v_{n-1} \geq \lfloor b/2 \rfloor$, we have $\hat{q} \leq q+2$.

*Proof*. Assume that $\hat{q} \geq q+3$. We get

$$
\hat{q} \leq \frac{u_n b u_{n-1}}{v_{n-1}} = \frac{u_n b^n u_{n-1} b^{n-1}}{v_{n-1} b^{n-1}} \leq \frac{u}{v_{n-1} b^{n-1}} < \frac{u}{v - b^{n-1}},
$$

since $v = v_{n-1} b^{n-1} + \cdots + v_0 \leq v_{n-1} b^{n-1} + b^{n-1}$. We cannot have $v = b^{n-1}$ since that would imply $\hat{q} = q = u_n$. The relation $q = \lfloor u/v \rfloor$ implies $q > u/v - 1$, from which we get

$$
3 \leq \hat{q} - q < \frac{u}{v - b^{n-1}} - \frac{u}{v} + 1 = \frac{u}{v} \left( \frac{b^{n-1}}{v - b^{n-1}} \right) + 1.
$$

We then have

$$
\frac{u}{v} \geq 2 \left( \frac{v - b^{n-1}}{b^{n-1}} \right) \geq 2(v_{n-1} - 1),
$$

and finally

$$
b-4 \geq \hat{q}-3 \geq q = \lfloor u/v \rfloor \geq 2(v_{n-1}-1),
$$

which implies $v_{n-1} < \lfloor b/2 \rfloor$.&emsp;&#9724;

We would expect to come even closer if we consider the 'second order' approximate quotient,

$$
\left\lfloor \frac{u_n b^2 + u_{n-1} b + u_{n-2}}{v_{n-1} b + v_{n-2}} \right\rfloor,
$$

but how much closer? Given some approximate quotient $\hat{q}$, let us compute the corresponding second order residual

$$
u_n b^2 + u_{n-1} b + u_{n-2} - \hat{q} (v_{n-1} b + v_{n-2}) = \hat{r} b + u_{n-2} - \hat{q} v_{n-2},
$$

where $\hat{r}$ is the first order residual,

$$
\hat{r} = u_n b + u_{n-1} - \hat{q} v_{n-1}.
$$

By studying the sign of the second order residual we can now get closer to the true quotient.

**Theorem 3.** Let $\hat{q}$ be any approximate quotient and $\hat{r}$ the corresponding first order residual. Now if $\hat{q} v_{n-2} > b \hat{r} + u_{n-2}$ then $q < \hat{q}$.

*Proof*. Assume $\hat{q} v_{n-2} > b \hat{r} + u_{n-2}$, equivalent to $\hat{r} b + u_{n-2} - \hat{q} v_{n-2} + 1 \leq 0$. We then have

$$
\begin{aligned} u - \hat{q} v &\leq u - \hat{q} v_{n-1} b^{n-1} - \hat{q} v_{n-2} b^{n-2} \\ &=    b^{n-1} (u_n b + u_{n-1} - \hat{q} v_{n-1}) + u_{n-2} b^{n-2} + \cdots + u_0 - \hat{q} v_{n-2} b^{n-2} \\ &<    b^{n-1} \hat{r} + u_{n-2} b^{n-2} + b^{n-2} - \hat{q} v_{n-2} b^{n-2} \\ &=    b^{n-2} (\hat{r} b + u_{n-2} - \hat{q} v_{n-2} + 1) \leq 0. \end{aligned}
$$

So $u - \hat{q} v < 0 \leq u - q v$ which implies $q < \hat{q}$.&emsp;&#9724;

**Theorem 4.** Let $\hat{q}$ be any approximate quotient and $\hat{r}$ the corresponding first order residual. Now if $\hat{q} v_{n-2} \leq b \hat{r} + u_{n-2}$ then $\hat{q} \leq q+1$.

*Proof*. Let $\hat{q} v_{n-2} \leq b \hat{r} + u_{n-2}$ and assume $\hat{q} \geq q+2$. Now since $u - q v < v$ we get

$$
\begin{aligned} u &< (q+1) v \leq (\hat{q}-1) v < \hat{q} (v_{n-1} b^{n-1} + v_{n-2} b^{n-2} + b^{n-2}) - v \\ &< \hat{q} v_{n-1} b^{n-1} + \hat{q} v_{n-2} b^{n-2} + b^{n-1} - v \\ &\leq \hat{q} v_{n-1} b^{n-1} + (b \hat{r} + u_{n-2}) b^{n-2} + b^{n-1} - v \\ &= u_n b^n + u_{n-1} b^{n-1} + u_{n-2} b^{n-2} + b^{n-1} - v \\ &\leq u_n b^n + u_{n-1} b^{n-1} + u_{n-2} b^{n-2} \leq u. \end{aligned}
$$

This claims that $u < u$, a contradiction, so our assumption $\hat{q} \geq q+2$ must have been wrong.&emsp;&#9724;

We now have the following procedure for computing $\hat{q}$, a very close estimate to $q$:

**Algorithm Q**. Let $u = (u_n \ldots u_1 u_0)_b$ and $v = (v_{n-1} \ldots v_1 v_0)_b$, $v_{n-1} \neq 0$, with $n \geq 2$ and $0 \leq \lfloor u/v \rfloor < b$ (any digit of $u$ can be zero and note that the only digits accessed are $u_n$, $u_{n-1}$, $u_{n-2}$, $v_{n-1}$, and $v_{n-2}$). The algorithm computes an integer $\hat{q}$ such that $\hat{q}-1 \leq \lfloor u/v \rfloor \leq \hat{q}$ (Theorems&nbsp;1 and&nbsp;4).

 * **Q1**. Set $\hat{q} \leftarrow \lfloor (u_n b + u_{n-1})/v_{n-1} \rfloor$ and $\hat{r} \leftarrow (u_n b + u_{n-1}) \text{ mod } v_{n-1}$. If $\hat{q} = b$ (division overflow when $b=b_T$) set $\hat{q} \leftarrow \hat{q} - 1$ and $\hat{r} \leftarrow \hat{r} + v_{n-1}$ (dealing with division overflow can be avoided by setting $\hat{q} \leftarrow b-1$ and $\hat{r} \leftarrow u_n + u_{n-1}$ if $v_{n-1} = u_n$).
 * **Q2**. While $\hat{r} < b$ and $\hat{q} v_{n-2} > b \hat{r} + u_{n-2}$, set $\hat{q} \leftarrow \hat{q} - 1$ and $\hat{r} \leftarrow \hat{r} + v_{n-1}$ (Theorem&nbsp;2 assures that this while-loop is executed at most two times if $v_{n-1} \geq \lfloor b/2 \rfloor$. The check $\hat{r} < b$ is not necessary but makes sure that we don't deal with numbers that are $b^2$ or larger in the subsequent comparison).

We can now combine Algorithm G with the just obtained knowledge of approximating the quotient in the following algorithm for long division:

<span id="algorithm-L"></span>**Algorithm L**. Given $u = (u_{m-1} \ldots u_1 u_0)_b$, $u_{m-1} \neq 0$ and $v = (v_{n-1} \ldots v_1 v_0)_b$, $v_{n-1} \neq 0$, with $m \geq n > 1$, this algorithm computes the quotient $q = (q_{m-n} \ldots q_1 q_0)_b = \lfloor u/v \rfloor$ (we may have $q_{m-n} = 0$ in which case $q_{m-n-1} \neq 0$ if $m > n$) and the remainder $r$ such that $u = q v + r$, $0 \leq r < v$.

*   **L1**. Set $v \leftarrow d \cdot v$ such that $v_{n-1} \geq \lfloor b/2 \rfloor$ (letting $d$ be a power of two is usually the best choice). Similarly, set $(u_m \ldots u_1 u_0)_b \leftarrow d \cdot u$ (ensure $u$ gets $n+1$ digits, setting $u_m=0$ if necessary).
*   **L2**. Set $k \leftarrow m - n$.
*   **L3**. Find $\hat{q}$ such that $\hat{q}-1 \leq \lfloor (u_{k+n} \ldots u_{k+1} u_k)_b /v \rfloor \leq \hat{q}$ (use Algorithm&nbsp;Q described above).
*   **L4**. Make the update $(u_{k+n} \ldots u_{k+1} u_k)_b \leftarrow (u_{k+n} \ldots u_{k+1} u_k)_b - \hat{q} v$.
*   **L5**. If the subtraction of step&nbsp;**L4** produces a borrow (the result is negative) do $\hat{q} \leftarrow \hat{q} - 1$ and $(u_{k+n} \ldots u_{k+1} u_k)_b \leftarrow (u_{k+n} \ldots u_{k+1} u_k)_b + v$.
*   **L6**. Set $q_k = \hat{q}$.
*   **L7**. If $k=0$ set $r \leftarrow u/d$ and exit. Otherwise set $k \leftarrow k-1$ and go to step&nbsp;**L3**.

The normalization in step&nbsp;**L1** such that $v_{n-1} \geq \lfloor b/2 \rfloor$ does two things. Firstly, it makes sure that the while-loop of the $\hat{q}$-computation executes at most two times. Secondly, the probability that the adding back in step&nbsp;**L5** must be executed is of order $2/b$ (a proof can be found in Knuth's book).
