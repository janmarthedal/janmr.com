---
layout: post
status: publish
published: true
title: Multiple-Precision Addition
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "This post will cover a basic addition algorithm for multiple-precision
  non-negative integers. The algorithm is based upon that presented in Section 4.3.1,
  <em>The Classical Algorithms</em>, of <a href=\"http://www-cs-faculty.stanford.edu/~knuth/taocp.html\">The
  Art of Computer Programming</a>, Volume 2, by <a href=\"http://www-cs-faculty.stanford.edu/~knuth/\">Donald
  E. Knuth</a>. The notation and bounds used in this post were presented in a <a href=\"/blog/2011/10/multiple-precision-number-representation.html\">previous
  post</a>.\r\n\r\nWe consider adding two <span class=\"mthi\">n</span>-digit numbers
  with \\(n \\geq 1\\), \\(u=(u_{n-1} \\ldots u_1 u_0)_b\\) and \\(v=(v_{n-1} \\ldots
  v_1 v_0)_b\\)."
wordpress_id: 2500
wordpress_url: http://kanooth.com/blog/?p=2500
date: 2011-10-12 12:27:47.000000000 +02:00
categories:
- programming
tags:
- algorithms
- multiple-precision
- numbers project
- basic theory
comments:
- id: 2522
  author: venkatesh
  author_email: venkatesh4313@gmail.com
  author_url: ''
  date: !binary |-
    MjAxMi0wMi0wNyAxNTo0MjozOCArMDEwMA==
  date_gmt: !binary |-
    MjAxMi0wMi0wNyAxNDo0MjozOCArMDEwMA==
  content: ! "Please  tell  me  multi precision  adder  program  in  either  c  or
    \ vhdl  or  verilog .\r\n               Thanking you ."
---
<div style="float:right"><a href="&#47;book&#47;link.php?id=taocp2"><img src="&#47;book&#47;taocp2.jpg" &#47;><&#47;a><&#47;div>
This post will cover a basic addition algorithm for multiple-precision non-negative integers. The algorithm is based upon that presented in Section&nbsp;4.3.1, <em>The Classical Algorithms<&#47;em>, of <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;taocp.html">The Art of Computer Programming<&#47;a>, Volume&nbsp;2, by <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;">Donald E. Knuth<&#47;a>. The notation and bounds used in this post were presented in a <a href="&#47;blog&#47;2011&#47;10&#47;multiple-precision-number-representation.html">previous post<&#47;a>.

We consider adding two <span class="mthi">n<&#47;span>-digit numbers with \(n \geq 1\), \(u=(u_{n-1} \ldots u_1 u_0)_b\) and \(v=(v_{n-1} \ldots v_1 v_0)_b\). <a id="more"></a><a id="more-2500"></a>Since \(b^{n-1} \leq u, v \leq b^n - 1\) we have \(2 b^{n-1} \leq u+v \leq 2 b^n - 2\) which, when using the fact that \(b \geq 2\), leads to \(b^{n-1} \leq u+v \leq b^{n+1} - 1\) (note how a tighter bound of the form \(b^p \leq u+v \leq b^q - 1\) is not possible).

This means that \(u+v\) can be represented using \(n\) or \(n+1\) digits, so we set \(w=(w_n \ldots w_1 w_0)_b\).

Assuming \(k_0\) is set to some initial value (more on this below) we now have the following algorithm:
\[
\begin{aligned}
w_i     &amp;\leftarrow (u_i + v_i + k_i) \;\mbox{mod}\; b \\
k_{i+1} &amp;\leftarrow \lfloor (u_i + v_i + k_i)&#47;b \rfloor
\end{aligned}
\]
for \(i = 0, 1, \ldots, n-1\), and finally \(w_n \leftarrow k_n\).

The algorithm sets the digits of <span class="mthi">w<&#47;span> such that \(w = u+v+k_0\). This can be seen by first observing that \(p = p \;\mbox{mod}\; b + \lfloor p&#47;b \rfloor b\) for any integer <span class="mthi">p<&#47;span>. Using this relation on the variables set during the algorithm, we have
\[
u_i + v_i + k_i = w_i + k_{i+1} b
\]
for \(i = 0, 1, \ldots, n-1\). We now have
\[
\begin{aligned}
u+v &amp;= \sum_{i=0}^{n-1} (u_i+v_i) b^i = \sum_{i=0}^{n-1} (u_i+v_i+k_i) b^i - \sum_{i=0}^{n-1} k_i b^i \\
    &amp;= \sum_{i=0}^{n-1} (w_i+k_{i+1} b) b^i - \sum_{i=0}^{n-1} k_i b^i = \sum_{i=0}^{n-1} w_i b^i + k_n b^n - k_0,
\end{aligned}
\]
showing that \(w=u+v+k_0\).

It is clear that each resulting digits of <span class="mthi">w<&#47;span> satisfies \(0 \leq w_i \leq b-1\) for \(i = 0, \ldots, n-1\), as it should. The value of \(w_n\), though, depends on \(k_n\).

Assume that \(0 \leq k_i \leq 1\) for some \(i=0, \ldots, n-1\). Since \(u_i+v_i+k_i \leq b-1+b-1+1 = 2b-1\) we see that \(k_{i+1} = \lfloor (u_i + v_i + k_i)&#47;b \rfloor \leq 1\). So if we have \(0 \leq k_0 \leq 1\) as initial value for the algorithm we have, by induction, that \(0 \leq k_i \leq 1\) for all \(i=0, \ldots, n\).

This shows how (not surprisingly) \(k_0\) can be seen as an "initial carry" and how each \(k_{i+1}\) is <span class="mthn">0<&#47;span> or <span class="mthn">1<&#47;span>, depending on whether a carry was produced from the <span class="mthi">i<&#47;span>th digit addition.
