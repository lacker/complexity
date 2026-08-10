---
id: tree-evaluation-log-space
title: "Put Tree Evaluation in O(log n) space, beating the Cook–Mertz O(log n · log log n) bound"
genre: improve-algorithm
problems: ["Tree Evaluation"]
hypotheses: []
record: "Tree Evaluation is solvable in space O(log n · log log n)"
record_ref: "Cook & Mertz, STOC 2024 (\"Tree Evaluation Is in Space O(log n · log log n)\")"
hardness: "no super-logarithmic space lower bound known; the problem was originally conjectured to require space Omega(h log k), which the record refuted"
hardness_ref: "Cook, McKenzie, Wehr, Braverman & Santhanam, TOCT 2012 (problem introduction and conjecture)"
status: open
confidence: high
tags: [space-complexity, tree-evaluation, catalytic, logspace]
---

## Statement

Tree Evaluation (TreeEval): given a complete binary tree of height h where each
leaf holds a value in {1, ..., k} and each internal node holds an explicit
lookup table for an arbitrary function from pairs of child values to {1, ..., k},
compute the value at the root. The input (dominated by the tables) has size
n roughly 4^h k^2 log k. The card: solve TreeEval in space O(log n) — that is,
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
short of logspace. The gap to close is exactly that log log n factor, or, in
the other direction, any argument that the multiplicative slack is necessary.

## Why it matters

Two direct cascades. First, the Williams STOC 2025 simulation TIME[t] ⊆
SPACE[sqrt(t log t)] invokes Cook–Mertz as its core subroutine; TreeEval in
space O(log n) would tighten that headline bound (see card
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
