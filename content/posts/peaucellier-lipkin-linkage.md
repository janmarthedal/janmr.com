---
title: Peaucellier–Lipkin Linkage
date: 2026-10-25T12:00Z
tags:
  - mathematics
  - geometry
  - visualization
og:
  description: >-
    Why the Peaucellier–Lipkin linkage turns circular motion into exact
    straight-line motion.
scripts: [/media/pl-linkage/pl-linkage.js]
---
Consider the device shown in the animation below.
It consists entirely of rigid bars joined at pivot points.

<figure class="framed">
  <pl-linkage><img src="/media/pl-linkage/animation-frame.svg" class="img-responsive" alt="The Peaucellier–Lipkin linkage, with P' on a straight line"></pl-linkage>
</figure>

It is called the Peaucellier–Lipkin linkage,
named after Charles-Nicolas Peaucellier, who invented it in 1864,
and Yom Tov Lipman Lipkin, who discovered it independently in 1871.

It has the special property of transforming rotary motion into straight-line motion, and vice versa.
This post examines why this works.

Let us first introduce some parameters.
Let the two long black rods have length *L*. They are joined at the anchor point $O$.
Each rod of the blue rhombus has length *s*.
The green rod has length *r* and is also the distance between $O$ and the other anchor point $C$.

We start by considering the long arms and the rhombus by itself.
We will require that $s < L$, which makes the rhombus fit inside the two arms.

<figure class="framed">
  <img src="/media/pl-linkage/arms-rhombus.svg" class="img-responsive" alt="The Peaucellier–Lipkin linkage without the driving arm">
</figure>

The long rods join $O$ to the points $A$ and $B$,
and the rhombus is $APBP'$.
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

Since $\lvert OM \rvert^2 - \lvert PM \rvert^2 = L^2 - s^2 > 0$,
we have $\lvert OM \rvert > \lvert PM \rvert$,
so $O$ lies outside the segment $PP'$ and $P$ and $P'$ are on the same ray from $O$.

The two factors $\lvert OM \rvert - \lvert PM \rvert$ and $\lvert OM \rvert + \lvert PM \rvert$
are therefore the distances from $O$ to the closer and the farther of the points $P$ and $P'$.
The product does not depend on which is which,
so the relation holds whether $P$ is the closer or the farther of the two.
This means that the points $P$ and $P'$ are each other's
[(circle) inverses](https://en.wikipedia.org/wiki/Inversive_geometry#Inversion_in_a_circle).

Now for the green rod.
It joins $P$ to the anchor point $C$, and since $\lvert OC \rvert = \lvert CP \rvert = r$,
the point $P$ is constrained to move on the circle with center $C$ and radius $r$,
which passes through $O$.
Let $P$ be the point on this circle opposite $O$, so that $C$ is halfway between $O$ and $P$,
and let $Q$ be any other point on the circle, off the $OP$ line.
Let also $Q'$ be the inversion of $Q$.

<figure class="framed">
  <img src="/media/pl-linkage/two-positions.svg" class="img-responsive" alt="Two positions of the Peaucellier–Lipkin linkage, with P on a circle through O">
</figure>

We have
$\lvert OP \rvert \lvert OP' \rvert = \lvert OQ \rvert \lvert OQ' \rvert = L^2 - s^2$
and thus

$$
\frac{\lvert OQ \rvert}{\lvert OP' \rvert} = \frac{\lvert OP \rvert}{\lvert OQ' \rvert}.
$$

Since $P'$ lies on the ray $OP$ and $Q'$ lies on the ray $OQ$,
the triangles $OQP$ and $OP'Q'$ share the angle $\angle POQ = \angle P'OQ'$.
This proportionality and the shared angle imply that the triangles $OQP$ and $OP'Q'$
are [similar](https://en.wikipedia.org/wiki/Similarity_(geometry)).

Now for the final part:
Since $Q$ is a point on the circle where $OP$ is a diameter, the angle $\angle OQP$
is a right angle by [Thales's Theorem](https://en.wikipedia.org/wiki/Thales%27s_theorem).
From the similarity we then have that $\angle OP'Q'$ is a right angle.
And since $Q$ was chosen arbitrarily (off the $OP$ line),
this will be true for any $Q$ with $\lvert CQ \rvert = r$.

So every position $Q'$ of the tracing point lies on the line through $P'$ perpendicular to $OP'$.
In other words, as $P$ moves on its circle, $P'$ moves on a straight line,
at distance $\lvert OP' \rvert = (L^2 - s^2)/(2r)$ from $O$.

You can also explore the linkage interactively in the [lab](/lab/peaucellier/).
