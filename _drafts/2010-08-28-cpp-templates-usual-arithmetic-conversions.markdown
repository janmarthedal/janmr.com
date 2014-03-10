---
layout: post
status: publish
published: true
title: C++ Templates and Usual Arithmetic Conversions
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "If you add a <span class=\"sputcode\">short int<&#47;span> and a <span
  class=\"sputcode\">char<&#47;span> in C++, what is the resulting type? What if you
  subtract a <span class=\"sputcode\">long int<&#47;span> from an <span class=\"sputcode\">unsigned
  int<&#47;span>? The answers actually depend on the compiler and the target architecture
  (<span class=\"sputcode\">int<&#47;span> or <span class=\"sputcode\">unsigned<&#47;span>
  in the first case and <span class=\"sputcode\">long int<&#47;span> or <span class=\"sputcode\">unsigned
  long int<&#47;span> in the second). This article lists the rules from the current
  C++ standard and gives an example of how the type can be resolved at compile time
  using templates.\r\n\r\n"
wordpress_id: 1737
wordpress_url: http://sputsoft.com/blog/?p=1737
date: 2010-08-28 11:56:11.000000000 +02:00
categories:
- programming
tags:
- C++
- generic programming
- templates
- data types
comments: []
---
If you add a <span class="sputcode">short int<&#47;span> and a <span class="sputcode">char<&#47;span> in C++, what is the resulting type? What if you subtract a <span class="sputcode">long int<&#47;span> from an <span class="sputcode">unsigned int<&#47;span>? The answers actually depend on the compiler and the target architecture (<span class="sputcode">int<&#47;span> or <span class="sputcode">unsigned<&#47;span> in the first case and <span class="sputcode">long int<&#47;span> or <span class="sputcode">unsigned long int<&#47;span> in the second). This article lists the rules from the current C++ standard and gives an example of how the type can be resolved at compile time using templates.

<a id="more"></a><a id="more-1737"></a>

<h3>Introduction<&#47;h3>

<div style="float:right"><a href="&#47;book&#47;link.php?id=stroustrup"><img src="&#47;book&#47;stroustrup.jpg" &#47;><&#47;a><&#47;div>
Let me first note that I will be referring to the current C++ standard from 1998 (with a minor revision in 2003). This standard is described in <a href="&#47;book&#47;link.php?id=stroustrup">The C++ Programming Language<&#47;a> by <a href="http:&#47;&#47;www2.research.att.com&#47;~bs&#47;">Bjarne Stroustrup<&#47;a>. It can also be found <a href="ftp:&#47;&#47;ftp.research.att.com&#47;pub&#47;c++std&#47;WP&#47;CD2&#47;">online<&#47;a>.

In C++, the <i>integer types<&#47;i> are <span class="sputcode">short int<&#47;span>, <span class="sputcode">int<&#47;span>, <span class="sputcode">long int<&#47;span> and the unsigned versions of these. The integer types together with the boolean type (<span class="sputcode">bool<&#47;span>) and the character types (plain&#47;<span class="sputcode">signed<&#47;span>&#47;<span class="sputcode">unsigned<&#47;span> <span class="sputcode">char<&#47;span> and <span class="sputcode">wchar_t<&#47;span>) are called <i>integral types<&#47;i>. The integral types together with the floating-point types (<span class="sputcode">float<&#47;span>, <span class="sputcode">double<&#47;span>, and <span class="sputcode">long double<&#47;span>) are called <i>arithmetic types<&#47;i>.

<h3>Resolving the Return Type<&#47;h3>

Consider having the function <span class="sputcode">fct<&#47;span> overloaded with one function for each arithmetic type, for example:
<pre class="sputcode">
void fct(short v)          { std::cout << "short "          << v << std::endl; }
void fct(unsigned short v) { std::cout << "unsigned short " << v << std::endl; }
void fct(int v)            { std::cout << "int "            << v << std::endl; }
void fct(unsigned v)       { std::cout << "unsigned "       << v << std::endl; }
...
<&#47;pre>
and so on. If you now have the following little routine:
<pre class="sputcode">
void g(short int a, char b) {
  fct(a + b);
}
<&#47;pre>
which instance of <span class="sputcode">fct<&#47;span> is called? This is another way of asking the question that started this article.

When a binary operator (<span class="sputcode">+<&#47;span>, <span class="sputcode">-<&#47;span>, <span class="sputcode">*<&#47;span>, <span class="sputcode">&#47;<&#47;span>, <span class="sputcode">%<&#47;span>) is applied to operands with arithmetic types, the C++ compiler must do the following:
<ul>
<li><b>Integral promotion<&#47;b>. Each operand is, if necessary, promoted to at least an <span class="sputcode">int<&#47;span> (to be made more precise below).<&#47;li>
<li><b>Usual arithmetic conversions<&#47;b>. Based on the (possibly promoted) types of the operands, a common type is found. Both operands are converted to this type, which will also be the resulting type.<&#47;li>
<&#47;ul>

<h3>Integral Promotions<&#47;h3>

Integral promotions are defined in Section 4.5, page 4-3, from the <a href="ftp:&#47;&#47;ftp.research.att.com&#47;pub&#47;c++std&#47;WP&#47;CD2&#47;">online standard<&#47;a> and in Section C.6.1, page 833, from <a href="&#47;book&#47;link.php?id=stroustrup">The C++ Programming Language<&#47;a>. If we ignore enumerations and bit-fields, they can be summed up as follows:
<ul>
<li>A <span class="sputcode">char<&#47;span>, <span class="sputcode">signed char<&#47;span>, <span class="sputcode">signed char<&#47;span>, <span class="sputcode">short int<&#47;span>, <span class="sputcode">unsigned short int<&#47;span> is converted to <span class="sputcode">int<&#47;span> if <span class="sputcode">int<&#47;span> can represent all the values of the source type; otherwise, it is converted to an <span class="sputcode">unsigned int<&#47;span>.<&#47;li>
<li><span class="sputcode">wchar_t<&#47;span> is converted to the first of the following types that can represent all the values of <span class="sputcode">wchar_t<&#47;span>: <span class="sputcode">int<&#47;span>, <span class="sputcode">unsigned int<&#47;span>, <span class="sputcode">long<&#47;span>, <span class="sputcode">unsigned long<&#47;span>.<&#47;li>
<li><span class="sputcode">bool<&#47;span> is converted to <span class="sputcode">int<&#47;span>.<&#47;li>
<&#47;ul>

<h3>Usual Arithmetic Conversions<&#47;h3>

The rules for usual arithmetic conversions can be found in Section 5, page 5-2, from the <a href="ftp:&#47;&#47;ftp.research.att.com&#47;pub&#47;c++std&#47;WP&#47;CD2&#47;">online standard<&#47;a> and in Section C.6.3, page 836, from <a href="&#47;book&#47;link.php?id=stroustrup">The C++ Programming Language<&#47;a>. Assuming integral promotions have been performed (if needed), the usual arithmetic conversions are in essense the following:
<ul>
<li>If one operand is a <span class="sputcode">long int<&#47;span> and the other <span class="sputcode">unsigned int<&#47;span>, then if a <span class="sputcode">long int<&#47;span> can represent all the values of an <span class="sputcode">unsigned int<&#47;span>, the <span class="sputcode">unsigned int<&#47;span> shall be converted to a <span class="sputcode">long int<&#47;span>; otherwise both operands shall be converted to <span class="sputcode">unsigned long int<&#47;span>.<&#47;li>
<li>Otherwise, find the highest ranking type among the operands and convert the other operand to this type. The relevant types listed from high to low rank are: <span class="sputcode">long double<&#47;span>, <span class="sputcode">double<&#47;span>, <span class="sputcode">float<&#47;span>, <span class="sputcode">unsigned long<&#47;span>, <span class="sputcode">long<&#47;span>, <span class="sputcode">unsigned<&#47;span>, <span class="sputcode">int<&#47;span>.<&#47;li>
<&#47;ul>

<h3>Using Templates To Get The Type<&#47;h3>

Those were the rules in written form. Imagine now that we have, e.g., the following routine:
<pre class="sputcode">
template <typename A, typename B>
<i>some-type<&#47;i> add(const A& a, const B& b) { return a + b; }
<&#47;pre>
We would like the types of <span class="sputcode">add(a, b)<&#47;span> and <span class="sputcode">a + b<&#47;span> to be identical when both <span class="sputcode">a<&#47;span> and <span class="sputcode">b<&#47;span> are arithmetic types.

First, promotions. By default, a type is not promoted:
<pre class="sputcode">
template <typename T>
struct promote { typedef T type; };
<&#47;pre>
We then use template specializations for the types that need to be promoted. Some of these are easy:
<pre class="sputcode">
template <>
struct promote<signed short> { typedef int type; };
template <>
struct promote<bool> { typedef int type; };
<&#47;pre>
For the rest, we need a sort of if-then-else for choosing a type:
<pre class="sputcode">
template <bool C, typename T, typename F>
struct choose_type { typedef F type; };
template <typename T, typename F>
struct choose_type<true, T, F> { typedef T type; };
<&#47;pre>
So the boolean value of the first argument determines whether to choose the type <span class="sputcode">T<&#47;span> (if true) or <span class="sputcode">F<&#47;span> (if false). We now have:
<pre class="sputcode">
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
<&#47;pre>
This last one for plain <span class="sputcode">char<&#47;span> is needed because C++ considers <span class="sputcode">char<&#47;span>, <span class="sputcode">signed char<&#47;span>, and <span class="sputcode">unsigned char<&#47;span> to be three distinct types. The standard does not specify whether <span class="sputcode">char<&#47;span> is signed or not. (The <span class="sputcode">numeric_limits<&#47;span> template is defined in the <span class="sputcode">limits<&#47;span> header.)

Finally, to promote <span class="sputcode">wchar_t<&#47;span>:
<pre class="sputcode">
template <>
struct promote<wchar_t> {
  typedef choose_type<
            std::numeric_limits<wchar_t>::is_signed,
            choose_type<sizeof(wchar_t) <= sizeof(int), int, long>::type,
            choose_type<sizeof(wchar_t) <= sizeof(int), unsigned, unsigned long>::type
          >::type type;
};
<&#47;pre>

We can now turn to the usual arithmetic conversions. First, we promote each type, if necessary:
<pre class="sputcode">
template <typename A, typename B>
struct resolve_uac : public resolve_uac2<typename promote<A>::type,
                                         typename promote<B>::type> {};
<&#47;pre>
This ensures that the type arguments for <span class="sputcode">resolve_uac2<&#47;span> are at least <span class="sputcode">int<&#47;span>s. We then introduce ranks for those types:
<pre class="sputcode">
template <typename T> struct type_rank;
template <> struct type_rank<int>           { static const int rank = 1; };
template <> struct type_rank<unsigned>      { static const int rank = 2; };
template <> struct type_rank<long>          { static const int rank = 3; };
template <> struct type_rank<unsigned long> { static const int rank = 4; };
template <> struct type_rank<float>         { static const int rank = 5; };
template <> struct type_rank<double>        { static const int rank = 6; };
template <> struct type_rank<long double>   { static const int rank = 7; };
<&#47;pre>
Now we can pick the type with the highest rank:
<pre class="sputcode">
template <typename A, typename B>
struct resolve_uac2 {
  typedef typename choose_type<
            type_rank<A>::rank >= type_rank<B>::rank, A, B
          >::type return_type;
};
<&#47;pre>
Finally we need to deal with the special case where one type is <span class="sputcode">long int<&#47;span> and the other is <span class="sputcode">unsigned int<&#47;span>:
<pre class="sputcode">
template <>
struct resolve_uac2<long, unsigned> {
  typedef choose_type<sizeof(long) == sizeof(unsigned),
                      unsigned long, long>::type return_type;
};
template <>
struct resolve_uac2<unsigned, long> : public resolve_uac2<long, unsigned> {};
<&#47;pre>
We can now write the <span class="sputcode">add<&#47;span> routine from earlier as:
<pre class="sputcode">
template <typename A, typename B>
typename resolve_uac<A, B>::return_type add(const A& a, const B& b)
{ return a + b; }
<&#47;pre>
and the return type will match that of the <span class="sputcode">+<&#47;span> operation. Note that the arguments to <span class="sputcode">add<&#47;span> have to be arithmetic types (because of the <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Substitution_failure_is_not_an_error">substitution-failure-is-not-an-error<&#47;a> principle).

<h3>Remarks<&#47;h3>

The rules and implementation above should be complete with the exception of enumerations and bit-fields, see the links to the standard for the missing pieces. Note also that the rules for promotions and usual arithmetic conversions will change (slightly) in the upcoming C++0x standard, see the <a href="http:&#47;&#47;www.open-std.org&#47;jtc1&#47;sc22&#47;wg21&#47;docs&#47;papers&#47;2010&#47;n3092.pdf">C++0x draft<&#47;a>, Section 5, page 84.
