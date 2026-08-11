---
id: robp-prg-log-squared-barrier
title: "Break Nisan's log-squared barrier: a PRG for read-once branching programs with seed o(log^2 n) — unbeaten since 1990"
genre: improve-algorithm
problems: ["Pseudorandom Generators", "Read-Once Branching Programs", "BPL Derandomization"]
hypotheses: []
record: "explicit PRG for width-w length-n ROBPs with seed length O(log n · log(nw/ε)) — Theta(log^2 n) for polynomial width and constant error, and nothing better is known even for width 4"
record_ref: "Nisan, Combinatorica 1992 (STOC 1990); survey of the frontier in Hoza, ECCC TR22-121"
hardness: "no seed-length lower bound beyond the trivial Omega(log(nw/ε)) applies to general constructions; known limitations only constrain specific frameworks (e.g., the INW generator)"
hardness_ref: "trivial counting bound (folklore); framework limitations discussed in Hoza's survey, ECCC TR22-121"
endgame: "already unconditional — seed o(log^2 n) even for constant width would be the first advance in 35 years, and seed O(log^{3/2} n)-type PRGs feed the Saks–Zhou/Armoni machinery to improve the unconditional BPL ⊆ DSPACE(log^{3/2} n / sqrt(log log n)) record (Saks & Zhou, JCSS 1999; Hoza, RANDOM 2021); Cheng & Hoza (Theory of Computing 2022) reduce breaking the barrier to optimal arity + error dependence"
status: open
confidence: high
verified: 2026-08-10
tags: [pseudorandomness, branching-programs, space-complexity, prg, derandomization]
---

## Statement

Construct an explicit pseudorandom generator that ε-fools standard-order
read-once branching programs (ROBPs) of length n and width w = poly(n) with
seed length o(log^2 n) for constant ε — or do it for any fixed width w ≥ 4.
Nisan's 1990 generator has seed O(log n · log(nw/ε)); for the parameters
relevant to BPL derandomization this is Theta(log^2 n), and the "log-squared
barrier" has not moved for any width above 3.

## Current record

Nisan (Combinatorica 1992) recursively stretches the seed by pairwise-
independent hashing, paying log(nw/ε) per level over log n levels. Since then
progress has come only in secondary parameters. Weighted PRGs
(pseudodistributions) decouple the error: Braverman–Cohen–Garg (SICOMP 2020)
started the line, and Hoza (RANDOM 2021) achieves WPRG seed O(log n · log(nw)
+ log(1/ε)), with Cheng–Wu (SODA 2026) improving the w >> n regime and
Chen–Cohen–Doron–Khaskelberg–Ta-Shma (ECCC TR26-064) achieving optimal arity
dependence. Restricted classes did fall: for unknown-order ROBPs Forbes–Kelley
(FOCS 2018) give seed O(log^3 n) at poly width and Õ(log^2 n) at constant
width; for constant-width regular programs, unbounded-width permutation
programs, and width-3 programs, Chen–Hoza–Lyu–Tal–Wu (FOCS 2023) give WPRGs
with seed Õ(log n · sqrt(log(1/ε)) + log(1/ε)). General width-4 ROBPs with
constant error remain exactly where Nisan left them.

## Why it matters

This is the nonuniform core of BPL vs L: seed O(log n) with black-box
derandomization would give BPL = L outright, and far weaker improvements
already move unconditional records through the Saks–Zhou machinery.
Cheng–Hoza (ToC 2022) proved a striking reduction: a PRG with optimal
dependence on error and alphabet size — with no improvement in the dependence
on n or w — yields seed O(log^{3/2} n) for constant width, breaking the
barrier. The barrier also gates hitting sets, samplers, and the regular/
permutation program program, where the remaining question is whether the
restricted-class techniques (inverse Laplacians, random-walk shortcutting)
touch general width.

## Attack surface

Three published wedges. (1) The Cheng–Hoza route: build a PRG with seed
log^2|Σ| + O(log^{3/2} n + log n · log w + log n · log(1/ε)) — TR26-064 gives
an alternative recursion reaching the same reduction and isolates arity as the
open parameter. (2) The width parameter: the only direct attack is
Raz–Reingold (1999), intriguing but stalled; any log(w/ε)-type joint
dependence in a space-efficient WPRG gives BPL ⊆ DSPACE(log^{4/3} n)
(Braverman–Cohen–Garg; Chattopadhyay–Liao, CCC 2020). (3) Bootstrapping from
restricted models: Doron–Hoza (ECCC 2024) show good enough PRGs for width-6
permutation programs yield width-4 hitting sets, mapping exactly where the
frontier gives way first. Width 4 with constant error is the cleanest concrete
target.
