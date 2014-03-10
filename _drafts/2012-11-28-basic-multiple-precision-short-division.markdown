---
layout: post
status: publish
published: true
title: Basic Multiple-Precision Short Division
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "Let us consider short division, by which we mean a multiple-digit number
  \\(u = (u_{m-1} \\ldots u_1 u_0)_b\\) divided by a single digit \\(v\\) (see, e.g.,
  <a href=\"&#47;blog&#47;2011&#47;10&#47;multiple-precision-number-representation.html\">post
  on number representation<&#47;a>). We will assume \\(m \\geq 1\\), \\(u_{m-1} \\neq
  0\\) and \\(0 < v < b\\).\r\n\r\nWe are interested in a quotient \\(q = \\lfloor
  u&#47;v \\rfloor\\) and a remainder \\(r\\) such that \\(u = q v + r\\) with \\(0
  \\leq r < v\\). Using that \\(b^{m-1} \\leq u < b^m\\) and \\(0 < v < b\\) we can
  deduce that \\(b^{m-2} < q < b^m\\) which means that \\(q\\) can be represented
  using \\(m-1\\) or \\(m\\) digits: \\(q = (q_{m-1} \\ldots q_1 q_0)_b\\) (we may
  have \\(q_{m-1} = 0\\) in which case \\(q_{m-2} \\neq 0\\)).\r\n\r\n"
wordpress_id: 2669
wordpress_url: http://kanooth.com/blog/?p=2669
date: 2012-11-28 13:34:47.000000000 +01:00
categories:
- programming
tags:
- algorithms
- multiple-precision
- numbers project
- basic theory
comments:
- id: 2637
  author: Hosting and Status for the Numbers Project | Kanooth
  author_email: ''
  author_url: http://kanooth.com/blog/2011/09/hosting-and-status-for-the-numbers-project.html
  date: !binary |-
    MjAxMi0xMS0yOCAxMzo0MDowMyArMDEwMA==
  date_gmt: !binary |-
    MjAxMi0xMS0yOCAxMjo0MDowMyArMDEwMA==
  content: ! '[...] Basic Multiple-Precision Division (update 2012-11-28: Short division)
    [...]'
---
Let us consider short division, by which we mean a multiple-digit number \(u = (u_{m-1} \ldots u_1 u_0)_b\) divided by a single digit \(v\) (see, e.g., <a href="&#47;blog&#47;2011&#47;10&#47;multiple-precision-number-representation.html">post on number representation<&#47;a>). We will assume \(m \geq 1\), \(u_{m-1} \neq 0\) and \(0 < v < b\).

We are interested in a quotient \(q = \lfloor u&#47;v \rfloor\) and a remainder \(r\) such that \(u = q v + r\) with \(0 \leq r < v\). Using that \(b^{m-1} \leq u < b^m\) and \(0 < v < b\) we can deduce that \(b^{m-2} < q < b^m\) which means that \(q\) can be represented using \(m-1\) or \(m\) digits: \(q = (q_{m-1} \ldots q_1 q_0)_b\) (we may have \(q_{m-1} = 0\) in which case \(q_{m-2} \neq 0\)).

<a id="more"></a><a id="more-2669"></a>

We now have the following straightforward algorithm:

<strong>Algorithm S<&#47;strong>. Given \(u = (u_{m-1} \ldots u_1 u_0)_b\) and \(0 < v < b\) with \(m \geq 1\) and \(u_{m-1} \neq 0\), this algorithm computes the quotient \(q = (q_{m-1} \ldots q_1 q_0)_b = \lfloor u&#47;v \rfloor\) (we may have \(q_{m-1} = 0\) in which case \(q_{m-2} \neq 0\) if \(m > 1\)) and the remainder \(r_0\) such that \(u = q v + r_0\), \(0 \leq r_0 < v\).

<ul>
<li><strong>S1<&#47;strong>. Set \(r_m \leftarrow 0\), \(k \leftarrow m-1\).<&#47;li>
<li><strong>S2<&#47;strong>. Set \(q_k \leftarrow \lfloor (r_{k+1} b + u_k)&#47;v \rfloor\), \(r_k \leftarrow (r_{k+1} b + u_k) \hbox{ mod } v\).<&#47;li>
<li><strong>S3<&#47;strong>. If \(k=0\) then exit. Otherwise set \(k \leftarrow k-1\) and go to step&nbsp;<strong>S2<&#47;strong>.<&#47;li>
<&#47;ul>

By the definition of integer division and modulus, the quantities in step <strong>S2<&#47;strong> imply \(r_{k+1} b + u_k = q_k v + r_k\) for \(k = 0, 1, \ldots, m-1\). Using this, we can show the correctness of the algorithm:
\[
\begin{align}
u &= \sum_{k=0}^{m-1} u_k b^k = \sum_{k=0}^{m-1} (q_k v + r_k - r_{k+1} b) b^k = \sum_{k=0}^{m-1} q_k b^k v + \sum_{k=0}^{m-1} r_k b^k - \sum_{k=1}^m r_k b^k \\
  &= q v + r_0 - r_m b^m = q v + r_0
\end{align}
\]
since \(r_m = 0\). It is clear from the definition of \(r_k\) that \(0 \leq r_k < v\) for \(k = 0, 1, \ldots, m\). Considering now the definition of \(q_k\) we see that since \(r_{k+1} b + u_k \leq (v-1) b + b-1 = b v - 1\) we will have \(0 \leq q_k < b\) for \(k = 0, 1, \ldots, m-1\).

Note two important things: During the course of the algorithm, we only need to keep track of one \(r\)-value, not one for each \(k\) (it just made the analysis easier). Note also that each entry of \(u\) can be overwritten with the coefficients&#47;digits of \(q\), possibly saving some storage.
