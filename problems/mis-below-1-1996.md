---
id: mis-below-1-1996
title: "Find a maximum independent set faster than O(1.1996^n)"
genre: improve-algorithm
problems: ["Maximum Independent Set"]
hypotheses: [ETH]
record: "O(1.1996^n) time, polynomial space"
record_ref: "Xiao & Nagamochi, Information and Computation 2017"
hardness: "no 2^{o(n)} algorithm unless ETH fails"
hardness_ref: "Impagliazzo, Paturi & Zane, JCSS 2001"
status: open
confidence: high
verified: 2026-08-10
tags: [graphs, exponential-time, branching, measure-and-conquer]
---

## Statement

Give an algorithm that computes a maximum independent set (a largest set of
pairwise non-adjacent vertices) in an arbitrary n-vertex graph in time
O(c^n) for some c < 1.1996, beating Xiao and Nagamochi's record. Polynomial
space is the standard the record holds itself to; an exponential-space
improvement would still count but should be flagged.

## Current record

Maximum Independent Set is the drosophila of exponential-time branching
algorithms. The lineage: Tarjan and Trojanowski (1977) gave O(2^{n/3}) ≈
O(1.26^n); Robson (J. Algorithms 1986) reached O(1.2109^n) using exponential
space, and in a widely cited but never formally published 2001 technical
report claimed about 1.1889^n via massive computer-generated case analysis.
Fomin, Grandoni and Kratsch introduced "measure and conquer" (JACM 2009) —
analyzing simple branching rules under a cleverly weighted instance measure —
matching complicated case analyses with clean algorithms. The published
record is Xiao and Nagamochi's O(1.1996^n) in polynomial space (Information
and Computation 2017), a carefully engineered branching algorithm whose
correctness rests on dozens of local reduction rules (degree folding, mirror
and satellite arguments, etc.). The only lower bound is ETH's 2^{o(n)}
exclusion; nothing rules out, say, O(1.05^n).

## Why it matters

Independent Set upper bounds propagate: algorithms for Vertex Cover,
Clique (by complementation on dense instances), and many graph problems
whose branching bottleneck is an independent-set-like subroutine cite this
base directly. The problem is also the cleanest testbed for whether the
branching/measure-and-conquer paradigm has hit a wall — progress has stalled
in the fourth digit since 2017, while the unpublished Robson claim suggests
at least 1.189 is achievable by brute-force case engineering. Certifying or
beating that number with a verifiable proof would clean up a 25-year-old
loose end in the field's ledger.

## Attack surface

This is arguably the most automation-friendly problem in the deck. (1) The
measure-and-conquer framework reduces the analysis to an optimization
problem over weight functions; enlarging the rule set and re-optimizing
weights is mechanical and was historically done by hand or ad-hoc scripts —
a systematic search over branching rules plus an LP/convex solver for the
measure is a plausible path to shaving digits. (2) Formal verification:
Robson's 1.1889 case analysis was too large to referee; regenerating such an
analysis with machine-checked correctness would set a new published record
even without new ideas. (3) Bottleneck instances are known to be graphs of
maximum degree 5-6; improved dedicated algorithms for these degree classes
(an active subliterature: degree-3 stands near 1.0836^n, Xiao–Nagamochi)
plug directly into the general bound.

## Verification notes

Checked August 2026. O(1.1996^n) (Xiao–Nagamochi, Information and Computation
2017) remains the published general record; no faster exact algorithm was
found in 2024–2026 sources. Cautionary data point for the degree-bounded lane:
the claimed O(1.0821^n) degree-3 algorithm (Issac–Jaiswal, arXiv:1308.1351)
was withdrawn in 2022 after a bug surfaced in its case analysis, so the
1.0836^n degree-3 figure cited above still stands — and underlines why
machine-checked case analyses (attack item 2) would be valuable.
