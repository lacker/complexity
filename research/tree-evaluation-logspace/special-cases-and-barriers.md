# Tree Evaluation: special cases, formula connections, and pebbling barriers

Research note, 2026-08-12.  This note uses the following epistemic labels.

- **Theorem** means that the claim is in the cited primary source.
- **Derived corollary** means a direct parameter substitution or a complete
  proof given below.
- **Caution** marks a distinction that is easy to lose when formulating a
  restricted problem.

All logarithms are base two.  Let

\[
  \ell=\lceil\log k\rceil
\]

be the number of bits in a node value, and let \(N\) be the bit length of the
explicit input.  Logarithms of very small quantities, such as \(\log\ell\),
are implicitly truncated below by 1.

## 1. Executive conclusions

1. **Constant-alphabet TreeEval is already in L.**  In fact, for every fixed
   \(k\), it is in uniform \(\mathsf{NC}^1\).  The ordinary depth-first
   evaluator uses \(O(h\log k+\log N)=O(\log N)\) bits.  Thus constant \(k\)
   is not an open warm-up.

2. **Constant-height TreeEval is already in L** (and, under the standard
   encoding, in uniform constant-depth polynomial-size circuits).  The same
   depth-first evaluator uses \(O(h\ell+\log N)=O(\log N)\) bits.

3. **The whole regime \(h=O(\log N/\log\log N)\) is already in L.**  This is
   an immediate consequence of Cook--Mertz's sharper parameterized bound

   \[
      O(\ell+h\log\ell).
   \]

   Their stated Theorem 16 gives the closely related condition
   \(h\le \ell/\log\ell\).

4. **A larger-alphabet easy regime was already implicit in Cook--Mertz
   2021:** if \(k\le h^{O(1)}\), then TreeEval is in L.  Their uniform
   branching program has logarithmic size

   \[
      O\!\left(h+\frac{h\ell}{\log h}\right),
   \]

   which is \(O(h)=O(\log N)\) when \(\ell=O(\log h)\).

5. If every node is unary (depends on at most one child), TreeEval is in L.
   If every node uses **one common associative operation**, TreeEval is in L
   by streaming the leaves.  But requiring each node's *own* operation to be
   associative does not make the problem easier: full TreeEval reduces in
   logspace, with polynomial blowup, to the promise that every node operation
   is associative and commutative.

6. Pebbling lower bounds prove an \(\Omega(h\ell)\) bound only after imposing
   an atomic-value/locality restriction (thrifty, read-once, bitwise
   independent, and related models).  Cook--Mertz's clean algebraic
   computation violates exactly that premise.  A generic ``oblivious access''
   restriction is not automatically safe either: the Cook--Mertz computation
   is organized as a straight-line register program with fixed interpolation
   loops.

The most representative unresolved regime is the balanced one
\(h=\Theta(\ell)=\Theta(\log N)\), not either constant-parameter edge.

## 2. Encoding and the baseline evaluator

For a full binary tree with leaves at depth \(h\), there are \(2^h\) leaves
and \(2^h-1\) internal nodes.  Each internal table has \(k^2\) entries of
\(\ell\) bits.  Hence the standard explicit encoding has

\[
  N=\Theta(2^h k^2\ell),
  \qquad
  \log N=\Theta(h+\ell).
  \tag{1}
\]

Cook et al. use height to mean the number of levels rather than the
root-to-leaf distance, changing \(h\) by one.  The standard tree factor is
\(2^h\), not \(4^h\); using \(4^h\) in an informal estimate does not change
the relation \(\log N=\Theta(h+\ell)\), but it is not the usual explicit
input count.

The recursive evaluator is

\[
\begin{aligned}
  x&\leftarrow \operatorname{Eval}(2v),\\
  y&\leftarrow \operatorname{Eval}(2v+1),\\
  \operatorname{Eval}(v)&\leftarrow f_v(x,y).
\end{aligned}
\]

At the worst point it retains one already-computed left-child value for each
active ancestor.  A frame therefore needs \(\ell\) value bits and \(O(1)\)
control bits.  Node addresses do **not** require an additional \(h\log N\)
bits: number nodes in heap order, keep a root-to-current-node path/phase word
of \(O(h)\) bits, and derive the current index from that word.  A table lookup
uses one \(O(\log N)\)-bit offset counter.  Thus the honest bit-space bound is

\[
  S_{\rm DFS}=O(h\ell+h+\log N)=O(h\ell+\log N).
  \tag{2}
\]

This accounting already includes ordinary read-only-input indexing; Section
7 gives the details.

## 3. Parameter regimes already in L

### 3.1 Constant \(k\): yes, rigorously and for two independent reasons

**Derived corollary from (1)--(2).**  Fix \(k=k_0\ge2\).  Then
\(\ell=O(1)\), \(h=O(\log N)\), and

\[
  S_{\rm DFS}=O(h+\log N)=O(\log N).
\]

The output is only \(O(1)\) bits.  The algorithm may take polynomial time:
the tree itself has \(2^h=\operatorname{poly}(N)\) explicitly represented
nodes, and input-head repositioning by scans remains polynomial.

There is also a circuit proof.  For fixed \(k\), a node lookup is a
constant-input, constant-output Boolean gate whose truth table occurs in a
constant number of input bits.  Replacing each tree node by a constant-size
Boolean circuit gives depth \(O(h)=O(\log N)\) and polynomial size.  The
construction is uniform, so fixed-\(k\) TreeEval is in uniform
\(\mathsf{NC}^1\subseteq\mathsf L\).

For \(k=2\), this is essentially balanced Boolean Formula Value: the sixteen
binary Boolean functions are allowed as node labels.  The usual balanced
formula-value problem embeds by using the appropriate four-bit tables, so
this fixed-alphabet case is the familiar \(\mathsf{NC}^1\)-complete
territory, not a candidate for escaping L.

**Why the old lower bounds do not contradict this.**  A thrifty branching
program lower bound of \(k^{\Omega(h)}\) becomes
\(2^{\Theta(h)}=N^{\Theta(1)}\) when \(k\) is fixed.  It is only a polynomial
state lower bound, corresponding to \(\Theta(\log N)\) bits, exactly
consistent with L.

### 3.2 Constant \(h\)

If \(h=O(1)\), (2) gives

\[
  S_{\rm DFS}=O(\ell+\log N)=O(\log N).
\]

One can say slightly more.  For an output bit \(j\), a table lookup can be
written as

\[
 \bigvee_{a,b\in[k]}
   \left([x=a]\wedge[y=b]\wedge f_v(a,b)_j\right).
\]

Equality to a fixed \(\ell\)-bit string is one unbounded-fan-in conjunction.
Thus a lookup has constant Boolean depth and polynomial size in the explicit
table length.  Composing a constant number of tree levels keeps constant
depth.  This circuit observation is not needed for the logspace result, but
it locates the case well below the frontier.

### 3.3 Polynomial-in-height alphabets

**Theorem (Cook--Mertz 2021, Theorem 1).**  There is a *uniform* deterministic
branching-program family for \(\operatorname{TreeEval}_{k,h}\) of size

\[
  \begin{cases}
    k^{O(h/\log h)},& k\ge h,\\
    2^{O(h)},& k\le h.
  \end{cases}
\]

The paper explicitly identifies uniform branching-program size \(2^s\) with
ordinary deterministic space \(O(s)\).  Combining the two cases gives the
space summary

\[
  O\!\left(h+\frac{h\ell}{\log h}\right).
  \tag{3}
\]

Therefore \(\ell=O(\log h)\), equivalently \(k\le h^{O(1)}\), puts the
problem in \(O(h)=O(\log N)\) space.  Constant \(k\) is only the smallest
part of this already-solved regime.

### 3.4 Height \(O(\log N/\log\log N)\)

**Theorem (Cook--Mertz 2024, Theorem 15).**  Binary TreeEval is computable in

\[
  S_{CM}=O(h\log\log k+\log k)
        =O(h\log\ell+\ell)
  \tag{4}
\]

ordinary deterministic space.  Their Theorem 16 explicitly records L when
\(h\le\ell/\log\ell\).

**Derived corollary.**  Suppose

\[
   h=O\!\left(\frac{\log N}{\log\log N}\right).
\]

Since \(\ell=O(\log N)\), we have \(\log\ell=O(\log\log N)\).  Substitution
in (4) gives

\[
  S_{CM}
  =O\!\left(
       \frac{\log N}{\log\log N}\log\log N+\log N
     \right)
  =O(\log N).
\]

So this proposed warm-up is fully covered by the published algorithm.

### 3.5 The complementary very-tall regime

Goldreich's height-compressed procedure gives, for any integer
\(1\le t\le h\),

\[
  O\!\left(h+2^t\ell+\frac ht\log\ell\right)
  \tag{5}
\]

space.  A direct substitution shows that for every fixed \(\delta>0\), the
regime \(h\ge\ell^{1+\delta}\) is also in L: take
\(t=\lfloor\delta\log\ell\rfloor\).  Then \(2^t\ell\le h\), and
\((h/t)\log\ell=O_\delta(h)\).

Combining the short-tree and tall-tree results isolates, approximately, the
window

\[
   \omega(\ell/\log\ell)
   \ \le h\le\
   \ell^{1+o(1)},
\]

with \(h=\Theta(\ell)\) the canonical balanced case.  This is where special
case work should concentrate.

## 4. Unary and one-child-dependent functions

There are two natural meanings of ``unary TreeEval,'' and both are in L.

### 4.1 A unary chain

If the tree has arity one, the input is a sequence of maps
\(g_i:[k]\to[k]\) and a starting value.  Maintain the current \(\ell\)-bit
value and a \(\log h\)-bit map counter, applying the maps in bottom-up order.
This uses \(O(\ell+\log h)=O(\log N)\) bits.

### 4.2 A binary tree whose gates depend on at most one child

Assume the promise that for every internal node \(v\), either
\(f_v(x,y)=g_v(x)\) or \(f_v(x,y)=g_v(y)\), with constants allowed.  The
relevant child need not be supplied separately.

At node \(v\), test whether the right coordinate is ignored by scanning the
explicit table and checking

\[
   f_v(a,b)=f_v(a,1)\quad\text{for all }a,b\in[k].
\]

If so, choose the left child.  Otherwise the promise says that the left
coordinate is ignored, so choose the right child.  Following these choices
from the root identifies one leaf.  Store the \(h\)-bit choice path, read that
leaf value, and walk the path backwards.  At an ancestor that chose left,
replace \(x\) by \(f_v(x,1)\); at one that chose right, replace it by
\(f_v(1,x)\).

The path costs \(h\) bits, the current value costs \(\ell\), and all scans and
table offsets use \(O(\log N)\) scratch.  By (1), the total is
\(O(h+\ell+\log N)=O(\log N)\).  Repeated scans affect time, not space, and
remain polynomial in the explicit input.

## 5. Associativity: one easy promise and one deceptive promise

### 5.1 One common associative operation

Suppose every internal node uses the same operation
\(\star:[k]^2\to[k]\), and \(\star\) is associative.  The operation need not
be commutative and need not have an identity.  Enumerate leaves from left to
right and keep one accumulator:

\[
  z\leftarrow x_1,\qquad z\leftarrow z\star x_i
  \quad (i=2,\ldots,2^h).
\]

Associativity says that this left fold equals the parenthesization given by
the tree.  The algorithm uses \(\ell\) accumulator bits and \(O(\log N)\)
address/counter bits, hence lies in L.  It may use the first copy of the table
if identical tables are redundantly present at all nodes.

This includes one common semigroup or group operation.  It does **not**
extend to different associative operations at different nodes: there is then
no legal reassociation across a boundary between operations.

### 5.2 Node-by-node associativity is complete for the original problem

**Derived lemma (elementary reduction).**  General TreeEval logspace-reduces,
with polynomial input blowup and unchanged height, to TreeEval instances in
which every node's operation is both associative and commutative.  The
operations are allowed to differ between nodes.

**Construction.**  Let \(V\) be the nodes of the original tree.  Use the new
alphabet

\[
  A=\{0\}\cup\{[v,a]:v\in V,\ a\in[k]\},
\]

so \(|A|=1+|V|k\).  If internal node \(v\) has children \(l,r\) and original
table \(f_v\), define a new operation \(\star_v:A^2\to A\) by

\[
  [l,a]\star_v[r,b]
  =[r,b]\star_v[l,a]
  =[v,f_v(a,b)].
  \tag{6}
\]

Every other product is \(0\), including every product involving \(0\).
Label an original leaf \(u\) of value \(a\) by \([u,a]\).

The operation is commutative by definition.  It is associative because any
nonzero product in (6) is tagged by \(v\), whereas a nonzero input product for
\(\star_v\) requires one tag \(l\) and one tag \(r\).  Consequently every
product of three elements is zero under either parenthesization:

\[
   (x\star_v y)\star_v z=0
   =x\star_v(y\star_v z).
\]

Induction up the evaluation tree shows that node \(v\) evaluates to
\([v,\operatorname{val}(v)]\).  The root tag can therefore be decoded to the
original answer.

There are \(O(|V|k)\) new alphabet elements.  Explicitly writing every new
table costs

\[
  O\bigl(|V|\,(|V|k)^2\log(|V|k)\bigr),
\]

which is polynomial in the original explicit length
\(\Theta(|V|k^2\log k)\).  A logspace transducer emits these tables using
nested \(O(\log N)\)-bit counters and consults \(f_v(a,b)\) only in the two
special cases in (6).

Thus ``each local table is associative'' is not a simplifying direction.
The useful promise is **one shared** associative law.  Stronger local
promises such as ``each table is a group operation'' are not covered by this
reduction and would need separate analysis.

## 6. Relation to formula and circuit evaluation

TreeEval is a formula structurally: every node output is consumed once, by
its parent.  But three distinctions matter.

1. **Fixed-width formula evaluation.**  For fixed \(k\), each wire carries
   \(O(1)\) bits and each gate is constant size.  This is balanced finite-gate
   formula evaluation, hence uniform \(\mathsf{NC}^1\) and L.  The \(k=2\)
   case contains the usual balanced Boolean Formula Value problem.

2. **Wide-wire, data-supplied gates.**  In general TreeEval a wire carries
   \(\ell\) bits, and an arbitrary gate is supplied by its full
   \(k^2\)-entry table as part of the input.  A lookup is easy in isolation,
   but retaining one \(\ell\)-bit sibling at each of \(h\) levels gives the
   direct-product-looking \(h\ell\) space cost.  This wide-wire composition,
   not formula evaluation by itself, is the issue.

3. **Formula versus DAG.**  If node outputs may feed several parents, the
   \(k=2\) case contains ordinary Boolean Circuit Value, which is P-complete.
   Putting that DAG version in L would imply \(\mathsf L=\mathsf P\).
   TreeEval deliberately removes sharing, which is why an L upper bound is
   plausible without already resolving L versus P.

**Caution about ``read once.''**  A TreeEval instance is a read-once *gate
graph* (a tree), but a read-once branching program is a restriction on how an
algorithm queries *input variables*.  These are not the same statement.
Cook--Mertz recursively rereads table entries and subtree data.  Therefore
read-once branching-program lower bounds do not apply merely because the
input computation graph is a formula.

## 7. Input indexing really costs only \(O(\log N)\)

Under heap ordering, internal node \(v\)'s entry at arguments \(a,b\) starts,
up to a fixed header, at an offset of the form

\[
  \left((v-1)k^2+(a-1)k+(b-1)\right)\ell.
  \tag{7}
\]

All terms in (7) are at most \(N\), so their binary representations use
\(O(\log N)\) bits.  Grade-school multiplication, repeated addition, or
bit-by-bit offset generation works in logarithmic space.  On a sequential
read-only input tape, move to that offset by a scan with an
\(O(\log N)\)-bit counter.  This can add an \(O(N)\) factor per access but
does not add space, and the direct special-case algorithms make only
polynomially many accesses.

A root-to-node path needs \(h\le O(\log N)\) bits.  Storing an entire
\(\log N\)-bit pointer in every recursive frame would artificially produce
an \(h\log N\) term; canonical numbering eliminates it.  More generally,
any logspace-decodable permutation of the explicit tables is harmless.

If the input instead gives a succinct tree or succinct function circuits,
then (1) and (7) cease to hold and the complexity problem changes.  Likewise,
an adversarial pointer encoding must be included explicitly in the model;
it is not part of standard TreeEval.  Even with explicit pointers, a
constant-alphabet evaluator can recompute a node address from the stored
\(h\)-bit path by rescanning, so the constant-\(k\) conclusion remains.

## 8. What pebbling lower bounds prove, and why they stop

### 8.1 Atomic-value pebbling

In black pebbling, computing a parent requires pebbles on both children, and
a pebble represents one completely stored node value.  A complete binary
tree of height \(h\) needs \(\Theta(h)\) pebbles even when recomputation is
free.  Charging \(\ell\) bits per pebble gives \(\Theta(h\ell)\), matching the
depth-first evaluator.

Cook et al. formalized this through **thrifty** branching programs.  A query
to table entry \(f_v(a,b)\) is thrifty when \(a,b\) are the actual values of
\(v\)'s children on the current input.  They proved the deterministic
thrifty size bound \(\Theta(k^h)\) (up to the height convention), equivalent
to \(\Theta(h\ell)\) state bits.  Related work obtained tight or near-tight
bounds for progressively different restricted models:

- Iwama--Nagao prove an \(\Omega(k^h)\)-type bound for read-once branching
  programs;
- Komarath--Sarma prove \(\tfrac12 k^{h/2}\) for bitwise-independent
  nondeterministic thrifty programs using entropy/fractional pebbling;
- Edmonds--Medabalimi--Pitassi prove roughly \(k^{\Omega(h)}\), or
  \(\Omega(h\log k)\) space, for the stronger semantic read-once
  nondeterministic model.

These are real and often optimal theorems about their models.  They are not
lower bounds for unrestricted deterministic space.

### 8.2 The exact premise Cook--Mertz breaks

Pebbling treats a saved child value as an indivisible \(\ell\)-bit object and
assumes that those bits cannot simultaneously assist in the computation of a
different subtree.  Cook--Mertz represent values by evaluations over small
fields, add a desired result on top of arbitrary pre-existing register
contents, and restore all non-output registers afterward.  Information about
many logical node values is spread across algebraic state; it need not decode
to a set of currently pebbled nodes.

This is not a small quantitative loophole.  In the balanced regime
\(h=\ell=m\), atomic black pebbling predicts \(\Theta(m^2)\) bits and a
thrifty BP of about \(2^{\Theta(m^2)}\) states.  Cook--Mertz use
\(O(m\log m)\) bits, and Goldreich improves the iterated-log factor further.
Any proof whose bottleneck assertion is ``there must be \(h\) independently
stored \(k\)-ary values now'' is therefore false for the unrestricted model.

### 8.3 Why a vague oblivious-access restriction is unsafe

It is tempting to ask for \(\Omega(h\ell)\) when the algorithm's access
pattern is independent of table contents.  But the published upper bounds
are built from ordered register programs and fixed interpolation loops.  In
Cook--Mertz 2021, a register program is literally an ordered instruction
list; in the 2024 construction, recursion and the loop over field elements
are fixed by \(h,k\), while input table entries supply coefficients.  Much of
the catalytic reuse is therefore compatible with a data-independent control
schedule.

Consequently, an ``oblivious'' lower-bound project must specify exactly which
addresses are constrained and first prove that the Cook--Mertz/Goldreich
program is outside the model.  Input-query obliviousness alone is unlikely to
recover the pebbling bound.  A restriction that forbids algebraic overlay and
requires memory to decode into whole node values does exclude the upper
bound, but it is essentially a return to the already-understood pebbling or
thrifty model.

### 8.4 The unrestricted branching-program wall

A deterministic machine using \(S(N)\) work bits has at most
\(N\,2^{O(S(N))}\) configurations and induces a branching program of that
size.  Thus an L algorithm gives polynomial-size branching programs.  A
superpolynomial lower bound for unrestricted branching programs computing
TreeEval would put this explicit P problem outside L and hence separate
\(\mathsf L\) from \(\mathsf P\).

This explains both the value and the difficulty of the lower-bound direction.
Classical unrestricted branching-program methods give only polynomial state
bounds for explicit functions; the dramatic \(k^{\Omega(h)}\) bounds for
TreeEval all rely on restrictions that let one decode a pebbling bottleneck.
Removing that semantic bridge is not a routine strengthening.

## 9. Guidance for a full logspace attack

The special-case audit rules out several initially attractive projects.

- Do not spend effort on fixed \(k\), fixed \(h\),
  \(k\le h^{O(1)}\), or \(h=O(\log N/\log\log N)\); all are already in L.
- Do not impose nodewise associativity without a shared operation; the tagged
  nilpotent-semigroup reduction above preserves full difficulty.
- Do not expect a black-pebbling invariant based on a count of simultaneously
  materialized values to survive clean computation.
- Treat ``oblivious access'' as a model-definition task, not as an automatic
  exclusion of catalytic algorithms.

The smallest honest test case is instead a balanced family such as

\[
  h=\Theta(\ell),\qquad k=2^{\Theta(h)},
\]

with unrelated arbitrary tables at different nodes.  Here \(N=2^{\Theta(h)}\),
the target is \(O(h)\) bits, Cook--Mertz costs \(O(h\log h)\), and neither
ordinary stack compression nor a shared algebraic law removes the remaining
factor.

## 10. Primary sources

- Stephen Cook, Pierre McKenzie, Dustin Wehr, Mark Braverman, and Rahul
  Santhanam, [*Pebbles and Branching Programs for Tree Evaluation*](https://doi.org/10.1145/2077336.2077337),
  ACM TOCT 3(2), 2012.  [Author PDF](https://www.cs.toronto.edu/~sacook/homepage/pebbles2.pdf).
- James Cook and Ian Mertz,
  [*Encodings and the Tree Evaluation Problem*](https://eccc.weizmann.ac.il/report/2021/054/),
  ECCC TR21-054, 2021.
- James Cook and Ian Mertz,
  [*Tree Evaluation Is in Space \(O(\log n\cdot\log\log n)\)*](https://eccc.weizmann.ac.il/report/2023/174/),
  ECCC TR23-174 / STOC 2024.
- Oded Goldreich,
  [*Solving Tree Evaluation in \(o(\log n\cdot\log\log n)\) Space*](https://eccc.weizmann.ac.il/report/2024/124/),
  ECCC TR24-124, 2024.
- Kazuo Iwama and Atsuki Nagao,
  [*Read-Once Branching Programs for Tree Evaluation Problems*](https://doi.org/10.4230/LIPIcs.STACS.2014.409),
  STACS 2014.
- Balagopal Komarath and Jayalal Sarma,
  [*Pebbling, Entropy and Branching Program Size Lower Bounds*](https://eccc.weizmann.ac.il/report/2013/006/),
  ECCC TR13-006, 2013.
- Jeff Edmonds, Venkatesh Medabalimi, and Toniann Pitassi,
  [*Hardness of Function Composition for Semantic Read Once Branching Programs*](https://doi.org/10.4230/LIPIcs.CCC.2018.15),
  CCC 2018.
- David Liu,
  [*Pebbling Arguments for Tree Evaluation*](https://arxiv.org/abs/1311.0293),
  2013.
