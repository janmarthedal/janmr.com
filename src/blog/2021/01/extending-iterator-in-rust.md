---
title: Extending Iterator in Rust
date: '2021-01-10'
layout: post
tags:
  - post
  - rust
categories:
  - programming
excerpt: >-
  Chained iterator
---
Foo bar

``` rust
pub struct MultiplyBy<T, I> {
    iter: I,
    factor: T,
}

impl<T, I> Iterator for MultiplyBy<T, I>
where
    I: Iterator<Item = T>,
    T: std::ops::Mul<Output = T> + Copy,
{
    type Item = T;
    fn next(&mut self) -> Option<Self::Item> {
        self.iter.next().map(|v| v * self.factor)
    }
}

impl<T, I> MultiplyBy<T, I> {
    fn new(iter: I, factor: T) -> Self {
        Self { iter, factor }
    }
}
```

bla bla bla

``` rust
pub trait MultiplyByIterator<T>: Iterator<Item = T> + Sized {
    fn multiply_by(self, factor: T) -> MultiplyBy<T, Self> {
        MultiplyBy::new(self, factor)
    }
}

impl<T, I: Iterator<Item = T>> MultiplyByIterator<T> for I {}
```

badabing
