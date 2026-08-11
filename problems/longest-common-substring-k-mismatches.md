---
id: longest-common-substring-k-mismatches
title: "Beat O(n log^{k-1/2} n) for longest common substring with k mismatches — half a log was shaved in 2021, the SETH wall starts at k = log n"
genre: improve-algorithm
problems: ["Longest Common Substring with k Mismatches", "Orthogonal Vectors"]
hypotheses: [SETH, OV]
record: "O(n log^{k-1/2} n) time and O(n) space for any constant k, independent of alphabet size"
record_ref: "Charalampopoulos, Kociumaka, Pissis & Radoszewski, ESA 2021 (arXiv:2105.03106)"
hardness: "no O(n^{2-eps}) algorithm for k = Omega(log n), even on binary alphabet, unless SETH fails; also no strongly subquadratic (2-eps)-approximation of the length"
hardness_ref: "Kociumaka, Radoszewski & Starikovskaya, Algorithmica 81(6), 2019 (arXiv:1712.08573)"
status: open
confidence: high
verified: 2026-08-10
tags: [strings, fine-grained, seth, mismatches, log-shaving, lsh]
---

## Statement

Given two strings of length n and an integer k, find the longest substring of
one that occurs in the other with at most k Hamming mismatches. (This is
longest common *substring* — contiguous — not the subsequence problem that
shares the acronym.) For constant k, beat the record O(n log^{k-1/2} n):
shave more log factors, or ideally give an algorithm like 2^{O(k)} n polylog(n)
whose degradation in k smoothly meets the known quadratic wall at k ≈ log n.
Alternatively, strengthen the wall: extend SETH-hardness below k = Θ(log n).

## Current record

Exact matching (k = 0) is a classic linear-time suffix-tree exercise, but it is
brittle: one corrupted character can halve the answer, which is why the
k-mismatch version matters for biosequence comparison. Flouri, Giaquinta,
Kobert, and Ukkonen solved k = 1 in O(n log n); Thankachan, Apostolico, and
Aluru reached O(n log^k n) for any constant k via a recursive heavy-path
technique descending from Cole–Gottlieb–Lewenstein's k-errata trees, and that
log^k n stack was long seen as a natural barrier. Charalampopoulos, Kociumaka,
Pissis, and Radoszewski (ESA 2021) broke it by exactly half a log, getting
O(n log^{k-1/2} n) time and linear space for any constant k, over any
alphabet. On the other side, Kociumaka, Radoszewski, and Starikovskaya
(Algorithmica 2019) reduced Orthogonal Vectors to the problem: for
k = Ω(log n) a strongly subquadratic algorithm refutes SETH, already on
binary strings. They also showed a strongly subquadratic 2-approximation for
the length exists, that (2 − eps) is SETH-hard, and that relaxing to
"approximately k mismatches" (allowing (1 + eps)k) admits strongly
subquadratic algorithms via locality-sensitive hashing. Between constant k and
log n, the best known is an Abboud–Williams–Yu-style polynomial-method
algorithm with savings of the form 2^{Ω(sqrt((log n)/k))}.

## Why it matters

This is one of the cleanest places where a polylog-per-parameter upper bound
collides with a genuine SETH wall at a specific parameter value. Whatever the
truth is between n·2^{O(k)} and n log^k n, it will say something structural
about how Hamming-distance constraints compose with suffix structure — and the
half-log shave shows the old barrier was an artifact of the recursion, not the
problem. Any further shave is immediately publishable; a smooth
2^{O(k)}-type bound would essentially finish the problem, matching the wall.

## Attack surface

The 2021 half-log came from replacing one level of the Cole-style recursion
with a different combinatorial gadget; the obvious question is whether more
levels can be flattened — nobody has proved the remaining log^{k-1/2} stack
necessary. Concrete bites: (1) improve k = 2 below n log^{1.5} n as the
smallest open case; (2) hybridize the LSH machinery (which handles large k
approximately) with exact suffix-tree recursion to trade logs for 2^{O(k)}
factors; (3) on the hardness side, adapt the binary OV gadgets to k = o(log n)
or prove a Four-Russians-style matching upper bound there instead.
