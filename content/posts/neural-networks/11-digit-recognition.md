---
title: Neural Networks - Digit Recognition
date: '2023-12-22'
layout: page
tags:
  - neural-network
categories:
  - machine-learning
excerpt: >-
  This post will look at digit recognition using a neural network as described
  in earlier posts. We will use the MNIST dataset, which is a collection of
  70,000 imagesof handwritten digits. Each image is 28x28 pixels, and each pixel
  is represented by an integer value between 0 and 255. The dataset is split
  into 60,000 training images and 10,000 test images.
mastodon: 'https://mathstodon.xyz/@janmr/111624103090324970'
redirect: /blog/2023/12/neural-networks-11-digit-recognition/
---
This post will look at digit recognition using a neural network as described in
[earlier posts](/posts/neural-networks/02-the-model/).

We will use the [MNIST dataset](http://yann.lecun.com/exdb/mnist/),
which is a collection of 70,000 images of handwritten digits.
Each image is 28x28 pixels, and each pixel is represented by an integer value between 0 and 255.
The dataset is split into 60,000 training images and 10,000 test images.

Some of the images in the dataset are shown in Figure 1.

<figure>
  <img src="/media/nn/mnist-digits.svg" class="img-responsive w40" alt="An excerpt of the MNIST digits with labels">
  <figcaption><strong>Figure 1.</strong> An excerpt of the MNIST digits with labels.</figcaption>
</figure>

The structure of the neural network used in this post is as follows:

- The input layer has 784 nodes (one for each of the 28x28 pixels).
- A single hidden layer with 300 nodes.
- The output layer has 10 nodes (one for each possible digit).
- A sigmoid [activation function](/posts/neural-networks/08-activation-functions/) is used for the hidden layer.
- No activation function is used for the output layer.

When training the network, we use [one-hot encoding](https://en.wikipedia.org/wiki/One-hot)
of the digits for the output layer.
For instance, the digit 3 is represented by the vector $(0,0,0,1,0,0,0,0,0,0)$,
where the 1 is in the fourth position (using zero-based indexing).
When testing/evaluating the network, we use the index of the largest value in the output vector
as the predicted digit.

Following the implementation [described earlier](/posts/neural-networks/09-implementation/)
we can train the network using the training data.
A learning rate of $\alpha = 0.03$ was used, found by trial and error.
The code complementing this post [is available](https://github.com/janmarthedal/machine-learning-from-the-ground-up/tree/blog/digit-recognition).

Two key quantities were monitored during the training:
The cost function/error related to the *training data* and the accuracy related to the *test data*.
The accuracy was computed as the number of correctly predicted digits divided by the
total number of test digits.

A plot of these quantities as a function of the number of iterations is shown in Figure 2

<figure>
  <img src="/media/nn/mnist-iterations.svg" class="img-responsive w40" alt="Error and accuracy as a function of the number of iterations">
  <figcaption><strong>Figure 2.</strong> Error and accuracy as a function of the number of iterations.</figcaption>
</figure>

Note how the error decreases with each iteration, as expected
(if this was not the case, the learning rate was probably too large).
The accurary steadily increases, reaching 90% after 6080 iterations
and 91.5% after 9880 iterations
(if the accuracy had started to decrease it could have been a sign of overfitting).

An accuracy of 91.5% is not bad, but it is not great either.
It does show, however, that this basic use of a neural network can be used for digit recognition.
The paper [Gradient-Based Learning Applied to Document Recognition](/refs/lecun-98) describes several
other methods that have much better accuracy, some reaching 99.7%, by using more advanced techniques.
