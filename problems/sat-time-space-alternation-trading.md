---
id: sat-time-space-alternation-trading
title: "Push the SAT time-space lower bound past n^{2cos(pi/7)} ≈ n^{1.801} — the exponent is proved optimal for the entire known proof technique"
genre: missing-hardness
problems: ["SAT", "Time-Space Tradeoffs", "NTIME vs DTISP"]
hypotheses: []
record: "SAT cannot be solved by random-access machines in n^c time and n^{o(1)} space for any c < 2cos(pi/7) ≈ 1.8019 (equivalently NTIME[n] ⊄ DTISP[n^c, n^{o(1)}])"
record_ref: "Williams, Computational Complexity 17(2), 2008 (CCC 2007), \"Time-Space Tradeoffs for Counting NP Solutions Modulo Integers\""
hardness: "ceiling on the technique: no alternation-trading proof, however long, can establish an exponent above 2cos(pi/7) — the record provably exhausts the known method"
hardness_ref: "Buss & Williams, Computational Complexity 24(3), 2015 (CCC 2012), \"Limits on Alternation-Trading Proofs for Time-Space Lower Bounds\""
endgame: "already unconditional — this is a lower bound against all algorithms in the model; any c ≥ 1.802 is a new unconditional theorem about SAT, and c = 2 would settle a 25-year program"
status: open
confidence: high
verified: 2026-08-10
tags: [lower-bounds, sat, time-space, alternation-trading, automated-proof-search]
---

## Statement

Prove that SAT requires n^c time for some constant c ≥ 2cos(pi/7) ≈ 1.8019 on
random-access machines using n^{o(1)} space — beating the record exponent —
or, more honestly stated: find any proof technique that escapes the
alternation-trading framework, since the record exponent is a proved fixed
point of that framework. The natural target is c = 2; nothing is known to stop
even much larger exponents.

## Current record

The lower-bound line runs Fortnow (CCC 1997), the golden ratio 1.618
(Fortnow–Lipton–van Melkebeek–Viglas, JACM 2005), sqrt(3) ≈ 1.732 (Williams,
Computational Complexity 2006), and the current record 2cos(pi/7) (Williams,
Computational Complexity 2008): for all c with c^3 − c^2 − 2c + 1 < 0, SAT is
not in DTISP[n^c, n^{o(1)}]. All these proofs "trade alternations": assume
NTIME[n] ⊆ DTISP[n^c, n^{o(1)}], alternately apply a speedup rule (simulate
small-space computation with alternations, à la Nepomnjascii) and a slowdown
rule (remove an alternation using the assumption), and derive a contradiction
with a hierarchy theorem. Williams ("Alternation-Trading Proofs, Linear
Programming, and Lower Bounds", STACS 2010, arXiv:1001.0746) formalized the
framework, showed that finding the best proof reduces to linear programming,
and ran a computer search over proof shapes: the search kept converging to
1.8019, prompting the conjecture that the framework caps there. Buss and
Williams (CCC 2012; journal 2015) proved it: no alternation-trading proof
yields any c ≥ 2cos(pi/7). Extensions since have changed the verifier, not the
record — e.g., Mudigonda–Williams (ITCS 2021, arXiv:2012.00330) prove n^{2.366}
against QMA verifiers and 1.465 against MA verifiers.

## Why it matters

This is arguably the most AI-native problem in complexity theory: the record
proofs were literally found by automated search over a formal proof system,
the search space was then completely characterized, and the barrier theorem
says the well is dry. Progress therefore requires inventing a new inference
rule — a new speedup or slowdown primitive — and the moment one exists, the
LP-search machinery mechanically extracts the best exponent it implies. It is
a rare setting where "add one axiom, rerun the optimizer" is the honest shape
of the open problem. Any improvement is an unconditional lower bound for SAT.

## Attack surface

Buss–Williams pinpoint what to violate: their limit applies to proofs built
solely from the two known rule schemas. Candidate new rules: speedups based on
the Williams TIME[t] ⊆ SPACE[sqrt(t log t)] simulation (STOC 2025) and its
tree-evaluation core, which postdate the barrier and are not in the rule set;
irregular proof shapes mixing randomized or Merlin–Arthur speedups
(Mudigonda–Williams show the framework generalizes); or slowdowns exploiting
structure of SAT beyond parsimonious completeness. A cheap first experiment:
re-run the alternation-trading LP search with any candidate rule added and see
whether the optimum moves off 1.8019.
