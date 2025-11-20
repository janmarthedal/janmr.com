---
title: Neural Networks - Activation Functions
date: '2023-01-21'
layout: post
tags:
  - neural-network
categories:
  - machine-learning
excerpt: On activation functions for neural networks.
_redirect: /blog/2023/01/neural-networks-08-activation-functions/
---
As mentioned in a [previous post](/blog/2023/01/neural-networks-05-gradient-descent), the activation
functions used in a [neural network](/blog/2023/01/neural-networks-02-the-model)
can be *any* differentiable function $g: \mathbb{R} \mapsto \mathbb{R}$.
Such functions make the output of a neural network well-defined, it makes it possible to
compute the gradient at any point and it, in turn, makes it possible to perform the
Gradient Descent method.

There are some considerations when choosing activation functions:
1. Their shape dictate which non-linear properties the neural network can have.
2. Their properties can affect if and how fast Gradient Descent converges.
3. How many local minima the [error function](/blog/2023/01/neural-networks-04-the-optimization-problem)
   can have.
4. The activation function for the output layer represents the values that the
   neural network can produce.

One thing that seems to improve/ensure convergence is smoothness. Recall from the
[Gradient Descent post](/blog/2023/01/neural-networks-05-gradient-descent) that both
a continuous derivative and a Lipschitz condition for the gradient helped prove certain
convergence theorems.

Most activation functions are [monotonic](https://en.wikipedia.org/wiki/Monotonic_function).
There is nothing wrong with using an activation function $g$ for which $g(z_1)=g(z_2)$ for
some $z_1 \neq z_2$ (which is exactly what will be the case for a non-monotonic function),
but it means that the error function may have multiple minima.

Let us consider some common activation functions.

**Linear**

*Any* linear function $\mathbb{R} \mapsto \mathbb{R}$ will have the signature $z \mapsto \alpha z$
for some real number $\alpha$. But it is easy to see that using $W^l, b^l$ and $g^l(z) = \alpha z$
for some layer $l \geq 1$ is *equivalent* to using $\alpha W^l, \alpha b^l$ and $g^l(z) = z$.
So the only linear activation function worth considering is the identity
$$
g_{\text{id}}(z) = z.
$$

It can make perfect sense to use a linear activation function for the output layer, but it does not
make much sense to use it for a hidden layer. To see this, assume that a hidden layer $l$ has
$g^l(z)=z$. Then we have, in general,
$$
\begin{bmatrix} z^l \\ 1 \end{bmatrix}
= \begin{bmatrix} W^l & b^l \\ 0 & 1 \end{bmatrix}
\begin{bmatrix} a^{l-1} \\ 1 \end{bmatrix},
\quad
\begin{bmatrix} z^{l+1} \\ 1 \end{bmatrix}
= \begin{bmatrix} W^{l+1} & b^{l+1} \\ 0 & 1 \end{bmatrix}
\begin{bmatrix} a^l \\ 1 \end{bmatrix},
$$
but because of the linear activation function we have $a^l = z^l$ which means that
$$
\begin{bmatrix} z^{l+1} \\ 1 \end{bmatrix}
= \begin{bmatrix} W^{l+1} & b^{l+1} \\ 0 & 1 \end{bmatrix}
\begin{bmatrix} W^l & b^l \\ 0 & 1 \end{bmatrix}
\begin{bmatrix} a^{l-1} \\ 1 \end{bmatrix},
$$
which implies that layer $l$ is *essentially redundant* (removing the layer will *not* always
be equivalent to keeping it for the special case where $n^l < \min(n^{l-1}, n^{l+1})$ since the
linear map from
$\begin{bmatrix} a^{l-1} \\ 1 \end{bmatrix}$ to $\begin{bmatrix} z^{l+1} \\ 1 \end{bmatrix}$
has [rank](https://en.wikipedia.org/wiki/Rank_(linear_algebra)) at most $n^l+1$).

**Sigmoid**

The sigmoid activation function is defined as
$$
g_\sigma(z) = \frac{1}{1 + e^{-z}}
$$
with derivative
$$
g'_\sigma(z) = \frac{e^{-z}}{(1 + e^{-z})^2} = g_\sigma(z) (1-g_\sigma(z)).
$$

A plot of $g_\sigma$ and $g'_\sigma$ looks like this:
<figure>
  <img src="/media/nn/sigmoid.svg" class="img-responsive" alt="Neural Network">
  <figcaption><strong>Figure 1.</strong> The sigmoid activation function and its derivative.</figcaption>
</figure>

**ReLU**

The Rectified Linear Unit, ReLU, is defined as
$$
g_{\scriptscriptstyle \text{ReLU}}(z) = \begin{cases}
0 & \text{if $z \leq 0$} \\
z & \text{if $z > 0$}
\end{cases}
$$
with derivative
$$
g'_{\scriptscriptstyle \text{ReLU}}(z) = \begin{cases}
0 & \text{if $z \leq 0$} \\
1 & \text{if $z > 0$.}
\end{cases}
$$

A plot of $g_{\scriptscriptstyle \text{ReLU}}$ and $g'_{\scriptscriptstyle \text{ReLU}}$ looks like this:
<figure>
  <img src="/media/nn/relu.svg" class="img-responsive" alt="Neural Network">
  <figcaption><strong>Figure 2.</strong> The ReLU activation function and its derivative.</figcaption>
</figure>

Let us now open our favourite code editor and look at an
[implementation](/blog/2023/01/neural-networks-09-implementation).
