---
layout: post
status: publish
published: true
title: Implementing Multiple-Precision Arithmetic, Part 2
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "<h3>Introduction<&#47;h3>\r\n\r\n<div style=\"float:right\"><a href=\"&#47;book&#47;link.php?id=taocp2\"><img
  src=\"&#47;book&#47;taocp2.jpg\" &#47;><&#47;a><&#47;div>\r\nThis article is a follow-up
  to <a href=\"&#47;blog&#47;2009&#47;07&#47;implementing-multiple-precision-arithmetic-part-1.html\">part
  1<&#47;a> where multiple-precision addition, subtraction, and multiplication for
  non-negative integers was discussed. This article deals with division. Again, the
  theoretic foundation is based on Section&nbsp;4.3.1, <em>The Classical Algorithms<&#47;em>,
  of <a href=\"http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;taocp.html\">The
  Art of Computer Programming<&#47;a>, Volume&nbsp;2, by <a href=\"http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;\">Donald
  E. Knuth<&#47;a>.\r\n\r\n"
wordpress_id: 573
wordpress_url: http://sputsoft.com/?p=573
date: 2009-08-20 10:31:30.000000000 +02:00
categories:
- programming
tags:
- arithmetic
- algorithms
- C++
- multiple-precision
- numbers project
comments:
- id: 1632
  author: Borbus
  author_email: borbus@gmail.com
  author_url: ''
  date: !binary |-
    MjAxMC0wMS0xNCAyMDo1Nzo1OCArMDEwMA==
  date_gmt: !binary |-
    MjAxMC0wMS0xNCAxOTo1Nzo1OCArMDEwMA==
  content: What do you do about printing these bignums in base 10?
- id: 1669
  author: Jan Marthedal Rasmussen
  author_email: jmr@kanooth.com
  author_url: http://kanooth.com
  date: !binary |-
    MjAxMC0wMS0xNyAwODo0Nzo1OCArMDEwMA==
  date_gmt: !binary |-
    MjAxMC0wMS0xNyAwNzo0Nzo1OCArMDEwMA==
  content: ! '@Borbus: One simple way, of course, is to repeatedly divide by 10 -
    the remainders will then give you the digits (in reverse). A faster way is to
    divide by a higher power of 10. Using a 32 bit word&#47;digit&#47;limb size, for
    instance, makes it possible to obtain 9 decimal digits for each division step
    (since 10^9 < 2^32).'
- id: 2139
  author: Implementing Multiple-Precision Arithmetic, Part 1 | Kanooth
  author_email: ''
  author_url: http://kanooth.com/blog/2009/07/implementing-multiple-precision-arithmetic-part-1.html
  date: !binary |-
    MjAxMC0wNy0xNSAwOTo1Mjo1MiArMDIwMA==
  date_gmt: !binary |-
    MjAxMC0wNy0xNSAwNzo1Mjo1MiArMDIwMA==
  content: ! '[...] We have now covered addition, subtraction, and multiplication
    of non-negative integers of arbitrary magnitude. Left is how to do division, which
    will be the subject of the next article. [...]'
- id: 2164
  author: Richard Wilbur
  author_email: r.wilbur@f5.com
  author_url: ''
  date: !binary |-
    MjAxMC0wNy0yMyAwMDoxMDo1OCArMDIwMA==
  date_gmt: !binary |-
    MjAxMC0wNy0yMiAyMjoxMDo1OCArMDIwMA==
  content: ! "I enjoyed reading your explanation of the mathematics behind multiple-precision
    arithmetic.  While reading, I noticed a few things that seemed inadvertent:\r\n\r\n1.
    \ Regarding Algorithm G, in the paragraph which starts, \"Finally, we can verify
    that the algorithm computes what we intended.\", the second equation refers to
    \"w_0\" which has not been introduced in the symbology.  Did you mean \"q_0\".\r\n\r\n2.
    \ First paragraph under \"Simple Division\", third sentence excerpt, \"for some
    intristic integer\".  By \"intristic\" did you mean \"intrinsic\"?\r\n\r\nThank
    you for writing this down and posting it."
- id: 2165
  author: Jan Marthedal Rasmussen
  author_email: jmr@kanooth.com
  author_url: http://kanooth.com/blog/
  date: !binary |-
    MjAxMC0wNy0yMyAwOTo1NTo1NCArMDIwMA==
  date_gmt: !binary |-
    MjAxMC0wNy0yMyAwNzo1NTo1NCArMDIwMA==
  content: ! '@Richard Wilbur: I have corrected both errors. Thank you for letting
    me know.'
---
<h3>Introduction<&#47;h3>

<div style="float:right"><a href="&#47;book&#47;link.php?id=taocp2"><img src="&#47;book&#47;taocp2.jpg" &#47;><&#47;a><&#47;div>
This article is a follow-up to <a href="&#47;blog&#47;2009&#47;07&#47;implementing-multiple-precision-arithmetic-part-1.html">part 1<&#47;a> where multiple-precision addition, subtraction, and multiplication for non-negative integers was discussed. This article deals with division. Again, the theoretic foundation is based on Section&nbsp;4.3.1, <em>The Classical Algorithms<&#47;em>, of <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;taocp.html">The Art of Computer Programming<&#47;a>, Volume&nbsp;2, by <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;">Donald E. Knuth<&#47;a>.

<a id="more"></a><a id="more-573"></a>

<h3>Fundamentals<&#47;h3>

With \(u = (u_{m-1} \ldots u_1 u_0)_b\) and \(v = (v_{n-1} \ldots v_1 v_0)_b\) we wish to compute the integer quotient \(q = \lfloor u&#47;v \rfloor\). As a bonus, our algorithm will also produce the remainder \(r\) such that \(u = q v + r\) with \(0 \leq r < v\). We will assume that \(v \neq 0\) (otherwise the result is undefined) and that \(u \geq v\) (otherwise the result is trivially \(q=0\) and \(r=u\)). Since \(b^{m-1} \leq u < b^m\) and \(b^{n-1} \leq v < b^n\) we have \(b^{m-n-1} < q < b^{m-n+1}\), so \(q\) can be represented using \(m-n\) or \(m-n+1\) digits: \(q = (q_{m-n} \ldots q_1 q_0)_b\) where \(q_{m-n}\) may be zero, but in which case \(q_{m-n-1} \neq 0\) (if \(m > n\)).

We will now consider (long) division from a top-level point of view. It is actually just a formalization of the well-known pencil-and-paper method:

<strong>Algorithm G<&#47;strong>. Given \(u = (u_{m-1} \ldots u_1 u_0)_b\), \(u_{m-1} \neq 0\) and \(v = (v_{n-1} \ldots v_1 v_0)_b\), \(v_{n-1} \neq 0\), with \(m \geq n > 0\), this algorithm outlines how to compute the quotient \(q = (q_{m-n} \ldots q_1 q_0)_b = \lfloor u&#47;v \rfloor\) (we may have \(q_{m-n} = 0\) in which case \(q_{m-n-1} \neq 0\) if \(m > n\)) and the remainder \(r\) such that \(u = q v + r\), \(0 \leq r < v\).

<ul>
<li><strong>G1<&#47;strong>. \(u^{(m-n+1)} \leftarrow (0 u_{m-1} \ldots u_1 u_0)_b\).<&#47;li>
<li><strong>G2<&#47;strong>. \(k \leftarrow m-n\).<&#47;li>
<li><strong>G3<&#47;strong>. \(q_k \leftarrow \left\lfloor (u^{(k+1)}_{k+n} \ldots u^{(k+1)}_{k+1} u^{(k+1)}_k)_b &#47; v \right\rfloor\).<&#47;li>
<li><strong>G4<&#47;strong>. Set \(u^{(k)} \leftarrow u^{(k+1)} - q_k b^k v\) or, equivalently,<&#47;li>

\[
\begin{aligned}
(u^{(k)}_{k+n} \ldots u^{(k)}_{k+1} u^{(k)}_k)_b &\leftarrow (u^{(k+1)}_{k+n} \ldots u^{(k+1)}_{k+1} u^{(k+1)}_k)_b - q_k v, \\
(u^{(k)}_{k-1} \ldots u^{(k)}_1 u^{(k)}_0)_b &\leftarrow (u^{(k+1)}_{k-1} \ldots u^{(k+1)}_1 u^{(k+1)}_0)_b.
\end{aligned}
\]

<li><strong>G5<&#47;strong>. If \(k=0\) then set \(r \leftarrow u^{(0)}\) and exit. Otherwise set \(k \leftarrow k-1\) and go to step&nbsp;<strong>G3<&#47;strong>.<&#47;li>
<&#47;ul>

An essential invariant of this algorithm is

\[
(u^{(k)}_{k+n-1} \ldots u^{(k)}_{k+1} u^{(k)}_k)_b < v \quad \hbox{for} \quad k=0, 1, \ldots, m-n+1.
\]

This can be seen as follows. For \(k=m-n+1\) the invariant is ensured by introducing a zero as the most significant digit of \(u^{(m-n+1)}\) in step&nbsp;<strong>G1<&#47;strong>. For \(k=0,1,\ldots,m-n\) we see from steps&nbsp;<strong>G3<&#47;strong> and&nbsp;<strong>G4<&#47;strong> that \((u^{(k)}_{k+n} \ldots u^{(k)}_{k+1} u^{(k)}_k)_b = (u^{(k+1)}_{k+n} \ldots u^{(k+1)}_{k+1} u^{(k+1)}_k)_b \hbox{ mod } v\) and the inequality follows.

Note that the invariant implies that \(u^{(k)}_{k+n}=0\) for \(k=0, 1, \ldots, m-n\). Furthermore we have that

\[
(u^{(k+1)}_{k+n} \ldots u^{(k+1)}_{k+1} u^{(k+1)}_k)_b = (u^{(k+1)}_{k+n} \ldots u^{(k+1)}_{k+1})_b \cdot b + u^{(k+1)}_k \leq (v-1) b + (b-1) = v b - 1
\]

from which we see that the quotients \(q_k\) computed in step&nbsp;<strong>G3<&#47;strong> are non-negative and smaller than \(b\), as they should be.

Finally, we can verify that the algorithm computes what we intended. We have

\[
\begin{aligned}
r &= u^{(0)} = u^{(1)} - q_0 b^0 v = u^{(2)} - q_1 b^1 v - q_0 b^0 v = \ldots \\
  &= u^{(m-n+1)} - (q_{m-n} b^{m-n} + \cdots + q_0 b^0) v = u - q v.
\end{aligned}
\]

Now for some practical aspects. Note first that all of the \(u^{(k)}\) variables can in fact be represented by a single variable and simply overwrite its digits along the way&#8212;thus ending up with the remainder. Note also that any of the remainder's digits may be zero.

Finally, how do we compute the quotient in step&nbsp;<strong>G3<&#47;strong>? That is in fact the central part of the division algorithm and is the subject of the rest of this article.

<h3>Simple Division<&#47;h3>

Let us first consider computing the quotient of step&nbsp;<strong>G3<&#47;strong> in the special case \(n=1\). So let us assume that \(u < b^2\), \(0 < v < b\) and \(\lfloor u&#47;v \rfloor < b\). As in <a href="&#47;blog&#47;2009&#47;07&#47;implementing-multiple-precision-arithmetic-part-1.html">part 1<&#47;a> we wish to use \(b = b_T\) for some intrinsic integer (C++) type <span class="sputcode">T<&#47;span>, and just as most CPUs have built-in instructions for the most basic addition, subtraction, and multiplication operations, this is also the case for division. More specifically, obtaining the quotient \(q\) and remainder \(r\) such that \(u = q v + r\), where \(0 \leq q < b\), \(0 \leq r < v\), is a quite common instruction. And that instruction is exactly what we need in steps&nbsp;<strong>G3<&#47;strong> and&nbsp;<strong>G4<&#47;strong> above.

However, it is not possible to access such an instruction directly through standard C++. As we did for multiplication, we therefore split \(u\) and \(v\) into smaller parts and do the operation at this smaller scale. So let us assume a number \(h\) exists such that \(h^2 = b\). We now set \(u = (u'_3 u'_2 u'_1 u'_0)_h\) and \(v = (v'_1 v'_0)_h\) and use the algorithms of this article on this representation. A 'simple division' is now of the type \((u'_3 h + u'_2)&#47;v'_1\) and we can do that directly in C++.

We will not go further into the implementation of 'double-precision division', but an example implementation is the function <span class="sputcode">double_div<&#47;span> of <a href="http:&#47;&#47;sputsoftnumbers.svn.sourceforge.net&#47;viewvc&#47;sputsoftnumbers&#47;tags&#47;0.1&#47;src&#47;detail&#47;lowlevel_generic.hpp?revision=88&amp;view=markup"><span class="sputcode">lowlevel_generic.hpp<&#47;span><&#47;a>. You can also see the specialization of this routine for <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;X86">x86<&#47;a> processors with <a href="http:&#47;&#47;gcc.gnu.org&#47;">GCC<&#47;a> compilers in the file <a href="http:&#47;&#47;sputsoftnumbers.svn.sourceforge.net&#47;viewvc&#47;sputsoftnumbers&#47;tags&#47;0.1&#47;src&#47;detail&#47;lowlevel_gcc_x86.hpp?revision=88&amp;view=markup"><span class="sputcode">lowlevel_gcc_x86.hpp<&#47;span><&#47;a>.

For \(n=1\) Algorithm G of the previous section can be greatly simplified if we are interested in just the quotient \(q=(q_{n-1} \ldots q_1 q_0)_b\) and the remainder \(0 \leq r < v\):

<strong>Algorithm S<&#47;strong>. Given \(u = (u_{m-1} \ldots u_1 u_0)_b\) and \(0 < v < b\) with \(m \geq 1\) and \(u_{m-1} \neq 0\), this algorithm computes the quotient \(q = (q_{m-1} \ldots q_1 q_0)_b = \lfloor u&#47;v \rfloor\) (we may have \(q_{m-1} = 0\) in which case \(q_{m-2} \neq 0\) if \(m > 1\)) and the remainder \(r\) such that \(u = q v + r\), \(0 \leq r < v\).

<ul>
<li><strong>S1<&#47;strong>. Set \(r \leftarrow 0\), \(k \leftarrow m-1\).<&#47;li>
<li><strong>S2<&#47;strong>. Set \(q_k \leftarrow \lfloor (r b + u_k)&#47;v \rfloor\), \(r \leftarrow (r b + u_k) \hbox{ mod } v\).<&#47;li>
<li><strong>S3<&#47;strong>. If \(k=0\) then exit. Otherwise set \(k \leftarrow k-1\) and go to step&nbsp;<strong>S2<&#47;strong>.<&#47;li>
<&#47;ul>

<h3>Long Division<&#47;h3>

Let us now consider computing the quotient in step&nbsp;<strong>G3<&#47;strong> in the case \(n > 1\). We therefore assume \(u = (u_n \ldots u_1 u_0)_b\), \(u < b^{n+1}\), and \(v = (v_{n-1} \ldots v_1 v_0)_b\), \(b^{n-1} \leq v < b^n\), with \(n \geq 2\) and \(0 \leq \lfloor u&#47;v \rfloor < b\).

We wish to compute \(q = \lfloor u&#47;v \rfloor\) as fast as possible. How good is a 'first order' approximation, where we use just the two most-significant digits of \(u\) and the most-significant digit of \(v\): \((u_n b + u_{n-1})&#47;v_{n-1}\)? First of all, if \(u_n = v_{n-1}\) this quantity equals \(b\) and we know that \(q \leq b-1\) by assumption, so let us therefore study

\[
\hat{q} = \hbox{min} \left( \left\lfloor \frac{u_n b + u_{n-1}}{v_{n-1}} \right\rfloor, b-1 \right)
\]

This approximate quotient is never too small, as the following theorem states.

<strong>Theorem 1.<&#47;strong> With \(\hat{q}\) as defined above we have \(q \leq \hat{q}\).

<em>Proof.<&#47;em> If \(\hat{q}=b-1\) then since \(q \leq b-1\) by assumption, the statement is true. Assume then that \(\hat{q} = \lfloor (u_n b + u_{n-1})&#47;v_{n-1} \rfloor\). From the properties of the <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Floor_function">floor function<&#47;a> we have \(u_n b + u_{n-1} \leq \hat{q} v_{n-1} + v_{n-1} - 1\) and therefore \(\hat{q} v_{n-1} \geq u_n b + u_{n-1} - v_{n-1} + 1\). We then get<br&#47;>\[
\begin{aligned}
u - \hat{q} v &\leq u - \hat{q} v_{n-1} b^{n-1} \\
              &\leq u_n b^n + \cdots + u_0 - (u_n b + u_{n-1} - v_{n-1} + 1) b^{n-1} \\
			  &= u_{n-2} b^{n-2} + \cdots + u_0 - b^{n-1} + v_{n-1} b^{n-1} < v_{n-1} b^{n-1} \leq v.
\end{aligned}
\]<br&#47;>So \(u - \hat{q} v < v\) and since \(0 \leq u - q v < v\) we must have \(q \leq \hat{q}\).&nbsp;&nbsp;&nbsp;&nbsp;&#x220E;

If \(u\) and \(v\) are scaled appropriately, \(\hat{q}\) will never be too large, either.

<strong>Theorem 2.<&#47;strong> With \(\hat{q}\) as defined above and \(v_{n-1} \geq \lfloor b&#47;2 \rfloor\), we have \(\hat{q} \leq q+2\).

<em>Proof.<&#47;em> Assume that \(\hat{q} \geq q+3\). We get<br&#47;>\[
\hat{q} \leq \frac{u_n b u_{n-1}}{v_{n-1}} = \frac{u_n b^n u_{n-1} b^{n-1}}{v_{n-1} b^{n-1}}
\leq \frac{u}{v_{n-1} b^{n-1}} < \frac{u}{v - b^{n-1}},
\]<br&#47;>since \(v = v_{n-1} b^{n-1} + \cdots + v_0 \leq v_{n-1} b^{n-1} + b^{n-1}\). We cannot have \(v = b^{n-1}\) since that would imply \(\hat{q} = q = u_n\). The relation \(q = \lfloor u&#47;v \rfloor\) implies \(q > u&#47;v - 1\), from which we get<br&#47;>\[
3 \leq \hat{q} - q < \frac{u}{v - b^{n-1}} - \frac{u}{v} + 1 = \frac{u}{v} \left( \frac{b^{n-1}}{v - b^{n-1}} \right) + 1.
\]<br&#47;>We then have<br&#47;>\[
\frac{u}{v} \geq 2 \left( \frac{v - b^{n-1}}{b^{n-1}} \right) \geq 2(v_{n-1} - 1),
\]<br&#47;>and finally<br&#47;>\[
b-4 \geq \hat{q}-3 \geq q = \lfloor u&#47;v \rfloor \geq 2(v_{n-1}-1),
\]<br&#47;>which implies \(v_{n-1} < \lfloor b&#47;2 \rfloor\).&nbsp;&nbsp;&nbsp;&nbsp;&#x220E;

We would expect to come even closer if we consider the 'second order' approximate quotient,

\[
\left\lfloor \frac{u_n b^2 + u_{n-1} b + u_{n-2}}{v_{n-1} b + v_{n-2}} \right\rfloor,
\]

but how much closer? Given some approximate quotient \(\hat{q}\), let us compute the corresponding second order residual

\[
u_n b^2 + u_{n-1} b + u_{n-2} - \hat{q} (v_{n-1} b + v_{n-2})
= \hat{r} b + u_{n-2} - \hat{q} v_{n-2},
\]

where \(\hat{r}\) is the first order residual,

\[
\hat{r} = u_n b + u_{n-1} - \hat{q} v_{n-1}.
\]

By studying the sign of the second order residual we can now get closer to the true quotient.

<strong>Theorem 3.<&#47;strong> Let \(\hat{q}\) be any approximate quotient and \(\hat{r}\) the corresponding first order residual. Now if \(\hat{q} v_{n-2} > b \hat{r} + u_{n-2}\) then \(q < \hat{q}\).

<em>Proof.<&#47;em> Assume \(\hat{q} v_{n-2} > b \hat{r} + u_{n-2}\), equivalent to \(\hat{r} b + u_{n-2} - \hat{q} v_{n-2} + 1 \leq 0\). We then have<br&#47;>\[
\begin{aligned}
u - \hat{q} v &\leq u - \hat{q} v_{n-1} b^{n-1} - \hat{q} v_{n-2} b^{n-2} \\
			  &=    b^{n-1} (u_n b + u_{n-1} - \hat{q} v_{n-1}) + u_{n-2} b^{n-2} + \cdots + u_0 - \hat{q} v_{n-2} b^{n-2} \\
              &<    b^{n-1} \hat{r} + u_{n-2} b^{n-2} + b^{n-2} - \hat{q} v_{n-2} b^{n-2} \\
			  &=    b^{n-2} (\hat{r} b + u_{n-2} - \hat{q} v_{n-2} + 1) \leq 0.
\end{aligned}
\]<br&#47;>So \(u - \hat{q} v < 0 \leq u - q v\) which implies \(q < \hat{q}\).&nbsp;&nbsp;&nbsp;&nbsp;&#x220E;

<strong>Theorem 4.<&#47;strong> Let \(\hat{q}\) be any approximate quotient and \(\hat{r}\) the corresponding first order residual. Now if \(\hat{q} v_{n-2} \leq b \hat{r} + u_{n-2}\) then \(\hat{q} \leq q+1\).

<em>Proof.<&#47;em> Let \(\hat{q} v_{n-2} \leq b \hat{r} + u_{n-2}\) and assume \(\hat{q} \geq q+2\). Now since \(u - q v < v\) we get<br&#47;>\[
\begin{aligned}
u &< (q+1) v \leq (\hat{q}-1) v < \hat{q} (v_{n-1} b^{n-1} + v_{n-2} b^{n-2} + b^{n-2}) - v \\
  &< \hat{q} v_{n-1} b^{n-1} + \hat{q} v_{n-2} b^{n-2} + b^{n-1} - v \\
  &\leq \hat{q} v_{n-1} b^{n-1} + (b \hat{r} + u_{n-2}) b^{n-2} + b^{n-1} - v \\
  &= u_n b^n + u_{n-1} b^{n-1} + u_{n-2} b^{n-2} + b^{n-1} - v \\
  &\leq u_n b^n + u_{n-1} b^{n-1} + u_{n-2} b^{n-2} \leq u.
\end{aligned}
\]<br&#47;>This claims that \(u < u\), a contradiction, so our assumption \(\hat{q} \geq q+2\) must have been wrong.&nbsp;&nbsp;&nbsp;&nbsp;&#x220E;

We now have the following procedure for computing \(\hat{q}\), a very close estimate to \(q\):

<strong>Algorithm Q<&#47;strong>. Let \(u = (u_n \ldots u_1 u_0)_b\) and \(v = (v_{n-1} \ldots v_1 v_0)_b\), \(v_{n-1} \neq 0\), with \(n \geq 2\) and \(0 \leq \lfloor u&#47;v \rfloor < b\) (any digit of \(u\) can be zero and note that the only digits accessed are \(u_n\), \(u_{n-1}\), \(u_{n-2}\), \(v_{n-1}\), and \(v_{n-2}\)). The algorithm computes an integer \(\hat{q}\) such that \(\hat{q}-1 \leq \lfloor u&#47;v \rfloor \leq \hat{q}\) (Theorems&nbsp;1 and&nbsp;4).

<ul>
<li><strong>Q1<&#47;strong>. Set \(\hat{q} \leftarrow \lfloor (u_n b + u_{n-1})&#47;v_{n-1} \rfloor\) and \(\hat{r} \leftarrow (u_n b + u_{n-1}) \hbox{ mod } v_{n-1}\). If \(\hat{q} = b\) (division overflow when \(b=b_T\)) set \(\hat{q} \leftarrow \hat{q} - 1\) and \(\hat{r} \leftarrow \hat{r} + v_{n-1}\) (dealing with division overflow can be avoided by setting \(\hat{q} \leftarrow b-1\) and \(\hat{r} \leftarrow u_n + u_{n-1}\) if \(v_{n-1} = u_n\)).<&#47;li>
<li><strong>Q2<&#47;strong>. While \(\hat{r} < b\) and \(\hat{q} v_{n-2} > b \hat{r} + u_{n-2}\), set \(\hat{q} \leftarrow \hat{q} - 1\) and \(\hat{r} \leftarrow \hat{r} + v_{n-1}\) (Theorem&nbsp;2 assures that this while-loop is executed at most two times if \(v_{n-1} \geq \lfloor b&#47;2 \rfloor\). The check \(\hat{r} < b\) is not necessary but makes sure that we don't deal with numbers that are \(b^2\) or larger in the subsequent comparison).<&#47;li>
<&#47;ul>

We can now combine Algorithm G of the Fundamentals section with the just obtained knowledge of approximating the quotient in the following algorithm for long division:

<strong>Algorithm L<&#47;strong>. Given \(u = (u_{m-1} \ldots u_1 u_0)_b\), \(u_{m-1} \neq 0\) and \(v = (v_{n-1} \ldots v_1 v_0)_b\), \(v_{n-1} \neq 0\), with \(m \geq n > 1\), this algorithm computes the quotient \(q = (q_{m-n} \ldots q_1 q_0)_b = \lfloor u&#47;v \rfloor\) (we may have \(q_{m-n} = 0\) in which case \(q_{m-n-1} \neq 0\) if \(m > n\)) and the remainder \(r\) such that \(u = q v + r\), \(0 \leq r < v\).

<ul>
<li><strong>L1<&#47;strong>. Set \(v \leftarrow d \cdot v\) such that \(v_{n-1} \geq \lfloor b&#47;2 \rfloor\) (letting \(d\) be a power of two is usually the best choice). Similarly, set \((u_m \ldots u_1 u_0)_b \leftarrow d \cdot u\) (ensure \(u\) gets \(n+1\) digits, setting \(u_m=0\) if necessary).<&#47;li>
<li><strong>L2<&#47;strong>. Set \(k \leftarrow m - n\).<&#47;li>
<li><strong>L3<&#47;strong>. Find \(\hat{q}\) such that \(\hat{q}-1 \leq \lfloor (u_{k+n} \ldots u_{k+1} u_k)_b &#47;v \rfloor \leq \hat{q}\) (use Algorithm&nbsp;Q described above).<&#47;li>
<li><strong>L4<&#47;strong>. Make the update \((u_{k+n} \ldots u_{k+1} u_k)_b \leftarrow (u_{k+n} \ldots u_{k+1} u_k)_b - \hat{q} v\).<&#47;li>
<li><strong>L5<&#47;strong>. If the subtraction of step&nbsp;<strong>L4<&#47;strong> produces a borrow (the result is negative) do \(\hat{q} \leftarrow \hat{q} - 1\) and \((u_{k+n} \ldots u_{k+1} u_k)_b \leftarrow (u_{k+n} \ldots u_{k+1} u_k)_b + v\).<&#47;li>
<li><strong>L6<&#47;strong>. Set \(q_k = \hat{q}\).<&#47;li>
<li><strong>L7<&#47;strong>. If \(k=0\) set \(r \leftarrow u&#47;d\) and exit. Otherwise set \(k \leftarrow k-1\) and go to step&nbsp;<strong>L3<&#47;strong>.<&#47;li>
<&#47;ul>

The normalization in step&nbsp;<strong>L1<&#47;strong> such that \(v_{n-1} \geq \lfloor b&#47;2 \rfloor\) does two things. Firstly, it makes sure that the while-loop of the \(\hat{q}\)-computation executes at most two times. Secondly, the probability that the adding back in step&nbsp;<strong>L5<&#47;strong> must be executed is of order \(2&#47;b\) (a proof can be found in Knuth's book).

<h3>Concluding Remarks<&#47;h3>

This and the <a href="&#47;blog&#47;2009&#47;07&#47;implementing-multiple-precision-arithmetic-part-1.html">previous<&#47;a> article have now covered addition, subtraction, multiplication, and division of non-negative integers. I have not yet issued a release of the C++ library implementing these algorithms, but I plan to do it shortly. <del cite="&#47;blog&#47;2011&#47;09&#47;hosting-and-status-for-the-numbers-project.html" datetime="2011-09-28T08:25:00Z">You can follow the <a href="http:&#47;&#47;sourceforge.net&#47;projects&#47;sputsoftnumbers&#47;">project<&#47;a> as it develops at <a href="http:&#47;&#47;sourceforge.net">SourceForge<&#47;a>. You can <a href="http:&#47;&#47;sputsoftnumbers.svn.sourceforge.net&#47;viewvc&#47;sputsoftnumbers&#47;trunk&#47;">browse the source<&#47;a> or check out the source code as
<pre class="sputcode">
svn co https:&#47;&#47;sputsoftnumbers.svn.sourceforge.net&#47;svnroot&#47;sputsoftnumbers&#47;trunk sputsoftnumbers
<&#47;pre><&#47;del>
Bug reports, suggestions for improvements, patches, and other comments are very welcome.

<em>Update 2010-07-03: See the <a href="&#47;numbers&#47;">project page<&#47;a> for more information and the latest articles.<&#47;em>
