---
title: Finite Difference Discretization of the 2D Laplace Operator
date: '2024-05-04'
layout: post
tags:
  - laplace-operator
  - finite-differences
  - scipy
categories:
  - numerical-analysis
excerpt: >-
  Let us now consider the discretization of the 2D Laplace operator using finite differences.
# mastodon: https://mathstodon.xyz/@janmr/112342447991352435
---
Let us now consider the discretization of the 2D Laplace operator using finite differences.
Recall that the Laplace operator is defined as

$$
\Delta u = \nabla \cdot \nabla u = \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2},
$$

for some sufficiently smooth function $u: \mathbb{R}^2 \mapsto \mathbb{R}$.

By following the procedure as in the [previous post](/blog/2024/04/finite-difference-discretization-of-1d-laplace),
we get:

$$
\begin{aligned}
\frac{\partial^2 u(x, y)}{\partial x^2} &= \frac{u(x - h, y) - 2 u(x, y) + u(x + h, y)}{h^2} + \cal{O}(h^2), \\
\frac{\partial^2 u(x, y)}{\partial y^2} &= \frac{u(x, y - h) - 2 u(x, y) + u(x, y + h)}{h^2} + \cal{O}(h^2),
\end{aligned}
$$

and thus

$$
\Delta u(x, y) = \frac{u(x - h, y) + u(x, y - h) - 4 u(x, y) + u(x + h, y) + u(x, y + h)}{h^2} + \cal{O}(h^2).
$$

Let us now consider a uniform $(m+2) \times (n+2)$ grid with spacing $h$ in both the $x$ and $y$ directions.
We set $x_i = i h$ for $i = 0, 1, \ldots, m+1$ and $y_j = j h$ for $j = 0, 1, \ldots, n+1$.
We will assume that $u$ is zero on the boundary of the domain, i.e.,
$u(x_0, \cdot) = u(x_{m+1}, \cdot) = u(\cdot, y_0) = u(\cdot, y_{n+1}) = 0$.

Now let $D \in \mathbb{R}^{m \times n}$ be a matrix where $D_{i, j}$ is the finite difference approximation
of $\Delta u(x_i, y_j)$, i.e.,

$$
D_{i, j} = \frac{u(x_{i-1}, y_j) + u(x_i, y_{j-1}) - 4 u(x_i, y_j) + u(x_{i+1}, y_j) + u(x_i, y_{j+1})}{h^2}.
$$

We now let $U \in \mathbb{R}^{m \times n}$ be the matrix with entries $U_{i, j} = u(x_i, y_j)$
and we seek an efficient way to compute $D$ from $U$.

One way to do this is to see that $D$ can come from $U$ by sweeping through the grid and applying a
[five-point stencil](https://en.wikipedia.org/wiki/Five-point_stencil#In_two_dimensions) to each point:

<figure>
  <img src="/media/wave-eqn/stencil4.svg" class="img-responsive" alt="A five-point stencil that describes the finite difference approximation">
  <figcaption><strong>Figure 1.</strong> A five-point stencil that describes the finite difference approximation (ignoring the 1/h&sup2; factor)</figcaption>
</figure>

But how to do this efficiently using matrix operations?
We definitely want to avoid looping over the grid ourselves.
Instead, we can split the five-point stencil into two parts, one horizontal and one vertical:

<figure>
  <img src="/media/wave-eqn/stencil-2p2.svg" class="img-responsive" alt="Splitting the five-point stencil into a sum of a vertical and a horizontal three-point stencil">
  <figcaption><strong>Figure 2.</strong> Splitting the five-point stencil into a sum of a vertical and a horizontal three-point stencil</figcaption>
</figure>

This shows that we can compute $D$ from $U$ as

$$
D = L_m U + U L_n^T,
$$

where $L_k$ is the [1D Laplace matrix](/blog/2024/04/finite-difference-discretization-of-1d-laplace) of order $k$:

$$
L_k = \frac{1}{h^2} \begin{bmatrix}
-2 & 1 & 0 & \cdots & 0 \\
1 & -2 & 1 & \ddots & \vdots \\
0 & 1 & -2 & \ddots & 0 \\
\vdots & \ddots & \ddots & \ddots & 1 \\
0 & \cdots & 0 & 1 & -2
\end{bmatrix} \in \mathbb{R}^{k \times k}.
$$

Note how the first term, $L_m U$, applies the three-point stencil to each *row* of $U$
and that the second term, $U L_n^T$, applies the stencil to each *column* of $U$
(transposing $L_n$ is strictly not necessary here as $L_n$ is symmetric).

Note also how $L$ contains 3 non-zero values per row (except for the first and last rows),
so assuming that it is represented in a sparse
([compressed row](https://en.wikipedia.org/wiki/Sparse_matrix#Compressed_sparse_row_(CSR,_CRS_or_Yale_format)))
format, the matrix-matrix product $L_m U$ requires roughly $6 m n$ floating point operations
(3 multiplications and 3 additions per output entry) and likewise for $U L_n^T$.
That is a total of $12 m n$ operations to compute $D$ from $U$.

Another approach is to use the identities related to the $\operatorname{vec}$ and
Kronecker product operators as seen in an
[earlier post](/blog/2024/04/a-kronecker-product-and-vec-operator-identity).
Using these, we get

$$
\begin{aligned}
\operatorname{vec}(D) &= \operatorname{vec}(L_m U + U L_n^T) \\
&= \operatorname{vec}(L_m U) + \operatorname{vec}(U L_n^T) \\
&= (I_n \otimes L_m) \operatorname{vec}(U) + (L_n \otimes I_m) \operatorname{vec}(U) \\
&= (I_n \otimes L_m + L_n \otimes I_m) \operatorname{vec}(U),
\end{aligned}
$$

where $I_k$ is the $k \times k$ identity matrix.

So the matrix operator here is

$$
L_{m \times n} = I_n \otimes L_m + L_n \otimes I_m = L_n \oplus L_m
$$

where $\oplus$ denotes the [Kronecker sum](https://en.wikipedia.org/wiki/Kronecker_sum)
(available in SciPy as [`kronsum`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.kronsum.html)).
It contains (mostly) 5 non-zero values for each of its $m n$ rows, so the matrix-vector product
$L_{m \times n} \operatorname{vec}(U)$ requires roughly $10 m n$ floating point operations.

Note that the approach of splitting the five-point stencil into two parts can also be done
using a two-point stencil $1 \diamond 0 \diamond 1$ in one direction and $1 \diamond -4 \diamond 1$
in the other.
This will reduce the number of floating point operations down to $4 m n + 6 m n = 10 m n$,
just like the Kronecker sum approach.
