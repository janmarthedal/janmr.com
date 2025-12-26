---
title: Where Did pi Come From?
date: 2011-01-09T12:00Z
layout: post
tags:
  - catalan-numbers
  - knuth
categories:
  - mathematics
excerpt: >-
  [...] where did that pi come from? What do trees have to do with pi? That was
  the subject of Donald E. Knuth's 16th Annual Christmas Tree Lecture, given on
  December 6, 2010.
redirect: /blog/2011/01/where-did-pi-come-from/
---
The [Catalan](http://en.wikipedia.org/wiki/Catalan_number) [number](http://oeis.org/A000108) $C_n$ denotes the number of forests with $n$ nodes. In fact, the Catalan numbers relate to many different structures, see, e.g., the pages linked to above and the references on those pages.

A formula for the Catalan numbers is given by

$$
C_n = \frac{(2n)!}{n! (n+1)!}
$$

with the asymptotic behaviour

$$
C_n \sim \frac{4^n}{\sqrt{\pi n} (n+1)}.
$$

But where did that pi come from? What do trees have to do with pi? That was the subject of Donald E. Knuth's 16th Annual Christmas Tree Lecture, given on December 6, 2010.

As it turns out, a connection between the asymptotic behaviour of Catalan numbers and circle areas can be found through the [Wallis product formula](http://en.wikipedia.org/wiki/Wallis_product),

$$
\frac{\pi}{2} = \frac{2}{1} \cdot \frac{2}{3} \cdot \frac{4}{3} \cdot \frac{4}{5} \cdot \frac{6}{5} \cdot \frac{6}{7} \cdots.
$$

In 2007, Johan W&auml;stlund from Link&ouml;ping University published a paper called *An Elementary Proof of the Wallis Product Formula for pi* (The American Mathematical Monthly, 2007, volume 114, issue 10, pp. 914). He shows a beautiful elementary proof that relates the infinite product on the right-hand side above to the area of circles. The paper is also available [online](http://urn.kb.se/resolve?urn=urn:nbn:se:liu:diva-62929).

Knuth uses this result to show how pi appears in the asymptotic formula for Catalan numbers. In fact, the same result also explains why pi appears in [Stirling's formula](http://en.wikipedia.org/wiki/Stirling's_approximation),

$$
n! \sim \sqrt{2 \pi n} \left(\frac{n}{e}\right)^n.
$$

See, e.g., exercise 1.2.11.2&ndash;5 in <a href="/refs/taocp1">The Art of Computer Programming, Volume 1</a>.

You can watch the lecture by Knuth [online](https://www.youtube.com/watch?v=cI6tt9QfRdo). I highly recommend it.
