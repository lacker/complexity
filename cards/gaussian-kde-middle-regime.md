---
id: gaussian-kde-middle-regime
title: "Close the middle regime for Gaussian kernel density evaluation in dimension Theta(log n): fast algorithms need squared radius o(log n), SETH-hardness is known only at high accuracy — one side must give"
genre: missing-hardness
problems: ["Kernel Density Estimation", "Bichromatic Hamming Closest Pair", "Orthogonal Vectors"]
hypotheses: [SETH]
record: "n^{1+o(1)} time for batch Gaussian KDE via the polynomial method when the squared radius of the point set is o(log n)"
record_ref: "Aggarwal & Alman, CCC 2022"
hardness: "n^{2-o(1)} required under SETH for Gaussian KDE in dimension m >= C log n with squared radius B whenever 1/eps > (m/B)^m C^m — matching the polynomial method up to a low-order 2^{O(m)} factor in 1/eps; the m = o(log n) regime is likewise matched to the fast multipole method"
hardness_ref: "Alman & Guan, CCC 2024 (arXiv:2407.02372); original high-accuracy hardness: Backurs, Indyk & Schmidt, NeurIPS 2017"
status: solved
confidence: high
verified: 2026-08-10
tags: [machine-learning, kernels, kde, fine-grained, seth]
---

## Statement

Kernel density evaluation (KDE) for the Gaussian kernel: given n source points
and n query points in R^d, compute for every query q the sum over sources x of
exp(-||q - x||^2), up to accuracy eps. This is the batch version — one shot, all
queries at once. The card: for dimension d = Theta(log n) and inverse-polynomial
accuracy, either give an n^{2-delta}-time algorithm in the regime where the point
set has squared diameter between omega(1) and the polynomial-method threshold, or
prove SETH-hardness there. In short, make the algorithm frontier and the hardness
frontier touch.

## Current record

Two frontiers that do not meet. Algorithms: the polynomial method (approximate
exp(-t) on the relevant interval by a low-degree polynomial, then evaluate via
fast rectangular matrix multiplication) gives almost-linear time when the squared
radius of the data is small — Aggarwal and Alman (CCC 2022) determined the
optimal degree for approximating exponentials, which pins exactly where this
technique dies. In genuinely low dimension (d constant or slowly growing), fast
multipole methods work instead, but they blow up exponentially in d. Hardness:
Backurs, Indyk and Schmidt (NeurIPS 2017) showed that many Gaussian-kernel
problems, KDE-type evaluation included, require n^{2-o(1)} time under SETH (the
Strong Exponential Time Hypothesis), via reduction from Bichromatic Hamming
Closest Pair — but the reduction needs superlogarithmic dimension and very high
accuracy. Between these regimes — moderate radius, d = Theta(log n), accuracy
eps = 1/poly(n) — neither a fast algorithm nor a lower bound was known when
this card was written.

## Resolution

The middle regime has been closed, on the hardness side. Alman and Guan
("Finer-Grained Hardness of Kernel Density Estimation", CCC 2024,
arXiv:2407.02372) refined the reduction to show, under SETH, that Gaussian KDE
in dimension m >= C log n with squared radius B requires n^{2-o(1)} time
whenever 1/eps > (m/B)^m C^m — meeting the Aggarwal–Alman polynomial-method
frontier (fast when 1/eps < (m/B)^{o(m)}) up to a low-order 2^{O(m)} factor in
1/eps. In particular, at B = Theta(log n) the hardness already bites at
inverse-polynomial accuracy. They also proved the first nontrivial lower
bounds in the genuinely low-dimensional regime m = o(log n), matching the fast
multipole method up to low-order terms. The algorithm and hardness frontiers
now touch, up to low-order factors, in all parameter regimes; what survives is
only the 2^{O(m)} slack in 1/eps — a sharpening exercise, not a missing-
hardness gap. Hence status: solved.

## Why it matters

Gaussian KDE is a primitive under kernel regression, kernel SVMs, and attention-
like computations; the same threshold phenomenon as in the attention card should
govern it. Closing the middle regime either produces a genuinely new algorithmic
technique beyond polynomial method + multipole, or a new SETH edge into the
statistics/ML cluster that other kernels (Laplacian, Student-t) could then
inherit by kernel-to-kernel reductions.

## Attack surface

(Written pre-resolution; kept for the record. Alman–Guan's actual route was an
analysis of the counting matrix via Schur polynomials, not the distributed-PCP
gadget suggested below.) On the hardness side, imitate the
Backurs–Indyk–Schmidt reduction but replace
the high-accuracy amplification with a distributed-PCP gadget (Rubinstein-style)
to survive at lower accuracy. On the algorithm side, try importing density-
constrained near-neighbor ideas (Charikar–Kapralov–Nouri–Siminelakis line) from
the query model into the batch model. Cheapest first experiment: the Laplacian
kernel exp(-||q - x||_1), where the polynomial-method threshold sits at a
different radius and the window may be thinner.
