---
id: decremental-directed-sssp-sparse
title: "Decremental (1+ε)-approximate SSSP in sparse digraphs is stuck at Õ(mn^{2/3}) total time — undirected and incremental-directed are both m^{1+o(1)}, and no lower bound explains the gap"
genre: improve-algorithm
problems: ["Decremental SSSP", "Incremental SSSP", "Online Matrix-Vector Multiplication", "Min-Cost Flow"]
hypotheses: [OMv, BMM]
record: "(1+ε)-approximate SSSP under edge deletions in weighted digraphs: Õ(n² log⁴ W) total update time (near-optimal for dense), Õ(m n^{2/3} log³ W) for sparse; undirected decremental is m^{1+o(1)} deterministic; incremental directed is m^{1+o(1)} log W"
record_ref: "Bernstein, Probst Gutenberg & Wulff-Nilsen, FOCS 2020 (arXiv:2004.04496); undirected: Bernstein–Probst Gutenberg–Saranurak (arXiv:2101.07149); incremental: Y. P. Liu (arXiv:2506.19207)"
hardness: "exact decremental SSSP needs essentially mn total time under BMM/OMv-type hypotheses (matching Even–Shiloach); for (1+ε)-approximate directed decremental SSSP no superlinear conditional lower bound is known — the m n^{2/3} record faces only the trivial Ω(m)"
hardness_ref: "Roditty & Zwick, ESA 2004; Henzinger, Krinninger, Nanongkai & Saranurak, STOC 2015 (arXiv:1511.06773)"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [graphs, dynamic-algorithms, shortest-paths, decremental, directed]
---

## Statement

Maintain (1+ε)-approximate distances from a fixed source in a weighted directed graph undergoing edge deletions, with O(1)-time queries. Beat total update time Õ(m n^{2/3} log³ W) on sparse graphs — ideally reaching m^{1+o(1)}, which is already achieved by the undirected decremental and the directed *incremental* versions of the same problem — or prove a conditional lower bound separating decremental-directed from those two solved neighbors.

## Current record

Bernstein, Probst Gutenberg and Wulff-Nilsen (FOCS 2020, arXiv:2004.04496) gave total update time Õ(n² log⁴ W) for dense weighted digraphs — near-optimal there, since even static APSP-style arguments and the deletion sequence itself force ~n² — plus Õ(m n^{2/3} log³ W) for sparse graphs. Since then the two flanking problems fell to almost-linear: undirected decremental (1+ε)-SSSP is m^{1+o(1)} deterministically (Bernstein–Probst Gutenberg–Saranurak, arXiv:2101.07149, which powered their almost-linear min-cost flow pipeline), and in June 2025 Yang P. Liu solved *incremental* directed (1+ε)-SSSP in m^{1+o(1)} log W total time via a modified interior-point method (arXiv:2506.19207). Decremental directed is now the last partially-dynamic quadrant not known to be almost-linear. On the hardness side, only exact SSSP is understood: Ω(mn)-type conditional bounds (Roditty–Zwick ESA 2004 via BMM; Henzinger–Krinninger–Nanongkai–Saranurak STOC 2015 via OMv, arXiv:1511.06773) show Even–Shiloach's classic O(mn) is essentially optimal. For the (1+ε)-approximate directed decremental problem, nothing beyond the trivial Ω(m) is known.

## Why it matters

This is a two-sided problem with a solved sibling on each flank, so any resolution is informative. An m^{1+o(1)} algorithm would complete the partially-dynamic approximate-SSSP landscape and likely require making IPM/flow-based dynamic techniques work under deletions in digraphs — a tool gap whose closure would propagate to decremental reachability, flow, and dynamic APSP tradeoffs. A conditional lower bound (say m n^{1/3−o(1)}) would be even more surprising: the first separation between incremental and decremental approximate shortest paths, and a new kind of OMv-style bound that survives (1+ε)-approximation.

## Attack surface

Algorithm side: Liu's incremental result suggests trying a deletion-compatible interior-point method — the obstruction is that deletions increase distances, breaking the one-directional potential arguments IPMs rely on; a decremental min-ratio-cycle data structure is the concrete missing piece. Intermediate targets: m^{1+o(1)} for unweighted sparse digraphs, or Õ(m n^{1/2}). Hardness side: existing OMv reductions encode exact distance thresholds that (1+ε)-approximation destroys; a reduction using hop-length hierarchies (where approximation is less forgiving in directed graphs) is the natural gadget hunt. Warm-up: any superlinear conditional bound for constant-approximate decremental directed SSSP.
