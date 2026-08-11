---
id: max-flow-remove-subpolynomial
title: "Maximum flow is m^{1+o(1)} — remove the o(1) and get truly near-linear O(m polylog n), even randomized"
genre: improve-algorithm
problems: ["Maximum Flow", "Minimum-Cost Flow", "Minimum s-t Cut"]
hypotheses: []
record: "m^{1+o(1)} time, randomized and deterministic, for exact max flow and min-cost flow with polynomially bounded integer capacities"
record_ref: "Chen, Kyng, Liu, Peng, Probst Gutenberg & Sachdeva, FOCS 2022 (arXiv:2203.00671); deterministic: van den Brand, Chen, Kyng, Liu, Peng, Probst Gutenberg, Sachdeva & Sidford, FOCS 2023 (arXiv:2309.16629)"
hardness: "none known — no super-linear conditional lower bound for exact max flow"
hardness_ref: "n/a"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [graphs, max-flow, min-cost-flow, near-linear, interior-point, tighten-overhead]
---

## Statement

Compute an exact maximum s-t flow in a directed graph with m edges and
polynomially bounded integer capacities in O(m polylog n) time. The 2022
breakthrough runs in m^{1+o(1)}, where the o(1) hides a subpolynomial factor
of the form exp(log^c m) for a constant c < 1 — asymptotically bigger than any
polylog. Replacing it with an explicit polylogarithmic factor, even by a
randomized algorithm and even for unit capacities, is the open problem.

## Current record

Chen, Kyng, Liu, Peng, Probst Gutenberg and Sachdeva (FOCS 2022 best paper,
arXiv:2203.00671) solve min-cost flow — hence max flow — in m^{1+o(1)} time:
an interior point method that takes m^{1+o(1)} approximate undirected
min-ratio cycle steps, each implemented in amortized m^{o(1)} time by a
dynamic data structure built on low-stretch spanning trees and a hierarchy of
sparsified core graphs. The same team plus van den Brand and Sidford
derandomized it (FOCS 2023, arXiv:2309.16629), so randomness is not the
bottleneck — the first deterministic improvement over Goldberg–Rao (1998)
landed already at m^{1+o(1)}. A different, combinatorial route (augmenting
paths with a push-relabel subroutine) achieves n^{2+o(1)} (Bernstein,
Blikstad, Saranurak and Tu, FOCS 2024), which is near-optimal for dense graphs
but again carries the o(1). No known technique gives exact max flow in
O(m polylog n), and no conditional lower bound forbids O(m) time.

## Why it matters

Max flow is the universal subroutine of graph algorithms: bipartite matching,
Gomory–Hu trees, vertex connectivity, sparsest cut approximations, and dozens
of scheduling and vision problems reduce to it. Every one of those reductions
currently inherits the m^{o(1)} factor — recent work even states bounds as
"polylog many max-flow calls," making the flow record the unit of account.
The subpolynomial factor is not cosmetic: it stems from the recursive
hierarchy having log^c m levels with multiplicative overhead per level, the
same structural obstacle that kept expander-decomposition-based algorithms at
m^{1+o(1)} across the field. Whoever removes it here likely removes it
everywhere the hierarchy pattern appears.

## Attack surface

Known wedges: (1) special regimes first — unit-capacity max flow was
m^{4/3+o(1)} before 2022, and planar or bounded-genus graphs already have
O(m polylog n) exact algorithms, so the question is which structure the
hierarchy actually needs; (2) the data-structure route — the min-ratio cycle
oracle is the sole source of the o(1); a fully-dynamic low-stretch tree or
spanner with polylog (rather than subpolynomial) update time and quality loss
would immediately yield near-linear flow, and this is a well-posed
data-structure problem; (3) the IPM route — reducing the iteration count
below m^{1+o(1)} or using stronger steps (as in the almost-linear "min-ratio
cut" line for other problems) trades one o(1) for another unless the
hierarchy flattens; (4) approximate undirected max flow is already
O(m polylog n), so the gap is precisely exactness plus direction — a
directed analogue of congestion-approximator machinery is a concrete target.
