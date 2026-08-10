---
id: edit-distance-subquadratic-ptas
title: "Get a (1+eps)-approximation for edit distance in truly subquadratic time — constants are near-linear since 2020, and STOC 2026 got a PTAS to n^2 / 2^{log^{Omega(1)} n}"
genre: improve-algorithm
problems: ["Edit Distance"]
hypotheses: [SETH, OV]
record: "O(1)-approximation in n^{1+eps} time for every eps > 0 (the constant grows as eps shrinks); (1+eps)-approximation in n^2 / 2^{log^{Omega(1)} n} time"
record_ref: "Andoni & Nosatzki, FOCS 2020 (arXiv:2005.07678); Mao & Rubinstein, STOC 2026 (arXiv:2603.29702)"
hardness: "exact: no O(n^{2-eps}) unless SETH fails; approximation: no conditional hardness known for randomized constant-factor — but a deterministic truly subquadratic PTAS for the sibling problem LCS would imply E^NP lacks non-uniform linear-size Valiant series-parallel circuits"
hardness_ref: "Backurs & Indyk, STOC 2015 (arXiv:1412.0348); Abboud & Backurs, ITCS 2017 (LIPIcs.ITCS.2017.11)"
status: open
confidence: high
verified: 2026-08-10
tags: [strings, approximation, edit-distance, fine-grained, seth, ptas]
---

## Statement

Compute a (1 + eps)-approximation to the edit distance of two length-n strings
in truly subquadratic time O(n^{2-delta}) for some fixed delta > 0 — for every
constant eps > 0, or even for one specific eps < 1. Two weaker prizes also
close this card: an explicit small constant factor (say, 3) in near-linear
time, or a conditional lower bound ruling out a randomized truly subquadratic
PTAS under a standard fine-grained hypothesis.

## Current record

Exact edit distance is SETH-hard to beat n^2 (Backurs–Indyk, STOC 2015), so
approximation is where the action moved. Chakraborty, Das, Goldenberg, Koucký,
and Saks (FOCS 2018, JACM 2020; arXiv:1810.03664) gave the first constant
factor in truly subquadratic time, Õ(n^{2-2/7}). Andoni and Nosatzki (FOCS
2020) finished that race in the runtime dimension: constant-factor
approximation in n^{1+eps} time for any eps > 0 — but the constant explodes as
a function of 1/eps, and no one has published a usably small constant in
near-linear time. In the accuracy dimension, Mao and Rubinstein (STOC 2026)
gave the first genuine approximation schemes below quadratic: randomized
(1+eps)-approximation for edit distance — and (1−eps) for LCS — in
n^2 / 2^{log^{Omega(1)} n} time, a "quasi-strongly subquadratic" bound that
beats n^2 by a quasi-polynomial factor but is still n^{2-o(1)}. The gap is
stark: factor (1+eps) at n^2/2^{polylog}, or factor O(1)-huge at n^{1+eps},
with nothing known in between and no hardness explaining why.

## Why it matters

Edit distance approximation is the flagship test of whether SETH-hardness of
an exact problem infects its approximate versions. A truly subquadratic PTAS
would mean the quadratic wall is purely about exactness — hugely relevant to
practice (diff, genomics) where 1% error is free. A matching lower bound would
be the first strong hardness-of-approximation result in fine-grained
complexity for a natural distance problem. There is a known obstruction to the
lower-bound route: Abboud and Backurs (ITCS 2017) showed that even proving
hardness of a *deterministic* truly subquadratic PTAS (for LCS, over
super-constant alphabets) requires new circuit lower bounds, so the hardness
side is provably difficult — which makes the algorithmic side look like the
live direction.

## Attack surface

Mao–Rubinstein's savings come from a new way to amortize non-repetitive
structure; the immediate question is whether their 2^{log^{Omega(1)} n} factor
can be pushed to 2^{eps log n} = n^{eps}. From the other end, the
Andoni–Nosatzki smoothing framework has never been given a tight constant:
reanalyzing it (or the Chakraborty et al. window framework) for an explicit
factor like 3 + eps at n^{1.5} would be a clean intermediate record. Special
cases first: (1+eps)-approximation in n^{2-delta} when the distance is
promised to be Theta(n) (the hard regime for exact reductions), or for
Ulam-like non-repetitive strings, where near-linear (1+eps) is plausibly
already within reach of known techniques.
