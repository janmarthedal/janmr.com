---
date: 2026-01-21T14:56Z
crossPosting:
  bluesky: https://bsky.app/profile/janmr.com/post/3mcwwjyj3k22s
  mastodon: https://mathstodon.xyz/@janmr/115933661657152451
  x: https://x.com/janmarthedal/status/2013988876990234948
tags:
  - computer-science
  - multiple-precision
  - numbers
  - algorithms
---
Basic Multiple-Precision Multiplication, fourth post in a series of six on multiple-precision algorithms https://janmr.com/posts/multiple-precision/04-basic-multiplication/

$$
\begin{aligned}
z_i     &\leftarrow (\alpha v_i + y_i + k_i) \;\text{mod}\; b, \\
k_{i+1} &\leftarrow \left\lfloor \frac{\alpha v_i + y_i + k_i}{b} \right\rfloor
\end{aligned}
$$
