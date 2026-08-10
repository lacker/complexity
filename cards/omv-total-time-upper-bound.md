---
id: omv-total-time-upper-bound
title: "Beat n^3 / 2^Ω(√log n) total time for Online Matrix-Vector multiplication"
genre: improve-algorithm
problems: ["Online Matrix-Vector Multiplication (OMv)"]
hypotheses: [OMv]
record: "n^3 / 2^Ω(√log n) total time for n online queries"
record_ref: "Larsen & Williams, SODA 2017"
hardness: "no O(n^{3-eps}) total time with polynomial preprocessing, by definition of the OMv conjecture"
hardness_ref: "Henzinger, Krinninger, Nanongkai & Saranurak, STOC 2015"
status: open
confidence: high
verified: 2026-08-10
tags: [omv, dynamic, matrix-vector, fine-grained]
---

## Statement

In the Online Matrix-Vector problem (OMv) you are given an n-by-n Boolean matrix M and may preprocess it in polynomial time. Then n Boolean vectors v_1, ..., v_n arrive one at a time, and you must output the Boolean matrix-vector product M v_i before seeing v_{i+1}. The OMv conjecture says no algorithm solves all n queries in total time O(n^{3-eps}) for any eps > 0. The challenge: beat the best known upper bound of n^3 / 2^Ω(√log n) total time — ideally getting total time n^3 / 2^{(log n)^{0.51}} or better, or (the big prize) n^{3-eps}, which would refute the conjecture.

## Current record

Larsen and Williams (SODA 2017) gave the first improvement over the trivial O(n^2)-per-query algorithm that saves more than log factors: a randomized algorithm running in total time n^3 / 2^Ω(√log n). Because the vectors arrive online, fast matrix multiplication (which needs to batch many vectors) does not apply; the algorithm instead uses combinatorial preprocessing and table-lookup ideas. They also showed that in the cell-probe model (counting only memory accesses, computation free) OMv can be solved substantially faster than n^3, which means the OMv conjecture, if true, cannot be proven by pure cell-probe/communication arguments. No improvement over the 2^Ω(√log n)-type savings has become standard since.

## Why it matters

OMv is the hub conjecture for dynamic-problem hardness. Henzinger, Krinninger, Nanongkai and Saranurak (STOC 2015) derived tight-looking conditional lower bounds for dozens of dynamic problems from it: dynamic reachability, subgraph connectivity, Slivkins-style pattern problems, partially dynamic shortest paths, and more. Any improvement to the OMv upper bound directly weakens (or, at n^{3-eps}, collapses) every one of those lower bounds simultaneously. Conversely, understanding why the improvement stalls at 2^{√log n}-type savings — the same threshold seen in Orthogonal Vectors and all polynomial-method results — would be structural insight into the whole fine-grained web.

## Attack surface

The 2^Ω(√log n) barrier also appears in Chan-Williams-style shaved-exponent algorithms, suggesting a shared bottleneck: probabilistic polynomials and lookup tables cap out at that savings. Ideas worth probing: (1) exploit the fact that M is fixed across all n queries more aggressively — current algorithms reuse preprocessing but not query history; (2) the single-query variant uMv (compute u^T M v for online vector pairs) is equivalent in hardness and may be a cleaner target; (3) try structured matrices first (low rank over rings, sparse, Kronecker-structured) where genuinely subcubic total time is achievable, and map the boundary of where the techniques die.

## Verification notes

Checked August 2026. No improvement over the Larsen–Williams (SODA 2017,
arXiv:1605.01695) n^3 / 2^Ω(√log n) bound for general OMv was found. Progress
on the structured lane exists: Anand, van den Brand and McCarty
(arXiv:2502.21240) show matrices of VC-dimension d admit Õ(n^{2-1/d}) query
time after Õ(n^2) preprocessing — consistent with attack-surface item (3) but
leaving the general record intact.
