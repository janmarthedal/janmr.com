import sys
import timeit
import numpy as np
import scipy


def laplace_1d_sparse(n):
    return scipy.sparse.diags_array(
        [1, -2, 1],
        offsets=[-1, 0, 1],
        shape=(n, n)
    )


def laplace_1d_sparse2(n):
    return scipy.sparse.eye(n, k=-1) - 2 * scipy.sparse.eye(n) + scipy.sparse.eye(n, k=1)


def laplace_1d_dense(n):
    return np.eye(n, k=-1) - 2 * np.eye(n) + np.eye(n, k=1)


assert (np.array_equal(laplace_1d_dense(5), laplace_1d_sparse(5).toarray()))
assert (np.array_equal(laplace_1d_dense(5), laplace_1d_sparse2(5).toarray()))

if len(sys.argv) != 2:
    raise ValueError("Usage: python speed1d.py sparse|sparse2|dense")

method = sys.argv[1]
matrix_creator = {
    "sparse": laplace_1d_sparse,
    "sparse2": laplace_1d_sparse2,
    "dense": laplace_1d_dense
}[method]

columns = 100

rng = np.random.default_rng(seed=42)
# for n in [5, 10, 15, 20, 30, 40, 60, 80, 100, 120, 140]:
for n in [10, 20, 50, 100, 500, 1000, 2000, 5000]:
    # for n in [10, 20, 50, 100, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000]:
    L = matrix_creator(n)
    # print("Matrix format: {}".format(L.getformat()))
    v = rng.random((n, columns))

    dur = timeit.Timer(lambda: L @ v).autorange()
    print("[{},{}],".format(n, dur[1] / dur[0] / columns))
