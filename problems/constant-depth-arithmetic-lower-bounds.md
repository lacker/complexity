---
id: constant-depth-arithmetic-lower-bounds
title: "Raise the constant-depth arithmetic exponent: the record for product-depth Δ is n^{Ω(d^{1/(φ²)^Δ})} — reaching n^{ω(√d)} at depth 4 separates VP from VNP"
genre: missing-hardness
problems: ["Constant-Depth Arithmetic Circuits", "Iterated Matrix Multiplication", "Arithmetic Circuit Lower Bounds"]
hypotheses: []
record: "size n^{Ω(d^{1/(φ²)^Δ})} (φ the golden ratio, φ² ≈ 2.618) for product-depth Δ circuits computing IMM_{n,d} with d = O(log n / log log n), improving the first-ever superpolynomial constant-depth bound n^{Ω(d^{1/4^Δ})} of Limaye–Srinivasan–Tavenas; extended from characteristic 0/large to every field by Forbes"
record_ref: "Limaye, Srinivasan & Tavenas, FOCS 2021 / J. ACM 2025 (ECCC TR21-081); Bhargav, Dutta & Saxena, MFCS 2022 / ACM ToCT 16(4) 2024; Forbes, CCC 2024 (\"Low-Depth Algebraic Circuit Lower Bounds over Any Field\")"
hardness: "a published proof barrier rather than a conditional bound: for the set-multilinear measure driving all known proofs, Bhargav–Dutta–Saxena construct a depth-Δ circuit almost matching their bound on which the measure is maximal, so the current technique cannot go much past d^{1/(φ²)^Δ}"
hardness_ref: "Bhargav, Dutta & Saxena, ACM ToCT 16(4) 2024 (proof barrier); cf. Kush & Saraf, CCC 2022 (arXiv:2205.00611) for the set-multilinear formula record n^{Ω(n^{1/Δ}/Δ)}"
endgame: "the published depth-reduction escalator: every polynomial in VP has homogeneous ΣΠΣΠ circuits with bottom fan-in O(√d) and size n^{O(√d)}, so an explicit degree-d polynomial requiring such depth-4 circuits of size n^{ω(√d)} implies VP ≠ VNP (Agrawal & Vinay, FOCS 2008; Koiran, Theoret. Comput. Sci. 448, 2012; Tavenas, Inf. Comput. 240, 2015); over characteristic 0, strong enough depth-3 bounds suffice (Gupta–Kamath–Kayal–Saptharishi, FOCS 2013 / SICOMP 2016)"
status: open
confidence: high
verified: 2026-08-10
tags: [arithmetic-circuits, constant-depth, depth-reduction, vp-vs-vnp, set-multilinear]
---

## Statement

Improve the exponent in constant-depth arithmetic circuit lower bounds: for
product-depth Δ, prove that an explicit n-variate degree-d polynomial (IMM or
anything else in VNP) requires size n^{ω(d^{1/(φ²)^Δ})}, beating
Bhargav–Dutta–Saxena. The escalator target is quantitative and published: at
Δ = 2 (ΣΠΣΠ, bottom fan-in O(√d)), a bound of n^{ω(√d)} — exponent d^{1/2}
against the current d^{1/6.85} — implies VP ≠ VNP outright.

## Current record

Limaye, Srinivasan and Tavenas (FOCS 2021; J. ACM 2025) proved the first
superpolynomial lower bounds for constant-depth arithmetic circuits — size
n^{Ω(d^{1/4^Δ})} for IMM_{n,d}, d = O(log n / log log n), characteristic 0 or
large — by converting circuits to set-multilinear form with unequal set sizes
and applying a relative-rank measure. Bhargav, Dutta and Saxena (MFCS 2022;
ToCT 2024) optimized the word-decomposition to improve 4^Δ to (φ²)^Δ ≈
2.618^Δ, and proved a barrier: the measure is already maximal on an explicit
depth-Δ circuit of nearly matching size, so this exponent is close to the
technique's ceiling. Forbes (CCC 2024) removed the characteristic restriction
via the Binet–Minc identity, matching the BDS parameters over any field. For
set-multilinear formulas the exponent is much better — n^{Ω(n^{1/Δ}/Δ)} for a
polynomial in VNP (Kush–Saraf, CCC 2022) — but the hardness-escalation back
to general circuits loses exactly the amount those bounds gain.

## Why it matters

This is the only unrestricted-gate model where superpolynomial arithmetic
bounds exist at all, and the published depth-reduction chain
(Agrawal–Vinay, Koiran, Tavenas, GKKS) prices the remaining distance to VP ≠
VNP in a single number: get the depth-4 exponent from d^{1/6.85} to d^{1/2}
and the whole program closes. The LST corollary also drives derandomization —
the current subexponential blackbox PIT for constant depth (see
blackbox-pit-constant-depth) inherits every exponent improvement made here.

## Attack surface

The BDS barrier is measure-specific, not model-specific: it caps the
set-multilinear relative-rank measure, and says nothing about shifted
partials, APP (affine projections of partials, Amireddy–Garg–Kayal–Saha–
Thankey, arXiv:2211.07691), or any measure not factoring through
set-multilinearization. Concrete bites: (1) prove IMM lower bounds for
d = n^{Ω(1)} rather than d = O(log n) — the escalator needs polynomial
degree, and extending the hard regime is a self-contained problem; (2) close
the set-multilinear-to-general gap: Kush–Saraf-strength bounds
(n^{Ω(n^{1/Δ})}) for set-multilinear *circuits* rather than formulas would
already push the general exponent; (3) attack Δ = 2 directly, where the
target n^{ω(√d)} is nearest and homogeneous depth-4 machinery
(shifted partials) is most developed. A hardness-magnification-style audit of
where exactly the escalator constants sit (Tavenas's 2^{O(√(d log d log n))})
would pin the exact finish line.

## Verification notes

Checked August 2026: no improvement past (φ²)^Δ found in 2024–2026
literature; activity is in extensions (any field, proof complexity, IPS
separations), not the exponent.
