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

Let us first consider the long arms and the rhombus by itself.
We will require that $s < L$ which makes the rhombus fit inside the two arms.

<figure class="framed">
  <img src="/media/pl-linkage/arms-rhombus.svg" class="img-responsive" alt="The Peaucellier–Lipkin linkage without the driving arm">
</figure>

The midpoint of the rhombus is denoted *M*.
The diagonals $AB$ and $PP'$ of the rhombus are perpendicular and bisect each other at $M$.
Since $O$ is equally far from $A$ and $B$, it lies on the perpendicular bisector of $AB$,
which is the line through $P$ and $P'$.

Using the Pythagorean Theorem on the right-angled triangles $OAM$ and $APM$,
we get $L^2 = \lvert OM \rvert^2 + \lvert AM \rvert^2$ and
$s^2 = \lvert PM \rvert^2 + \lvert AM \rvert^2$.
Then we have

$$
L^2 - s^2 = \lvert OM \rvert^2 - \lvert PM \rvert^2
= (\lvert OM \rvert - \lvert PM \rvert) (\lvert OM \rvert + \lvert PM \rvert)
= \lvert OP \rvert \lvert OP' \rvert.
$$

The two factors $\lvert OM \rvert - \lvert PM \rvert$ and $\lvert OM \rvert + \lvert PM \rvert$
are the distances from $O$ to the closer and the farther of the points $P$ and $P'$.
The product does not depend on which is which,
so the relation holds whether $P$ is the closer or the farther of the two.

Furthermore, since $\lvert OM \rvert^2 - \lvert PM \rvert^2 = L^2 - s^2 > 0$,
we have $\lvert OM \rvert > \lvert PM \rvert$,
so $O$ lies outside the segment $PP'$ and $P$ and $P'$ are on the same ray from $O$.
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