---
id: matmul-omega-record
title: "Multiply n x n matrices in n^{2.371338} time — beat omega < 2.371339 — or break the Ambainis–Filmus–Le Gall 2.3725 laser-method barrier some other way"
genre: improve-algorithm
problems: ["Matrix Multiplication"]
hypotheses: []
record: "omega < 2.371339"
record_ref: "Alman, Duan, Vassilevska Williams, Xu, Xu & Zhou, SODA 2025 (arXiv:2404.16349, \"More Asymmetry Yields Faster Matrix Multiplication\")"
hardness: "no superquadratic lower bound known; laser-method analyses of powers of the Coppersmith–Winograd tensor cannot prove omega < 2.3725 (and broad generalizations cannot go below ~2.3078)"
hardness_ref: "Ambainis, Filmus & Le Gall, STOC 2015"
status: open
confidence: high
verified: 2026-08-10
tags: [matrix-multiplication, omega, algebraic, laser-method, barriers]
---

## Statement

Let omega be the matrix multiplication exponent: the infimum of c such that two
n x n matrices can be multiplied in O(n^c) arithmetic operations. Trivially
omega <= 3 and omega >= 2, and the running conjecture is omega = 2. The problem:
publish any bound omega < 2.371339. An equally valid closing move is structural:
prove that some concrete new technique escapes the Ambainis–Filmus–Le Gall
barrier, which shows the standard "laser method" applied to powers of the
Coppersmith–Winograd tensor can never prove omega < 2.3725.

## Current record

The record is omega < 2.371339, by Alman, Duan, Vassilevska Williams, Xu, Xu and
Zhou (SODA 2025), the latest step in a line that revived progress after a decade
of stasis at 2.3728: Duan–Wu–Zhou (FOCS 2023) found and fixed a "combination
loss" in prior laser-method analyses, Vassilevska Williams–Xu–Xu–Zhou (SODA
2024) reached 2.371552, and the 2025 paper squeezed further via asymmetric
analyses of the Coppersmith–Winograd tensor's powers. All of these analyze the
same underlying tensor; Ambainis, Filmus and Le Gall (STOC 2015) proved this
family of analyses hits a wall at 2.3725 for the classical laser method, and
that even substantially generalized monomial-degeneration approaches on that
tensor cannot reach below roughly 2.3078. So the remaining slack inside the
current framework is thin, and known barriers block the road to 2.

## Why it matters

Omega is a load-bearing constant across the entire reduction web: transitive
closure, context-free parsing, all-pairs shortest paths subroutines, dense
linear algebra, and the polynomial-method algorithms cited by several other
problems all inherit their exponents from it. Any improvement propagates
automatically through dozens of published reductions. Conversely, a clean new
barrier theorem prunes the search space for everyone.

## Attack surface

Inside the framework: the recent gains came from bookkeeping refinements
(asymmetry, combination-loss repair) that were sitting unnoticed for years —
systematic, machine-assisted search over laser-method parameter spaces
(hash-function moduli, distribution splits) is genuinely plausible territory
for optimization tooling. Outside it: candidate replacement tensors (e.g.,
analyzing tensors other than Coppersmith–Winograd), the group-theoretic approach
of Cohn–Umans, or degeneration notions that evade the known barrier definitions.
First cheap experiment: rerun the 2025 asymmetric optimization on the next
unanalyzed tensor power and see whether the numerical program still improves.

## Verification notes

Checked against the literature in August 2026: no published bound below
2.371339 was found; sources through late 2025 still cite omega < 2.371339
(arXiv:2404.16349) as the record. Adjacent 2026 activity (e.g., asymptotic-rank
speedup theorems, arXiv:2605.21738) does not claim a new omega bound.
