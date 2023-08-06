---
title: Fractions and Circles
date: '2010-02-06'
layout: post
type: post
tags:
  - stern-brocot-tree
  - fractions
categories:
  - mathematics
excerpt: >-
  Fractions produced by mediants have some very interesting properties. We saw
  some of them in connection with the Stern-Brocot tree. This articles explores
  a more curious property, relating fractions to circles in the plane. It was
  discovered in 1938 by Lester R. Ford and is also mentioned in Conway and Guy's
  The Book of Numbers.
---
Fractions produced by mediants have some very interesting properties. We saw some of them in connection with the [Stern-Brocot tree](/blog/2009/12/the-stern-brocot-tree-of-fractions). This articles explores a more curious property, relating fractions to circles in the plane. It was [discovered](http://www.jstor.org/pss/2302799) in 1938 by [Lester R. Ford](http://en.wikipedia.org/wiki/Lester_R._Ford) and is also mentioned in Conway and Guy's [The Book of Numbers](/refs/conway-guy).<span></span>

Let us consider a way to construct fractions. We always start out with the sequence

<div class="pull-right">(1)</div>

$$
\frac{0}{1}, \frac{1}{0}
$$

and then repeatedly obtain a new sequence from an existing one. Given a sequence, we pick two consequtive fractions and insert their mediant between them. Recall that the mediant of $\frac{m_1}{n_1}$ and $\frac{m_2}{n_2}$ is $\frac{m_1+m_2}{n_1+n_2}$. We will call sequences created in this manner *mediant sequences*.

So the first (and only) mediant sequence possible from the initial sequence (1) is

$$
\frac{0}{1}, \left<\frac{1}{1}\right>, \frac{1}{0}
$$

where the new fraction is surrounded by angle brackets. From this point on, we have multiple choices each time we produce a new mediant sequence. An example of the following sequences could be

$$
\frac{0}{1}, \left<\frac{1}{2}\right>, \frac{1}{1}, \frac{1}{0}
$$

$$
\frac{0}{1}, \frac{1}{2}, \frac{1}{1}, \left<\frac{2}{1}\right>, \frac{1}{0}
$$

$$
\frac{0}{1}, \left<\frac{1}{3}\right>, \frac{1}{2}, \frac{1}{1}, \frac{2}{1}, \frac{1}{0}
$$

An essential property, in regard to this article, is this: For all mediant sequences, any fraction $\frac{m_1}{n_1}$ followed by $\frac{m_2}{n_2}$ fulfills $n_1 m_2 - m_1 n_2 = 1$. This is easily shown by induction by considering the initial mediant sequence&nbsp;(1) and that if $n_1 m_2 - m_1 n_2 = 1$ for a subsequence

$$
\ldots, \frac{m_1}{n_1}, \frac{m_2}{n_2}, \ldots
$$

then it also holds after inserting the mediant

$$
\ldots, \frac{m_1}{n_1}, \frac{m_1+m_2}{n_1+n_2}, \frac{m_2}{n_2}, \ldots
$$

(two cases to check).

Note how this property implies that the fractions in any mediant sequence are ordered by size. But the most important use of this property will appear shortly.

We now do the following in a [Cartesian coordinate system](http://en.wikipedia.org/wiki/Cartesian_coordinate_system): For each fraction $\frac{m}{n}$ in a given mediant sequence, draw a circle centered at $\left(\frac{m}{n}, \frac{1}{2 n^2}\right)$ with radius $\frac{1}{2 n^2}$. An example can be seen in Figure&nbsp;1.

<figure>
  <img src="/media/ford1.svg" class="img-responsive" alt="Ford circles 1">
  <figcaption><strong>Figure 1</strong></figcaption>
</figure>

By construction, the x-axis is obviously a tangent to all such circles. Furthermore, two circles, corresponding to two fractions $\frac{m_1}{n_1}$ and $\frac{m_2}{n_2}$, touch at exactly one point if and only if $| n_1 m_2 - m_1 n_2 | = 1$. This is shown by an application of the [Pythagorean Theorem](http://en.wikipedia.org/wiki/Pythagorean_theorem):

$$
\begin{aligned} \left( \frac{m_2}{n_2} - \frac{m_1}{n_1} \right)^2 + \left( \frac{1}{2 n_2^2} - \frac{1}{2 n_1^2} \right)^2 &= \left( \frac{1}{2 n_2^2} + \frac{1}{2 n_1^2} \right)^2 \quad \Leftrightarrow \\ \left( \frac{n_1 m_2 - m_1 n_2}{n_1 n_2} \right)^2 &= \frac{1}{n_1^2 n_2^2} \quad \Leftrightarrow \\ | n_1 m_2 - m_1 n_2 | &= 1. \end{aligned}
$$

This is exactly the property that consequtive fractions in any mediant sequence fulfills.

Zooming into the dashed region in Figure&nbsp;1 leads to Figure&nbsp;2.

<figure>
  <img src="/media/ford2.svg" class="img-responsive" alt="Ford circles 2">
  <figcaption><strong>Figure 2</strong></figcaption>
</figure>

So given a mediant sequence, we can draw such circles for each fraction in the sequence, except for the final $\frac{1}{0}$ (which is just an auxillary element). The circles with diameter $1$ correspond to the seqeuence $\frac{0}{1}, \frac{1}{1}, \frac{2}{1}, \ldots$ and will all touch each other. See Figure&nbsp;1. Any circle with diameter less than $1$ will touch exactly two larger circles, namely the two from which it was created when considering their mediant sequence representatives. To be more specific, if we went from a mediant sequence

$$
\ldots, \frac{m_1}{n_1}, \frac{m_2}{n_2}, \ldots
$$

with $n_2 \neq 0$ to

$$
\ldots, \frac{m_1}{n_1}, \frac{m_1+m_2}{n_1+n_2}, \frac{m_2}{n_2}, \ldots,
$$

then the three circles corresponding to the fractions of this second subsequence will all touch, and the middle one will obviously be the smallest (has the largest denominator). See, e.g., the fractions $\frac{1}{2}$, $\frac{3}{5}$, $\frac{2}{3}$ in Figure&nbsp;2.

Zooming in once again we get Figure&nbsp;3.

<figure>
  <img src="/media/ford3.svg" class="img-responsive" alt="Ford circles 3">
  <figcaption><strong>Figure 3</strong></figcaption>
</figure>

Note the many [self-similarities](http://en.wikipedia.org/wiki/Self-similarity).
