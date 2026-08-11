---
id: matrix-rigidity-explicit
title: "Explicit matrix rigidity: beat Omega((N^2/r) log(N/r)) in Valiant's regime, or push the new superlogarithmic-rank rigidity of Walsh–Hadamard toward Razborov rigidity"
genre: missing-hardness
problems: ["Matrix Rigidity", "Linear Circuit Lower Bounds", "Walsh–Hadamard Transform"]
hypotheses: []
record: "for explicit N x N matrices: R(r) = Omega((N^2/r) log(N/r)) at general rank r (unbeaten since 1997); R(c log N) >= N^2 (1/2 − N^{−c'}) at logarithmic rank, tight; constant-fraction rigidity at rank log^2 N / 80 for the Walsh–Hadamard transform over F_3"
record_ref: "Friedman 1993 and Shokrollahi–Spielman–Stichtenoth 1997 (general r); Alman & Liang, STOC 2025 (arXiv:2502.19580); Alman, arXiv:2608.06592 (superlogarithmic rank, 2026)"
hardness: "no conditional lower bound applies; instead, the classic candidates provably fail: Hadamard-type matrices are not Valiant-rigid (probabilistic rank), function matrices over F_p^n are not rigid (Croot–Lev–Pach), and Fourier/circulant/Toeplitz matrices are not Valiant-rigid"
hardness_ref: "Alman & Williams, STOC 2017; Dvir & Edelman, 2017; Dvir & Liu, FOCS 2019"
endgame: "direct: Valiant-rigidity gives unconditional superlinear lower bounds for log-depth linear circuits (Valiant, MFCS 1977); Razborov-rigidity separates the communication analogue of PH (Razborov 1989; Wunderlich, Comput. Complexity 2012)"
status: open
confidence: high
verified: 2026-08-10
tags: [rigidity, linear-circuits, communication-complexity, algebraic]
---

## Statement

A matrix M is (r, s)-rigid if every matrix within Hamming distance s of M has
rank more than r; R_M(r) is the minimum number of entries one must change to
bring rank down to r. Two published targets. Valiant's: an explicit N x N
family with R(eps N) >= N^{1+delta} — this implies the first superlinear lower
bounds for log-depth linear circuits. Razborov's: rigidity N^2/2^{polyloglog N}
at rank 2^{(log log N)^{omega(1)}} — this separates the communication analogue
of PH. Beat any of the three records above, in any rank regime.

## Current record

At general rank r, the 1990s bound R(r) = Omega((N^2/r) log(N/r)) (Friedman;
Shokrollahi–Spielman–Stichtenoth) is still the best explicit bound — far below
Valiant's N^{1+delta} target at r = eps N. The action since 2016 has been
negative results and the low-rank regime. Alman–Williams (STOC 2017) showed
Hadamard matrices are not Valiant-rigid; Dvir–Edelman and Dvir–Liu (FOCS 2019)
de-rigidified function matrices, Fourier and circulant matrices — eliminating
essentially every classical candidate. Semi-explicit constructions exist via
an NP oracle (Alman–Chen FOCS 2019; Bhangale–Harsha–Paradise–Tal FOCS 2020).
On the positive side, Alman–Liang (STOC 2025) proved tight rigidity at rank
c log N: the Walsh–Hadamard matrix needs N^2(1/2 − N^{−c'}) changes, over any
finite field. Alman (August 2026) then broke the logarithmic-rank ceiling:
changing 1% of the entries of the N x N Walsh–Hadamard transform cannot bring
its F_3-rank below log^2 N / 80 — the first constant-fraction rigidity at
superlogarithmic rank for any explicit family.

## Why it matters

Rigidity is the canonical "reduction-shaped" route to two long-open lower
bounds: Valiant-rigidity gives linear-circuit lower bounds, Razborov-rigidity
gives PH^cc separations, and static data-structure lower bounds imply rigidity
(Dvir–Golovnev–Weinstein), so the edges run in both directions. Alman–Liang's
amplification makes the next step concrete: proving their bound at rank
log^{1+eps} N instead of log N — over any finite field — already implies
Razborov rigidity and breakthrough communication lower bounds.

## Attack surface

The frontier is a single quantitative gap: constant-fraction rigidity is now
known at rank log^2 N, and amplification kicks in near-quadratically close by.
Concrete bites: extend the F_3 Walsh–Hadamard argument to other fields or
larger rank; apply the Alman–Liang Kronecker/majority-power amplification to
other explicit families (distance matrices are already handled); or attack
the untouched middle regime, r = polylog N through N^{0.99}, where the 1997
bound is the record. For de-rigidifiers: any new upper bound narrowing which
matrices can possibly work is also publishable progress.

## Verification notes

Checked August 2026 against arXiv:2608.06592 (posted days before
verification), arXiv:2502.19580, and Golovnev's rigidity survey. Records as
stated; no explicit Valiant-rigid or Razborov-rigid family is known.
