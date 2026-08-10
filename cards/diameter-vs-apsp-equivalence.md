---
id: diameter-vs-apsp-equivalence
title: "Compute the diameter of a dense weighted graph in truly subcubic time, or reduce APSP to Diameter"
genre: equivalence-completion
problems: ["Diameter", "APSP", "Negative Triangle"]
hypotheses: [APSP, SETH]
record: "n^3 / 2^{Θ(√log n)} time, by running the fastest APSP algorithm and taking the maximum distance"
record_ref: "R. Williams, STOC 2014 (SICOMP 2018)"
hardness: "under SETH, exact diameter on sparse graphs needs m^{2-o(1)} time (Roditty & Vassilevska Williams, STOC 2013); no n^{3-eps} conditional lower bound is known for dense graphs"
hardness_ref: "Roditty & Vassilevska Williams, STOC 2013"
status: open
confidence: high
tags: [graphs, diameter, apsp, subcubic-equivalence]
---

## Statement

The diameter of a graph is the largest shortest-path distance between any pair of vertices. On a dense n-vertex graph with arbitrary edge weights, the only known way to compute it exactly is to solve All-Pairs Shortest Paths (APSP) — compute every pairwise distance, then take the maximum. Either (a) compute the diameter in O(n^{3-eps}) time for some constant eps > 0 without solving all of APSP, or (b) give a subcubic fine-grained reduction from APSP to Diameter, proving the detour through APSP is necessary under the APSP conjecture.

## Current record

The record is inherited from APSP: n^3/2^{Θ(√log n)} time (Ryan Williams, STOC 2014). The reverse direction is conspicuously missing. Vassilevska Williams and Williams (FOCS 2010, JACM 2018) built a large equivalence class of problems that are all solvable in truly subcubic time if and only if APSP is — Negative Triangle, min-plus matrix product, Replacement Paths, Second Shortest Path — and Abboud, Grandoni and Vassilevska Williams (SODA 2015) added Radius, Median, and Betweenness Centrality to the class. Diameter is the most famous problem that resisted: it trivially reduces *to* APSP, but nobody has reduced anything APSP-hard *to* it. On sparse graphs SETH rules out m^{2-eps} exact algorithms (Roditty & Vassilevska Williams, STOC 2013), but that says nothing beyond n^2 for dense graphs.

## Why it matters

Diameter is arguably the single most natural graph statistic, and this is one of the oldest structural questions in fine-grained complexity: is "one number about all distances" as hard as all the distances? A subcubic diameter algorithm would be an immediate breakthrough with practical relevance (diameter computation is a standard network-analysis primitive). A reduction from APSP would complete the centrality picture — Radius and Median are known equivalent to APSP, and the maximum-flavored Diameter would join them — and would make SETH-based and APSP-based diameter hardness reinforce each other.

## Attack surface

The equivalence proofs for Radius and Median (Abboud–Grandoni–Vassilevska Williams, SODA 2015) go through Negative Triangle; the obstruction for Diameter is its quantifier structure — a max over pairs rather than a min chosen at a designated vertex — which breaks the standard gadget that plants a triangle at a known location. Special cases to try first: reduce APSP to Diameter on graphs with small integer weights; find a subcubic algorithm distinguishing diameter D from D-1 in weighted dense graphs; or prove equivalence for the "min-diameter" variant in directed graphs. Any nontrivial approximation in subcubic dense time below ratio 3/2 would also be new.
