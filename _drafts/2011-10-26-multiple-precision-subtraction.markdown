---
layout: post
status: publish
published: true
title: Multiple-Precision Subtraction
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "We now turn to multiple-precision subtraction for non-negative integers.
  The algorithm is very similar to that of <a href=\"&#47;blog&#47;2011&#47;10&#47;multiple-precision-addition.html\">multiple-precision
  addition<&#47;a>, but some minor differences make it worth while considering subtraction
  separately.\r\n\r\nWe consider two <span class=\"mthi\">n<&#47;span>-digit numbers,
  \\(u=(u_{n-1} \\ldots u_1 u_0)_b\\) and \\(v=(v_{n-1} \\ldots v_1 v_0)_b\\), with
  \\(n \\geq 1\\) (see a <a href=\"&#47;blog&#47;2011&#47;10&#47;multiple-precision-number-representation.html\">previous
  post<&#47;a> on the number notation). We wish to compute an <span class=\"mthi\">n<&#47;span>-digit
  result \\(w=(w_{n-1} \\ldots w_1 w_0)_b\\) such that\r\n\\[\r\nw = (u - v - k_0)
  \\;\\mbox{mod}\\; b^n\r\n\\]\r\nwhere \\(k_0\\) is some initial <a href=\"http:&#47;&#47;mathworld.wolfram.com&#47;Borrow.html\">borrow<&#47;a>,
  \\(0 \\leq k_0 \\leq 1\\). Furthermore, a final borrow \\(k_n\\) will indicate whether
  \\(u < v+k_0\\).\r\n"
wordpress_id: 2538
wordpress_url: http://kanooth.com/blog/?p=2538
date: 2011-10-26 11:00:10.000000000 +02:00
categories:
- programming
tags:
- algorithms
- multiple-precision
- numbers project
- basic theory
comments: []
---
We now turn to multiple-precision subtraction for non-negative integers. The algorithm is very similar to that of <a href="&#47;blog&#47;2011&#47;10&#47;multiple-precision-addition.html">multiple-precision addition<&#47;a>, but some minor differences make it worth while considering subtraction separately.

We consider two <span class="mthi">n<&#47;span>-digit numbers, \(u=(u_{n-1} \ldots u_1 u_0)_b\) and \(v=(v_{n-1} \ldots v_1 v_0)_b\), with \(n \geq 1\) (see a <a href="&#47;blog&#47;2011&#47;10&#47;multiple-precision-number-representation.html">previous post<&#47;a> on the number notation). We wish to compute an <span class="mthi">n<&#47;span>-digit result \(w=(w_{n-1} \ldots w_1 w_0)_b\) such that
\[
w = (u - v - k_0) \;\mbox{mod}\; b^n
\]
where \(k_0\) is some initial <a href="http:&#47;&#47;mathworld.wolfram.com&#47;Borrow.html">borrow<&#47;a>, \(0 \leq k_0 \leq 1\). Furthermore, a final borrow \(k_n\) will indicate whether \(u < v+k_0\).
<a id="more"></a><a id="more-2538"></a>
Let us first introduce a notation which <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~uno&#47;">Donald E. Knuth<&#47;a> refers to as <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Iverson_bracket">Iverson's convention<&#47;a>: \([P]\) has value <span class="mthn">1<&#47;span> if <span class="mthi">P<&#47;span> is true and <span class="mthn">0<&#47;span> otherwise.

We now have the algorithm:
\[
\begin{aligned}
w_i     &\leftarrow (u_i - v_i - k_i) \;\mbox{mod}\; b, \\ 
k_{i+1} &\leftarrow [u_i < v_i + k_i],
\end{aligned}
\]
for \(i = 0, 1, \ldots, n-1\). This is really just a formalization of the familiar pencil-and-paper method, but let us show that it does the right thing.

Note first that \(0 \leq k_i \leq 1\) for \(i = 0, 1, \ldots, n-1\). This is a consequence of the assumption \(0 \leq k_0 \leq 1\) for the initial borrow and the range of the \([\cdot]\) operator. We next establish the relation
\[
-\left\lfloor \frac{u_i-v_i-k_i}{b} \right\rfloor = [u_i < v_i + k_i],
\]
which holds since we have \(-b = 0-(b-1)-1 \leq u_i-v_i-k_i \leq (b-1)-0-0 = b-1\). We now observe that
\[
\begin{aligned}
u_i-v_i-k_i &= (u_i - v_i - k_i) \;\mbox{mod}\; b + \left\lfloor \frac{u_i-v_i-k_i}{b} \right\rfloor b \\
            &= (u_i - v_i - k_i) \;\mbox{mod}\; b - [u_i < v_i + k_i] b \\
            &= w_i - k_{i+1} b.
\end{aligned}
\]
We finally have
\[
\begin{aligned}
u - v &= \sum_{i=0}^{n-1} (u_i-v_i) b^i = \sum_{i=0}^{n-1} (u_i-v_i-k_i) b^i + \sum_{i=0}^{n-1} k_i b^i \\
      &= \sum_{i=0}^{n-1} (w_i-k_{i+1} b) b^i + \sum_{i=0}^{n-1} k_i b^i = \sum_{i=0}^{n-1} w_i b^i - \sum_{i=0}^{n-1} k_{i+1} b^{i+1} + \sum_{i=0}^{n-1} k_i b^i \\
      &= w - k_n b^n + k_0,
\end{aligned}
\]
so \(u-v-k_0 = w-k_n b^n\). Since \(0 \leq w \leq b^n-1\) we have now established
\[
w = (u - v - k_0) \;\mbox{mod}\; b^n,
\]
and \(k_n\) indicates whether \(u < v+k_0\).
