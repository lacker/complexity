---
id: dijkstra-sorting-barrier-sssp
title: "The sorting barrier for SSSP is broken twice over — now at O(m sqrt(log n)); how close to linear time can comparison-addition shortest paths go?"
genre: improve-algorithm
problems: ["Single-Source Shortest Paths", "Non-negative Real Weights SSSP"]
hypotheses: []
record: "deterministic O(m sqrt(log n) + sqrt(mn log n log log n)) time — O(m sqrt(log n log log n)) on sparse graphs"
record_ref: "Duan, Mao, Shu & Yin, ICALP 2026 (arXiv:2602.07868)"
hardness: "none beyond trivial Omega(m + n); Omega(m + n log n) holds only if vertices must be output in sorted distance order"
hardness_ref: "sorted-output case: comparison-sorting reduction; see also universal optimality of Dijkstra, Haeupler, Hladík, Rozhoň, Tarjan & Tětek, FOCS 2024"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [graphs, shortest-paths, dijkstra, sorting-barrier, comparison-addition, deterministic]
---

## Statement

In the comparison-addition model (real non-negative edge weights, only
comparisons and additions allowed), compute single-source shortest paths in a
directed graph faster than O(m sqrt(log n) + sqrt(mn log n log log n)). The
clean open targets: O(m sqrt(log log n))-type bounds, and ultimately
O(m + n) — no known barrier stops linear time when sorted output is not
required.

## Current record

Dijkstra with Fibonacci heaps (Fredman–Tarjan 1984) gives O(m + n log n), and
for forty years this was conjectured optimal for sparse graphs — it is
optimal for any algorithm that outputs vertices in distance order, since that
sorts n reals. Duan, Mao, Mao, Shu and Yin (STOC 2025 best paper,
arXiv:2504.17033) broke the barrier with a deterministic O(m log^{2/3} n)
algorithm mixing Bellman–Ford relaxation rounds into a recursive
partial-ordering structure that avoids maintaining a full priority queue.
Duan, Mao, Shu and Yin (ICALP 2026, arXiv:2602.07868) then improved this to
deterministic O(m sqrt(log n) + sqrt(mn log n log log n)), i.e.,
O(m sqrt(log n log log n)) for sparse graphs — also surpassing their earlier
randomized O(m sqrt(log n log log n)) bound for undirected graphs (FOCS 2023)
while being deterministic and directed. Complementing this, Haeupler, Hladík,
Rozhoň, Tarjan and Tětek (FOCS 2024) proved Dijkstra universally optimal for
the sorted-output version — so everything hinges on dropping the ordering
requirement. Below Ω(m + n) nothing is ruled out.

## Why it matters

SSSP is arguably the most-executed graph algorithm in existence, and this is
the rare case where a textbook-final answer turned out not to be final. The
comparison-addition model is the right yardstick for real weights: integer
RAM tricks (Thorup's linear-time undirected SSSP) don't apply, so the record
measures genuinely structural understanding of how much of Dijkstra's
ordering work is necessary. Each improvement has come with a transferable
tool — the STOC 2025 partial-order recursion is already being ported to
parallel and dynamic settings — and the endpoint question (is sorting
avoidable entirely, i.e., is SSSP in O(m + n)?) is a fundamental
information-theoretic question about shortest paths, not just a data
structure race. There is also a model gap to close: directed integer-weight
SSSP on the word RAM still has no linear-time algorithm, and progress here
feeds that question.

## Attack surface

The two published improvements decompose the cost transparently: the
recursion trades off the number of Bellman–Ford-style relaxation levels
against the size of the "frontier" sets that must be partially sorted, and
the current sqrt(log n) is exactly the balance point of that trade-off —
restructuring either side (fewer levels via better pivot selection, cheaper
frontiers via weaker ordering invariants) moves the bound mechanically.
Special cases worth attacking first: undirected graphs (where the FOCS 2023
randomized machinery offers extra slack), constant-degree graphs, and the
regime m = Theta(n) where the second term vanishes. On the lower-bound side,
nothing separates SSSP from connectivity in this model — proving any
super-linear comparison-addition lower bound for unordered SSSP, or reducing
sorting to it under some restriction, would be the first barrier of its kind.
