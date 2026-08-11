---
id: dynamic-cell-probe-polylog-barrier
title: "Beat Ω̃((log n / log log n)^2) — the highest unconditional cell-probe lower bound for any dynamic problem"
genre: missing-hardness
problems: ["Dynamic Weighted 2D Range Counting", "Dynamic 2D Range Parity", "Multiphase Problem"]
hypotheses: [3SUM]
record: "Ω((log n / log log n)^2) per operation for dynamic weighted 2D range counting; Ω̃(log^{1.5} n) for Boolean problems (2D range parity; incremental s-t reachability in DAGs)"
record_ref: "Larsen, STOC 2012; Larsen, Weinstein & Yu, STOC 2018; Larsen & Yu, FOCS 2023 (arXiv:2304.08745)"
hardness: "Pătraşcu's multiphase problem is 3SUM-hard, giving conditional polynomial bounds for dynamic reachability and friends"
hardness_ref: "Pătraşcu, STOC 2010"
status: open
confidence: high
verified: 2026-08-10
tags: [cell-probe, lower-bounds, dynamic, multiphase, 3sum, barriers]
---

## Statement

Prove, for any explicit dynamic data structure problem, an unconditional cell-probe lower bound of ω((log n / log log n)^2) per operation — i.e., beat the strongest known dynamic lower bound. The dream version: any super-polylogarithmic (let alone polynomial, n^{eps}) per-operation lower bound for an explicit dynamic problem. In the cell-probe model only memory accesses (to w-bit cells, typically w = Θ(log n)) are counted, so such bounds hold against all algorithms.

## Current record

The record for lower bounds is Larsen's Ω((log n / log log n)^2) per operation for dynamic weighted orthogonal range counting in 2D (STOC 2012), proved by combining the chronogram method with cell sampling. For problems with one-bit answers — where that argument breaks — the record is roughly Ω̃(log^{1.5} n) for dynamic 2D range parity, by Larsen, Weinstein and Yu (STOC 2018), the first Boolean bound past the Pătraşcu–Demaine Ω(log n) information-transfer barrier. Larsen and Yu (FOCS 2023; SICOMP 2025, arXiv:2304.08745) extended that technique to a natural graph problem: Ω̃(log^{1.5} n) on max(update, query) time for s-t reachability in a DAG under edge insertions — the first super-logarithmic bound for any natural dynamic graph problem. Two 2025–2026 preprints by Ko (arXiv:2510.17717 and arXiv:2603.25914) claim to unify these arguments and to push the Boolean record to Ω((log n / log log n)^2) for the Multiphase Problem via a "2.5-round" communication game — if it holds up, the Boolean and weighted records coincide, but it has not yet been peer-reviewed. Meanwhile, for many dynamic problems (reachability, shortest paths) the true complexity is believed to be polynomial (n^{eps} or worse) — conditional lower bounds from OMv, 3SUM and SETH say exactly that. The gap between what we believe (polynomial) and what we can prove (barely above log^2 n) remains enormous.

## Why it matters

This is arguably the central open problem of data-structure lower bounds. Pătraşcu's multiphase problem (STOC 2010) was designed as the bridge: a simple three-phase set-disjointness-flavored task that is 3SUM-hard, such that a polynomial unconditional bound for it would transfer to dynamic reachability and many other dynamic problems through existing reductions. Closing this problem — even partially, say Ω(log^3 n) for anything explicit — would be a major unconditional complexity advance, and would immediately propagate through every reduction currently anchored only to conjectures.

## Attack surface

Known techniques and their ceilings: information transfer caps at Ω(log n); chronogram plus cell sampling caps around log^2 n because each epoch argument loses a log factor; the Larsen–Weinstein–Yu weakness-finding argument reaches log^{1.5} n for Boolean outputs. Communication-complexity routes to the multiphase problem must contend with the fact that natural communication relaxations of it turn out to have efficient protocols, so any successful argument must use the data-structure setting (bounded cells, sequential phases) in an essential way. Realistic near-term targets: extend Ω̃(log^2 n)-type bounds to more natural Boolean problems (the Larsen–Yu FOCS 2023 reachability bound and Ko's 2025–2026 multiphase preprints are exactly this frontier — verifying or breaking the latter is itself a contribution), or prove epoch-argument lossiness is inherent via a matching cell-probe upper bound, sharpening where the barrier actually sits.

## Verification notes

Verified 2026-08-10 against the literature. The Ko preprints (arXiv:2510.17717, Oct 2025; arXiv:2603.25914, Mar 2026) claiming Ω((log n / log log n)^2) for the Boolean Multiphase Problem are single-author arXiv postings with no peer-reviewed venue found as of this sweep; the frontmatter record deliberately keeps the peer-reviewed state of the art (Larsen STOC 2012; LWY STOC 2018; Larsen–Yu FOCS 2023) and reports the preprint claim only in the body.
