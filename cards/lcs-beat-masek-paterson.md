---
id: lcs-beat-masek-paterson
title: "Beat O(n^2 / log^2 n) for Longest Common Subsequence — SETH says no n^{2-eps}, circuits say polylog shaving is already big"
genre: improve-algorithm
problems: ["Longest Common Subsequence", "Orthogonal Vectors"]
hypotheses: [SETH, OV]
record: "O(n^2 / log^2 n) time (constant-size alphabet)"
record_ref: "Masek & Paterson, JCSS 1980 (Four-Russians technique)"
hardness: "no O(n^{2-eps}) algorithm unless SETH fails, even for binary alphabet"
hardness_ref: "Abboud, Backurs & Vassilevska Williams, FOCS 2015; Bringmann & Künnemann, FOCS 2015"
status: open
confidence: high
tags: [strings, fine-grained, seth, lcs, log-shaving]
---

## Statement

Given two strings of length n, compute the length of their longest common
subsequence (LCS) — the longest string obtainable from both by deleting
characters — in time o(n^2 / log^2 n) for constant-size alphabets. Beating
the 1980 Four-Russians record by any asymptotic factor closes this card; so
would a conditional lower bound explaining why n^2 / log^2 n is optimal.

## Current record

LCS is a special case of weighted edit distance, and the Masek–Paterson
Four-Russians method (precompute DP behavior on all logarithmic-size blocks)
gives O(n^2 / log^2 n) for constant alphabets. Bit-parallel algorithms give
O(n^2 / w) for machine word size w, matching but not beating this for
w = Theta(log n); for unbounded alphabets the best bounds carry extra
log-log factors. On the hardness side, Abboud, Backurs, and Vassilevska
Williams (FOCS 2015) and independently Bringmann and Künnemann (FOCS 2015)
reduced Orthogonal Vectors to LCS, so an O(n^{2-eps}) algorithm refutes the
Strong Exponential Time Hypothesis; the Bringmann–Künnemann alignment
framework pushes the hardness all the way down to binary alphabets. The open
territory is precisely the polylog corridor between log^2 shaving and n^{2-eps}.

## Why it matters

LCS is the diff/bioinformatics workhorse, and it sits at the center of an
unusual amplification phenomenon: Abboud, Hansen, Vassilevska Williams, and
Williams (STOC 2016) showed that an O(n^2 / log^c n) LCS algorithm for every
constant c would yield new circuit lower bounds, by simulating formulas and
branching programs inside LCS instances. So the polylog gap is load-bearing:
small shavings are publishable records, large shavings are breakthroughs in
circuit complexity, and matching lower bounds would need fundamentally new
"sub-polynomial hardness" machinery. Progress also propagates to the many
LCS variants (k-LCS, tree LCS, weighted alignments) whose reductions route
through this problem.

## Attack surface

The same two levers as edit distance — bigger lookup blocks and
word-parallelism — appear individually exhausted; the open direction is
combining them or importing algebraic structure. Concrete bites: (1) the LCS
DP matrix is monotone with bounded differences, the exact structure that made
bounded-difference min-plus product subcubic — can that machinery be run at
the "polylog scale" of n^epsilon-size blocks? (2) the special case where one
string is highly compressible (run-length or LZ-compressed) has faster
algorithms; find the largest structured class where log^2 can be beaten, then
attack random-like inputs. (3) On the hardness side, extend the
Bringmann–Künnemann alignment gadgets to rule out specific restricted
algorithm classes (e.g., "block-lookup" algorithms) below n^2 / log^2 n —
even a model-specific optimality proof would be new.
