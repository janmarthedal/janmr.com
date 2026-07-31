---
title: Example of Weak Solution to the Poisson Problem
tags:
  - finite-element-method
  - numerical-analysis
  - mathematics
  - pde
og:
  description: >-
    A one-dimensional Poisson problem with a discontinuous source term, whose
    solution has a kink and therefore solves the weak form but not the strong one.
---
The [weak formulation of the Poisson problem](../poisson-weak-form/) asks less of the solution
than the strong form does: only first derivatives appear, and only in integrals.
It is worth seeing a case where that difference decides whether a solution exists at all.

Take the interval and the boundary conditions of the [first post](../poisson-problem/),
$\Omega = (0, 1)$ with $u(0) = u(1) = 0$, but let the source act on the left half only:

$$f(x) = \begin{cases} 1 & x < 1/2, \\ 0 & x > 1/2. \end{cases}$$

Think of a bar that is heated over part of its length and left alone over the rest.
The entire boundary is Dirichlet with $g_D = 0$, so $V = V_0 = H^1_0(0, 1)$ and there is no boundary integral.
In one dimension the gradient is just the derivative, and the weak form reads:
find $u \in H^1_0(0, 1)$ such that

$$\int_0^1 u'(x)\, v'(x) \, \mathrm{d}x = \int_0^{1/2} v(x) \, \mathrm{d}x \quad \text{for all } v \in H^1_0(0, 1).$$

On each half of the interval the source is constant,
so the solution is a quadratic on the left and a straight line on the right.
Matching the value and the slope at the midpoint, and imposing the two boundary conditions, gives

$$u(x) = \begin{cases} -x^2/2 + 3x/8 & x \leq 1/2, \\ (1 - x)/8 & x \geq 1/2, \end{cases}$$

with derivative $u'(x) = 3/8 - x$ on the left and the constant $u'(x) = -1/8$ on the right,
the two agreeing at $x = 1/2$.

![The discontinuous source term, the resulting solution, and its derivative with a kink at the midpoint](/media/fem/poisson-1d-rough-source.svg)

The solution is continuously differentiable, but its second derivative jumps from $-1$ to $0$ at the midpoint —
the kink in $u'$ visible in the bottom panel.
There is therefore no twice continuously differentiable function satisfying $-u'' = f$ at every point:
the strong form of this problem has no solution at all.

The weak form is untroubled.
The source is bounded and hence square-integrable,
the domain is an interval,
and the whole boundary carries a Dirichlet condition,
so the conditions for well-posedness given in the previous post are met
and the weak problem has exactly one solution — the $u$ plotted above.
The kink costs nothing: $u'$ is bounded, so $u$ belongs to $H^1_0(0, 1)$ like any other admissible function,
and the integral $\int_0^1 u' v' \, \mathrm{d}x$ does not notice a single point of non-differentiability.

This is not a contrived situation.
Sources that switch on and off, and material properties that change abruptly where two materials meet,
are the norm rather than the exception in applications,
and the solutions they produce routinely have kinks of exactly this kind.
It is also a first hint of why piecewise polynomials are a natural choice of approximation:
the exact solution here is a quadratic joined to a line,
which is precisely the kind of function a finite element space is built from.

---

The next post carries the weak formulation over to the
[general elliptic operator](../elliptic-weak-form/),
where it takes on the abstract form that the rest of the series builds on.
