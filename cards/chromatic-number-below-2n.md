---
id: chromatic-number-below-2n
title: "Compute the chromatic number in O((2-ε)^n) time — break the 2^n inclusion-exclusion barrier"
genre: improve-algorithm
problems: ["Graph Coloring", "Chromatic Number", "Set Partition"]
hypotheses: [ETH, SCC]
record: "2^n · poly(n) time"
record_ref: "Björklund, Husfeldt & Koivisto, SICOMP 2009 (announced FOCS 2006)"
hardness: "no 2^{o(n)} algorithm unless ETH fails"
hardness_ref: "Impagliazzo, Paturi & Zane, JCSS 2001"
status: open
confidence: high
tags: [graphs, coloring, inclusion-exclusion, subset-convolution, exponential-time]
---

## Statement

Give an algorithm computing the chromatic number of an arbitrary n-vertex
graph — the minimum number of colors needed so adjacent vertices get
different colors — in time O((2-ε)^n) for some fixed ε > 0. Equivalently,
break the 2^n barrier for k-coloring simultaneously for all k. The question
is open even for k = 7 on general graphs.

## Current record

Björklund, Husfeldt and Koivisto (FOCS 2006; SICOMP 2009) solved chromatic
number in 2^n · poly(n) time via inclusion-exclusion: k-colorability is
rephrased as covering the vertex set by k independent sets, and the number
of such covers is a signed sum, over all 2^n vertex subsets, of quantities
computable in polynomial time each. This was a breakthrough over the
previous ~2.4^n dynamic programming, and 2^n is a natural information-
theoretic-feeling wall: the algorithm inspects every subset once. For small
k better bases are known — 3-coloring in O(1.3289^n) (Beigel–Eppstein,
J. Algorithms 2005), 4-coloring in O(1.7272^n) (Fomin–Gaspers–Saurabh) —
and Zamir (ICALP 2021) broke the 2^n barrier for 5-coloring and 6-coloring
and for k-coloring of graphs of bounded average degree. For general k on
general graphs, 2^n stands. No known hypothesis rules out (2-ε)^n; the
related Set Cover Conjecture asserts the analogous barrier for Set Cover.

## Why it matters

Chromatic number is the flagship of the "2^n club": problems solved by
subset dynamic programming or inclusion-exclusion where the base 2 looks
like an artifact of enumerating subsets rather than a true complexity. A
(2-ε)^n algorithm would be a major structural surprise, would likely
introduce a technique bypassing subset enumeration wholesale, and would
put pressure on the Set Cover Conjecture (coloring is a set-partition
problem, the covering cousin of set cover). Zamir's partial break shows the
wall is not information-theoretic — which makes the general case a live
target rather than a folklore impossibility.

## Attack surface

(1) Extend Zamir: his approach exploits that bounded-degree graphs have
either structure to compress or large independent sets to peel; the open
frontier is k = 7 and unbounded degree — understand exactly where the
argument loses. (2) Algebraic route: the 2^n algorithm computes a covering
product / subset convolution; any representation of the independent-set
indicator vector admitting faster transforms (à la fast zeta/Möbius with
sparsity) would shave the base. (3) Reverse direction: derive
(2-ε)^n-hardness of chromatic number from the Set Cover Conjecture or SETH
— even that reduction is currently missing, and finding it would also be a
publishable closure of this card (as a hardness edge rather than an
algorithm).
