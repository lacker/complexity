---
id: chromatic-number-below-2n
title: "Compute the chromatic number in O((2-ε)^n) time — break the 2^n inclusion-exclusion barrier"
genre: improve-algorithm
problems: ["Graph Coloring", "Chromatic Number", "Set Partition"]
hypotheses: [ETH, SCC]
record: "2^n · poly(n) time"
record_ref: "Björklund, Husfeldt & Koivisto, SICOMP 2009 (announced FOCS 2006)"
hardness: "no 2^{o(n)} algorithm unless ETH fails"
hardness_ref: "Impagliazzo, Paturi & Zane, JCSS 2001"
endgame: "no path from the algorithm side; conversely, any 2^{n-o(n)} lower bound for chromatic number would unconditionally refute Strassen's asymptotic rank conjecture, which implies a deterministic O(1.99982^n) algorithm (Björklund, Curticapean, Husfeldt, Kaski & Pratt, SODA 2025)"
status: open
confidence: high
verified: 2026-08-10
tags: [graphs, coloring, inclusion-exclusion, subset-convolution, exponential-time]
---

## Statement

Give an algorithm computing the chromatic number of an arbitrary n-vertex
graph — the minimum number of colors needed so adjacent vertices get
different colors — in time O((2-ε)^n) for some fixed ε > 0. Equivalently,
break the 2^n barrier for k-coloring with a single ε > 0 uniform in k:
fixed-k coloring is now known to be solvable in (2-ε_k)^n for every
constant k (Zamir 2026, see below), but ε_k degrades with k, so chromatic
number itself still stands at 2^n.

## Current record

Björklund, Husfeldt and Koivisto (FOCS 2006; SICOMP 2009) solved chromatic
number in 2^n · poly(n) time via inclusion-exclusion: k-colorability is
rephrased as covering the vertex set by k independent sets, and the number
of such covers is a signed sum, over all 2^n vertex subsets, of quantities
computable in polynomial time each. This was a breakthrough over the
previous ~2.4^n dynamic programming, and 2^n is a natural information-
theoretic-feeling wall: the algorithm inspects every subset once. For small
k better bases are known — 3-coloring in O(1.3289^n) (Beigel–Eppstein,
J. Algorithms 2005), 4-coloring in O(1.7272^n) (Fomin–Gaspers–Saurabh) —
and Zamir (ICALP 2021) broke the 2^n barrier for 5-coloring and 6-coloring
and for k-coloring of graphs of bounded average degree. In July 2026 Zamir
resolved the fixed-k question entirely: k-coloring has a randomized
(2-ε_k)^n algorithm for every fixed k, with ε_k > 0 depending on k
("k-Coloring is Faster than Computing the Chromatic Number",
arXiv:2607.25973), via the (k+2)-coloring-to-k-list-coloring reduction
combined with hypergraph containers. Since ε_k → 0 as k grows, chromatic
number itself remains at 2^n unconditionally. Conditionally, Björklund,
Curticapean, Husfeldt, Kaski and Pratt (SODA 2025, arXiv:2404.04987) showed
that under Strassen's asymptotic rank conjecture the chromatic number can
be computed deterministically in O(1.99982^n) — so a near-2^n lower bound
for chromatic number would disprove that conjecture. No known hypothesis
rules out (2-ε)^n; the related Set Cover Conjecture asserts the analogous
barrier for Set Cover (and is itself now known to contradict the asymptotic
rank conjecture — see problem set-cover-conjecture-vs-seth).

## Why it matters

Chromatic number is the flagship of the "2^n club": problems solved by
subset dynamic programming or inclusion-exclusion where the base 2 looks
like an artifact of enumerating subsets rather than a true complexity. A
(2-ε)^n algorithm would be a major structural surprise, would likely
introduce a technique bypassing subset enumeration wholesale, and would
put pressure on the Set Cover Conjecture (coloring is a set-partition
problem, the covering cousin of set cover). Zamir's fixed-k break and the
conditional 1.99982^n bound show the wall is not information-theoretic —
which makes the general case a live target rather than a folklore
impossibility.

## Attack surface

(1) Extend Zamir 2026: his ε_k decays with k; making the savings uniform in
k (or handling k that grows with n, say k = Θ(n/log n)) is now the exact
residual frontier — understand where the containers argument loses.
(1b) Unconditional route via tensors: the Björklund–Curticapean–Husfeldt–
Kaski–Pratt algorithm needs only low asymptotic rank of one explicit tensor
family; bounding rank for those tensors unconditionally would close this
problem. (2) Algebraic route: the 2^n algorithm computes a covering
product / subset convolution; any representation of the independent-set
indicator vector admitting faster transforms (à la fast zeta/Möbius with
sparsity) would shave the base. (3) Reverse direction: derive
(2-ε)^n-hardness of chromatic number from the Set Cover Conjecture or SETH
— even that reduction is currently missing, and finding it would also be a
publishable closure of this problem (as a hardness edge rather than an
algorithm).
