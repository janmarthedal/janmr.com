---
title: ND Array libraries
---

## Libraries

| Library | Language (API / implementation) | Builds upon / wraps |
|---|---|---|
| [NumPy](https://numpy.org/) | Python / C | Standalone core; linear algebra via BLAS/LAPACK (OpenBLAS, MKL, Accelerate) |
| [CuPy](https://cupy.dev/) | Python / C++, CUDA | NumPy-compatible API on GPUs; wraps CUDA libraries (cuBLAS, cuFFT, cuSOLVER, cuDNN, ...) and ROCm |
| [JAX](https://github.com/jax-ml/jax) | Python / C++ | NumPy-like API compiled via XLA |
| [PyTorch](https://pytorch.org/) | Python, C++ (LibTorch) / C++, CUDA | Own tensor core (ATen); uses BLAS/LAPACK, cuBLAS, cuDNN, oneDNN for kernels |
| [TensorFlow](https://www.tensorflow.org/) | Python, C++ / C++ | Own runtime; CPU kernels largely built on Eigen's Tensor module, optional XLA compilation |
| [Dask Array](https://docs.dask.org/en/stable/array.html) | Python | Chunked, parallel/distributed arrays composed of NumPy (or CuPy) arrays |
| [xarray](https://xarray.dev/) | Python | Labeled dimensions and coordinates on top of NumPy, Dask, CuPy, ... |
| [xtensor](https://github.com/xtensor-stack/xtensor) | C++ (header-only) | Standalone; optional BLAS/LAPACK via xtensor-blas; bindings to NumPy, Julia, R |
| [Boost.MultiArray](https://www.boost.org/doc/libs/release/libs/multi_array/) | C++ (header-only) | Standalone |
| [`std::mdspan`](https://en.cppreference.com/w/cpp/container/mdspan) | C++23 standard library | Standalone; non-owning multidimensional view over existing memory (reference implementation from [Kokkos](https://github.com/kokkos/mdspan)) |
| [Kokkos](https://kokkos.org/) (`Kokkos::View`) | C++ | Standalone; performance-portable backends (OpenMP, CUDA, HIP, SYCL) |
| [ArrayFire](https://arrayfire.com/) | C++ / C++, CUDA, OpenCL | Wraps vendor libraries per backend (cuBLAS/cuFFT, clBLAS/clFFT, MKL/FFTW/OpenBLAS) |
| [ndarray](https://github.com/rust-ndarray/ndarray) | Rust | Standalone; optional BLAS for matrix multiplication |
| [ND4J](https://deeplearning4j.konduit.ai/nd4j/tutorials/quickstart) | Java (JVM) / C++ | Wraps libnd4j (C++), which uses OpenBLAS/MKL, cuBLAS/cuDNN |
| [TensorFlow.js](https://www.tensorflow.org/js) | JavaScript / TypeScript | Backends on WebGL, WebGPU, WebAssembly (XNNPACK) and Node.js (bindings to TensorFlow C library) |
| [stdlib ndarray](https://github.com/stdlib-js/stdlib/tree/develop/lib/node_modules/%40stdlib/ndarray) | JavaScript | Standalone; on top of typed arrays |
| [TorchSharp](https://github.com/dotnet/TorchSharp) | C# / .NET | Wraps LibTorch (PyTorch's C++ core) |

## Built into the language

| Language | Notes |
|---|---|
| [Julia](https://docs.julialang.org/en/v1/manual/arrays/) | `Array{T,N}` in Base, implemented in Julia/C; linear algebra via OpenBLAS/LAPACK (libblastrampoline) |
| [Fortran](https://fortran-lang.org/learn/best_practices/arrays/) | Native multidimensional arrays since Fortran 77, whole-array operations since Fortran 90 |
| [MATLAB](https://www.mathworks.com/help/matlab/math/multidimensional-arrays.html) / [GNU Octave](https://octave.org/) | Native N-D arrays; linear algebra via BLAS/LAPACK (MKL in MATLAB) |
| [R](https://stat.ethz.ch/R-manual/R-devel/library/base/html/array.html) | `array()` in base R, implemented in C; linear algebra via BLAS/LAPACK |
| [APL](https://aplwiki.com/) family (Dyalog APL, J, BQN) | Arrays of arbitrary rank are the core data type |
