---
id: alpha-dual-matmul-exponent
title: "Dual matrix multiplication exponent: alpha >= 1/2 is now known; referee the claimed alpha <= 2/3 (and Lean's alpha = 1/2), or beat 1/2"
genre: improve-algorithm
problems: ["Rectangular Matrix Multiplication", "Matrix Multiplication"]
hypotheses: []
record: "alpha >= 1/2, i.e., an n x n^{1/2} matrix times an n^{1/2} x n matrix in n^{2+o(1)} operations"
record_ref: "Uznański, arXiv:2610.10494 (\"Rectangular matrix multiplication from polynomial products\", states alpha >= 1/2); every-field version: Amanov, van den Berg & Zuiddam, arXiv:2610.30054 (omega_F(1,k,1) = 2 for 0 <= k <= 1/2)"
hardness: "no lower bound beyond the trivial alpha <= 1 in the refereed or arXiv literature (an unrefereed claim of alpha <= 2/3, and a Lean proof of alpha = 1/2, are noted in the body); laser-method barriers for the Coppersmith-Winograd family limit those analyses"
hardness_ref: "Christandl, Le Gall, Lysikov & Zuiddam, \"Barriers for Rectangular Matrix Multiplication\" (computational complexity, 2025)"
endgame: none known
status: open
confidence: high
verified: 2026-11-25
tags: [matrix-multiplication, rectangular-matmul, alpha, algebraic, laser-method]
---

## Statement

Let omega(1, k, 1) be the exponent of multiplying an n x n^k matrix by an
n^k x n matrix, and define alpha as the largest k with omega(1, k, 1) = 2 —
the widest aspect ratio at which rectangular matrix multiplication is
essentially free. Trivially alpha <= 1, and alpha = 1 if and only if omega = 2.
The problem: publish any bound alpha > 1/2, or settle the claimed upper bound
alpha <= 2/3 (and the Lean claim alpha = 1/2, below) by refereeing or refuting it.

## Current record

The record is now alpha >= 1/2, well above the laser-method value 0.321334
(Vassilevska Williams, Xu, Xu and Zhou, SODA 2024, arXiv:2307.07970).

- **The bound:** Uznański (arXiv:2610.10494) extends OpenAI's October 2026 matrix
  multiplication analysis to rectangular products and states alpha >= 1/2.
  Amanov, van den Berg and Zuiddam (arXiv:2610.30054) state omega_F(1,k,1) = 2 for
  0 <= k <= 1/2 over every field.
- **The other side, claimed:** OpenAI's [24 Nov 2026 preprint](https://github.com/openai/math/tree/main/preprints/The-matrix-multiplication-exponent-is-nine-fourths-November-24-2026) (not
  refereed) claims 1/2 <= alpha <= 2/3 over every field (Corollary 1.3), which
  would be the first upper bound below the trivial alpha <= 1.
- **Its Lean release goes further:** it proves alpha = 1/2 exactly, with a closed
  formula for rectangular exponents.
  - **Model:** the Comparator challenge states alpha for division-free programs.
    The proof runs through a rectangular model with division gates, with the small
    dimension inner, as in this entry (`MatrixExponent.Rectangle.dual_square`).
  - **Independent audit:** Toledo ([carlostoledo.co/omega](https://carlostoledo.co/omega/)) reports the
    challenge certified. He reports the with-division alpha = 1/2 as passing in a
    later phase, outside the verdict.
  - **Statement audit:** a [statement audit](https://github.com/ryananderson60/superpoly/blob/c49705799ab4ba7e9b2611e3ed69d56ec298f7c6/docs/audits/nine-fourths-2026-11.md) by the author of this change
    compares the Lean with the paper. It did not build the Lean.
- **Not covered:** no human refereeing yet. If correct, alpha = 1/2 resolves this
  entry, and beating 1/2 would contradict a machine-checked theorem.

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

The laser-method experiments that set the old record (0.321334) cannot reach the new
one, and the rectangular barriers of Christandl, Le Gall, Lysikov and Zuiddam cap
that family. The live work is verification: referee the claimed upper bound
alpha <= 2/3 in the November 2026 preprint, or check its Lean proof of alpha = 1/2
(`MatrixExponent.Rectangle.dual_square`), whose rectangular model allows division
and puts the small dimension inside, as in this entry. A human-readable proof of
alpha = 1/2 matching the Lean would also be new.

## Verification notes

Checked 25 November 2026 against the arXiv abstracts of 2610.10494 and 2610.30054 and
the OpenAI preprint and Lean release cited above. The SODA 2024 bound 0.321334 was
the record through August 2026.
