---
id: acc0-frontier-beyond-nqp
title: "Push the ACC0 lower-bound frontier below NQP: the record separations are NQP ⊄ ACC0 and sub-half-exponential bounds for NEXP — NP ⊄ ACC0 is wide open"
genre: missing-hardness
problems: ["ACC0 Circuit Lower Bounds", "Circuit-Analysis Algorithms"]
hypotheses: []
record: "NQP = NTIME[2^{polylog n}] has no polynomial-size ACC0 circuits; strengthened to strong average-case (no (1/2 + 1/poly)-approximation) and almost-everywhere versions; NEXP has no ACC0 circuits of sub-half-exponential size"
record_ref: "Murray & Williams, STOC 2018 / SICOMP 2020; Chen & Ren, STOC 2020 (SICOMP 2022); Chen, Lyu & Williams, FOCS 2020; Chen, ECCC TR22-183"
hardness: "no conditional lower bound applies; the barrier landscape is the point: the algorithmic method evades relativization and algebrization, and natural proofs is not known to apply to ACC0 (no candidate pseudorandom functions in ACC0) — the bottleneck is designing non-trivial satisfiability/derandomization algorithms for larger classes and sharper easy-witness lemmas"
hardness_ref: "Williams, JACM 2014 (\"Nonuniform ACC Circuit Lower Bounds\", the algorithmic method); Razborov & Rudich, JCSS 1997 (natural proofs, for context)"
status: open
confidence: high
verified: 2026-08-10
tags: [circuit-complexity, acc0, algorithmic-method, derandomization, lower-bounds]
---

## Statement

ACC0 is the class of constant-depth polynomial-size circuits with AND, OR,
NOT and MOD-m gates for a fixed constant m. Beat the current frontier in any
of three directions: (1) separate a class smaller than NQP from
polynomial-size ACC0 — NP ⊄ ACC0, or even NTIME[n^{log^* n}] ⊄ ACC0, would be
a breakthrough; (2) improve the size bound against NEXP beyond
sub-half-exponential; (3) extend the separations to a larger circuit class,
with TC0 (constant-depth threshold circuits) as the canonical next wall —
NEXP vs TC0 is open.

## Current record

Williams (2011) launched the algorithmic method with NEXP ⊄ ACC0, converting
a marginally-better-than-brute-force ACC0 satisfiability algorithm into a
lower bound. Murray and Williams (STOC 2018) sharpened the easy-witness lemma
to bring the hard class down to NQP = NTIME[2^{polylog n}] — still the record
worst-case separation, and it holds even against ACC0 circuits with a bottom
layer of threshold gates. Chen and Ren (STOC 2020) upgraded it to strong
average-case hardness: NQP cannot be (1/2 + 1/poly(n))-approximated by
polynomial-size ACC0 circuits. Chen, Lyu and Williams (FOCS 2020) made the
lower bounds almost-everywhere rather than infinitely-often. Lijie Chen (ECCC
TR22-183) proved MA_{ACC0} lower bounds via a derandomization-centric
reframing and improved the NEXP size bound from sub-third-exponential to
sub-half-exponential. No separation of NP, P, or even quasi-NP-below-NQP from
ACC0 is known, and TC0 remains untouched by the method.

## Why it matters

This is the one program that has produced genuinely new non-uniform lower
bounds this century, and it is reduction-shaped in the repository's sense:
each new circuit-analysis algorithm (SAT, CAPP, or derandomization for a
class C) mechanically converts into a lower bound against C. Progress
decomposes into concrete algorithmic targets — a non-trivial SAT algorithm
for TC0 circuits of superlinear wire count, or derandomization of MA_{ACC0}
on all input lengths — each publishable on its own. Conversely, the
half-exponential plateau for NEXP is a known structural artifact of
easy-witness arguments; breaking it likely requires a new witness lemma,
which would propagate to every class the method touches.

## Attack surface

Three marked trails. First, sharpen easy-witness lemmas: the NQP-to-NP gap is
exactly the loss in Murray–Williams' lemma, and Chen's TR22-183 shows
reframings still yield gains. Second, port the method to TC0: the missing
piece is a better-than-brute-force satisfiability or CAPP algorithm for
depth-d threshold circuits — known algorithms handle only very sparse wire
budgets. Third, uniformity: MA and Merlin-Arthur-style lower bounds (Chen)
suggest hybrid uniform/non-uniform targets where the current machinery has
slack. The natural-proofs barrier does not obviously apply to ACC0, so even
combinatorial attacks on MOD-6 gates remain fair game — the correlation of
ACC0 with parity is still not understood.

## Verification notes

Checked August 2026: NQP remains the smallest class known to be outside
polynomial-size ACC0; no NP ⊄ ACC0 or NEXP ⊄ TC0 result has appeared.
2024–2026 activity (GC0 bounds, constructive separations) does not supersede
these records.
