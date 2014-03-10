---
layout: post
status: publish
published: true
title: Fractions and Circles
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "<div style=\"float:right\"><a href=\"&#47;book&#47;link.php?id=conway-guy\"><img
  src=\"&#47;book&#47;conway-guy.jpg\" &#47;><&#47;a><&#47;div>\r\nFractions produced
  by mediants have some very interesting properties. We saw some of them in connection
  with the <a href=\"&#47;blog&#47;2009&#47;12&#47;the-stern-brocot-tree-of-fractions.html\">Stern-Brocot
  tree<&#47;a>. This articles explores a more curious property, relating fractions
  to circles in the plane. It was <a href=\"http:&#47;&#47;www.jstor.org&#47;pss&#47;2302799\">discovered<&#47;a>
  in 1938 by <a href=\"http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Lester_R._Ford\">Lester
  R. Ford<&#47;a> and is also mentioned in Conway and Guy's <a href=\"http:&#47;&#47;books.google.com&#47;books?id=0--3rcO7dMYC&amp;printsec=frontcover&amp;source=gbs_ge_summary_r&amp;cad=0#v=onepage&amp;q&amp;f=false\">The
  Book of Numbers<&#47;a>.\r\n\r\n"
wordpress_id: 1147
wordpress_url: http://sputsoft.com/?p=1147
date: 2010-02-06 11:45:35.000000000 +01:00
categories:
- mathematics
tags:
- Stern-Brocot tree
- fractions
- mediant
- geometry
comments:
- id: 1789
  author: Dan
  author_email: dan@oneoffmail.com
  author_url: ''
  date: !binary |-
    MjAxMC0wMi0xNyAxNTozOTo0OCArMDEwMA==
  date_gmt: !binary |-
    MjAxMC0wMi0xNyAxNDozOTo0OSArMDEwMA==
  content: This is pretty neat - looks fractal-ish. Did you draw these graphics yourself?
    They look quite professional ...
- id: 1790
  author: Jan Marthedal Rasmussen
  author_email: jmr@kanooth.com
  author_url: http://kanooth.com
  date: !binary |-
    MjAxMC0wMi0xNyAyMTo1Nzo0MCArMDEwMA==
  date_gmt: !binary |-
    MjAxMC0wMi0xNyAyMDo1Nzo0MCArMDEwMA==
  content: ! '@Dan: Yes, the self-similarities do indeed make you think of fractals.
    I used the <a href="http:&#47;&#47;cairographics.org" rel="nofollow">cairo graphics
    library<&#47;a> for the figures - with it you can construct figures programatically
    and then save them as, e.g., png or svg.'
- id: 2077
  author: ! 'Book Review: The Book of Numbers | Kanooth'
  author_email: ''
  author_url: http://kanooth.com/blog/2010/05/book-review-the-book-of-numbers.html
  date: !binary |-
    MjAxMC0wNi0xOCAwNDozNDoyNyArMDIwMA==
  date_gmt: !binary |-
    MjAxMC0wNi0xOCAwMjozNDoyNyArMDIwMA==
  content: ! '[...] Further Fruitfulness of Fractions. Some topics are Farey fractions
    and Ford circles, Euler&#8217;s totient numbers, decimal digit cycles, Pythagorean
    fractions, continued [...]'
---
<div style="float:right"><a href="&#47;book&#47;link.php?id=conway-guy"><img src="&#47;book&#47;conway-guy.jpg" &#47;><&#47;a><&#47;div>
Fractions produced by mediants have some very interesting properties. We saw some of them in connection with the <a href="&#47;blog&#47;2009&#47;12&#47;the-stern-brocot-tree-of-fractions.html">Stern-Brocot tree<&#47;a>. This articles explores a more curious property, relating fractions to circles in the plane. It was <a href="http:&#47;&#47;www.jstor.org&#47;pss&#47;2302799">discovered<&#47;a> in 1938 by <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Lester_R._Ford">Lester R. Ford<&#47;a> and is also mentioned in Conway and Guy's <a href="http:&#47;&#47;books.google.com&#47;books?id=0--3rcO7dMYC&amp;printsec=frontcover&amp;source=gbs_ge_summary_r&amp;cad=0#v=onepage&amp;q&amp;f=false">The Book of Numbers<&#47;a>.

<a id="more"></a><a id="more-1147"></a>

Let us consider a way to construct fractions. We always start out with the sequence

<div style="float:right">(1)<&#47;div>
\[
\frac{0}{1}, \frac{1}{0}
\]

and then repeatedly obtain a new sequence from an existing one. Given a sequence, we pick two consequtive fractions and insert their mediant between them. Recall that the mediant of \(\frac{m_1}{n_1}\) and \(\frac{m_2}{n_2}\) is \(\frac{m_1+m_2}{n_1+n_2}\). We will call sequences created in this manner <em>mediant sequences<&#47;em>.

So the first (and only) mediant sequence possible from the initial sequence (1) is

\[
\frac{0}{1}, \left<\frac{1}{1}\right>, \frac{1}{0}
\]

where the new fraction is surrounded by angle brackets. From this point on, we have multiple choices each time we produce a new mediant sequence. An example of the following sequences could be

\[
\frac{0}{1}, \left<\frac{1}{2}\right>, \frac{1}{1}, \frac{1}{0}
\]

\[
\frac{0}{1}, \frac{1}{2}, \frac{1}{1}, \left<\frac{2}{1}\right>, \frac{1}{0}
\]

\[
\frac{0}{1}, \left<\frac{1}{3}\right>, \frac{1}{2}, \frac{1}{1}, \frac{2}{1}, \frac{1}{0}
\]

An essential property, in regard to this article, is this: For all mediant sequences, any fraction \(\frac{m_1}{n_1}\) followed by \(\frac{m_2}{n_2}\) fulfills \(n_1 m_2 - m_1 n_2 = 1\). This is easily shown by induction by considering the initial mediant sequence&nbsp;(1) and that if \(n_1 m_2 - m_1 n_2 = 1\) for a subsequence

\[
\ldots, \frac{m_1}{n_1}, \frac{m_2}{n_2}, \ldots
\]

then it also holds after inserting the mediant

\[
\ldots, \frac{m_1}{n_1}, \frac{m_1+m_2}{n_1+n_2}, \frac{m_2}{n_2}, \ldots
\]

(two cases to check).

Note how this property implies that the fractions in any mediant sequence are ordered by size. But the most important use of this property will appear shortly.

We now do the following in a <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Cartesian_coordinate_system">Cartesian coordinate system<&#47;a>: For each fraction \(\frac{m}{n}\) in a given mediant sequence, draw a circle centered at \(\left(\frac{m}{n}, \frac{1}{2 n^2}\right)\) with radius \(\frac{1}{2 n^2}\). An example can be seen in Figure&nbsp;1.

[caption id="" align="alignnone" width="717" caption="Figure 1"]<a href="http:&#47;&#47;www.flickr.com&#47;photos&#47;janmr&#47;6165990848&#47;" title="Ford circles 1 by janmarthedal, on Flickr"><img src="http:&#47;&#47;farm7.static.flickr.com&#47;6159&#47;6165990848_af3f0c46ff_b.jpg" width="717" height="246" alt="Ford circles 1"><&#47;a>[&#47;caption]
By construction, the x-axis is obviously a tangent to all such circles. Furthermore, two circles, corresponding to two fractions \(\frac{m_1}{n_1}\) and \(\frac{m_2}{n_2}\), touch at exactly one point if and only if \(| n_1 m_2 - m_1 n_2 | = 1\). This is shown by an application of the <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Pythagorean_theorem">Pythagorean Theorem<&#47;a>:

\[
\begin{aligned}
\left( \frac{m_2}{n_2} - \frac{m_1}{n_1} \right)^2
+ \left( \frac{1}{2 n_2^2} - \frac{1}{2 n_1^2} \right)^2
&= \left( \frac{1}{2 n_2^2} + \frac{1}{2 n_1^2} \right)^2 \quad \Leftrightarrow \\
\left( \frac{n_1 m_2 - m_1 n_2}{n_1 n_2} \right)^2 &= \frac{1}{n_1^2 n_2^2} \quad \Leftrightarrow \\
| n_1 m_2 - m_1 n_2 | &= 1.
\end{aligned}
\]

This is exactly the property that consequtive fractions in any mediant sequence fulfills.

Zooming into the dashed region in Figure&nbsp;1 leads to Figure&nbsp;2.

[caption id="" align="alignnone" width="717" caption="Figure 2"]<a href="http:&#47;&#47;www.flickr.com&#47;photos&#47;janmr&#47;6165990776&#47;" title="Ford circles 2 by janmarthedal, on Flickr"><img src="http:&#47;&#47;farm7.static.flickr.com&#47;6158&#47;6165990776_159b93645e_b.jpg" width="717" height="327" alt="Ford circles 2"><&#47;a>[&#47;caption]
So given a mediant sequence, we can draw such circles for each fraction in the sequence, except for the final \(\frac{1}{0}\) (which is just an auxillary element). The circles with diameter \(1\) correspond to the seqeuence \(\frac{0}{1}, \frac{1}{1}, \frac{2}{1}, \ldots\) and will all touch each other. See Figure&nbsp;1. Any circle with diameter less than \(1\) will touch exactly two larger circles, namely the two from which it was created when considering their mediant sequence representatives. To be more specific, if we went from a mediant sequence

\[
\ldots, \frac{m_1}{n_1}, \frac{m_2}{n_2}, \ldots
\]

with \(n_2 \neq 0\) to

\[
\ldots, \frac{m_1}{n_1}, \frac{m_1+m_2}{n_1+n_2}, \frac{m_2}{n_2}, \ldots,
\]

then the three circles corresponding to the fractions of this second subsequence will all touch, and the middle one will obviously be the smallest (has the largest denominator). See, e.g., the fractions \(\frac{1}{2}\), \(\frac{3}{5}\), \(\frac{2}{3}\) in Figure&nbsp;2.

Zooming in once again we get Figure&nbsp;3.

[caption id="" align="alignnone" width="717" caption="Figure 3"]<a href="http:&#47;&#47;www.flickr.com&#47;photos&#47;janmr&#47;6165990684&#47;" title="Ford circles 3 by janmarthedal, on Flickr"><img src="http:&#47;&#47;farm7.static.flickr.com&#47;6168&#47;6165990684_7b6d00267f_b.jpg" width="717" height="370" alt="Ford circles 3"><&#47;a>[&#47;caption]
Note the many <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Self-similarity">self-similarities<&#47;a>.
