---
layout: post
status: publish
published: true
title: Good Rational Bounds
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "Say we have a k-bit integer and we want to allocate a character array
  to hold the decimal digits of this number. How large must the array be? Well, the
  exact formula is\r\n"
wordpress_id: 2687
wordpress_url: http://kanooth.com/blog/?p=2687
date: 2013-01-07 12:38:33.000000000 +01:00
categories:
- mathematics
tags:
- continued fraction
- rational approximation
- rational bound
comments: []
---
Say we have a k-bit integer and we want to allocate a character array to hold the decimal digits of this number. How large must the array be? Well, the exact formula is
<a id="more"></a><a id="more-2687"></a>
\[
\left\lfloor \log_{10}(2^k) \right\rfloor + 1 = \left\lfloor k \frac{\ln(2)}{\ln(10)} \right\rfloor + 1,
\]
but we are concerned about efficiency and don't want to use floating point calculations. So we fire up a calculator and get \( \ln(2) &#47; \ln(10) \simeq 0.3010299957 \). This means that we can use, e.g., \(1&#47;3\) as an upper bound for \( \ln(2) &#47; \ln(10) \) and allocate \( \lfloor k &#47; 3 \rfloor + 1 \) characters. But we are also concerned about memory and think it is a waste to use little more than 10% more memory than needed. We could just use \(30103&#47;100000\) as an upper bound, but we don't want to use too large constants because we are also concerned about arithmetic overflow.

This is where continued fractions come in, see an <a href="&#47;blog&#47;2009&#47;11&#47;continued-fractions-and-continuants.html">earlier post<&#47;a> for some basic notation and properties. Let \( x = a_0 + &#47;\!&#47;a_1, a_2, \ldots, a_n&#47;\!&#47; \) where all \(a_k\) are non-negative integers. Such a representation has some very desirable properties regarding rational approximations and bounds (the "truncated" continued fraction \( a_0 + &#47;\!&#47;a_1, a_2, \ldots, a_k&#47;\!&#47; \) for \( 0 \leq k \leq n \) is called the \(k\)th convergent of \(x\)):
<ol>
<li>The even convergents \(a_0, a_0 + &#47;\!&#47; a_1, a_2 &#47;\!&#47;, a_0 + &#47;\!&#47; a_1, a_2, a_3, a_4 &#47;\!&#47;, \ldots \) are always less than \(x\). Similarly, the odd convergents \(a_0 + &#47;\!&#47; a_1 &#47;\!&#47;, a_0 + &#47;\!&#47; a_1, a_2, a_3 &#47;\!&#47;, \ldots \) are always greater than \(x\).<&#47;li>
<li>The \(k\)th convergent is a very good rational approximation to \(x\). (We will not make this statement exact, but just say that a rational fraction is a <em>best approximation<&#47;em> if every other rational fraction with the same or smaller denominator differs from \(x\) by a greater amount.)<&#47;li>
<&#47;ol>

We will now apply these facts to our example. We start by obtaining any rational upper bound with the restriction that it must be tighter than the good rational bound that we are aiming for. We have \( \ln(2) &#47; \ln(10) < 0.30103 \) and we compute the continued fraction for this upper bound,
\[
30103&#47;100000 = &#47;\!&#47; 3, 3, 9, 2, 2, 4, 5, 1, 1, 1, 2 &#47;\!&#47;.
\]
We now begin to compute the odd convergents, and keeping an eye on how tight they are:
<ul>
	<li>\( &#47;\!&#47; 3 &#47;\!&#47; = 1&#47;3 \) (too much by about 11%)<&#47;li>
	<li>\( &#47;\!&#47; 3, 3, 9 &#47;\!&#47; = 28&#47;93 \) (too much by about 0.015%)<&#47;li>
	<li>\( &#47;\!&#47; 3, 3, 9, 2, 2 &#47;\!&#47; = 146&#47;485 \) (too much by about 0.00031%)<&#47;li>
<&#47;ul>
There are more odd convergents to consider, but we probably don't need to go any further for this use case. So we can allocate \( \lfloor 146 k &#47; 485 \rfloor + 1 \) characters, knowing that it is a very tight upper bound.

(Note how a similar approach could be used if we were looking for a lower bound instead.)
