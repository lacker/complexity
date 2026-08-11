---
id: dtw-loglog-barrier
title: "Dynamic time warping is stuck at O(n^2 / log log n)-type bounds — catch up to edit distance's log^2 shaving, or explain why not"
genre: improve-algorithm
problems: ["Dynamic Time Warping", "Orthogonal Vectors"]
hypotheses: [SETH, OV]
record: "O(n^2 log log log n / log log n) time"
record_ref: "Gold & Sharir, ACM TALG 2018"
hardness: "no O(n^{2-eps}) algorithm unless SETH fails, even for one-dimensional curves over a small integer alphabet"
hardness_ref: "Bringmann & Künnemann, FOCS 2015; Abboud, Backurs & Vassilevska Williams, FOCS 2015"
status: open
confidence: high
verified: 2026-08-10
tags: [sequences, time-series, fine-grained, seth, log-shaving]
---

## Statement

Dynamic time warping (DTW) aligns two sequences of n points by a monotone
correspondence (each point may repeat to stretch time) minimizing the total
distance between matched points — the standard elastic similarity measure for
time series. The textbook DP is O(n^2). The current record shaves only a
log log factor. Close the problem by computing DTW for one-dimensional
sequences in O(n^2 / log n) or better — or by proving that DTW genuinely
cannot benefit from Four-Russians-style log^2 shaving under a believable
hypothesis.

## Current record

Gold and Sharir (ACM TALG 2018) broke the pure quadratic barrier with an
O(n^2 log log log n / log log n) algorithm on the word RAM. Note how weak
this is compared to the sibling problems: edit distance and LCS enjoy
O(n^2 / log^2 n). The obstruction is that DTW's DP transitions involve real
(or large-integer) point distances, so the "precompute all small blocks"
trick that powers Four-Russians tabulation has too many possible block types
to tabulate. On the lower-bound side, Bringmann and Künnemann (FOCS 2015)
showed via their alignment-gadget framework that an O(n^{2-eps}) DTW
algorithm refutes SETH, even for curves of points on the one-dimensional
line with a constant-size set of coordinate values; Abboud, Backurs, and
Vassilevska Williams independently gave quadratic SETH hardness in the same
season. So the open corridor spans essentially everything between
log log n shaving and n^{2-eps}.

## Why it matters

DTW is arguably the most-deployed sequence-similarity measure after edit
distance (speech, gesture recognition, ECG analysis, finance), and it is the
member of the alignment family where the algorithmic side lags furthest
behind the hardness side. Any improvement clarifies a conceptual question:
is polylog shaving a universal property of alignment DPs, or a special
feature of finite-alphabet character comparison? An answer in either
direction reshapes expectations across every problem in this family. The
constant-alphabet special case (where DTW inputs look like strings) is a
particularly clean test: hardness already holds there, yet no log^2 shaving
is known even there.

## Attack surface

(1) Small alphabets first: for sequences over {0,1,...,c}, distances take
O(c^2) values and block tabulation becomes plausible — nailing
O(n^2 / log^2 n) for constant alphabets would be a clean publishable
increment and likely the intended stepping stone. (2) The bounded-difference
structure exploited in min-plus product breakthroughs applies to DTW's DP
matrix when point values are bounded; nobody has run that machinery at
subquadratic granularity. (3) Word-packing: Gold–Sharir is not
word-parallel; an O(n^2 / w) bit-parallel DTW for small alphabets is open
and would immediately beat the record for w = Theta(log n). (4) For
separations, adapt the Abboud–Hansen–Vassilevska Williams–Williams
circuit-simulation technique to DTW to show polylog shaving there also
implies circuit lower bounds — even this "excuse" result is currently
unwritten.
