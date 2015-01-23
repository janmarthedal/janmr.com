---
layout: post
title: Bitwise Operators and Negative Numbers
author: Jan Marthedal Rasmussen
date: 2010-07-24 19:55:05.000000000 +02:00
excerpt: ! "When representing integers using a fixed number of bits, negative
  numbers are typically represented using two's complement. If using n bit
  numbers, the two's complement of a number x with 0 <= x < 2^n is
  (-x) mod 2^n = 2^n - x. But what do you do if you want to work with
  unbounded/multiple-precision integers? [...]"
categories:
- mathematics
tags:
- multiple-precision
- numbers project
- bitwise operators
- number representation
---
When representing integers using a fixed number of bits, negative numbers are typically represented using [two's complement](http://en.wikipedia.org/wiki/Two's_complement). If using {% imath n %} bit numbers, the two's complement of a number {% imath x %} with {% imath 0 \leq x < 2^n %} is {% imath (-x) \mathbin{\text{mod}} 2^n = 2^n - x %}. But what do you do if you want to work with unbounded/multiple-precision integers? Fixing {% imath x %} and letting the number of bits go to infinity, you will notice that increasing {% imath n %} by one simply adds a 1 at the left. For instance,

*   {% imath 1975 = (11110110111)_2 %}
*   {% imath -1975 = 2^{12} - 1975 = (100001001001)_2 %} &nbsp;&nbsp; (with {% imath n=12 %})
*   {% imath -1975 = 2^{13} - 1975 = (1100001001001)_2 %} &nbsp;&nbsp; (with {% imath n=13 %})
*   {% imath -1975 = 2^{20} - 1975 = (11111111100001001001)_2 %} &nbsp;&nbsp; (with {% imath n=20 %})
*   {% imath -1975 = (\ldots 1111111111111100001001001)_2 %} &nbsp;&nbsp; (with {% imath n=\infty %})

(This can be made more rigorous using [2-adic numbers](http://en.wikipedia.org/wiki/P-adic)). Conversely, every binary number with infinitely many 1s to the left corresponds to a negative integer.

Notice the important special case {% imath -1 = (\ldots 1111)_2 %}. If {% imath \overline{x} %} denotes *bitwise not* of {% imath x %}, where each bit is flipped from {% imath 0 %} to {% imath 1 %} and vice versa, we observe that

{% dmath x + \overline{x} = \ldots 1111 = -1, %}

from which we have the important identity

{% dmath \overline{x} = -1 - x. %}

This makes bitwise not equivalent to a simple subtraction. Notice how bitwise not turns a non-negative integer into a negative integer and vice versa.

Let us turn to general bitwise operators. Consider a function that maps two bits to a single bit. Given such a function and two non-negative integers, we can apply the function to the zeroth bit of both numbers to obtain the zeroth bit of the result, then apply the function to the first bit of both numbers to obtain the first bit of the result, and so forth. In this way, any binary bit-operator {% imath \{0,1\}^2 \mapsto \{0,1\} %} can be extended to work on any non-negative integer (and as we shall see, any integer). There are 16 possible binary bit-operators:

<table class="table table-striped table-bordered">
<colgroup span="1"></colgroup>
<colgroup span="1"></colgroup>
<colgroup span="4"></colgroup>
<thead>
<tr>
<td></td>
<td>{% imath x %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 1 %}</td>
</tr>
<tr>
<td></td>
<td>{% imath y %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 1 %}</td>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>{% imath 0 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 0 %}</td>
</tr>
<tr>
<td>1</td>
<td>{% imath x \mathbin{\&} y %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 1 %}</td>
</tr>
<tr>
<td>2</td>
<td>{% imath \overline{x} \mathbin{\&} y %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 0 %}</td>
</tr>
<tr>
<td>3</td>
<td>{% imath y %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 1 %}</td>
</tr>
<tr>
<td>4</td>
<td>{% imath x \mathbin{\&} \overline{y} %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 0 %}</td>
</tr>
<tr>
<td>5</td>
<td>{% imath x %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 1 %}</td>
</tr>
<tr>
<td>6</td>
<td>{% imath x \oplus y %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 0 %}</td>
</tr>
<tr>
<td>7</td>
<td>{% imath x \mathbin{|} y %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 1 %}</td>
</tr>
</tbody>
<tbody>
<tr>
<td>8</td>
<td>{% imath \overline{x \mathbin{|} y} %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 0 %}</td>
</tr>
<tr>
<td>9</td>
<td>{% imath \overline{x \oplus y} %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 1 %}</td>
</tr>
<tr>
<td>10</td>
<td>{% imath \overline{x} %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 0 %}</td>
</tr>
<tr>
<td>11</td>
<td>{% imath \overline{x} \mathbin{|} y %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 1 %}</td>
</tr>
<tr>
<td>12</td>
<td>{% imath \overline{y} %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 0 %}</td>
</tr>
<tr>
<td>13</td>
<td>{% imath x \mathbin{|} \overline{y} %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 0 %}</td>
<td>{% imath 1 %}</td>
</tr>
<tr>
<td>14</td>
<td>{% imath \overline{x \mathbin{\&} y} %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 0 %}</td>
</tr>
<tr>
<td>15</td>
<td>{% imath 1 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 1 %}</td>
<td>{% imath 1 %}</td>
</tr>
</tbody>
</table>

The first column of the table enumerates the functions from 0 to 15 (such that the binary representation of each number corresponds to the outputs). We see that exactly the functions 0&ndash;7 map {% imath (0,0) %} to {% imath 0 %}, meaning that only these functions will map two non-negative integers to a non-negative integer.

The second column shows expressions for the functions using the well-known operators *bitwise and*, {% imath x \mathbin{\&} y %}, *bitwise or (inclusive or)*, {% imath x \mathbin{|} y %}, *bitwise xor (exclusive or)*, {% imath x \oplus y %}, and *bitwise not*, {% imath \overline{x} %}. The table simultaneously define these operators.

We can now formulate the goal of this article: Using only the bitwise operators that map non-negative integers to non-negative integers, together with usual integer arithmetic, how can we implement all 16 functions? The approach is quite simple: Use *bitwise not* to transform any negative integer into a non-negative integer, apply one of the functions 0&ndash;7, and then possibly apply *bitwise not* again to obtain the result.

Before proceeding, we need some fundamental identities. First, symmetry:

{% dmath x \mathbin{\&} y = y \mathbin{\&} x, \quad x \mathbin{|} y = y \mathbin{|} x, \quad x \oplus y = y \oplus x. %}

Then, [De Morgan's laws](http://en.wikipedia.org/wiki/De_Morgan's_laws):

{% dmath \overline{x \mathbin{\&} y} = \overline{x} \mathbin{|} \overline{y}, \quad \overline{x \mathbin{|} y} = \overline{x} \mathbin{\&} \overline{y}. %}

Finally some useful rules for exlusive or:

{% dmath x \oplus y = \overline{x} \oplus \overline{y}, \quad \overline{x \oplus y} = \overline{x} \oplus y = x \oplus \overline{y}. %}

All of these are easily proved since they (by definition) operate *bitwise*. This means that you only have to consider one-bit numbers, which means only four different cases to check.

The only non-trivial operators among the functions 0&ndash;7 are {% imath x \mathbin{\&} y %}, {% imath x \mathbin{|} y %}, {% imath x \oplus y %}, and {% imath x \mathbin{\&} \overline{y} %}. We will use the notation {% imath x \mathbin{\overline{\&}} y = x \mathbin{\&} \overline{y} %}. Note how {% imath \mathbin{\overline{\&}} %} is *not* symmetric. The only non-trivial operators among the functions 8&ndash;15 are {% imath \overline{x \mathbin{\&} y} %}, {% imath \overline{x \mathbin{|} y} %}, {% imath x \mathbin{|} \overline{y} %}, and {% imath \overline{x \oplus y} %}. Considering these eight cases, along with whether {% imath x %} and {% imath y %} are negative or not, we get the following table:

<table class="table table-striped table-bordered">
<tr>
<td></td>
<td>{% imath x \geq 0 %}, {% imath y \geq 0 %}</td>
<td>{% imath x \geq 0 %}, {% imath y < 0 %}</td>
<td>{% imath x < 0 %}, {% imath y \geq 0 %}</td>
<td>{% imath x < 0 %}, {% imath y < 0 %}</td>
</tr>
<tr>
<td>{% imath x \mathbin{\&} y %}</td>
<td>{% imath x \mathbin{\&} y %}</td>
<td>{% imath x \mathbin{\overline{\&}} \overline{y} %}</td>
<td>{% imath y \mathbin{\overline{\&}} \overline{x} %}</td>
<td>{% imath \overline{\overline{x} \mathbin{|} \overline{y}} %}</td>
</tr>
<tr>
<td>{% imath x \mathbin{|} y %}</td>
<td>{% imath x \mathbin{|} y %}</td>
<td>{% imath \overline{\overline{y} \mathbin{\overline{\&}} x} %}</td>
<td>{% imath \overline{\overline{x} \mathbin{\overline{\&}} y} %}</td>
<td>{% imath \overline{\overline{x} \mathbin{\&} \overline{y}} %}</td>
</tr>
<tr>
<td>{% imath x \mathbin{\overline{\&}} y %}</td>
<td>{% imath x \mathbin{\overline{\&}} y %}</td>
<td>{% imath x \mathbin{\&} \overline{y} %}</td>
<td>{% imath \overline{\overline{x} \mathbin{|} y} %}</td>
<td>{% imath \overline{y} \mathbin{\overline{\&}} \overline{x} %}</td>
</tr>
<tr>
<td>{% imath x \oplus y %}</td>
<td>{% imath x \oplus y %}</td>
<td>{% imath \overline{x \oplus \overline{y}} %}</td>
<td>{% imath \overline{\overline{x} \oplus y} %}</td>
<td>{% imath \overline{x} \oplus \overline{y} %}</td>
</tr>
<tr>
<td>{% imath \overline{x \mathbin{\&} y} %}</td>
<td>{% imath \overline{x \mathbin{\&} y} %}</td>
<td>{% imath \overline{x \mathbin{\overline{\&}} \overline{y}} %}</td>
<td>{% imath \overline{y \mathbin{\overline{\&}} \overline{x}} %}</td>
<td>{% imath \overline{x} \mathbin{|} \overline{y} %}</td>
</tr>
<tr>
<td>{% imath \overline{x \mathbin{|} y} %}</td>
<td>{% imath \overline{x \mathbin{|} y} %}</td>
<td>{% imath \overline{y} \mathbin{\overline{\&}} x %}</td>
<td>{% imath \overline{x} \mathbin{\overline{\&}} y %}</td>
<td>{% imath \overline{x} \mathbin{\&} \overline{y} %}</td>
</tr>
<tr>
<td>{% imath x \mathbin{|} \overline{y} %}</td>
<td>{% imath \overline{y \mathbin{\overline{\&}} x} %}</td>
<td>{% imath x \mathbin{|} \overline{y} %}</td>
<td>{% imath \overline{\overline{x} \mathbin{\&} y} %}</td>
<td>{% imath \overline{\overline{x} \mathbin{\overline{\&}} \overline{y}} %}</td>
</tr>
<tr>
<td>{% imath \overline{x \oplus y} %}</td>
<td>{% imath \overline{x \oplus y} %}</td>
<td>{% imath x \oplus \overline{y} %}</td>
<td>{% imath \overline{x} \oplus y %}</td>
<td>{% imath \overline{\overline{x} \oplus \overline{y}} %}</td>
</tr>
</table>

Here, we have used only the identities shown earlier. Of course, we need to convert each bitwise not into a subtraction to complete the task. For instance, with {% imath x < 0 %}, {% imath y \geq 0 %} we have

{% dmath x \mathbin{|} \overline{y} = \overline{\overline{x} \mathbin{\&} y} = -1 - ((-1 - x) \mathbin{\&} y). %}

This way, the bitwise and-operation is being applied to non-negative numbers and we see that the result is always negative.

We can now, with assistance from the table above, apply any of the 16 binary bitwise operators to *any* pair of integers, without restricting ourselves to working with a fixed number of bits.

<div style="float:right"><a href="{% amazon hackers-delight %}"><img src="{% bookcover hackers-delight %}"></a></div>
<div style="float:right"><a href="{% amazon taocp4f1 %}"><img src="{% bookcover taocp4f1 %}"></a></div>
For further reading related to the binary representation of numbers, I recommend [The Art of Computer Programming, Volume 4, Fascicle 1: Bitwise Tricks &amp; Techniques and Binary Decision Diagrams]({% amazon taocp4f1 %}) by [Donald E. Knuth](http://www-cs-faculty.stanford.edu/~knuth/) and [Hacker's Delight]({% amazon hackers-delight %}) by Henry S. Warren, Jr.

