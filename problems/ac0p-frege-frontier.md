---
id: ac0p-frege-frontier
title: "Prove any superpolynomial lower bound for AC0[p]-Frege — the circuit analogue fell to Razborov–Smolensky in 1987, the proof-system version has resisted for four decades"
genre: missing-hardness
problems: ["AC0[p]-Frege", "Resolution over parities", "Modular counting principles"]
hypotheses: []
record: "no superpolynomial proof-size lower bound is known for AC0[p]-Frege, for any prime p; the strongest fragments with exponential bounds are AC0-Frege with Count_p axioms — which provably do not simulate counting gates — and resolution over parities restricted to regular, bounded-depth, or depth-N^{2−ε} proofs"
record_ref: "Buss, Impagliazzo, Krajíček, Pudlák, Razborov & Sgall, Computational Complexity 6, 1996/97; Impagliazzo & Segerlind, FOCS 2001; Bhattacharya & Chattopadhyay, STOC 2026 (arXiv:2507.23008)"
hardness: "every superpolynomial bounded-depth Frege lower bound known adapts AC0 switching-lemma technology, which parity gates defeat; no proof-complexity analogue of the Razborov–Smolensky polynomial-approximation method exists, and the newest partial results route around it via interpolation, lifting, and games instead"
hardness_ref: "Lu, Santhanam & Tzameret, ITCS 2026 (arXiv:2509.16824) — the frontier restated: open for over three decades, flagged since the Beame–Pitassi 1998 survey"
endgame: "Cook–Reckhow, J. Symbolic Logic 44(1), 1979: superpolynomial lower bounds for every propositional proof system ⟺ NP ≠ coNP; AC0[p]-Frege is the weakest natural system on Cook's program with no superpolynomial bound, so any such bound is unconditional and is the program's next rung"
status: open
confidence: high
verified: 2026-08-10
tags: [proof-complexity, frege, ac0p, res-parity, np-vs-conp]
---

## Statement

AC0[p]-Frege is bounded-depth Frege where lines may use MOD_p connectives
alongside AND, OR, NOT. Prove that some family of CNF tautologies requires
superpolynomial-size AC0[p]-Frege proofs, for some constant depth and some
prime p — or even for the special case p = 2. Nothing superpolynomial is
known for any p, at any constant depth beyond the fragments listed below.

## Current record

The proof-complexity/circuit-complexity dictionary maps AC0[p]-Frege to
AC0[p] circuits, where Razborov–Smolensky proved exponential lower bounds in
1987. The proof-system side has been open ever since — the sharpest published
framing of the gap is in Lu–Santhanam–Tzameret (ITCS 2026), who can only show
AC0[p]-Frege hardness of formulas expressing algebraic circuit lower bounds
under the assumption that those formulas are tautologies at all. What is
known unconditionally: bounded-depth Frege with counting *axioms* Count_p
cannot efficiently prove Count_q for coprime q (Buss–Impagliazzo–Krajíček–
Pudlák–Razborov–Sgall 1996/97), and counting axioms provably do not simulate
counting gates (Impagliazzo–Segerlind, FOCS 2001) — so these bounds stop
strictly short of AC0[p]-Frege. On the Res(⊕) side (a depth-restricted
fragment of AC0[2]-Frege), exponential bounds now cover regular proofs
(Efremenko–Garlík–Itsykson, STOC 2024) and proofs of depth up to N^{2−ε}
(Bhattacharya–Chattopadhyay, STOC 2026), but not general dag-like proofs.

## Why it matters

This is the exact spot where Cook's program toward NP ≠ coNP has been stuck
since the 1990s: resolution fell, bounded-depth Frege fell, and the next
system up has a forty-year-old circuit analogue and no proof-complexity
counterpart. A lower bound here would be unconditional, would certify that
the switching-lemma barrier can be crossed in proof complexity, and would
make Frege the new frontier. It would also unblock the algebraic side:
polynomial calculus and Nullstellensatz size bounds over F_p feed into
AC0[p]-Frege via known simulations.

## Attack surface

(1) Finish Res(⊕): the depth-N^{2−ε} bound of Bhattacharya–Chattopadhyay is
one step from general dag-like Res(⊕), the natural base case of AC0[2]-Frege.
(2) Port Razborov–Smolensky: the missing piece is a notion of
"approximation by low-degree polynomials" that is preserved along proof
lines rather than circuit gates; every partial result so far (interpolation,
lifting with gadgets, game characterizations) avoids this and correspondingly
stalls at restricted proof shapes. (3) Candidate tautologies exist —
Tseitin mod q contradictions and Count_q principles are provably hard for
all the fragments above and are believed hard for AC0[p]-Frege itself, so
the instances are not the bottleneck; the technique is.
