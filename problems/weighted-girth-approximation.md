---
id: weighted-girth-approximation
title: "Beat the girth-approximation frontier: 4/3 costs Õ(n²), ratio 4k/3 costs n^{1+1/k} — close the gap to the (4/3−ε) triangle barrier and the 2k+2 query lower bound"
genre: improve-algorithm
problems: ["Girth", "Minimum Weight Cycle", "Triangle Detection", "APSP"]
hypotheses: [APSP, BMM]
record: "exact: APSP time, O(min{mn + n² log log n, n³/exp(√log n)}) for arbitrary weights; approx: 4/3 in Õ(n² log M), 2 in O(m + n^{5/3} polylog M), and (4k/3) in O(k n^{1+1/k} log n + m log n) for any k ≥ 1"
record_ref: "Kadria, Roditty, Sidford, Vassilevska Williams & Zwick (arXiv:2507.13869) for the 4k/3 tradeoff; Roditty–Tov 2013 (4/3); Ducoffe (2-approx); Pettie 2004 / Williams 2018 (exact)"
hardness: "exact girth in weighted graphs is subcubic-equivalent to APSP; any (4/3−ε)-approximation detects triangles, so no truly subcubic combinatorial one unless BMM has subcubic combinatorial algorithms; under the Erdős girth conjecture, algorithms making o(n^{1+1/k}) edge queries cannot (2k+2−τ)-approximate"
hardness_ref: "Vassilevska Williams & Williams, FOCS 2010 (JACM 2018); query lower bound: Theorem 2 of arXiv:2507.13869"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [graphs, girth, cycles, approximation, apsp, bmm]
---

## Statement

The girth of a graph is the minimum weight of a cycle. For weighted undirected graphs, close any of the gaps in the current frontier: (a) compute a (4/3)-approximation in near-linear Õ(m) time instead of Õ(n² log M); (b) for the sublinear-in-n regime, beat the ratio 4k/3 at running time O(n^{1+1/k}) — anything below 2k+2 is consistent with the known query lower bound; or (c) compute exact girth in truly subcubic time, which by known equivalence would break the APSP conjecture.

## Current record

Exact girth for arbitrary positive weights is stuck at APSP time: O(min{mn + n² log log n, n³/exp(√log n)}) (Pettie 2004; Williams 2018). For unweighted graphs it is O(min{n^ω, mn}) (Itai–Rodeh 1978), and Õ(min{Mn^ω, mn}) for weights in [1,M] (Roditty–Vassilevska Williams 2011). On the approximation side: Roditty–Tov (2013) get ratio 4/3 in Õ(n² log M); Ducoffe gets ratio 2 in O(m + n^{5/3} polylog M); and Kadria–Roditty–Sidford–Vassilevska Williams–Zwick (arXiv:2507.13869) get, for every k ≥ 1, a cycle of length at most (4k/3)·g in O(k n^{1+1/k} log n + m log n) time — strongly polynomial, no dependence on M. On the lower-bound side, exact girth is in the APSP subcubic-equivalence class (Vassilevska Williams–Williams, FOCS 2010), a (4/3−ε)-approximation can detect triangles (BMM barrier for combinatorial algorithms), and assuming the Erdős girth conjecture, o(n^{1+1/k}) edge accesses cannot achieve ratio 2k+2−τ. Note the constant-factor mismatch: upper bound 4k/3, lower bound 2k+2.

## Why it matters

Girth is one of the oldest graph parameters (Itai–Rodeh, 1978) and the canonical test case for "how much do you pay to avoid APSP?" It sits at the junction of three hypotheses — APSP (exact), BMM (combinatorial approximation), and the Erdős girth conjecture (query complexity) — so any movement tightens the web on multiple edges at once. The 4k/3-vs-2k+2 gap is a crisp, publishable target with an unusual property: both endpoints were set in the same 2025 paper, so the frontier is fresh and its authors explicitly suspect the 4k/3 form "might be right."

## Attack surface

The 4k/3 algorithms work by ball-growing from sampled vertices with a budget of n^{1/k}, detecting a short cycle when balls self-intersect; the ratio loss comes from where the detection triggers. To push below 4/3 in subquadratic time, note the triangle barrier only binds combinatorial algorithms — a matrix-multiplication-based (4/3−ε)-approximation in n^{ω}-ish time is not ruled out and would be new. Special cases to try first: unweighted graphs (where the 4/3 barrier is cleanest), graphs of girth ≥ 5, and improving the 2-approximation of Ducoffe from n^{5/3} toward Õ(m).
