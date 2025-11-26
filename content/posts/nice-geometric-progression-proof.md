---
title: Nice Proof of a Geometric Progression Sum
date: '2008-10-08'
layout: page
tags:
  - proof
  - visualization
  - infinite-series
categories:
  - mathematics
excerpt: "Consider the geometric series, s_r = sum_{k=0}^infty r^k = 1 + r + r^2 + r^3 + ..., for\_0 < r < 1. The goal is to find a closed-form expression for s_r. [...]"
mastodon: 'https://mathstodon.xyz/@janmr/115614464549815248'
redirect: /blog/2008/10/nice-geometric-progression-proof/
---
Consider the geometric series,

$$
s_r = \sum_{k=0}^\infty r^k = 1 + r + r^2 + r^3 + \ldots,
$$

for $0 < r < 1$. The goal is to find a [closed-form expression](http://en.wikipedia.org/wiki/Closed-form_expression) for $s_r$.

<figure>
  <img src="/media/geoprog.svg" alt="Visual proof of a geometric progression sum" class="img-responsive">
</figure>

Consider now the figure shown. Given that $|AB|=|AD|=1$ and $|DE|=r$, the rest of the figure can be constructed (the lines AC and BF are parallel and the rest of the lines, with the exception of BC, are perpendicular to AC). It is important to note that the four-sided figures ABED, DEHG, GHKJ, and so on, are all [similar](http://en.wikipedia.org/wiki/Similarity_(geometry)) to each other, and we see that the length $|AC|$ is exactly the quantity we are looking for.

Note now how the triangle ABC is similar to the triangle FEB, leading to

$$
\frac{|AC|}{|AB|} = \frac{|BF|}{|FE|}.
$$

If we then evaluate each side of the equality-sign, we get

$$
1 + r + r^2 + r^3 + \ldots = \frac{1}{1-r}.
$$

Quite elegant, I think.

The figure also shows that the sum converges for all $0 < r < 1$ since the proof described above can be carried out whenever BC crosses AC the "right" way. Note, however, that the sum does not converge *only* for these values of $r$ &ndash; in fact, it converges whenever $|r| < 1$ for complex $r$ (easily seen by considering the first $N$ terms of the sum and then letting $N \rightarrow \infty$).

(I don't know who to attribute this proof to, unfortunately. I saw it in a magazine for elementary school teachers.)

*Update 2009-08-22: Apparently, the proof was discovered by Benjamin G. Klein and Irl C. Bivens, and it appears on page 120 of
[Proofs without Words: Exercises in Visual Thinking](/refs/pww1/) by Roger B. Nelson (thanks for the reference, David Radcliffe).*
