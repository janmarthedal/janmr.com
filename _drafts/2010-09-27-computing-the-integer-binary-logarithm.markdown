---
layout: post
status: publish
published: true
title: Computing the Integer Binary Logarithm
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "The binary logarithm, or the logarithm to the base 2, of a number <span
  class=\"mthi\">x<&#47;span> <span class=\"mths\">><&#47;span> <span class=\"mthn\">0<&#47;span>
  is the number <span class=\"mthi\">y<&#47;span> <span class=\"mths\">=<&#47;span>
  <span class=\"mths\">log<&#47;span><sub><span class=\"mthn\">2<&#47;span><&#47;sub>
  <span class=\"mthi\">x<&#47;span> such that <span class=\"mthn\">2<&#47;span><sup><span
  class=\"mthi\">y<&#47;span><&#47;sup> <span class=\"mths\">=<&#47;span> <span class=\"mthi\">x<&#47;span>.
  This article looks at how we can determine the integer part of the binary logarithm
  using integer arithmetic only. Naturally, the binary logarithm is especially easy
  to work with on (binary) computers and bitwise operations come in handy.\r\n\r\n"
wordpress_id: 1838
wordpress_url: http://sputsoft.com/blog/?p=1838
date: 2010-09-27 10:18:03.000000000 +02:00
categories:
- programming
tags:
- algorithms
- numbers project
- number representation
- binary numbers
comments:
- id: 2626
  author: ! 'Snippet: Integer Binary Logarithm | Kanooth'
  author_email: ''
  author_url: http://kanooth.com/blog/2011/11/snippet-integer-binary-logarithm.html
  date: !binary |-
    MjAxMi0xMS0xNSAwNzoyNzowMyArMDEwMA==
  date_gmt: !binary |-
    MjAxMi0xMS0xNSAwNjoyNzowMyArMDEwMA==
  content: ! '[...] integer (n), that is, the largest integer (k) such that (2^k leq
    n). More information: Computing the Integer Binary Logarithm Source: [...]'
---
The binary logarithm, or the logarithm to the base 2, of a number <span class="mthi">x<&#47;span> <span class="mths">><&#47;span> <span class="mthn">0<&#47;span> is the number <span class="mthi">y<&#47;span> <span class="mths">=<&#47;span> <span class="mths">log<&#47;span><sub><span class="mthn">2<&#47;span><&#47;sub> <span class="mthi">x<&#47;span> such that <span class="mthn">2<&#47;span><sup><span class="mthi">y<&#47;span><&#47;sup> <span class="mths">=<&#47;span> <span class="mthi">x<&#47;span>. This article looks at how we can determine the integer part of the binary logarithm using integer arithmetic only. Naturally, the binary logarithm is especially easy to work with on (binary) computers and bitwise operations come in handy.

<a id="more"></a><a id="more-1838"></a>

As we saw in a <a href="&#47;blog&#47;2009&#47;09&#47;useful-properties-of-the-floor-and-ceil-functions.html">previous post<&#47;a>, we have

\[
k = \lfloor \log_2 n \rfloor \quad \Leftrightarrow \quad 2^k \leq n < 2^{k+1}.
\]

This means that we seek an integer <span class="mthi">k<&#47;span> such that \(\lfloor n&#47;2^k \rfloor \neq 0\) and \(\lfloor n&#47;2^{k+1} \rfloor = 0\). We see that <span class="mthi">k<&#47;span> is the position of the left-most bit or, equivalently, that it takes <span class="mthi">k<&#47;span><span class="mths">+<&#47;span><span class="mthn">1<&#47;span> bits, but no fewer, to represent the number <span class="mthi">n<&#47;span>.

The <a href="&#47;blog&#47;2009&#47;09&#47;useful-properties-of-the-floor-and-ceil-functions.html">ceil&#47;floor post<&#47;a> also states

\[
\lfloor \ldots \lfloor \lfloor n&#47;2 \rfloor &#47;2 \rfloor \ldots &#47;2 \rfloor = \left\lfloor \frac{n}{2 \cdot 2 \cdots 2} \right\rfloor,
\]

which means that we can repeatedly do integer divison by two until we reach zero. To be more specific:

<pre class="sputcode">
template <typename T>
unsigned floor_log2(T v) {
  unsigned r = -1;
  while (v) { v >>= 1; r++; }
  return r;
}
<&#47;pre>

The good thing about this algorithm is that it works for all (positive) integer types, provided that bitwise shift right <span class="sputcode">>><&#47;span> or integer division by two is defined. The bad thing is that it is not very fast.

An observation that can lead to faster algorithms is the fact that, as mentioned above, \(\lfloor \log_2 n \rfloor\) is the position of the left-most bit. Let us address multiple-precision numbers first. Assume that a positive integer <span class="mthi">n<&#47;span> is represented as in a <a href="&#47;blog&#47;2009&#47;07&#47;implementing-multiple-precision-arithmetic-part-1.html">previous post<&#47;a> as

\[
n = (n_{d-1} \ldots n_1 u_0)_b = \sum_{i=0}^{d-1} n_i b^i
\]

with <span class="mthi">d<&#47;span> <span class="mths">&ge;<&#47;span> <span class="mthn">1<&#47;span> and <span class="mthi">n<&#47;span><sub><span class="mthi">d<&#47;span><span class="mths">-<&#47;span><span class="mthn">1<&#47;span><&#47;sub> <span class="mths">&ne;<&#47;span> <span class="mthn">0<&#47;span>. Now if <span class="mthn">b<&#47;span> <span class="mths">=<&#47;span> <span class="mthn">2<&#47;span><sup><span class="mthi">p<&#47;span><&#47;sup> for some <span class="mthi">p<&#47;span>, as is normally the case, we have:

\[
\lfloor \log_2 n \rfloor = (d-1) p + \lfloor \log_2 n_{d-1} \rfloor.
\]

So the problem of computing the integer binary logarithm for a multiple-precision integer of the type stated is reduced to finding the integer binary logarithm of a single <span class="mthi">p<&#47;span>-bit digit.

Consider now a positive integer represented using a 16 bit word. Since we are interested in the left-most bit, we can search for it using a kind of <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Binary_search_algorithm">binary search method<&#47;a>. First we do a <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Bitwise_operation#AND">bitwise and<&#47;a> with the mask (1111111100000000)<sub>2<&#47;sub> to see if the left-most bit is located in the upper or lower part of the word. If it is among the lower 8 bits we simply compute the result for this 8 bit number instead; if it is among the upper 8 bits we compute the result for the upper 8 bits and add 8. We have thus reduced the problem of finding the integer binary logarithm of an 16 bit number to finding the same function of an 8 bit number. This principle can be used recursively until we look at only 1 bit:

<pre class="sputcode">
unsigned floor_log2(uint16_t v) {
  static const uint16_t ones = -1;
  unsigned r = 0;
  if (v & (ones << 8)) { v >>= 8; r += 8; }
  if (v & (ones << 4)) { v >>= 4; r += 4; }
  if (v & (ones << 2)) { v >>= 2; r += 2; }
  if (v & (ones << 1)) { v >>= 1; r += 1; }
  return r;
}
<&#47;pre>

(Note that this function returns 0 if the argument is 0. The types <span class="sputcode">uint8_t<&#47;span>, <span class="sputcode">uint16_t<&#47;span>, and so on are defined in <span class="sputcode">stdint.h<&#47;span> and <span class="sputcode">cstdint<&#47;span>.)

If we look at small numbers, say 8 bit integers, we can do much better with a simple table lookup. For instance:

<pre class="sputcode">
const short floor_log2_table[256] = {
 -1, 0, 1,1, 2,2,2,2, 3,3,3,3,3,3,3,3, 4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
 5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,
 6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
 6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
 7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
 7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
 7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
 7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7 };

unsigned floor_log2(uint8_t v) {
  return floor_log2_table[v];
}
<&#47;pre>

For large numbers we can combine the binary search and the table lookup. For 32 bit numbers we get:

<pre class="sputcode">
unsigned floor_log2(uint32_t v) {
  static const uint32_t ones = -1;
  unsigned r = 0;
  if (v & (ones << 16)) { v >>= 16; r += 16; }
  if (v & (ones <<  8)) { v >>=  8; r +=  8; }
  return r + floor_log2_table[v];
}
<&#47;pre>

This provides a nice trade-off between speed and memory use.

<div style="float:right"><a href="&#47;book&#47;link.php?id=hackers-delight"><img src="&#47;book&#47;hackers-delight.jpg" &#47;><&#47;a><&#47;div>
<div style="float:right"><a href="&#47;book&#47;link.php?id=taocp4f1"><img src="&#47;book&#47;taocp4f1.jpg" &#47;><&#47;a><&#47;div>
For further reading on the integer binary logarithm, and <i>many<&#47;i> other aspects related to the binary representation of numbers, I recommend <a href="&#47;book&#47;link.php?id=taocp4f1">The Art of Computer Programming, Volume 4, Fascicle 1: Bitwise Tricks &amp; Techniques and Binary Decision Diagrams<&#47;a> by <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;">Donald E. Knuth<&#47;a> and <a href="&#47;book&#47;link.php?id=hackers-delight">Hacker's Delight<&#47;a> by Henry S. Warren, Jr. See also these online <a href="http:&#47;&#47;graphics.stanford.edu&#47;~seander&#47;bithacks.html#IntegerLogObvious">Bit Twiddling Hacks<&#47;a>.

<i>(Update 2011-11-23: Source code is available as snippet <a href="&#47;blog&#47;2011&#47;11&#47;snippet-integer-binary-logarithm.html">integer_binary_logarithm<&#47;a>.)<&#47;i>
