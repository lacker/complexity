---
id: subset-sum-below-2-n-over-2
title: "Solve worst-case Subset Sum faster than O*(2^{n/2}) — beat 50-year-old meet-in-the-middle"
genre: improve-algorithm
problems: ["Subset Sum", "Knapsack"]
hypotheses: [ETH, SETH]
record: "O*(2^{n/2}) time (worst case); ~O(2^{0.29n}) known only for random/average-case instances"
record_ref: "Horowitz & Sahni, JACM 1974; average case: Becker, Coron & Joux, EUROCRYPT 2011"
hardness: "no 2^{o(n)} algorithm unless ETH fails; no O(t^{1-eps} · 2^{o(n)}) algorithm (t = target) unless SETH fails"
hardness_ref: "ETH: folklore via IPZ, JCSS 2001; SETH: Abboud, Bringmann, Hermelin & Shabtay, SODA 2019"
status: open
confidence: high
tags: [subset-sum, meet-in-the-middle, exponential-time, cryptography, average-case]
---

## Statement

Given n integers and a target t, decide whether some subset sums exactly to
t, in worst-case time O(2^{(0.5-ε)n}) for some fixed ε > 0 — beating
meet-in-the-middle. Randomized algorithms count. (A secondary open front:
match the 2^{n/2} time with polynomial space.)

## Current record

Horowitz and Sahni (JACM 1974) split the n items into two halves, enumerate
the 2^{n/2} sums of each half, sort, and scan — O*(2^{n/2}) time and space,
where O* hides polynomial factors. Fifty years later, no worst-case
improvement in the exponent is known. Schroeppel and Shamir (SICOMP 1981)
reduced the space to O*(2^{n/4}) at the same time bound, and Nederlof and
Węgrzycki (STOC 2021) pushed space below that benchmark to O(2^{0.246n}) —
progress on space, none on time. The average case tells a different story:
for random instances, the "representation technique" of Howgrave-Graham and
Joux (EUROCRYPT 2010, ~2^{0.337n}) and Becker–Coron–Joux (EUROCRYPT 2011,
~2^{0.29n}) beats meet-in-the-middle soundly, which is why the worst-case
barrier looks suspicious rather than fundamental. On the hardness side,
Abboud, Bringmann, Hermelin and Shabtay (SODA 2019) proved SETH-based lower
bounds in terms of the target t (no O(t^{1-ε} · 2^{o(n)})), but nothing
known connects the 2^{n/2} exponent itself to any hypothesis.

## Why it matters

Subset Sum is the simplest NP-complete problem — no graph, no clauses, just
numbers — and 2^{n/2} is among the oldest unbeaten records in the field.
The exponent is load-bearing in cryptography: knapsack-based cryptosystems
and lattice attack subroutines are calibrated to it, and the
representation-technique literature exists precisely because cryptanalysts
pay for every hundredth in that exponent. A worst-case improvement would
also propagate through exact algorithms that use meet-in-the-middle as a
subroutine (Schroeppel–Shamir-style enumeration appears inside algorithms
for knapsack, binary programming, and decoding).

## Attack surface

(1) Derandomize the average case: the representation technique fails in the
worst case because structured instances (e.g., all items sharing arithmetic
structure) break the uniformity of partial-sum distributions; classify the
obstructing instances — additive-combinatorics tools (Freiman-type
structure theorems) are the natural weapon and this is explicitly proposed
in the literature. (2) Instances with high additive energy are "compressible"
and instances with low additive energy behave randomly; make that dichotomy
algorithmic. (3) The Nederlof–Węgrzycki machinery (orthogonal-vector-style
partitioning of the enumeration space) reduced space; investigate whether
the same partitioning admits any time-space tradeoff below the 2^{n/2}
time point.
