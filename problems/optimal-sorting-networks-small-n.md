---
id: optimal-sorting-networks-small-n
title: "Optimal sorting networks: settle 13 channels for size (43–45 comparators) or 18 channels for depth (10 or 11 layers)"
genre: improve-algorithm
problems: ["Sorting Networks", "Bose–Nelson Problem"]
hypotheses: []
record: "size: optimal for n ≤ 12 (s(11)=35, s(12)=39), and 43 ≤ s(13) ≤ 45; depth: optimal for n ≤ 17 (d(17)=10), and d(18) ∈ {10, 11}"
record_ref: "size n ≤ 12: Harder, arXiv:2012.04400 (Isabelle/HOL-checked, 2020); depth n ≤ 16: Bundala & Závodný, LATA 2014 (arXiv:1310.6271); depth n = 17: Codish, Cruz-Filipe, Ehlers, Müller & Schneider-Kamp, JCSS 2016, with the d(17) ≥ 10 bound from Ehlers & Müller (arXiv:1501.06946)"
hardness: "lower bounds are the frontier itself: van Voorhis's s(n) ≥ s(n−1) + ⌈log₂ n⌉ gives s(13) ≥ 43; two-layer-prefix SAT search gives d(17) ≥ 10, hence d(18) ≥ 10"
hardness_ref: "van Voorhis 1972; Ehlers & Müller, arXiv:1501.06946; Harder, arXiv:2012.04400"
status: open
confidence: high
verified: 2026-08-10
tags: [sorting-networks, comparison-model, exact-constants, sat, machine-checkable, classic]
---

## Statement

Two exact records, both stuck at the next integer. Size (the Bose–Nelson problem, 1962): the smallest 13-channel sorting network known has 45 comparators; the best lower bound is 43. Decide s(13). Depth: the shallowest 18-channel network known has 11 layers; the lower bound is 10 (inherited from d(17) = 10). Decide d(18) — and d(19), d(20), which are also 10-or-11. Any resolved case, or any improved network for n ≤ 32, beats a published record.

## Current record

Size optimality is proven for n ≤ 12: Knuth's 25/29-comparator networks for 9 and 10 channels were proven optimal by Codish, Cruz-Filipe, Frank and Schneider-Kamp (2014, arXiv:1405.5754), and Harder settled the Bose–Nelson problem for 11 and 12 channels (s(11) = 35, s(12) = 39) in 2020 with a dynamic-programming generalization of van Voorhis's bound, producing an Isabelle/HOL-verified certificate (arXiv:2012.04400). Depth optimality is proven for n ≤ 17: Bundala and Závodný's SAT-based two-layer-prefix method settled 11 ≤ n ≤ 16 (arXiv:1310.6271), independently verified and extended to d(17) = 10 by Codish, Cruz-Filipe, Ehlers, Müller and Schneider-Kamp (JCSS 2016; lower bound from Ehlers–Müller, arXiv:1501.06946). Above the proven zone the upper bounds still move: depth-13 networks for 25–26 channels appeared in 2024 and for 28 channels in November 2025 (Wang, arXiv:2511.04107), and Dobbelaere's maintained record tables (bertdobbelaere.github.io/sorting_networks.html) log steady size improvements from search programs like SorterHunter.

## Why it matters

Node updates in the comparison hub, but with an unusual property: this is the most machine-decidable corner of the entire list — every question is a finite SAT/search instance, and the field already runs on verified certificates. Sorting networks are also genuinely used (SIMD sorting kernels, sorting in-register, median filters), so smaller networks for 13–32 channels ship in real code. Methodologically it is the proving ground for "SAT solver + symmetry breaking + proof checker" pipelines that later transfer to other exact-constant problems, exactly the workflow an AI-assisted search should industrialize.

## Attack surface

(1) s(13): Harder's DP lower-bound machinery was run to its memory limits at n = 12; the paper sketches what a 13-channel run needs — better subsumption testing and canonization are the bottleneck, not theory. (2) d(18): the Bundala–Závodný two-layer-prefix reduction explodes at 18 channels; stronger prefix symmetry breaking or incremental SAT with modern solvers is the direct route, and any UNSAT result must come with a DRAT/verified certificate to count. (3) Upper bounds are open-ended: SorterHunter-style stochastic search keeps finding smaller networks up to n = 32 — an easy on-ramp where any improvement is immediately publishable and checkable in milliseconds.
