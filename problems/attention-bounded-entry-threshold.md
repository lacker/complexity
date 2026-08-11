---
id: attention-bounded-entry-threshold
title: "Pin down the exact entry-size threshold for fast attention: n^{1+o(1)} algorithms at B = o(sqrt(log n)) vs SETH-hardness at B = Theta(sqrt(log n)) — close the constant-factor window and extend it to relative error"
genre: missing-hardness
problems: ["Attention Computation", "Orthogonal Vectors"]
hypotheses: [SETH]
record: "n^{1+o(1)} time for additive 1/poly(n)-error attention when d = O(log n) and entries bounded by B = o(sqrt(log n))"
record_ref: "Alman & Song, NeurIPS 2023 (arXiv:2302.13214)"
hardness: "no O(n^{2-delta}) algorithm when B = Theta(sqrt(log n)), assuming SETH"
hardness_ref: "Alman & Song, NeurIPS 2023 (arXiv:2302.13214)"
status: open
confidence: high
verified: 2026-08-10
tags: [machine-learning, transformers, fine-grained, seth, hardness-transfer]
---

## Statement

Attention, the core operation of transformers, takes three n x d matrices Q, K, V
and computes D^{-1} exp(QK^T) V, where exp is entrywise and D normalizes each row
(the "softmax"). Computing this naively takes about n^2 d time, and n is the
sequence length — the thing everyone wants to make huge. The problem: determine the
exact largest entry bound B*(n) such that attention with d = O(log n) and all
entries at most B*(n) in absolute value can be approximated to additive error
1/poly(n) in n^{1+o(1)} time. Equivalently: close the constant-factor gap between
the known algorithm (B = o(sqrt(log n))) and the known SETH-hardness
(B = C sqrt(log n) for a specific constant C), and settle whether the same
threshold governs relative-error approximation.

## Current record

Alman and Song (NeurIPS 2023) proved a sharp-up-to-constants dichotomy. Upper
bound: if B = o(sqrt(log n)), the polynomial method approximates exp(QK^T) by a
low-rank matrix, giving n^{1+o(1)} time. Lower bound: if B = Theta(sqrt(log n)),
any n^{2-delta} algorithm would refute the Strong Exponential Time Hypothesis
(SETH — the conjecture that CNF satisfiability needs essentially 2^n time), via
a reduction from Approximate Nearest Neighbor built on Orthogonal Vectors. A
follow-up by the same authors (NeurIPS 2024) showed the same threshold governs
computing the gradient of the attention loss, i.e., training, not just inference.
The picture has since been refined in the head-dimension direction: Gupta,
Huang, Saha, Xu and Ye (ICLR 2026, arXiv:2505.14840) gave an
Õ(n^{2-1/d} polylog(B)) algorithm for constant head dimension d = O(1) — so for
small d, subquadratic attention is possible at *any* temperature/entry bound —
and showed that once d = 2^{Theta(log* n)} (barely super-constant) with
unbounded entries, n^{2-o(1)} time is required under SETH. The dichotomy at the
d = Theta(log n) regime this problem targets is unchanged; the gap that remains
there: the multiplicative constant in the entry-bound threshold, the
relative-error regime, and multi-layer / non-softmax variants.

## Why it matters

This is the flagship example of hardness-transfer into machine learning: it says
sub-quadratic "efficient attention" schemes must either bound their entries
(equivalently, bound the temperature/scaling of the softmax) or give up worst-case
accuracy. Pinning the exact threshold would tell practitioners precisely where
approximation heuristics can and cannot be safe, and any improvement to the
hardness side adds a reusable edge from SETH into the ML-primitives cluster of
the reduction web.

## Attack surface

The hardness side imitates Rubinstein's distributed-PCP framework for approximate
nearest neighbor; tightening the constant likely means tightening that gadget.
The algorithm side is the polynomial method: better low-degree approximations of
e^x on [-B, B] (cf. optimal-degree bounds of Aggarwal–Alman) directly move the
upper threshold. Special cases to try first: d = c log n for small c, or Boolean
Q, K. For relative error, start by checking where the additive-to-relative
translation in the existing reduction loses its factor. The
Gupta–Huang–Saha–Xu–Ye n^{2-1/d} algorithm and their log*-hardness leave their
own window — the exact d(n) growth rate where any-temperature subquadratic
attention dies — which may be a softer target than the constant in B*(n).
