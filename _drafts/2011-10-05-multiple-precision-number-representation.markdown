---
layout: post
status: publish
published: true
title: Multiple-Precision Number Representation
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "Let us consider a common way to represent non-negative integers. An integer
  \\(u \\geq 0\\) will be represented in radix \\(b \\geq 2\\) using the notation\r\n\\[\r\nu
  = (u_{n-1} \\ldots u_1 u_0)_b = \\sum_{k=0}^{n-1} u_k b^k, \\quad 0 \\leq u_k \\leq
  b-1.\r\n\\]\r\n\r\n"
wordpress_id: 2475
wordpress_url: http://kanooth.com/blog/?p=2475
date: 2011-10-05 10:23:53.000000000 +02:00
categories:
- programming
tags:
- multiple-precision
- numbers project
- basic theory
comments:
- id: 2636
  author: Basic Multiple-Precision Short Division | Kanooth
  author_email: ''
  author_url: http://kanooth.com/blog/2012/11/basic-multiple-precision-short-division.html
  date: !binary |-
    MjAxMi0xMS0yOCAxMzozNDo0OSArMDEwMA==
  date_gmt: !binary |-
    MjAxMi0xMS0yOCAxMjozNDo0OSArMDEwMA==
  content: ! '[...] number (u = (u_{m-1} ldots u_1 u_0)_b) divided by a single digit
    (v) (see, e.g., post on number representation). We will assume (m geq 1), (u_{m-1}
    neq 0) and (0 < v < [...]'
---
Let us consider a common way to represent non-negative integers. An integer \(u \geq 0\) will be represented in radix \(b \geq 2\) using the notation
\[
u = (u_{n-1} \ldots u_1 u_0)_b = \sum_{k=0}^{n-1} u_k b^k, \quad 0 \leq u_k \leq b-1.
\]

<a id="more"></a><a id="more-2475"></a>

We will call <span class="mthi">u<&#47;span> an <span class="mthi">n<&#47;span>-digit number and \(u_0, u_1, \ldots\) its digits. Zero will be represented with no digits, \(0 = ()_b\). Observe that
\[
u \leq ((b-1) \ldots (b-1) (b-1))_b = \sum_{k=0}^{n-1} (b-1) b^k = b^n - 1
\]
for any \(n \geq 0\).

Unless stated otherwise we will always have that the most-significant digit is non-zero, that is, \(u_{n-1} \neq 0\) for \(n \geq 1\). This assumption has some important consequences. First, that
\[
u \geq (1 0 \ldots 0)_b = b^{n-1}
\]
for any \(n \geq 1\). Secondly, that each non-negative integer has a unique representation, that is, to each number \(u \geq 0\) and radix \(b \geq 2\) corresponds exactly one \(n \geq 0\) and digits \(u_0, u_1, \ldots, u_{n-1}\) such that \(u = (u_{n-1} \ldots u_1 u_0)_b\). Thirdly, that
\[
b^{n-1} \leq u < b^n \quad \Leftrightarrow \quad n-1 \leq \log_b(u) < n \quad \Leftrightarrow \quad \lfloor \log_b(u) \rfloor = n-1.
\]

This last relation can be quite useful since the number of needed digits can be found, given \(u\) and \(b\). For instance, the fact that \(\lfloor \log_2(1317803400) \rfloor + 1 = 31\) means that the number 1317803400 can be represented using 31 binary digits.
