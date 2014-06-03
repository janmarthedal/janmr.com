---
layout: post
title: Structure of a Multiple-Precision Library in C++
author: Jan Marthedal Rasmussen
excerpt: ! ""
categories:
- programming
tags:
- arithmetic
- algorithms
- multiple-precision

---
This post will present an overview of my [Kanooth Numbers](https://github.com/janmarthedal/kanooth-numbers) library. The overall approach described here could easily be applicable to other multiple-precision libraries.

### Low-level Functions

The low-level functions are the building blocks for all number operations, heavily inspired by the [GNU MP low-level functions](https://gmplib.org/manual/Low_002dlevel-Functions.html). Each low-level function does one simple operation and operates on non-negative numbers. The numbers are represented by arrays where the radix corresponds to a memory word (typically the radix will be 2<sup>32</sup> or 2<sup>64</sup>), see [post on number representation](/2011/10/multiple-precision-number-representation.html) (the most significant digit is not always non-zero, though). The functions make no memory allocations and it is the responsibility of the caller to make sure that, e.g., the result array is large enough.

Some of the most important low-level functions are:

 * `add_1`. Add one digit to an <i>n</i>-digit number.
 * `add`. Add an <i>n</i>-digit number to an <i>m</i>-digit number.
 * `sub_1`. Subtract one digit from an <i>n</i>-digit number.
 * `sub`. Subtract an <i>m</i>-digit number from an <i>n</i>-digit number ({% imath n \geq m %}).
 * `mul_1`. Multiply an <i>n</i>-digit number by a single digit.
 * `mul`. Multiply an <i>n</i>-digit number by an <i>m</i>-digit number.
 * `quotrem_1`. Divide an <i>n</i>-digit number by a single digit, producing both an <i>n</i>-digit quotient and a single digit remainder.
 * `quotrem`. Divide an <i>n</i>-digit number by an <i>m</i>-digit number ({% imath n \geq m \geq 2 %}), producing both a quotient and a remainder.
 * `lshift`. Multiply an <i>n</i>-digit number by a power of 2 (binary shift left).
 * `rshift`. Divide an <i>n</i>-digit number by a power of 2 (binary shift right).
 * `comp`. Compare two <i>n</i>-digit numbers.

Many of these functions have further pre- and postconditions. A theoretical foundation behind most of these functions can be found among earlier posts:

 * [Multiple-Precision Addition](/2011/10/multiple-precision-addition.html)
 * [Multiple-Precision Subtraction](/2011/10/multiple-precision-subtraction.html)
 * [Basic Multiple-Precision Multiplication](/2011/11/basic-multiple-precision-multiplication.html)
 * [Basic Multiple-Precision Short Division](/2012/11/basic-multiple-precision-short-division.html)
 * [Basic Multiple-Precision Long Division](/2014/04/basic-multiple-precision-long-division.html)

An [example implementation](https://github.com/janmarthedal/kanooth-numbers/blob/28268a02e943629cb64cd4b68c4911f11674c6fb/kanooth/numbers/lowlevel/generic_has_double.hpp) of these low-level functions can be seen as part the library code.

### Number Objects

Actual number objects can now be created, using the low-level functions to do the actual digit crunching.

#### Non-negative Integer

Consider first an object representing non-negative integers (named `natural_number` in the library). The object wraps an array of digits and contains the methods for, among others,

 * construction from integer literals or strings with decimal digits
 * assignment
 * arithmetic operations such as addition, subtraction, multiplication
 * comparison

It is a method's responsibility to handle memory management and to live up to the preconditions of the low-level functions, when used.

Consider adding two numbers as an example. We wish to have a statement such as

{% highlight cpp %}
r.add(a, b);
{% endhighlight %}

where the sum of numbers `a` and `b` will be assigned to `r`. The `add` method could be implemented like

{% highlight cpp %}
void add(const natural_number_base& a, const natural_number_base& b) {
  size_type max_digits = std::max(a.digits, b.digits) + 1;
  if (allocated < max_digits) {
    natural_number_base other(max_digits, digit_unit);
    other.add_number(a, b);
    swap(other);
  } else {
    add_number(a, b);
  }
}
{% endhighlight %}

The `if` statement checks if enough digits are available to store the destination digits, allocating new memory if needed. `add_number` is an auxiliary method that calls the low-level `add` function:

{% highlight cpp %}
void add_number(const natural_number_base& a, const natural_number_base& b) {
  if (a.digits >= b.digits) {
    digit_type carry = LowLevel::add(digit_array, a.digit_array, a.digits, b.digit_array, b.digits);
    set_digits_carry(a.digits, carry);
  } else {
    digit_type carry = LowLevel::add(digit_array, b.digit_array, b.digits, a.digit_array, a.digits);
    set_digits_carry(b.digits, carry);
  }
}
{% endhighlight %}

The low-level `add` has the precondition that the first digit array must have at least as many digits as the second digit array. `set_digits_array` is another auxiliary method that makes sure that the most-significant digit is non-zero.

All other `natural_number` methods are constructed similarly: Making sure that enough destination digits are available and that the preconditions of any low-level functions are satisfied.

#### Integer

### Operator Overloading

Since Boost 1.53, [Boost Multiprecision](http://www.boost.org/doc/libs/release/libs/multiprecision/)

