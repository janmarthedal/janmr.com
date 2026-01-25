---
date: 2026-01-25T11:00Z
crossPosting:
  bluesky: https://bsky.app/profile/janmr.com/post/3mdalaufkt224
  mastodon: https://mathstodon.xyz/@janmr/115955393367653601
  x: https://x.com/janmarthedal/status/2015379734977241553
tags:
  - ComputerScience
  - MultiplePrecision
  - numbers
  - algorithms
---
Basic Multiple-Precision Short Division, fifth post in a series of six on multiple-precision algorithms https://janmr.com/posts/multiple-precision/05-basic-short-division/ #ComputerScience #MultiplePrecision #numbers #algorithms

$$
\begin{aligned}
q_k &\leftarrow \lfloor (r_{k+1} b + u_k)/v \rfloor \\
r_k &\leftarrow (r_{k+1} b + u_k) \text{ mod } v
\end{aligned}
$$
