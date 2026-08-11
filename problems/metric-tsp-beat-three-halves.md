---
id: metric-tsp-beat-three-halves
title: "Metric TSP: widen the Karlin–Klein–Oveis Gharan crack — beat 3/2 − 10^{-36}, against a 123/122 hardness floor"
genre: improve-algorithm
problems: ["Metric TSP"]
hypotheses: []
record: "3/2 - eps approximation for some eps > 10^{-36}, randomized and deterministic"
record_ref: "Karlin, Klein & Oveis Gharan, STOC 2021 (arXiv:2007.01409); deterministic version IPCO 2023 (arXiv:2212.06296)"
hardness: "NP-hard to approximate within 123/122 - eps"
hardness_ref: "Karpinski, Lampis & Schmied, JCSS 2015 (arXiv:1303.6437)"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [tsp, approximation, hardness-of-approximation, max-entropy, subtour-lp]
---

## Statement

Given n points with symmetric distances obeying the triangle inequality, find a
tour visiting all of them, of cost at most c times the optimum. Christofides
and Serdyukov independently gave c = 3/2 in 1976, and for 45 years nobody could
beat it. Karlin, Klein and Oveis Gharan finally proved c = 3/2 − ε for some
ε > 10^{-36}. The challenge: publish any better constant — even 1.49 would be
a major result — or, on the hardness side, push the inapproximability floor
above 123/122 ≈ 1.0082. The gap between 1.0082 and 1.4999... is one of the
most embarrassing in approximation theory.

## Current record

The record is 3/2 − ε for ε > 10^{-36} (Karlin–Klein–Oveis Gharan, STOC 2021):
solve the subtour LP, sample a random spanning tree from the max-entropy
distribution over its support, then add a minimum T-join to fix parities — 
Christofides with a random tree instead of a minimum one. The same authors
derandomized it via conditional expectations (IPCO 2023, arXiv:2212.06296).
The bottleneck case is half-integral LP solutions, conjectured to be the worst
case for the subtour LP; there the ratio has been driven down separately, most
recently to 1.49776 by Klein and Taziki (arXiv:2507.17999, 2025). The famous
4/3 conjecture says the subtour LP's integrality gap is exactly 4/3 (examples
achieving 4/3 are known). Meanwhile the best hardness, via bounded-occurrence
CSP reductions and a wheel-amplifier construction, is 123/122 − ε (Karpinski,
Lampis, Schmied).

## Why it matters

TSP is the flagship of approximation algorithms; its LP relaxation techniques
(tree sampling, T-joins, strongly Rayleigh distributions) export to network
design broadly. On the hardness side, the 123/122 floor comes from the PCP
theorem through MAX-E3-LIN gadget chains — the same reduction web that anchors
Steiner tree (96/95) and ATSP (75/74) — so a better amplifier or gadget here
likely improves several entries at once. Closing the gap in either direction
would recalibrate what PCP-based reductions can deliver for problems with
tiny-constant hardness but large-constant algorithms.

## Attack surface

Algorithmic side: the KKO analysis is wildly lossy — ε > 10^{-36} is a
bookkeeping artifact, not a structural limit — and the authors themselves
expect the true guarantee of max entropy to be far better. Tightening the
cases analysis (as Klein–Taziki did with dual-based charging in the
half-integral case) is concrete, incremental territory. Proving the 4/3
conjecture even for half-integral instances would be a landmark. Hardness
side: the Karpinski–Lampis–Schmied bound is explicitly parametric — better
wheel amplifiers or bounded-occurrence expanders mechanically improve the
constant. First cheap experiment: rerun the dual-charging analysis on
non-half-integral structured LP faces.
