---
layout: post
title: Going Functional
author: Jan Marthedal Rasmussen
date: 2011-05-31 13:55:51.000000000 +02:00
categories:
- programming
tags:
- functional programming
- erlang
- lisp
- ml
---
[Imperative programming](http://en.wikipedia.org/wiki/Imperative_programming) languages&mdash;such as C++, Java, Perl and assembly&mdash;are by far the [most common](http://www.langpop.com). They all lie fairly close to the underlying computer architecture by executing one statement at a time, changing a state along the way. They describe *how* to compute something.

Purely functional languages&mdash;such as [Erlang](http://www.erlang.org/) and [Haskell](http://www.haskell.org)&mdash;have no state, only values, expressions and functions. All variables are [immutable](http://en.wikipedia.org/wiki/Mutable), that is, when a value has been assigned to a variable, it can never change. Purely functional programming languages describe *what* to compute, but not explicitly how.<span></span>

Non-pure [functional programming](http://en.wikipedia.org/wiki/Functional_programming) languages have features from both imperative and purely functional languages. A typical feature of functional programming languages, pure or not, is that functions are often considered values in their own right. This leads to [higher-order functions](http://en.wikipedia.org/wiki/Higher-order_function) which basically are functions that operate on other functions. Actually, [JavaScript](http://en.wikipedia.org/wiki/JavaScript) is considered a functional programming language [by some](http://www.blinkx.com/watch-video/douglas-crockford-on-functional-javascript/xscZz8XhfuNQ_aaVuyUB2A) because of its ability to treat functions as values.

<div class="pull-right"><a href="{% amazon paulson %}"><img src="{% bookcover paulson %}" /></a></div>
I find functional programming languages very interesting. First of all, pure functional programming languages have a certain, well, purity to them. Secondly, they force you to think differently about programming, and this can be a healthy thing. Let me introduce three of the functional programming languages that I have come across.

The first functional programming language I ever encountered was [Standard ML](http://en.wikipedia.org/wiki/Standard_ML) (actually, we used a light-weight implementation called [Moscow ML](http://www.itu.dk/~sestoft/mosml.html)). It enables assignments and is thus not pure. It features, among other things, type inference which is very nice. For instance, an exponentation function `power` could have the type

{% highlight sml %}
val power = fn : real * int -> real
{% endhighlight %}

Similarly, a `map` function which applies a user-supplied function to each element of a list could get the type

{% highlight sml %}
val map = fn : ('a -> 'b) -> 'a list -> 'b list
{% endhighlight %}

<div class="pull-right"><a href="{% amazon erlang %}"><img src="{% bookcover erlang %}" /></a></div>
This means that `map` takes as input a function (mapping an element of type `a'` to an element of type `b'`) and outputs a new function. This output function can then convert a list of type `a'` elements to a list of type `b'` elements. This is powerful stuff.

Erlang is a pure functional programming language. It is often praised for being well-suited for large-scale, distributed and fault-tolerant applications. For instance, the very cool [NoSQL](http://en.wikipedia.org/wiki/NoSQL) database system [CouchDB](http://couchdb.apache.org/) is written in Erlang. Apart from having [pattern matching](http://en.wikipedia.org/wiki/Pattern_matching), which is common for functional programming languages, Erlang also features so-called guards, which are patterns with additional conditions. Consider the following Erlang code snippet ([source](http://www.erlang.org/doc/getting_started/seq_prog.html)):

{% highlight erlang %}
list_max([Head|Rest]) -> list_max(Rest, Head).

list_max([], Res)                    -> Res;
list_max([Head|Rest], Result_so_far)
           when Head > Result_so_far -> list_max(Rest, Head);
list_max([Head|Rest], Result_so_far) -> list_max(Rest, Result_so_far).
{% endhighlight %}

<div class="pull-right">
  <a href="{% amazon sicp %}"><img src="{% bookcover sicp %}" /></a>
</div>
The guard here is the `when Head ...` part.

I was recently introduced to [Lisp](http://en.wikipedia.org/wiki/Lisp_(programming_language)) through the classic book <a href="{% amazon sicp %}">Structure and Interpretation of Computer Programs</a>. Actually, that book treats [MIT Scheme](http://groups.csail.mit.edu/mac/projects/scheme/), one of many flavours of Lisp. The syntax and semantics of Lisp is extremely simple and (almost) everything is composed by parentheses, identifiers and white-space. Reading Lisp code takes some getting used to, consider, e.g., the following function definition:

{% highlight scheme %}
(define (fib n) (cond ((= n 0) 0) ((= n 1) 1) (else (+ (fib (- n 1)) (fib (- n 2))))))
{% endhighlight %}

(Appropriate new-lines and indentation helps a great deal on the readability, though). Lisp also enables assignments and is therefore not pure. In fact, both imperative and functional programming approaches can be used.

I plan to include more on functional programming languages on this blog in the future.

