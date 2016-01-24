---
layout: post
title: Multiple-Precision Number Representation
author: Jan Marthedal Rasmussen
excerpt: ! "Let us consider a common way to represent non-negative integers. An integer u >= 0 will
  be represented in radix b >= 2 using the notation [...]"
date: 2011-10-05 10:23:53.000000000 +02:00
categories:
- programming
tags:
- multiple-precision
- numbers-project
---
Let us consider a common way to represent non-negative integers. An integer {% imath u \geq 0 %} will be represented in radix {% imath b \geq 2 %} using the notation

{% dmath u = (u_{n-1} \ldots u_1 u_0)_b = \sum_{k=0}^{n-1} u_k b^k, \quad 0 \leq u_k \leq b-1. %}

We will call {% imath u %} an {% imath n %}-digit number and {% imath u_0, u_1, \ldots %} its digits. Zero will be represented with no digits, {% imath 0 = ()_b %}. Observe that

{% dmath u \leq ((b-1) \ldots (b-1) (b-1))_b = \sum_{k=0}^{n-1} (b-1) b^k = b^n - 1 %}

for any {% imath n \geq 0 %}.

Unless stated otherwise we will always have that the most-significant digit is non-zero, that is, {% imath u_{n-1} \neq 0 %} for {% imath n \geq 1 %}. This assumption has some important consequences. First, that

{% dmath u \geq (1 0 \ldots 0)_b = b^{n-1} %}

for any {% imath n \geq 1 %}. Secondly, that each non-negative integer has a unique representation, that is, to each number {% imath u \geq 0 %} and radix {% imath b \geq 2 %} corresponds exactly one {% imath n \geq 0 %} and digits {% imath u_0, u_1, \ldots, u_{n-1} %} such that {% imath u = (u_{n-1} \ldots u_1 u_0)_b %}. Thirdly, that

{% dmath b^{n-1} \leq u < b^n \quad \Leftrightarrow \quad n-1 \leq \log_b(u) < n \quad \Leftrightarrow \quad \lfloor \log_b(u) \rfloor = n-1. %}

This last relation can be quite useful since the number of needed digits can be found, given {% imath u %} and {% imath b %}. For instance, the fact that {% imath \lfloor \log_2(1317803400) \rfloor + 1 = 31 %} means that the number 1317803400 can be represented using 31 binary digits.
