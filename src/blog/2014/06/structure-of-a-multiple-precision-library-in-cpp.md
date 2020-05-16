---
title: Structure of a Multiple-Precision Library in C++
date: '2014-06-03'
layout: layouts/post.njk
tags:
  - arithmetic
  - algorithms
  - multiple-precision
  - cpp
  - post
categories:
  - programming
excerpt: >-
  This post will present an overview of the implementation of Kanooth Numbers, a
  portable multiple-precision library in C++.
---
This post will present an overview of the implementation of [Kanooth Numbers](https://github.com/janmarthedal/kanooth-numbers), a portable multiple-precision library in C++.

### Low-level Functions

The low-level functions are the building blocks for all number operations, heavily inspired by the [GNU MP low-level functions](https://gmplib.org/manual/Low_002dlevel-Functions.html). Each low-level function does one simple operation and operates on non-negative numbers. The numbers are represented by arrays where the radix corresponds to a memory word (typically the radix will be 2<sup>32</sup> or 2<sup>64</sup>), see [post on number representation](/blog/2011/10/multiple-precision-number-representation) (the most significant digit is not always non-zero, though). The functions make no memory allocations and it is the responsibility of the caller to make sure that, e.g., the result array is large enough.

Some of the most important low-level functions are:

 * `add_1`. Add one digit to an <i>n</i>-digit number.
 * `add`. Add an <i>n</i>-digit number to an <i>m</i>-digit number.
 * `sub_1`. Subtract one digit from an <i>n</i>-digit number.
 * `sub`. Subtract an <i>m</i>-digit number from an <i>n</i>-digit number ($n \geq m$).
 * `mul_1`. Multiply an <i>n</i>-digit number by a single digit.
 * `mul`. Multiply an <i>n</i>-digit number by an <i>m</i>-digit number.
 * `quotrem_1`. Divide an <i>n</i>-digit number by a single digit, producing both an <i>n</i>-digit quotient and a single digit remainder.
 * `quotrem`. Divide an <i>n</i>-digit number by an <i>m</i>-digit number ($n \geq m \geq 2$), producing both a quotient and a remainder.
 * `lshift`. Multiply an <i>n</i>-digit number by a power of 2 (binary shift left).
 * `rshift`. Divide an <i>n</i>-digit number by a power of 2 (binary shift right).
 * `comp`. Compare two <i>n</i>-digit numbers.

Many of these functions have several preconditions. A theoretical foundation behind most of these functions can be found among earlier posts:

 * [Multiple-Precision Addition](/blog/2011/10/multiple-precision-addition)
 * [Multiple-Precision Subtraction](/blog/2011/10/multiple-precision-subtraction)
 * [Basic Multiple-Precision Multiplication](/blog/2011/11/basic-multiple-precision-multiplication)
 * [Basic Multiple-Precision Short Division](/blog/2012/11/basic-multiple-precision-short-division)
 * [Basic Multiple-Precision Long Division](/blog/2014/04/basic-multiple-precision-long-division)

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

Consider adding two numbers. We wish to have a statement such as

``` cpp
r.add(a, b);
```

where the sum of numbers `a` and `b` will be assigned to `r`. The `add` method could be implemented like

``` cpp
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
```

The `if` statement checks if enough digits are available to store the destination digits, allocating new memory if needed. `add_number` is an auxiliary method that calls the low-level `add` function:

``` cpp
void add_number(const natural_number_base& a, const natural_number_base& b) {
  if (a.digits >= b.digits) {
    digit_type carry = LowLevel::add(digit_array, a.digit_array, a.digits, b.digit_array, b.digits);
    set_digits_carry(a.digits, carry);
  } else {
    digit_type carry = LowLevel::add(digit_array, b.digit_array, b.digits, a.digit_array, a.digits);
    set_digits_carry(b.digits, carry);
  }
}
```

The low-level `add` has the precondition that the first digit array must have at least as many digits as the second digit array. `set_digits_array` is another auxiliary method that makes sure that the most significant digit is non-zero.

All other `natural_number` methods are constructed similarly: Making sure that enough destination digits are available and that the preconditions of any low-level functions are satisfied.

#### Integer

The `integer` data type is simply implemented as a natural number with a sign. All operations are implemented using natural number operations, keeping track of the correct sign.

Consider addition as an example:

``` cpp
void add(const integer_base& a, const integer_base& b) {
  if (a.positive == b.positive) {
    positive = a.positive;
    number.add(a.number, b.number);
  } else if (a.number.compare(b.number) >= 0) {
    positive = a.positive;
    number.subtract(a.number, b.number);
  } else {
    positive = b.positive;
    number.subtract(b.number, a.number);
  }
}
```

Notice how signed addition is transformed into unsigned addition or subtraction, and how it is ensured that the first operand to `subtract` is not smaller than the second operand.

### Operator Overloading

Using the number objects `natural_number` and `integer` together with their methods is sufficient to do multiple-precision arithmetic. But C++ has operator overloading and some would prefer to write

``` cpp
r = 12*a + b;
```

instead of

``` cpp
t.multiply(a, 12);
r.add(t, b);
```

A naive implementation would evaluate the right-hand side followed by an assignment:

``` cpp
t1.multiply(a, 12);
t2.add(t1, b);
r = t2;
```

which is not optimal. A better approach is to build a data structure of the right-hand side operations and not "translating" into actual function calls until its value was needed (here, when the actual assignment occurs). C++ is able to do all this at compile time. This functionality is currently not a part of the Kanooth Numbers library, but the [Boost Multiprecision](http://www.boost.org/doc/libs/release/libs/multiprecision/) libray does it very well. The Boost Multiprecision library also enables custom backends and both `natural_number` and `integer` has been wrapped in Boost Multiprecision backends, producing the data types `boost_natnum` and `boost_integer`, respectively.
