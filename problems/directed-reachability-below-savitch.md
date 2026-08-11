---
id: directed-reachability-below-savitch
title: "Directed st-connectivity in o(log^2 n) space — Savitch's 1970 bound is still the record, while the undirected case fell all the way to L"
genre: improve-algorithm
problems: ["Directed st-Connectivity", "NL vs L", "Savitch's Theorem"]
hypotheses: []
record: "STCON is solvable in deterministic space O(log^2 n); equivalently NSPACE(S) ⊆ DSPACE(S^2)"
record_ref: "Savitch, JCSS 1970"
hardness: "STCON is NL-complete, so beating log^2 n improves the deterministic simulation of all of NL; no space lower bound beyond the trivial Omega(log n) is known, and L vs NL is open"
hardness_ref: "NL-completeness folklore (Jones 1975); promise-case record: Allender & Lange, Theory of Computing Systems 1998 (RUSPACE(log n) ⊆ DSPACE(log^2 n / log log n))"
endgame: "already unconditional — via NL-completeness any o(log^2 n) algorithm improves Savitch's theorem wholesale, and the precedent is published: undirected reachability descended log^{3/2} → log^{4/3} → log n log log n → O(log n), ending at SL = L (Reingold, JACM 2008)"
status: open
confidence: high
verified: 2026-08-10
tags: [space-complexity, reachability, nl, savitch, quantum-logspace]
---

## Statement

Decide, given a directed graph G and vertices s, t, whether t is reachable
from s, using deterministic (or even randomized) space o(log^2 n). Savitch's
55-year-old bound O(log^2 n) is the record; by NL-completeness of STCON, any
improvement gives NSPACE(S) ⊆ DSPACE(o(S^2)) for all space bounds S ≥ log n.
Even O(log^2 n / log log n) without a promise would be new.

## Current record

Savitch (JCSS 1970) recurses on "is there a path from u to v of length ≤ 2^i
through some midpoint w", paying log n per level over log n levels. Nothing
better is known for general digraphs — not even for randomized algorithms,
since BPL-style random walks fail on directed graphs. The instructive contrast
is the undirected case, which collapsed in stages: Nisan–Szemerédi–Wigderson
(log^{1.5} n, 1992), Armoni–Ta-Shma–Wigderson–Zhou (log^{4/3} n, JACM 2000),
Trifonov (log n log log n, STOC 2005), and Reingold's SL = L (STOC 2005, JACM
2008) via expander-based derandomized squaring. For directed graphs the only
sub-Savitch results live under promises: Allender–Lange solve
reach-unambiguous STCON in space O(log^2 n / log log n) (ToCS 1998), which
Garvin–Stolee–Tewari–Vinodchandran (2011) extended to ReachFewL = ReachUL —
polynomially many paths — and these classes also sit in SC^2. In poly time
simultaneously, Barnes–Buss–Ruzzo–Schieber give space n / 2^{Theta(sqrt(log
n))}, still the best sublinear-space polynomial-time algorithm.

## Why it matters

This is the deterministic frontier of NL vs L, the directed sibling of the
solved SL = L, and the exponent that Savitch fixed at 2 in 1970 has never
moved. It is newly live from the quantum side: Girish–Raz–Zhan (ICALP 2021)
power bounded-norm matrices in quantum logspace, and Apers–Edenhofer (CCC
2025) decide and even count few-paths STCON in BQSPACE(O(log n)) — where the
best classical bound is the Allender–Lange log^2/log log — producing the first
natural (non-promise) candidate language separating BQL from L and BPL. A
classical o(log^2 n) algorithm for general STCON would deflate that candidate;
a proof that classical algorithms are stuck would be a first-of-its-kind
separation. Allender has singled out improving Allender–Lange as a career-long
open question.

## Attack surface

(1) Port derandomized squaring: Reingold's machinery needs spectral facts that
fail for directed graphs, but the Eulerian/directed-Laplacian solver line
(Cohen et al.) gives small-space primitives for structured digraphs — find the
right directed analogue of expansion. (2) Improve the promise-free tradeoff:
extend Allender–Lange's log^2/log log from reach-unambiguous to general
graphs, possibly via the Cook–Mertz tree-evaluation trick, which already
shaved log factors in adjacent simulations. (3) Special graph classes with the
full log^2: planar digraphs, layered DAGs of width poly(n), mangroves —
Allender conjectures mangroves are easier. (4) Lower bounds in restricted
models (JAG/NNJAG), where Savitch is known to be near-optimal, to scope what
any improvement must evade.
