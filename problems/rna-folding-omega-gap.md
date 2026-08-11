---
id: rna-folding-omega-gap
title: "RNA folding and Dyck edit distance: record ~O(n^{2.687}) via bounded-difference min-plus vs the n^omega clique barrier — close the gap"
genre: improve-algorithm
problems: ["RNA Folding", "Dyck Edit Distance", "Language Edit Distance", "Min-Plus Product", "k-Clique"]
hypotheses: [k-Clique, BMM]
record: "~O(n^{(3+omega)/2}) time (about O(n^{2.687}) with current omega)"
record_ref: "Chi, Duan, Xie & Zhang, STOC 2022 (min-plus product for monotone/bounded-difference instances), plugged into the framework of Bringmann, Grandoni, Saha & Vassilevska Williams, FOCS 2016"
hardness: "an O(n^{omega - eps}) algorithm would give faster k-Clique detection; no truly subcubic combinatorial algorithm unless combinatorial BMM/k-Clique falls"
hardness_ref: "Abboud, Backurs & Vassilevska Williams, FOCS 2015"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [strings, rna-folding, dyck, min-plus, clique, matrix-multiplication]
---

## Statement

RNA folding asks: given a sequence over an alphabet with a pairing relation
(A-U, C-G), find the maximum number of non-crossing pairings — the classic
Nussinov dynamic program. Dyck edit distance asks for the minimum number of
edits making a string of parentheses well-balanced; language edit distance
generalizes both to any context-free language. All are cubic-time DPs that
were dragged below n^3 by structured min-plus matrix products. Close the
remaining exponent gap: compute RNA folding (or Dyck edit distance) in
O(n^omega) time — where omega < 2.372 is the matrix multiplication
exponent — or push the conditional lower bound above n^omega.

## Current record

Bringmann, Grandoni, Saha, and Vassilevska Williams (FOCS 2016) gave the
first truly subcubic algorithms (about O(n^{2.8244})) by showing the DP
bottleneck is a min-plus product of matrices with bounded differences —
adjacent entries differ by O(1) — and that such products beat cubic time.
Chi, Duan, Xie, and Zhang (STOC 2022) then solved bounded-difference
min-plus in ~O(n^{(3+omega)/2}) ≈ O(n^{2.687}), which is the current record
for this whole problem family. On the hardness side, Abboud, Backurs, and
Vassilevska Williams (FOCS 2015) reduced k-Clique to these problems: beating
n^omega would improve longstanding clique-detection records, and any
subcubic *combinatorial* algorithm would break combinatorial Boolean matrix
multiplication. The gap is n^{2.687} vs the n^{2.372} barrier.

## Why it matters

This is the cleanest live example of the "structured min-plus" program: the
question of whether bounded-difference min-plus product can be done in
O(n^{(3+omega)/2 - eps}) or even O(n^omega) is a central open problem in
algebraic algorithms, and RNA folding is its marquee application. An
O(n^omega) RNA folding algorithm would make the clique-based lower bound
tight, completing a rare matching pair at an exotic exponent. Progress also
flows to CFG parsing (Valiant's parser), stochastic grammars, and — through
monotone variants of the same products — to unweighted tree edit distance,
which was brought to the very same ~O(n^{(3+omega)/2}) exponent at STOC 2025
(arXiv:2411.06502). And RNA secondary structure prediction is a real computational
biology workload, not a toy.

## Attack surface

The entire algorithmic frontier is the min-plus subroutine: Chi–Duan–Xie–
Zhang's method mixes algebraic (polynomial-multiplication) handling of
"regular" entries with combinatorial correction of few "irregular" ones; the
known slack is in the balance between the two phases, and any better trade
gives a new record here mechanically. Special cases to try first: Dyck edit
distance with a bounded number of edit types, RNA folding over binary
pairing rules, or approximation — Das, Kociumaka, and Saha (ICALP 2022,
arXiv:2112.05866) gave the first constant-factor approximation for Dyck
edit distance in subquadratic Õ(n^{1.971}) time, so the exact-vs-approximate
boundary is well-populated with intermediate questions. For hardness, the
open move is a reduction showing bounded-difference min-plus itself is
needed — i.e., an equivalence between RNA folding and the min-plus product
class, not just a one-way use of it.
