---
title: Computing the Integer Binary Logarithm
date: '2010-09-27'
layout: layouts/post.njk
tags:
  - algorithms
  - numbers-project
  - binary-numbers
categories:
  - programming
excerpt: >-
  The binary logarithm, or the logarithm to the base 2, of a number x > 0 is the
  number y = log_2 x such that 2^y = x. This article looks at how we can
  determine the integer part of the binary logarithm using integer arithmetic
  only. Naturally, the binary logarithm is especially easy to work with on
  (binary) computers and bitwise operations come in handy.
---
The binary logarithm, or the logarithm to the base 2, of a number $x > 0$ is the number $y = log_2 x$ such that $2^y = x$. This article looks at how we can determine the integer part of the binary logarithm using integer arithmetic only. Naturally, the binary logarithm is especially easy to work with on (binary) computers and bitwise operations come in handy.

As we saw in a [previous post](/blog/2009/09/useful-properties-of-the-floor-and-ceil-functions), we have

$$
k = \lfloor \log_2 n \rfloor \quad \Leftrightarrow \quad 2^k \leq n < 2^{k+1}.
$$

This means that we seek an integer $k$ such that $\lfloor n/2^k \rfloor \neq 0$ and $\lfloor n/2^{k+1} \rfloor = 0$. We see that $k$ is the position of the left-most bit or, equivalently, that it takes $k + 1$ bits, but no fewer, to represent the number $n$.

The [ceil/floor post](/blog/2009/09/useful-properties-of-the-floor-and-ceil-functions) also states

$$
\lfloor \ldots \lfloor \lfloor n/2 \rfloor /2 \rfloor \ldots /2 \rfloor = \left\lfloor \frac{n}{2 \cdot 2 \cdots 2} \right\rfloor,
$$

which means that we can repeatedly do integer divison by two until we reach zero. To be more specific:

``` cpp
template <typename T>
unsigned floor_log2(T v) {
  unsigned r = -1;
  while (v) { v >>= 1; r++; }
  return r;
}
```

The good thing about this algorithm is that it works for all (positive) integer types, provided that bitwise shift right `>>` or integer division by two is defined. The bad thing is that it is not very fast.

An observation that can lead to faster algorithms is the fact that, as mentioned above, $\lfloor \log_2 n \rfloor$ is the position of the left-most bit. Let us address multiple-precision numbers first. Assume that a positive integer $n$ is represented as in a [previous post](/blog/2009/07/implementing-multiple-precision-arithmetic-part-1) as

$$
n = (n_{d-1} \ldots n_1 u_0)_b = \sum_{i=0}^{d-1} n_i b^i
$$

with $d \geq 1$ and $n_{d-1} \neq 0$. Now if $b = 2^p$ for some $p$, as is normally the case, we have:

$$
\lfloor \log_2 n \rfloor = (d-1) p + \lfloor \log_2 n_{d-1} \rfloor.
$$

So the problem of computing the integer binary logarithm for a multiple-precision integer of the type stated is reduced to finding the integer binary logarithm of a single $p$-bit digit.

Consider now a positive integer represented using a 16 bit word. Since we are interested in the left-most bit, we can search for it using a kind of [binary search method](http://en.wikipedia.org/wiki/Binary_search_algorithm). First we do a [bitwise and](http://en.wikipedia.org/wiki/Bitwise_operation#AND) with the mask $(1111111100000000)_2$ to see if the left-most bit is located in the upper or lower part of the word. If it is among the lower 8 bits we simply compute the result for this 8 bit number instead; if it is among the upper 8 bits we compute the result for the upper 8 bits and add 8. We have thus reduced the problem of finding the integer binary logarithm of an 16 bit number to finding the same function of an 8 bit number. This principle can be used recursively until we look at only 1 bit:

``` cpp
unsigned floor_log2(uint16_t v) {
  static const uint16_t ones = -1;
  unsigned r = 0;
  if (v & (ones << 8)) { v >>= 8; r += 8; }
  if (v & (ones << 4)) { v >>= 4; r += 4; }
  if (v & (ones << 2)) { v >>= 2; r += 2; }
  if (v & (ones << 1)) { v >>= 1; r += 1; }
  return r;
}
```

(Note that this function returns 0 if the argument is 0. The types `uint8_t`, `uint16_t`, and so on are defined in `stdint.h` and `cstdint`.)

If we look at small numbers, say 8 bit integers, we can do much better with a simple table lookup. For instance:

``` cpp
const short floor_log2_table[256] = {
 -1, 0, 1,1, 2,2,2,2, 3,3,3,3,3,3,3,3, 4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
 5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,
 6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
 6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
 7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
 7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
 7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
 7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7 };

unsigned floor_log2(uint8_t v) {
  return floor_log2_table[v];
}
```

For large numbers we can combine the binary search and the table lookup. For 32 bit numbers we get:

``` cpp
unsigned floor_log2(uint32_t v) {
  static const uint32_t ones = -1;
  unsigned r = 0;
  if (v & (ones << 16)) { v >>= 16; r += 16; }
  if (v & (ones <<  8)) { v >>=  8; r +=  8; }
  return r + floor_log2_table[v];
}
```

This provides a nice trade-off between speed and memory use.

<div class="pull-right"><a href="https://en.wikipedia.org/wiki/Special:BookSources/0201914654"><img src="/media/books/hackers-delight.jpg" alt=""></a></div>
<div class="pull-right"><a href="https://en.wikipedia.org/wiki/Special:BookSources/0321580508"><img src="/media/books/taocp4f1.jpg" alt=""></a></div>

For further reading on the integer binary logarithm, and *many* other aspects related to the binary representation of numbers, I recommend <a href="https://en.wikipedia.org/wiki/Special:BookSources/0321580508">The Art of Computer Programming, Volume 4, Fascicle 1: Bitwise Tricks &amp; Techniques and Binary Decision Diagrams</a> by [Donald E. Knuth](http://www-cs-faculty.stanford.edu/~uno/) and <a href="https://en.wikipedia.org/wiki/Special:BookSources/0201914654">Hacker's Delight</a> by Henry S. Warren, Jr. See also these online [Bit Twiddling Hacks](http://graphics.stanford.edu/~seander/bithacks.html#IntegerLogObvious).

*(Update 2014-03-25: Source code is available as snippet [integer\_binary\_logarithm](https://github.com/janmarthedal/snippets/blob/master/c++/kanooth/snippets/integer_binary_logarithm.hpp).)*
