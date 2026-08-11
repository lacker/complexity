---
id: depth3-circuits-past-sqrt-n
title: "Depth-3 circuits: beat 2^{1.282√n} — no explicit function has a 2^{ω(√n)} bound, and Majority via local enumeration is the published route"
genre: missing-hardness
problems: ["Depth-3 Circuit Lower Bounds", "Majority", "k-SAT"]
hypotheses: ["Super Strong ETH"]
record: "2^{1.282√n} gates for an explicit codeword-checking function — the best depth-3 bound for any explicit function; parity is tight at Θ(n^{1/4}·2^{√n}); for Σ₃ circuits with bottom fan-in 3, Majority requires 1.251^n"
record_ref: "Paturi, Pudlák, Saks & Zane, JACM 2005; parity: Paturi, Pudlák & Zane, FOCS 1997; Majority against Σ³₃: Gurumukhani, Paturi, Pudlák, Saks & Talebanfard, CCC 2024 (arXiv:2403.09134)"
hardness: "no conditional bound; the satisfiability-coding-lemma technique behind every 2^{Ω(√n)} record is the same combinatorial engine as the PPSZ k-SAT algorithm, so pushing the bound and beating PPSZ savings are two faces of one problem, and the top-down method (Håstad–Jukna–Pudlák) also stalls at 2^{O(√n)}"
hardness_ref: "Gurumukhani, Paturi, Pudlák, Saks & Talebanfard, CCC 2024 (arXiv:2403.09134); Håstad, Jukna & Pudlák, computational complexity 1995"
endgame: "already unconditional — any constant above 1.282 is a new record; optimal bounds for the local-enumeration problem Enum(k,t) would give a 2^{ω(√n)} unrestricted depth-3 lower bound for Majority, simultaneously improving k-SAT savings to Θ(log k/k) (Gurumukhani et al., CCC 2024, arXiv:2403.09134 — the same two-for-one cited in super-strong-eth-ksat-savings); further out, a 2^{ω(n/log log n)} Σ₃ bound for an explicit function implies super-linear lower bounds for log-depth circuits via Valiant's depth reduction (Valiant, MFCS 1977)"
status: open
confidence: high
verified: 2026-08-10
tags: [circuit-complexity, depth-3, sat, ppsz, lower-bounds]
---

## Statement

Prove that an explicit Boolean function requires depth-3 circuits (OR of
ANDs of ORs or the dual, unbounded fan-in) of size 2^{c√n} for c > 1.282 —
or break the barrier outright with a 2^{ω(√n)} bound. The clean published
target: show Majority requires unrestricted depth-3 circuits of size
2^{ω(√n)}, which would follow from optimal bounds for a concrete
enumeration problem about k-CNFs.

## Current record

The 2^{Ω(√n)} regime has three anchors. Paturi, Pudlák and Zane (FOCS
1997) proved via the satisfiability coding lemma that parity requires
depth-3 size Θ(n^{1/4}·2^{√n}) — tight, so parity cannot carry the class
further. Paturi, Pudlák, Saks and Zane (JACM 2005) pushed the same
machinery to 2^{1.282√n} for an explicit function checking membership in a
good code; twenty years later this is still the record for any explicit
function. Håstad, Jukna and Pudlák (1995) gave the independent top-down
method, also capped at 2^{O(√n)}. For the restricted class Σ³₃ (bottom
fan-in 3), Gurumukhani–Paturi–Pudlák–Saks–Talebanfard (CCC 2024) raised
the Majority bound from HJP's 1.154^n to 1.251^n by analyzing local
enumeration of transversals, and showed that optimal bounds for their
problem Enum(k,t) would yield Σ^k₃ Majority bounds of 2^{Ω(n log k/k)} —
which at the right k gives an unrestricted 2^{ω(√n)} depth-3 bound.

## Why it matters

Depth-3 is the smallest depth where lower bounds are not fully understood
and the smallest where they would cascade: by Valiant's depth reduction,
linear-size log-depth circuits collapse to depth-3 circuits of size
2^{O(n/log log n)}, so sufficiently strong Σ₃ bounds imply super-linear
bounds for log-depth circuits — a separate ancient open problem. The √n
exponent is also where circuit lower bounds and SAT algorithms are
provably entangled: the GPPST program advances k-SAT savings (see
super-strong-eth-ksat-savings) and depth-3 bounds with a single
combinatorial statement, so progress is publishable on either face.

## Attack surface

(1) The Enum(k,t) route is explicitly laid out: GPPST solved Enum(3, n/2)
with a 1.598^n randomized algorithm; Enum(4, n/2), or derandomizing and
tightening the k = 3 case, are concrete next steps with stated
consequences. (2) Squeeze the coding-lemma constant: the 1.282 comes from
optimizing over code parameters — a bounded search over explicit code
families and weight distributions could move the constant without new
ideas. (3) Function choice: parity is exhausted, Majority is provably not
(its depth-3 complexity is unresolved between 2^{Θ(√n)}-type bounds and
larger); other symmetric or expander-based candidates with large "all
solutions are isolated" structure fit the machinery. (4) Barrier-aware:
any approach must escape both the coding-lemma and top-down caps at
2^{O(√n)} — the GPPST enumeration framework is currently the only
published escape hatch.
