---
title: Weak Formulation of the Poisson Problem
date: 2026-08-01T14:26Z
tags:
  - finite-element-method
  - numerical-analysis
  - mathematics
  - pde
og:
  description: >-
    Deriving the weak form of the Poisson equation by integration by parts, with
    essential and natural boundary conditions and the conditions for well-posedness.
---
The strong form of the [Poisson problem](../poisson-problem/) —
find $u$ satisfying $-\Delta u = f$ pointwise in $\Omega$ together with boundary conditions on $\partial\Omega$ —
requires $u$ to be twice continuously differentiable.
This regularity is often unavailable for domains or data that arise in practice,
and it is also inconvenient for the finite element method.
The **weak formulation** (also called the variational formulation) relaxes this requirement
and provides the correct mathematical framework for approximation.

The idea is to multiply the equation $-\Delta u = f$ by a smooth **test function** $v$ and integrate over $\Omega$:

$$-\int_\Omega (\Delta u)\, v \, \mathrm{d}x = \int_\Omega f\, v \, \mathrm{d}x.$$

The left-hand side involves second derivatives of $u$, which is precisely what we want to avoid.
Applying [Green's first identity](https://en.wikipedia.org/wiki/Green%27s_identities)
(integration by parts in multiple dimensions),

$$-\int_\Omega (\Delta u)\, v \, \mathrm{d}x = \int_\Omega \nabla u \cdot \nabla v \, \mathrm{d}x - \int_{\partial\Omega} \frac{\partial u}{\partial n}\, v \, \mathrm{d}s,$$

where $\mathbf{n}$ is the unit outward normal and $\partial u / \partial n = \nabla u \cdot \mathbf{n}$ is the outward normal derivative.
Combining with the right-hand side,

$$\int_\Omega \nabla u \cdot \nabla v \, \mathrm{d}x - \int_{\partial\Omega} \frac{\partial u}{\partial n}\, v \, \mathrm{d}s = \int_\Omega f\, v \, \mathrm{d}x.$$

Now the boundary conditions come into play.
We choose the test function $v$ to vanish on the Dirichlet boundary: $v = 0$ on $\Gamma_D$.
This makes the Dirichlet part of the boundary integral disappear.
On the Neumann boundary $\Gamma_N$ the flux is prescribed as $\partial u / \partial n = g_N$,
so that part of the boundary integral is known.
Moving it to the right-hand side gives

$$\int_\Omega \nabla u \cdot \nabla v \, \mathrm{d}x = \int_\Omega f\, v \, \mathrm{d}x + \int_{\Gamma_N} g_N\, v \, \mathrm{d}s.$$

This is the weak form of the Poisson problem.
Two things are worth noting.
First, the equation now involves only first derivatives of both $u$ and $v$,
which widens the class of admissible functions in exactly the way the finite element method needs.
A continuous, piecewise linear function on a mesh has a bounded, piecewise constant gradient,
so it is a perfectly legitimate candidate in the weak form —
even though it is nowhere twice differentiable and so cannot be a solution of the strong form.
Approximations of this kind are what the rest of the series is built on.
Second, the Neumann condition has entered **naturally**:
it was not imposed explicitly but appeared as a boundary integral from the integration-by-parts step.
For this reason Neumann conditions are often called *natural boundary conditions* in the finite element literature.

To state the weak problem precisely we need to specify the function spaces.
The natural space is the **[Sobolev space](https://en.wikipedia.org/wiki/Sobolev_space)** $H^1(\Omega)$,
consisting of all square-integrable functions whose first-order *weak* derivatives are also square-integrable.
We define the trial set

$$V = \{ v \in H^1(\Omega) : v = g_D \text{ on } \Gamma_D \}$$

and the test space

$$V_0 = \{ v \in H^1(\Omega) : v = 0 \text{ on } \Gamma_D \}.$$

(The boundary values are to be understood in the sense of
[traces](https://en.wikipedia.org/wiki/Trace_operator), since functions in $H^1(\Omega)$
need not have pointwise values.)

The weak formulation then reads: find $u \in V$ such that

$$\int_\Omega \nabla u \cdot \nabla v \, \mathrm{d}x = \int_\Omega f\, v \, \mathrm{d}x + \int_{\Gamma_N} g_N\, v \, \mathrm{d}s \quad \text{for all } v \in V_0.$$

The boundary values $g_D$ are said to be imposed **essentially** (they restrict the set $V$),
while the Neumann data $g_N$ appear in the right-hand side and are imposed naturally.
When $\Gamma_D = \partial\Omega$ (pure Dirichlet problem) and $g_D = 0$,
the two spaces coincide: $V = V_0 = H^1_0(\Omega)$.

The trial set $V$ is not a vector space unless $g_D = 0$, which is awkward both in theory and in code.
The remedy is to write $u = w + u_0$, where $w$ is any fixed function attaining the Dirichlet data
and $u_0 \in V_0$ is the new unknown, leaving a problem posed entirely on $V_0$.
Concretely, this is nothing but the familiar step of moving the known boundary values to the right-hand side
and solving only for the remaining unknowns —
which is exactly how Dirichlet conditions are handled in the discrete linear system later in the series.

Nothing is lost in the passage from the strong form to the weak one.
Every classical solution satisfies the weak form, as the derivation above shows,
and conversely a weak solution that is smooth enough to be differentiated twice
satisfies $-\Delta u = f$ pointwise and $\partial u / \partial n = g_N$ on $\Gamma_N$,
obtained by reversing the integration by parts.

That leaves the question of whether the weak problem has a solution at all.
It does — uniquely, and depending continuously on the data — under the following conditions:

- $\Omega$ is bounded and has a [Lipschitz boundary](https://en.wikipedia.org/wiki/Lipschitz_domain),
  which holds for any polygonal or polyhedral domain, that is, for anything a mesh can represent;
- the data are square-integrable, $f \in L^2(\Omega)$ and $g_N \in L^2(\Gamma_N)$,
  and $g_D$ is the boundary trace of some function in $H^1(\Omega)$;
- $\Gamma_D$ is non-empty — at least part of the boundary carries a Dirichlet condition.

The first two conditions are so mild that they are met by essentially every problem
the finite element method is applied to:
meshed domains are polyhedral by construction, and any bounded, piecewise continuous
source term or boundary data one would tabulate or evaluate in code is square-integrable.
In practice it is only the third condition that is worth checking.
The result itself is the **[Lax–Milgram theorem](https://en.wikipedia.org/wiki/Lax%E2%80%93Milgram_theorem)**,
which we will meet again when the weak formulation is extended to general elliptic problems,
and the ingredient that requires a non-empty $\Gamma_D$ is the
**[Poincaré inequality](https://en.wikipedia.org/wiki/Poincar%C3%A9_inequality)**.
The details are given in Evans,
[*Partial Differential Equations*](https://bookstore.ams.org/gsm-19-r) (AMS, 2010), Chapter 6.

The third condition fails for the pure Neumann problem, $\Gamma_D = \emptyset$.
Adding a constant to a solution then changes neither the equation nor the boundary condition,
so the solution is determined only up to that constant,
and the data must satisfy the compatibility condition
$\int_\Omega f \, \mathrm{d}x + \int_{\partial\Omega} g_N \, \mathrm{d}s = 0$ for a solution to exist
(seen by using $v \equiv 1$ as a test function, which is admissible when $\Gamma_D$ is empty).
The discrete symptom is a singular stiffness matrix,
usually cured by prescribing the value at a single point or by imposing a zero-mean constraint.

The same derivation applies to the [general elliptic operators](../elliptic-pdes/)
introduced earlier in the series, which a later post carries out.
First, though, the next post works through a one-dimensional problem
whose weak solution exists even though the strong form has none.
