---
layout: post
title: Where Did pi Come From?
author: Jan Marthedal Rasmussen
excerpt: ! "[...] where did that pi come from? What do trees have to do with pi? That was the subject of Donald E. Knuth's 16th Annual Christmas Tree Lecture, given on December 6, 2010."
date: 2011-01-09 14:41:37.000000000 +01:00
categories:
- mathematics
tags:
- catalan-numbers
- knuth
---
The [Catalan](http://en.wikipedia.org/wiki/Catalan_number) [number](http://oeis.org/A000108) {% imath C_n %} denotes the number of forests with {% imath n %} nodes. In fact, the Catalan numbers relate to many different structures, see, e.g., the pages linked to above and the references on those pages.

A formula for the Catalan numbers is given by

{% dmath C_n = \frac{(2n)!}{n! (n+1)!} %}

with the asymptotic behaviour

{% dmath C_n \sim \frac{4^n}{\sqrt{\pi n} (n+1)}. %}

But where did that pi come from? What do trees have to do with pi? That was the subject of Donald E. Knuth's 16th Annual Christmas Tree Lecture, given on December 6, 2010.

As it turns out, a connection between the asymptotic behaviour of Catalan numbers and circle areas can be found through the [Wallis product formula](http://en.wikipedia.org/wiki/Wallis_product),

{% dmath \frac{\pi}{2} = \frac{2}{1} \cdot \frac{2}{3} \cdot \frac{4}{3} \cdot \frac{4}{5} \cdot \frac{6}{5} \cdot \frac{6}{7} \cdots. %}

In 2007, Johan W&auml;stlund from Link&ouml;ping University published a paper called *An Elementary Proof of the Wallis Product Formula for pi* (The American Mathematical Monthly, 2007, volume 114, issue 10, pp. 914). He shows a beautiful elementary proof that relates the infinite product on the right-hand side above to the area of circles. The paper is also available [online](http://www.ep.liu.se/ea/lsm/2005/002/).

Knuth uses this result to show how pi appears in the asymptotic formula for Catalan numbers. In fact, the same result also explains why pi appears in [Stirling's formula](http://en.wikipedia.org/wiki/Stirling's_approximation),

{% dmath n! \sim \sqrt{2 \pi n} \left(\frac{n}{e}\right)^n. %}

See, e.g., exercise 1.2.11.2&ndash;5 in <a href="{% amazon taocp1 %}">The Art of Computer Programming, Volume 1</a>.

You can watch the lecture by Knuth by going to the [Computer Musings by Professor Donald E. Knuth](http://scpd.stanford.edu/knuth/index.jsp) page at Stanford University (*update 2013-06-30:* direct link no longer working). I highly recommend it.
