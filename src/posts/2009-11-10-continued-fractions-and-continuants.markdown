---
layout: post.html
title: Continued Fractions and Continuants
tags: algorithms, cpp, continued-fraction
categories: programming, mathematics
excerpt: "We will be considering continued fractions of the form [...]"
---
We will be considering continued fractions of the form

$$a_0 + \displaystyle\frac{1}{a_1 + \displaystyle\frac{1}{\ddots + \displaystyle\frac{1}{a_{n-1} + \displaystyle\frac{1}{a_n}}}}$$

where the $a_k$'s are real numbers called the partial quotients. Continued fractions can be greatly [generalized](http://en.wikipedia.org/wiki/Generalized_continued_fraction), where both the &#8220;numerators&#8221; (here all equal to one) and the partial quotients can be more general mathematical objects. Most common, however, are *regular continued fractions* where $a_0$ is an integer and $a_1, \ldots, a_n$ are positive integers. For easier notation we introduce

$$/\!/a_1, a_2, \ldots, a_n/\!/ = \displaystyle\frac{1}{a_1 + \displaystyle\frac{1}{\ddots + \displaystyle\frac{1}{a_{n-1} + \displaystyle\frac{1}{a_n}}}}$$

where $/\!/ \, /\!/ = 0$ for $n=0$.

<div class="pull-right"><a href="https://en.wikipedia.org/wiki/Special:BookSources/0486696308"><img src="/media/books/khinchin.jpg" alt=""></a></div>
<div class="pull-right"><a href="https://en.wikipedia.org/wiki/Special:BookSources/0201558025"><img src="/media/books/concrete.jpg" alt=""></a></div>
<div class="pull-right"><a href="https://en.wikipedia.org/wiki/Special:BookSources/0201896842"><img src="/media/books/taocp2.jpg" alt=""></a></div>

Most of the theory in this article is based on Section&nbsp;4.5.3 from [The Art of Computer Programming](http://www-cs-faculty.stanford.edu/~uno/taocp.html), Volume&nbsp;2, by [Donald E. Knuth](http://www-cs-faculty.stanford.edu/~uno/) and Section&nbsp;6.7 from [Concrete Mathematics](http://www-cs-faculty.stanford.edu/~uno/gkp.html) by [Graham](http://math.ucsd.edu/~fan/ron/), [Knuth](http://www-cs-faculty.stanford.edu/~uno/), and [Patashnik](http://en.wikipedia.org/wiki/Oren_Patashnik). See also [Continued Fractions](https://en.wikipedia.org/wiki/Special:BookSources/0486696308) by A. Ya. Khinchin.

### Basic Properties

Some properties suggest themselves immediately from the definition:

<div class="pull-right">(1)</div>
$$/\!/ a_1, a_2, \ldots, a_n /\!/ = 1 / \left( a_1 + /\!/ a_2, \ldots, a_n /\!/ \right), \quad n \geq 1,$$

<div class="pull-right">(2)</div>
$$/\!/ a_1, \ldots, a_n /\!/ = /\!/ a_1, \ldots, a_k + /\!/ a_{k+1}, \ldots, a_n /\!/ /\!/, \quad 1 \leq k \leq n,$$

<div class="pull-right">(3)</div>
$$/\!/ 0, a_1, \ldots, a_n /\!/ = a_1 + /\!/ a_2, \ldots, a_n /\!/, \quad n \geq 1,$$

<div class="pull-right">(4)</div>
$$/\!/ a_1, \ldots, a_{n-1}, a_n, 1 /\!/ = /\!/ a_1, \ldots, a_{n-1}, a_n + 1 /\!/, \quad n \geq 1.$$

The relations (2) and (3) can be combined into the following,

<div class="pull-right">(5)</div>
$$\begin{aligned} &/\!/ a_1, \ldots, a_{k-1}, a_k, 0, a_{k+1}, a_{k+2}, \ldots, a_n /\!/ \\ & \qquad = /\!/ a_1, \ldots, a_{k-1}, a_k + a_{k+1}, a_{k+2}, \ldots, a_n /\!/, \quad 1 \leq k < n. \end{aligned}$$

From (3), (4), and (5) we see that any continued fraction can be written without a zero element (the first partial quotient $a_0$ may be zero, though) and without the last element being equal to one. For instance,

$$/\!/ 0,4,3,0,2,1 /\!/ = 4 + /\!/ 3,0,2,1 /\!/ = 4 + /\!/ 5,1 /\!/ = 4 + /\!/ 6 /\!/.$$

### Continuants

We now turn to continuant polynomials or simply continuants. They are defined as

*   $K_0() = 1$,
*   $K_1(x_1) = x_1$,
*   $K_n(x_1, \ldots, x_n) = K_{n-1}(x_1, \ldots, x_{n-1}) x_n + K_{n-2}(x_1, \ldots, x_{n-2})$ for $n \geq 2$.

The subscripts are included to make clear how many parameters there are. Note how

<div class="pull-right">(6)</div>
$$F_{n+1} = K_n(1, \ldots, 1),$$

where $F_0, F_1, \ldots$ are the well-known [Fibonacci numbers](http://en.wikipedia.org/wiki/Fibonacci_number) ($F_0=F_1=0$ and $F_k=F_{k-1}+F_{k-2}$ for $k \geq 2$). This is easily seen by setting $x_k=1$ for all $k$ in the definition.

We also have

<div class="pull-right">(7)</div>
$$K_n(x_1, \ldots, x_n) \geq K(y_1, \ldots, y_n), \quad \text{when } x_k \geq y_k,$$

which can be shown straightforwardly by induction. We will use this fact later on.

Continuants are connected to continued fractions in several ways, an essential one being

<div class="pull-right">(8)</div>
$$a_0 + /\!/ a_1, a_2, \ldots, a_n /\!/ = \frac{K_{n+1}(a_0, a_1, \ldots, a_n)}{K_n(a_1, a_2, \ldots, a_n)}.$$

To prove this identity, we need

<div class="pull-right">(9)</div>
$$\begin{aligned} K_n(x_1, \ldots, x_{n-1}, x_n + y) &= K_{n-1}(x_1, \ldots, x_{n-1}) (x_n + y) + K_{n-2}(x_1, \ldots, x_{n-2}) \\ &= K_{n-1}(x_1, \ldots, x_{n-1}) x_n + K_{n-1}(x_1, \ldots, x_{n-1}) y + K_{n-2}(x_1, \ldots, x_{n-2}) \\ &= K_n(x_1, \ldots, x_{n-1}, x_n) + K_{n-1}(x_1, \ldots, x_{n-1}) y. \\ \end{aligned}$$

We can now proceed with proving (8), which we show by induction. First we observe that it is true for $n=0$ and $n=1$,

$$a_0 = \frac{K_1(a_0)}{K_0()}, \quad a_0 + /\!/ a_1 /\!/ = \frac{K_2(a_0, a_1)}{K_1(a_1)} = \frac{a_0 a_1 + 1}{a_1}.$$

We now get

$$\begin{aligned} a_0 + /\!/ a_1, \ldots, a_n, a_{n+1} /\!/ &= a_0 + /\!/ a_1, \ldots, a_{n-1}, a_n + 1/a_{n+1} /\!/ \\ &= \frac{K_{n+1}(a_0, \ldots, a_{n-1}, a_n + 1/a_{n+1})}{K_n(a_1, \ldots, a_{n-1}, a_n + 1/a_{n+1})} \\ &= \frac{K_{n+1}(a_0, a_1, \ldots, a_n) + K_n(a_0, a_1, \ldots, a_{n-1})/a_{n+1}}{K_n(a_1, a_2, \ldots, a_n) + K_{n-1}(a_1, a_2, \ldots, a_{n-1})/a_{n+1}} \\ &= \frac{K_{n+1}(a_0, a_1, \ldots, a_n) a_{n+1} + K_n(a_0, a_1, \ldots, a_{n-1})}{K_n(a_1, a_2, \ldots, a_n) a_{n+1} + K_{n-1}(a_1, a_2, \ldots, a_{n-1})} \\ &= \frac{K_{n+2}(a_0, \ldots, a_n, a_{n+1})}{K_{n+1}(a_1, \ldots, a_n, a_{n+1})}, \end{aligned}$$

which was what we wanted.

A useful equality for continuants is

<div class="pull-right">(10)</div>
$$\left[ \begin{matrix} K_n(x_1, \ldots, x_n) & K_{n-1}(x_1, \ldots, x_{n-1}) \\ K_{n-1}(x_2, \ldots, x_n) & K_{n-2}(x_2, \ldots, x_{n-1}) \end{matrix} \right] = \left[ \begin{matrix} x_1 & 1 \\ 1 & 0 \end{matrix} \right] \left[ \begin{matrix} x_2 & 1 \\ 1 & 0 \end{matrix} \right] \cdots \left[ \begin{matrix} x_n & 1 \\ 1 & 0 \end{matrix} \right]$$

for $n \geq 2$. For $n=2$ we have

$$\left[ \begin{matrix} K_2(x_1, x_2) & K_1(x_1) \\ K_1(x_2) & K_0() \end{matrix} \right] = \left[ \begin{matrix} x_1 x_2 + 1 & x_1 \\ x_2 & 1 \end{matrix} \right] = \left[ \begin{matrix} x_1 & 1 \\ 1 & 0 \end{matrix} \right] \left[ \begin{matrix} x_2 & 1 \\ 1 & 0 \end{matrix} \right],$$

and the general case is easily shown using induction. Taking the determinant of both sides of (10) leads to

<div class="pull-right">(11)</div>
$$K_n(x_1, \ldots, x_n) K_{n-2}(x_2, \ldots, x_{n-1}) - K_{n-1}(x_2, \ldots, x_n) K_{n-1}(x_1, \ldots, x_{n-1}) = (-1)^n.$$

This shows that when $u = K_{n+1}(a_0, a_1, \ldots, a_n)$ and $v = K_n(a_1, a_2, \ldots, a_n)$ then not only is $u/v = a_0 + /\!/ a_1, a_2, \ldots, a_n /\!/$, but $u$ and $v$ are also relatively prime.

### Evaluating Continued Fractions

Let us consider how to evaluate a continued fraction in C++, given access to the partial quotients $a_0, a_1, \ldots, a_n$ through a [forward iterator](http://www.sgi.com/tech/stl/ForwardIterator.html). One way is to use Equation&nbsp;(1) which leads to

``` cpp
template <typename NUM, typename In>
NUM evaluate_continued_fraction_rec(In first, In last)
{
  if (first == last) return (NUM) 0;
  return *first + evaluate_continued_fraction_rec2<NUM>(first+1, last);
}
```

where $/\!/ a_1, a_2, \ldots, a_n /\!/$ is evaluated recursively by

``` cpp
template <typename NUM, typename In>
NUM evaluate_continued_fraction_rec2(In first, In last)
{
  if (first == last) return (NUM) 0;
  return 1/(*first + evaluate_continued_fraction_rec2<NUM>(first+1, last));
}
```

A drawback to this approach is the recursive calls. Another way to evaluate is to use a special case of Equation&nbsp;(2),

<div class="pull-right">(12)</div>
$$/\!/ a_1, \ldots, a_{n-1}, a_n /\!/ = /\!/ a_1, \ldots, a_{n-1} + 1/a_n /\!/, \quad \text{for } n \geq 2.$$

So given a [bidirectional iterator](http://www.sgi.com/tech/stl/BidirectionalIterator.html) the evaluation can be done as

``` cpp
template <typename NUM, typename Bi>
NUM evaluate_continued_fraction_rev(Bi first, Bi last)
{
  if (last == first) return (NUM) 0;
  NUM r = 0;
  while (--last != first)
    r = 1/(*last + r);
  return *last + r;
}
```

Using continuants, we can actually evaluate a continued fraction using a forward iterator and without any recursive calls. The key is to use the relation&nbsp;(8) which leads to the following algorithm.

``` cpp
template <typename NUM, typename In>
void evaluate_continued_fraction(In first, In last, NUM& num, NUM& den)
{
  if (first == last) { num = 0; den = 1; return; }
  NUM x, u = *first, v = 1, s = 1, t = 0;
  while (true) {
    if (++first == last) { num = u; den = v; return; }
    x = *first;
    s += x*u;
    t += x*v;
    if (++first == last) { num = s; den = t; return; }
    x = *first;
    u += x*s;
    v += x*t;
  }
}
```

Note how the result is seperated into numerator and denominator. Recall from the previous section that the corresponding fraction is guaranteed to be at its lowest terms.

### Constructing a Continued Fraction

Let $x$ be a real number. Consider now the following sequences:

$$\begin{aligned} a_0 = \lfloor x \rfloor, \qquad &x_0 = x - a_0, \\ a_{k+1} = \lfloor 1/x_k \rfloor, \qquad &x_{k+1} = 1/x_k - a_{k+1}, \end{aligned}$$

for $k = 0, 1, \ldots$. We then have

$$x = a_0 + x_0 = a_0 + \frac{1}{a_1 + x_1} = a_0 + \frac{1}{a_1 + \displaystyle\frac{1}{a_2 + x_2}} = \ldots.$$

If $x_k=0$ then $a_{k+1}, \ldots$ are undefined and $x = a_0 + /\!/ a_1, a_2, \ldots, a_n /\!/$ with $n=k$. If all $x_k$'s are non-zero then $x = a_0 + /\!/ a_1, a_2, \ldots /\!/$, but we will delay the argument of why this infinite continued fraction makes sense until the final section.

It should be clear from the previous section that the value of the a regular continued fraction is a rational number. So let us try to reverse the process when&nbsp;$x$ is a rational number. Given $x=u/v$ with integer&nbsp;$u$ and positive integer&nbsp;$v$, how can $a_0, a_1, \ldots$ be computed? Setting $u_k/v_k = x_k$ in the construction process from above, we get

$$\begin{aligned} a_0 = \left\lfloor \frac{u}{v} \right\rfloor, \qquad &\frac{u_0}{v_0} = \frac{u}{v} - a_0 = \frac{u - \lfloor u/v \rfloor v}{v} = \frac{u \text{ mod } v}{v}, \\ a_{k+1} = \left\lfloor \frac{v_k}{u_k} \right\rfloor, \qquad &\frac{u_{k+1}}{v_{k+1}} = \frac{v_k}{u_k} - a_{k+1} = \frac{v_k - \lfloor v_k/u_k \rfloor u_k}{u_k} = \frac{v_k \text{ mod } u_k}{u_k}, \end{aligned}$$

for $k = 0, 1, \ldots$. If this is turned into a C++ algorithm, we get the following. (The main loop has been [unrolled](http://en.wikipedia.org/wiki/Loop_unwinding) to avoid the $u \leftrightarrow v$ swapping and a little tweaking was also necessary when the algorithm starts because C++ integer division `u/v` is not always equal to $\lfloor u/v \rfloor$ when the result is negative.)

``` cpp
template <typename NUM, typename Out>
void fraction_to_continued_fraction(NUM u, NUM v, Out out)
{
  if (v < 0) { u = -u; v = -v; }
  NUM r = u % v;
  if (r < 0) { u -= v; r += v; }
  *out++ = u/v;
  u = r;
  while (true) {
    if (!u) return;
    *out++ = v/u;
    v %= u;
    if (!v) return;
    *out++ = u/v;
    u %= v;
  }
}
```

Notice the resemblence to [computing the greatest common divisor](/blog/2009/10/computing-the-greatest-common-divisor) using Euclid's algorithm. In fact, the values of `u` and `v` are equivalent to those during the `gcd_euclid` function of that article. Furthermore, Euclid's algorithm always terminates, so the construction process always terminates when the input number is rational. In fact, a continued fraction is finite if and only if it represents a rational number.

### Infinite Continued Fractions

Let us consider the construction of a continued fraction for any real number&nbsp;$x$. Recall that at any stage of the construction, we have

$$x = a_0 + /\!/ a_1, a_2, \ldots, a_k + x_k /\!/.$$

How close is $x$ to $a_0 + /\!/ a_1, a_2, \ldots, a_k /\!/$ for some $k$? We get

$$\begin{aligned} x - \left( a_0 + /\!/ a_1, a_2, \ldots, a_k /\!/ \right) &= /\!/ a_1, \ldots, a_k, 1/x_k /\!/ - /\!/ a_1, a_2, \ldots, a_k /\!/ \\ &= \frac{K_k(a_2, \ldots, a_k, 1/x_k)}{K_{k+1}(a_1, \ldots, a_k, 1/x_k)} - \frac{K_{k-1}(a_2, \ldots, a_k)}{K_k(a_1, a_2, \ldots, a_k)} \\ &= \frac{(-1)^k}{K_k(a_1, a_2, \ldots, a_k) K_{k+1}(a_1, \ldots, a_k, 1/x_k)}, \end{aligned}$$

using (1), (8), (11), and&nbsp;(12). This relation shows several important things (which also hold for finite continued fractions $x = a_0 + /\!/ a_1, a_2, \ldots, a_n /\!/$ when $k < n$):

*   $a_0 + /\!/ a_1, a_2, \ldots, a_k /\!/$ is *less* than $x$ for even $k$ and *greater* than $x$ for odd $k$.
*   Using (8) and (9) we see that the function $y \mapsto a_0 + /\!/ a_1, a_2, \ldots, a_k+y /\!/$ is continuous and strictly increasing ($k$ even) or strictly decreasing ($k$ odd) when $y$ goes from 0 to 1, and since $0 < x_k < 1$ we have that $x$ always lies *between* $a_0 + /\!/ a_1, a_2, \ldots, a_k /\!/$ and $a_0 + /\!/ a_1, a_2, \ldots, a_k+1 /\!/$.
*   The denominator of the error term grows, at least, exponentially,

    <div class="pull-right">(13)</div>
    $$\begin{aligned} &K_k(a_1, a_2, \ldots, a_k) K_{k+1}(a_1, \ldots, a_k, 1/x_k) \\ &\qquad \geq K_k(1, \ldots, 1) K_{k+1}(1, \ldots, 1) = F_{k+1} F_{k+2} \geq (\phi+1)^{k+1}/5, \end{aligned}$$

    using (6), (7) and with $\phi = (1+\sqrt{5})/2 \sim 1.618$.
*   Since the error term goes to zero as $n \rightarrow \infty$, infinite continued fractions make sense as the following limit,

    $$a_0 + /\!/ a_1, a_2, \ldots /\!/ = a_0 + \lim_{k\rightarrow\infty} /\!/ a_1, a_2, \ldots, a_k /\!/.$$

The bound for $F_{k+1} F_{k+2}$ in (13) can be derived by using the formula for the $k$th Fibonacci number, $F_k = (\phi^k - (1-\phi)^k)/\sqrt{5}$,

$$\begin{aligned} F_{k+1} F_{k+2} &= \left( \phi^{2k+3} + (1-\phi)^{2k+3} - (\phi(1-\phi))^{k+1} \right)/5 \\ &= \left( \phi^{2k+3} + (1-\phi)(\phi-1)^{2k+2} + (-1)^k \right)/5 \\ &\geq \phi^{2k+2} \left(\phi - \frac{1}{\phi^{2k+1}} \right)/5 \geq \left(\phi^2\right)^{k+1}/5 = (\phi+1)^{n+1}/5, \end{aligned}$$

where we use that $\phi^2-\phi-1=0$, $\phi(1-\phi)=-1$, and $1 < \phi < 2$.

As an example of an infinite continued fraction it can be shown that

$$e = 2 + /\!/ 1,2,1,1,4,1,1,6,1,1,8,1,1,10,1,1,12,1,1,14,\ldots /\!/.$$

Evaluating the truncated finite continued fractions $2$, $2 + /\!/ 1 /\!/$, $2 + /\!/ 1,2 /\!/$, and so on, we get

$$2,3,\frac{8}{3}, \frac{11}{4}, \frac{19}{7}, \frac{87}{32}, \frac{106}{39}, \frac{193}{71}, \frac{1264}{465}, \frac{1457}{536}, \frac{2721}{1001}, \frac{23225}{8544}, \frac{25946}{9545}, \frac{49171}{18089}, \ldots,$$

where each fraction is a better and better approximation to $e$ (the absolute error for $49171/18089$ is around $-3 \cdot 10^{-10}$).

As mentioned earlier, the continued fraction of some $x$ is finite if and only if $x$ is rational. The continued fraction representation for $x$ is infinite and *eventually periodic*,

$$a_0 + /\!/ a_1, \ldots, a_m, b_1, \ldots, b_n, b_1, \ldots, b_n, \ldots /\!/, \quad m \geq 0, n \geq 1,$$

if and only if $x$ is a [quadratic irrationality](http://en.wikipedia.org/wiki/Quadratic_irrational) (proved in [TAOCP](http://www-cs-faculty.stanford.edu/~uno/taocp.html), vol.&nbsp;2, Exercise&nbsp;4.5.3-12). A quadratic irrationality is a number of the form $(\sqrt{d}-u)/v$ where $d$, $u$, and $v$ are integers, $d > 0$, $v \neq 0$, and $d$ is not a [perfect square](http://en.wikipedia.org/wiki/Square_number).

Some special cases of this theorem are:

*   $\sqrt{n^2+1} = n + /\!/ 2n,2n,\ldots /\!/$,
*   $\sqrt{n^2+2} = n + /\!/ n,2n,n,2n,\ldots /\!/$,

for positive integers $n$. To prove the first of these identities let $x = n + /\!/ 2n,2n,\ldots /\!/$. Then $x-n = y$ where $y = 1/(2n + y)$, implying $x-n = 1/(x+n)$ and finally $x^2-n^2=1$. The second identity can be proved similarly.

### Concluding Remarks

This article on continued fractions was supposed to be fairly short and just contain the most basic properties, but the subject turned out to be vast and very interesting. More articles related to continued fractions will likely follow.
