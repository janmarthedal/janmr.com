---
title: Simple Linear Regression
date: '2023-12-20'
layout: page
tags:
  - machine-learning
categories:
  - mathematics
excerpt: >-
  We now turn to the general case of fitting a line to a set of points in the
  plane. The two previous posts considered the special cases where the points'
  center of mass was at the origin and where the line had to pass through the
  origin.
mastodon: 'https://mathstodon.xyz/@janmr/111616905800145493'
redirect: /blog/2023/12/simple-linear-regression/
---
We now turn to the general case of fitting a line to a set of points in the plane.
The two previous posts considered the special cases where
[the points' center of mass was at the origin](/posts/origin-centered-simple-linear-regression/)
and where
[the line had to pass through the origin](/posts/no-intercept-simple-linear-regression/).

Let the points be given as $(x_i, y_i)$ for $i=1, \ldots, n$, where $n \geq 2$
is the number of points.
We will furthermore require that the $x_i$ are not all equal.

<figure>
  <img src="/media/simple-linreg/points.svg" class="img-responsive" alt="A set of points in the plane">
  <figcaption><strong>Figure 1.</strong> A set of points in the plane.</figcaption>
</figure>

Again, we will look for a [least squares](https://en.wikipedia.org/wiki/Least_squares) definition of *best*.
We seek a line $y = a x + b$ that minimizes the following error function:

$$
J = \sum_{i=1}^n (a x_i + b - y_i)^2.
$$

Note this very important observation: *Translating the points and the line by the same
amount does not change the value of the error function*.
This means that we can translate the points so their center of mass is at the origin,
compute the best fitting line for the translated points,
and then translate the line and points back to the original position.

So let us set

$$
\tilde{x}_i = x_i - \bar{x} \quad \text{and} \quad \tilde{y}_i = y_i - \bar{y}
$$

where $\bar{x} = \tfrac{1}{n} s_x$ and $\bar{y} = \tfrac{1}{n} s_y$
with $s_x = \sum_{i=1}^n x_i$ and $s_y = \sum_{i=1}^n y_i$.

We now have $\sum_{i=1}^n \tilde{x}_i = \sum_{i=1}^n \tilde{y}_i = 0$,
so we can apply the results from the
[previous posts](/posts/origin-centered-simple-linear-regression/)
to find the best fitting line $\tilde{y} = \tilde{a} \tilde{x}$ for the
translated points and we get

$$
\tilde{a} = \frac{\sum_{i=1}^n \tilde{x}_i \tilde{y}_i}{\sum_{i=1}^n \tilde{x}_i^2}.
$$

Rewriting the equation for the line,

$$
\tilde{y} = \tilde{a} \tilde{x}
\quad \Leftrightarrow \quad
y - \bar{y} = \tilde{a} (x - \bar{x})
\quad \Leftrightarrow \quad
y = \tilde{a} x + \bar{y} - \tilde{a} \bar{x},
$$

we see that the line we seek is given by $y = a x + b$ with

$$
a = \frac{\displaystyle \sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})}{\displaystyle \sum_{i=1}^n (x_i - \bar{x})^2}
\; , \quad
b = \bar{y} - a \bar{x} \; .
$$

We can simplify this expression for $a$. First, the numerator:

$$
\begin{align*}
\sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})
&= \sum_{i=1}^n x_i y_i - \bar{y} \sum_{i=1}^n x_i - \bar{x} \sum_{i=1}^n y_i + n \bar{x} \bar{y} \\
&= \sum_{i=1}^n x_i y_i - \tfrac{1}{n} \sum_{i=1}^n x_i \sum_{i=1}^n y_i \\
&= s_{xy} - \tfrac{1}{n} s_x s_y \; ,
\end{align*}
$$

where $s_{xy} = \sum_{i=1}^n x_i y_i$. Next, the denominator:

$$
\begin{align*}
\sum_{i=1}^n (x_i - \bar{x})^2
&= \sum_{i=1}^n x_i^2 - 2 \bar{x} \sum_{i=1}^n x_i + \bar{x}^2 \\
&= s_{xx} - \tfrac{1}{n} s_x^2 \; ,
\end{align*}
$$

where $s_{xx} = \sum_{i=1}^n x_i^2$. Putting it all together, we have the following
expressions for $a$ and $b$ (equivalent to the ones above):

$$
a = \frac{n s_{xy} - s_x s_y}{n s_{xx} - s_x^2}
\; , \quad
b = (s_y - a s_x) / n \; .
$$

Note how, by construction, the line always passes through the center of mass of the points
$(\bar{x}, \bar{y})$.

<figure>
  <img src="/media/simple-linreg/line.svg" class="img-responsive" alt="The line that best fits a set of points">
  <figcaption><strong>Figure 2.</strong> The line that best fits a set of points (the center of mass is shown in green).</figcaption>
</figure>
