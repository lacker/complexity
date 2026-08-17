---
id: circuit-sat-frontier-beyond-acc0-thr
title: "Extend the nontrivial-SAT frontier past ACC0∘THR: a 2^n/n^{ω(1)}-time SAT or CAPP algorithm for poly-size depth-3 TC0 would give NQP ⊄ TC0 by the algorithmic method"
genre: improve-algorithm
problems: ["Circuit-SAT", "CAPP", "TC0 Circuit Lower Bounds"]
hypotheses: []
record: "#SAT for ACC0∘THR circuits of size 2^{n^{o(1)}} in 2^{n−n^ε}; deterministic SAT for AC0∘LTF∘LTF with a subquadratic bottom LTF layer; for pure threshold circuits, SAT for depth-d LTF circuits with n^{1+c^{−d}} wires and deterministic CAPP for an XOR of two n^{2.5−ε}-size THR∘THR circuits; nothing nontrivial for unrestricted poly-size depth-3 TC0"
record_ref: "Williams, STOC 2014 (arXiv:1401.2444); Alman, Chan & Williams, FOCS 2016 (arXiv:1608.04355); Chen, Santhanam & Srinivasan, CCC 2016 (Theory of Computing 2018); Chen, Tal & Wang, STOC 2026 (ECCC TR26-039)"
hardness: "no conditional obstruction — but Naor–Reingold puts candidate pseudorandom functions in TC0, so the natural-proofs barrier applies in full to TC0, making non-natural routes like the algorithmic method essentially mandatory"
hardness_ref: "Naor & Reingold, JACM 2004; Razborov & Rudich, JCSS 1997"
endgame: "nontrivial SAT gives standard Williams-style lower bounds; for CAPP, the needed error and closure depend on the conversion theorem (constant/o(1) error suffices for the Chen–Williams/Bathie–Williams same-class PCPP bridge, while Chen–Ren's MAJ^3 bridge requires inverse-circuit-size error for every polynomial size); Chen–Tal–Wang's E^NP ⊄ THR∘THR[n^{2.5−ε}] (STOC 2026) is the live template"
status: open
confidence: high
verified: 2026-08-10
tags: [circuit-complexity, algorithmic-method, sat-algorithms, tc0, derandomization]
---

## Statement

Design a deterministic algorithm that decides satisfiability (or estimates
acceptance probability — CAPP) of polynomial-size depth-3 TC0 circuits, or of
any meaningfully denser class past the current frontier, in time
2^n/n^{ω(1)}. For SAT, such a saving feeds the usual easy-witness machinery.
For CAPP, the precise lower-bound consequence depends on the accuracy and
closure properties: the same-class PCPP bridge can use constant or `o(1)`
error, while the known route from `MAJ∘MAJ` CAPP to a `MAJ^3` lower bound
requires inverse-circuit-size error. The problem is to move the algorithmic
frontier one circuit layer or density regime up.

## Current record

Williams' original ACC0-SAT algorithm (2011) gave NEXP ⊄ ACC0. One major
standard frontier is ACC0∘THR — ACC0 with a bottom layer of arbitrary linear
threshold gates: Williams (STOC 2014)
counts satisfying assignments to 2^{n^{o(1)}}-size ACC0∘THR circuits in
2^{n−n^ε} time, which with the easy witness lemma of Murray–Williams (STOC
2018) yields NQP ⊄ ACC0∘THR. Alman–Chan–Williams (FOCS 2016) also gave
deterministic nontrivial SAT for AC0∘LTF∘LTF when the bottom LTF layer is
subquadratic, so ACC0∘THR∘THR is not open without a density qualification.
For pure threshold circuits the frontier is wire- and gate-bounded:
Chen–Santhanam–Srinivasan (CCC 2016) gave SAT in 2^{n−n^δ} time for depth-d
LTF circuits with n^{1+c^{−d}} wires; Tamaki and Alman–Chan–Williams handled
depth-2 circuits with subquadratic gates; and Chen–Tal–Wang (STOC 2026,
ECCC TR26-039) built a 2^{n−n^{Ω(ε)}}-time
algorithm estimating the acceptance probability of an XOR of two
n^{2.5−ε}-size THR∘THR circuits, concluding E^NP requires n^{2.5−ε}-size
THR∘THR circuits — the first superquadratic-gate depth-2 threshold bound.
Poly-size depth-3 TC0 has no nontrivial SAT, #SAT, or CAPP algorithm at all.

## Why it matters

This is a production line for unconditional lower bounds, once the analysis
algorithm meets the accuracy and closure hypotheses of the relevant bridge.
TC0 is the canonical next wall because the natural-proofs barrier genuinely applies
there (Naor–Reingold candidate PRFs live in TC0), so the algorithmic method
is one of the few known live routes to NEXP ⊄ TC0 or NQP ⊄ TC0. A depth-3 SAT
algorithm would also clarify whether the threshold-circuit frontier tracks
wire sparsity (as in CSS) or gate count (as in Chen–Tal–Wang).

## Attack surface

Three concrete openings. First, extend the Chen–Tal–Wang XOR-of-two-circuits
estimator: their approach pushes polynomial-method representations of
threshold functions (following Alman–Chan–Williams) past the quadratic
regime; composing it with one more threshold layer is the direct assault.
Second, densify Chen–Santhanam–Srinivasan: their random-restriction-based
SAT works for depth-3 with n^{1+ε} wires — any improvement of the wire
budget toward n^{1.1} at depth 3 is publishable on its own and feeds the
Murray–Williams pipeline. Third, aim at CAPP instead of SAT: the easy
witness framework accepts nondeterministic or zero-error derandomization,
and quantified-derandomization results for TC0 (Tell) show the class is not
algorithmically opaque. Intermediate targets: MAJ∘MAJ∘MAJ with n^{2+ε}
wires, or ACC0∘THR∘THR.
