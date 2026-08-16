---
title: Weak Formulation of Elliptic PDEs
date: 2026-08-16T13:46Z
tags:
  - finite-element-method
  - numerical-analysis
  - mathematics
  - pde
og:
  description: >-
    Extending the weak formulation to general second-order elliptic operators,
    giving the abstract bilinear form and linear functional of the finite element method.
---
The [weak formulation of the Poisson problem](../poisson-weak-form/) extends naturally to the
[general elliptic operator](../elliptic-pdes/)

$$Lu = -\nabla \cdot (A \nabla u) + \mathbf{b} \cdot \nabla u + c\, u.$$

The trial set $V$ and the test space $V_0$ are the same as before,
consisting of the functions in $H^1(\Omega)$ that attain the prescribed values $g_D$ on $\Gamma_D$
and that vanish there, respectively.
The derivation also follows the same steps:
multiply $Lu = f$ by a test function $v \in V_0$ and integrate over $\Omega$,

$$\int_\Omega \bigl(-\nabla \cdot (A \nabla u) + \mathbf{b} \cdot \nabla u + c\, u\bigr)\, v \, \mathrm{d}x = \int_\Omega f\, v \, \mathrm{d}x.$$

Applying [Green's first identity](https://en.wikipedia.org/wiki/Green%27s_identities) to the divergence term,

$$-\int_\Omega \nabla \cdot (A \nabla u)\, v \, \mathrm{d}x = \int_\Omega (A \nabla u) \cdot \nabla v \, \mathrm{d}x - \int_{\partial\Omega} (A \nabla u) \cdot \mathbf{n}\, v \, \mathrm{d}s.$$

The boundary integral vanishes on $\Gamma_D$ because $v = 0$ there,
and on $\Gamma_N$ the Neumann condition prescribes the
[conormal derivative](../elliptic-pdes/), $(A \nabla u) \cdot \mathbf{n} = g_N$,
which takes over the role played by the normal derivative in the Poisson problem.
Moving this known quantity to the right-hand side and collecting all terms gives

$$\int_\Omega \bigl[(A \nabla u) \cdot \nabla v + (\mathbf{b} \cdot \nabla u)\, v + c\, u\, v\bigr] \mathrm{d}x = \int_\Omega f\, v \, \mathrm{d}x + \int_{\Gamma_N} g_N\, v \, \mathrm{d}s.$$

It is conventional to name the two sides separately.
Define the **bilinear form** $a : H^1(\Omega) \times V_0 \to \mathbb{R}$ by

$$a(u, v) = \int_\Omega \bigl[(A \nabla u) \cdot \nabla v + (\mathbf{b} \cdot \nabla u)\, v + c\, u\, v\bigr] \mathrm{d}x,$$

and the **linear functional** $\ell : V_0 \to \mathbb{R}$ by

$$\ell(v) = \int_\Omega f\, v \, \mathrm{d}x + \int_{\Gamma_N} g_N\, v \, \mathrm{d}s.$$

The weak problem then takes the compact abstract form: find $u \in V$ such that

$$a(u, v) = \ell(v) \quad \text{for all } v \in V_0.$$

The Poisson problem is recovered by setting $A = I$, $\mathbf{b} = 0$, $c = 0$,
which gives $a(u, v) = \int_\Omega \nabla u \cdot \nabla v \, \mathrm{d}x$.
The abstract notation $a(u,v) = \ell(v)$ is standard throughout the finite element literature
and applies equally to far more general problems.

Well-posedness again follows from the [Lax–Milgram theorem](https://en.wikipedia.org/wiki/Lax%E2%80%93Milgram_theorem),
under the conditions listed for the [Poisson problem](../poisson-weak-form/)
together with two requirements on the coefficients:
that $A$, $\mathbf{b}$ and $c$ be bounded on $\Omega$,
and that $A$ be [uniformly elliptic](../elliptic-pdes/), which is what replaces the identity matrix
of the Poisson problem in the argument.
When convection is present ($\mathbf{b} \neq 0$) a further condition is needed,
and a sufficient one is that $c - \tfrac{1}{2}\nabla \cdot \mathbf{b} \geq 0$ almost everywhere in $\Omega$,
together with $\mathbf{b} \cdot \mathbf{n} \geq 0$ on $\Gamma_N$.
The first condition holds automatically in the common case of a divergence-free convection field
($\nabla \cdot \mathbf{b} = 0$), where it reduces to asking that the reaction coefficient be
non-negative ($c \geq 0$);
the second says that the flow leaves the domain through the Neumann boundary rather than entering through it,
and is vacuous for a pure Dirichlet problem.
Note also that $a$ is symmetric only when $\mathbf{b} = 0$ and $A$ is symmetric —
a property that will matter for the structure of the linear systems to come.
A full treatment is given in Brenner and Scott,
[*The Mathematical Theory of Finite Element Methods*](https://link.springer.com/book/10.1007/978-0-387-75934-0)
(Springer, 2008), Chapter 5.

This formulation is the foundation on which the discrete approximation is built.
In the next post we replace the infinite-dimensional space $V$
with a finite-dimensional subspace and derive the linear system that must be solved.
