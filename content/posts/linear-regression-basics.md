---
title: Linear Regression Basics
date: '2023-05-04'
layout: page
categories:
  - machine-learning
excerpt: >-
  Linear regression is a common and powerful method for modelling the
  relationship between some input vectors and some output scalars. This post
  explains the basics of linear regression.
redirect: /blog/2023/05/linear-regression-basics/
---
Linear regression is a common and powerful method for modelling the relationship
between some input vectors and some output scalars.

To be more specific, assume we have a data set $(\mathbf{x}_i, y_i)$, $i=1,\ldots,n$,
where the $\mathbf{x}_i$'s are $p$-element vectors $\mathbf{x}_i \in \mathbb{R}^p$.
We now seek a function $F: \mathbb{R}^p \mapsto \mathbb{R}$ such that

$$
F(\mathbf{x}_i) \approx y_i \quad \text{for $i=1,\ldots,n$.}
$$

But what is $F$ and what does $\approx$ mean?
First, $F$ must be linear (which is the reason for the name *linear* regression).
This means, [by definition](https://en.wikipedia.org/wiki/Linear_map#Definition_and_first_consequences):

1. $F(\mathbf{u} + \mathbf{v}) = F(\mathbf{u}) + F(\mathbf{v})$ for all $\mathbf{u}, \mathbf{v} \in \mathbb{R}^p$,
2. $F(t \mathbf{u}) = t F(\mathbf{u})$ for all $t \in \mathbf{R}$ and $\mathbf{u} \in \mathbb{R}^p$.

Using these two rules we get

$$
\begin{aligned}
&F((u_1,u_2,\ldots,u_p)) \\
&= F((u_1,0,\ldots,0)) + F((0,u_2,\ldots,0)) + \ldots + F((0,0,\ldots,u_p)) \\
&= u_1 F((1,0,\ldots,0)) + u_2 F((0,1,\ldots,0)) + \ldots + u_p F((0,0,\ldots,1)) \\
&= u_1 f_1 + u_2 f_2 + \ldots + u_p f_p
\end{aligned}
$$

so $F$ is *uniquely determined* by the vector $\mathbf{f} = (f_1, f_2, \ldots, f_p)$.
The output of $F$ will always be a [linear combination](https://en.wikipedia.org/wiki/Linear_combination)
of the coefficients of the input vector,

$$
F(\mathbf{u}) = \mathbf{u}^T \mathbf{f}
$$

(all vectors are treated as column vectors).

That was $F$, but what about $F(\mathbf{x}_i) \approx y_i$?
It means that we would like each $|y_i - F(\mathbf{x}_i)|$ to be as small as possible.
To be more precise, we wish to solve the following optimization problem:

$$
\argmin_{\mathbf{f \in \mathbb{R}^p}} \| \mathbf{y} - \mathbf{X}^T \mathbf{f} \|
$$

with $\mathbf{y} = (y_1, y_2, \ldots, y_n)$,
$\mathbf{X} = [ \mathbf{x}_1 \; \mathbf{x}_2 \; \cdots \; \mathbf{x}_n ] \in \mathbb{R}^{p \times n}$
and some [norm](https://en.wikipedia.org/wiki/Norm_(mathematics))
$\| \cdot \|$ to measure the magnitude of the error.

Any norm will do, but the most common choice is the
[Euclidean norm](https://en.wikipedia.org/wiki/Norm_(mathematics)#Euclidean_norm),
also called the 2-norm, $\| (u_1, \ldots, u_n) \|_2 = \sqrt{u_1^2 + \ldots + u_n^2}$.
This norm has the advantage that the solution can be computed exactly and in
a fairly efficient way (see, e.g., Section&nbsp;5.5 in
[Matrix Computations](/refs/matrix-comp/)).
A solution to this optimization problem is also computed by the NumPy function
[`numpy.linalg.lstsq`](https://numpy.org/doc/stable/reference/generated/numpy.linalg.lstsq.html).

See the [following post](/posts/linear-regression-applied) for some examples
of how to apply linear regression to some problems.
