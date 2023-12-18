---
title: No-Intercept Simple Linear Regression
date: '2023-12-19'
layout: post
draft: true
tags:
  - machine learning
categories:
  - mathematics
excerpt: >-
  The previous post considered the problem of finding the line that best fits a
  set of points in the plane, with the additional restriction that the points'
  center of mass was at the origin.
  This post will consider points without any restrictions, but the line, however,
  must pass through the origin.
# mastodon: https://mathstodon.xyz/@janmr/111515835930659320
---
The [previous post](/blog/2023/12/origin-centered-simple-linear-regression/) considered
the problem of finding the line that best fits a set of points in the plane,
with the additional restriction that the points' center of mass was at the origin.

This post will consider points without any restrictions, but the line, however,
must pass through the origin.

To be more specific, let the points be given as $(x_i, y_i)$ for $i=1, \ldots, n$,
where $n \geq 1$ is the number of points.
We will furthermore require that not all $x_i$ are equal to zero or,
equivalently, that $\sum_{i=1}^n x_i^2 > 0$.

<figure>
  <img src="/media/simple-linreg/no-intercept-points.svg" class="img-responsive" alt="A set of points in the plane">
  <figcaption><strong>Figure 1.</strong> A set of points in the plane.</figcaption>
</figure>

Again, we will look for a least squares definition of *best*.
So given the line $y = a x$ we want to minimize the following error function:

$$
J = \tfrac{1}{2} \sum_{i=1}^n (a x_i - y_i)^2.
$$

To find the stationary point of $J$, we set the partial derivative with respect to $a$ to zero:

$$
\begin{align*}
0 = \frac{\partial J}{\partial a}
  &= \sum_{i=1}^n x_i (a x_i - y_i)
  = a \sum_{i=1}^n x_i^2 - \sum_{i=1}^n x_i y_i \\
  &= a s_{xx} - s_{xy} \; ,
\end{align*}
$$

where

$$
s_{xy} = \sum_{i=1}^n x_i y_i \quad \text{and} \quad s_{xx} = \sum_{i=1}^n x_i^2.
$$

In conclusion, we have

$$
a = \frac{s_{xy}}{s_{xx}}.
$$

Note how this is the exact same slope as the case where the
[center of mass was at the origin](/blog/2023/12/origin-centered-simple-linear-regression/).

<figure>
  <img src="/media/simple-linreg/no-intercept-line.svg" class="img-responsive" alt="The line that best fits a set of points when the line must pass through the origin">
  <figcaption><strong>Figure 2.</strong> The line that best fits a set of points when the line must pass through the origin.</figcaption>
</figure>
