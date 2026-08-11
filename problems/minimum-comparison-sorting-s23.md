---
id: minimum-comparison-sorting-s23
title: "Determine S(23), the minimum comparisons to sort 23 elements: it is 75 or 76 — the smallest open case of minimum-comparison sorting"
genre: improve-algorithm
problems: ["Sorting", "Minimum-Comparison Sorting"]
hypotheses: []
record: "S(n) known exactly for all n ≤ 22; smallest open case is S(23) ∈ {75, 76} (Ford–Johnson gives 76, counting gives ≥ 75)"
record_ref: "Stober & Weiß, ALENEX 2023 (arXiv:2206.05597), which settled S(16)=46, S(17)=50, S(18)=54; earlier values by Wells 1965, Kasai–Sawato–Iwata 1994, Peczarski (Algorithmica 2004; IPL 2007; Acta Univ. Sapientiae 2012)"
hardness: "information-theoretic: S(23) ≥ ⌈log₂ 23!⌉ = 75; all stronger lower bounds to date come from exhaustive poset search"
hardness_ref: "counting bound folklore; poset-search methodology: Wells 1965; Peczarski 2002–2012; Stober & Weiß, ALENEX 2023"
status: open
confidence: high
verified: 2026-08-10
tags: [sorting, comparison-model, exact-constants, machine-checkable, classic]
---

## Statement

Let S(n) be the minimum number of comparisons that suffice to sort n elements in the worst case. Determine S(23). The information-theoretic bound gives S(23) ≥ ⌈log₂ 23!⌉ = 75; the Ford–Johnson (merge-insertion) algorithm of 1959 gives S(23) ≤ F(23) = 76. Either find a 75-comparison sorting procedure for 23 elements or prove that none exists. Same question for n = 24 (80 or 81) and onward — after Stober–Weiß, n = 23 is the smallest n where S(n) is unknown.

## Current record

S(n) is now known exactly for every n ≤ 22. The hard cases all fell to exhaustive computer search over posets: Wells (1965) proved S(12) = 30 > ⌈log₂ 12!⌉; Kasai, Sawato and Iwata (1994) got S(13) = 34; Peczarski proved S(14), S(15), S(22) and related values (Algorithmica 2004; IPL 2007; Acta Univ. Sapientiae 2012), with S(15) and S(19) also computed on the Nankai Stars supercomputer in 2007; and Stober and Weiß (ALENEX 2023) closed the last gaps below 23, proving S(16) = 46 (disproving Knuth's conjecture that S(16) = 45), S(17) = 50, S(18) = 54, plus S(28) ≥ 99. In every decided case with C(n) < F(n), Ford–Johnson won. Whether Ford–Johnson is optimal for all n < 47 is open; it is provably not optimal at n = 47, where Schulte Mönting (TCS 1981) merged his way to S(47) ≤ 200 < F(47) = 201, and Manacher (JACM 1979) showed F(n) > S(n) infinitely often. Peczarski (IPL 2007) showed no split-and-merge algorithm beats Ford–Johnson below 47.

## Why it matters

A node update in the comparison-model hub, not a reduction edge — but the purest one there is: sorting is the original decision-tree problem, and S(n) is the ground truth that every asymptotic sorting bound coarsens. The n = 23 case is also a referendum on the 65-year-old Ford–Johnson algorithm: a 75-comparison procedure would be the first time it loses below 47.

## Attack surface

This problem is machine-checkable end to end. Stober–Weiß's lower bounds came from bidirectional search over sortable posets with efficiency pruning, run on two 12-core Xeons with 768 GB RAM; their paper reports the search-space sizes, and the code is public. Deciding "is 23 sortable in 75?" is a well-defined finite search — the obstacles are memory (poset canonization dominates) and the 87%-style prunings that made n = 18 feasible. Concrete routes: (1) push their bidirectional search to n = 23 with better poset hashing or GPU/SAT hybrids; (2) attack the upper bound instead — search for a 75-comparison strategy directly, seeded by Ford–Johnson's first moves, since any witness is a checkable decision tree; (3) improve the general lower-bound technique (linear-extension counting beyond bare efficiency), which would also tighten S(24)–S(28).
