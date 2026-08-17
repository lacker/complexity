# Main analysis: trying to solve the depth-3 threshold CAPP problem

Date: 2026-08-12

## Outcome

I did **not** solve CAPP or SAT for unrestricted polynomial-size
`THR o THR o THR`.  I did obtain, and independently audit, two deterministic
CAPP extensions that reach genuine depth three.  The stronger-looking one is
a short black-box lifting of Chen--Tal--Wang (CTW):

```text
XOR_2 o H_t o SYM o THR,
t <= n^(eta/50)/(100 log^2 n),
total bottom-THR occurrences <= O(n^(2.5-eta)).
```

Here each `H_t` is any explicitly given polynomial-size Boolean circuit on at
most `t` inputs.  Its acceptance probability can be deterministically
estimated to error `o(1)` in

```text
2^(n-Omega(n^(eta/50)))
```

time.  In particular this covers the pure-threshold class

```text
XOR_2 o THR_t o MAJ o THR.
```

It does **not** cover `THR_t o THR o THR`: a weighted threshold gate is not a
symmetric gate.  This correction matters.  A separate elementary flattening
does handle `H_t o THR_b o THR` when `tb` is sublinear, and a different CTW
composition appears to handle `SYM o THR_b o THR` with large top fan-in and
very small `b`; both are recorded below.

The second audited result is inverse-polynomial-error deterministic CAPP for

```text
MAJ_M o MAJ_S o THR,
M*S <= n^(2-epsilon).
```

The same proof handles an XOR of any fixed number of such circuits by adding
their final `F_2` polynomials.

This follows by composing two low-randomness probabilistic majority
polynomials and invoking CTW's exact `POLY_F2 o THR` batch evaluator.  One
may use independent seed blocks for clarity, or a single shared seed with the
fixed-semantic-input analysis recorded below.  It is useful as a clean lemma,
but most of its mechanism is already standard in Alman--Chan--Williams
(ACW), so its novelty is low.

The main conceptual output is a precise description of why these results
stop.  An unrestricted extra threshold layer creates **two independent
barriers**:

1. CTW's column-dependent list advice becomes a Cartesian product over
   polynomially many middle gates; and
2. after approximation, the terminal circuit is `POLY_F2 o THR o THR`, while
   CTW's batch evaluator only handles `POLY_F2 o THR`.

The most promising next theorem is therefore not a vague request to “compose
CTW,” but a selected-list batch-evaluation or top-aware advice-compression
lemma that breaks both barriers at once.

## 1. Corrected baseline

The motivating note understated the existing frontier in one respect.
ACW Theorem 1.8 already gives deterministic nontrivial SAT for

```text
AC0[d,m] o LTF o LTF
```

when the bottom LTF layer has `n^(2-delta)` gates and the layers above have
subexponential size.  Thus `ACC0 o THR o THR` is not open without a density
qualification.  A corrected target asks for at least a quadratic bottom
layer, unrestricted polynomial upper fan-in, or a deterministic version of
ACW's stronger randomized three-majority-layer result.

The relevant established results are:

| Result | Circuit resource | Analysis algorithm |
|---|---|---|
| Williams 2014/2018 | subexponential `ACC0 o THR` | deterministic `#SAT`, `2^(n-n^epsilon)` |
| ACW 2016, Thm. 1.8 | `AC0 o LTF o LTF`, bottom layer `n^(2-delta)` | deterministic SAT, `2^(n-n^epsilon)` |
| ACW 2016, Thm. 1.9 | `MAJ o AC0 o LTF o AC0 o LTF`, top and middle fan-in `n^(6/5-delta)` | randomized SAT, `2^(n-n^epsilon)` |
| CSS 2016/2018 | depth `d`, `n^(1+epsilon_d)` wires | randomized nontrivial SAT |
| CTW 2026 | `XOR_2 o THR/SYM o THR`, `n^(2.5-eta)` bottom occurrences | deterministic `CAPP_o(1)`, `2^(n-n^Omega(eta))` |

The ACW randomized algorithm is especially relevant: the authors explicitly
ask whether it can be derandomized, noting that this would give new lower
bounds.  Its `6/5` exponent comes from composing roughly square-root-degree
middle approximators with a cube-root-degree top probabilistic PTF.

A tempting CAPP shortcut is to lower the polynomial errors, enumerate ACW's
short seeds, and count each seeded circuit.  A red-team audit rules this out:
the seeded top is the **sign of an integer polynomial**, and ACW's terminal
matrix algorithm only uses its large value gap to decide whether at least one
branched assignment accepts.  Summing polynomial values does not recover the
number of positive values.  The missing lemma would be a nontrivial counter
for `PTF[n^(1-gamma)] o THR`; CTW's `F_2`-polynomial evaluator does not handle
that sign operation.  Details are in Section 8 of `lower-bound-bridge.md`.

## 2. The CTW engine and the `2.5` exponent

CTW partition the input cube into rows on

```text
k = n^(eta/10)
```

live variables and columns on the remaining variables.  A random exact-`k`
restriction leaves a raw LTF nonconstant with probability
`O(sqrt(k/n))`.  With `m=n^(2.5-eta)` bottom occurrences, almost every column
therefore has at most

```text
ell = n^(2-eta/2)
```

nonconstant occurrences.  The bottom-output vector lies in a subcube of
dimension `ell`.

CTW then list-approximate `1hotSUM` on every such subcube by global
`F_2` polynomials indexed by

```text
r in [R],   R = 2^(n^(eta/100)),
a in [A],   A = n^(10 log n),
degree D <= n^(1-eta/6).
```

Only the advice label `a(z,r)` depends on the column.  Finally, Lemma 5.3
exactly evaluates every column of any

```text
POLY_F2[n^(1-eta/8)] o THR
```

circuit in `2^(n-n^(eta/50))` time.

The exponent arithmetic is the clean chain

```text
2.5  -- LTF restriction saves 0.5 -->  2
  2  -- square-root degree ---------->  1.
```

This also shows why parameter polishing alone cannot raise `2.5`: starting
with `n^(2.5+c)` occurrences leaves `n^(2+c-o(1))` varying coordinates and
requires superlinear degree.

## 3. Audited CTW top-interface lifting

### 3.1 Statement

Fix constant `eta>0`.  For `b in {0,1}`, let

```text
C_b(x) = H_b(S_(b,1)(T_(b,1)(x)), ..., S_(b,q_b)(T_(b,q_b)(x))),
q_b <= t,
```

where:

- `H_b` is an explicit polynomial-size Boolean circuit on `q_b` inputs;
- each `S_(b,j)` is an explicitly given symmetric function;
- each `T_(b,j)` is a list of raw LTF occurrences; and
- the total number of occurrences over the two branches is
  `O(n^(2.5-eta))`.

If

```text
t <= n^(eta/50)/(100 log^2 n),
```

then `Pr[C_0 XOR C_1=1]` has a deterministic `o(1)`-additive estimator in
`2^(n-Omega(n^(eta/50)))` time.

### 3.2 Proof

Put every bottom occurrence in one global multiset.  CTW's partition theorem
finds one live set for which all but `n^(-eta/3)` of the columns have at most
`n^(2-eta/2)` nonconstant occurrences globally.  Every local list is then
good on every global-good column, even when lists overlap.

Apply CTW Theorem 5.2 separately to each local symmetric gate using the same
partition.  Relabel every list family by the same uniform seed set `[R]` and
use one common seed index.  Each family retains the correct uniform marginal,
so a union bound gives simultaneous correctness probability at least

```text
1 - 2t * 2^(-n^(eta/500)).
```

No independence is needed.

Tabulate `H_b` and form its algebraic normal form over `F_2`, of degree at
most `t`.  For each seed and advice tuple, substitute the CTW polynomial for
each middle output.  The final XOR is an `F_2` polynomial over the raw bottom
LTF outputs of degree at most

```text
tD <= n^(1-11eta/75)/(100 log^2 n) < n^(1-eta/8).
```

Thus Lemma 5.3 exactly evaluates every column.  There are at most

```text
R A^(2t)
 <= 2^(n^(eta/100) + 20t log^2 n)
 <= 2^(0.3 n^(eta/50))
```

seed/advice tuples for sufficiently large `n`; this is absorbed by the
`n^(eta/50)` exponent saving of each batch call.  The error is at most

```text
n^(-eta/3) + 2t * 2^(-n^(eta/500)) = o(1).
```

The complete independent audit is in `top-interface-audit.md`.

### 3.3 Exact scope

Taking `H_b=THR_t` gives `THR_t o SYM o THR`.  Taking the middle symmetric
functions to be majority gates gives `THR_t o MAJ o THR`, a genuine
three-layer threshold subclass with a superquadratic bottom-occurrence
budget.  It does not yield arbitrary weighted middle gates.

The likely novelty is modest: this is a short closure observation built from
CTW's theorems, and a targeted search did not locate an explicit statement.
It should be circulated as a candidate corollary for expert checking, not
advertised as a new theorem without a broader search.

## 4. Two other restricted depth-3 algorithms

### 4.1 Low-fan-in weighted middle gates

Every Boolean function of `b` bits has an exact multilinear `F_2` polynomial
of degree at most `b`.  Therefore an arbitrary `H_t o THR_b o THR` circuit
flattens to `POLY_F2[tb] o THR`.  CTW Lemma 5.3 directly gives exact CAPP
with a nontrivial saving whenever

```text
tb <= n^(1-eta/8).
```

Combining this observation more carefully with CTW's list approximation
appears to give the differently oriented class

```text
XOR_2 o SYM_(n^(2.5-delta)) o THR_(fan-in <= n^(delta/100)) o THR
```

in `2^(n-n^Omega(delta))` time.  The parameter ledger is in
`ctw-estimator.md`.  That version still needs a polished formal reduction and
novelty check, so it remains a candidate theorem rather than a result claimed
here.

### 4.2 Shared-seed majority composition

For

```text
C = MAJ_M o MAJ_S o THR,
M*S <= n^(2-epsilon),
```

ACW Theorem 1.1 supplies an `F_2` probabilistic polynomial for a `q`-input
majority of degree `O(sqrt(q log(1/rho)))` using `O(log^2 n)` random bits for
inverse-polynomial `rho`.

Use one seed across all middle gates, with per-gate error `rho/M`, and, most
simply, an independent seed for the outer majority.  In fact an independent
audit shows that even one seed shared across both layers is sound if failures
are charged against every gate's fixed **true semantic input**: whenever the
middle layer is correct, the top polynomial sees that fixed true vector.  No
independence is needed for the union bound.  Keeping two seed blocks makes the
quantifier order transparent at no asymptotic cost.
After composition, the degree is

```text
O(sqrt(MS) log n) <= n^(1-epsilon/3).
```

Enumerate the quasipolynomial seed space and use CTW Lemma 5.3 to count each
resulting `POLY_F2 o THR` circuit exactly.  This gives deterministic
`2^(n-n^Omega(epsilon))` CAPP with any requested inverse-polynomial error.
Taking an XOR of two branches does not increase `F_2` degree and only doubles
the approximation error.

This proposition is valid, but ACW already share one seed across all middle
majorities in the proof of their Theorem 1.8.  The exact depth-3 CAPP
corollary may be unstated, but the method is standard and should not be sold
as a major conceptual advance.

## 5. Why unrestricted depth three still fails

### 5.1 Collective stability is absent

The Kane--Williams/CTW restriction lemma simplifies a raw LTF, not a
`THR o THR` subcircuit.  A single surviving bottom gate can fan out to
polynomially many middle gates, keeping all of them variable.  A bound on
distinct surviving bottom gates therefore does not put the middle-output
vector in a low-dimensional axis-aligned subcube.  Counting occurrences or
wires repairs this only in sparse subclasses.

### 5.2 Vector-advice explosion

One middle symmetric block has

```text
A = n^(10 log n) = 2^(Theta(log^2 n))
```

possible column-advice values.  With `t` blocks, the black-box method
enumerates `A^t`.  CTW's batch call saves only `n^Theta(eta)` in the exponent,
so the transparent limit is

```text
t = O(n^(eta/50)/log^2 n).
```

For disjoint lists, advice vectors can encode essentially independent
fixed-coordinate counts.  Generic coordinatewise compression is therefore
unlikely; a successful lemma must exploit the top threshold directly, for
example by ignoring middle errors away from the top margin.

### 5.3 The terminal evaluator gains a forbidden layer

Even granting a low-dimensional middle-output range, approximating the new
top gate leaves

```text
POLY_F2[n^(1-Omega(eta))] o THR o THR.
```

Lemma 5.3 handles only `POLY_F2 o THR`.  Its ETHR collapse and modulus
amplification stop one layer too early here, at
`1hotSUM o ETHR o THR`.  Treating CTW as a black-box CAPP oracle for each
middle subcircuit is invalid: the top gate depends on their joint
distribution, not their marginal acceptance probabilities.

These last two obstacles are logically independent.  A proposed solution
that addresses only advice count or only terminal evaluation is incomplete.

## 6. The near-miss with a depth-3 majority lower bound

Chen--Ren 2020 prove:

```text
inverse-circuit-size CAPP for every polynomial-size MAJ o MAJ
in 2^n/n^omega(1)
    => NEXP not subset MAJ o MAJ o MAJ.
```

Their CAPP convention requires additive error less than `1/|C|`.  CTW's
symmetric estimator instead has explicit error

```text
O(n^(-eta/3))
```

for size `n^(2.5-eta)`.  This is much larger than
`n^(-(2.5-eta))`, and CTW covers only one fixed size exponent rather than all
polynomial sizes.  Thus CTW does not already imply a `MAJ^3` lower bound.
Repeating its deterministic estimator cannot remove the systematic mass of
discarded bad columns.

This identifies a sharp alternative target: upgrade CTW-style CAPP to
inverse-size accuracy **and** arbitrary polynomial size for `MAJ o MAJ`.
Either improvement alone is insufficient for Chen--Ren's full conclusion.

## 7. Sparse-wire branch

The independent restriction audit found that CSS's published schedule is

```text
epsilon_d = B^(-(2d-1)),   delta_d = B epsilon_d,
```

so at depth three it handles `n^(1+B^-5)` wires.  Reoptimizing its
critical-index proof appears to improve the per-gate bound to

```text
t = p^(-1/6),
Pr[t-balanced] = O(p^(1/3) log^2(1/p)),
```

and dyadic fan-in buckets remove an avoidable `n^epsilon` loss.  This may
lower the simplification-side constant requirement from roughly `B>32` to
`B>6`.

A one-step CSS reduction followed by Tamaki's depth-2 exact counter has a
promising parameter range

```text
W = n^(1+alpha),
alpha < a_T/(4+15a_T),
```

where `a_T` is Tamaki's absolute saving exponent.  The disjoint counting
recurrence, side-constraint flattening, and novelty still need verification.
This could improve the explicit sparse-wire constant, but it remains a
near-linear-wire result and does not approach polynomial-size `TC0`.

## 8. Ranked next proof tasks

1. **Top-aware selected-list evaluation.**  Given polynomially many
   column-selected CTW advice values, batch-evaluate the composed top
   threshold without enumerating their Cartesian product and without leaving
   `POLY_F2 o THR o THR`.  This is the direct route to the full target.
2. **Derandomize ACW Theorem 1.9.**  Construct a small deterministic or
   certifiably zero-error joint-seed family for the middle probabilistic
   polynomials and top probabilistic PTF, while retaining the existential
   value gap.  For CAPP, an alternative is a nontrivial counter for
   `PTF[n^(1-gamma)] o THR`.  Merely enumerating the existing seeds does not
   supply either terminal operation.  The paper explicitly leaves SAT
   derandomization open, and success feeds the Williams lower-bound method.
3. **Formalize one modest theorem.**  Either write the CTW
   `H_t o SYM o THR` lifting as a checked corollary, or complete the
   CSS-to-Tamaki recurrence.  These are bounded projects with explicit gap
   lists, suitable for computer-assisted proof checking and literature
   search.

## 9. Confidence

- **High:** CTW reconstruction, the two full-depth barriers, ACW frontier
  correction, Chen--Ren accuracy mismatch, and the shared-seed proposition.
- **Medium-high:** the `H_t o SYM o THR` lifting; it passed an independent
  line-by-line interface audit, but not a comprehensive novelty review.
- **Medium:** the large-`SYM`/low-fan-in-middle CTW corollary.
- **Medium-low:** the sharpened CSS-to-Tamaki theorem until the exact counting
  recurrence is written in full.
