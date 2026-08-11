---
id: radius-seth-hardness
title: "Base the m^2 hardness of sparse Radius on SETH — today it rests only on the Hitting Set conjecture"
genre: missing-hardness
problems: ["Radius", "Hitting Set", "Orthogonal Vectors", "Diameter"]
hypotheses: [SETH, "Hitting Set"]
record: "exact radius: Õ(mn) time on sparse graphs (single-source shortest paths from every vertex); n^3/2^{Θ(√log n)} on dense graphs via APSP"
record_ref: "folklore; dense bound via R. Williams, STOC 2014"
hardness: "no m^{2-eps} algorithm for exact radius on sparse graphs unless the Hitting Set conjecture fails"
hardness_ref: "Abboud, Vassilevska Williams & Wang, SODA 2016"
status: open
confidence: high
verified: 2026-08-10
tags: [graphs, radius, hitting-set, seth, quantifiers]
---

## Statement

The radius of a graph is min over vertices c of the maximum distance from c to any other vertex — the eccentricity of the best "center". For sparse graphs, prove that under SETH, exact radius requires m^{2-o(1)} time. Alternatively, reduce Orthogonal Vectors (OV) to Hitting Set, or otherwise derive the Hitting Set conjecture from SETH — either result would put radius hardness on the standard foundation. A third acceptable outcome: an O(m^{2-eps}) exact radius algorithm, refuting the Hitting Set conjecture.

## Current record

Exact radius is computed by running shortest paths from every vertex: Õ(mn), which is quadratic in sparse graphs. Diameter — radius's twin, with max-max instead of min-max quantifiers — has had a SETH-based m^{2-o(1)} lower bound since Roditty and Vassilevska Williams (STOC 2013). But that reduction fundamentally produces "exists a far pair" (∃∃) instances, matching OV's quantifier structure. Radius is a ∃∀ statement ("exists a center covering everything"), and the OV-style gadgets do not translate. Abboud, Vassilevska Williams and Wang (SODA 2016) introduced the Hitting Set conjecture — no subquadratic algorithm decides, given two set families, whether some set in the first intersects *every* set in the second (∃∀) — and showed it implies the m^{2-o(1)} radius lower bound. No reduction is known between OV and Hitting Set in either direction, and SETH is not known to imply the Hitting Set conjecture. In dense graphs, by contrast, radius is fully understood modulo APSP: it is subcubic-equivalent to APSP (Abboud, Grandoni & Vassilevska Williams, SODA 2015).

## Why it matters

This is the cleanest example of a quantifier-structure barrier in fine-grained complexity: two nearly identical problems (diameter, radius) with the same trivial algorithm, one hard under the field's flagship hypothesis and one requiring a bespoke conjecture. Connecting Hitting Set to SETH would consolidate the hypothesis zoo and automatically upgrade every Hitting-Set-based lower bound (radius, Bichromatic Closest Pair variants, and others). A separation-style explanation of why no reduction exists would be equally valuable structurally.

## Attack surface

(1) Try reducing k-SAT directly to radius via a ∃∀ encoding: the natural attempt assigns half-assignments to candidate centers and needs every clause-vertex to be near the chosen center — the difficulty is stopping *other* centers from being accidentally good, and gadget vocabularies from the Triangle Collection paper (Abboud–Vassilevska Williams–Yu, STOC 2015) are the place to mine. (2) Attack Hitting Set itself: it sits in the "quantified OV" family, where first-order property hardness results (Gao, Impagliazzo, Kolokolova & Williams, SODA 2017 line of work) give partial maps of which quantifier prefixes are SETH-hard; ∃∀ with subquadratic target is precisely the unresolved cell. (3) Cheap partial win: SETH-hardness for radius on *directed* graphs, or for constant-approximation variants, would already be citable progress.
