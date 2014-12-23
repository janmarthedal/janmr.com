---
layout: post
title: Implementing Multiple-Precision Arithmetic, Part 1
author: Jan Marthedal Rasmussen
excerpt: This article is the first in a series dealing with algorithms for multiple-precision
  arithmetic. The goal is to present both a theoretical foundation with high-level
  algorithm descriptions (based on Section 4.3.1, <em>The Classical Algorithms</em>,
  of The Art of Computer Programming, Volume 2, by Donald
  E. Knuth) and a portable C++ implementation of the algorithms. The theory and
  high-level algorithms will be quite universal and generic, whereas the presented
  code will be just one way to implement the algorithms in a specific programming
  language.
date: 2009-07-23 10:58:04.000000000 +02:00
categories:
- programming
tags:
- arithmetic
- algorithms
- C++
- multiple-precision
- numbers project
---
### Introduction

<div style="float:right"><a href="{% amazon taocp2 %}"><img src="{% bookcover taocp2 %}" /></a></div>
This article is the first in a series dealing with algorithms for multiple-precision arithmetic. The goal is to present both a theoretical foundation with high-level algorithm descriptions (based on Section 4.3.1, *The Classical Algorithms*, of [The Art of Computer Programming](http://www-cs-faculty.stanford.edu/~uno/taocp.html), Volume 2, by [Donald E. Knuth](http://www-cs-faculty.stanford.edu/~uno/)) and a portable C++ implementation of the algorithms. The theory and high-level algorithms will be quite universal and generic, whereas the presented code will be just one way to implement the algorithms in a specific programming language.<span></span>

We start out by considering only non-negative integers. A number {% imath u \geq 0 %} will be represented in radix {% imath b \geq 2 %} using the notation

{% dmath u = (u_{n-1} \ldots u_1 u_0)_b = \sum_{i=0}^{n-1} u_i b^i, \quad 0 \leq u_i < b. %}

We will call {% imath u %} an {% imath n %}-digit number and {% imath u_0 %}, {% imath u_1 %}, etc., its digits. Unless stated otherwise we will always have that the most-significant digit is non-zero, here {% imath u_{n-1} \neq 0 %}, and we will represent zero with no digits, {% imath 0 = ()_b %}. We have {% imath b^{n-1} \leq u \leq b^n-1 %}, implying {% imath n=1+\lfloor \log_b u \rfloor %} for {% imath u \geq 1 %}.

Let the word size of the data type <code>T</code> used for each digit be {% imath b_T %}. For instance, if <code>T</code> is a 32 bit unsigned integer, we have {% imath b_T = 2^{32} %}. We will implement the algorithms using {% imath b = b_T %} and exploit the fact that C++ does arithmetic on unsigned integers [modulo](http://en.wikipedia.org/wiki/Modular_arithmetic) {% imath b_T %} (see paragraph 3.9.1 (4) of the [C++ standard](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2914.pdf)). This makes it possible to implement portable algorithms. They will not be optimal with respect to speed, however, and it will be noted when specialized operations, such as add-with-carry instructions, would lead to more efficient implementations.

### Data Structures

A non-negative number will be represented in C++ as an instance of the class <code>NonNegativeInteger</code>:

{% highlight cpp %}
template <typename T, typename V=detail::SimpleDigitVector<T> >
class NonNegativeInteger {
private:
  boost::shared_ptr<V> digitvec;
  // ...
public:
  NonNegativeInteger();
  NonNegativeInteger(T value);
  // ...
};
{% endhighlight %}

The type argument <code>T</code> is used to represent each digit. It must be integer and unsigned, so <code>unsigned char</code>, <code>unsigned short</code>, <code>unsigned int</code>, <code>unsigned long</code>, and <code>unsigned long long</code> can all be used (the type <code>long long int</code> is not standard C++, but is, e.g., [supported](http://gcc.gnu.org/onlinedocs/gcc/Long-Long.html) by [GCC](http://gcc.gnu.org)). If a digit type with 8, 16, 32, or 64 bits is needed, the [boost](http://www.boost.org) [integer types](http://www.boost.org/doc/libs/release/libs/integer/index.html) <code>uint8\_t</code>, <code>uint16\_t</code>, <code>uint32\_t</code>, <code>uint64\_t</code> (from the namespace <code>boost</code>) can be used with portability ensured (<code>uint64\_t</code> is not always available, but the macro <code>BOOST\_NO\_INT64\_T</code> will tell you if it is not).

The type argument <code>V</code> is used as the container type for the digits. The default container is <code>SimpleDigitVector</code> (which at this time is also the only container supported). This default container simply wraps an array of size (at least) the number of digits.

Note that the digit container <code>digitvec</code> of <code>NonNegativeInteger</code> is wrapped in a [boost shared pointer](http://www.boost.org/doc/libs/1_43_0/libs/smart_ptr/shared_ptr.htm). Consider the small code excerpt:

{% highlight cpp %}
NonNegativeInteger<unsigned> a=value1(), b=value2(), c;
c = a;
b += a;
c += b;
{% endhighlight %}
  
Because of the shared pointer, the first assignment, <code>c = a</code>, is very cheap and will not result in copying the digit container. Instead, the <code>digitvec</code> of both <code>a</code> and <code>c</code> will refer to the *same* instance of the digit container (which gets a reference count of 2). This also makes it cheap to pass arguments by value and returning numbers by value. The next statement, <code>b += a</code>, can add <code>a</code> to <code>b</code> *in place* (assuming there is enough space in <code>b</code>'s <code>digitvec</code> to contain the result) because it is possible to check if <code>b</code> is the only instance referring to its digit container. Contrarywise, the last statement, <code>c += a</code>, cannot add <code>a</code> to <code>c</code> in place because <code>a</code> refers to the same container as <code>c</code> does.

### Addition

Adding radix {% imath b %}-numbers is quite straightforward and is easily done using the familiar pencil-and-paper method.

To formalize, we first consider adding two {% imath n %}-digit numbers, {% imath n \geq 1 %}, {% imath u=(u_{n-1} \ldots u_1 u_0)_b %} and {% imath v = (v_{n-1} \ldots v_1 v_0)_b %}, obtaining an {% imath (n+1) %}-digit sum {% imath w=(w_n \ldots w_1 w_0)_b %}. Note that we here may end up with {% imath w_n = 0 %} (in which case {% imath w_{n-1} \neq 0 %}). We have

{% dmath \begin{aligned} w_0 &\leftarrow (u_0 + v_0) \;\mbox{mod}\; b, \\ w_i &\leftarrow (u_i + v_i + k_i) \;\mbox{mod}\; b, \\ w_n &\leftarrow k_n. \end{aligned} \quad \begin{aligned} k_1 &\leftarrow \lfloor (u_0 + v_0)/b \rfloor, \\ k_{i+1} &\leftarrow \lfloor (u_i + v_i + k_i)/b \rfloor, \quad i = 1, \ldots, n-1, \\ \mbox{ } \end{aligned} %}

Note that {% imath \lfloor x/b \rfloor = [x \geq b] %} for {% imath x < 2 b %}, where {% imath [P] %} is equal to {% imath 1 %} if {% imath P %} is true and equal to {% imath 0 %} if {% imath P %} is false. This means {% imath k_i \in \{0,1\} %} and furthermore {% imath u_i + v_i + k_i \leq b-1 + b-1 + 1 = 2 b - 1 %}. Using that {% imath 0 \leq u_i, v_i \leq b-1 %} and {% imath (x \;\mbox{mod}\; b) + \lfloor x/b \rfloor = x %} it is quite easy to show that, in fact, {% imath w = u + v %}.

The cases where {% imath u %} or {% imath v %} is zero makes addition trivial. Similarly, if the number of digits in {% imath u %} and {% imath v %} are different, is it quite easy to adjust the algorithm above.

Let us now look at some implementation details. How do we compute {% imath z = (x + y) \;\mbox{mod}\; b %} and {% imath k = \lfloor (x + y)/b \rfloor %} for {% imath 0 \leq x, y < b %}? We have several options, some of which are

1.  Use {% imath 2 b \leq b_T %}. Then {% imath z %} and {% imath k %} can be computed directly.
2.  Use {% imath b = b_T %} and the CPU's add and add-with-carry instructions.
3.  Use {% imath b = b_T %}, but the computations must be done in some portable C++ way.

Option 1 is actually not an option because we insist on using {% imath b = b_T %}. Option 2 leads to the most efficient code, regarding both space and speed. The problem is that these special instructions are not directly accessible via the C++ standard. Some compilers, though, make it possible to use inline assembly. For instance, [GCC](http://gcc.gnu.org) has such [capabilities](http://gcc.gnu.org/onlinedocs/gcc/Extended-Asm.html).

Option 3 is the way to go. As mentioned earlier, C++ does calculations modulo {% imath b_T %}, so {% imath z \leftarrow (x + y) \;\mbox{mod}\; b %} comes &#8216;for free&#8217; as simply <code>z = x + y</code> in C++. Left is how to detect whether a carry occurs during an addition. One way to do that is the following. Consider {% imath z = (x + y) \;\mbox{mod}\; b %} for which there are two possibilities. Either {% imath z = x + y %} ({% imath k = 0 %}) which implies {% imath z \geq x %} and {% imath z \geq y %}, or we have {% imath z + b = x + y %} ({% imath k = 1 %}) which implies {% imath z = x - (b - y) = y - (b - x) %}, leading to {% imath z < x %} and {% imath z < y %}. So {% imath k = [z < x] = [z < y] %}. Another way to detect whether a carry occurs is to split {% imath x %} and {% imath y %} into a low and high part, and then adding the low and high parts seperately—keeping track of a possible intermediate carry, of course.

### Subtraction

An algorithm for multiple-precision subtraction is similar to addition, as just considered. Again we set {% imath u=(u_{n-1} \ldots u_1 u_0)_b %} and {% imath v = (v_{n-1} \ldots v_1 v_0)_b %} with {% imath n \geq 1 %}. To ensure that the result {% imath w = u - v %} is a non-negative integer we furthermore require that {% imath u \geq v %}. We now have the algorithm:

{% dmath \begin{aligned} w_0 &\leftarrow (u_0 - v_0) \;\mbox{mod}\; b, \\ w_i &\leftarrow (u_i - v_i - k_i) \;\mbox{mod}\; b, \end{aligned} \quad \begin{aligned} k_1 &\leftarrow [u_0 < v_0], \\ k_{i+1} &\leftarrow [u_i < v_i + k_i], \quad i = 1, \ldots, n-1. \end{aligned} %}

Note that <em>any</em> digit of the result may end up being zero—we only know that {% imath 0 \geq w \geq b^n - b^{n-1} - 1 %}. Note furthermore that {% imath k_n = [u < v] = 0 %}. Verification of the algorithm is easily done using the fact that {% imath x - y = ((x-y) \;\mbox{mod}\; b) - b [x < y] %} for {% imath 0 \leq x, y < b %}.

The options when implementing the algorithm is, again, much like for addition. Using the CPU's subtract-with-borrow instruction would be ideal here, but it cannot be done portably in C++. The borrow when calculating {% imath x - y %} can be computed as simply {% imath k \leftarrow [x < y] %}, or, to avoid branching instructions, we can split {% imath x %} and {% imath y %} into two parts and do the subtraction for each part seperately.

### Multiplication

We seek an algorithm to compute {% imath w = u v %} where

{% dmath u = (u_{m-1} \ldots u_1 u_0)_b, \quad v = (v_{n-1} \ldots v_1 v_0)_b, \quad w = (w_{m+n-1} \ldots w_1 w_0)_b. %}

We first, however, consider the simpler operation {% imath z \leftarrow y + \alpha u %} where

{% dmath 0 \leq \alpha < b, \quad y = (y_{m-1} \ldots y_1 y_0)_b, \quad z = (z_m \ldots z_1 z_0)_b. %}

The following algorithm suggests itself:

{% dmath \begin{aligned} z_0 &\leftarrow (y_0 + \alpha u_0) \;\mbox{mod}\; b, \\ z_i &\leftarrow (y_i + \alpha u_i + k_i) \;\mbox{mod}\; b, \\ z_m &\leftarrow k_m. \end{aligned} \quad \begin{aligned} k_1 &\leftarrow \lfloor (y_0 + \alpha u_0)/b \rfloor, \\ k_{i+1} &\leftarrow \lfloor (y_i + \alpha u_i + k_i)/b \rfloor, \quad i = 1, \ldots, m-1, \\ \mbox{ } \end{aligned} %}

If {% imath \alpha = 0 %} then obviously {% imath z_i = 0 %}. If {% imath 1 \leq \alpha \leq b-1 %} then {% imath z_m %} may be zero, in which case {% imath z_ {m-1} \neq 0 %}, since

{% dmath 2 b^{m-1} \leq \; z \; \leq b^m-1 + (b^m-1)(b-1) = b^{m+1} - b < b^{m+1} %}

Note that {% imath k_i < b %} since {% imath y_i + \alpha u_i + k_i \leq b-1 + (b-1)(b-1) + b-1 = b^2 - 1 %}. The algorithm above is easily verified, using that {% imath z_i + b k_{i+1} = y_i + \alpha u_i + k_i %}.

We now turn to {% imath w = u v %} and get

{% dmath w = u v = \sum_{j=0}^{n-1} b^j v_j u. %}

From this we see that we can compute {% imath w %} by doing a number of {% imath (z \leftarrow y + \alpha u) %}-type operations, if we start with {% imath w=0 %} and then do in-place updates for each {% imath j %}. The {% imath b^j %}-factor simply determines the &#8216;digit offset&#8217; on which the updates should be done:

{% dmath \begin{aligned} (w_{m-1} \ldots w_1 w_0)_b &\leftarrow (0 \, \ldots \, 0 \, 0)_b, \\ (w_{m+j} \ldots w_{j+1} w_j)_b &\leftarrow (w_{m+j-1} \ldots w_{j+1} w_j)_b + v_j (u_{m-1} \ldots u_1 u_0)_b, \\ \end{aligned} %}

for {% imath j = 0, 1, \ldots, n-1 %}. Note that {% imath w_{m+n-1} %} may be zero, in which case {% imath w_{m+n-2} \neq 0 %}, since {% imath b^{m+n-2} \leq w < b^{m+n} %}.

Now for some implementation details. We note that the only non-trivial computation is {% imath z \leftarrow y + \alpha x + k %}, where {% imath 0 \leq \alpha, k, x, y < b %}, followed by computing {% imath z \;\mbox{mod}\; b %} and {% imath \lfloor z/b \rfloor %}. Most CPUs have instructions that can multiply two word-size numbers and produce a double-word answer. As was the case for addition and subtraction, we don't have access to these instructions from standard C++. We have {% imath 0 \leq z < b^2 %} but every multiplication result in our portable C++ implementation must be smaller than {% imath b %}. We can do this by using a new base number {% imath h %} where {% imath h^2 = b %} (we assume that {% imath b %} is chosen appropriately so {% imath h %} is integer) and setting

{% dmath z = (z_3 z_2 z_1 z_0)_h, \quad y = (y_1 y_0)_h, \quad \alpha = (\alpha_1 \alpha_0)_h, \quad x = (x_1 x_0)_h, \quad k = (k_1 k_0)_h. %}

We can now use the multiplication algorithm above on a &#8216;smaller scale&#8217; to compute the product {% imath \alpha x %}. We can furthermore expand the methods slightly and incorporate the addition of {% imath y %} and {% imath k %} in an elegant way:

{% dmath \begin{aligned} (z_1 z_0)_h &\leftarrow (y_1 y_0)_h, \\ c &\leftarrow k_0, \\ t &\leftarrow z_0 + \alpha_0 x_0 + c, \quad z_0 \leftarrow t \;\mbox{mod}\; b, \quad c \leftarrow \lfloor t/b \rfloor, \\ t &\leftarrow z_1 + \alpha_0 x_1 + c, \quad z_1 \leftarrow t \;\mbox{mod}\; b, \quad c \leftarrow \lfloor t/b \rfloor, \\ z_2 &\leftarrow c, \\ c &\leftarrow k_1, \\ t &\leftarrow z_1 + \alpha_1 x_0 + c, \quad z_1 \leftarrow t \;\mbox{mod}\; b, \quad c \leftarrow \lfloor t/b \rfloor, \\ t &\leftarrow z_2 + \alpha_1 x_1 + c, \quad z_2 \leftarrow t \;\mbox{mod}\; b, \quad c \leftarrow \lfloor t/b \rfloor, \\ z_3 &\leftarrow c. \end{aligned} %}

We now have {% imath z \;\mbox{mod}\; b = (z_1 z_0)_h %} and {% imath \lfloor z/b \rfloor = (z_3 z_2)_h %}.

### Concluding Remarks

We have now covered addition, subtraction, and multiplication of non-negative integers of arbitrary magnitude. Left is how to do division, which will be the subject of the [next article](/2009/08/implementing-multiple-precision-arithmetic-part-2.html).

*Update 2010-07-03: The code has undergone some changes since this article was written. See the [project page](https://github.com/janmarthedal/kanooth-numbers) for more information.*
