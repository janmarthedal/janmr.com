---
layout: post
title: Prime Factors of Factorial Numbers
author: Jan Marthedal Rasmussen
excerpt: ! "Factorial numbers, n! = 1 * 2 * ... * n, grow very fast with n.
  In fact, n! ~ sqrt{2 pi n} (n/e)^n according to Stirling's approximation. The prime
  factors of a factorial number, however, are all relatively small, and the complete
  factorization of n! is quite easy to obtain."
date: 2010-10-30 08:47:19.000000000 +02:00
categories:
- mathematics
tags:
- prime numbers
- factorials
- stirling's formula
---
Factorial numbers, {% imath n! = 1 \cdot 2 \cdots n %}, grow very fast with {% imath n %}. In fact, {% imath n! \sim \sqrt{2 \pi n} (n/e)^n %} according to [Stirling's approximation](http://en.wikipedia.org/wiki/Stirling's_approximation). The [prime factors](http://en.wikipedia.org/wiki/Prime_factor) of a factorial number, however, are all relatively small, and the complete factorization of {% imath n! %} is quite easy to obtain.

We will make use of the following fundamental theorem:

> {% imath p \mid a b %} for a prime {% imath p %}, then {% imath p \mid a %} or {% imath p \mid b %}.

<div class="pull-right"><a href="{% amazon hardy-wright %}"><img src="{% bookcover hardy-wright %}" /></a></div>
(Here, {% imath p \mid a %} means that {% imath p %} divides {% imath a %}.) This is called Euclid's First Theorem or [Euclid's Lemma](http://en.wikipedia.org/wiki/Euclid's_lemma). For most, it is intuitively clear, but a proof can be found in, e.g., <a href="{% amazon hardy-wright %}">Hardy and Wright: An Introduction to the Theory of Numbers</a>.

An application of this theorem to factorial numbers is that if a prime {% imath p %} is a divisor of {% imath n! %} then {% imath p %} must be a divisor of at least one of the numbers {% imath 1, 2, \ldots, n %}. This immediately implies

> Every prime factor of {% imath n! %} is less than or equal to {% imath n %}.

Conversely, every prime number between 2 and {% imath n %} must be a prime factor of {% imath n! %}.

Let us introduce the notation {% imath d_a(b) %} as the number of times {% imath a %} divides into {% imath b %}. Put more precisely, {% imath d_a(b) = k %} if and only if {% imath b/a^k %} is an integer while {% imath b/a^{k+1} %} is not.

We now seek to determine {% imath d_p(n!) %} for all primes {% imath p \leq n %}. From Euclid's First Theorem and the [Fundamental Theorem of Arithmetic](http://en.wikipedia.org/wiki/Fundamental_theorem_of_arithmetic) follows:

{% dmath d_p(n!) = d_p(1) + d_p(2) + \cdots + d_p(n) %}

The trick here is not to consider the right-hand side term by term, but rather as a whole. Let us take

> 42! = 1405006117752879898543142606244511569936384000000000

and {% imath p=3 %} as an example. How many of the numbers 1, 2, &#8230;, 42 are divisible by 3? Exactly {% imath \lfloor 42/3 \rfloor = 14 %} of them. But this is not the total count, because some of them are divisible by 3 multiple times. So how many are divisible by {% imath 3^2 %}? {% imath \lfloor 42/3^2 \rfloor = 4 %} of them. Similarly, {% imath \lfloor 42/3^3 \rfloor = 1 %}. And {% imath \lfloor 42/3^4 \rfloor = \lfloor 42/3^5 \rfloor = \ldots = 0 %}. So we have

{% dmath d_3(42!) = 14+4+1 = 19. %}

This procedure is easily generalized and we have

<div class="pull-right">(1)</div>
{% dmath d_p(n!) = \sum_{k=1}^\infty \left\lfloor \frac{n}{p^k} \right\rfloor = \sum_{k=1}^{\lfloor \log_p(n) \rfloor} \left\lfloor \frac{n}{p^k} \right\rfloor. %}

This [identity](http://en.wikipedia.org/wiki/Factorial#Number_theory) was found by the french mathematician [Adrien-Marie Legendre](http://en.wikipedia.org/wiki/Adrien-Marie_Legendre) (see also <a href="{% amazon proofsbook %}">Aigner and Ziegler: Proofs from The Book</a>, page 8, where it is called Legendre's Theorem).

Doing this for all primes in our example, we get

> {% imath 42! = 2^{39} \cdot 3^{19} \cdot 5^9 \cdot 7^6 \cdot 11^3 \cdot 13^3 \cdot 17^2 \cdot 19^2 \cdot 23 \cdot 29 \cdot 31 \cdot 37 \cdot 41 %}.

Notice how the exponents do not increase as the prime numbers increase. This is true in general. Assume that {% imath p %} and {% imath q %} are both primes and {% imath p < q %}. Then {% imath \log_p(n) \geq \log_q(n) %} and {% imath n/p^k \geq n/q^k %} for all positive integers {% imath k %}. Using this in equation&nbsp;(1) we get

<div class="pull-right">(2)</div>
<div style="text-align: center;">
{% imath d_p(n!) \geq d_q(n!) %} for primes {% imath p %}, {% imath q %} with {% imath p < q %}
</div>

and thus

{% dmath d_2(n!) \geq d_3(n!) \geq d_5(n!) \geq d_7(n!) \geq d_{11}(n!) \geq \ldots %}

What about {% imath d_k(n!) %} for composite numbers {% imath k %}? Given the factorization of both {% imath n! %} and {% imath k %}, this is easy to compute. But if, e.g., the multiplicity of all prime factors of {% imath k %} are the same, then the relation&nbsp;(2) can be used. Consider {% imath d_{10}(m) %} for a positive integer {% imath m %}. Since {% imath 10 = 2 \cdot 5 %} then

{% dmath d_{10}(m) = \min\{ d_2(m), d_5(m) \}. %}

But if {% imath m=n! %} then we can use&nbsp;(2) and we have

{% dmath d_{10}(n!) = d_5(n!). %}

For instance,

> {% imath d_{10}(42!) = d_5(42!) = \lfloor 42/5 \rfloor + \lfloor 42/5^2 \rfloor = 8 + 1 = 9 %},

so there are 9 trailing zeros in the decimal representation of 42!.


