---
title: Origin-Centered Simple Linear Regression
date: '2023-12-08'
layout: post
tags:
  - machine learning
categories:
  - mathematics
excerpt: >-
  Let us consider the task of finding the line that best fits a set of points in the plane.
  We will, however, insist the the points' center of mass is at the origin,
  as this turns out to simplify the solution.
# mastodon: https://mathstodon.xyz/@janmr/111515835930659320
---
Let us consider the task of finding the line that best fits a set of points in the plane.
We will, however, insist the the points' center of mass is at the origin,
as this turns out to simplify the solution.

To be more specific, let the points be given as $(x_i, y_i)$ for $i=1, \ldots, n$,
where $n \geq 2$ is the number of points.
The center of mass restriction means that we have
$$
\sum_{i=1}^n x_i = 0 \quad \text{and} \quad \sum_{i=1}^n y_i = 0.
$$
We will furthermore require that not all $x_i$ are equal to zero or,
equivalently, that $\sum_{i=1}^n x_i^2 > 0$
(this is also the reason for the $n \geq 2$ restriction).

<figure>
  <img src="/media/simple-linreg/origin-points.svg" class="img-responsive" alt="A set of points in the plane with center of mass at the origin">
  <figcaption><strong>Figure 1.</strong> A set of points in the plane with center of mass at the origin.</figcaption>
</figure>

We initially stated that we wanted to find the line that fits the points best.
There are several ways to define what is meant by *best*, but here we want to find the line
$y = a x + b$ such that the following error function is *minimized*:

$$
J = \tfrac{1}{2} \sum_{i=1}^n (a x_i + b - y_i)^2.
$$

That is, we want to minimize the sum of the squares of the vertical distances between
the points and the line.

To find the stationary points of $J$, we first set the partial derivative with respect to $b$ to zero:

$$
0 = \frac{\partial J}{\partial b}
  = \sum_{i=1}^n (a x_i + b - y_i)
  = a \sum_{i=1}^n x_i + n b - \sum_{i=1}^n y_i
  = n b,
$$

where we use the center of mass restriction to easily see that $b=0$.

We now set the partial derivative of $J$ with respect to $a$ equal to zero:

$$
\begin{align*}
0 = \frac{\partial J}{\partial a}
  &= \sum_{i=1}^n x_i (a x_i + b - y_i)
  = a \sum_{i=1}^n x_i^2 + b \sum_{i=1}^n x_i - \sum_{i=1}^n x_i y_i \\
  &= a \sum_{i=1}^n x_i^2 - \sum_{i=1}^n x_i y_i
  = a s_{xx} - s_{xy} \; ,
\end{align*}
$$

where

$$
s_{xy} = \sum_{i=1}^n x_i y_i \quad \text{and} \quad s_{xx} = \sum_{i=1}^n x_i^2.
$$

In conclusion, we have

$$
a = \frac{s_{xy}}{s_{xx}} \quad \text{and} \quad b = 0.
$$

<figure>
  <img src="/media/simple-linreg/origin-line.svg" class="img-responsive" alt="The line that best fits a set of points in the plane with center of mass at the origin">
  <figcaption><strong>Figure 2.</strong> The line that best fits a set of points in the plane with center of mass at the origin.</figcaption>
</figure>
