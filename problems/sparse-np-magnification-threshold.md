---
id: sparse-np-magnification-threshold
title: "Prove n^{1+ε} hardness for any sparse NP language — Tal's n^{2−ε} formulas-of-parities bound already clears the magnification threshold, but for a non-sparse function"
genre: missing-hardness
problems: ["Sparse NP Languages", "Inner Product mod 2", "MCSP"]
hypotheses: []
record: "no n^{1+ε} lower bound is known for any 2^{n^β}-sparse NP language in any magnification model; for non-sparse explicit functions the records meet or exceed the thresholds — n^{2−ε} for formulas with parity leaves (Inner Product mod 2), n^{3−o(1)} de Morgan formulas, n²/log²n branching programs"
record_ref: "thresholds: Chen, Jin & Williams, FOCS 2019 (ECCC TR19-118); non-sparse records: Tal, ECCC TR16-181 (bipartite formula complexity of Inner-Product); Håstad, SICOMP 1998 (tightened by Tal — see demorgan-formula-cubic-barrier); Nečiporuk 1966"
hardness: "without sparsity the required bounds are provably easy — an adaptation of the time hierarchy gives languages in TIME[n^{1+ε}·polylog n] that no n^{1+ε}-time algorithm with n^ε advice computes (CJW, Thm 1.3) — so the entire difficulty is concentrated in making the hard language sparse; the sharp-threshold companion shows the exponents are exactly critical: MCSP[(log n)^c] unconditionally has no n^{2−o(1)}-size probabilistic formulas, while n^{2+ε} would magnify"
hardness_ref: "Chen, Jin & Williams, STOC 2020 (ECCC TR20-065, \"Sharp Threshold Results for Computational Complexity\")"
endgame: "for any family of 2^{n^β}-sparse NP languages: outside Circuit[n^{1+ε}] implies NP ⊄ Circuit[n^k] for all k; outside U2-Formula-⊕[n^{1+ε}] or B2-Formula[n^{2+ε}] or U2-Formula[n^{3+ε}] implies NP ⊄ Formula[n^k]; outside BP[n^{2+ε}] implies NP ⊄ BP[n^k]; with AC0[m] and TC0 analogues, and it even suffices to fool n^{1+ε}-time n^ε-space deterministic algorithms with n^ε advice (Chen, Jin & Williams, FOCS 2019, ECCC TR19-118, Theorems 1.1–1.2)"
status: open
confidence: high
verified: 2026-08-10
tags: [circuit-complexity, hardness-magnification, sparse-languages, formulas, meta-complexity]
---

## Statement

Exhibit, for each β > 0, a 2^{n^β}-sparse language in NP together with a
lower bound at the magnification threshold in any standard nonuniform
model: n^{1+ε} for general circuits or formulas-of-parities, n^{2+ε} for
B2-formulas or branching programs, n^{3+ε} for de Morgan formulas. By
Chen–Jin–Williams magnification, any one of these yields NP lower bounds
for all fixed polynomials in the corresponding model.

## Current record

Chen, Jin and Williams (FOCS 2019) proved that magnification is not a
quirk of MCSP: it holds for every equally-sparse NP language, with the
threshold exponents above, and the hypothesis can even be weakened from
circuits to uniform n^{1+ε}-time n^ε-space algorithms taking n^ε advice —
bounds that are classical for non-sparse languages via the time hierarchy.
The striking instance is item (2) of their Theorem 1.1: an n^{1+ε} bound
against U2-formulas with parity leaves suffices, and Tal (ECCC TR16-181)
already proved Inner Product mod 2 requires n^{2−ε} size in exactly that
model — comfortably past the threshold, except that IP is dense. The
companion STOC 2020 paper shows the thresholds are sharp: MCSP[(log n)^c]
(itself sparse) unconditionally requires probabilistic formulas of size
n^{2−o(1)}, sitting immediately below the n^{2+ε} trigger. As of August
2026 no sparse NP language has a published superlinear circuit or
formula-of-parities lower bound.

## Why it matters

This problem isolates what actually blocks fixed-polynomial NP lower
bounds: not the size of the bound (n^{1+ε} bounds are routine for dense
languages) but its coexistence with sparsity. It generalizes the
MCSP-specific thresholds (see mcsp-magnification-threshold) to a purely
structural condition, which multiplies the attack surface — any NP
language of the right density is a candidate, not just meta-computational
ones. A win in the weakest model (formulas-of-parities, threshold n^{1+ε},
with Tal's dense bound as a template) would give NP ⊄ Formula[n^k] for
every k, and the uniform-algorithm variant means even an algorithmic
lower bound — no circuit analysis at all — suffices.

## Attack surface

(1) Sparsify Inner Product: find a 2^{n^β}-sparse NP language that
inherits IP's bipartite structure — e.g., IP restricted to a sparse
NP-certifiable set of rows — and push Tal's shrinkage-with-parities
argument through; the locality barrier (see mcsp-magnification-threshold)
says the argument must break for oracles with local advice, which
shrinkage a priori does not, so identifying where sparsity interacts with
the barrier is step zero. (2) Work uniformly: by CJW Theorem 1.2 it is
enough to defeat n^{1+ε}-time, n^ε-space, n^ε-advice algorithms — a
diagonalization target where sparsity, not the model, is the obstacle;
CJW's own Theorem 1.3 does it without sparsity. (3) Intermediate density:
the theorems are stated for 2^{n^β}-sparsity for all β — mapping how the
thresholds degrade at density 2^{n/polylog} could expose a workable
regime. (4) Probabilistic formulas: the n^{2−o(1)} record for
MCSP[(log n)^c] leaves an ε-wide strip to the n^{2+ε} trigger — the
narrowest published gap of this kind besides Gap-MCSP's.
