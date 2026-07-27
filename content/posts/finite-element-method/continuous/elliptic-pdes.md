---
title: General Elliptic PDEs
---

The [Poisson problem](../poisson-problem/) is a special case of a much broader family of PDEs.
A general second-order linear elliptic PDE on a domain $\Omega \subset \mathbb{R}^n$ can be written as

$$Lu = f \quad \text{in } \Omega,$$

where $L$ is a second-order linear differential operator and $f : \Omega \to \mathbb{R}$ is a given source term.
A canonical form of $L$ is

$$Lu = -\nabla \cdot (A \nabla u) + \mathbf{b} \cdot \nabla u + c\, u,$$

where $A : \Omega \to \mathbb{R}^{n \times n}$ is matrix-valued,
$\mathbf{b} : \Omega \to \mathbb{R}^n$ is vector-valued, and
$c : \Omega \to \mathbb{R}$ is scalar-valued.
The three terms are conventionally called the *diffusion*, *convection*, and *reaction* terms.
The Poisson equation corresponds to $A = I$, $\mathbf{b} = 0$, $c = 0$.

The term *[elliptic](https://en.wikipedia.org/wiki/Elliptic_partial_differential_equation)* refers to a condition on $A$ alone.
The operator $L$ is **uniformly elliptic** if there exists a constant $\alpha > 0$ such that

$$\xi^T A(x)\, \xi \geq \alpha |\xi|^2 \quad \text{for all } \xi \in \mathbb{R}^n \text{ and almost all } x \in \Omega.$$

For symmetric $A(x)$ this says that $A(x)$ is positive definite, uniformly in $x$:
the quadratic form associated with the second-order part of $L$ is bounded away from zero in every direction.
(For nonsymmetric $A(x)$ the requirement falls on its [symmetric part](https://mathworld.wolfram.com/SymmetricPart.html),
as the skew-symmetric part contributes nothing to the quadratic form.)
This is what places $L$ in the elliptic class of the standard classification of second-order linear operators,
alongside the parabolic and hyperbolic classes;
see [elliptic operator](https://en.wikipedia.org/wiki/Elliptic_operator) for the general definition in terms of the principal symbol.

Boundary conditions are of the same Dirichlet and Neumann types introduced for the Poisson problem.
The natural generalisation of the normal derivative is the **conormal derivative** $(A \nabla u) \cdot \mathbf{n}$,
and the [Neumann condition](https://en.wikipedia.org/wiki/Neumann_boundary_condition) reads
$(A \nabla u) \cdot \mathbf{n} = g_N$ on $\Gamma_N$.
For $A = I$ this is $\partial u / \partial n = g_N$, recovering the Poisson case.

Particular choices of coefficients give equations with names of their own.
With $A = I$, $\mathbf{b} = 0$ and $c$ a negative constant one obtains the
[Helmholtz equation](https://en.wikipedia.org/wiki/Helmholtz_equation),
and with $c$ a positive constant the
[screened Poisson equation](https://en.wikipedia.org/wiki/Screened_Poisson_equation).

[Well-posedness](https://en.wikipedia.org/wiki/Well-posed_problem) — existence, uniqueness, and
continuous dependence of $u$ on $f$ — is the central question before attempting a numerical solution.
Under sufficient conditions on $A$, $\mathbf{b}$, $c$, and the domain, classical results guarantee
that the boundary value problem $Lu = f$ has a unique solution that depends stably on the data.
A freely available treatment is John K. Hunter's
[*Notes on Partial Differential Equations*](https://www.math.ucdavis.edu/~hunter/pdes/pdes.html),
whose chapter on elliptic PDEs covers precisely this setting.
The precise hypotheses and proofs are also given in Evans,
[*Partial Differential Equations*](https://bookstore.ams.org/gsm-19-r) (AMS, 2010), Chapter 6,
which is the standard graduate reference.
A more numerically oriented treatment can be found in Brenner and Scott,
[*The Mathematical Theory of Finite Element Methods*](https://link.springer.com/book/10.1007/978-0-387-75934-0),
Chapter 5.

The precise mechanism by which well-posedness is established —
via a weak formulation and the Lax–Milgram theorem — is the subject of the next posts.
