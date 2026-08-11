---
id: deterministic-k-path-derandomization
title: "Deterministic k-Path below Tsur's 2.554^k — close the derandomization gap to the randomized 2^k (directed) and 1.657^k (undirected)"
genre: improve-algorithm
problems: ["k-Path", "Longest Path"]
hypotheses: [ETH]
record: "O*(2.554^k) deterministic (works for directed graphs); randomized comparison points: O*(2^k) directed, O*(1.657^k) undirected"
record_ref: "Tsur, Theoretical Computer Science 2019 (arXiv:1808.04185); randomized: Williams, IPL 2009; Björklund, Husfeldt, Kaski & Koivisto, JCSS 2017 (arXiv:1007.1161)"
hardness: "no 2^{o(k)} · poly(n) algorithm unless ETH fails; nothing conditional separates deterministic from randomized time for k-Path"
hardness_ref: "Impagliazzo, Paturi & Zane, JCSS 2001 (via standard Hamiltonicity reductions)"
status: open
confidence: high
verified: 2026-08-10
tags: [parameterized, k-path, derandomization, representative-families, fpt]
---

## Statement

k-Path: decide whether a graph on n vertices contains a simple path on k
vertices. The randomized records are O*(2^k) for directed graphs (Williams,
building on Koutis's group-algebra method) and O*(1.657^k) for undirected
graphs (narrow sieves), but the best *deterministic* algorithm known — for
either graph class — runs in O*(2.554^k) (Tsur). The problem: give a
deterministic algorithm running in O*(c^k) for any c < 2.554. Milestone
targets: deterministic O*(2^k) (matching the directed randomized bound) and
deterministic O*((2-ε)^k) for undirected graphs. This is the deterministic
flank of the k-Path story; the randomized directed barrier has its own problem
(directed-k-path-below-2k).

## Current record

The deterministic line runs through representative families: compute, level
by level, a small subfamily of partial paths that "represents" all of them
with respect to future extensions. Fomin, Lokshtanov, Panolan and Saurabh
(JACM 2016) made this efficient, giving O*(2.619^k); Zehavi's mixing of
color-coding-related techniques pushed to O*(2.597^k) (ESA 2015); and Tsur
(TCS 2019, arXiv:1808.04185) reached O*(2.554^k) via faster computation of
representative sets under separateness conditions, mixed with
divide-and-color and balanced/unbalanced cutting. That is where it has
stood since 2019. The randomized algorithms are far ahead because they
evaluate exponentially large sums at random points and let monomials
cancel: multilinear detection over characteristic 2 gives 2^k (directed),
and the Björklund–Husfeldt–Kaski–Koivisto narrow sieve gives 1.657^k
(undirected, arXiv:1007.1161). Determinantal sieving (Eiben, Koana,
Wahlström, SODA 2024) generalizes the algebraic method but remains
randomized. Under ETH only 2^{o(k)} is excluded; no conditional result says
determinism must cost anything at all.

## Why it matters

k-Path is the standard benchmark on which every parameterized technique
debuts, and the 2.554-vs-1.657 spread is the sharpest, most concrete
derandomization gap in parameterized algorithms. The algebraic algorithms
are polynomial identity tests at heart, so a full derandomization brushes
against PIT and hitting-set questions — but nothing suggests k-Path needs
the full strength of PIT, and partial wins (any c < 2.554) are publishable
by construction. Improvements propagate immediately: Tsur's framework
carries the same constants into k-Tree, r-dimensional k-matching, Graph
Motif and Partial Cover, and deterministic k-path subroutines feed kernels
and approximate counting (e.g. the Dell–Lapinskas line uses detection as a
black box).

## Attack surface

Three bites. (1) Push representative families further: the bases 2.619 →
2.597 → 2.554 each came from reorganizing the computation of representative
sets; the remaining slack in Tsur's balanced-cutting analysis is explicit
in the paper and nobody has optimized it since 2019 — a small, well-posed
optimization problem. (2) Derandomize multilinear detection directly: what
is needed is an explicit hitting set for the specific determinant/walk-sum
polynomials of the 2^k directed algorithm, a far weaker object than general
PIT; even quasi-deterministic (subexponential advice) versions would be
news. (3) Special cases first: bounded-degree graphs, bipartite graphs, or
deterministic algorithms for k-cycle parity — the narrow sieve's
cancellation structure is best understood in the undirected bipartite case,
the natural place to seek a deterministic (2-ε)^k.
