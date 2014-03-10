---
layout: post
status: publish
published: true
title: Twelve Ways of Counting
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "I have for a long time had an ambition of getting better at <a href=\"http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Combinatorics\">combinatorics<&#47;a>,
  especially <em>enumerative combinatorics<&#47;em>, the discipline of counting the
  number of arrangements, given some pattern.\r\n\r\nGetting introduced to The Twelvefold
  Way was a real eye-opener in this regard. It is a way to categorize some fundamental
  combinatorial counting problems by considering different ways of putting balls into
  urns. Different setups arise depending on whether the balls are labeled or unlabeled,
  whether the urns are labeled or unlabeled, and whether each urn can contain any
  number of balls, at most one or at least one, leading to 2 &middot; 2 &middot; 3
  = 12 cases.\r\n\r\n"
wordpress_id: 49
wordpress_url: http://sputsoft.com/wp/?p=49
date: 2008-12-26 10:16:49.000000000 +01:00
categories:
- mathematics
tags:
- mathematics
- combinatorics
- enumerative combinatorics
comments:
- id: 1996
  author: ! 'Book Review: The Book of Numbers | Kanooth'
  author_email: ''
  author_url: http://kanooth.com/blog/2010/05/book-review-the-book-of-numbers.html
  date: !binary |-
    MjAxMC0wNS0yMyAxNjo0NjozNCArMDIwMA==
  date_gmt: !binary |-
    MjAxMC0wNS0yMyAxNDo0NjozNCArMDIwMA==
  content: ! '[...] What Comes Next? This chapter addresses combinatorial enumerations
    (arrangement numbers&#47;permutations, choice numbers&#47;combinations, choice
    numbers with [...]'
- id: 2359
  author: Bell Numbers | Kanooth
  author_email: ''
  author_url: http://kanooth.com/blog/2011/06/bell-numbers.html
  date: !binary |-
    MjAxMS0wNi0yMyAxMjo1NDo1NiArMDIwMA==
  date_gmt: !binary |-
    MjAxMS0wNi0yMyAxMDo1NDo1NiArMDIwMA==
  content: ! '[...] Bell numbers are closely related to Stirling numbers of the second
    kind, see, e.g., my previous post Twelve Ways of Counting. [...]'
---
I have for a long time had an ambition of getting better at <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Combinatorics">combinatorics<&#47;a>, especially <em>enumerative combinatorics<&#47;em>, the discipline of counting the number of arrangements, given some pattern.

Getting introduced to The Twelvefold Way was a real eye-opener in this regard. It is a way to categorize some fundamental combinatorial counting problems by considering different ways of putting balls into urns. Different setups arise depending on whether the balls are labeled or unlabeled, whether the urns are labeled or unlabeled, and whether each urn can contain any number of balls, at most one or at least one, leading to 2 &middot; 2 &middot; 3 = 12 cases.

<a id="more"></a><a id="more-49"></a>

All cases are shown and numbered in this table:
<table style="border: 1px solid black;" border="0">
<tbody>
<tr>
<td>balls per urn<&#47;td>
<td style="width: 8em;">unrestricted<&#47;td>
<td style="width: 8em;">&le; 1<&#47;td>
<td style="width: 8em;">&ge; 1<&#47;span><&#47;td>
<&#47;tr>
<tr style="background-color: #EEE;">
<td><span class="mthi">n<&#47;span> labeled balls, <span class="mthi">m<&#47;span> labeled urns<&#47;td>
<td>(1)<&#47;td>
<td>(5)<&#47;td>
<td>(9)<&#47;td>
<&#47;tr>
<tr>
<td><span class="mthi">n<&#47;span> unlabeled balls, <span class="mthi">m<&#47;span> labeled urns<&#47;td>
<td>(2)<&#47;td>
<td>(6)<&#47;td>
<td>(10)<&#47;td>
<&#47;tr>
<tr style="background-color: #EEE;">
<td><span class="mthi">n<&#47;span> labeled balls, <span class="mthi">m<&#47;span> unlabeled urns<&#47;td>
<td>(3)<&#47;td>
<td>(7)<&#47;td>
<td>(11)<&#47;td>
<&#47;tr>
<tr>
<td><span class="mthi">n<&#47;span> unlabeled balls, <span class="mthi">m<&#47;span> unlabeled urns<&#47;td>
<td>(4)<&#47;td>
<td>(8)<&#47;td>
<td>(12)<&#47;td>
<&#47;tr>
<&#47;tbody><&#47;table>
I will now consider each one. Not row- or columnwise, but in a rather thematic way. The number of arrangements will be denoted <span class="mthi">C<sub>k<&#47;sub><&#47;span>(<span class="mthi">m<&#47;span>, <span class="mthi">n<&#47;span>) for <span class="mthi">m<&#47;span> urns, <span class="mthi">n<&#47;span> balls, for each case&nbsp;<span class="mthi">k<&#47;span> = 1, 2, ..., 12.

<h3>The Trivial (7, <span>8<&#47;span>)<&#47;h3>
When the urns are unlabeled and a maximum of one ball may be put in each urn, the answer is trivial. Different ways of placing the balls can not be distinguished since the urns are unlabeled, so there is only one way to do it,
\[C_7(m,n) = C_8(m,n) = 1, \quad n \leq m.\]

<h3>The Usual Suspects (1, 2, 5, 6)<&#47;h3>
If both the urns and the balls are labeled and there is no restriction on the number of balls in each urn (Case 1), we can for each of the <span class="mthi">n<&#47;span> balls choose among all <span class="mthi">m<&#47;span> urns, leading to
\[C_1(m,n) = m^n.\]
This is equivalent to counting <em>n-tuples of&nbsp;m&nbsp;things<&#47;em>, where each element of the tuple corresponds to an urn, and the value of that element corresponds to the number of the ball that goes into that urn. (Note that here, and in all the following cases, different orderings of the balls <em>within each urn<&#47;em> are not distinguished.)

If, however, there can be at most one ball in each urn (Case 5), we can not place each ball as we please. We have <span class="mthi">m<&#47;span> urns to choose from for the first ball, <span class="mthi">m<&#47;span>-1 for the second, <span class="mthi">m<&#47;span>-2 for the third, leading to
\[C_5(m,n) = m (m-1) \cdots (m-n+1) = \frac{m!}{(m-n)!}, \quad n \leq m,\]
which is called the number of <em>n-permutations of&nbsp;m&nbsp;things<&#47;em>.&nbsp;We now remove the labels from the balls (Case 6). So where exchanging two balls in the setup just considered would lead to a different arrangement, it is no longer. For any choice of <span class="mthi">n<&#47;span> urns, how many of the permutations have the balls placed in exactly these urns? The answer is the number of ways to arrange&#47;permute <span class="mthi">n<&#47;span>&nbsp;things, namely <em>n!<&#47;em>, so we simply divide by this number and arrive at
\[C_6(m,n) = \frac{m!}{(m-n)! n!} = {m \choose n}, \quad n \leq m,\]
the number of&nbsp;<em>n-combinations of&nbsp;m&nbsp;things<&#47;em>&nbsp;and&nbsp;\({m \choose n}\) is a binomial coefficient. Let us now introduce the number&nbsp;\(u_k, k=1, \ldots, n\) as the urn number that ball <em>k<&#47;em> goes into. Using this notation we see that the number of <span class="mthi">n<&#47;span>-combinations of <span class="mthi">m<&#47;span> things just considered is equivalent to the number of tuples \((u_1, u_2, \ldots, u_n)\) that fulfill
\[1 \leq u_1 < u_2 < u_3 < \cdots < u_n \leq m.\]
This will come in handy when we turn to Case 2, where we allow&nbsp;any number of balls in each urn---but we still do not distinguish exchanging two balls between two urns. Using the notation just introduced we are thus interested in the number tuples \((u_1, u_2, \ldots, u_n)\) that fulfill
\[1 \leq&nbsp;u_1 \leq u_2 \leq u_3 \leq \cdots \leq u_n \leq m\]
But any <em>less than or equal<&#47;em> to can easily be transformed into <em>strictly less than<&#47;em> when considering integers,
\[1 \leq u_1 < u_2 + 1 < u_3 + 2 < \cdots < u_n + n - 1 \leq m + n - 1,\]
and we have now transformed the enumeration problem for&nbsp;<em>n-multicombinations of&nbsp;m&nbsp;things<&#47;em>&nbsp;into an equivalent <span class="mthi">n<&#47;span>-combinations of&nbsp;<em>m+n-1<&#47;em>&nbsp;things enumeration problem, so
\[C_2(m,n) = {m+n-1 \choose n}.\]

<h3>Set Partitions (3, 9, 11)<&#47;h3>
Let us first consider Case 11 where the <span class="mthi">n<&#47;span> balls are labeled, the <span class="mthi">m<&#47;span> urns are unlabeled, and each urn must contain at least one ball. We first observe that the number of arrangements for this case is equivalent to splitting the set {1, 2, ..., <span class="mthi">n<&#47;span>} into <span class="mthi">m<&#47;span>&nbsp;disjoint subsets whose union is the whole set. This is called the number of <em>(set) partitions of<&#47;em> {1, 2, ..., <span class="mthi">n<&#47;span>}&nbsp;<em>into m parts<&#47;em>,
\[
C_{11}(m,n) = \left\{ {n \atop m} \right\}, \quad n \geq m \geq 1.
\]
where this curly bracket notation denote the Stirling numbers of the second kind. But this is just answering a question by posing another question. It is easy to see that
\[\left\{ {n \atop n} \right\} = \left\{ {n \atop 1} \right\} = 1, \quad n \geq 1, \quad&nbsp;\mbox{and} \quad \left\{ {n \atop m} \right\} = 0, \quad m > n > 0,\]
and for completeness we define the (agreed-upon) boundary cases
\[\left\{ {0 \atop 0} \right\} = 1 \quad \mbox{and} \quad \left\{ {n \atop 0} \right\} = 0, \quad n \geq 1.\]
Imagine now that we want to list the&nbsp;\(\left\{ {n \atop m} \right\}\)&nbsp;set partitions of&nbsp;{1, 2, ..., <span class="mthi">n<&#47;span>}&nbsp;into&nbsp;<span class="mthi">m<&#47;span>&nbsp;parts,&nbsp;\(n > m > 1\), using an inductive&#47;recursive approach.&nbsp;First we list the arrangements that contain the one-element set&nbsp;{<span class="mthi">n<&#47;span>}&nbsp;as one of the parts. This can be done by listing&nbsp;the&nbsp;\(\left\{ {n-1 \atop m-1} \right\}\)&nbsp;set partitions of&nbsp;{1, 2, ..., <span class="mthi">n<&#47;span>-1}&nbsp;into&nbsp;<span class="mthi">m<&#47;span>-1&nbsp;parts and simply adding { <span class="mthi">n<&#47;span>}&nbsp;to each arrangement. We then list&nbsp;the&nbsp;\(\left\{ {n-1 \atop m} \right\}\)&nbsp;set partitions of&nbsp;{1, 2, ..., <span class="mthi">n<&#47;span>-1}&nbsp;into&nbsp;<span class="mthi">m<&#47;span> parts. For each of these arrangements, we can add the element <span class="mthi">n<&#47;span> to <em>each<&#47;em> of the <span class="mthi">m<&#47;span> parts. We thereby list all the arrangements where the part containing the element <span class="mthi">n<&#47;span> contains at least one other element. Together with the border cases above, we now have the recursive definition
\[\left\{ {n \atop m} \right\} =&nbsp;\left\{ {n-1 \atop m-1} \right\} + m&nbsp;\left\{ {n-1 \atop m} \right\}, \quad n > m > 1.\]
Case 9 is similar to the one just considered, except the urns are now labeled. This means that if we swap the contents of any two urns, we have a new arrangement. And since all the parts are different (they are disjoint subsets), we have to count all&nbsp;\(m!\)&nbsp;permutations of the parts for each set partition of Case 11, so
\[
C_9(m,n) = m! \left\{ {n \atop m} \right\}, \quad n \geq m \geq 1.
\]
We now go to Case 3 where the balls are labeled and the urns are unlabeled, like Case 11, but where any number of urns may be empty. So we can simply use the counting of Case 11 and add the results of using exactly 1, 2, ..., <span class="mthi">m<&#47;span> urns,
\[
C_3(m,n) = \sum_{k=1}^m \left\{ {n \atop k} \right\}.
\]
<div style="float:right"><a href="&#47;book&#47;link.php?id=concrete"><img src="&#47;book&#47;concrete.jpg" &#47;><&#47;a><&#47;div>
You can read more about Sterling numbers in, e.g., <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;gkp.html">Concrete Mathematics<&#47;a> by Graham, Knuth, and Patashnik.

<h3>Integer Compositions (10)<&#47;h3>
If unlabeled balls have to be placed in labeled urns with at least one ball in each urn,&nbsp;we can visualize an arrangement like this,
<div style="text-align: center;"><strong>OO|O|OOO|OO<&#47;strong>,<&#47;div>
meaning 2 balls in the first urn, 1 in the second, 3 in the third, and 2 in the fourth urn (<span class="mthi">m<&#47;span>=4 and <span class="mthi">n<&#47;span>=8 in this example). So counting the arrangements for Case 10 is equivalent to counting how many ways we can place <span class="mthi">m<&#47;span>-1 seperators, '<strong>|<&#47;strong>', among the <span class="mthi">n<&#47;span>-1 places in between the <strong>O<&#47;strong>'s, leading to
\[C_{10}(m,n) = {n-1 \choose m-1}, \quad n \geq m.\]
The example above illustrates that 8=2+1+3+2 and is called a composition of the integer 8 into 4 parts. So enumerating the ways to place <span class="mthi">n<&#47;span> unlabeled balls in <span class="mthi">m<&#47;span>&nbsp;labeled urns with at least one ball in each urn is equivalent to counting the <em>compositions of the integer m into n parts<&#47;em>.

<h3>Integer Partitions (4, 12)<&#47;h3>
Case 12 has <span class="mthi">n<&#47;span>&nbsp;unlabeled balls, <span class="mthi">m<&#47;span>&nbsp;unlabeled urns and each urn must contain at least one ball. This is similar to Case 10 just considered, except for the labeling of the urns. So we need to count the ways to write the integer <span class="mthi">n<&#47;span> as a sum of <span class="mthi">m<&#47;span> positive integers, but where the ordering of the parts does not matter. Each such arrangement is called a <em>partition of n into m parts<&#47;em>. We use the notation
\[C_{12}(m,n) = \left| {n \atop m} \right|\]
for the number of&nbsp;partitions of&nbsp;<span class="mthi">n<&#47;span>&nbsp;into&nbsp;<span class="mthi">m<&#47;span>&nbsp;parts. As we did for set partitions, we will seek a recursively defined expression. We&nbsp;see that
\[\left| {n \atop n} \right| = \left| {n \atop 1} \right| = 1, \quad n \geq 1, \quad&nbsp;\mbox{and} \quad \left| {n \atop m} \right| = 0, \quad m > n > 0,\]
and the boundary conditions
\[\left| {0 \atop 0} \right| = 1 \quad \mbox{and} \quad \left| {n \atop 0} \right| = 0, \quad n \geq 1.\]
In the general case of partitioning <span class="mthi">n<&#47;span> into <span class="mthi">m<&#47;span> parts, we can split the partitions into those that have at least one 1 among the parts, and those where each part is greater than 1. The first type can be obtained by listing all partitions of <span class="mthi">n<&#47;span>-1 into <span class="mthi">m<&#47;span>-1 parts, where a 1 could added to each arrangement, and the second type can be obtaining by listing all partitions of <span class="mthi">n<&#47;span>-<span class="mthi">m<&#47;span> into <span class="mthi">m<&#47;span> parts, where 1 could be added to each part. We thus have
\[\left| {n \atop m} \right| =&nbsp;\left| {n-1 \atop m-1} \right| + \left| {n-m \atop m} \right|, \quad n > m > 1.\]
Finally for Case 4, with reasoning similar to that of set partitioning (Case 3), when the urns are unlabeled and any urn is allowed to be empty, it is equivalent to adding the counts for non-empty urns for&nbsp;1, 2, ..., <span class="mthi">m<&#47;span>&nbsp;urns,
\[C_4(m,n) =&nbsp;\sum_{k=1}^m \left| {n \atop k} \right|.\]

<h3>Final remarks<&#47;h3>
All twelve case can be summarized in the following table:
<table style="border: 1px solid black;" border="0">
<tbody>
<tr>
<td>balls per urn<&#47;td>
<td>unrestricted<&#47;td>
<td>&le; 1<&#47;td>
<td>&ge; 1<&#47;td>
<&#47;tr>
<tr style="background-color: #EEE;">
<td><span class="mthi">n<&#47;span> labeled balls, <span class="mthi">m<&#47;span> labeled urns<&#47;td>
<td><span class="mthi">n<&#47;span>-tuples of <span class="mthi">m<&#47;span> things<&#47;td>
<td><span class="mthi">n<&#47;span>-permutations of <span class="mthi">m<&#47;span> things<&#47;td>
<td>Set partitions of {1, ..., <span class="mthi">n<&#47;span>} into <span class="mthi">m<&#47;span> ordered parts<&#47;td>
<&#47;tr>
<tr>
<td><span class="mthi">n<&#47;span> unlabeled balls, <span class="mthi">m<&#47;span> labeled urns<&#47;td>
<td><span class="mthi">n<&#47;span>-multicombinations of <span class="mthi">m<&#47;span> things<&#47;td>
<td><span class="mthi">n<&#47;span>-combinations of <span class="mthi">m<&#47;span> things<&#47;td>
<td>Compositions of <span class="mthi">n<&#47;span> into <span class="mthi">m<&#47;span> parts<&#47;td>
<&#47;tr>
<tr style="background-color: #EEE;">
<td><span class="mthi">n<&#47;span> labeled balls, <span class="mthi">m<&#47;span> unlabeled urns<&#47;td>
<td>Set partitions of {1, ..., <span class="mthi">n<&#47;span>} into &le; <span class="mthi">m<&#47;span> parts<&#47;td>
<td><span class="mthi">n<&#47;span> pigeons into <span class="mthi">m<&#47;span> holes<&#47;td>
<td>Set partitions of {1, ..., <span class="mthi">n<&#47;span>} into <span class="mthi">m<&#47;span> parts<&#47;td>
<&#47;tr>
<tr>
<td><span class="mthi">n<&#47;span> unlabeled balls, <span class="mthi">m<&#47;span> unlabeled urns<&#47;td>
<td>Partitions of <span class="mthi">n<&#47;span> into &le; <span class="mthi">m<&#47;span> parts<&#47;td>
<td><span class="mthi">n<&#47;span> pigeons into <span class="mthi">m<&#47;span> holes<&#47;td>
<td>Partitions of <span class="mthi">n<&#47;span> into <span class="mthi">m<&#47;span> parts<&#47;td>
<&#47;tr>
<&#47;tbody><&#47;table>
<div style="float:right"><a href="&#47;book&#47;link.php?id=taocp4f3"><img src="&#47;book&#47;taocp4f3.jpg" &#47;><&#47;a><&#47;div>
<div style="float:right"><a href="&#47;book&#47;link.php?id=stanley97"><img src="&#47;book&#47;stanley97.jpg" &#47;><&#47;a><&#47;div>
This table also appears in in Section 7.2.1.4, Fascicle 3, Volume 4 of&nbsp;<a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;taocp.html">The Art of Computer Programming<&#47;a>&nbsp;by&nbsp;<a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;">Donald E. Knuth<&#47;a>&nbsp;where&nbsp;The Twelvefold Way is briefly mentioned. The Twelvefold Way is originally treated in the book <a href="http:&#47;&#47;www-math.mit.edu&#47;~rstan&#47;ec&#47;">Enumerative Combinatorics, Volume 1<&#47;a> by <a href="http:&#47;&#47;www-math.mit.edu&#47;~rstan&#47;">Richard P. Stanley<&#47;a>.
