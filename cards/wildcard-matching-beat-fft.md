---
id: wildcard-matching-beat-fft
title: "Wildcard pattern matching runs in O(n log m) via FFT with no lower bound at all — beat it, or prove it equivalent to Boolean convolution"
genre: missing-hardness
problems: ["String Matching with Wildcards", "Boolean Convolution"]
hypotheses: []
record: "O(n log m) deterministic time"
record_ref: "Clifford & Clifford, IPL 2007 (simplifying Cole & Hariharan, STOC 2002; original O(n log m log sigma) by Fischer & Paterson, 1974)"
hardness: "none known — not even a super-linear conditional lower bound"
hardness_ref: "n/a"
status: open
confidence: high
tags: [strings, pattern-matching, fft, convolution, missing-hardness]
---

## Statement

In pattern matching with wildcards (don't-cares), a text of length n and a
pattern of length m may both contain a special symbol "*" that matches any
character; report all alignments where the pattern matches. Every known
efficient algorithm routes through the Fast Fourier Transform. Close this
card in either direction: (a) find an o(n log m) algorithm — even
randomized, even for binary alphabet plus wildcard — or (b) prove a
fine-grained equivalence between wildcard matching and Boolean convolution
(equivalently, convolution-shaped products), so that the log factor is
explained by a recognized barrier.

## Current record

Fischer and Paterson (1974) observed that wildcard matching reduces to a
constant number of convolutions, giving O(n log m log sigma) for alphabet
size sigma. Cole and Hariharan (STOC 2002) removed the alphabet dependence
with a randomized O(n log n) algorithm, and Clifford and Clifford (IPL 2007)
gave a strikingly simple deterministic O(n log m) algorithm using three
integer convolutions of coded characters. That bound has not moved since.
In the other direction there is nothing: no reduction from convolution to
wildcard matching, no conditional super-linear lower bound, and no barrier
result. The problem could, for all anyone has proven, be solvable in O(n)
time.

## Why it matters

This is the cleanest representative of the "FFT-shaped" complexity class:
a family of problems (wildcard matching, cross-correlation, text-to-pattern
Hamming distance approximations, sparse convolution applications) whose
records all equal one convolution and whose lower bounds all equal nothing.
A reduction from Boolean convolution to wildcard matching would create a
new equivalence cluster in the reduction web, giving dozens of problems a
shared fate, and would be a model for "explaining" log factors — a
missing genre of fine-grained result, since current hypotheses (SETH, 3SUM,
APSP) only speak at polynomial granularity. An o(n log m) algorithm would
be even more shocking: it would likely need to bypass FFT for a
convolution-like task, with consequences for the whole cluster.

## Attack surface

For the equivalence direction: wildcard matching over alphabet {0,1} with
wildcards only in the pattern already computes, at each alignment, whether a
certain AND-of-ORs is satisfied — massaging Boolean convolution
(computing, for each shift, whether any pair of 1s aligns) into this form
is the concrete gadget hunt, and partial results for restricted wildcard
budgets would count. Related template: the known equivalences around
(min,+)-convolution show what a "convolution class" statement looks like.
For the algorithmic direction, the structured special cases are the wedge:
few wildcards (k wildcards admit O(n log k)-type bounds via subtler
methods), clustered wildcards, or bounded alphabet — any regime where
O(n log m) can be beaten sharpens intuition for whether the general log is
real. A word-RAM result exploiting bit-packing to get O(n log m / log log n)
would already close this card as stated.
