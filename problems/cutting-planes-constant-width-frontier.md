---
id: cutting-planes-constant-width-frontier
title: "Cutting Planes beyond interpolation: the record is 2^{Ω̃(n)} for random Θ(log n)-CNFs — random constant-width CNFs and Tseitin have no superpolynomial bound at all"
genre: hardness-transfer
problems: ["Cutting Planes", "Random k-SAT", "Tseitin formulas"]
hypotheses: []
record: "random k-CNFs with k = Θ(log n) at density m = n·2^{Θ(k)} require Cutting Planes refutations with 2^{Ω̃(n)} lines; every known superpolynomial CP bound (including Pudlák's clique–coloring bound) goes through feasible interpolation or its monotone-real-circuit generalizations; for random O(1)-CNFs and for Tseitin formulas no superpolynomial CP bound exists — and Tseitin in fact has quasi-polynomial-size CP refutations"
record_ref: "Fleming, Pankratov, Pitassi & Robere, FOCS 2017 / J. ACM 2022 (doi 10.1145/3486680); independently Hrubeš & Pudlák, FOCS 2017; alternative proof: Sokolov, STOC 2024"
hardness: "the cautionary precedent: Tseitin formulas were conjectured exponentially hard for CP since 1987, then Dadush & Tiwari recompiled quasi-polynomial Stabbing Planes refutations into quasi-polynomial CP refutations — instances without the split A(x,z) ∧ B(y,z) interpolation structure may simply be easy"
hardness_ref: "Dadush & Tiwari, CCC 2020 (LIPIcs 169, 34)"
endgame: "Cook–Reckhow (J. Symbolic Logic 44(1), 1979): superpolynomial bounds for successively stronger systems is the program toward NP ≠ coNP, and CP is among the strongest systems with unconditional bounds; via Pudlák's feasible interpolation (J. Symbolic Logic 62(3), 1997), CP size bounds are equivalent to monotone-real-circuit lower bounds, so every extension of the CP record is simultaneously an unconditional circuit lower bound"
status: open
confidence: high
verified: 2026-08-10
tags: [proof-complexity, cutting-planes, random-cnf, interpolation, monotone-circuits]
---

## Statement

Cutting Planes (CP) refutes CNFs by reasoning with integer linear
inequalities. Prove a superpolynomial CP lower bound for (a) random k-CNFs
with constant k at any unsatisfiable density, or (b) any formula family via
a technique that does not factor through feasible interpolation — the
Tseitin formulas, now known to be quasi-polynomially easy, show these are
not the same target. The width-Θ(log n) record is the number to transfer
downward.

## Current record

Pudlák (JSL 1997) proved the first exponential CP bound, for clique–coloring
formulas, by interpolation into monotone real circuits. Twenty years later
Fleming–Pankratov–Pitassi–Robere and, independently, Hrubeš–Pudlák proved
random Θ(log n)-CNFs need 2^{Ω̃(n)}-line refutations — still by a
generalization of interpolation; Sokolov (STOC 2024) reproved it with
different machinery. FPPR state the constant-width case as the paper's
obvious open problem and note their symmetric method of approximations
appears structurally incapable of reaching it. Meanwhile Dadush–Tiwari
(CCC 2020) refuted the 33-year-old conjecture that Tseitin is exponentially
hard for CP, so the pool of believed-hard non-interpolation instances has
already shrunk once.

## Why it matters

CP sits directly above resolution in Cook's program and is the proof-theoretic
skeleton of branch-and-cut integer programming solvers: random constant-width
CNFs are the canonical benchmark distribution (tied to Feige's hypothesis and
statistical physics), and their CP complexity decides whether linear-integer
reasoning beats clause learning on average-case instances. Because
interpolation runs both ways, a new CP lower-bound technique is a new
monotone-real-circuit technique for free — and a CP upper bound surprise, as
with Tseitin, would rewrite the conjectured hardness landscape used across
proof complexity.

## Attack surface

(1) Push the FPPR/Hrubeš–Pudlák approximation method below logarithmic
width: the bottleneck is that constant-width clauses give too little slack
for the random-restriction step; quantify the exact width barrier — even
k = log n / log log n would be movement. (2) Dag-like lifting with
small gadgets: the Garg–Göös–Kamath–Sokolov route proves CP bounds for
lifted formulas, and gadget-size reduction (as achieved for Res(⊕) by
Bhattacharya–Chattopadhyay with O(log m) gadgets) is a concrete,
record-shaped subgoal — constant-size gadgets would yield constant-width
hard instances. (3) The Tseitin direction is still two-sided: the
Dadush–Tiwari upper bound is quasi-polynomial, so a superpolynomial CP
lower bound for Tseitin remains open and would be the first bound proved
on a formula with no interpolation split; alternatively, improving their
recompilation to polynomial size would finish Tseitin off as an easy
family.
