# Chen--Ren's depth-3-majority bridge versus CTW

Date checked: 2026-08-12

## Verdict

Chen--Ren (STOC 2020) do **not** define CAPP with constant or merely `o(1)`
additive error.  Except where they explicitly say otherwise, their CAPP task
for a circuit `C` is estimation of its acceptance probability to additive
error strictly below

```text
1 / |C|.
```

Their Theorem 1.13 assumes a deterministic nontrivial
`2^n/n^{omega(1)}`-time CAPP algorithm, with this inverse-circuit-size error,
for polynomial-size `MAJ o MAJ` circuits.  It concludes

```text
NEXP is not contained in MAJ o MAJ o MAJ.
```

CTW 2026 does not meet this hypothesis.  On the relevant `SYM o THR`
side, its proof gives error at most

```text
2 n^{-eta/3} + 2 * 2^{-n^{eta/500}}
```

for circuits with `O(n^{2.5-eta})` bottom-threshold occurrences.  For a
size-`n^{2.5-eta}` circuit, Chen--Ren require error on the order of
`n^{-(2.5-eta)}`, which is polynomially smaller than `n^{-eta/3}` throughout
the parameter range of the CTW theorem.  CTW also handles a fixed polynomial
size exponent below `2.5`, whereas Chen--Ren's superpolynomial lower-bound
conclusion needs analysis algorithms across arbitrary fixed polynomial size
bounds.

The proposed two-level probabilistic-polynomial composition for

```text
MAJ_M o MAJ_S o THR,       M S <= n^{2-epsilon},
```

**is valid** as a deterministic inverse-polynomial-error CAPP algorithm,
provided that:

1. one seed is shared among all middle `MAJ_S` gates;
2. the top probabilistic polynomial may use an independent seed block (the
   simplest analysis), or share the seed if failures are charged against its
   fixed true semantic input; and
3. all seed pairs are enumerated and each resulting
   `POLY_F2 o THR` circuit is batch-counted exactly.

The resulting degree is `O(sqrt(MS) log n)`, hence
`n^{1-Omega(epsilon)}`, and the seed space is quasipolynomial.  This is a
straightforward composition of ACW Theorem 1.1 with the standard
`POLY_F2 o THR` batch evaluator.  The shared-middle-seed maneuver itself is
already explicit in ACW's proof of Theorem 1.8.  I did not find the exact
depth-3 CAPP corollary stated as a theorem, but its novelty should be regarded
as low.

This restricted algorithm still does not trigger Chen--Ren Theorem 1.13:
after setting the bottom `THR` gates to input literals, it only analyzes
`MAJ o MAJ` circuits with the structural/wire product `MS<n^{2-epsilon}`,
not arbitrary polynomial-size `MAJ o MAJ` circuits.  In that depth-2
specialization, ACW already provides a stronger deterministic SAT algorithm
in the corresponding subquadratic gate regime.

## 1. The exact Chen--Ren implication

The primary source is the full version of Lijie Chen and Hanlin Ren,
[*Strong Average-Case Circuit Lower Bounds from Non-trivial
Derandomization*](https://eccc.weizmann.ac.il/report/2020/010/).

### 1.1 Their CAPP convention

Section 2.1.3 defines CAPP as follows.  On input an `n`-input circuit `C`,
output a rational `q` satisfying

```text
| Pr_x[C(x)=1] - q | < 1/|C|.
```

This is inverse **actual circuit size**, not simply “some inverse polynomial”
chosen independently of the input size bound.  A family of algorithms that
achieves `1/n^k` for every fixed `k` is enough for polynomial-size circuits,
but a fixed error such as `n^{-0.01}` is not.

The algorithm may also be nondeterministic in their zero-error sense
(Remark 1.3): at least one branch accepts; every accepted branch outputs a
valid approximation.  Ordinary bounded-error Monte Carlo output is not what
the theorem assumes.

### 1.2 Clean theorem statement

Chen--Ren Theorem 1.13 states:

> If polynomial-size `MAJ o MAJ` CAPP can be solved in
> `2^n/n^{omega(1)}` time, then `NEXP` is not contained in
> `MAJ o MAJ o MAJ`.

Here “CAPP” inherits the inverse-size definition above.  “Polynomial-size”
is not a single fixed bound such as `n^{2.5}`.  To rule out polynomial-size
circuit families, the analysis hypothesis must be available for every fixed
polynomial size needed by the lower-bound construction.  In the general
parameter theorem (Theorem D.4), the CAPP size is

```text
S_CAPP(n) = S(S_cert(n)^K)^K,
```

for a sufficiently large constant `K`, so even a target size `S(n)` invokes
the algorithm at a substantially larger polynomial size.

### 1.3 Proof chain and why the top majority appears

The proof is only a paragraph because it composes three earlier facts:

1. `XOR_4 o MAJ o MAJ` collapses to polynomially larger
   `MAJ o MAJ`.  Chen--Ren cite the adaptation of Chen--Williams 2019,
   Lemma 50, which proves
   `XOR_k o THR o THR subset THR o THR` for constant `k`.
2. Chen--Ren Lemma 5.5 expresses `AND_4` as a real linear combination of
   the 16 constant-arity XOR functions.  Sixteen calls with error `1/s`
   therefore give an `AND_4 o C` estimate with error `16/s`, matching the
   inverse size of the original `s/16` circuit.
3. Their Theorem 1.1 turns inverse-size CAPP for `AND_4 o C` into a strong
   average-case lower bound against `C`.  The standard discriminator lemma
   turns that correlation lower bound into a worst-case lower bound against
   `MAJ o C`.

For `C=MAJ o MAJ`, the discriminator layer is the third majority layer.
This explains exactly why inverse-polynomial accuracy is needed: a top
majority of `T` hypotheses can exploit correlation only `Theta(1/T)`, so the
argument must rule out that scale, not just constant or unspecified `o(1)`
correlation.

## 2. Why CTW does not already prove a `MAJ^3` lower bound

CTW Theorem 5.4 gives deterministic CAPP for

```text
XOR_2 o SYM_{O(n^{2.5-eta})} o THR
```

in `O(2^{n-n^{eta/100}})` time.  A `MAJ o MAJ` circuit is a special case of
`SYM o THR`, so the circuit basis is not the problem.

The proof of Theorem 5.4 gives the following explicit error ledger:

- at most `2 n^{-eta/3}` mass lies in columns bad for one of the two input
  circuits; and
- the list-polynomial error contributes at most
  `2 * 2^{-n^{eta/500}}`.

Thus its advertised `o(1)` can safely be read as

```text
O(n^{-eta/3}).
```

For a circuit of size `s=n^{2.5-eta}`, Chen--Ren require

```text
1/s = n^{-(2.5-eta)}.
```

The needed inequality `eta/3 >= 2.5-eta` would require
`eta >= 15/8`, outside the theorem's regime.  The polynomial approximation
failure in CTW is already far smaller than necessary; the obstruction is the
discarded bad-column mass produced by the random-restriction/Markov step.
Repeating the deterministic estimator or taking a median does not reduce
this systematic bias.

CTW Section 6 for arbitrary top `THR` has additional normalization losses;
after translating its internal parameter to the final
`n^{2.5-eta}` statement, its visible error is no better than roughly
`n^{-eta/6}`.  For the Chen--Ren `MAJ o MAJ` hypothesis one should use the
cleaner symmetric Theorem 5.4 and `eta/3`, but even that is insufficient.

The number of output XORs is also not a blocker.  Chen--Ren only needs a
constant four, which can be collapsed by the Chen--Williams structure lemma;
alternatively CTW's Theorem 5.4 proof extends from two to any fixed number of
top symmetric gates by a constant-size advice tuple and a constant-factor
union bound.

Finally, CTW's own lower-bound conversion needs only error `o(1)`.  Its
Bathie--Williams/Chen--Williams PCPP reduction proves a worst-case lower bound
against the **same depth-2 class**.  Chen--Ren are asking for a stronger
average-case lower bound at inverse-polynomial correlation so that the
discriminator lemma can add another majority layer.  The two bridges have
different accuracy requirements.

## 3. What sharper or bounded-size variants would imply

### 3.1 A full sharper-error version would settle the implication

If one could deterministically estimate every polynomial-size
`MAJ o MAJ` circuit in `2^n/n^{omega(1)}` time to error `1/|C|`, then
Chen--Ren Theorem 1.13 applies verbatim and gives the advertised
`MAJ^3` lower bound.  The same is true for their nondeterministic zero-error
notion.

Improving CTW only from `o(1)` to `1/poly(n)` is not a complete specification:
the polynomial exponent must dominate the circuit-size exponent (and the
larger sizes introduced in the Chen--Ren proof).  An error bound
`n^{-100}` is enough for circuits of size `n^{10}`, for example, but not a
uniform substitute for inverse size across arbitrary polynomial bounds.

### 3.2 Sharper error at only size `n^{2.5-eta}` is not enough for full `P/poly`

Even an exact counter for `MAJ o MAJ` circuits capped at
`n^{2.5-eta}` would not satisfy the clean Theorem 1.13 hypothesis.  A
quantitative reworking of Theorem D.4 could turn a fixed analysis exponent
into a fixed (much smaller) lower-bound exponent, but the paper's displayed
composition

```text
S_CAPP(n) = S(S_cert(n)^K)^K
```

incurs large, unspecified constant-power losses.  The published theorem does
not support the inference

```text
size-n^{2.5} CAPP  =>  superpolynomial MAJ^3 lower bounds.
```

At most it suggests a bounded-size lower bound with an exponent depending on
those constants; it may not even beat elementary linear-size lower bounds
without improving the bookkeeping.

### 3.3 Restricting circuit size until CTW's existing error is enough

Using the published CTW error literally, `O(n^{-eta/3})` is at most inverse
size only for circuits of size

```text
n^k,   with k < eta/3
```

(leaving room for constants).  In the standard stated range `eta<=1`, this
is a sublinear exponent and is not a useful route to depth-3 majority lower
bounds.  Reoptimizing CTW's restriction parameters for very small circuits
may improve this numerical tradeoff, but that is not a consequence of the
published theorem.

So there are two independent gaps:

1. **accuracy:** `n^{-eta/3}` versus inverse circuit size; and
2. **size coverage:** one exponent below `2.5` versus arbitrary polynomial
   size.

Removing only one does not yield `NEXP not subset MAJ^3`.

## 4. Audit of the shared-seed probabilistic-polynomial composition

### 4.1 Proposition

Fix constants `epsilon>0` and suppose

```text
C = MAJ_M o MAJ_S o THR
```

has `n` raw inputs, polynomially many distinct bottom threshold gates, and at
most `M S <= n^{2-epsilon}` bottom-THR occurrences feeding the middle
majorities.  Then, for every inverse-polynomial target error `xi` (including
`xi=1/(10|C|)`), there is a deterministic algorithm estimating
`Pr_x[C(x)=1]` to error at most `xi` in

```text
2^{n-n^{Omega(epsilon)}}
```

time.

This is an algorithm for the stated **unweighted middle majority** class.  It
does not replace either middle layer by arbitrary weighted threshold gates.

### 4.2 Low-randomness probabilistic polynomials

ACW Theorem 1.1 gives, for a threshold function on `q` bits and error `rho`,
an `F_2` probabilistic polynomial of degree

```text
O(sqrt(q log(1/rho)))
```

using

```text
O(log q * log(q/rho))
```

random bits.

Choose a middle-gate error

```text
rho_mid = xi/(4M)
```

and use **one uniform middle seed `r_mid` for all `M` middle gates**.  For a
fixed raw input `x`, every gate individually has failure probability at most
`rho_mid`; hence, without any independence assumption,

```text
Pr_{r_mid}[some middle gate is wrong on x]
    <= M rho_mid <= xi/4.
```

Sharing is legitimate because each local polynomial family has a uniform
marginal under the common seed index.  This is exactly the kind of seed reuse
ACW employ in Step 3 of their Theorem 1.8 proof.

Independently sample an outer seed `r_top` for an `M`-input majority
polynomial with error

```text
rho_top = xi/4.
```

Conditioned on all middle gates being correct, the outer polynomial receives
the fixed true Boolean vector of middle outputs, so its pointwise guarantee
applies.  A union bound gives, for every fixed `x`,

```text
Pr_{r_mid,r_top}[the composed polynomial disagrees with C(x)]
    <= xi/2.
```

### 4.3 Seed coupling across layers

Using an independent outer seed is the most direct quantifier-safe proof.  A
naive adaptive-input argument with the same seed would indeed be invalid: a
probabilistic-polynomial guarantee has the quantifiers

```text
for every fixed y:  Pr_r[P_r(y) != MAJ(y)] <= rho.
```

It gives no bound for an arbitrary adaptive random vector `y=Y_r`.  However,
the present composition has a stronger semantic-event analysis.  For a fixed
original input `x`, charge every middle failure against that gate's true
fixed input, and charge the top failure against the fixed vector of true
middle outputs.  If no charged event occurs, substitution computes the whole
circuit correctly.  A union bound over those fixed-input events is valid even
when all gates use the same seed.  Thus cross-layer seed sharing is sound
here, although two independent blocks are equally cheap and avoid this
subtlety.  See `shared-seed-audit.md` for the full argument.

### 4.4 Degree and seed accounting

The middle and top degrees are

```text
d_mid = O(sqrt(S log(M/xi))),
d_top = O(sqrt(M log(1/xi))).
```

After substitution, the degree is at most

```text
d_mid d_top
  = O(sqrt(MS log(M/xi) log(1/xi)))
  = O(sqrt(MS) log n)
  <= n^{1-epsilon/2} O(log n)
  <= n^{1-epsilon/3}
```

for polynomial `M,S,1/xi` and sufficiently large `n`.

The combined seed length is `O(log^2 n)`, so there are only
`2^{O(log^2 n)}` seed pairs.  For a fixed pair, explicitly compose and
multilinearize the two polynomial layers.  With polynomially many bottom
THR gates, the number of possible degree-`d` monomials is

```text
2^{O(d log n)} = 2^{o(n)}.
```

CTW Lemma 5.3 (an ACW/Williams-style batch evaluator) exactly computes the
acceptance probability of each resulting
`POLY_F2[n^{1-Omega(epsilon)}] o THR` circuit in
`2^{n-n^{Omega(epsilon)}}` time.  The quasipolynomial seed enumeration and
subexponential expansion do not consume the saving.

Finally average the exact counts over all seed pairs.  Since the composed
polynomial has pointwise disagreement probability at most `xi/2`, averaging
also over `x` gives

```text
| E_x[C(x)] - E_{x,r_mid,r_top}[P_{r_mid,r_top}(x)] |
    <= xi/2.
```

The algorithm is deterministic: the seeds are enumerated, not sampled.  By
taking `xi=1/(10|C|)`, it satisfies Chen--Ren's numerical CAPP accuracy on
this restricted class.

## 5. Is this already known?

The ingredients and the main seed-reuse observation are standard:

- ACW Theorem 1.1 is exactly the low-randomness, low-degree majority
  approximator used above.
- In the proof of ACW Theorem 1.8, Step 3 substitutes the polynomial indexed
  by one seed into every middle majority gate, sets the per-gate error tiny,
  and uses a union bound.  Thus “one seed for all middle gates” is not a new
  lemma.
- ACW Theorem 1.9 composes probabilistic representations at multiple
  threshold layers to obtain a stronger **randomized SAT** result in a
  different fan-in regime (`n^{6/5-delta}`).
- Exact evaluation of a low-degree `F_2` polynomial over bottom threshold
  gates is the standard terminal step in ACW and is isolated cleanly as CTW
  Lemma 5.3.

I did not find a primary source that names the exact deterministic CAPP
corollary with tradeoff `MS<n^{2-epsilon}`.  It may be a useful lemma to state,
especially with arbitrary bottom `THR` gates, but it should be presented as a
short synthesis of standard machinery rather than a new probabilistic-
polynomial construction.

For the Chen--Ren application, specialize every bottom `THR` to an input
literal.  The result is inverse-error CAPP for the subquadratic-product
subclass of `MAJ o MAJ`.  This does not advance beyond the known depth-2
analysis frontier: ACW Theorem 1.8 already gives deterministic nontrivial SAT
for `LTF o LTF` with a subquadratic number of bottom gates, a stronger task in
that regime.  The unresolved Chen--Ren hypothesis concerns arbitrary
polynomial-size `MAJ o MAJ`.

With nontrivial bottom threshold gates, the proposition is instead a
restricted genuine depth-3 result:

```text
MAJ_M o MAJ_S o THR,  MS<n^{2-epsilon}.
```

It is not covered literally by ACW Theorem 1.8, whose deterministic class is
`AC^0 o LTF o LTF`; ACW Theorem 1.9 overlaps it only through a randomized SAT
algorithm and different individual fan-in restrictions.

## 6. Notation correction for the separate CTW lifting

The separately proposed `JUNTA_t o SYM o THR` lifting does **not** contain
unrestricted `THR o THR o THR`: an arbitrary weighted threshold gate is not
symmetric.  Its genuine threshold subclass is

```text
THR_t o MAJ/SYM o THR,
```

with an unweighted/symmetric middle layer.  Handling weighted middle `THR`
gates would require extending CTW Section 6's normalization and is not proved
by the list-composition argument.  This basis issue is independent of the
Chen--Ren accuracy mismatch.

## 7. Primary sources

1. Lijie Chen and Hanlin Ren, *Strong Average-Case Circuit Lower Bounds from
   Non-trivial Derandomization*, STOC 2020:
   [ECCC TR20-010](https://eccc.weizmann.ac.il/report/2020/010/).  See the
   CAPP definition in Section 2.1.3, Theorem 1.1, Lemma 5.5, Theorem 1.13,
   and the quantitative Theorem D.4.
2. Lijie Chen and R. Ryan Williams, *Stronger Connections Between Circuit
   Analysis and Circuit Lower Bounds, via PCPs of Proximity*, CCC 2019:
   [LIPIcs paper](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.CCC.2019.19).
   See Theorem 3 and Lemma 50.
3. Josh Alman, Timothy M. Chan, and Ryan Williams, *Polynomial
   Representations of Threshold Functions and Algorithmic Applications*,
   FOCS 2016:
   [author PDF](https://tmc.web.engr.illinois.edu/thr8_16.pdf).  See Theorem
   1.1, Theorem 1.8 (especially proof Step 3), and Theorem 1.9.
4. Lijie Chen, Avishay Tal, and Yichuan Wang, *Super-quadratic Lower Bounds
   for Depth-2 Linear Threshold Circuits*, STOC 2026:
   [ECCC TR26-039](https://eccc.weizmann.ac.il/report/2026/039/).  See Theorem
   5.4 and equations (8)--(11) for the explicit error, and Lemma 5.3 for the
   batch evaluator.

## Confidence

- **High:** Chen--Ren's inverse-size error requirement; CTW's explicit
  `n^{-eta/3}` error; the two independent obstructions (accuracy and size
  coverage); validity of the shared-seed composition (with one or two seed
  blocks).
- **High:** a naive adaptive-input use of a shared outer seed is unjustified,
  but the fixed-semantic-input union-bound formulation repairs it for this
  composition.
- **Medium-high:** the exact `MS<n^{2-epsilon}` CAPP corollary, pending a
  line-by-line implementation of the polynomial expansion interface to CTW
  Lemma 5.3.
- **Medium:** novelty assessment; targeted searches found no explicit theorem,
  but the construction is close enough to standard ACW machinery that it may
  be folklore.

## 8. Addendum: red-team of a proposed CAPP extraction from ACW Theorem 1.9

### Verdict: the representation works, but the proposed exact-counting step does not

Consider the pure polynomial-size class

```text
MAJ_f o MAJ_f o THR,       f <= n^{6/5-epsilon}.
```

It is tempting to lower all probabilistic-representation errors to inverse
polynomial, enumerate the resulting `O(log^2 n)`-bit seeds, and claim that
ACW's weight-reduction/matrix-multiplication backend exactly counts each
seeded circuit.  The first half of this proposal is sound: each seed produces
the sign of a degree-`n^{1-Omega(epsilon)}` integer polynomial in the bottom
LTF outputs, and the seeded signs pointwise approximate the original circuit.

The second half is not in ACW and does not follow from their backend.  ACW
never count the assignments on which that integer polynomial is positive.
Their SAT algorithm branches on some variables, **sums the polynomial values
over all assignments to the branched variables**, and uses the very large
one-sided gap of the top probabilistic PTF to detect whether at least one
branch accepts.  This preserves an existential OR, but not the number of
accepting branches.  The missing operation is a nontrivial exact/inverse-error
counter for

```text
sign(P(T_1(x),...,T_B(x))),
```

where `P` is an integer polynomial of degree `n^{1-Omega(epsilon)}` and the
`T_i` are LTFs.  Neither ACW's matrix multiplication nor CTW Lemma 5.3
provides that operation.

### 8.1 The valid representation and its parameters

Let the desired pointwise error be `tau=1/poly(n)`.  Use ACW Theorem 1.1 on
every middle majority with error `tau/(4f)`, sharing one seed among all
middle gates.  Its degree is

```text
d_mid = O(sqrt(f log(f/tau))).
```

Independently use the exact-threshold case of ACW Theorem 1.3 for the top
majority, thresholding its real output at `1`.  With error `tau/4`, its degree
is

```text
d_top = O(f^{1/3} log^{2/3}(f/tau)).
```

Conditioned on every middle approximation being correct, the top PTF sees
the true fixed Boolean vector, so independence of the top seed makes its
pointwise guarantee applicable.  A union bound gives total disagreement
`O(tau)` on every fixed raw input.

After composition, a fixed joint seed gives an integer/rational polynomial
`R` in the bottom LTF outputs of degree

```text
d = d_mid d_top
  = O(f^{5/6} polylog(n))
  <= n^{1-5epsilon/6} polylog(n)
  = n^{1-Omega(epsilon)}.
```

Both seed blocks have `O(log^2 n)` bits for inverse-polynomial error.  Thus
the total seed space is quasipolynomial and can indeed be enumerated.  The
number of expanded monomials is at most
`2^{n^{1-Omega(epsilon)}}` up to logarithmic factors.  None of these is the
problem.

The output for a fixed seed, however, is

```text
[ R(T_1(x),...,T_B(x)) > 1 ],
```

not a low-degree `F_2` polynomial whose Boolean value can be modulus-amplified
and summed exactly.

### 8.2 What ACW's SAT backend actually computes

In ACW Theorem 1.9, the top probabilistic PTF is given an exponential
strength parameter (their proof uses `2^{2n^delta}`).  Consequently, on a
good seed:

- a false top-majority input contributes a value of magnitude at most a
  small baseline; while
- a true input contributes an overwhelmingly large positive value.

They branch on `k=n^delta` variables.  For each assignment `z` to the
remaining variables they form an aggregate of the form

```text
R_sum(z) = sum_{a in {0,1}^k} R(a,z).
```

The gap guarantees that comparing `R_sum(z)` with a threshold determines
whether **some** `a` makes the original circuit accept.  Weight reduction and
rectangular matrix multiplication then evaluate this one aggregate for each
of the `2^{n-k}` choices of `z`, which is why there is a saving.

For CAPP or `#SAT`, the needed quantity is instead

```text
N_z = | { a in {0,1}^k : R(a,z) > 1 } |.
```

`N_z` is not determined by `R_sum(z)`.  Positive PTF values are not a common
constant, can vary greatly with the Hamming margin, and have no useful upper
bound; false inputs can also contribute values in an interval around zero.
The large gap separates `N_z=0` from `N_z>0`, but does not encode `N_z`.

Lowering the target error to inverse polynomial makes the seeds enumerable,
but it also removes the exponential output strength used for the existential
aggregation.  More importantly, even keeping the exponential strength would
still reveal only zero versus nonzero count, not the count itself.

Without the branch-and-sum operation, the ACW matrix routine would have to
handle the sign separately on all `2^n` assignments.  Their stated routine
does not count positive entries of the resulting implicit matrix product
faster than materializing the full truth table.  A faster positive-entry
counter might conceivably exist, but it would be an additional circuit-
analysis theorem, not an invocation of ACW.

### 8.3 Why CTW Lemma 5.3 does not repair the gap

CTW Lemma 5.3 exactly handles

```text
POLY_F2[n^{1-gamma}] o THR.
```

Its modulus-amplification step uses the fact that the top polynomial's
Boolean output is its value modulo `2`.  A threshold of an integer polynomial,

```text
THR o AND_d o THR
```

after monomial expansion, has no analogous identity.  Applying Lemma 5.3 to
the monomials computes polynomial values, not the indicator that their signed
weighted sum is positive.

This distinction also explains the boundary of the valid shared-seed result
in Section 4.  If the top majority is replaced by an ordinary `F_2`
probabilistic polynomial, then the terminal exact evaluator applies, but the
two composed square-root degrees multiply to roughly `f`, not `f^{5/6}`.
For `f=n^{6/5-epsilon}`, this is below `n` only when
`epsilon>1/5` (with constant slack), essentially the already recorded
`MS<n^{2-Omega(1)}` regime.  The improvement from `f` to `f^{5/6}` comes
precisely from using a PTF at the top, and that reintroduces the unresolved
sign-counting problem.

### 8.4 Conditional XOR closure

XOR is not a second fundamental obstacle **if** the missing sign-counting
algorithm is supplied.  For two fixed seeded polynomials `R_0,R_1`, perturb
their rational thresholds by a sufficiently small representable amount so
neither shifted polynomial vanishes on a Boolean input.  Then the XOR of
their two threshold outputs is determined by the sign of

```text
(R_0-theta_0)(R_1-theta_1),
```

with the inequality direction chosen appropriately.  This is another PTF in
the bottom LTF outputs of degree at most `2d`.  Independent seeds for the two
branches and a union bound preserve inverse-polynomial approximation error.

Therefore a nontrivial counter for degree-`n^{1-Omega(epsilon)}`
`PTF o THR` would extend to `XOR_2` at constant-factor degree cost and could
feed an appropriate lower-bound bridge.  ACW supplies no such counter, so the
XOR observation does not rescue the proposal.

### 8.5 Prior-art assessment

No primary source found in the targeted search states this deterministic
inverse-error CAPP extraction.  ACW call Theorem 1.9 a randomized SAT
algorithm, and their proof's only use of the low-degree top PTF is the
gap-based existential aggregation just described.  Their Section 8 asks
whether that SAT algorithm can be derandomized.

The low-randomness seed enumeration and the degree calculation are implicit
in ACW, but the required terminal lemma is not.  Claiming the CAPP algorithm
would amount to assuming the main missing step:

> Given a degree-`n^{1-gamma}` integer PTF of polynomially many bottom LTF
> outputs, deterministically estimate (or exactly count) its positive inputs
> in `2^{n-n^{Omega(gamma)}}` time.

This should be recorded as an open algorithmic target, not as a consequence
of Theorem 1.9.
