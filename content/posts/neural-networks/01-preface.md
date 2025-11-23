---
title: Neural Networks - Preface
date: '2023-01-14'
layout: new-page
tags:
  - neural-network
categories:
  - machine-learning
excerpt: Kicking off a new blog series on Neural Networks
mastodon: 'https://mathstodon.xyz/@janmr/109726377459697082'
redirect: /blog/2023/01/neural-networks-01-preface/
---
Neural Networks, or more correctly Artificial Neural Networks, have turned out to be
a very versatile tool in the world of Machine Learning, Artificial Intelligence and
Data Science. They were originally inspired by biological neural networks (animal brains),
but have shown to be powerful in their own right.

[Many](https://www.tensorflow.org)
[frameworks](https://pytorch.org)
[exist](https://scikit-learn.org)
that with relative ease allow users to create complex models
within a diverse field of applications.

This blog series will go back and look at the fundamentals of neural networks.
In essense, a neural network is simply a mathematical function and we will look at them as such.
We will, from first principles, build the theory of neural networks.
We will then look at how to turn the theory into code
(using [Numpy](https://numpy.org/) for efficient numerical linear algebra).

A disclaimer: I am not a Machine Learning expert, I have a background in applied mathematics
and scientific computing. Everything should be correct (I hope! If not, please
contact me and I will correct it), but some terminology or approaches may be off
compared to what is usually done (again, let me know).

If you are into online courses then I highly recommend
[Andrew Ng](https://www.andrewng.org/about/)'s course
[Neural Networks and Deep Learning](https://www.coursera.org/learn/neural-networks-deep-learning),
which also inspired some the approaches in this blog series.

<figure>
  <img src="/media/nn/neural-network.svg" class="img-responsive w30" alt="Neural Network">
</figure>

Each post will be centered around a specific topic:

- [The Model](/posts/neural-networks/02-the-model)
- [Evaluating Multiple Inputs](/posts/neural-networks/03-multiple-inputs)
- [The Optimization Problem](/posts/neural-networks/04-the-optimization-problem)
- [Gradient Descent](/posts/neural-networks/05-gradient-descent)
- [Back-propagation Derivation](/posts/neural-networks/06-back-propagation-derivation)
- [Back-propagation Matrix-style](/posts/neural-networks/07-back-propagation-matrix-style)
- [Activation Functions](/posts/neural-networks/08-activation-functions)
- [Implementation](/posts/neural-networks/09-implementation)
- [Linear Regression](/posts/neural-networks/10-linear-regression)
- [Digit Recognition](/posts/neural-networks/11-digit-recognition)
