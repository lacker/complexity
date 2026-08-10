---
id: time-space-sqrt-simulation
title: "Improve TIME[t] ⊆ SPACE[sqrt(t log t)]: shave the sqrt(log t) factor, or push the exponent below 1/2"
genre: tighten-overhead
problems: ["Time-Space Simulation", "Tree Evaluation"]
hypotheses: []
record: "every multitape Turing machine running in time t can be simulated in space O(sqrt(t log t))"
record_ref: "Williams, STOC 2025 (arXiv:2502.17779)"
hardness: "no matching lower bound; a simulation in space t^{o(1)} would imply P != PSPACE-style separations far beyond current techniques"
hardness_ref: "discussed in Williams, STOC 2025"
status: open
confidence: high
tags: [space-complexity, simulations, tree-evaluation, structural]
---

## Statement

How much memory does time buy? For fifty years the best generic answer was
Hopcroft–Paul–Valiant (1977): anything computable in time t is computable in
space t / log t — barely better than trivial. Williams (STOC 2025) collapsed
this to O(sqrt(t log t)). The card: improve the simulation. Two concrete
targets, in increasing ambition: (1) TIME[t] ⊆ SPACE[o(sqrt(t log t))], for
instance O(sqrt(t)), by removing the logarithmic overhead the current proof
inherits from its tree-evaluation subroutine; (2) TIME[t] ⊆ SPACE[t^{1/2 - c}]
for some constant c > 0, which would require evaluating the computation graph
in a fundamentally more space-efficient order.

## Current record

Williams' simulation chops a time-t computation into blocks, arranges the
block-dependency structure as an instance of the Tree Evaluation problem, and
then invokes the Cook–Mertz space-efficient tree evaluation algorithm (STOC
2024), whose catalytic-computing-style trick reuses the same workspace for a
node's children by storing intermediate values additively on top of live data.
Balancing block size against tree overhead yields O(sqrt(t log t)). The
sqrt(log t) factor comes directly from the Cook–Mertz bound; the sqrt(t) itself
comes from the block-tree tradeoff, and the paper explicitly flags improving
either as open. No lower bound rules out dramatically better simulations —
there is provably no obstacle short of the fact that t^{o(1)} space would
separate P from PSPACE.

## Why it matters

This is the biggest movement in generic time-space simulation since the 1970s,
and it immediately strengthened downstream separations (e.g., problems solvable
in linear space but requiring nearly quadratic time). Every improvement here
mechanically improves those separations, and pushing the exponent below 1/2
would be a structural earthquake: the block-respecting framework is also the
substrate for many time-space lower bound arguments, so both directions of this
card touch a lot of edges. It is also the showcase for catalytic/clean-tape
techniques crossing into classical structural complexity.

## Attack surface

Route 1: improve Tree Evaluation to O(log n) space (see the companion card
tree-evaluation-log-space) — the improvement flows through automatically and
kills the log factor. Route 2: attack the block-tree tradeoff itself; the
current reduction pays for recomputing block boundaries, and any amortization
across siblings would move the exponent. Route 3 (barriers): show that any
"block-respecting, oblivious-recomputation" simulation cannot beat sqrt(t),
which would itself be a publishable scoping theorem. Special case first:
one-tape or oblivious machines, where block structure is more rigid and better
bounds may be provable.
