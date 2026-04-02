import matplotlib.pyplot as plt
import numpy as np

SHOW_BEST_FIT = True

# Number of points
n_points = 100

# Seed for reproducibility
np.random.seed(0)

# Generating random points around a line with slope 0.5
slope = 0.5
x_values = np.random.uniform(-10, 10, n_points) + 2
y_values = slope * x_values + np.random.normal(0, 1, n_points) + 3

# Creating the plot
plt.figure(figsize=(8, 6))
plt.scatter(x_values, y_values, color='red')

if SHOW_BEST_FIT:
    sx = np.sum(x_values)
    sy = np.sum(y_values)
    sxx = np.dot(x_values, x_values)
    sxy = np.dot(x_values, y_values)
    a = (n_points * sxy - sx * sy) / (n_points * sxx - sx ** 2)
    b = (sy - a * sx) / n_points
    print('a =', a)
    print('b =', b)
    xmin = np.min(x_values)
    xmax = np.max(x_values)
    plt.plot([xmin, xmax], [xmin * a + b, xmax * a + b], color='blue')
    plt.plot(sx / n_points, sy / n_points, 'o', color='green')

plt.axhline(0, color='black')  # x-axis
plt.axvline(0, color='black')  # y-axis
plt.gca().spines['top'].set_visible(False)
plt.gca().spines['right'].set_visible(False)
plt.gca().spines['bottom'].set_position('zero')
plt.gca().spines['left'].set_position('zero')
plt.xlabel('x', loc='right')
plt.ylabel('y', loc='top', rotation=0)

plt.show()
