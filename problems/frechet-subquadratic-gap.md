---
id: frechet-subquadratic-gap
title: "Close the gap for Fréchet distance: record ~O(n^2 / log^mu n) vs Bringmann's SETH bound ruling out even 1.001-approximation in n^{2-eps}"
genre: improve-algorithm
problems: ["Fréchet Distance", "Orthogonal Vectors"]
hypotheses: [SETH, OV]
record: "expected O(mn (log log n)^{2+mu} log n / log^{1+mu} m) for continuous Fréchet, i.e., O(n^2 (log log n)^{2+mu} / log^mu n) when m = n, for some constant mu in (0,1); O(n^2 log log n / log n) for discrete Fréchet"
record_ref: "Cheng & Huang, SODA 2025, arXiv:2407.05231 (continuous); Agarwal, Ben Avraham, Kaplan & Sharir, SICOMP 2014 (discrete)"
hardness: "no O(n^{2-eps}) algorithm unless SETH fails; holds even for 1.001-approximation"
hardness_ref: "Bringmann, FOCS 2014"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [curves, geometry, fine-grained, seth, frechet]
---

## Statement

The Fréchet distance between two polygonal curves with n vertices each is the
famous "dog-leash distance": the minimum leash length needed for a person
walking along one curve and a dog walking along the other, both moving only
forward. Compute it in time O(n^2 / log^2 n) — i.e., bring the curve world's
record down to what strings already have — or, more ambitiously, find any
polynomially subquadratic algorithm for a natural restricted curve class that
currently lacks one. Alternatively, strengthen the lower bound: rule out
subquadratic algorithms under a weaker hypothesis than SETH, or for larger
approximation factors.

## Current record

Alt and Godau (1995) gave the classical O(n^2 log n) algorithm. Buchin,
Buchin, Meulemans, and Mulzer ("Four Soviets Walk the Dog", SODA 2014) broke
that barrier with a randomized algorithm running in roughly
O(n^2 sqrt(log n)) time on the word RAM; for the discrete Fréchet distance
(walkers hop between vertices), Agarwal, Ben Avraham, Kaplan, and Sharir got
the mildly subquadratic O(n^2 log log n / log n). Cheng and Huang (SODA
2025, arXiv:2407.05231) then took the continuous case genuinely below
quadratic: expected time O(mn (log log n)^{2+mu} log n / log^{1+mu} m) for
some constant mu in (0,1) — the first o(mn) bound whenever m = Omega(n^eps),
which for m = n reads O(n^2 (log log n)^{2+mu} / log^mu n). Bringmann
(FOCS 2014) proved that any O(n^{2-eps}) algorithm — even one approximating
the distance within factor 1.001 — would refute SETH, via a reduction from
Orthogonal Vectors. Curves now sit below n^2 but still lag strings'
n^2 / log^2 n, and the polylog corridor remains wide open.

## Why it matters

Fréchet distance is the standard similarity measure for trajectories (GPS
traces, motion capture, handwriting), so the quadratic wall has practical
teeth. Structurally, this problem tests whether the Four-Russians phenomenon is
about strings specifically or about alignment DPs in general: the Fréchet DP
lives over continuous "free space" rather than a discrete grid, and nobody
knows if lookup-table compression fundamentally applies. On the hardness
side, the approximation-hardness angle is unusually strong (1.001), and the
threshold where approximation becomes easy is moving fast: beyond the older
near-linear (1+eps)-approximations for special classes like c-packed curves,
Cheng, Huang, and Zhang (STOC 2025, arXiv:2503.12746) gave a
(7+eps)-approximation for *general* curves in strongly subquadratic
O(nm^{0.99} log(n/eps)) time, since sharpened to (5+eps) (arXiv:2607.06864)
and to (3+eps) for paths in general metric spaces (arXiv:2607.08893). The
exact constant where subquadratic approximation becomes impossible is now a
live race between these algorithms and the hardness side.

## Attack surface

(1) The continuous record shaves only log^mu n for some mu < 1
(Cheng–Huang), while the discrete case has a nearly full log; closing that
internal gap — or getting either case to n^2 / log^2 n — is the direct
target. (2) Restricted inputs: for c-packed, kappa-straight, or
low-density curves, (1+eps)-approximations run in near-linear time — try to
enlarge these classes or de-approximate them. (3) The decision version
(is the distance at most delta?) is where the hardness lives; the
optimization overhead (parametric search / randomized search) is a separate,
possibly removable log. (4) For lower bounds, Bringmann's construction uses
1D curves already — squeezing the approximation constant above 1.001, or
basing hardness on the weaker OV hypothesis for approximation factors up to
3, are concrete open strengthenings.
