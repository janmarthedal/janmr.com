import time
import numpy as np
from scipy.integrate import solve_ivp
from scipy.sparse import dia_matrix
import matplotlib.pyplot as plt

def get_test_data(delta=0.05):
    x = y = np.arange(-1.0, 1.0, delta)
    X, Y = np.meshgrid(x, y)
    R = np.sqrt((X - 0.2)**2 + (Y - 0.1)**2)
    Z = np.exp(-R**2) * np.cos(4 * R) * (1 - X**2) * (1 - Y**2)
    return X, Y, Z

def laplace_stencil_1d(n, h):
    data = np.outer([1, -2, 1], np.ones(n))
    offsets = np.array([-1, 0, 1])
    L = dia_matrix((data, offsets), shape=(n, n)) / h**2
    return L.toarray()

def laplace_stencil_2d(m, n, h):
    A1d = laplace_stencil_1d(m, h)
    B1d = laplace_stencil_1d(n, h)
    return np.kron(np.eye(n), A1d) + np.kron(B1d, np.eye(m))

def dydt(_, y, Sm, Sn):
    m = Sm.shape[0]
    n = Sn.shape[0]
    v = y[:m*n].reshape(m, n)
    vt = y[m*n:]
    return np.concatenate((vt, (Sm @ v + v @ Sn.T).reshape(-1)))

h = 0.02
X, Y, Z = get_test_data(h)

Zinner = Z[1:-1, 1:-1]
m, n = Zinner.shape

Sm = laplace_stencil_1d(m, h)
Sn = laplace_stencil_1d(n, h)
v = Zinner.reshape(-1)
vt = np.zeros_like(v)
y0 = np.concatenate((v, vt))

sample_times = np.linspace(0, 4, 100)
time_span = [sample_times[0], sample_times[-1]]

start_time = time.time()
R = solve_ivp(dydt, time_span, y0, t_eval=sample_times, args=(Sm, Sn))
print("solve_ivp time: {:.2f} seconds".format(time.time() - start_time))

# with plt.ion():
fig = plt.figure()
fig.set_size_inches(20, 20)
ax = fig.add_subplot(projection='3d')
for i in range(0, R.y.shape[1], 1):
    print("t = {:.2f}".format(R.t[i]))
    Z[1:-1, 1:-1] = R.y[:m*n, i].reshape(m, n)
    ax.set_zlim(-1, 1)
    ax.set_axis_off()
    ax.plot_wireframe(X, Y, Z, rstride=10, cstride=10, linewidth=4, antialiased=True)
    plt.savefig("wave{:03}.png".format(i + 1), bbox_inches='tight')
    # plt.pause(1)
    ax.clear()

# ffmpeg -framerate 4 -i wave%03d.png -c:v libx264 -r 25 -vf "crop=4/5*in_w:1/2*in_h" -pix_fmt yuv420p output.mp4
