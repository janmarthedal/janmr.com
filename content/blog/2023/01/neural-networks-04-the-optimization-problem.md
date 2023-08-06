---
title: Neural Networks - The Optimization Problem
date: '2023-01-17'
layout: post
type: post
tags:
  - neural-network
categories:
  - machine-learning
excerpt: >-
  We introduce an error function to minimize in order to fit a training set as best as possible.
---
Consider a neural network as [previously described](/blog/2023/01/neural-networks-02-the-model).
As before, we fix the structure of the neural network: The number of layers and the number of
nodes and the activation functions for each layer. Now, given the weights and biases
for each layers, we can compute the output vector
$\textbf{a}^L = N(\textbf{x}) \in \mathbb{R}^{n^L}$ for any input vector
$\textbf{x} \in \mathbb{R}^{n^0}$.

How close does $\textbf{a}^L$ come to some desired output vector $\textbf{y} \in \mathbb{R}^{n^L}$?
A good way to compute this closeness is using the sum of the squares of the element-wise differences:
$$
\tfrac{1}{2} \sum_{i=1}^{n^L} (a^L_i - y_i)^2 = \tfrac{1}{2} \| \textbf{a}^L - \textbf{y} \|_2^2,
$$
where $\|\cdot\|_2$ is the [2-norm](https://en.wikipedia.org/wiki/Lp_space#The_p-norm_in_finite_dimensions).

Assume now that we have a set of $m$ input/output pairs:
$$
(\textbf{x}_c, \textbf{y}_c) \in \mathbb{R}^{n^0} \times \mathbb{R}^{n^L},
$$
for $c=1,\ldots,m$.
How close do the outputs $N(\textbf{x}_c)$ come to the desired outputs $\textbf{y}_c$?
We measure this closeness by setting
$$
A^L = [N(\textbf{x}_1) \; N(\textbf{x}_2) \cdots N(\textbf{x}_m)], \quad
Y = [\textbf{y}_1 \; \textbf{y}_2 \cdots \textbf{y}_m]
$$
and then computing the error/cost function $E$ by averaging over the errors of the individual pairs:
$$
E = \tfrac{1}{2m} \sum_{c=1}^m \sum_{i=1}^{n^L} \left( A_{ic}^L - Y_{ic} \right)^2
= \tfrac{1}{2m} \sum_{c=1}^m \| A^L_{\ast,c} - Y_{\ast,c} \|_2^2
= \tfrac{1}{2m} \left\| A^L - Y \right\|_F^2,
$$
where $\|\cdot\|_F$ is the [Frobenius norm](https://en.wikipedia.org/wiki/Matrix_norm#Frobenius_norm).

Note how $E$ can, and should, be seen as a *function of the weights and biases*. This way $E$ becomes
a map from $\mathbb{R}^p$ into $\mathbb{R}$ where $p$ is the total number of weights and biases,
$p=(n^0+1)n^1 + (n^1+1)n^2 + \cdots + (n^{L-1}+1)n^L$.

The quantity $E$ has some obvious, and useful, properties:
- $E$ is always non-negative.
- The closer $E$ is to zero, the closer the computed outputs $N(\textbf{x}_c)$ are to the desired outputs $\textbf{y}_c$.
  (This follows from the fact that $\| N(\textbf{x}_c) - \textbf{y}_c \|_2^2) \leq 2m E$ for all $c=1,\ldots,m$).

The set of $m$ input/output pairs $(\textbf{x}_c, \textbf{y}_c)$ is typically called
a *training set*. It is called so because given a training set, we can seek the weights and biases of
the neural network that *minimizes* the error $E$.

How do you find the parameters that minimizes a given function? That is the subject of the
[next post](/blog/2023/01/neural-networks-05-gradient-descent).
