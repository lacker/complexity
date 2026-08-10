---
id: unweighted-ted-exponent
title: "Unweighted tree edit distance sits between n^2 (SETH) and ~n^{2.69} (Nogler et al.) — close the exponent gap"
genre: improve-algorithm
problems: ["Tree Edit Distance", "Edit Distance", "Min-Plus Product"]
hypotheses: [SETH, APSP]
record: "~O(n^{(3+omega)/2}) time, about O(n^{2.6857}) with current omega"
record_ref: "Nogler, Polak, Saha, Vassilevska Williams, Xu & Ye, STOC 2025, arXiv:2411.06502"
hardness: "no O(n^{2-eps}) algorithm unless SETH fails (inherited from string edit distance)"
hardness_ref: "Backurs & Indyk, STOC 2015 (strings embed as caterpillar trees)"
status: open
confidence: high
verified: 2026-08-10
tags: [trees, fine-grained, min-plus, matrix-multiplication, seth]
---

## Statement

For unweighted tree edit distance — rooted ordered trees, unit cost for every
node insertion, deletion, or relabel — the truth is somewhere between
quadratic and roughly n^{2.69}. Close the gap from either side: find an
algorithm running in O(n^{(3+omega)/2 - eps}) or better (ideally approaching
O(n^2) or the matrix multiplication exponent omega), or prove a
super-quadratic conditional lower bound, e.g., that unweighted TED requires
n^{omega - o(1)} time under a standard hypothesis.

## Current record

For decades the best bound was the O(n^3) of Demaine–Mozes–Rossman–Weimann,
which is provably optimal among "decomposition strategy" algorithms, and
Bringmann–Gawrychowski–Mozes–Weimann (SODA 2018) showed even the unweighted
case resists subcubic *combinatorial* algorithms (via Boolean matrix
multiplication hardness). Mao (FOCS 2021) broke the cubic barrier for the
unweighted case with an algebraic algorithm running in about O(n^{2.9546}),
by reducing the DP bottleneck to min-plus products of matrices with bounded
difference structure; Dürr improved this to O(n^{2.9148}) via rectangular
monotone min-plus products. The current record is Nogler, Polak, Saha,
Vassilevska Williams, Xu, and Ye (STOC 2025, arXiv:2411.06502):
~O(n^{(3+omega)/2}) ≈ O(n^{2.6857}), using bounded monotone min-plus product
as the crucial subroutine — the same exponent as RNA folding. The same paper
settled the *weighted* case: weighted TED is fine-grained equivalent to
APSP (so it is truly cubic under the APSP hypothesis), with a subcubic
n^3 / 2^{Omega(sqrt(log n))} algorithm to match. For unweighted TED the only
lower bound is still quadratic: a string is a path-like tree, so the
Backurs–Indyk SETH hardness of string edit distance transfers directly.
The gap — nearly n^{0.69} — remains one of the widest for any heavily
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
most k), where Õ(n + poly(k)) algorithms now exist (arXiv:2209.07524;
sharpened at ESA 2025, arXiv:2507.02701) and the optimal k-dependence is
still open; (3) for lower bounds, try reducing from min-plus
convolution or BMM to unweighted TED with only quadratic blowup — even
ruling out n^{2+o(1)} under a believable hypothesis would be new.
