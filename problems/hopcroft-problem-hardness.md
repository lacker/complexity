---
id: hopcroft-problem-hardness
title: "Certify the n^{4/3} exponent of Hopcroft's problem with a fine-grained lower bound — the O(n^{4/3}) algorithm now exists, the hardness doesn't"
genre: missing-hardness
problems: ["Hopcroft's Problem", "Point-Line Incidence", "3SUM", "Orthogonal Vectors"]
hypotheses: [3SUM, SETH]
record: "O(n^{4/3}) time"
record_ref: "Chan & Zheng, SODA 2022 (ACM TALG 2023; arXiv:2111.03744)"
hardness: "Ω(n^{4/3}) only in Erickson's restricted 'partitioning algorithm' model; no lower bound from any fine-grained hypothesis"
hardness_ref: "Erickson, Discrete & Computational Geometry 1996"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [geometry, incidences, 3sum, lower-bounds, models]
---

## Statement

Hopcroft's problem: given n points and n lines in the plane, does any point lie on any line? Find a conditional lower bound of n^{4/3-o(1)} (or any superlinear bound beating roughly n log n) from a standard fine-grained hypothesis — 3SUM, OV/SETH, APSP, or a well-established new one. Equivalently interesting: show such a reduction is *impossible* from 3SUM under current techniques, or beat O(n^{4/3}) and upend forty years of belief.

## Current record

After decades of algorithms converging on n^{4/3} times subpolynomial factors (Matoušek and others in the 1990s), Chan and Zheng (SODA 2022) achieved a clean O(n^{4/3}) deterministic algorithm, matching the exponent long believed optimal. The belief rests on incidence geometry — the Szemerédi–Trotter theorem says n points and n lines can have Θ(n^{4/3}) incidences, so counting-type variants "feel" like they need that time — and on Erickson's 1996 lower bound of Ω(n^{4/3}) in the restricted "partitioning algorithm" model, which captures the known algorithmic techniques but not general computation. No reduction from 3SUM, OV, or any pillar hypothesis gives even an n^{1.01} lower bound for the standard real-RAM decision version. This is a strange gap: Hopcroft's problem is the canonical hard primitive of computational geometry's middle regime, sitting between the near-linear world and the quadratic 3SUM-hard world of the Gajentaan–Overmars catalog (CGTA 1995) — related detection problems such as "do three of these n points lie on a common line?" ARE 3SUM-hard, but that only certifies quadratic hardness for a different problem. (In the quantum setting the exponent story has since diverged — an O(n^{5/6})-type quantum algorithm exists (arXiv:2405.01160, ACM Trans. Quantum Computing 2026) — but classically the record and the hardness gap described here are unchanged as of mid-2026.)

## Why it matters

Fine-grained complexity has strong stories at n^2 (3SUM/OV) and n^3 (APSP) but almost nothing that certifies intermediate exponents like 4/3. A hypothesis-based n^{4/3} bound for Hopcroft's problem would immediately propagate: many range-searching, ray-shooting, and distance-counting problems have known n^{4/3}-style reductions *from* Hopcroft's problem, so one lower bound would light up a whole subgraph of computational geometry. Failure is informative too — a proven barrier would sharpen why current reduction technology only hits "round" exponents.

## Attack surface

(1) Exponent arithmetic: a reduction from 3SUM (hard at n^2) to Hopcroft (target n^{4/3}) must blow instances up from size n to size n^{3/2} — so look for reductions producing *structured* point-line instances of quadratic-ish size where a Hopcroft oracle is called on √n-sized batches; Pătraşcu-style self-reduction and hashing tricks are the template. (2) Start from OV with vector dimension polylog: geometric embeddings of OV into incidence problems exist in higher dimensions, and pushing them to the plane with n^{3/2} blowup is unexplored. (3) Alternatively strengthen the model lower bound: extend Erickson's partitioning bound to cover algebraic decision trees of higher degree, or to the algorithms actually used by Chan–Zheng — even a model separation would be publishable progress.
