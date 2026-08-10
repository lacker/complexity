---
id: 3sat-below-1-307
title: "Solve 3-SAT faster than O(1.307^n) — beat the improved PPSZ record"
genre: improve-algorithm
problems: ["3-SAT"]
hypotheses: [ETH, SETH]
record: "O(1.307^n) time, randomized (base ≈ 1.30698)"
record_ref: "Hansen, Kaplan, Zamir & Zwick, STOC 2019; refined by Scheder, FOCS 2021"
hardness: "no 2^{o(n)} algorithm unless ETH fails"
hardness_ref: "Impagliazzo & Paturi, JCSS 2001"
status: open
confidence: high
tags: [sat, exponential-time, ppsz, eth]
---

## Statement

Give an algorithm that decides satisfiability of a 3-CNF formula (an AND of
clauses, each an OR of at most three literals) over n variables in time
O(c^n) for some constant c < 1.3069, beating the current best base held by the
biased-PPSZ line. Randomized algorithms count; a deterministic algorithm
matching the current randomized base would also be a notable result.

## Current record

The record traces one algorithmic idea, PPSZ, refined over 25 years. Paturi,
Pudlák, Saks and Zane (FOCS 1998; JACM 2005) analyzed a strikingly simple
procedure: pick variables in random order, and set each either by a forced
inference (small-width resolution) or by a coin flip. This gave roughly
O(1.308^n) for formulas with a unique satisfying assignment. Hertli (FOCS
2011; SICOMP 2014) proved the same bound holds without the uniqueness
assumption. Hansen, Kaplan, Zamir and Zwick (STOC 2019) introduced biased
PPSZ — flipping slightly unfair coins on variables where the formula's
structure gives a hint — improving the base to about 1.30698. Scheder (FOCS
2021, "PPSZ is better than you think") sharpened the analysis further; the
gains at each step since 2005 have been in the fourth decimal digit or beyond.
The best deterministic bound is worse, and the gap between 1.307 and any known
lower bound is enormous: the Exponential Time Hypothesis (ETH) only rules out
2^{o(n)}, i.e., bases arbitrarily close to 1.

## Why it matters

3-SAT is the canonical NP-complete problem, and its best base is a benchmark
number the whole exponential-time literature is calibrated against. Many
upper bounds for other problems (via reductions to or from SAT) inherit
improvements here. Progress would also probe how far the PPSZ framework can
go: Scheder and Talebanfard (CCC 2020) proved lower bounds showing PPSZ-style
algorithms themselves cannot be pushed too far, so a substantial improvement
likely requires a genuinely new technique — exactly the kind of event that
recalibrates beliefs about SETH-adjacent hypotheses.

## Attack surface

Three lanes. (1) Squeeze PPSZ harder: the biased-coin idea of Hansen et al.
was found by careful case analysis partly assisted by computer search; a more
systematic optimization of the bias schedule is a concrete, search-friendly
target. (2) Hybridize: Schöning's random-walk algorithm (FOCS 1999,
O(1.334^n)) and PPSZ fail on different instance profiles; earlier records
(Iwama–Tamaki and successors) came from combining them, and better tradeoff
analyses may still have slack. (3) Attack Unique-3-SAT first: historically
every improvement was proven there before being lifted to the general case
via Hertli-style arguments. Known obstruction: the Scheder–Talebanfard PPSZ
lower bounds mean the encoding of "forced inference" must change, not just
the analysis.
