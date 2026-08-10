---
id: sorting-x-plus-y
title: "Sort X+Y in o(n^2 log n) time — Fredman showed O(n^2) comparisons suffice, but no algorithm realizes it"
genre: improve-algorithm
problems: ["Sorting X+Y", "3SUM", "Min-Plus Convolution"]
hypotheses: []
record: "O(n^2 log n) time by sorting the n^2 sums naively; nonuniformly, O(n^2) comparisons suffice"
record_ref: "folklore upper bound; comparison bound by Fredman, Theoretical Computer Science 1976"
hardness: "Ω(n^2) trivially (output size); no superquadratic conditional lower bound known"
hardness_ref: "—"
status: open
confidence: high
verified: 2026-08-10
tags: [x-plus-y, sorting, decision-trees, geometry-adjacent, classic]
---

## Statement

Given two sets X and Y of n real numbers each, output the n^2 pairwise sums x + y in sorted order. The naive algorithm forms all n^2 sums and sorts them in O(n^2 log n) time. The challenge: sort X+Y in o(n^2 log n) time — even O(n^2 log n / log log n) would be news — or prove a conditional lower bound explaining fifty years of failure.

## Current record

Fredman (TCS 1976) proved that the *number of comparisons* needed is only O(n^2): the set of realizable orderings of X+Y is so structured (it is governed by the arrangement of hyperplanes x_i + y_j = x_k + y_l in 2n dimensions) that information-theoretically, n^2 comparisons pin down the order. But his argument is nonconstructive — deciding *which* comparison to make next is the expensive part — and no genuine o(n^2 log n)-time algorithm has ever been found. This is Problem 41 in the Demaine–Mitchell–O'Rourke Open Problems Project and dates to a 1975 question of Fredman (often attributed also to Elwyn Berlekamp). Related structured problems did fall: selecting the k-th smallest element of X+Y takes O(n) time (Frederickson & Johnson, JCSS 1982), and modern linear-decision-tree machinery (Kane, Lovett & Moran, STOC 2018) recovers cheap nonuniform bounds for the related k-SUM decision problems — yet none of it converts into a faster uniform sorting algorithm.

## Why it matters

Sorting X+Y is the granddaddy of the "nonuniform-easy, uniform-stuck" phenomenon that also afflicts 3SUM and APSP decision trees, and it is entangled with the fine-grained web at several points: sorted X+Y order is closely tied to (min,+)-convolution (whose output is the minimum along each anti-diagonal of the X+Y table) and to Convolution-3SUM, and X+Y sorting has long served as the suspected bottleneck for several geometric and scheduling problems in the quadratic regime. A o(n^2 log n) algorithm would be an instant classic; conversely, a reduction showing that beating n^2 log n implies a breakthrough for 3SUM or (min,+)-convolution would finally give the fifty-year failure a name.

## Attack surface

(1) Word-RAM cheat: for integer inputs, radix-style techniques give o(n^2 log n); the open problem is really about the comparison/real-RAM setting, so any attack must exploit structure, not bit tricks — clarifying exactly which models the question is open in is itself worthwhile bookkeeping. (2) Fredman's proof shows few comparisons suffice *after* the right preprocessing order is known; derandomizing this via ε-cuttings of the hyperplane arrangement is the standard stalled approach — recent progress on decision-tree constructivization (Kane–Lovett–Moran; Cardinal et al., ESA 2016 line) is the freshest toolbox nobody has fully applied. (3) Prove a conditional lower bound: reduce (min,+)-convolution or Convolution-3SUM to sorting X+Y with only polylog overhead.

## Verification notes

An April 2025 single-author preprint (Mundhra, arXiv:2504.16393, "An Explicit
and Efficient O(n^2)-Time Algorithm for Sorting Sumsets") claims a
comparison-based O(n^2)-time algorithm, which would close this card. As of
2026-08-10 the preprint has one arXiv version, no peer-reviewed venue, no
independent verification or citation by the fine-grained community, and its
stated technique (amortized constant-comparison insertion via sumset-matrix
monotonicity) makes a claim that decades of work on exactly this structure
failed to realize. The card stays open pending peer review; treat the claim as
unverified.
