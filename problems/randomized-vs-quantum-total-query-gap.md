---
id: randomized-vs-quantum-total-query-gap
title: "Randomized vs quantum query complexity of total functions: separation R ≥ Q^{3−o(1)}, upper bound R ≤ D = O(Q^4) — is the truth cubic?"
genre: tighten-overhead
problems: ["k-Forrelation", "Total Boolean Function Query Complexity"]
hypotheses: []
record: "D(f) = O(Q(f)^4) for every total Boolean function f (hence R(f) = O(Q(f)^4)); for partial functions the story is settled: ⌈k/2⌉ quantum queries vs Ω̃(N^{1−1/k}) randomized, optimal by the Aaronson–Ambainis simulation"
record_ref: "Aaronson, Ben-David, Kothari, Rao & Tal, STOC 2021 (arXiv:2010.12629); Bansal & Sinha, STOC 2021 (arXiv:2008.07003); Sherstov, Storozhenko & Wu, STOC 2021 (arXiv:2008.10223)"
hardness: "explicit total f with R(f) ≥ Q(f)^{3−o(1)}, via the k-Forrelation lower bound plugged into cheat sheets; D vs Q is settled quartic by pointer functions"
hardness_ref: "Bansal & Sinha, STOC 2021 (arXiv:2008.07003, Corollary 1.5), using Aaronson, Ben-David & Kothari, STOC 2016 (arXiv:1511.01937); Ambainis, Balodis, Belovs, Lee, Santha & Smotrovs, J. ACM 2017 (arXiv:1506.04719)"
status: open
confidence: high
verified: 2026-08-10
tags: [query-complexity, quantum, forrelation, cheat-sheets, polynomial-method]
---

## Statement

For total Boolean functions, determine the largest possible gap between bounded-error randomized query complexity R(f) and quantum query complexity Q(f). The known window is [3, 4]: an explicit total f achieves R(f) ≥ Q(f)^{3−o(1)}, while R(f) ≤ D(f) = O(Q(f)^4) holds for all total f. Either construct a total function with R(f) = Ω(Q(f)^{3+ε}), or prove R(f) = O(Q(f)^{4−ε}) — the conjectured truth is R(f) = O(Q(f)^3).

## Current record

For partial functions the maximal separation was settled in 2021: Bansal–Sinha (STOC 2021, arXiv:2008.07003) proved k-Forrelation — computable with ⌈k/2⌉ quantum queries — requires Ω̃(N^{1−1/k}) randomized queries, and Sherstov–Storozhenko–Wu (STOC 2021, arXiv:2008.10223) independently gave k quantum vs Ω̃(N^{1−1/2k}) randomized; both are optimal by Aaronson–Ambainis's simulation of t-query quantum algorithms with O(N^{1−1/2t}) randomized queries (STOC 2015, arXiv:1411.5729). Feeding this into the cheat-sheet framework of Aaronson–Ben-David–Kothari (STOC 2016, arXiv:1511.01937) upgrades their power-2.5 separation to an explicit total f with R(f) ≥ Q(f)^{3−o(1)} (Bansal–Sinha, Corollary 1.5). On the upper side, Aaronson, Ben-David, Kothari, Rao and Tal (STOC 2021, arXiv:2010.12629) used Huang's sensitivity theorem to prove D(f) = O(Q(f)^4), improving the 6th-power bound of Beals et al.; this is tight for deterministic algorithms by the pointer functions of Ambainis et al. (J. ACM 2017, arXiv:1506.04719), so the only remaining question in the R-vs-Q landscape is whether the randomized exponent is 3, 4, or in between. ABKRT explicitly conjecture R(f) = O(Q(f)^3).

## Why it matters

This is the sharpest remaining gap in the classical-vs-quantum query landscape, the model where quantum advantage is actually provable. Query separations are the raw material for communication and streaming separations via lifting — the same k-Forrelation bounds already give O(log M) vs Ω(M^{1−ε}) quantum-classical communication separations — so pinning the total-function exponent propagates into the communication cluster of this web. A proof of R = O(Q^3) would likely need new relations among R, Q, degree and sensitivity, of independent structural value.

## Attack surface

Upper-bound side: ABKRT's bound passes through deterministic complexity and polynomial degree (via Huang's sensitivity theorem), and D = O(Q^4) is already tight — so improving R specifically requires a genuinely randomized simulation that exploits sampling, which no current technique does; even R = O(Q^{4−ε}) would be new. Lower-bound side: cheat sheets inherently cost an exponent (partial N^{1−o(1)}-vs-polylog becomes total power 3); either optimize the cheat-sheet transformation itself, or find a different totalization of k-Forrelation that wastes less. A useful sanity target: ABKRT's companion result deg(f) = O(adeg(f)^2) is tight, so any improvement must exploit quantumness beyond the polynomial method — arguments that only use approximate degree cannot push the upper bound below Q^4.
