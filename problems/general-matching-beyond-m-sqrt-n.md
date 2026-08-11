---
id: general-matching-beyond-m-sqrt-n
title: "Maximum matching in general graphs is stuck at O(m sqrt(n)) since 1980 — bipartite fell to m^{1+o(1)}, non-bipartite didn't"
genre: improve-algorithm
problems: ["Maximum Cardinality Matching", "Maximum Matching in General Graphs"]
hypotheses: []
record: "O(m sqrt(n)) deterministic; O(n^omega) randomized for dense graphs"
record_ref: "Micali & Vazirani, FOCS 1980 (complete proof: Vazirani, arXiv:2012.03582); dense: Mucha & Sankowski, FOCS 2004"
hardness: "none known — no super-linear conditional lower bound"
hardness_ref: "n/a"
status: open
confidence: high
verified: 2026-08-10
tags: [graphs, matching, blossoms, max-flow, deterministic-vs-randomized, post-max-flow]
---

## Statement

Compute a maximum cardinality matching in a general (non-bipartite) graph in
time O(m sqrt(n) / polylog n) or better — ideally m^{1+o(1)}, matching what
the flow revolution delivered for bipartite graphs. Any bound of the form
m^{1+o(1)} or even O(m n^{1/2 - eps}) for sparse general graphs would be the
first improvement in over four decades.

## Current record

Micali and Vazirani (FOCS 1980) gave an O(m sqrt(n)) algorithm via
shortest-length augmenting-path phases in the presence of blossoms; the
algorithm is so intricate that a complete proof was only settled by Vazirani
(arXiv:2012.03582), and expositions and simplifications are still being
published (e.g., a 2026 revisit of Gabow's variant, arXiv:2603.22909). For
dense graphs, Mucha and Sankowski (FOCS 2004) achieve randomized O(n^omega)
via Gaussian elimination on the Tutte matrix — better than m sqrt(n) only
when m is large, and with no deterministic counterpart. Contrast the
bipartite case: min-cost flow solves it, so Chen, Kyng, Liu, Peng, Probst
Gutenberg and Sachdeva (FOCS 2022, arXiv:2203.00671) give m^{1+o(1)}, and
even a purely combinatorial n^{2+o(1)} algorithm is known (Chuzhoy & Khanna,
arXiv:2405.20861). None of these techniques currently handles odd cycles:
matching in general graphs is not a flow problem, and its LP requires the
exponentially many blossom constraints. No conditional lower bound separates
the problem from linear time.

## Why it matters

This is the sharpest deterministic-vs-structural gap left by the max-flow
breakthrough: two problems that were twins for 50 years (Hopcroft–Karp 1973
bipartite, Micali–Vazirani 1980 general, identical bounds) now differ by
a factor of essentially sqrt(n) on sparse graphs. Whatever closes the gap
must either import continuous optimization into blossom territory — the
matching polytope was the original test case of polyhedral combinatorics, so
an interior-point method over it would be a landmark — or find a genuinely
new combinatorial idea, which would likely also advance weighted matching,
b-matching, and the T-join problems that inherit blossom machinery. A
super-linear conditional lower bound would be equally novel: no fine-grained
hypothesis currently says anything about matching.

## Attack surface

(1) The flow-imitation route: formulate general matching as an optimization
over the matching polytope and find a barrier or potential whose iterations
reduce to solvable subproblems — partial results for special graph classes
(planar: O(n^{omega/2}) via Gaussian elimination; bounded-genus, minor-free)
show the LP is not always the obstacle. (2) The scaling route: Gabow's
weighted-matching scaling framework achieves O(m sqrt(n) log(nW)); making any
phase run in m^{1+o(1)} total time would transfer to the cardinality case.
(3) The reduction route: reduce general matching to polylog many max-flow or
min-cost-flow calls — even with n^{o(1)} overhead this closes the problem;
decremental and dynamic matching papers (e.g., arXiv:2312.09077) have built
partial machinery for exactly this. (4) Easier first targets: randomized
m^{1+o(1)} (Tutte-matrix sketching plus recent inverse-maintenance tools), or
beating m sqrt(n) for m = Theta(n) where n^omega does not help.
