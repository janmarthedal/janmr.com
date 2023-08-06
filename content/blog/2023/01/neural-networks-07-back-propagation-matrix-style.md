---
title: Neural Networks - Back-propagation Matrix-style
date: '2023-01-20'
layout: post
type: post
tags:
  - neural-network
categories:
  - machine-learning
excerpt: >-
  We express the back-propagation formulas using matrix notation.
---
This post continues from the notation and formulas introduced in the
[previous post](/blog/2023/01/neural-networks-06-back-propagation-derivation).
The goal is to express (most of) the summations as matrix-matrix or
matrix-vector multiplications.

We start by introducing the matrices $dA^l, dZ^l \in \mathbb{R}^{n^l \times m}$
with the entries
$$
dA^l_{ic} = \frac{\partial E}{\partial A^l_{ic}}, \quad
dZ^l_{ic} = \frac{\partial E}{\partial Z^l_{ic}},
$$
for $l=1,\ldots,L$, $i=1,\ldots,n^l$, $c=1,\ldots,m$ and $dW^l \in \mathbb{R}^{n^l \times n^{l-1}}$
and $db^l \in \mathbb{R}^{n^l}$ with the entries
$$
dW^l_{ij} = \frac{\partial E}{\partial W^l_{ij}}, \quad
db^l_i = \frac{\partial E}{\partial b^l_i}
$$
for $l=1,\ldots,L$, $i=1,\ldots,n^l$ and $j=1,\ldots,n^{l-1}$.

We now have
$$
dA^L = \tfrac{1}{m} (A^L - Y)
$$
and
$$
dA^l = (W^{l+1})^T dZ^{l+1}
$$
for $l=1,\ldots,L-1$. The matrices $dZ^l$ are best expressed element-wise,
$$
dZ^l_{ic} = dA^l_{ic} \cdot {g^l}'(Z^l_{ic})
$$
for $l=1,\ldots,L$, $i=1,\ldots,n^l$, $c=1,\ldots,m$.

Finally, we have
$$
\begin{aligned}
dW^l &= dZ^l (A^{l-1})^T, \\
db^l &= dZ^l \begin{bmatrix}
1 \\
\vdots \\
1
\end{bmatrix}.
\end{aligned}
$$
for $l=1,\ldots,L$.

Now, before looking into an implementation, let us look a bit more at
[activation functions](/blog/2023/01/neural-networks-08-activation-functions).
