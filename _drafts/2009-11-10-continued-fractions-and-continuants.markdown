---
layout: post
status: publish
published: true
title: Continued Fractions and Continuants
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "We will be considering continued fractions of the form\r\n\\[\r\na_0 +
  \\displaystyle\\frac{1}{a_1 + \\displaystyle\\frac{1}{\\ddots + \\displaystyle\\frac{1}{a_{n-1}
  + \\displaystyle\\frac{1}{a_n}}}}\r\n\\]\r\nwhere the \\(a_k\\)'s are real numbers
  called the partial quotients [...]"
wordpress_id: 904
wordpress_url: http://sputsoft.com/?p=904
date: 2009-11-10 16:27:42.000000000 +01:00
categories:
- programming
- mathematics
tags:
- algorithms
- C++
- continued fraction
- continuant
- quadratic irrationality
- Fibonacci number
comments:
- id: 930
  author: Computing the Greatest Common Divisor | SputSoft
  author_email: ''
  author_url: http://kanooth.com/blog/2009/10/computing-the-greatest-common-divisor.html
  date: !binary |-
    MjAwOS0xMS0xMCAxNjo0ODowOSArMDEwMA==
  date_gmt: !binary |-
    MjAwOS0xMS0xMCAxNTo0ODowOSArMDEwMA==
  content: ! '[...] of Euclid&#8217;s algorithm is intimately tied to continued fractions
    (update 2009-11-10: See also Continued Fractions and Continuants). Second, the
    input numbers that make the algorithm perform the most remainder-computations
    are two [...]'
- id: 1307
  author: The Stern-Brocot Tree of Fractions | Kanooth
  author_email: ''
  author_url: http://kanooth.com/blog/2009/12/the-stern-brocot-tree-of-fractions.html
  date: !binary |-
    MjAwOS0xMi0wNSAxNDowOTowNCArMDEwMA==
  date_gmt: !binary |-
    MjAwOS0xMi0wNSAxMzowOTowNCArMDEwMA==
  content: ! '[...] Stern-Brocot tree is intimately tied to continued fractions. See
    the article Continued Fractions and Continuants for some basic properties that
    we will use below. Especially equations&nbsp;(8) and&nbsp;(10) from [...]'
- id: 1985
  author: wj lentz
  author_email: wjlentz@gmail.com
  author_url: ''
  date: !binary |-
    MjAxMC0wNS0xOSAyMjoyODo1NiArMDIwMA==
  date_gmt: !binary |-
    MjAxMC0wNS0xOSAyMDoyODo1NiArMDIwMA==
  content: ! "I enjoyed your article very much and hope to see more. \n\nUsing your
    notation, a continued fraction has converged when the following ratio is one to
    the accuracy you desire.\n\n  a(n) + &#47;&#47;a(n-1),a(n-2),...,a(0)&#47;&#47;\t
    \         a(0) + &#47;&#47;a(1),a(2),...,a(n)&#47;&#47;\n--------------------------------------
    \ =     -------------------------------\n  a(n) + &#47;&#47;a(n-1),a(n-2),...,a(1)&#47;&#47;
    \          a(0) + &#47;&#47;a(1),a(2),...,a(n-1)&#47;&#47;\n\nNote that the order
    of terms is reversed and the last term is a(1) in the denominator on the left.
    \ I believe you can deduce this immediately from continuants?  (see bottom)\n\nThe
    continued fraction itself may be calculated as an infinite product deduced from
    the above relation:\n\na(0) + &#47;&#47;a(1),a(2),...,a(n)&#47;&#47; =  \n\na(0)
    x  (a(1) + 1&#47;a(0)) x (a(2) + 1&#47;(a(1) + 1&#47;a(0)) x (a(3) + 1&#47;(a(2)
    ..... \n----------------------------------------------------------------------------.....
    \          x\n           a(1) x (a(2)+1&#47;a(1)) x (a(3) + 1&#47;(a(2) + 1&#47;a(1))
    \n\na(n) + &#47;&#47;a(n-1),a(n-2),...,a(0)&#47;&#47;\n-------------------------------------\na(n)
    + &#47;&#47;a(n-1),a(n-2),...,a(1)&#47;&#47;\n\nwhere I have taken some liberty
    with notation for clarity\n\nif P(0) = a(0) and Pn = a(n) + 1&#47;P(n-1),  Q(1)=
    a(1) and Q(n)=a(n)+1&#47;Q(n-1) then\nthe continued fraction is:\n\n(P(0) P(1)
    P(2) .... )&#47;(Q(1) Q(2) .... )  which has converged when P(n)&#47;Q(n) = 1\n\nI
    hope you will forgive my unsolicited comments, but I was inspired by your article
    on continuants to think in a different way about continued fractions.\n\nI believe
    Euler proved that (a,b,c,d,...,z) = (z,...,d,c,b,a), which was close to his notation
    for a continuant, from which the above also follows. \n\nwjl"
- id: 2162
  author: ! 'Book Review: The Book of Numbers | Kanooth'
  author_email: ''
  author_url: http://kanooth.com/blog/2010/05/book-review-the-book-of-numbers.html
  date: !binary |-
    MjAxMC0wNy0yMSAwOTo1MzowNCArMDIwMA==
  date_gmt: !binary |-
    MjAxMC0wNy0yMSAwNzo1MzowNCArMDIwMA==
  content: ! '[...] 6. Further Fruitfulness of Fractions. Some topics are Farey fractions
    and Ford circles, Euler&#8217;s totient numbers, decimal digit cycles, Pythagorean
    fractions, continued fractions. [...]'
- id: 2749
  author: Good Rational Bounds | Kanooth
  author_email: ''
  author_url: http://kanooth.com/blog/2013/01/good-rational-bounds.html
  date: !binary |-
    MjAxMy0wMS0wNyAxMjozODozNSArMDEwMA==
  date_gmt: !binary |-
    MjAxMy0wMS0wNyAxMTozODozNSArMDEwMA==
  content: ! '[...] is where continued fractions come in, see an earlier post for
    some basic notation and properties. Let ( x = a_0 + &#47;!&#47;a_1, a_2, ldots,
    a_n&#47;!&#47; ) where all [...]'
---
We will be considering continued fractions of the form

\[
a_0 + \displaystyle\frac{1}{a_1 + \displaystyle\frac{1}{\ddots + \displaystyle\frac{1}{a_{n-1} + \displaystyle\frac{1}{a_n}}}}
\]

<a id="more"></a><a id="more-904"></a>

where the \(a_k\)'s are real numbers called the partial quotients. Continued fractions can be greatly <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Generalized_continued_fraction">generalized<&#47;a>, where both the "numerators" (here all equal to one) and the partial quotients can be more general mathematical objects. Most common, however, are <em>regular continued fractions<&#47;em> where \(a_0\) is an integer and \(a_1, \ldots, a_n\) are positive integers. For easier notation we introduce

\[
&#47;\!&#47;a_1, a_2, \ldots, a_n&#47;\!&#47; = \displaystyle\frac{1}{a_1 + \displaystyle\frac{1}{\ddots + \displaystyle\frac{1}{a_{n-1} + \displaystyle\frac{1}{a_n}}}}
\]

where \(&#47;\!&#47; \, &#47;\!&#47; = 0\) for \(n=0\).

<div style="float:right"><a href="&#47;book&#47;link.php?id=khinchin"><img src="&#47;book&#47;khinchin.jpg" &#47;><&#47;a><&#47;div>
<div style="float:right"><a href="&#47;book&#47;link.php?id=concrete"><img src="&#47;book&#47;concrete.jpg" &#47;><&#47;a><&#47;div>
<div style="float:right"><a href="&#47;book&#47;link.php?id=taocp2"><img src="&#47;book&#47;taocp2.jpg" &#47;><&#47;a><&#47;div>
Most of the theory in this article is based on Section&nbsp;4.5.3 from <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;taocp.html">The Art of Computer Programming<&#47;a>, Volume&nbsp;2, by <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;">Donald E. Knuth<&#47;a> and Section&nbsp;6.7 from <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;gkp.html">Concrete Mathematics<&#47;a> by <a href="http:&#47;&#47;math.ucsd.edu&#47;~fan&#47;ron&#47;">Graham<&#47;a>, <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;">Knuth<&#47;a>, and <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Oren_Patashnik">Patashnik<&#47;a>. See also <a href="&#47;book&#47;link.php?id=khinchin">Continued Fractions<&#47;a> by A. Ya. Khinchin.

<h2>Basic Properties<&#47;h2>

Some properties suggest themselves immediately from the definition:

<div style="float:right">(1)<&#47;div>
\[
&#47;\!&#47; a_1, a_2, \ldots, a_n &#47;\!&#47; = 1 &#47; \left( a_1 + &#47;\!&#47; a_2, \ldots, a_n &#47;\!&#47; \right), \quad n \geq 1,
\]

<div style="float:right">(2)<&#47;div>
\[
&#47;\!&#47; a_1, \ldots, a_n &#47;\!&#47; = &#47;\!&#47; a_1, \ldots, a_k + &#47;\!&#47; a_{k+1}, \ldots, a_n &#47;\!&#47; &#47;\!&#47;, \quad 1 \leq k \leq n,
\]

<div style="float:right">(3)<&#47;div>
\[
&#47;\!&#47; 0, a_1, \ldots, a_n &#47;\!&#47; = a_1 + &#47;\!&#47; a_2, \ldots, a_n &#47;\!&#47;, \quad n \geq 1,
\]

<div style="float:right">(4)<&#47;div>
\[
&#47;\!&#47; a_1, \ldots, a_{n-1}, a_n, 1 &#47;\!&#47; = &#47;\!&#47; a_1, \ldots, a_{n-1}, a_n + 1 &#47;\!&#47;, \quad n \geq 1.
\]

The relations (2) and (3) can be combined into the following,

<div style="float:right">(5)<&#47;div>
\[
\begin{aligned}
&&#47;\!&#47; a_1, \ldots, a_{k-1}, a_k, 0, a_{k+1}, a_{k+2}, \ldots, a_n &#47;\!&#47; \\
& \qquad = &#47;\!&#47; a_1, \ldots, a_{k-1}, a_k + a_{k+1}, a_{k+2}, \ldots, a_n &#47;\!&#47;, \quad 1 \leq k < n.
\end{aligned}
\]

From (3), (4), and (5) we see that any continued fraction can be written without a zero element (the first partial quotient \(a_0\) may be zero, though) and without the last element being equal to one. For instance,

\[
&#47;\!&#47; 0,4,3,0,2,1 &#47;\!&#47; = 4 + &#47;\!&#47; 3,0,2,1 &#47;\!&#47; = 4 + &#47;\!&#47; 5,1 &#47;\!&#47; = 4 + &#47;\!&#47; 6 &#47;\!&#47;.
\]

<h2>Continuants<&#47;h2>

We now turn to continuant polynomials or simply continuants. They are defined as

<ul>
<li>\(K_0() = 1\),
<&#47;li>
<li>\(K_1(x_1) = x_1\),
<&#47;li>
<li>\(K_n(x_1, \ldots, x_n) = K_{n-1}(x_1, \ldots, x_{n-1}) x_n + K_{n-2}(x_1, \ldots, x_{n-2})\) for \(n \geq 2\).
<&#47;li>
<&#47;ul>

The subscripts are included to make clear how many parameters there are. Note how

<div style="float:right">(6)<&#47;div>
\[
F_{n+1} = K_n(1, \ldots, 1),
\]

where \(F_0, F_1, \ldots\) are the well-known <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Fibonacci_number">Fibonacci numbers<&#47;a> (\(F_0=F_1=0\) and \(F_k=F_{k-1}+F_{k-2}\) for \(k \geq 2\)). This is easily seen by setting \(x_k=1\) for all \(k\) in the definition.

We also have

<div style="float:right">(7)<&#47;div>
\[
K_n(x_1, \ldots, x_n) \geq K(y_1, \ldots, y_n), \quad \hbox{when } x_k \geq y_k,
\]

which can be shown straightforwardly by induction. We will use this fact later on.

Continuants are connected to continued fractions in several ways, an essential one being

<div style="float:right">(8)<&#47;div>
\[
a_0 + &#47;\!&#47; a_1, a_2, \ldots, a_n &#47;\!&#47; = \frac{K_{n+1}(a_0, a_1, \ldots, a_n)}{K_n(a_1, a_2, \ldots, a_n)}.
\]

To prove this identity, we need

<div style="float:right">(9)<&#47;div>
\[
\begin{aligned}
K_n(x_1, \ldots, x_{n-1}, x_n + y) &= K_{n-1}(x_1, \ldots, x_{n-1}) (x_n + y) + K_{n-2}(x_1, \ldots, x_{n-2}) \\
&= K_{n-1}(x_1, \ldots, x_{n-1}) x_n + K_{n-1}(x_1, \ldots, x_{n-1}) y + K_{n-2}(x_1, \ldots, x_{n-2}) \\
&= K_n(x_1, \ldots, x_{n-1}, x_n) + K_{n-1}(x_1, \ldots, x_{n-1}) y. \\
\end{aligned}
\]

We can now proceed with proving (8), which we show by induction. First we observe that it is true for \(n=0\) and \(n=1\),

\[
a_0 = \frac{K_1(a_0)}{K_0()}, \quad a_0 + &#47;\!&#47; a_1 &#47;\!&#47; = \frac{K_2(a_0, a_1)}{K_1(a_1)} = \frac{a_0 a_1 + 1}{a_1}.
\]

We now get

\[
\begin{aligned}
a_0 + &#47;\!&#47; a_1, \ldots, a_n, a_{n+1} &#47;\!&#47; &= a_0 + &#47;\!&#47; a_1, \ldots, a_{n-1}, a_n + 1&#47;a_{n+1} &#47;\!&#47; \\
&= \frac{K_{n+1}(a_0, \ldots, a_{n-1}, a_n + 1&#47;a_{n+1})}{K_n(a_1, \ldots, a_{n-1}, a_n + 1&#47;a_{n+1})} \\
&= \frac{K_{n+1}(a_0, a_1, \ldots, a_n) + K_n(a_0, a_1, \ldots, a_{n-1})&#47;a_{n+1}}{K_n(a_1, a_2, \ldots, a_n) + K_{n-1}(a_1, a_2, \ldots, a_{n-1})&#47;a_{n+1}} \\
&= \frac{K_{n+1}(a_0, a_1, \ldots, a_n) a_{n+1} + K_n(a_0, a_1, \ldots, a_{n-1})}{K_n(a_1, a_2, \ldots, a_n) a_{n+1} + K_{n-1}(a_1, a_2, \ldots, a_{n-1})} \\
&= \frac{K_{n+2}(a_0, \ldots, a_n, a_{n+1})}{K_{n+1}(a_1, \ldots, a_n, a_{n+1})},
\end{aligned}
\]

which was what we wanted.

A useful equality for continuants is

<div style="float:right">(10)<&#47;div>
\[
\left[
\begin{matrix}
K_n(x_1, \ldots, x_n) & K_{n-1}(x_1, \ldots, x_{n-1}) \\
K_{n-1}(x_2, \ldots, x_n) & K_{n-2}(x_2, \ldots, x_{n-1})
\end{matrix}
\right]
= \left[
\begin{matrix}
x_1 & 1 \\
1 & 0
\end{matrix}
\right]
\left[
\begin{matrix}
x_2 & 1 \\
1 & 0
\end{matrix}
\right]
\cdots
\left[
\begin{matrix}
x_n & 1 \\
1 & 0
\end{matrix}
\right]
\]

for \(n \geq 2\). For \(n=2\) we have

\[
\left[
\begin{matrix}
K_2(x_1, x_2) & K_1(x_1) \\
K_1(x_2) & K_0()
\end{matrix}
\right]
= \left[
\begin{matrix}
x_1 x_2 + 1 & x_1 \\
x_2 & 1
\end{matrix}
\right]
= \left[
\begin{matrix}
x_1 & 1 \\
1 & 0
\end{matrix}
\right]
\left[
\begin{matrix}
x_2 & 1 \\
1 & 0
\end{matrix}
\right],
\]

and the general case is easily shown using induction. Taking the determinant of both sides of (10) leads to

<div style="float:right">(11)<&#47;div>
\[
K_n(x_1, \ldots, x_n) K_{n-2}(x_2, \ldots, x_{n-1}) - K_{n-1}(x_2, \ldots, x_n) K_{n-1}(x_1, \ldots, x_{n-1}) = (-1)^n.
\]

This shows that when \(u = K_{n+1}(a_0, a_1, \ldots, a_n)\) and \(v = K_n(a_1, a_2, \ldots, a_n)\) then not only is \(u&#47;v = a_0 + &#47;\!&#47; a_1, a_2, \ldots, a_n &#47;\!&#47;\), but \(u\) and \(v\) are also relatively prime.

<h2>Evaluating Continued Fractions<&#47;h2>

Let us consider how to evaluate a continued fraction in C++, given access to the partial quotients \(a_0, a_1, \ldots, a_n\) through a <a href="http:&#47;&#47;www.sgi.com&#47;tech&#47;stl&#47;ForwardIterator.html">forward iterator<&#47;a>. One way is to use Equation&nbsp;(1) which leads to
<pre class="sputcode">
template <typename NUM, typename In>
NUM evaluate_continued_fraction_rec(In first, In last)
{
  if (first == last) return (NUM) 0;
  return *first + evaluate_continued_fraction_rec2<NUM>(first+1, last);
}
<&#47;pre>
where \(&#47;\!&#47; a_1, a_2, \ldots, a_n &#47;\!&#47;\) is evaluated recursively by
<pre class="sputcode">
template <typename NUM, typename In>
NUM evaluate_continued_fraction_rec2(In first, In last)
{
  if (first == last) return (NUM) 0;
  return 1&#47;(*first + evaluate_continued_fraction_rec2<NUM>(first+1, last));
}
<&#47;pre>

A drawback to this approach is the recursive calls. Another way to evaluate is to use a special case of Equation&nbsp;(2),

<div style="float:right">(12)<&#47;div>
\[
&#47;\!&#47; a_1, \ldots, a_{n-1}, a_n &#47;\!&#47; = &#47;\!&#47; a_1, \ldots, a_{n-1} + 1&#47;a_n &#47;\!&#47;, \quad \hbox{for } n \geq 2.
\]

So given a <a href="http:&#47;&#47;www.sgi.com&#47;tech&#47;stl&#47;BidirectionalIterator.html">bidirectional iterator<&#47;a> the evaluation can be done as
<pre class="sputcode">
template <typename NUM, typename Bi>
NUM evaluate_continued_fraction_rev(Bi first, Bi last)
{
  if (last == first) return (NUM) 0;
  NUM r = 0;
  while (--last != first)
    r = 1&#47;(*last + r);
  return *last + r;
}
<&#47;pre>

Using continuants, we can actually evaluate a continued fraction using a forward iterator and without any recursive calls. The key is to use the relation&nbsp;(8) which leads to the following algorithm.
<pre class="sputcode">
template <typename NUM, typename In>
void evaluate_continued_fraction(In first, In last, NUM& num, NUM& den)
{
  if (first == last) { num = 0; den = 1; return; }
  NUM x, u = *first, v = 1, s = 1, t = 0;
  while (true) {
    if (++first == last) { num = u; den = v; return; }
    x = *first;
    s += x*u;
    t += x*v;
    if (++first == last) { num = s; den = t; return; }
    x = *first;
    u += x*s;
    v += x*t;
  }
}
<&#47;pre>
Note how the result is seperated into numerator and denominator. Recall from the previous section that the corresponding fraction is guaranteed to be at its lowest terms.

<h2>Constructing a Continued Fraction<&#47;h2>

Let \(x\) be a real number. Consider now the following sequences:

\[
\begin{aligned}
a_0 = \lfloor x \rfloor, \qquad &x_0 = x - a_0, \\
a_{k+1} = \lfloor 1&#47;x_k \rfloor, \qquad &x_{k+1} = 1&#47;x_k - a_{k+1},
\end{aligned}
\]

for \(k = 0, 1, \ldots\). We then have

\[
x = a_0 + x_0 = a_0 + \frac{1}{a_1 + x_1} = a_0 + \frac{1}{a_1 + \displaystyle\frac{1}{a_2 + x_2}} = \ldots.
\]

If \(x_k=0\) then \(a_{k+1}, \ldots\) are undefined and \(x = a_0 + &#47;\!&#47; a_1, a_2, \ldots, a_n &#47;\!&#47;\) with \(n=k\). If all \(x_k\)'s are non-zero then \(x = a_0 + &#47;\!&#47; a_1, a_2, \ldots &#47;\!&#47;\), but we will delay the argument of why this infinite continued fraction makes sense until the final section.

It should be clear from the previous section that the value of the a regular continued fraction is a rational number. So let us try to reverse the process when&nbsp;\(x\) is a rational number. Given \(x=u&#47;v\) with integer&nbsp;\(u\) and positive integer&nbsp;\(v\), how can \(a_0, a_1, \ldots\) be computed? Setting \(u_k&#47;v_k = x_k\) in the construction process from above, we get

\[
\begin{aligned}
a_0 = \left\lfloor \frac{u}{v} \right\rfloor, \qquad &\frac{u_0}{v_0} = \frac{u}{v} - a_0 = \frac{u - \lfloor u&#47;v \rfloor v}{v} = \frac{u \hbox{ mod } v}{v}, \\
a_{k+1} = \left\lfloor \frac{v_k}{u_k} \right\rfloor, \qquad &\frac{u_{k+1}}{v_{k+1}} = \frac{v_k}{u_k} - a_{k+1} = \frac{v_k - \lfloor v_k&#47;u_k \rfloor u_k}{u_k} = \frac{v_k \hbox{ mod } u_k}{u_k},
\end{aligned}
\]

for \(k = 0, 1, \ldots\). If this is turned into a C++ algorithm, we get the following. (The main loop has been <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Loop_unwinding">unrolled<&#47;a> to avoid the \(u \leftrightarrow v\) swapping and a little tweaking was also necessary when the algorithm starts because C++ integer division <span style="font-family:courier">u&#47;v<&#47;span> is not always equal to \(\lfloor u&#47;v \rfloor\) when the result is negative.)
<pre class="sputcode">
template <typename NUM, typename Out>
void fraction_to_continued_fraction(NUM u, NUM v, Out out)
{
  if (v < 0) { u = -u; v = -v; }
  NUM r = u % v;
  if (r < 0) { u -= v; r += v; }
  *out++ = u&#47;v;
  u = r;
  while (true) {
    if (!u) return;
    *out++ = v&#47;u;
    v %= u;
    if (!v) return;
    *out++ = u&#47;v;
    u %= v;
  }
}
<&#47;pre>
Notice the resemblence to <a href="&#47;blog&#47;2009&#47;10&#47;computing-the-greatest-common-divisor.html">computing the greatest common divisor<&#47;a> using Euclid's algorithm. In fact, the values of <span style="font-family:courier">u<&#47;span> and <span style="font-family:courier">v<&#47;span> are equivalent to those during the <span style="font-family:courier">gcd_euclid<&#47;span> function of that article. Furthermore, Euclid's algorithm always terminates, so the construction process always terminates when the input number is rational. In fact, a continued fraction is finite if and only if it represents a rational number.

<h2>Infinite Continued Fractions<&#47;h2>

Let us consider the construction of a continued fraction for any real number&nbsp;\(x\). Recall that at any stage of the construction, we have

\[
x = a_0 + &#47;\!&#47; a_1, a_2, \ldots, a_k + x_k &#47;\!&#47;.
\]

How close is \(x\) to \(a_0 + &#47;\!&#47; a_1, a_2, \ldots, a_k &#47;\!&#47;\) for some \(k\)? We get

\[
\begin{aligned}
x - \left( a_0 + &#47;\!&#47; a_1, a_2, \ldots, a_k &#47;\!&#47; \right)
&= &#47;\!&#47; a_1, \ldots, a_k, 1&#47;x_k &#47;\!&#47; - &#47;\!&#47; a_1, a_2, \ldots, a_k &#47;\!&#47; \\
&= \frac{K_k(a_2, \ldots, a_k, 1&#47;x_k)}{K_{k+1}(a_1, \ldots, a_k, 1&#47;x_k)} - \frac{K_{k-1}(a_2, \ldots, a_k)}{K_k(a_1, a_2, \ldots, a_k)} \\
&= \frac{(-1)^k}{K_k(a_1, a_2, \ldots, a_k) K_{k+1}(a_1, \ldots, a_k, 1&#47;x_k)},
\end{aligned}
\]

using (1), (8), (11), and&nbsp;(12). This relation shows several important things (which also hold for finite continued fractions \(x = a_0 + &#47;\!&#47; a_1, a_2, \ldots, a_n &#47;\!&#47;\) when \(k < n\)):

<ul>
<li>\(a_0 + &#47;\!&#47; a_1, a_2, \ldots, a_k &#47;\!&#47;\) is <em>less<&#47;em> than \(x\) for even \(k\) and <em>greater<&#47;em> than \(x\) for odd \(k\).
<&#47;li>
<li>Using (8) and (9) we see that the function \(y \mapsto a_0 + &#47;\!&#47; a_1, a_2, \ldots, a_k+y &#47;\!&#47;\) is continuous and strictly increasing (\(k\) even) or strictly decreasing (\(k\) odd) when \(y\) goes from 0 to 1, and since \(0 < x_k < 1\) we have that \(x\) always lies <em>between<&#47;em> \(a_0 + &#47;\!&#47; a_1, a_2, \ldots, a_k &#47;\!&#47;\) and \(a_0 + &#47;\!&#47; a_1, a_2, \ldots, a_k+1 &#47;\!&#47;\).
<&#47;li>
<li>The denominator of the error term grows, at least, exponentially,

<div style="float:right">(13)<&#47;div>
\[
\begin{aligned}
&K_k(a_1, a_2, \ldots, a_k) K_{k+1}(a_1, \ldots, a_k, 1&#47;x_k) \\
&\qquad \geq K_k(1, \ldots, 1) K_{k+1}(1, \ldots, 1) = F_{k+1} F_{k+2} \geq (\phi+1)^{k+1}&#47;5,
\end{aligned}
\]

<p>using (6), (7) and with \(\phi = (1+\sqrt{5})&#47;2 \sim 1.618\).<&#47;p>
<&#47;li>
<li>Since the error term goes to zero as \(n \rightarrow \infty\), infinite continued fractions make sense as the following limit,

\[
a_0 + &#47;\!&#47; a_1, a_2, \ldots &#47;\!&#47; = a_0 + \lim_{k\rightarrow\infty} &#47;\!&#47; a_1, a_2, \ldots, a_k &#47;\!&#47;.
\]

<&#47;li>
<&#47;ul>

The bound for \(F_{k+1} F_{k+2}\) in (13) can be derived by using the formula for the \(k\)th Fibonacci number, \(F_k = (\phi^k - (1-\phi)^k)&#47;\sqrt{5}\),

\[
\begin{aligned}
F_{k+1} F_{k+2} &= \left( \phi^{2k+3} + (1-\phi)^{2k+3} - (\phi(1-\phi))^{k+1} \right)&#47;5 \\
&= \left( \phi^{2k+3} + (1-\phi)(\phi-1)^{2k+2} + (-1)^k \right)&#47;5 \\
&\geq \phi^{2k+2} \left(\phi - \frac{1}{\phi^{2k+1}} \right)&#47;5 \geq \left(\phi^2\right)^{k+1}&#47;5 = (\phi+1)^{n+1}&#47;5,
\end{aligned}
\]

where we use that \(\phi^2-\phi-1=0\), \(\phi(1-\phi)=-1\), and \(1 < \phi < 2\).

As an example of an infinite continued fraction it can be shown that

\[
e = 2 + &#47;\!&#47; 1,2,1,1,4,1,1,6,1,1,8,1,1,10,1,1,12,1,1,14,\ldots &#47;\!&#47;.
\]

Evaluating the truncated finite continued fractions \(2\), \(2 + &#47;\!&#47; 1 &#47;\!&#47;\), \(2 + &#47;\!&#47; 1,2 &#47;\!&#47;\), and so on, we get

\[
2,3,\frac{8}{3}, \frac{11}{4}, \frac{19}{7}, \frac{87}{32}, \frac{106}{39}, \frac{193}{71}, \frac{1264}{465}, \frac{1457}{536}, \frac{2721}{1001}, \frac{23225}{8544}, \frac{25946}{9545}, \frac{49171}{18089}, \ldots,
\]

where each fraction is a better and better approximation to \(e\) (the absolute error for \(49171&#47;18089\) is around \(-3 \cdot 10^{-10}\)).

As mentioned earlier, the continued fraction of some \(x\) is finite if and only if \(x\) is rational. The continued fraction representation for \(x\) is infinite and <em>eventually periodic<&#47;em>,

\[
a_0 + &#47;\!&#47; a_1, \ldots, a_m, b_1, \ldots, b_n, b_1, \ldots, b_n, \ldots &#47;\!&#47;, \quad m \geq 0, n \geq 1,
\]

if and only if \(x\) is a <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Quadratic_irrational">quadratic irrationality<&#47;a> (proved in <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;taocp.html">TAOCP<&#47;a>, vol.&nbsp;2, Exercise&nbsp;4.5.3&#8211;12). A quadratic irrationality is a number of the form \((\sqrt{d}-u)&#47;v\) where \(d\), \(u\), and \(v\) are integers, \(d > 0\), \(v \neq 0\), and \(d\) is not a <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Square_number">perfect square<&#47;a>.

Some special cases of this theorem are:

<ul>
<li>\(\sqrt{n^2+1} = n + &#47;\!&#47; 2n,2n,\ldots &#47;\!&#47;\),
<&#47;li>
<li>\(\sqrt{n^2+2} = n + &#47;\!&#47; n,2n,n,2n,\ldots &#47;\!&#47;\),
<&#47;li>
<&#47;ul>

for positive integers \(n\). To prove the first of these identities let \(x = n + &#47;\!&#47; 2n,2n,\ldots &#47;\!&#47;\). Then \(x-n = y\) where \(y = 1&#47;(2n + y)\), implying \(x-n = 1&#47;(x+n)\) and finally \(x^2-n^2=1\). The second identity can be proved similarly.

<h2>Concluding Remarks<&#47;h2>

This article on continued fractions was supposed to be fairly short and just contain the most basic properties, but the subject turned out to be vast and very interesting. More articles related to continued fractions will likely follow.
