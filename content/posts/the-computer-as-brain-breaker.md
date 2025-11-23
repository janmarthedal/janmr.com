---
title: The Computer as Brain Breaker
date: '2024-04-25'
layout: page
tags:
  - computer-science
  - rust
categories:
  - programming
excerpt: >-
  At our house we have a game called Brain Breaker. To play the game one person
  (the codemaker) sets up a secret code of four colored pegs, having five
  different colors to choose from for each peg. The other person (the
  codebreaker) then tries to guess the code using as few guesses as possible,
  using only feedback provided by the codemaker.
mastodon: 'https://mathstodon.xyz/@janmr/112330701367106701'
redirect: /blog/2024/04/the-computer-as-brain-breaker/
---
At our house we have a game called Brain Breaker.
To play the game one person (the *codemaker*) sets up a secret code of four colored pegs,
having five different colors to choose from for each peg.
The other person (the *codebreaker*) then tries to guess the code using as few guesses as possible,
using only feedback provided by the codemaker.

To be more precise, after the codemaker has chosen a secret code, a game follows these steps:
1. The codebreaker guesses a combination by placing four pegs in a row.
2. The codemaker provides feedback by placing purple pegs for each correct color in the correct position and
   pink pegs for each correct color in the wrong position (and where neither peg has been used for another match).
3. If the codebreaker guessed correctly - four purple pegs - the game is over with the codebreaker as the winner.
   If the guess was not correct and 10 guesses has been used, the game is over with the codemaker as the winner.
   Otherwise, the game proceeds at step&nbsp;1.

<figure>
  <img src="/media/brainbreaker.jpg" class="img-responsive" alt="A brain breaker game in progress">
  <figcaption><strong>Figure 1.</strong> A brain breaker game in progress.</figcaption>
</figure>

The number of possible codes is $5^4 = 625$.
A variant of this game is also known as [Mastermind](https://en.wikipedia.org/wiki/Mastermind_(board_game)),
where six colors are available to choose from ($6^4 = 1296$ combinations).

The specification of how to provide the feedback for a guess (step 2 above) is actually a bit tricky
to express clearly using words only.
The purple pegs are straightforward:
One purple peg for each peg that has the correct color in the correct position.
Now for the remaining pegs, that are not part of a purple match,
let $d_c$ be the number of code pegs that have color $c$ and let $g_c$ be the number of guess pegs that have color $c$.
Then the number of pink pegs is $\sum_c \min(d_c, g_c)$.

Here are examples for each purple/pink combination with four pegs and colors `1`, `2`, `3`, `4`, and `5`:

|  Code  | Guess  | Purple | Pink |
|--------|--------|--------|------|
| `2211` | `4553` | 0 | 0 |
| `2523` | `4451` | 0 | 1 |
| `3254` | `1143` | 0 | 2 |
| `3532` | `5313` | 0 | 3 |
| `1523` | `3215` | 0 | 4 |
| `1125` | `3545` | 1 | 0 |
| `1423` | `2221` | 1 | 1 |
| `1252` | `2132` | 1 | 2 |
| `2131` | `1321` | 1 | 3 |
| `1432` | `2532` | 2 | 0 |
| `1511` | `1451` | 2 | 1 |
| `4532` | `3542` | 2 | 2 |
| `2231` | `5231` | 3 | 0 |
| `2231` | `2231` | 4 | 0 |

Note how 3 purple and 1 pink is not possible (no matter how many colors are being used).

Let us now consider how to implement a computer program that plays the game.
Initially, we will have a pool of all possible codes.
In the case of four pegs and five colors the pool will contain $5^4=625$ codes.
As soon as we have a guess and the feedback, we can remove all codes from the pool that would not give the same feedback.

The strategy now is to make a guess that *minimizes* the *maximum pool size* after any possible feedback.
Or, in (somewhat strange) psuedo code:

```python
for guess in all_possible_guesses:
    for code in current_pool:
        compute_feedback(guess, code)
    group_codes_by_feedback
    find_the_maximum_group_size
return the_guess_that_minimizes_the_maximum_group_size
```

This [minimax](https://en.wikipedia.org/wiki/Minimax) strategy is guaranteed to find the correct code
in at most five guesses (4.07 on average) for the four pegs and five colors case.
It will also find the correct code in at most five guesses (4.57 on average) for the Mastermind case
(four pegs and six colors).
This latter case was also analyzed by Donald Knuth in 1976 in his
paper [The Computer as Master Mind](/refs/knuth-mastermind76).

Note how, interestingly, the best guess is not always part of the current pool of possible codes.
This means that making a guess outside the current pool is sometimes worth it to shrink the pool as much as possible.

Some minor optimizations can be made to the above strategy:
1. If the pool is down to just two codes, we just guess one of them (here we don't want to make a guess outside the pool).
2. If multiple guesses have the same maximum group size, we choose the one that has the smallest average pool size.

Both of these will reduce the average number of guesses needed to find the correct code, but not the worst case.

A possible gameplay could be:
- Guess `1123` (pool size 625). Feedback: 2 purple, 1 pink.
- Guess `1242` (pool size 30). Feedback: 2 purple, 0 pink.
- Guess `1115` (pool size 4). Feedback: 1 purple, 1 pink.
- Guess `1253` (pool size 1). Feedback: 4 purple, 0 pink.

A Rust program that implements the above strategy is [available on GitHub](https://github.com/janmarthedal/mastermind).
