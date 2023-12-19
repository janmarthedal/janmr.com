import matplotlib.pyplot as plt
import numpy as np

show_best_fit = False

# Number of points
n_points = 100

# Seed for reproducibility
np.random.seed(0)

# Generating random points around a line with slope 0.5 through (0, 0)
x_values = np.random.uniform(-2, 10, n_points)
# y_values = np.random.uniform(0, 4, n_points)
y_values = 2 + 0.5 * x_values + np.random.normal(0, 1, n_points)

# Translating points so the center of mass is at (0, 0)
x_values_centered = x_values
y_values_centered = y_values

# Creating the plot
plt.figure(figsize=(8, 6))
plt.scatter(x_values_centered, y_values_centered, color='red')

if show_best_fit:
    sxx = np.dot(x_values_centered, x_values_centered)
    sxy = np.dot(x_values_centered, y_values_centered)
    best_slope = sxy / sxx
    print('slope =', best_slope)
    plt.plot([-2, 11], [-2 * best_slope, 11 * best_slope], color='blue')

plt.axhline(0, color='black')  # x-axis
plt.axvline(0, color='black')  # y-axis
plt.gca().spines['top'].set_visible(False)
plt.gca().spines['right'].set_visible(False)
plt.gca().spines['bottom'].set_position('zero')
plt.gca().spines['left'].set_position('zero')
plt.xlabel('x', loc='right')
plt.ylabel('y', loc='top', rotation=0)

plt.show()
