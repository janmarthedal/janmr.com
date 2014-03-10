---
layout: post
status: publish
published: true
title: Prime Factors of Factorial Numbers
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: Factorial numbers, \(n! = 1 \cdot 2 \cdots n\), grow very fast with \(n\).
  In fact, \(n! \sim \sqrt{2 \pi n} (n/e)^n\) according to <a href="http://en.wikipedia.org/wiki/Stirling's_approximation">Stirling's
  approximation</a>. The <a href="http://en.wikipedia.org/wiki/Prime_factor">prime
  factors</a> of a factorial number, however, are all relatively small, and the complete
  factorization of \(n!\) is quite easy to obtain.
wordpress_id: 1876
wordpress_url: http://sputsoft.com/blog/?p=1876
date: 2010-10-30 08:47:19.000000000 +02:00
categories:
- mathematics
tags:
- prime numbers
- factorials
- stirling's formula
comments:
- id: 2300
  author: Loafers
  author_email: onguy3n@gmail.com
  author_url: ''
  date: !binary |-
    MjAxMS0wMi0yOCAwODoyNTo0OCArMDEwMA==
  date_gmt: !binary |-
    MjAxMS0wMi0yOCAwNzoyNTo0OCArMDEwMA==
  content: ! "Great article!\r\n\r\nHowever, I'm a little confused.\r\n\r\nYou wrote,
    \"Notice how the exponents do not decrease as the prime numbers increase.\"\r\n\r\nInstead
    of \"do not decrease\" shouldn't it be \"decrease\"?\r\n\r\nOn another minor point,
    for (1) shouldn't the number on top of the summation symbol thingy be n instead
    of infinity?  But, since it's a floor function I guess it doesn't matter.\r\n\r\nPS
    - I've only glanced at some of the other pieces you wrote, but they seem to be
    well written and very informative.  I hope to learn more from you!\r\n\r\nThanks,\r\nLoafers"
- id: 2301
  author: Jan Marthedal Rasmussen
  author_email: jmr@kanooth.com
  author_url: http://kanooth.com
  date: !binary |-
    MjAxMS0wMi0yOCAwOTozMDozMSArMDEwMA==
  date_gmt: !binary |-
    MjAxMS0wMi0yOCAwODozMDozMSArMDEwMA==
  content: ! "Thank you for your comment. It pleases me if you find the site informative.
    That is what I am hoping for!\r\n\r\nYou are correct, it should be &ldquo;Notice
    how the exponents do not increase as the prime numbers increase.&rdquo; It has
    been corrected.\r\n\r\nRegarding the summation in (1), all but a finite number
    of terms will be zero, so it is ok to have an infinite series. Note also that
    the second summation in (1) is finite."
- id: 2452
  author: Pasind
  author_email: perera.pasindu@gmail.com
  author_url: http://ideawide.com
  date: !binary |-
    MjAxMS0xMS0xMCAyMDowOTo0OCArMDEwMA==
  date_gmt: !binary |-
    MjAxMS0xMS0xMCAxOTowOTo0OCArMDEwMA==
  content: Nice article man. I was exactly looking for this for one of my programming
    challenge problems. Thanx
---
<p>Factorial numbers, \(n! = 1 \cdot 2 \cdots n\), grow very fast with \(n\). In fact, \(n! \sim \sqrt{2 \pi n} (n&#47;e)^n\) according to <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Stirling's_approximation">Stirling's approximation<&#47;a>. The <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Prime_factor">prime factors<&#47;a> of a factorial number, however, are all relatively small, and the complete factorization of \(n!\) is quite easy to obtain.<&#47;p>

<a id="more"></a><a id="more-1876"></a>

<p>We will make use of the following fundamental theorem:<&#47;p>

<blockquote>
  <p>\(p \mid a b\) for a prime \(p\), then \(p \mid a\) or \(p \mid b\).<&#47;p>
<&#47;blockquote>

<div style="float:right"><a href="&#47;book&#47;link.php?id=hardy-wright"><img src="&#47;book&#47;hardy-wright.jpg" &#47;><&#47;a><&#47;div>

<p>(Here, \(p \mid a\) means that \(p\) divides \(a\).) This is called Euclid's First Theorem or <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Euclid's_lemma">Euclid's Lemma<&#47;a>. For most, it is intuitively clear, but a proof can be found in, e.g., <a href="&#47;book&#47;link.php?id=hardy-wright">Hardy and Wright: An Introduction to the Theory of Numbers<&#47;a>.<&#47;p>

<p>An application of this theorem to factorial numbers is that if a prime \(p\) is a divisor of \(n!\) then \(p\) must be a divisor of at least one of the numbers \(1, 2, ..., n\). This immediately implies<&#47;p>

<blockquote>
  <p>Every prime factor of \(n!\) is less than or equal to \(n\).<&#47;p>
<&#47;blockquote>

<p>Conversely, every prime number between 2 and \(n\) must be a prime factor of \(n!\).<&#47;p>

<p>Let us introduce the notation \(d_a(b)\) as the number of times \(a\) divides into \(b\). Put more precisely, \(d_a(b) = k\) if and only if \(b&#47;a^k\) is an integer while \(b&#47;a^{k+1}\) is not.<&#47;p>

<p>We now seek to determine \(d_p(n!)\) for all primes \(p \leq n\). From Euclid's First Theorem and the <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Fundamental_theorem_of_arithmetic">Fundamental Theorem of Arithmetic<&#47;a> follows:<&#47;p>

<p>\[
d_p(n!) = d_p(1) + d_p(2) + \cdots + d_p(n)
\]<&#47;p>

<p>The trick here is not to consider the right-hand side term by term, but rather as a whole. Let us take<&#47;p>

<blockquote>
  <p>42! = 1405006117752879898543142606244511569936384000000000<&#47;p>
<&#47;blockquote>

<p>and \(p=3\) as an example. How many of the numbers 1, 2, ..., 42 are divisible by 3? Exactly \(\lfloor 42&#47;3 \rfloor = 14\) of them. But this is not the total count, because some of them are divisible by 3 multiple times. So how many are divisible by \(3^2\)? \(\lfloor 42&#47;3^2 \rfloor = 4\) of them. Similarly, \(\lfloor 42&#47;3^3 \rfloor = 1\). And \(\lfloor 42&#47;3^4 \rfloor = \lfloor 42&#47;3^5 \rfloor = \ldots = 0\). So we have<&#47;p>

<p>\[
d_3(42!) = 14+4+1 = 19.
\]<&#47;p>

<p>This procedure is easily generalized and we have<&#47;p>

<div style="float:right">
(1)
<&#47;div>
<p>\[
d_p(n!) = \sum_{k=1}^\infty \left\lfloor \frac{n}{p^k} \right\rfloor
  = \sum_{k=1}^{\lfloor \log_p(n) \rfloor} \left\lfloor \frac{n}{p^k} \right\rfloor.
\]<&#47;p>

<p>This <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Factorial#Number_theory">identity<&#47;a> was found by the french mathematician <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Adrien-Marie_Legendre">Adrien-Marie Legendre<&#47;a> (see also <a href="&#47;book&#47;link.php?id=proofsbook">Aigner and Ziegler: Proofs from The Book<&#47;a>, page 8, where it is called Legendre's Theorem).<&#47;p>

<p>Doing this for all primes in our example, we get<&#47;p>

<blockquote>
  <p>\(42! = 2^{39} \cdot 3^{19} \cdot 5^9 \cdot 7^6 \cdot 11^3 \cdot 13^3 \cdot 17^2 \cdot 19^2 \cdot 23 \cdot 29 \cdot 31 \cdot 37 \cdot 41\).<&#47;p>
<&#47;blockquote>

<p>Notice how the exponents do not increase as the prime numbers increase. This is true in general. Assume that \(p\) and \(q\) are both primes and \(p < q\). Then \(\log_p(n) \geq \log_q(n)\) and \(n&#47;p^k \geq n&#47;q^k\) for all positive integers \(k\). Using this in equation&nbsp;(1) we get<&#47;p>

<div style="float:right">
(2)
<&#47;div>
<p>\[
d_p(n!) \geq d_q(n!) \quad \hbox{for primes $p$, $q$ with $p < q$}
\]<&#47;p>

<p>and thus<&#47;p>

<p>\[
d_2(n!) \geq d_3(n!) \geq d_5(n!) \geq d_7(n!) \geq d_{11}(n!) \geq \ldots
\]<&#47;p>

<p>What about \(d_k(n!)\) for composite numbers \(k\)? Given the factorization of both \(n!\) and \(k\), this is easy to compute. But if, e.g., the multiplicity of all prime factors of \(k\) are the same, then the relation&nbsp;(2) can be used. Consider \(d_{10}(m)\) for a positive integer \(m\). Since \(10 = 2 \cdot 5\) then<&#47;p>

<p>\[
d_{10}(m) = \min\{ d_2(m), d_5(m) \}.
\]<&#47;p>

<p>But if \(m=n!\) then we can use&nbsp;(2) and we have<&#47;p>

<p>\[
d_{10}(n!) = d_5(n!).
\]<&#47;p>

<p>For instance,<&#47;p>

<blockquote>
  <p>\(d_{10}(42!) = d_5(42!) = \lfloor 42&#47;5 \rfloor + \lfloor 42&#47;5^2 \rfloor = 8 + 1 = 9\),<&#47;p>
<&#47;blockquote>

<p>so there are 9 trailing zeros in the decimal representation of 42!.<&#47;p>
