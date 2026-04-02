import matplotlib.pyplot as plt
import numpy as np
import math

x = np.linspace(0, 25, 200)[1:]
y = np.log(x) / x

e = math.exp(1)

# plt.figure(figsize=(10, 6))
plt.plot(x, y)
plt.plot([0, e, e], [1/e, 1/e, 0], linestyle='dotted', color='gray')
plt.xlabel('x')
plt.ylabel(r'$\frac{\ln x}{x}$')
ax = plt.gca()
ax.set_ylim(-0.1, 0.4)
ax.spines[['left', 'bottom']].set_position('zero')
ax.spines[['top', 'right']].set_visible(False)
print(ax.get_xticks())
ax.set_xticks([1, e, 5, 10, 15, 20, 25], ['1', '$e$', '5', '10', '15', '20', '25'])
ax.set_yticks([-0.1, 0.1, 0.2, 0.3, 1/e, 0.4], ['-0.1', '0.1', '0.2', '0.3', '$1/e$', '0.4'])

plt.show()

