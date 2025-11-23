---
title: a to the bth power versus b to the ath power
date: '2024-08-04'
layout: post
tags:
  - nerd-sniping
  - inequality
categories:
  - mathematics
excerpt: >-
  Which quantity is larger, a^b or b^a, for positive numbers a and b? As it
  turns out, sometimes a^b is the larger number, other times it is b^a and it
  may even be the case that the two quantities are equal, even though a != b.
mastodon: 'https://mathstodon.xyz/@janmr/112909352648333051'
_redirect: /blog/2024/08/atob-vs-btoa/
---
Which quantity is larger, $a^b$ or $b^a$, for positive numbers $a$ and $b$?
As it turns out, sometimes $a^b$ is the larger number, other times it is
$b^a$, and it may even be the case that the two quantities are equal,
even though $a \neq b$.

Let us start by rewriting the inequality:

$$
\begin{aligned}
a^b &< b^a \quad &\Leftrightarrow \\
e^{b \ln a} &< e^{a \ln b} \quad &\Leftrightarrow \\
b \ln a &< a \ln b \quad &\Leftrightarrow \\[6pt]
\frac{\ln a}{a} &< \frac{\ln b}{b} \; .
\end{aligned}
$$

(Here we use the fact that $x \mapsto e^x$ is a (strictly) increasing
function and that $a$ and $b$ are positive.)

The variables have now been separated and let us introduce
$s(x) = \frac{\ln x}{x}$ for $x > 0$.
Note how $s(a) < s(b) \Leftrightarrow a^b < b^a$ for all $a, b > 0$
(and similarly for the relations $=$ and $>$).

We see that $s$ is continuous on the positive real numbers,
that $s(1)=0$,
that $s(x)<0$ for $0<x<1$ and
that $s(x)>0$ for $x>1$.
This gives us our first, partial, result:

$$
0 < a < 1 \leq b \quad \Leftrightarrow \quad
s(a) < s(b) \quad \Leftrightarrow \quad
a^b < b^a \; .
$$

The function $s$ is, in fact, differentiable on the positive reals
and the derivative can give us all the information we need:

$$
s'(x) = \frac{\frac{1}{x} \cdot x - \ln x \cdot 1}{x^2} = \frac{1 - \ln x}{x^2}
\; .
$$

We see that $s'(x)>0$ for $0 < x < e$, $s'(e)=0$, and
$s'(x)<0$ for $x > e$.
See a plot of $x \mapsto s(x)$ in Figure&nbsp;1.

<figure>
  <img src="/media/lnx-over-x.svg" class="img-responsive" alt="Plot of s(x)=(ln x)/x">
  <figcaption><strong>Figure 1.</strong> A plot of s(x) = (ln x)/x.</figcaption>
</figure>

From the information of the derivative of $s$, we have the following:

$$
\begin{aligned}
0 < a < b \leq e \quad &\Leftrightarrow \quad
s(a) < s(b) \quad &\Leftrightarrow \quad
a^b < b^a \; , \\
e \leq a < b \quad &\Leftrightarrow \quad
s(a) > s(b) \quad &\Leftrightarrow \quad
a^b > b^a \; .
\end{aligned}
$$

To summarize, we now have the following relations, provided that $a < b$:

|                | $0 < b \leq 1$ | $1 \leq b < e$ | $e < b$     |
| -------------- | -------------- | -------------- | ----------- |
| $0 < a \leq 1$ | $a^b < b^a$    | $a^b < b^a$    | $a^b < b^a$ |
| $1 \leq a < e$ | -              | $a^b < b^a$    | ?           |
| $e < a$        | -              | -              | $a^b > b^a$ |

The only unresolved case is when $1 \leq a < e < b$.
In fact, given the fact that $s(x) \to 0$ as $x \to \infty$,
we have that $s(a) = s(b)$ has infinitely many solutions with
$1 < a < e$ and $b > e$.
Or, equivalently:

$$
a^b = b^a \text{ has infinitely many solutions for $1 < a < e$ and $b > e$.}
$$

Let us conclude by considering integer $a$ and $b$.

The case $a=1$ is trivial ($1^b < b^1$ for all $b > 1$).

The case $a=2$ is especially interesting because 2 is the only integer
between 1 and $e$.
This means, as argued above, that there is a nontrivial solution to
$a^b=b^a$ and, in fact, $2^4=4^2$.
So

$$
\begin{aligned}
2^3 &< 3^2, \\
2^4 &= 4^2, \\
2^b &> b^2 \quad \text{for all integer $b \geq 3$.}
\end{aligned}
$$

When $a \geq 3$ it is more simple as we are in the $e < a < b$ category.
We have

$$
a^b > b^a \quad \text{for integer $a \geq 3$ and integer $b > a$.}
$$

