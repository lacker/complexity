---
id: superfast-derandomization-overhead
title: "Superfast derandomization: beat the n · T overhead for worst-case BPTIME[T], or weaken the assumptions for free-lunch T^{1+eps}"
genre: tighten-overhead
problems: ["Derandomization", "BPTIME vs DTIME", "Targeted Pseudorandom Generators"]
hypotheses: ["#NSETH", "OWF"]
record: "worst-case: BPTIME[T] ⊆ DTIME[n · T^{1+eps}] assuming OWFs plus strong non-uniform hardness; free-lunch: BPTIME[T] ⊆ heur-DTIME[T^{1+O(eps)}] over all polynomial-time-samplable distributions, from OWFs plus hardness-over-samplable-distributions assumptions"
record_ref: "Chen & Tell, STOC 2021 (\"Simple and Fast Derandomization from Very Hard Functions\") for worst-case; Chen & Tell, FOCS 2021 (\"Hardness vs Randomness, Revised\") for free-lunch, with assumptions improved by Ball, Chen & Tell, CCC 2025 (ECCC TR25-010)"
hardness: "conditionally optimal: under #NSETH there is no worst-case derandomization of BPTIME[T] in time n · T^{1-eps}, so the worst-case record cannot be improved without erring on hard-to-find inputs"
hardness_ref: "Chen & Tell, STOC 2021"
endgame: "near-equivalence theorems make any unconditional version pay out directly: superfast derandomization implies lower bounds for multi-bit functions against uniform probabilistic algorithms on almost all inputs, and conversely (Chen & Tell, FOCS 2021) — so proving the record's conclusion unconditionally yields unconditional uniform lower bounds"
status: open
confidence: high
verified: 2026-08-10
tags: [derandomization, hardness-vs-randomness, targeted-prg, nseth, one-way-functions]
---

## Statement

Pin down the true multiplicative cost of removing randomness from
time-T algorithms. Two record numbers, both conditional. Worst-case: overhead
n · T^{eps} (i.e., BPTIME[T] ⊆ DTIME[n · T^{1+eps}]), proved optimal under
#NSETH. Free-lunch: overhead T^{eps} with errors only on inputs no
polynomial-time sampler can find. Progress means: (1) weakening the
assumptions behind either record toward necessary ones, (2) proving any
unconditional theorem in this regime, or (3) extending the conditional
impossibility results.

## Current record

Doron–Moshkovitz–Oh–Zuckerman (FOCS 2020, JACM 2022) opened the quantitative
question, building a PRG with near-optimal seed (1+alpha)·log s from
exponential hardness against randomized SVN circuits — though pure seed
enumeration still roughly squares the runtime. Chen–Tell (STOC 2021) got
worst-case overhead n · T^{eps} from OWFs plus strong non-uniform lower
bounds, and matched it: under #NSETH, time n · T^{1-eps} is impossible, so for
worst-case derandomization the record is (conditionally) the truth. Chen–Tell
(FOCS 2021) then defined "free lunch" derandomization — time T^{1+O(eps)},
erring only on infeasible-to-find inputs — from OWFs plus an ad-hoc
non-batch-computability assumption. Ball–Chen–Tell (CCC 2025, ECCC TR25-010)
re-derived free lunch from a variety of natural assumptions whose common core,
hardness over all polynomial-time-samplable distributions, is necessary for
the conclusion; the tools are new "superfast targeted generators" eliminating
the polynomial overheads inherent to prior constructions.

## Why it matters

This program upgraded prBPP = prP from a qualitative belief to a quantitative
theory with matching conditional upper and lower bounds — randomness costs a
factor of about n in the worst case and about nothing on feasible inputs.
The Chen–Tell instance-wise equivalences mean the question is a disguised
uniform-lower-bound question: closing any gap unconditionally produces lower
bounds nobody can currently prove. It also exports: superfast derandomization
of MA-style protocols feeds Fiat–Shamir and proof-system results, and the
space-bounded analogue (Doron–Tell, CCC 2023, minimal memory footprint)
carries the same structure into the BPL world.

## Attack surface

Concrete gaps, in increasing difficulty. (1) The free-lunch results still
assume OWFs; Ball–Chen–Tell explicitly flag removing or weakening the OWF
layer, and derandomization-on-average-over-uniform already follows from OWFs
alone via Klivans–van Melkebeek–Shaltiel. (2) Match assumptions to necessity:
hardness over samplable distributions is necessary — the remaining slack
between the assumptions used and that necessary core is a well-posed target.
(3) The impossibility side: #NSETH-based limits exist only for worst-case
derandomization; find any barrier for free-lunch overhead, or extend the n · T
optimality to weaker hypotheses. (4) Unconditional toeholds: prove superfast
derandomization for structured subclasses of BPTIME where hardness is known
unconditionally.
