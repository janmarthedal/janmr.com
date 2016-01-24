---
layout: post
title: Visualizing the Pythagorean Theorem
author: Jan Marthedal Rasmussen
excerpt: ! "Most people are familiar with the Pythagorean theorem: In a right-angled
  triangle the square of the hypotenuse is equal to the sum of the squares of the
  other two sides. As the name of the theorem implies, it is attributed to Pythagoras,
  a Greek mathematician who lived around 500 B.C. The theorem is also included in
  Euclid's Elements,
  an encyclopedia of all known mathematics around 300 B.C. But how do you actually
  prove the Pythagorean theorem?"
date: 2010-02-14 13:13:18.000000000 +01:00
categories:
- mathematics
tags:
- proof
- pythagoras
- visualization
---
Most people are familiar with the Pythagorean theorem: In a right-angled triangle the square of the hypotenuse is equal to the sum of the squares of the other two sides. As the name of the theorem implies, it is attributed to [Pythagoras](http://en.wikipedia.org/wiki/Pythagoras), a Greek mathematician who lived around 500 B.C. The theorem is also included in [Euclid](http://en.wikipedia.org/wiki/Euclid)&#8216;s [Elements](http://en.wikipedia.org/wiki/Euclid's_Elements), an encyclopedia of all known mathematics around 300 B.C. But how do you actually prove the Pythagorean theorem?<span></span>

In this article I show my favorite three visualizations of the theorem. Note that I call them visualizations and not proofs. This is because a proof demands rigour, which in this context would mean precise descriptions of how to construct each geometrical figure shown, and to validate each claim related to them. The presentation here is more loose. Each of them could be turned into rigorous proofs, but the accompanying text is here kept to a minimum.

### Visualization 1

<div class="pull-right"><a href="{% amazon pww1 %}"><img src="{% bookcover pww1 %}" alt=""></a></div>
This first one is a classic, at least for me, see Figure&nbsp;1. It is very simple to understand and was the first visualization of the Pythagorean theorem I knew of. According to Nelsen's <a href="{% amazon pww1 %}">Proofs Without Words</a>, it appeared in the chinese [Chou pei suan ching](http://en.wikipedia.org/wiki/Chou_Pei_Suan_Ching) around 200 B.C. A similar figure also appears in [Euclid](http://en.wikipedia.org/wiki/Euclid)&#8216;s [Elements](http://en.wikipedia.org/wiki/Euclid's_Elements), [Book II](http://aleph0.clarku.edu/~djoyce/java/elements/bookII/bookII.html), [Proposition 4](http://aleph0.clarku.edu/~djoyce/java/elements/bookII/propII4.html).

<figure>
  <img src="{{site.baseurl}}media/pythagoras1.svg" class="img-responsive" alt="Pythagoras 1">
  <figcaption><strong>Figure 1.</strong></figcaption>
</figure>

### Visualization 2

<div class="pull-right"><a href="{% amazon hawking %}"><img src="{% bookcover hawking %}" alt=""></a></div>
The second visualization, seen in Figure&nbsp;2, is attributed [Thābit ibn Qurra](http://en.wikipedia.org/wiki/Thābit_ibn_Qurra) who lived around 900 A.D. It is probably my current favorite, partly because only a single figure/drawing is needed. Two colorings of this figure, however, is shown to ease the understanding.

<figure>
  <img src="{{site.baseurl}}media/pythagoras2.svg" class="img-responsive" alt="Pythagoras 2">
  <figcaption><strong>Figure 2.</strong></figcaption>
</figure>

### Visualization 3

<div class="pull-right"><a href="{% amazon pww2 %}"><img src="{% bookcover pww2 %}" alt=""></a></div>
The third visualization is due to the 12. century Indian mathematician and astronomer [Bhāskara](http://en.wikipedia.org/wiki/Bhāskara_II), see Figure&nbsp;3. I think it is a bit harder to understand at first, compared to the ones above, but it is still quite elegant. The trick is to observe that the right-most figure consists of two squares, joined at the dashed line. The side lengths of these squares can then be compared to the side lengths of the triangles.

<figure>
  <img src="{{site.baseurl}}media/pythagoras3.svg" class="img-responsive" alt="Pythagoras 3">
  <figcaption><strong>Figure 3.</strong></figcaption>
</figure>

Stephen Hawking, in <a href="{% amazon hawking %}">God Created the Integers</a>, claims that Bhāskara did not show the figure to the right in Figure&nbsp;3, but simply said &#8220;see!&#8221;. Hawking then observes: If the sides of the triangles are {% imath a %}, {% imath b %}, and {% imath c %}, with {% imath c %} the length of the hypotenuse and {% imath a > b %}, we have

{% dmath c^2 = 4 \frac{a b}{2} + (a-b)^2 = a^2 + b^2. %}

### Other

The three books mentioned in this article contains at least 10 other (visual) proofs of the Pythagorean theorem. The three shown above are my current favorites, though. Feel free to post a comment if you know of some visualization which is, in some sense, better.

*(Update 2010-02-14: An amazing [<span style="text-decoration: line-through;">84</span> 104 proofs](http://www.cut-the-knot.org/pythagoras/index.shtml) have been collected at [cut-the-knot](http://www.cut-the-knot.org/).)*
