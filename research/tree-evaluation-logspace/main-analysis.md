# Tree Evaluation in \(O(\log N)\) space: synthesis

Date: 2026-08-12

## 0. Bottom line

I did **not** find a correct deterministic \(O(\log N)\)-space algorithm for
general Tree Evaluation. The problem remains open in the checked literature,
and none of the candidate proofs in this notebook survives both correctness
and the polynomial-time consequence of logspace.

The investigation did produce four useful conclusions.

1. The standard explicit input length is

   \[
     N=\Theta(2^h k^2\log k),\qquad
     \log N=\Theta(h+\ell),\qquad \ell=\lceil\log k\rceil.
   \]

   The \(4^h\) tree factor in the repository's informal note is not the
   standard count.

2. Constant alphabet is already in L (indeed uniform
   \(\mathsf{NC}^1\)); it is not an open warm-up. Existing algorithms also put
   all sufficiently short trees and all polynomially taller-than-balanced
   trees in L. The representative unresolved case is

   \[
      h=\Theta(\ell)=\Theta(\log k).
   \]

3. The remaining Cook--Mertz overhead is not merely a badly encoded DFS
   stack. Their sharp parameterized bound is

   \[
      O(\ell+h\log\ell),
   \]

   where the \(\ell\) bits are global algebraic data and the
   \(h\log\ell\) term tracks one of \(\operatorname{poly}(\ell)\)
   interpolation calls per recursive level. In the balanced case this same
   branching also causes superpolynomial time. A successful L algorithm must
   reduce both persistent state and recursive branching.

4. The cleanest surviving targets are:

   - a constant-server catalytic-information-retrieval (CIR) primitive with
     only \(O(\ell)\) *total* persistent state, outside the materialized
     matching-vector implementation;
   - a succinct dynamic representation of the matching-vector registers that
     supports updates and inner products, not merely coordinate generation;
   - or a fixed-width permutation factorization that gives a
     Barrington-style constant-call clean composition for arbitrary
     \(k\)-valued gates.

The third target is developed in permutation-program-route.md; it includes
an exact one-level constant-call gadget, but the straightforward recursive
closure expands the permutation universe by a factor \(k\) per level and
returns to \(h\ell\) space.

## 1. Exact target and current record

A complete binary tree has height \(h\), \(\ell\)-bit leaf values, and at
every internal node an explicit arbitrary function

\[
  f_u:\{0,1\}^{\ell}\times\{0,1\}^{\ell}\to\{0,1\}^{\ell}.
\]

The goal is ordinary deterministic \(O(h+\ell)=O(\log N)\) workspace. No
uncounted catalyst or writable input is allowed.

The best checked ordinary-space bounds are:

\[
\begin{aligned}
 S_{\mathrm{CM}}(h,\ell)
   &=O(\ell+h\log\ell),\\
 S_{\mathrm{G}}(h,\ell;t)
   &=O\!\left(h+2^t\ell+\frac{h}{t}\log\ell\right)
   \quad(1\le t\le h).
\end{aligned}
\]

The first is Cook--Mertz's sharpened parameter form, also exposed directly by
Goldreich. The second is Goldreich's grouping of \(t\) binary levels into one
\(2^t\)-ary level. Choosing
\(t=\Theta(\log\log\ell)\) yields the published worst-case record

\[
 O\!\left(
   \frac{\log N\log\log N}{\log\log\log N}
 \right).
\]

Henzinger--Pyne--Ragavan (2026) instead obtain polynomial time with
\(O(h+\ell)\) *free* bits and \(2^{O(\ell^\varepsilon)}\) catalytic bits.
That is a real new route, but it is not ordinary L.

The April 2026 Asadi--Cleve almost-logspace claim is withdrawn. The official
revision says that a subtree polynomial degree was miscalculated, so the
claimed polynomial running time does not follow.

## 2. Parameter map: where the problem is actually open

The parameter substitutions matter because they remove several misleading
special cases.

### Already in L

- **Fixed \(k\):** ordinary DFS costs \(O(h\log k)=O(h)=O(\log N)\).
  Equivalently, each lookup is a constant-size Boolean gadget and the whole
  tree is a uniform \(\mathsf{NC}^1\) formula.
- **Fixed \(h\):** DFS costs \(O(\ell)=O(\log N)\).
- **\(k\le h^{O(1)}\):** Cook--Mertz's 2021 uniform branching programs use
  \(O(h+h\ell/\log h)=O(h)\) state bits.
- **Short trees:** Cook--Mertz gives L whenever
  \(h=O(\ell/\log\ell)\).
- **Very tall trees:** for every fixed \(\delta>0\), Goldreich's bound gives
  L whenever \(h\ge\ell^{1+\delta}\), by taking
  \(t=\lfloor\delta\log\ell\rfloor\).

Thus any asymptotic family not covered by these substitutions lies roughly in

\[
  \omega(\ell/\log\ell)
  \ \le h\le\
  \ell^{1+o(1)}.
\]

The balanced family \(h=\Theta(\ell)\) is the smallest honest stress test:
the input has \(N=2^{\Theta(\ell)}\), the target is \(O(\ell)\) bits, and the
record algebraic upper bound is still
\(O(\ell\log\ell/\log\log\ell)\), rather than \(O(\ell)\).

## 3. Why the obvious algorithms fail

The detailed counterexamples are in algorithm-attempts.md. The common
failure can be stated compactly.

### Recompute, traverse stacklessly, or work bit by bit

At one arbitrary gate, choose an output bit equal to
\(\operatorname{EQ}(a,b)\). Any deterministic summary of the first child that
works for every later second child must distinguish all \(2^\ell\) values and
therefore has \(\ell\) bits. Recomputing the first child after computing the
second merely moves the preservation obligation to the other child.

This is not a general lower bound: proving that the \(\ell\)-bit obligations
direct-sum through \(h\) levels would essentially prove the desired
superlogarithmic lower bound. It is enough to falsify generic short-digest,
CRT, fingerprint, and bit-serial lookup proposals.

### Expand to a Boolean formula

The correct identity

\[
 [v_u=c]=\bigvee_{f_u(a,b)=c}
   ([v_{u0}=a]\wedge[v_{u1}=b])
\]

expands to size \(k^{\Theta(h)}=2^{\Theta(h\ell)}\). In the balanced regime
this is superpolynomial in \(N\), and generic formula evaluation returns to
\(\Theta(h\ell)\) space.

### Remove only the interpolation counters

Cycling a mask through roots of unity eliminates an explicit loop counter at
one level. Under recursion, a child starts at the parent's current phase and
must know that phase to recognize completion and restore it. Saving it costs
\(\Theta(\log\ell)\) bits per active level.

More importantly, Cook--Mertz makes
\(\operatorname{poly}(\ell)\) recursive calls per level. At
\(h=\Theta(\ell)\), the resulting
\(\operatorname{poly}(\ell)^h=2^{\Theta(\ell\log\ell)}\) time is
superpolynomial in \(N\). A halting deterministic \(O(\log N)\)-space machine
has only \(\operatorname{poly}(N)\) configurations and therefore
automatically runs in polynomial time. Counter compression alone cannot be
the missing proof.

### Share one interpolation variable or use a field tower

Composed degree can grow as \(D^h\), where \(D=\Theta(\ell)\) is the
one-level degree. Exact projection then needs an order whose description
already has \(\Theta(h\log\ell)\) bits. If projection is deferred while an
ancestor changes a mask used by a child, the child's nominal inverse leaves a
nonzero residual. Small-field CRT, nilpotent layers, and Frobenius/trace
packing move this cost but do not remove it.

## 4. The most informative 2026 route

The matching-vector/CIR construction changes the tradeoff in exactly the
right way. With a constant number of prime factors in the modulus, it makes
only a constant number of recursive calls per level and runs in polynomial
time. Its free control is \(O(h+\ell)\). The remaining object is a large
dynamic vector register.

For a materialized constant-modulus matching-vector family of size
\(2^\ell\) and dimension \(d\), counting its coordinates as ordinary
workspace requires roughly \(d=O(\ell)\) in the balanced case. But the
Bhowmick--Dvir--Lovett lower bound, combined with the now-proved polynomial
Freiman--Ruzsa theorem, gives

\[
  d=\Omega(\ell\log\ell)
\]

for that direct constant-modulus target. This does **not** rule out TreeEval
in L or even the CIR route. It rules out the simplest plan of materializing a
linear-dimensional matching-vector register.

The representation must instead exploit the restricted dynamic update
history, support exact inner products without expanding all coordinates, or
replace matching vectors with a different constant-server CIR.

## 5. A separate algebraic target: permutation programs

permutation-program-route.md formulates a sufficient fixed-width closure
property. Informally, for a permutation group on \(k^{O(1)}\) points, every
target tuple \(T_1,\ldots,T_k\) and every table \(f\) would need a
constant-length alternating row/column factorization

\[
 T_{f(a,b)}
 =A^{(1)}_aB^{(1)}_b\cdots A^{(q)}_aB^{(q)}_b.
\]

If this held uniformly for constant \(q\), recursive substitution would give
length \(O(1)^h\), width \(k^{O(1)}\), and hence
\(O(h+\log k)\) space.

There is an exact one-level gadget behind this proposal. Put table-row
permutations in disjoint blocks, use the right value to swap the selected
block with a common block, and use a commutator of two extractions so that the
inverse garbage lies on disjoint supports and disappears. It uses
\(O(k\ell)\) points (only \(O(\ell)\) point bits) and a constant number of
child actions.

The unresolved condition is closure. The child actions requested by that
gadget are row and selector permutations rather than the canonical output
signals. Copying the payload space to handle arbitrary requested
permutations multiplies the point universe by \(k\) per level:

\[
  w_h=k^{\Theta(h)},\qquad \log w_h=\Theta(h\ell).
\]

So the gadget is not a solution. It makes the missing group-theoretic lemma
precise and offers a route that simultaneously targets polynomial time and
logarithmic state.

## 6. Restricted cases and lower-bound cautions

Two special-case facts are worth preserving.

- If every node uses one common associative operation, stream the leaves with
  one \(\ell\)-bit accumulator.
- Promising only that each node's *own* table is associative and commutative
  does not help: full TreeEval reduces to this promise by tagging every
  alphabet value with its node and making all triple products zero. The
  reduction and its polynomial blowup are proved in
  special-cases-and-barriers.md.

Classical pebbling, thrifty, read-once, and bitwise-independent lower bounds
charge one atomic \(\ell\)-bit value per pebble. Cook--Mertz's algebraic
overlay violates exactly that premise. An unrestricted superpolynomial
branching-program lower bound for this explicit P problem would separate L
from P, so restricted lower bounds cannot simply be quoted as evidence that
the remaining factor is necessary.

## 7. Strongest honest conclusion

There is no proof of TreeEval in L in this notebook.

The frontier is narrower than the original note suggested:

\[
  \boxed{\text{balanced }h\asymp\ell,\quad
  \text{constant recursive branching},\quad
  O(\ell)\text{ dynamic clean state}.}
\]

Cook--Mertz/Goldreich keep the global algebraic registers to \(O(\ell)\) bits,
but retain superconstant suspended control and recursive branching.
Matching-vector CIR achieves constant branching but not \(O(\ell)\) total
ordinary state. The permutation gadget achieves both properties for one level
but not under fixed-width recursive closure. Closing any one of those explicit
gaps would be genuine progress rather than another encoding of the old DFS
stack.
