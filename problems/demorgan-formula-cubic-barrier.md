---
id: demorgan-formula-cubic-barrier
title: "Break the cubic barrier for de Morgan formulas: the record is n^{3−o(1)} (Håstad, tightened by Tal) and n^{3+eps} needs a new technique"
genre: missing-hardness
problems: ["Formula Lower Bounds", "Andreev's Function", "KRW Composition"]
hypotheses: []
record: "Omega(n^3 / (log^2 n · log log n)) de Morgan formula size for Andreev's function, tight for that function up to the log log n factor"
record_ref: "Tal, FOCS 2014 (ECCC TR14-048, \"Shrinkage of De Morgan Formulae by Spectral Techniques\"), sharpening Håstad, SICOMP 1998"
hardness: "no conditional lower bound applies; the structural barrier is that the shrinkage exponent of de Morgan formulas is exactly 2, so all restriction-based arguments cap at n^3 — the known route past cubic is the KRW composition conjecture"
hardness_ref: "Håstad, SICOMP 1998 (shrinkage exponent 2 is optimal); Karchmer, Raz & Wigderson, Computational Complexity 1995 (KRW conjecture)"
status: open
confidence: high
verified: 2026-08-10
tags: [formula-complexity, shrinkage, krw, andreev, de-morgan]
---

## Statement

Exhibit an explicit Boolean function requiring de Morgan formulas (binary
AND/OR gates, negations at leaves) of size n^{3+eps} for some eps > 0. Or,
short of that, remove the remaining lower-order slack: prove a clean Omega(n^3)
bound, or prove the same n^{3−o(1)} bound for a function computable with fewer
resources than Andreev's (progress here has real content — a cubic bound is
already known for a function in AC0).

## Current record

The record line runs Subbotovskaya (n^{1.5}, 1961), Khrapchenko (n^2, 1971),
Andreev (n^{2.5}), Håstad (SICOMP 1998), who proved the shrinkage exponent of
de Morgan formulas under random restrictions is 2 and derived size n^{3−o(1)}
for Andreev's function. Tal (FOCS 2014) tightened the shrinkage analysis by
spectral techniques, giving Omega(n^3 / (log^2 n · log log n)) — tight for
Andreev's function up to the log log n factor, so this particular hard-function
family is nearly exhausted. Alternative cubic proofs exist: Dinur and Meir via
KRW-style communication complexity, Gál–Tal–Trejo Nuñez (ITCS 2019) for
compositions with majority, and Filmus–Meir–Tal (arXiv:2012.02210) proved a
cubic bound for an explicit AC0 function via shrinkage under random
projections. Nothing above n^3 is known for any explicit function, and
Khrapchenko-style and shrinkage-style methods provably cannot get there.

## Why it matters

Formula lower bounds are the direct route to separating NC1 from P: any
explicit function with formula size n^{omega(1)} does it. The KRW conjecture —
that formula depth is roughly additive under function composition — would
yield that separation, and each concrete improvement past n^3 for composed
functions is a step on that ladder. Formula-size records also propagate:
shrinkage bounds power the best #SAT algorithms, pseudorandom generators, and
quantum-vs-classical query separations for formulas, so a sharper structural
understanding moves several nodes at once.

## Attack surface

The KRW program is the marked trail: prove the composition conjecture for
inner functions beyond the universal relation and multiplexer cases already
known (Dinur–Meir; de Rezende–Meir–Nordström–Pitassi–Robere and successors).
Composing Andreev-style outer functions with majority (Gál–Tal–Trejo Nuñez)
gives candidate functions where n^{3+eps} is plausibly provable first. A
different bite: depth lower bounds better than 3 log n for restricted top
gates (CCC 2022) suggest hybrid arguments — restriction plus communication —
that evade pure-shrinkage limits. For automation: shrinkage-style proofs
reduce to concrete spectral inequalities about restricted formulas, a search
space where candidate potential functions can be tested numerically before
proving them.

## Verification notes

Checked August 2026: no super-cubic de Morgan formula lower bound for an
explicit function has been published; surveys and recent papers still cite
Håstad/Tal's n^{3−o(1)} as the record.
