---
id: 3sum-log-shaving
title: "Beat n^2 (log log n)^{O(1)} / log^2 n for 3SUM — or explain why two log factors is the ceiling"
genre: improve-algorithm
problems: ["3SUM", "Convolution-3SUM"]
hypotheses: [3SUM]
record: "O(n^2 (log log n)^2 / log^2 n) time for integer inputs; n^2 (log log n)^{O(1)} / log^2 n for real inputs"
record_ref: "Baran, Demaine & Pătraşcu, Algorithmica 2008 (integers); Chan, SODA 2018 (reals)"
hardness: "3SUM conjecture: no n^{2-eps} time algorithm; but nonuniformly, linear decision trees of depth O(n log^2 n) exist"
hardness_ref: "Kane, Lovett & Moran, STOC 2018 (JACM 2019)"
status: open
confidence: high
tags: [3sum, log-shaving, decision-trees, word-ram]
---

## Statement

3SUM: given n numbers, decide whether three of them sum to zero. The trivial algorithm runs in O(n^2) time. Beat the current record of roughly n^2/log^2 n by a genuinely larger factor — say, achieve O(n^2/log^3 n), or n^2/2^{Θ(√log n)} in the style of the best APSP algorithms. (Anything n^{2-eps} would refute the 3SUM conjecture outright and is not the realistic ask of this card.)

## Current record

Baran, Demaine and Pătraşcu (WADS 2005, Algorithmica 2008) shaved the first log factors for integer inputs on the word RAM: O(n^2 (log log n)^2 / log^2 n) via hashing and word packing. For real inputs, Grønlund and Pettie (FOCS 2014, JACM 2018) gave the first subquadratic-by-a-log-factor bound, and Timothy Chan (SODA 2018) brought reals essentially level with integers at n^2 (log log n)^{O(1)}/log^2 n using geometric dominance tricks. Meanwhile the *nonuniform* complexity collapsed: Grønlund–Pettie showed 4-linear decision trees of depth about n^{3/2}, refuting the old belief that even decision trees need n^2 comparisons, and Kane, Lovett and Moran (STOC 2018) achieved near-optimal O(n log^2 n)-depth linear decision trees. So the information needed is nearly linear, yet no algorithm converts this into more than two shaved log factors of runtime. The two-log-factor plateau has stood since 2005 for integers.

## Why it matters

3SUM is one of the three pillar problems of fine-grained complexity: dozens of quadratic lower bounds in computational geometry (via the Gajentaan–Overmars framework) and in data structures (via Pătraşcu's STOC 2010 reductions through Convolution-3SUM, an equivalence made deterministic by Chan and He, SOSA 2020) are calibrated to its exact complexity. The glaring gap between O(n log^2 n) decision-tree depth and n^2/log^2 n runtime is the sharpest known instance of the "nonuniform vs uniform" mystery; any transfer of the Kane–Lovett–Moran inverse-theorem machinery into an actual algorithm would likely generalize to k-SUM and APSP-flavored problems.

## Attack surface

The APSP analogy is the roadmap: APSP was stuck at n^3/log^2 n-style bounds until Williams' polynomial-method algorithm reached n^3/2^{Θ(√log n)} (STOC 2014). The corresponding move for 3SUM — evaluating many low-degree polynomial comparisons in batch via fast rectangular matrix multiplication — has no published analogue; the obstruction is that 3SUM's comparisons a_i + b_j vs. -c_k are three-way, not two-way. Concrete starting points: (1) get n^2/log^3 n for Convolution-3SUM, whose structured indices (i + j = k) admit FFT-flavored preprocessing; (2) derandomize or tighten the Baran–Demaine–Pătraşcu hashing to squeeze the (log log n)^2; (3) implement Kane–Lovett–Moran queries in batches over the word RAM for inputs with polynomially bounded integers.
