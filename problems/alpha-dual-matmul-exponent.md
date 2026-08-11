---
id: alpha-dual-matmul-exponent
title: "Push the dual matrix multiplication exponent above alpha >= 0.321334 — multiply n x n^k by n^k x n matrices in n^{2+o(1)} time for larger k"
genre: improve-algorithm
problems: ["Rectangular Matrix Multiplication", "Matrix Multiplication"]
hypotheses: []
record: "alpha >= 0.321334, i.e., an n x n^{0.321334} matrix can be multiplied by an n^{0.321334} x n matrix in n^{2+o(1)} arithmetic operations"
record_ref: "Vassilevska Williams, Xu, Xu & Zhou, SODA 2024 (arXiv:2307.07970, \"New Bounds for Matrix Multiplication: from Alpha to Omega\")"
hardness: "no lower bound beyond the trivial alpha <= 1; alpha = 1 is equivalent to omega = 2, and laser-method barriers for the Coppersmith–Winograd tensor family limit how far these analyses can push rectangular exponents"
hardness_ref: "Christandl, Le Gall, Lysikov & Zuiddam, \"Barriers for Rectangular Matrix Multiplication\" (computational complexity, 2025)"
status: open
confidence: high
verified: 2026-08-10
tags: [matrix-multiplication, rectangular-matmul, alpha, algebraic, laser-method]
---

## Statement

Let omega(1, k, 1) be the exponent of multiplying an n x n^k matrix by an
n^k x n matrix, and define alpha as the largest k with omega(1, k, 1) = 2 —
the widest aspect ratio at which rectangular matrix multiplication is
essentially free. Trivially alpha <= 1, and alpha = 1 if and only if omega = 2.
The problem: publish any bound alpha > 0.321334, or improve omega(1, k, 1) for
any k in the published tables of rectangular exponents.

## Current record

The record alpha >= 0.321334 is due to Vassilevska Williams, Xu, Xu and Zhou
(SODA 2024), who extended the Duan–Wu–Zhou combination-loss analysis (FOCS
2023) to the rectangular setting, improving Le Gall–Urrutia's alpha >= 0.31389
(SODA 2018); the lineage before that runs through Coppersmith's alpha >= 0.172
(1982) and alpha >= 0.29462 (1997). Le Gall (arXiv:2307.06535) independently
improved rectangular exponents by combination-loss analysis, and Alman, Duan,
Vassilevska Williams, Xu, Xu and Zhou (SODA 2025, arXiv:2404.16349) further
improved various omega(1, k, 1) values with asymmetric analyses — but
0.321334 still stands as the best published alpha as of August 2026. All of
these analyze powers of the Coppersmith–Winograd tensor, and rectangular
barrier theorems (Christandl–Le Gall–Lysikov–Zuiddam) show this family of
techniques cannot reach alpha = 1.

## Why it matters

Alpha is a load-bearing dual of omega: many graph algorithms are bottlenecked
by unbalanced products rather than square ones. Zwick's APSP for directed
unweighted graphs, dynamic transitive closure and dynamic reachability (the
n^{1.407} bound in the dynamic-transitive-closure-omv-hardness entry
explicitly trades off against omega(1, k, 1)), all-pairs bottleneck paths,
sparse matrix multiplication, and interior-point LP solvers all inherit
exponents from the rectangular tables. An improved alpha propagates through
these automatically, and since alpha = 1 is equivalent to omega = 2, alpha
progress is omega progress measured along a different axis — sometimes an
easier one, since rectangular analyses have more slack to exploit.

## Attack surface

The gains since 2023 came from repairing accounting losses in the laser
method (combination loss, asymmetry), and the rectangular versions of these
analyses are younger and less optimized than the square ones — rerunning the
SODA 2025 asymmetric machinery specifically to maximize alpha rather than
minimize omega is the obvious first experiment, and the parameter optimization
is numerical, hence automatable. Higher Coppersmith–Winograd powers remain
unanalyzed in the rectangular setting. Outside the framework: the barrier
paper pins down exactly which degeneration notions are capped, so any
technique outside its scope (e.g., alternative base tensors, group-theoretic
constructions) applied to rectangular shapes is unexplored territory.

## Verification notes

Checked August 2026: sources from 2025–2026 still cite 0.321334 <= alpha <= 1
as the current state; the SODA 2025 paper improved omega and various
rectangular exponents but did not claim a new alpha.
