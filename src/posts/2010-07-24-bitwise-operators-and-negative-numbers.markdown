---
path: /blog/2010/07/bitwise-operators-and-negative-numbers
date: '2010-07-24'
title: Bitwise Operators and Negative Numbers
tags:
  - multiple-precision
  - numbers-project
  - bitwise-operators
categories:
  - mathematics
excerpt: >-
  When representing integers using a fixed number of bits, negative numbers are
  typically represented using two's complement. If using n bit numbers, the
  two's complement of a number x with 0 <= x < 2^n is (-x) mod 2^n = 2^n - x.
  But what do you do if you want to work with unbounded/multiple-precision
  integers? [...]
---
When representing integers using a fixed number of bits, negative numbers are typically represented using [two's complement](http://en.wikipedia.org/wiki/Two's_complement). If using $n$ bit numbers, the two's complement of a number $x$ with $0 \leq x < 2^n$ is $(-x) \mathbin{\text{mod}} 2^n = 2^n - x$. But what do you do if you want to work with unbounded/multiple-precision integers? Fixing $x$ and letting the number of bits go to infinity, you will notice that increasing $n$ by one simply adds a 1 at the left. For instance,

*   $1975 = (11110110111)_2$
*   $-1975 = 2^{12} - 1975 = (100001001001)_2$ &nbsp;&nbsp; (with $n=12$)
*   $-1975 = 2^{13} - 1975 = (1100001001001)_2$ &nbsp;&nbsp; (with $n=13$)
*   $-1975 = 2^{20} - 1975 = (11111111100001001001)_2$ &nbsp;&nbsp; (with $n=20$)
*   $-1975 = (\ldots 1111111111111100001001001)_2$ &nbsp;&nbsp; (with $n=\infty$)

(This can be made more rigorous using [2-adic numbers](http://en.wikipedia.org/wiki/P-adic)). Conversely, every binary number with infinitely many 1s to the left corresponds to a negative integer.

Notice the important special case $-1 = (\ldots 1111)_2$. If $\overline{x}$ denotes *bitwise not* of $x$, where each bit is flipped from $0$ to $1$ and vice versa, we observe that

$$
x + \overline{x} = \ldots 1111 = -1,
$$

from which we have the important identity

$$
\overline{x} = -1 - x.
$$

This makes bitwise not equivalent to a simple subtraction. Notice how bitwise not turns a non-negative integer into a negative integer and vice versa.

Let us turn to general bitwise operators. Consider a function that maps two bits to a single bit. Given such a function and two non-negative integers, we can apply the function to the zeroth bit of both numbers to obtain the zeroth bit of the result, then apply the function to the first bit of both numbers to obtain the first bit of the result, and so forth. In this way, any binary bit-operator $\{0,1\}^2 \mapsto \{0,1\}$ can be extended to work on any non-negative integer (and as we shall see, any integer). There are 16 possible binary bit-operators:

|     | $(x, y)$                        | $(0, 0)$ | $(1, 0)$ | $(0, 1)$ | $(1, 1)$ |
| --- | ------------------------------- | -------- | -------- | -------- | -------- |
|  0  | $0$                             | $0$      | $0$      | $0$      | $0$      |
|  1  | $x \mathbin{\&} y$              | $0$      | $0$      | $0$      | $1$      |
|  2  | $\overline{x} \mathbin{\&} y$   | $0$      | $0$      | $1$      | $0$      |
|  3  | $y$                             | $0$      | $0$      | $1$      | $1$      |
|  4  | $x \mathbin{\&} \overline{y}$   | $0$      | $1$      | $0$      | $0$      |
|  5  | $x$                             | $0$      | $1$      | $0$      | $1$      |
|  6  | $x \oplus y$                    | $0$      | $1$      | $1$      | $0$      |
|  7  | $x \mathbin{\mid} y$            | $0$      | $1$      | $1$      | $1$      |
|  8  | $\overline{x \mathbin{\mid} y}$ | $1$      | $0$      | $0$      | $0$      |
|  9  | $\overline{x \oplus y}$         | $1$      | $0$      | $0$      | $1$      |
| 10  | $\overline{x}$                  | $1$      | $0$      | $1$      | $0$      |
| 11  | $\overline{x} \mathbin{\mid} y$ | $1$      | $0$      | $1$      | $1$      |
| 12  | $\overline{y}$                  | $1$      | $1$      | $0$      | $0$      |
| 13  | $x \mathbin{\mid} \overline{y}$ | $1$      | $1$      | $0$      | $1$      |
| 14  | $\overline{x \mathbin{\&} y}$   | $1$      | $1$      | $1$      | $0$      |
| 15  | $1$                             | $1$      | $1$      | $1$      | $1$      |

The first column of the table enumerates the functions from 0 to 15 (such that the binary representation of each number corresponds to the outputs). We see that exactly the functions 0&ndash;7 map $(0,0)$ to $0$, meaning that only these functions will map two non-negative integers to a non-negative integer.

The second column shows expressions for the functions using the well-known operators *bitwise and*, $x \mathbin{\&} y$, *bitwise or (inclusive or)*, $x \mathbin{|} y$, *bitwise xor (exclusive or)*, $x \oplus y$, and *bitwise not*, $\overline{x}$. The table simultaneously define these operators.

We can now formulate the goal of this article: Using only the bitwise operators that map non-negative integers to non-negative integers, together with usual integer arithmetic, how can we implement all 16 functions? The approach is quite simple: Use *bitwise not* to transform any negative integer into a non-negative integer, apply one of the functions 0&ndash;7, and then possibly apply *bitwise not* again to obtain the result.

Before proceeding, we need some fundamental identities. First, symmetry:

$$
x \mathbin{\&} y = y \mathbin{\&} x, \quad x \mathbin{|} y = y \mathbin{|} x, \quad x \oplus y = y \oplus x.
$$

Then, [De Morgan's laws](http://en.wikipedia.org/wiki/De_Morgan's_laws):

$$
\overline{x \mathbin{\&} y} = \overline{x} \mathbin{|} \overline{y}, \quad \overline{x \mathbin{|} y} = \overline{x} \mathbin{\&} \overline{y}.
$$

Finally some useful rules for exlusive or:

$$
x \oplus y = \overline{x} \oplus \overline{y}, \quad \overline{x \oplus y} = \overline{x} \oplus y = x \oplus \overline{y}.
$$

All of these are easily proved since they (by definition) operate *bitwise*. This means that you only have to consider one-bit numbers, which means only four different cases to check.

The only non-trivial operators among the functions 0&ndash;7 are $x \mathbin{\&} y$, $x \mathbin{|} y$, $x \oplus y$, and $x \mathbin{\&} \overline{y}$. We will use the notation $x \mathbin{\overline{\&}} y = x \mathbin{\&} \overline{y}$. Note how $\mathbin{\overline{\&}}$ is *not* symmetric. The only non-trivial operators among the functions 8&ndash;15 are $\overline{x \mathbin{\&} y}$, $\overline{x \mathbin{|} y}$, $x \mathbin{|} \overline{y}$, and $\overline{x \oplus y}$. Considering these eight cases, along with whether $x$ and $y$ are negative or not, we get the following table:

|     | $x \geq 0, y \geq 0$ | $x \geq 0, y < 0$ | $x < 0, y \geq 0$ | $x < 0, y < 0$ |
| --- | ---------------------- | ------------------- | ------------------- | ---------------- |
| $x \mathbin{\&} y$ | $x \mathbin{\&} y$ | $x \mathbin{\overline{\&}} \overline{y}$ | $y \mathbin{\overline{\&}} \overline{x}$ | $\overline{\overline{x} \mathbin{\mid} \overline{y}}$ |
| $x \mathbin{\mid} y$ | $x \mathbin{\mid} y$ | $\overline{\overline{y} \mathbin{\overline{\&}} x}$ | $\overline{\overline{x} \mathbin{\overline{\&}} y}$ | $\overline{\overline{x} \mathbin{\&} \overline{y}}$ |
| $x \mathbin{\overline{\&}} y$ | $x \mathbin{\overline{\&}} y$ | $x \mathbin{\&} \overline{y}$ | $\overline{\overline{x} \mathbin{\mid} y}$ | $\overline{y} \mathbin{\overline{\&}} \overline{x}$ |
| $x \oplus y$ | $x \oplus y$ | $\overline{x \oplus \overline{y}}$ | $\overline{\overline{x} \oplus y}$ | $\overline{x} \oplus \overline{y}$ |
| $\overline{x \mathbin{\&} y}$ | $\overline{x \mathbin{\&} y}$ | $\overline{x \mathbin{\overline{\&}} \overline{y}}$ | $\overline{y \mathbin{\overline{\&}} \overline{x}}$ | $\overline{x} \mathbin{\mid} \overline{y}$ |
| $\overline{x \mathbin{\mid} y}$ | $\overline{x \mathbin{\mid} y}$ | $\overline{y} \mathbin{\overline{\&}} x$ | $\overline{x} \mathbin{\overline{\&}} y$ | $\overline{x} \mathbin{\&} \overline{y}$ |
| $x \mathbin{\mid} \overline{y}$ | $\overline{y \mathbin{\overline{\&}} x}$ | $x \mathbin{\mid} \overline{y}$ | $\overline{\overline{x} \mathbin{\&} y}$ | $\overline{\overline{x} \mathbin{\overline{\&}} \overline{y}}$ |
| $\overline{x \oplus y}$ | $\overline{x \oplus y}$ | $x \oplus \overline{y}$ | $\overline{x} \oplus y$ | $\overline{\overline{x} \oplus \overline{y}}$ |

Here, we have used only the identities shown earlier. Of course, we need to convert each bitwise not into a subtraction to complete the task. For instance, with $x < 0$, $y \geq 0$ we have

$$
x \mathbin{|} \overline{y} = \overline{\overline{x} \mathbin{\&} y} = -1 - ((-1 - x) \mathbin{\&} y).
$$

This way, the bitwise and-operation is being applied to non-negative numbers and we see that the result is always negative.

We can now, with assistance from the table above, apply any of the 16 binary bitwise operators to *any* pair of integers, without restricting ourselves to working with a fixed number of bits.

<div style="float:right"><a href="https://en.wikipedia.org/wiki/Special:BookSources/0201914654"><img src="/media/books/hackers-delight.jpg" alt=""></a></div>
<div style="float:right"><a href="https://en.wikipedia.org/wiki/Special:BookSources/0321580508"><img src="/media/books/taocp4f1.jpg" alt=""></a></div>

For further reading related to the binary representation of numbers, I recommend [The Art of Computer Programming, Volume 4, Fascicle 1: Bitwise Tricks &amp; Techniques and Binary Decision Diagrams](https://en.wikipedia.org/wiki/Special:BookSources/0321580508) by [Donald E. Knuth](http://www-cs-faculty.stanford.edu/~knuth/) and [Hacker's Delight](https://en.wikipedia.org/wiki/Special:BookSources/0201914654) by Henry S. Warren, Jr.
