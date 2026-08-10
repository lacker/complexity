---
id: edit-distance-shave-the-logs
title: "Beat O(n^2 / log^2 n) for edit distance, or shave a third log factor — the 46-year-old record vs the SETH quadratic wall"
genre: improve-algorithm
problems: ["Edit Distance", "Orthogonal Vectors"]
hypotheses: [SETH, OV]
record: "O(n^2 / log^2 n) time (constant-size alphabet)"
record_ref: "Masek & Paterson, JCSS 1980"
hardness: "no O(n^{2-eps}) algorithm for any eps > 0 unless SETH fails"
hardness_ref: "Backurs & Indyk, STOC 2015 (arXiv:1412.0348)"
status: open
confidence: high
verified: 2026-08-10
tags: [strings, fine-grained, seth, four-russians, log-shaving]
---

## Statement

Compute the edit distance (minimum number of character insertions, deletions,
and substitutions turning one string into another) of two strings of length n
over a constant-size alphabet in time o(n^2 / log^2 n) — that is, beat the
Four-Russians bound that has stood since 1980. Any asymptotic improvement,
even by a single additional log factor, closes this card.

## Current record

The textbook dynamic program runs in O(n^2). Masek and Paterson (JCSS 1980)
used the "Four Russians" table-lookup technique — precompute the behavior of
the DP on all small blocks, then process the grid block-by-block — to get
O(n^2 / log^2 n) for constant-size alphabets. Variants extending the trick to
unbounded alphabets pay back small log-log factors. On the lower-bound side,
Backurs and Indyk (STOC 2015) reduced Orthogonal Vectors — and hence CNF-SAT —
to edit distance, showing that an O(n^{2-eps}) algorithm would refute the
Strong Exponential Time Hypothesis (SETH). Bringmann and Künnemann (FOCS 2015)
strengthened this to binary alphabets. The gap between the record and the wall
is exactly polylogarithmic, and nobody has moved either side in a decade.

## Why it matters

This is the flagship problem of fine-grained complexity, and the polylog zone
is not a no-man's-land: Abboud, Hansen, Vassilevska Williams, and Williams
(STOC 2016) showed that shaving an arbitrarily large polylog factor — an
O(n^2 / log^c n) algorithm for every constant c — would imply new circuit
lower bounds (against formulas / branching programs) that are far beyond
current techniques. So this card has a rare two-sided payoff: a modest
algorithmic win of one or two log factors is a clean publishable record,
while a dramatic win would resolve a circuit-complexity barrier. Conversely,
any hardness argument explaining why log^2 is the truth would be a new kind
of lower bound.

## Attack surface

The Four-Russians method is fundamentally block-based; the two known levers
are bigger blocks (limited by alphabet-dependent table size) and
word-parallelism (Myers-style bit-vector DP gives O(n^2 / w) for word size w,
which matches but does not beat log^2 for w = Theta(log n)). Candidate angles:
combine bit-parallelism with block lookup rather than choosing one; exploit
the bounded-differences structure of the DP matrix (adjacent entries differ by
at most 1), which is exactly the structure powering the min-plus-product
breakthroughs used for RNA folding; or target the special case of bounded
distance k first, where O(n + k^2) is known and the interaction of techniques
is cleaner. A concrete warm-up: shave any factor for binary alphabet
inputs, where the hardness construction is already known to apply.
