---
title: C++ Templates and Usual Arithmetic Conversions
date: '2010-08-28'
layout: layouts/post.njk
tags:
  - cpp
  - templates
  - data-types
  - post
categories:
  - programming
excerpt: >-
  If you add a short int and a char in C++, what is the resulting type? What if
  you subtract a long int from an unsigned int? The answers actually depend on
  the compiler and the target architecture (int or unsigned in the first case
  and long int or unsigned long int in the second). This article lists the rules
  from the current C++ standard and gives an example of how the type can be
  resolved at compile time using templates.
---

If you add a `short int` and a `char` in C++, what is the resulting type? What if you subtract a `long int` from an `unsigned int`? The answers actually depend on the compiler and the target architecture (`int` or `unsigned` in the first case and `long int` or `unsigned long int` in the second). This article lists the rules from the current C++ standard and gives an example of how the type can be resolved at compile time using templates.

<span></span>

### Introduction

<div class="pull-right"><a href="https://en.wikipedia.org/wiki/Special:BookSources/0201700735"><img src="/media/books/stroustrup.jpg" alt=""></a></div>

Let me first note that I will be referring to the current C++ standard from 1998 (with a minor revision in 2003). This standard is described in <a href="https://en.wikipedia.org/wiki/Special:BookSources/0201700735">The C++ Programming Language</a> by [Bjarne Stroustrup](http://www.stroustrup.com). It can also be found [online](ftp://ftp.research.att.com/pub/c++std/WP/CD2/).

In C++, the *integer types* are `short int`, `int`, `long int` and the unsigned versions of these. The integer types together with the boolean type (`bool`) and the character types (plain/`signed`/`unsigned` `char` and `wchar_t`) are called *integral types*. The integral types together with the floating-point types (`float`, `double`, and `long double`) are called *arithmetic types*.

### Resolving the Return Type

Consider having the function `fct` overloaded with one function for each arithmetic type, for example:

``` cpp
void fct(short v)          { std::cout << "short "          << v << std::endl; }
void fct(unsigned short v) { std::cout << "unsigned short " << v << std::endl; }
void fct(int v)            { std::cout << "int "            << v << std::endl; }
void fct(unsigned v)       { std::cout << "unsigned "       << v << std::endl; }
...
```

and so on. If you now have the following little routine:

``` cpp
void g(short int a, char b) {
  fct(a + b);
}
```

which instance of `fct` is called? This is another way of asking the question that started this article.

When a binary operator (`+`, `-`, `*`, `/`, `%`) is applied to operands with arithmetic types, the C++ compiler must do the following:

*   **Integral promotion**. Each operand is, if necessary, promoted to at least an `int` (to be made more precise below).
*   **Usual arithmetic conversions**. Based on the (possibly promoted) types of the operands, a common type is found. Both operands are converted to this type, which will also be the resulting type.

### Integral Promotions

Integral promotions are defined in Section 4.5, page 4-3, from the [online standard](ftp://ftp.research.att.com/pub/c++std/WP/CD2/) and in Section C.6.1, page 833, from <a href="https://en.wikipedia.org/wiki/Special:BookSources/0201700735">The C++ Programming Language</a>. If we ignore enumerations and bit-fields, they can be summed up as follows:

*   A `char`, `signed char`, `signed char`, `short int`, `unsigned short int` is converted to `int` if `int` can represent all the values of the source type; otherwise, it is converted to an `unsigned int`.
*   `wchar_t` is converted to the first of the following types that can represent all the values of `wchar_t`: `int`, `unsigned int`, `long`, `unsigned long`.
*   `bool` is converted to `int`.

### Usual Arithmetic Conversions

The rules for usual arithmetic conversions can be found in Section 5, page 5-2, from the [online standard](ftp://ftp.research.att.com/pub/c++std/WP/CD2/) and in Section C.6.3, page 836, from <a href="https://en.wikipedia.org/wiki/Special:BookSources/0201700735">The C++ Programming Language</a>. Assuming integral promotions have been performed (if needed), the usual arithmetic conversions are in essense the following:

*   If one operand is a `long int` and the other `unsigned int`, then if a `long int` can represent all the values of an `unsigned int`, the `unsigned int` shall be converted to a `long int`; otherwise both operands shall be converted to `unsigned long int`.
*   Otherwise, find the highest ranking type among the operands and convert the other operand to this type. The relevant types listed from high to low rank are: `long double`, `double`, `float`, `unsigned long`, `long`, `unsigned`, `int`.

### Using Templates To Get The Type

Those were the rules in written form. Imagine now that we have, e.g., the following routine:

``` cpp
template <typename A, typename B>
[some-type] add(const A& a, const B& b) { return a + b; }
```

We would like the types of `add(a, b)` and `a + b` to be identical when both `a` and `b` are arithmetic types.

First, promotions. By default, a type is not promoted:

``` cpp
template <typename T>
struct promote { typedef T type; };
```

We then use template specializations for the types that need to be promoted. Some of these are easy:

``` cpp
template <>
struct promote<signed short> { typedef int type; };
template <>
struct promote<bool> { typedef int type; };
```

For the rest, we need a sort of if-then-else for choosing a type:

``` cpp
template <bool C, typename T, typename F>
struct choose_type { typedef F type; };
template <typename T, typename F>
struct choose_type<true, T, F> { typedef T type; };
```

So the boolean value of the first argument determines whether to choose the type `T` (if true) or `F` (if false). We now have:

``` cpp
template <>
struct promote<unsigned short> {
  typedef choose_type<sizeof(short) < sizeof(int), int, unsigned>::type type;
};
template <>
struct promote<signed char> {
  typedef choose_type<sizeof(char) <= sizeof(int), int, unsigned>::type type;
};
template <>
struct promote<unsigned char> {
  typedef choose_type<sizeof(char) < sizeof(int), int, unsigned>::type type;
};
template <>
struct promote<char>
 : public promote<choose_type<std::numeric_limits<char>::is_signed,
                              signed char, unsigned char>::type> {};
```

This last one for plain `char` is needed because C++ considers `char`, `signed char`, and `unsigned char` to be three distinct types. The standard does not specify whether `char` is signed or not. (The `numeric_limits` template is defined in the `limits` header.)

Finally, to promote `wchar_t`:

``` cpp
template <>
struct promote<wchar_t> {
  typedef choose_type<
            std::numeric_limits<wchar_t>::is_signed,
            choose_type<sizeof(wchar_t) <= sizeof(int), int, long>::type,
            choose_type<sizeof(wchar_t) <= sizeof(int), unsigned, unsigned long>::type
          >::type type;
};
```

We can now turn to the usual arithmetic conversions. First, we promote each type, if necessary:

``` cpp
template <typename A, typename B>
struct resolve_uac : public resolve_uac2<typename promote<A>::type,
                                         typename promote<B>::type> {};
```

This ensures that the type arguments for `resolve_uac2` are at least `int`s. We then introduce ranks for those types:

``` cpp
template <typename T> struct type_rank;
template <> struct type_rank<int>           { static const int rank = 1; };
template <> struct type_rank<unsigned>      { static const int rank = 2; };
template <> struct type_rank<long>          { static const int rank = 3; };
template <> struct type_rank<unsigned long> { static const int rank = 4; };
template <> struct type_rank<float>         { static const int rank = 5; };
template <> struct type_rank<double>        { static const int rank = 6; };
template <> struct type_rank<long double>   { static const int rank = 7; };
```

Now we can pick the type with the highest rank:

``` cpp
template <typename A, typename B>
struct resolve_uac2 {
  typedef typename choose_type<
            type_rank<A>::rank >= type_rank<B>::rank, A, B
          >::type return_type;
};
```

Finally we need to deal with the special case where one type is `long int` and the other is `unsigned int`:

``` cpp
template <>
struct resolve_uac2<long, unsigned> {
  typedef choose_type<sizeof(long) == sizeof(unsigned),
                      unsigned long, long>::type return_type;
};
template <>
struct resolve_uac2<unsigned, long> : public resolve_uac2<long, unsigned> {};
```

We can now write the `add` routine from earlier as:

``` cpp
template <typename A, typename B>
typename resolve_uac<A, B>::return_type add(const A& a, const B& b)
{ return a + b; }
```

and the return type will match that of the `+` operation. Note that the arguments to `add` have to be arithmetic types (because of the [substitution-failure-is-not-an-error](http://en.wikipedia.org/wiki/Substitution_failure_is_not_an_error) principle).

### Remarks

The rules and implementation above should be complete with the exception of enumerations and bit-fields, see the links to the standard for the missing pieces. Note also that the rules for promotions and usual arithmetic conversions will change (slightly) in the upcoming C++0x standard, see the [C++0x draft](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3092.pdf), Section 5, page 84.
