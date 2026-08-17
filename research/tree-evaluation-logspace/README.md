# Research notebook: Tree Evaluation in logspace

Started: 2026-08-12

Status: no full logspace algorithm found. The main outcome is a corrected
parameter map, a stress test of the obvious algebraic/recomputation routes,
and three explicit surviving targets in main-analysis.md.

## Goal

Determine whether the complete binary Tree Evaluation problem can be solved
deterministically in `O(log n)` workspace, where `n` is the explicit input
length.  If a full algorithm is not found, isolate a rigorous special case,
new parameter tradeoff, or obstruction that materially narrows the gap.

This folder is separate from the circuit-SAT research notebook.

## Files

- `main-analysis.md`: synthesis and strongest conclusion.
- `model-and-known-bounds.md`: exact model and primary-source reconstruction.
- `algorithm-attempts.md`: proposed algorithms, parameter ledgers, and
  counterexamples.
- `permutation-program-route.md`: a Barrington-style constant-call gadget and
  the precise fixed-width closure lemma it still lacks.
- `special-cases-and-barriers.md`: constant-alphabet and restricted cases,
  plus pebbling/lower-bound barriers.
- `sources.md`: checked primary-source bibliography.

## Epistemic labels

- **Theorem:** stated in a checked primary source or proved completely here.
- **Derived:** a complete calculation from stated facts.
- **Candidate:** a plausible claim with an explicit missing step.
- **Failed:** a tempting route with a counterexample or circular dependency.
