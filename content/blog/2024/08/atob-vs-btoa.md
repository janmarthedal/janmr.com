---
title: a^b versus b^a
date: '2024-08-04'
layout: post
tags:
  - nerd-sniping
  - inequality
categories:
  - mathematics
excerpt: >-
  What quantity
# mastodon: https://mathstodon.xyz/@janmr/112398139863794212
---
What quantity is larger, $a^b$ or $b^a$, for positive $a$, $b$?

$$
\begin{aligned}
a^b &< b^a \quad \Leftrightarrow \\
e^{b \ln a} &< e^{a \ln b} \quad \Leftrightarrow \\
b \ln a &< a \ln b \quad \Leftrightarrow \\
\frac{\ln a}{a} &< \frac{\ln b}{b}
\end{aligned}
$$

Let $s(x) = \frac{\ln x}{x}$ for $x > 0$.
We see that $s$ is continuous and

$$
\begin{aligned}
s(x) &< 0 \text{for $x < 1$}, \\
s(x) &= 0 \text{for $x = 1$}, \\
s(x) &> 0 \text{for $x > 1$},
\end{aligned}
$$

$$
s'(x) = \frac{\frac{1}{x} \cdot x - \ln x \cdot 1}{x^2} = \frac{1 - \ln x}{x^2}
$$

<figure>
  <img src="/media/lnx-over-x.svg" class="img-responsive" alt="Plot of s(x)=(ln x)/x">
  <figcaption><strong>Figure 1.</strong> A plot of s(x) = (ln x)/x.</figcaption>
</figure>

We see that

$$
\begin{aligned}
s'(x) &> 0 \text{for $x < e$}, \\
s'(x) &= 0 \text{for $x = e$}, \\
s'(x) &< 0 \text{for $x > e$},
\end{aligned}
$$

