---
title: Neural Networks - Gradient Descent
date: '2023-01-18'
layout: post
type: post
tags:
  - neural-network
categories:
  - machine-learning
excerpt: >-
  We describe a method for finding a local minimum for a function of several real variables, Gradient Descent.
---
Let us forget the specifics of neural networks for a moment and consider
some function $G: \mathbb{R}^n \mapsto \mathbb{R}$.

Now let $G$ be [differentiable](https://en.wikipedia.org/wiki/Differentiable_function)
at some point $\textbf{x} = (x_1,x_2,\ldots,x_n)$. The
[gradient](https://en.wikipedia.org/wiki/Gradient) at this point is
$$
\nabla G(\textbf{x}) = \left(
  \frac{\partial G}{\partial x_1}(\textbf{x}),
  \frac{\partial G}{\partial x_2}(\textbf{x}), \ldots,
  \frac{\partial G}{\partial x_n}(\textbf{x})
\right).
$$

As the title of this post suggests, the gradients are important.
This is due to the fact that the gradient is the direction in which the function *increases the most*.
Conversely, the negative gradient is the direction in which the function *decreases this most*.
So if $G$ is differentiable in a
[neighborhood](https://en.wikipedia.org/wiki/Neighbourhood_(mathematics)#In_a_metric_space)
of some point $\textbf{x}^n$, then a $\gamma_n > 0$ exists such that
$$
G(\textbf{x}^{n+1}) \leq G(\textbf{x}^n)
\quad \text{for} \quad
\textbf{x}^{n+1} = \textbf{x}^n - \gamma_n \nabla G(\textbf{x}^n).
$$

That is the general idea of the [Gradient Descent](https://en.wikipedia.org/wiki/Gradient_descent) method
(also called Steepest Descent): Iteratively find $\textbf{x}^0$, $\textbf{x}^1$, $\textbf{x}^2$, $\ldots$
and then, hopefully, arrive at a point $\textbf{x}^n$ where $\nabla G(\textbf{x}^n) = \textbf{0}$
(or close to, for practical purposes). When the gradient is zero we have a
[stationary point](https://en.wikipedia.org/wiki/Stationary_point) and, hopefully, a
[local minimum](https://en.wikipedia.org/wiki/Maxima_and_minima).

The previous paragraph says "hopefully" twice and that is because the Gradient Descent algorithm
may not always converge to a local minimum.

If $G$ has certain nice properties ($G$ [convex](https://en.wikipedia.org/wiki/Convex_function)
and $\nabla G$ [Lipschitz](https://en.wikipedia.org/wiki/Lipschitz_continuity)) it can be proved
that the method converges to the global minimum (also requires that the steps $\gamma_n$ are
[chosen carefully](https://en.wikipedia.org/wiki/Gradient_descent)).

If $G$ is defined and
[continuously differentiable](https://en.wikipedia.org/wiki/Smoothness#Multivariate_differentiability_classes)
on a closed set $S$, then the Gradient Descent method will either run into the boundary of $S$
or converge to a stationary point. This was shown by [Haskell B. Curry](https://en.wikipedia.org/wiki/Haskell_Curry)
(yes, *that* Haskell Curry, both [currying](https://en.wikipedia.org/wiki/Currying)
and [Haskell](https://www.haskell.org/) are named after him) in the paper
[The method of steepest descent for non-linear minimization problems](/refs/curry44).

That was some theory, but what happens when we apply the Gradient Descent method to some
neural network? Firstly, we do have one requirement if we plan to use Gradient Descent for a
neural network: The activation functions must be differentiable, which, in turn, will make the
[error function](/blog/2023/01/neural-networks-04-the-optimization-problem) $E$
differentiable.

In general, a neural network is not convex and may contain several local minima. There is
also the question of choosing the step size $\gamma_n$ at each iteration. What to choose?
In practise, a global *learning rate* $\gamma$ is often chosen for every step. And that may
lead to divergence because it may be too large. Finally, even though $E \geq 0$, a minimum
may not even *exist* (just think of the function $x \mapsto e^{-x}$), which will also
lead to divergence.

There is also the question of how to compute the gradient of the error function. But,
fortunately, this is surprisingly straightforward and is exactly what the
[next post on back-propagation](/blog/2023/01/neural-networks-06-back-propagation-derivation) deals with.
