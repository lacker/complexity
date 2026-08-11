---
id: maxcut-ugc-free-hardness
title: "Max-Cut without the Unique Games crutch: NP-hardness stops at 16/17 ≈ 0.941, the algorithm at 0.8786 — close the gap"
genre: missing-hardness
problems: ["Max-Cut", "Unique Games"]
hypotheses: [UGC]
record: "0.87856-approximation (alpha_GW), optimal under the Unique Games Conjecture"
record_ref: "Goemans & Williamson, J. ACM 1995; UGC-optimality: Khot, Kindler, Mossel & O'Donnell, SICOMP 2007 (ECCC TR05-101)"
hardness: "NP-hard to approximate within 17/16 - eps (i.e., ratio 16/17 + eps ≈ 0.941); alpha_GW + eps under UGC"
hardness_ref: "Håstad, J. ACM 2001 (with Trevisan–Sorkin–Sudan–Williamson gadgets); Khot, Kindler, Mossel & O'Donnell, SICOMP 2007"
status: open
confidence: high
verified: 2026-08-10
tags: [max-cut, unique-games, sdp, pcp, hardness-of-approximation]
---

## Statement

Partition a graph's vertices into two sides to maximize edges crossing.
Goemans–Williamson's SDP rounding guarantees a cut of value at least
α_GW ≈ 0.878567 times optimal. Khot–Kindler–Mossel–O'Donnell proved that under
the Unique Games Conjecture, α_GW + ε is NP-hard — the algorithm is exactly
optimal. But unconditionally, NP-hardness stops at ratio 16/17 + ε ≈ 0.941
(Håstad's PCP machinery with the Trevisan–Sorkin–Sudan–Williamson gadget).
The problem: prove NP-hardness (no UGC) for any ratio strictly below 16/17 —
each step toward 0.8786 counts — or refute the conjectured optimality by
beating α_GW with a polynomial-time algorithm, which would falsify UGC itself.

## Current record

Both endpoints have been frozen for two decades. The algorithmic record is
α_GW ≈ 0.878567 (Goemans–Williamson, J. ACM 1995): embed vertices on a sphere
via SDP, cut with a random hyperplane. The unconditional hardness record is
17/16 − ε in the cost convention — approximating better than 16/17 ≈ 0.9412
is NP-hard — from Håstad's Fourier-analytic PCPs for MAX-E3-LIN-2 composed
with TSSW gadgets (table of constants in Håstad, J. ACM 2001). KKMO (SICOMP
2007) closed the gap conditionally: a Unique Games reduction using the
Majority Is Stablest theorem shows α_GW + ε is hard, making the peculiar
constant α_GW provably intrinsic if UGC holds. Recent activity probes the
edges: better-than-α_GW guarantees hold under structural conditions involving
triangle density (George–Louis–Paul, APPROX 2025), while Ghoshal, Huang, Lee,
Makarychev and Makarychev (arXiv:2604.10318, 2026) show the α_GW barrier
persists even on 3-colorable graphs, but is beatable when the graph has a
large independent set.

## Why it matters

Max-Cut is the poster child of the UGC web: it is itself a Unique Game, KKMO's
parameters are exactly the target an algorithm must hit to refute the
conjecture, and the Majority Is Stablest machinery built for it powers UGC
hardness across CSPs (and Raghavendra's theorem generalizes the pattern to
every CSP). Any UGC-free hardness improvement below 16/17 would be the first
movement on this front since 1997 and would test whether 2-to-2-style Grassmann
techniques — which recently made vertex cover's √2-hardness unconditional —
can reach 2-variable CSPs.

## Attack surface

Hardness: the 2-to-2 Games Theorem (Khot–Minzer–Safra) delivers unconditional
hardness with imperfect completeness; the known obstruction is that its
completeness loss is fatal for Max-Cut's cut-vs-uncut gadget accounting —
quantifying exactly what completeness/soundness trade-off would beat 16/17 is
a well-posed lemma-hunting exercise. Alternatively, search for better
two-variable gadgets from MAX-E3-LIN-2: TSSW's gadget was computer-optimized
in 1996 with LP tooling that modern solvers dwarf. Algorithms: beating α_GW
in identified regimes (dense triangles, large independent sets) is live
territory per the 2025–26 papers; extending any such regime to all graphs
refutes UGC, so even partial regime-mapping has outsized value.
