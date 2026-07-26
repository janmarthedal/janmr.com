---
title: Introduction to Neural Networks
date: 2023-01-14T12:00Z
layout: post
tags:
  - neuralnetworks
  - machinelearning
  - numpy
og:
  description: Introducing a series of posts on the basics of Neural Networks
  image: /media/og/neural-network-preface.png
redirect: /posts/neural-networks/01-preface/
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

- [The Model](/posts/neural-networks/model/)
- [Evaluating Multiple Inputs](/posts/neural-networks/multiple-inputs/)
- [The Optimization Problem](/posts/neural-networks/the-optimization-problem/)
- [Gradient Descent](/posts/neural-networks/gradient-descent/)
- [Back-propagation Derivation](/posts/neural-networks/back-propagation-derivation/)
- [Back-propagation Matrix-style](/posts/neural-networks/back-propagation-matrix-style/)
- [Activation Functions](/posts/neural-networks/activation-functions/)
- [Implementation](/posts/neural-networks/implementation/)
- [Linear Regression](/posts/neural-networks/linear-regression/)
- [Digit Recognition](/posts/neural-networks/digit-recognition/)
