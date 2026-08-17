# Audit of the CTW top-interface lifting

Date: 2026-08-12

Source audited: Chen--Tal--Wang (CTW),
[*Super-quadratic Lower Bounds for Depth-2 Linear Threshold
Circuits*](https://eccc.weizmann.ac.il/report/2026/039/), especially Theorem
5.2, Lemma 5.3, and the proof of Theorem 5.4.

## Verdict

**The candidate CAPP lifting in `intermediate-targets.md` passes this audit,**
subject to the ordinary convention that the composed top `F_2` polynomial is
given explicitly (or can be expanded before invoking CTW Lemma 5.3).  Different
middle symmetric gates may use different, overlapping lists of bottom LTFs;
they may share one uniform seed index; and their column-dependent advice
labels may be combined by enumerating `A^(q_0+q_1)` tuples.  None of these
steps changes CTW's quantifier order.

The repaired theorem below states the minor details that the original proof
sketch left implicit.  This audit does **not** verify novelty or the proposed
CAPP-to-lower-bound conversion for the lifted class.

## 1. Exact CTW interfaces

Rename CTW's `epsilon` to `eta`, and put

```text
k = n^(eta/10),
R = 2^(n^(eta/100)),
A = n^(10 log n),
D = n^(1-eta/6),
delta_list = 2^(-n^(eta/500)).
```

### Theorem 5.2: its actual quantifiers

Given any collection `T=(T_1,...,T_m)` of
`m=O(n^(2.5-eta))` LTF occurrences and **any supplied** partition
`I subset [n]` of size `k`, CTW deterministically output:

1. multi-output `F_2` polynomials `P_{r,a}`, indexed by
   `(r,a) in [R] x [A]`, all of degree at most `D`; and
2. for every pair `(z,r)`, a label `a(z,r) in [A]`.

For each `T`-good column `z`, the guarantee is

```text
Pr_{r uniform [R], x uniform Column_z}
  [1hotSUM(T(x)) = P_{r,a(z,r)}(T(x))]
    >= 1-delta_list.
```

This is a joint average over `(r,x)`.  It is not a claim that one seed works
for every row, every column, or even most rows in every column.  The lifting
only needs the displayed joint-average guarantee.

The advice is genuinely algorithmic, not existential: Theorem 5.2 says the
algorithm outputs all `a(z,r)`.  In its proof, `a(z,r)` is computed from the
minimal axis-aligned subcube containing `T(Column_z)`.  CTW Theorem 4.4
classifies each occurrence as constant 0, constant 1, or nonconstant on the
column, which gives that subcube and hence its advice.

### Lemma 5.3: its output is exactly what tuple enumeration needs

Given an `n`-input

```text
POLY_F2[n^(1-eta/8)] o THR
```

circuit with polynomially many distinct bottom LTF gates and the same
partition `I`, Lemma 5.3 outputs the exact acceptance probability on **every**
column in time

```text
O(2^(n-n^(eta/50))).
```

The top polynomial need not have polynomially many monomials.  In the proof,
CTW expand an arbitrary degree-`n^(1-eta/8)` polynomial into at most
`2^(O(n^(1-eta/8) log n))` monomials, which is subexponential.  Thus an
explicit composed polynomial of the degree claimed below fits the proof's
input and size accounting.

## 2. Audit questions

### A. Different overlapping middle subvectors

Let the two XOR branches contain `q_0,q_1 <= t` middle symmetric gates.  For
gate `(b,j)`, let `T_{b,j}` be its list of bottom-LTF occurrences.  Lists may
overlap arbitrarily and may repeat the same LTF.

Form one global multiset

```text
T_global = sum_{b,j} T_{b,j},
```

counting every occurrence.  CTW Theorem 4.5 finds one partition `I` for which
all but `n^(-eta/3)` of the columns have at most `n^(2-eta/2)` nonconstant
occurrences in `T_global`.  On such a column every local list `T_{b,j}` is
good, because its nonconstant occurrences form a submultiset of the global
ones.

Now apply Theorem 5.2 separately to every local list, reusing the already
chosen `I`.  The theorem accepts an arbitrary supplied partition; it does not
require independently finding a partition for each collection.  Overlap is
irrelevant to both the local subcube construction and its advice.  If a raw
LTF appears in several local lists, it is simply a separate formal coordinate
in each list, all fed the same Boolean value later.

**Verdict: valid.**  The global occurrence bound, rather than a bound on
distinct bottom gates, is essential.

### B. Advice computability

For every local list, Theorem 5.2 explicitly outputs

```text
a_{b,j}(z,r) in [A]
```

for every `(z,r)`.  A global-good column is local-good, so the theorem's
accuracy guarantee applies.  Computing the local minimal subcube only needs
the constant/nonconstant status of that list's occurrences; these statuses
are already available from the global Theorem 4.4 classification.

The advice may depend on both `z` and `r`.  This causes no problem.  A call to
Lemma 5.3 fixes an advice tuple independent of `z` and prints answers for all
columns; after enumerating all tuples, the algorithm selects for each `(z,r)`
the entry whose tuple equals the computed vector
`(a_{b,j}(z,r))_{b,j}`.  This is exactly CTW's lookup maneuver in Theorem 5.4,
with two labels replaced by `q_0+q_1` labels.

**Verdict: valid.**

### C. Sharing one seed index

Each application of Theorem 5.2 produces its own family

```text
{P^(b,j)_{r,a} : (r,a) in [R] x [A]}.
```

These need not be the same polynomials or use semantically identical sampled
layers.  Relabel every family by the common set `[R]`, draw one uniform
`r in [R]`, and feed that index to every family.  Each family still has the
uniform marginal over its own `r`-indexed list.

For a fixed global-good column, define `E_{b,j}` to be failure of middle gate
`(b,j)` under the common random pair `(r,x)`.  Theorem 5.2 gives

```text
Pr_{r,x}[E_{b,j}] <= delta_list
```

for every `(b,j)`.  Therefore

```text
Pr_{r,x}[some E_{b,j}]
  <= (q_0+q_1) delta_list
  <= 2t delta_list.
```

No independence is used.  Arbitrary correlation caused by common seeds,
overlapping bottom gates, or the common row assignment is harmless.

It would be incorrect to assert simultaneous correctness for every `x` or
every `z`; the proof does not do so.  Averaging the above bound over columns
is precisely the desired CAPP analysis.

**Verdict: valid, with this marginal-relabeling interpretation of “shared
`r`.”**

### D. The composed `F_2` polynomial

For middle symmetric function `S_{b,j}`, define, exactly as in CTW Theorem
5.4,

```text
Q^(b,j)_{r,a}
  = XOR_{s : S_{b,j} outputs 1 on weight s} P^(b,j)_{r,a}[s].
```

It has degree at most `D`.  Tabulate each top Boolean circuit
`H_b:{0,1}^{q_b}->{0,1}` and compute its algebraic normal form over `F_2`.
Its degree is at most `q_b <= t`.  For a fixed `(r, advice tuple)`, substitute
the corresponding `Q` polynomials and XOR the two resulting branch
polynomials.  XOR takes a maximum, rather than a sum, of degrees, so the final
degree is at most

```text
tD
 <= n^(eta/50)/(100 log^2 n) * n^(1-eta/6)
 =  n^(1-11eta/75)/(100 log^2 n)
 <  n^(1-eta/8)
```

for sufficiently large `n`.

Let `M=O(n^(2.5-eta))` be the total number of occurrence variables.  After
identifying repeated occurrences with their raw bottom LTF outputs and
multilinearizing, any degree-`tD` polynomial has at most

```text
sum_{i<=tD} binom(M,i) <= 2^(O(tD log n))
```

monomials.  The local list polynomials are given constructively by Theorem
5.2, so syntactic expansion, cancellation modulo 2, and multilinearization
can be performed within this output-size bound (up to polynomial factors).
Tabulating `H_b` costs `2^t poly(n)`.

Even after multiplying by all seed/advice tuples, the total explicit
polynomial-construction work is

```text
2^(O(tD log n) + O(n^(eta/50))) = 2^o(n),
```

which is dominated by the final near-`2^n` batch time.

**Verdict: valid.**  A polished proof should explicitly say “expand and
multilinearize” before invoking Lemma 5.3; merely citing the degree would
leave an input-representation ambiguity.

### E. Is `A^(2t)` the right cost?

There is one advice label per middle symmetric gate, not one per coordinate
of its `1hotSUM` output.  Thus the exact count is

```text
R A^(q_0+q_1) <= R A^(2t).
```

With base-2 logarithms and the proposed
`t <= n^(eta/50)/(100 log^2 n)`,

```text
log_2(R A^(2t))
 <= n^(eta/100) + 20t(log n)^2
 <= n^(eta/100) + 0.2 n^(eta/50).
```

For all sufficiently large `n`, the first term is at most, say,
`0.1 n^(eta/50)`.  Multiplying by one Lemma 5.3 call per tuple gives

```text
2^(n-n^(eta/50)) * R A^(2t)
 <= 2^(n-0.7 n^(eta/50)).
```

For each call, scanning its `2^(n-k)` column outputs and adding only those
whose computed advice vector matches the current tuple costs in total

```text
R A^(2t) 2^(n-k),
```

which is smaller still because `k=n^(eta/10)` is much larger than
`n^(eta/50)`.  The computation can stream these arrays; it need not store the
full seed-by-tuple-by-column table.

Applying Theorem 5.2 separately `q_0+q_1 <=2t` times only adds a polynomial
factor `t` to its `2^(n-n^(eta/30))` runtime and is also dominated.

**Verdict: `A^(2t)` and the claimed saving are correct.**

## 3. Repaired theorem and proof interface

**Theorem candidate (algorithmic statement).**  Fix a constant `eta>0`.
For `b in {0,1}`, let

```text
C_b(x) = H_b(S_{b,1}(T_{b,1}(x)), ..., S_{b,q_b}(T_{b,q_b}(x))),
q_b <= t,
```

where:

- each `H_b` is an explicitly given `poly(n)`-size Boolean circuit;
- each `S_{b,j}` is an explicitly given symmetric Boolean function;
- each `T_{b,j}` is a list of raw `n`-input LTF gates, with every repeated
  use counted as another occurrence;
- the total number of occurrences over all `(b,j)` is
  `O(n^(2.5-eta))`; and
- `t <= n^(eta/50)/(100 log^2 n)`.

Then the acceptance probability of `C_0 XOR C_1` can be deterministically
estimated to additive error `o(1)` in

```text
2^(n-c n^(eta/50))
```

time for an absolute constant `c>0` (for example, the above coarse accounting
permits `c=0.7` once `n` is sufficiently large, before harmless big-O
constants are absorbed).

**Proof interface.**

1. Find one partition using the global occurrence multiset and discard its
   at most `n^(-eta/3)` bad-column mass.
2. Apply Theorem 5.2 separately to every local list using this partition and
   relabel all seed sets by one common uniform `[R]`.
3. For each common seed and advice vector, explicitly construct and
   multilinearize the exact composed top `F_2` polynomial; its degree is
   below `n^(1-eta/8)`.
4. Invoke Lemma 5.3, stream its column answers, and retain the answer selected
   by each column's computed advice vector.
5. Average over seeds and good columns.  The additive error is at most

   ```text
   n^(-eta/3) + (q_0+q_1) 2^(-n^(eta/500)) = o(1).
   ```

The black-box lifting proves the interface

```text
H_t o SYM o THR.
```

Taking `H_b` to be a top threshold specializes this to
`THR_t o SYM o THR`.  Taking each middle `S_{b,j}` further to be `MAJ` gives
the genuinely depth-three *pure threshold* subclass

```text
THR_t o MAJ o THR,
```

but not unrestricted `THR_t o THR o THR`.  An arbitrary weighted middle
`THR` is not a `SYM` gate.  CTW Section 6's normalization is terminal and does
not by itself justify inserting those gates independently below a growing top
interface.

This last notation correction is the only substantive repair found by the
audit.

### Separate repair for arbitrary low-fan-in middle thresholds

There is a different, simpler route when every arbitrary weighted middle
threshold has fan-in at most `b`.  Any Boolean function on `b` bits has an
exact multilinear `F_2` polynomial of degree at most `b`, constructible from
its `2^b`-entry truth table.  Hence an arbitrary `H_b` on at most `t` such
middle gates flattens to degree at most `tb` over the raw bottom LTF outputs.
Consequently CTW Lemma 5.3 directly gives exact acceptance probability in
`2^(n-n^(eta/50))` time whenever

```text
tb <= n^(1-eta/8)
```

and the number of distinct bottom LTFs is polynomial.  In particular this
does cover `THR_t o THR_b o THR`.  It is a low-middle-fan-in result, not the
claimed top-interface lifting for arbitrary middle thresholds, and it does
not use the `n^(2.5-eta)` list-approximation phenomenon.

A stronger but differently oriented candidate in `ctw-estimator.md` allows
one large top `SYM` over `n^(2.5-delta)` arbitrary middle thresholds of
fan-in `n^(delta/100)` by combining CTW's list polynomial with the same exact
low-fan-in flattening.  That candidate still needs its formal reduction and
novelty checked.

## 4. Remaining non-algorithmic gaps

- No claim is made that the theorem is absent from the literature; it may be
  considered an implicit closure of CTW Theorem 5.4.
- CTW Lemma 3.8 states the lower-bound bridge for `THR o THR` and
  `SYM o THR`, not for this growing-top-interface family.  Its extension must
  be checked separately.
- Raising `t` substantially requires avoiding the Cartesian advice cost; the
  present audit confirms rather than removes that barrier.
