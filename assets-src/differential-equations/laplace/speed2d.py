import sys
import timeit
import numpy as np
import scipy


def laplace_1d(n):
    return scipy.sparse.eye(n, k=-1) - 2 * scipy.sparse.eye(n) + scipy.sparse.eye(n, k=1)


if len(sys.argv) != 2:
    raise ValueError("Usage: python speed1d.py 1|2")

method = sys.argv[1]
rng = np.random.default_rng(seed=42)

def check():
    L = laplace_1d(10)
    X = np.random.random(L.shape)
    Y1 = L @ X + X @ L.T
    Y2 = scipy.sparse.kronsum(L, L) @ X.reshape(-1)
    assert(np.allclose(Y1.reshape(-1), Y2))

def check2():
    n = 10
    L = laplace_1d(n)
    L1 = scipy.sparse.eye(n, k=-1) - 4 * scipy.sparse.eye(n) + scipy.sparse.eye(n, k=1)
    L2 = scipy.sparse.eye(n, k=-1) + scipy.sparse.eye(n, k=1)
    X = np.random.random((n, n))
    Y1 = L1 @ X + X @ L2.T
    Y2 = scipy.sparse.kronsum(L, L) @ X.reshape(-1)
    assert(np.allclose(Y1.reshape(-1), Y2))

check()
check2()

for n in [50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000]:
    X = rng.random((n, n))
    L = laplace_1d(n)
    # print("L nnz: ", L.nnz)
    if method == "1":
        dur = timeit.Timer(lambda: L @ X + X @ L.T).autorange()
    elif method == "2":
        X = X.reshape(-1)
        A = scipy.sparse.kronsum(L, L)
        print("A format: ", A.getformat())
        print("A nnz: ", A.nnz)
        dur = timeit.Timer(lambda: A @ X).autorange()
    elif method == "3":
        L2 = L.T.tocsr(copy=True)
        dur = timeit.Timer(lambda: L @ X + X @ L2).autorange()
    elif method == "4":
        dur = timeit.Timer(lambda: L @ X + (L @ X.T).T).autorange()
    elif method == "5":
        L1 = scipy.sparse.eye(n, k=-1) - 4 * scipy.sparse.eye(n) + scipy.sparse.eye(n, k=1)
        L2 = scipy.sparse.eye(n, k=-1) + scipy.sparse.eye(n, k=1)
        dur = timeit.Timer(lambda: L1 @ X + X @ L2.T).autorange()

    print("[{},{}],".format(n, dur[1] / dur[0]))
