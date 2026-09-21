"""Generate discrete-stiffness-sparsity.svg.

Shows the sparsity pattern of the stiffness matrix K for a small triangulated
mesh: entry (i,j) is nonzero exactly when nodes i and j (including i=j)
belong to a common element, i.e. when the supports of basis functions phi_i
and phi_j overlap.
"""

from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from scipy.spatial import Delaunay

GRAY = "#555555"


def build_mesh(seed: int = 0):
    """Return (nodes, triangles) for an 8x8 triangulated grid on [0,7]^2.

    Interior nodes are perturbed and then relabeled with an arbitrary
    (shuffled) numbering, so the sparsity pattern doesn't reflect a
    deliberately chosen node order.
    """
    rng = np.random.default_rng(seed)

    grid = np.array([[x, y] for y in range(8) for x in range(8)], dtype=float)
    interior = (grid[:, 0] > 0) & (grid[:, 0] < 7) & (grid[:, 1] > 0) & (grid[:, 1] < 7)
    grid[interior] += rng.uniform(-0.22, 0.22, size=(interior.sum(), 2))

    tri = Delaunay(grid)
    triangles = tri.simplices

    perm = rng.permutation(len(grid))
    inv_perm = np.argsort(perm)
    nodes = grid[perm]
    triangles = inv_perm[triangles]

    return nodes, triangles


out_path = Path(__file__).parents[2] / "content" / "media" / "fem" / "discrete-stiffness-sparsity.svg"
out_path.parent.mkdir(parents=True, exist_ok=True)

nodes, triangles = build_mesh()
n = len(nodes)

nonzero = np.zeros((n, n), dtype=bool)
for t in triangles:
    for i in t:
        for j in t:
            nonzero[i, j] = True

fig, ax = plt.subplots(figsize=(4.5, 4.5))

for i in range(n):
    for j in range(n):
        color = GRAY if nonzero[i, j] else "white"
        ax.add_patch(plt.Rectangle((j, n - 1 - i), 1, 1, facecolor=color,
                                    edgecolor="#cccccc", linewidth=0.6))

ax.set_xlim(0, n)
ax.set_ylim(0, n)
ax.set_aspect("equal")
ax.axis("off")
fig.tight_layout()
fig.savefig(out_path, format="svg", bbox_inches="tight")
print(f"Saved {out_path}")
