---
layout: post
status: publish
published: true
title: Computing the Greatest Common Divisor
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: The greatest common divisor of two integers is the largest positive integer
  that divides them both. This article considers two algorithms for computing gcd(u,v),
  the greatest common divisor of u and v [...]
wordpress_id: 845
wordpress_url: http://sputsoft.com/?p=845
date: 2009-10-29 18:18:49.000000000 +01:00
categories:
- programming
tags:
- algorithms
- C++
- gcd
- generic programming
- numbers project
- number theory
comments:
- id: 842
  author: foobar
  author_email: foobar@eyepaste.com
  author_url: ''
  date: !binary |-
    MjAwOS0xMC0zMCAwMTo0NzoyMyArMDEwMA==
  date_gmt: !binary |-
    MjAwOS0xMC0zMCAwMDo0NzoyMyArMDEwMA==
  content: Does the math on this page not render entirely correctly for anyone else
    on Ubuntu + firefox? For example, u&#47;d is rendered for me as u = d.
- id: 929
  author: Continued Fractions and Continuants | Kanooth
  author_email: ''
  author_url: http://kanooth.com/blog/2009/11/continued-fractions-and-continuants.html
  date: !binary |-
    MjAwOS0xMS0xMCAxNjoyNzo1OCArMDEwMA==
  date_gmt: !binary |-
    MjAwOS0xMS0xMCAxNToyNzo1OCArMDEwMA==
  content: ! '[...] the resemblence to computing the greatest common divisor using
    Euclid&#8217;s algorithm. In fact, the values of u and v are equivalent to those
    during the [...]'
- id: 1931
  author: Borbus
  author_email: borbus@gmail.com
  author_url: ''
  date: !binary |-
    MjAxMC0wNC0yNyAyMjo1Njo1NCArMDIwMA==
  date_gmt: !binary |-
    MjAxMC0wNC0yNyAyMDo1Njo1NCArMDIwMA==
  content: ! "Very interesting article.  Thank you for posting it.  I had believed
    the GMP manual which says that the binary GCD method is always better than the
    Euclidean algorithm and hadn't bothered to test my implementations properly.\r\n\r\nI
    show the same results as SputArithmetic where the binary GCD method is actually
    faster for smaller multiple-precision numbers, so I suspect this is because our
    long divisions are not as efficient as GMP (although you have done better than
    me, GMP is about 100x faster than my implementation :P )."
- id: 2101
  author: BlockoS &raquo; GCD and destroy
  author_email: ''
  author_url: http://blog.blockos.org/?p=110
  date: !binary |-
    MjAxMC0wNi0yNyAyMjoxNzo1NCArMDIwMA==
  date_gmt: !binary |-
    MjAxMC0wNi0yNyAyMDoxNzo1NCArMDIwMA==
  content: ! '[...] started reading the Wikipedia entry about Binary GCD. And after
    some interweb jumps I ended on this article. The Stein&rsquo;s algorithm looked
    cool. If you look at Sputsoft code, you&#8217;ll realize that the [...]'
- id: 2624
  author: ! 'Snippet: Greatest Common Divisor, Euclid&#8217;s Algorithm | Kanooth'
  author_email: ''
  author_url: http://kanooth.com/blog/2011/11/snippet-gcd-euclid.html
  date: !binary |-
    MjAxMi0xMS0xNSAwNzoxODo1NyArMDEwMA==
  date_gmt: !binary |-
    MjAxMi0xMS0xNSAwNjoxODo1NyArMDEwMA==
  content: ! '[...] common divisor of two non-negative integers using Euclid&#8217;s
    algorithm. More information: Computing the Greatest Common Divisor Source: [...]'
- id: 2625
  author: ! 'Snippet: Greatest Common Divisor, Stein&#8217;s Algorithm | Kanooth'
  author_email: ''
  author_url: http://kanooth.com/blog/2011/11/snippet-gcd-stein.html
  date: !binary |-
    MjAxMi0xMS0xNSAwNzoyNDoyMyArMDEwMA==
  date_gmt: !binary |-
    MjAxMi0xMS0xNSAwNjoyNDoyMyArMDEwMA==
  content: ! '[...] common divisor of two non-negative integers using Stein&#8217;s
    algorithm. More information: Computing the Greatest Common Divisor Source: [...]'
---
The greatest common divisor of two integers is the largest positive integer that divides them both. This article considers two algorithms for computing \(\hbox{gcd}(u,v)\), the greatest common divisor of \(u\) and \(v\).

<a id="more"></a><a id="more-845"></a>

Some key properties of \(\hbox{gcd}\) are:

<ol>
<li>\(\hbox{gcd}(u,0) = |u|\).<&#47;li>
<li>\(\hbox{gcd}(u,v) = \hbox{gcd}(-u,v)\).<&#47;li>
<li>\(\hbox{gcd}(u,v) = \hbox{gcd}(v,u)\).<&#47;li>
<li>\(\hbox{gcd}(u,v) = \hbox{gcd}(u,v+n u)\) for any integer \(n\).<&#47;li>
<li>\(\hbox{gcd}(u,v) = d \cdot \hbox{gcd}(u&#47;d,v&#47;d)\) if \(d\) divides both \(u\) and \(v\).<&#47;li>
<li>\(\hbox{gcd}(u,v) = \hbox{gcd}(u&#47;d,v)\) if \(d\) is prime and divides \(u\) but not \(v\).<&#47;li>
<&#47;ol>

Property 1 with \(u=0\) takes care of the special case \(u=v=0\). In what follows we assume that \(u\) and \(v\) are not both zero.

One way to define \(\hbox{gcd}(u,v)\) is the following. Consider the set of all positive integers that divide both \(u\) and \(v\). This set is not empty since it always contains 1. It is also bounded since no divisor exceeds \(|u|\) or \(|v|\). Therefore, this set contains a maximum element, which is equal to \(\hbox{gcd}(u,v)\). From this definition Properties&nbsp;1, 2, and 3 follow easily. For the sake of simplicity, easily justified by Property&nbsp;2 and&nbsp;3, we will only consider non-negative \(u\) and \(v\).

Consider now Property 4. We prove this by showing that the set of divisors of \(u\) and \(v\) is equal to the set of divisors of \(u\) and \(v+n u\) (and hence, their gcd's must be equal). Consider then a positive integer \(d\) that divides \(u\) and \(v\). Obviously, \(d\) also divides \(v+n u\). Assume now that some \(d\) divides \(u\) and \(r=v+n u\). Then \(d\) also divides \(r-n u=v\).

Another useful way to define \(\hbox{gcd}(u,v)\) is possible for positive \(u\) and \(v\). According to the <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Fundamental_theorem_of_arithmetic">fundamental theorem of arithmetic<&#47;a> we can write

\[
u = \prod_{p \; \rm prime} p^{u_p},
\]

and similarly for \(v\). We now have

\[
\hbox{gcd}(u,v) = \prod_{p \; \rm prime} p^{\min(u_p,v_p)}.
\]

Properties 5 and 6 follow from this equality.

<h2>Euclid's Algorithm<&#47;h2>

Euclid's algorithm appeared in <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Euclid">Euclid<&#47;a>'s <a href="http:&#47;&#47;aleph0.clarku.edu&#47;~djoyce&#47;java&#47;elements&#47;toc.html">Elements<&#47;a> (Propositions&nbsp;1 and&nbsp;2 of <a href="http:&#47;&#47;aleph0.clarku.edu&#47;~djoyce&#47;java&#47;elements&#47;bookVII&#47;bookVII.html">Book VII<&#47;a>) around 300 BC, but was probably known before this.

The algorithm builds upon Properties&nbsp;1 and&nbsp;4 from above. The value of \(n\) in Property&nbsp;4 is chosen to be \(n=-\lfloor v&#47;u \rfloor\) which leads to the equality \(\hbox{gcd}(u,v) = \hbox{gcd}(u, v \hbox{ mod } u)\).

The algorithm can be implemented quite concisely in C++, one way of doing it being the following:
<pre class="sputcode">
  template <typename NUM>
  NUM gcd_euclid(NUM u, NUM v)
  {
    while (true) {
      if (!v) return u;
      u %= v;
      if (!u) return v;
      v %= u;
    }
  }
<&#47;pre>
Note that this implementation is almost identical to the <a href="http:&#47;&#47;www.boost.org">Boost<&#47;a> <a href="http:&#47;&#47;www.boost.org&#47;doc&#47;libs&#47;1_43_0&#47;boost&#47;math&#47;common_factor_rt.hpp">implementation<&#47;a>, which, however, checks for zero-valued variables by comparing to an actual zero-object instead of relying on an object-to-bool conversion.

This generic implementation works for both built-in integer C++ types and number objects such as <span class="sputcode">natural_number<&#47;span> from the <a href="&#47;numbers&#47;">SputArithmetic<&#47;a> library.

Note that every time <span class="sputcode">u %= v<&#47;span> is executed we have \(u \leftarrow r\) where \(u = q v + r\) and \(0 \leq r < v\) behind the scenes. With the exception of the very first time this statement executes (where we may have \(u < v\)) we have \(q \geq 1\). This implies

\[
u = q v + r \geq v + r > 2r,
\]

<div style="float:right"><a href="&#47;book&#47;link.php?id=taocp2"><img src="&#47;book&#47;taocp2.jpg" &#47;><&#47;a><&#47;div>
which in turn means that the value of \(u\) at least halves every time <span class="sputcode">u %= v<&#47;span> is executed. Of course, a similar statement holds for <span class="sputcode">v %= u<&#47;span>. This shows that Euclid's algorithm computes a remainder (roughly) at most \(\log_2 u + \log_2 v\) times. For a thorough analysis see Section&nbsp;4.5.3 of <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;taocp.html">The Art of Computer Programming<&#47;a>, Volume&nbsp;2, by <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;">Donald E. Knuth<&#47;a>.

Two interesting things about Euclid's algorithm should be noted. First, the analysis of Euclid's algorithm is intimately tied to <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Continued_fraction">continued fractions<&#47;a> (<em>update 2009-11-10:<&#47;em> See also <a href="&#47;blog&#47;2009&#47;11&#47;continued-fractions-and-continuants.html">Continued Fractions and Continuants<&#47;a>). Second, the input numbers that make the algorithm perform the most remainder-computations are two consecutive <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Fibonacci_number">Fibonacci<&#47;a> numbers&#8212;supposedly the first practical application of the Fibonacci sequence.

<h2>Stein's Algorithm<&#47;h2>

Another way to compute the greatest common divisor was published by Josef Stein in 1967. It builds upon Properties&nbsp;4 (with \(n=-1\)), 5, and&nbsp;6 and thus only relies on subtraction, division by two and checking whether a number is even. Since division by two and odd&#47;even checking are especially attractive on binary computers, the algorithm is also known as the binary gcd algorithm.

A possible implementation is this:
<pre class="sputcode">
  template <typename NUM>
  NUM gcd_stein(NUM u, NUM v)
  {
    if (!u) return v;
    if (!v) return u;
    unsigned s = std::min(shift_to_uneven(u), shift_to_uneven(v));
    while (u != v) {
      if (u > v) {
        u -= v;
        shift_to_uneven(u);
      } else {
        v -= u;
        shift_to_uneven(v);
      }
    }
    return u <<= s;
  }
<&#47;pre>

Since the algorithm itself only works for positive numbers, the first two lines take care of the cases where one input number is zero. Next, the value of \(u_2\) is determined (the number of 2-factors, in the notation introduced earlier) and at the same time setting \(u \leftarrow u&#47;2^{u_2}\) (which is what <span class="sputcode">shift_to_uneven(u)<&#47;span> does). Similarly \(v_2\) is determined, setting \(v \leftarrow v&#47;2^{v_2}\), and then finally \(s \leftarrow \min(u_2,v_2)\). Assuming for the moment that the while-loop puts the greatest common divisor of two odd numbers into \(u\), the algorithm finishes by returning \(2^s u\). We have thus used the equality \(\hbox{gcd}(u,v) = 2^{\min(u_2,v_2)} \hbox{gcd}(u&#47;2^{u_2},v&#47;2^{v_2})\).

We now focus on the while-loop. Note that the first time the loop is entered both \(u\) and \(v\) are odd. Now assume \(u\) is larger than \(v\). The algorithm sets \(u \leftarrow u - v\) which makes \(u\) even, and then repeatedly divides \(u\) by \(2\) until \(u\) is odd. (If \(u\) had been smaller than \(v\) the same operations would have been performed with \(u\) and \(v\) interchanged.) We now see that at the beginning of each while-loop iteration, both \(u\) and \(v\) are odd.

It is clear that each iteration of the while-loop makes the larger of \(u\) and \(v\) strictly smaller. So at one point either \(u\) or \(v\) becomes zero and we can use Property&nbsp;1 to terminate. But it is convenient to stop just before this happens and since only even numbers are divided by two, this can only occur through a subtraction. And a subtraction can only result in zero if the two quantities involved are equal. This explains the termination criteria for the while-loop.

The <span class="sputcode">shift_to_uneven<&#47;span> function could have the following implementation.
<pre class="sputcode">
  template <typename NUM>
  inline unsigned shift_to_uneven(NUM& n)
  {
    unsigned shift = 0;
    while (!(n & 1u)) {
      n >>= 1;
      ++shift;
    }
    return shift;
  }
<&#47;pre>

Some remarks are in order with regard to efficiency. Every time <span class="sputcode">shift_to_uneven<&#47;span> is executed inside the while-loop we <em>know<&#47;em> that the number is even, so the initial check <span class="sputcode">!(n & 1u)<&#47;span> is superfluous. Similarly the return value of <span class="sputcode">shift_to_uneven<&#47;span> is not used inside the while-loop, but it should be fairly easy for the compiler to observe this.

Finally, if working with multiple-precision numbers, the binary shift operation can be expensive compared to a (constant-time) test-bit method, which tests whether a certain bit is set. Given a test-bit method, zero bits could be counted, starting from the least-significant bit, followed by a single binary shift operation. Both <a href="&#47;numbers&#47;">SputArithmetic<&#47;a> and <a href="http:&#47;&#47;gmplib.org">GMP<&#47;a> has such a test-bit method, but the code naturally becomes less generic.

How many times is the while-loop executed, in the worst case? Either \(u\) or \(v\) is reduced by at least a factor two, so, similar to Euclid's algorithm, the loop is executed at most \(\log_2 u + \log_2 v\) times.

<div style="float:right"><a href="&#47;book&#47;link.php?id=stepanov09"><img src="&#47;book&#47;stepanov09.jpg" &#47;><&#47;a><&#47;div>
It should be noted that <a href="http:&#47;&#47;www.stepanovpapers.com">Alex Stepanov<&#47;a> has written <a href="http:&#47;&#47;www.stepanovpapers.com&#47;notes.pdf">some notes<&#47;a> that, among many other things, deal with generic implementations of both Euclid's and Stein's gcd algorithms (see Section&nbsp;10.2). Stepanov has also written the book <a href="http:&#47;&#47;www.elementsofprogramming.com">Elements of Programming<&#47;a> with <a href="http:&#47;&#47;www.mcjones.org&#47;paul&#47;">Paul McJones<&#47;a>, which presents a mathematical approach to programming. The book also mentions Euclid's and Stein's algorithms, but the treatment in the notes is more comprehensive.

<h2>Running Time Comparisons<&#47;h2>

This section presents some results from comparing the Euclid and Stein algorithms for computing the greatest common divisor. All tests were run on a 2.5 GHz AMD Phenom 9850 Quad-Core, running 64 bit <a href="http:&#47;&#47;www.mepis.org&#47;">Mepis Linux<&#47;a> and using a <a href="http:&#47;&#47;gcc.gnu.org">GCC<&#47;a> 4.2.4 compiler.

<h3>Built-in integer C++ types<&#47;h3>

The following experiment was done.

<ol>
<li>Create an array (of length, say, 2000) of random numbers, uniformly distributed from 1 to the largest representable value.<&#47;li>
<li>Compute the gcd of the first and second number, the second and third number, the third and fourth, and so on, until all numbers from the array have been used. Add together all the gcd-results (for some simple algorithm validation and to avoid unwanted compiler optimizations).<&#47;li>
<li>Perform Step 2 a fixed number of times (so a second or so passes).<&#47;li>
<&#47;ol>

Steps 2 and 3 were timed using different gcd algorithms (but using the same array of numbers): The Euclid and Stein algorithms from this article, an optimized Stein's algorithm, and the Euclid and Stein algorithms from <a href="http:&#47;&#47;www.boost.org">Boost<&#47;a>.

The results can be summarized as follows.

<ul>
<li>The implementation of Euclid's algorithm presented in this article and the <a href="http:&#47;&#47;www.boost.org&#47;doc&#47;libs&#47;1_43_0&#47;boost&#47;math&#47;common_factor_rt.hpp"><span class="sputcode">gcd_euclidean<&#47;span> version<&#47;a> from <a href="http:&#47;&#47;www.boost.org">Boost<&#47;a> performed virtually identically.<&#47;li>
<li>This article's implementation of Stein's algorithm could be optimized a little, but the effects were no more than around 3%.<&#47;li>
<li>For 32 and 64 bit unsigned integers, Stein's algorithm was faster than Euclid's by 12% and 37%, respectively.<&#47;li>
<li>For 8 and 16 bit unsigned integers, Euclid's algorithm was faster than Stein's by around 13% (I am not sure why these smaller word sizes changed the faster algorithm).<&#47;li>
<li>The <a href="http:&#47;&#47;www.boost.org&#47;doc&#47;libs&#47;1_43_0&#47;boost&#47;math&#47;common_factor_rt.hpp"><span class="sputcode">gcd_binary<&#47;span> version<&#47;a> of Stein's algorithm from <a href="http:&#47;&#47;www.boost.org">Boost<&#47;a> performed worst of all for all built-in data types, around 70-75% slower than the Stein's algorithm from this article.<&#47;li>
<&#47;ul>

<h3>The SputArithmetic Library<&#47;h3>

A number of files were created. One with 100 random numbers consisting of 1-2000 bits, with the bit length also chosen at random. Another file with numbers consisting of 1-4000 bits, and so on, thereby ending up with several files where the average bit size for each file were around 1000, 2000, 4000, 8000, 12000, and so on.

The procedure was then the same as for the built-in types, see steps&nbsp;2 and&nbsp;3 from the previous section. Similarly, Euclid's and Stein's algorithm from this article and from Boost were used, along with an optimized version of Stein's algorithm (using a test-bit method as mentioned earlier).

[caption id="" align="alignnone" width="767" caption="Figure 1. Average number of bits per input number along the 1. axis, and average milliseconds per gcd along the 2. axis."]<img alt="Figure 1" src="&#47;images&#47;blog&#47;gcd_sputarith.png" title="GCD algorithms using SputArithmetic" width="767" height="518" &#47;>[&#47;caption]
The results are illustrated in Figure&nbsp;1, where only Euclid's and the optimized Stein's algorithm are depicted. The following comments regard the test algorithms not shown.

<ul>
<li>The two versions of Euclid's algorithm were indistinguishable.<&#47;li>
<li>The generic Stein's algorithm from this article was indistinguishable from the Boost version.<&#47;li>
<li>The generic Stein's algorithm was consistently around 32% slower than the optimized version.<&#47;li>
<&#47;ul>

As can be seen in the figure, Euclid's algorithm was faster than Stein's from an average of around 12000 bits or more.

Note that although Boost's version of Stein's algorithm was relatively slow for the built-in integer types, here there was no difference compared to the generic Stein's algorithm. This is most likely due to the fact that the majority of the time for multiple-precision arithmetic is spent doing the actual arithmetic operations, where the Boost algorithm's indirect indexing was too slow compared to the fast processor arithmetic. Strangely, Boost defaults to using the binary Stein's algorithm for built-in unsigned types and Euclid's algorithm otherwise. A resonable choice, but their Stein's algorithm could use some rewriting.

<h3>The GMP Library<&#47;h3>

The same test method and data files as the SputArithmetic test were used, and GMP equivalents of this article's Euclid and optimized Stein algorithms were tested. The results can be seen in Figure&nbsp;2. This time, Euclid's algorithm was faster than Stein's for all number sizes.

[caption id="" align="alignnone" width="770" caption="Figure 2. Average number of bits per input number along the 1. axis, and average milliseconds per gcd along the 2. axis."]<img alt="Figure 2" src="&#47;images&#47;blog&#47;gcd_gmp.png" title="GCD algorithms using GMP" width="770" height="514" &#47;>[&#47;caption]
Although this article is by no means a SputArithmetic versus GMP face-off, a comparison can rightly be made. The exact same input data and equivalent algorithms were used. For Euclid's algorithm, the GMP algorithm was consistently 4.5-5.0 times faster. The same was the case for Stein's algorithm, although the running times approached each other as the bit size of the input numbers went down.

One more algorithm was tested, by the way, and that was GMP's own gcd algorithm. The results were not shown in the figure, however, because they were (as good as) identical to the results of the Stein algorithm. According to the <a href="http:&#47;&#47;gmplib.org&#47;manual&#47;Binary-GCD.html">GMP manual<&#47;a>, the binary Stein's algorithm is in fact used. For large input numbers, however, GMP's own gcd function apparently switches to another method. The same page also states that the <em>"binary algorithm has so far been found to be faster than the Euclidean algorithm everywhere."<&#47;em> Well, not everywhere.

<h2>Conclusion<&#47;h2>

The purpose of this article was to present and compare two common algorithms for computing the greatest common divisor of two integers: Euclid's and Stein's (binary) algorithm. Both algorithms work well, and only a constant factor will usually distinguish them, if implemented properly.

On the basis of the results presented in this article, the following can be said. If the input numbers fit into the processor's natural word size, Stein's algorithm was faster than Euclid's. For multiple-precision numbers, Euclid's algorithm was faster than Stein's. This immediately suggests a hybrid method: Use Euclid's algorithm until the involved numbers fit into a register each, and then use Stein's algorithm to finish. Such a hybrid method becomes less generic, however.

If I had to choose a single all-purpose gcd algorithm, it would be Euclid's. It is simple to implement and it generally performs very well.

The running time results are not conclusive. Implementations details and testing methods can always be discussed but most importantly: Different hardware setups should be tried (and perhaps different compilers). If anyone is interested, I can make the test programs available for download.

<i>(Update 2011-11-23: Source code for Euclid's and Stein's algorithm are available as snippets <a href="&#47;blog&#47;2011&#47;11&#47;snippet-gcd-euclid.html">gcd_euclid<&#47;a> and <a href="&#47;blog&#47;2011&#47;11&#47;snippet-gcd-stein.html">gcd_stein<&#47;a>.)<&#47;i>
