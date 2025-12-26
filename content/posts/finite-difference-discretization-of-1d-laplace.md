---
title: Finite Difference Discretization of the 1D Laplace Operator
date: 2024-04-27T12:00Z
layout: post
tags:
  - laplace-operator
  - finite-differences
categories:
  - numerical-analysis
excerpt: >-
  Let us consider how to approximate the Laplace operator in one dimension. The
  method considered here is based on finite differences and will allow us to
  approximate the Laplace operator on a regular grid in a simple and efficient
  way.
redirect: /blog/2024/04/finite-difference-discretization-of-1d-laplace/
---
Let us consider how to approximate the Laplace operator in one dimension.
The method considered here is based on finite differences and will allow us
to approximate the Laplace operator on a regular grid in a simple and efficient way.

Recall that the Laplace operator in one dimension is just the second derivative.
Let $f: \mathbb{R} \to \mathbb{R}$ be a sufficiently smooth function around a point $x$.
We then have the Taylor expansion

$$
f(x + h) = f(x) + h f'(x) + \frac{h^2}{2} f''(x) + \frac{h^3}{6} f'''(x) + \cal{O}(h^4)
$$

for some $h > 0$ and

$$
f(x - h) = f(x) - h f'(x) + \frac{h^2}{2} f''(x) - \frac{h^3}{6} f'''(x) + \cal{O}(h^4).
$$

Adding these two equations and rearranging a bit gives

$$
f(x + h) + f(x - h) - 2 f(x) = h^2 f''(x) + \cal{O}(h^4)
$$

and thus

$$
\Delta f(x) = f''(x) = \frac{f(x - h) - 2 f(x) + f(x + h)}{h^2} + \cal{O}(h^2).
$$

Let us now approxiate the Laplace operator on a regular grid.
Let $f: [0, 1] \to \mathbb{R}$ be a sufficiently smooth function with $f(0) = f(1) = 0$.
We divide the interval $[0, 1]$ into $n+1$ subintervals of equal length $h=1/(n+1)$
and set $x_i = i h$ for $i = 0, 1, \ldots, n+1$.

We now have

$$
y_i = \frac{f(x_{i-1}) - 2 f(x_i) + f(x_{i+1})}{h^2}, \quad i = 1, 2, \ldots, n,
$$

as an approximation for $\Delta f(x_i)$ (recall that $f(x_0) = f(x_{n+1}) = 0$).

The matrix form of this relation is

$$
\begin{bmatrix}
y_1 \\
y_2 \\
\vdots \\
y_n
\end{bmatrix}
= \frac{1}{h^2}
\begin{bmatrix}
-2 & 1 & 0 & \cdots & 0 \\
1 & -2 & 1 & \cdots & 0 \\
0 & 1 & -2 & \cdots & 0 \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
0 & 0 & 0 & \cdots & -2
\end{bmatrix}
\begin{bmatrix}
f(x_1) \\
f(x_2) \\
\vdots \\
f(x_n)
\end{bmatrix}.
$$
