---
id: dynamic-transitive-closure-omv-hardness
title: "Base the ~n^1.407 dynamic transitive closure bound on the standard OMv conjecture"
genre: missing-hardness
problems: ["Dynamic Transitive Closure", "Dynamic st-Reachability", "Dynamic Matrix Inverse"]
hypotheses: [OMv, "hinted OMv variants"]
record: "roughly O(n^{1.407}) worst-case update and pair-query time via dynamic matrix inverse"
record_ref: "van den Brand, Nanongkai & Saranurak, FOCS 2019"
hardness: "matching ~n^{1.406} bound known only under 'hinted' OMv/uMv variants; standard OMv gives only weaker update/query tradeoffs"
hardness_ref: "van den Brand, Nanongkai & Saranurak, FOCS 2019; Henzinger, Krinninger, Nanongkai & Saranurak, STOC 2015"
endgame: none known
status: open
confidence: high
verified: 2026-08-10
tags: [omv, dynamic, reachability, matrix-inverse, algebraic]
---

## Statement

Fully dynamic transitive closure: maintain a directed graph on n vertices under edge insertions and deletions, answering queries "is there a path from u to v?". The best algebraic algorithms achieve update and query time around n^{1.407} (exponent governed by fast matrix multiplication). The challenge: prove a matching conditional lower bound of the form n^{1.407-o(1)} (or even any bound beating the known ones) assuming only the *standard* OMv conjecture — or, alternatively, improve the algorithm and show the hinted-variant lower bounds are not tight.

## Current record

Sankowski (FOCS 2004) gave dynamic-matrix-inverse-based algorithms, e.g. update time O(n^{1.575}) with query time O(n^{0.575}). Van den Brand, Nanongkai and Saranurak (FOCS 2019) improved the balanced tradeoff to roughly n^{1.407} for both update and pair query, and proved an essentially matching lower bound of about n^{1.406} — but only under strengthened "hinted" versions of the OMv/uMv conjectures, where the adversary commits to part of the input in advance. Under the standard OMv conjecture of Henzinger, Krinninger, Nanongkai and Saranurak (STOC 2015), only weaker tradeoffs are known — of the flavor that st-reachability cannot have both n^{1-eps} amortized update time and n^{2-eps} query time — which do not explain the exponent 1.407 at all.

## Why it matters

This is one of the cleanest cases in fine-grained complexity where the tight bound is "known" but rests on a bespoke hypothesis invented to match the algorithm. Deriving the hinted variants from standard OMv (a reduction between hypotheses) would consolidate the hypothesis zoo and make the n^{1.407} bound a genuine consequence of a single widely believed conjecture. A refutation of a hinted variant would instead predict an algorithmic improvement for one of the most-studied dynamic problems. Either resolution moves many downstream bounds proved with the same machinery (dynamic rank, DAG path counting, dynamic largest eigenvalue).

## Attack surface

The gap between standard and hinted OMv is about when the reduction gets to see which entries matter — a hint-elimination argument (random self-reduction over the hint space, or a direct-sum trick averaging over hints) is the natural shape of a solution. Template to imitate: the equivalences HKNS already proved between OMv and uMv, which trade query granularity for quantity. A concrete first target: derive from standard OMv any lower bound above n^{1.0} for worst-case update time of dynamic transitive closure with n^{o(1)} queries, since currently the strong exponents all pass through hints. Encouraging recent precedent: Hu and Polak (arXiv:2409.15970, 2024) proved that several a-priori-weaker non-Boolean OMv variants (equality, dominance, min-witness, min-max, bounded monotone min-plus) are all *equivalent* to standard OMv — the first fine-grained equivalence class around OMv — but the hinted variants remain outside this class.
