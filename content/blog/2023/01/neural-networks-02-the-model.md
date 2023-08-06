---
title: Neural Networks - The Model
date: '2023-01-15'
layout: post
type: post
tags:
  - neural-network
categories:
  - machine-learning
excerpt: >-
  We define the neural network that we will be exploring in the following posts.
---
A neural network has a specific structure given by
1. the number of layers $L$,
2. the number of nodes in each layer $n^l$, $l=0,1,\ldots,L$,
3. an activation function for each layer $g^l$, $l=1,2,\ldots,L$,
4. weights $W^l_{ij}$ and biases $b^l_i$, $l=1,2,\ldots,L$, associated with each link going from a node in one layer to a node in the next.

The number of layers, number of nodes in each layer and the activation functions will be *fixed*.
The weights and biases, however, are initially unknown and finding their values is the goal of *training* the network.
We'll get back to that.

There can be any number of layers, $L \geq 1$.
There are actually $L+1$ layers: The *input layer* (layer 0), the *output layer* (layer $L$) and $L-1$ *hidden layers*.

Each layer can have any number of nodes, $n^l \geq 1$.
The number of *input nodes* will be denoted by $n^0$ and the number of *output nodes* by $n^L$.

The following figure is an example network with $L=3$ and $(n^0,n^1,n^2,n^3)=(3,5,4,2)$:

<figure>
  <img src="/media/nn/neural-network-vars.svg" class="img-responsive" alt="Neural Network">
</figure>

Each activation function can, for now, be any real function, $g^l \in \mathbb{R} \mapsto \mathbb{R}$.
We will see later that certain properties are necessary, and others diserable.

The input to the neural network will be a vector/tuple
$\textbf{a}^0 = (a^0_1, a^0_2, \ldots, a^0_{n^0})$.

The weights $W^l_{ij}$ map a vector $\textbf{a}^{l-1}$ in layer $l-1$ to a vector $\textbf{z}^l$ in layer $l$:
$$
z^l_i = \sum_{j=1}^{n^{l-1}} W^l_{ij} a^{l-1}_j + b^l_i,
$$
$i=1,\dots,n^l$, $l=1,\ldots,L$.
Note how $W^l_{ij}$ is the weight for unit $j$ in layer $l-1$ to unit $i$ in layer $l$

For each layer $l$, the activation function $g^l$ transforms $\textbf{z}^l$ to $\textbf{a}^l$:
$$
a^l_i = g^l(z^l_i),
$$
$i=1,\ldots,n^l$, $l=1,\ldots,L$.

By iteratively applying the two formulas above for $l=1,2,\ldots,L$, we can compute
$$
\textbf{a}^0, \textbf{z}^1, \textbf{a}^1, \textbf{z}^2, \textbf{a}^2, \ldots, \textbf{z}^L, \textbf{a}^L,
$$
and $\textbf{a}^L$ is the output of the network.

We have now defined a function $N: \mathbb{R}^{n^0} \mapsto \mathbb{R}^{n^L}$ that represents the
neural network and whose input and output is related by
$$
N(\textbf{a}^0) = \textbf{a}^L.
$$

Note that we have here described a *fully connected* network:
Each node in one layer is connected to each node in the next layer.
It does not have to be fully connected, some of the weights can be absent or, equivalently, be fixed to zero.
Similarly, the biases can also be left out.

In the next post, we will look at vectorizing the evaluation when we have
[multiple inputs](/blog/2023/01/neural-networks-03-multiple-inputs).
