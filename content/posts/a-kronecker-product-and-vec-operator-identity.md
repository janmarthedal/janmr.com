---
title: A Kronecker Product and Vec Operator Identity
date: '2024-04-26'
layout: page
tags:
  - kronecker-product
  - vec-operator
categories:
  - numerical-analysis
excerpt: Let us prove an identity involving the Kronecker product and the vec operator.
redirect: /blog/2024/04/a-kronecker-product-and-vec-operator-identity/
---
Let $A$ be a $q \times n$ matrix and $B$ a $p \times m$ matrix.
The Kronecker product $A \otimes B$ is then a $pq \times nm$ matrix defined as

$$
A \otimes B = \begin{bmatrix}
  A_{11} B & \cdots & A_{1n} B \\
  \vdots & \ddots & \vdots \\
  A_{q1} B & \cdots & A_{qn} B
\end{bmatrix}
$$

($A_{ij}$ denotes the element in the $i$th row and $j$th column of $A$).

Furthermore, the $\operatorname{vec}$ operator is defined as stacking the columns of a matrix into a single column vector.
For example, if $X$ is a $m \times n$ matrix, then $\operatorname{vec}(X)$ is a $mn \times 1$ column vector:

$$
\operatorname{vec}(X) = \begin{bmatrix}
  X_{:,1} \\
  X_{:,2} \\
  \vdots \\
  X_{:,n}
\end{bmatrix},
$$

where $X_{:,k}$ denotes the $k$th column of $X$.

We will now prove the following identity:

$$
(A \otimes B) \operatorname{vec}(X) = \operatorname{vec}(B X A^T).
$$

First, we rewrite the $k$th column of $B X A^T$ as

$$
\begin{aligned}
(B X A^T)_{:,k} &= B X (A_{k,:})^T = B \sum_{i=1}^n A_{k,i} X_{:,i} \\
&= \begin{bmatrix}
  A_{k,1} B \; A_{k,2} B \; \cdots \; A_{k,n} B
\end{bmatrix}
\begin{bmatrix}
  X_{:,1} \\
  X_{:,2} \\
  \vdots \\
  X_{:,n}
\end{bmatrix} \\
&= \big( A_{k,:} \otimes B \big) \operatorname{vec}(X)
\end{aligned}
$$
for $k=1,\ldots,q$.

Now we just need to assemble the result:

$$
\operatorname{vec}(B X A^T)
= \begin{bmatrix}
  (B X A^T)_{:,1} \\
  (B X A^T)_{:,2} \\
  \vdots \\
  (B X A^T)_{:,q}
\end{bmatrix}
= \begin{bmatrix}
  A_{1,:} \otimes B \\
  A_{2,:} \otimes B \\
  \vdots \\
  A_{q,:} \otimes B
\end{bmatrix} \operatorname{vec}(X)
= (A \otimes B) \operatorname{vec}(X).
$$

A very cool result!

Note how the identity has some useful corollaries:

$$
(I_n \otimes B) \operatorname{vec}(X) = \operatorname{vec}(B X)
$$

and

$$
(A \otimes I_m) \operatorname{vec}(X) = \operatorname{vec}(X A^T)
$$

where $I_n$ and $I_m$ are the identity matrices of size $n$ and $m$, respectively.

In the paper [The vec-permutation matrix, the vec operator and Kronecker products: a review](/refs/henderson-searle81/),
the authors point to the 1934 paper [On direct product matrices](/refs/roth34/) by W.&nbsp;E. Roth as the
origin of this identity.
They also call the identity *Roth's column lemma*, although that name does not seem to be widely used.
