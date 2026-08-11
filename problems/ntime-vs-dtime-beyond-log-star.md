---
id: ntime-vs-dtime-beyond-log-star
title: "Widen the only unconditional NTIME vs DTIME separation: the record is NTIME[n√(log* n)] ≠ DTIME[n√(log* n)] on multitape TMs — n log n is open, and RAMs are open even at linear time"
genre: missing-hardness
problems: ["NTIME vs DTIME", "Turing Machine Simulation"]
hypotheses: []
record: "NTIME(n) ≠ DTIME(n) for multitape Turing machines (PPST 1983), via the speedup lemma DTIME[t] ⊆ Σ4TIME[t/log* t]; extended to NTIME[n√(log* n)] ≠ DTIME[n√(log* n)] (Santhanam 2001); for RAMs even NTIME(n) vs DTIME(n) is open — separations known only for linear-time RAMs with memory restrictions (Ajtai)"
record_ref: "Paul, Pippenger, Szemerédi & Trotter, FOCS 1983; Santhanam, CCC 2001 (ECCC TR01-022); Ajtai, STOC 1999 / JCSS 2002"
hardness: "no barrier theorem; the known proof is tied to one-dimensional tape geometry — the speedup lemma comes from pebbling segregators of block-respecting computation graphs, and no analogue is known for RAMs or 2-dimensional tapes; Santhanam: if multi-pushdown graphs have {o(n), o(n/log n)} segregators then NTIME[n log n] ≠ DTIME[n log n]"
hardness_ref: "Santhanam, CCC 2001 (ECCC TR01-022)"
endgame: "any extension is itself a new unconditional separation; Santhanam 2001 gives the hierarchy loop: either P ≠ L, or NTIME(t) ≠ DTIME(t) for every polynomially bounded constructible t — so pushing the separation up the time scale collides directly with P vs L, and a RAM version would be the first nondeterminism-vs-determinism separation in the model where fine-grained complexity actually lives"
status: open
confidence: high
verified: 2026-08-10
tags: [structural-complexity, hierarchies, nondeterminism, turing-machines, unconditional]
---

## Statement

Paul, Pippenger, Szemerédi and Trotter proved the one unconditional
separation of nondeterministic from deterministic time in a general model:
NTIME(n) ≠ DTIME(n) for multitape Turing machines. Extend it: (1) prove
NTIME(t) ≠ DTIME(t) for t = n log* n, n log n, or any bound beyond
Santhanam's n√(log* n) record; or (2) prove NTIME(n) ≠ DTIME(n) for
random-access machines, where the question is completely open; or (3)
improve the speedup lemma DTIME[t] ⊆ Σ4TIME[t/log* t], which is the engine
of the whole result.

## Current record

PPST (FOCS 1983) showed every multitape TM running in time t can be
simulated by a Σ4 alternating machine in time t/log* t, via block-respecting
computation and pebble games on separator-friendly computation graphs; if
NTIME(n) = DTIME(n), padding and alternation-elimination collapse this into
a contradiction with the nondeterministic time hierarchy. Santhanam (CCC
2001) squeezed the argument to NTIME[n√(log* n)] ≠ DTIME[n√(log* n)] — the
current record — and showed that better segregators for multi-pushdown
graphs would push it to n log n. He also proved the win-win: either P ≠ L,
or NTIME(t) ≠ DTIME(t) for all polynomially bounded constructible t. For
RAMs, Ajtai (STOC 1999 / JCSS 2002) separated determinism from
nondeterminism for linear-time RAMs only under memory restrictions; the
unrestricted RAM question is open, as is NTIME(n^k) vs DTIME(n^k) for every
k > 1 in any standard model. Salamon and Wehar (ToCS 2023) show that even
mild "effective guessing" containments like DTIME(n polylog n) ⊆ NTIME(n)
would have unlikely consequences.

## Why it matters

This is the miniature P vs NP that has actually been solved — but only at
linear time, on one machine model, by an argument whose factor-log* slack
has not moved in over forty years. Each ingredient is independently a
record: the speedup lemma is the best known alternation-for-time trade, the
segregator bounds are a pure graph-pebbling question, and a RAM separation
would put the result in the model fine-grained complexity uses. The problem
is hierarchy-collision-shaped: all known progress comes from tightening a
simulation until it hits a hierarchy theorem.

## Attack surface

Three tracks. (1) Graph-theoretic: Santhanam's reduction makes the n log n
separation contingent on showing multi-pushdown graphs have {o(n),
o(n/log n)} segregators — a concrete combinatorial target with no
lower-bound obstruction known. (2) Simulation: improve DTIME[t] ⊆
Σ4TIME[t/log* t], or trade depth for savings (fewer alternations, more
speedup); Williams' 2025 √(t log t)-space simulation shows tape-geometry
arguments still have room. (3) Model transfer: Ajtai's memory-restricted
RAM separation is the only beachhead in the RAM world; extending his
combinatorial argument to word RAMs with unrestricted memory, even for
one-pass or oblivious variants, would be new.
