---
layout: post
status: publish
published: true
title: Evaluation of Powers
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! 'How do you efficiently compute <span class="mthi">x</span><sup><span class="mthi">n</span></sup>
  for a positive integer <span class="mthi">n</span>? Take <span class="mthi">x</span><sup><span
  class="mthn">15</span></sup> as an example. You could take <span class="mthi">x</span>
  and repeatedly multiply by <span class="mthi">x</span> 14 times. A better way to
  do it, however, is this:'
wordpress_id: 2056
wordpress_url: http://sputsoft.com/blog/?p=2056
date: 2011-01-30 16:03:57.000000000 +01:00
categories:
- programming
- mathematics
tags:
- algorithms
- numbers project
comments:
- id: 2303
  author: Fast Evaluation of Fibonacci Numbers | Kanooth
  author_email: ''
  author_url: http://kanooth.com/blog/2011/03/evaluation-of-fibonacci-numbers.html
  date: !binary |-
    MjAxMS0wMy0xMSAxMTowMToxOSArMDEwMA==
  date_gmt: !binary |-
    MjAxMS0wMy0xMSAxMDowMToxOSArMDEwMA==
  content: ! '[...] how this type of reduction rules are very similar to those found
    in the Evaluation of Powers post. Let us look at an example and try to evaluate
    (F_{20} = r(T^{20}(1,0)) = r(T_{0,1}^{20}(1,0))) [...]'
---
How do you efficiently compute <span class="mthi">x<&#47;span><sup><span class="mthi">n<&#47;span><&#47;sup> for a positive integer <span class="mthi">n<&#47;span>? Take <span class="mthi">x<&#47;span><sup><span class="mthn">15<&#47;span><&#47;sup> as an example. You could take <span class="mthi">x<&#47;span> and repeatedly multiply by <span class="mthi">x<&#47;span> 14 times. A better way to do it, however, is this:
<a id="more"></a><a id="more-2056"></a>
<ul>
	<li>\(t_0=x\)<&#47;li>
	<li>\(t_1=t_0 \cdot t_0 = x^2\)<&#47;li>
	<li>\(t_2=t_0 \cdot t_1 = x^3\)<&#47;li>
	<li>\(t_3=t_1 \cdot t_2 = x^5\)<&#47;li>
	<li>\(t_4=t_3 \cdot t_3 = x^{10}\)<&#47;li>
	<li>\(t_5=t_3 \cdot t_4 = x^{15}\)<&#47;li>
<&#47;ul>
A shorter way to write this is \(x^1,x^2,x^3,x^5,x^{10},x^{15}\), where each quantity is obtained by multiplying two of the previous quantities together. We can write it even shorter as 1,2,3,5,10,15, where only the exponents are written. Here each number is obtained by adding together two of the previous numbers. This is called an <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Addition_chain">addition chain<&#47;a> and is at the heart of studying the optimal way of evaluating powers. There is no simple expression that computes the minimal number of multiplications \(a(n)\) needed to evaluate <span class="mthi">x<&#47;span><sup><span class="mthi">n<&#47;span><&#47;sup>. A <a href="http:&#47;&#47;oeis.org&#47;A003313">list<&#47;a>, however, is available from <a href="http:&#47;&#47;oeis.org">The On-Line Encyclopedia of Integer Sequences<&#47;a>, where the first 40 entries are
<div class="display-block">0, 1, 2, 2, 3, 3, 4, 3, 4, 4, 5, 4, 5, 5, 5, 4, 5, 5, 6, 5, 6, 6, 6, 5, 6, 6, 6, 6, 7, 6, 7, 5, 6, 6, 7, 6, 7, 7, 7, 6, ...<&#47;div>
We see that \(a(15)=5\), which shows that the addition chain 1,2,3,5,10,15 is indeed the shortest possible, and it follows that the procedure shown above to compute <span class="mthi">x<&#47;span><sup><span class="mthn">15<&#47;span><&#47;sup> required the minimal number of multiplications.

Since the numbers in an addition chain grows the fastest by doubling the previous item, it is fairly easy to see that
<div style="float: right;">(1)<&#47;div>
\[
a(n) \geq \lceil \log_2(n) \rceil \quad .
\]
<div style="float: right;"><img src="&#47;book&#47;taocp2.jpg" alt="" &#47;><a href="&#47;book&#47;link.php?id=taocp2"><&#47;a><&#47;div>
(This, and other results related to the evaluation of powers and addition chains can be found in <a href="&#47;book&#47;link.php?id=taocp2">The Art of Computer Programming, Volume 2<&#47;a>, Section 4.6.3.)

An algorithm that comes close to this optimal bound is the binary method, which relies on these simple relations:
<ul>
	<li>\(x^0 = 1\)<&#47;li>
	<li>\(x^{2k} = (x^k)^2\)<&#47;li>
	<li>\(x^{2k+1} = x \cdot x^{2k}\)<&#47;li>
<&#47;ul>
A recursive algorithm could readily be made from these, but we wish to have an iterative algorithm. The key here is to consider the slightly more general problem of evaluating \(y \cdot x^n\). Here we have the relations:
<ul>
	<li>\(y \cdot x^0 = y\)<&#47;li>
	<li>\(y \cdot x^{2k} = y \cdot (x^2)^k\)<&#47;li>
	<li>\(y \cdot x^{2k+1} = (y \cdot x) \cdot x^{2k}\)<&#47;li>
<&#47;ul>
This leads immediately to the following <span class="sputcode">C++<&#47;span> code:
<pre class="sputcode">number_t power(number_t y, number_t x, unsigned n) {
  while (n) {
    if (n % 2 == 0) {
      x *= x;
      n &#47;= 2;
    } else {
      y *= x;
      n--;
    }
  }
  return y;
}<&#47;pre>
A slightly improved version (and maybe a bit less elegant) is the following:
<pre class="sputcode">number_t power(number_t y, number_t x, unsigned n) {
  if (!n) return y;
  while (n > 1) {
    if (n &amp; 1) y *= x;
    x *= x;
    n >>= 1;
  }
  return y*x;
}<&#47;pre>
This algorithm performs \(\lfloor \log_2 n \rfloor\) multiplications of the type \(x \leftarrow x^2\) and \(\nu(n)\) multiplications of the type \(y \leftarrow y \cdot x\), where \(\nu(n)\) is the number of 1s in the binary representation of <span class="mthi">n<&#47;span>, so all in all it requires
\[
\lfloor \log_2 n \rfloor + \nu(n)
\]
multiplications (sequence <a href="http:&#47;&#47;oeis.org&#47;A056792">A056792<&#47;a> at <a href="http:&#47;&#47;oeis.org">OEIS<&#47;a>).

So now we can evaluate \(y \cdot x^n\) fairly efficiently. To evaluate \(x^n\) we can simply use this routine by setting \(y=1\). But that wastes one multiplication because the first time we perform \(y \leftarrow y \cdot x\) it will be redundant. Instead we could use <span class="sputcode">power(x, x, n-1)<&#47;span>, but that could increase the number of multiplications for even <span class="mthi">n<&#47;span>. A good way to evaluate \(x^n\) is this:
<pre class="sputcode">number_t power(number_t x, unsigned n) {
  if (!n) return (T) 1;
  while (!(n &amp; 1)) {
    x *= x;
    n >>= 1;
  }
  return power(x, x, n-1);
}<&#47;pre>
This way, when executing <span class="sputcode">power(x, x, n-1)<&#47;span>, <span class="sputcode">n<&#47;span> will always be uneven. This saves one multiplication compared to using just <span class="sputcode">power(1, x, n)<&#47;span>, so it requires
\[
\lfloor \log_2 n \rfloor + \nu(n) - 1
\]
multiplications (sequence <a href="http:&#47;&#47;oeis.org&#47;A014701">A014701<&#47;a> at <a href="http:&#47;&#47;oeis.org">OEIS<&#47;a>).

As mentioned above, this algorithm is not optimal, but it is not bad either. In fact, 15 is the smallest value of <span class="mthi">n<&#47;span> for which the binary algorithm does not use the minimal number of multiplications. Figure 1 below compares the number of multiplications needed by the binary algorithm to the minimal number possible.

[caption id="" align="alignnone" width="640" caption="Figure 1. Number of multiplications used to evaluate the nth power."]<a href="http:&#47;&#47;www.flickr.com&#47;photos&#47;janmr&#47;6163382115&#47;" title="Evaluation of powers by janmarthedal, on Flickr"><img src="http:&#47;&#47;farm7.static.flickr.com&#47;6171&#47;6163382115_293f4457db_z.jpg" width="640" height="480" alt="Evaluation of powers"><&#47;a>[&#47;caption]

Note also that we have only talked about minimizing the number of multiplications. What if a different cost is associated with each multiplication? For instance, the basic multiple-precision multiplication algorithm described in an <a href="&#47;blog&#47;2009&#47;07&#47;implementing-multiple-precision-arithmetic-part-1.html">earlier post<&#47;a> has a cost propertional to \(m \times n\) if the factors have <span class="mthi">m<&#47;span> and <span class="mthi">n<&#47;span> digits, respectively. Using this cost model, the binary algorithm <em>is<&#47;em> actually optimal. This was shown by R. L. Graham, A. C.-C. Yao, and F.-F. Yao in <em>Addition chains with multiplicative cost<&#47;em>, Discrete Math., 23 (1978), 115-119 (article available <a href="http:&#47;&#47;www.math.ucsd.edu&#47;~ronspubs&#47;#78">online<&#47;a>).
