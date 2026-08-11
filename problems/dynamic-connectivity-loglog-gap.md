---
id: dynamic-connectivity-loglog-gap
title: "Close the (log log n)^2 gap in amortized dynamic connectivity: O(log n (log log n)^2) vs Ω(log n)"
genre: tighten-overhead
problems: ["Dynamic Connectivity"]
hypotheses: []
record: "O(log n (log log n)^2) amortized expected time per operation"
record_ref: "Huang, Huang, Kopelowitz & Pettie, SODA 2017 (journal version with Thorup: TheoretiCS 2023)"
hardness: "Ω(log n) amortized per operation in the cell-probe model"
hardness_ref: "Pătraşcu & Demaine, SICOMP 2006 (conference version STOC 2004)"
endgame: "lower-bound side is on the unconditional loop: cell-probe bounds need no conjectures, so any ω(log n) bound for connectivity is itself a new unconditional result — and the first separation from partial sums (cf. Pătraşcu & Demaine, SICOMP 2006); no published unconditional consequence from improving the algorithm"
status: open
confidence: high
verified: 2026-08-10
tags: [dynamic, connectivity, cell-probe, data-structures, polylog]
---

## Statement

Fully dynamic connectivity: maintain an undirected graph on n vertices under edge insertions and deletions, answering queries "are u and v in the same connected component?". Close the remaining gap for amortized algorithms: either give an algorithm with O(log n) amortized time per operation (matching the cell-probe lower bound), or push the lower bound above log n for this problem, e.g. to Ω(log n log log n).

## Current record

Upper bounds: Holm, de Lichtenberg and Thorup (JACM 2001) gave a deterministic O(log^2 n) amortized algorithm; Thorup (STOC 2000) reached O(log n (log log n)^3) expected amortized with randomization; Huang, Huang, Kopelowitz and Pettie (SODA 2017) improved this to O(log n (log log n)^2) amortized expected. The best deterministic amortized bound is O(log^2 n / log log n) by Wulff-Nilsen (SODA 2013). Lower bound: Pătraşcu and Demaine's information-transfer technique (SICOMP 2006) gives Ω(log n) per operation in the cell-probe model — one of the few tight-looking logarithmic dynamic lower bounds — and it already matches the upper bound for the easier partial-sums problem. For connectivity, a (log log n)^2 factor of slack remains on the randomized side, and a full log n / log log n factor on the deterministic side.

## Why it matters

Dynamic connectivity is the flagship dynamic graph problem; its true complexity is a benchmark for whether Pătraşcu–Demaine-style information-transfer bounds are the whole truth for graph problems or whether connectivity is strictly harder than partial sums. An O(log n) algorithm would be a clean, citable endpoint for a 25-year line of work. A super-log-n lower bound would be the first separation of dynamic connectivity from partial sums and would require a genuinely new lower-bound technique — with likely spillover to other dynamic problems.

## Attack surface

The (log log n)^2 in Huang et al. comes from layered structures and sampling overhead in the amortized cluster maintenance; each log log factor has an identifiable source, so shaving one of them is a plausible incremental target. On the lower-bound side, information transfer fundamentally caps out at Ω(log n) per operation for problems with single-bit answers; beating it needs the harder machinery of Larsen-style chronogram/cell-sampling arguments, which so far only bite for problems with larger outputs. Related open flank worth a separate look: worst-case update time, where Monte Carlo randomized polylog is known (Kapron, King and Mountjoy, STOC 2013), Las Vegas expected-polylog worst-case was recently achieved (Meierhans and Probst Gutenberg, SODA 2026, arXiv:2510.08297), and the best deterministic worst-case bound remains subpolynomial n^{o(1)} (Chuzhoy, Gao, Li, Nanongkai, Peng and Saranurak, FOCS 2020; also via derandomizing the SODA 2026 approach).
