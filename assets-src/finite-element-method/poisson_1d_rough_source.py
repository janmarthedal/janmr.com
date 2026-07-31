"""Generate poisson-1d-rough-source.svg.

Plots the source term, solution and derivative for the 1D Poisson problem
  -u'' = f on (0,1),  u(0) = u(1) = 0,
with the discontinuous source f = 1 on (0,1/2) and f = 0 on (1/2,1).
The solution
  u(x) = -x^2/2 + 3x/8  for x <= 1/2,   u(x) = (1-x)/8  for x >= 1/2
is continuously differentiable, but u'' jumps at x = 1/2, so no classical
(twice continuously differentiable) solution exists.
"""

from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np

out_path = Path(__file__).parents[2] / "content" / "media" / "fem" / "poisson-1d-rough-source.svg"
out_path.parent.mkdir(parents=True, exist_ok=True)

BLUE = "#1a5fa8"
RED = "#c0392b"

xl = np.linspace(0, 0.5, 200)
xr = np.linspace(0.5, 1, 200)

ul = -(xl**2) / 2 + 3 * xl / 8
ur = (1 - xr) / 8
dul = -xl + 3 / 8
dur = np.full_like(xr, -1 / 8)

fig, axes = plt.subplots(3, 1, figsize=(6, 6.5), sharex=True)
ax_f, ax_u, ax_du = axes

# Source term: a step with the jump marked
ax_f.plot([0, 0.5], [1, 1], color=RED, linewidth=2.5)
ax_f.plot([0.5, 1], [0, 0], color=RED, linewidth=2.5)
ax_f.plot([0.5], [1], "o", color=RED, markersize=6, markerfacecolor="white", zorder=3)
ax_f.plot([0.5], [0], "o", color=RED, markersize=6, zorder=3)
ax_f.set_ylabel(r"$f$", fontsize=13, rotation=0, labelpad=12)
ax_f.set_ylim(-0.25, 1.25)
ax_f.text(0.25, 1.05, "source on", fontsize=11, ha="center", color=RED)
ax_f.text(0.75, 0.05, "source off", fontsize=11, ha="center", color=RED)

# Solution
ax_u.plot(xl, ul, color=BLUE, linewidth=2.5)
ax_u.plot(xr, ur, color=BLUE, linewidth=2.5)
ax_u.plot([0, 1], [0, 0], "o", color=RED, markersize=6, zorder=3)
ax_u.set_ylabel(r"$u$", fontsize=13, rotation=0, labelpad=12)
ax_u.set_ylim(-0.01, 0.09)

# Derivative: kink at the midpoint
ax_du.plot(xl, dul, color=BLUE, linewidth=2.5)
ax_du.plot(xr, dur, color=BLUE, linewidth=2.5)
ax_du.plot([0.5], [-1 / 8], "o", color=BLUE, markersize=6, zorder=3)
ax_du.annotate("kink", xy=(0.5, -1 / 8), xytext=(0.63, 0.2),
               fontsize=12, color=BLUE,
               arrowprops=dict(arrowstyle="-|>", color=BLUE, lw=1.2))
ax_du.set_ylabel(r"$u'$", fontsize=13, rotation=0, labelpad=12)
ax_du.set_xlabel(r"$x$", fontsize=13)
ax_du.set_ylim(-0.3, 0.55)

for ax in axes:
    ax.axvline(0.5, color="#999999", linestyle="--", linewidth=1, zorder=0)
    ax.set_xlim(-0.03, 1.03)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)

ax_du.set_xticks([0, 0.5, 1])
ax_du.set_xticklabels(["0", r"$\frac{1}{2}$", "1"])

plt.tight_layout()
fig.savefig(out_path, format="svg", bbox_inches="tight")
print(f"Saved {out_path}")
