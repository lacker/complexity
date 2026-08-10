---
id: super-strong-eth-ksat-savings
title: "Beat PPSZ's Θ(1/k) savings for k-SAT — solve k-SAT in 2^{n(1 - ω(1/k))} time"
genre: improve-algorithm
problems: ["k-SAT"]
hypotheses: [SETH, "Super Strong ETH"]
record: "2^{n(1 - c_k/k)} time with c_k → π²/6 ≈ 1.645 (PPSZ savings)"
record_ref: "Paturi, Pudlák, Saks & Zane, JACM 2005; general (non-unique) case by Hertli, SICOMP 2014"
hardness: "no 2^{o(n)} algorithm for any fixed k ≥ 3 unless ETH fails; SETH asserts the exponent tends to n as k grows"
hardness_ref: "Impagliazzo & Paturi, JCSS 2001"
status: open
confidence: medium
tags: [sat, exponential-time, seth, ppsz, savings]
---

## Statement

For k-SAT (satisfiability of CNF formulas with clauses of width at most k),
every known algorithm runs in time 2^{n(1 - Θ(1/k))}: the "savings" over brute
force is a constant divided by k. Find an algorithm whose savings grow
asymptotically faster — running time 2^{n(1 - s(k)/k)} with s(k) → ∞, for
example savings of order (log k)/k — or give evidence this is impossible by
deriving a Θ(1/k) barrier from a standard hypothesis.

## Current record

PPSZ (Paturi–Pudlák–Saks–Zane, JACM 2005) solves k-SAT in time
2^{n(1 - μ_k/k)} where the constant μ_k increases to π²/6 ≈ 1.645 as k grows;
Hertli (SICOMP 2014) removed the unique-solution assumption. Subsequent
improvements (biased PPSZ and successors) improve the constant for small k
but not the Θ(1/k) shape. The statement that Θ(1/k) savings is optimal has
been studied under the name "Super Strong ETH" (see Vyas & Williams, "On
Super Strong ETH", SAT 2019, and Scheder & Talebanfard, CCC 2020, who proved
that PPSZ-type algorithms themselves cannot achieve ω(1/k) savings). No
consequence links Super Strong ETH to SETH or ETH in either direction: it
could fail while SETH holds, or vice versa.

## Why it matters

SETH (the Strong Exponential Time Hypothesis) says the base for k-SAT tends
to 2 as k → ∞, and it is the load-bearing assumption behind dozens of
fine-grained lower bounds. This card asks a sharper quantitative question:
not just whether the base tends to 2, but how fast. An algorithm with ω(1/k)
savings would be the first structural progress on k-SAT beyond the PPSZ
framework and would immediately tighten every reduction that pays attention
to the savings function (e.g., hardness for Orthogonal Vectors and its
descendants is calibrated to savings). Conversely, a reduction showing that
ω(1/k) savings implies a breakthrough elsewhere would give SETH a
quantitative moat.

## Attack surface

(1) Restricted instance classes first: for random k-SAT and for formulas
with bounded clause density, better-than-PPSZ savings have been claimed in
special regimes — mapping exactly which regimes is a good literature task,
and extending any of them toward worst case is the prize. (2) Width
reduction: the Impagliazzo–Paturi–Zane sparsification lemma is the standard
preprocessing step, and its exponential blowup in 1/ε is one identified
bottleneck; improved sparsification would propagate directly. (3) The
polynomial method of Abboud–Williams-style SAT algorithms gives superior
savings for depth-two circuits with few gates; pushing it to unrestricted
CNF with m = O(n) clauses is a concrete first target.
