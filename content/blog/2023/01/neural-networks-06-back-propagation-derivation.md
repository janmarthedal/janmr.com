---
title: Neural Networks - Back-propagation Derivation
date: '2023-01-19'
layout: post
tags:
  - neural network
categories:
  - machine learning
excerpt: >-
  We show how to compute the gradient of a neural network error function.
---
Consider a neural network as [previously described](/blog/2023/01/neural-networks-02-the-model).
The structure of the neural network is fixed, that is, the number of layers and the number of
nodes and the activation functions for each layer.

We furthermore have a training set consisting of $m$ input/output pairs,
$(\textbf{x}_c, \textbf{y}_c)$ for $c=1,\ldots,m$.
We set
$$
\begin{aligned}
A^0 &= [\textbf{x}_1 \; \textbf{x}_2 \; \cdots \; \textbf{x}_m], \\
Y &= [\textbf{y}_1 \; \textbf{y}_2 \; \cdots \; \textbf{y}_m], \\
\end{aligned}
$$
and $A^1, Z^1, \ldots, A^L, Z^L$, are computed as described in the
[multiple inputs post](/blog/2023/01/neural-networks-03-multiple-inputs).

We now have the [error function](/blog/2023/01/neural-networks-04-the-optimization-problem)
defined as
$$
E = \tfrac{1}{2m} \sum_{c=1}^m \sum_{i=1}^{n^L} \left( A_{ic}^L - Y_{ic} \right)^2,
$$
and in order to compute the gradient $\nabla E$ we need the partial derivates with respect to the
weights and biases,

$$
\frac{\partial E}{\partial W^l_{ij}}
\quad \text{and} \quad
\frac{\partial E}{\partial b^l_i}
$$
for $i=1,\dots,n^l$, $j=1,\ldots,n^{l-1}$, $l=1,\ldots,L$.

The key to computing these quantities is by applying the
[chain rule](https://en.wikipedia.org/wiki/Chain_rule#Multivariable_case)
in appropriate ways (see also, e.g., Theorem 9.15 of Walter Rudin's
[Principles of Mathematical Analysis](/refs/rudin76)).

First, for fixed $l, i, j$, we view $E$ as a function of $Z^l_{i1}, \ldots, Z^l_{im}$ and
each $Z^l_{ic}$, in turn, as a function of $W^l_{ij}$:

$$
\frac{\partial E}{\partial W^l_{ij}}
= \sum_{c=1}^m \frac{\partial E}{\partial Z^l_{ic}} \frac{\partial Z^l_{ic}}{\partial W^l_{ij}}
= \sum_{c=1}^m \frac{\partial E}{\partial Z^l_{ic}} A^{l-1}_{jc},
$$
for $i=1,\ldots,n^l$, $j=1,\ldots,n^{l-1}$, $l=1,\ldots,L$, where we use
[the definition](/blog/2023/01/neural-networks-03-multiple-inputs) of $Z^l_{ic}$.
Similarly for $b^l_i$:
$$
\frac{\partial E}{\partial b^l_i}
= \sum_{c=1}^m \frac{\partial E}{\partial Z^l_{ic}} \frac{\partial Z^l_{ic}}{\partial b^l_i}
= \sum_{c=1}^m \frac{\partial E}{\partial Z^l_{ic}},
$$
for $i=1,\ldots,n^l$ and $l=1,\ldots,L$.

We then get
$$
\frac{\partial E}{\partial Z^l_{ic}}
= \frac{\partial E}{\partial A^l_{ic}} \frac{\partial A^l_{ic}}{\partial Z^l_{ic}}
= \frac{\partial E}{\partial A^l_{ic}} {g^l}'(Z^l_{ic}),
$$
for $i=1,\ldots,n^l$, $l=1,\ldots,L$, $c=1,\ldots,m$. Here, the requirement that
each activation function $g^l$ is differentiable becomes apparent.

The remaining quantities are
$$
\frac{\partial E}{\partial A^l_{ic}}
= \sum_{j=1}^{n^{l+1}} \frac{\partial E}{\partial Z^{l+1}_{jc}} \frac{\partial Z^{l+1}_{jc}}{\partial A^l_{ic}}
= \sum_{j=1}^{n^{l+1}} \frac{\partial E}{\partial Z^{l+1}_{jc}} W^{l+1}_{ji},
$$
for $i=1,\ldots,n^l$, $l=1,\ldots,L-1$, $c=1,\ldots,m$, where the final piece of the puzzle
can be obtained by differentiating $E$ directly (no chain rule!):
$$
\frac{\partial E}{\partial A^L_{ic}}
= \tfrac{1}{m} \left( A^L_{ic} - Y_{ic} \right)
$$
for $i=1,\ldots,n^{l-1}$, $c=1,\ldots,m$.

By careful observation, we see that the quantities above can be computed by working your
way *backwards* through the layers. Hence, the name *back-propagation*, which was first
described for neural networks by David E. Rumelhart, Geoffrey E. Hinton and Ronald J. Williams
in the paper [Learning representations by back-propagating errors](/refs/rumelhart86).

If all these partial derivatives and indices are making you dizzy, I don't blame you.
The [next post](/blog/2023/01/neural-networks-07-back-propagation-matrix-style)
will look at how to compute the gradient using matrix notation, which
should be easier to comprehend.
