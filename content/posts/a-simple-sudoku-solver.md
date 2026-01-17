---
title: A Simple Sudoku Solver
date: 2023-05-02T12:00Z
update: 2026-01-17T14:50Z
layout: post
tags:
  - rust
  - combinatorics
categories:
  - programming
excerpt: >-
  This post will describe a simple way to computationally find all solutions of
  a given Sudoku puzzle
redirect: /blog/2023/05/a-simple-sudoku-solver/
---
Sudoku is a popular puzzle and for the past 15 years or so, it has been hard to
find a newspaper that didn't contain at least one Sudoku puzzle.

The objective is to fill a 9 x 9 grid with digits such that each column, row and block
contains each of the digits from 1 to 9 (the grid is divided into 3 x 3 blocks).

Initially a partially completed grid is given and the task is to complete the Sudoku
square, following the rules above.

A puzzle could look like this:

<figure>
  <img src="/media/sudoku-med-setup.svg" class="w30" alt="A Sudoku setup">
</figure>

This post will describe a simple way to computationally find all solutions of a
Sudoku puzzle.
The method is based on [backtracking](https://en.wikipedia.org/wiki/Backtracking),
which leads to the following algorithm:

1. Find the legal digits for each empty cell in the grid
2. If there are no empty cells, write out the solution and return
3. If there is an empty cell with no legal digits then return (dead end)
4. Choose an empty cell and for each legal digit do:
   1. Place the digit in the cell and update the grid (and any state) appropriately
   2. Go to step&nbsp;1 and inspect the grid recursively
   3. Make the cell empty again (undo the changes made in step 4.1)

The legal digits for each empty cell in the grid (step 1) would look like this for
the example grid above:

<figure>
  <img src="/media/sudoku-med-cand.svg" class="w30" alt="Candidates for each free cell">
</figure>

We could maintain a set of legal digits for each empty cell and updating these sets
in step 4a would be easy.
Undoing such an update (step 4c), however, is harder.
One option would be to push the entire grid and legal digit sets onto a stack in step 4a
and then simply pop the stack in step 4c.
That requires a lot of copying, so we use another approach.

We keep a *candidate set* for each row, column and block, that stores the available digits
for each row, column and block, respectively.
For instance,
for row 4 we have $r_4=\{2,3,4,5,7,8\}$,
for column 5 we have $c_5=\{1,2,4,5,6\}$ and
for block 5 we have $b_5=\{1,2,3,4,5,7,8\}$ (counting the blocks row-wise from the
upper-left corner).
The legal digits for the cell in row 4, column 5, is now the intersection of these three
sets: $r_4 \cap c_5 \cap b_5 = \{2,4,5\}$.

These candidates sets are easy to use both when finding the legal digits for a given empty
cell in step 1 (by intersecting the appropriate row, column and block sets),
when placing a digit into an empty cell in step 4a (by removing the digit from the
appropriate row, column and block sets),
and when clearing a digit for a cell in step 4c (by adding the digit to the
appropriate row, column and block sets).

The remaining thing to figure out is which empty cell to choose in step&nbsp;4.
One option is to simply choose the first empty cell (using some ordering) or maybe
one by random.
A better choice is to pick the empty cell which has the smallest number of legal
digits.
This will keep the search tree small.

[Rust code](https://github.com/janmarthedal/sudokurs) is available that implements the
method described above.

Counting the number of times step 1 is performed is a measure of how large the search
tree is. For the sample grid shown above the count is only 97. This is a very slim
search tree, since the height of the tree is 53 (the number of empty cells).

A supposedly ["world's most difficult Sudoku"](https://abcnews.go.com/blogs/headlines/2012/06/can-you-solve-the-hardest-ever-sudoku)
was designed by the Finnish mathematician Arto Inkala. For this Sudoku the method
considers 10102 different grids while solving the puzzle, but it still solves in less
than a second on my machine (a MacBook Pro with an Apple M2 Max chip).

The repository for the Sudoku solver [Tdoku](https://github.com/t-dillon/tdoku)
also contains [a file](https://github.com/t-dillon/tdoku/blob/master/data.zip)
with many hard puzzles. Some of them result in search trees
with more than 90000 nodes, but they all solve very fast.

[The Art of Computer Programming, Volume 4B](/refs/taocp4b/), Section 7.2.2.1,
considers Sudoku puzzles along with a method for solving them and other
interesting information on these puzzles and backtracking in general.

Peter Norvig has an essay (from 2006) about [Solving Every Sudoku Puzzle](https://norvig.com/sudoku.html).
In it a simple solver in Python is described along with several test cases and results.
The hardest puzzle for his solver is in some sense not a true Sudoku puzzle in that it
has multiple solutions. It is also hard for the method described above and it goes
through more than 5.3 million nodes before finding its first solution (which matches that 
shown in the essay), but still with sub-second time.
