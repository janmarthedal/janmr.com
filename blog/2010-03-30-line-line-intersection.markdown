---
title: Line-line Intersection in the Plane
date: '2010-03-30'
layout: layouts/post.njk
tags:
  - geometry
  - lines
categories:
  - mathematics
excerpt: >-
  How do you calculate the point where two lines in the plane intersect? It is
  not very hard to do, but the formula can look quite complicated, depending on
  how you write it up. This article is a reminder that it can be expressed in a
  simple manner.
---
How do you calculate the point where two lines in the plane intersect? It is not very hard to do, but the formula can look [quite complicated](http://en.wikipedia.org/w/index.php?title=Line-line_intersection&oldid=330824670), depending on how you write it up. This article is a reminder that it can be expressed in a simple manner.

We start out by not restricting ourselves to the plane, but any [vector space](http://en.wikipedia.org/wiki/Vector_space) with an [inner product](http://en.wikipedia.org/wiki/Inner_product) $\langle \cdot, \cdot \rangle$. Let two lines be represented as

<div class="pull-right">(1)</div>

$$
\text{p} + s \text{v}, \quad s \in \mathbb{R}
$$

and

$$
\text{q} + t \text{w}, \quad t \in \mathbb{R}
$$

where $\text{p}$, $\text{q}$, $\text{v}$, and $\text{w}$ are vectors. We assume that both $\text{v}$ and $\text{w}$ are non-null. See Figure&nbsp;1.

<figure>
  <img src="/media/lines.svg" class="img-responsive" alt="Line-line intersection">
  <figcaption><strong>Figure 1.</strong> Line-line intersection</figcaption>
</figure>

We look for values of $s$ and $t$ such that

<div class="pull-right">(2)</div>

$$
\text{p} + s \text{v} = \text{q} + t \text{w}.
$$

Let $\hat{\text{w}} \neq 0$ be a vector perpendicular to $\text{w}$, $\langle \text{w}, \hat{\text{w}} \rangle = 0$. We get

<div class="pull-right">(3)</div>

$$
s \langle \text{v}, \hat{\text{w}} \rangle = \langle \text{q} - \text{p}, \hat{\text{w}} \rangle
$$

Now if $\langle \text{v}, \hat{\text{w}} \rangle = 0$ there are two possibilities: If $\langle \text{q} - \text{p}, \hat{\text{w}} \rangle = 0$ there are infinitely many solutions, i.e., the lines overlap, but if $\langle \text{q} - \text{p}, \hat{\text{w}} \rangle \neq 0$ there are no solutions, i.e., the lines are parallel and do not intersect.

Assume then $\langle \text{v}, \hat{\text{w}} \rangle \neq 0$. We get

$$
s = \frac{\langle \text{q} - \text{p}, \hat{\text{w}} \rangle}{\langle \text{v}, \hat{\text{w}} \rangle},
$$

and thus, after inserting into&nbsp;(1), the point of intersection is

$$
\text{p} + \frac{\langle \text{q} - \text{p}, \hat{\text{w}} \rangle}{\langle \text{v}, \hat{\text{w}} \rangle} \text{v}.
$$

### The Plane is Special

The derivation above is actually a little careless. If&nbsp;(2) is to hold for some $s$ and $t$, then&nbsp;(3) must also hold. Turning the implication the other way, which we would like to, is less straightforward.

Assume that&nbsp;(3) holds for some value of&nbsp;$s$,

<div class="pull-right">(4)</div>

$$
\langle s \text{v} + \text{p} - \text{q}, \hat{\text{w}} \rangle = 0.
$$

What does this mean? It means that the vectors $s \text{v} + \text{p} - \text{q}$ and $\hat{\text{w}}$ are perpendicular to each other, and if we are in two dimensions/the plane we must have $s \text{v} + \text{p} - \text{q} = t \text{w}$ for some value of $t$. This is&nbsp;(2) and we are done.

Does this work in higher dimensions? Generally, no. Consider, e.g., three dimensions and Equation&nbsp;(4). What can we derive of it now? We have that

$$
s \text{v} + \text{p} - \text{q} = \alpha \text{w}_1 + \beta \text{w}_2
$$

for some values of $\alpha$ and $\beta$ and where $\langle \text{w}_1, \hat{\text{w}} \rangle = \langle \text{w}_2, \hat{\text{w}} \rangle = 0$. And $\alpha \text{w}_1 + \beta \text{w}_2 = t \text{w}$ does not necessarily hold for any $t$, so&nbsp;(2) does generally not follow in three dimensions or more.

### Summary Using Coordinates

Let us consider the usual [two-dimensional Euclidean](http://en.wikipedia.org/wiki/Euclidean_geometry) [space](http://en.wikipedia.org/wiki/Euclidean_space) and [Cartesian coordinates](http://en.wikipedia.org/wiki/Cartesian_coordinate_system). We set

$$
\text{p} = (p_1,p_2), \quad \text{q} = (q_1,q_2), \quad \text{v} = (v_1,v_2), \quad \text{w} = (w_1,w_2),
$$

and use the inner product

$$
\langle (a_1,a_2), (b_1,b_2) \rangle = a_1 b_1 + a_2 b_2.
$$

Rotating a vector $\text{w} = (w_1,w_2)$ counterclockwise by a right angle is easily done with $\hat{\text{w}} = (-w_2, w_1)$. It is easily checked that $\langle \text{w}, \hat{\text{w}} \rangle = 0$.

Recall that we are interested in knowing whether the two lines

$$
(x,y) = (p_1,p_2) + s (v_1,v_2), \quad s \in \mathbb{R}
$$

and

$$
(x,y) = (q_1,q_2) + t (w_1,w_2), \quad t \in \mathbb{R}
$$

intersect.

Setting $\alpha = w_1 v_2 - w_2 v_1$ and $\beta = w_1 (q_2-p_2) - w_2 (q_1-p_1)$, we have

*   $\alpha = 0$, $\beta = 0$: The two lines overlap.
*   $\alpha = 0$, $\beta \neq 0$: The lines are parallel but do not intersect.
*   $\alpha \neq 0$: The lines meet at a single point, $(p_1 + \frac{\beta}{\alpha} v_1, p_2 + \frac{\beta}{\alpha} v_2)$.
