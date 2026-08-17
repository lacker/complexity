# Chen--Tal--Wang's superquadratic CAPP estimator

Status: theorem-level reconstruction from the 14 March 2026 ECCC version,
followed by derived composition tests.  Statements labeled **Theorem** are in a
cited paper.  Statements labeled **Derived** are calculations from those
theorems.  Statements labeled **Candidate lemma** are not literature claims.

## 1. Primary sources used

- **CTW26:** Lijie Chen, Avishay Tal, and Yichuan Wang,
  [*Super-quadratic Lower Bounds for Depth-2 Linear Threshold
  Circuits*](https://eccc.weizmann.ac.il/report/2026/039/), ECCC TR26-039,
  14 March 2026.  [Direct PDF](https://eccc.weizmann.ac.il/report/2026/039/download).
  This is the main source; theorem and lemma numbers below refer to this
  version.
- **AW15:** Josh Alman and R. Ryan Williams,
  [*Probabilistic Polynomials and Hamming Nearest
  Neighbors*](https://arxiv.org/abs/1507.05106), FOCS 2015.  This is the
  recursive probabilistic-polynomial construction that CTW modify.
- **ACW16:** Josh Alman, Timothy M. Chan, and R. Ryan Williams,
  [*Polynomial Representations of Threshold Functions and Algorithmic
  Applications*](https://arxiv.org/abs/1608.04355), FOCS 2016.  This supplies
  the earlier subquadratic threshold-circuit algorithm and low-randomness
  threshold polynomials opened up by CTW.
- **KW16:** Daniel M. Kane and R. Ryan Williams,
  [*Super-Linear Gate and Super-Quadratic Wire Lower Bounds for Depth-Two and
  Depth-Three Threshold Circuits*](https://arxiv.org/abs/1511.07860), STOC
  2016.  CTW use its random-restriction simplification for a threshold gate.
- **Wil14:** R. Ryan Williams,
  [*New Algorithms and Lower Bounds for Circuits With Linear Threshold
  Gates*](https://theoryofcomputing.org/articles/v014a017/), STOC 2014 / Theory
  of Computing 2018.  CTW use its all-input batch evaluator.
- **CW19:** Lijie Chen and R. Ryan Williams,
  [*Stronger Connections Between Circuit Analysis and Circuit Lower Bounds,
  via PCPs of Proximity*](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.CCC.2019.19),
  CCC 2019.
- **BW24:** Gabriel Bathie and R. Ryan Williams,
  [*Towards Stronger Depth Lower
  Bounds*](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ITCS.2024.10),
  ITCS 2024.  CTW combine this with the two-query PCPP from CW19 to obtain the
  precise XOR-of-two CAPP-to-lower-bound bridge (CTW Lemma 3.8).

No survey or secondary source is used for a technical claim below.

## 2. Exact result and what “XOR of two” means

**Theorem (CTW Theorems 1.2 and 6.1).**  For every constant
`epsilon in (0,1)`, there is a deterministic algorithm which, on an `n`-input

```text
XOR_2 o THR_{O(n^(2.5-epsilon))} o THR
```

circuit, estimates its acceptance probability to additive error `o(1)` in

```text
2^(n - n^Omega(epsilon))
```

time.  The two inputs to `XOR_2` are two separate depth-two `THR o THR`
circuits; the size bound is a gate bound.  Section 6 proves the statement first
for `O(n^(2.5-2 epsilon))` bottom threshold gates and time
`O(2^(n-n^(epsilon/100)))`; replacing `epsilon` there by `epsilon/2` gives the
displayed theorem.

**Theorem (CTW Lemma 3.8, using CW19 and BW24).**  Let `alpha>1`.  A
`2^n/n^omega(1)`-time `o(1)`-error CAPP algorithm for
`O(n^alpha)`-size `XOR_2 o THR o THR` implies that `E^NP` does not have
`n^alpha`-size `THR o THR` circuits.  The same statement holds with
`SYM o THR` in place of `THR o THR`.

The XOR is therefore not cosmetic: it is exactly the analysis problem required
by the two-query-PCPP version of the algorithm-to-lower-bound bridge.  On the
algorithmic side, however, estimating one circuit would be easier.  The
technical achievement is maintaining the saving for the pair.

## 3. Parameter ledger

CTW take `epsilon` to be a sufficiently small fixed constant (they state that
one may assume `epsilon < 10^-9`).  Here are the parameters actually used in
Sections 4--6.

| object | CTW value | role |
|---|---:|---|
| number of bottom THR occurrences for the SYM theorem | `m = O(n^(2.5-epsilon))` | object simplified by restriction |
| live-variable set | `I`, `k=|I|=n^(epsilon/10)` | rows of each column |
| probability one THR stays nonconstant | at most `n^(-1/2+epsilon/8)` (a convenient weakening) | KW restriction lemma |
| nonconstant occurrences in a good column | at most `ell=n^(2-epsilon/2)` | dimension of the containing subcube |
| fraction of bad columns | at most `n^(-epsilon/3)` | error paid by giving up |
| random-seed choices in the list polynomial | `2^(n^(epsilon/100))` | enumerated deterministically |
| advice choices for one symmetric gate | `n^(10 log n)=2^O(log^2 n)` | also enumerated |
| interpolation half-width | `n^(1-epsilon/5)` | absorbs fluctuation on `ell` free coordinates |
| degree of each list polynomial | at most `n^(1-epsilon/6)` | below the batch-evaluation threshold |
| pointwise list-polynomial failure | at most `2^(-n^(epsilon/500))` | negligible CAPP error |
| degree accepted by the column batch evaluator | at most `n^(1-epsilon/8)` | CTW Lemma 5.3 |
| time for one column batch | `O(2^(n-n^(epsilon/50)))` | exact count for every column |
| final SYM-pair CAPP time | `O(2^(n-n^(epsilon/100)))` | CTW Theorem 5.4 |

The slack among `/5`, `/6`, and `/8`, and among `/100`, `/50`, and `/500`, is
deliberate.  Nothing in the proof attempts to optimize these constants.

## 4. The estimator, step by step

### 4.1 Arrange the cube into rows and columns

Choose `I subset [n]` with `|I|=k=n^(epsilon/10)`.  Write an assignment as
`x=(y,z)`, where `y=x_I` and `z=x_[n]\I`.  For a fixed `z`,

```text
Column_z^(I) = {(y,z) : y in {0,1}^I}
```

has `2^k` rows.  The point is to compute an answer for all `2^(n-k)` columns
simultaneously, not to brute-force the rows independently.

### 4.2 Random restriction reduces `2.5` to `2`

**Theorem (CTW Lemma 4.1, from KW16).**  If exactly `k` variables of an
`n`-variable LTF are left alive and all other variables are uniformly fixed,
the restricted LTF is nonconstant with probability `O(k/sqrt(n))`.

For CTW's `k`, this is `O(n^(-1/2+epsilon/10))`, weakened in their accounting
to `n^(-1/2+epsilon/8)`.  Pooling `m=O(n^(2.5-epsilon))` threshold occurrences,
the mean number which survive in a random column is below `n^(2-O(epsilon))`.
Markov's inequality at the threshold `n^(2-epsilon/2)` gives a bad-column
fraction below `n^(-epsilon/3)` (CTW Theorem 4.5).

CTW also derandomize the choice of `I`.  For each candidate `I` and threshold
gate `T_i`, let `a_{I,i}` be the number of columns on which `T_i` is
nonconstant.  This number is the difference of two THR-#SAT counts on `n-k`
variables.  Meet-in-the-middle solves THR-#SAT in `2^((n-k)/2) poly(n)` time
(CTW Lemma 3.9).  Enumerating the `binom(n,k)=2^o(n)` choices of `I` therefore
finds a suitable one in `2^(n/2+o(n))` time.  Once `I` is fixed, CTW Theorem
4.4 labels every gate in every column as constant 0, constant 1, or
nonconstant in `2^(n-k) poly(n)` time.

For a good column, let `T(y,z)` be the vector of all bottom-gate outputs.  Its
range lies in an axis-aligned subcube `X_z subset {0,1}^m` of dimension at most

```text
ell = n^(2-epsilon/2),
```

because all but `ell` coordinates are fixed throughout the column.

### 4.3 List-approximate `1hotSUM`, not a different polynomial per column

The naive AW15/ACW16 probabilistic polynomial for an `m`-input symmetric gate
has degree about `sqrt(m)`.  With `m=n^(2.5-epsilon)`, that is greater than
`n`, so it is useless here.  CTW's key observation is that on a good column
only `ell` coordinates vary.  The desired degree should therefore scale like
`sqrt(ell)`, which is just below `n`.

`1hotSUM_m` outputs the `(m+1)`-bit one-hot encoding of the Hamming weight.
CTW Lemma 5.1 constructs a single global family

```text
{ P_{r,a} : r in [2^(n^(epsilon/100))],
             a in [n^(10 log n)] }
```

of multi-output polynomials over `F_2`, each of degree at most
`n^(1-epsilon/6)`.  For every subcube `X` of dimension at most `ell` and every
fixed `x in X`, there is an efficiently computable advice choice `a(X,r)` such
that

```text
Pr_r[P_{r,a(X,r)}(x) = 1hotSUM(x)]
    >= 1 - 2^(-n^(epsilon/500)).
```

Important quantifier detail: the sampled polynomial need not be correct
simultaneously on every point of `X`.  Correctness is pointwise in `x`, with
probability over `r`.  This is enough because CAPP averages over both the row
assignment and `r`.

#### How the list polynomial is represented

The construction samples `2 log n+1` nested coordinate sets

```text
[m] = Layer(0) superset Layer(1) superset ... superset Layer(2 log n),
```

halving at each level with `n^(epsilon/200)`-wise independent choices.  At the
last level only `m/n^2=O(n^(0.5-epsilon))` coordinates remain in expectation,
so exact interpolation is cheap.  Going upward, if level `j+1` has weight
`t`, twice `t` estimates the weight at level `j`.

For a subcube with free-coordinate set `J`, the discrepancy has two parts.
The fixed-coordinate part can be enormous, but depends only on `X` and the
sampled layers.  It is stored as one integer advice value `a_j`.  The varying
part has at most `ell` summands, standard deviation at most
`sqrt(ell)=n^(1-epsilon/4)`, and fits with overwhelming probability inside the
larger window `n^(1-epsilon/5)`.  Exact-weight indicator polynomials on such a
window have degree at most `2 n^(1-epsilon/5)`.  Accumulating degree across
`O(log n)` levels gives at most `n^(1-epsilon/6)`.

There are only `O(log n)` advice integers and each lies in a range of
polynomial magnitude `n^2.5`; hence all advice sequences fit in
`n^(10 log n)` choices.  A limited-independence Chernoff bound and a union
bound over the levels give failure `2^(-n^(epsilon/500))`.

This “list” is the device that avoids constructing one unrelated polynomial
for each of the exponentially many columns.  The polynomials are global; only
the quasi-polynomial-size advice label changes with `(z,r)`.

### 4.4 The exact column batch evaluator

CTW Lemma 5.3 is the terminal engine.  Given

```text
POLY_F2[n^(1-epsilon/8)] o THR
```

with only polynomially many distinct bottom threshold gates and the chosen
partition `I`, it outputs the *exact* acceptance probability in every column
in `O(2^(n-n^(epsilon/50)))` time.

The proof has three algebraic stages.

1. Use `THR subset DOR o ETHR`, expand the top `F_2` polynomial into parity
   of monomials, and use `AND_poly o ETHR subset ETHR`.  The circuit becomes
   `XOR o ETHR` with
   `N <= 2^(O(n^(1-epsilon/8) log n))` bottom exact-threshold gates.
2. Use the Beigel--Tarui modulus-amplification polynomial
   `Amp_{n^(epsilon/9)}`.  It converts parity modulo 2 to the same bit modulo
   `2^(n^(epsilon/9))`.  Sum the amplified value over all
   `2^k=2^(n^(epsilon/10))` rows.  The modulus is larger than the row count,
   so the residue recovers the exact number of accepting rows.
3. Express that integer polynomial as a subexponential-size
   `1hotSUM o ETHR` circuit in the remaining `n-k` variables.  Williams's
   all-input evaluator (CTW Lemma 3.10, from Wil14) prints its truth table in
   `2^(n-k) poly(n)` time.  CTW's conservative accounting yields the stated
   `2^(n-n^(epsilon/50))` bound.

This lemma is unusually important for composition: the class at its input is
*exactly one layer of raw threshold gates beneath a low-degree `F_2`
polynomial*.

### 4.5 Why two top symmetric gates are easy enough

For a top symmetric Boolean function `f`, turn the multi-output polynomial
`P_{r,a}` into the Boolean polynomial

```text
Q_{r,a} = XOR_{s : f(s)=1} P_{r,a}[s].
```

This does not increase degree.  For

```text
C = (f_1 o T_1) XOR (f_2 o T_2),
```

CTW enumerate

```text
(r,a_1,a_2) in
[2^(n^(epsilon/100))] x [n^(10 log n)]^2.
```

For each tuple they invoke the column batch evaluator on

```text
(Q^(1)_{r,a_1} o T_1) XOR (Q^(2)_{r,a_2} o T_2).
```

XOR adds the two `F_2` polynomials and hence does not increase their maximum
degree.  For each good column the algorithm looks up the entry indexed by the
two actual advice labels `a_1(z,r),a_2(z,r)`, averages over `r`, and then
averages over columns.  The error is at most the bad-column mass plus two
list-approximation errors:

```text
O(n^(-epsilon/3)) + 2 * 2^(-n^(epsilon/500)) = o(1).
```

The number of `(r,a_1,a_2)` tuples is much smaller than the
`n^(epsilon/50)` saving in each batch call, so it is absorbed.  This proves
CTW Theorem 5.4 for `XOR_2 o SYM o THR`.

### 4.6 How arbitrary top threshold gates are handled

A weighted top threshold gate is not an unweighted symmetric gate, and its
weights cannot simply be expanded into wires: Muroga-normalized weights can
still be exponentially large.  Section 6 instead applies the following exact
structural inclusions (CTW Lemma 3.4):

```text
THR  subset DOR o ETHR
ETHR subset GapAND_(1/n^c) o SYM
SYM  subset POLY_F2[O(1)] o 1hotSUM.
```

The last inclusion writes positive wire multiplicities in base `n^epsilon`.
Consequently each polynomial gate depends on only `O(1)` different
`1hotSUM` gates, and each `1hotSUM` has at most `n^epsilon` copies of any one
bottom threshold gate.

Starting with `O(n^(2.5-2 epsilon))` distinct bottom gates, this copying
creates at most `O(n^(2.5-epsilon))` bottom-gate occurrences.  That is why the
Section 6 proof deliberately starts with `2 epsilon` of size slack.

After padding fan-ins, each `DOR o GapAND` is a promised gapped-sum bit.  Its
input Hamming weight `S` lies either in a low interval near 0 (output 0) or a
high interval near `n^d` (output 1).  If the two top bits have promised sums
`S,S'`, their XOR is determined by the sign of

```text
(S - n^d/2)(S' - n^d/2).
```

Expanding this quadratic expression represents XOR by one more promised
gapped-sum gate over pairwise `AND_2` and negated inputs.  The `AND_2` and
negations merge into the adjacent constant-degree `F_2` polynomial gates.
Thus the whole pair becomes

```text
gapped-SUM o POLY_F2[O(1)] o 1hotSUM o THR,
```

where every polynomial subcircuit still sees only `O(1)` distinct
`1hotSUM` blocks.

Finally CTW do **not** CAPP the top gapped-sum by learning its full input
distribution.  If its `N` input subcircuits are `C_1^*,...,C_N^*`, the
promised Hamming weight is either

```text
A +/- w                 when the output is 0, or
A - Delta +/- w         when the output is 1,
```

with `Delta=n^(2d)/2`, `w=2 n^(2d-1)`.  Pointwise,

```text
|(A - sum_k C_k^*(x))/Delta - C^*(x)| <= 4/n.
```

Taking expectations linearizes the expression: only the marginal acceptance
probability of each `C_k^*` is needed.  Each such subcircuit has a
constant-degree polynomial on `O(1)` `1hotSUM` blocks, so Section 5 applies
with only a constant-size tuple of advice labels.  This proves Theorem 6.1.

## 5. Why the exponent is exactly 2.5

The proof has a clean exponent equation.

1. A restriction leaving `n^o(1)` variables alive kills an individual LTF
   with probability about `1-n^-1/2`.  This removes one half-power from the
   number of varying bottom-gate coordinates.
2. An `m=n^(2.5-epsilon)`-occurrence vector therefore has only
   `ell=n^(2-O(epsilon))` varying coordinates on almost every column.
3. The probabilistic degree of a symmetric function on `ell` relevant
   coordinates scales like `sqrt(ell)=n^(1-O(epsilon))`, just below linear.
4. A sublinear-degree polynomial over bottom LTFs is precisely what the
   column batch evaluator can process with a nontrivial saving.

Symbolically,

```text
2.5  --(restriction saves 0.5)-->  2
  2  --(square root degree)------>  1.
```

The method cannot raise `2.5` merely by tightening epsilon bookkeeping.  To
reach `n^(2.5+c)` occurrences by the same route would leave
`n^(2+c-o(1))` varying coordinates and require degree
`n^(1+c/2-o(1))`, which is superlinear.

## 6. What breaks with one more threshold layer

Consider the natural target

```text
XOR_2 o MAJ o THR o THR
```

or `XOR_2 o THR o THR o THR`.  There are three separate failures.  Fixing
only one of them is not enough.

### 6.1 The restriction lemma does not compose through `THR o THR`

KW/CTW simplify a raw LTF (indeed, a unate function), not a depth-two
threshold subcircuit.  After fixing `z`, a middle gate remains a threshold of
the surviving bottom threshold functions.  There is no theorem saying most
such middle gates become constant.

Gate count alone also gives no fan-out control.  A single surviving bottom
gate can feed polynomially many middle gates, all of which remain
nonconstant.  Thus “few distinct surviving bottom gates” does not imply that
the vector presented to the new top gate lies in a low-dimensional
axis-aligned subcube.  Counting bottom-to-middle *occurrences* or wires would
control this example, but unrestricted polynomial-size depth-three circuits
do not supply a useful enough bound.

### 6.2 The Section 6 normalization is terminal, not compositional

The promised-gapped-sum trick gives an affine approximation to the
**expectation of the final threshold output**.  It does not give a pointwise
low-degree `F_2` polynomial for a threshold gate.  An outer majority needs
the joint distribution (or high-order correlations) of many inner
`THR o THR` outputs; their marginal acceptance probabilities are
insufficient.

Equivalently, list-approximating the new outer majority produces a polynomial
of degree `d=n^(1-O(epsilon))` in inner threshold outputs.  A monomial can
involve `d` different inner thresholds.  Normalizing all of them creates
`Theta(d)` independent `1hotSUM` blocks.  Section 6 Part 3 works because its
number `t` of blocks is `O(1)` and enumerates an advice tuple from
`[n^(10 log n)]^t`.  With `t=d`, this factor becomes

```text
2^(Theta(n^(1-O(epsilon)) log^2 n)),
```

per column-batch computation, vastly larger than CTW's
`n^Omega(epsilon)` exponent saving.  The XOR of **two** avoids this: its sign
product has constant degree and leaves `t=O(1)`.

### 6.3 The terminal batch evaluator gains a forbidden layer

Even if one grants a low-dimensional range for the middle-output vector, the
outer list polynomial leaves a circuit of type

```text
POLY_F2[n^(1-O(epsilon))] o THR o THR.
```

CTW Lemma 5.3 only handles `POLY_F2 o THR`.  Its proof changes threshold gates
to exact thresholds and collapses conjunctions of exact thresholds into one
exact threshold on the *raw variables*.  With another layer, the same
manipulation stops at `XOR o ETHR o THR`; modulus amplification then produces
`1hotSUM o ETHR o THR`, outside Williams's all-input evaluator.  No known
nontrivial batch evaluator for this class is supplied by CTW or Wil14.

This is the sharpest black-box barrier: a proposed depth-three extension must
either flatten the middle layer to low `F_2` degree over raw bottom LTFs, or
replace Lemma 5.3 with a genuinely stronger batch evaluator.

## 7. Candidate compositional lemmas

### 7.1 Hamming-ball list approximation (likely a direct extension)

**Candidate lemma.**  CTW Lemma 5.1 should remain true if “subcube of
dimension at most `ell`” is replaced by “Hamming ball of radius at most
`ell` around a supplied center `c`.”  More precisely, for the same global
family `{P_{r,a}}`, every `c,x in {0,1}^m` satisfying
`dist_H(c,x)<=ell` should have an advice choice `a(c,r)` for which

```text
Pr_r[P_{r,a(c,r)}(x)=1hotSUM(x)]
    >= 1-2^(-n^(epsilon/500)).
```

**Near-proof.**  At layer `j`, choose the advice shift using the center:

```text
a_j = sum_{i in Layer(j)} c_i
      - 2 sum_{i in Layer(j+1)} c_i.
```

Write `v_i=x_i-c_i in {-1,0,1}`.  After subtracting `a_j`, the sampling error
is exactly the adjacent-layer discrepancy for the signed vector `v`, which
has at most `ell` nonzero coordinates.  Split its positive and negative
supports and apply CTW's limited-independence Chernoff argument to each.  The
same `n^(1-epsilon/5)` window works; the advice range and polynomial degree do
not change.  The final sampled layer remains small because its expected size
is `m/n^2=O(n^(0.5-epsilon))`, independently of the center.

This strictly weakens the structural goal for a depth-three restriction.  It
would suffice to find, for most columns, an efficiently computable center
`c_z` such that the middle-output vector is within Hamming distance `ell` for
most row assignments; the union of all coordinates that ever vary could be
much larger.  A distributional version follows by paying the probability
mass outside the ball as additional CAPP error.

**Honest gap.**  The signed limited-independence concentration and the final
layer tail should be written against CTW's exact sample-space construction.
They appear routine (positive/negative splitting is enough), but this note is
not a checked formal proof.  Also, the lemma fixes only the list-approximation
obstruction; it does not fix the extra-layer batch-evaluation obstruction.

### 7.2 Low-`F_2`-degree middle-layer composition

**Candidate lemma.**  Suppose the top is symmetric, its input functions
`G_1,...,G_M` have exact `F_2` degree at most `q` in a polynomial-size set of
raw bottom LTF outputs, and after CTW's restriction their output vector lies
in an efficiently described subcube (or, using the preceding candidate, a
Hamming ball) of radius/dimension at most `n^(2-O(epsilon))`.  If

```text
q * n^(1-O(epsilon)) <= n^(1-O(epsilon)),
```

with enough exponent slack to meet Lemma 5.3, then the CTW estimator composes:
substitute the exact polynomials for the `G_i` into the top list polynomial,
and invoke the original `POLY_F2 o THR` column batch evaluator.

The substantive requirements are therefore:

1. **collective stability** of the middle-output vector under columns; and
2. **small exact or sufficiently reliable compositional `F_2` degree** of the
   middle functions in the bottom LTF outputs.

General high-fan-in threshold gates fail item 2: the only unconditional exact
bound is their fan-in.  Low-fan-in threshold gates satisfy it immediately.

### 7.3 Concrete restricted depth-three target

The preceding observation appears to give the following genuine restricted
depth-three CAPP result with CTW's machinery.

**Derived candidate theorem.**  Fix `delta>0`.  Let

```text
C = XOR_2 o SYM_M o THR_{<=b} o THR,
M <= n^(2.5-delta),       b <= n^(delta/100),
```

where `b` is the fan-in of every middle threshold gate (the count `M` is over
both XOR branches up to a constant factor).  Then CAPP with error `o(1)`
should be solvable deterministically in

```text
2^(n-n^Omega(delta))
```

time.  In particular the top `SYM` may be `MAJ`, giving a nontrivial target
of the requested form `MAJ o THR o THR` with a growing, rather than constant,
middle fan-in.

**Parameter derivation.**  Count every bottom-LTF-to-middle-gate occurrence.
There are at most

```text
M b <= n^(2.5-0.99 delta)
```

occurrences.  Run CTW with restriction parameter `eta=0.9 delta`.  On a good
column at most `n^(2-eta/2)=n^(2-0.45 delta)` occurrences are nonconstant.
Any middle gate which varies must contain a nonconstant occurrence, so at
most this many middle outputs vary.  The vector feeding the top symmetric
gate therefore lies in a subcube of the required dimension.  CTW's
per-column classification also constructs this subcube efficiently: if all
inputs to a middle gate are classified constant, evaluate that gate and fix
its coordinate; otherwise mark the coordinate free.  This possibly enlarges
the true range, but not beyond the live-occurrence bound, and it gives the
concise description needed to compute the advice label.

The top list polynomial has degree at most

```text
d <= n^(1-eta/6) = n^(1-0.15 delta).
```

Every Boolean function of `b` bits, hence every `b`-input threshold gate, has
an exact multilinear `F_2` polynomial of degree at most `b`.  After
substitution the degree is at most

```text
b d <= n^(1-0.14 delta).
```

CTW Lemma 5.3 with parameter `eta` permits degree

```text
n^(1-eta/8) = n^(1-0.1125 delta),
```

so there is ample slack.  Constructing the middle polynomials by truth tables
costs `2^b poly(n)`, and a fully expanded composed polynomial has at most
`2^(O(b d log n))=2^o(n)` description size.  The seed enumeration contributes
about `2^(n^(eta/100))`, while a batch call saves `n^(eta/50)` in the exponent;
the former is absorbed by the latter.  The bad-column and polynomial errors
remain `o(1)`.

More generally, writing `b=n^(beta delta)`, the crude arithmetic allows any
fixed `beta<1/25`: with `eta=(1-beta)delta`, the condition

```text
beta delta < eta/24
```

ensures that substitution still fits between CTW's `/6` list degree and `/8`
batch degree.  The safer `1/100` above leaves room for logarithmic factors.

**Honest gaps before calling this a theorem.**

- The composed-polynomial encoding and the exact invocation of Lemma 5.3
  should be written as a formal reduction; the monomial-count bound indicates
  that no runtime problem is hiding there, but it has not been mechanically
  checked.
- The circuit-size convention must explicitly count `M` middle gates and
  bound their fan-in; unrestricted gate size alone does not bound the
  bottom-to-middle occurrence multiset.
- I have not checked whether this restricted class and exponent have already
  appeared in the threshold-SAT literature.  ACW16 gives a different
  bounded-fan-in depth-three/five SAT result, so a novelty search is required.
- CTW Lemma 3.8 is stated specifically for `THR o THR` and `SYM o THR`.
  Extending its PCPP proof to this restricted depth-three, projection-closed
  class looks plausible because the estimator already handles XOR of two and
  the class contains parity via identity middle gates, but that lower-bound
  conversion has not been verified.  The CAPP algorithm does not depend on
  this final bridge.

## 8. A sharper ambitious missing lemma

The direct full-depth-three route can be stated as a concrete algorithmic
missing piece.

**Selected-list batch-evaluation problem.**  CTW can batch-evaluate a
constant-degree polynomial of `t=O(1)` list-approximated `1hotSUM` blocks by
enumerating all advice tuples.  Design an algorithm which, for
`t=n^(1-O(epsilon))` blocks and column-dependent advice maps
`a_j(z,r)`, evaluates the *selected* composition

```text
g(P^(1)_{r,a_1(z,r)}, ..., P^(t)_{r,a_t(z,r)})
```

over all columns without paying `[n^(10 log n)]^t` separate batch calls.

Such a lemma would make the Section 6 normalization substantially more
compositional.  A generic solution cannot use only the marginals of the
blocks, because an outer majority depends on high-order correlations.  It
would need either a way to compile the advice-selection functions into the
batch circuit, or a new correlation/low-rank property of the normalized
blocks.  At present this is a research target, not a proof sketch.

## 9. Bottom line

CTW's result is not a black-box CAPP oracle for a `THR o THR` subcircuit.  It
is a carefully terminal pipeline:

```text
raw LTF restriction
    -> low-dimensional subcube
    -> list probabilistic polynomial for a symmetric count
    -> low-degree F_2 polynomial over raw LTFs
    -> all-column exact batch evaluator.
```

The arbitrary top threshold is handled only because two final outputs can be
compressed by a constant-degree sign product and their expected gapped sum
can be linearized.  One more threshold layer destroys both terminal features.

The most defensible immediate advance suggested by the paper is therefore
not full polynomial-size depth-three TC0, but the restricted class

```text
XOR_2 o MAJ o THR_{n^gamma fan-in} o THR
```

with `gamma` a sufficiently small fraction of the `2.5-delta` size slack.
Here random restrictions control the middle-output subcube through wire
occurrences, and exact low `F_2` degree flattens the middle layer back into the
published batch evaluator.  The Hamming-ball variant is a second, orthogonal
lemma worth formalizing because it weakens the stability property that a
future unrestricted composition would have to prove.
