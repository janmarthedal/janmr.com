---
date: 2026-01-23T10:00Z
crossPosting:
  bluesky: 
  mastodon: 
  x: 
tags:
  - euclid
  - algorithm
  - gcd
  - fibonacci
---
Euclid's algorithm for finding the greatest common divisor of two integers has the worst behavior when the input is consecutive Fibonacci numbers. This result is said to have been the first practical application of Fibonacci numbers. https://en.wikipedia.org/wiki/Euclidean_algorithm#Algorithmic_efficiency

$$
\gcd(F_{n+2},F_{n+1}) = \gcd(F_{n+1},F_n) = \ldots = \gcd(F_3,F_2) = \gcd(2,1) = 1
$$
