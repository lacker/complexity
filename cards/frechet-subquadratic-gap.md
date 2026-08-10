---
id: frechet-subquadratic-gap
title: "Close the gap for Fréchet distance: record ~O(n^2 sqrt(log n)) vs Bringmann's SETH bound ruling out even 1.001-approximation in n^{2-eps}"
genre: improve-algorithm
problems: ["Fréchet Distance", "Orthogonal Vectors"]
hypotheses: [SETH, OV]
record: "randomized O(n^2 sqrt(log n) (log log n)^{3/2}) for continuous Fréchet; O(n^2 log log n / log n) for discrete Fréchet"
record_ref: "Buchin, Buchin, Meulemans & Mulzer, SODA 2014 (continuous); Agarwal, Ben Avraham, Kaplan & Sharir, SICOMP 2014 (discrete)"
hardness: "no O(n^{2-eps}) algorithm unless SETH fails; holds even for 1.001-approximation"
hardness_ref: "Bringmann, FOCS 2014"
status: open
confidence: medium
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
the mildly subquadratic O(n^2 log log n / log n). Bringmann (FOCS 2014)
proved that any O(n^{2-eps}) algorithm — even one approximating the distance
within factor 1.001 — would refute SETH, via a reduction from Orthogonal
Vectors. Note the record here is *above* n^2, while strings sit at
n^2 / log^2 n: curves are the laggard of the quadratic family.

## Why it matters

Fréchet distance is the standard similarity measure for trajectories (GPS
traces, motion capture, handwriting), so the quadratic wall has practical
teeth. Structurally, this card tests whether the Four-Russians phenomenon is
about strings specifically or about alignment DPs in general: the Fréchet DP
lives over continuous "free space" rather than a discrete grid, and nobody
knows if lookup-table compression fundamentally applies. On the hardness
side, the approximation-hardness angle is unusually strong (1.001), and the
exact threshold where approximation becomes easy — constant-factor
approximations in strongly subquadratic time exist for special curve classes
like c-packed curves — is an active frontier.

## Attack surface

(1) Port the discrete-case log-shaving to the continuous case, where the
record is worse. (2) Restricted inputs: for c-packed, kappa-straight, or
low-density curves, (1+eps)-approximations run in near-linear time — try to
enlarge these classes or de-approximate them. (3) The decision version
(is the distance at most delta?) is where the hardness lives; the
optimization overhead (parametric search / randomized search) is a separate,
possibly removable log. (4) For lower bounds, Bringmann's construction uses
1D curves already — squeezing the approximation constant above 1.001, or
basing hardness on the weaker OV hypothesis for approximation factors up to
3, are concrete open strengthenings.
