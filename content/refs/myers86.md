---
layout: reference
title: An O(ND) Difference Algorithm and Its Variations
authors:
  - Eugene W. Myers
tags:
  - classic
  - computer-science
  - algorithms
  - online
links:
  - name: PDF
    url: http://www.xmailserver.org/diff2.pdf
---
Presents an efficient algorithm for computing the longest common subsequence and shortest edit script between two sequences. The algorithm runs in O(ND) time, where N is the sum of the sequence lengths and D is the size of the minimum edit script. This is the algorithm underlying the Unix diff utility.
