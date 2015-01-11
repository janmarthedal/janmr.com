---
layout: post
title: Fast Evaluation of Fibonacci Numbers
author: Jan Marthedal Rasmussen
excerpt: ! "The integer sequence 0, 1, 1, 2, 3, 5, 8, 13, ... is well known as the Fibonacci sequence. It is easily defined by F_0 = 0, F_1 = 1 and F_n = F_{n-1} + F_{n-2} for n >= 2.
  
  To compute F_n you could use this definition directly, but that leads to a highly inefficient algorithm that is both recursive and which uses a number of additions which grows exponentially with n."
date: 2011-03-11 11:01:12.000000000 +01:00
categories:
- programming
- mathematics
tags:
- algorithms
- Fibonacci number
- numbers project
---
The integer [sequence](http://oeis.org/A000045) 0, 1, 1, 2, 3, 5, 8, 13, &#8230; is well known as the [Fibonacci](http://en.wikipedia.org/wiki/Fibonacci) sequence. It is easily defined by {% imath F_0 = 0 %}, {% imath F_1 = 1 %} and {% imath F_n = F_{n-1} + F_{n-2} %} for {% imath n \geq 2 %}.

To compute {% imath F_n %} you could use this definition directly, but that leads to a *highly inefficient* algorithm that is both recursive and which uses a number of additions which grows exponentially with {% imath n %}.

The first observation that leads to a better algorithm is that we can iteratively compute {% imath F_2, F_3, \ldots, F_n %} and at each step, we only need the previous two values from the sequence. So if we set

{% dmath T(a,b) = (a+b, a) %}

and {% imath r(a,b)=b %} then we have {% imath F_n = r(T^n(1,0)) %}, where {% imath T^n %} means that the operator {% imath T %} is applied {% imath n %} times (and {% imath T^0 %} is the identity). This reduces the number of iterations to {% imath n %} which is much much better than exponential growth.

<div class="pull-right"><a href="{% amazon sicp %}"><img src="{% bookcover sicp %}" /></a></div>
But it can get even better. The following method is inspired by an exercise in the book <a href="{% amazon sicp %}">Structure and Interpretation of Computer Programs</a> (see [Exercise 1.19](http://mitpress.mit.edu/sicp/full-text/book/book-Z-H-11.html#%_sec_1.2.4)). The key observation is that if we introduce

{% dmath T_{p,q}(a,b) = (a q + a p + b q, b p + a q) %}

then we have both {% imath T(a,b)=T_{0,1}(a,b) %} and

{% dmath T_{p,q}^2(a,b) = T_{p,q}(a q + a p + b q, b p + a q) = \ldots = T_{p^2+q^2,2 p q+q^2}(a,b). %}

Why is this important? Because now we have

1. {% imath T_{p,q}^0(a,b) = (a,b) %}
2. {% imath T_{p,q}^{2k}(a,b) = (T_{p,q}^2)^k(a,b) = T_{p^2+q^2,2 p q+q^2}^k(a,b) %}
3. {% imath T_{p,q}^{2k+1}(a,b) = T_{p,q}^{2k}(T_{p,q}(a,b)) = T_{p,q}^{2k}(a q + a p + b q, b p + a q) %}

Notice how this type of reduction rules are very similar to those found in the [Evaluation of Powers post](/2011/01/evaluation-of-powers.html). Let us look at an example and try to evaluate {% imath F_{20} = r(T^{20}(1,0)) = r(T_{0,1}^{20}(1,0)) %} using these rules:

{% dmath \begin{split} T_{0,1}^{20}(1,0) &= (T_{0,1}^2)^{10}(1,0) = T_{1,1}^{10}(1,0) = (T_{1,1}^2)^5(1,0) = T_{2,3}^5(1,0) = T_{2,3}^4(T_{2,3}(1,0)) \\ &= T_{2,3}^4(5,3) = (T_{2,3}^2)^2(5,3) = T_{13,21}^2(5,3) = T_{610,987}(5,3) = (10946,6765) \end{split} %}

Then we just have to extract the second component (as done by applying the {% imath r %} function) and we get {% imath F_{20}=6765 %}.

It is clear that the number and type of steps depend on the binary representation of {% imath n %} when computing {% imath F_n %} using this method. Actually, reduction rule 2 will be performed {% imath \lfloor\log_2(n)\rfloor %} times and the number of times reduction rule 3 is performed corresponds to the number of 1s in the binary representation of {% imath n %}. So the total number of steps needed for evaluating {% imath F_n %} using this method is logarithmic in {% imath n %}.

Let us look at a `C++` implementation. A straightforward implementation is this:

{% highlight cpp %}
fibtype fib_rec(fibtype a, fibtype b, fibtype p, fibtype q, unsigned count) {
  if (count == 0)
    return b;
  if (count % 2 == 0)
    return fib_rec(a, b, p*p+q*q, 2*p*q+q*q, count/2);
  return fib_rec(b*q+a*q+a*p, b*p+a*q, p, q, count-1);
}
{% endhighlight %}

where {% imath F_n %} = `fib_rec(1, 0, 0, 1, n)` (`fibtype` is just a `typedef` for an appropriate integer type.) It can be made iterative and improved at bit in the following way:

{% highlight cpp %}
fibtype fibonacci(unsigned n) {
  if (n <= 1) return n;
  fibtype a=1, b=0, p=0, q=1, tmp;
  while (n != 1) {
    if (n % 2 != 0) {
        tmp = b*q + a*q + a*p;
        b   = b*p + a*q;
        a   = tmp;
    }
    tmp = p*p + q*q;
    q   = (2*p + q)*q;
    p   = tmp;
    n /= 2;
  }
  return b*p + a*q;
}
{% endhighlight %}

The most important improvement here is probably the observation that {% imath r(T_{p,q}(a,b)) = b p + a q %}.

I don't claim that this is the fastest possible method for evaluating (single) Fibonacci numbers, but it certainly beats the "traditional" methods mentioned in the beginning (it may be inferior for small {% imath n %}, though). Note also that as long as the numbers fit into the registers of the computer, the time necessary to perform each step is bounded by a constant. If multiple-precision is needed, however, this may no longer the case.

Please inform me of other fast ways to compute Fibonacci numbers.

*(Update 2014-03-25: The source for the last algorithm can be found as [a snippet](https://github.com/janmarthedal/snippets/blob/master/c++/kanooth/snippets/fibonacci_number.hpp))*

