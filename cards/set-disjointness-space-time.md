---
id: set-disjointness-space-time
title: "SetDisjointness data structures: prove space · t^2 = Ω̃(N^2) from 3SUM, matching the folklore upper bound"
genre: missing-hardness
problems: ["SetDisjointness (data structure version)", "3SUM", "Triangle Listing"]
hypotheses: [3SUM, "Strong SetDisjointness conjecture"]
record: "space Õ(N^2 / t^2) suffices for query time t (folklore two-level scheme)"
record_ref: "folklore; stated and conjectured optimal in Goldstein, Kopelowitz, Lewenstein & Porat, WADS 2017"
hardness: "nontrivial but weaker space-time tradeoffs under 3SUM, via triangle-listing reductions"
hardness_ref: "Pătraşcu, STOC 2010; Kopelowitz, Pettie & Porat, SODA 2016"
status: open
confidence: high
verified: 2026-08-10
tags: [3sum, set-disjointness, space-time-tradeoffs, data-structures]
---

## Statement

Data-structure SetDisjointness: preprocess a family of sets S_1, ..., S_k of total size N; a query names a pair (i, j) and asks whether S_i and S_j intersect. The folklore upper bound achieves query time t using Õ(N^2 / t^2) space. The Strong SetDisjointness conjecture (Goldstein, Kopelowitz, Lewenstein and Porat, WADS 2017) says this is optimal: any structure with query time t needs space Ω̃(N^2 / t^2). The challenge: derive this full tradeoff (or match it up to n^{o(1)} factors) from the 3SUM conjecture or another standard fine-grained hypothesis — the currently provable tradeoffs are polynomially weaker than the conjectured one.

## Current record

Upper bound (folklore): call a set "large" if it has more than t elements; there are at most N/t large sets, so all (N/t)^2 large-large answers can be precomputed and stored, while any query involving a small set is answered by scanning its at most t elements against a hash table. This gives space Õ(N^2/t^2) with query time Õ(t), and nothing better is known. Lower bounds: Pătraşcu's 3SUM-to-set-structure reductions (STOC 2010), as sharpened via triangle listing by Kopelowitz, Pettie and Porat (SODA 2016), yield genuine polynomial space-time tradeoffs under 3SUM, but with exponents strictly weaker than N^2/t^2; the full strength is only a conjecture, introduced by Goldstein et al. precisely because so many string-indexing and graph lower bounds would follow from it. In the time-tradeoff (rather than space) setting, Kopelowitz and Vassilevska Williams (ICALP 2020) proved preprocessing/query lower bounds matching the upper-bound curve in part of the parameter range — but only under new bespoke hypotheses about triangle detection/enumeration in unbalanced tripartite graphs, not under 3SUM, so the "re-anchor to a first-tier hypothesis" gap is unchanged.

## Why it matters

SetDisjointness is the de facto "hard core" for space-conscious fine-grained lower bounds: conditional bounds for document retrieval, two-pattern string indexing, distance oracles for sparse graphs, and reachability oracles have all been anchored to it. Today those results rest on the bespoke Strong SetDisjointness conjecture; a reduction from 3SUM would re-anchor an entire literature to a first-tier hypothesis. In the other direction, beating the folklore N^2/t^2 scheme even slightly would refute the conjecture and improve a dozen downstream data structures at once.

## Attack surface

The known 3SUM route goes 3SUM → triangle listing → set structures, and each hop loses a polynomial factor; the first hop's loss is pinned at m^{4/3} (see the triangle-listing card), so the slack to attack is in the second hop, where triangle edges are distributed among sets. Ideas: use OMv instead of 3SUM as the source (online queries match the data-structure setting more naturally), or prove the tradeoff for restricted models first — e.g. structures that only store precomputed answers plus raw sets, where a counting argument might already give N^2/t^2. Also open and closely related: the reverse direction, i.e. does Strong SetDisjointness imply 3SUM-type hardness, which would make it an equivalence rather than a one-way anchor.
