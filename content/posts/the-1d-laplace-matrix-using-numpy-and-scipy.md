---
title: The 1D Laplace Matrix Using NumPy and SciPy
date: '2024-04-28'
layout: page
tags:
  - laplace-matrix
  - numpy
  - scipy
categories:
  - numerical-analysis
excerpt: >-
  Let us consider the matrix representation of the Laplace operator in one
  dimension and how to create it using NumPy and SciPy. Furthermore, we compare
  the dense and sparse matrix representations for matrix-matrix multiplication.
mastodon: 'https://mathstodon.xyz/@janmr/112348997048554139'
redirect: /blog/2024/04/the-1d-laplace-matrix-using-numpy-and-scipy/
---
Let us consider the $n \times n$ matrix representation of the Laplace operator in one dimension,
as introduced in the post
[Finite Difference Discretization of the 1D Laplace Operator](/posts/finite-difference-discretization-of-1d-laplace/):

$$
\begin{bmatrix}
-2 & 1 & 0 & \cdots & 0 \\
1 & -2 & 1 & \cdots & 0 \\
0 & 1 & -2 & \cdots & 0 \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
0 & 0 & 0 & \cdots & -2
\end{bmatrix}
$$

(we ignore the $1/h^2$ factor for simplicity).

If we want to create this matrix using [NumPy](https://numpy.org), we can use:

```python
L = np.eye(n, k=-1) - 2 * np.eye(n) + np.eye(n, k=1)
```

where the `k` argument specifies the diagonal offset.

Note that this matrix representation is *dense*, meaning that each of the $n^2$ elements is
stored explicitly, and in case of a matrix-vector multiplication, all $n^2$ elements are accessed.
In the case of the Laplace matrix, this is highly inefficient, as roughly $3n$ elements are non-zero.

We therefore turn to [SciPy](https://scipy.org)'s sparse matrix representations and create the
Laplace matrix using
[`scipy.sparse.eye`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.eye.html):

```python
L =     scipy.sparse.eye(n, k=-1) \
  - 2 * scipy.sparse.eye(n) \
  +     scipy.sparse.eye(n, k=1)
```

On my machine this creates a sparse matrix in the *Compressed Sparse Row (CSR)* format
(stores an array of column indeces and value items for each row of the matrix).
Note that SciPy supports several other [sparse matrix](https://docs.scipy.org/doc/scipy/tutorial/sparse.html)
formats and the output format is implementation-dependent, unless explicitly specified.

Another way to create the Laplace matrix is to use
[`scipy.sparse.diags_array`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.diags_array.html):

```python
L = scipy.sparse.diags_array(
        [1, -2, 1],
        offsets=[-1, 0, 1],
        shape=(n, n)
    )
```

On my machine this creates a sparse matrix in the *diagonal storage format*
(stores one or more arrays of values relative to the main diagonal).

Which matrix format should be used for the Laplace matrix?
As mentioned above, the dense format contains mostly zeros and is therefore inefficient, at least for large $n$.
The sparse formats are much more (space) efficient, but sparse matrices do come with some extra overhead.
Furthermore, the most useful sparse format depends on the specific operation(s) to be performed.

Figure 1 below shows times spent on matrix-matrix multiplication, where the left-hand operand was a dense
or sparse Laplace matrix and the right-hand operand was a dense matrix containing 100 columns of random values.

<figure>
  <img src="/media/wave-eqn/laplace-dense-sparse.svg" class="img-responsive" alt="Dense vs sparse laplace matrix-matrix multiplication for small n">
  <figcaption><strong>Figure 1.</strong> Dense vs sparse matrix-matrix multiplication for small n.</figcaption>
</figure>

The figure shows that dense matrix-matrix multiplication is faster than sparse matrix-matrix multiplication
for small $n$.
Both sparse formats will eventually be faster, but the break-even points depend on the specific machine and
library versions used.

Figure 2 compares the two sparse matrix representations for larger $n$.
It is here clear that the CSR format is significantly faster than the diagonal storage format for matrix-matrix
multiplication.

<figure>
  <img src="/media/wave-eqn/laplace-sparse-x2.svg" class="img-responsive" alt="Laplace matrix-matrix multiplication using two different sparse representations">
  <figcaption><strong>Figure 2.</strong> Laplace matrix-matrix multiplication using two different sparse representations.</figcaption>
</figure>
