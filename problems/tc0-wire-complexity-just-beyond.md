---
id: tc0-wire-complexity-just-beyond
title: "TC0 wires: parity needs n^{1+c^{−d}} wires with c ≈ 2.41 — prove the same shape for every c > 1 for an NC1-complete function and TC0 ≠ NC1 falls out"
genre: missing-hardness
problems: ["Parity", "Boolean Formula Evaluation", "TC0 Circuit Lower Bounds"]
hypotheses: []
record: "any depth-d threshold circuit computing parity needs n^{1+c^{−d}} wires for c ≈ 2.41, matched by upper bounds of the same n^{1+c'^{−d}} shape; average case: parity has correlation at most n^{−ε_d} with depth-d circuits of n^{1+ε_d} wires, with an accompanying #SAT algorithm"
record_ref: "Impagliazzo, Paturi & Saks, SICOMP 1997 (size-depth tradeoffs for threshold circuits); average-case and #SAT: Chen, Santhanam & Srinivasan, CCC 2016 (arXiv:1806.06290, Theory of Computing 2018)"
hardness: "no conditional obstruction, but the natural-proofs barrier applies in full: Naor–Reingold candidate pseudorandom functions are computable in TC0, so superpolynomial TC0 bounds need a non-natural (or non-largeness) argument"
hardness_ref: "Naor & Reingold, JACM 2004; Razborov & Rudich, JCSS 1997"
endgame: "if for every c > 1 and all sufficiently large d, some NC1-complete function requires n^{1+c^{−d}} wires in depth-d TC0, then TC0 ≠ NC1 (Chen & Tell, STOC 2019, ECCC TR18-199 — the known c ≈ 2.41 is the only thing in the way); a single fixed-ε bound of n^{1+ε} wires at every constant depth for Boolean Formula Evaluation already gives TC0 ≠ NC1 (Allender & Koucký, JACM 2010); and Gap-MKtP ∉ TC0[N^{1+ε}] implies EXP ⊄ TC0 (Oliveira, Pich & Santhanam, CCC 2019, ECCC TR18-158)"
status: open
confidence: high
verified: 2026-08-10
tags: [circuit-complexity, tc0, wires, hardness-magnification, threshold-circuits]
---

## Statement

Improve the wire lower bound for constant-depth threshold circuits: exhibit
an explicit function requiring n^{1+c^{−d}} wires at depth d for a constant
c smaller than the Impagliazzo–Paturi–Saks c ≈ 2.41 — ideally for an
NC1-complete function such as Boolean Formula Evaluation, and ideally for
every c > 1. Equivalently, prove that some explicit function requires
n^{1+ε} wires (fixed ε > 0) at all constant depths.

## Current record

Impagliazzo, Paturi and Saks (SICOMP 1997) proved that parity requires
n^{1+c^{−d}} wires in depth-d threshold circuits, with c ≈ 2.41; this is
tight in shape, since parity-style functions have depth-d circuits with
n^{1+c'^{−d}} wires for a larger constant c'. Chen, Santhanam and
Srinivasan (CCC 2016) strengthened this to an average-case bound —
correlation at most n^{−ε_d} for circuits with n^{1+ε_d} wires — together
with a better-than-brute-force #SAT algorithm for the same class (see
circuit-sat-frontier-beyond-acc0-thr for the algorithmic frontier). As of
August 2026 no published improvement of the constant c ≈ 2.41 for parity or
for any NC1-complete function is known; recent progress on threshold
circuits (e.g., Chen–Tal–Wang's STOC 2026 n^{2.5−ε} gate bound for
THR∘THR) concerns depth-2 gate counts, not constant-depth wire exponents.

## Why it matters

This is the sharpest known cliff between a routine calculation and a major
separation. Chen and Tell (STOC 2019) proved that the IPS bound shape with
every constant c > 1 — for an NC1-complete function rather than parity —
implies TC0 ≠ NC1; the sole obstruction is the specific constant 2.41.
Allender and Koucký (JACM 2010) had already shown via self-reducibility
that a fixed n^{1+ε} wire bound at all depths for Boolean Formula
Evaluation gives the same separation, so slack anywhere in the c^{−d}
tradeoff converts into the first separation of TC0 from a standard class
above it. The magnification route (OPS CCC 2019) offers a parallel path:
an N^{1+ε} TC0 lower bound for Gap-MKtP implies EXP ⊄ TC0.

## Attack surface

(1) Re-run IPS with modern tools: the proof restricts variables to reduce
depth while keeping many wires alive; the constant 2.41 comes from a
specific tradeoff in that restriction argument, and nothing suggests it is
optimal. (2) Change the hard function: Chen–Tell only needs the bound for
NC1-complete functions, which have more structure than parity (downward
self-reducibility) — the same structure Allender–Koucký exploit — and no
one has proved wire bounds tailored to it. (3) The average-case route:
CSS-style random restrictions plus the Chen–Tell bootstrapping might
tolerate a weaker hypothesis; any quantitative improvement of the
correlation exponent ε_d feeds both the #SAT frontier and the
magnification thresholds. (4) A cheap experiment: recompute the exact
optimal constant achievable by the IPS argument — if the analysis is not
known to be tight, closing the gap between 2.41 and the upper-bound
constant is a self-contained optimization problem.
