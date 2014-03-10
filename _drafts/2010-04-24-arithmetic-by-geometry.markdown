---
layout: post
status: publish
published: true
title: Arithmetic by Geometry
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "Today <a href=\"http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Real_number\">real
  numbers<&#47;a> are most often represented by applying (<a href=\"http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Elementary_function_(differential_algebra)\">elementary<&#47;a>)
  <a href=\"http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Function_(mathematics)\">functions<&#47;a>
  to (<a href=\"http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Decimal\">decimal<&#47;a>)
  <a href=\"http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Integer\">integers<&#47;a>.
  Throughout history, though, arithmetic and propositions involving (positive) real
  numbers were often considered from a purely geometrical point of view. Real numbers
  were identified by the length of some line segment and, e.g., the product of two
  numbers was identified by the area of a rectangle with side-lengths equal to the
  two numbers. This made sense from a physical&#47;applied point of view, but it had
  certain shortcomings.\r\n\r\n"
wordpress_id: 1267
wordpress_url: http://sputsoft.com/?p=1267
date: 2010-04-24 17:29:08.000000000 +02:00
categories:
- mathematics
tags:
- arithmetic
- geometry
- visualization
comments: []
---
Today <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Real_number">real numbers<&#47;a> are most often represented by applying (<a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Elementary_function_(differential_algebra)">elementary<&#47;a>) <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Function_(mathematics)">functions<&#47;a> to (<a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Decimal">decimal<&#47;a>) <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Integer">integers<&#47;a>. Throughout history, though, arithmetic and propositions involving (positive) real numbers were often considered from a purely geometrical point of view. Real numbers were identified by the length of some line segment and, e.g., the product of two numbers was identified by the area of a rectangle with side-lengths equal to the two numbers. This made sense from a physical&#47;applied point of view, but it had certain shortcomings.

<a id="more"></a><a id="more-1267"></a>

<div style="float:right"><a href="&#47;book&#47;link.php?id=hawking"><img src="&#47;book&#47;hawking.jpg" &#47;><&#47;a><&#47;div>
According to <a href="http:&#47;&#47;www.hawking.org.uk">Hawking<&#47;a>'s <a href="&#47;book&#47;link.php?id=hawking">God Created the Integers<&#47;a>, this was changed by <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Rene_Descartes">Ren&eacute; Descartes<&#47;a> in the seventeenth century. He treated <em>any<&#47;em> (positive) real number as the length of a line segment, also products, square roots, and so on. This article considers some of the constructions he considered in <em>Problems the Construction of Which Requires Only Straight Lines and Circles<&#47;em> (included and commented in Hawking's <a href="&#47;book&#47;link.php?id=hawking">book<&#47;a>), namely multiplication, division and root extraction.

<h2>Multiplication<&#47;h2>

Let A be a point in the <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Euclidean_geometry">Euclidean<&#47;a> <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Plane_(geometry)">plane<&#47;a> and let two non-parallel lines have one end-point at A and otherwise extend infinitely. Place now the points B and D on one of the lines and C and E on the other, with the restriction that the lines BC and DE should be parallel. See Figure&nbsp;1.

[caption id="" align="alignnone" width="590" caption="Figure 1. Multiplication by geometry."]<a href="http:&#47;&#47;www.flickr.com&#47;photos&#47;janmr&#47;6163912466&#47;" title="Multiplication by geometry by janmarthedal, on Flickr"><img src="http:&#47;&#47;farm7.static.flickr.com&#47;6153&#47;6163912466_5039c82020_z.jpg" width="590" height="310" alt="Multiplication by geometry"><&#47;a>[&#47;caption]
We see that the triangles ABC and ADE are <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Similarity_(geometry)">similar<&#47;a> and this implies that

<div style="float:right">(1)<&#47;div>
\[
\frac{|AD|}{|AB|} = \frac{|AE|}{|AC|}
\]

If we now place point B such that \(|AB|=1\), point C such that \(|AC|=x\), point D such that \(|AD|=y\), and point E such that BC and DE are parallel, we have

\[
z = |AE| = \frac{|AC| |AD|}{|AB|} = x y.
\]

<h2>Division<&#47;h2>

Division can be performed using the same geometrical construction as for multiplication: Place point B such that \(|AB|=1\), point D such that \(|AD|=y\), point E such that \(|AE|=z\), and point C such that BC and DE are parallel. Then we have

\[
x = |AC| = \frac{|AE| |AB|}{|AD|} = \frac{z}{y}.
\]

<h2>Square Root<&#47;h2>

Let the line segment CD have length \(x\) and extend the line from D to a point A such that \(|AD|=1\). Draw a <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Semicircle">semicircle<&#47;a> with AC as diameter. Now draw a line through D which is perpendicular to AC and call the intersection between this line and the circle point B. The length of the line segment BD is now equal to the square root of \(x\). See Figure&nbsp;2.

[caption id="" align="alignnone" width="512" caption="Figure 2. Square root by geometry."]<a href="http:&#47;&#47;www.flickr.com&#47;photos&#47;janmr&#47;6163379419&#47;" title="Square root by geometry by janmarthedal, on Flickr"><img src="http:&#47;&#47;farm7.static.flickr.com&#47;6158&#47;6163379419_b5f0ece78e_z.jpg" width="512" height="264" alt="Square root by geometry"><&#47;a>[&#47;caption]
Why is this so? It can be shown by using the <a href="&#47;blog&#47;2010&#47;02&#47;visualizing-the-pythagorean-theorem.html">Pythagorean theorem<&#47;a> and a bit of algebra, but it is most easily seen by considering similar triangles again. First, we argue that the angle at B in the triangle ABC in Figure&nbsp;3 is a right angle. This is so because the two triangles ABM and BCM are isosceles <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Triangle">triangles<&#47;a> and the sum of the angles in the triangle ABC is thus \(2\alpha+2\beta=\pi\), implying that \(\alpha+\beta\) is equal to a right angle.

[caption id="" align="alignnone" width="512" caption="Figure 3. Any triangle inscribed in a semicircle has a right angle."]<a href="http:&#47;&#47;www.flickr.com&#47;photos&#47;janmr&#47;6163379655&#47;" title="Any triangle inscribed in a semicircle has a right angle by janmarthedal, on Flickr"><img src="http:&#47;&#47;farm7.static.flickr.com&#47;6166&#47;6163379655_04341053f8_z.jpg" width="512" height="264" alt="Any triangle inscribed in a semicircle has a right angle"><&#47;a>[&#47;caption]
Consider Figure&nbsp;4. It is now easy to see that the triangles ADB, BDC, and ABC are all similar. For instance, ABC and BDC both have a right angle and share the angle at C, so the remaining angles must be equal.

[caption id="" align="alignnone" width="512" caption="Figure 4. Three similar triangles related to a semicircle."]<a href="http:&#47;&#47;www.flickr.com&#47;photos&#47;janmr&#47;6163380121&#47;" title="Three similar triangles related to a semicircle by janmarthedal, on Flickr"><img src="http:&#47;&#47;farm7.static.flickr.com&#47;6157&#47;6163380121_599d4a0429_z.jpg" width="512" height="264" alt="Three similar triangles related to a semicircle"><&#47;a>[&#47;caption]
We now have

\[
\frac{|CD|}{|BD|} = \frac{|BD|}{|AD|}
\]

and if we set \(|AD|=1\) and \(|CD|=x\) we get

\[
x = |CD| = |BD|^2 \quad \Rightarrow \quad |BD| = \sqrt{x}.
\]

<h2>Concluding Remarks<&#47;h2>

[caption id="" align="alignright" width="336" caption="Figure 5. Signed multiplication."]<a href="http:&#47;&#47;www.flickr.com&#47;photos&#47;janmr&#47;6163380463&#47;" title="Signed multiplication by geometry by janmarthedal, on Flickr"><img src="http:&#47;&#47;farm7.static.flickr.com&#47;6171&#47;6163380463_0922a98d18.jpg" width="336" height="248" alt="Signed multiplication by geometry"><&#47;a>[&#47;caption]Addition and subtraction of numbers geometrically is quite trivial. Simply lay out the numbers&#47;line segment one after another along an infinite reference line, taking signs into consideration according to some positive direction.

It is interesting to note how addition and subtraction is one-dimensional in this geometrical sense, while multiplication, division, and square root are two-dimensional. Furthermore, these three latter operations also need the notion of <em>unit length<&#47;em>.

Figure&nbsp;5 shows how even signed real numbers can be multiplied geometrically. Let two non-parallel and (infinitely long) lines meet at point A and let A split each line into a positive and a negative part. Point B, located at unit length from A, naturally has to be in positive part. This construction now handles the signs of multiplication quite nicely (for instance, the product of two negative numbers is seen to be positive).

It should be noted that Descartes was not the first to show these constructions. The construction of the square root of some number was also mentioned in, e.g., <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Euclid">Euclid<&#47;a>'s <a href="http:&#47;&#47;aleph0.clarku.edu&#47;~djoyce&#47;java&#47;elements&#47;elements.html">Elements<&#47;a>, <a href="http:&#47;&#47;aleph0.clarku.edu&#47;~djoyce&#47;java&#47;elements&#47;bookVI&#47;bookVI.html">Book VI<&#47;a>, <a href="http:&#47;&#47;aleph0.clarku.edu&#47;~djoyce&#47;java&#47;elements&#47;bookVI&#47;propVI13.html">Proposition 13<&#47;a>. However, he made essential steps to join geometry with algebra and analysis into <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Analytical_geometry">analytical geometry<&#47;a>.

<div style="clear:both"><&#47;div>
