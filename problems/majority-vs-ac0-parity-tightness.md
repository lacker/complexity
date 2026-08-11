---
id: majority-vs-ac0-parity-tightness
title: "Majority vs AC0[⊕]: close the gap between 2^{Ω(n^{1/(2d−4)})} and exp(Õ(n^{(2/3)·1/(d−4)})) — the Razborov–Smolensky exponent has moved once in thirty years"
genre: missing-hardness
problems: ["Majority", "MOD-q", "AC0[p] Circuit Lower Bounds"]
hypotheses: []
record: "Majority requires depth-d AC0[⊕] circuits of size 2^{Ω(n^{1/(2d−4)})} for d ≥ 3 — tight up to logs at depths 3 (2^{Θ̃(n^{1/2})}) and 4 (2^{Θ̃(n^{1/4})}); best upper bound for d ≥ 5 is exp(Õ(n^{(2/3)·1/(d−4)}))"
record_ref: "Oliveira, Santhanam & Srinivasan, CCC 2019 (ECCC TR19-073, \"Parity Helps to Compute Majority\"); previous exponent 1/(2(d−1)) from Razborov 1987 / Smolensky 1987"
hardness: "no conditional bound; every known AC0[⊕] lower bound comes from Razborov–Smolensky low-degree polynomial approximation, and the OSS upper bounds show that at depths 3 and 4 that method has already been squeezed dry — any exponent improvement must start at depth 5"
hardness_ref: "Razborov, Mat. Zametki 1987; Smolensky, STOC 1987"
endgame: "already unconditional — a better exponent at any depth d ≥ 5, or a better circuit for Majority, is a new record; one magnification step up, Gap-MKtP ∉ AC0[6][N^{1+ε}] implies EXP ⊄ AC0[6] (Oliveira, Pich & Santhanam, CCC 2019, ECCC TR18-158), and an n^{1+ε} lower bound against AC0_{d+2}[m] for any 2^{n^β}-sparse NP language implies NP ⊄ AC0_d[m][n^k] for all k (Chen, Jin & Williams, FOCS 2019, ECCC TR19-118)"
status: open
confidence: high
verified: 2026-08-10
tags: [circuit-complexity, ac0p, polynomial-method, lower-bounds, majority]
---

## Statement

Determine the true exponent for computing Majority by depth-d AC0[⊕]
circuits (constant-depth circuits with AND, OR, NOT and unbounded fan-in
parity gates). For d ≥ 5 the lower bound is 2^{Ω(n^{1/(2d−4)})} and the
upper bound is exp(Õ(n^{(2/3)·1/(d−4)})): improve either side. Any
improvement of the lower-bound exponent for any explicit function against
AC0[p] circuits beats a record that moved exactly once between 1987 and
2019.

## Current record

Razborov (1987) and Smolensky (1987) proved that Majority and MOD-q require
exp(n^{Ω(1/d)})-size depth-d AC0[p] circuits — the strongest lower bounds
known for any circuit class containing AC0, with exponent 1/(2(d−1)) for
Majority. Oliveira, Santhanam and Srinivasan (CCC 2019) improved the
Majority exponent to 1/(2d−4) for d ≥ 3, and, surprisingly, showed the
polynomial method's answer is the truth at small depths: Majority has
depth-3 AC0[⊕] circuits of size 2^{Θ̃(n^{1/2})} and depth-4 circuits of
size 2^{Θ̃(n^{1/4})} — parities genuinely help, beating the
divide-and-conquer AC0 upper bound 2^{Θ(n^{1/(d−1)})}. For d ≥ 5 they give
circuits of size exp(Õ(n^{(2/3)·1/(d−4)})) for every symmetric function,
leaving a constant-factor gap in the exponent (1/2 vs 2/3, per depth unit)
that is open as of August 2026. No improvement for MOD-q against AC0[p] at
large depth has been published either.

## Why it matters

AC0[p] is the strongest circuit class with known exponential lower bounds;
one prime further (AC0[6]) nothing is known — see
acc0-frontier-beyond-nqp. Sharpening the exponent here calibrates the only
lower-bound technique (approximation by low-degree polynomials over F_p)
that survives past AC0, and the OSS depth-3/4 tightness results turn the
question from "push the method" into "find the truth": either Majority
circuits get smaller at depth 5 and beyond, or a new argument must beat
degree-√n polynomial approximation. The magnification bridges sit directly
above: an N^{1+ε} bound for Gap-MKtP against AC0[6] — a class where
Razborov–Smolensky-style bounds are exactly what is missing — gives
EXP ⊄ AC0[6] (OPS), and sparse-NP magnification (CJW) converts even
n^{1+ε} bounds against AC0_{d+2}[m] into fixed-polynomial separations.

## Attack surface

The OSS upper bounds work by combining probabilistic polynomials over F_2
with exact sparse polynomial representations; the lower bound is a
refinement of Razborov's original argument. Three concrete openings:
(1) depth 5 — the first depth where the gap opens; either extend the
depth-3/4 constructions one level or prove 2^{ω(n^{1/6})} hardness;
(2) asymmetric moduli — port the 1/(2d−4) improvement from AC0[⊕] to
AC0[p] for odd primes p, where the pre-2019 exponent may still be the
record; (3) the coefficient-of-d question — any technique giving exponent
c/d with c > 2/3 for upper bounds or c > 1/2 for lower bounds settles the
shape. The polynomial-method bottleneck is understood well enough that a
systematic search over probabilistic-polynomial constructions is a
plausible machine-assisted project.
