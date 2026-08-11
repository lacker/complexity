---
id: triangle-listing-3sum-gap
title: "Triangle listing: close the gap between m^{4/3-o(1)} (3SUM-hard) and Õ(m^{2ω/(ω+1)}) ≈ m^{1.41}"
genre: tighten-overhead
problems: ["Triangle Listing", "Triangle Enumeration", "3SUM"]
hypotheses: [3SUM]
record: "Õ(m^{2ω/(ω+1)}) ≈ O(m^{1.41}) time to list up to m triangles (m^{4/3} if ω = 2); O(m^{3/2}) combinatorial"
record_ref: "Björklund, Pagh, Vassilevska Williams & Zwick, ICALP 2014"
hardness: "Ω(m^{4/3-o(1)}) to list m triangles, assuming the 3SUM conjecture"
hardness_ref: "Kopelowitz, Pettie & Porat, SODA 2016"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [3sum, triangles, graphs, matrix-multiplication, listing]
---

## Statement

Given a graph with m edges, list (report explicitly, one by one) up to m of its triangles. Close the gap between the conditional lower bound m^{4/3-o(1)} (under the 3SUM conjecture) and the upper bound Õ(m^{2ω/(ω+1)}), where ω < 2.372 is the fast matrix multiplication exponent — numerically about m^{1.41}. Three ways in: (a) improve the algorithm toward m^{4/3} without assuming ω = 2; (b) raise the conditional lower bound toward m^{2ω/(ω+1)} or toward m^{3/2} for combinatorial algorithms; (c) show an equivalence pinning triangle listing to matrix multiplication.

## Current record

Björklund, Pagh, Vassilevska Williams and Zwick (ICALP 2014) gave an output-sensitive triangle listing algorithm whose time for listing m triangles is Õ(m^{2ω/(ω+1)}); with current ω this is about m^{1.41}, and it would be Õ(m^{4/3}) if ω = 2. The best combinatorial (no fast matrix multiplication) bound is the classical O(m^{3/2}). On the hardness side, Pătraşcu (STOC 2010) first connected 3SUM to triangle problems, and Kopelowitz, Pettie and Porat (SODA 2016) sharpened the reduction to show that listing m triangles requires m^{4/3-o(1)} time unless the 3SUM conjecture fails. So the bound is conditionally tight if and only if ω = 2: the remaining gap is exactly the m^{(2ω-... )} slack contributed by ω > 2, plus the larger combinatorial gap up to m^{3/2}.

## Why it matters

Triangle listing sits at the junction of the 3SUM, APSP and Boolean matrix multiplication worlds: it is the standard intermediate problem for transferring 3SUM-hardness to graph and data-structure problems (dynamic reachability variants, set disjointness structures, database join lower bounds). Tightening either side propagates through all of those reductions. A combinatorial m^{3/2-o(1)} lower bound (under 3SUM or BMM-type hypotheses) would be a rare exponent-matching result for combinatorial algorithms; conversely an m^{4/3+o(1)} algorithm without ω = 2 would be a major algorithmic surprise.

## Attack surface

The Kopelowitz–Pettie–Porat reduction converts 3SUM instances to tripartite graphs via careful (almost-linear) hashing; its loss is understood, and the m^{4/3} it produces is a real barrier for that construction — improving it likely needs a different source problem (e.g. exact-weight variants or OMv). The newer "short cycle removal" line (Abboud, Bringmann, Khoury & Zamir, STOC 2022; sharpened by Jin & Xu, STOC 2023, arXiv:2211.07048) strengthens 3SUM-hardness of triangle problems in structured (few-short-cycle) graphs and improves the hashing toolkit, but has not moved the m^{4/3} bound for listing. On the algorithms side, the ICALP 2014 bound reduces listing to many small rectangular matrix products; improvements to rectangular matrix multiplication exponents translate directly, so tracking ω(1,1,t) improvements is free progress. Special cases to try first: graphs of bounded degeneracy (where m^{4/3}-type bounds are already achievable) and listing t << m triangles, where the tight tradeoff curve is also open.
