---
id: directed-k-path-below-2k
title: "Find a directed k-path faster than O*(2^k) — match the undirected 1.657^k"
genre: improve-algorithm
problems: ["k-Path", "Longest Path", "Hamiltonicity"]
hypotheses: [ETH, SETH]
record: "O*(2^k) randomized for directed k-Path; O*(1.657^k) randomized for undirected"
record_ref: "Williams, IPL 2009 (directed, via Koutis's group-algebra technique, ICALP 2008); Björklund, Husfeldt, Kaski & Koivisto, JCSS 2017 (undirected narrow sieves)"
hardness: "no 2^{o(k)} · poly(n) algorithm unless ETH fails"
hardness_ref: "Impagliazzo, Paturi & Zane, JCSS 2001 (via standard Hamiltonicity reductions)"
status: open
confidence: high
tags: [parameterized, k-path, algebraic, fpt, color-coding]
---

## Statement

k-Path: given a graph on n vertices and an integer k, decide whether there
is a simple path on k vertices. Give a randomized (or deterministic)
algorithm for directed graphs running in O*((2-ε)^k) for some fixed ε > 0,
where O* hides factors polynomial in n. Setting k = n makes this at least
as hard as breaking 2^n for directed Hamiltonicity (see card
directed-hamiltonicity-below-2n), so the interesting regime is the
parameterized one: k much smaller than n, where extra freedom (many vertices
outside the path) might help — as it provably does in undirected graphs.

## Current record

k-Path drove a decade of technique development. Color-coding
(Alon–Yuster–Zwick, JACM 1995) gave the first O*(c^k) algorithm with
c ≈ 5.44; the divide-and-color line improved to O*(4^k); Koutis (ICALP
2008) introduced the group-algebra/multilinear-detection method reaching
O*(2.83^k), sharpened by Williams (IPL 2009) to O*(2^k) for
directed graphs, where it has sat since. For undirected graphs, Björklund,
Husfeldt, Kaski and Koivisto ("Narrow sieves for parameterized paths and
packings", JCSS 2017, announced ~2010) broke 2^k with a determinant-based
sieve running in O*(1.657^k) — the same cancellation phenomenon as
Björklund's Hamiltonicity algorithm, and again relying essentially on edge
symmetry. Directed 2^k also coincides with a natural algebraic barrier:
multilinear-detection arguments over characteristic-2 algebras provably
need dimension 2^k, so beating it requires leaving that framework. Under
ETH, only 2^{o(k)} is excluded; nothing conditional rules out 1.01^k.

## Why it matters

k-Path is the flagship problem of parameterized algorithms, the standard
first test for every new algebraic FPT technique (color-coding, group
algebras, narrow sieves, extensor coding all debuted or benchmarked on it).
The directed 2^k barrier is the cleanest statement of the "directedness
costs cancellation" phenomenon at the parameterized scale, and a resolution
would almost certainly unlock the corresponding Hamiltonicity question or
at least reveal exactly why k much smaller than n does not help in digraphs.
Improvements propagate to k-cycle, path packing, and subgraph detection
problems whose kernels invoke k-path as a subroutine.

## Attack surface

(1) The known dimension lower bounds pin down the barrier only for specific
algebraic frameworks — map their exact assumptions and search for detection
schemes outside them (non-commutative algebras of sub-2^k dimension,
extensor-coding variants; extensor coding, Brand–Dell–Husfeldt STOC 2018,
is the most recent framework and its directed limits are not fully
charted). (2) Special digraph classes: for bipartite digraphs or bounded
average degree, partial wins would already be publishable. (3) The
deterministic frontier is a separate open flank: even undirected
deterministic k-path stands near O*(2.55^k), so derandomizing any of the
2^k-or-better algorithms is a card-worthy result on its own.
