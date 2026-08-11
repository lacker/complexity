---
id: mst-optimal-complexity
title: "Find a deterministic linear-time comparison-based MST algorithm — or pin down the complexity of the Pettie–Ramachandran algorithm, which is provably optimal but nobody knows how fast it is"
genre: improve-algorithm
problems: ["Minimum Spanning Tree"]
hypotheses: []
record: "deterministic O(m α(m,n)) time; an optimal algorithm exists whose runtime T*(m,n) is only known to satisfy Ω(m) ≤ T*(m,n) ≤ O(m α(m,n)); randomized takes linear expected time"
record_ref: "Chazelle, J. ACM 47(6), 2000; Pettie & Ramachandran, J. ACM 49(1), 2002; randomized: Karger, Klein & Tarjan, J. ACM 42(2), 1995"
hardness: "Ω(m) trivially; no super-linear lower bound on the MST decision-tree complexity is known"
hardness_ref: "—"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [graphs, mst, comparison-model, decision-trees, inverse-ackermann, classic]
---

## Statement

Compute a minimum spanning forest of an m-edge, n-vertex graph with real edge weights, deterministically, in the comparison model. The record to beat is Chazelle's O(m α(m,n)), where α is the inverse Ackermann function. Equivalently — and this is the strange part — determine the function T*(m,n), the decision-tree complexity of MST: Pettie and Ramachandran exhibited a deterministic algorithm that provably runs in O(T*(m,n)) time, so the algorithm is optimal, but its running time is unknown. Show T*(m,n) = O(m), or prove T*(m,n) = ω(m).

## Current record

Chazelle (J. ACM 2000) reached O(m α(m,n)) via soft heaps, whose controlled corruption drives the inverse-Ackermann recursion. Pettie and Ramachandran (J. ACM 2002) then built an algorithm optimal on every instance: partition into inverse-Ackermann-sized components, look up provably optimal decision trees for them by brute force, and finish with known machinery — so the uniform and decision-tree complexities of MST provably coincide, and the whole question is now information-theoretic. Everything around the problem is linear: randomized MST takes expected linear time (Karger–Klein–Tarjan, J. ACM 1995), MST verification is deterministic linear (Dixon–Rauch–Tarjan 1992; King 1997; Hagerup 2009), and deterministic linear algorithms exist for integer weights on the word RAM (Fredman–Willard 1994), for dense graphs (Fredman–Tarjan 1987), and for minor-closed families (Mareš 2004). The α(m,n) sliver for sparse general graphs in the comparison model is the entire residue — unmoved since 2000.

## Why it matters

Partly a node update, but with real edges: MST bounds propagate into sensitivity analysis, dynamic and parallel MST, and Chazelle's soft-heap accounting is the same tool behind selection-from-heaps and X+Y selection results. More structurally, this is the flagship instance of the "nonuniform-easy, uniform-?" phenomenon that this list also tracks for Sorting X+Y and 3SUM decision trees — except here uniform = nonuniform is a theorem and only the number is missing. A proof that T* = O(m) finishes a fifty-year program begun with Borůvka revivals; a proof that T* = ω(m) would be the first natural problem separating deterministic comparison complexity from randomized (KKT's expected-linear bound makes any super-linear worst-case decision-tree lower bound extraordinarily delicate).

## Attack surface

(1) Derandomize KKT: the single randomized ingredient is edge sampling for F-light edge filtering; a deterministic sampler with soft-heap-style guarantees closes the problem — this is the standard stalled route, and the corruption/sampling trade-off is a concrete combinatorial target. (2) Improve soft-heap accounting: Chazelle's analysis charges corruption conservatively; Pettie's sub-inverse-Ackermann sensitivity result (ISAAC 2005) shows the machinery has slack. (3) Decision-tree side: T* for components of size up to α is computable by finite search — extending explicit optimal decision trees to larger blocks (a machine-checkable computation) directly lowers the crossover in Pettie–Ramachandran and would quantify progress even without resolving the asymptotics.
