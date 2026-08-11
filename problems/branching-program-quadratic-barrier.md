---
id: branching-program-quadratic-barrier
title: "Beat Nechiporuk: Ω(n²/log²n) has been the size record for general branching programs since 1966 — and the magnification threshold sits at n^{2+ε}"
genre: missing-hardness
problems: ["Element Distinctness", "Branching Program Lower Bounds", "MKtP"]
hypotheses: []
record: "Ω(n²/log² n) branching-program size for Element Distinctness, via Nechiporuk's 1966 counting method — still the best bound for any explicit function; nondeterministic record Ω(n^{3/2}/log n), same method"
record_ref: "Nečiporuk, Soviet Math. Doklady 1966; see Jukna, Boolean Function Complexity (Springer 2012), §15, and Beame, Grosshans, McKenzie & Segoufin, ACM ToCT 2017 (arXiv:1608.01932)"
hardness: "no conditional bound; the method itself is provably capped — Nechiporuk-style arguments cannot give more than Θ(n²/log²n) for deterministic and O(n^{3/2}/log n) for nondeterministic or parity branching programs — and for superpolynomial targets the natural-proofs barrier applies, since poly-size BPs contain NC1 (Barrington) and hence candidate PRFs"
hardness_ref: "Beame, Grosshans, McKenzie & Segoufin, ACM ToCT 2017 (arXiv:1608.01932); Barrington, JCSS 1989; Razborov & Rudich, JCSS 1997"
endgame: "polynomial-size branching programs equal nonuniform logspace, so superpolynomial BP bounds for a function in P give P ⊄ L/poly; the published bridge just past the record: Gap-MKtP ∉ BP[N^{2+ε}] implies EXP ⊄ BP[poly] (Oliveira, Pich & Santhanam, CCC 2019, ECCC TR18-158), and any 2^{n^β}-sparse NP language outside BP[n^{2+ε}] implies NP ⊄ BP[n^k] for all k (Chen, Jin & Williams, FOCS 2019, ECCC TR19-118) — Nechiporuk's n²/log²n sits a log²·n^ε factor below that threshold"
status: open
confidence: high
verified: 2026-08-10
tags: [circuit-complexity, branching-programs, space-complexity, nechiporuk, lower-bounds]
---

## Statement

Prove a lower bound of ω(n²/log²n) on the size of deterministic branching
programs — no restrictions on width, order, or number of reads — computing
an explicit Boolean function. Any asymptotic improvement over Nechiporuk's
bound would be the first progress on the general model in sixty years; a
bound of n^{2+ε} for a suitable sparse or meta-computational problem would
trigger magnification.

## Current record

Nechiporuk's 1966 argument counts the subfunctions a function induces on
blocks of variables: a function with many distinct subfunctions needs many
nodes. Applied to Element Distinctness it gives Ω(n²/log²n) — still the
record for any explicit function, in a model where counting shows random
functions need size 2^n/poly(n). The same argument gives Ω(n^{3/2}/log n)
for nondeterministic branching programs. Both numbers are ceilings of the
method, not the model: Beame, Grosshans, McKenzie and Segoufin (ToCT 2017)
formalized Nechiporuk's method abstractly and proved it can never yield
more than Θ(n²/log²n) deterministically and O(n^{3/2}/log n)
nondeterministically. Activity since then lives in restricted models —
e.g., Volk's 2026 Õ(n²) bound for read-once parity branching programs
(ECCC TR26-115) — while the unrestricted record has not moved.

## Why it matters

Branching-program size is nonuniform space: size 2^{Θ(s)} corresponds to
space s, and poly-size BPs equal L/poly. A superpolynomial bound for an
explicit P function is exactly "P ⊄ L/poly," a nonuniform L vs P
separation — one of the oldest targets in complexity. The magnification
theorems put a much nearer milestone on the same road: OPS show
Gap-MKtP ∉ BP[N^{2+ε}] implies EXP ⊄ BP[poly], and CJW extend the n^{2+ε}
BP threshold to every subexponentially-sparse NP language. So the gap
between what Nechiporuk gives (n²/log²n, for the non-sparse Element
Distinctness) and what magnification needs (n^{2+ε}, for a sparse or
Kolmogorov-flavored problem) is a sliver — closed on one side by a
60-year-old counting argument, guarded on the other by the locality
barrier (see mcsp-magnification-threshold).

## Attack surface

(1) The direct gap: Nechiporuk fails on sparse languages (few accepted
inputs means few subfunctions), which is precisely why the magnification
threshold is safe from it — a subfunction-counting variant that works for
Gap-MKtP or any sparse NP language at n^{2+ε} is the shortest published
path to EXP ⊄ BP[poly]. (2) Semantic width or entropy arguments: the
Beame et al. cap applies to abstract subfunction counting, not to
information-theoretic methods (Ajtai-style time-space arguments give
superlinear bounds for multi-way BPs with bounded time — porting any of
that machinery to unrestricted size bounds is open). (3) Nondeterministic
first: the n^{3/2}/log n cap is lower, so beating it may be easier and
would already show the method is not the final word. (4) Cheap experiment:
compute exact Nechiporuk-optimal functions for small n and check whether
Element Distinctness is extremal, or whether a better subfunction profile
exists.
