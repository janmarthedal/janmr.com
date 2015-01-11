---
layout: post
title: Remembering Trigonometric Addition Formulas
author: Jan Marthedal Rasmussen
excerpt: ! "The addition formulas for sine and cosine look like this: [...] I can never remember them. [...]"
date: 2009-09-23 14:13:57.000000000 +02:00
categories:
- mathematics
tags:
- trigonometry
- visualization
---
The addition formulas for sine and cosine look like this:

{% dmath \begin{aligned} \cos(\alpha + \beta) &= \cos \alpha \cos \beta - \sin \alpha \sin \beta, \\ \sin(\alpha + \beta) &= \cos \alpha \sin \beta + \sin \alpha \cos \beta. \\ \end{aligned} %}

I can never remember them.

One solution is of course to look them up in a [book](http://www.math.sfu.ca/~cbm/aands/page_72.htm) or search the [internet](http://en.wikipedia.org/wiki/Angle_addition_formula#Angle_sum_and_difference_identities). What I usually do, though, is derive them using complex arithmetic. Apart from the usual rules known from real-valued arithmetic, all that is needed is knowing {% imath e^{i \phi} = \cos \phi + i \sin \phi %} and {% imath i^2 = -1 %}. Then you get

{% dmath \begin{aligned} \cos(\alpha + \beta) + i \sin(\alpha + \beta) &= e^{i (\alpha+\beta)} \\ &= e^{i \alpha} e^{i \beta} \\ &= (\cos \alpha + i \sin \alpha)(\cos \beta + i \sin \beta) \\ &= (\cos \alpha \cos \beta - \sin \alpha \sin \beta) + i (\cos \alpha \sin \beta + \sin \alpha \cos \beta). \end{aligned} %}

By equating the real and imaginary parts you get the answer.

Flicking through *Proofs Without Words II* by [Roger B. Nelsen](http://legacy.lclark.edu/~mathsci/nelsen.html), I saw the following wonderful figure. It could be a contender to an easier way to remember the addition formulas.

<figure>
  <img src="{{site.baseurl}}media/trigadd.svg" class="img-responsive" alt="Addition formulas for sine and cosine">
</figure>

(Attributed to the author himself.) It should be pretty much self-explanatory. Apart from using sine and cosine to assign side-lengths to the four relevant right-angled triangles, all you need know is that the sum of the angles in a triangle is equal to two right angles (to realize that the two {% imath \alpha %}-angles are indeed equal).

<div style="float:right"><a href="{% amazon pww2 %}"><img src="{% bookcover pww2 %}" /></a></div>
<div style="float:right"><a href="{% amazon pww1 %}"><img src="{% bookcover pww1 %}" /></a></div>

Both volumes of *Proofs Without Words* contain other &#8220;visual proofs&#8221; of the addition formulas. Some of these can also be found [online](http://mathworld.wolfram.com/TrigonometricAdditionFormulas.html).

How do you remember the addition formulas for sine and cosine?

