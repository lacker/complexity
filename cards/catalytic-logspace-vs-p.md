---
id: catalytic-logspace-vs-p
title: "Pin down catalytic logspace against P: prove CL ⊆ P (now equivalent to making every CL machine run in polynomial time) or P ⊆ CL"
genre: equivalence-completion
problems: ["Catalytic Logspace", "CL vs P"]
hypotheses: []
record: "TC1 ⊆ CL ⊆ ZPP; unconditionally CBPL = CL, and CL ∩ P = CLP (separate time and catalytic-space bounds combine)"
record_ref: "Buhrman, Cleve, Koucký, Loff & Speelman, STOC 2014 (containments); Cook, Li, Mertz & Pyne, STOC 2025 (ECCC TR24-106)"
hardness: "no separation known in either direction; TC1 ⊆ CL is the strongest lower containment, and nothing outside TC1 is known to be in CL"
hardness_ref: "Buhrman, Cleve, Koucký, Loff & Speelman, STOC 2014"
status: open
confidence: high
verified: 2026-08-10
tags: [space-complexity, catalytic, derandomization, structural]
---

## Statement

A catalytic logspace (CL) machine gets O(log n) clean work space plus a
polynomially long *catalytic* tape that arrives full of someone else's data:
the machine may overwrite it freely but must restore it exactly before
halting. The card: resolve either containment between CL and P. Concretely,
prove CL ⊆ P — which, by Cook–Li–Mertz–Pyne, is now *equivalent* to showing
every CL machine can be made to run in polynomial time — or prove P ⊆ CL by
putting some P-complete problem in CL. Either direction beats the published
state of knowledge.

## Current record

Buhrman, Cleve, Koucký, Loff and Speelman (STOC 2014) introduced the model
and proved the two standing containments: uniform TC1 ⊆ CL (so CL likely
exceeds logspace — it contains NL and even threshold circuits, via
register-program tricks that compute on top of full memory), and CL ⊆ ZPP
(a random catalytic tape is, with high probability, one on which the machine
runs fast). Cook, Li, Mertz and Pyne (STOC 2025, ECCC TR24-106) sharpened the
structure with a compress-or-random framework: catalytic randomness can be
unconditionally removed (CBPL = CL), and any problem in both CL and P is in
CLP, i.e. solvable by a catalytic machine that is *simultaneously* logspace
and polynomial-time. So the ZPP upper bound is really a statement that CL
equals polynomial-time zero-error randomized catalytic space — and CL ⊆ P is
exactly the question of derandomizing the choice of a "good" catalytic tape.
Despite a decade of work, TC1 remains the best lower containment: no problem
outside TC1 has been placed in CL.

## Why it matters

Catalytic techniques are the engine behind two of the decade's headline
results: the Cook–Mertz Tree Evaluation algorithm (see card
tree-evaluation-log-space) and, through it, Williams' TIME[t] ⊆
SPACE[sqrt(t log t)] (see card time-space-sqrt-simulation). Meanwhile the
CLP frontier is advancing from below — bipartite maximum matching
(Agarwala & Mertz, arXiv:2504.09991) and linear matroid intersection
(ITCS 2026, arXiv:2509.06435) are in CLP — problems not known to be in TC1,
inching toward RNC-flavored territory. If that program reaches a P-complete
problem, full memory provably substitutes for full time. Conversely, CL ⊆ P
would tame the model and make CL a legitimate rung between L and P.

## Attack surface

For CL ⊆ P: the compress-or-random dichotomy says on any fixed tape the
machine either finishes fast or its behavior compresses the tape; the missing
piece is a deterministic way to exploit compressibility — a pseudorandom
catalytic tape, or an explicit construction fooling the machine's tape-usage
statistics. Restricted variants are charted terrain worth extending: lossy
catalytic computation is fully characterized (Folkertsma et al.,
arXiv:2409.05046), and nondeterministic CL is also inside ZPP. For P ⊆ CL:
extend the register-program repertoire — the matching and matroid
intersection algorithms work via inverting matrices over small fields on the
catalytic tape; determinant-flavored P-problems (LP feasibility special
cases, general matching) are the natural next targets.
