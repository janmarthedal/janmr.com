---
layout: post
status: publish
published: true
title: Going Functional
author: Jan Marthedal Rasmussen
author_login: sput
author_email: jmr@kanooth.com
author_url: http://kanooth.com/blog/
excerpt: ! "<a href=\"http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Imperative_programming\">Imperative
  programming<&#47;a> languages&mdash;such as C++, Java, Perl and assembly&mdash;are
  by far the <a href=\"http:&#47;&#47;www.langpop.com\">most common<&#47;a>. They
  all lie fairly close to the underlying computer architecture by executing one statement
  at a time, changing a state along the way. They describe <i>how<&#47;i> to compute
  something.\r\n\r\nPurely functional languages&mdash;such as <a href=\"http:&#47;&#47;www.erlang.org&#47;\">Erlang<&#47;a>
  and <a href=\"http:&#47;&#47;www.haskell.org\">Haskell<&#47;a>&mdash;have no state,
  only values, expressions and functions. All variables are <a href=\"http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Mutable\">immutable<&#47;a>,
  that is, when a value has been assigned to a variable, it can never change. Purely
  functional programming languages describe <i>what<&#47;i> to compute, but not explicitly
  how.\r\n\r\n"
wordpress_id: 2211
wordpress_url: http://sputsoft.com/blog/?p=2211
date: 2011-05-31 13:55:51.000000000 +02:00
categories:
- programming
tags:
- functional programming
- erlang
- lisp
- ml
comments:
- id: 2360
  author: Digi article blaster
  author_email: ''
  author_url: ''
  date: !binary |-
    MjAxMS0wOC0wNiAwMjozMToxMSArMDIwMA==
  date_gmt: !binary |-
    MjAxMS0wOC0wNiAwMDozMToxMSArMDIwMA==
  content: ! '<strong>Recommeneded websites...<&#47;strong>


    [...]Here are some of the sites we recommend for our visitors[...]&hellip;...'
---
<a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Imperative_programming">Imperative programming<&#47;a> languages&mdash;such as C++, Java, Perl and assembly&mdash;are by far the <a href="http:&#47;&#47;www.langpop.com">most common<&#47;a>. They all lie fairly close to the underlying computer architecture by executing one statement at a time, changing a state along the way. They describe <i>how<&#47;i> to compute something.

Purely functional languages&mdash;such as <a href="http:&#47;&#47;www.erlang.org&#47;">Erlang<&#47;a> and <a href="http:&#47;&#47;www.haskell.org">Haskell<&#47;a>&mdash;have no state, only values, expressions and functions. All variables are <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Mutable">immutable<&#47;a>, that is, when a value has been assigned to a variable, it can never change. Purely functional programming languages describe <i>what<&#47;i> to compute, but not explicitly how.

<a id="more"></a><a id="more-2211"></a>

Non-pure <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Functional_programming">functional programming<&#47;a> languages have features from both imperative and purely functional languages. A typical feature of functional programming languages, pure or not, is that functions are often considered values in their own right. This leads to <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Higher-order_function">higher-order functions<&#47;a> which basically are functions that operate on other functions. Actually, <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;JavaScript">JavaScript<&#47;a> is considered a functional programming language <a href="http:&#47;&#47;www.blinkx.com&#47;watch-video&#47;douglas-crockford-on-functional-javascript&#47;xscZz8XhfuNQ_aaVuyUB2A">by some<&#47;a> because of its ability to treat functions as values.

<div style="float:right">
  <a href="&#47;book&#47;link.php?id=paulson"><img src="&#47;book&#47;paulson.jpg" &#47;><&#47;a>
<&#47;div>

I find functional programming languages very interesting. First of all, pure functional programming languages have a certain, well, purity to them. Secondly, they force you to think differently about programming, and this can be a healthy thing. Let me introduce three of the functional programming languages that I have come across.

The first functional programming language I ever encountered was <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Standard_ML">Standard ML<&#47;a> (actually, we used a light-weight implementation called <a href="http:&#47;&#47;www.itu.dk&#47;~sestoft&#47;mosml.html">Moscow ML<&#47;a>). It enables assignments and is thus not pure. It features, among other things, type inference which is very nice. For instance, an exponentation function <span class="sputcode">power<&#47;span> could have the type
<pre class="sputcode">
val power = fn : real * int -> real
<&#47;pre>
Similarly, a <span class="sputcode">map<&#47;span> function which applies a user-supplied function to each element of a list could get the type
<pre class="sputcode">
val map = fn : ('a -> 'b) -> 'a list -> 'b list
<&#47;pre>
<div style="float:right">
  <a href="&#47;book&#47;link.php?id=erlang"><img src="&#47;book&#47;erlang.jpg" &#47;><&#47;a>
<&#47;div>
This means that <span class="sputcode">map<&#47;span> takes as input a function (mapping an element of type <span class="sputcode">a'<&#47;span> to an element of type <span class="sputcode">b'<&#47;span>) and outputs a new function. This output function can then convert a list of type <span class="sputcode">a'<&#47;span> elements to a list of type <span class="sputcode">b'<&#47;span> elements. This is powerful stuff.

Erlang is a pure functional programming language. It is often praised for being well-suited for large-scale, distributed and fault-tolerant applications. For instance, the very cool <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;NoSQL">NoSQL<&#47;a> database system <a href="http:&#47;&#47;couchdb.apache.org&#47;">CouchDB<&#47;a> is written in Erlang. Apart from having <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Pattern_matching">pattern matching<&#47;a>, which is common for functional programming languages, Erlang also features so-called guards, which are patterns with additional conditions. Consider the following Erlang code snippet (<a href="http:&#47;&#47;www.erlang.org&#47;doc&#47;getting_started&#47;seq_prog.html">source<&#47;a>):
<pre class="sputcode">
list_max([Head|Rest]) -> list_max(Rest, Head).

list_max([], Res)                    -> Res;
list_max([Head|Rest], Result_so_far)
           when Head > Result_so_far -> list_max(Rest, Head);
list_max([Head|Rest], Result_so_far) -> list_max(Rest, Result_so_far).
<&#47;pre>
<div style="float:right">
  <a href="&#47;book&#47;link.php?id=sicp"><img src="&#47;book&#47;sicp.jpg" &#47;><&#47;a>
<&#47;div>
The guard here is the <span class="sputcode">when Head ...<&#47;span> part.

I was recently introduced to <a href="http:&#47;&#47;en.wikipedia.org&#47;wiki&#47;Lisp_(programming_language)">Lisp<&#47;a> through the classic book <a href="&#47;book&#47;link.php?id=sicp">Structure and Interpretation of Computer Programs<&#47;a>. Actually, that book treats <a href="http:&#47;&#47;groups.csail.mit.edu&#47;mac&#47;projects&#47;scheme&#47;">MIT Scheme<&#47;a>, one of many flavours of Lisp. The syntax and semantics of Lisp is extremely simple and (almost) everything is composed by parentheses, identifiers and white-space. Reading Lisp code takes some getting used to, consider, e.g., the following function definition:
<pre class="sputcode">
(define (fib n) (cond ((= n 0) 0) ((= n 1) 1) (else (+ (fib (- n 1)) (fib (- n 2))))))
<&#47;pre>
(Appropriate new-lines and indentation helps a great deal on the readability, though). Lisp also enables assignments and is therefore not pure. In fact, both imperative and functional programming approaches can be used.

<div style="clear:both"><&#47;div>

I plan to include more on functional programming languages on this blog in the future.
