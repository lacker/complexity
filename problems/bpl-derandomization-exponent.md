---
id: bpl-derandomization-exponent
title: "Derandomize BPL in space o(log^{3/2} n / sqrt(log log n)) — the Saks–Zhou exponent 3/2 has moved once, subpolynomially, since 1995"
genre: improve-algorithm
problems: ["BPL Derandomization", "Iterated Matrix Multiplication", "Read-Once Branching Programs"]
hypotheses: []
record: "BPL ⊆ DSPACE(log^{3/2} n / sqrt(log log n)); in general, randomized space S is simulated deterministically in space O(S^{3/2} / sqrt(log S))"
record_ref: "Hoza, RANDOM 2021 (ECCC TR21-048), improving Saks & Zhou, JCSS 1999 (BPL ⊆ DSPACE(log^{3/2} n), FOCS 1995)"
hardness: "no lower bound in the way; BPL = L follows from explicit hardness — e.g., a function in DSPACE(n) requiring branching programs of size 2^{Omega(n)}"
hardness_ref: "Klivans & van Melkebeek, SICOMP 2002"
endgame: "already unconditional — any exponent improvement is a new theorem; a published halfway target exists: a WPRG with seed length O(log^2 n + log(w/ε)) computable in small space yields BPL ⊆ DSPACE(log^{4/3} n) (Braverman, Cohen & Garg, SICOMP 2020; Chattopadhyay & Liao, CCC 2020)"
status: open
confidence: high
verified: 2026-08-10
tags: [space-complexity, derandomization, bpl, pseudorandomness, saks-zhou]
---

## Statement

Simulate every randomized logspace algorithm (two-sided error, BPL)
deterministically in space o(log^{3/2} n / sqrt(log log n)). The record number
is the exponent 3/2, held since 1995: any deterministic simulation in space
O(log^{c} n) with c < 3/2 — or even a bigger subpolynomial shaving — beats the
published state of the art. The conjectured truth is BPL = L, i.e., exponent 1.

## Current record

Savitch (1970) and Borodin–Cook–Pippenger (1983) give BPL ⊆ DSPACE(log^2 n).
The one substantial improvement is Saks–Zhou (FOCS 1995, JCSS 1999): BPL ⊆
DSPACE(log^{3/2} n), by running Nisan's generator (Combinatorica 1992, seed
O(log n · log(nw/ε))) inside a recursion that repeatedly perturbs and rounds
approximate powers of the transition matrix. Hoza (RANDOM 2021, ECCC TR21-048)
holds the current record, BPL ⊆ DSPACE(log^{3/2} n / sqrt(log log n)), by
plugging an Armoni-style generator with improved error dependence into the
Saks–Zhou framework; the same paper gives a weighted PRG (WPRG) with seed
O(log n · log(nw) + log(1/ε)). As the 2026 error-reduction literature (ECCC
TR26-064) states flatly, the Saks–Zhou bound "has remained essentially
unimproved to this day," Hoza's subpolynomial gain being the only movement.
Adjacent unconditional facts: Nisan's RL ⊆ SC (poly time, polylog space),
BPL ⊆ logspace-uniform AC^1 (Cheng–Wang, CCC 2024), and BPL ⊆ CL, catalytic
logspace (Pyne, CCC 2024).

## Why it matters

BPL vs L is the derandomization question with no barrier excuse: no
relativization or natural-proofs obstruction is known, the endgame is fully
unconditional, and partial progress is measured by a single exponent. The
Braverman–Cohen–Garg / Chattopadhyay–Liao route makes the next step concrete:
sufficiently good WPRGs — better joint dependence on width and error, with no
need to touch Nisan's log^2 seed — already push the exponent to 4/3. Movement
here propagates to iterated matrix multiplication, to hitting sets
(Hoza–Zuckerman), and to everything downstream of small-space randomness.

## Attack surface

The live front is weighted PRGs and error reduction: Hoza's O(log n · log(nw) +
log(1/ε)) seed, sharpened by Cheng–Wu (SODA 2026) for w >> n and by
Chen–Cohen–Doron–Khaskelberg–Ta-Shma (ECCC TR26-064), which achieves optimal
arity dependence via a new error-reduction recursion. What is missing for the
4/3 target is width: the seed must pay log(w/ε) rather than log w · log n, and
the only direct attack on the width parameter remains the stalled Raz–Reingold
(1999) approach. Alternatively, improve the Saks–Zhou recursion itself — its
shift-and-round structure is the other factor of the 3/2 — or exploit the
catalytic route (BPL ⊆ CL) to trade the recursion's snapshots against reusable
memory. Special cases first: regular and permutation branching programs, where
seed Õ(log n · sqrt(log(1/ε)) + log(1/ε)) is already known (Chen–Hoza–Lyu–
Tal–Wu, FOCS 2023).
