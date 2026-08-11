---
id: exactly-n-corners-gap
title: "Exactly-N and the corners problem: close the gap between the new (log N)^Ω(1) NOF lower bound and the √(log N) Behrend protocol"
genre: missing-hardness
problems: ["Exactly-N", "Corners Problem"]
hypotheses: []
record: "3-player deterministic NOF protocol of cost 2√2·√(log N)(1+o(1)) bits, via Behrend's 3-AP-free sets; leading constant improved by Linial–Shraibman — the first gain over Behrend since 1946"
record_ref: "Chandra, Furst & Lipton, STOC 1983; Linial & Shraibman, CCC 2021 (\"An Improved Protocol for the Exactly-N Problem\"; companion arXiv:2102.00421); k>3 players: ITCS 2024 (arXiv:2309.06554)"
hardness: "corner-free A ⊆ G×G has |A| ≤ |G|²·exp(−(log |G|)^Ω(1)), giving (log N)^Ω(1) — polynomial in the input length — deterministic and nondeterministic lower bounds for 3-player Exactly-N"
hardness_ref: "Jaber, Liu, Lovett, Ostuni & Sawhney, FOCS 2025 best paper (arXiv:2504.07006)"
status: open
confidence: high
verified: 2026-08-10
tags: [communication-complexity, nof, corners, exactly-n, additive-combinatorics]
---

## Statement

In the 3-player number-on-forehead (NOF) model, each player has a number in [N] on their forehead and they must decide whether the three numbers sum to N. The deterministic communication complexity of Exactly-N is determined, up to constant factors, by the largest corner-free subset of [N]²: it equals Θ(log(N²/r∠(N))), where r∠(N) is the maximum size of a set with no corner {(x,y), (x+d,y), (x,y+d)}, d≠0. Close the gap: the protocol costs O(√(log N)) bits while the best lower bound is (log N)^Ω(1) with a small unspecified exponent. Either push the lower bound toward √(log N) — equivalently, prove corner-free sets have size at most N²/exp((log N)^{1/2−o(1)}) — or beat the Behrend-based protocol.

## Current record

Chandra, Furst and Lipton (STOC 1983) introduced the model and gave a protocol of cost 2√2·√(log N)(1+o(1)) from Behrend's 3-AP-free sets; Linial and Shraibman (CCC 2021, arXiv:2102.00421) improved the leading constant — the first improvement to the top-order term since 1946 — and a follow-up (ITCS 2024, arXiv:2309.06554) did the same for more than 3 players. For decades the lower bound was barely super-constant (of order log log log N, inherited from Shkredov-type corners bounds). The breakthrough: Jaber, Liu, Lovett, Ostuni and Sawhney (FOCS 2025 best paper, arXiv:2504.07006) proved quasipolynomial bounds for the corners theorem — corner-free A ⊆ G×G has |A| ≤ |G|²·exp(−(log|G|)^Ω(1)) — yielding lower bounds polynomial in the input length n = log N for deterministic and even nondeterministic 3-player Exactly-N, plus the first reasonable bounds for 4-player Exactly-N. This ported the Kelley–Meka 3-AP machinery (FOCS 2023) to two dimensions, following Kelley, Lovett and Meka's explicit randomized-vs-deterministic NOF separations (STOC 2024, arXiv:2308.12451).

## Why it matters

Exactly-N has O(1) randomized NOF complexity (it reduces to Equality), so this line now gives explicit polynomial randomized-vs-deterministic NOF separations — previously unthinkable. NOF lower bounds are the gateway to ACC⁰ circuit lower bounds (via Håstad–Goldmann, bounds for polylog-many players would break that barrier) and feed streaming and proof-complexity bounds, tying this entry to the communication cluster of this web. The corners side is a central problem of additive combinatorics: matching Behrend would settle the true density of corner-free sets.

## Attack surface

The upper and lower bounds are now both moving for the first time in decades, and the exponent in (log N)^Ω(1) is explicitly not optimized in arXiv:2504.07006 — tightening the sifting/spread arguments there is the obvious first bite. Kelley–Meka gives exp(−(log N)^{1/11}) for 3-APs and the 1D-to-2D transfer loses more; any structural shortcut (e.g., via the graph-norm or grid-norm machinery in the paper) that brings the corners exponent to a concrete constant like 1/4 would be publishable. Separately: extend to corners in [N]³ / 5-player Exactly-N, where nothing beyond the trivial is known, or improve the protocol's constant again via better corner-free constructions (Green's and Linial–Shraibman's constructions show slack exists).
