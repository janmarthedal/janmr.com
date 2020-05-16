---
title: Multiple-Precision Number Representation
date: '2011-10-05'
layout: layouts/post.njk
tags:
  - multiple-precision
  - numbers-project
categories:
  - programming
excerpt: >-
  Let us consider a common way to represent non-negative integers. An integer u
  >= 0 will be represented in radix b >= 2 using the notation [...]
---
Let us consider a common way to represent non-negative integers. An integer $u \geq 0$ will be represented in radix $b \geq 2$ using the notation

$$
u = (u_{n-1} \ldots u_1 u_0)_b = \sum_{k=0}^{n-1} u_k b^k, \quad 0 \leq u_k \leq b-1.
$$

We will call $u$ an $n$-digit number and $u_0, u_1, \ldots$ its digits. Zero will be represented with no digits, $0 = ()_b$. Observe that

$$
u \leq ((b-1) \ldots (b-1) (b-1))_b = \sum_{k=0}^{n-1} (b-1) b^k = b^n - 1
$$

for any $n \geq 0$.

Unless stated otherwise we will always have that the most-significant digit is non-zero, that is, $u_{n-1} \neq 0$ for $n \geq 1$. This assumption has some important consequences. First, that

$$
u \geq (1 0 \ldots 0)_b = b^{n-1}
$$

for any $n \geq 1$. Secondly, that each non-negative integer has a unique representation, that is, to each number $u \geq 0$ and radix $b \geq 2$ corresponds exactly one $n \geq 0$ and digits $u_0, u_1, \ldots, u_{n-1}$ such that $u = (u_{n-1} \ldots u_1 u_0)_b$. Thirdly, that

$$
b^{n-1} \leq u < b^n \quad \Leftrightarrow \quad n-1 \leq \log_b(u) < n \quad \Leftrightarrow \quad \lfloor \log_b(u) \rfloor = n-1.
$$

This last relation can be quite useful since the number of needed digits can be found, given $u$ and $b$. For instance, the fact that $\lfloor \log_2(1317803400) \rfloor + 1 = 31$ means that the number 1317803400 can be represented using 31 binary digits.
