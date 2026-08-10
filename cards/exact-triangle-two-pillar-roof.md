---
id: exact-triangle-two-pillar-roof
title: "Exact-Weight Triangle: find a truly subcubic algorithm (refuting both 3SUM and APSP conjectures at once) or reduce it back to either pillar"
genre: equivalence-completion
problems: ["Exact-Weight Triangle", "Zero-Weight Triangle", "3SUM", "APSP", "Convolution-3SUM"]
hypotheses: [3SUM, APSP]
record: "O(n^3) for arbitrary integer weights; Õ(W · n^ω) when weights are bounded by W"
record_ref: "folklore; bounded-weight bound cf. Vassilevska Williams & Williams, SICOMP 2013"
hardness: "a truly subcubic algorithm refutes the 3SUM conjecture AND the APSP conjecture"
hardness_ref: "3SUM-hardness: Pătraşcu, STOC 2010 with Vassilevska Williams & Williams, SICOMP 2013; APSP-hardness: Vassilevska Williams & Xu, FOCS 2020"
status: open
confidence: medium
tags: [triangles, 3sum, apsp, weighted-graphs, two-pillar]
---

## Statement

Exact-Weight Triangle (special case: Zero-Weight Triangle): given an n-vertex graph with integer edge weights and a target t, decide whether some triangle has edge weights summing exactly to t. Either (a) solve it in O(n^{3-eps}) time, or (b) give a subcubic reduction from Exact-Weight Triangle to APSP or to 3SUM. Outcome (a) would simultaneously refute the 3SUM and APSP conjectures — the only natural problem known to sit above both pillars. Outcome (b) would collapse it into one pillar's equivalence class and show one hypothesis subsumes part of the other's territory.

## Current record

No algorithm beats cubic time by a polynomial factor for arbitrary weights; with weights bounded by W, fast matrix multiplication gives Õ(W n^ω). On the hardness side the problem is a "roof" over two pillars. From 3SUM: Pătraşcu (STOC 2010) reduced 3SUM to Convolution-3SUM, and Vassilevska Williams and Williams (SICOMP 2013, "Finding, minimizing, and counting weighted subgraphs") carried this to Exact-Weight Triangle, so a subcubic algorithm breaks 3SUM. From APSP: Vassilevska Williams and Xu (FOCS 2020) reduced APSP (via Negative Triangle) to Exact Triangle, so the same algorithm would break APSP. The reverse directions are wide open: Exact Triangle is not known to reduce to APSP, to 3SUM, or to anything subcubic-equivalent to them. Note the contrast with *Negative* Triangle (is some triangle's weight below t?), which is subcubic-equivalent to APSP (Vassilevska Williams & Williams, FOCS 2010): changing "at most" to "exactly" apparently jumps hardness classes.

## Why it matters

Exact Triangle is the closest thing fine-grained complexity has to a unification point for the non-SETH pillars: hardness proved from it holds under two independent hypotheses (and via Chan, Vassilevska Williams & Xu, STOC 2022, its real-weighted relatives connect to further variants). A reduction back to APSP or 3SUM would be the first arrow between the pillars' theories — closely related to the pillar-reduction card in this repo, but strictly easier, since Exact Triangle already touches both sides. It is also the natural stepping stone for basing Zero-Weight Triangle hardness on SETH, which would make it a three-pillar roof.

## Attack surface

(1) Reduce Exact Triangle to Negative Triangle: the standard trick — binary-searching the target via monotone perturbations — fails because "exactly t" is not monotone; a bit-by-bit weight-splitting gadget (as used in the VW–Xu FOCS 2020 reduction, run in reverse) is the concrete thing to attempt. (2) Solve the bounded-difference or monotone weight special cases subcubically: structured min-plus products fell this way (Bringmann, Grandoni, Saha & Vassilevska Williams, FOCS 2016), and any such class transferring to exact-sum products would be new. (3) Extend the roof: reduce k-OV or SETH to Exact Triangle, or prove an NSETH-style barrier showing this is impossible.
