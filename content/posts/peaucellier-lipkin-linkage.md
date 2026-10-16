---
title: Peaucellier–Lipkin Linkage
scripts: [/media/pl-linkage/pl-linkage.js]
---
Consider the device shown in the animation below.
It consists entirely of rigid bars joined at pivot points.

<figure class="framed">
  <pl-linkage><img src="/media/pl-linkage/animation-frame.svg" class="img-responsive" alt="The Peaucellier–Lipkin linkage, with P' on a straight line"></pl-linkage>
</figure>

It was invented in 1864 and is called the Peaucellier–Lipkin linkage,
named after Charles-Nicolas Peaucellier and Yom Tov Lipman Lipkin.

It has the special property of transforming rotary motion into straight-line motion, and vice versa.
This post examines why this works.

Let us first introduce some parameters.
Let the long black rods have length *L*.
Each rod of the blue rhombus has length *s*.
The green rod has length *r* and this is also the distance between the two anchor points.

We will require that $s < L$.

Let us first consider the long arms and the rhombus by itself.

<figure class="framed">
  <img src="/media/pl-linkage/arms-rhombus.svg" class="img-responsive" alt="The Peaucellier–Lipkin linkage without the driving arm">
</figure>

The midpoint of the rhombus is denoted *M* and let us introduce
$x = \lvert PM \rvert = \lvert MP' \rvert$ and
$y = \lvert AM \rvert = \lvert MB \rvert$.
Using the Pythagorean Theorem on the right-angled triangles $OAM$ and $AP'M$,
we get $L^2=(\lvert OP \rvert + x)^2 + y^2$ and $s^2 = x^2 + y^2$.
Then we have

$$
\begin{aligned}
L^2 - s^2 &= (\lvert OP \rvert + x)^2 - x^2 = \lvert OP \rvert^2 + 2x \lvert OP \rvert \\
          &= \lvert OP \rvert (\lvert OP \rvert + 2x) = \lvert OP \rvert \lvert OP' \rvert.
\end{aligned}
$$

This means that the points $P$ and $P'$ are each other's
[(circle) inverses](https://en.wikipedia.org/wiki/Inversive_geometry#Inversion_in_a_circle).

We now place a point $C$ halfway between $O$ and $P$ and a point $Q$
off the $OP$ line such that
$\lvert OC \rvert = \lvert CP \rvert = \lvert CQ \rvert = r$.
Let also $Q'$ be the inversion of $Q$ as defined by the construction above.

<figure class="framed">
  <img src="/media/pl-linkage/two-positions.svg" class="img-responsive" alt="Two positions of the Peaucellier–Lipkin linkage, with P on a circle through O">
</figure>

This means that we have
$\lvert OP \rvert \lvert OP' \rvert = \lvert OQ \rvert \lvert OQ' \rvert = L^2 - s^2$
and thus

$$
\frac{\lvert OP \rvert}{\lvert OQ \rvert} = \frac{\lvert OQ' \rvert}{\lvert OP' \rvert}.
$$

This proportionality and the shared angle $\angle POQ = \angle P'OQ'$
implies that the triangles $OQP$ and $OP'Q'$ are [similar](https://en.wikipedia.org/wiki/Similarity_(geometry)).

Now for the final part:
Since $Q$ is a point on the circle where $OP$ is a diameter, the angle $\angle OQP$
is a right angle by [Thales's Theorem](https://en.wikipedia.org/wiki/Thales%27s_theorem).
From the similarity we then have that $\angle OP'Q'$ is a right angle.
And since $Q$ was chosen arbitrarily (off the $OP$ line) this will be true for any $Q$
with $\lvert CQ \rvert = r$.