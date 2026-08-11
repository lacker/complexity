---
id: small-depth-frege-fps-threshold
title: "Cross the Filmus–Pitassi–Santhanam threshold: depth-d Frege records for Tseitin and PHP are 2^{Ω̃(n^{1/d})}, while any 2^{n^{ω(1/d)}} bound for CNFs implies superpolynomial Frege lower bounds"
genre: missing-hardness
problems: ["Bounded-depth Frege", "Tseitin formulas", "Pigeonhole Principle"]
hypotheses: []
record: "depth-d Frege refutations of Tseitin contradictions on the n×n grid require size exponential in Ω̃(n^{1/d}), for all d up to K·log n/log log n (improving Håstad's exponent n^{1/(59d)}); the pigeonhole principle on the n×n grid similarly requires size exponential in n^{Ω(1/d)}, improving the 1990s bounds of the form exp(n^{c^{-d}})"
record_ref: "Håstad & Risse, FOCS 2022 / SIAM J. Comput. (arXiv:2209.05839); Håstad, J. ACM 68(1), 2021; Håstad, FOCS 2023 / TheoretiCS 2025 (arXiv:2401.15683)"
hardness: "the exponent 1/d is provably optimal on these formulas: PHP and Tseitin have polynomial-size Frege proofs (Buss, J. Symbolic Logic 52(4), 1987 for PHP), and the FPS translation compiles any poly-size Frege proof of a CNF into a depth-d proof of size 2^{n^{O(1/d)}} — so crossing to n^{ω(1/d)} requires a CNF family that is superpolynomially hard for full Frege, which is exactly what makes the threshold a wall"
hardness_ref: "Filmus, Pitassi & Santhanam, ICALP 2011 / ACM Trans. Computation Theory 2015 (doi 10.1145/2656209)"
endgame: "Filmus–Pitassi–Santhanam: a 2^{n^{ω(1/d)}} size lower bound for refuting CNFs in depth-d Frege translates into a superpolynomial lower bound for unrestricted Frege; combined with Cook–Reckhow (J. Symbolic Logic 44(1), 1979) this is the published magnification route from small-depth records to NP vs coNP"
status: open
confidence: high
verified: 2026-08-10
tags: [proof-complexity, bounded-depth-frege, switching-lemma, tseitin, php, magnification]
---

## Statement

Two ways to move the record. Depth: prove any superpolynomial lower bound
for depth-d Frege with d beyond K·log n/log log n — the current ceiling of
the switching-lemma technology — with depth c·log n being equivalent, by
Reckhow's balancing, to full Frege for CNFs. Strength: prove a
2^{n^{ω(1/d)}} bound for some CNF family at growing depths d, crossing the
Filmus–Pitassi–Santhanam translation threshold, which forces superpolynomial
Frege lower bounds.

## Current record

Ajtai (1988) and Beame–Impagliazzo–Krajíček–Pitassi–Pudlák–Woods (1992)
started the field with superpolynomial PHP bounds whose exponents decayed
doubly exponentially in the depth, of the form exp(n^{c^{-d}}). The modern
generation of multi-switching lemmas fixed the decay: Håstad (JACM 2021)
proved grid Tseitin needs depth-d size exp(n^{Ω(1/(59d))}) for all
d < K·log n/log log n, Håstad–Risse (FOCS 2022) sharpened this to
exp(Ω̃(n^{1/d})), and Håstad (FOCS 2023) brought PHP to the same
exp(n^{Ω(1/d)}) shape via a new switching lemma for matching restrictions.
These exponents are tight: both formulas have polynomial-size Frege proofs,
and FPS compile poly-size Frege proofs into depth-d proofs of size
2^{n^{O(1/d)}}. The record therefore sits exactly on the boundary that
their translation makes meaningful.

## Why it matters

This is proof complexity's version of a magnification threshold, precisely
analogous to mcsp-magnification-threshold on the circuit side: the known
bounds are within an exponent whisker of statements with dramatic
consequences. A CNF family with depth-d complexity 2^{n^{ω(1/d)}} yields
superpolynomial Frege bounds — the flagship open problem — and via
Cook–Reckhow every rung here is unconditional progress toward NP ≠ coNP.
The depth corridor between log n/log log n and log n is the entire remaining
distance between the strongest current technology and Frege itself.

## Attack surface

(1) The log log n bottleneck is quantitative: each switching-lemma round
costs a log factor in the restriction budget, capping d at
log n/log log n; a restriction family whose per-round cost is O(1) would
immediately extend the depth range — Håstad–Risse's tighter accounting is
the current best attempt. (2) Candidate CNFs for crossing the size
threshold must be Frege-hard, so the natural instances are the truth-table
formulas from the Müller–Pich route (see frege-quadratic-size-barrier);
proving those hard even for depth 2 or 3 Frege at size 2^{n^{ε}} is
unexplored and would be new. (3) The line-size regime is open at the
edges: both Håstad papers show proofs with lines of size M need
exp(n/(log M)^{O(d)}) lines, and sharpening the O(d) here directly widens
the depth range where superpolynomial bounds survive.
