---
title: The Discrete Formulation
---

The [abstract weak problem](../../continuous/elliptic-weak-form/) — find $u \in V$ such that $a(u,v) = \ell(v)$ for all $v \in V_0$ — is posed in an infinite-dimensional function space and cannot be solved directly on a computer. The **Galerkin method** turns it into a finite-dimensional problem by restricting attention to a subspace.

Choose a finite-dimensional test space $V_{h,0} \subset V_0$ of dimension $N$. The subscript $h$ conventionally denotes a discretisation parameter, typically the mesh size. The trial set needs slightly more care: $V$ is affine rather than a vector space whenever $g_D \neq 0$, so its discrete counterpart is built the same way it was in the continuous setting. Pick a **discrete lifting** $w_h$ attaining the Dirichlet data on $\Gamma_D$ and set $V_h = w_h + V_{h,0}$, which is the discrete form of the splitting $u = w + u_0$ [introduced for the Poisson problem](../../continuous/poisson-weak-form/). The discrete problem then reads: find $u_h \in V_h$ such that

$$a(u_h, v_h) = \ell(v_h) \quad \text{for all } v_h \in V_{h,0}.$$

This has exactly the same form as the continuous problem, but the test functions now range over a space of dimension $N$ instead of an infinite-dimensional one. To turn it into a linear system, write $u_h = w_h + u_{h,0}$ where $u_{h,0} \in V_{h,0}$ is the new unknown, and let $\{\phi_1, \ldots, \phi_N\}$ be a basis for $V_{h,0}$. Since $a$ is linear in its first argument, expanding

$$u_{h,0} = \sum_{j=1}^{N} u_j\, \phi_j$$

and testing against each basis function $\phi_i$ gives

$$\sum_{j=1}^{N} u_j\, a(\phi_j, \phi_i) = \ell(\phi_i) - a(w_h, \phi_i), \quad i = 1, \ldots, N.$$

The lifting is known, so its contribution moves to the right-hand side — the discrete echo of moving the Dirichlet data there in the continuous problem. This is a system of $N$ equations in $N$ unknowns. Defining the **stiffness matrix** $K \in \mathbb{R}^{N \times N}$ and **load vector** $\mathbf{f} \in \mathbb{R}^N$ by

$$K_{ij} = a(\phi_j, \phi_i), \qquad f_i = \ell(\phi_i) - a(w_h, \phi_i),$$

the discrete problem reduces to the linear system

$$K\mathbf{u} = \mathbf{f},$$

where $\mathbf{u} = (u_1, \ldots, u_N)^T$ is the vector of unknown coefficients, from which the solution is recovered as $u_h = w_h + \sum_j u_j \phi_j$. When $a$ is symmetric (as for the Poisson problem), $K$ is symmetric and, under the coercivity condition, positive definite. In practice $w_h$ is rarely built as a separate function: the Dirichlet values are held in the same nodal vector as the unknowns and eliminated from the system, which is the subject of a later post on assembly.

The key question is how well $u_h$ approximates the true solution $u$. The relevant measure of error is the $V$-norm, which for $V \subset H^1(\Omega)$ is the $H^1$ norm

$$\|v\|_V = \|v\|_{H^1(\Omega)} = \left(\int_\Omega v^2 \, \mathrm{d}x + \int_\Omega |\nabla v|^2 \, \mathrm{d}x\right)^{1/2}.$$

This norm controls both the function values and their first derivatives, which is exactly the regularity that the weak formulation requires. The answer to the approximation question is given by **[Céa's lemma](https://en.wikipedia.org/wiki/C%C3%A9a%27s_lemma)**: the discrete solution is quasi-optimal in the sense that

$$\|u - u_h\|_V \leq \frac{M}{\alpha}\, \inf_{v_h \in V_h} \|u - v_h\|_V,$$

where $M$ is the continuity constant and $\alpha$ is the coercivity constant of $a$. The proof rests on two observations. First, subtracting the discrete problem from the continuous one shows that the error $u - u_h$ is orthogonal to $V_{h,0}$ with respect to $a$:

$$a(u - u_h, v_h) = 0 \quad \text{for all } v_h \in V_{h,0}.$$

This is called **Galerkin orthogonality**. Second, for any $v_h \in V_h$ — noting that $u_h - v_h$ then lies in $V_{h,0}$, since the lifting cancels in the difference —

$$\alpha\, \|u - u_h\|_V^2 \leq a(u - u_h,\, u - u_h) = a(u - u_h,\, u - v_h) \leq M\, \|u - u_h\|_V\, \|u - v_h\|_V,$$

where the first step uses coercivity, the second uses Galerkin orthogonality (adding and subtracting $v_h$), and the third uses continuity. Dividing by $\|u - u_h\|_V$ and taking the infimum over $v_h$ gives the bound. When $a$ is symmetric the ratio $M/\alpha = 1$ and $u_h$ is the best approximation to $u$ from $V_h$ in the energy norm $\|v\|_a = \sqrt{a(v,v)}$.

Céa's lemma reduces the question of approximation quality entirely to approximation theory: how well can elements of $V_h$ approximate $u$? This depends on the choice of basis functions and the mesh, which is the topic of the next posts.

