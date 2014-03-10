---
layout: post
status: publish
published: true
title: Where Did pi Come From?
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "The <a href=\"http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Catalan_number\">Catalan<&#47;a>
  <a href=\"http:&#47;&#47;oeis.org&#47;A000108\">number<&#47;a> \\(C_n\\) denotes
  the number of forests with <span class=\"mthi\">n<&#47;span> nodes. In fact, the
  Catalan numbers relate to many different structures, see, e.g., the pages linked
  to above and the references on those pages.\r\n\r\n"
wordpress_id: 1953
wordpress_url: http://sputsoft.com/blog/?p=1953
date: 2011-01-09 14:41:37.000000000 +01:00
categories:
- mathematics
tags:
- catalan numbers
- stirling's formula
- knuth
comments:
- id: 2312
  author: tj
  author_email: tobysat3@aol.com
  author_url: ''
  date: !binary |-
    MjAxMS0wNS0wOSAxNjo0NTo1NCArMDIwMA==
  date_gmt: !binary |-
    MjAxMS0wNS0wOSAxNDo0NTo1NCArMDIwMA==
  content: dat cool
---
The <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Catalan_number">Catalan<&#47;a> <a href="http:&#47;&#47;oeis.org&#47;A000108">number<&#47;a> \(C_n\) denotes the number of forests with <span class="mthi">n<&#47;span> nodes. In fact, the Catalan numbers relate to many different structures, see, e.g., the pages linked to above and the references on those pages.

<a id="more"></a><a id="more-1953"></a>

A formula for the Catalan numbers is given by
\[
C_n = \frac{(2n)!}{n! (n+1)!}
\]
with the asymptotic behaviour
\[
C_n \sim \frac{4^n}{\sqrt{\pi n} (n+1)}.
\]

But where did that pi come from? What do trees have to do with pi? That was the subject of Donald E. Knuth's 16th Annual Christmas Tree Lecture, given on December 6, 2010.

As it turns out, a connection between the asymptotic behaviour of Catalan numbers and circle areas can be found through the <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Wallis_product">Wallis product formula<&#47;a>,
\[
\frac{\pi}{2} = \frac{2}{1} \cdot \frac{2}{3} \cdot \frac{4}{3} \cdot \frac{4}{5} \cdot \frac{6}{5} \cdot \frac{6}{7} \cdots.
\]

In 2007, Johan W&auml;stlund from Link&ouml;ping University published a paper called <i>An Elementary Proof of the Wallis Product Formula for pi<&#47;i> (The American Mathematical Monthly, 2007, volume 114, issue 10, pp. 914). He shows a beautiful elementary proof that relates the infinite product on the right-hand side above to the area of circles. The paper is also available <a href="http:&#47;&#47;www.ep.liu.se&#47;ea&#47;lsm&#47;2005&#47;002&#47;">online<&#47;a>.

Knuth uses this result to show how pi appears in the asymptotic formula for Catalan numbers. In fact, the same result also explains why pi appears in <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Stirling's_approximation">Stirling's formula<&#47;a>,
\[
n! \sim \sqrt{2 \pi n} \left(\frac{n}{e}\right)^n.
\]
See, e.g., exercise 1.2.11.2&ndash;5 in <a href="&#47;book&#47;link.php?id=taocp1">The Art of Computer Programming, Volume 1<&#47;a>.

You can watch the lecture by Knuth by going to the <a href="http:&#47;&#47;scpd.stanford.edu&#47;knuth&#47;index.jsp">Computer Musings by Professor Donald E. Knuth<&#47;a> page at Stanford University (<em>update 2013-06-30:<&#47;em> direct link no longer working). I highly recommend it.
