---
id: tree-evaluation-log-space
title: "Put Tree Evaluation in O(log n) space, beating the Cook–Mertz O(log n · log log n) bound"
genre: improve-algorithm
problems: ["Tree Evaluation"]
hypotheses: []
record: "Tree Evaluation is solvable in space o(log n · log log n)"
record_ref: "Cook & Mertz, STOC 2024 (\"Tree Evaluation Is in Space O(log n · log log n)\"); refined by Goldreich, ECCC TR24-124 (o((h+ℓ)·log(h+ℓ)) space)"
hardness: "no super-logarithmic space lower bound known; the problem was originally conjectured to require space Omega(h log k), which the record refuted"
hardness_ref: "Cook, McKenzie, Wehr, Braverman & Santhanam, TOCT 2012 (problem introduction and conjecture)"
endgame: "both directions hit unconditional results: TreeEval in L flows through Williams' simulation (STOC 2025) to give TIME[t] ⊆ SPACE[O(sqrt t)], sharpening the unconditional SPACE[n] ⊄ TIME[n^{2-eps}] separation obtained via the space hierarchy theorem; conversely any ω(log n) space lower bound would prove L ≠ P, since TreeEval is in P (Cook–McKenzie–Wehr–Braverman–Santhanam, TOCT 2012)"
status: open
confidence: high
verified: 2026-08-10
tags: [space-complexity, tree-evaluation, catalytic, logspace]
---

## Statement

Tree Evaluation (TreeEval): given a complete binary tree of height h where each
leaf holds a value in {1, ..., k} and each internal node holds an explicit
lookup table for an arbitrary function from pairs of child values to {1, ..., k},
compute the value at the root. The input (dominated by the tables) has size
n roughly 4^h k^2 log k. The problem: solve TreeEval in space O(log n) — that is,
show TreeEval is in logspace (L) — or prove any space lower bound of the form
omega(log n), beating the trivial one. Either outcome beats the published state
of knowledge.

## Current record

TreeEval was introduced by Cook, McKenzie, Wehr, Braverman and Santhanam
(TOCT 2012) as a program to separate logspace from polynomial time: the natural
recursive algorithm needs to remember one child value per level, costing
Theta(h log k) space, and it was conjectured this was optimal — which would
have implied L != P. Cook and Mertz demolished the conjecture (STOC 2024):
using ideas from catalytic computing, their algorithm stores children's values
*on top of* memory that is still in use, encoding intermediate results as
low-degree-polynomial evaluations over small fields so the workspace can be
restored afterward. The result is space O(log n · log log n) — tantalizingly
short of logspace. Goldreich (ECCC TR24-124, 2024) refined the Cook–Mertz
procedure to space o((h+ℓ)·log(h+ℓ)), i.e., o(log n · log log n), shaving a
Theta(log log(h+ℓ)) factor in the h ≥ ℓ regime by working with d-ary trees.
Separately, Henzinger, Pyne and Ragavan (arXiv:2602.14320, 2026) gave a
catalytic algorithm using O(log n) free space, polynomial time, and
subpolynomial (2^{log^eps n}) catalytic space, via a connection to
matching-vector families — logspace-with-an-asterisk, but not yet L. The gap
to close is the remaining super-logarithmic slack, or, in the other
direction, any argument that multiplicative slack is necessary.

## Why it matters

Two direct cascades. First, the Williams STOC 2025 simulation TIME[t] ⊆
SPACE[sqrt(t log t)] invokes Cook–Mertz as its core subroutine; TreeEval in
space O(log n) would tighten that headline bound (see problem
time-space-sqrt-simulation). Second, TreeEval sits at the border of the L vs P
question: it is in P, and whether it is L-complete-hard territory or in L is a
clean, self-contained test of how far the catalytic register-restoration trick
goes. Any nontrivial lower bound would be the first of its kind against
catalytic-style algorithms.

## Attack surface

The log log n factor comes from working over fields large enough to interpolate
the node functions degree-by-degree; candidate bites include better field/basis
choices, batching levels of the tree together, or replacing polynomial
interpolation with a different reversible encoding of the children's values.
Special cases to try first: constant k (already interesting — is TreeEval with
k = O(1) in L?), or trees of arity d > 2 where the tradeoffs shift. For lower
bounds, the only live avenue is restricted models: prove Omega(h log k) space
for algorithms whose memory accesses are oblivious to table contents, scoping
exactly what the Cook–Mertz trick evades.

## Verification notes

Checked August 2026. TreeEval in O(log n) space remains open; the problem's core
gap stands. The worst-case space record is Goldreich's o(log n · log log n)
refinement (ECCC TR24-124), slightly better than the Cook–Mertz bound the problem
previously listed. A claimed poly-time O(log^{1+eps} n)-space algorithm (Asadi
& Cleve, ECCC TR26-044) was withdrawn in April 2026 due to an error and should
not be cited.
