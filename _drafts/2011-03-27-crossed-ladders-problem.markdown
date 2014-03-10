---
layout: post
status: publish
published: true
title: The Crossed Ladders Problem
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "I was <a href=\"http:&#47;&#47;twitter.com&#47;#!&#47;divbyzero&#47;status&#47;44871018350784512\">recently
  reminded<&#47;a> of the crossed ladders problem. The following simple figure should
  be adequate in defining the problem:\r\n\r\n[caption id=\"\" align=\"alignnone\"
  width=\"217\" caption=\"The crossed ladders problem\"]<a href=\"http:&#47;&#47;www.flickr.com&#47;photos&#47;janmr&#47;6163914864&#47;\"
  title=\"The Crossed Ladders Problem by janmarthedal, on Flickr\"><img src=\"http:&#47;&#47;farm7.static.flickr.com&#47;6178&#47;6163914864_a6108dd499_b.jpg\"
  width=\"217\" height=\"400\" alt=\"The Crossed Ladders Problem\"><&#47;a>[&#47;caption]\r\n\r\nIf
  you haven't seen the problem before, I highly recommend trying to solve it before
  reading on.\r\n\r\n"
wordpress_id: 2155
wordpress_url: http://sputsoft.com/blog/?p=2155
date: 2011-03-27 22:50:08.000000000 +02:00
categories:
- mathematics
tags:
- geometry
- nerd-sniping
comments:
- id: 2362
  author: Terence Coates
  author_email: coates07@talktalk.net
  author_url: ''
  date: !binary |-
    MjAxMS0wOC0xMSAyMDowMzo1NCArMDIwMA==
  date_gmt: !binary |-
    MjAxMS0wOC0xMSAxODowMzo1NCArMDIwMA==
  content: ! "It is worth noting that if h can't be greater than a.b&#47;(a+b), and
    if equal then the distance betwwen the ladders is zero.\r\n\r\ni must study your
    way of solving the quartic - I used Descartes (1637) mathod."
- id: 2365
  author: Terence Coates
  author_email: coates07@talktalk.net
  author_url: ''
  date: !binary |-
    MjAxMS0wOC0xNCAxMDo1MjozMSArMDIwMA==
  date_gmt: !binary |-
    MjAxMS0wOC0xNCAwODo1MjozMSArMDIwMA==
  content: ! "The 4 solutions to the quartic yield two real with one of them having
    one ladder meeting the wall below ground. In this case the ladders themselves
    do not cross, but the extended lines through them do so at the specified height.\r\nThe
    other two solutions are a pair of conjucate complex numbers, which means that
    this is a 3 dimensional case - quite difficult to work out the distance between
    the walls which will be a complex number."
- id: 2638
  author: Bob Baker
  author_email: b_baker@hotmail.com
  author_url: ''
  date: !binary |-
    MjAxMi0xMS0zMCAxMzozNDozMyArMDEwMA==
  date_gmt: !binary |-
    MjAxMi0xMS0zMCAxMjozNDozMyArMDEwMA==
  content: ! "After I recently derived a general expression for the exact solution,
    I did a search and found your site. To solve other cases, you can paste the string
    below into the Expression window of the high precision calculator at keisan.casio.com
    (Calculator tab at the top of the home page) and click the Execute button. It
    will give you the alley width with precision up to 50 digits. For different ladder
    lengths and crossing height, just edit the values entered for a, b, and c (with
    a>b).\r\n\r\na=40; b=30; c=10;\r\nd=a^2-b^2;f=2*c^2*d*sqrt(d^2&#47;27+c^4);\r\ng=d^3&#47;27+2*c^4*d;h=d&#47;3+(g+f)^(1&#47;3)+(g-f)^(1&#47;3);\r\nj=sqrt(c^2-d+h);k=sqrt((2*c*d+2*c^3)&#47;j+2*c^2-d-h);\r\nm=(c+j+k)&#47;2;sqrt(b^2-m^2)"
---
I was <a href="http:&#47;&#47;twitter.com&#47;#!&#47;divbyzero&#47;status&#47;44871018350784512">recently reminded<&#47;a> of the crossed ladders problem. The following simple figure should be adequate in defining the problem:

[caption id="" align="alignnone" width="217" caption="The crossed ladders problem"]<a href="http:&#47;&#47;www.flickr.com&#47;photos&#47;janmr&#47;6163914864&#47;" title="The Crossed Ladders Problem by janmarthedal, on Flickr"><img src="http:&#47;&#47;farm7.static.flickr.com&#47;6178&#47;6163914864_a6108dd499_b.jpg" width="217" height="400" alt="The Crossed Ladders Problem"><&#47;a>[&#47;caption]

If you haven't seen the problem before, I highly recommend trying to solve it before reading on.

<a id="more"></a><a id="more-2155"></a>

I had previously tried to solve it, but without success. This time I couldn't get it out of my mind. I had become a (self-inflicted) victim of <em>nerd sniping<&#47;em>.

[caption id="" align="alignnone" width="592" caption="xkcd explains nerd sniping"]<a href="http:&#47;&#47;xkcd.com&#47;356&#47;"><img class=" " title="xkcd: Nerd sniping" src="http:&#47;&#47;imgs.xkcd.com&#47;comics&#47;nerd_sniping.png" alt="Nerd sniping" width="592" height="297" &#47;><&#47;a>[&#47;caption]

The thing is that it looks simple. But <a href="http:&#47;&#47;www.reddit.com&#47;r&#47;math&#47;comments&#47;fy6iu&#47;35_years_on_and_i_still_cant_solve_it&#47;">it isn't<&#47;a>. Below is my solution to the problem (using some <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Crossed_ladders_problem">inspiration<&#47;a> for making it a bit more pretty).

First, some variables must be introduced. Consider the following figures:

[caption id="" align="alignnone" width="500" caption="Variables for the crossed ladders problem"]<a href="http:&#47;&#47;www.flickr.com&#47;photos&#47;janmr&#47;6163915136&#47;" title="Variables for the Crossed Ladders Problem by janmarthedal, on Flickr"><img src="http:&#47;&#47;farm7.static.flickr.com&#47;6168&#47;6163915136_58802453eb_b.jpg" width="500" height="362" alt="Variables for the Crossed Ladders Problem"><&#47;a>[&#47;caption]

So \(a=|AF|\), \(b=|BE|\), and \(h=|CD|\) are given while the width \(w=|AB|\) is the sought quantity. Furthermore, \(p=|BF|\) and \(q=|AE|\) are auxilliary variables.

Consider first the special case \(a=b\). It is then clear that
\[
w = \sqrt{a^2-4h^2} \quad\hbox{for } a=b.
\]

Assume now, without loss of generality, that \(a > b\). The Pythegorean theorem gives us
<div style="float:right">(1)<&#47;div>
\[
w^2 = a^2-p^2 = b^2-q^2 \quad \Leftrightarrow \quad
a^2-b^2 = p^2-q^2 = (p+q)(p-q).
\]
We then use that the triangle ACD is similar to AFB, just like the triangle BDC is similar to BAE, and get
\[
\frac{|AD|}{w} = \frac{h}{p} \quad\hbox{and}\quad
\frac{|BD|}{w} = \frac{h}{q}.
\]
This gives us
\[
w = |AD|+|BD| = w \left( \frac{h}{p} + \frac{h}{q} \right)
\quad \Leftrightarrow \quad
pq = h(p+q).
\]
We use this equality to get
<div style="float:right">(2)<&#47;div>
\[
\begin{align}
(p-q)^2 &= p^2+q^2-2 p q = p^2+q^2+2 p q-4 p q \\
 &= (p+q)^2-4 h(p+q) = (p+q)(p+q-4h).
\end{align}
\]
We now start from (1) and use (2) to get
\[
(a^2-b^2)^2 = (p+q)^2 (p-q)^2 = (p+q)^3 (p+q-4h).
\]
We finally divide each side by \(\sqrt{a^2-b^2}^4\) and obtain
<div style="float:right">(3)<&#47;div>
\[
x^3 (x-c) - 1 = 0
\]
where
<div style="float:right">(4)<&#47;div>
\[
x = \frac{p+q}{\sqrt{a^2-b^2}} \quad\hbox{and}\quad
c = \frac{4h}{\sqrt{a^2-b^2}}.
\]
Let us take a closer look at (3) by considering the fourth degree polynomium \(Q(x)=x^3 (x-c) - 1\). Note first that <span class="mthi">c<&#47;span> is positive. Next that <span class="mthi">Q<&#47;span> is decreasing for \(x < 0\) and \(0 < x < 3c&#47;4\) and increasing for \(x > 3c&#47;4\) (seen from the derivative \(Q'(x)=x^2(4x-3c)\)). And since \(Q(0)=-1\) we then know that <span class="mthi">Q<&#47;span> <i>always<&#47;i> has exactly two zeros, one negative and one positive. We are naturally interested in the positive one.

Assume now that we have found the (positive) root <span class="mthi">x<&#47;span>. We then have from (4) and (1),
\[
p+q = x \sqrt{a^2-b^2} \quad \hbox{and} \quad
p-q = \frac{a^2-b^2}{p+q} = \frac{1}{x} \sqrt{a^2-b^2},
\]
and then
\[
p = \tfrac{1}{2} \left( x + \frac{1}{x} \right) \sqrt{a^2-b^2},
\]
and finally
\[
w = \sqrt{a^2-p^2}.
\]
And that is the width we were looking for. Note, however, that if \(p > a\) then no solution is possible. This can happen, for example, if the crossing height <span class="mthi">h<&#47;span> is larger than the shortest ladder.

But how do we solve (3) and find <span class="mthi">x<&#47;span>? It is possible to solve a quartic equation analytically, so let us turn to <a href="&#47;book&#47;link.php?id=abramowitz">Abramowitz and Stegun<&#47;a> and <a href="http:&#47;&#47;people.math.sfu.ca&#47;~cbm&#47;aands&#47;page_17.htm">solve it<&#47;a>. By carefully inserting to retrieve the positive root we get
\[
x = \tfrac{1}{4} c + \tfrac{1}{4} \sqrt{c^2 + 4 u} + \tfrac{1}{2} \sqrt{\left( \tfrac{1}{2} c + \tfrac{1}{2} \sqrt{c^2 + 4 u} \right)^2 + 2 \sqrt{u^2+4} - 2 u}
\]
where
\[
u = \sqrt[3]{\sqrt{\tfrac{64}{27}+\tfrac{1}{4} c^4}-\tfrac{1}{2} c^2}
  - \sqrt[3]{\sqrt{\tfrac{64}{27}+\tfrac{1}{4} c^4}+\tfrac{1}{2} c^2}.
\]

That concludes the solution to the crossed ladders problem. Let us finish by inserting some numbers.

From the initial illustration of the problem, we have \(a=12\), \(b=10\) and \(h=5\). This gives us
\[
w \simeq 4.2973280047205172448618937103219913746175.
\]
There are actually lengths that have an integer solution. Take, <a href="http:&#47;&#47;users.softlab.ntua.gr&#47;~ttsiod&#47;ladders.html">for instance<&#47;a>, \(a=119\), \(b=70\), \(h=30\) and \(w=56\).

A simple, but tricky, problem.
