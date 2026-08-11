---
id: apsp-truly-subcubic
title: "Beat n^3 / 2^{Omega(sqrt(log n))} for All-Pairs Shortest Paths — the record an entire equivalence class inherits"
genre: improve-algorithm
problems: ["All-Pairs Shortest Paths", "Min-Plus Matrix Product", "Negative Triangle"]
hypotheses: [APSP]
record: "n^3 / 2^{Omega(sqrt(log n))} time"
record_ref: "Williams, STOC 2014 / SICOMP 2018 (arXiv:1312.6680)"
hardness: "conjectured: no O(n^{3-eps}) algorithm for any eps > 0 (the APSP Hypothesis)"
hardness_ref: "Vassilevska Williams & Williams, FOCS 2010 / JACM 2018"
status: open
confidence: high
tags: [graphs, fine-grained, apsp, min-plus, hub]
---

## Statement

Compute the shortest-path distance between every pair of vertices in an
n-vertex directed graph with real edge weights, in truly subcubic time —
O(n^{3-eps}) for some constant eps > 0. Equivalently (the two are
interreducible with negligible overhead): compute the (min,+) product of two
n x n matrices in truly subcubic time. Short of that, any improvement to the
2^{Omega(sqrt(log n))} savings factor — say n^3 / 2^{Omega(log^{0.51} n)} —
would also be a major result.

## Current record

The classical dynamic programs (Floyd–Warshall, 1962) run in O(n^3), and for
decades progress was only polylogarithmic shavings. Williams (STOC 2014)
achieved n^3 / 2^{Omega(sqrt(log n))} by an entirely different route: reduce
min-plus products to evaluating low-depth circuits, then batch-evaluate them
with the polynomial method and fast rectangular matrix multiplication. That
bound has now stood for over a decade. On the other side, the APSP
Hypothesis — no truly subcubic algorithm exists — is one of the three pillar
conjectures of fine-grained complexity, but unlike SETH it has no classical
hypothesis backing it beyond its own track record.

## Why it matters

This is a hub problem: Vassilevska Williams and Williams (FOCS 2010) proved
APSP subcubic-equivalent to a large class including Negative Triangle, Radius,
Median, Betweenness Centrality, Replacement Paths, Second Shortest Path, and
minimum-weight cycle — and the class keeps growing (weighted tree edit
distance joined it at STOC 2025). A truly subcubic algorithm for ANY member
collapses the whole class below cubic at once; conversely, this record is the
number every member's fastest known algorithm silently inherits. Beating even
the savings factor propagates through more of this atlas than any other single
entry on the list.

## Attack surface

The structural obstruction is that (min,+) lacks the cancellation that makes
fast Strassen-style matrix multiplication possible over rings — subtraction
has no analogue. Known wedges: (1) structured entries fall — bounded-difference
and monotone min-plus products are truly subcubic (Bringmann–Grandoni–Saha–
Vassilevska Williams FOCS 2016; Chi–Duan–Xie–Zhang STOC 2022, who reached
Õ(n^{(3+omega)/2}) with equal exponents for several structured regimes), so the
question is how much structure is really needed; (2) the equivalence class
offers many doors — a subcubic Negative Triangle detector suffices, and
Negative Triangle looks combinatorially simpler than full APSP; (3) on the
savings-factor front, the polynomial method's sqrt(log n) exponent comes from
balancing circuit depth against rectangular matrix multiplication — any
improvement in either ingredient moves the record mechanically.
