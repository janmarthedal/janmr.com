---
layout: post
title: Nice Proof of a Geometric Progression Sum
author: Jan Marthedal Rasmussen
date: 2008-10-08 22:58:26.000000000 +02:00
categories:
- mathematics
tags:
- proof
- visualization
- infinite series
---
Consider the geometric series,

{% dmath s_r = \sum_{k=0}^\infty r^k = 1 + r + r^2 + r^3 + \ldots, %}

for {% imath 0 < r < 1 %}. The goal is to find a <a href="http://en.wikipedia.org/wiki/Closed-form_expression">closed-form expression</a> for {% imath s_r %}.</p><span></span>

<figure>
  <img src="{{site.baseurl}}media/geoprog.svg" alt="Visual proof of a geometric progression sum" class="img-responsive">
</figure>

Consider now the figure shown. Given that {% imath |AB|=|AD|=1 %} and {% imath |DE|=r %}, the rest of the figure can be constructed (the lines AC and BF are parallel and the rest of the lines, with the exception of BC, are perpendicular to AC). It is important to note that the four-sided figures ABED, DEHG, GHKJ, and so on, are all <a title="similar" href="http://en.wikipedia.org/wiki/Similarity_(geometry)">similar</a> to each other, and we see that the length {% imath |AC| %} is exactly the quantity we are looking for.

Note now how the triangle ABC is similar to the triangle FEB, leading to

{% dmath \frac{|AC|}{|AB|} = \frac{|BF|}{|FE|}. %}

If we then evaluate each side of the equality-sign, we get

{% dmath 1 + r + r^2 + r^3 + \ldots = \frac{1}{1-r}. %}

Quite elegant, I think.

The figure also shows that the sum converges for all {% imath 0 < r < 1 %} since the proof described above can be carried out whenever BC crosses AC the "right" way. Note, however, that the sum does not converge *only* for these values of {% imath r %} &ndash; in fact, it converges whenever {% imath |r| < 1 %} for complex {% imath r %} (easily seen by considering the first {% imath N %} terms of the sum and then letting {% imath N \rightarrow \infty %}).

(I don't know who to attribute this proof to, unfortunately. I saw it in a magazine for elementary school teachers.)
<div style="float: right;"><a href="{% amazon pww1 %}"><img src="{% bookcover pww1 %}" /></a></div>
*Update 2009-08-22: Apparently, the proof was discovered by Benjamin G. Klein and Irl C. Bivens, and it appears on page 120 of <a href="{% amazon pww1 %}">Proofs without Words: Exercises in Visual Thinking</a> by Roger B. Nelson (thanks for the reference, David Radcliffe).*

