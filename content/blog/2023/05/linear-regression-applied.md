---
title: Linear Regression Applied
date: '2023-05-05'
layout: post
tags:
categories:
  - machine learning
excerpt: >-
  This post looks at some examples of linear regression, as introduced in
  a previous post
---
This post looks at some examples of linear regression, as introduced in
a [previous post](/blog/2023/05/linear-regression-basics/).

To summerize the objective and the notation:
A set of $n$ of data points $(\mathbf{x}_i, y_i)$, $i=1,\ldots,n$, are given
with $\mathbf{x}_i \in \mathbb{R}^p$.
We now have the optimization problem

$$
\argmin_{\mathbf{f \in \mathbb{R}^p}} \| \mathbf{y} - \mathbf{X}^T \mathbf{f} \|_2
$$

with $\mathbf{y} = (y_1, y_2, \ldots, y_n)$,
$\mathbf{X} = [ \mathbf{x}_1 \; \mathbf{x}_2 \; \cdots \; \mathbf{x}_n ] \in \mathbb{R}^{p \times n}$.

Note that it is sometimes useful to consider the columns of $\mathbf{X}^T$ as
[feature vectors](https://en.wikipedia.org/wiki/Feature_(machine_learning)).
With $[\textbf{v}_1 \; \textbf{v}_2 \; \ldots \; \textbf{v}_p] = \mathbf{X}^T$
we see that $\textbf{v}_j$ contains the $j$-th component of all data points.
Doing linear regression now becomes: Find the linear combination of the feature
vectors that best approximates the target vector $\mathbf{y}$.

As example data we use the following points $y_1, \ldots, y_{100}$ as
target/output values:

<figure>
  <img src="/media/linreg/points.svg" class="width30rem">
</figure>

Note that in this plot, and all the following related to these particular data,
the coordinate along the first axis for the $i$th point is $t_i$,
where the $t_i$'s are evenly spaced with $t_1=0$ and $t_{100}=8$.

#### Simple Linear Regression

By using $\mathbf{x}_i = (1, t_i)$ we get the optimization problem

$$
\argmin_{f_1, f_2 \in \mathbb{R}} \sum_{i=1}^{100} \left| y_i - (f_1 + f_2 t_i) \right|^2
$$

which corresponds to fitting a line to the data points.
This is the most common form of linear regression and is often called
[simple linear regression](https://en.wikipedia.org/wiki/Simple_linear_regression).
By considering the feature vectors of $\mathbf{x}_i$ we see that we have
a constant vector and a vector with the $t_i$-values as components:

<figure>
  <img src="/media/linreg/simple_linreg_feat.svg" class="width30rem">
</figure>

The solution to this optimization problem (a
[closed-form formula](https://en.wikipedia.org/wiki/Proofs_involving_ordinary_least_squares#Derivation_of_simple_linear_regression_estimators)
is available for this special case) can be visualized as follows:

<figure>
  <img src="/media/linreg/simple_linreg_fit.svg" class="width30rem">
</figure>

Not a particularly good fit, but it is the best we can do with a line.

#### Fitting a Cubic Polynomium

A line is not a particularly flexible model, so let us try a cubic polynomium instead.
We use $\mathbf{x}_i = (1, t_i, t_i^2, t_i^3)$ and get the following four feature vectors:

<figure>
  <img src="/media/linreg/cubic_feat.svg" class="width30rem">
</figure>

The solution to the optimization problem now leads to a much better fit:

<figure>
  <img src="/media/linreg/cubic_fit.svg" class="width30rem">
</figure>

#### Piecewise Linear Features

There is no need to limit ourselves to polynomials. Let us consider these
(continuous) feature functions:

$$
\begin{aligned}
p_1(x) &= 1, \\
p_2(x) &= \max \{ 2-x, 0 \}, \\
p_3(x) &= \max \{ x-6, 0 \},
\end{aligned}
$$

each defined for $0 \leq x \leq 8$. We can now sample these functions for
each value of $t_i$ to obtain the input vectors,
$\mathbf{x}_i = (p_1(t_i), p_2(t_i), p_3(t_i))$.

The feature vectors now look like this:

<figure>
  <img src="/media/linreg/piecewise_feat.svg" class="width30rem">
</figure>

It is easy to see that any linear combination of these vectors will
have a constant value for $2 < t < 6$, but that may be ok:

<figure>
  <img src="/media/linreg/piecewise_fit.svg" class="width30rem">
</figure>

#### Fitting an Ellipse

Linear regression, however, is useful for more than just fitting
[real functions](https://en.wikipedia.org/wiki/Function_of_a_real_variable#Real_function)
to some data points.

Consider the equation of an ellipse:

$$
\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1.
$$

Now consider the following set of points $(u_i, v_i)$, $i=1,\ldots,100$,
in the $(u,v)$-plane:

<figure>
  <img src="/media/linreg/ellipse_feat.svg" class="width30rem">
</figure>

Is it possible to find the coefficients $f_1, f_2$ such that
$f_1 u_i^2 + f_2 v_i^2 = 1$ for all $i$?
Obviously not, since the points cannot possibly lie on the
circumference of a single ellipse.
But we can find the coefficients such that
$f_1 u_i^2 + f_2 v_i^2$ comes close to $1$ in the least squares sense.

We do this by setting $\mathbf{x}_i = (u_i^2, v_i^2)$ and $y_i = 1$
for $i=1,\ldots,100$.
Solving the optimization problem now leads to values of $f_1$ and $f_2$
and this means that the
[semi-major and the semi-minor axis](https://en.wikipedia.org/wiki/Semi-major_and_semi-minor_axes)
of the "best" ellipse are given by $1/\sqrt{f_1}$ and $1/\sqrt{f_2}$.

For the data points shown above we get the following ellipse:

<figure>
  <img src="/media/linreg/ellipse.svg" class="width30rem">
</figure>

(All the computations and plots in this post can be found as a
[Kaggle notebook](https://www.kaggle.com/janmarthedalrasmussen/linear-regression-examples).)
