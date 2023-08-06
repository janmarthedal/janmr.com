---
title: Arithmetic by Geometry
date: '2010-04-24'
layout: post
tags:
  - arithmetic
  - geometry
  - visualization
categories:
  - mathematics
excerpt: >-
  Today real numbers are most often represented by applying (elementary)
  functions to (decimal) integers. Throughout history, though, arithmetic and
  propositions involving (positive) real numbers were often considered from a
  purely geometrical point of view. Real numbers were identified by the length
  of some line segment and, e.g., the product of two numbers was identified by
  the area of a rectangle with side-lengths equal to the two numbers. This made
  sense from a physical/applied point of view, but it had certain shortcomings.
---

Today [real numbers](http://en.wikipedia.org/wiki/Real_number) are most often represented by applying ([elementary](http://en.wikipedia.org/wiki/Elementary_function_(differential_algebra))) [functions](http://en.wikipedia.org/wiki/Function_(mathematics)) to ([decimal](http://en.wikipedia.org/wiki/Decimal)) [integers](http://en.wikipedia.org/wiki/Integer). Throughout history, though, arithmetic and propositions involving (positive) real numbers were often considered from a purely geometrical point of view. Real numbers were identified by the length of some line segment and, e.g., the product of two numbers was identified by the area of a rectangle with side-lengths equal to the two numbers. This made sense from a physical/applied point of view, but it had certain shortcomings.

According to [Hawking](http://www.hawking.org.uk)&#8216;s [God Created the Integers](/refs/hawking), this was changed by [Ren&eacute; Descartes](http://en.wikipedia.org/wiki/Rene_Descartes) in the seventeenth century. He treated *any* (positive) real number as the length of a line segment, also products, square roots, and so on. This article considers some of the constructions he considered in *Problems the Construction of Which Requires Only Straight Lines and Circles* (included and commented in Hawking's book), namely multiplication, division and root extraction.

### Multiplication

Let A be a point in the [Euclidean](http://en.wikipedia.org/wiki/Euclidean_geometry) [plane](http://en.wikipedia.org/wiki/Plane_(geometry)) and let two non-parallel lines have one end-point at A and otherwise extend infinitely. Place now the points B and D on one of the lines and C and E on the other, with the restriction that the lines BC and DE should be parallel. See Figure&nbsp;1.

<figure>
  <img src="/media/multiplication.svg" class="img-responsive" alt="Multiplication by geometry">
  <figcaption><strong>Figure 1.</strong> Multiplication by geometry.</figcaption>
</figure>

We see that the triangles ABC and ADE are [similar](http://en.wikipedia.org/wiki/Similarity_(geometry)) and this implies that

<div class="pull-right">(1)</div>

$$
\frac{|AD|}{|AB|} = \frac{|AE|}{|AC|}
$$

If we now place point B such that $|AB|=1$, point C such that $|AC|=x$, point D such that $|AD|=y$, and point E such that BC and DE are parallel, we have

$$
z = |AE| = \frac{|AC| |AD|}{|AB|} = x y.
$$

### Division

Division can be performed using the same geometrical construction as for multiplication: Place point B such that $|AB|=1$, point D such that $|AD|=y$, point E such that $|AE|=z$, and point C such that BC and DE are parallel. Then we have

$$
x = |AC| = \frac{|AE| |AB|}{|AD|} = \frac{z}{y}.
$$

### Square Root

Let the line segment CD have length $x$ and extend the line from D to a point A such that $|AD|=1$. Draw a [semicircle](http://en.wikipedia.org/wiki/Semicircle) with AC as diameter. Now draw a line through D which is perpendicular to AC and call the intersection between this line and the circle point B. The length of the line segment BD is now equal to the square root of $x$. See Figure&nbsp;2.

<figure>
  <img src="/media/root1.svg" class="img-responsive" alt="Square root by geometry">
  <figcaption><strong>Figure 2.</strong> Square root by geometry.</figcaption>
</figure>

Why is this so? It can be shown by using the [Pythagorean theorem](/blog/2010/02/visualizing-the-pythagorean-theorem) and a bit of algebra, but it is most easily seen by considering similar triangles again. First, we argue that the angle at B in the triangle ABC in Figure&nbsp;3 is a right angle. This is so because the two triangles ABM and BCM are isosceles [triangles](http://en.wikipedia.org/wiki/Triangle) and the sum of the angles in the triangle ABC is thus $2\alpha+2\beta=\pi$, implying that $\alpha+\beta$ is equal to a right angle.

<figure>
  <img src="/media/root2.svg" class="img-responsive" alt="Any triangle inscribed in a semicircle has a right angle">
  <figcaption><strong>Figure 3.</strong> Any triangle inscribed in a semicircle has a right angle.</figcaption>
</figure>

Consider Figure&nbsp;4. It is now easy to see that the triangles ADB, BDC, and ABC are all similar. For instance, ABC and BDC both have a right angle and share the angle at C, so the remaining angles must be equal.

<figure>
  <img src="/media/root3.svg" class="img-responsive" alt="Three similar triangles related to a semicircle">
  <figcaption><strong>Figure 4.</strong> Three similar triangles related to a semicircle.</figcaption>
</figure>

We now have

$$
\frac{|CD|}{|BD|} = \frac{|BD|}{|AD|}
$$

and if we set $|AD|=1$ and $|CD|=x$ we get

$$
x = |CD| = |BD|^2 \quad \Rightarrow \quad |BD| = \sqrt{x}.
$$

### Concluding Remarks

<figure>
  <img src="/media/signedmult.svg" class="img-responsive" alt="Signed multiplication by geometry">
  <figcaption><strong>Figure 5.</strong> Signed multiplication.</figcaption>
</figure>

Addition and subtraction of numbers geometrically is quite trivial. Simply lay out the numbers/line segment one after another along an infinite reference line, taking signs into consideration according to some positive direction.

It is interesting to note how addition and subtraction is one-dimensional in this geometrical sense, while multiplication, division, and square root are two-dimensional. Furthermore, these three latter operations also need the notion of *unit length*.

Figure&nbsp;5 shows how even signed real numbers can be multiplied geometrically. Let two non-parallel and (infinitely long) lines meet at point A and let A split each line into a positive and a negative part. Point B, located at unit length from A, naturally has to be in positive part. This construction now handles the signs of multiplication quite nicely (for instance, the product of two negative numbers is seen to be positive).

It should be noted that Descartes was not the first to show these constructions. The construction of the square root of some number was also mentioned in, e.g., [Euclid](http://en.wikipedia.org/wiki/Euclid)&#8216;s [Elements](/refs/elements), [Book VI, Proposition 13](http://aleph0.clarku.edu/~djoyce/java/elements/bookVI/propVI13.html). However, he made essential steps to join geometry with algebra and analysis into [analytical geometry](http://en.wikipedia.org/wiki/Analytical_geometry).
