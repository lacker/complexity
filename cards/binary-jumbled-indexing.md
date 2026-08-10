---
id: binary-jumbled-indexing
title: "Binary jumbled indexing: beat O(n^{1.859}) preprocessing or prove it 3SUM-hard"
genre: missing-hardness
problems: ["Jumbled Indexing", "Histogram Indexing", "3SUM"]
hypotheses: [3SUM]
record: "O(n^{1.859}) randomized (O(n^{1.864}) deterministic) preprocessing with fast queries, binary alphabet"
record_ref: "Chan & Lewenstein, STOC 2015"
hardness: "3SUM-based preprocessing/query lower bounds known for alphabets of size 3 and up (strengthening as the alphabet grows); nothing nontrivial known for binary"
hardness_ref: "Amir, Chan, Lewenstein & Lewenstein, ICALP 2014"
status: open
confidence: medium
tags: [3sum, strings, indexing, additive-combinatorics]
---

## Statement

Jumbled indexing (also called histogram indexing): preprocess a string S of length n so that, given a query histogram (how many of each character), you can report whether some substring of S has exactly that character content — order ignored. For the binary alphabet: either (a) beat Chan and Lewenstein's roughly O(n^{1.859}) preprocessing time (targets: n^{1.5}, or even n^{1+o(1)}), or (b) prove a conditional lower bound — e.g. that binary jumbled indexing with O(n^{2-eps}) preprocessing and truly sublinear query time would refute the 3SUM conjecture.

## Current record

For binary alphabets the problem has special structure: for each substring length L, the set of achievable 1-counts is a contiguous interval, so storing the min and max count per length gives O(1)-ish queries after naive O(n^2) preprocessing. A sequence of improvements culminated in Chan and Lewenstein (STOC 2015), who used the Balog–Szemerédi–Gowers theorem from additive combinatorics to compute the index in about O(n^{1.859}) randomized time (about O(n^{1.864}) deterministic). On the hardness side, Amir, Chan, Lewenstein and Lewenstein (ICALP 2014) showed 3SUM-hardness of jumbled indexing for alphabets of size at least 3, with bounds that strengthen as the alphabet grows (for super-constant alphabets, essentially quadratic preprocessing is needed unless 3SUM fails). Their reduction fundamentally needs three or more characters, and no nontrivial conditional lower bound is known for the binary case. The gap: upper n^{1.859}, lower nothing.

## Why it matters

This is the cleanest known instance where 3SUM-hardness provably kicks in at alphabet size 3 while alphabet size 2 escapes via additive combinatorics — mapping exactly where the boundary lies would sharpen our understanding of what 3SUM-hardness can and cannot reach. The Chan–Lewenstein BSG-based framework ("clustered 3SUM") is also one of the few algorithmic uses of additive combinatorics in fine-grained complexity; improving the binary bound would likely mean improving that framework, with applications to other clustered-input problems.

## Attack surface

Algorithmic side: the n^{1.859}-type exponent comes from balancing BSG cover computations against brute force; any improvement to constructive BSG covers or to energy-decrement arguments moves the exponent. The interval structure of the binary case is not fully exploited — the min/max count functions are Lipschitz (they change by at most 1 per length step), which smells like it should admit further compression. Hardness side: a reduction would need to encode 3SUM-style additive constraints using only two symbols, where substring histograms are determined by (length, 1-count) pairs — a direct port of the ICALP 2014 gadgets provably loses the third degree of freedom, so a genuinely new encoding (perhaps via convolution-flavored intermediates) is required.
