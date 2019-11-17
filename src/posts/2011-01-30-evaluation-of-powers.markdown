---
layout: post.html
title: Evaluation of Powers
tags: algorithms, numbers-project
categories: programming, mathematics
excerpt: "How do you efficiently compute x^n for a positive integer n? Take x^{15} as an example. You could take x and repeatedly multiply by x 14 times. A better way to do it, however, is this: [...]"
---
How do you efficiently compute $x^n$ for a positive integer $n$? Take $x^{15}$ as an example. You could take $x$ and repeatedly multiply by $x$ 14 times. A better way to do it, however, is this:

*   $t_0=x$
*   $t_1=t_0 \cdot t_0 = x^2$
*   $t_2=t_0 \cdot t_1 = x^3$
*   $t_3=t_1 \cdot t_2 = x^5$
*   $t_4=t_3 \cdot t_3 = x^{10}$
*   $t_5=t_3 \cdot t_4 = x^{15}$

A shorter way to write this is $x^1,x^2,x^3,x^5,x^{10},x^{15}$, where each quantity is obtained by multiplying two of the previous quantities together. We can write it even shorter as 1,2,3,5,10,15, where only the exponents are written. Here each number is obtained by adding together two of the previous numbers. This is called an [addition chain](http://en.wikipedia.org/wiki/Addition_chain) and is at the heart of studying the optimal way of evaluating powers. There is no simple expression that computes the minimal number of multiplications $a(n)$ needed to evaluate $x$<sup>$n$</sup>. A [list](http://oeis.org/A003313), however, is available from [The On-Line Encyclopedia of Integer Sequences](http://oeis.org), where the first 40 entries are

<p style="padding: 0 1em;">0, 1, 2, 2, 3, 3, 4, 3, 4, 4, 5, 4, 5, 5, 5, 4, 5, 5, 6, 5, 6, 6, 6, 5, 6, 6, 6, 6, 7, 6, 7, 5, 6, 6, 7, 6, 7, 7, 7, 6, &#8230;</p>

We see that $a(15)=5$, which shows that the addition chain 1,2,3,5,10,15 is indeed the shortest possible, and it follows that the procedure shown above to compute $x^{15}$ required the minimal number of multiplications.

Since the numbers in an addition chain grows the fastest by doubling the previous item, it is fairly easy to see that

<div class="pull-right">(1)</div>
$$a(n) \geq \lceil \log_2(n) \rceil \quad .$$

<div class="pull-right"><a href="https://en.wikipedia.org/wiki/Special:BookSources/0201896842"><img src="/media/books/taocp2.jpg" alt=""></a></div>

(This, and other results related to the evaluation of powers and addition chains can be found in <a href="https://en.wikipedia.org/wiki/Special:BookSources/0201896842">The Art of Computer Programming, Volume 2</a>, Section 4.6.3.)

An algorithm that comes close to this optimal bound is the binary method, which relies on these simple relations:

*   $x^0 = 1$
*   $x^{2k} = (x^k)^2$
*   $x^{2k+1} = x \cdot x^{2k}$

A recursive algorithm could readily be made from these, but we wish to have an iterative algorithm. The key here is to consider the slightly more general problem of evaluating $y \cdot x^n$. Here we have the relations:

*   $y \cdot x^0 = y$
*   $y \cdot x^{2k} = y \cdot (x^2)^k$
*   $y \cdot x^{2k+1} = (y \cdot x) \cdot x^{2k}$

This leads immediately to the following `C++` code:

``` cpp
number_t power(number_t y, number_t x, unsigned n) {
  while (n) {
    if (n % 2 == 0) {
      x *= x;
      n /= 2;
    } else {
      y *= x;
      n--;
    }
  }
  return y;
}
```

A slightly improved version (and maybe a bit less elegant) is the following:

``` cpp
number_t power(number_t y, number_t x, unsigned n) {
  if (!n) return y;
  while (n > 1) {
    if (n & 1) y *= x;
    x *= x;
    n >>= 1;
  }
  return y*x;
}
```

This algorithm performs $\lfloor \log_2 n \rfloor$ multiplications of the type $x \leftarrow x^2$ and $\nu(n)$ multiplications of the type $y \leftarrow y \cdot x$, where $\nu(n)$ is the number of 1s in the binary representation of $n$, so all in all it requires

$$\lfloor \log_2 n \rfloor + \nu(n)$$

multiplications (sequence [A056792](http://oeis.org/A056792) at [OEIS](http://oeis.org)).

So now we can evaluate $y \cdot x^n$ fairly efficiently. To evaluate $x^n$ we can simply use this routine by setting $y=1$. But that wastes one multiplication because the first time we perform $y \leftarrow y \cdot x$ it will be redundant. Instead we could use `power(x, x, n-1)`, but that could increase the number of multiplications for even $n$. A good way to evaluate $x^n$ is this:

``` cpp
number_t power(number_t x, unsigned n) {
  if (!n) return (T) 1;
  while (!(n & 1)) {
    x *= x;
    n >>= 1;
  }
  return power(x, x, n-1);
}
```

This way, when executing `power(x, x, n-1)`, `n` will always be uneven. This saves one multiplication compared to using just `power(1, x, n)`, so it requires

$$\lfloor \log_2 n \rfloor + \nu(n) - 1$$

multiplications (sequence [A014701](http://oeis.org/A014701) at [OEIS](http://oeis.org)).

As mentioned above, this algorithm is not optimal, but it is not bad either. In fact, 15 is the smallest value of $n$ for which the binary algorithm does not use the minimal number of multiplications. Figure 1 below compares the number of multiplications needed by the binary algorithm to the minimal number possible.

<figure>
  <img src="/media/power.png" class="img-responsive" alt="Evaluation of powers">
  <figcaption><strong>Figure 1.</strong> Number of multiplications used to evaluate the nth power.</figcaption>
</figure>

Note also that we have only talked about minimizing the number of multiplications. What if a different cost is associated with each multiplication? For instance, the basic multiple-precision multiplication algorithm described in an [earlier post](/blog/2009/07/implementing-multiple-precision-arithmetic-part-1) has a cost propertional to $m \times n$ if the factors have $m$ and $n$ digits, respectively. Using this cost model, the binary algorithm *is* actually optimal. This was shown by R. L. Graham, A. C.-C. Yao, and F.-F. Yao in *Addition chains with multiplicative cost*, Discrete Math., 23 (1978), 115-119 (article available [online](http://www.math.ucsd.edu/~ronspubs/#78)).
