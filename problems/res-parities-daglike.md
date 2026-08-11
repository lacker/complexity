---
id: res-parities-daglike
title: "Prove a superpolynomial lower bound for dag-like resolution over parities — regular fell in 2024, depth N^{2−ε} in 2026, the general system still has none"
genre: missing-hardness
problems: ["Resolution over parities", "Binary Pigeonhole Principle", "Tseitin formulas"]
hypotheses: []
record: "regular Res(⊕) refutations of the binary pigeonhole principle BPHP^{n+1}_n require size 2^{Ω(n^{1/3}/log n)}; SETH-matching 2^{(1−ε)n} bounds hold for Res(⊕) proofs of depth n; exponential bounds hold for proofs of lifted Tseitin formulas of depth up to O(N^{2−ε}); general dag-like Res(⊕) has no superpolynomial lower bound"
record_ref: "Efremenko, Garlík & Itsykson, STOC 2024 / SIAM J. Comput. 54(4) 2025 (ECCC TR23-187); Efremenko & Itsykson, STOC 2026 (ECCC TR25-188); Bhattacharya & Chattopadhyay, STOC 2026 (arXiv:2507.23008)"
hardness: "tree-like Res(⊕) bounds come from randomized communication complexity and provably stop there; dag-like lifting theorems handle only deterministic protocols, while Res(⊕) lines need randomized evaluation — the de Rezende–Göös–Robere survey isolates exactly this as the obstruction (Open Problem 2, for R(LIN_2) and R(CP))"
hardness_ref: "de Rezende, Göös & Robere, SIGACT News Complexity Column, March 2022 (arXiv:2202.08909)"
endgame: "Res(⊕) is a subsystem of AC0[2]-Frege (Itsykson & Sokolov, Annals of Pure and Applied Logic 171(1), 2020), the weakest natural system in Cook's program with no superpolynomial bound; Cook–Reckhow (J. Symbolic Logic 44(1), 1979): superpolynomial bounds for every propositional proof system ⟺ NP ≠ coNP"
status: open
confidence: high
verified: 2026-08-10
tags: [proof-complexity, res-parity, lifting, communication-complexity, np-vs-conp]
---

## Statement

Res(⊕) (resolution over parities, also written R(LIN_2) or ResLin) extends
resolution by letting clauses be disjunctions of F_2-linear equations.
Prove that some unsatisfiable CNF family requires superpolynomial-size
dag-like Res(⊕) refutations, with no restriction on the proof's structure
or depth. Equivalently: show R(LIN_2) is not polynomially bounded.

## Current record

Itsykson and Sokolov introduced the system and proved exponential tree-like
bounds via randomized communication (APAL 2020). The dag-like case cracked
open in stages: Efremenko–Garlík–Itsykson (STOC 2024, SICOMP 2025) proved
the first superpolynomial bound for a dag-like fragment — regular Res(⊕)
refutations of the binary pigeonhole principle need size 2^{Ω(n^{1/3}/log n)}.
Efremenko–Itsykson (STOC 2026) pushed to proofs of depth n with
SETH-matching 2^{(1−ε)n} bounds via lossless lifting with per-variable
random gadgets. Bhattacharya–Chattopadhyay (STOC 2026) reached depth
O(N^{2−ε}) for Tseitin formulas on expanders lifted with inner-product
gadgets, explicitly framing general dag-like Res(⊕) as the remaining open
problem. Since a size-s proof has depth at most s, the depth-N^{2−ε} bound
already rules out proofs that are simultaneously small and shallow; fully
general small-but-deep proofs are what survive.

## Why it matters

This is the concrete, currently-moving edge of the AC0[p]-Frege frontier
(see ac0p-frege-frontier): Res(⊕) is the simplest fragment of AC0[2]-Frege
with no superpolynomial bound, and it is also where SAT-solving meets
Gaussian elimination — Res(⊕) captures DPLL solvers enhanced with linear
reasoning, so lower bounds here bound a natural algorithm class. Three
consecutive STOC papers took distinct structural bites out of it; whoever
removes the last restriction gets the first lower bound for a proof system
strictly stronger than resolution on the parity side of the dictionary.

## Attack surface

(1) Close the depth gap: N^{2−ε} to unbounded is one move — the
Bhattacharya–Chattopadhyay game/lifting argument degrades with depth, and
understanding exactly why is the shortest path. (2) Extend lifting to
randomized dag-like protocols: the survey's diagnosis is that dag-like
lifting exists for deterministic protocols (Garg–Göös–Kamath–Sokolov) and
tree-like lifting for randomized ones, and the missing hybrid would resolve
both R(LIN_2) and R(CP) at once — two problems for one theorem. (3) The
binary PHP is proven hard for regular proofs and conjectured hard in
general; irregularity in Res(⊕) is poorly understood, and the known
exponential separation between regular and general Res(⊕) (CCC 2024) maps
where regularity actually costs.
