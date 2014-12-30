---
layout: post
title: Continued Fractions and Continuants
author: Jan Marthedal Rasmussen
date: 2009-11-10 16:27:42.000000000 +01:00
categories:
- programming
- mathematics
tags:
- algorithms
- C++
- continued fraction
- continuant
- quadratic irrationality
- Fibonacci number
---
We will be considering continued fractions of the form

{% dmath a_0 + \displaystyle\frac{1}{a_1 + \displaystyle\frac{1}{\ddots + \displaystyle\frac{1}{a_{n-1} + \displaystyle\frac{1}{a_n}}}} %}

<span></span>

where the {% imath a_k %}'s are real numbers called the partial quotients. Continued fractions can be greatly [generalized](http://en.wikipedia.org/wiki/Generalized_continued_fraction), where both the &#8220;numerators&#8221; (here all equal to one) and the partial quotients can be more general mathematical objects. Most common, however, are *regular continued fractions* where {% imath a_0 %} is an integer and {% imath a_1, \ldots, a_n %} are positive integers. For easier notation we introduce

{% dmath /\!/a_1, a_2, \ldots, a_n/\!/ = \displaystyle\frac{1}{a_1 + \displaystyle\frac{1}{\ddots + \displaystyle\frac{1}{a_{n-1} + \displaystyle\frac{1}{a_n}}}} %}

where {% imath /\!/ \, /\!/ = 0 %} for {% imath n=0 %}.

<div class="pull-right"><a href="{% amazon khinchin %}"><img src="{% bookcover khinchin %}" /></a></div>
<div class="pull-right"><a href="{% amazon concrete %}"><img src="{% bookcover concrete %}" /></a></div>
<div class="pull-right"><a href="{% amazon taocp2 %}"><img src="{% bookcover taocp2 %}" /></a></div>

Most of the theory in this article is based on Section&nbsp;4.5.3 from [The Art of Computer Programming](http://www-cs-faculty.stanford.edu/~uno/taocp.html), Volume&nbsp;2, by [Donald E. Knuth](http://www-cs-faculty.stanford.edu/~uno/) and Section&nbsp;6.7 from [Concrete Mathematics](http://www-cs-faculty.stanford.edu/~uno/gkp.html) by [Graham](http://math.ucsd.edu/~fan/ron/), [Knuth](http://www-cs-faculty.stanford.edu/~uno/), and [Patashnik](http://en.wikipedia.org/wiki/Oren_Patashnik). See also <a href="{% amazon khinchin %}">Continued Fractions</a> by A. Ya. Khinchin.

### Basic Properties

Some properties suggest themselves immediately from the definition:

<div class="pull-right">(1)</div>
{% dmath /\!/ a_1, a_2, \ldots, a_n /\!/ = 1 / \left( a_1 + /\!/ a_2, \ldots, a_n /\!/ \right), \quad n \geq 1, %}

<div class="pull-right">(2)</div>
{% dmath /\!/ a_1, \ldots, a_n /\!/ = /\!/ a_1, \ldots, a_k + /\!/ a_{k+1}, \ldots, a_n /\!/ /\!/, \quad 1 \leq k \leq n, %}

<div class="pull-right">(3)</div>
{% dmath /\!/ 0, a_1, \ldots, a_n /\!/ = a_1 + /\!/ a_2, \ldots, a_n /\!/, \quad n \geq 1, %}

<div class="pull-right">(4)</div>
{% dmath /\!/ a_1, \ldots, a_{n-1}, a_n, 1 /\!/ = /\!/ a_1, \ldots, a_{n-1}, a_n + 1 /\!/, \quad n \geq 1. %}

The relations (2) and (3) can be combined into the following,

<div class="pull-right">(5)</div>
{% dmath \begin{aligned} &/\!/ a_1, \ldots, a_{k-1}, a_k, 0, a_{k+1}, a_{k+2}, \ldots, a_n /\!/ \\ & \qquad = /\!/ a_1, \ldots, a_{k-1}, a_k + a_{k+1}, a_{k+2}, \ldots, a_n /\!/, \quad 1 \leq k < n. \end{aligned} %}

From (3), (4), and (5) we see that any continued fraction can be written without a zero element (the first partial quotient {% imath a_0 %} may be zero, though) and without the last element being equal to one. For instance,

{% dmath /\!/ 0,4,3,0,2,1 /\!/ = 4 + /\!/ 3,0,2,1 /\!/ = 4 + /\!/ 5,1 /\!/ = 4 + /\!/ 6 /\!/. %}

### Continuants

We now turn to continuant polynomials or simply continuants. They are defined as

*   {% imath K_0() = 1 %},
*   {% imath K_1(x_1) = x_1 %},
*   {% imath K_n(x_1, \ldots, x_n) = K_{n-1}(x_1, \ldots, x_{n-1}) x_n + K_{n-2}(x_1, \ldots, x_{n-2}) %} for {% imath n \geq 2 %}.

The subscripts are included to make clear how many parameters there are. Note how

<div class="pull-right">(6)</div>
{% dmath F_{n+1} = K_n(1, \ldots, 1), %}

where {% imath F_0, F_1, \ldots %} are the well-known [Fibonacci numbers](http://en.wikipedia.org/wiki/Fibonacci_number) ({% imath F_0=F_1=0 %} and {% imath F_k=F_{k-1}+F_{k-2} %} for {% imath k \geq 2 %}). This is easily seen by setting {% imath x_k=1 %} for all {% imath k %} in the definition.

We also have

<div class="pull-right">(7)</div>
{% dmath K_n(x_1, \ldots, x_n) \geq K(y_1, \ldots, y_n), \quad \hbox{when } x_k \geq y_k, %}

which can be shown straightforwardly by induction. We will use this fact later on.

Continuants are connected to continued fractions in several ways, an essential one being

<div class="pull-right">(8)</div>
{% dmath a_0 + /\!/ a_1, a_2, \ldots, a_n /\!/ = \frac{K_{n+1}(a_0, a_1, \ldots, a_n)}{K_n(a_1, a_2, \ldots, a_n)}. %}

To prove this identity, we need

<div class="pull-right">(9)</div>
{% dmath \begin{aligned} K_n(x_1, \ldots, x_{n-1}, x_n + y) &= K_{n-1}(x_1, \ldots, x_{n-1}) (x_n + y) + K_{n-2}(x_1, \ldots, x_{n-2}) \\ &= K_{n-1}(x_1, \ldots, x_{n-1}) x_n + K_{n-1}(x_1, \ldots, x_{n-1}) y + K_{n-2}(x_1, \ldots, x_{n-2}) \\ &= K_n(x_1, \ldots, x_{n-1}, x_n) + K_{n-1}(x_1, \ldots, x_{n-1}) y. \\ \end{aligned} %}

We can now proceed with proving (8), which we show by induction. First we observe that it is true for {% imath n=0 %} and {% imath n=1 %},

{% dmath a_0 = \frac{K_1(a_0)}{K_0()}, \quad a_0 + /\!/ a_1 /\!/ = \frac{K_2(a_0, a_1)}{K_1(a_1)} = \frac{a_0 a_1 + 1}{a_1}. %}

We now get

{% dmath \begin{aligned} a_0 + /\!/ a_1, \ldots, a_n, a_{n+1} /\!/ &= a_0 + /\!/ a_1, \ldots, a_{n-1}, a_n + 1/a_{n+1} /\!/ \\ &= \frac{K_{n+1}(a_0, \ldots, a_{n-1}, a_n + 1/a_{n+1})}{K_n(a_1, \ldots, a_{n-1}, a_n + 1/a_{n+1})} \\ &= \frac{K_{n+1}(a_0, a_1, \ldots, a_n) + K_n(a_0, a_1, \ldots, a_{n-1})/a_{n+1}}{K_n(a_1, a_2, \ldots, a_n) + K_{n-1}(a_1, a_2, \ldots, a_{n-1})/a_{n+1}} \\ &= \frac{K_{n+1}(a_0, a_1, \ldots, a_n) a_{n+1} + K_n(a_0, a_1, \ldots, a_{n-1})}{K_n(a_1, a_2, \ldots, a_n) a_{n+1} + K_{n-1}(a_1, a_2, \ldots, a_{n-1})} \\ &= \frac{K_{n+2}(a_0, \ldots, a_n, a_{n+1})}{K_{n+1}(a_1, \ldots, a_n, a_{n+1})}, \end{aligned} %}

which was what we wanted.

A useful equality for continuants is

<div class="pull-right">(10)</div>
{% dmath \left[ \begin{matrix} K_n(x_1, \ldots, x_n) & K_{n-1}(x_1, \ldots, x_{n-1}) \\ K_{n-1}(x_2, \ldots, x_n) & K_{n-2}(x_2, \ldots, x_{n-1}) \end{matrix} \right] = \left[ \begin{matrix} x_1 & 1 \\ 1 & 0 \end{matrix} \right] \left[ \begin{matrix} x_2 & 1 \\ 1 & 0 \end{matrix} \right] \cdots \left[ \begin{matrix} x_n & 1 \\ 1 & 0 \end{matrix} \right] %}

for {% imath n \geq 2 %}. For {% imath n=2 %} we have

{% dmath \left[ \begin{matrix} K_2(x_1, x_2) & K_1(x_1) \\ K_1(x_2) & K_0() \end{matrix} \right] = \left[ \begin{matrix} x_1 x_2 + 1 & x_1 \\ x_2 & 1 \end{matrix} \right] = \left[ \begin{matrix} x_1 & 1 \\ 1 & 0 \end{matrix} \right] \left[ \begin{matrix} x_2 & 1 \\ 1 & 0 \end{matrix} \right], %}

and the general case is easily shown using induction. Taking the determinant of both sides of (10) leads to

<div class="pull-right">(11)</div>
{% dmath K_n(x_1, \ldots, x_n) K_{n-2}(x_2, \ldots, x_{n-1}) - K_{n-1}(x_2, \ldots, x_n) K_{n-1}(x_1, \ldots, x_{n-1}) = (-1)^n. %}

This shows that when {% imath u = K_{n+1}(a_0, a_1, \ldots, a_n) %} and {% imath v = K_n(a_1, a_2, \ldots, a_n) %} then not only is {% imath u/v = a_0 + /\!/ a_1, a_2, \ldots, a_n /\!/ %}, but {% imath u %} and {% imath v %} are also relatively prime.

### Evaluating Continued Fractions

Let us consider how to evaluate a continued fraction in C++, given access to the partial quotients {% imath a_0, a_1, \ldots, a_n %} through a [forward iterator](http://www.sgi.com/tech/stl/ForwardIterator.html). One way is to use Equation&nbsp;(1) which leads to

{% highlight cpp %}
template <typename NUM, typename In>
NUM evaluate_continued_fraction_rec(In first, In last)
{
  if (first == last) return (NUM) 0;
  return *first + evaluate_continued_fraction_rec2<NUM>(first+1, last);
}
{% endhighlight %}

where {% imath /\!/ a_1, a_2, \ldots, a_n /\!/ %} is evaluated recursively by

{% highlight cpp %}
template <typename NUM, typename In>
NUM evaluate_continued_fraction_rec2(In first, In last)
{
  if (first == last) return (NUM) 0;
  return 1/(*first + evaluate_continued_fraction_rec2<NUM>(first+1, last));
}
{% endhighlight %}

A drawback to this approach is the recursive calls. Another way to evaluate is to use a special case of Equation&nbsp;(2),

<div class="pull-right">(12)</div>
{% dmath /\!/ a_1, \ldots, a_{n-1}, a_n /\!/ = /\!/ a_1, \ldots, a_{n-1} + 1/a_n /\!/, \quad \hbox{for } n \geq 2. %}

So given a [bidirectional iterator](http://www.sgi.com/tech/stl/BidirectionalIterator.html) the evaluation can be done as

{% highlight cpp %}
template <typename NUM, typename Bi>
NUM evaluate_continued_fraction_rev(Bi first, Bi last)
{
  if (last == first) return (NUM) 0;
  NUM r = 0;
  while (--last != first)
    r = 1/(*last + r);
  return *last + r;
}
{% endhighlight %}

Using continuants, we can actually evaluate a continued fraction using a forward iterator and without any recursive calls. The key is to use the relation&nbsp;(8) which leads to the following algorithm.

{% highlight cpp %}
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
{% endhighlight %}

Note how the result is seperated into numerator and denominator. Recall from the previous section that the corresponding fraction is guaranteed to be at its lowest terms.

### Constructing a Continued Fraction

Let {% imath x %} be a real number. Consider now the following sequences:

{% dmath \begin{aligned} a_0 = \lfloor x \rfloor, \qquad &x_0 = x - a_0, \\ a_{k+1} = \lfloor 1/x_k \rfloor, \qquad &x_{k+1} = 1/x_k - a_{k+1}, \end{aligned} %}

for {% imath k = 0, 1, \ldots %}. We then have

{% dmath x = a_0 + x_0 = a_0 + \frac{1}{a_1 + x_1} = a_0 + \frac{1}{a_1 + \displaystyle\frac{1}{a_2 + x_2}} = \ldots. %}

If {% imath x_k=0 %} then {% imath a_{k+1}, \ldots %} are undefined and {% imath x = a_0 + /\!/ a_1, a_2, \ldots, a_n /\!/ %} with {% imath n=k %}. If all {% imath x_k %}'s are non-zero then {% imath x = a_0 + /\!/ a_1, a_2, \ldots /\!/ %}, but we will delay the argument of why this infinite continued fraction makes sense until the final section.

It should be clear from the previous section that the value of the a regular continued fraction is a rational number. So let us try to reverse the process when&nbsp;{% imath x %} is a rational number. Given {% imath x=u/v %} with integer&nbsp;{% imath u %} and positive integer&nbsp;{% imath v %}, how can {% imath a_0, a_1, \ldots %} be computed? Setting {% imath u_k/v_k = x_k %} in the construction process from above, we get

{% dmath \begin{aligned} a_0 = \left\lfloor \frac{u}{v} \right\rfloor, \qquad &\frac{u_0}{v_0} = \frac{u}{v} - a_0 = \frac{u - \lfloor u/v \rfloor v}{v} = \frac{u \hbox{ mod } v}{v}, \\ a_{k+1} = \left\lfloor \frac{v_k}{u_k} \right\rfloor, \qquad &\frac{u_{k+1}}{v_{k+1}} = \frac{v_k}{u_k} - a_{k+1} = \frac{v_k - \lfloor v_k/u_k \rfloor u_k}{u_k} = \frac{v_k \hbox{ mod } u_k}{u_k}, \end{aligned} %}

for {% imath k = 0, 1, \ldots %}. If this is turned into a C++ algorithm, we get the following. (The main loop has been [unrolled](http://en.wikipedia.org/wiki/Loop_unwinding) to avoid the {% imath u \leftrightarrow v %} swapping and a little tweaking was also necessary when the algorithm starts because C++ integer division `u/v` is not always equal to {% imath \lfloor u/v \rfloor %} when the result is negative.)

{% highlight cpp %}
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
{% endhighlight %}

Notice the resemblence to [computing the greatest common divisor](/2009/10/computing-the-greatest-common-divisor.html) using Euclid's algorithm. In fact, the values of `u` and `v` are equivalent to those during the `gcd_euclid` function of that article. Furthermore, Euclid's algorithm always terminates, so the construction process always terminates when the input number is rational. In fact, a continued fraction is finite if and only if it represents a rational number.

### Infinite Continued Fractions

Let us consider the construction of a continued fraction for any real number&nbsp;{% imath x %}. Recall that at any stage of the construction, we have

{% dmath x = a_0 + /\!/ a_1, a_2, \ldots, a_k + x_k /\!/. %}

How close is {% imath x %} to {% imath a_0 + /\!/ a_1, a_2, \ldots, a_k /\!/ %} for some {% imath k %}? We get

{% dmath \begin{aligned} x - \left( a_0 + /\!/ a_1, a_2, \ldots, a_k /\!/ \right) &= /\!/ a_1, \ldots, a_k, 1/x_k /\!/ - /\!/ a_1, a_2, \ldots, a_k /\!/ \\ &= \frac{K_k(a_2, \ldots, a_k, 1/x_k)}{K_{k+1}(a_1, \ldots, a_k, 1/x_k)} - \frac{K_{k-1}(a_2, \ldots, a_k)}{K_k(a_1, a_2, \ldots, a_k)} \\ &= \frac{(-1)^k}{K_k(a_1, a_2, \ldots, a_k) K_{k+1}(a_1, \ldots, a_k, 1/x_k)}, \end{aligned} %}

using (1), (8), (11), and&nbsp;(12). This relation shows several important things (which also hold for finite continued fractions {% imath x = a_0 + /\!/ a_1, a_2, \ldots, a_n /\!/ %} when {% imath k < n %}):

*   {% imath a_0 + /\!/ a_1, a_2, \ldots, a_k /\!/ %} is *less* than {% imath x %} for even {% imath k %} and *greater* than {% imath x %} for odd {% imath k %}.
*   Using (8) and (9) we see that the function {% imath y \mapsto a_0 + /\!/ a_1, a_2, \ldots, a_k+y /\!/ %} is continuous and strictly increasing ({% imath k %} even) or strictly decreasing ({% imath k %} odd) when {% imath y %} goes from 0 to 1, and since {% imath 0 < x_k < 1 %} we have that {% imath x %} always lies *between* {% imath a_0 + /\!/ a_1, a_2, \ldots, a_k /\!/ %} and {% imath a_0 + /\!/ a_1, a_2, \ldots, a_k+1 /\!/ %}.
*   The denominator of the error term grows, at least, exponentially,

    <div class="pull-right">(13)</div>
    {% dmath \begin{aligned} &K_k(a_1, a_2, \ldots, a_k) K_{k+1}(a_1, \ldots, a_k, 1/x_k) \\ &\qquad \geq K_k(1, \ldots, 1) K_{k+1}(1, \ldots, 1) = F_{k+1} F_{k+2} \geq (\phi+1)^{k+1}/5, \end{aligned} %}

    using (6), (7) and with {% imath \phi = (1+\sqrt{5})/2 \sim 1.618 %}.
*   Since the error term goes to zero as {% imath n \rightarrow \infty %}, infinite continued fractions make sense as the following limit,

    {% dmath a_0 + /\!/ a_1, a_2, \ldots /\!/ = a_0 + \lim_{k\rightarrow\infty} /\!/ a_1, a_2, \ldots, a_k /\!/. %}

The bound for {% imath F_{k+1} F_{k+2} %} in (13) can be derived by using the formula for the {% imath k %}th Fibonacci number, {% imath F_k = (\phi^k - (1-\phi)^k)/\sqrt{5} %},

{% dmath \begin{aligned} F_{k+1} F_{k+2} &= \left( \phi^{2k+3} + (1-\phi)^{2k+3} - (\phi(1-\phi))^{k+1} \right)/5 \\ &= \left( \phi^{2k+3} + (1-\phi)(\phi-1)^{2k+2} + (-1)^k \right)/5 \\ &\geq \phi^{2k+2} \left(\phi - \frac{1}{\phi^{2k+1}} \right)/5 \geq \left(\phi^2\right)^{k+1}/5 = (\phi+1)^{n+1}/5, \end{aligned} %}

where we use that {% imath \phi^2-\phi-1=0 %}, {% imath \phi(1-\phi)=-1 %}, and {% imath 1 < \phi < 2 %}.

As an example of an infinite continued fraction it can be shown that

{% dmath e = 2 + /\!/ 1,2,1,1,4,1,1,6,1,1,8,1,1,10,1,1,12,1,1,14,\ldots /\!/. %}

Evaluating the truncated finite continued fractions {% imath 2 %}, {% imath 2 + /\!/ 1 /\!/ %}, {% imath 2 + /\!/ 1,2 /\!/ %}, and so on, we get

{% dmath 2,3,\frac{8}{3}, \frac{11}{4}, \frac{19}{7}, \frac{87}{32}, \frac{106}{39}, \frac{193}{71}, \frac{1264}{465}, \frac{1457}{536}, \frac{2721}{1001}, \frac{23225}{8544}, \frac{25946}{9545}, \frac{49171}{18089}, \ldots, %}

where each fraction is a better and better approximation to {% imath e %} (the absolute error for {% imath 49171/18089 %} is around {% imath -3 \cdot 10^{-10} %}).

As mentioned earlier, the continued fraction of some {% imath x %} is finite if and only if {% imath x %} is rational. The continued fraction representation for {% imath x %} is infinite and *eventually periodic*,

{% dmath a_0 + /\!/ a_1, \ldots, a_m, b_1, \ldots, b_n, b_1, \ldots, b_n, \ldots /\!/, \quad m \geq 0, n \geq 1, %}

if and only if {% imath x %} is a [quadratic irrationality](http://en.wikipedia.org/wiki/Quadratic_irrational) (proved in [TAOCP](http://www-cs-faculty.stanford.edu/~uno/taocp.html), vol.&nbsp;2, Exercise&nbsp;4.5.3-12). A quadratic irrationality is a number of the form {% imath (\sqrt{d}-u)/v %} where {% imath d %}, {% imath u %}, and {% imath v %} are integers, {% imath d > 0 %}, {% imath v \neq 0 %}, and {% imath d %} is not a [perfect square](http://en.wikipedia.org/wiki/Square_number).

Some special cases of this theorem are:

*   {% imath \sqrt{n^2+1} = n + /\!/ 2n,2n,\ldots /\!/ %},
*   {% imath \sqrt{n^2+2} = n + /\!/ n,2n,n,2n,\ldots /\!/ %},

for positive integers {% imath n %}. To prove the first of these identities let {% imath x = n + /\!/ 2n,2n,\ldots /\!/ %}. Then {% imath x-n = y %} where {% imath y = 1/(2n + y) %}, implying {% imath x-n = 1/(x+n) %} and finally {% imath x^2-n^2=1 %}. The second identity can be proved similarly.

### Concluding Remarks

This article on continued fractions was supposed to be fairly short and just contain the most basic properties, but the subject turned out to be vast and very interesting. More articles related to continued fractions will likely follow.

