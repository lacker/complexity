# Intermediate targets beyond the known threshold-SAT frontier

Date checked: 2026-08-12

## Bottom line

There is a plausible, fairly short new corollary of the 2026 Chen--Tal--Wang
(CTW) machinery: their deterministic CAPP algorithm for
`XOR_2 o SYM o THR` extends to a genuinely depth-3 class when the new top
interface has small polynomial fan-in.  With conservative constants, it gives
CAPP in `2^{n-Omega(n^{eta/50})}` time for an XOR of two circuits of the form

```text
        H on at most t middle outputs
                    |
              SYM ... SYM
                    |
                  THR
```

where the total number of bottom-`THR` occurrences is
`O(n^{2.5-eta})`, `H` is any polynomial-size Boolean circuit, and

```text
t <= n^{eta/50} / (100 log^2 n).
```

In particular, taking `H=THR` and every middle `SYM` gate to be `MAJ`
gives a nontrivial deterministic CAPP algorithm for the top-sparse class
`THR_t o MAJ o THR` with a superquadratic bottom-occurrence budget.  It does
**not** give unrestricted `THR_t o THR o THR`: an arbitrary weighted threshold
gate is not symmetric.  The separate low-fan-in flattening needed for weighted
middle gates is recorded in `top-interface-audit.md`.  I give the parameter
audit below.  I did not find this extension stated in the primary papers or
in a targeted search, but it may be viewed by experts as an implicit closure
observation rather than a new theorem.  It should therefore be treated as a
**candidate theorem requiring an independent proof and novelty check**, not
yet as a claimed result.

The most important correction to the motivating problem note is that
`ACC^0 o THR o THR` is not open without further size qualifications.
Alman--Chan--Williams (ACW) already gave deterministic nontrivial SAT for
`AC^0[d,m] o LTF o LTF` when the bottom layer has `n^{2-delta}` gates and the
two layers above it have subexponential size.  The genuinely live versions
either put at least quadratically many gates at the bottom, demand much larger
top fan-in, or ask to derandomize ACW's stronger three-majority-layer
algorithm.

## 1. What is already known (and what it rules out as an “open” target)

| Class / resource bound | Analysis algorithm | Consequence / caveat |
|---|---|---|
| `ACC^0 o THR`, size `2^{n^epsilon}` for sufficiently small `epsilon` | Deterministic `#SAT` in `2^{n-n^epsilon}` | Williams, STOC 2014 / ToC 2018. This is not the largest known class once ACW 2016 is included. |
| `AC^0[d,m] o LTF o LTF[2^{n^epsilon},2^{n^epsilon},n^{2-delta}]` | Deterministic SAT in `2^{n-n^epsilon}` | ACW Theorem 1.8. It strictly adds a subquadratic bottom LTF layer below the earlier `ACC^0 o LTF` frontier. |
| `MAJ o AC^0 o LTF o AC^0 o LTF`, top MAJ and every middle LTF of fan-in `O(n^{6/5-eta})`; bottom LTF plus AND/OR count `O(2^{n^delta})` | Bounded-error randomized SAT in `2^{n-Omega(n^delta)}` | ACW Theorem 1.9. The paper explicitly asks for derandomization. Ordinary Monte Carlo SAT does not directly feed the easy-witness lower-bound conversion. |
| Fixed-depth LTF circuits with `n^{1+epsilon_d}` wires | Randomized nontrivial SAT (and later zero-error exact-count variants for sparse PTF circuits) | Chen--Santhanam--Srinivasan (CSS), and Bajantri--Kumar--Kumari--Lokam--Saurabh (BKKLS). This is a sparse-*wire* regime; `epsilon_d` is a very small depth-dependent constant. |
| `XOR_2 o SYM_{O(n^{2.5-eta})} o THR` and `XOR_2 o THR_{O(n^{2.5-eta})} o THR` | Deterministic CAPP with error `o(1)` in `2^{n-n^{Omega(eta)}}` | CTW Theorems 5.4 and 1.2. This is the current dense depth-2 gate-count frontier and yields `E^NP` lower bounds of the same exponent. |

Two useful distinctions:

1. A gate-count theorem and a wire-count theorem are incomparable in the
   interesting dense regime.  A bottom threshold gate can itself have `n`
   input wires, so `n^{2.5-eta}` bottom gates can mean roughly
   `n^{3.5-eta}` wires.
2. The `6/5` in ACW Theorem 1.9 is not cosmetic.  Their middle probabilistic
   polynomials have degree roughly `f^{1/2}` and their top probabilistic PTF
   has degree roughly `f^{1/3}`.  Composition therefore costs `f^{5/6}`;
   requiring it to be below `n` gives `f < n^{6/5}`.

Thus the two examples suggested in the motivating note need refinement:

- `ACC^0 o THR o THR` with a subquadratic bottom layer is already solved by
  ACW.
- A substantial restricted form of `MAJ o MAJ o MAJ` already has a randomized
  nontrivial SAT algorithm.  The open and lower-bound-useful problem is to make
  it deterministic or zero-error, or to raise its fan-ins/resources.

## 2. Candidate theorem: a top-interface lifting of CTW

### Definition

Let `JUNTA_t o SYM o THR[M]` denote circuits

```text
C(x) = H(S_1(T_1(x)), ..., S_q(T_q(x))),   q <= t,
```

where:

- `H` is a Boolean circuit of size `poly(n)` on `q` input bits;
- every `S_j` is an arbitrary symmetric function;
- every `T_j` is a list of bottom linear-threshold gates, with repetitions
  counted; and
- the sum of the lengths of all the lists is at most `M`.

Using a polynomial-size circuit for `H`, rather than declaring an arbitrary
oracle gate, keeps the class normally encodable and evaluatable.  The
algorithm below only uses the fact that `H` can be tabulated on its `t` inputs
in `2^t poly(n)` time.

### Candidate statement

Fix constant `eta in (0,1)`.  Suppose the input is

```text
C = C_0 XOR C_1,
```

where both `C_b` are in
`JUNTA_t o SYM o THR`, the total number of bottom-THR occurrences across the
pair is `O(n^{2.5-eta})`, and

```text
t <= n^{eta/50} / (100 log^2 n).
```

Then there is a deterministic algorithm estimating `Pr_x[C(x)=1]` to
additive error `o(1)` in

```text
2^{n-Omega(n^{eta/50})}
```

time.

This immediately contains the same statement for top-fan-in-`t`
`THR o MAJ o THR` circuits.  It also permits arbitrary polynomial computation
above the `t` middle symmetric features, so the lifting is slightly stronger
than just adding one threshold gate.  It does not contain arbitrary weighted
middle `THR` gates.

### Parameter ledger

These are the parameters stated in CTW Sections 4--5, with their `epsilon`
renamed `eta`.

| Quantity | Bound |
|---|---:|
| Total bottom THR occurrences | `M = O(n^{2.5-eta})` |
| Live-variable set | `|I| = n^{eta/10}` |
| Fraction of bad columns | at most `n^{-eta/3}` |
| Nonconstant bottom occurrences on a good column | at most `n^{2-eta/2}` |
| Shared random-index range for a list approximator | `R = 2^{n^{eta/100}}` |
| Advice range for one middle SYM gate | `A = n^{10 log n} = 2^{10(log n)^2}` |
| Degree of one listed SYM polynomial | `D <= n^{1-eta/6}` |
| Degree accepted by CTW Lemma 5.3 | `n^{1-eta/8}` |
| Time for one Lemma 5.3 call | `O(2^{n-n^{eta/50}})` |
| Failure probability for one middle gate on a good column | at most `2^{-n^{eta/500}}` |

### Proof audit

1. **Use one global good-column partition.**  Put every bottom-THR occurrence
   from both input circuits in a single collection.  CTW Theorem 4.5 finds a
   live set `I` for which all but an `n^{-eta/3}` fraction of columns have at
   most `n^{2-eta/2}` nonconstant occurrences in the *global* collection.
   Consequently every middle gate is good on the same good columns.  There is
   no factor of `t` in the bad-column fraction.

2. **List-approximate all middle symmetric gates.**  Apply CTW Theorem 5.2 to
   each of the at most `2t` middle gates.  Index every resulting list by the
   same uniform `r in [R]`.  This coupling is legitimate: each gate has the
   required uniform marginal distribution, and the subsequent union bound
   needs no independence.  On a good column `z`, each gate has a computable
   advice `a_j(z,r) in [A]`.

3. **Replace the top computation exactly.**  Every Boolean function on at
   most `t` bits has a unique multilinear polynomial over `F_2` of degree at
   most `t`.  Evaluate `H` on all `2^t` inputs and use a Moebius transform to
   construct this polynomial.  Substitute the listed degree-`D` polynomial
   for each middle output.  The resulting `POLY_F2 o THR` circuit has degree

   ```text
   tD <= n^{eta/50} n^{1-eta/6}
      = n^{1-11eta/75}
      < n^{1-eta/8},
   ```

   where the omitted `100 log^2 n` denominator only helps.  Hence CTW Lemma
   5.3 applies.  Explicit expansion costs at most
   `2^{O(tD log n + t)}`, which is subexponential and below the main running
   time; the strict exponent gap absorbs the logarithm for sufficiently large
   `n`.

4. **Enumerate advice tuples without losing the saving.**  There are at most

   ```text
   R A^{2t}
     = 2^{n^{eta/100} + 20t(log n)^2}
     <= 2^{n^{eta/100} + 0.2 n^{eta/50}}
   ```

   calls to Lemma 5.3.  Since `n^{eta/100}=o(n^{eta/50})`, multiplying this by
   the per-call time `2^{n-n^{eta/50}}` leaves
   `2^{n-Omega(n^{eta/50})}` total time.  The partition construction and the
   applications of Theorem 5.2 have larger savings and are dominated.

5. **Bound the approximation error.**  Whenever all middle approximations are
   correct, the exact top polynomial is correct.  On a good column the failure
   probability is at most

   ```text
   2t * 2^{-n^{eta/500}}.
   ```

   Adding the mass of bad columns gives total additive error

   ```text
   n^{-eta/3} + 2t * 2^{-n^{eta/500}} = o(1).
   ```

The only proof details I have not independently reconstructed line by line are
the precise input-representation convention for the `POLY_F2` gate in CTW
Lemma 5.3 and the harmless constants hidden by its big-O.  The explicit
expansion bound above appears to resolve the former; choosing `100` in the
fan-in bound leaves ample room for the latter.

### Lower-bound conversion: likely, but not claimed here

The stronger `JUNTA_t` version is evaluatable, contains parity, and is closed
under negation, projections, and constant-fan-in OR at constant-factor cost.
Those are the kinds of hypotheses in Bathie--Williams' general CAPP-to-lower-
bound framework.  This strongly suggests the candidate CAPP theorem also
implies an `E^NP` lower bound against the corresponding top-interface class.
However, CTW Lemma 3.8 explicitly states the bridge only for `THR o THR` and
`SYM o THR`.  The Bathie--Williams proof should be audited for the
top-fan-in-restricted family before stating this as a corollary.

## 3. The three sharpest open targets after this lifting

### A. Derandomize ACW's `6/5` three-layer algorithm

This is the cleanest Ryan-Williams-style target.  Even the pure subclass

```text
MAJ_f o MAJ_f o MAJ,       f <= n^{6/5-eta},
```

with subexponentially many bottom gates is already covered by ACW's
bounded-error randomized algorithm.  A deterministic or zero-error version
with `2^{n-n^{Omega(eta)}}` time would make the result usable in the
algorithmic lower-bound method.

A concrete missing lemma is a **constructive joint-seed sampler** for the
middle probabilistic polynomials and the top probabilistic PTF.  After ACW
branches on `n^delta` variables, construct, within the intended saving, a
small multiset of joint seeds such that for every remaining assignment the
sample aggregate has the required gap between the satisfiable and
unsatisfiable cases.  ACW obtains such a multiset nonconstructively by taking
`100n` independent samples and a union bound over the remaining assignments.
Finding it deterministically, or certifying a Las Vegas choice, is precisely
where their proof stops.  Merely replacing each component sampler by a
small-bias space is not enough: the output is a threshold of correlated
polynomial evaluations, and the guarantee must hold simultaneously on
exponentially many assignments.

### B. Top-aware advice compression for the CTW list approximator

The candidate lifting above stops at
`t about n^{eta/50}/log^2 n` for a transparent reason: one middle SYM gate has
`A=2^{Theta(log^2 n)}` possible column advice values, and enumerating the
Cartesian product costs `A^t`.

The right lemma should not try to recover all `t` advice strings.  For disjoint
middle-gate input lists those strings can encode essentially independent
fixed-coordinate counts, so generic coordinatewise compression is probably
false.  The plausible target is instead **top-aware**:

> Given a top `THR` or `MAJ` of `t=poly(n)` middle symmetric/threshold gates
> sharing at most `n^{2.5-eta}` bottom-THR occurrences, list-approximate the
> *composed output directly* on every CTW-good column by degree
> `n^{1-eta/8}` `F_2` polynomials, using at most
> `2^{o(n^{eta/50})}` global advice/randomness types and with `o(1)` error.

Combined with CTW Lemma 5.3, that statement would immediately give a
nontrivial deterministic CAPP algorithm for a much broader depth-3 class.
Any exponent above the elementary `eta/50` top-fan-in barrier would already
show a new compression phenomenon; `t=poly(n)` independent of `eta` is the
real frontier.  The structure to exploit is the top threshold's insensitivity
away from its margin, not the individual exact sums.

### C. Superquadratic bottom density under an `ACC^0` or threshold top

ACW's deterministic theorem stops at `n^{2-delta}` bottom LTF gates, whereas
CTW reaches `n^{2.5-eta}` only for a single top `SYM/THR`.  A sharp bridge
problem is therefore

```text
ACC^0[d,m] o LTF o LTF
```

with at least `n^{2+gamma}` bottom-gate occurrences, or even the special case
with one top `MAJ` and polynomially many middle LTFs.  This is the corrected
version of “solve `ACC^0 o THR o THR`.”  A plausible route is to combine CTW's
good-column/list representation with a Razborov--Smolensky approximation of
the top `ACC^0` portion.  Again, degree is not the first obstruction:
polylogarithmic top degree composes comfortably with
`n^{1-Omega(eta)}`.  The obstruction is the explosion in independently
chosen middle-gate advice.  Progress on target B would therefore feed this
target directly.

An orthogonal, more combinatorial third target is to improve the sparse-wire
depth-3 threshold regime from the tiny existential CSS/BKKLS exponent to an
explicit bound such as `n^{1.1}` wires.  I found no primary source achieving
that density.  It is cleaner to state, but less directly connected to the
superquadratic gate-count techniques of CTW.

## 4. Conversion rules worth keeping straight

- Deterministic nontrivial SAT/#SAT is directly useful in Williams-style
  easy-witness arguments.
- A zero-error exact-count algorithm that outputs either the correct answer
  or `?`, and succeeds with positive probability, can also be made useful by
  nondeterministically guessing a successful random string; it never has a
  false branch.
- A bounded-error Monte Carlo SAT algorithm is not automatically useful:
  there is generally no efficiently checkable certificate that the chosen
  coins were globally good.  This is why ACW explicitly single out
  derandomization of Theorem 1.9.
- Additive-error CAPP cannot detect a unique satisfying assignment.  Its
  lower-bound conversion instead goes through the PCPP-based framework of
  Chen--Williams and Bathie--Williams.  For depth-2 threshold classes, CTW
  package this as their Lemma 3.8.

## 5. Primary sources

1. Ryan Williams, *New Algorithms and Lower Bounds for Circuits With Linear
   Threshold Gates*, STOC 2014 / Theory of Computing 2018:
   [arXiv:1401.2444](https://arxiv.org/abs/1401.2444).
2. Josh Alman, Timothy M. Chan, and Ryan Williams, *Polynomial
   Representations of Threshold Functions and Algorithmic Applications*,
   FOCS 2016: [author PDF](https://tmc.web.engr.illinois.edu/thr8_16.pdf).
   The relevant statements are Theorems 1.8 and 1.9 and the explicit
   derandomization question in Section 8.
3. Ruiwen Chen, Rahul Santhanam, and Srikanth Srinivasan, *Average-Case Lower
   Bounds and Satisfiability Algorithms for Small Threshold Circuits*, CCC
   2016 / Theory of Computing 2018:
   [journal PDF](https://theoryofcomputing.org/articles/v014a009/v014a009.pdf).
4. Swapnam Bajpai, Vaibhav Krishan, Deepanshu Kush, Nutan Limaye, and Srikanth
   Srinivasan, *A #SAT Algorithm for Small Constant-Depth Circuits with PTF
   Gates*, Algorithmica 2022:
   [author PDF](https://vaibhkrishan.github.io/files/pdf/ptf-journal.pdf).
5. Valentine Kabanets and Zhenjian Lu, *Satisfiability and Derandomization for
   Small Polynomial Threshold Circuits*, ECCC TR18-115:
   [ECCC report](https://eccc.weizmann.ac.il/report/2018/115/).
6. Lijie Chen, Avishay Tal, and Yichuan Wang, *Super-quadratic Lower Bounds
   for Depth-2 Linear Threshold Circuits*, STOC 2026:
   [ECCC TR26-039](https://eccc.weizmann.ac.il/report/2026/039/).  The candidate
   lifting uses Theorem 4.5, Theorem 5.2, Lemma 5.3, and Theorem 5.4.
7. Gabriel Bathie and R. Ryan Williams, *Towards Stronger Circuit Lower Bounds
   from Algorithms*, ITCS 2024:
   [LIPIcs paper](https://drops.dagstuhl.de/storage/00lipics/lipics-vol287-itcs2024/LIPIcs.ITCS.2024.10/LIPIcs.ITCS.2024.10.pdf).
8. Cody Murray and R. Ryan Williams, *Circuit Lower Bounds for
   Nondeterministic Quasi-Polytime: An Easy Witness Lemma for NP and NQP*,
   STOC 2018 / SICOMP 2020:
   [author PDF](https://people.csail.mit.edu/rrw/easy-witness-nqp.pdf).
9. Russell Impagliazzo, Ramamohan Paturi, and Stefan Schneider,
   *A Satisfiability Algorithm for Sparse Depth Two Threshold Circuits*,
   FOCS 2013: [arXiv:1212.4548](https://arxiv.org/abs/1212.4548).

## Confidence labels

- **High confidence:** the baseline theorem statements, the correction about
  ACW Theorem 1.8, and the identification of derandomizing ACW Theorem 1.9 as
  an explicit open problem.
- **Medium-high confidence:** the arithmetic and proof skeleton of the
  top-interface lifting.
- **Medium confidence:** novelty of that lifting; no explicit statement was
  found, but the search was not exhaustive and the observation is short.
- **Medium/low until audited:** the claimed applicability of the generic
  CAPP-to-`E^NP` lower-bound conversion to the top-interface-restricted class.
