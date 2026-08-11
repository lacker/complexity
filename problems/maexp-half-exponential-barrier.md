---
id: maexp-half-exponential-barrier
title: "Beat half-exponential circuit lower bounds for MAEXP: stuck since 1999 while Σ2E hit near-maximum 2^n/n and AMEXP got there with sub-exponential advice — the advice-free Merlin–Arthur classes are the last holdouts"
genre: missing-hardness
problems: ["MAEXP Circuit Lower Bounds", "Karp-Lipton Collapses"]
hypotheses: []
record: "MAEXP ⊄ P/poly, with the quantitative bound stuck at half-exponential size (f such that f(f(n)) ≈ 2^n); the barrier has now been broken for neighboring classes — Σ2E ⊄ i.o.-SIZE[2^n/n] almost everywhere, S2E/1 and ZPE^NP/1 near-maximum, and AMEXP/2^{n^ε} ⊄ SIZE[2^n/n] infinitely often — but advice-free MAEXP and AMEXP remain capped at half-exponential"
record_ref: "Buhrman, Fortnow & Thierauf, CCC 1998; Miltersen, Vinodchandran & Watanabe, COCOON 1999; Chen, Hirahara & Ren and Li, STOC 2024 (arXiv:2309.12912, arXiv:2310.17762); Chen, Li & Liang, STOC 2025 (ECCC TR24-182)"
hardness: "no conditional statement applies; the obstruction is structural — Miltersen–Vinodchandran–Watanabe showed Karp–Lipton-style win-win arguments self-cap at half-exponential fixed points, since the size bound must survive being fed through its own collapse, and every pre-2023 MAEXP bound is such an argument"
hardness_ref: "Miltersen, Vinodchandran & Watanabe, COCOON 1999 (\"Super-polynomial versus half-exponential circuit size in the exponential hierarchy\")"
endgame: "the payoff is the unconditional lower bound itself: a 2^{n^ε}-size bound for MAEXP would be the first super-half-exponential lower bound for a Merlin–Arthur class, and the published route is concrete — the iterative win-win paradigm plus the Shaltiel–Umans / van Melkebeek–Sdroievski uniform hardness-vs-randomness connection already yields 2^n/n for AMEXP with 2^{n^ε} advice (Chen–Li–Liang, STOC 2025); removing the advice closes the loop"
status: open
confidence: high
verified: 2026-08-10
tags: [circuit-complexity, merlin-arthur, half-exponential, karp-lipton, lower-bounds]
---

## Statement

Prove that MAEXP (exponential-time Merlin–Arthur) contains a language
requiring circuits of size 2^{n^ε} for some ε > 0 — or any bound beyond
half-exponential — with no advice. Same question for advice-free AMEXP. A
function f is half-exponential if f(f(poly(n))) ≤ 2^{poly(n)}-ish
composition reaches exponential; the known MAEXP size bound is capped at
exactly this growth rate, and beating it for an advice-free Merlin–Arthur
class is the open frontier left by the 2023–2025 near-maximum results.

## Current record

Buhrman, Fortnow and Thierauf (CCC 1998) proved MAEXP ⊄ P/poly — the
classic non-relativizing separation. Miltersen, Vinodchandran and Watanabe
(COCOON 1999) pushed the quantitative bound to half-exponential and, more
importantly, explained the plateau: the proof is a Karp–Lipton win-win (if
the function is easy, the class collapses, contradiction by hierarchy), and
such self-referential arguments cannot certify a size bound growing faster
than a fixed point of composition. That diagnosis held for a quarter
century until the range-avoidance program broke it for adjacent classes:
Chen–Hirahara–Ren and Li (STOC 2024) proved S2E/1, ZPE^NP/1, and
advice-free Σ2E require near-maximum size 2^n/n, and Chen–Li–Liang (STOC
2025) reached exponential-time Arthur–Merlin: AMEXP with 2^{n^ε} bits of
advice is not in SIZE[2^n/n], infinitely often. For MAEXP and AMEXP with no
advice, nothing beyond half-exponential is known.

## Why it matters

This is the sharpest measure of whether the new iterative win-win machinery
is a general lower-bound technology or a trick specific to symmetric
alternation. MA is the frontier class: MA ⊆ S2P, so the S2E result sits
just above it, and MAEXP lower bounds are the traditional stepping stone
toward NEXP ⊄ P/poly (which would follow from scaled-down versions). The
half-exponential barrier is also the cleanest formalized case of a proof
technique with a provable quantitative ceiling — beating it for MAEXP means
exhibiting a fundamentally non-Karp–Lipton argument for a probabilistic
proof class.

## Attack surface

Chen–Li–Liang's proof is the trailhead: it combines the iterative win-win
paradigm of Chen–Lu–Oliveira–Ren–Santhanam (FOCS 2023) with the uniform
hardness-vs-randomness connection for Arthur–Merlin protocols
(Shaltiel–Umans; van Melkebeek–Sdroievski, CCC 2023). The 2^{n^ε} advice
pays for selecting, at each recursion level, a good input length and
certificate — exactly the object a derandomized or self-verifying selector
would eliminate. Sub-problems that would count as progress: reduce the
advice to poly(n); prove any 2^{n^ε} bound for AMEXP with poly advice;
or transfer from AM to MA by absorbing Arthur's first message, which works
whenever the protocol's soundness can be made constructive. A different
route entirely: improve the easy witness lemma for MA (Murray–Williams
machinery), which caps at half-exponential for the same fixed-point reason
and would move MAEXP directly.
