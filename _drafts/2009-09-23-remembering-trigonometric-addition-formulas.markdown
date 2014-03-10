---
layout: post
status: publish
published: true
title: Remembering Trigonometric Addition Formulas
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "The addition formulas for sine and cosine look like this:\r\n\\[\\begin{aligned}\r\n\\cos(\\alpha
  + \\beta) &amp;= \\cos \\alpha \\cos \\beta - \\sin \\alpha \\sin \\beta, \\\\\r\n\\sin(\\alpha
  + \\beta) &amp;= \\cos \\alpha \\sin \\beta + \\sin \\alpha \\cos \\beta. \\\\\r\n\\end{aligned}\\]\r\nI
  can never remember them [...]"
wordpress_id: 781
wordpress_url: http://sputsoft.com/?p=781
date: 2009-09-23 14:13:57.000000000 +02:00
categories:
- mathematics
tags:
- trigonometry
- visualization
comments:
- id: 645
  author: Andrei
  author_email: mileandrei@yahoo.com
  author_url: http://chilloutmath.blogspot.com/
  date: !binary |-
    MjAwOS0wOS0yNCAxMjo0ODoyMiArMDIwMA==
  date_gmt: !binary |-
    MjAwOS0wOS0yNCAxMTo0ODoyMiArMDIwMA==
  content: ! "You can also use this formula:\r\ncos(y-x) = cosy*cosx + siny*sinx\r\nand
    the special values:\r\ncos 0 = sin 1&#47;2pi = 1; cos pi = -1\r\nto derive the
    addition formulas"
- id: 1543
  author: rohit more
  author_email: rohitmore714@gmail.com
  author_url: ''
  date: !binary |-
    MjAxMC0wMS0wOCAxMTozODoxMSArMDEwMA==
  date_gmt: !binary |-
    MjAxMC0wMS0wOCAxMDozODoxMSArMDEwMA==
  content: ! "I have  oll mathematics formulas\r\n                  \r\n                                             thankyou."
- id: 1970
  author: Tim
  author_email: tim@timdumol.com
  author_url: ''
  date: !binary |-
    MjAxMC0wNS0xNCAyMDozOTozNiArMDIwMA==
  date_gmt: !binary |-
    MjAxMC0wNS0xNCAxODozOTozNiArMDIwMA==
  content: ! 'I find that remembering that cos(a +- b) has same functions together
    but opposite signs, and sin(a +- b) has different functions but same signs helps
    a lot:


    cos(a +- b) = cos(a)cos(b) -+ sin(a)sin(b) # cos together, sin together, opposite
    sign


    sin(a +- b) = sin(a)cos(b) +- sin(b)cos(a) # cos with sin, same sign'
---
The addition formulas for sine and cosine look like this:
\[\begin{aligned}
\cos(\alpha + \beta) &amp;= \cos \alpha \cos \beta - \sin \alpha \sin \beta, \\
\sin(\alpha + \beta) &amp;= \cos \alpha \sin \beta + \sin \alpha \cos \beta. \\
\end{aligned}\]
I can never remember them.

<a id="more"></a><a id="more-781"></a>

One solution is of course to look them up in a <a href="http:&#47;&#47;www.math.sfu.ca&#47;~cbm&#47;aands&#47;page_72.htm">book<&#47;a> or search the <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Angle_addition_formula#Angle_sum_and_difference_identities">internet<&#47;a>. What I usually do, though, is derive them using complex arithmetic. Apart from the usual rules known from real-valued arithmetic, all that is needed is knowing \(e^{i \phi} = \cos \phi + i \sin \phi\) and \(i^2 = -1\). Then you get
\[\begin{aligned}
\cos(\alpha + \beta) + i \sin(\alpha + \beta) &amp;= e^{i (\alpha+\beta)} \\
&amp;= e^{i \alpha} e^{i \beta} \\
&amp;= (\cos \alpha + i \sin \alpha)(\cos \beta + i \sin \beta) \\
&amp;= (\cos \alpha \cos \beta - \sin \alpha \sin \beta) + i (\cos \alpha \sin \beta + \sin \alpha \cos \beta).
\end{aligned}\]
By equating the real and imaginary parts you get the answer.

Flicking through <em>Proofs Without Words II<&#47;em> by <a href="http:&#47;&#47;legacy.lclark.edu&#47;~mathsci&#47;nelsen.html">Roger B. Nelsen<&#47;a>, I saw the following wonderful figure. It could be a contender to an easier way to remember the addition formulas.

[caption id="" align="alignnone" width="525" caption="Figure 1"]<a href="http:&#47;&#47;www.flickr.com&#47;photos&#47;janmr&#47;6163380963&#47;" title="Addition formulas for sine and cosine by janmarthedal, on Flickr"><img src="http:&#47;&#47;farm7.static.flickr.com&#47;6166&#47;6163380963_f96a86b1d9_z.jpg" width="525" height="505" alt="Addition formulas for sine and cosine"><&#47;a>[&#47;caption]

(Attributed to the author himself.) It should be pretty much self-explanatory. Apart from using sine and cosine to assign side-lengths to the four relevant right-angled triangles, all you need know is that the sum of the angles in a triangle is equal to two right angles (to realize that the two \(\alpha\)-angles are indeed equal).
<div style="float:right"><a href="&#47;book&#47;link.php?id=pww2"><img src="&#47;book&#47;pww2.jpg" &#47;><&#47;a><&#47;div>
<div style="float:right"><a href="&#47;book&#47;link.php?id=pww1"><img src="&#47;book&#47;pww1.jpg" &#47;><&#47;a><&#47;div>
Both volumes of <em>Proofs Without Words<&#47;em> contain other "visual proofs" of the addition formulas. Some of these can also be found <a href="http:&#47;&#47;mathworld.wolfram.com&#47;TrigonometricAdditionFormulas.html">online<&#47;a>.

How do you remember the addition formulas for sine and cosine?
