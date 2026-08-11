---
id: weighted-edit-distance-intermediate-regime
title: "Close the n^{1/3} < k < n^{1/2} gap for weighted edit distance: the Õ(n + sqrt(n k^3)) record is APSP-optimal only above sqrt(n)"
genre: missing-hardness
problems: ["Weighted Edit Distance", "All-Pairs Shortest Paths", "Edit Distance"]
hypotheses: [APSP]
record: "Õ(n + sqrt(n k^3)) time for arbitrary weight functions and distance threshold k; Õ(n + W k^2) for integer weights bounded by W"
record_ref: "Cassis, Kociumaka & Wellnitz, FOCS 2023 (arXiv:2305.06659); Gorbachev & Kociumaka, STOC 2025 (arXiv:2404.06401)"
hardness: "Omega(sqrt(n k^3))^{1-o(1)} under the APSP hypothesis for sqrt(n) <= k <= n; below k = sqrt(n) only the trivial Omega(n) reading bound is known"
hardness_ref: "Cassis, Kociumaka & Wellnitz, FOCS 2023 (arXiv:2305.06659)"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [strings, edit-distance, weighted, apsp, fine-grained, parameterized]
---

## Statement

In weighted edit distance, each insertion, deletion, and substitution has an
arbitrary cost depending on the characters involved (normalized so every
operation costs at least 1), and the goal is the cheapest transformation of
one length-n string into the other, parameterized by a threshold k on the
distance. The record algorithm runs in Õ(n + sqrt(n k^3)), which is Õ(n) for
k ≤ n^{1/3} and provably optimal (under APSP) for k ≥ sqrt(n). Close the
intermediate regime n^{1/3} ≤ k ≤ sqrt(n): either extend the APSP-hardness
reduction below sqrt(n), or beat Õ(sqrt(n k^3)) there — ideally down to Õ(n).

## Current record

Unweighted edit distance parameterized by distance k has been settled at
O(n + k^2) since Landau–Vishkin/Myers in the 1980s, and that is
SETH-optimal. For general weights, nothing better than O(nk) — or O(n + k^5)
via Das, Gilbert, Hajiaghayi, Kociumaka, and Saha (STOC 2023,
arXiv:2302.04229), the first n + poly(k) bound — was known until Cassis,
Kociumaka, and Wellnitz (FOCS 2023) gave Õ(n + sqrt(n k^3)) and, remarkably,
a matching conditional lower bound: under the APSP hypothesis, no algorithm
beats sqrt(n k^3) by a polynomial factor when sqrt(n) ≤ k ≤ n. This was the
first separation between weighted and unweighted edit distance — weights
genuinely cost more than k^2 when k is large. Gorbachev and Kociumaka (STOC
2025) then showed the separation needs large weights: integer costs bounded
by W admit Õ(n + W k^2), matching the unweighted picture for constant W. The
dynamic version now also has tight tradeoffs (Boneh, Gorbachev & Kociumaka,
ESA 2025, arXiv:2507.02548). What remains is a naked gap: for
n^{1/3} ≤ k ≤ sqrt(n) the upper bound interpolates between Õ(n) and
Õ(n^{1.25}), while the only lower bound is the trivial Ω(n).

## Why it matters

This is a rare frontier where the same paper produced a new algorithm and a
matching APSP reduction, and the remaining unresolved window is explicitly
quantified. Whatever closes it wins either way: an Õ(n)-time algorithm up to
k = sqrt(n) would show weights are free below the APSP-critical threshold,
while extending the reduction downward would tighten the web between APSP and
string alignment — a hardness edge that Gorbachev–Kociumaka proves must
exploit super-constant weights, an unusual structural constraint on any
gadget.

## Attack surface

The CKW lower bound encodes APSP-style min-plus products into weight
functions; its gadgets need alignment freedom that shrinks as k drops below
sqrt(n) — understanding exactly why is the first step to either fixing the
reduction or exploiting the obstruction algorithmically. Concrete bites:
(1) settle k = n^{0.4}: beat Õ(n^{1.1}) or prove APSP-hardness; (2) find the
weighted analogue of Landau–Vishkin diagonal propagation for weights with
few distinct values (interpolating the W k^2 and sqrt(n k^3) bounds);
(3) try Monge/SMAWK structure on the k-bounded band, which is exactly the
machinery behind the recent core-sparse Monge multiplication improvements
this line already uses.
