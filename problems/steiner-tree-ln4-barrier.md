---
id: steiner-tree-ln4-barrier
title: "Steiner tree: beat ln(4)+eps ≈ 1.3863 — untouched since 2010 — against a 96/95 hardness floor"
genre: improve-algorithm
problems: ["Steiner Tree"]
hypotheses: []
record: "ln(4) + eps < 1.39 approximation"
record_ref: "Byrka, Grandoni, Rothvoß & Sanità, STOC 2010 / J. ACM 2013; confirmed still best by Paschmanns & Traub, arXiv:2602.19879 (2026)"
hardness: "NP-hard to approximate within 96/95 - eps"
hardness_ref: "Chlebík & Chlebíková, Theoretical Computer Science 2008 (APPROX 2002 version: Springer LNCS)"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [steiner-tree, approximation, hardness-of-approximation, lp-rounding, integrality-gap]
---

## Statement

Given an undirected graph with positive edge costs and a subset of vertices
called terminals, find a minimum-cost tree connecting all terminals (using
non-terminal "Steiner vertices" freely). A spanning tree on the terminals'
metric closure gives an easy 2-approximation. The record to beat is
ln(4) + ε ≈ 1.3863, set by Byrka, Grandoni, Rothvoß and Sanità in 2010 and
unmoved since. Alternatively, push the hardness floor above 96/95 ≈ 1.0105.
Sixteen years of stasis on both ends makes this the most clearly frozen of
the famous approximation records.

## Current record

BGRS (STOC 2010, J. ACM 2013) achieve ln(4) + ε by iterative randomized
rounding of the Hypergraphic LP: repeatedly sample a full component
proportional to the LP solution, contract it, and re-solve. The Hypergraphic
LP's integrality gap is known to be at most ln 4 (Goemans–Olver–Rothvoß–
Zenklusen 2012), but the LP has exponentially many variables and is NP-hard to
solve exactly. A February 2026 paper by Paschmanns and Traub (arXiv:2602.19879)
states flatly that BGRS is still the best-known algorithm, cites a 2025
Traub–Zenklusen algorithm achieving the same ln(4) + ε factor differently, and
proves the polynomial-size Bidirected Cut Relaxation has integrality gap at
most 1.898 (below 2 was first shown by Byrka–Grandoni–Traub, FOCS 2024; the
best lower bound on that gap is 6/5). The hardness floor is 96/95 − ε
(Chlebík–Chlebíková), by reduction from Håstad's MAX-E3-LIN-2 inapproximability.

## Why it matters

Steiner tree is the root of the network-design tree: Steiner forest,
prize-collecting variants, and VPN-style problems all inherit techniques and
constants from it. Its hardness sits on the same PCP → MAX-E3-LIN-2 gadget
chain as TSP's 123/122 and ATSP's 75/74 — Chlebík–Chlebíková state their
bounds parametrically, so better gadgets or expanders improve the constant
automatically. And the LP side is a live wedge: if the Bidirected Cut
Relaxation's true gap is below ln 4, rounding it would beat BGRS with a
polynomial-size LP.

## Attack surface

Three concrete fronts. (1) The BCR gap is now bracketed in [6/5, 1.898];
Paschmanns–Traub also prove moat-growing algorithms cannot certify below 12/7,
so beating 12/7 needs genuinely new duals — a sharp, well-posed target.
(2) The ln 4 analysis of iterative rounding is tight for the Hypergraphic LP
gap only in the known instances; improved sampling correlations or a
loss-function re-optimization (the same move that cracked matrix
multiplication's stasis) could shave the constant. (3) Hardness: re-run the
Chlebík–Chlebíková parametric reduction with post-2008 expander and amplifier
constructions; any improvement there is immediately publishable. Special
cases (quasi-bipartite, where better ratios are known) are the natural
testbed.
