---
layout: post
title: Bell Numbers
author: Jan Marthedal Rasmussen
date: 2011-06-23 12:54:44.000000000 +02:00
categories:
- mathematics
tags:
- combinatorics
---

I recently studied a system of linear [ODE](http://en.wikipedia.org/wiki/Ordinary_differential_equation)s, where {% imath n %} parameters, {% imath k_1, \ldots, k_n %} described the system. It turned out that the structure of the solutions depended on whether any of the parameters where equal to each other. For instance, with three parameters there were five possibilities:

1. {% imath k_1 = k_2 = k_3 %}
2. {% imath k_1 = k_2 %}, {% imath k_1 \neq k_3 %}
3. {% imath k_1 = k_3 %}, {% imath k_1 \neq k_2 %}
4. {% imath k_2 = k_3 %}, {% imath k_1 \neq k_2 %}
5. {% imath k_1 \neq k_2 %}, {% imath k_1 \neq k_3 %}, {% imath k_2 \neq k_3 %}

We can quickly go through small values of {% imath n %} and we get (starting with {% imath n=0 %}): 1, 1, 2, 5, 15, &#8230;. How do we obtain a general formula?<span></span> Observe first that the number of possibilities corresponds to the number of equivalence relations in a set of {% imath n %} elements. We can then list the equivalence classes for each possible equivalence relation. For the example {% imath n=3 %} we get, corresponding to the list above:

1. {% imath \{\{k_1,k_2,k_3\}\} %}
2. {% imath \{\{k_1,k_2\}, \{k_3\}\} %}
3. {% imath \{\{k_1,k_3\}, \{k_2\}\} %}
4. {% imath \{\{k_2,k_3\}, \{k_1\}\} %}
5. {% imath \{\{k_1\}, \{k_2\}, \{k_3\}\} %}

So the number of possibilities also corresponds to the number of partitions of a set of {% imath n %} elements. Actually, there are *many* ways to interpret these numbers, see, e.g., the comments for [sequence A000110](http://oeis.org/A000110) at [OEIS](http://oeis.org).

These numbers are typically called [Bell Numbers](http://en.wikipedia.org/wiki/Bell_number) and we will denote them by {% imath B_n %}. We thus have {% imath B_0 = B_1 = 1 %}, {% imath B_2 = 2 %}, {% imath B_3 = 5 %}.

How can we derive a formula for {% imath B_n %}? Let us assume we already know {% imath B_0, \ldots, B_{n-1} %} and consider the number of partitions of the set {% imath S_n=\{1,2,\ldots,n\} %}. For each partition we will focus on the subset that contains one particular element, say the element {% imath n %}.

How many partitions have {% imath \{n\} %} as a separate subset, i.e., are of the form {% imath \{\{n\}, \ldots \} %}? Exactly {% imath B_{n-1} %}, as that is the number of partitions of {% imath S_n - \{n\} %}.

How many partitions have {% imath \{n,a\} %} as a separate subset, i.e., are of the form {% imath \{\{n,a\}, \ldots \} %}? Well, there are {% imath n-1 \choose 1 %} ways of choosing {% imath a %} and for each of these, there are {% imath B_{n-2} %} ways of partitioning {% imath S_n - \{n,a\} %}. Thus, there are {% imath {n-1 \choose 1} B_{n-2} %} ways.

How many partitions have {% imath \{n,a,b\} %} as a separate subset, i.e., are of the form {% imath \{\{n,a,b\}, \ldots \} %}? Well, there are {% imath n-1 \choose 2 %} ways of choosing {% imath a %} and {% imath b %} and for each of these, there are {% imath B_{n-3} %} ways of partitioning {% imath S_n - \{n,a,b\} %}. Thus, there are {% imath {n-1 \choose 2} B_{n-3} %} ways.

And so on. We get that

{% dmath B_n = \sum_{k=0}^{n-1} {n-1 \choose k} B_{n-1-k} = \sum_{k=0}^{n-1} {n-1 \choose n-1-k} B_{n-1-k} = \sum_{k=0}^{n-1} {n-1 \choose k} B_k %}

for {% imath n \geq 1 %} and using {% imath B_0 = 1 %} we can now compute {% imath B_n %} for any value of {% imath n %} (no closed-form expression is known).

Bell numbers are closely related to Stirling numbers of the second kind, see, e.g., my previous post [Twelve Ways of Counting](/2008/12/twelve-ways-of-counting.html).

The excellent books <a href="{% amazon conway-guy %}">The Book of Numbers</a> and <a href="{% amazon concrete %}">Concrete Mathematics</a> have more information on Bell numbers.

