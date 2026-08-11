---
id: combinatorial-bmm-savings
title: "Beat n^3 / 2^{Omega((log n)^{1/7})} for combinatorial Boolean matrix multiplication — push the savings toward 2^{Omega(log n)}, i.e., truly subcubic"
genre: improve-algorithm
problems: ["Boolean Matrix Multiplication", "Triangle Detection"]
hypotheses: ["BMM (combinatorial subcubic-hardness conjecture)"]
record: "n^3 / 2^{Omega((log n)^{1/7})} time, combinatorial"
record_ref: "Abboud, Fischer, Kelley, Lovett & Meka, STOC 2024 (\"New Graph Decompositions and Combinatorial Boolean Matrix Multiplication Algorithms\", arXiv:2311.09095)"
hardness: "conjectured: no n^{3-eps} combinatorial algorithm (the BMM conjecture); many equivalences known via triangle detection"
hardness_ref: "Vassilevska Williams & Williams, FOCS 2010 (subcubic equivalences)"
status: open
confidence: high
verified: 2026-08-10
tags: [matrix-multiplication, combinatorial, bmm, regularity, fine-grained]
---

## Statement

Boolean matrix multiplication (BMM): given two n x n matrices over {0,1},
compute their product where + is OR and x is AND. Fast algebraic algorithms do
this in n^{omega} < n^{2.372} time, but they route through cancellation-heavy
arithmetic that is galactically impractical and gives no combinatorial insight.
A "combinatorial" algorithm — informally, one built from set intersections,
table lookups, and graph decompositions rather than algebraic cancellation —
was long stuck at polylog savings. The problem: give a combinatorial BMM algorithm
running in n^3 / 2^{omega((log n)^{1/7})} time, i.e., asymptotically beat the
current savings exponent 1/7 — or make real progress on the conjecture that
n^{3-eps} is combinatorially impossible.

## Current record

For decades the record was "Four Russians"-style polylog shaving, culminating in
Chan (n^3 (log log n)^3 / log^3 n, SODA 2015) and Yu (n^3 poly(log log n) /
log^4 n, ICALP 2015). Abboud, Fischer, Kelley, Lovett and Meka (STOC 2024) blew
past the polylog regime with the first n^3 / 2^{(log n)^{eps}} combinatorial
algorithm, with eps = 1/7, by importing the Kelley–Meka additive-combinatorics
machinery (of 3-term-arithmetic-progression fame) as a new graph regularity
decomposition. The 1/7 exponent checks out against the arXiv abstract
(2311.09095, v2 May 2024): running time n^3 / 2^{Omega((log n)^{1/7})}, via a
decomposition into 2^{O((log(1/delta))^7)} pseudo-regular parts. As of 2026-08
no published improvement is known; note that a March 2024 preprint claiming a
strongly subcubic combinatorial triangle-detection algorithm (Dumitrescu,
arXiv:2403.01085) was withdrawn after a flaw was found. On the flip side, the
BMM conjecture (no truly subcubic combinatorial algorithm) underpins conditional
lower bounds for triangle detection and many graph and string problems via the
subcubic-equivalence framework of Vassilevska Williams and Williams.

## Why it matters

BMM is the hub node for "combinatorial" fine-grained hardness: dozens of
published lower bounds are phrased as "unless BMM has a truly subcubic
combinatorial algorithm." Improving the savings exponent stress-tests that whole
cluster; reaching 2^{Omega(log n)} savings would equal n^{3-eps} and refute the
conjecture outright, collapsing many conditional results. Progress in either
direction rewires a large region of the web.

## Attack surface

The 2024 breakthrough works via decompositions into pseudo-regular pieces; the
1/7 exponent traces to losses in the Kelley–Meka sifting argument, and any
quantitative improvement to those additive-combinatorics bounds should propagate
directly — that dependency chain is the most concrete bite point. Indeed, an
improved sifting argument for grid norms has already appeared (Kelley & Lyu,
arXiv:2505.01587, 2025), though stated for multiparty communication complexity;
whether it propagates to the BMM exponent is exactly the question to ask first.
Special cases
first: sparse BMM, or triangle detection (equivalent to BMM under subcubic
reductions, sometimes easier to shave). On the pessimistic side, even a formal
definition of "combinatorial" under which n^{3-eps} is provably impossible would
be a publishable structural result.
