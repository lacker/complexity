---
id: matmul-omega-record
title: "Multiply n x n matrices in n^{9/4 - eps} time, or referee the claimed matching lower bound omega >= 9/4"
genre: improve-algorithm
problems: ["Matrix Multiplication"]
hypotheses: []
record: "omega <= 9/4 over every field"
record_ref: "Amanov, van den Berg & Zuiddam, arXiv:2610.30054 (\"Multiplying matrices via polynomials: exposition and barriers\"), the every-field version of OpenAI's October 2026 proof over the complex numbers; Lü, arXiv:2610.18914 (every characteristic, over algebraic closures)"
hardness: "no superquadratic lower bound in the refereed or arXiv literature (an unrefereed claim of omega >= 9/4 is noted in the body); laser-method analyses of Coppersmith-Winograd powers cannot go below 2.3725, and arXiv:2610.30054 proves a barrier for the current polynomial-route degeneration ingredients"
hardness_ref: "Ambainis, Filmus & Le Gall, STOC 2015; Amanov, van den Berg & Zuiddam, arXiv:2610.30054"
endgame: none known
status: open
confidence: high
verified: 2026-11-25
tags: [matrix-multiplication, omega, algebraic, laser-method, barriers]
---

## Statement

Let omega be the matrix multiplication exponent: the infimum of c such that two
n x n matrices can be multiplied in O(n^c) arithmetic operations. Trivially
omega <= 3 and omega >= 2, and the long-running conjecture was omega = 2. The
problem: publish any bound omega < 9/4, or settle the claimed matching lower
bound omega >= 9/4 (below) by refereeing or refuting it. Historically the
closing move was structural: escaping the Ambainis–Filmus–Le Gall barrier for
the laser method (omega < 2.3725), which the 2026 polynomial route did.

## Current record

The record is now omega <= 9/4 = 2.25, far below the laser-method value 2.371339
(Alman, Duan, Vassilevska Williams, Xu, Xu and Zhou, SODA 2025, arXiv:2404.16349).

- **Source:** an OpenAI preprint ([2 Oct 2026](https://github.com/openai/math/tree/main/preprints/Matrix-Multiplication-Nine-Fourths-October-2-2026), not refereed)
  proved omega <= 9/4 over the complex numbers by a route outside the
  Coppersmith-Winograd framework.
- **Every field:** Amanov, van den Berg and Zuiddam (arXiv:2610.30054) give an
  exposition and a version over every field. Lü (arXiv:2610.18914) handles a
  separation step in every characteristic, over algebraic closures.
- **Claimed matching lower bound:** a second OpenAI preprint
  ([24 Nov 2026](https://github.com/openai/math/tree/main/preprints/The-matrix-multiplication-exponent-is-nine-fourths-November-24-2026), not refereed) claims omega >= 9/4 over every field, for
  formal arithmetic circuits with division. If correct, omega = 9/4 exactly and
  this entry is resolved.
  - **Lean:** its Comparator challenge states omega = 9/4 for division-free
    programs; the release also proves, outside the challenge, that division does
    not change the square exponent.
  - **Independent audit:** an audit by Carlos Toledo ([carlostoledo.co/omega](https://carlostoledo.co/omega/))
    reports a from-source build, Comparator with and without nanoda, an independent
    kernel replay and negative controls, with verdict CERTIFIED for the formal
    statement. It checked commit 92b516ef.
  - **Statement audit:** a [statement audit](https://github.com/ryananderson60/superpoly/blob/c49705799ab4ba7e9b2611e3ed69d56ec298f7c6/docs/audits/nine-fourths-2026-11.md) by the author of this change
    compares the Lean statements with the paper. It did not build the Lean.
  - **Not covered:** no human refereeing yet. The paper's explicit per-n bound (at
    least n^(9/4)/2, rounded up, multiplication or division gates at each n >= 2) is
    not formalized in the release.

## Why it matters

Omega is a load-bearing constant across the entire reduction web: transitive
closure, context-free parsing, all-pairs shortest paths subroutines, dense
linear algebra, and the polynomial-method algorithms cited by several other
problems all inherit their exponents from it. Any improvement propagates
automatically through dozens of published reductions. Conversely, a clean new
barrier theorem prunes the search space for everyone.

## Attack surface

Below 9/4: the polynomial route that reached 9/4 is capped by the barrier in
arXiv:2610.30054 for its current degeneration ingredients, and the claimed lower
bound, if correct, rules out any improvement. So the live work is verification:
referee the November 2026 lower-bound preprint, or find the gap in it. Its Lean
release states the division-free exponent and proves the square case with
division, but the paper's explicit per-n bound is not formalized; formalizing it is
a concrete, checkable task. The laser-method directions that drove progress to
2.371339 cannot reach the new record.

## Verification notes

Checked 25 November 2026 against the arXiv abstracts of 2610.30054, 2610.18914 and
2610.10494, and against the OpenAI preprints and Lean release cited above. The
SODA 2025 bound omega < 2.371339 was the record through August 2026.
