---
title: Neural Networks - Implementation
date: '2023-01-22'
layout: post
tags:
  - neural-network
categories:
  - machine-learning
excerpt: How to implement a simple neural network in Python/NumPy.
_redirect: /blog/2023/01/neural-networks-09-implementation/
---
This post will describe how to implement a simple, trainable neural network in
[Python](https://www.python.org) using [NumPy](https://numpy.org).

The components needed have already been described in previous posts:
Evaluating the network, back-propagation and gradient descent.
We will look at each in turn.

**Evaluating the network**

We use the expressions from the
[Multiple Inputs post](/blog/2023/01/neural-networks-03-multiple-inputs).
We can simply loop over the layers and compute the $Z$'s and the $A$'s:

```python
for layer in self.layers:
    Z = np.dot(layer.W, A) + layer.b
    A = layer.g[0](Z)
```

Note that the activation function `g[0]` (and similarly for the derivative
`g[1]`) should be able to apply the activation function to each element of the input.

Note also that it is necessary to save the $Z$'s and the $A$'s for *each* layer,
as they will be referenced during back-propagation.

**Back-propagation**

Back-propagation can be performed using the expressions from the
[Back-propagation Matrix-style post](/blog/2023/01/neural-networks-07-back-propagation-matrix-style).
Some other things to note:
- Remember to loop through the layers in reverse.
- There is no need to save the $dA$'s and $dZ$'s for each layer and the variables
  can be overwritten as we move back through the layers.

First, we need to compute $dA$ where there is a special case for the output layer:

```python
if l == L:
    dA = (values[L].A - Y) / m
else:
    dA = np.dot(self.layers[l].W.T, dZ)
```

Here, $dZ$ will be from the previous iteration (and, therefore, from layer $l+1$).
(Note that `self.layers[l]` corresponds to layer $l+1$, since the `self.layers` array
is shifted by one&mdash;layer 0 is not needed in the array).

The $dZ$ matrix is updated as

```python
dZ = dA * self.layers[l - 1].g[1](values[l].Z)
```

Some things to note here: `*` does
[element-wise multiplication](https://numpy.org/doc/stable/reference/generated/numpy.multiply.html),
`g[1]` is the first derivative of the activation function
for layer $l$ and `values[l].Z` is $Z^l$ from the evaluation of the network.

Now we can compute

```python
dW = np.dot(dZ, values[l - 1].A.T)
db = np.sum(dZ, axis=1, keepdims=True)
```

The expression for `db` is just an efficient way of multiplying a matrix by a
column vector of 1's.

**Gradient Descent**

Left to do is a training algorithm using
[Gradient Descent](/blog/2023/01/neural-networks-05-gradient-descent).
The following snippet assumes that the network's weights and biases have been
initialized with (pseudo-)random numbers and performs a fixed number of
steps:

```python
for epoch in range(epochs):
    values = self.evaluate(Xs)
    dWs, dbs = self.compute_gradient(values, Ys)
    for layer, dW, db in zip(self.layers, dWs, dbs):
        layer.W -= learning_rate * dW
        layer.b -= learning_rate * db
```

**Code**

A full implementation
[is available](https://github.com/janmarthedal/machine-learning-from-the-ground-up/blob/blog/implementation/simple_neural_network.py).
The code includes a small example of training a network (single input unit, a 20-unit hidden layer with
a sigmoid activation function and a single output unit) to fit a part of a sine wave:

<figure>
  <img src="/media/nn/neural-network-sin-test.svg" class="img-responsive" alt="Neural Network">
</figure>
