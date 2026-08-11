---
id: negative-sssp-single-log
title: "Negative-weight SSSP fell from log^8 n to log n log log n in three years — shave to a single log, or explain why parity with Dijkstra is impossible"
genre: improve-algorithm
problems: ["Single-Source Shortest Paths with Negative Weights", "Negative Cycle Detection"]
hypotheses: []
record: "O((m + n log log n) log(nW) log n log log n) randomized; deterministic O((m + n log log n) log(nW) log^3 n)"
record_ref: "Li, Mowry & Rao, 2025 (arXiv:2510.22721); deterministic: Li, STOC 2026 (arXiv:2511.07859)"
hardness: "none known — nothing rules out matching the non-negative-weight bound of O(m sqrt(log n))"
hardness_ref: "n/a"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [graphs, shortest-paths, negative-weights, scaling, low-diameter-decomposition, deterministic-vs-randomized]
---

## Statement

Given a directed graph with integer edge weights at least -W, compute
single-source shortest paths (or return a negative cycle) faster than
O((m + n log log n) log(nW) log n log log n). Concrete targets, in increasing
ambition: (a) remove the log log n, reaching a clean O(m log n log(nW));
(b) reach O((m + n log n) log(nW)) — Dijkstra cost per scaling phase;
(c) close the deterministic gap, currently log^3 n versus log n log log n.

## Current record

Bellman–Ford's O(mn) stood from the 1950s until Bernstein, Nanongkai and
Wulff-Nilsen (FOCS 2022 best paper, arXiv:2203.03456) combined Goldberg's
scaling with randomized directed low-diameter decompositions (LDDs) to get
O(m log^8 n log W). Bringmann, Cassis and Fischer (FOCS 2023, arXiv:2304.05279)
restructured the recursion and improved the LDD to reach
O(m log^2 n log(nW) log log n). Li, Mowry and Rao (arXiv:2510.22721) then gave
an LDD with loss O(log n log log n) computable in O((m + n log log n) log n
log log n) expected time, yielding the current randomized record. All of these
are randomized; Li (STOC 2026, arXiv:2511.07859) obtained the first
deterministic near-linear algorithm, O((m + n log log n) log(nW) log^3 n), via
deterministic padded decompositions (independently, Haeupler, Jiang and
Saranurak achieved deterministic near-linear time via "path covers"). Nothing
is known on the lower-bound side beyond Ω(m).

## Why it matters

This is the fastest-moving record in graph algorithms — six log factors fell
in three years — and each improvement came from a reusable primitive:
better directed LDDs, which since BNW have become infrastructure for directed
flow, diameter, and dynamic shortest-path algorithms. The LDD loss factor is
now O(log n log log n) against a known Ω(log n) lower bound for the
decomposition itself, so the remaining slack is nearly quantified: shaving the
log log n in the LDD, or bypassing LDDs entirely, are both publishable events.
Meanwhile the non-negative case has dropped to deterministic O(m sqrt(log n))
(Duan et al. 2026), so the "price of negativity" is currently a factor of
about log(nW) log^{1/2} n log log n — a gap with no lower-bound explanation.

## Attack surface

Three quantified fronts. (1) The LDD front: cutting probability
O(log n / D) would be optimal; Li–Mowry–Rao match O(log n log log n / D) —
the log log n comes from a hierarchical ball-growing recursion and looks like
proof artifact. (2) The framework front: BCF's analysis pays one log n for
scaling phases and one for the recursion on hop-reduced graphs; Fineman's
hop-set/shortcutting ideas (STOC 2024) and the bottom-up variant of Li–Mowry
(arXiv:2411.19449) suggest the two logs are not independent. (3) The
real-weight and strongly polynomial front: Fineman's Õ(mn^{8/9}) (STOC 2024)
and the Huang–Jin–Quanrud improvements are the only progress beyond O(mn)
without the log W scaling; connecting the scaling world to that line — or
proving log W necessary in near-linear time — would resolve which parameter
regime this problem really lives in.
