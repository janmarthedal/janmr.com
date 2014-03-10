---
layout: post
status: publish
published: true
title: Useful Properties of the Floor and Ceil Functions
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "This articles explores some basic properties of the integer functions
  commonly known as floor and ceil. Most of the statements may seem trivial or obvious,
  but I, for one, have a tendency to forget just how exact you can be when it comes
  to expressions&#47;equations where floor or ceil functions appear.\r\n\r\n"
wordpress_id: 647
wordpress_url: http://sputsoft.com/?p=647
date: 2009-09-09 14:36:13.000000000 +02:00
categories:
- mathematics
tags:
- mathematics
- floor
- ceil
- discrete&#47;continuous
comments:
- id: 2279
  author: Computing the Integer Binary Logarithm | Kanooth
  author_email: ''
  author_url: http://kanooth.com/blog/2010/09/computing-the-integer-binary-logarithm.html
  date: !binary |-
    MjAxMC0wOS0yNyAxMDoxODoxMiArMDIwMA==
  date_gmt: !binary |-
    MjAxMC0wOS0yNyAwODoxODoxMiArMDIwMA==
  content: ! '[...] we saw in a previous post, we have  k = lfloor log_2 n rfloor
    quad Leftrightarrow quad 2^k leq n  [...]'
---
This articles explores some basic properties of the integer functions commonly known as floor and ceil. Most of the statements may seem trivial or obvious, but I, for one, have a tendency to forget just how exact you can be when it comes to expressions&#47;equations where floor or ceil functions appear.

<a id="more"></a><a id="more-647"></a>

First, the definitions:

\[
\begin{aligned}
\lfloor x \rfloor &= \max \{ n \in \mathbb{Z} \mid n \leq x \} = \hbox{the greatest integer less than or equal to \(x\),} \\
\lceil  x \rceil  &= \min \{ n \in \mathbb{Z} \mid n \geq x \} = \hbox{the least integer greater than or equal to \(x\),} \\
\end{aligned}
\]

for every real number \(x\).

<h2>Equality<&#47;h2>

What can we say about \(x\) and \(n\) if \(n=\lfloor x \rfloor\) or \(n=\lceil x \rceil\)? First of all, we obviously have \(n = x\) if and only if \(x\) is an integer. Let us now consider the floor function \(\lfloor \cdot \rfloor\). With \(x\) some real number we have \(\lfloor x \rfloor \leq x\), easily seen from the definition. Now let \(n=\lfloor x \rfloor\) and assume \(x-1 \geq n\) which is equivalent to \(n+1 \leq x\). But then \(n\) cannot be the greatest integer less than or equal to \(x\) so we have a contradiction. Since \(x\) was chosen arbitrarily we have \(x-1 < \lfloor x \rfloor\) for all \(x\). Similar considerations can be made for the ceil function \(\lceil \cdot \rceil\) and we get the important inequalities:

\[
x-1 \;<\; \lfloor x \rfloor \;\leq\; x \;\leq\; \lceil x \rceil \;<\; x+1.
\]

At the same time, we have the right-going implications of the following statements (\(x\) is a real number and \(n\) an integer):

\[
\begin{aligned}
n=\lfloor x \rfloor \quad &\Longleftrightarrow \quad n \leq x < n+1, \\
n=\lfloor x \rfloor \quad &\Longleftrightarrow \quad x-1 < n \leq x, \\
n=\lceil x \rceil   \quad &\Longleftrightarrow \quad n-1 < x \leq n, \\
n=\lceil x \rceil   \quad &\Longleftrightarrow \quad x \leq n < x+1. \\
\end{aligned}
\]

Let us show the fourth left-going implication. Assume \(x \leq n < x+1\) and set \(k=\lceil x \rceil\). We then have \(x \leq k < x+1\) from which we get \(n < x+1 \leq k+1\) and \(k < x+1 \leq n+1\), so \(n=k=\lceil x \rceil\). The remaining three left-going implication can be proved in much the same way.

From the statements above we can show some useful equalities:

\[
n=\lfloor -x \rfloor \;\Leftrightarrow\; -x-1 < n \leq -x \;\Leftrightarrow\; x \leq -n < x+1 \;\Leftrightarrow\; -n=\lceil x \rceil,
\]

so \(\lfloor -x \rfloor = -\lceil x \rceil\) for all \(x\), and

\[
\lfloor x \rfloor \leq x < \lfloor x \rfloor+1 \;\Leftrightarrow\; \lfloor x \rfloor + k \leq x+k < \lfloor x \rfloor + k+1 \;\Leftrightarrow\; \lfloor x \rfloor + k = \lfloor x+k \rfloor,
\]

so \(\lfloor x \rfloor + k = \lfloor x+k \rfloor\) for all integer \(k\). Naturally, the similar \(\lceil x \rceil + k = \lceil x+k \rceil\) also holds.

<h2>Inequalities<&#47;h2>

We now consider what can be said when inequalities are involved. Let \(x\) be some real number and \(n\) an integer. We then have the following:

\[
\begin{aligned}
x < n    \quad &\Longleftrightarrow \quad \lfloor x \rfloor < n, \\
n < x    \quad &\Longleftrightarrow \quad n < \lceil x \rceil, \\
x \leq n \quad &\Longleftrightarrow \quad \lceil x \rceil \leq n, \\
n \leq x \quad &\Longleftrightarrow \quad n \leq \lfloor x \rfloor.
\end{aligned}
\]

All we need to show these are \(\lfloor x \rfloor \leq x < \lfloor x \rfloor + 1\) and \(\lceil x \rceil - 1 < x \leq \lceil x \rceil\) from the previous section, and the fact that \(n < m+1\) is equivalent to \(n \leq m\) when \(m\) and \(n\) are integers. Consider, for instance, the third statement from above. If \(x \leq n\) then we have \(\lceil x \rceil - 1 < x \leq n\), which implies \(\lceil x \rceil \leq n\). On the other hand, if \(\lceil x \rceil \leq n\) then \(x \leq n\) because \(x \leq \lceil x \rceil\). The remaining statements are shown in a similar manner.

<h2>Some Increasing Functions<&#47;h2>

Certain functions have special properties when used together with floor and ceil. Such a function \(f: \mathbb{R} \rightarrow \mathbb{R}\) must be continuous and monotonically increasing and whenever \(f(x)\) is integer we must have that \(x\) is integer. An example could be \(f(x) = \sqrt{x}\). Note that being continuous and monotonically increasing ensures a well-defined inverse \(f^{-1}\). One of the requirements can then be formulated as \(f^{-1}(y)\) must be integer for all integer \(y\).

Using the results of the previous sections we get

\[
\begin{aligned}
k = \lfloor f( \lfloor x \rfloor ) \rfloor \quad &\Leftrightarrow \quad k \leq f(\lfloor x \rfloor) < k+1
 \quad \Leftrightarrow \quad f^{-1}(k) \leq \lfloor x \rfloor < f^{-1}(k+1) \\
&\Leftrightarrow \quad f^{-1}(k) \leq x < f^{-1}(k+1)
\quad \Leftrightarrow \quad k \leq f(x) < k+1 \\
&\Leftrightarrow \quad \lfloor f(x) \rfloor = k.
\end{aligned}
\]

Similar derivations can be shown for \(\lceil \cdot \rceil\) and we have

\[
\lfloor f(x) \rfloor = \lfloor f(\lfloor x \rfloor) \rfloor \quad \hbox{and} \quad
\lceil f(x) \rceil = \lceil f(\lceil x \rceil) \rceil,
\]

for this class of functions. For \(f(x) = \sqrt{x}\) we thus have

\[
\left\lfloor \sqrt{x} \right\rfloor = \left\lfloor \sqrt{\lfloor x \rfloor} \right\rfloor 
\quad \hbox{and} \quad
\left\lceil \sqrt{x} \right\rceil = \left\lceil \sqrt{\lceil x \rceil} \right\rceil.
\]

<h2>Fractions<&#47;h2>

The result of the previous section also applies to \(f(x) = (x + n)&#47;m\) for integer \(m, n\) and \(m > 0\). The positivity of \(m\) ensures that \(f\) is monotonically increasing and \(f^{-1}(y) = m y - n\) is clearly integer for integer \(y\). We now have

\[
\left\lfloor \frac{x+n}{m} \right\rfloor = \left\lfloor \frac{\lfloor x \rfloor+n}{m} \right\rfloor
\quad \hbox{and} \quad
\left\lceil \frac{x+n}{m} \right\rceil = \left\lceil \frac{\lceil x \rceil+n}{m} \right\rceil.
\]

From these equalities we have the special cases

\[
\begin{aligned}
\left\lfloor \ldots \left\lfloor \lfloor x&#47;a_1 \rfloor &#47;a_2 \right\rfloor \ldots &#47;a_k \right\rfloor
&= \left\lfloor \frac{x}{a_1 a_2 \cdots a_k} \right\rfloor \hbox{ and} \\
\left\lceil \ldots \left\lceil \lceil x&#47;a_1 \rceil &#47;a_2 \right\rceil \ldots &#47;a_k \right\rceil
&= \left\lceil \frac{x}{a_1 a_2 \cdots a_k} \right\rceil,
\end{aligned}
\]

for integer and positive \(a_j\).

Let us now consider \(q = \lfloor n&#47;m \rfloor\) for integer \(m, n\) and \(m > 0\). We get

\[
\begin{aligned}
q=\left\lfloor \frac{n}{m} \right\rfloor \;&\Leftrightarrow\; \frac{n}{m}-1 < q \leq \frac{n}{m} \;\Leftrightarrow\; n-m < q m \leq n \;\Leftrightarrow\; q m \leq n < (q+1) m \\
 &\Leftrightarrow\; q m \leq n \leq (q+1) m - 1,
\end{aligned}
\]

which provides an interval of integers for the numerator \(n\). Similarly for the ceil function,

\[
\begin{aligned}
q=\left\lceil \frac{n}{m} \right\rceil \;&\Leftrightarrow\; \frac{n}{m} \leq q < \frac{n}{m}+1 \;\Leftrightarrow\; n \leq q m < n+m \;\Leftrightarrow\; (q-1) m < n \leq q m \\
 &\Leftrightarrow\; (q-1) m+1 \leq n \leq q m.
\end{aligned}
\]

When applying floor or ceil to rational numbers, one can be derived from the other. Since \((q-1) m+1 \leq n \leq q m\) can be rewritten as \(q m \leq n+m-1 \leq (q+1) m - 1\) we get

\[
\left\lceil \frac{n}{m} \right\rceil = \left\lfloor \frac{n+m-1}{m} \right\rfloor,
\]

and similarly

\[
\left\lfloor \frac{n}{m} \right\rfloor = \left\lceil \frac{n-m+1}{m} \right\rceil.
\]

<h2>Logarithms<&#47;h2>

Let \(\log_b x\) be the logarithm of \(x\), base \(b\) (\(x > 0\), \(b > 0\), \(b \neq 1\)). We first set \(f(x) = \log_b x\) for integer \(b\), base \(2\) or \(10\) being the most common. Again, we can apply the theorem from earlier; \(f\) is continuous and monotonically increasing and \(f^{-1}(y) = b^y\) is integer for integer \(y\), so we have

\[
\left\lfloor \log_b x \right\rfloor = \left\lfloor \log_b \lfloor x \rfloor \right\rfloor 
\quad \hbox{and} \quad
\left\lceil \log_b x \right\rceil = \left\lceil \log_b \lceil x \rceil \right\rceil,
\]

for integer \(b \geq 2\).

We conclude with some straightforward, but quite useful, statements:

\[
k = \lfloor \log_b x \rfloor \;\Leftrightarrow\; k \leq \log_b x < k+1 \;\Leftrightarrow\; b^k \leq x < b^{k+1}
\]

and

\[
k = \lceil \log_b x \rceil \;\Leftrightarrow\; k-1 < \log_b x \leq k \;\Leftrightarrow\; b^{k-1} < x \leq b^k,
\]

for integer \(k\) and all \(b > 0\), \(b \neq 1\).

<h2>References<&#47;h2>

<div style="float:right"><a href="&#47;book&#47;link.php?id=concrete"><img src="&#47;book&#47;concrete.jpg" &#47;><&#47;a><&#47;div>
<div style="float:right"><a href="&#47;book&#47;link.php?id=taocp1"><img src="&#47;book&#47;taocp1.jpg" &#47;><&#47;a><&#47;div>
Most of the material presented in this article can be found in some form in <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;gkp.html">Concrete Mathematics<&#47;a> by <a href="http:&#47;&#47;math.ucsd.edu&#47;~fan&#47;ron&#47;">R. L. Graham<&#47;a>, <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;">D. E. Knuth<&#47;a>, and <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Oren_Patashnik">O. Patashnik<&#47;a>, and in <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;taocp.html">The Art of Computer Programming<&#47;a>, Volume&nbsp;1, by <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;">Donald E. Knuth<&#47;a>.

The <a href="http:&#47;&#47;www.wikipedia.org">Wikipedia<&#47;a> page <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Floor_and_ceiling_functions">Floor and ceiling functions<&#47;a> furthermore lists a lot of properties (very few proofs or derivations, though).
