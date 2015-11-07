---
layout: post
title: Twelve Ways of Counting
author: Jan Marthedal Rasmussen
excerpt: ! "I have for a long time had an ambition of getting better at combinatorics, especially enumerative combinatorics, the discipline of counting the number of arrangements, given some pattern. Getting introduced to The Twelvefold Way was a real eye-opener in this regard. It is a way to categorize some fundamental combinatorial counting problems by considering different ways of putting balls into urns. Different setups arise depending on whether the balls are labeled or unlabeled, whether the urns are labeled or unlabeled, and whether each urn can contain any number of balls, at most one or at least one, leading to 2*2*3 = 12 cases. [...]"
date: 2008-12-26 10:16:49.000000000 +01:00
categories:
- mathematics
tags:
- mathematics
- combinatorics
- enumerative combinatorics
---
I have for a long time had an ambition of getting better at [combinatorics](http://en.wikipedia.org/wiki/Combinatorics), especially *enumerative combinatorics*, the discipline of counting the number of arrangements, given some pattern.

Getting introduced to The Twelvefold Way was a real eye-opener in this regard. It is a way to categorize some fundamental combinatorial counting problems by considering different ways of putting balls into urns. Different setups arise depending on whether the balls are labeled or unlabeled, whether the urns are labeled or unlabeled, and whether each urn can contain any number of balls, at most one or at least one, leading to {% imath 2 \cdot 2 \cdot 3 = 12 %} cases.

All cases are shown and numbered in this table:

<table class="table table-striped table-bordered">
<tbody>
<tr>
<td>balls per urn</td>
<td>unrestricted</td>
<td>{% imath \leq 1 %}</td>
<td>{% imath \geq 1 %}</td>
</tr>
<tr>
<td>{% imath n %} labeled balls, {% imath m %} labeled urns</td>
<td>(1)</td>
<td>(5)</td>
<td>(9)</td>
</tr>
<tr>
<td>{% imath n %} unlabeled balls, {% imath m %} labeled urns</td>
<td>(2)</td>
<td>(6)</td>
<td>(10)</td>
</tr>
<tr>
<td>{% imath n %} labeled balls, {% imath m %} unlabeled urns</td>
<td>(3)</td>
<td>(7)</td>
<td>(11)</td>
</tr>
<tr>
<td>{% imath n %} unlabeled balls, {% imath m %} unlabeled urns</td>
<td>(4)</td>
<td>(8)</td>
<td>(12)</td>
</tr>
</tbody>
</table>

I will now consider each one. Not row- or columnwise, but in a rather thematic way. The number of arrangements will be denoted {% imath C_k(m,n) %} for {% imath m %} urns, {% imath n %} balls, for each case {% imath k = 1, 2, \ldots, 12 %}.

### The Trivial (7, 8)

When the urns are unlabeled and a maximum of one ball may be put in each urn, the answer is trivial. Different ways of placing the balls can not be distinguished since the urns are unlabeled, so there is only one way to do it,

{% dmath C_7(m,n) = C_8(m,n) = 1, \quad n \leq m. %}

### The Usual Suspects (1, 2, 5, 6)

If both the urns and the balls are labeled and there is no restriction on the number of balls in each urn (Case 1), we can for each of the {% imath n %} balls choose among all {% imath m %} urns, leading to

{% dmath C_1(m,n) = m^n. %}

This is equivalent to counting *n-tuples of m things*, where each element of the tuple corresponds to an urn, and the value of that element corresponds to the number of the ball that goes into that urn. (Note that here, and in all the following cases, different orderings of the balls *within each urn* are not distinguished.)

If, however, there can be at most one ball in each urn (Case 5), we can not place each ball as we please. We have {% imath m %} urns to choose from for the first ball, {% imath m-1 %} for the second, {% imath m-2 %} for the third, leading to

{% dmath C_5(m,n) = m (m-1) \cdots (m-n+1) = \frac{m!}{(m-n)!}, \quad n \leq m, %}

which is called the number of *n-permutations of m things*. We now remove the labels from the balls (Case 6). So where exchanging two balls in the setup just considered would lead to a different arrangement, it is no longer. For any choice of {% imath n %} urns, how many of the permutations have the balls placed in exactly these urns? The answer is the number of ways to arrange/permute {% imath n %} things, namely {% imath n! %}, so we simply divide by this number and arrive at

{% dmath C_6(m,n) = \frac{m!}{(m-n)! n!} = {m \choose n}, \quad n \leq m, %}

the number of *n-combinations of m things* and {% imath {m \choose n} %} is a binomial coefficient. Let us now introduce the number {% imath u_k, k=1, \ldots, n %} as the urn number that ball *k* goes into. Using this notation we see that the number of {% imath n %}-combinations of {% imath m %} things just considered is equivalent to the number of tuples {% imath (u_1, u_2, \ldots, u_n) %} that fulfill

{% dmath 1 \leq u_1 < u_2 < u_3 < \cdots < u_n \leq m. %}

This will come in handy when we turn to Case 2, where we allow any number of balls in each urn&#8212;but we still do not distinguish exchanging two balls between two urns. Using the notation just introduced we are thus interested in the number tuples {% imath (u_1, u_2, \ldots, u_n) %} that fulfill

{% dmath 1 \leq u_1 \leq u_2 \leq u_3 \leq \cdots \leq u_n \leq m %}

But any *less than or equal* to can easily be transformed into *strictly less than* when considering integers,

{% dmath 1 \leq u_1 < u_2 + 1 < u_3 + 2 < \cdots < u_n + n - 1 \leq m + n - 1, %}

and we have now transformed the enumeration problem for *n-multicombinations of m things* into an equivalent {% imath n %}-combinations of {% imath m+n-1 %} things enumeration problem, so

{% dmath C_2(m,n) = {m+n-1 \choose n}. %}

### Set Partitions (3, 9, 11)

Let us first consider Case 11 where the {% imath n %} balls are labeled, the {% imath m %} urns are unlabeled, and each urn must contain at least one ball. We first observe that the number of arrangements for this case is equivalent to splitting the set {1, 2, &#8230;, {% imath n %}} into {% imath m %} disjoint subsets whose union is the whole set. This is called the number of *(set) partitions of* {1, 2, &#8230;, {% imath n %}} *into m parts*,

{% dmath C_{11}(m,n) = \left\{ {n \atop m} \right\}, \quad n \geq m \geq 1. %}

where this curly bracket notation denote the Stirling numbers of the second kind. But this is just answering a question by posing another question. It is easy to see that

{% dmath \left\{ {n \atop n} \right\} = \left\{ {n \atop 1} \right\} = 1, \quad n \geq 1, \quad \text{and} \quad \left\{ {n \atop m} \right\} = 0, \quad m > n > 0, %}

and for completeness we define the (agreed-upon) boundary cases

{% dmath \left\{ {0 \atop 0} \right\} = 1 \quad \text{and} \quad \left\{ {n \atop 0} \right\} = 0, \quad n \geq 1. %}

Imagine now that we want to list the {% imath \left\{ {n \atop m} \right\} %} set partitions of {1, 2, &#8230;, {% imath n %}} into {% imath m %} parts, {% imath n > m > 1 %}, using an inductive/recursive approach. First we list the arrangements that contain the one-element set {% imath \{n\} %} as one of the parts. This can be done by listing the {% imath \left\{ {n-1 \atop m-1} \right\} %} set partitions of {1, 2, &#8230;, {% imath n-1 %}} into {% imath m-1 %} parts and simply adding {% imath \{n\} %} to each arrangement. We then list the {% imath \left\{ {n-1 \atop m} \right\} %} set partitions of {1, 2, &#8230;, {% imath n-1 %}} into {% imath m %} parts. For each of these arrangements, we can add the element {% imath n %} to *each* of the {% imath m %} parts. We thereby list all the arrangements where the part containing the element {% imath n %} contains at least one other element. Together with the border cases above, we now have the recursive definition

{% dmath \left\{ {n \atop m} \right\} = \left\{ {n-1 \atop m-1} \right\} + m \left\{ {n-1 \atop m} \right\}, \quad n > m > 1. %}

Case 9 is similar to the one just considered, except the urns are now labeled. This means that if we swap the contents of any two urns, we have a new arrangement. And since all the parts are different (they are disjoint subsets), we have to count all {% imath m! %} permutations of the parts for each set partition of Case 11, so

{% dmath C_9(m,n) = m! \left\{ {n \atop m} \right\}, \quad n \geq m \geq 1. %}

We now go to Case 3 where the balls are labeled and the urns are unlabeled, like Case 11, but where any number of urns may be empty. So we can simply use the counting of Case 11 and add the results of using exactly 1, 2, &#8230;, {% imath m %} urns,

{% dmath C_3(m,n) = \sum_{k=1}^m \left\{ {n \atop k} \right\}. %}

<div style="float:right"><a href="{% amazon concrete %}"><img src="{% bookcover concrete %}" alt=""></a></div>

You can read more about Sterling numbers in, e.g., [Concrete Mathematics](http://www-cs-faculty.stanford.edu/~uno/gkp.html) by Graham, Knuth, and Patashnik.

### Integer Compositions (10)

If unlabeled balls have to be placed in labeled urns with at least one ball in each urn, we can visualize an arrangement like this,

<div style="text-align: center;"><strong>OO|O|OOO|OO</strong>,</div>

meaning 2 balls in the first urn, 1 in the second, 3 in the third, and 2 in the fourth urn ({% imath m %}=4 and {% imath n %}=8 in this example). So counting the arrangements for Case 10 is equivalent to counting how many ways we can place {% imath m %}-1 seperators, <span>"<strong>|</strong>"</span>, among the {% imath n %}-1 places in between the **O**'s, leading to

{% dmath C_{10}(m,n) = {n-1 \choose m-1}, \quad n \geq m. %}

The example above illustrates that {% imath 8=2+1+3+2 %} and is called a composition of the integer 8 into 4 parts. So enumerating the ways to place {% imath n %} unlabeled balls in {% imath m %} labeled urns with at least one ball in each urn is equivalent to counting the *compositions of the integer m into n parts*.

### Integer Partitions (4, 12)

Case 12 has {% imath n %} unlabeled balls, {% imath m %} unlabeled urns and each urn must contain at least one ball. This is similar to Case 10 just considered, except for the labeling of the urns. So we need to count the ways to write the integer {% imath n %} as a sum of {% imath m %} positive integers, but where the ordering of the parts does not matter. Each such arrangement is called a *partition of n into m parts*. We use the notation

{% dmath C_{12}(m,n) = \left| {n \atop m} \right| %}

for the number of partitions of {% imath n %} into {% imath m %} parts. As we did for set partitions, we will seek a recursively defined expression. We see that

{% dmath \left| {n \atop n} \right| = \left| {n \atop 1} \right| = 1, \quad n \geq 1, \quad \text{and} \quad \left| {n \atop m} \right| = 0, \quad m > n > 0, %}

and the boundary conditions

{% dmath \left| {0 \atop 0} \right| = 1 \quad \text{and} \quad \left| {n \atop 0} \right| = 0, \quad n \geq 1. %}

In the general case of partitioning {% imath n %} into {% imath m %} parts, we can split the partitions into those that have at least one 1 among the parts, and those where each part is greater than 1. The first type can be obtained by listing all partitions of {% imath n %}-1 into {% imath m %}-1 parts, where a 1 could added to each arrangement, and the second type can be obtaining by listing all partitions of {% imath n %}-{% imath m %} into {% imath m %} parts, where 1 could be added to each part. We thus have

{% dmath \left| {n \atop m} \right| = \left| {n-1 \atop m-1} \right| + \left| {n-m \atop m} \right|, \quad n > m > 1. %}

Finally for Case 4, with reasoning similar to that of set partitioning (Case 3), when the urns are unlabeled and any urn is allowed to be empty, it is equivalent to adding the counts for non-empty urns for {% imath 1, 2, \ldots, m %} urns,

{% dmath C_4(m,n) = \sum_{k=1}^m \left| {n \atop k} \right|. %}

### Final remarks

All twelve case can be summarized in the following table:

<table class="table table-striped table-bordered">
<tbody>
<tr>
<td>balls per urn</td>
<td>unrestricted</td>
<td>{% imath \leq 1 %}</td>
<td>{% imath \geq 1 %}</td>
</tr>
<tr>
<td>{% imath n %} labeled balls, {% imath m %} labeled urns</td>
<td>{% imath n %}-tuples of {% imath m %} things</td>
<td>{% imath n %}-permutations of {% imath m %} things</td>
<td>Set partitions of {1, &#8230;, {% imath n %}} into {% imath m %} ordered parts</td>
</tr>
<tr>
<td>{% imath n %} unlabeled balls, {% imath m %} labeled urns</td>
<td>{% imath n %}-multicombinations of {% imath m %} things</td>
<td>{% imath n %}-combinations of {% imath m %} things</td>
<td>Compositions of {% imath n %} into {% imath m %} parts</td>
</tr>
<tr>
<td>{% imath n %} labeled balls, {% imath m %} unlabeled urns</td>
<td>Set partitions of {1, &#8230;, {% imath n %}} into &le; {% imath m %} parts</td>
<td>{% imath n %} pigeons into {% imath m %} holes</td>
<td>Set partitions of {1, &#8230;, {% imath n %}} into {% imath m %} parts</td>
</tr>
<tr>
<td>{% imath n %} unlabeled balls, {% imath m %} unlabeled urns</td>
<td>Partitions of {% imath n %} into &le; {% imath m %} parts</td>
<td>{% imath n %} pigeons into {% imath m %} holes</td>
<td>Partitions of {% imath n %} into {% imath m %} parts</td>
</tr>
</tbody>
</table>

<div style="float:right"><a href="{% amazon taocp4f3 %}"><img src="{% bookcover taocp4f3 %}" alt=""></a></div>

<div style="float:right"><a href="{% amazon stanley97 %}"><img src="{% bookcover stanley97 %}" alt=""></a></div>

This table also appears in in Section&nbsp;7.2.1.4, Fascicle&nbsp;3, Volume&nbsp;4 of [The Art of Computer Programming](http://www-cs-faculty.stanford.edu/~uno/taocp.html) by [Donald E. Knuth](http://www-cs-faculty.stanford.edu/~uno/) where The Twelvefold Way is briefly mentioned. The Twelvefold Way is originally treated in the book [Enumerative Combinatorics, Volume&nbsp;1](http://www-math.mit.edu/~rstan/ec/) by [Richard P. Stanley](http://www-math.mit.edu/~rstan/).
