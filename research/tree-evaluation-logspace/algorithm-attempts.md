# Algorithm attempts: deterministic `O(h + ell)`-space Tree Evaluation

Date: 2026-08-12

Scope: independent attack on the binary Tree Evaluation problem.  A height-`h`
complete binary tree has `ell`-bit values, arbitrary explicitly tabulated maps

```text
f_u : {0,1}^ell x {0,1}^ell -> {0,1}^ell,
```

and input length

```text
n = Theta(2^h * ell * 2^(2 ell)),     log n = Theta(h + ell).
```

The target is deterministic `O(h + ell)` space.  `PROVED` below means proved
in this note, usually as a small deduction from a cited construction; it does
not mean that the main open problem has been solved.  `OBSTRUCTION` means a
specific proposed implementation fails, not a lower bound against every
algorithm of that broad flavor.

## Outcome

`OPEN`: I did not obtain an `O(h + ell)`-space algorithm for all parameters.

The most useful conclusions of this attack are:

1. `PROVED`: every unresolved parameter family is contained in the window

   ```text
   ell / log ell < h < ell^2.
   ```

   (Goldreich's tradeoff actually covers additional subregimes inside this
   coarse window; for example `h >= ell^(1+delta)` for every fixed
   `delta>0`.)

   In particular, **constant alphabet is already in L**.  The question in the
   repository problem statement suggesting constant `k` as an open special
   case is obsolete/incorrect.

2. `OBSTRUCTION`: recursive recomputation, stackless tree traversal, CRT, and
   bit-serial table lookup all encounter the same local fact: an arbitrary
   table can require an injective `ell`-bit summary of one child while the
   other child is evaluated.  Recomputing that summary merely moves the
   `ell`-bit preservation obligation one level down.

3. `OBSTRUCTION`: a tempting way to erase the Cook--Mertz per-level
   `log ell` loop counter is to cycle the masks themselves through the roots
   of unity and recognize completion with a marker coordinate.  It works for
   one level and fails under recursion: a child begins at the parent's current
   root, and recognizing return to its *own* starting root requires saving one
   field element per active level.  This recreates `h log ell` bits exactly.

4. `OBSTRUCTION`: postponing all interpolation to the root does not fix this.
   A diagonal (single-variable) polynomial can have degree
   `Theta(ell)^h`; an exact root-of-unity projection then needs a field/order
   whose description costs `Theta(h log ell)`.  More seriously, before the
   projection, recursive child updates depend on the masks.  Changing an
   ancestor accumulator before uncomputing a child means the nominal inverse
   no longer restores the workspace.

5. `CONDITIONAL TARGET + BARRIER`: the 2026 matching-vector/CIR algorithm
   isolates a crisp sufficient object.  A logspace-uniform, constant-server
   catalytic information-retrieval scheme for a `2^(2 ell)`-entry database
   with `O(h + ell)` bits of persistent query/answer state would give the
   desired algorithm.  Its *materialized matching-vector* instantiation cannot
   meet this target in the balanced case: it would require constant-modulus
   matching vectors of size `2^ell` and dimension `O(ell)`, whereas the
   Bhowmick--Dvir--Lovett bound, now unconditional via the polynomial
   Freiman--Ruzsa theorem, gives `d=Omega(ell log ell)`.  Thus this route needs
   a succinct dynamic representation or a non-matching-vector CIR; simply
   improving known matching-vector parameters cannot put TreeEval in L.

## 1. Two baseline facts that change how to search

### 1.1 There is no useful “unbounded time” loophole

`PROVED`: a halting deterministic `O(log n)`-space decider has only
`poly(n)` configurations (finite control, input-head locations, work-head
locations, and `O(log n)` work bits).  It therefore cannot repeat a
configuration before halting and automatically runs in polynomial time.  For
the functional problem, compute each of the `ell = O(log n)` output bits with
such a decider; the same observation applies.

Consequently a proposal that uses, say, `k^h = 2^(h ell)` time is not a
logspace algorithm in disguise when both `h` and `ell` grow.  This rules out
several otherwise tempting “enumerate every possible stack” implementations.
The desired theorem would simultaneously turn the superpolynomial-time
Cook--Mertz procedure into a polynomial-time computation.

This gives a useful design constraint stronger than “compress the call
stack.”  The Cook--Mertz clean step makes `m=Theta(poly(ell))` recursive calls
per level, so its unrolled program has an `m^h` factor.  At `h=Theta(ell)`,

```text
m^h = 2^(Theta(ell log ell))
```

whereas `n=2^(Theta(ell))`.  Thus merely encoding the same `m`-ary recursion
stack more cleverly would still leave superpolynomial runtime and cannot be
an L algorithm.  A successful method must also batch the interpolation calls
or reduce the effective recursive branching to a constant (as the
matching-vector method does).

### 1.2 The hard parameter window is narrower than the headline problem

Goldreich's digest of Cook--Mertz gives

```text
S_CM(h,ell) = O(ell + h log ell).
```

Thus `S_CM = O(h + ell)` whenever `h = O(ell / log ell)`.  This includes every
constant alphabet: constant `k` means constant `ell`, so the bound is `O(h)`.
There is also a direct check: for fixed `k`, replace each fixed-arity
`[k]^2 -> [k]` gate by a constant-size Boolean gadget and use the standard
logspace Boolean-formula evaluator.

Goldreich's arity grouping gives, for any block height `b`,

```text
S_group(h,ell,b)
  = O(h + 2^b ell + (h/b) log ell).
```

Choosing `b = ceil(log ell)` gives

```text
S_group = O(h + ell^2).
```

Hence this is `O(h + ell)` whenever `h = Omega(ell^2)`.  Combining the two
known algorithms gives the coarse enclosure

```text
ell/log ell = O(h)   and   h = O(ell^2).
```

The balanced case `h = Theta(ell)` is the center of the remaining difficulty.
More generally, setting `b=(delta/2) log ell` shows that, for every fixed
`delta>0`, `h >= ell^(1+delta)` is also in L.  Thus the asymptotically sharp
uncovered upper edge is closer to `ell^(1+o(1))`; `ell^2` is merely a clean
uniform threshold requiring no fixed auxiliary constant.
These deductions use the bounds in Goldreich's
[Cook--Mertz exposition](https://eccc.weizmann.ac.il/report/2024/109/) and
[arity refinement](https://eccc.weizmann.ac.il/report/2024/124/).

## 2. Recursive recomputation and bit-serial lookup

### Attempt 2.1: compute right, then recompute left

The ordinary recurrence is

```text
Eval(u):
    a = Eval(u0)
    b = Eval(u1) while preserving a
    return f_u(a,b)
```

and gives `S(h) = S(h-1) + ell + O(1)`.  Try discarding `a`, computing `b`,
and recomputing `a`.  At the final table access, however, both `a` and `b`
must still be available.  If `b` is retained while `a` is recomputed, the
same recurrence returns with the two children exchanged.

`LOCAL OBSTRUCTION`: this simultaneous-information requirement is genuine
for arbitrary tables, rather than an artifact of direct addressing.  Set one
output bit of a gate to

```text
EQ(a,b) = 1 iff a=b
```

and pad the other output bits with zero.  Any deterministic one-way summary of
`a` that suffices to evaluate this table for every later `b` must distinguish
all `2^ell` possible `a`'s, hence has at least `ell` bits.  This is only a
one-gate communication argument, not a TreeEval space lower bound: proving
that the obligations direct-sum through the levels would essentially solve a
major lower-bound problem.  It does show exactly why “retain a short digest of
the first child” cannot be a black-box solution for arbitrary gates.

### Attempt 2.2: enumerate table rows and test child equality

For a proposed output `c`, write

```text
[v_u = c]
  = OR over (a,b) with f_u(a,b)=c of
        ([v_u0=a] AND [v_u1=b]).
```

This suggests scanning the explicit table and recovering values bit by bit.
The formula is logically correct.  A recursive deterministic evaluator must,
however, retain the `2 ell`-bit candidate `(a,b)` (or its table address) while
checking a child.  Applying the same transformation recursively stores one
candidate per level and uses `Theta(h ell)` space.

The fully expanded Boolean formula has size about `k^(2h)` in the worst case,
so the generic logspace formula evaluator uses

```text
O(log(k^(2h))) = O(h ell)
```

space and can take `2^(Theta(h ell))` time.  Section 1.1 explains why the latter
cannot be hidden inside a deterministic `O(h+ell)`-space machine.

### Attempt 2.3: alternation removes the candidate stack

The equality recurrence has a clean alternating interpretation: existentially
choose `(a,b)`, then universally verify the two children.  Along one branch it
needs only a node address and a constant number of `ell`-bit values, or
`O(h+ell)` space.

`OBSTRUCTION`: this recovers the routine inclusion in alternating space and,
via `ASPACE(s) = DTIME(2^O(s))`, the known polynomial-time algorithm.  Savitch's
theorem determinizes *nondeterministic reachability*; it does not turn a
general alternating AND--OR computation into deterministic space `O(s)`.
Depth-first determinization retains the existential candidates and returns to
`Theta(h ell)` space.  Uniqueness of the true child pair does not currently
supply an L simulation of this alternating computation.

## 3. Pointer reversal and stackless traversal

A complete tree can be traversed in postorder with `O(h)` control bits: retain
the current node address and a constant-size arrival direction, or use the
usual pointer-reversal idea.  This removes the *control* stack.

`OBSTRUCTION`: it does not remove the value pebbles.  On returning from a left
subtree, the location and arrival direction reveal no information about its
`ell`-bit value: leaf labels and internal tables can be changed independently
without changing the traversal.  The algorithm must either retain that value
while visiting the right subtree or recompute it later, reducing to Section 2.

Literal pointer reversal would be powerful if the input tree were writable:
one could annotate a node with a computed child value and later restore it.
TreeEval's input is read-only.  Treating the explicit truth tables as temporary
storage silently changes the model to catalytic/writable-input space, exactly
the resource supplied by the catalytic algorithms.

## 4. Savitch-style height splitting

Split at depth `r`.  The upper tree becomes a macro-computation on `2^r`
boundary values; each boundary value is the result of a height-`h-r` subtree.
Computing boundary values on demand saves their simultaneous materialization,
but the upper arbitrary-table evaluator again retains one value while querying
another.  There is no associative summary of the boundary vector: an upper
truth table may distinguish any two boundary assignments that reach it.

The quantitative version is Goldreich's arity tradeoff from Section 1.2:
replacing a block of `b` binary levels by a `2^b`-ary level costs
`Theta(2^b ell)` global storage and leaves `(h/b) log ell` local control.  To
make the latter `O(h)`, take `b = Omega(log ell)`; then the former is
`Omega(ell^2)`.  This succeeds when `h >= ell^2` and misses exactly the
balanced window.  Exploiting the fact that the macro-gate is a structured
binary subtree, instead of an arbitrary `2^b`-ary table, merely invokes a
TreeEval algorithm inside the block and restores the original recursion.

## 5. Chinese remainders, fingerprints, and Fourier encodings

### Attempt 5.1: keep residues of an old child

Suppose the first child is stored only modulo a small prime `p`.  Choose two
values `a != a'` with the same residue and define a table for which
`f(a,b) != f(a',b)` for some `b`.  The residue cannot determine the answer.
Using enough primes that their product exceeds `2^ell` makes the encoding
injective, but their combined residues contain `Omega(ell)` bits.  At one
level this is fine; preserving such residues at every active level is the old
`h ell` stack.

Processing the primes sequentially does not help.  An arbitrary lookup table
need not respect congruences: in general there is no function `f_p` satisfying

```text
f(a,b) mod p = f_p(a mod p, b mod p).
```

Thus the exact pair must be reconstructed before the row of `f` can be
selected.  CRT is useful for arithmetic gates, not for arbitrary tables.

### Attempt 5.2: randomized equality fingerprints

A small random fingerprint can compare a child with a candidate using little
space, but TreeEval asks for an exact deterministic algorithm.  Fixing or
enumerating a short seed does not make a non-injective map distinguish every
pair.  Combining enough fingerprints to be deterministically injective again
requires `ell` total bits.  Moreover, even a collision-free equality test only
implements the candidate-enumeration recursion of Section 2.2.

### Attempt 5.3: one-hot/Fourier representation

Represent a value `a` by the delta vector `e_a`, or by all of its characters.
Then an arbitrary gate is a tensor contraction

```text
e_c = sum_(a,b) [f(a,b)=c] e_a tensor e_b.
```

The representation is algebraically clean but has `2^ell` coordinates.  One
can stream coordinates or frequencies, but a recursive query must remember
which coordinate is being streamed at every active level, costing
`Theta(h ell)` control bits.  A shorter deterministic encoding that supports
*every* explicit table must be injective (take a table that separates any
chosen pair), so it cannot have fewer than `ell` bits per live value without
using some cross-level clean-computation trick.

## 6. Can the Cook--Mertz interpolation counter be removed?

This is the most concrete point of attack.  In the Cook--Mertz/Goldreich clean
step, the multilinear extension of an arbitrary gate has degree
`D = Theta(ell)` (or the analogous symbol-encoding degree).  For a primitive
root `omega` of order `m>D`, averaging

```text
p(omega^j X + a, omega^j Y + b),  j=0,...,m-1
```

removes the arbitrary masks `X,Y` and yields `p(a,b)`.  The global registers
are reused at every recursion level, but each suspended level retains its
`j`, costing `Theta(log ell)` local bits and `Theta(h log ell)` overall.

### Attempt 6.1: make the masks themselves the loop counter

Instead of retaining `j`, multiply the mask registers by `omega` after each
iteration.  Append a coordinate initially equal to `1`; its return to `1`
signals that the full orbit is complete.  This genuinely removes the explicit
counter for one nonrecursive call.

`OBSTRUCTION UNDER RECURSION`: suppose the parent is at its `j`th orbit point,
so the marker passed into a child is `omega^j`.  The child must perform `m`
iterations and stop when the marker returns to **`omega^j`**, not when it first
hits `1`.  For example, with `m=3`, a child entered at `omega` and stopping at
`1` performs only two terms, so the root-of-unity cancellation is false.
Normalizing the marker to `1` requires preserving the incoming `omega^j` so it
can be restored on return.  That is one `Theta(log m)=Theta(log ell)` field
element per active level, exactly the original stack.

Using a node-dependent canonical marker has the same problem: the incoming
marker still has to be restored.  Using the three Cook--Mertz register blocks
as rotating markers postpones collision only a constant number of levels; at
greater depth all of them contain ancestor phases.

This does not prove that every counter-free scheduling is impossible, but it
gives a falsifying trace for the most natural cyclic implementation.  Even a
successful implementation of the same `m` iterations would not by itself
settle the problem in the balanced window: the resulting `m^h` runtime is
superpolynomial by Section 1.1.  Counter removal and recursive-call reduction
must happen together.

### Attempt 6.2: share one interpolation variable across all levels

Nested interpolation can be viewed as taking the constant coefficient in
variables `t_1,...,t_h`.  Set all `t_i=t` and project once at the root.  Because
all exponents are nonnegative, it is tempting to think that only total degree
`hD` matters.

`OBSTRUCTION`: degree multiplies under arbitrary gate composition.  A chain of
degree-`D` monomials gives

```text
t -> t^D -> t^(D^2) -> ... -> t^(D^h).
```

The Boolean/table extensions can realize the analogous multiplicative-degree
growth.  Exact root-of-unity projection therefore needs order greater than
`D^h`, whose element/index has

```text
log(D^h) = Theta(h log ell)
```

bits.  If a smaller order `q` is used, the nonconstant monomial `t^q` aliases
the constant term under the group average.  Several small moduli do not by
themselves identify the constant coefficient of a dense degree-`D^h`
polynomial; exponents divisible by the selected orders alias it.

### Attempt 6.3: defer projection but keep the field small

There is a second, more operational failure.  Before projection, a recursive
child update is mask-dependent.  A toy form is

```text
Child_t(X; Z) : X <- X + v + t Z.
```

If a parent changes `Z` by `Delta` while `X` holds the child result and then
calls the nominal inverse with the new `Z`, the residual is

```text
(v+tZ) - (v+t(Z+Delta)) = -t Delta,
```

not zero.  Cook--Mertz projects at every level precisely so the clean child
translation is the true `v`, independent of every mask that a parent may
change before uncomputation.

Adding a scratch register permits compute--copy--uncompute at one level, but a
descendant uses the finite collection of global registers as its own masks.
After a constant number of levels an ancestor accumulator is again a
descendant mask.  Avoiding this for depth `h` by dedicated scratch blocks costs
`Theta(h ell)`.

### Attempt 6.4: nilpotent or truncated-polynomial masks

Over dual numbers `K[epsilon]/(epsilon^2)`, the pair `v + epsilon X` retains a
true value in the constant coefficient and a mask in the linear coefficient.
This handles one masking layer elegantly.  A new recursive level would need to
move an *arbitrary existing ring element* into a fresh positive-degree part.
Multiplication by `epsilon` is non-injective (`epsilon(a+b epsilon)=a epsilon`)
and therefore cannot be a reversible clean update.  Keeping enough
coefficients to make every shift injective allocates one layer (or sufficient
degree range) per recursion depth, returning to superlogarithmic storage.

### Attempt 6.5: pack interpolation points as Frobenius conjugates

Over `F_(2^r)`, one field element implicitly determines its `r` Frobenius
conjugates, and a field trace sums them.  This suggests evaluating all
root-of-unity servers “at once.”  In the small fields used by Cook--Mertz,
however, `r=Theta(log ell)`, while exact projection of a degree-`Theta(ell)`
extension needs `Theta(ell)` points.  An extension with `Theta(ell)` conjugates
costs `Theta(ell)` bits **per symbol**, losing the `O(ell)` global-space bound.

There is also a covariance condition: from

```text
q(t) = p(t X + v)
```

one gets `q(t)^2 = p(t^2 X^2+v)` (for base-field `p,v`), not
`p(t^2 X+v)`, unless the mask `X` is Frobenius-fixed.  Recursive scaled masks
are general extension-field elements.  Packing all masks as a conjugate tuple
restores covariance but is exactly the large extension representation just
counted.  Encoding the entire `ell`-bit value as one extension-field symbol
keeps one symbol, but then an arbitrary lookup table has interpolation degree
`2^Theta(ell)`, so the tradeoff only moves the blowup.

## 7. Direct root-polynomial evaluation

One can polynomialize each truth table and compose all the extensions into a
polynomial for the root bits.  Streaming its monomials avoids storing its full
description, but the degree and indexing blow up multiplicatively with depth.
For worst-case gates the syntactic degree is `Theta(ell)^h`, so merely indexing
a univariate interpolation domain requires `Theta(h log ell)` bits.  A
multivariate representation instead needs one `Theta(log ell)` index for each
level.  These are two views of the same counter stack.

The polynomial can of course have enormous cancellations on Boolean inputs.
Exploiting those cancellations for *every explicitly tabulated gate* without
first evaluating the children would be a genuinely new ingredient; none of
the standard multilinearization, CRT, or finite-field fingerprint operations
found here supplies it.

## 8. The matching-vector / catalytic-information-retrieval route

Henzinger, Pyne, and Ragavan's
[2026 matching-vector algorithm](https://arxiv.org/abs/2602.14320) reframes the
one-level clean gate computation as catalytic information retrieval (CIR).
For a matching-vector family of size `2^ell` over `Z_m^d`, where `m` has `t`
distinct prime factors, their Theorem 3.1 gives (suppressing lower-order terms)

```text
free space       O(ell + h log m),
catalytic space  O(d log(d m)),
time             poly(2^(ell + h t)).
```

The number of recursive calls/servers is `2^O(t)`.  Taking constant `t,m`
therefore solves both problems that defeat Cook--Mertz: only `O(1)` control
bits are suspended per level, and the runtime is polynomial in the TreeEval
input.  The remaining cost is the materialized matching-vector registers.

`PROVED CONDITIONAL LEMMA (black-box form)`: if, for the needed database size,
there is a logspace-uniform constant-`m` CIR/matching-vector instantiation
satisfying the theorem's stated catalytic bound

```text
d log(d m) = O(h + ell),
```

then TreeEval is in deterministic `O(h+ell)` space.  Initialize the catalytic
tape to zero on an ordinary work tape, run the catalytic algorithm, and count
that tape as ordinary storage.  Correctness for every catalytic initialization
in particular implies correctness for zero; restoration is harmless.

`PROVED SHARPENING FOR THIS USE`: the extra `log d` per coordinate in the
paper's catalytic-tape statement only handles an *arbitrary bit string* that
may not parse as valid `Z_m` coordinates (Remark 2.3).  In an ordinary
logspace simulation we choose the tape's initialization.  Initialize all
coordinates to the valid element zero and store each directly in
`ceil(log m)` bits; modular updates preserve validity.  Thus it is enough that

```text
d log m = O(h + ell).
```

For the central window `h=Theta(ell)`, the matching-vector formulation asks
roughly for

```text
d = O(ell)
```

at constant modulus, for a family of size `2^ell`.  (Using Theorem 3.1
literally without the valid-zero simplification would ask for the stronger
`d=O(ell/log ell)`.)  This is not merely beyond current constructions:
Bhowmick--Dvir--Lovett showed, conditional on polynomial Freiman--Ruzsa over
`Z_m^d`, that a constant-modulus family of size `2^ell` has

```text
d = Omega(ell log ell).
```

Gowers--Green--Manners--Tao proved the needed conjecture in 2025, making the
barrier unconditional; see Footnote 4 of the 2026 TreeEval paper.  Existing Grolmusz-type
families have

```text
d = exp(O(ell^(1/t) (log ell)^(1-1/t)))
```

for fixed `t`, yielding subpolynomial rather than logarithmic catalytic
storage.  The paper explicitly suggests succinct/on-the-fly materialization
of matching vectors as a route toward L.  Merely having a uniform algorithm
that outputs coordinate `i` is not enough: the catalytic registers contain an
arbitrary initial vector plus persistent updates and must survive recursive
calls.  A successful succinct representation must be closed under the CIR
updates and inner products, not just generate the static family.

The CIR view is still attractive because it supplies constant recursion
branching and polynomial runtime, but the lower bound rules out the naive
“construct linear-dimensional matching vectors” target.  The persistent
vectors must be represented without materializing all `d` coordinates, or the
CIR must leave the matching-vector framework.  It also warns that improving
only the Cook--Mertz field representation cannot suffice: that protocol has
`poly(ell)` servers, so its call-stack control alone is `h log ell`.

## 9. What would count as genuine progress next

The following targets survived the falsification attempts above.

### Target A: succinct dynamic matching-vector registers

Find a representation of the three Henzinger--Pyne--Ragavan registers using
`O(h+ell)` bits that supports, in `poly(n)` time:

```text
R <- R + gamma * u_a,
R <- R + gamma * v_a,
selected inner products needed by CIR,
and exact restoration,
```

where `a` is itself supplied only through a recursive clean computation.  The
representation must support the *dynamic sum*, not just random access to an
individual static vector.

### Target B: constant-server CIR outside matching vectors

Construct a deterministic, perfectly correct constant-server CIR for an
arbitrary explicit database whose complete persistent state is `O(ell)` bits.
Ordinary PIR privacy is only an analogy; the exact requirements are the clean
masked-query composition in the 2026 paper.  This would bypass both the
Reed--Muller `log ell`-bit call index and the large matching-vector catalyst.

### Target C: mask-independent deferred computation

Find a clean recursive transformation whose unprojected child update may be
approximate/algebraic but is independent of every register an ancestor can
change before uncomputation.  This is the exact property missing from the
single-variable and nilpotent attempts.  If achieved with a constant number of
`O(ell)` registers and constant branching, standard stackless control would
give `O(h+ell)` space.

### Target D: improve only the balanced window

Any new method can focus on

```text
ell/log ell < h < ell^2,
```

and especially `h=Theta(ell)`: outside this range the existing bounds already
give logspace.  This avoids spending effort on constant `k`, shallow trees, or
very tall trees that are settled by parameter substitution.

## 10. Bottom line

No proposed recomputation or interpolation rearrangement here closes the
problem.  The repeated obstruction is not the physical traversal of the tree;
it is maintaining a **clean, mask-independent translation by a recursively
defined `ell`-bit value** while only constant-size control is suspended at each
level.  Cook--Mertz achieves small global data but `log ell` suspended control;
matching-vector CIR achieves constant suspended control but uses a
superlogarithmic persistent register.  An `O(log n)` algorithm must achieve
both simultaneously.

Primary sources used:

- Cook and Mertz, [Tree Evaluation Is in Space `O(log n log log n)`](https://eccc.weizmann.ac.il/report/2023/174/).
- Goldreich, [On the Cook--Mertz Tree Evaluation procedure](https://eccc.weizmann.ac.il/report/2024/109/).
- Goldreich, [Solving Tree Evaluation in `o(log n log log n)` space](https://eccc.weizmann.ac.il/report/2024/124/).
- Henzinger, Pyne, and Ragavan, [Catalytic Tree Evaluation From Matching Vectors](https://arxiv.org/abs/2602.14320).
- Bhowmick, Dvir, and Lovett, [New Lower Bounds for Matching Vector Codes](https://arxiv.org/abs/1204.1367).
- Gowers, Green, Manners, and Tao, [On a conjecture of Marton](https://annals.math.princeton.edu/2025/201-2/p05).
