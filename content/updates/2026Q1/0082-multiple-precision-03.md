---
date: 2026-01-13T14:21Z
crossPosting:
  bluesky: https://bsky.app/profile/janmr.com/post/3mccqupxecs2s
  mastodon: https://mathstodon.xyz/@janmr/115888234592112995
  x: https://x.com/janmarthedal/status/2011081456177856796
tags:
  - computer-science
  - multiple-precision
  - numbers
  - algorithms
---
Multiple-Precision Subtraction, third post in a series of six on multiple-precision algorithms https://janmr.com/posts/multiple-precision/03-subtraction/

$$
\begin{aligned}
w_i     &\leftarrow (u_i - v_i - k_i) \;\text{mod}\; b, \\
k_{i+1} &\leftarrow [u_i < v_i + k_i]
\end{aligned}
$$
