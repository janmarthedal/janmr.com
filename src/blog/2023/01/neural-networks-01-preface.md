---
title: Neural Networks - Preface
date: '2023-01-14'
layout: post
tags:
  - post
  - neural network
categories:
  - machine learning
excerpt: >-
  We introduce a new blog series on Neural Networks
---
Neural Networks, or more correctly Artificial Neural Networks, were originally inspired by
biological neural networks (animal brains).
This blog series will be based on a simple, but powerful, model of a neural network.

In a classical paper on back-propagation from 1986 (we'll get back to that), the authors write
"The learning procedure, in its current form, is not a plausible model of learning in brains."
They seem almost apologetic that the model does not mimic brains better.

The model's similarity to brains, or lack thereof, will not be of importance to us.
The model is very powerful in its own right.

In essense, a neural network is simply a mathematical function and we will look at them as such.
We will, from first principles, build the theory of neural networks.
We will then show how to turn the theory into code without the use of any Machine Learning framework
(we will use [Numpy](https://numpy.org/) for efficient numerical linear algebra).

<figure>
  <img src="/media/nn/neural-network.svg" class="img-responsive" alt="Neural Network">
</figure>

Each post will be centered around a specific topic:

- [The Model](/blog/2023/01/neural-networks-02-the-model)
- [Evaluating Multiple Inputs](/blog/2023/01/neural-networks-03-multiple-inputs)
- [The Optimization Problem](/blog/2023/01/neural-networks-04-the-optimization-problem)
- [Gradient Descent](/blog/2023/01/neural-networks-05-gradient-descent)
- [Back-propagation Derivation](/blog/2023/01/neural-networks-06-back-propagation-derivation)
- [Back-propagation Matrix-style](/blog/2023/01/neural-networks-07-back-propagation-matrix-style)
- Activation Functions
- [Implementation](/blog/2023/01/neural-networks-09-implementation)
