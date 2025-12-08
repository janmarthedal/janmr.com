# CLAUDE.md

## Project Overview

The subject for the files in this folder and its sub-folders
is an introduction to the finite element method.
There will be a solid mathematical foundation, but the focus
will be on an implementation of the methods described.

The outcome of this project is a number of markdown files
appropriate as posts on my static web site.
These posts will be placed in this folder and possibly
sub folders.
Each post will correspond to a section, preferably relatively
small in size.

Another repository will contain the source code for the
accompanying implementation.

## Tech Stack

There will be no actual source code files as such, but when referencing
implementations, the following tools will be used:
- **Python** - Main language
- **NumPy** - For efficient computations involving multi-dimensional arrays
- **SciPy** - For sparse matrices and numerical methods

## Table of Contents

- [The continuous problem](the-continuous-problem.md)
- Weak formulation
- A finite solution space
- Elements
	- 1d
		- Line
		- Line 3
	- 2d
		- Triangle
		- Quad
	- 3d
		- Tetrahedron 
		- Hexahedron
- Meshes
	- Representation
	- Well-posedness
	- Boundaries
		- Normals
	- Third-party tools
		- gmsh
		- meshio
- Quadrature
	- Line
	- Triangle
- Assembly
	- Stiffness matrix
	- Right-hand side
	- Boundary conditions
		- Dirichlet
		- Neumann
- Solving
	- Direct methods
	- Iterative methods
- Time-dependent systems
	- Solvers
