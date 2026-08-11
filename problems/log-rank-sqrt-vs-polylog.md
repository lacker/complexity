---
id: log-rank-sqrt-vs-polylog
title: "Log-rank conjecture: beat Sudakov–Tomon's O(√rank) deterministic protocol, or push the separation past Ω̃(log² rank)"
genre: improve-algorithm
problems: ["Deterministic Communication Complexity", "Boolean Matrix Rank"]
hypotheses: ["Log-Rank Conjecture"]
record: "D(f) = O(sqrt(rank(f))) for every Boolean matrix; conjectured polylog(rank)"
record_ref: "Sudakov & Tomon, arXiv:2311.18524 (2023), improving Lovett's O(sqrt(r) log r), STOC 2014 / J. ACM 2016 (arXiv:1306.1877)"
hardness: "explicit f with D(f) = Ω̃((log rank(f))^2), so the conjecture's exponent must be ≥ 2; the randomized (log-approximate-rank) analogue is false outright"
hardness_ref: "Göös, Pitassi & Watson, FOCS 2015 / SICOMP 47(6), 2018 (doi:10.1137/16M1059369); Chattopadhyay, Mande & Sherif, STOC 2019 / J. ACM 2020 (ECCC TR18-176)"
endgame: "separation side is on the unconditional loop: deterministic communication lower bounds need no conjectures, so any ω̃((log rank)^2) example is itself a new unconditional result beating Göös-Pitassi-Watson (FOCS 2015); no published unconditional consequence from improving the O(√rank) protocol"
status: open
confidence: high
verified: 2026-08-10
tags: [communication-complexity, log-rank, rank, lifting, barriers]
---

## Statement

The log-rank conjecture (Lovász–Saks 1988) asserts that the deterministic communication complexity of any Boolean matrix A satisfies D(A) = polylog(rank(A)), where rank is over the reals. Either improve the upper bound — anything of the form rank^{1/2−ε}, or better yet 2^{O(√log r)}-type or quasipolylog — or strengthen the lower-bound side by exhibiting a matrix with D(A) = ω̃((log rank(A))^2).

## Current record

The upper bound record is D(A) = O(√rank(A)), by Sudakov and Tomon (arXiv:2311.18524, 2023), via a matrix-discrepancy argument; this removed the log factor from Lovett's D(A) = O(√r · log r) (STOC 2014; J. ACM 2016, arXiv:1306.1877), which had stood for a decade. Both are exponentially far from the conjecture. On the separation side, Göös, Pitassi and Watson (FOCS 2015; SICOMP 2018) used their Clique vs. Independent Set lower bounds and query-to-communication lifting to construct matrices with D(A) = Ω̃((log rank(A))^2), so the conjectured polynomial must have exponent at least 2 — still the best known separation. The natural randomized analogue is dead: Chattopadhyay, Mande and Sherif (STOC 2019; J. ACM 2020) exhibited the SINK function, whose approximate rank is polylogarithmically small but whose randomized communication is polynomial, refuting the log-approximate-rank conjecture (Anshu, Boddu and Touchette, FOCS 2019, arXiv:1811.10525, killed the quantum version too).

## Why it matters

This is the flagship open problem of communication complexity: a purely linear-algebraic quantity that would characterize deterministic communication up to polynomial factors. Communication lower bounds are the engine behind much of the rest of this web — they feed streaming space lower bounds, data-structure (cell-probe) bounds, and extension-complexity results — so understanding what does and does not control communication cost propagates widely. Even partial progress (rank^{1/3}, or a sub-√r bound for special matrix families such as XOR functions) would be a major structural advance; conversely, a super-quadratic separation would sharpen where the truth lies between 2 and ∞.

## Attack surface

The Nisan–Wigderson approach — find a large low-discrepancy or monochromatic-rectangle structure and recurse — is what both Lovett and Sudakov–Tomon optimize, and √r looks like that method's natural wall: √r is where the discrepancy-based rectangle guarantees bottom out. Routes worth probing: (1) XOR functions, where D is tied to Fourier structure and the conjecture becomes a statement about parity decision trees vs. Fourier sparsity — recent refuting-approaches work ("Refuting approaches to the log-rank conjecture for XOR functions", ICALP 2024, arXiv:2312.09400) maps which strategies are already dead; (2) the equivalent formulations of Lovett's survey (arXiv:1403.8106) and newer ones (arXiv:2510.02583), each a distinct target; (3) on the lower-bound side, lifting theorems with smaller gadgets — the GPW separation loses its extra logs to gadget size, and exponent-3 separations would follow from stronger query-side gaps.
