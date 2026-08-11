---
id: undirected-diameter-53-approx
title: "Undirected diameter: find a 5/3-approximation faster than Õ(m^{3/2}), or extend SETH-hardness to ratios above 5/3 at that runtime"
genre: missing-hardness
problems: ["Diameter", "Orthogonal Vectors", "k-OV"]
hypotheses: [SETH]
record: "3/2-approximation in Õ(m^{3/2}) time; (2 - 1/2^k)-approximation ladder in Õ(m n^{1/(k+1)}) time; NEW: 5/3-approximation (small additive error) in Õ(n m^{3/5}) time — beats the 3/2-rung runtime for densities m in [n^{5/4}, n^{5/3}], but not for sparse m = Õ(n)"
record_ref: "Roditty & Vassilevska Williams, STOC 2013; Chechik, Larkin, Roditty, Schoenebeck, Tarjan & Vassilevska Williams, SODA 2014; Cairo, Grossi & Rizzi, SODA 2016; Kirkpatrick, Roditty, Qi & Vassilevska Williams, arXiv:2604.27142 (2026)"
hardness: "under SETH: no (3/2-eps)-approximation in m^{2-o(1)} time; no (5/3-eps)-approximation in m^{3/2-o(1)} time"
hardness_ref: "Roditty & Vassilevska Williams, STOC 2013; Backurs, Roditty, Segal, Vassilevska Williams & Wein, STOC 2018"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [graphs, diameter, approximation, seth, sparse]
---

## Statement

For sparse undirected unweighted graphs (m edges), close the gap between the approximation-algorithm ladder and the SETH-hardness ladder for diameter. Concretely: either give a 5/3-approximation algorithm running in O(m^{3/2 - eps}) time on sparse graphs (m = Õ(n)) — not ruled out, since the known lower bound only covers ratios strictly below 5/3, and the 2026 rung of Kirkpatrick et al. achieves this only at densities m ≥ n^{5/4} — or prove that under SETH some ratio in the open interval (5/3, 7/4) requires m^{3/2-o(1)} time, tightening the staircase.

## Current record

Algorithms: a simple BFS from one vertex 2-approximates the diameter in O(m) time. Roditty and Vassilevska Williams (STOC 2013) gave a 3/2-approximation in Õ(m√n) expected time, made deterministic and Õ(m^{3/2}) by Chechik et al. (SODA 2014). Cairo, Grossi and Rizzi (SODA 2016) generalized this to a ladder: roughly (2 - 1/2^k)-approximation in Õ(m n^{1/(k+1)}) time. For a decade the ladder jumped from ratio 3/2 at m^{3/2} to ratio 7/4 at Õ(m n^{1/3}) with no 5/3 rung; Kirkpatrick, Roditty, Qi and Vassilevska Williams (arXiv:2604.27142, 2026) finally added one — the first ratio off the 2 - 1/2^k curve — computing a 5/3-approximation (with additive error at most 7/5) in deterministic O(n m^{3/5} log^{8/5} n) time. This beats all known 3/2-approximation algorithms exactly when m is in [n^{5/4}, n^{5/3}], but for sparse graphs (m = Õ(n)) it costs m^{8/5}, worse than the 3/2 rung's m^{3/2}, so the headline question below is still open. Hardness: Roditty–Vassilevska Williams showed that under SETH, distinguishing diameter 2 from 3 (hence (3/2-eps)-approximating) requires m^{2-o(1)} time; Backurs et al. (STOC 2018) showed (5/3-eps)-approximation requires m^{3/2-o(1)}. For *directed* graphs the full time–accuracy tradeoff was settled under SETH (R. Li, STOC 2021; Dalirrooyfard & Wein, STOC 2021): in particular no near-linear-time (2-eps)-approximation exists. For undirected graphs, Dalirrooyfard, Li and Vassilevska Williams (FOCS 2021; JACM 2025, arXiv:2106.06026) proved the entire hardness curve: for every integer k ≥ 2, a (2 - 1/k - δ)-approximation requires m^{1+1/(k-1)-o(1)} time under SETH, so the linear-time 2-approximation is optimal. But the algorithmic ladder (ratios 2 - 1/2^k, now plus the 5/3 rung above) and the hardness curve (ratios 2 - 1/k) still do not meet, and the 5/3-at-sparse-density region is the sharpest open gap.

## Why it matters

Diameter is the canonical testbed for fine-grained approximation hardness, and this staircase is the template that radius, eccentricities, and ST-diameter hardness all imitate. Settling the undirected tradeoff would complete a decade-long program; a fast 5/3-approximation would be a genuinely new algorithmic technique, since all known sub-3/2-rung algorithms are ball-growing/sampling arguments that seem stuck at ratios 2 - 1/2^k.

## Attack surface

Algorithmic side: the k-OV reduction graphs that witness hardness have very specific layered structure; an algorithm exploiting low diameter values (the hard instances distinguish e.g. diameter 3 from 5) could aim at 5/3 specifically. Hardness side: the known constructions produce gaps of the form (2k+1) vs (4k+1)-ish; new gadgets realizing gap pairs like 5 vs 9 at density m^{4/3} would extend the staircase. Imitating the directed constructions of Li and Dalirrooyfard–Wein, which use non-symmetric gadgets, and symmetrizing them is the obvious first move — the FOCS 2021 paper shows partial symmetrization is possible.
