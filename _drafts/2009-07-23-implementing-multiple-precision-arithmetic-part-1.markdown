---
layout: post
status: publish
published: true
title: Implementing Multiple-Precision Arithmetic, Part 1
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: This article is the first in a series dealing with algorithms for multiple-precision
  arithmetic. The goal is to present both a theoretical foundation with high-level
  algorithm descriptions (based on Section 4.3.1, <em>The Classical Algorithms</em>,
  of <a href="http://www-cs-faculty.stanford.edu/~knuth/taocp.html">The Art of Computer
  Programming</a>, Volume 2, by <a href="http://www-cs-faculty.stanford.edu/~knuth/">Donald
  E. Knuth</a>) and a portable C++ implementation of the algorithms. The theory and
  high-level algorithms will be quite universal and generic, whereas the presented
  code will be just one way to implement the algorithms in a specific programming
  language.
wordpress_id: 495
wordpress_url: http://sputsoft.com/?p=495
date: 2009-07-23 10:58:04.000000000 +02:00
categories:
- programming
tags:
- arithmetic
- algorithms
- C++
- multiple-precision
- numbers project
comments:
- id: 455
  author: Zzz
  author_email: mailbox11100@yahoo.com
  author_url: ''
  date: !binary |-
    MjAwOS0wNy0yMyAxNzoxNDoyOCArMDIwMA==
  date_gmt: !binary |-
    MjAwOS0wNy0yMyAxNjoxNDoyOCArMDIwMA==
  content: Sorry if I sound stupid, but doesn't the restriction B=BT mean that only
    radices that are powers of 2 can be used?
- id: 456
  author: Andrew Binstock
  author_email: noreply@example.com
  author_url: http://binstock.blogspot.com
  date: !binary |-
    MjAwOS0wNy0yMyAxOTo1MjoxMCArMDIwMA==
  date_gmt: !binary |-
    MjAwOS0wNy0yMyAxODo1MjoxMCArMDIwMA==
  content: Hanson's 1997 book, C Interfaces and Implementions, presents a complete
    implementation in C with detailed explanations. You might find that useful.
- id: 458
  author: Jan Marthedal Rasmussen
  author_email: jmr@kanooth.com
  author_url: http://kanooth.com/blog/
  date: !binary |-
    MjAwOS0wNy0yNCAwOTo0OTozNSArMDIwMA==
  date_gmt: !binary |-
    MjAwOS0wNy0yNCAwNzo0OTozNSArMDIwMA==
  content: ! "@Zzz: The radix <em>b<&#47;em> can be any integer larger than 1 for
    the high-level algorithms to work (except for the final word to double-word multiplication
    algorithm, which requires <em>b<&#47;em> to be a square number).\r\nFor the implementation,
    however, <em>b=bT<&#47;em> is chosen for two main reasons:\r\n* The C++ digit
    array needed to represent a given number is the smallest possible.\r\n* The implementation
    can exploit the fact that C++ computes modulo <em>bT<&#47;em> when using unsigned
    integers.\r\n\r\nOf course, having <em>bT<&#47;em>=2^(2^N) on most (all?) computers
    make many things easier, e.g., <em>bT<&#47;em> is always a square number and bit
    shifting can often be used for some fast multiplication and division."
- id: 519
  author: Tiago Nobrega
  author_email: tigarmo@gmail.com
  author_url: ''
  date: !binary |-
    MjAwOS0wOC0zMSAxNTozMToyNiArMDIwMA==
  date_gmt: !binary |-
    MjAwOS0wOC0zMSAxNDozMToyNiArMDIwMA==
  content: ! "Hi,\r\n\r\nYour link to Knuth's homepage is broken - missing the tilde.
    \r\n\r\nKind Regards,\r\n\r\nTiago"
- id: 520
  author: Jan Marthedal Rasmussen
  author_email: jmr@kanooth.com
  author_url: http://kanooth.com
  date: !binary |-
    MjAwOS0wOC0zMSAxNzoxMzozOSArMDIwMA==
  date_gmt: !binary |-
    MjAwOS0wOC0zMSAxNToxMzozOSArMDIwMA==
  content: ! '@Tiago Nobrega: Thanks, it should be corrected now.'
- id: 538
  author: Implementing Multiple-Precision Arithmetic, Part 2 | Kanooth
  author_email: ''
  author_url: http://kanooth.com/blog/2009/08/implementing-multiple-precision-arithmetic-part-2.html
  date: !binary |-
    MjAwOS0wOS0wOSAxNDo0MDo1MiArMDIwMA==
  date_gmt: !binary |-
    MjAwOS0wOS0wOSAxMjo0MDo1MiArMDIwMA==
  content: ! '[...] and the previous article have now covered addition, subtraction,
    multiplication, and division of non-negative [...]'
- id: 2151
  author: Implementing Multiple-Precision Arithmetic, Part 2 | Kanooth
  author_email: ''
  author_url: http://kanooth.com/blog/2009/08/implementing-multiple-precision-arithmetic-part-2.html
  date: !binary |-
    MjAxMC0wNy0yMCAxNDowNjoxNiArMDIwMA==
  date_gmt: !binary |-
    MjAxMC0wNy0yMCAxMjowNjoxNiArMDIwMA==
  content: ! '[...] article is a follow-up to part 1 where multiple-precision addition,
    subtraction, and multiplication for non-negative integers was [...]'
- id: 2290
  author: Computing the Integer Binary Logarithm | Kanooth
  author_email: ''
  author_url: http://kanooth.com/blog/2010/09/computing-the-integer-binary-logarithm.html
  date: !binary |-
    MjAxMS0wMS0wOSAxNTo0NzoyNSArMDEwMA==
  date_gmt: !binary |-
    MjAxMS0wMS0wOSAxNDo0NzoyNSArMDEwMA==
  content: ! '[...] address multiple-precision numbers first. Assume that a positive
    integer n is represented as in a previous post [...]'
- id: 2294
  author: Evaluation of Powers | Kanooth
  author_email: ''
  author_url: http://kanooth.com/blog/2011/01/evaluation-of-powers.html
  date: !binary |-
    MjAxMS0wMS0zMCAxNjowNDowNiArMDEwMA==
  date_gmt: !binary |-
    MjAxMS0wMS0zMCAxNTowNDowNiArMDEwMA==
  content: ! '[...] multiplication? For instance, the basic multiple-precision multiplication
    algorithm described in an earlier post has a cost propertional to (m times n)
    if the factors have m and n digits, respectively. Using [...]'
---
<h3>Introduction<&#47;h3>

<div style="float:right"><a href="&#47;book&#47;link.php?id=taocp2"><img src="&#47;book&#47;taocp2.jpg" &#47;><&#47;a><&#47;div>
This article is the first in a series dealing with algorithms for multiple-precision arithmetic. The goal is to present both a theoretical foundation with high-level algorithm descriptions (based on Section&nbsp;4.3.1, <em>The Classical Algorithms<&#47;em>, of <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;taocp.html">The Art of Computer Programming<&#47;a>, Volume&nbsp;2, by <a href="http:&#47;&#47;www-cs-faculty.stanford.edu&#47;~knuth&#47;">Donald E. Knuth<&#47;a>) and a portable C++ implementation of the algorithms. The theory and high-level algorithms will be quite universal and generic, whereas the presented code will be just one way to implement the algorithms in a specific programming language.

<a id="more"></a><a id="more-495"></a>

We start out by considering only non-negative integers. A number \(u \geq 0\) will be represented in radix \(b \geq 2\) using the notation
\[u = (u_{n-1} \ldots u_1 u_0)_b = \sum_{i=0}^{n-1} u_i b^i, \quad 0 \leq u_i < b.\]
We will call <span class="mthi">u<&#47;span> an <span class="mthi">n<&#47;span>-digit number and \(u_0\), \(u_1\), etc., its digits. Unless stated otherwise we will always have that the most-significant digit is non-zero, here \(u_{n-1} \neq 0\), and we will represent zero with no digits, \(0 = ()_b\). We have \(b^{n-1} \leq u \leq b^n-1\), implying \(n=1+\lfloor \log_b u \rfloor\) for \(u \geq 1\).

Let the word size of the data type <span class="sputcode">T<&#47;span> used for each digit be \(b_T\). For instance, if <span class="sputcode">T<&#47;span> is a 32 bit unsigned integer, we have \(b_T = 2^{32}\). We will implement the algorithms using \(b = b_T\) and exploit the fact that C++ does arithmetic on unsigned integers <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Modular_arithmetic">modulo<&#47;a> \(b_T\) (see paragraph 3.9.1&nbsp;(4) of the <a href="http:&#47;&#47;www.open-std.org&#47;jtc1&#47;sc22&#47;wg21&#47;docs&#47;papers&#47;2009&#47;n2914.pdf">C++ standard<&#47;a>). This makes it possible to implement portable algorithms. They will not be optimal with respect to speed, however, and it will be noted when specialized operations, such as add-with-carry instructions, would lead to more efficient implementations.

<h3>Data Structures<&#47;h3>
A non-negative number will be represented in C++ as an instance of the class <span class="sputcode">NonNegativeInteger<&#47;span>:
<pre class="sputcode">template <typename T, typename V=detail::SimpleDigitVector<T> >
class NonNegativeInteger {
private:
  boost::shared_ptr<V> digitvec;
  &#47;&#47; ...
public:
  NonNegativeInteger();
  NonNegativeInteger(T value);
  &#47;&#47; ...
};<&#47;pre>
The type argument <span class="sputcode">T<&#47;span> is used to represent each digit. It must be integer and unsigned, so <span class="sputcode">unsigned char<&#47;span>, <span class="sputcode">unsigned short<&#47;span>, <span class="sputcode">unsigned int<&#47;span>, <span class="sputcode">unsigned long<&#47;span>, and <span class="sputcode">unsigned long long<&#47;span> can all be used (the type <span class="sputcode">long long int<&#47;span> is not standard C++, but is, e.g., <a href="http:&#47;&#47;gcc.gnu.org&#47;onlinedocs&#47;gcc&#47;Long-Long.html">supported<&#47;a> by <a href="http:&#47;&#47;gcc.gnu.org">GCC<&#47;a>). If a digit type with 8, 16, 32, or 64 bits is needed, the <a href="http:&#47;&#47;www.boost.org">boost<&#47;a> <a href="http:&#47;&#47;www.boost.org&#47;doc&#47;libs&#47;release&#47;libs&#47;integer&#47;index.html">integer types<&#47;a> <span class="sputcode">uint8_t<&#47;span>, <span class="sputcode">uint16_t<&#47;span>, <span class="sputcode">uint32_t<&#47;span>, <span class="sputcode">uint64_t<&#47;span> (from the namespace <span class="sputcode">boost<&#47;span>) can be used with portability ensured (<span class="sputcode">uint64_t<&#47;span> is not always available, but the macro <span class="sputcode">BOOST_NO_INT64_T<&#47;span> will tell you if it is not).

The type argument <span class="sputcode">V<&#47;span> is used as the container type for the digits. The default container is <span class="sputcode">SimpleDigitVector<&#47;span> (which at this time is also the only container supported). This default container simply wraps an array of size (at least) the number of digits.

Note that the digit container <span class="sputcode">digitvec<&#47;span> of <span class="sputcode">NonNegativeInteger<&#47;span> is wrapped in a <a href="http:&#47;&#47;www.boost.org&#47;doc&#47;libs&#47;1_43_0&#47;libs&#47;smart_ptr&#47;shared_ptr.htm">boost shared pointer<&#47;a>. Consider the small code excerpt:
<pre class="sputcode">  NonNegativeInteger<unsigned> a=value1(), b=value2(), c;
  c = a;
  b += a;
  c += b;<&#47;pre>
Because of the shared pointer, the first assignment, <span class="sputcode">c = a<&#47;span>, is very cheap and will not result in copying the digit container. Instead, the <span class="sputcode">digitvec<&#47;span> of both <span class="sputcode">a<&#47;span> and <span class="sputcode">c<&#47;span> will refer to the <em>same<&#47;em> instance of the digit container (which gets a reference count of 2). This also makes it cheap to pass arguments by value and returning numbers by value. The next statement, <span class="sputcode">b += a<&#47;span>, can add <span class="sputcode">a<&#47;span> to <span class="sputcode">b<&#47;span> <em>in place<&#47;em> (assuming there is enough space in <span class="sputcode">b<&#47;span>'s <span class="sputcode">digitvec<&#47;span> to contain the result) because it is possible to check if <span class="sputcode">b<&#47;span> is the only instance referring to its digit container. Contrarywise, the last statement, <span class="sputcode">c += a<&#47;span>, cannot add <span class="sputcode">a<&#47;span> to <span class="sputcode">c<&#47;span> in place because <span class="sputcode">a<&#47;span> refers to the same container as <span class="sputcode">c<&#47;span> does.

<h3>Addition<&#47;h3>
Adding radix <span class="mthi">b<&#47;span>-numbers is quite straightforward and is easily done using the familiar pencil-and-paper method.

To formalize, we first consider adding two <span class="mthi">n<&#47;span>-digit numbers, \(n \geq 1\), \(u=(u_{n-1} \ldots u_1 u_0)_b\) and \(v = (v_{n-1} \ldots v_1 v_0)_b\), obtaining an \((n+1)\)-digit sum \(w=(w_n \ldots w_1 w_0)_b\). Note that we here may end up with \(w_n = 0\) (in which case \(w_{n-1} \neq 0\)). We have
\[\begin{aligned}
w_0 &amp;\leftarrow (u_0 + v_0) \;\mbox{mod}\; b, \\
w_i &amp;\leftarrow (u_i + v_i + k_i) \;\mbox{mod}\; b, \\
w_n &amp;\leftarrow k_n.
\end{aligned} \quad
\begin{aligned}
k_1 &amp;\leftarrow \lfloor (u_0 + v_0)&#47;b \rfloor, \\
k_{i+1} &amp;\leftarrow \lfloor (u_i + v_i + k_i)&#47;b \rfloor, \quad i = 1, \ldots, n-1, \\
\mbox{ }
\end{aligned}\]
Note that \(\lfloor x&#47;b \rfloor = [x \geq b]\) for \(x < 2 b\), where \([P]\) is equal to <span class="mthn">1<&#47;span> if <span class="mthi">P<&#47;span> is true and equal to <span class="mthn">0<&#47;span> if <span class="mthi">P<&#47;span> is false. This means \(k_i \in \{0,1\}\) and furthermore \(u_i + v_i + k_i \leq b-1 + b-1 + 1 = 2 b - 1\). Using that \(0 \leq u_i, v_i \leq b-1\) and \((x \;\mbox{mod}\; b) + \lfloor x&#47;b \rfloor = x\) it is quite easy to show that, in fact, \(w = u + v\).

The cases where <span class="mthi">u<&#47;span> or <span class="mthi">v<&#47;span> is zero makes addition trivial. Similarly, if the number of digits in <span class="mthi">u<&#47;span> and <span class="mthi">v<&#47;span> are different, is it quite easy to adjust the algorithm above.

Let us now look at some implementation details. How do we compute \(z = (x + y) \;\mbox{mod}\; b\) and \(k = \lfloor (x + y)&#47;b \rfloor\) for \(0 \leq x, y < b\)? We have several options, some of which are
<ol>
	<li>Use \(2 b \leq b_T\). Then <span class="mthi">z<&#47;span> and <span class="mthi">k<&#47;span> can be computed directly.<&#47;li>
	<li>Use \(b = b_T\) and the CPU's add and add-with-carry instructions.<&#47;li>
	<li>Use \(b = b_T\), but the computations must be done in some portable C++ way.<&#47;li>
<&#47;ol>
Option 1 is actually not an option because we insist on using \(b = b_T\). Option 2 leads to the most efficient code, regarding both space and speed. The problem is that these special instructions are not directly accessible via the C++ standard. Some compilers, though, make it possible to use inline assembly. For instance, <a href="http:&#47;&#47;gcc.gnu.org">GCC<&#47;a> has such <a href="http:&#47;&#47;gcc.gnu.org&#47;onlinedocs&#47;gcc&#47;Extended-Asm.html">capabilities<&#47;a>.

Option 3 is the way to go. As mentioned earlier, C++ does calculations modulo \(b_T\), so \(z \leftarrow (x + y) \;\mbox{mod}\; b\) comes 'for free' as simply <span class="sputcode">z = x + y<&#47;span> in C++. Left is how to detect whether a carry occurs during an addition. One way to do that is the following. Consider \(z = (x + y) \;\mbox{mod}\; b\) for which there are two possibilities. Either \(z = x + y\) (\(k = 0\)) which implies \(z \geq x\) and \(z \geq y\), or we have \(z + b = x + y\) (\(k = 1\)) which implies \(z = x - (b - y) = y - (b - x)\), leading to \(z < x\) and \(z < y\). So \(k = [z < x] = [z < y]\). Another way to detect whether a carry occurs is to split <span class="mthi">x<&#47;span> and <span class="mthi">y<&#47;span> into a low and high part, and then adding the low and high parts seperately&mdash;keeping track of a possible intermediate carry, of course.

<h3>Subtraction<&#47;h3>
An algorithm for multiple-precision subtraction is similar to addition, as just considered. Again we set \(u=(u_{n-1} \ldots u_1 u_0)_b\) and \(v = (v_{n-1} \ldots v_1 v_0)_b\) with \(n \geq 1\). To ensure that the result \(w = u - v\) is a non-negative integer we furthermore require that \(u \geq v\). We now have the algorithm:
\[\begin{aligned}
w_0 &amp;\leftarrow (u_0 - v_0) \;\mbox{mod}\; b, \\
w_i &amp;\leftarrow (u_i - v_i - k_i) \;\mbox{mod}\; b,
\end{aligned} \quad
\begin{aligned}
k_1 &amp;\leftarrow [u_0 < v_0], \\
k_{i+1} &amp;\leftarrow [u_i < v_i + k_i], \quad i = 1, \ldots, n-1.
\end{aligned}\]
Note that <em>any<&#47;em> digit of the result may end up being zero&mdash;we only know that \(0 \geq w \geq b^n - b^{n-1} - 1\). Note furthermore that \(k_n = [u < v] = 0\). Verification of the algorithm is easily done using the fact that \(x - y = ((x-y) \;\mbox{mod}\; b) - b [x < y]\) for \(0 \leq x, y < b\).

The options when implementing the algorithm is, again, much like for addition. Using the CPU's subtract-with-borrow instruction would be ideal here, but it cannot be done portably in C++. The borrow when calculating \(x - y\) can be computed as simply \(k \leftarrow [x < y]\), or, to avoid branching instructions, we can split <span class="mthi">x<&#47;span> and <span class="mthi">y<&#47;span> into two parts and do the subtraction for each part seperately.

<h3>Multiplication<&#47;h3>
We seek an algorithm to compute \(w = u v\) where
\[u = (u_{m-1} \ldots u_1 u_0)_b, \quad v = (v_{n-1} \ldots v_1 v_0)_b,
\quad w = (w_{m+n-1} \ldots w_1 w_0)_b.\]
We first, however, consider the simpler operation \(z \leftarrow y + \alpha u\) where
\[0 \leq \alpha < b, \quad y = (y_{m-1} \ldots y_1 y_0)_b, \quad z = (z_m \ldots z_1 z_0)_b.\]
The following algorithm suggests itself:
\[\begin{aligned}
z_0 &amp;\leftarrow (y_0 + \alpha u_0) \;\mbox{mod}\; b, \\
z_i &amp;\leftarrow (y_i + \alpha u_i + k_i) \;\mbox{mod}\; b, \\
z_m &amp;\leftarrow k_m.
\end{aligned} \quad
\begin{aligned}
k_1 &amp;\leftarrow \lfloor (y_0 + \alpha u_0)&#47;b \rfloor, \\
k_{i+1} &amp;\leftarrow \lfloor (y_i + \alpha u_i + k_i)&#47;b \rfloor, \quad i = 1, \ldots, m-1, \\
\mbox{ }
\end{aligned}\]
If \(\alpha = 0\) then obviously \(z_i = 0\). If \(1 \leq \alpha \leq b-1\) then \(z_m\) may be zero, in which case \(z_ {m-1} \neq 0\), since
\[2 b^{m-1} \leq \; z \; \leq b^m-1 + (b^m-1)(b-1) = b^{m+1} - b < b^{m+1}\]
Note that \(k_i < b\) since \(y_i + \alpha u_i + k_i \leq b-1 + (b-1)(b-1) + b-1 = b^2 - 1\). The algorithm above is easily verified, using that \(z_i + b k_{i+1} = y_i + \alpha u_i + k_i\).

We now turn to \(w = u v\) and get
\[w = u v = \sum_{j=0}^{n-1} b^j v_j u.\]
From this we see that we can compute <span class="mthi">w<&#47;span> by doing a number of \((z \leftarrow y + \alpha u)\)-type operations, if we start with \(w=0\) and then do in-place updates for each <span class="mthi">j<&#47;span>. The \(b^j\)-factor simply determines the 'digit offset' on which the updates should be done:
\[\begin{aligned}
(w_{m-1} \ldots w_1 w_0)_b &amp;\leftarrow (0 \, \ldots \, 0 \, 0)_b, \\
(w_{m+j} \ldots w_{j+1} w_j)_b &amp;\leftarrow (w_{m+j-1} \ldots w_{j+1} w_j)_b + v_j (u_{m-1} \ldots u_1 u_0)_b, \\
\end{aligned}\]
for \(j = 0, 1, \ldots, n-1\). Note that \(w_{m+n-1}\) may be zero, in which case \(w_{m+n-2} \neq 0\), since \(b^{m+n-2} \leq w < b^{m+n}\).

Now for some implementation details. We note that the only non-trivial computation is \(z \leftarrow y + \alpha x + k\), where \(0 \leq \alpha, k, x, y < b\), followed by computing \(z \;\mbox{mod}\; b\) and \(\lfloor z&#47;b \rfloor\). Most CPUs have instructions that can multiply two word-size numbers and produce a double-word answer. As was the case for addition and subtraction, we don't have access to these instructions from standard C++. We have \(0 \leq z < b^2\) but every multiplication result in our portable C++ implementation must be smaller than <span class="mthi">b<&#47;span>. We can do this by using a new base number <span class="mthi">h<&#47;span> where \(h^2 = b\) (we assume that <span class="mthi">b<&#47;span> is chosen appropriately so <span class="mthi">h<&#47;span> is integer) and setting
\[z = (z_3 z_2 z_1 z_0)_h, \quad y = (y_1 y_0)_h, \quad \alpha = (\alpha_1 \alpha_0)_h, \quad x = (x_1 x_0)_h, \quad k = (k_1 k_0)_h.\]
We can now use the multiplication algorithm above on a 'smaller scale' to compute the product \(\alpha x\). We can furthermore expand the methods slightly and incorporate the addition of <span class="mthi">y<&#47;span> and <span class="mthi">k<&#47;span> in an elegant way:
\[\begin{aligned}
(z_1 z_0)_h &amp;\leftarrow (y_1 y_0)_h, \\
c &amp;\leftarrow k_0, \\
t &amp;\leftarrow z_0 + \alpha_0 x_0 + c, \quad z_0 \leftarrow t \;\mbox{mod}\; b, \quad c \leftarrow \lfloor t&#47;b \rfloor, \\
t &amp;\leftarrow z_1 + \alpha_0 x_1 + c, \quad z_1 \leftarrow t \;\mbox{mod}\; b, \quad c \leftarrow \lfloor t&#47;b \rfloor, \\
z_2 &amp;\leftarrow c, \\
c &amp;\leftarrow k_1, \\
t &amp;\leftarrow z_1 + \alpha_1 x_0 + c, \quad z_1 \leftarrow t \;\mbox{mod}\; b, \quad c \leftarrow \lfloor t&#47;b \rfloor, \\
t &amp;\leftarrow z_2 + \alpha_1 x_1 + c, \quad z_2 \leftarrow t \;\mbox{mod}\; b, \quad c \leftarrow \lfloor t&#47;b \rfloor, \\
z_3 &amp;\leftarrow c.
\end{aligned}\]
We now have \(z \;\mbox{mod}\; b = (z_1 z_0)_h\) and \(\lfloor z&#47;b \rfloor = (z_3 z_2)_h\).

<h3>Concluding Remarks<&#47;h3>
We have now covered addition, subtraction, and multiplication of non-negative integers of arbitrary magnitude. Left is how to do division, which will be the subject of the <a href="&#47;blog&#47;2009&#47;08&#47;implementing-multiple-precision-arithmetic-part-2.html">next article<&#47;a>.

I am currently working on a project that implements multiple-precision arithmetic following the principles of this, and the following, articles. <del cite="&#47;blog&#47;2011&#47;09&#47;hosting-and-status-for-the-numbers-project.html" datetime="2011-09-28T08:25:00Z">You can follow the <a href="http:&#47;&#47;sourceforge.net&#47;projects&#47;sputsoftnumbers&#47;">project<&#47;a> as it develops at <a href="http:&#47;&#47;sourceforge.net">SourceForge<&#47;a>. The project is still in its infancy and no releases have yet been made. You can, however, <a href="http:&#47;&#47;sputsoftnumbers.svn.sourceforge.net&#47;viewvc&#47;sputsoftnumbers&#47;trunk&#47;">browse the source<&#47;a> or check out the source code (using a <a href="http:&#47;&#47;subversion.apache.org&#47;">Subversion<&#47;a> client) as
<pre class="sputcode">svn co https:&#47;&#47;sputsoftnumbers.svn.sourceforge.net&#47;svnroot&#47;sputsoftnumbers&#47;trunk sputsoftnumbers<&#47;pre><&#47;del>
Bug reports, suggestions for improvements, patches, and other comments are very welcome.

<em>Update 2010-07-03: The code has undergone some changes since this article was written. See the <a href="&#47;numbers&#47;">project page<&#47;a> for more information and the latest articles.<&#47;em>
