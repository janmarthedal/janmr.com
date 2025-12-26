---
title: Rust and Iterator Adapters
date: 2021-01-24T12:00Z
layout: post
tags:
  - rust
categories:
  - programming
excerpt: >-
  Iterators are a big part of writing good, idiomatic Rust code. Creating an
  iterator is quite simple in that it requires you to implement the `Iterator`
  trait for a struct that holds the iterator's state. The Rust documentation
  does a good job of documenting how to do this. If we have an iterator adapter,
  that is, a function which take an `Iterator` and returns another `Iterator`,
  then Rust makes it possible to chain iterators together. But how do you
  implement your own iterator adapter and make it available as a method on any
  iterator? Here, the Rust documentation is much less explicit.
redirect: /blog/2021/01/rust-and-iterator-adapters/
---
Iterators are a big part of writing good, idiomatic Rust code. Creating an iterator is quite simple in that it requires you to implement the `Iterator` trait for a struct that holds the iterator's state. The Rust documentation does a good job of [documenting how to do this](https://doc.rust-lang.org/stable/std/iter/index.html#implementing-iterator).

If we have an [iterator adapter](https://doc.rust-lang.org/stable/std/iter/index.html#adapters), that is, a function which take an `Iterator` and returns another `Iterator`, then Rust makes it possible to chain iterators together. It could look something like

``` rust
v.iter().filter(|x| ...).map(|x| ...).collect();
```

where `filter` and `map` are iterator adapters. But how do you implement your own iterator adapter and make it available as a method on any iterator? Here, the Rust documentation is much less explicit.

As an example of how to do this, imagine we wish to implement an iterator that takes the elements from one iterator and output these elements again, but multiplied by some constant factor:

``` rust
pub struct MultiplyBy<I, T> {
    iter: I,
    factor: T,
}

impl<I, T> Iterator for MultiplyBy<I, T>
where
    I: Iterator<Item = T>,
    T: std::ops::Mul<Output = T> + Copy,
{
    type Item = T;
    fn next(&mut self) -> Option<Self::Item> {
        self.iter.next().map(|v| v * self.factor)
    }
}

impl<I, T> MultiplyBy<I, T> {
    pub fn new(iter: I, factor: T) -> Self {
        Self { iter, factor }
    }
}
```

This iterator is a bit contrived, as a simple [`map`](https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.map) would probably be a better way of doing this. But for the sake of demonstration, it will do.

The code above makes it possible for us to write

``` rust
for n in MultiplyBy::new(1..10, 5) {
    println!("{}", n);
}
```

But we would really like to be able to chain the iterator adapters together, as mentioned above. For this, we need a new trait that inherits from the `Iterator` trait:

``` rust
pub trait MultiplyByIterator<T>: Iterator<Item = T> + Sized {
    fn multiply_by(self, factor: T) -> MultiplyBy<Self, T> {
        MultiplyBy::new(self, factor)
    }
}

impl<T, I: Iterator<Item = T>> MultiplyByIterator<T> for I {}
```

Note that the [`Sized`](https://doc.rust-lang.org/std/marker/trait.Sized.html) trait is also necessary so the compiler knows the size of the new `MultiplyBy` structure.

Finally, the `multiply_by` method is made available on any `Iterator` by the `impl` block. Now, we can write

``` rust
for n in (1..10).multiply_by(5) {
    println!("{}", n);
}
```

which is a lot more readable.
