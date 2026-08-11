---
id: frege-quadratic-size-barrier
title: "Beat Ω(n²): the best proof-size lower bound for Frege — and even Extended Frege — has been quadratic for three decades"
genre: missing-hardness
problems: ["Frege", "Extended Frege", "Truth-table tautologies"]
hypotheses: []
record: "Ω(n²) proof size and Ω(n) lines, for both Frege and Extended Frege, via a counting argument on subformulas; no superquadratic size bound and no superlinear line bound is known for any explicit tautology family"
record_ref: "Krajíček, Bounded Arithmetic, Propositional Logic, and Complexity Theory, Cambridge University Press 1995 (see also Krajíček, Proof Complexity, CUP 2019)"
hardness: "hard tautologies exist conditionally — if RSA/factoring is secure, Extended Frege is not polynomially bounded — but no unconditional superquadratic bound follows; it is nontrivial even to name candidate tautologies plausibly hard for Frege, the standard candidates being the truth-table (τ-) formulas encoding circuit lower bounds"
hardness_ref: "Krajíček & Pudlák, 'Some Consequences of Cryptographical Conjectures for S^1_2 and EF', Information and Computation 140(1), 1998"
endgame: "Cook–Reckhow (J. Symbolic Logic 44(1), 1979): superpolynomial bounds for every proof system ⟺ NP ≠ coNP, with Frege/EF the canonical next systems; Müller & Pich (Annals of Pure and Applied Logic 2020, ECCC TR17-144, Prop. 4.14): if truth-table formulas encoding a circuit lower bound are hard for constant-depth Frege, the succinct lb-formulas are hard for unrestricted Frege; Pich (ECCC TR23-199): superpolynomial lower bounds for EF plus witnessing axioms would yield superpolynomial circuit lower bounds for SAT, if the witnessing formulas are tautologies"
status: open
confidence: high
verified: 2026-08-10
tags: [proof-complexity, frege, extended-frege, magnification, np-vs-conp]
---

## Statement

Prove an ω(n²) proof-size lower bound, or an ω(n) lower bound on the number
of lines, for some explicit family of tautologies in a Frege system — or in
Extended Frege, where the same trivial records hold. Any asymptotic
improvement whatsoever over the counting-argument bounds would be the first
movement on this number since the mid-1990s.

## Current record

The Ω(n²) size bound (Krajíček's 1995 textbook) applies to tautologies like
iterated negations whose every proof must, line by line, touch a quadratic
total of subformula occurrences; the Ω(n) line bound is similarly generic.
The argument works verbatim for Extended Frege — so the strongest system in
everyday use has no lower bound beyond bookkeeping. This is the
proof-complexity mirror of the circuit situation (Frege ↔ NC1, EF ↔
poly-size circuits, where records are similarly stuck at small polynomials),
but here even candidate hard instances are contested: the leading proposals
are the τ/truth-table formulas asserting circuit lower bounds, whose Frege
hardness is itself only conjectured.

## Why it matters

Superpolynomial Frege lower bounds are the flagship open problem of proof
complexity, and the published reduction web makes weak-looking progress
magnify. Müller–Pich: constant-depth-Frege hardness of the (exponentially
long) truth-table formulas transfers to unrestricted-Frege hardness of
their succinct versions — so the bounded-depth toolbox, where exponential
bounds exist, is a live route to Frege. Pich's witnessing-formula program
goes further: EF lower bounds of the right shape would produce circuit
lower bounds for SAT, i.e., progress on P vs NP itself, not just NP vs
coNP. And by Cook–Reckhow, Frege and EF are the systems Cook's program must
eventually pass through; every record here is unconditional.

## Attack surface

(1) The honest numerical target: any explicit family needing n^{2.01} Frege
size, or superlinear lines — the current proofs are counting arguments, and
nothing rules out a smarter potential/progress measure on proof dags; even
a superquadratic bound for a system with restricted cut depth d = ω(log n)
would be new territory (below that, small-depth records apply — see
small-depth-frege-fps-threshold). (2) Attack through the Müller–Pich door:
prove the DNF-ized truth-table formulas hard for depth-d Frege for all
constant d — the instances are concrete and the bounded-depth toolbox
(switching lemmas over matching restrictions) is mature. (3) The line-count
question is oddly untouched: Extended Frege lines are essentially circuit
constructions, and a superlinear line bound is a statement about the
number of derivation steps, where diagonalization-style or
information-theoretic arguments have never been seriously exhausted.
