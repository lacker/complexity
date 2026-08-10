# Card Index

41 open problems, each anchored to a published record. Generated from `cards/` frontmatter — do not edit by hand.

## Improve an algorithm (22)

| Card | Confidence | Challenge |
|---|---|---|
| [3sat-below-1-307](cards/3sat-below-1-307.md) | high | Solve 3-SAT faster than O(1.307^n) — beat the improved PPSZ record |
| [3sum-log-shaving](cards/3sum-log-shaving.md) | high | Beat n^2 (log log n)^{O(1)} / log^2 n for 3SUM — or explain why two log factors is the ceiling |
| [chromatic-number-below-2n](cards/chromatic-number-below-2n.md) | high | Compute the chromatic number in O((2-ε)^n) time — break the 2^n inclusion-exclusion barrier |
| [combinatorial-bmm-savings](cards/combinatorial-bmm-savings.md) | medium | Beat n^3 / 2^{Omega((log n)^{1/7})} for combinatorial Boolean matrix multiplication — push the savings toward 2^{Omega(log n)}, i.e., truly subcubic |
| [directed-hamiltonicity-below-2n](cards/directed-hamiltonicity-below-2n.md) | high | Detect a directed Hamiltonian cycle in O((2-ε)^n) — close the gap with Björklund's 1.657^n for undirected graphs |
| [directed-k-path-below-2k](cards/directed-k-path-below-2k.md) | high | Find a directed k-path faster than O*(2^k) — match the undirected 1.657^k |
| [dtw-loglog-barrier](cards/dtw-loglog-barrier.md) | medium | Dynamic time warping is stuck at O(n^2 / log log n)-type bounds — catch up to edit distance's log^2 shaving, or explain why not |
| [edit-distance-shave-the-logs](cards/edit-distance-shave-the-logs.md) | high | Beat O(n^2 / log^2 n) for edit distance, or shave a third log factor — the 46-year-old record vs the SETH quadratic wall |
| [frechet-subquadratic-gap](cards/frechet-subquadratic-gap.md) | medium | Close the gap for Fréchet distance: record ~O(n^2 sqrt(log n)) vs Bringmann's SETH bound ruling out even 1.001-approximation in n^{2-eps} |
| [lcs-beat-masek-paterson](cards/lcs-beat-masek-paterson.md) | high | Beat O(n^2 / log^2 n) for Longest Common Subsequence — SETH says no n^{2-eps}, circuits say polylog shaving is already big |
| [matmul-omega-record](cards/matmul-omega-record.md) | high | Multiply n x n matrices in n^{2.371338} time — beat omega < 2.371339 — or break the Ambainis–Filmus–Le Gall 2.3725 laser-method barrier some other way |
| [min-weight-k-clique-hub](cards/min-weight-k-clique-hub.md) | medium | Min-Weight k-Clique: beat n^k/2^{Θ(√log n)} for some fixed k ≥ 4, or prove APSP-hardness for any k beyond 3 |
| [mis-below-1-1996](cards/mis-below-1-1996.md) | high | Find a maximum independent set faster than O(1.1996^n) |
| [omv-total-time-upper-bound](cards/omv-total-time-upper-bound.md) | high | Beat n^3 / 2^Ω(√log n) total time for Online Matrix-Vector multiplication |
| [regex-matching-log-gap](cards/regex-matching-log-gap.md) | medium | Regular expression matching: beat the ~O(nm / log^{1.5} n) record, with SETH forbidding (nm)^{1-eps} |
| [rna-folding-omega-gap](cards/rna-folding-omega-gap.md) | medium | RNA folding and Dyck edit distance: record ~O(n^{2.687}) via bounded-difference min-plus vs the n^omega clique barrier — close the gap |
| [sorting-x-plus-y](cards/sorting-x-plus-y.md) | high | Sort X+Y in o(n^2 log n) time — Fredman showed O(n^2) comparisons suffice, but no algorithm realizes it |
| [subset-sum-below-2-n-over-2](cards/subset-sum-below-2-n-over-2.md) | high | Solve worst-case Subset Sum faster than O*(2^{n/2}) — beat 50-year-old meet-in-the-middle |
| [super-strong-eth-ksat-savings](cards/super-strong-eth-ksat-savings.md) | medium | Beat PPSZ's Θ(1/k) savings for k-SAT — solve k-SAT in 2^{n(1 - ω(1/k))} time |
| [tree-evaluation-log-space](cards/tree-evaluation-log-space.md) | high | Put Tree Evaluation in O(log n) space, beating the Cook–Mertz O(log n · log log n) bound |
| [tsp-below-2n](cards/tsp-below-2n.md) | high | Solve weighted TSP in O((2-ε)^n) — beat Bellman–Held–Karp after 60+ years |
| [unweighted-ted-exponent](cards/unweighted-ted-exponent.md) | medium | Unweighted tree edit distance sits between n^2 (SETH) and ~n^{2.95} (Mao) — close the exponent gap |

## Find the missing hardness (11)

| Card | Confidence | Challenge |
|---|---|---|
| [attention-bounded-entry-threshold](cards/attention-bounded-entry-threshold.md) | high | Pin down the exact entry-size threshold for fast attention: n^{1+o(1)} algorithms at B = o(sqrt(log n)) vs SETH-hardness at B = Theta(sqrt(log n)) — close the constant-factor window and extend it to relative error |
| [binary-jumbled-indexing](cards/binary-jumbled-indexing.md) | medium | Binary jumbled indexing: beat O(n^{1.859}) preprocessing or prove it 3SUM-hard |
| [dynamic-cell-probe-polylog-barrier](cards/dynamic-cell-probe-polylog-barrier.md) | high | Beat Ω̃((log n / log log n)^2) — the highest unconditional cell-probe lower bound for any dynamic problem |
| [dynamic-transitive-closure-omv-hardness](cards/dynamic-transitive-closure-omv-hardness.md) | medium | Base the ~n^1.407 dynamic transitive closure bound on the standard OMv conjecture |
| [gaussian-kde-middle-regime](cards/gaussian-kde-middle-regime.md) | medium | Close the middle regime for Gaussian kernel density evaluation in dimension Theta(log n): fast algorithms need squared radius o(log n), SETH-hardness is known only at high accuracy — one side must give |
| [hopcroft-problem-hardness](cards/hopcroft-problem-hardness.md) | medium | Certify the n^{4/3} exponent of Hopcroft's problem with a fine-grained lower bound — the O(n^{4/3}) algorithm now exists, the hardness doesn't |
| [radius-seth-hardness](cards/radius-seth-hardness.md) | high | Base the m^2 hardness of sparse Radius on SETH — today it rests only on the Hitting Set conjecture |
| [set-cover-conjecture-vs-seth](cards/set-cover-conjecture-vs-seth.md) | high | Link the Set Cover Conjecture to SETH — or solve Set Cover in O((2-ε)^n) |
| [set-disjointness-space-time](cards/set-disjointness-space-time.md) | medium | SetDisjointness data structures: prove space · t^2 = Ω̃(N^2) from 3SUM, matching the folklore upper bound |
| [undirected-diameter-53-approx](cards/undirected-diameter-53-approx.md) | medium | Undirected diameter: find a 5/3-approximation faster than Õ(m^{3/2}), or extend SETH-hardness to ratios above 5/3 at that runtime |
| [wildcard-matching-beat-fft](cards/wildcard-matching-beat-fft.md) | high | Wildcard pattern matching runs in O(n log m) via FFT with no lower bound at all — beat it, or prove it equivalent to Boolean convolution |

## Complete an equivalence (4)

| Card | Confidence | Challenge |
|---|---|---|
| [diameter-vs-apsp-equivalence](cards/diameter-vs-apsp-equivalence.md) | high | Compute the diameter of a dense weighted graph in truly subcubic time, or reduce APSP to Diameter |
| [exact-triangle-two-pillar-roof](cards/exact-triangle-two-pillar-roof.md) | medium | Exact-Weight Triangle: find a truly subcubic algorithm (refuting both 3SUM and APSP conjectures at once) or reduce it back to either pillar |
| [pillar-reductions-apsp-3sum-seth](cards/pillar-reductions-apsp-3sum-seth.md) | high | Find a fine-grained reduction between any two of the three pillars — SETH/OV, 3SUM, APSP — in any direction |
| [weighted-ted-apsp-equivalence](cards/weighted-ted-apsp-equivalence.md) | high | Weighted tree edit distance is APSP-hard but only one-way: break O(n^3) or reduce it back to APSP to complete the equivalence |

## Tighten an overhead (3)

| Card | Confidence | Challenge |
|---|---|---|
| [dynamic-connectivity-loglog-gap](cards/dynamic-connectivity-loglog-gap.md) | high | Close the (log log n)^2 gap in amortized dynamic connectivity: O(log n (log log n)^2) vs Ω(log n) |
| [time-space-sqrt-simulation](cards/time-space-sqrt-simulation.md) | high | Improve TIME[t] ⊆ SPACE[sqrt(t log t)]: shave the sqrt(log t) factor, or push the exponent below 1/2 |
| [triangle-listing-3sum-gap](cards/triangle-listing-3sum-gap.md) | medium | Triangle listing: close the gap between m^{4/3-o(1)} (3SUM-hard) and Õ(m^{2ω/(ω+1)}) ≈ m^{1.41} |

## Transfer hardness (1)

| Card | Confidence | Challenge |
|---|---|---|
| [monochromatic-approx-closest-pair](cards/monochromatic-approx-closest-pair.md) | medium | Transfer Rubinstein's SETH-hardness of (1+eps)-approximate closest pair from the bichromatic case to the monochromatic case, or find a subquadratic algorithm |
