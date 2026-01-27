---
date: 2026-01-27T14:54Z
crossPosting:
  bluesky: https://bsky.app/profile/janmr.com/post/3mdfza4ugts24
  mastodon: https://mathstodon.xyz/@janmr/115967634037446950
  x: https://x.com/janmarthedal/status/2016163015058460928
tags:
  - computer-science
  - multiple-precision
  - numbers
  - algorithms
---
Basic Multiple-Precision Long Division, sixth post in a series of six on multiple-precision algorithms https://janmr.com/posts/multiple-precision/06-basic-long-division/

$$
\hat{q} = \min \left( \left\lfloor \frac{u_n b + u_{n-1}}{v_{n-1}} \right\rfloor, b-1 \right)
$$
