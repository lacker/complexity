# Offbeat attacks I: parameter alchemy, connectivity, and passive memory

Date: 2026-08-12

This note deliberately attacks Tree Evaluation from outside the usual
interpolation/pebbling picture.  It tries to turn the problem into an already
logspace-solvable problem, or to move the parameters into a known easy regime.
No full algorithm results.  The useful output is three small no-go lemmas and
one more permissive algebraic target.

Throughout, \(k=2^\ell\), the tree has height \(h\), and its standard explicit
length is

\[
  N=\Theta(2^{h+2\ell}\ell),\qquad \log N=\Theta(h+\ell).
\]

## 1. Can padding or alphabet amplification bootstrap a known L regime?

The idea is to transform a balanced instance, \(h=\Theta(\ell)\), into a
short-tree instance by enlarging the alphabet, or into a tall-tree instance by
padding the height.  Both transformations work formally.  The required
amount does not preserve polynomial input size.

### 1.1 Direct-product alphabet padding

Replace the alphabet by \(K' = K^r\), so that

\[
  \ell'=r\ell,\qquad h'=h.
\]

The old computation can be embedded in one coordinate and the other
coordinates ignored.  But an explicitly tabulated transformed node has
\((K')^2\) entries, and hence

\[
  \log N'=\Theta(h+2r\ell+\log(r\ell)).
\]

**Derived lemma (polynomial-blowup barrier).**  If \(N'\le N^{O(1)}\), then

\[
  r\ell=O(h+\ell).
\]

In the balanced case this forces \(r=O(1)\).  On the other hand, to enter the
Cook--Mertz short-tree regime

\[
  h=O(\ell'/\log\ell')
\]

from \(h=\Theta(\ell)\), one needs \(r=\Omega(\log\ell)\), up to lower-order
logs.  Thus the obvious alphabet tensor power needs quasipolynomial, not
polynomial, blowup.

This also disposes of the artificial trick "pad the input until the known
\(O(\log N\log\log N)\) algorithm counts as logarithmic."  Polynomial padding
changes \(\log N\) by only a constant factor.  Absorbing a \(\log\log N\) factor
requires superpolynomial padding, and polynomial time in the padded length is
then not polynomial time in the original length.

### 1.2 Complete-tree height padding

Any complete binary TreeEval instance of height \(h'\) has at least \(2^{h'}\)
explicit leaves.  Therefore a polynomial-size transformation necessarily has

\[
  h'=O(\log N)=O(h+\ell).
\]

Starting at \(h=\Theta(\ell)\), complete-tree padding can change height by
only a constant factor.  It cannot reach Goldreich's easy tall regime
\(h'\ge(\ell')^{1+\delta}\) for a fixed \(\delta>0\).

Subdividing every edge by a long chain looks like a loophole because an
*unbalanced* explicit tree grows only linearly with the subdivision length.
It is not.  The tall-tree bound contains an \(O(h')\) control term; for the
subdivided tree, \(h'\) is no longer \(O(\log N')\).  Completeness of the tree
is exactly what made height a logarithmic resource.

### 1.3 Bit-splitting goes in the other bad direction

One can implement an arbitrary table lookup on \(2\ell\) address bits by a
Boolean selector formula of size \(2^{O(\ell)}\) and depth \(O(\ell)\).  If
that formula is substituted at every level, child computations are duplicated
and the size becomes \(2^{\Theta(h\ell)}\) in the worst case.  A circuit can
share the child bits, but then the computation graph is a DAG rather than a
TreeEval formula; the Boolean DAG version already contains Circuit Value.

This is not a lower bound on every conceivable recoding.  It identifies an
invariant of the three obvious recodings: moving \(h/\ell\) far enough to use
a known theorem spends the missing factor either in explicit instance size,
formula duplication, or DAG sharing.

## 2. Unique CSP to undirected connectivity

Introduce a variable \(x_u\in[k]\) for every tree node and constraints

\[
  x_u=f_u(x_{u0},x_{u1})
\]

together with the leaf labels.  This CSP has exactly one global assignment.
It is tempting to compile the statement \(x_{\rm root}=c\) to connectivity in
a polynomial-size undirected graph and invoke Reingold's theorem.

At a single gate the Boolean recurrence is

\[
  P_{u,c}=\bigvee_{f_u(a,b)=c}
       (P_{u0,a}\wedge P_{u1,b}).                 \tag{1}
\]

An OR is parallel composition of paths and an AND is series composition, so
expanding (1) really does give a switching graph.  The expansion is
\(k^{\Theta(h)}\), however.  Sharing the child modules introduces a precise
failure: **correlation is lost at a shared port.**

For example, let \(k=2\), let the true child values be \(a=b=0\), and take
\(f(a,b)=a\oplus b\).  A graph arm for output 1 may enter the shared true
left module through the nominal pair \((0,1)\), leave it through the wiring
for \((0,0)\), traverse the shared true right module, and leave that module
through wiring for \((1,0)\).  It has assembled two individually true tests
into the false correlated claim \(a\oplus b=1\).  Directed edges can prevent
some backwards leakage, but not the loss of the first tag while the second
shared module is traversed.

The standard repair is a graph covering: give each caller \((a,b,c)\) its own
sheet through the child module.  This preserves the return address, but a
literal lift multiplies the child state space by \(k\) (or \(k^2\)) per level,
giving \(k^{\Theta(h)}\) states again.

This yields a concrete indirect target.

> **Bounded-sheet call/return target.**  Construct a logspace-uniform
> \(k^{O(1)}\)-state switching module whose walk can enter a recursively shared
> child with one of \(k^{O(1)}\) caller tags, test the child's one-hot value,
> and return with the same tag, while the same fixed sheet set can be reused at
> every depth.

If the graph is undirected and root truth is connectivity of two designated
vertices, Reingold gives the desired \(O(h+\ell)\)-space algorithm.  If every
vertex has one successor and predecessor, ordinary orbit traversal suffices.
Permutation actions are exactly one way to build such a fixed covering.  In
this sense the connectivity route independently rediscovers the fixed-width
closure problem in `permutation-program-route.md`, but with a useful semantic
interpretation: the group action is a compressed return-address stack.

Uniqueness of the CSP is not enough by itself.  It guarantees that only one
port is semantically live in each module; it does not prevent a path from
splicing pieces carrying incompatible caller tags.

## 3. Holographic basis changes and determinant gadgets

Write a gate as the tensor

\[
  T_f(c,a,b)=[c=f(a,b)].
\]

This makes TreeEval a contraction of a tree tensor network.  A holographic
basis change is attractive because determinant and perfect-matching gadgets
sometimes turn a large constraint sum into one algebraic invariant.  There is
a small, exact limitation on what a *local invertible basis change* can do.

Flatten \(T_f\) between its output index and its two input indices.  The
result is a \(k\times k^2\) matrix whose \((a,b)\)-column is the unit vector
\(e_{f(a,b)}\).  Consequently

\[
  \operatorname{rank} T_f^{\,c\mid ab}=|\operatorname{im} f|.
\]

For a surjective table this rank is \(k\).  Invertible changes of basis on the
three legs multiply the flattening on the left and right by invertible
matrices (the input-side matrix is a Kronecker product), so the rank remains
\(k\).

**Derived lemma (local holographic-rank barrier).**  Over any field, a
surjective arbitrary gate cannot, after invertible local basis changes, factor
through an output bond of dimension \(r<k\).

Thus a basis change alone cannot reduce an exact \(k\)-symbol wire to
sub-\(k\) bond dimension.  This is only a local obstruction: it does not rule
out matchgate cancellation across many gates, noninvertible encodings,
composite-ring phenomena, or the Cook--Mertz overlay.

There is still a crisp determinant target worth testing.  Determinants of
matrices whose support graph has fixed treewidth are computable in L.  Hence a
logspace-uniform, polynomial-size reduction from (1) to a weighted determinant
whose support has **constant** treewidth would solve TreeEval.  The rank lemma
explains why the most literal gadget, with one boundary state per alphabet
symbol, has a \(k\)-sized interface rather than constant width.  A successful
gadget would have to hide symbols in weights and use cancellations, not just
wire them through boundary terminals.

## 4. Read-only input as a passive catalyst

The input contains enormous truth tables, almost all of whose entries are not
queried on the actual evaluation path.  Could they serve as virtual writable
memory if the algorithm stores only a short description of how that memory
*would* have been modified?

The simplest version reduces to an exact dynamic dictionary.  Start with a
virtual zero vector \(z\in\mathbb F^k\), perform updates

\[
  z\leftarrow z+e_a,

\]

and later ask exact coordinate queries \(z_b\).  Restricting to \(h\) distinct
updates already gives the following counting bound.

**Derived lemma (update-log barrier).**  Any deterministic exact
representation supporting all such point queries after an arbitrary
\(h\)-element update set needs at least

\[
  \log {k\choose h}=\Omega(h\log(k/h))

\]

bits: two distinct update sets differ on some coordinate query.  For
\(h=\Theta(\ell)\) and \(k=2^\ell\), this is
\(\Theta(\ell^2)\) bits.

This does not lower-bound the Henzinger--Pyne--Ragavan registers: their update
histories and queried inner products are more structured than arbitrary point
updates.  It does rule out the generic slogan "store the catalyst implicitly
as the original read-only string plus its update log."  The log must admit a
special algebraic aggregation; exact generic membership cannot be compressed
to \(O(h+\ell)\) bits.

## 5. Let irreversibility do the erasing?

Permutation closure may be stronger than necessary because deterministic
branching programs can use arbitrary transformations, not only bijections.
This suggests replacing UAF by a transformation-monoid condition, and even
requiring equality only on the states reachable from one reset state.

At one gate, irreversibility looks remarkably good.  If the desired output is
just the constant state \(f(a,b)\), first reset the state to \(b\), then apply
the row transformation \(x\mapsto f(a,x)\).  The trouble moves to recursion:
the left subtree is now asked to produce an arbitrary table-row
transformation, not a constant output.  Applying an arbitrary requested
transformation \(T_{f(a,b)}\) while retaining its input state needs a paired
state \((z,b)\), multiplying the universe by \(k\).  Repeating literally again
gives \(k^h\).

A tiny exhaustive check suggested a small all-length obstruction.  Take the
full transformation monoid on two points and the target maps

\[
  T_0(x)=0,\qquad T_1(x)=x,

\]

with \(f(a,b)=a\oplus b\).  The two nonconstant transformations on two points
are permutations; the other two transformations are constants.  A composition
is nonconstant only if every factor in it is nonconstant.  The off-diagonal
targets are \(T_1\), so every row factor and every column factor occurs in at
least one off-diagonal word and must be nonconstant.  The diagonal words
therefore also contain only nonconstant factors and cannot equal \(T_0\).

**Derived lemma (two-state monoid obstruction).**  No number of alternating
row/column factor pairs over the full two-state transformation monoid realizes
this target matrix.  Thus even irreversible closure needs a larger state
universe or a more restricted target invariant.  This lemma is deliberately
small; it says nothing against \(k^{O(1)}\)-state monoids.

The genuinely weaker target is therefore:

> Find a \(k^{O(1)}\)-state transformation monoid, a designated reachable
> subset, and a closed class of \(k\)-tuples of partial transformations such
> that every arbitrary table admits a constant-length alternating
> factorization **on that reachable subset**.

Allowing partial correctness, resets, and noninvertibility may evade the
full-permutation UAF barrier.  It still has the two essential quantitative
features: constant recursive branching (polynomial time) and a fixed
\(k^{O(1)}\) universe (only \(O(\ell)\) state bits).

## 6. Triage

The offbeat ideas rank as follows.

1. **Most concrete:** bounded-sheet call/return, equivalently a partial
   transformation or switching-network closure theorem.  It explains exactly
   what connectivity, uniqueness, and permutation programs are all trying to
   compress.
2. **Worth a targeted search:** constant-treewidth determinant gadgets with
   symbols hidden in weights.  Ordinary boundary-state gadgets are blocked by
   flattening rank, so a candidate must exhibit genuine signed cancellation.
3. **Useful negative information:** parameter padding and generic passive
   update logs cannot remove the gap without paying it elsewhere.

## Primary sources used for these lenses

- Omer Reingold, [*Undirected Connectivity in
  Log-Space*](https://doi.org/10.1145/1391289.1391291), JACM 55(4), 2008.
- Michael Elberfeld, Andreas Jakoby, and Till Tantau,
  [*Logspace Versions of the Theorems of Bodlaender and
  Courcelle*](https://eccc.weizmann.ac.il/report/2010/062/), FOCS 2010.
- Nikhil Balaji and Samir Datta, [*Tree-width and Logspace: Determinants and
  Counting Euler Tours*](https://arxiv.org/abs/1312.7468), 2013.
- Leslie Valiant, [*Holographic
  Algorithms*](https://epubs.siam.org/doi/10.1137/070682575), SIAM Journal on
  Computing 37(5), 2008.
- Igor Markov and Yaoyun Shi, [*Simulating Quantum Computation by Contracting
  Tensor Networks*](https://doi.org/10.1137/050644756), SIAM Journal on
  Computing 38(3), 2008.
