---
id: set-cover-conjecture-vs-seth
title: "Link the Set Cover Conjecture to SETH — or solve Set Cover in O((2-ε)^n)"
genre: missing-hardness
problems: ["Set Cover", "k-SAT", "Steiner Tree", "Connected Vertex Cover"]
hypotheses: [SCC, SETH]
record: "2^n · poly(m) time over n elements and m sets (dynamic programming / inclusion-exclusion)"
record_ref: "folklore DP; inclusion-exclusion framework: Björklund, Husfeldt & Koivisto, SICOMP 2009"
hardness: "Set Cover Conjecture (no (2-ε)^n · poly(m) algorithm) is itself the unproven hypothesis; no derivation from SETH is known in either direction"
hardness_ref: "Cygan, Dell, Lokshtanov, Marx, Nederlof, Okamoto, Paturi, Saurabh & Wahlström, CCC 2012 (journal: ACM TALG 2016)"
endgame: "the hardness side is loop-shaped: a proof of SCC would refute Strassen's asymptotic rank conjecture (Björklund & Kaski, STOC 2024, arXiv:2310.11926) and yield explicit tensor families of asymptotic rank ≥ N^{1.08} (Pratt, STOC 2024, arXiv:2311.02774) — an unconditional algebraic lower bound; no analogous published path from the algorithmic side"
status: open
confidence: high
verified: 2026-08-10
tags: [set-cover, seth, scc, hypotheses, exponential-time, reductions]
---

## Statement

Set Cover: given a universe of n elements and a family of m subsets, find
the fewest sets whose union is the whole universe. The Set Cover Conjecture
(SCC) asserts there is no O((2-ε)^n · poly(m)) algorithm for any ε > 0.
Close this problem in any of three ways: (a) refute SCC with a (2-ε)^n
algorithm; (b) prove SCC follows from SETH (a reduction from k-SAT with n
variables to Set Cover with roughly n elements, tight enough that a (2-ε)^n
Set Cover algorithm would give a (2-δ)^n k-SAT algorithm for all k); or
(c) prove the reverse implication, SETH from SCC.

## Current record

The 2^n · poly(m) upper bound is subset dynamic programming (or
inclusion-exclusion in the Björklund–Husfeldt–Koivisto style, SICOMP 2009).
SCC was formulated by Cygan, Dell, Lokshtanov, Marx, Nederlof, Okamoto,
Paturi, Saurabh and Wahlström in "On Problems as Hard as CNF-SAT" (CCC
2012; TALG 2016), which built a small web of tight equivalences around it:
under SCC, Steiner Tree, Connected Vertex Cover, Set Partitioning and
others cannot beat their known bases. What is conspicuously missing is any
bridge between this web and the SETH web. The known SAT-to-Set-Cover
reductions blow up the universe size by a constant factor, which destroys
tightness at base 2: they rule out nothing about (2-ε)^n. The two
hypotheses currently float independently — an unusual and unstable-looking
state for two central assumptions of the same field. Meanwhile SCC has
acquired a serious enemy from an unexpected direction: Björklund and Kaski
(STOC 2024, arXiv:2310.11926) proved that Strassen's asymptotic rank
conjecture (ARC) and SCC cannot both be true, and Pratt (STOC 2024,
arXiv:2311.02774) strengthened this — ARC implies Set Cover with
bounded-size sets in (3/2^{2/3} + ε)^n ≈ 1.8899^n time, and conversely SCC
implies explicit tensor families of asymptotic rank at least N^{1.08}. So
refuting SCC now reduces to a (widely believed) statement in algebraic
complexity, while SETH ↔ SCC remains open in both directions.

## Why it matters

Fine-grained complexity rests on a handful of hypotheses (SETH, 3SUM, APSP,
SCC), and edges between them are the field's most valuable commodity.
SETH → SCC would consolidate dozens of (2-ε)^n lower bounds (Steiner Tree,
Connected Vertex Cover, and the CDLMNOPSW cluster) under the standard
assumption, instantly upgrading their status. A refutation of SCC would be
a first-rank algorithmic breakthrough with immediate consequences for the
same cluster, plus pressure on the 2^n records for chromatic number and
weighted TSP (see problems chromatic-number-below-2n, tsp-below-2n).

## Attack surface

(1) The obstruction is understood: k-SAT clauses interact with an
assignment universe multiplicatively, while set cover elements are covered
disjunctively — a tight reduction needs a gadget encoding n Boolean
variables into n(1+o(1)) elements. Study why the CDLMNOPSW reductions among
covering problems are tight but SAT resists; the paper itself poses this.
(2) Intermediate hypotheses: reductions from SETH to SCC restricted to
sets of bounded size k (mirroring clause width) are a graded version worth
attempting first — SCC for constant-size sets is already meaningful.
(3) For refutation, the now-sharpest route is via tensors: by
Björklund–Kaski and Pratt (both STOC 2024), proving low-enough rank for one
explicit tensor family refutes SCC — Pratt shows that improving the known
(1/2)8^n bound on the tensor rank of a specific T_n to (2/(9n))8^n for any
single n already suffices. The older algebraic toolkit that broke 2^n for
coloring special cases (Zamir, ICALP 2021) and bipartite TSP (Nederlof,
STOC 2020) marks Set Cover with structured set families as the soft spot.
