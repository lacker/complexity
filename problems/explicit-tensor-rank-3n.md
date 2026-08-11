---
id: explicit-tensor-rank-3n
title: "Prove a (3+eps)n rank lower bound for an explicit n x n x n tensor — the record is 3n − Theta(log n) while random tensors have rank ~n^2/3"
genre: missing-hardness
problems: ["Tensor Rank", "Arithmetic Circuit Lower Bounds"]
hypotheses: ["Set Cover Conjecture"]
record: "rank >= 3n − Theta(log n) for an explicit {0,1} tensor of shape n x n x n, over any field; the analysis is exact, so this construction cannot give more"
record_ref: "Alexeev, Forbes & Tsimerman, CCC 2011 (arXiv:1102.0072, \"Tensor Rank: Some Lower and Upper Bounds\")"
hardness: "conditional tension rather than a lower bound: the Set Cover Conjecture and Strassen's asymptotic rank conjecture cannot both hold, so SCC implies explicit tensor families with high asymptotic rank"
hardness_ref: "Björklund & Kaski, STOC 2024; strengthened by Pratt, STOC 2024"
status: open
confidence: high
verified: 2026-08-10
tags: [tensors, algebraic, arithmetic-circuits, asymptotic-rank, matrix-multiplication]
---

## Statement

Exhibit an explicit tensor T: [n] x [n] x [n] -> F with rank at least
(3 + eps)n for some constant eps > 0, over some field — or any omega(n) bound.
A generic tensor has rank about n^3/(3n − 2) ~ n^2/3, so almost every tensor
beats the target by a factor of n; the problem is naming one. Border rank
versions count too: there the explicit record is even weaker, around 2n
(Landsberg–Michałek's ~2.02n via border apolarity; Dvir, arXiv:2511.02670,
gets (2 − eps)n for D x n x n tensors from dimension expanders).

## Current record

Alexeev, Forbes and Tsimerman (CCC 2011) constructed explicit {0,1}-tensors
with rank exactly 3n − Theta(log n), via the substitution method; their
analysis is tight for the construction, so the method as instantiated is
exhausted. Fifteen years later this is still the record. The obstruction is
structural: all known lower-bound techniques for order-3 tensors —
flattenings, substitution, and their relatives — are "rank methods," and
barriers (Efremenko–Garg–Oliveira–Wigderson, ITCS 2018) show such methods
cannot certify rank beyond O(n) for order-3 tensors. Meanwhile the conditional
landscape moved: Björklund and Kaski (STOC 2024) proved that Strassen's
asymptotic rank conjecture (asymptotic rank of every concise tensor is
minimal) and the Set Cover Conjecture cannot both be true, and Pratt (STOC
2024) strengthened the connection — so high explicit (asymptotic) tensor rank
is now wired into the fine-grained web that the set-cover-conjecture-vs-seth
and chromatic-number-below-2n entries sit in.

## Why it matters

Tensor rank is the algebraic-complexity analogue of circuit size: the rank of
the matrix multiplication tensor determines omega (see matmul-omega-record),
and superlinear explicit rank bounds are prerequisites for most dreamed-of
arithmetic circuit lower bounds. The Björklund–Kaski–Pratt results mean the
question now cuts both ways: constructions of high-asymptotic-rank tensors
attack the asymptotic rank conjecture, while proofs that explicit tensors have
low asymptotic rank yield faster set cover, chromatic number, and related
2^n-barrier algorithms. Either direction moves published bounds.

## Attack surface

Past 3n requires a non-rank method — the barrier paper is a precise
specification of what to avoid. Candidate bites: Dvir's dimension-expander
route is brand new (November 2025) and not obviously capped at 2n; algebraic
geometry tools (border apolarity) have not been pushed on rank rather than
border rank; and the finite-field setting allows counting/entropy arguments
unavailable over C. A cheaper first target: improve the border rank record
2.02n, where the gap to the rank record is itself unexplained. For the
conditional route: make the Björklund–Kaski tension explicit by identifying
the specific Kronecker-power tensor family whose asymptotic rank SCC forces
to be high, and attack its rank directly.

## Verification notes

Checked August 2026: no explicit order-3 rank bound above 3n − Theta(log n)
found; Dvir's 2025 construction and the STOC 2024 conditional results are
complements, not improvements, to the AFT record.
