---
title: Neural Networks - Digit Recognition
date: '2023-12-22'
layout: post
draft: true
tags:
  - neural-network
categories:
  - machine-learning
excerpt: >-
  TODO
---
This post will look at digit recognition using a neural network as described in
[earlier posts](/blog/2023/01/neural-networks-02-the-model/).

We will use the [MNIST dataset](http://yann.lecun.com/exdb/mnist/),
which is a collection of 70,000 images of handwritten digits.
Each image is 28x28 pixels, and each pixel is represented by an integer value between 0 and 255.
The dataset is split into 60,000 training images and 10,000 test images.

Some of the images in the dataset are shown in Figure 1.

<figure>
  <img src="/media/nn/mnist-digits.svg" class="img-responsive" alt="An excerpt of the MNIST digits with labels">
  <figcaption><strong>Figure 1.</strong> An excerpt of the MNIST digits with labels.</figcaption>
</figure>

The structure of the neural network is as follows:
- The input layer has 784 nodes (one for each of the 28x28 pixels).
- A single hidden layer with 300 nodes.
- The output layer has 10 nodes (one for each possible digit).
- A sigmoid [activation function](/blog/2023/01/neural-networks-08-activation-functions/) is used for the hidden layer.
- No activation function is used for the output layer.

Note the interpretation of the output layer.
When training the network, we use "[one-hot encoding](https://en.wikipedia.org/wiki/One-hot)"
of the digits.
For instance, the digit 3 is represented by the vector $(0,0,0,1,0,0,0,0,0,0)$,
where the 1 is in the fourth position (using zero-based indexing).
When testing/evaluating the network, we use the index of the largest value in the output vector
as the predicted digit.

Following the implementation [described earlier](/blog/2023/01/neural-networks-09-implementation/)
we can train the network using the training data.
A learning rate of $\alpha = 0.03$ was used, found by trial and error.

Two key quantities were monitored during the training:
The cost function/error related to the *training data* and the accuracy related to the *test data*.

A plot of these quantities as a function of the number of iterations is shown in Figure 2

<figure>
  <img src="/media/nn/mnist-iterations.svg" class="img-responsive" alt="Error and accuracy as a function of the number of iterations">
  <figcaption><strong>Figure 2.</strong> Error and accuracy as a function of the number of iterations.</figcaption>
</figure>

Note how the error decreases with each iteration, as expected.
If this was not the case, the learning rate was probably too large.
The accurary also increases, reaching 90% after 6080 iterations
and 91.5% after 9880 iterations.
If the accuracy had started to decrease it would have been a sign of overfitting.
That did not happen here.
