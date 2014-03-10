---
layout: post
status: publish
published: true
title: An Infinite Series Involving a Sideways Sum
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "I found a recent <a href=\"http:&#47;&#47;math.stackexchange.com&#47;questions&#47;432250&#47;how-does-one-easily-calculate-sum-limits-n-1-infty-frac-mathrmpopn\">question<&#47;a>
  on <a href=\"http:&#47;&#47;math.stackexchange.com\">Mathematics Stack Exchange<&#47;a>
  quite interesting. It simply asked\r\n<blockquote>\r\nHow does one easily calculate
  \\(\\sum\\limits_{n=1}^\\infty\\frac{\\mathrm{pop}(n)}{n(n+1)}\\) ?\r\n<&#47;blockquote>\r\nHere
  \\(\\mathrm{pop}(n)\\) denotes the \"population count\" or \"sideways sum\", which
  is the number of 1s in the binary representation of \\(n\\) (<a href=\"http:&#47;&#47;oeis.org&#47;A000120\">A000120<&#47;a>).\r\n\r\n"
wordpress_id: 2722
wordpress_url: http://kanooth.com/blog/?p=2722
date: 2013-07-03 08:56:35.000000000 +02:00
categories:
- mathematics
tags:
- infinite series
- binary numbers
- stackexchange
- nerd-sniping
- sideways sum
comments: []
---
I found a recent <a href="http:&#47;&#47;math.stackexchange.com&#47;questions&#47;432250&#47;how-does-one-easily-calculate-sum-limits-n-1-infty-frac-mathrmpopn">question<&#47;a> on <a href="http:&#47;&#47;math.stackexchange.com">Mathematics Stack Exchange<&#47;a> quite interesting. It simply asked
<blockquote>
How does one easily calculate \(\sum\limits_{n=1}^\infty\frac{\mathrm{pop}(n)}{n(n+1)}\) ?
<&#47;blockquote>
Here \(\mathrm{pop}(n)\) denotes the "population count" or "sideways sum", which is the number of 1s in the binary representation of \(n\) (<a href="http:&#47;&#47;oeis.org&#47;A000120">A000120<&#47;a>).

<a id="more"></a><a id="more-2722"></a>

The user <a href="http:&#47;&#47;math.stackexchange.com&#47;users&#47;59379&#47;achille-hui">achille hui<&#47;a> provided a <a href="http:&#47;&#47;math.stackexchange.com&#47;a&#47;432336&#47;2043">very nice answer<&#47;a> which I would like to describe in some detail here. First, he introduces the function
\[
\theta_k(n) = \begin{cases}1,&\text{ if the $k$th bit of $n$ is set,}\\0,&\text{ otherwise.}\end{cases}
\]
which makes it possible to write the series as
\[
\sum_{n=1}^\infty\frac{\mathrm{pop}(n)}{n(n+1)} = \sum_{n=1}^\infty \sum_{k=0}^\infty \frac{\theta_k(n)}{n(n+1)} = \sum_{k=0}^\infty \sum_{n=1}^\infty \frac{\theta_k(n)}{n(n+1)}.
\]
After reversing the order of summation (which requires <a href="http:&#47;&#47;www.math.ubc.ca&#47;~feldman&#47;m321&#47;twosum.pdf">justification<&#47;a>), he asks: For fixed \(k\), which values of \(n\) has \(\theta_k(n)=1\)? Note here that \(n\) has the \(k\)th bit set if and only if \(\lfloor n&#47;2^k \rfloor\) has the zeroth bit set. And a number has the zeroth bit set if and only if that number is odd. So \(\theta_k(n)=1\) if and only if \(\lfloor n&#47;2^k \rfloor = 2 l + 1\) for some \(l = 0, 1, 2, \ldots\). This means
\[
\begin{aligned}
\theta_k(n)=1 \quad&\Leftrightarrow\quad 2 l + 1 \leq n&#47;2^k < 2 l + 2 \\
&\Leftrightarrow\quad (2 l + 1) 2^k \leq n \leq (2 l + 2) 2^k - 1,
\end{aligned}
\]
for some \(l = 0, 1, 2, \ldots\). This provides us with the intervals of \(n\) that we are interested in, so we have
\[
\begin{aligned}
\sum_{n=1}^\infty\frac{\mathrm{pop}(n)}{n(n+1)}
 &= \sum_{k=0}^\infty \sum_{n=1}^\infty \frac{\theta_k(n)}{n(n+1)} \\
 &= \sum_{k=0}^\infty \sum_{l=0}^\infty \sum_{n=(2 l + 1) 2^k}^{(2 l + 2) 2^k - 1} \frac{1}{n(n+1)} \\
 &= \sum_{k=0}^\infty \sum_{l=0}^\infty \sum_{n=(2 l + 1) 2^k}^{(2 l + 2) 2^k - 1} \left( \frac{1}{n} - \frac{1}{n+1} \right) \\
 &= \sum_{k=0}^\infty \sum_{l=0}^\infty \left( \frac{1}{(2 l + 1) 2^k} - \frac{1}{(2 l + 2) 2^k} \right) \\
 &= \left( \sum_{k=0}^\infty 2^{-k} \right) \left( \sum_{m=1}^\infty (-1)^{m+1} \frac{1}{m} \right) \\
 &= 2 \ln 2
\end{aligned}
\]
Here, both a <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Telescoping_series">telescoping sum<&#47;a>, a geometric progression sum (see <a href="&#47;blog&#47;2008&#47;10&#47;nice-geometric-progression-proof.html">Nice Proof of a Geometric Progression Sum<&#47;a> with \(r=1&#47;2\)) and the <a href="https:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Taylor_series#List_of_Maclaurin_series_of_some_common_functions">power series<&#47;a> for the natural logarithm of 2 occurs.

Very nice.
