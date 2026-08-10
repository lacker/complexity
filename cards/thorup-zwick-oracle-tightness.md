---
id: thorup-zwick-oracle-tightness
title: "Make the Thorup–Zwick distance-oracle bound unconditional: stretch 2k−1 in o(n^{1+1/k}) space, or a matching lower bound not resting on the Erdős girth conjecture"
genre: missing-hardness
problems: ["Approximate Distance Oracles", "Spanners", "Set Intersection"]
hypotheses: ["Erdős Girth Conjecture", "Set Intersection"]
record: "stretch 2k−1, space O(n^{1+1/k}), query time O(1) for weighted undirected graphs; for sparse unweighted graphs, a size-O(n^{5/3}) oracle answering within 2d+1"
record_ref: "Chechik, STOC 2015 (see also Chechik STOC 2014, arXiv:1305.3314); Thorup & Zwick, JACM 2005; sparse regime: Pătraşcu & Roditty, FOCS 2010"
hardness: "any oracle with stretch < 2k+1 needs Ω(n^{1+1/k}) bits assuming the Erdős girth conjecture — unconditional only for k = 1, 2, 3, 5; on sparse graphs, 2-approximate oracles need Ω̃(n^{1.5}) space under a set-intersection conjecture"
hardness_ref: "Thorup & Zwick, JACM 2005 (girth-conjecture incompressibility); Pătraşcu & Roditty, FOCS 2010 (set-intersection conditional bound)"
status: open
confidence: high
verified: 2026-08-10
tags: [graphs, distance-oracles, spanners, girth-conjecture, data-structures]
---

## Statement

A distance oracle preprocesses a weighted undirected graph into a small data structure answering approximate distance queries. Thorup–Zwick achieve stretch 2k−1 using O(k·n^{1+1/k}) space; after successive improvements the record is space O(n^{1+1/k}) with O(1) query time (Chechik, STOC 2015). Either (a) construct, for some k where the Erdős girth conjecture is unproven (k = 4, 6, 7, ...), an oracle with stretch 2k−1 and space o(n^{1+1/k}); or (b) prove an unconditional Ω(n^{1+1/k})-bit lower bound for stretch < 2k+1 for such k; or (c) resolve the sparse-graph regime, where the lower bound is only conditional on set-intersection hardness.

## Current record

Thorup–Zwick (JACM 2005) gave the canonical tradeoff — stretch 2k−1, space O(kn^{1+1/k}), query O(k) — and proved via an incompressibility argument that stretch below 2k+1 forces Ω(n^{1+1/k}) bits, provided graphs with girth 2k+2 and n^{1+1/k} edges exist. That existence is the Erdős girth conjecture, proven only for k = 1, 2, 3, 5. The query time fell to O(log k) (Wulff-Nilsen, SODA 2013), then O(1) (Chechik, STOC 2014, arXiv:1305.3314), and Chechik (STOC 2015) removed the factor k from the space, giving O(n^{1+1/k})/O(1)/2k−1 — matching the conditional lower bound up to constants. For sparse graphs the picture is genuinely open: Pătraşcu–Roditty (FOCS 2010) beat Thorup–Zwick with an O(n^{5/3})-size oracle answering within 2d+1 on unweighted graphs, and their matching Ω̃(n^{1.5}) space bound is conditional on a conjecture about set-intersection queries. Recent work continues to trade query time for space and stretch in sparse graphs (e.g. arXiv:2509.00890, ISAAC 2025), with no unconditional tightness anywhere in that regime.

## Why it matters

This is the flagship data-structure tradeoff in graph algorithms, and its lower-bound side hangs on a 60-year-old extremal-graph-theory conjecture. An oracle beating n^{1+1/k} space for k = 4 would disprove nothing — the girth conjecture could simply be false at that k — which means the upper bound is not actually known to be optimal for most k. Either direction of resolution transfers immediately to spanners, compact routing, and labeling schemes, which inherit the same girth-conjecture dependence.

## Attack surface

For (a): the girth conjecture is widely doubted in its strong form for large k; the densest known girth-(2k+2) graphs for general k fall polynomially short of n^{1+1/k} edges, so for, say, k = 4 there is real slack between what incompressibility can currently prove and n^{1+1/k}. Any oracle construction exploiting the true extremal function would beat Thorup–Zwick space. For (b): find an incompressibility argument not routed through dense high-girth graphs — e.g. via cell-probe or communication lower bounds, imitating Pătraşcu–Roditty's set-intersection framework. For (c): extend the FOCS 2010 conditional bounds to the full Pătraşcu–Roditty–Thorup (FOCS 2012) tradeoff curve for sparse graphs.
