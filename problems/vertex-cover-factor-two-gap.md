---
id: vertex-cover-factor-two-gap
title: "Vertex Cover between √2 and 2: NP-hardness stops at 1.414, algorithms at 2 − Θ(1/√log n) — close the gap without assuming UGC"
genre: missing-hardness
problems: ["Vertex Cover", "Independent Set", "Unique Games"]
hypotheses: [UGC]
record: "2 - Theta(1/sqrt(log n)) approximation"
record_ref: "Karakostas, ACM TALG 2009 (ICALP 2005; ECCC TR04-084)"
hardness: "NP-hard to approximate within sqrt(2) - eps (via the 2-to-2 Games Theorem); 2 - eps under UGC"
hardness_ref: "Khot, Minzer & Safra, STOC 2017 (ECCC TR16-124), made unconditional by the Grassmann expansion proof (Khot–Minzer–Safra, FOCS 2018); Khot & Regev, JCSS 2008"
status: open
confidence: high
verified: 2026-08-10
tags: [vertex-cover, unique-games, grassmann, sdp, hardness-of-approximation]
---

## Statement

Find a minimum set of vertices touching every edge. Taking both endpoints of a
maximal matching gives a 2-approximation, known since the 1970s. Fifty years
on, the best polynomial-time ratio is only microscopically better:
2 − Θ(1/√log n), tending to 2 as n grows. Under the Unique Games Conjecture
that is essentially optimal — 2 − ε is UGC-hard for every constant ε. But
unconditional NP-hardness stops at √2 − ε ≈ 1.414. The problem: prove
NP-hardness above √2 without UGC, or find a polynomial-time (2 − ε)-
approximation for constant ε > 0 — which would refute the Unique Games
Conjecture outright.

## Current record

Algorithmic: Karakostas (TALG 2009) rounds a strengthened SDP relaxation,
converting sparsest/balanced-cut advances into an approximation factor of
2 − Θ(1/√log n), improving the previous 2 − Θ(log log n / log n) of
Bar-Yehuda–Even and Monien–Speckenmeyer. Nothing better is known; even
mildly-exponential-time SoS-based algorithms only trade the constant against
running time (Manurangsi–Trevisan, arXiv:1807.09898). Hardness: Dinur–Safra's
1.36 stood until Khot–Minzer–Safra (STOC 2017) reduced 3-Lin to 2-to-2 Games
modulo a combinatorial hypothesis on Grassmann graphs, giving hardness of
distinguishing independent sets of size (1 − 1/√2)n from o(n) — hence
√2 − o(1) NP-hardness for vertex cover. The Grassmann expansion hypothesis was
proven in 2018 (KMS, FOCS 2018), completing the 2-to-2 Games Theorem and making
√2 − ε unconditional. Under UGC, Khot–Regev (JCSS 2008) give 2 − ε.

## Why it matters

Vertex cover is where the UGC reduction web most visibly outruns the PCP web:
the 2-to-2 Games Theorem — the biggest hardness-of-approximation advance of
the last decade — was engineered largely for this problem, and √2 is exactly
half the UGC bound's distance from the old 1.36. The gap [√2, 2] is now the
canonical measuring stick for progress toward (or against) UGC: proving
2 − ε NP-hard would essentially deliver everything UGC promises for covering
problems, while a 1.99-approximation would demolish the conjecture. Grassmann
technology developed here also powers hardness transfers across the web
(independent set, coloring-adjacent problems).

## Attack surface

Hardness direction: the natural target is boosting 2-to-2 (imperfect
completeness) toward 1-to-1 behavior. Intermediate milestones are already
meaningful — any NP-hardness constant strictly above √2 would be the first
since 2018. The KMS framework is explicitly modular: soundness improvements
for Grassmann-based tests, or "2-to-1 with perfect completeness" variants,
translate mechanically into better vertex cover constants. Algorithmic
direction: Karakostas-style rounding is capped at 2 − o(1) for known SDP
hierarchies — integrality-gap instances for Ω(√(log n / log log n)) rounds of
Sherali–Adams+SDP exist — so a (2 − ε)-approximation needs a technique outside
that regime; identifying the weakest hierarchy that beats 2 on the known gap
instances is a concrete first experiment.
