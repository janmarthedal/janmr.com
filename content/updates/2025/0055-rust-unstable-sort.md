---
date: 2025-12-13T14:31Z
crossPosting:
  bluesky: https://bsky.app/profile/janmr.com/post/3m7usy7ouf22n
  mastodon: https://mathstodon.xyz/@janmr/115712736782512252
tags:
  - sorting
  - algorithm
  - rust
---
Test and benchmark suite for sort implementations, https://github.com/Voultapher/sort-research-rs/.

The current `slice::sort_unstable` implementation of the Rust standard library is based on `ipnsort`
https://github.com/Voultapher/sort-research-rs/blob/main/writeup/ipnsort_introduction/text.md
https://doc.rust-lang.org/1.92.0/std/primitive.slice.html#method.sort_unstable

[![github:Voultapher/sort-research-rs](https://gh-card.dev/repos/Voultapher/sort-research-rs.svg)](https://github.com/Voultapher/sort-research-rs/)