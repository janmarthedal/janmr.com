---
layout: post
title: Useful Properties of the Floor and Ceil Functions
author: Jan Marthedal Rasmussen
excerpt: ! "This articles explores some basic properties of the integer functions
  commonly known as floor and ceil. Most of the statements may seem trivial or obvious,
  but I, for one, have a tendency to forget just how exact you can be when it comes
  to expressions/equations where floor or ceil functions appear."
date: 2009-09-09 14:36:13.000000000 +02:00
categories:
- mathematics
tags:
- floor
- ceil
- discrete-continuous
---
This articles explores some basic properties of the integer functions commonly known as floor and ceil. Most of the statements may seem trivial or obvious, but I, for one, have a tendency to forget just how exact you can be when it comes to expressions/equations where floor or ceil functions appear.

First, the definitions:

*   {% imath \lfloor x \rfloor = \max \{ n \in \mathbb{Z} \mid n \leq x \} %} = the greatest integer less than or equal to {% imath x %},
*   {% imath \lceil  x \rceil  = \min \{ n \in \mathbb{Z} \mid n \geq x \} %} = the least integer greater than or equal to {% imath x %},

for every real number {% imath x %}.

### Equality

What can we say about {% imath x %} and {% imath n %} if {% imath n=\lfloor x \rfloor %} or {% imath n=\lceil x \rceil %}? First of all, we obviously have {% imath n = x %} if and only if {% imath x %} is an integer. Let us now consider the floor function {% imath \lfloor \cdot \rfloor %}. With {% imath x %} some real number we have {% imath \lfloor x \rfloor \leq x %}, easily seen from the definition. Now let {% imath n=\lfloor x \rfloor %} and assume {% imath x-1 \geq n %} which is equivalent to {% imath n+1 \leq x %}. But then {% imath n %} cannot be the greatest integer less than or equal to {% imath x %} so we have a contradiction. Since {% imath x %} was chosen arbitrarily we have {% imath x-1 < \lfloor x \rfloor %} for all {% imath x %}. Similar considerations can be made for the ceil function {% imath \lceil \cdot \rceil %} and we get the important inequalities:

{% dmath x-1 \;<\; \lfloor x \rfloor \;\leq\; x \;\leq\; \lceil x \rceil \;<\; x+1. %}

At the same time, we have the right-going implications of the following statements ({% imath x %} is a real number and {% imath n %} an integer):

{% dmath \begin{aligned} n=\lfloor x \rfloor \quad &\Longleftrightarrow \quad n \leq x < n+1, \\ n=\lfloor x \rfloor \quad &\Longleftrightarrow \quad x-1 < n \leq x, \\ n=\lceil x \rceil   \quad &\Longleftrightarrow \quad n-1 < x \leq n, \\ n=\lceil x \rceil   \quad &\Longleftrightarrow \quad x \leq n < x+1. \\ \end{aligned} %}

Let us show the fourth left-going implication. Assume {% imath x \leq n < x+1 %} and set {% imath k=\lceil x \rceil %}. We then have {% imath x \leq k < x+1 %} from which we get {% imath n < x+1 \leq k+1 %} and {% imath k < x+1 \leq n+1 %}, so {% imath n=k=\lceil x \rceil %}. The remaining three left-going implication can be proved in much the same way.

From the statements above we can show some useful equalities:

{% dmath n=\lfloor -x \rfloor \;\Leftrightarrow\; -x-1 < n \leq -x \;\Leftrightarrow\; x \leq -n < x+1 \;\Leftrightarrow\; -n=\lceil x \rceil, %}

so {% imath \lfloor -x \rfloor = -\lceil x \rceil %} for all {% imath x %}, and

{% dmath \lfloor x \rfloor \leq x < \lfloor x \rfloor+1 \;\Leftrightarrow\; \lfloor x \rfloor + k \leq x+k < \lfloor x \rfloor + k+1 \;\Leftrightarrow\; \lfloor x \rfloor + k = \lfloor x+k \rfloor, %}

so {% imath \lfloor x \rfloor + k = \lfloor x+k \rfloor %} for all integer {% imath k %}. Naturally, the similar {% imath \lceil x \rceil + k = \lceil x+k \rceil %} also holds.

### Inequalities

We now consider what can be said when inequalities are involved. Let {% imath x %} be some real number and {% imath n %} an integer. We then have the following:

{% dmath \begin{aligned} x < n    \quad &\Longleftrightarrow \quad \lfloor x \rfloor < n, \\ n < x    \quad &\Longleftrightarrow \quad n < \lceil x \rceil, \\ x \leq n \quad &\Longleftrightarrow \quad \lceil x \rceil \leq n, \\ n \leq x \quad &\Longleftrightarrow \quad n \leq \lfloor x \rfloor. \end{aligned} %}

All we need to show these are {% imath \lfloor x \rfloor \leq x < \lfloor x \rfloor + 1 %} and {% imath \lceil x \rceil - 1 < x \leq \lceil x \rceil %} from the previous section, and the fact that {% imath n < m+1 %} is equivalent to {% imath n \leq m %} when {% imath m %} and {% imath n %} are integers. Consider, for instance, the third statement from above. If {% imath x \leq n %} then we have {% imath \lceil x \rceil - 1 < x \leq n %}, which implies {% imath \lceil x \rceil \leq n %}. On the other hand, if {% imath \lceil x \rceil \leq n %} then {% imath x \leq n %} because {% imath x \leq \lceil x \rceil %}. The remaining statements are shown in a similar manner.

### Some Increasing Functions

Certain functions have special properties when used together with floor and ceil. Such a function
{% imath f: \mathbb{R} \rightarrow \mathbb{R} %} must be continuous and monotonically increasing and whenever {% imath f(x) %} is integer we must have that {% imath x %} is integer. An example could be {% imath f(x) = \sqrt{x} %}. Note that being continuous and monotonically increasing ensures a well-defined inverse {% imath f^{-1} %}. One of the requirements can then be formulated as
{% imath f^{-1}(y) %} must be integer for all integer {% imath y %}.

Using the results of the previous sections we get

{% dmath \begin{aligned} k = \lfloor f( \lfloor x \rfloor ) \rfloor \quad &\Leftrightarrow \quad k \leq f(\lfloor x \rfloor) < k+1 \quad \Leftrightarrow \quad f^{-1}(k) \leq \lfloor x \rfloor < f^{-1}(k+1) \\ &\Leftrightarrow \quad f^{-1}(k) \leq x < f^{-1}(k+1) \quad \Leftrightarrow \quad k \leq f(x) < k+1 \\ &\Leftrightarrow \quad \lfloor f(x) \rfloor = k. \end{aligned} %}

Similar derivations can be shown for {% imath \lceil \cdot \rceil %} and we have

{% dmath \lfloor f(x) \rfloor = \lfloor f(\lfloor x \rfloor) \rfloor \quad \text{and} \quad \lceil f(x) \rceil = \lceil f(\lceil x \rceil) \rceil, %}

for this class of functions. For {% imath f(x) = \sqrt{x} %} we thus have

{% dmath \left\lfloor \sqrt{x} \right\rfloor = \left\lfloor \sqrt{\lfloor x \rfloor} \right\rfloor \quad \text{and} \quad \left\lceil \sqrt{x} \right\rceil = \left\lceil \sqrt{\lceil x \rceil} \right\rceil. %}

### Fractions

The result of the previous section also applies to {% imath f(x) = (x + n)/m %} for integer {% imath m, n %} and {% imath m > 0 %}. The positivity of {% imath m %} ensures that {% imath f %} is monotonically increasing and {% imath f^{-1}(y) = m y - n %} is clearly integer for integer {% imath y %}. We now have

{% dmath \left\lfloor \frac{x+n}{m} \right\rfloor = \left\lfloor \frac{\lfloor x \rfloor+n}{m} \right\rfloor \quad \text{and} \quad \left\lceil \frac{x+n}{m} \right\rceil = \left\lceil \frac{\lceil x \rceil+n}{m} \right\rceil. %}

From these equalities we have the special cases

{% dmath \begin{aligned} \left\lfloor \ldots \left\lfloor \lfloor x/a_1 \rfloor /a_2 \right\rfloor \ldots /a_k \right\rfloor &= \left\lfloor \frac{x}{a_1 a_2 \cdots a_k} \right\rfloor \text{ and} \\ \left\lceil \ldots \left\lceil \lceil x/a_1 \rceil /a_2 \right\rceil \ldots /a_k \right\rceil &= \left\lceil \frac{x}{a_1 a_2 \cdots a_k} \right\rceil, \end{aligned} %}

for integer and positive {% imath a_j %}.

Let us now consider {% imath q = \lfloor n/m \rfloor %} for integer {% imath m, n %} and {% imath m > 0 %}. We get

{% dmath \begin{aligned} q=\left\lfloor \frac{n}{m} \right\rfloor \;&\Leftrightarrow\; \frac{n}{m}-1 < q \leq \frac{n}{m} \;\Leftrightarrow\; n-m < q m \leq n \;\Leftrightarrow\; q m \leq n < (q+1) m \\ &\Leftrightarrow\; q m \leq n \leq (q+1) m - 1, \end{aligned} %}

which provides an interval of integers for the numerator {% imath n %}. Similarly for the ceil function,

{% dmath \begin{aligned} q=\left\lceil \frac{n}{m} \right\rceil \;&\Leftrightarrow\; \frac{n}{m} \leq q < \frac{n}{m}+1 \;\Leftrightarrow\; n \leq q m < n+m \;\Leftrightarrow\; (q-1) m < n \leq q m \\ &\Leftrightarrow\; (q-1) m+1 \leq n \leq q m. \end{aligned} %}

When applying floor or ceil to rational numbers, one can be derived from the other. Since {% imath (q-1) m+1 \leq n \leq q m %} can be rewritten as {% imath q m \leq n+m-1 \leq (q+1) m - 1 %} we get

{% dmath \left\lceil \frac{n}{m} \right\rceil = \left\lfloor \frac{n+m-1}{m} \right\rfloor, %}

and similarly

{% dmath \left\lfloor \frac{n}{m} \right\rfloor = \left\lceil \frac{n-m+1}{m} \right\rceil. %}

### Logarithms

Let {% imath \log_b x %} be the logarithm of {% imath x %}, base {% imath b %} ({% imath x \geq 1 %}, {% imath b > 0 %}, {% imath b \neq 1 %}). We first set {% imath f(x) = \log_b x %} for integer {% imath b %}, base {% imath 2 %} or {% imath 10 %} being the most common. Again, we can apply the theorem from earlier; {% imath f %} is continuous and monotonically increasing and {% imath f^{-1}(y) = b^y %} is integer for integer {% imath y \geq 0 %}, so we have

{% dmath \left\lfloor \log_b x \right\rfloor = \left\lfloor \log_b \lfloor x \rfloor \right\rfloor \quad \text{and} \quad \left\lceil \log_b x \right\rceil = \left\lceil \log_b \lceil x \rceil \right\rceil, %}

for integer {% imath b \geq 2 %} and {% imath x \geq 1 %}.

We conclude with some straightforward, but quite useful, statements:

{% dmath k = \lfloor \log_b x \rfloor \;\Leftrightarrow\; k \leq \log_b x < k+1 \;\Leftrightarrow\; b^k \leq x < b^{k+1} %}

and

{% dmath k = \lceil \log_b x \rceil \;\Leftrightarrow\; k-1 < \log_b x \leq k \;\Leftrightarrow\; b^{k-1} < x \leq b^k, %}

for integer {% imath k %} and all {% imath b > 0 %}, {% imath b \neq 1 %}.

### References

<div style="float:right"><a href="{% amazon concrete %}"><img src="{% bookcover concrete %}" alt=""></a></div>
<div style="float:right"><a href="{% amazon taocp1 %}"><img src="{% bookcover taocp1 %}" alt=""></a></div>
Most of the material presented in this article can be found in some form in [Concrete Mathematics](http://www-cs-faculty.stanford.edu/~uno/gkp.html) by [R. L. Graham](http://math.ucsd.edu/~fan/ron/), [D. E. Knuth](http://www-cs-faculty.stanford.edu/~uno/), and [O. Patashnik](http://en.wikipedia.org/wiki/Oren_Patashnik), and in [The Art of Computer Programming](http://www-cs-faculty.stanford.edu/~uno/taocp.html), Volume&nbsp;1, by [Donald E. Knuth](http://www-cs-faculty.stanford.edu/~uno/).

The [Wikipedia](http://www.wikipedia.org) page [Floor and ceiling functions](http://en.wikipedia.org/wiki/Floor_and_ceiling_functions) furthermore lists a lot of properties (very few proofs or derivations, though).
