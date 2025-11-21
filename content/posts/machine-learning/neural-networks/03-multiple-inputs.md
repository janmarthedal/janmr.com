---
title: Neural Networks - Multiple Inputs
date: '2023-01-16'
layout: new-page
tags:
  - neural-network
categories:
  - machine-learning
excerpt: >-
  We look at vectorizing the evaluation of a neural network when we have
  multiple inputs.
redirect: /blog/2023/01/neural-networks-03-multiple-inputs/
---
When considering efficient implementations of evaluating a neural network as described in the
[previous post](/blog/2023/01/neural-networks-02-the-model), it becomes useful to be able to
evaluate multiple inputs simultaneously. And utilizing efficient linear algebra routines becomes
apparent.

Let there be given $m$ inputs to the neural network, each represented as columns of a matrix
$$
A^0 \in \mathbb{R}^{n^0 \times m}.
$$

Let furthermore the weights and biases be represented as matrices and (column) vectors, respectively:
$$
W^l \in \mathbb{R}^{n^l \times n^{l-1}}, \quad b^l \in \mathbb{R}^{n^l}
$$
for $l=1,\ldots,L$.

We can then compute $Z^l \in \mathbb{R}^{n^l \times m}$ from $A^{l-1}$ as
$$
Z^l
= W^l A^{l-1} + b^l [1 \cdots 1]
= \begin{bmatrix}
W^l & b^l
\end{bmatrix}
\begin{bmatrix}
A^{l-1} \\
1 \cdots 1
\end{bmatrix}
,
$$
for $i=1,\dots,n^l$, and $l=1,\ldots,L$.

Now $A^l \in \mathbb{R}^{n^l \times m}$ can be computed from $Z^l$ by applying $g^l$ to each element:
$$
A^l_{ic} = g^l(Z^l_{ic}),
$$
for $i=1,\ldots,n^l$, $c=1,\ldots,m$ and $l=1,\ldots,L$.

Each column of $A^L$ will now represent the output:
$$
\begin{bmatrix}
N(A^0_{\ast,1}) & N(A^0_{\ast,2}) & \cdots & N(A^0_{\ast,m})
\end{bmatrix}
= A^L.
$$

The [next post](/blog/2023/01/neural-networks-04-the-optimization-problem) will
set the scene for training a neural network to best fit a set of input/output pairs.
