---
id: b2-circuit-lower-bound-3-1n
title: "Prove a (3.1+eps)n circuit lower bound over the full binary basis — the explicit-function record has moved 0.1n in 38 years"
genre: missing-hardness
problems: ["Circuit Lower Bounds", "Affine Dispersers"]
hypotheses: []
record: "3.1n − o(n) gates for an explicit function (an affine disperser computable in P), over the full binary basis B2"
record_ref: "Li & Yang, STOC 2022 (ECCC TR21-023, \"3.1n − o(n) Circuit Lower Bounds for Explicit Functions\")"
hardness: "no conditional lower bound applies; the barriers are natural proofs for strong bounds, and formalizations of gate elimination — the only technique that has ever produced these constants — provably stall at O(n)"
hardness_ref: "Razborov & Rudich, JCSS 1997 (natural proofs); Golovnev, Hirsch, Knop & Kulikov, \"On the Limits of Gate Elimination\" (MFCS 2016)"
status: open
confidence: high
verified: 2026-08-10
tags: [circuit-complexity, gate-elimination, lower-bounds, boolean-circuits]
---

## Statement

Exhibit an explicit Boolean function (computable in P, or even E^NP) that
requires more than (3.1 + eps)n gates in circuits over the full binary basis
B2 — all 16 two-input gate types allowed — for some constant eps > 0. Any
improvement of the leading constant beats the record; any superlinear bound,
i.e., omega(n) gates for an explicit function, would be a historic result: none
is known for any function in E^NP.

## Current record

The record is 3.1n − o(n), proved by Li and Yang (STOC 2022) for affine
dispersers — functions that are non-constant on every affine subspace of
sufficiently large dimension, explicitly constructible in P. The lineage is
sobering: Blum proved 3n − o(n) in 1984; it took until Find, Golovnev, Hirsch
and Kulikov (FOCS 2016) to reach (3 + 1/86)n; Li and Yang got to 3.1n by a
finer case analysis in the same gate-elimination framework, tracking and
suppressing "bottleneck structures" created during elimination. Every one of
these proofs works by repeatedly restricting an input variable and arguing
that several gates die per restriction — a fundamentally local argument. For
comparison, over the weaker basis U2 (all binary gates except XOR/XNOR) the
record is 5n − o(n) (Iwama–Morizumi), and no explicit function is known to
require even 3.2n gates over B2 as of August 2026.

## Why it matters

This is the honest measure of how far we are from P != NP by direct attack:
the strongest general-circuit bound for any explicit function is linear with
leading constant 3.1. Hardness magnification theorems (Oliveira–Pich;
McKay–Murray–Williams) show that seemingly modest superlinear bounds for
specific sparse problems would imply major separations, so the gap between
3.1n and omega(n) is exactly where the web of reductions is thinnest. Even a
3.2n bound would demonstrate that gate elimination has not been exhausted, and
new bottleneck-structure bookkeeping is the kind of large-case-analysis search
that is plausibly automatable.

## Attack surface

Inside the framework: Li–Yang's proof is an enormous case analysis; machine
search over elimination rules and bottleneck-structure invariants could
plausibly push the constant. Find–Golovnev–Hirsch–Kulikov already observed
that explicit dispersers for quadratic varieties (not just affine subspaces)
would yield stronger bounds through the same machinery — constructing such
dispersers is a self-contained pseudorandomness problem. Outside it: the
limits-of-gate-elimination results (Golovnev–Hirsch–Knop–Kulikov) say formal
variants of the technique cannot reach superlinear bounds, so omega(n) needs a
genuinely new idea; candidate directions are magnification-friendly sparse
languages and bounds for E^NP via the algorithmic method. First cheap
experiment: formalize Li–Yang's case analysis and let a solver search for a
better elimination potential function.

## Verification notes

Checked August 2026: no published improvement over 3.1n − o(n) for B2 circuits
was found; 2024–2026 papers (e.g., work on GC0 and quantum-classical
separations) concern restricted circuit classes, not the full binary basis.
