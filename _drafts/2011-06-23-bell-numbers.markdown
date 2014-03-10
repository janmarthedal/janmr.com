---
layout: post
status: publish
published: true
title: Bell Numbers
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "I recently studied a system of linear ODEs, where \\(n\\) parameters,
  \\(k_1, \\ldots, k_n\\) described the system. It turned out that the structure of
  the solutions depended on whether any of the parameters where equal to each other.
  For instance, with three parameters there were five possibilities: [...]\r\n\r\nWe
  can quickly go through small values of \\(n\\) and we get (starting with \\(n=0\\)):
  1, 1, 2, 5, 15, .... How do we obtain a general formula?"
wordpress_id: 2243
wordpress_url: http://sputsoft.com/blog/?p=2243
date: 2011-06-23 12:54:44.000000000 +02:00
categories:
- mathematics
tags:
- combinatorics
comments: []
---
I recently studied a system of linear <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Ordinary_differential_equation">ODE<&#47;a>s, where \(n\) parameters, \(k_1, \ldots, k_n\) described the system. It turned out that the structure of the solutions depended on whether any of the parameters where equal to each other. For instance, with three parameters there were five possibilities:
<ol>
	<li>\(k_1 = k_2 = k_3\)<&#47;li>
	<li>\(k_1 = k_2\), \(k_1 \neq k_3\)<&#47;li>
	<li>\(k_1 = k_3\), \(k_1 \neq k_2\)<&#47;li>
	<li>\(k_2 = k_3\), \(k_1 \neq k_2\)<&#47;li>
	<li>\(k_1 \neq k_2\), \(k_1 \neq k_3\), \(k_2 \neq k_3\)<&#47;li>
<&#47;ol>
We can quickly go through small values of \(n\) and we get (starting with \(n=0\)): 1, 1, 2, 5, 15, .... How do we obtain a general formula?<a id="more"></a><a id="more-2243"></a> Observe first that the number of possibilities corresponds to the number of equivalence relations in a set of \(n\) elements. We can then list the equivalence classes for each possible equivalence relation. For the example \(n=3\) we get, corresponding to the list above:
<ol>
	<li>\(\{\{k_1,k_2,k_3\}\}\)<&#47;li>
	<li>\(\{\{k_1,k_2\}, \{k_3\}\}\)<&#47;li>
	<li>\(\{\{k_1,k_3\}, \{k_2\}\}\)<&#47;li>
	<li>\(\{\{k_2,k_3\}, \{k_1\}\}\)<&#47;li>
	<li>\(\{\{k_1\}, \{k_2\}, \{k_3\}\}\)<&#47;li>
<&#47;ol>
So the number of possibilities also corresponds to the number of partitions of a set of \(n\) elements. Actually, there are <em>many<&#47;em> ways to interpret these numbers, see, e.g., the comments for <a href="http:&#47;&#47;oeis.org&#47;A000110">sequence A000110<&#47;a> at <a href="http:&#47;&#47;oeis.org">OEIS<&#47;a>.

These numbers are typically called <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Bell_number">Bell Numbers<&#47;a> and we will denote them by \(B_n\). We thus have \(B_0 = B_1 = 1\), \(B_2 = 2\), \(B_3 = 5\).

How can we derive a formula for \(B_n\)? Let us assume we already know \(B_0\), ..., \(B_{n-1}\) and consider the number of partitions of the set \(S_n=\{1,2,\ldots,n\}\). For each partition we will focus on the subset that contains one particular element, say the element \(n\).

How many partitions have \(\{n\}\) as a separate subset, i.e., are of the form \(\{\{n\}, \ldots \}\)? Exactly \(B_{n-1}\), as that is the number of partitions of \(S_n - \{n\}\).

How many partitions have \(\{n,a\}\) as a separate subset, i.e., are of the form \(\{\{n,a\}, \ldots \}\)? Well, there are \(n-1 \choose 1\) ways of choosing \(a\) and for each of these, there are \(B_{n-2}\) ways of partitioning \(S_n - \{n,a\}\). Thus, there are \({n-1 \choose 1} B_{n-2}\) ways.

How many partitions have \(\{n,a,b\}\) as a separate subset, i.e., are of the form \(\{\{n,a,b\}, \ldots \}\)? Well, there are \(n-1 \choose 2\) ways of choosing \(a\) and \(b\) and for each of these, there are \(B_{n-3}\) ways of partitioning \(S_n - \{n,a,b\}\). Thus, there are \({n-1 \choose 2} B_{n-3}\) ways.

And so on. We get that
\[
B_n = \sum_{k=0}^{n-1} {n-1 \choose k} B_{n-1-k} = \sum_{k=0}^{n-1} {n-1 \choose n-1-k} B_{n-1-k} = \sum_{k=0}^{n-1} {n-1 \choose k} B_k
\]
for \(n \geq 1\) and using \(B_0 = 1\) we can now compute \(B_n\) for any value of \(n\) (no closed-form expression is known).

Bell numbers are closely related to Stirling numbers of the second kind, see, e.g., my previous post <a href="&#47;blog&#47;2008&#47;12&#47;twelve-ways-of-counting.html">Twelve Ways of Counting<&#47;a>.

The excellent books <a href="&#47;book&#47;link.php?id=conway-guy">The Book of Numbers<&#47;a> and <a href="&#47;book&#47;link.php?id=concrete">Concrete Mathematics<&#47;a> have more information on Bell numbers.
