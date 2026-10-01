---
date: 2026-09-24T10:30Z
crossPosting:
  bluesky: https://bsky.app/profile/janmr.com/post/3mwb2fgjcqk2s
  mastodon: https://mathstodon.xyz/@janmr/117325551581373373
  x: https://x.com/janmarthedal/status/2103069676838244596
tags:
  - lean
  - functional
  - programming
  - book
  - online
---
Functional Programming in Lean, a free book on using Lean as a programming language https://lean-lang.org/functional_programming_in_lean/

```lean
inductive Vect (α : Type u) : Nat → Type u where
  | nil : Vect α 0
  | cons : α → Vect α n → Vect α (n + 1)

def Vect.zip : Vect α n → Vect β n → Vect (α × β) n
  | .nil, .nil => .nil
  | .cons x xs, .cons y ys => .cons (x, y) (zip xs ys)
```
