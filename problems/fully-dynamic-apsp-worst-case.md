---
id: fully-dynamic-apsp-worst-case
title: "Fully dynamic APSP hit its conjectured Õ(n^{2.5}) worst-case update time — now prove the n^{2.5−o(1)} lower bound, which currently doesn't exist under any hypothesis"
genre: missing-hardness
problems: ["Fully Dynamic APSP", "APSP", "Online Matrix-Vector Multiplication"]
hypotheses: [APSP, OMv]
record: "randomized Õ(n^{2.5}) worst-case update time with Õ(n²) space, maintaining the full distance matrix under vertex updates (no negative cycles); amortized Õ(n²) has long been known"
record_ref: "Xiao Mao, STOC 2024 (arXiv:2306.02662); amortized: Demetrescu & Italiano, STOC 2003 (JACM 2004)"
hardness: "nothing beyond the trivial Ω(n²) for explicitly maintaining the distance matrix; the n^{2.5} 'natural barrier' is a heuristic observation (it resists even algorithms given all future updates), with no formal conditional lower bound under APSP, OMv, or any standard hypothesis"
hardness_ref: "barrier discussion: Abraham, Chechik & Krinninger, SODA 2017 (arXiv:1607.05132) and Section 1 of Mao, arXiv:2306.02662"
status: open
confidence: high
verified: 2026-08-10
tags: [graphs, dynamic-algorithms, apsp, worst-case-update, missing-hardness]
---

## Statement

A fully dynamic APSP structure maintains all pairwise distances in a real-weighted digraph under vertex insertions and deletions. Prove, under a standard fine-grained hypothesis (APSP conjecture, OMv, or kin), that any such structure maintaining the explicit distance matrix requires n^{2.5−o(1)} worst-case update time — or refute the folklore barrier by beating Õ(n^{2.5}).

## Current record

Amortized update time was settled two decades ago: Demetrescu–Italiano (STOC 2003) maintain the distance matrix in Õ(n²) amortized per vertex update, which is optimal up to polylogs since one update can change Ω(n²) matrix entries. The worst-case story took twenty more years: Thorup (2005) got Õ(n^{2.75}), Abraham–Chechik–Krinninger (SODA 2017, arXiv:1607.05132) got randomized Õ(n^{2+2/3}), Gutenberg–Wulff-Nilsen (SODA 2020) matched that deterministically, and Xiao Mao (STOC 2024, arXiv:2306.02662) reached randomized Õ(n^{2.5}) worst-case update time with Õ(n²) space via "hop-dominant shortest paths." That lands exactly on the barrier Abraham–Chechik–Krinninger identified as natural: known techniques pay n^{2.5} even when an oracle reveals all future deletions. But — and this is the problem — no theorem backs the barrier. The only proven lower bound is the trivial Ω(n²), leaving a clean n^{0.5} gap between what is proven and what is believed.

## Why it matters

This is a rare configuration: the algorithm side is finished (Mao's title says "likely optimal") and the entire remaining gap is a missing hardness edge. Fine-grained complexity has a mature toolbox for amortized dynamic lower bounds (OMv covers dozens of problems) but worst-case update lower bounds are scarcer and structurally different — an adversary must concentrate hardness in a single update rather than a sequence. A conditional n^{2.5−o(1)} bound here would be a template for worst-case hardness across dynamic graph problems (dynamic matrix inverse and dynamic reachability face analogous half-integer barriers, cf. van den Brand–Nanongkai–Saranurak, FOCS 2019). Alternatively, beating n^{2.5} would overturn a barrier that survived an all-knowing-oracle thought experiment.

## Attack surface

The natural route: reduce OMv or the (min,+)-product to a short sequence of updates such that some single update must "pay for" an n^{1.5} × n matrix-vector-like computation over n distances each — the half-integer exponent smells like the uMv-style tradeoffs formalized by van den Brand–Nanongkai–Saranurak for algebraic dynamic problems; porting their framework from st-distance queries to explicit-matrix maintenance is the obvious first move. Easier warm-ups: prove the bound for restricted models (combinatorial algorithms, or structures that maintain shortest-path trees, not just distances), or show n^{2.5−o(1)} for worst-case unweighted fully dynamic APSP, where Mao's bound also stands.
