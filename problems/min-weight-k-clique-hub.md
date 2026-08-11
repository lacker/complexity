---
id: min-weight-k-clique-hub
title: "Min-Weight k-Clique: beat n^k/2^{Θ(√log n)} for some fixed k ≥ 4, or prove APSP-hardness for any k beyond 3"
genre: improve-algorithm
problems: ["Min-Weight k-Clique", "Negative Triangle", "APSP", "k-Clique"]
hypotheses: [APSP, "Min-Weight k-Clique"]
record: "n^k / 2^{Θ(√log n)} time for k divisible by 3, via reduction to Min-Weight Triangle plus the fastest min-plus product; no O(n^{k-eps}) algorithm for any k"
record_ref: "folklore reduction; min-plus subroutine from R. Williams, STOC 2014 (SICOMP 2018)"
hardness: "for k = 3 the problem (as Negative Triangle) is subcubic-equivalent to APSP; for k ≥ 4 hardness is its own standalone hypothesis"
hardness_ref: "Vassilevska Williams & Williams, FOCS 2010 (JACM 2018)"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [cliques, weighted-graphs, apsp, hardness-hub]
---

## Statement

Min-Weight k-Clique: given an n-vertex graph with integer edge weights and a constant k, find the k-clique of minimum total edge weight. Either (a) solve it in O(n^{k-eps}) time for some fixed k ≥ 4 and eps > 0, refuting the Min-Weight k-Clique hypothesis, or (b) tie the hypothesis for some k ≥ 4 to an established pillar — most naturally, show that an O(n^{k-eps}) algorithm would yield a truly subcubic APSP algorithm, extending the known k = 3 equivalence.

## Current record

For k = 3 this is Negative/Min-Weight Triangle, which Vassilevska Williams and Williams (FOCS 2010) proved subcubic-equivalent to All-Pairs Shortest Paths; Ryan Williams' STOC 2014 algorithm gives n^3/2^{Θ(√log n)}. For k divisible by 3, a folklore reduction splits the k vertices into three groups of k/3 and builds a Min-Weight Triangle instance on n^{k/3} "super-vertices", inheriting the same shaving: n^k/2^{Θ(√log n)}. Nothing truly polynomial-factor-better is known for any k, and crucially, no reduction is known from APSP (or 3SUM, or SETH) to Min-Weight k-Clique for k ≥ 4 — its conjectured n^{k-o(1)} hardness is an independent assumption. Contrast with the unweighted case, where matrix multiplication solves k-Clique in about n^{ωk/3} time, far below n^k.

## Why it matters

Min-Weight (and Max-Weight) k-Clique is one of the busiest hardness hubs in fine-grained complexity: it underlies conditional lower bounds for weighted sequence and parsing problems where SETH and APSP reductions fall short, and its unweighted cousin underlies the Abboud–Backurs–Vassilevska Williams (FOCS 2015) lower bounds for context-free parsing and RNA folding. Every lower bound proved from it inherits its unverified status; a reduction from APSP would ground a whole cluster of results, while a faster algorithm would topple them and give a new weighted-clique technique.

## Attack surface

Algorithmic side: the k = 3 shaving comes from the polynomial method / Fredman's trick applied to min-plus products; the open question is whether larger k admits *more* savings than the triangle reduction inherits — e.g., can rectangular min-plus products or higher-arity Fredman tricks exploit the k-clique structure directly? Even n^k/2^{Θ(log^{0.6} n)} for k = 4 would beat the record. Hardness side: the natural target is a reduction from Min-Weight Triangle on n^{k/3}-vertex graphs *back* into Min-Weight k-Clique on n-vertex graphs, which fails because the super-vertex graph is complete tripartite with correlated weights; finding a weight-decorrelation gadget is the concrete missing piece. A reduction for even one value k ≥ 4, or from the counting version, would be publishable.

## Verification notes

Verified 2026-08-10 against current literature: the standard hypothesis statement (n^{k-o(1)} for weights in [1, n^{ck}]), the k = 3 APSP equivalence, and the absence of any polynomial-factor improvement over n^k all check out; papers through 2026 (e.g. combinatorial k-clique work, arXiv:2401.13502, and conjunctive-query lower-bound work) still treat Min-Weight k-Clique hardness for k ≥ 4 as an independent assumption. The negative claims (no APSP/3SUM/SETH reduction for k ≥ 4) cannot be conclusively proven by search; no 2024–2026 paper claiming such a reduction was found.
