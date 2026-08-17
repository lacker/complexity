# Primary-source map

Checked: 2026-08-12.  Detailed theorem numbers and parameter ledgers live in
the topic notes; this file is the short bibliography.

1. R. Ryan Williams, [*New Algorithms and Lower Bounds for Circuits With
   Linear Threshold Gates*](https://theoryofcomputing.org/articles/v014a017/),
   Theory of Computing 2018 / STOC 2014.  Deterministic analysis of
   `ACC0 o THR` and the all-input `1hotSUM o ETHR` evaluator.
2. Josh Alman, Timothy M. Chan, and R. Ryan Williams,
   [*Polynomial Representations of Threshold Functions and Algorithmic
   Applications*](https://arxiv.org/abs/1608.04355), FOCS 2016.  Low-randomness
   majority polynomials; deterministic `AC0 o LTF o LTF` SAT; randomized
   three-threshold-layer SAT and its explicit derandomization question.
3. Ruiwen Chen, Rahul Santhanam, and Srikanth Srinivasan,
   [*Average-Case Lower Bounds and Satisfiability Algorithms for Small
   Threshold Circuits*](https://theoryofcomputing.org/articles/v014a009/),
   Theory of Computing 2018 / CCC 2016.  Sparse-wire restriction recurrence.
4. Lijie Chen and R. Ryan Williams,
   [*Stronger Connections Between Circuit Analysis and Circuit Lower Bounds,
   via PCPs of Proximity*](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.CCC.2019.19),
   CCC 2019.  CAPP-to-lower-bound connections and constant-XOR closure.
5. Lijie Chen and Hanlin Ren,
   [*Strong Average-Case Circuit Lower Bounds from Non-trivial
   Derandomization*](https://eccc.weizmann.ac.il/report/2020/010/), STOC 2020.
   Inverse-size CAPP for polynomial-size `MAJ o MAJ` would imply
   `NEXP` is not contained in `MAJ o MAJ o MAJ`.
6. Lijie Chen, Avishay Tal, and Yichuan Wang,
   [*Super-quadratic Lower Bounds for Depth-2 Linear Threshold
   Circuits*](https://eccc.weizmann.ac.il/report/2026/039/), STOC 2026.
   The `n^(2.5-eta)` list estimator and exact `POLY_F2 o THR` column evaluator.
7. Suguru Tamaki,
   [*A Satisfiability Algorithm for Depth Two Circuits with a Sub-Quadratic
   Number of Symmetric and Threshold Gates*](https://eccc.weizmann.ac.il/report/2016/100/),
   ECCC TR16-100.  Candidate terminal routine for the sparse-wire hybrid.
8. Gabriel Bathie and R. Ryan Williams,
   [*Towards Stronger Circuit Lower Bounds from
   Algorithms*](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ITCS.2024.10),
   ITCS 2024.  Modern CAPP-to-lower-bound framework used by CTW.

## Verification cautions

- CSS Theorem 6.4 is formally a SAT theorem, not a stated `#SAT` theorem;
  later PTF papers provide explicit zero-error exact-counting recurrences.
- CTW's CAPP error is `o(1)` and explicitly about `n^(-Omega(eta))`, not the
  inverse-circuit-size accuracy assumed by Chen--Ren.
- `SYM` includes unweighted majority but not arbitrary weighted threshold.
- The CTW top-interface lifting in this notebook passed an interface audit,
  but its novelty has not been exhaustively checked.
