---
id: range-avoidance-fpnp-frontier
title: "Solve Range Avoidance in FP^NP: the record is a single-valued FS2P algorithm working on all input lengths — an FP^NP algorithm would make E^NP near-maximally hard, since Avoid is the hardest explicit construction"
genre: improve-algorithm
problems: ["Range Avoidance", "Explicit Constructions", "Hard Truth Tables"]
hypotheses: [iO]
record: "single-valued FS2P algorithm for Avoid on every input length, giving S2E ⊄ i.o.-SIZE[2^n/n] — an almost-everywhere near-maximum circuit lower bound; previously a pseudodeterministic FZPP^NP/1 algorithm for infinitely many lengths (giving S2E/1, ZPE^NP/1 near-maximum i.o.); Avoid ∈ FP^NP is open"
record_ref: "Li, STOC 2024 (arXiv:2310.17762); Chen, Hirahara & Ren, STOC 2024 (arXiv:2309.12912, JACM 2026)"
hardness: "Avoid ∉ FP assuming polynomially-secure indistinguishability obfuscation, and deterministic poly-time algorithms for Avoid imply NP = coNP under subexponentially-secure iO; on the other side, Avoid randomly reduces to TFNP with success 1−1/poly under standard assumptions — evidence it is not NP-hard, so the FP^NP question is genuinely open in both directions"
hardness_ref: "Ilango, Li & Williams, STOC 2023 (ECCC TR23-038); Ghentiyala, Li & Stephens-Davidowitz, STOC 2026 (ECCC TR25-210)"
endgame: "constructing hard truth tables is complete for APEPP under P^NP reductions, so Avoid ∈ FP^NP yields a function in E^NP of near-maximum circuit complexity 2^n/(2n) — and every probabilistic-method construction (Ramsey graphs, rigid matrices, two-source extractors, hard truth tables) reduces to Avoid (Korten, FOCS 2021, arXiv:2106.00875)"
status: open
confidence: high
verified: 2026-08-10
tags: [range-avoidance, explicit-constructions, circuit-complexity, tfnp, meta-complexity]
---

## Statement

The Range Avoidance problem (Avoid): given a circuit C: {0,1}^n → {0,1}^m
with m > n, output any string outside the range of C. At least half of all
m-bit strings qualify, so the problem is information-theoretically trivial —
the difficulty is deterministic constructivity. The target: solve Avoid in
FP^NP (deterministic polynomial time with an NP oracle), on all input
lengths. Weaker improvements also count: removing the symmetric-alternation
machinery from the current FS2P algorithm, or derandomizing the FZPP^NP/1
algorithm.

## Current record

Korten (FOCS 2021) organized the field: the class APEPP of explicit
construction problems whose totality follows from the probabilistic method
has constructing-a-hard-truth-table as a P^NP-complete problem, and every
classical explicit-construction target (Ramsey graphs, rigid matrices,
extractors, codes) reduces to Avoid. Chen, Hirahara and Ren (STOC 2024)
gave an unconditional pseudodeterministic FZPP^NP/1 algorithm for Avoid on
infinitely many input lengths, concluding S2E/1 and ZPE^NP/1 require
circuits of size 2^n/n — the first near-maximum lower bounds, breaking the
half-exponential barrier for these classes. Li (STOC 2024) simplified and
strengthened this to a single-valued FS2P algorithm working on every input
length, giving the almost-everywhere bound S2E ⊄ i.o.-SIZE[2^n/n] with no
advice. On the hardness side, Ilango, Li and Williams (STOC 2023) showed
Avoid ∉ FP under polynomially-secure iO; Ghentiyala, Li and
Stephens-Davidowitz (STOC 2026) showed Avoid is nonetheless "almost" in
TFNP, giving evidence against NP-hardness. The FP^NP frontier is untouched.

## Why it matters

By Korten's completeness theorem, one algorithm resolves an entire family of
explicit-construction problems at once, and the payoff is unconditional:
Avoid ∈ FP^NP puts a function of near-maximum circuit complexity 2^n/(2n)
in E^NP, the strongest kind of circuit lower bound for the smallest
uniform class this machinery can reach. The 2023–2026 run (CHR, Li,
Chen–Li–Liang's AMEXP bound) shows the iterative win-win technology is
still yielding; the deterministic step is the one that remains.

## Attack surface

The gap is precisely "symmetric alternation vs determinism": Li's algorithm
is single-valued FS2P, and S2P ⊆ ZPP^NP, so the missing step is
derandomizing one existential quantifier with an NP oracle. Routes: (1) run
the Chen–Lu–Oliveira–Ren–Santhanam iterative win-win with a deterministic
selector — the CLL AMEXP paper (ECCC TR24-182) shows the recursion tolerates
substantial weakening of the verifier; (2) restricted circuit classes:
Avoid for NC0 circuits (where FP algorithms exist for stretch regimes via
Turán-type bounds, arXiv:2503.17114) still implies rigid matrices and other
constructions via Ren–Santhanam–Wang; (3) the proof-complexity connection —
FP^NP Avoid relates to the dual weak pigeonhole principle in bounded
arithmetic (ILW), so unprovability results delimit which techniques can work.
