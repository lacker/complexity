---
id: blackbox-pit-constant-depth
title: "Derandomize PIT one class up: blackbox identity testing for constant-depth circuits is subexponential, poly-time stops at depth-3 bounded top fan-in — full derandomization triggers the Kabanets–Impagliazzo loop"
genre: improve-algorithm
problems: ["Polynomial Identity Testing", "Hitting Set Construction", "Constant-Depth Arithmetic Circuits"]
hypotheses: []
record: "deterministic blackbox PIT in subexponential time 2^{O(n^ε)} (every ε > 0) for all constant-depth arithmetic circuits, via the LST lower bound plus algebraic hardness-vs-randomness; the strongest classes with polynomial-time blackbox PIT: depth-3 ΣΠΣ(k) with constant top fan-in over any field, and Σ[k]ΠΣ∧; Σ[k]ΠΣΠ[δ] has quasipolynomial blackbox; ROABPs have n^{O(log n)} blackbox and poly-time whitebox"
record_ref: "Limaye, Srinivasan & Tavenas, FOCS 2021 / J. ACM 2025, with Chou–Kumar–Solomon (CCC 2018) hardness-to-randomness, cf. Andrews & Forbes, STOC 2022; Saxena & Seshadhri, STOC 2011 / SICOMP 41(5) 2012 (ΣΠΣ(k)); Dutta, Dwivedi & Saxena, CCC 2021 (arXiv:2304.11325); Forbes–Saptharishi–Shpilka STOC 2014 and Raz–Shpilka comput. complexity 2005 (ROABPs)"
hardness: "no conditional obstruction — the obstruction is the loop itself: fully derandomizing PIT proves circuit lower bounds nobody can prove, so each derandomized class is won by proving an unconditional lower bound against it first"
hardness_ref: "Kabanets & Impagliazzo, comput. complexity 13 (2004) (STOC 2003)"
endgame: "the fully published algorithm-to-lower-bound loop: PIT ∈ P implies NEXP ⊄ P/poly or the Permanent has no polynomial-size arithmetic circuits (Kabanets & Impagliazzo, comput. complexity 13, 2004); the loop is short-circuited at low depth — a polynomial-size hitting set for depth-4 circuits yields a quasipolynomial hitting set for all of VP (Agrawal & Vinay, FOCS 2008)"
status: open
confidence: high
verified: 2026-08-10
tags: [derandomization, pit, hitting-sets, arithmetic-circuits, kabanets-impagliazzo]
---

## Statement

Extend deterministic blackbox PIT (explicit hitting sets) one class up from
the published frontier: (1) improve the subexponential 2^{O(n^ε)} bound for
general constant-depth circuits to quasipolynomial or polynomial; or (2)
extend polynomial-time blackbox PIT from ΣΠΣ(k) to depth-4 Σ[k]ΠΣΠ[δ]
(constant top fan-in, constant bottom degree), where the record is
quasipolynomial; or (3) give polynomial-time blackbox PIT for ROABPs, closing
the quasipolynomial-to-polynomial gap open since 2005.

## Current record

The constant-depth breakthrough is a corollary of lower bounds: Limaye,
Srinivasan and Tavenas plug their n^{Ω(d^{1/exp(Δ)})} bound (see
constant-depth-arithmetic-lower-bounds) into algebraic hardness-vs-randomness
for bounded depth (Chou–Kumar–Solomon, CCC 2018; alternatively
Andrews–Forbes, STOC 2022) to get, for every constant depth and every ε > 0,
an explicit hitting set computable in time 2^{O(n^ε)}. That is the best known
for any class containing depth-3. Polynomial-time blackbox PIT is known only
lower: ΣΠΣ(k) over any field (Saxena–Seshadhri, rank bounds via
Sylvester–Gallai), Σ[k]ΠΣ∧ (Dutta–Dwivedi–Saxena, logarithmic-derivative
methods, which also give quasipolynomial blackbox for Σ[k]ΠΣΠ[δ]), and
ROABPs at n^{O(log n)} blackbox (Forbes–Saptharishi–Shpilka) with poly-time
whitebox (Raz–Shpilka). Guo's variety-evasive subspace families (CCC 2021)
give poly-time blackbox for Σ[k]ΠΣΠ[δ] only outside Sylvester–Gallai
configurations, leaving the SG case as the open core.

## Why it matters

PIT is the canonical derandomization target, and Kabanets–Impagliazzo makes
the payoff unconditional: PIT ∈ P forces NEXP ⊄ P/poly or superpolynomial
arithmetic circuit lower bounds for the Permanent. Agrawal–Vinay concentrates
the whole question at depth 4: a polynomial hitting set for Σ[k]ΠΣΠ-type
circuits with unbounded parameters quasipolynomially derandomizes all of VP.
So each class-by-class extension is a measured step around a published loop
— and because the current constant-depth algorithm is lower-bound-powered,
every exponent improvement in the LST line propagates here automatically.

## Attack surface

Three concrete bites. (1) Σ[k]ΠΣΠ[δ]: the DDS quasipolynomial blackbox loses
its extra log-exponent in one identifiable place (Newton-iteration degree
growth in the power-series of the log-derivative); also, robust
Sylvester–Gallai theorems for bounded-degree polynomials
(Garg–Oliveira–Peleg–Sengupta line, radical SG for cubics) are advancing
toward exactly the configuration lemma that would finish Guo's approach —
proving the SG conjecture for degree-δ polynomials converts his construction
into unconditional poly-time PIT. (2) ROABPs: the FSS generator's log n seed
overhead has resisted twenty years; any-order hitting sets of size
n^{o(log n)} would be new. (3) Bootstrapping (Agrawal–Ghosh–Saxena, STOC
2018): hitting sets barely better than trivial for very small circuits
amplify to near-complete derandomization — quantify the weakest constant-depth
improvement that already cascades. All three are search problems over
explicit constructions, well-suited to machine-assisted enumeration.

## Verification notes

Checked August 2026: no quasipolynomial (or better) PIT for general
constant-depth circuits found; 2024–2026 progress applies constant-depth PIT
(factorization, low-degree factors) rather than improving it.
