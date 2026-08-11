---
id: general-arithmetic-circuits-baur-strassen
title: "Beat Baur–Strassen: prove an ω(n log n) lower bound for general arithmetic circuits — the record has stood since 1983 while ABPs and formulas fell to n²"
genre: missing-hardness
problems: ["Arithmetic Circuit Lower Bounds", "Power Sum Polynomials"]
hypotheses: []
record: "Ω(n log d) circuit size over any field for the explicit polynomial x_1^d + ... + x_n^d (Ω(n log n) at d = n) — the best known lower bound for unrestricted arithmetic circuits, unbeaten for 43 years"
record_ref: "Baur & Strassen, \"The complexity of partial derivatives\", Theoret. Comput. Sci. 22 (1983), building on Strassen 1973; confirmed current by Chatterjee–Kumar–She–Volk (comput. complexity 2022) and Shastri (arXiv:2604.20575, 2026), both of which state it as the standing record"
hardness: "no conditional lower bound applies — this is the unconditional frontier itself; in restricted models the same polynomial is quadratic: Ω(n²) for algebraic branching programs computing Σ x_i^n, and Ω(n²) formulas for elementary symmetric polynomials"
hardness_ref: "Chatterjee, Kumar, She & Volk, CCC 2020 / comput. complexity 31 (2022) (arXiv:1911.11793, \"Quadratic Lower Bounds for Algebraic Branching Programs and Formulas\")"
endgame: "the Kabanets–Impagliazzo loop: superpolynomial arithmetic circuit lower bounds for an explicit family (e.g. the Permanent) derandomize blackbox PIT, and conversely PIT ∈ P implies NEXP ⊄ P/poly or the Permanent has no poly-size arithmetic circuits (Kabanets & Impagliazzo, comput. complexity 13, 2004); any ω(n log n) bound is itself unconditional progress toward VP ≠ VNP"
status: open
confidence: high
verified: 2026-08-10
tags: [arithmetic-circuits, algebraic, lower-bounds, vp-vs-vnp]
---

## Statement

Exhibit an explicit n-variate polynomial of degree n^{O(1)} that requires
unrestricted arithmetic circuits (fan-in 2, over some field) of size
ω(n log n) — or even Ω(n^{1+eps}) for a constant-degree family, which is
equally open. The number to beat is Baur–Strassen's Ω(n log d) for
x_1^d + ... + x_n^d, proved in 1983. No explicit polynomial is known to
require superlinear-by-more-than-a-log circuits, in any characteristic.

## Current record

Baur and Strassen combine two ingredients: Strassen's degree bound (a Bézout
argument showing that computing all of x_1^d, ..., x_n^d needs Ω(n log d)
multiplications) and the partial-derivative trick (a circuit of size s
computing f yields a circuit of size O(s) computing all n first-order
partials), which transfers the bound to the single polynomial Σ x_i^d. Both
halves are exhausted: the degree bound is capped at Ω(n log d) because Bézout
counts solutions, and the derivative trick loses nothing further. Restricted
models have moved — Chatterjee, Kumar, She and Volk (CCC 2020) proved that any
algebraic branching program computing Σ x_i^n needs Ω(n²) vertices and any
formula computing elementary symmetric polynomials of degree 0.1n needs
quadratic size — but for circuits the record is unchanged, as papers from 2022
through 2026 state explicitly.

## Why it matters

This is the honest baseline of algebraic complexity: VP vs VNP asks for
superpolynomial bounds, and the field cannot yet prove n log^{1.01} n. The gap
is also load-bearing elsewhere — the Kabanets–Impagliazzo loop converts
hardness of explicit polynomials into deterministic PIT (see
blackbox-pit-constant-depth), and the constant-depth breakthrough of
Limaye–Srinivasan–Tavenas (see constant-depth-arithmetic-lower-bounds) makes
low-depth the one place with superpolynomial bounds, sharpening the question
of why unrestricted circuits resist. An ω(n log n) bound would be the first
movement on general circuits since 1983.

## Attack surface

Three visible bites. (1) Port the CKSV argument: their ABP bound works by
intersecting the computation with a generic affine subspace and counting
zeros of the resulting system; the published obstruction to running this on
circuits is that circuit "layers" are not geometrically meaningful — a
formalization of exactly what fails would itself be publishable. (2) Raz's
elusive functions program (Theory of Computing 2010) reduces superpolynomial
circuit lower bounds to constructing explicit polynomial mappings that evade
low-degree images; moderately elusive constructions already beat n log n. (3)
Algebraic natural proofs (Forbes–Shpilka–Volk; Grochow–Kumar–Saks–Saraf) say
succinctly-described lower-bound certificates face a barrier — so target
techniques, like degree bounds, that are not natural in their sense. Cheapest
first experiment: superlinear bounds for constant-degree polynomials, where
even Ω(n^{1.01}) is open and the noncommutative analogue now amplifies.

## Verification notes

Checked August 2026: Shastri (arXiv:2604.20575, May 2026) and the CKSV journal
version both state Ω(n log n) as the strongest known unrestricted-circuit
bound; the 2025–2026 movement (planar circuits, sums of small ABPs) is all in
restricted models.
