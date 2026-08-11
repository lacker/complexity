---
id: bst-dynamic-optimality
title: "Beat O(log log n)-competitive for binary search trees — Tango trees have held the dynamic-optimality record since 2004, the conjecture says O(1)"
genre: improve-algorithm
problems: ["Binary Search Tree Access", "Dynamic Optimality"]
hypotheses: []
record: "O(log log n)-competitive online BST (Tango trees); splay trees and Greedy are only known to be O(log n)-competitive"
record_ref: "Demaine, Harmon, Iacono & Pătraşcu, SIAM J. Comput. 2007 (FOCS 2004)"
hardness: "no lower bound rules out an O(1)-competitive online BST; but any algorithm whose cost is charged to Wilber's alternation bound cannot beat Θ(log log n)"
hardness_ref: "Lecomte & Weinstein, ESA 2020 (arXiv:1912.02858); Tango-optimality-within-the-alternation-bound: ISAAC 2024 (arXiv:2411.14387)"
status: open
confidence: high
verified: 2026-08-10
tags: [data-structures, bst, splay-trees, competitive-analysis, wilber-bounds, classic]
---

## Statement

In the standard binary search tree model (unit cost per node touched, rotations allowed), let OPT(X) be the cost of the best offline BST execution of access sequence X. An online BST algorithm is c-competitive if it costs at most c · OPT(X) + O(n) on every X. The dynamic optimality conjecture (Sleator & Tarjan 1985) asserts splay trees are O(1)-competitive. The record to beat: exhibit any online BST algorithm that is o(log log n)-competitive — or prove any super-constant lower bound against a specific candidate like Greedy.

## Current record

Tango trees (Demaine, Harmon, Iacono, Pătraşcu, FOCS 2004) are O(log log n)-competitive, the first improvement over the trivial O(log n); multi-splay trees (Wang, Derryberry, Sleator, SODA 2006) and zipper trees match the ratio while adding splay-like properties. The ratio has not moved in over twenty years. Both conjectured-optimal algorithms — splay trees and Greedy (Demaine, Harmon, Iacono, Kane, Pătraşcu, SODA 2009) — are still only known to be O(log n)-competitive. All o(log n)-competitive algorithms charge against Wilber's alternation bound, and that route is now provably closed: Lecomte and Weinstein (ESA 2020) showed the alternation bound can be Θ(log log n) below OPT, and a direct-sum amplification (ISAAC 2024, arXiv:2411.14387) shows Tango trees are essentially optimal among algorithms certified by it. Progress continues on restricted inputs — pattern-avoiding sequences cost n · 2^{α(n)^{O(1)}} for Greedy (Chalermsook, Goswami, Kozma, Mehlhorn, Saranurak, FOCS 2015), and the multi-finger/group-access-bound line (Demaine, Iacono, Koumoutsos, Langerman, ISAAC 2018; Chalermsook et al., ICALP 2024, arXiv:2312.15426) keeps strengthening the corollary properties — but the general ratio is stuck.

## Why it matters

Honestly a node update, not a web edge: no fine-grained hypothesis hangs on it. But the BST model is a hub of the comparison world — Wilber-type bounds are the model's decision-tree lower bounds, the offline problem connects to the k-server problem via multi-finger reductions, and dynamic optimality is arguably the most famous open problem in data structures. Any improvement necessarily produces a new efficiently-computable lower bound on OPT that dominates the alternation bound, a tool with independent uses.

## Attack surface

(1) The funnel (Wilber II) bound: Lecomte–Weinstein showed it dominates the alternation bound; nobody has built an online algorithm charged to it — this is the designated next step. (2) Prove Greedy is O(f(n))-competitive for any f = o(log n); Greedy's geometric (point-set) reformulation makes this a clean combinatorial problem. (3) The independent-rectangle bound is within O(1) of OPT or not — settling whether known lower bounds are tight is a prerequisite question a search could attack on small instances by brute force.
