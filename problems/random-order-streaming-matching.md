---
id: random-order-streaming-matching
title: "Random-order streaming matching: close the gap between (2/3 + 10^{-14})-approximation and the (1−Θ(1/log n)) hardness"
genre: improve-algorithm
problems: ["Maximum Matching"]
hypotheses: []
record: "(2/3 + ε₀)-approximate maximum matching, ε₀ ~ 10^{-14}, in one pass over a random-order edge stream with O(n log n) space"
record_ref: "Assadi & Behnezhad, ICALP 2021 (arXiv:2102.07011)"
hardness: "(1−ε₁)-approximation with ε₁ = Θ(1/log n) requires n^{1+Ω(1/log log n)} space in random-order streams; in adversarial order, no single-pass semi-streaming algorithm beats 1/2 — greedy is optimal"
hardness_ref: "Assadi & Behnezhad, ICALP 2021 (arXiv:2102.07011, Theorem 3); Assadi, Jiang & Xiang, STOC 2026 (arXiv:2607.14644) and arXiv:2607.14656 (July 2026)"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [streaming, matching, semi-streaming, random-order, one-pass]
---

## Statement

Determine the best approximation ratio achievable for maximum matching by a single-pass semi-streaming algorithm (O(n polylog n) space) when the edges arrive in uniformly random order. Concretely: beat the (2/3 + ε₀)-approximation of Assadi–Behnezhad with a materially larger constant — 0.7 would be a clear result — or prove a hardness bound at some constant strictly below 1.

## Current record

For adversarial edge order this question died in 2026: Assadi, Jiang and Xiang introduced a "blueprint" framework ruling out 0.558-approximation (STOC 2026, arXiv:2607.14644), and their follow-up (arXiv:2607.14656, July 2026, still a preprint) pushed it to exactly 1/2 — greedy maximal matching is optimal, ending a two-decade line that ran through Kapralov's 1−1/e and 1/(1+ln 2) ≈ 0.59 bounds (SODA 2013; SODA 2021, arXiv:2103.11669). Random order is now the live frontier. Konrad–Magniez–Mathieu (2012) first beat 1/2 there; Bernstein (ICALP 2020, arXiv:2005.00417) reached 2/3 with O(n log n) space via edge-degree constrained subgraphs; Assadi and Behnezhad (ICALP 2021, arXiv:2102.07011) broke the 2/3 barrier with a (2/3 + ε₀)-approximation, ε₀ ~ 10^{-14}, by finding a constant fraction of "discoverable" length-5 augmenting paths. The same paper's Theorem 3 gives the only hardness known: (1−ε₁)-approximation with ε₁ = Θ(1/log n) needs n^{1+Ω(1/log log n)} space. So the truth sits anywhere in [2/3 + 10^{-14}, 1): no constant-factor hardness below 1 is known.

## Why it matters

Matching is the benchmark problem of graph streaming, and this is its main surviving open question in one pass. The gap is qualitative: is random arrival strong enough to allow (1−ε)-approximation for every ε (as it is for matching-size estimation), or is there a hard constant ceiling like the adversarial 1/2? Both sides would export: the upper-bound machinery (EDCS, augmenting-path sampling) feeds sublinear-time and dynamic matching algorithms, while the lower-bound side runs through one-way communication complexity of matching — the same Ruzsa–Szemerédi-graph technology that powers adversarial streaming bounds and links this entry to the communication-complexity cluster of this web.

## Attack surface

On the algorithmic side, ε₀ ~ 10^{-14} is an artifact of unoptimized augmenting-path accounting — pushing the same discoverable-paths idea to longer augmenting paths, or combining it with Bernstein's EDCS sparsifiers, plausibly yields visible constants; anything ≥ 0.7 requires handling length-≥7 augmentations. On the hardness side, the blueprint framework of arXiv:2607.14644 explicitly abstracts the extremal-graph-theory core into finite objects one can search for — a natural project is to adapt blueprints to random arrival, where the known constructions collapse because the hard gadget's edges must arrive in a correlated order. Any constant-below-1 random-order lower bound would be the first of its kind.

## Verification notes

Verified 2026-08-10. The exact-1/2 adversarial-order impossibility (arXiv:2607.14656, "Greedy is Optimal", July 2026) is an arXiv preprint as of this sweep; the peer-reviewed state of the art is the 0.558 bound of the STOC 2026 blueprint paper (arXiv:2607.14644). Both random-order records in the frontmatter are from the peer-reviewed ICALP 2021 paper.
