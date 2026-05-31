---
date: 2026-01-26T11:27Z
crossPosting:
  bluesky: https://bsky.app/profile/janmr.com/post/3mdd56zsn7224
  mastodon: https://mathstodon.xyz/@janmr/115961159215441230
  x: https://x.com/janmarthedal/status/2015748687436095636
tags:
  - euclid
  - algorithm
  - gcd
  - fibonacci
---
Euclid's algorithm for finding the greatest common divisor of two integers has its worst behavior when the input is consecutive Fibonacci numbers. This result is supposedly the first practical application of Fibonacci's sequence. https://en.wikipedia.org/wiki/Euclidean_algorithm#Algorithmic_efficiency

$$
\gcd(F_{n+2},F_{n+1}) = \gcd(F_{n+1},F_n) = \ldots = \gcd(F_3,F_2) = \gcd(2,1) = 1
$$
