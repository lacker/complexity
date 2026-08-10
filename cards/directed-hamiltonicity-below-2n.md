---
id: directed-hamiltonicity-below-2n
title: "Detect a directed Hamiltonian cycle in O((2-ε)^n) — close the gap with Björklund's 1.657^n for undirected graphs"
genre: improve-algorithm
problems: ["Directed Hamiltonian Cycle", "Hamiltonicity"]
hypotheses: [ETH, SETH]
record: "2^n · poly(n) time (directed); O(1.657^n) randomized for undirected graphs"
record_ref: "Bellman 1962 and Held & Karp 1962 (directed); Björklund, SICOMP 2014 (announced FOCS 2010) for undirected"
hardness: "no 2^{o(n)} algorithm unless ETH fails"
hardness_ref: "Impagliazzo, Paturi & Zane, JCSS 2001"
status: open
confidence: high
tags: [graphs, hamiltonicity, exponential-time, algebraic, directed-vs-undirected]
---

## Statement

Give an algorithm deciding whether an n-vertex directed graph contains a
Hamiltonian cycle (a directed cycle visiting every vertex exactly once) in
time O((2-ε)^n) for some fixed ε > 0. Randomized algorithms count — the
undirected record is randomized.

## Current record

For directed graphs the record is still the 1962 dynamic programming of
Bellman and of Held–Karp: 2^n · poly(n), by tabulating, for every vertex
subset S and endpoint v, whether a path from a fixed start covers exactly S
and ends at v. For undirected graphs, Björklund (FOCS 2010; SICOMP 2014)
broke the barrier spectacularly: a Monte Carlo algorithm running in
O(1.657^n), by counting Hamiltonian cycles modulo 2 via determinants over a
field of characteristic 2 — cancellation pairs up non-Hamiltonian walk
contributions, and randomness isolates a witness. The technique leans
crucially on the symmetry of undirected edges (each cycle traversed in two
directions cancels helpfully), which is exactly what directed graphs lack.
Björklund, Kaski and Koutis (ICALP 2017) managed to beat plain 2^n in the
directed case by superpolynomial (but subexponential) factors via
generalized Laplacians — so the base is exactly 2 with lower-order savings,
and no O((2-ε)^n) bound is known. No hypothesis rules one out.

## Why it matters

This is the cleanest directed-versus-undirected gap in exponential-time
algorithmics: the same problem, a base of 1.657 on one side and 2 on the
other, with the undirected proof technique visibly breaking at a specific
point (orientation kills the cancellation). Resolving it in either direction
would be significant: an algorithm would likely require a new algebraic
sieve for asymmetric structures, applicable to TSP and connectivity
problems; a matching hardness result (2-ε)^n-hardness under SETH would be
the first of its kind for a permanent-like directed counting barrier and
would sharpen the Set Cover Conjecture landscape.

## Attack surface

(1) Understand the cancellation: Björklund's algorithm counts closed walks
with algebraic weights so that non-simple ones cancel mod 2; catalog exactly
which directed analogues (cycle covers, permanents mod 2, out-branching
sieves of Björklund–Kaski–Koutis) fail and why — the ICALP 2017 paper is the
current best foothold and its savings may be improvable. (2) Special cases
first: bipartite directed graphs, bounded-degree directed graphs, and
tournaments are natural stepping stones with extra structure to exploit.
(3) Parity first: computing the parity of directed Hamiltonian cycles
faster than 2^n is a cleaner algebraic target (Björklund–Husfeldt have
results on Hamiltonicity parity) and historically parity progress preceded
decision progress in this line.
