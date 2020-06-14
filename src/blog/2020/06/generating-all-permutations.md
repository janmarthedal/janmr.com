---
title: Generating All Permutations
date: '2020-06-14'
layout: post
tags:
  - combinatorics
  - permutations
  - algorithms
  - python
  - rust
  - post
excerpt: Python and Rust library routines for generating all permutations of a list of objects is mentioned, as well as an algorithm for lexicographic r-permutation generation (in both pseudo and Rust code)
---
Sometimes you would like to loop through all the different arrangements/permutations of a list of objects. For instance, all permutations of {A, B, C, D} are

> ABCD, ABDC, ACBD, ACDB, ADBC, ADCB, BACD, BADC, BCAD, BCDA, BDAC, BDCA, CABD, CADB, CBAD, CBDA, CDAB, CDBA, DABC, DACB, DBAC, DBCA, DCAB, DCBA

(There are $n!$ such permutations of an $n$-element set.) These permutations were furthermore listed in [lexicographical order](https://en.wikipedia.org/wiki/Lexicographical_order). This is what Python's [itertools.permutations](https://docs.python.org/3/library/itertools.html#itertools.permutations) iterator produces. The documentation also lists Python code that produces output equal to what the library code does.

The Python iterator also makes it possible to generate all *r*-permutations of an *n*-element set ($0 \leq r \leq n$). For instance, all 2-permutations of {A, B, C, D} are

> AB, AC, AD, BA, BC, BD, CA, CB, CD, DA, DB, DC

(There are $n!/(n - r)!$ such *r*-permutations of an *n*-element set.)

The Rust crate [itertools](https://crates.io/crates/itertools) has a similar method [permutations](https://docs.rs/itertools/0.9.0/itertools/trait.Itertools.html#method.permutations) that produces *r*-permutations.

Common for the underlying methods above is that they are basically rearranging indices, without taking the actual list elements into account. For instance, the permutations of {1, 2, 2, 3} (a [multiset](https://en.wikipedia.org/wiki/Multiset)) become

> 1223, 1232, 1223, 1232, 1322, 1322, 2123, 2132, 2213, 2231, 2312, 2321, 2123, 2132, 2213, 2231, 2312, 2321, 3122, 3122, 3212, 3221, 3212, 3221

which may not be what you want (since each arrangement appears twice).

In [The Art of Computer Programming, Volume 4A](https://en.wikipedia.org/wiki/Special:BookSources?isbn=978-0201038040), Section 7.2.1.2, Donald E. Knuth lists an algorithm which does take equality into account and would produce the expected

> 1223, 1232, 1322, 2123, 2132, 2213, 2231, 2312, 2321, 3122, 3212, 3221

Furthermore, in the answer to the exercises for the same section, he shows an algorithm which respects both equality and is able to produce *r*-permutations. The algorithm can be described as follows:

**Lexicographic *r*-permutation generation**. Given a sequence of *n* elements $a_0, a_1, \ldots, a_{n-1}$ initially sorted so that

$$
a_0 \leq a_1 \leq \cdots \leq a_{n-1}
$$

and a number $r$, $1 \leq r \leq n$, this algorithm generates all *r*-permutations, visiting them in lexicographic order.

 1. Visit the *r*-permutation $(a_0, \ldots, a_{r-1})$.
 2. If $a_{r-1} < a_{n-1}$, then swap $a_{r-1} \leftrightarrow a_j$, where $j \geq r$ is the smallest subscript such that $a_{r-1} < a_j$, and go to Step 1.
 3. Reverse the subsequence $(a_r, \ldots, a_{n-1})$.
 4. Find the greatest subscript $j < r$ such that $a_{j-1} < a_j$. If no such subscript exists, terminate the algorithm. Otherwise find the greatest subscript $l$ such that $a_l > a_{j-1}$ and swap $a_{j-1} \leftrightarrow a_l$.
 5. Reverse the subsequence $(a_j, \ldots, a_{n-1})$ and return to Step 1.&emsp;&#9724;

Since the elements need to be compared to each other, a restriction must be put on the elements. In Rust, the requirement needed for the elements is the [Ord trait](https://doc.rust-lang.org/std/cmp/trait.Ord.html) (total order). [An implementation in Rust](https://github.com/janmarthedal/snippets/blob/master/rust/generate/permutations/src/lib.rs) can be found in my snippets repository.
