---
id: hamiltonicity-treewidth-base-gap
title: "Hamiltonicity by treewidth: beat Cut&Count's 4^tw or prove SETH-hardness above the (2+√2)^tw inherited from pathwidth"
genre: improve-algorithm
problems: ["Hamiltonian Cycle", "Hamiltonicity"]
hypotheses: [SETH]
record: "O*(4^tw) randomized via Cut&Count; for the finer pathwidth parameter, O*((2+√2)^pw), which is SETH-optimal"
record_ref: "Cygan, Nederlof, Pilipczuk, Pilipczuk, van Rooij & Wojtaszczyk, FOCS 2011 / TALG 2022 (arXiv:1103.0534); Cygan, Kratsch & Nederlof, STOC 2013 / JACM 2018 (arXiv:1211.1506)"
hardness: "no O*((2+√2-ε)^tw) algorithm unless SETH fails — inherited from the pathwidth lower bound, since tw ≤ pw"
hardness_ref: "Cygan, Kratsch & Nederlof, STOC 2013 / JACM 2018 (arXiv:1211.1506)"
status: open
confidence: high
verified: 2026-08-10
tags: [parameterized, treewidth, pathwidth, seth, cut-and-count, fine-grained]
---

## Statement

Hamiltonian Cycle on a graph given with a tree decomposition of width tw:
the standard dynamic programming over the decomposition pays some base c per
unit of width, running in O*(c^tw). Determine the optimal base. Concretely:
give a (randomized) algorithm running in O*((4-ε)^tw) for some fixed ε > 0,
or prove that an O*((b-ε)^tw) algorithm refutes SETH for some b strictly
greater than 2+√2 ≈ 3.414. Either result closes part of the last open gap
among the classical problems in the "tight bounds for treewidth" program.

## Current record

Cut&Count (Cygan, Nederlof, Pilipczuk, Pilipczuk, van Rooij, Wojtaszczyk,
FOCS 2011) counts, modulo 2, pairs (degree-2 edge set, consistent cut) so
that disconnected solutions cancel; with the Isolation Lemma this decides
Hamiltonicity in O*(4^tw) randomized time — still the best known.
Deterministically, the rank-based approach gives single-exponential bounds
with a slightly worse base, about (2+2^{ω/2})^tw (Bodlaender, Cygan,
Kratsch, Nederlof, ICALP 2013 / Inf. Comput. 2015). For the more
restrictive pathwidth parameter, Cygan, Kratsch and Nederlof (STOC 2013)
did better: the GF(2)-rank of the matching-connectivity matrix is exactly
2^{k/2}, yielding O*((2+√2)^pw), and they proved a matching SETH lower
bound — (2+√2) is *the* answer for pathwidth. Since tw ≤ pw, that lower
bound transfers to treewidth, but the rank-based upper bound does not: join
nodes of a tree decomposition combine two partial solutions, and no one
knows how to multiply the compressed representations without falling back
to 4^tw states. The truth is somewhere in [2+√2, 4], and experts have
declined to conjecture which endpoint wins.

## Why it matters

This is the flagship open case of the Lokshtanov–Marx–Saurabh program
("known algorithms on graphs of bounded treewidth are probably optimal",
TALG 2018), which settled 2^tw for Independent Set, 3^tw for Dominating
Set, and so on. It is also the cleanest candidate for a genuine
pathwidth/treewidth separation: if the answer for treewidth exceeds 2+√2,
join nodes are provably more expensive than linear structure — a new
phenomenon no current SETH gadgetry can express. The counting analogue is
already settled at base 6 for pathwidth (Curticapean, Lindzey, Nederlof,
SODA 2018, arXiv:1709.02311), so decision-versus-counting intuition is
calibrated and waiting.

## Attack surface

Algorithm side: the bottleneck is a join-node product — find a basis of the
"consistent matchings" pairing under which the join becomes sparse; the
March 2026 treedepth advance (4^τ via ordered pairs of consistent
matchings, arXiv:2603.24492, improving Nederlof et al.'s 5^τ) is the
freshest template, and cutwidth results (arXiv:2212.12385) supply worked
examples of nonstandard state spaces. Parity of Hamiltonian cycles by
treewidth is a softer first target. Hardness side: all known SETH
constructions build long path-like gadgets whose treewidth and pathwidth
coincide, capping them at 2+√2; a lower bound beating that must encode SAT
into balanced join structure — even a (3.5-ε)^tw SETH bound would be the
first separation of its kind. Lower bounds against pure DP algorithms
(arXiv:2512.23121) scope which algorithmic escapes remain.
