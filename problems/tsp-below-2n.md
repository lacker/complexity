---
id: tsp-below-2n
title: "Solve weighted TSP in O((2-ε)^n) — beat Bellman–Held–Karp after 60+ years"
genre: improve-algorithm
problems: ["Traveling Salesman Problem", "Hamiltonicity"]
hypotheses: [ETH, SETH]
record: "2^n n^2 / 2^{Ω(√log n)} deterministic time (general weights) — base 2 with a lower-order shaving; O(1.9999^n) for bipartite TSP assuming quadratic-time matrix multiplication"
record_ref: "Bellman 1962; Held & Karp 1962; shaving: Stoian, arXiv:2405.03018. Bipartite: Nederlof, STOC 2020"
hardness: "no 2^{o(n)} algorithm unless ETH fails"
hardness_ref: "Impagliazzo, Paturi & Zane, JCSS 2001"
status: open
confidence: high
verified: 2026-08-10
tags: [tsp, exponential-time, dynamic-programming, weights]
---

## Statement

Give an algorithm that solves the Traveling Salesman Problem — find a
minimum-total-weight cycle visiting all n cities, with arbitrary
(say, integer, polynomially bounded is already interesting) edge weights —
in time O((2-ε)^n) for some fixed ε > 0. The question is open even for
undirected graphs with polynomially bounded weights.

## Current record

The Bellman and Held–Karp dynamic program from 1962 — for each subset S of
cities and each endpoint v, store the cheapest path from the start covering
exactly S and ending at v — runs in O(2^n n^2) time and stood untouched for
over sixty years until Stoian (arXiv:2405.03018, 2024) shaved a
lower-order factor: deterministic time 2^n n^2 / 2^{Ω(√log n)}, by
remodeling the DP recursion as a min-plus matrix product and applying
Williams-style faster-than-naive algorithms. The base of the exponent is
still exactly 2. The contrast with the
unweighted decision problem is stark: Björklund's algebraic sieve (SICOMP
2014) decides undirected Hamiltonicity in O(1.657^n), but the cancellation
trick counts witnesses modulo 2 and has no known way to carry weights —
optimization seems to genuinely resist the algebraic route. The frontier
result is Nederlof (STOC 2020), who gave an O(1.9999^n) algorithm for TSP
on bipartite graphs, conditional on matrix multiplication being doable in
essentially quadratic time (ω = 2). That result is best read as proof that
the 2^n wall is not information-theoretic even with weights. For directed
weighted TSP, nothing with base below 2 is known under any assumption. On the
lower-bound side, only ETH's 2^{o(n)} exclusion applies; no (2-ε)^n
hardness is known under SETH or the Set Cover Conjecture.

## Why it matters

TSP is the most famous NP-hard optimization problem, and "2^n from 1962" is
the single most cited example of a stuck exponential bound. A (2-ε)^n
algorithm would demonstrate a technique for carrying weights through
subset-enumeration barriers, which would likely transfer to weighted
versions of the whole 2^n club (weighted set cover/partition, weighted
connectivity DPs on subsets). A matching conditional lower bound would be
equally significant: it would be the first tight hardness for a canonical
weighted subset-DP problem and a template for many more.

## Attack surface

(1) Weaken Nederlof's assumptions: remove the bipartiteness, or replace the
ω = 2 assumption with current matrix multiplication bounds at the cost of a
smaller ε — both are explicitly posed and concrete. (2) Bounded weights:
weights in {1, 2} or {0, 1} interpolate between Hamiltonicity (solved,
1.657^n) and general TSP; find the smallest weight class where 2^n resists.
(3) Reductions out: show TSP in (2-ε)^n implies a (2-ε)^n Set Cover
algorithm or vice versa — an equivalence would merge this problem with the Set
Cover Conjecture and either transfer Nederlof-style progress or import
hardness.
