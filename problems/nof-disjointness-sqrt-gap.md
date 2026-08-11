---
id: nof-disjointness-sqrt-gap
title: "3-party number-on-forehead set disjointness sits between Ω(√n) and the trivial O(n) — close the quadratic gap"
genre: missing-hardness
problems: ["Set Disjointness"]
hypotheses: []
record: "deterministic k-party NOF protocol with O(log² n + k² n / 2^k) bits; for k = 3 nothing beats the trivial Θ(n)"
record_ref: "Grolmusz, Information & Computation 112, 1994"
hardness: "Ω(√n / (2^k k)) for randomized (bounded-error) k-party NOF protocols — Θ̃(√n) for k = 3"
hardness_ref: "Sherstov, STOC 2013 / J. ACM 61(6), 2014 (\"Communication lower bounds using directional derivatives\"); simplified by Rao & Yehudayoff, CCC 2015"
endgame: "none known for the k = 3 gap itself: the classic route — superpolylog NOF lower bounds for polylog(n) players on an explicit function imply ACC0 lower bounds (Håstad–Goldmann 1991 composed with Beigel–Tarui 1994) — is closed to disjointness, which Grolmusz 1994 solves with polylog communication once k ≳ log n, so the gap feeds ACC0 only via technique transfer to other functions"
status: open
confidence: high
verified: 2026-08-10
tags: [communication-complexity, nof, set-disjointness, approximate-degree, acc0]
---

## Statement

In the k-party number-on-forehead (NOF) model, player i sees every set S_1, …, S_k ⊆ [n] except S_i, and the players must decide whether the intersection is empty. For every constant k ≥ 3, close the gap between the Ω(√n/(2^k k)) randomized lower bound and the O(k²n/2^k) upper bound. The cleanest instance is k = 3: is the randomized NOF complexity of 3-party disjointness Θ(√n), Θ(n), or in between?

## Current record

Grolmusz (Inf. & Comp. 1994) gave the surprising deterministic upper bound O(log²n + k²n/2^k), which is sublinear once k grows but is just the trivial Θ(n) for k = 3. Lower bounds took decades: Tesson and Beame–Pitassi–Segerlind–Wigderson got Ω(log n / k); Lee–Shraibman and Chattopadhyay–Ada (2008) reached n^{1/(k+1)} (up to factors exponential in k) via the generalized discrepancy method; Sherstov improved this to Ω(n/4^k)^{1/4} (STOC 2012; SICOMP 2016) and then, via directional derivatives, to Ω(√n/(2^k k)) for bounded-error randomized protocols (STOC 2013; J. ACM 2014), with a simplified proof by Rao–Yehudayoff (CCC 2015). That bound is essentially tight in its dependence on k — randomized NOF disjointness stays polynomial up to k ≈ ½·log n players — but for each fixed k the n-dependence gap is quadratic: √n vs n. Nothing better than Grolmusz is known even with randomness, and no lower bound beats √n even for k = 3. (Two-party disjointness is closed: Θ(n) randomized, Θ(√n) quantum.)

## Why it matters

NOF disjointness is the canonical hard function of multiparty communication, and its lower bounds propagate through standard reductions to streaming (multi-pass space bounds), proof complexity (Lovász–Schrijver and cutting-planes lower bounds), and circuit complexity: by Håstad–Goldmann/BNS, an explicit function requiring nontrivial NOF communication for k ≥ polylog(n) players would give lower bounds against ACC⁰ — one of the most wanted separations in complexity. The √n-vs-n question for k = 3 is the cleanest test of whether current analytic technology (approximate degree, pattern matrices) is hitting a real wall or an artifact: the √n exponent is exactly the approximate degree of OR, which is what the directional-derivatives argument bottlenecks on.

## Attack surface

Lower-bound side: all known arguments factor through analytic proxies (discrepancy, generalized discrepancy, directional derivatives) that cannot exceed the approximate degree of the outer OR, i.e., √n — beating √n for k = 3 needs a fundamentally different technique, and even a bound of n^{1/2+ε} would be a breakthrough with downstream ACC⁰ implications. A more modest first step: improve the 2^k dependence or the nondeterministic/Merlin–Arthur variants, where Sherstov's bounds are near-optimal against Grolmusz but the constant-k regime is open. Upper-bound side: Grolmusz's protocol exploits k ≥ 4 players' shared views; whether any o(n) randomized protocol exists for k = 3 is wide open, and a positive answer would collapse the conjectured hardness — worth attacking via the same corner/grid structures that drive Exactly-N protocols.
