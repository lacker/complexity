---
id: median-selection-comparison-gap
title: "Deterministic median selection: beat 2.95n comparisons or raise the (2+ε)n lower bound — a numerical gap untouched since the 1990s"
genre: improve-algorithm
problems: ["Selection", "Median"]
hypotheses: []
record: "2.95n + o(n) comparisons, deterministic worst case"
record_ref: "Dor & Zwick, Selecting the Median, SIAM J. Comput. 28(5), 1999 (SODA 1995)"
hardness: "(2+ε)n comparisons required for some fixed ε > 0 (proved for ε ≈ 2^{-80})"
hardness_ref: "Dor & Zwick, Median Selection Requires (2+ε)n Comparisons, SIAM J. Discrete Math. 14(3), 2001 (FOCS 1996)"
status: open
confidence: high
verified: 2026-08-10
tags: [selection, median, comparison-model, exact-constants, classic]
---

## Statement

Determine the constant c such that finding the median of n elements requires c·n ± o(n) comparisons in the worst case, deterministically. The bracket has been [2 + 2^{-80}, 2.95] since the 1990s. Progress in either direction — a deterministic algorithm using (2.95 − δ)n comparisons, or a lower bound of (2 + δ)n for non-microscopic δ — beats a published record.

## Current record

Blum, Floyd, Pratt, Rivest and Tarjan (1973) started the race at 5.43n; Schönhage, Paterson and Pippenger (JCSS 1976) reached 3n; Dor and Zwick (SODA 1995 / SICOMP 1999) squeezed to 2.95n + o(n) by grafting "green factories" onto the SPP mass-production framework. On the other side, Bent and John (STOC 1985) proved 2n − o(n); Dor, Håstad, Ulfberg and Zwick pushed slightly past it, and Dor–Zwick (FOCS 1996 / SIDMA 2001) proved (2+ε)n for ε ≈ 2^{-80} — the message being that 2 is not the answer, not that 2.00000...01 is. Nothing has moved since: a 2025 survey of the small-n regime (Dörrer, Stober & Weiß, SEA 2025, LIPIcs vol. 338, "Exact Lower Bounds for the Number of Comparisons in Selection") confirms the asymptotic bracket while computing exact selection lower bounds for small n by computer search. Randomized selection is settled to within lower-order terms at 1.5n expected comparisons (Floyd–Rivest upper; Cunto–Munro lower), which makes the deterministic gap the anomaly.

## Why it matters

This is a node update in the comparison-model hub rather than a reduction edge: no hypothesis falls with it. But it is one of the oldest crisply numerical open intervals in algorithms — Knuth-volume-3 material — and both endpoints are held by the same pair of authors, which suggests the techniques on both sides were pushed exactly to their limits and then abandoned. The lower-bound side is a decision-tree adversary argument, the same genre of reasoning the fine-grained web leans on for sorting X+Y and k-SUM decision trees; a genuinely new adversary potential function here would likely export.

## Attack surface

(1) Upper bound: Dor–Zwick's 2.95 comes from optimizing factory parameters inside the SPP framework — an explicitly numerical optimization that was done by hand in 1995; re-running that design space with modern search (LP/SAT over factory configurations) is a concrete, bounded project. (2) Lower bound: Dor–Zwick's ε ≈ 2^{-80} arises from a weakness budget in an adversary argument; the paper itself says the constant is an artifact. Reformulating the adversary as an explicit potential and optimizing it computationally could raise ε by orders of magnitude — any visible ε is publishable. (3) The SEA 2025 line shows small-n selection is machine-checkable; exact values for small n could suggest the true constant and calibrate which endpoint to attack.
