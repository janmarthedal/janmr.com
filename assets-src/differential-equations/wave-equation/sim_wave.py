import matplotlib.pyplot as plt
import time
import numpy as np
import scipy

n = 199
h = 1 / (n + 1)
x = y = np.linspace(0, 1, n + 2)

X, Y = np.meshgrid(x, y)
R = np.sqrt((X - 0.45)**2 + (Y - 0.4)**2)
U = 20 * np.exp(-R**2) * np.cos(4 * R) * X * (1 - X) * Y * (1 - Y)

L = (scipy.sparse.eye(n, k=-1) - 2 * scipy.sparse.eye(n)
     + scipy.sparse.eye(n, k=1)) / h**2
D = scipy.sparse.kronsum(L, L)

u0 = U[1:-1, 1:-1].reshape(-1)
ut0 = np.zeros_like(u0)
timespan = [0, 5]
sample_times = np.linspace(*timespan, 200)

start_time = time.time()
R = scipy.integrate.solve_ivp(
    lambda _, u: np.concatenate((u[n*n:], D @ u[:n*n])),
    timespan,
    np.concatenate((u0, ut0)),
    t_eval=sample_times
)
print("solve_ivp time: {:.3f} seconds".format(time.time() - start_time))


fig = plt.figure()
fig.set_size_inches(20, 20)
ax = fig.add_subplot(projection='3d')
for i in range(0, R.y.shape[1], 1):
    print("t = {:.2f}".format(R.t[i]))
    Z = np.pad(R.y[:n*n, i].reshape(n, n), pad_width=1)
    ax.set_zlim(-1, 1)
    ax.set_axis_off()
    ax.plot_wireframe(X, Y, Z, rstride=10, cstride=10,
                      linewidth=2, antialiased=True)
    plt.savefig("wave{:03}.png".format(i + 1), bbox_inches='tight')
    ax.clear()

# ffmpeg -framerate 8 -i wave%03d.png -c:v libx264 -r 25 -vf "crop=4/5*in_w:1/2*in_h:1/10*in_w:11/50*in_h" -pix_fmt yuv420p output.mp4
