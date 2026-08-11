---
id: pillar-reductions-apsp-3sum-seth
title: "Find a fine-grained reduction between any two of the three pillars — SETH/OV, 3SUM, APSP — in any direction"
genre: equivalence-completion
problems: ["CNF-SAT", "Orthogonal Vectors", "3SUM", "APSP", "Triangle Collection", "Exact-Weight Triangle"]
hypotheses: [SETH, 3SUM, APSP]
record: "no fine-grained reduction is known between any pair of the three pillar hypotheses, in either direction"
record_ref: "status surveyed in V. Vassilevska Williams, 'On some fine-grained questions in algorithms and complexity', ICM 2018"
hardness: "Triangle Collection is fine-grained hard under all three hypotheses simultaneously"
hardness_ref: "Abboud, Vassilevska Williams & Yu, STOC 2015 (SICOMP 2018)"
status: open
confidence: high
verified: 2026-08-10
tags: [pillars, seth, 3sum, apsp, reductions, structural]
---

## Statement

Fine-grained complexity rests on three independent pillars: SETH (the Strong Exponential Time Hypothesis, about CNF satisfiability, which implies the Orthogonal Vectors conjecture), the 3SUM conjecture (no algorithm decides in n^{2-eps} time whether n numbers contain three summing to zero), and the APSP conjecture (no n^{3-eps} algorithm for All-Pairs Shortest Paths on dense weighted graphs). The challenge: exhibit a fine-grained reduction showing that any one of these conjectures implies any other — for example, reduce 3SUM to Orthogonal Vectors, or show that a subcubic APSP algorithm would break 3SUM.

## Current record

No pairwise reduction is known in any of the six possible directions. The best partial progress builds *upward* instead: Abboud, Vassilevska Williams and Yu (STOC 2015) constructed problems such as Triangle Collection whose hardness follows from the *disjunction* of all three conjectures, so lower bounds proved from Triangle Collection survive even if two of the three pillars collapse. Similarly, Vassilevska Williams and Xu (FOCS 2020) showed that Exact-Weight Triangle is hard under both the 3SUM and APSP conjectures. There is also a barrier: Carmosino, Gao, Impagliazzo, Mihajlin, Paturi and Schneider (ITCS 2016) showed that under NSETH (a nondeterministic strengthening of SETH), there is no deterministic fine-grained reduction from CNF-SAT to 3SUM or to APSP, because those problems have fast nondeterministic verifiers for both yes and no answers while SAT presumably does not. Consolidation *within* a pillar is possible, though: Fischer (STOC 2026, arXiv:2603.27736) showed that the APSP, Strong APSP, and Directed Unweighted APSP hypotheses are all equivalent, conditioned on omega = 2 and a plausible additive-combinatorics assumption — but no cross-pillar reduction has followed.

## Why it matters

Almost every conditional lower bound in fine-grained complexity hangs off one of these three hypotheses. A reduction between two pillars would halve the number of independent assumptions the whole field rests on, and would automatically transfer hundreds of existing lower bounds from one hypothesis to the other. Even a reduction under a plausible strengthening (e.g., from the OV conjecture rather than full SETH) would restructure the web.

## Attack surface

The NSETH barrier only blocks *deterministic* reductions *from* SAT; randomized reductions, reductions from OV rather than SAT, and all directions *into* SAT-like problems remain unblocked. Concrete first targets: (1) reduce 3SUM to APSP or vice versa — both are "find a light triple" problems, and Fredman-trick machinery is shared between them (see Chan, Vassilevska Williams & Xu, STOC 2022, arXiv:2203.08356, which proved hardness for triangle problems under the real-valued versions of both hypotheses, plus OV); (2) find more problems, beyond the Triangle Collection family, hard under two or three pillars — each one narrows the space in which the hypotheses can differ; (3) formalize new barriers explaining why the quantifier structures (∃∃ for OV, ∃ light triple for 3SUM, min-plus product for APSP) resist translation.
