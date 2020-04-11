---
path: /blog/2011/11/basic-multiple-precision-multiplication
date: '2011-11-09'
title: Basic Multiple-Precision Multiplication
tags:
  - algorithms
  - multiple-precision
  - numbers-project
categories:
  - programming
excerpt: >-
  After addressing multiple-precision addition and subtraction, we now turn to
  multiplication of two multiple-precision numbers. Once again, we use the
  number representation and notation introduced earlier. Several algorithms
  exist for doing multiple-precision multiplication. This post will present the
  basic, pencil-and-paper-like method. Basically, it consists of two parts:
  Multiplying a number by a single digit and adding together the sub-results,
  aligned appropriately. [...]
---
After addressing multiple-precision [addition](/blog/2011/10/multiple-precision-addition) and [subtraction](/blog/2011/10/multiple-precision-subtraction), we now turn to multiplication of two multiple-precision numbers. Once again, we use the number representation and notation [introduced earlier](/blog/2011/10/multiple-precision-number-representation).

Several algorithms exist for doing multiple-precision multiplication. This post will present the basic, pencil-and-paper-like method. Basically, it consists of two parts: Multiplying a number by a single digit and adding together the sub-results, aligned appropriately.

#### Multiple digits times a single digit

Let us first consider multiplying an $n$-digit multiple-precision integer by a single digit. More precisely, we wish to compute $z \leftarrow \alpha v + y + k_0$ where

$$
v = (v_{n-1} \ldots v_1 v_0)_b, \quad 1 \leq \alpha \leq b-1, \quad y = (y_{n-1} \ldots y_1 y_0)_b, \quad 0 \leq k_0 \leq b-1.
$$

Using this information it is straightforward to show that $b^{n-1} \leq z \leq b^{n+1}-1$, which implies that the result will fit into $n$ or $n+1$ digits, so we set $z = (z_n \ldots z_1 z_0)_b$, where $z_n$ may be zero.

We now have the algorithm:

$$
\begin{aligned} z_i &\leftarrow (\alpha v_i + y_i + k_i) \;\text{mod}\; b, \\ k_{i+1} &\leftarrow \left\lfloor \frac{\alpha v_i + y_i + k_i}{b} \right\rfloor, \end{aligned}
$$

for $i = 0, 1, \ldots, n-1$ and finally setting $z_n = k_n$.

To realize that the algorithm computes what it is supposed to, observe first that

$$
\alpha v_i + y_i + k_i = (\alpha v_i + y_i + k_i) \;\text{mod}\; b + \left\lfloor (\alpha v_i + y_i + k_i)/b \right\rfloor b = z_i + k_{i+1} b.
$$

Then we have

$$
\begin{aligned} \alpha v + y &= \sum_{i=0}^{n-1} (\alpha v_i + y_i) b^i = \sum_{i=0}^{n-1} (\alpha v_i + y_i + k_i) b^i - \sum_{i=0}^{n-1} k_i b^i \\ &= \sum_{i=0}^{n-1} (z_i + k_{i+1} b) b^i - \sum_{i=0}^{n-1} k_i b^i = \sum_{i=0}^{n-1} z_i b^i + \sum_{i=0}^{n-1} k_{i+i} b^{i+1} - \sum_{i=0}^{n-1} k_i b^i \\ &= \sum_{i=0}^{n-1} z_i b^i + z_n b^n - k_0 = z - k_0, \end{aligned}
$$

which is what we wanted.

From the expression for $z_i$ we see that they naturally fit into a digit, that is, $0 \leq z_i \leq b-1$ for $i = 0, 1, \ldots, n-1$. But what about the $k_i$'s and thus also $z_n$? Assume that $0 \leq k_i \leq b-1$. We then have
$\alpha v_i + y_i + k_i \leq (b-1) + (b-1)(b-1) + (b-1) = b^2-1,$
which implies that $k_{i+1} = \lfloor (\alpha v_i + y_i + k_i)/b \rfloor \leq b-1$. Since we have also assumed $0 \leq k_0 \leq b-1$ we have, by induction, that $0 \leq z_i \leq b-1$ for $i = 0, 1, \ldots, n$.

#### Multiple digits times multiple digits

We now turn to multiplying two multiple-precision numbers. More specifically, we wish to multiply

$$
u = (u_{m-1} \ldots u_1 u_0)_b, \quad \text{and} \quad v = (v_{n-1} \ldots v_1 v_0)_b,
$$

which implies $b^{m+n-2} \leq u v < b^{m+n}$. So we set $w = (w_{m+n-1} \ldots w_1 w_0)_b$ and aim to compute

$$
w \leftarrow u v = \sum_{i=0}^{m-1} u_i v b^i.
$$

We observe two things:

1. Multiplication by $b^i$ corresponds to shifting left the number of digits given by $i$.
2. The product $u_i v$ is of type single-digit times multiple-digit and can be computed using the algorithm from the previous section.

Putting these pieces together we get:

$$
\begin{aligned} (w_n \ldots w_1 w_0)_b           &\leftarrow u_0 v, \\ (w_{n+1} \ldots w_2 w_1)_b       &\leftarrow (w_n \ldots w_2 w_1) + u_1 v, \\ &\vdots \\ (w_{n+m-1} \ldots w_m w_{m-1})_b &\leftarrow (w_{n+m-2} \ldots w_m w_{m-1})_b + u_{m-1} v. \end{aligned}
$$

The algorithm can actually be generalized slightly if we compute

$$
w \leftarrow (w_{n-1} \ldots w_1 w_0)_b + u \; v
$$

instead. All we need to do is replace the first step in the algorithm by

$$
(w_n \ldots w_1 w_0)_b \leftarrow (w_{n-1} \ldots w_1 w_0)_b + u_0 v.
$$
