---
layout: post
status: publish
published: true
title: Fast Evaluation of Fibonacci Numbers
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "The integer <a href=\"http://oeis.org/A000045\">sequence</a> 0, 1, 1,
  2, 3, 5, 8, 13, ... is well known as the <a href=\"http://en.wikipedia.org/wiki/Fibonacci\">Fibonacci</a>
  sequence. It is easily defined by \\(F_0 = 0\\), \\(F_1 = 1\\) and \\(F_n = F_{n-1}
  + F_{n-2}\\) for \\(n \\geq 2\\).\r\n\r\nTo compute \\(F_n\\) you could use this
  definition directly, but that leads to a <em>highly inefficient</em> algorithm that
  is both recursive and which uses a number of additions which grows exponentially
  with <span class=\"mthi\">n</span>."
wordpress_id: 2120
wordpress_url: http://sputsoft.com/blog/?p=2120
date: 2011-03-11 11:01:12.000000000 +01:00
categories:
- programming
- mathematics
tags:
- algorithms
- Fibonacci number
- numbers project
comments:
- id: 2304
  author: loafers
  author_email: onguy3n@gmail.com
  author_url: ''
  date: !binary |-
    MjAxMS0wMy0xMSAxMjoyMzoyMCArMDEwMA==
  date_gmt: !binary |-
    MjAxMS0wMy0xMSAxMToyMzoyMCArMDEwMA==
  content: ! "really interesting.  thanks for sharing!\r\n\r\n(now you won't be the
    only one that likes your article ;)"
- id: 2627
  author: ! 'Snippet: Fibonacci Number Evaluator | Kanooth'
  author_email: ''
  author_url: http://kanooth.com/blog/2011/11/snippet-fibonacci-number-evaluator.html
  date: !binary |-
    MjAxMi0xMS0xNSAwODozNTo0MCArMDEwMA==
  date_gmt: !binary |-
    MjAxMi0xMS0xNSAwNzozNTo0MCArMDEwMA==
  content: ! '[...] Fibonacci number using a number of steps propertional to the logarithm
    of (n). More information: Fast Evaluation of Fibonacci Numbers Source: fibonacci_number.hpp
    Test: [...]'
---
The integer <a href="http:&#47;&#47;oeis.org&#47;A000045">sequence<&#47;a> 0, 1, 1, 2, 3, 5, 8, 13, ... is well known as the <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Fibonacci">Fibonacci<&#47;a> sequence. It is easily defined by \(F_0 = 0\), \(F_1 = 1\) and \(F_n = F_{n-1} + F_{n-2}\) for \(n \geq 2\).

To compute \(F_n\) you could use this definition directly, but that leads to a <em>highly inefficient<&#47;em> algorithm that is both recursive and which uses a number of additions which grows exponentially with <span class="mthi">n<&#47;span>.

<a id="more"></a><a id="more-2120"></a>

The first observation that leads to a better algorithm is that we can iteratively compute \(F_2, F_3, \ldots, F_n\) and at each step, we only need the previous two values from the sequence. So if we set
\[
T(a,b) = (a+b, a)
\]
and \(r(a,b)=b\) then we have \(F_n = r(T^n(1,0))\), where \(T^n\) means that the operator \(T\) is applied <span class="mthi">n<&#47;span> times (and \(T^0\) is the identity). This reduces the number of iterations to <span class="mthi">n<&#47;span> which is much much better than exponential growth.

<div style="float:right"><a href="&#47;book&#47;link.php?id=sicp"><img src="&#47;book&#47;sicp.jpg" &#47;><&#47;a><&#47;div>
But it can get even better. The following method is inspired by an exercise in the book <a href="&#47;book&#47;link.php?id=sicp">Structure and Interpretation of Computer Programs<&#47;a> (see <a href="http:&#47;&#47;mitpress.mit.edu&#47;sicp&#47;full-text&#47;book&#47;book-Z-H-11.html#%_sec_1.2.4">Exercise 1.19<&#47;a>). The key observation is that if we introduce
\[
T_{p,q}(a,b) = (a q + a p + b q, b p + a q)
\]
then we have both \(T(a,b)=T_{0,1}(a,b)\) and
\[
T_{p,q}^2(a,b) = T_{p,q}(a q + a p + b q, b p + a q) = \ldots
= T_{p^2+q^2,2 p q+q^2}(a,b).
\]
Why is this important? Because now we have
<ol>
<li>\(T_{p,q}^0(a,b) = (a,b)\)<&#47;li>
<li>\(T_{p,q}^{2k}(a,b) = (T_{p,q}^2)^k(a,b) = T_{p^2+q^2,2 p q+q^2}^k(a,b)\)<&#47;li>
<li>\(T_{p,q}^{2k+1}(a,b) = T_{p,q}^{2k}(T_{p,q}(a,b)) = T_{p,q}^{2k}(a q + a p + b q, b p + a q)\)<&#47;li>
<&#47;ol>
Notice how this type of reduction rules are very similar to those found in the <a href="&#47;blog&#47;2011&#47;01&#47;evaluation-of-powers.html">Evaluation of Powers post<&#47;a>. Let us look at an example and try to evaluate \(F_{20} = r(T^{20}(1,0)) = r(T_{0,1}^{20}(1,0))\) using these rules:
\[
\begin{split}
T_{0,1}^{20}(1,0) &= (T_{0,1}^2)^{10}(1,0) = T_{1,1}^{10}(1,0) = (T_{1,1}^2)^5(1,0) = T_{2,3}^5(1,0) = T_{2,3}^4(T_{2,3}(1,0)) \\
&= T_{2,3}^4(5,3) = (T_{2,3}^2)^2(5,3) = T_{13,21}^2(5,3) = T_{610,987}(5,3) = (10946,6765)
\end{split}
\]
Then we just have to extract the second component (as done by applying the \(r\) function) and we get \(F_{20}=6765\).

It is clear that the number and type of steps depend on the binary representation of <span class="mthi">n<&#47;span> when computing \(F_n\) using this method. Actually, reduction rule 2 will be performed \(\lfloor\log_2(n)\rfloor\) times and the number of times reduction rule 3 is performed corresponds to the number of 1s in the binary representation of <span class="mthi">n<&#47;span>. So the total number of steps needed for evaluating \(F_n\) using this method is logarithmic in <span class="mthi">n<&#47;span>.

Let us look at a <span class="sputcode">C++<&#47;span> implementation. A straightforward implementation is this:
<pre class="sputcode">
fibtype fib_rec(fibtype a, fibtype b, fibtype p, fibtype q, unsigned count) {
  if (count == 0)
    return b;
  if (count % 2 == 0)
    return fib_rec(a, b, p*p+q*q, 2*p*q+q*q, count&#47;2);
  return fib_rec(b*q+a*q+a*p, b*p+a*q, p, q, count-1);
}
<&#47;pre>
where \(F_n\) = <span class="sputcode">fib_rec(1, 0, 0, 1, n)<&#47;span> (<span class="sputcode">fibtype<&#47;span> is just a <span class="sputcode">typedef<&#47;span> for a proper integer type.) It can be made iterative and improved at bit in the following way:
<pre class="sputcode">
fibtype fibonacci(unsigned n) {
  if (n <= 1) return n;
  fibtype a=1, b=0, p=0, q=1, tmp;
  while (n != 1) {
    if (n % 2 != 0) {
        tmp = b*q + a*q + a*p;
        b   = b*p + a*q;
        a   = tmp;
    }
    tmp = p*p + q*q;
    q   = (2*p + q)*q;
    p   = tmp;
    n &#47;= 2;
  }
  return b*p + a*q;
}
<&#47;pre>
The most important improvement here is probably the observation that \(r(T_{p,q}(a,b)) = b p + a q\).

I don't claim that this is the fastest possible method for evaluating (single) Fibonacci numbers, but it certainly beats the "traditional" methods mentioned in the beginning (it may be inferior for small <span class="mthi">n<&#47;span>, though). Note also that as long as the numbers fit into the registers of the computer, the time necessary to perform each step is bounded by a constant. If multiple-precision is needed, however, this may no longer the case.

Please inform me of other fast ways to compute Fibonacci numbers.

<i>(Update 2011-11-23: The source for the last algorithm can be found as <a href="&#47;blog&#47;2011&#47;11&#47;snippet-fibonacci-number-evaluator.html">a snippet<&#47;a>)<&#47;i>
