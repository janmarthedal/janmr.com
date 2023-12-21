import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('./iterations.csv')

fig, ax1 = plt.subplots(figsize=(10,6))
ax2 = ax1.twinx()

ax1.plot(df.iloc[:, 0], 100 - df.iloc[:, 2] / 100.0, color='b')
ax2.plot(df.iloc[:, 0], df.iloc[:, 1], color='g')

ax1.set_xlabel('Iterations')
ax1.set_ylabel('Accuracy')
ax2.set_ylabel('Error')

ax1.set_ylim([0, 100])
ax1.grid(True)

plt.plot()
plt.show()
