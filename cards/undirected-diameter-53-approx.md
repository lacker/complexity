---
id: undirected-diameter-53-approx
title: "Undirected diameter: find a 5/3-approximation faster than Õ(m^{3/2}), or extend SETH-hardness to ratios above 5/3 at that runtime"
genre: missing-hardness
problems: ["Diameter", "Orthogonal Vectors", "k-OV"]
hypotheses: [SETH]
record: "3/2-approximation in Õ(m^{3/2}) time; (2 - 1/2^k)-approximation ladder in Õ(m n^{1/(k+1)}) time; no ratio-5/3 algorithm faster than the 3/2 rung is known"
record_ref: "Roditty & Vassilevska Williams, STOC 2013; Chechik, Larkin, Roditty, Schoenebeck, Tarjan & Vassilevska Williams, SODA 2014; Cairo, Grossi & Rizzi, SODA 2016"
hardness: "under SETH: no (3/2-eps)-approximation in m^{2-o(1)} time; no (5/3-eps)-approximation in m^{3/2-o(1)} time"
hardness_ref: "Roditty & Vassilevska Williams, STOC 2013; Backurs, Roditty, Segal, Vassilevska Williams & Wein, STOC 2018"
status: open
confidence: medium
tags: [graphs, diameter, approximation, seth, sparse]
---

## Statement

For sparse undirected unweighted graphs (m edges), close the gap between the approximation-algorithm ladder and the SETH-hardness ladder for diameter. Concretely: either give a 5/3-approximation algorithm running in O(m^{3/2 - eps}) time — not ruled out, since the known lower bound only covers ratios strictly below 5/3 — or prove that under SETH some ratio in the open interval (5/3, 7/4) requires m^{3/2-o(1)} time, tightening the staircase.

## Current record

Algorithms: a simple BFS from one vertex 2-approximates the diameter in O(m) time. Roditty and Vassilevska Williams (STOC 2013) gave a 3/2-approximation in Õ(m√n) expected time, made deterministic and Õ(m^{3/2}) by Chechik et al. (SODA 2014). Cairo, Grossi and Rizzi (SODA 2016) generalized this to a ladder: roughly (2 - 1/2^k)-approximation in Õ(m n^{1/(k+1)}) time. Note the ladder jumps from ratio 3/2 at m^{3/2} to ratio 7/4 at Õ(m n^{1/3}) — there is no known 5/3 rung. Hardness: Roditty–Vassilevska Williams showed that under SETH, distinguishing diameter 2 from 3 (hence (3/2-eps)-approximating) requires m^{2-o(1)} time; Backurs et al. (STOC 2018) showed (5/3-eps)-approximation requires m^{3/2-o(1)}. For *directed* graphs the full time–accuracy tradeoff was settled under SETH (R. Li, STOC 2021; Dalirrooyfard & Wein, STOC 2021): in particular no near-linear-time (2-eps)-approximation exists. For undirected graphs further hardness rungs were proved (Dalirrooyfard, Li & Vassilevska Williams, FOCS 2021), but the algorithmic ladder (ratios 2 - 1/2^k) and the hardness ladder still do not meet, and the 5/3-vs-3/2 region is the sharpest open gap.

## Why it matters

Diameter is the canonical testbed for fine-grained approximation hardness, and this staircase is the template that radius, eccentricities, and ST-diameter hardness all imitate. Settling the undirected tradeoff would complete a decade-long program; a fast 5/3-approximation would be a genuinely new algorithmic technique, since all known sub-3/2-rung algorithms are ball-growing/sampling arguments that seem stuck at ratios 2 - 1/2^k.

## Attack surface

Algorithmic side: the k-OV reduction graphs that witness hardness have very specific layered structure; an algorithm exploiting low diameter values (the hard instances distinguish e.g. diameter 3 from 5) could aim at 5/3 specifically. Hardness side: the known constructions produce gaps of the form (2k+1) vs (4k+1)-ish; new gadgets realizing gap pairs like 5 vs 9 at density m^{4/3} would extend the staircase. Imitating the directed constructions of Li and Dalirrooyfard–Wein, which use non-symmetric gadgets, and symmetrizing them is the obvious first move — the FOCS 2021 paper shows partial symmetrization is possible.
