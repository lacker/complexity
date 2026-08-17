# Research notebook: SAT/CAPP beyond ACC0 o THR

Started: 2026-08-12

## Goal

Find a deterministic `2^n / n^{omega(1)}`-time SAT or CAPP algorithm for a
polynomial-size depth-3 threshold circuit class, or make a provably useful
step beyond the current `ACC0 o THR` frontier.

The full target is deliberately ambitious. This notebook records exact
parameter calculations, intermediate lemmas, failed approaches, and source
checks so that a negative research pass remains reusable.

## Workstreams

- `ctw-estimator.md`: reconstruct and probe composition of the 2026
  Chen--Tal--Wang threshold-circuit estimator.
- `sparse-ltf-restrictions.md`: reconstruct the sparse-wire threshold #SAT
  algorithms and test denser restriction schedules.
- `intermediate-targets.md`: map the smallest meaningful class beyond the
  existing frontier.
- `top-interface-audit.md`: independent line-by-line audit and correction of
  the proposed CTW top-interface lifting.
- `lower-bound-bridge.md`: audit the Chen--Ren depth-3-majority implication
  and a shared-seed majority-polynomial composition.
- `shared-seed-audit.md`: second independent proof audit of the
  product-of-fan-ins depth-3 majority CAPP corollary.
- `main-analysis.md`: synthesis, original calculations, candidate lemmas, and
  final assessment.
- `sources.md`: primary-source bibliography and verification status.

## Epistemic labels

- **Theorem:** directly supported by a cited primary source.
- **Derived:** an explicit calculation from stated theorems.
- **Candidate lemma:** a statement not yet proved here.
- **Gap:** a missing step that invalidates a proposed proof.
- **Experiment:** a finite or symbolic computation worth running.
