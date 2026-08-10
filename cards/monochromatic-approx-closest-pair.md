---
id: monochromatic-approx-closest-pair
title: "Transfer Rubinstein's SETH-hardness of (1+eps)-approximate closest pair from the bichromatic case to the monochromatic case, or find a subquadratic algorithm"
genre: hardness-transfer
problems: ["Monochromatic Closest Pair", "Bichromatic Closest Pair", "Approximate Nearest Neighbor", "Orthogonal Vectors"]
hypotheses: [SETH]
record: "n^{2-Omega~(eps^{1/3})} time for (1+eps)-approximate closest pair via the polynomial method"
record_ref: "Alman, Chan & Williams, FOCS 2016"
hardness: "bichromatic version: for every delta > 0 there is eps > 0 with no n^{2-delta} algorithm for (1+eps)-approximation under SETH; monochromatic approximate version has no known conditional lower bound"
hardness_ref: "Rubinstein, STOC 2018"
status: open
confidence: medium
tags: [nearest-neighbor, geometry, fine-grained, seth, distributed-pcp]
---

## Statement

Closest pair: given n points in d-dimensional space (d = polylog(n), any of
Hamming, Euclidean, or ell_1 metrics), find a pair at approximately minimum
distance — output a pair whose distance is within a factor (1+eps) of the true
minimum. In the bichromatic version the points are colored red and blue and the
pair must be one of each; in the monochromatic version any pair counts. The
card: prove that (1+eps)-approximate monochromatic closest pair has no
n^{2-delta}-time algorithm for some constant eps > 0 assuming SETH (the Strong
Exponential Time Hypothesis) — or refute it with a truly subquadratic algorithm
for every constant eps.

## Current record

Rubinstein (STOC 2018) proved the bichromatic case hard: using "distributed
PCPs" — probabilistically checkable proofs built from communication protocols —
he showed that for every delta > 0 there is an eps > 0 such that a
n^{2-delta}-time (1+eps)-approximation would refute SETH. On the algorithms
side, Alman, Chan and Williams (FOCS 2016) gave a n^{2-Omega~(eps^{1/3})}-time
algorithm via probabilistic polynomial representations of threshold functions.
For the monochromatic case, Karthik C. S. and Manurangsi (ITCS 2019) transferred
hardness for the *exact* problem, and explicitly posed the approximate
monochromatic case as open. It still appears open; the obstruction is that
OV-style reductions naturally produce two-sided (red/blue) instances, and known
tricks for collapsing colors destroy the approximation gap.

## Why it matters

Approximate closest pair is the offline core of approximate nearest-neighbor
search, one of the most deployed geometric primitives in existence (vector
databases, embeddings retrieval). The bichromatic hardness already anchors the
attention and KDE cards; the monochromatic case is the version practitioners
actually run. A transfer here would also likely produce a reusable
"color-collapsing gadget" applicable across the fine-grained geometry cluster.
An algorithm would be even more surprising and would immediately propagate to
clustering-type subroutines.

## Attack surface

Template to imitate: Karthik–Manurangsi's exact-case transfer, which routes
through a balanced code-based embedding — the open question is a gap-preserving
version. Candidate gadgets: locally dense codes, or Rubinstein-style advice sets
arranged so that same-color near pairs are forced to be far. Special case to try
first: eps = o(1) shrinking with n (weaker than constant eps but already new),
or the ell_infinity metric where gaps behave more rigidly.
