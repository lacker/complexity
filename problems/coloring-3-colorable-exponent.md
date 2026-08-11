---
id: coloring-3-colorable-exponent
title: "Color a 3-colorable graph with fewer than O(n^0.19539) colors — beat the 2026 Bansal–Huang–Lee exponent while hardness is stuck at 5 colors"
genre: improve-algorithm
problems: ["Graph Coloring", "3-Coloring"]
hypotheses: []
record: "O(n^0.19539) colors in polynomial time"
record_ref: "Bansal, Huang & Lee, arXiv:2602.05904 (2026); previously ~O(n^0.19747), Kawarabayashi, Thorup & Yoneda, STOC 2024 (arXiv:2406.00357)"
hardness: "NP-hard to color a 3-colorable graph with 5 colors (generally 2k-1 colors for k-colorable)"
hardness_ref: "Barto, Bulín, Krokhin & Opršal, J. ACM 2021 (arXiv:1811.00970; conference version Bulín–Krokhin–Opršal, STOC 2019)"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [graph-coloring, sdp, promise-csp, combinatorial, hardness-of-approximation]
---

## Statement

You are promised a graph is 3-colorable, but not given the coloring. Color it
in polynomial time with as few colors as possible. Deciding 3-colorability is
classically NP-hard, so some blowup is expected — but the state of the art is
absurd from both ends: the best algorithm needs O(n^0.19539) colors, a
polynomial in n, while the best NP-hardness result only rules out 5 colors.
The challenge: push the algorithmic exponent below 0.19539, or prove hardness
of coloring with any constant number of colors ≥ 6 — or any function growing
with n.

## Current record

The algorithmic line alternates combinatorial and SDP advances: Wigderson's
O(√n), Blum's Õ(n^{3/8}), Karger–Motwani–Sudan's SDP-based Õ(n^{1/4}), their
combination by Blum–Karger (Õ(n^{3/14})), then the Kawarabayashi–Thorup
program combining degree-threshold combinatorics with SDP rounding: n^0.2072
(2012/2014), n^0.19996 (2017), and with Yoneda Õ(n^0.19747) (STOC 2024), whose
core is a "progress" framework handling minimum degree above √n
combinatorially. The current record, O(n^0.19539) (Bansal–Huang–Lee, February
2026, arXiv:2602.05904), extends the SDP side, analyzing third-level
neighborhoods and a new "vector 5/2-coloring." Hardness: Barto, Bulín,
Krokhin and Opršal (J. ACM 2021, STOC 2019), via the algebraic polymorphism
theory of promise CSPs, prove it NP-hard to (2k−1)-color a k-colorable graph
— for k = 3, five colors. That is the entire unconditional frontier: 5
versus n^0.195.

## Why it matters

This is the widest algorithm-vs-hardness gap among the famous approximation
problems, and both sides sit on active reduction webs. Hardness of coloring
3-colorable graphs with O(1) colors follows from variants of Khot's d-to-1
conjectures (Dinur–Mossel–Regev), so unconditional progress beyond 5 colors is
a direct test of how far the promise-CSP/polymorphism machinery and the
Grassmann-style techniques behind the 2-to-2 Games Theorem can be pushed.
Algorithmically, the KT/BHL framework is a workbench where SDP hierarchies and
combinatorial decomposition trade off explicitly — exponent movements here
demonstrate reusable rounding technology.

## Attack surface

The 2024 and 2026 papers each came from optimizing one half of a two-part
pipeline (combinatorial reduction for high-degree regimes, SDP rounding for
low-degree ones); the crossover point is re-optimized each time, so improving
either half strictly improves the exponent — a decomposable, partially
mechanical search. Concrete entry points: extend the vector-coloring analysis
to fourth-level neighborhoods; improve the KTY "progress" lemma's √n degree
threshold. On hardness, the polymorphism approach is systematic: proving
NP-hardness of 6-coloring 3-colorable graphs is a named open problem in the
promise-CSP program, and topology-based methods (adjunctions, homotopy
invariants) have already improved constants for related promise-coloring
problems. Even conditional results under explicit d-to-1-style assumptions
tighten the web.
