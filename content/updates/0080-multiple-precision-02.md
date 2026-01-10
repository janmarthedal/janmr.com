---
date: 2026-01-10T12:52Z
crossPosting:
  bluesky: https://bsky.app/profile/janmr.com/post/3mc32jdcoks2s
  mastodon: https://mathstodon.xyz/@janmr/115870901679987791
  x: https://x.com/janmarthedal/status/2009972238188257527
tags:
  - computer-science
  - multiple-precision
  - numbers
  - algorithms
---
Multiple-Precision Addition, second post in a series of six on multiple-precision algorithms https://janmr.com/posts/multiple-precision/02-addition/

$$
\begin{aligned}
w_i     &\leftarrow (u_i + v_i + k_i) \;\text{mod}\; b \\
k_{i+1} &\leftarrow \lfloor (u_i + v_i + k_i)/b \rfloor
\end{aligned}
$$
