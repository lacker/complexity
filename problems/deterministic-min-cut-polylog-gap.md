---
id: deterministic-min-cut-polylog-gap
title: "Deterministic global min cut is near-linear but with an unspecified polylog — pin the exponent down to the randomized O(m log^2 n)"
genre: tighten-overhead
problems: ["Global Minimum Cut", "Edge Connectivity"]
hypotheses: []
record: "deterministic m polylog(n) time, exponent unspecified; randomized O(m log^2 n)"
record_ref: "Henzinger, Li, Rao & Wang, SODA 2024 (arXiv:2401.05627); randomized: Gawrychowski, Mozes & Weimann, ICALP 2020 (arXiv:1911.01145)"
hardness: "none known — nothing rules out deterministic O(m) time"
hardness_ref: "n/a"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [graphs, min-cut, derandomization, deterministic-vs-randomized, tighten-overhead]
---

## Statement

Compute a global minimum cut of an undirected weighted graph deterministically
in O(m log^2 n) time — matching the best randomized bound — or at least in
O(m log^c n) for a small explicit constant c. The current deterministic
near-linear algorithm carries a polylogarithmic factor whose exponent the
authors do not even compute. Any explicit, small exponent is progress; so is a
better randomized bound, since O(m log^2 n) has stood since 2020.

## Current record

Karger (1996/JACM 2000) gave the famous randomized O(m log^3 n) algorithm:
sample a sparse "skeleton" that approximately preserves cuts, pack O(log n)
spanning trees, and find the best cut 2-respecting some tree by dynamic
programming. Gawrychowski, Mozes and Weimann (ICALP 2020, arXiv:1911.01145)
improved the tree step to get randomized O(m log^2 n) for weighted graphs.
Derandomization proceeded in stages: Kawarabayashi–Thorup (STOC 2015) got
deterministic near-linear time for simple graphs, improved to
O(m log^2 n log log n) by Henzinger–Rao–Wang (SODA 2017); Li (STOC 2021,
arXiv:2106.05513) reached deterministic m^{1+o(1)} for weighted graphs via
deterministic expander decompositions; and Henzinger, Li, Rao and Wang
(SODA 2024, arXiv:2401.05627) finally achieved deterministic Õ(m) for weighted
graphs, by deterministically building a sparse clustering that preserves
minimum cuts with o(1) error. Their polylog exponent is left unspecified and
is large. No lower bound beyond the trivial Ω(m) exists.

## Why it matters

Global min cut is the flagship success of derandomization in graph algorithms:
the randomized-vs-deterministic gap collapsed from polynomial to polylog over
a decade. What remains is exactly the kind of quantitative slack this list
tracks — an unspecified log^c n against log^2 n. The missing piece is a
deterministic substitute for Karger's skeleton sampling, a primitive
(cut-preserving sparsification by random sampling) used across the field;
an efficient deterministic version with explicit small overhead would
propagate to Gomory–Hu trees, edge-connectivity variants, and the dynamic and
cactus-representation algorithms that already build on KT-style clustering.
Simple graphs show the endgame is realistic: there the deterministic bound is
already O(m log^2 n log log n).

## Attack surface

The HLRW pipeline has clearly identified bottlenecks: their clustering only
preserves minimum cuts to polylogarithmic approximation per level before
being boosted, and the recursion over O(log n) levels multiplies the losses —
tightening either the per-level error or the level count directly cuts the
exponent. Alternative wedge: derandomize Karger's strength-based sampling
directly (HLRW note an efficient deterministic construction of his skeleton
"has remained elusive") — pessimistic estimators or the deterministic
almost-linear min-ratio-cut machinery from the flow literature are candidate
tools. The GMW 2-respecting-cut step is already deterministic O(m log n), so
the randomness is quarantined in sparsification. Weighted-to-simple
reductions, or first getting an explicit exponent at all, are honest partial
wins.
