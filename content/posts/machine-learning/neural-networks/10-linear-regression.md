---
title: Neural Networks - Linear Regression
date: '2023-12-21'
layout: new-page
tags:
  - neural-network
categories:
  - machine-learning
excerpt: >-
  Looking at the basic model for a neural network, it is natural to consider:
  What is the simplest possible neural network? And is such a network useful for
  anything?
mastodon: 'https://mathstodon.xyz/@janmr/111623015185013040'
redirect: /blog/2023/12/neural-networks-10-linear-regression/
---
Looking at the [basic model for a neural network](/blog/2023/01/neural-networks-02-the-model),
it is natural to consider: What is the simplest possible neural network?
And is such a network useful for anything?

If we have a single layer ($L=1$), only one node in the output layer ($n^1=1$)
and no activation function ($g^1$ is the identity function), then we have
a very simple neural network.
Obviously, having only one input node ($n^0=1$) will be the simplest,
but we will initially consider any number of input nodes $n^0 \geq 1$.

<figure>
  <img src="/media/nn/neural-network-linreg.svg" class="img-responsive" alt="Linear regression as a neural network">
</figure>

With this structure and input to the network given by $x_1, x_2, \ldots, x_{n^0},$
we can compute the output $z$ by

$$
z = \sum_{j=1}^{n^0} w_j x_j + b.
$$

(Here we have included a bias $b$, as this was also included in the general model.)

So the output of the network is a *linear* combination of the input values (and the constant $1$).
Furthermore, as seen from the post on the
[optimization problem](/blog/2023/01/neural-networks-04-the-optimization-problem/),
the error function is a least squares error function.

This means that the simple network described above is *equivalent* to
linear regression (with a least squares error function, as is the most common).

This means that
- a single input node $n^0=1$ and no bias corresponds to [no-intercept simple linear regression](/blog/2023/12/no-intercept-simple-linear-regression/),
- a single input node $n^0=1$ and a bias corresponds to [simple linear regression](/blog/2023/12/simple-linear-regression/),
- any number of input nodes $n^0 \geq 1$ (with or without bias) corresponds to (general) [linear regression](/blog/2023/05/linear-regression-basics/).
