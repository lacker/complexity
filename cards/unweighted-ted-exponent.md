---
id: unweighted-ted-exponent
title: "Unweighted tree edit distance sits between n^2 (SETH) and ~n^{2.95} (Mao) — close the exponent gap"
genre: improve-algorithm
problems: ["Tree Edit Distance", "Edit Distance", "Min-Plus Product"]
hypotheses: [SETH, APSP]
record: "O(n^{2.9546}) time"
record_ref: "Mao, FOCS 2021 (subsequently sharpened via improved monotone min-plus products)"
hardness: "no O(n^{2-eps}) algorithm unless SETH fails (inherited from string edit distance)"
hardness_ref: "Backurs & Indyk, STOC 2015 (strings embed as caterpillar trees)"
status: open
confidence: medium
tags: [trees, fine-grained, min-plus, matrix-multiplication, seth]
---

## Statement

For unweighted tree edit distance — rooted ordered trees, unit cost for every
node insertion, deletion, or relabel — the truth is somewhere between
quadratic and roughly n^{2.95}. Close the gap from either side: find an
algorithm running in O(n^{2.9}) or better (ideally approaching O(n^2) or the
matrix multiplication exponent omega), or prove a super-quadratic conditional
lower bound, e.g., that unweighted TED requires n^{omega - o(1)} time under a
standard hypothesis.

## Current record

For decades the best bound was the O(n^3) of Demaine–Mozes–Rossman–Weimann,
which is provably optimal among "decomposition strategy" algorithms, and
Bringmann–Gawrychowski–Mozes–Weimann (SODA 2018) showed even the unweighted
case resists subcubic *combinatorial* algorithms (via Boolean matrix
multiplication hardness). Mao (FOCS 2021) broke the cubic barrier for the
unweighted case with an algebraic algorithm running in about O(n^{2.9546}),
by reducing the DP bottleneck to min-plus products of matrices with bounded
difference structure; follow-up improvements to rectangular monotone
min-plus products have since nudged the exponent to roughly 2.91. The only
lower bound is quadratic: a string is a path-like tree, so the
Backurs–Indyk SETH hardness of string edit distance transfers directly.
The gap — nearly a full n^{0.9} — is one of the widest for any heavily
studied polynomial-time problem.

## Why it matters

Unweighted TED is the honest computational core of comparing hierarchical
data (parse trees, XML/JSON documents, RNA secondary structures as trees).
This card is also the flagship application of the monotone/bounded-difference
min-plus product program: every improvement to structured min-plus products
mechanically improves this exponent, and conversely a quadratic-time TED
algorithm would show that tree structure adds *nothing* to the complexity of
edit distance — a striking structural statement. A super-quadratic lower
bound would be even more interesting: no natural DP problem currently has
tight hardness at an intermediate exponent like n^{2.5}.

## Attack surface

The algorithmic path of least resistance is the min-plus pipeline: Mao's
reduction produces structured rectangular min-plus instances, and any
improvement to bounded-difference or monotone min-plus product (current
techniques descend from Chi–Duan–Xie–Zhang, STOC 2022) propagates here
automatically — this is a pure "improve the black box" card for anyone
attacking min-plus products. Independent angles: (1) bounded-depth or
bounded-degree trees, where the decomposition DP simplifies and quadratic
time may already be reachable; (2) the k-bounded distance regime (TED at
most k), where O(nk^2)-type bounds exist for strings — matching this for
trees is open territory; (3) for lower bounds, try reducing from min-plus
convolution or BMM to unweighted TED with only quadratic blowup — even
ruling out n^{2+o(1)} under a believable hypothesis would be new.
