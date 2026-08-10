---
id: binary-jumbled-indexing
title: "Binary jumbled indexing: beat Õ(n^{1.5}) preprocessing or prove it 3SUM-hard"
genre: missing-hardness
problems: ["Jumbled Indexing", "Histogram Indexing", "3SUM"]
hypotheses: [3SUM]
record: "Õ(n^{1.5}) randomized (n^{1.5+o(1)} deterministic) preprocessing with fast queries, binary alphabet, via bounded monotone (min,+)-convolution"
record_ref: "Chi, Duan, Xie & Zhang, STOC 2022 (arXiv:2204.04500); deterministic: Jin, Park, Saha & Xu, 2026 (arXiv:2605.07150)"
hardness: "3SUM-based preprocessing/query lower bounds known for alphabets of size 3 and up (strengthening as the alphabet grows); nothing nontrivial known for binary"
hardness_ref: "Amir, Chan, Lewenstein & Lewenstein, ICALP 2014"
status: open
confidence: high
verified: 2026-08-10
tags: [3sum, strings, indexing, additive-combinatorics]
---

## Statement

Jumbled indexing (also called histogram indexing): preprocess a string S of length n so that, given a query histogram (how many of each character), you can report whether some substring of S has exactly that character content — order ignored. For the binary alphabet: either (a) beat the current Õ(n^{1.5}) preprocessing time (target: n^{1+o(1)}), or (b) prove a conditional lower bound — e.g. that binary jumbled indexing with O(n^{2-eps}) preprocessing and truly sublinear query time would refute the 3SUM conjecture.

## Current record

For binary alphabets the problem has special structure: for each substring length L, the set of achievable 1-counts is a contiguous interval, so storing the min and max count per length gives O(1)-ish queries after naive O(n^2) preprocessing. Chan and Lewenstein (STOC 2015) used the Balog–Szemerédi–Gowers theorem from additive combinatorics to compute the index in about O(n^{1.859}) randomized time (O(n^{1.864}) deterministic). That was superseded: the per-length min/max 1-counts are exactly (min,+)-convolutions of the prefix-sum sequence (which is monotone with entries in [0, n]), and Chi, Duan, Xie and Zhang (STOC 2022, arXiv:2204.04500) gave an Õ(n^{1.5})-time randomized algorithm for bounded monotone (min,+)-convolution, making Õ(n^{1.5}) the current record. Jin, Park, Saha and Xu (arXiv:2605.07150, 2026) derandomized this to n^{1.5+o(1)}, explicitly listing binary jumbled indexing among the applications. On the hardness side, Amir, Chan, Lewenstein and Lewenstein (ICALP 2014) showed 3SUM-hardness of jumbled indexing for alphabets of size at least 3, with bounds that strengthen as the alphabet grows (for super-constant alphabets, essentially quadratic preprocessing is needed unless 3SUM fails). Their reduction fundamentally needs three or more characters, and no nontrivial conditional lower bound is known for the binary case. The gap: upper n^{1.5}, lower nothing.

## Why it matters

This is the cleanest known instance where 3SUM-hardness provably kicks in at alphabet size 3 while alphabet size 2 escapes — mapping exactly where the boundary lies would sharpen our understanding of what 3SUM-hardness can and cannot reach. The binary case is now pinned to bounded monotone (min,+)-convolution, a structured special case of MinConv that also governs knapsack, Pareto sums, RNA folding and language edit distance; moving the n^{1.5} exponent in either direction would move all of those at once. (The Chan–Lewenstein BSG framework, "clustered 3SUM", remains one of the few algorithmic uses of additive combinatorics in fine-grained complexity, and BSG-style ideas persist in the newer algorithms.)

## Attack surface

Algorithmic side: the target is now bounded monotone (min,+)-convolution below n^{1.5}; that exponent is a natural-looking but unexplained resting point, with no matching conditional lower bound known for the monotone case either. The interval structure of the binary case is not fully exploited — the min/max count functions are Lipschitz (they change by at most 1 per length step), which smells like it should admit further compression. Hardness side: a reduction would need to encode 3SUM-style additive constraints using only two symbols, where substring histograms are determined by (length, 1-count) pairs — a direct port of the ICALP 2014 gadgets provably loses the third degree of freedom, so a genuinely new encoding (perhaps via convolution-flavored intermediates) is required.
