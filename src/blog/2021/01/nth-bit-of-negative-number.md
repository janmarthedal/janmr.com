---
title: The nth Bit of a Negative Number
date: '2021-01-09'
layout: post
tags:
  - bit-fiddling
  - post
excerpt: >-
  Assume a positive integer is given and we wish to get the value of the nth bit of the number's
  two's complement. Now if a fixed number of bits is used to represent the number, say 32 or 64, the two's
  complement can be computed explicitly and the nth bit can be found directly. But if we work with
  arbitrary precision then any two's complement representation has infinitely many 1s at the left.
---
Assume a positive integer $x$ is given and we wish to get the value of the $n$th bit of the number's [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement) (written here as $-x$). Now if a fixed number of bits is used to represent the number, say 32 or 64, the two's complement can be computed explicitly and the $n$th bit can be found directly. But if we work with arbitrary precision then any two's complement representation has infinitely many 1s at the left.

Let some positive number have the binary representation $x = (... x_2 x_1 x_0)_2$ and assume that the number has $k$ trailing zeros, that is, $x_k = 1$ and $x_{k-1}=...=x_1=x_0=0$. So it has the appearance

$$
x = (... x_{k+2} x_{k+1} 1 0 ... 0)_2.
$$

Now to obtain the two's complement, we must first negate each bit,

$$
\overline{x} = (... \overline{x}_{k+2} \overline{x}_{k+1} 0 1 ... 1)_2
$$

and then add one to obtain

$$
-x = \overline{x} + 1 = (... \overline{x}_{k+2} \overline{x}_{k+1} 1 0 ... 0)_2.
$$

Now we see that

$$
\text{the $n$th bit of -x} =
\begin{cases}
x_n & \text{for $n \leq k$,} \\
\overline{x}_n & \text{for $n > k$}
\end{cases}
$$

where $k$ the the number of trailing zeros of the number $x = (... x_2 x_1 x_0)_2$.
