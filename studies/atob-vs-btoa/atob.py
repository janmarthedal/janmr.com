import numpy as np
import scipy

def f(x, a):
    return np.power(x, a) - np.power(a, x)

for k in range(11, 27):
    a = 0.1 * k
    print("a = ", a)
    b = scipy.optimize.fsolve(f, 8/(a - 1), args=(a,))
    print("b = ", b)

