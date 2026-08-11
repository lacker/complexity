---
id: atsp-constant-factor-record
title: "Asymmetric TSP: push the ratio below Vygen's 2026 record of ~14.7 — the hardness floor is only 75/74"
genre: improve-algorithm
problems: ["Asymmetric TSP"]
hypotheses: []
record: "approximation ratio below 15 (overall guarantee < 14.7)"
record_ref: "Vygen, arXiv:2603.14334 (2026); previously 17+eps, Traub & Vygen, CUP book 2025, and 22+eps, Traub & Vygen, STOC 2020 (arXiv:1912.00670)"
hardness: "NP-hard to approximate within 75/74 - eps"
hardness_ref: "Karpinski, Lampis & Schmied, JCSS 2015 (arXiv:1303.6437)"
status: open
confidence: high
verified: 2026-08-10
tags: [tsp, atsp, approximation, hardness-of-approximation, lp-rounding]
---

## Statement

Asymmetric TSP: the distance from u to v need not equal the distance from v to
u (think one-way streets), but the directed triangle inequality holds. Find a
tour of cost at most c times optimal. Unlike symmetric TSP, no
Christofides-style 3/2 was ever available; whether any constant c was
achievable stayed open until 2018. The challenge: beat the current record of
roughly 14.7, or push the hardness floor above 75/74 ≈ 1.0135. Nobody
believes 14.7 is the truth — the conjectured answer, tied to the integrality
gap of the LP relaxation, is a small constant, plausibly close to 2.

## Current record

Svensson, Tarnawski and Végh gave the first constant factor (STOC 2018, J. ACM
2020), initially 5500, refined to 506, via a reduction to "vertebrate pairs"
and Svensson's earlier local-connectivity framework. Traub and Vygen
simplified and sharpened the pipeline to 22 + ε (STOC 2020, arXiv:1912.00670),
then to 17 + ε in their 2025 Cambridge University Press book "Approximation
Algorithms for Traveling Salesman Problems." The current record is Vygen's
March 2026 improvement (arXiv:2603.14334): ratio below 15, with the paper's
own accounting giving an overall guarantee under 14.7, plus better constants
for unweighted digraphs and improved integrality-gap upper bounds for the
natural LP. The known lower bound on that LP's integrality gap is 2. On the
hardness side, Karpinski–Lampis–Schmied prove 75/74 − ε NP-hardness via
bounded-occurrence CSP amplification.

## Why it matters

ATSP is the canonical test of whether LP-based methods can tame directed
network design; its machinery (laminar witness structures, subtour covers)
feeds directed connectivity and vehicle-routing problems. The hardness floor
comes from the same PCP-to-CSP-to-TSP gadget chain as symmetric TSP's 123/122
and Steiner tree's 96/95, so amplifier improvements propagate across all
three. And the glaring 1.0135-vs-14.7 gap is a standing accusation that either
the reduction web or the LP-rounding toolkit is far from its limits — closing
it from either side would say which.

## Attack surface

The ratio has fallen 506 → 22 → 17 → ~14.7 by successive surgery on one
pipeline: reduce to laminarly-weighted instances, then vertebrate pairs, then
solve subtour cover. Each stage carries quantifiable slack, and recent
progress came from reworking single stages (Vygen's 2026 paper reworks the
parametrization; a cited companion line improves the subtour-cover trade-off
from α > 8 toward α > 3 + 2√2). Auditing the pipeline stage by stage for
loss constants is concrete, decomposable work. The integrality gap of the
standard LP is known to be at least 2 and now at most ~14.7 — any
construction narrowing that bracket moves the field. Hardness side: the KLS
construction is parametric in expander quality; better wheel amplifiers lift
75/74 mechanically.
