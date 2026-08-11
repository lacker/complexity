---
id: permanent-hafnian-below-2n
title: "Count perfect matchings or Hamiltonian cycles in (2-ε)^n — turn the 2^{n-Ω(√n)} savings into a smaller base"
genre: improve-algorithm
problems: ["Permanent", "Hafnian", "#Perfect Matchings", "#Hamiltonian Cycles"]
hypotheses: [ETH, SETH]
record: "2^{n-Ω(√n)} time for the hafnian of a 2n×2n symmetric matrix (#perfect matchings on 2n vertices, permanent as a special case) and for #Hamiltonian cycles in n-vertex digraphs"
record_ref: "Baitian Li, ICALP 2026 (arXiv:2309.15422); previous record 2^{n-Ω(√(n/log log n))} by Björklund, Kaski & Williams, Algorithmica 2019 (Generalized Kakeya sets / fermionants)"
hardness: "no 2^{o(n)} algorithm unless ETH fails (already for the decision version); no (2-ε)^n-hardness known under SETH or any counting hypothesis"
hardness_ref: "Impagliazzo, Paturi & Zane, JCSS 2001 (via Hamiltonicity reductions)"
status: open
confidence: high
verified: 2026-08-10
tags: [exact-exponential, counting, permanent, matchings, hamiltonicity, algebraic]
---

## Statement

Three tightly linked counting problems: compute the permanent of an n×n
integer matrix (equivalently, count perfect matchings in a bipartite graph);
compute the hafnian of a 2n×2n symmetric matrix (count perfect matchings in
a general 2n-vertex graph — the permanent is the special case of bipartite
double covers); count Hamiltonian cycles in an n-vertex directed graph. All
sit at time 2^{n-Ω(√n)}. The problem: solve any of them in O((2-ε)^n) for a
fixed ε > 0 — constant savings in the exponent, not just root-of-n savings —
or produce the first conditional lower bound of the form "no (2-ε)^n unless
X" for a believable hypothesis X.

## Current record

Ryser's 1963 inclusion-exclusion formula computes the permanent in 2^n
poly(n) time, and for sixty years the base 2 has not moved. Björklund
(SODA 2012, arXiv:1107.4466) matched it for general graphs — counting
perfect matchings on 2n vertices in 2^n poly time, "as fast as Ryser".
The first genuine dents came from polynomial-evaluation machinery:
Björklund, Kaski and Williams (Algorithmica 2019) used generalized Kakeya
sets to evaluate the relevant polynomials at many points cheaply, reaching
2^{n-Ω(√(n/log log n))}. Baitian Li (arXiv:2309.15422, ICALP 2026) removed
the log log factor: a data structure for fast evaluation of high-order
derivatives of the hafnian and Hamiltonian-cycle polynomials, combined with
the Bhargava–Ghosh–Guo–Kumar–Umans multivariate multipoint evaluation,
gives 2^{n-Ω(√n)} for both the hafnian and #HC in digraphs. These are
"below all subsets" savings — subexponential shavings of the 2^n exponent —
and the techniques visibly stall there: multipoint evaluation buys batch
speedups of size 2^{O(√n)} but nothing per-coordinate. Under ETH, 2^{o(n)}
is impossible; between 2^{Θ(√n)} savings and (2-ε)^n lies a total void, with
no algorithm and no hardness.

## Why it matters

The permanent is the original #P-complete problem, and base 2 for it is the
counting analogue of the 2^n barrier for directed Hamiltonicity (problem
directed-hamiltonicity-below-2n) — historically, progress on counting
(Björklund's determinant sums) preceded and enabled the decision
breakthroughs. A (2-ε)^n permanent algorithm would be a once-in-a-generation
result rippling through exact algorithms for TSP, set partition and
fermionant computations; a matching hardness result would be the first
fine-grained lower bound calibrated to a counting base and would anchor the
whole exact-counting web to SETH-style hypotheses.

## Attack surface

Algorithm side: Li's derivative data structure is brand new and its limits
untested — larger derivative batches, characteristic-p shortcuts (the
permanent mod 2^k is polynomial-time by Valiant; interpolating between mod
small powers and the integers is unexplored territory), or tensor-network
evaluation orders (Austrin et al.'s tensor framework) are the live tools.
Structured instances first: matrices with bounded rank deficiency, sparse
digraphs (per-row-sparsity speedups are known and improvable), or
Sylvester/Hadamard-type matrices. Hardness side: reduce from CNF-SAT so
that counting perfect matchings with base (2-ε) solves SAT in (2-ε')^n —
the Set Cover Conjecture and #SETH are candidate anchors, and even an
equivalence between the permanent base and the #Hamiltonian-cycle base
would be a new edge in the web.
