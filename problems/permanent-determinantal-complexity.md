---
id: permanent-determinantal-complexity
title: "Push the determinantal complexity of the n x n permanent past Mignon–Ressayre's n²/2 — quadratic since 2004, upper bound 2^n − 1, and superpolynomial is exactly Valiant's conjecture"
genre: missing-hardness
problems: ["Permanent", "Determinant", "Determinantal Complexity"]
hypotheses: []
record: "dc(Perm_n) >= n²/2 over fields of characteristic 0 (Mignon–Ressayre 2004); >= (n−1)² + 1 over the reals (Yabe 2015); a quadratic bound holds over any characteristic ≠ 2 (Cai–Chen–Li); upper bound dc(Perm_n) <= 2^n − 1 (Grenet 2011)"
record_ref: "Mignon & Ressayre, \"A quadratic bound for the determinant and permanent problem\", IMRN 2004; Cai, Chen & Li, comput. complexity 19 (2010); Yabe, arXiv:1504.00151 (reals)"
hardness: "if the determinantal representation is required to respect the permanent's symmetries, the truth is exponential: equivariant determinantal complexity of Perm_n is 2^Θ(n) (unconditional, but only against symmetric representations)"
hardness_ref: "Landsberg & Ressayre, ITCS 2016 (arXiv:1508.05788, \"Permanent v. determinant: an exponential lower bound assuming symmetry\")"
endgame: "Valiant's program, fully published: dc(Perm_n) = n^{O(1)} iff VNP = VBP, since the determinant is complete for VBP (= VP_ws) under p-projections and the permanent is VNP-complete in characteristic ≠ 2 (Valiant, STOC 1979; Toda 1992; Malod & Portier, J. Complexity 24, 2008) — so any superpolynomial dc bound unconditionally separates VNP from VBP"
status: open
confidence: high
verified: 2026-08-10
tags: [arithmetic-circuits, permanent, determinant, vp-vs-vnp, gct]
---

## Statement

The determinantal complexity dc(f) is the smallest m such that f = det(M) for
an m x m matrix M of affine-linear forms. Prove dc(Perm_n) >= n^{2+eps} for
some eps > 0 — any superquadratic bound beats the record. The known window is
enormous: quadratic below, Grenet's explicit 2^n − 1 construction above, and
Valiant's conjecture asserts the truth is superpolynomial.

## Current record

Mignon and Ressayre (IMRN 2004) proved dc(Perm_n) >= n²/2 in characteristic 0
by a curvature argument: the Hessian of the determinant at a smooth point of
its zero hypersurface has bounded rank, while the permanent's Hessian has rank
Ω(n²). Cai, Chen and Li (comput. complexity 2010) extended the quadratic
bound to every characteristic ≠ 2; Yabe (arXiv:1504.00151) sharpened the
constant over the reals to (n−1)² + 1. Nothing better has appeared in twenty
years. The stall has a published explanation of sorts: in terms of the number
of variables N = n², every known dc lower bound for any explicit polynomial
is linear in N — Kumar and Volk (comput. complexity 2022) hold that
per-variable record at 1.5N − 3 for power sums, and note that no technique
gives ω(N) — so n²/2 for the permanent is not a fact about the permanent but
the generic ceiling of second-order methods. Landsberg and Ressayre (ITCS
2016) proved the equivariant answer is 2^Θ(n): if the representation must
inherit the permanent's symmetry, exponential is the truth.

## Why it matters

This is the original algebraic P vs NP: dc(Perm_n) superpolynomial is
equivalent, by published completeness results (Valiant 1979; Toda 1992;
Malod–Portier 2008), to VNP ≠ VBP — the separation geometric complexity
theory was built to attack. Every increment is publishable on its own, and
the problem sits on an unconditional loop: a bound of n^{2+eps} would be the
first-ever ω(N)-in-variables lower bound for any model as strong as
determinants, breaking the same barrier that pins general circuits (see
general-arithmetic-circuits-baur-strassen) at n log n.

## Attack surface

The Mignon–Ressayre method is exactly rank-of-Hessian, and its cap is
understood — higher-order analogues (third fundamental forms, catalecticants
of order k) are the obvious search space, and no published barrier rules them
out for dc. Border determinantal complexity is newly mobile: 2026 preprints
(arXiv:2606.13628, arXiv:2606.11090) prove near-quadratic border-dc and
polar-degree bounds for power sums, and porting a polar-degree argument to
the permanent is a concrete open exercise. The symmetry results suggest an
interpolation program: weaken equivariance (representations respecting only a
subgroup of the permanent's symmetries) and quantify how the 2^Θ(n) bound
degrades — any regime where it stays superpolynomial with subexponential-size
symmetry breaking would be new. Special cases first: dc of Perm_3 is known to
be exactly 7 (Alper–Bogart–Velasco); computing dc(Perm_4) — known to lie
between 8 and 15 — is a finite, machine-attackable problem whose answer would
calibrate all proposed methods.

## Verification notes

Checked August 2026: no improvement over n²/2 (char 0) or (n−1)² + 1 (reals)
located; 2022–2026 activity (generalized permanents, border dc, symmetric
representations of power sums) moves neighboring numbers, not dc(Perm_n).
