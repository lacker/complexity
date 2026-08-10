---
id: weighted-ted-apsp-equivalence
title: "SOLVED — weighted tree edit distance is APSP-equivalent: the missing reduction back to APSP was found at STOC 2025"
genre: equivalence-completion
problems: ["Tree Edit Distance", "All-Pairs Shortest Paths"]
hypotheses: [APSP]
record: "n^3 / 2^{Omega(sqrt(log n))} time, matching APSP; fine-grained equivalent to APSP"
record_ref: "Nogler, Polak, Saha, Vassilevska Williams, Xu & Ye, STOC 2025 (arXiv:2411.06502)"
hardness: "no O(n^{3-eps}) algorithm for weighted TED (alphabet size Theta(n)) unless APSP has a truly subcubic algorithm"
hardness_ref: "Bringmann, Gawrychowski, Mozes & Weimann, SODA 2018"
status: solved
confidence: high
verified: 2026-08-10
tags: [trees, strings, fine-grained, apsp, equivalence]
---

## Resolution

This card's direction (b) was achieved. Nogler, Polak, Saha, Vassilevska
Williams, Xu, and Ye (STOC 2025, arXiv:2411.06502) reduced weighted tree edit
distance to APSP with subcubic overhead, completing the equivalence: weighted
TED is now a full member of the APSP equivalence class, and inherits Williams'
n^3 / 2^{Omega(sqrt(log n))} algorithm — the first improvement over the 2007
Demaine–Mozes–Rossman–Weimann O(n^3) bound. The same paper improved the
*unweighted* TED record to about O(n^{2.6857}) (see the card
`unweighted-ted-exponent`, which remains open). The card below is preserved
as originally written: it is a worked example of an equivalence-completion
problem posed and then closed by exactly the kind of reduction it asked for.

## Statement

Tree edit distance (TED) generalizes string edit distance to rooted ordered
labeled trees: transform one tree into the other by node insertions,
deletions, and relabelings of minimum total cost. For arbitrary cost
functions (weighted TED), either (a) find an O(n^{3-eps}) algorithm — which
would refute the APSP hypothesis — or (b) give a reduction from weighted TED
to All-Pairs Shortest Paths with subcubic overhead, proving TED is
*equivalent* to APSP and thus a full member of the APSP equivalence class.
Either direction closes this card.

## Current record

Demaine, Mozes, Rossman, and Weimann (2007) achieved O(n^3), improving the
long-standing O(n^3 log n) of Klein and the O(n^4) of Zhang–Shasha, and
proved their algorithm optimal among the entire family of "decomposition
strategy" dynamic programs that all previous algorithms belonged to.
Bringmann, Gawrychowski, Mozes, and Weimann (SODA 2018) then showed this is
conditionally optimal in general: they reduced APSP to weighted TED (using
alphabet size growing with n), so a truly subcubic weighted TED algorithm
gives truly subcubic APSP. They also showed the unweighted, constant-alphabet
case is hard for *combinatorial* algorithms via Boolean matrix
multiplication — a prediction validated when Mao (FOCS 2021) broke the cubic
barrier for unweighted TED using fast matrix multiplication (about
O(n^{2.9546})). Crucially, no reduction from weighted TED *to* APSP is known:
the hardness is a one-way edge.

## Why it matters

The APSP equivalence class (negative triangle detection, graph radius,
replacement paths, ...) is fine-grained complexity's best-developed cluster,
and weighted TED is a rare natural problem shown APSP-hard but not APSP-easy.
Completing the equivalence would mean any future subcubic APSP breakthrough
instantly speeds up a core bioinformatics/XML-processing primitive; a
subcubic TED algorithm, conversely, would demolish the APSP hypothesis
itself. The weighted-vs-unweighted split (unweighted fell below n^3, weighted
is APSP-hard) also makes TED the cleanest known example of weights being the
true source of cubic hardness in a DP.

## Attack surface

For direction (b), the target is expressing the TED dynamic program as a
sequence of (min,+) matrix products over structured matrices — Klein-style
decompositions already organize the DP into products; the obstruction is
that the matrices are not arbitrary, but nobody has shown they embed into
polynomially many APSP calls. Mao's unweighted breakthrough works because
constant alphabets force bounded-difference structure enabling fast min-plus
products; the concrete intermediate question is how large an alphabet (or how
wild a cost function) still admits subcubic time. For direction (a), any
weight class beyond constant alphabets with a subcubic algorithm — e.g.,
weights in {0, 1, ..., polylog n} — would be a publishable wedge.
