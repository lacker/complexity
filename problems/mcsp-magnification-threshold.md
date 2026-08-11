---
id: mcsp-magnification-threshold
title: "Cross the hardness-magnification threshold: Gap-MCSP has an unconditional N^{2−o(1)} formula lower bound, while N^{1+ε} against circuits — for the same problem — implies NP ⊄ P/poly"
genre: missing-hardness
problems: ["MCSP", "MKtP", "Formula Lower Bounds"]
hypotheses: []
record: "Gap-MCSP[2^{βn}/cn, 2^{βn}] unconditionally requires U2-formulas of near-quadratic size; the magnification thresholds: an N^{1+ε} general-circuit lower bound for that same Gap-MCSP implies NP ⊄ P/poly, and N^{2+ε} B2-formula (or N^{3+ε} U2-formula, or N^{1+ε} TC0) lower bounds for Gap-MKtP[2^{βn}, 2^{βn}+cn] imply EXP ⊄ NC1 (resp. EXP ⊄ TC0)"
record_ref: "Oliveira, Pich & Santhanam, CCC 2019 / Theory of Computing 17(11), 2021 (ECCC TR18-158)"
hardness: "the locality barrier: all techniques behind the current N^{2−o(1)}-type records (random restrictions, Nechiporuk, shrinkage) relativize to circuits with small local oracles, while the magnification theorems provably fail relative to such oracles — so crossing the threshold needs a technique sensitive to the absence of local advice"
hardness_ref: "Chen, Hirahara, Oliveira, Pich, Rajgopal & Santhanam, ITCS 2020 / JACM 2022 (arXiv:1911.08297)"
endgame: "an N^{2+ε} B2-formula (or N^{3+ε} U2-formula) lower bound for Gap-MKtP[2^{βn}, 2^{βn}+cn] implies EXP ⊄ NC1 (Oliveira–Pich–Santhanam, CCC 2019); an N^{1+ε} lower bound for MCSP[2^{√n}] against one-tape Turing machines or poly(s)-space streaming algorithms implies P ≠ NP (McKay, Murray & Williams, STOC 2019)"
status: open
confidence: high
verified: 2026-08-10
tags: [circuit-complexity, mcsp, hardness-magnification, formulas, meta-complexity]
---

## Statement

MCSP is the problem of deciding, given the length-N truth table of a
Boolean function on n = log N variables, whether it has circuits of a given
size; Gap-MCSP[s1, s2] asks to distinguish complexity ≤ s1 from ≥ s2, and
Gap-MKtP is the analogue for Levin's time-bounded Kolmogorov complexity Kt.
Prove any of: an N^{1+ε} general-circuit lower bound for
Gap-MCSP[2^{βn}/cn, 2^{βn}] (implies NP ⊄ P/poly); an N^{2+ε} B2-formula or
N^{3+ε} U2-formula lower bound for Gap-MKtP[2^{βn}, 2^{βn}+cn] (implies
EXP ⊄ NC1); or an N^{1+ε} TC0 lower bound for Gap-MKtP (implies EXP ⊄ TC0).
The unconditional record: Gap-MCSP[2^{βn}/cn, 2^{βn}] requires U2-formulas
of near-quadratic size — the same problem whose N^{1+ε} circuit threshold
guards NP vs P/poly.

## Current record

Oliveira, Pich and Santhanam (CCC 2019) proved the magnification theorems:
weak-looking lower bounds for gap versions of MCSP/MKtP at the N^{1+ε}
(circuits, TC0), N^{2+ε} (B2-formulas, branching programs), or N^{3+ε}
(U2-formulas) thresholds imply NP ⊄ P/poly, EXP ⊄ TC0, or EXP ⊄ NC1. They
also proved, unconditionally, that Gap-MCSP[2^{βn}/cn, 2^{βn}] requires
U2-formulas of near-quadratic size — a bound just below the thresholds one
model up. The general formula record for any explicit
function shows the same pattern: n^{3−o(1)} for de Morgan formulas (Håstad,
tightened by Tal — see demorgan-formula-cubic-barrier) sits just under the
N^{3+ε} U2 threshold, and the TC0 wire record n^{1+c^{−d}} sits just under
the N^{1+ε} TC0 threshold. McKay, Murray and Williams (STOC 2019)
independently proved magnification for the standard (gap-free) MCSP[2^{√n}]
in uniform models: an N^{1.01}-time one-tape Turing machine lower bound, or
a poly(s)-space streaming lower bound, implies P ≠ NP.

## Why it matters

This is the shortest published distance between current techniques and a
major separation: the same problem, the same computational model, and an
exponent gap of ε. Hardness magnification also localizes exactly why the
web of known lower bounds does not already yield NC1 separations, and any
crossing of a threshold immediately propagates through the OPS/MMW
reductions to EXP ⊄ NC1 or P ≠ NP.

## Attack surface

The locality barrier (Chen–Hirahara–Oliveira–Pich–Rajgopal–Santhanam)
diagnoses the stall precisely: Nechiporuk, random restrictions, and
shrinkage all still work when the formula is given small oracle gates
computing local functions of few inputs, but magnification fails in that
relativized world — so a threshold-crossing proof must exploit that real
formulas have no such local advice. Concrete directions: (1) prove an
N^{2+ε} B2-formula lower bound for Gap-MKtP by a non-local argument — even
recovering the known near-quadratic bound by a technique that provably does
not localize would be progress; (2) attack the uniform MMW thresholds, where
streaming and one-tape models are combinatorially tractable and the known
lower-bound toolkit (communication arguments) is different; (3) sharpen the
magnification side — lowering the B2 threshold from N^{2+ε} to N^{2−o(1)}
would collide with the unconditional record and force a separation.
