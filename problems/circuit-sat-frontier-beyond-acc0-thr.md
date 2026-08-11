---
id: circuit-sat-frontier-beyond-acc0-thr
title: "Extend the nontrivial-SAT frontier past ACC0∘THR: a 2^n/n^{ω(1)}-time SAT or CAPP algorithm for poly-size depth-3 TC0 would give NQP ⊄ TC0 by the algorithmic method"
genre: improve-algorithm
problems: ["Circuit-SAT", "CAPP", "TC0 Circuit Lower Bounds"]
hypotheses: []
record: "#SAT for ACC0∘THR circuits of size 2^{n^{o(1)}} in 2^{n−n^ε} time (the largest 'standard' class with a nontrivial SAT algorithm); for pure threshold circuits: #SAT for depth-d LTF circuits with n^{1+c^{−d}} wires, and a 2^{n−n^{Ω(ε)}}-time algorithm estimating acceptance probability of an XOR of two n^{2.5−ε}-size THR∘THR circuits; nothing nontrivial for poly-size depth-3 TC0"
record_ref: "Williams, STOC 2014 (arXiv:1401.2444); Chen, Santhanam & Srinivasan, CCC 2016 (Theory of Computing 2018); Chen, Tal & Wang, STOC 2026 (ECCC TR26-039)"
hardness: "no conditional obstruction — but Naor–Reingold puts candidate pseudorandom functions in TC0, so the natural-proofs barrier applies in full to TC0, making non-natural routes like the algorithmic method essentially mandatory"
hardness_ref: "Naor & Reingold, JACM 2004; Razborov & Rudich, JCSS 1997"
endgame: "a SAT (or even CAPP) algorithm for size-2^{n^ε} C-circuits running in 2^n/n^{ω(1)} time yields NQP ⊄ C[poly] unconditionally via the easy witness lemma (Murray & Williams, STOC 2018 / SICOMP 2020); Chen–Tal–Wang's E^NP ⊄ THR∘THR[n^{2.5−ε}] (STOC 2026) is the live template of an algorithm converting into a lower bound"
status: open
confidence: high
verified: 2026-08-10
tags: [circuit-complexity, algorithmic-method, sat-algorithms, tc0, derandomization]
---

## Statement

Design a deterministic algorithm that decides satisfiability (or estimates
acceptance probability — CAPP) of polynomial-size depth-3 TC0 circuits, or of
any class strictly containing ACC0∘THR, in time 2^n/n^{ω(1)}. Any savings of
a super-polynomial factor over brute force suffices: by the Murray–Williams
easy witness lemma, such an algorithm for a typical class C immediately
implies NQP ⊄ C[poly]. The problem is to move the algorithmic frontier one
circuit class up.

## Current record

Williams' original ACC0-SAT algorithm (2011) gave NEXP ⊄ ACC0. The strongest
standard class with a nontrivial SAT algorithm is still ACC0∘THR — ACC0 with
a bottom layer of arbitrary linear threshold gates: Williams (STOC 2014)
counts satisfying assignments to 2^{n^{o(1)}}-size ACC0∘THR circuits in
2^{n−n^ε} time, which with the easy witness lemma of Murray–Williams (STOC
2018) yields NQP ⊄ ACC0∘THR. For pure threshold circuits the frontier is
wire- and gate-bounded: Chen–Santhanam–Srinivasan (CCC 2016) gave #SAT in
2^{n−n^δ} time for depth-d LTF circuits with n^{1+c^{−d}} wires; Tamaki and
Alman–Chan–Williams handled depth-2 circuits with subquadratic gates; and
Chen–Tal–Wang (STOC 2026, ECCC TR26-039) built a 2^{n−n^{Ω(ε)}}-time
algorithm estimating the acceptance probability of an XOR of two
n^{2.5−ε}-size THR∘THR circuits, concluding E^NP requires n^{2.5−ε}-size
THR∘THR circuits — the first superquadratic-gate depth-2 threshold bound.
Poly-size depth-3 TC0 has no nontrivial SAT, #SAT, or CAPP algorithm at all.

## Why it matters

This is the production line for unconditional lower bounds: every new
circuit-analysis algorithm converts mechanically into a separation. TC0 is
the canonical next wall because the natural-proofs barrier genuinely applies
there (Naor–Reingold candidate PRFs live in TC0), so the algorithmic method
is the only known live route to NEXP ⊄ TC0 or NQP ⊄ TC0. A depth-3 SAT
algorithm would also clarify whether the threshold-circuit frontier tracks
wire sparsity (as in CSS) or gate count (as in Chen–Tal–Wang).

## Attack surface

Three concrete openings. First, extend the Chen–Tal–Wang XOR-of-two-circuits
estimator: their approach pushes polynomial-method representations of
threshold functions (following Alman–Chan–Williams) past the quadratic
regime; composing it with one more threshold layer is the direct assault.
Second, densify Chen–Santhanam–Srinivasan: their random-restriction-based
#SAT works for depth-3 with n^{1+ε} wires — any improvement of the wire
budget toward n^{1.1} at depth 3 is publishable on its own and feeds the
Murray–Williams pipeline. Third, aim at CAPP instead of SAT: the easy
witness framework accepts nondeterministic or zero-error derandomization,
and quantified-derandomization results for TC0 (Tell) show the class is not
algorithmically opaque. Intermediate targets: MAJ∘MAJ∘MAJ with n^{2+ε}
wires, or ACC0∘THR∘THR.
