---
layout: post
status: publish
published: true
title: Bitwise Operators and Negative Numbers
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "When representing integers using a fixed number of bits, negative numbers
  are typically represented using <a href=\"http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Two's_complement\">two's
  complement<&#47;a>. If using <span class=\"mthi\">n<&#47;span> bit numbers, the
  two's complement of a number <span class=\"mthi\">x<&#47;span> with <span class=\"mthn\">0<&#47;span>
  <span class=\"mths\">&le;<&#47;span> <span class=\"mthi\">x<&#47;span> <span class=\"mths\"><<&#47;span>
  <span class=\"mthn\">2<&#47;span><sup><span class=\"mthi\">n<&#47;span><&#47;sup>
  is <span class=\"mths\">(<&#47;span><span class=\"mthi\">-x<&#47;span><span class=\"mths\">)<&#47;span>
  <span class=\"mtho\">mod<&#47;span> <span class=\"mthn\">2<&#47;span><sup><span
  class=\"mthi\">n<&#47;span><&#47;sup> <span class=\"mths\">=<&#47;span> <span class=\"mthn\">2<&#47;span><sup><span
  class=\"mthi\">n<&#47;span><&#47;sup> <span class=\"mths\">-<&#47;span> <span class=\"mthi\">x<&#47;span>.
  But what do you do if you want to work with unbounded&#47;multiple-precision integers?
  Fixing <span class=\"mthi\">x<&#47;span> and letting the number of bits go to infinity,
  you will notice that increasing <span class=\"mthi\">n<&#47;span> by one simply
  adds a 1 at the left. For instance,\r\n\r\n"
wordpress_id: 1471
wordpress_url: http://sputsoft.com/?p=1471
date: 2010-07-24 19:55:05.000000000 +02:00
categories:
- mathematics
tags:
- multiple-precision
- numbers project
- bitwise operators
- number representation
comments: []
---
When representing integers using a fixed number of bits, negative numbers are typically represented using <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Two's_complement">two's complement<&#47;a>. If using <span class="mthi">n<&#47;span> bit numbers, the two's complement of a number <span class="mthi">x<&#47;span> with <span class="mthn">0<&#47;span> <span class="mths">&le;<&#47;span> <span class="mthi">x<&#47;span> <span class="mths"><<&#47;span> <span class="mthn">2<&#47;span><sup><span class="mthi">n<&#47;span><&#47;sup> is <span class="mths">(<&#47;span><span class="mthi">-x<&#47;span><span class="mths">)<&#47;span> <span class="mtho">mod<&#47;span> <span class="mthn">2<&#47;span><sup><span class="mthi">n<&#47;span><&#47;sup> <span class="mths">=<&#47;span> <span class="mthn">2<&#47;span><sup><span class="mthi">n<&#47;span><&#47;sup> <span class="mths">-<&#47;span> <span class="mthi">x<&#47;span>. But what do you do if you want to work with unbounded&#47;multiple-precision integers? Fixing <span class="mthi">x<&#47;span> and letting the number of bits go to infinity, you will notice that increasing <span class="mthi">n<&#47;span> by one simply adds a 1 at the left. For instance,

<a id="more"></a><a id="more-1471"></a>

<div class="display-block">
&nbsp;1975 = (11110110111)<sub>2<&#47;sub>
-1975 = <span class="mthn">2<&#47;span><sup><span class="mthn">12<&#47;span><&#47;sup> - 1975 = (100001001001)<sub>2<&#47;sub> &nbsp; (<span class="mthi">n<&#47;span><&#47;sup> <span class="mths">=<&#47;span> <span class="mthn">12<&#47;span>)
-1975 = <span class="mthn">2<&#47;span><sup><span class="mthn">13<&#47;span><&#47;sup> - 1975 = (1100001001001)<sub>2<&#47;sub> &nbsp; (<span class="mthi">n<&#47;span><&#47;sup> <span class="mths">=<&#47;span> <span class="mthn">13<&#47;span>)
-1975 = <span class="mthn">2<&#47;span><sup><span class="mthn">20<&#47;span><&#47;sup> - 1975 = (11111111100001001001)<sub>2<&#47;sub> &nbsp; (<span class="mthi">n<&#47;span><&#47;sup> <span class="mths">=<&#47;span> <span class="mthn">20<&#47;span>)
-1975 = (...1111111111111100001001001)<sub>2<&#47;sub> &nbsp; (<span class="mthi">n<&#47;span><&#47;sup> <span class="mths">=<&#47;span> <span class="mths">&#8734;<&#47;span>)
<&#47;div>
(This can be made more rigorous using <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;P-adic">2-adic numbers<&#47;a>). Conversely, every binary number with infinitely many 1's to the left corresponds to a negative integer.

Notice the important special case -1 = (...1111)<sub>2<&#47;sub>. If <span class="overline">x<&#47;span> denotes <i>bitwise not<&#47;i> of x, where each bit is flipped from 0 to 1 and vice versa, we observe that
<div class="display-block">
x + <span class="overline">x<&#47;span> = ...1111 = -1,
<&#47;div>
from which we have the important identity
<div class="display-block">
<span class="overline">x<&#47;span> = -1 - x.
<&#47;div>
This makes bitwise not equivalent to a simple subtraction. Notice how bitwise not turns a non-negative integer into a negative integer and vice versa.

Let us turn to general bitwise operators. Consider a function that maps two bits to a single bit. Given such a function and two non-negative integers, we can apply the function to the zeroth bit of both numbers to obtain the zeroth bit of the result, then apply the function to the first bit of both numbers to obtain the first bit of the result, and so forth. In this way, any binary bit-operator {0,1}<sup>2<&#47;sup> &rarr; {0,1} can be extended to work on any non-negative integer (and as we shall see, any integer). There are 16 possible binary bit-operators:
<div class="spec1">
<table rules=groups frame=box>
<colgroup span="1"><&#47;colgroup>
<colgroup span="1"><&#47;colgroup>
<colgroup span="4"><&#47;colgroup>
<thead>
<tr><td><&#47;td><td>x<&#47;td>  <td>0<&#47;td><td>1<&#47;td><td>0<&#47;td><td>1<&#47;td><&#47;tr>
<tr><td><&#47;td><td>y<&#47;td>  <td>0<&#47;td><td>0<&#47;td><td>1<&#47;td><td>1<&#47;td><&#47;tr>
<&#47;thead>
<tbody>
<tr><td>0<&#47;td><td>0<&#47;td>  <td>0<&#47;td><td>0<&#47;td><td>0<&#47;td><td>0<&#47;td><&#47;tr>
<tr><td>1<&#47;td><td>x &amp; y<&#47;td>  <td>0<&#47;td><td>0<&#47;td><td>0<&#47;td><td>1<&#47;td><&#47;tr>
<tr><td>2<&#47;td><td><span class="overline">x<&#47;span> &amp; y<&#47;td>  <td>0<&#47;td><td>0<&#47;td><td>1<&#47;td><td>0<&#47;td><&#47;tr>
<tr><td>3<&#47;td><td>y<&#47;td>  <td>0<&#47;td><td>0<&#47;td><td>1<&#47;td><td>1<&#47;td><&#47;tr>
<tr><td>4<&#47;td><td>x &amp; <span class="overline">y<&#47;span><&#47;td>  <td>0<&#47;td><td>1<&#47;td><td>0<&#47;td><td>0<&#47;td><&#47;tr>
<tr><td>5<&#47;td><td>x<&#47;td>  <td>0<&#47;td><td>1<&#47;td><td>0<&#47;td><td>1<&#47;td><&#47;tr>
<tr><td>6<&#47;td><td>x &oplus; y<&#47;td>  <td>0<&#47;td><td>1<&#47;td><td>1<&#47;td><td>0<&#47;td><&#47;tr>
<tr><td>7<&#47;td><td>x | y<&#47;td>  <td>0<&#47;td><td>1<&#47;td><td>1<&#47;td><td>1<&#47;td><&#47;tr>
<&#47;tbody>
<tbody>
<tr><td>8<&#47;td><td><span class="overline">x | y<&#47;span><&#47;td>  <td>1<&#47;td><td>0<&#47;td><td>0<&#47;td><td>0<&#47;td><&#47;tr>
<tr><td>9<&#47;td><td><span class="overline">x &oplus; y<&#47;span><&#47;td>  <td>1<&#47;td><td>0<&#47;td><td>0<&#47;td><td>1<&#47;td><&#47;tr>
<tr><td>10<&#47;td><td><span class="overline">x<&#47;span><&#47;td>  <td>1<&#47;td><td>0<&#47;td><td>1<&#47;td><td>0<&#47;td><&#47;tr>
<tr><td>11<&#47;td><td><span class="overline">x<&#47;span> | y<&#47;td>  <td>1<&#47;td><td>0<&#47;td><td>1<&#47;td><td>1<&#47;td><&#47;tr>
<tr><td>12<&#47;td><td><span class="overline">y<&#47;span><&#47;td>  <td>1<&#47;td><td>1<&#47;td><td>0<&#47;td><td>0<&#47;td><&#47;tr>
<tr><td>13<&#47;td><td>x | <span class="overline">y<&#47;span><&#47;td>  <td>1<&#47;td><td>1<&#47;td><td>0<&#47;td><td>1<&#47;td><&#47;tr>
<tr><td>14<&#47;td><td><span class="overline">x &amp; y<&#47;span><&#47;td>  <td>1<&#47;td><td>1<&#47;td><td>1<&#47;td><td>0<&#47;td><&#47;tr>
<tr><td>15<&#47;td><td>1<&#47;td>  <td>1<&#47;td><td>1<&#47;td><td>1<&#47;td><td>1<&#47;td><&#47;tr>
<&#47;tbody>
<&#47;table>
<&#47;div>
The first column of the table enumerates the functions from 0 to 15 (such that the binary representation of each number corresponds to the outputs). We see that exactly the functions 0-7 map (0,0) to 0, meaning that only these functions will map two non-negative integers to a non-negative integer.

The second column shows expressions for the functions using the well-known operators <i>bitwise and<&#47;i>, x &amp; y, <i>bitwise or (inclusive or)<&#47;i>, x | y, <i>bitwise xor (exclusive or)<&#47;i>, x &oplus; y, and <i>bitwise not<&#47;i>, <span class="overline">x<&#47;span>. The table simultaneously define these operators.

We can now formulate the goal of this article: Using only the bitwise operators that map non-negative integers to non-negative integers, together with usual integer arithmetic, how can we implement all 16 functions? The approach is quite simple: Use <i>bitwise not<&#47;i> to transform any negative integer into a non-negative integer, apply one of the functions 0-7, and then possibly apply <i>bitwise not<&#47;i> again to obtain the result.

Before proceeding, we need some fundamental identities. First, symmetry:
<div class="display-block">
x &amp; y = y &amp; x, &nbsp;&nbsp; x | y = y | x, &nbsp;&nbsp; x &oplus; y = y &oplus; x,
<&#47;div>
Then, <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;De_Morgan's_laws">De Morgan's laws<&#47;a>:
<div class="display-block">
<span class="overline">x &amp; y<&#47;span> = <span class="overline">x<&#47;span> | <span class="overline">y<&#47;span>, &nbsp;&nbsp; <span class="overline">x | y<&#47;span> = <span class="overline">x<&#47;span> &amp; <span class="overline">y<&#47;span>,
<&#47;div>
Finally some useful rules for exlusive or:
<div class="display-block">
x &oplus; y = <span class="overline">x<&#47;span> &oplus; <span class="overline">y<&#47;span>, &nbsp;&nbsp; <span class="overline">x &oplus; y<&#47;span> = <span class="overline">x<&#47;span> &oplus; y = x &oplus; <span class="overline">y<&#47;span>.
<&#47;div>
All of these are easily proved since they (by definition) operate <i>bitwise<&#47;i>. This means that you only have to consider one-bit numbers, which means only four different cases to check.

The only non-trivial operators among the functions 0-7 are x &amp; y, x | y, x &oplus; y, and x &amp; <span class="overline">y<&#47;span>. We will use the notation x <span class="overline">&amp;<&#47;span> y = x &amp; <span class="overline">y<&#47;span>. Note how <span class="overline">&amp;<&#47;span> is <i>not<&#47;i> symmetric. The only non-trivial operators among the functions 8-15 are <span class="overline">x &amp; y<&#47;span>, <span class="overline">x | y<&#47;span>, x | <span class="overline">y<&#47;span>, and <span class="overline">x &oplus; y<&#47;span>. Considering these eight cases, along with whether x and y are negative or not, we get the following table:
<table border="1" style="border-collapse:collapse; background:#F2F2F2;">
<tr><td><&#47;td>
    <td>x &ge; 0, y &ge; 0<&#47;td>
    <td>x &ge; 0, y < 0<&#47;td>
    <td>x < 0, y &ge; 0<&#47;td>
    <td>x < 0, y < 0<&#47;td><&#47;tr>
<tr><td>x &amp; y<&#47;td>
    <td>x &amp; y<&#47;td>
    <td>x <span class="overline">&amp;<&#47;span> <span class="overline">y<&#47;span><&#47;td>
    <td>y <span class="overline">&amp;<&#47;span> <span class="overline">x<&#47;span><&#47;td>
    <td><span class="overline2"><span class="overline">x<&#47;span> | <span class="overline">y<&#47;span><&#47;span><&#47;td><&#47;tr>
<tr><td>x | y<&#47;td>
    <td>x | y<&#47;td>
    <td><span class="overline2"><span class="overline">y<&#47;span> <span class="overline">&amp;<&#47;span> x<&#47;span><&#47;td>
    <td><span class="overline2"><span class="overline">x<&#47;span> <span class="overline">&amp;<&#47;span> y<&#47;span><&#47;td>
    <td><span class="overline2"><span class="overline">x<&#47;span> &amp; <span class="overline">y<&#47;span><&#47;span><&#47;td><&#47;tr>
<tr><td>x <span class="overline">&amp;<&#47;span> y<&#47;td>
    <td>x <span class="overline">&amp;<&#47;span> y<&#47;td>
    <td>x &amp; <span class="overline">y<&#47;span><&#47;td>
    <td><span class="overline2"><span class="overline">x<&#47;span> | y<&#47;span><&#47;td>
    <td><span class="overline">y<&#47;span> <span class="overline">&amp;<&#47;span> <span class="overline">x<&#47;span><&#47;td><&#47;tr>
<tr><td>x &oplus; y<&#47;td>
    <td>x &oplus; y<&#47;td>
    <td><span class="overline2">x &oplus; <span class="overline">y<&#47;span><&#47;span><&#47;td>
    <td><span class="overline2"><span class="overline">x<&#47;span> &oplus; y<&#47;span><&#47;td>
    <td><span class="overline">x<&#47;span> &oplus; <span class="overline">y<&#47;span><&#47;td><&#47;tr>
<tr><td><span class="overline">x &amp; y<&#47;span><&#47;td>
    <td><span class="overline">x &amp; y<&#47;span><&#47;td>
    <td><span class="overline2">x <span class="overline">&amp;<&#47;span> <span class="overline">y<&#47;span><&#47;span><&#47;td>
    <td><span class="overline2">y <span class="overline">&amp;<&#47;span> <span class="overline">x<&#47;span><&#47;span><&#47;td>
    <td><span class="overline">x<&#47;span> | <span class="overline">y<&#47;span><&#47;span><&#47;td><&#47;tr>
<tr><td><span class="overline">x | y<&#47;span><&#47;td>
    <td><span class="overline">x | y<&#47;span><&#47;td>
    <td><span class="overline">y<&#47;span> <span class="overline">&amp;<&#47;span> x<&#47;td>
    <td><span class="overline">x<&#47;span> <span class="overline">&amp;<&#47;span> y<&#47;td>
    <td><span class="overline">x<&#47;span> &amp; <span class="overline">y<&#47;span><&#47;td><&#47;tr>
<tr><td>x | <span class="overline">y<&#47;span><&#47;td>
    <td><span class="overline2">y <span class="overline">&amp;<&#47;span> x<&#47;span><&#47;td>
    <td>x | <span class="overline">y<&#47;span><&#47;td>
    <td><span class="overline2"><span class="overline">x<&#47;span> &amp; y<&#47;span><&#47;td>
    <td><span class="overline2"><span class="overline">x<&#47;span> <span class="overline">&amp;<&#47;span> <span class="overline">y<&#47;span><&#47;span><&#47;td><&#47;tr>
<tr><td><span class="overline">x &oplus; y<&#47;span><&#47;td>
    <td><span class="overline">x &oplus; y<&#47;span><&#47;td>
    <td>x &oplus; <span class="overline">y<&#47;span><&#47;td>
    <td><span class="overline">x<&#47;span> &oplus; y<&#47;td>
    <td><span class="overline2"><span class="overline">x<&#47;span> &oplus; <span class="overline">y<&#47;span><&#47;span><&#47;td><&#47;tr>
<&#47;table>
Here, we have used only the identities shown earlier. Of course, we need to convert each bitwise not into a subtraction to complete the task. For instance, with x < 0, y &ge; 0 we have
<div class="display-block">
x | <span class="overline">y<&#47;span> = <span class="overline2"><span class="overline">x<&#47;span> &amp; y<&#47;span> = -1 - ((-1 - x) &amp; y)
<&#47;div>
This way, the bitwise and-operation is being applied to non-negative numbers and we see that the result is always negative.

We can now, with assistance from the table above, apply any of the 16 binary bitwise operators to <i>any<&#47;i> pair of integers, without restricting ourselves to working with a fixed number of bits.

<div style="float:right"><a href="&#47;book&#47;link.php?id=hackers-delight"><img src="&#47;book&#47;hackers-delight.jpg" &#47;><&#47;a><&#47;div>
<div style="float:right"><a href="&#47;book&#47;link.php?id=taocp4f1"><img src="&#47;book&#47;taocp4f1.jpg" &#47;><&#47;a><&#47;div>
For further reading related to the binary representation of numbers, I recommend <a href="&#47;book&#47;link.php?id=taocp4f1">The Art of Computer Programming, Volume 4, Fascicle 1: Bitwise Tricks &amp; Techniques and Binary Decision Diagrams<&#47;a> by <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;">Donald E. Knuth<&#47;a> and <a href="&#47;book&#47;link.php?id=hackers-delight">Hacker's Delight<&#47;a> by Henry S. Warren, Jr.
