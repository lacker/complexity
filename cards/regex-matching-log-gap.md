---
id: regex-matching-log-gap
title: "Regular expression matching: beat the ~O(nm / log^{1.5} n) record, with SETH forbidding (nm)^{1-eps}"
genre: improve-algorithm
problems: ["Regular Expression Matching", "Orthogonal Vectors"]
hypotheses: [SETH, OV]
record: "O(nm log log n / log^{1.5} n) time"
record_ref: "Bille & Thorup, ICALP 2009 (improving Myers' O(nm / log n), JACM 1992)"
hardness: "no O((nm)^{1-eps}) algorithm unless SETH fails"
hardness_ref: "Backurs & Indyk, FOCS 2016"
status: open
confidence: high
verified: 2026-08-10
tags: [strings, regex, fine-grained, seth, log-shaving]
---

## Statement

Given a text of length n and a regular expression of size m, decide whether
the text (or some substring) matches. The classical Thompson NFA simulation
runs in O(nm). Beat the current polylog-shaved record — concretely, achieve
O(nm / log^2 n) or better — or prove that some restricted but natural class
of algorithms cannot. A second open front: complete the fine-grained
classification of *which* regex pattern classes admit truly subquadratic
(in nm) algorithms, in regimes not covered by the known dichotomies.

## Current record

Thompson (1968) gave O(nm) via NFA simulation. Myers (JACM 1992) applied
Four-Russians tabulation to the NFA transition function to get O(nm / log n),
and Bille and Thorup (ICALP 2009) sharpened the tabulation to roughly
O(nm / log^{1.5} n). On the hardness side, Backurs and Indyk (FOCS 2016)
showed that general regex matching has no (nm)^{1-eps} algorithm unless SETH
fails, and began classifying bounded-depth patterns into "near-linear" vs
"SETH-quadratic-hard"; Bringmann, Grønlund, and Larsen (FOCS 2017) completed
a dichotomy for bounded-depth homogeneous pattern classes and improved Word
Break to about O(n m^{1/3}). What remains: the polylog corridor for general
patterns (log^{1.5} vs log^2 vs more), and classification questions outside
the homogeneous bounded-depth setting.

## Why it matters

Regex matching is among the most-executed algorithms on earth (grep, network
intrusion detection, log processing, DNA motif search), so log-factor records
here have unusual real-world reach. Structurally, regex matching is the
automata-theoretic sibling of edit distance: the same Four-Russians machinery
holds the record, and the same SETH wall blocks polynomial improvement — but
the record here (log^{1.5}) lags strings (log^2), so there is a concrete,
plausibly-reachable target. The dichotomy program also makes this a model
card for "hardness classification": each newly classified pattern class adds
edges to the reduction web, and unclassified classes are candidate sources of
surprising algorithms.

## Attack surface

(1) The gap between log^{1.5} and log^2 is a tabulation-engineering question:
Bille–Thorup lose a sqrt(log) because NFA states, unlike DP grid cells, carry
non-local dependencies through epsilon-transitions; decomposing the NFA into
better-separable modules is the direct attack. (2) Word-RAM bit-parallelism
(Shift-Or / Bille's bit-coded automata) gives O(nm / w); hybridizing with
tabulation, as attempted for edit distance, is open here too. (3) For
classification: pick a concrete unresolved pattern family — e.g., depth-4
combinations mixing concatenation, union, Kleene star, and plus — and settle
it by either a near-linear algorithm or an OV reduction imitating the
Backurs–Indyk gadgets. (4) Word Break's odd exponent (m^{1/3}) already has a
matching conditional lower bound for *combinatorial* algorithms
(Bringmann–Grønlund–Larsen), so the open moves are an algebraic algorithm
beating m^{1/3} or a lower bound without the combinatorial restriction;
either result would be a clean standalone paper.
