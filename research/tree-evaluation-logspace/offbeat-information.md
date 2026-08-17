# Offbeat information-theoretic attacks on logspace Tree Evaluation

Date: 2026-08-12

This note explores routes through private information retrieval, data
structures, local decoding, dynamic sketches, read-only memory, reversible
walks, and cycle finding.  It does **not** solve Tree Evaluation.  Its main
positive output is a more permissive target than a small matching-vector
family: a polynomial-state, possibly nonlinear quotient of the *reachable
trajectories* of a catalytic-information-retrieval computation.

Throughout, let

\[
  K=2^\ell,
  \qquad
  N=\Theta(2^hK^2\ell),
  \qquad
  \log N=\Theta(h+\ell).
\]

The balanced case is \(h=\Theta(\ell)\).  Labels such as **proved
(restricted)** below mean that the statement is a complete obstruction to the
specified interface, not a lower bound for arbitrary TreeEval algorithms.

## 0. Conclusions

1. **Best positive target.**  Henzinger--Pyne--Ragavan's CIR theorem implies
   that a constant-server, constant-reconstruction-state CIR whose entire
   mutable query state has \(O(\ell)\) bits would put TreeEval in
   deterministic \(O(h+\ell)\) space and polynomial time.  Their framework
   already permits an arbitrary state universe and reversible updates; it
   need not be a vector space.

2. **A potentially easier target than constructing a new CIR from scratch.**
   Start the known catalytic algorithm in a canonical zero state and quotient
   only the register states reachable along legal recursive executions.  A
   uniformly computable congruence with \(K^{O(1)}\) classes, preserving whole
   server answers, would suffice.  It may be nonlinear and need not preserve
   every coordinate or inner product separately.  This evades the *formal
   scope* of matching-vector dimension lower bounds, though no such quotient
   is known.

3. **Coding and data structures attack the wrong end of the lookup unless
   made composable.**  A truth table is already the optimal static data
   structure once its address is known.  Even for one fixed Latin-square
   table, any deterministic separate summaries of its two unknown arguments
   must each be injective and hence contain \(\ell\) bits.  An LDC protects or
   distributes an already-known address; it does not generate that address
   from two recursively computed values.

4. **Passive catalyst schemes face a dynamic-set barrier.**  If a compressed
   accumulator must support exact point queries about \(t\) arbitrary live
   labels, it needs

   \[
     \log {K\choose t}
       =\Omega\bigl(t(\ell-\log t)\bigr)
   \]

   bits.  At \(t=h=\Theta(\ell)\), this is \(\Omega(\ell^2)\).  Thus the
   desired quotient cannot behave like a Bloom filter, exact membership
   sketch, or ordinary compressed list of active updates.  It must fuse the
   database scan and reconstruction so that individual old labels never
   become queryable.

5. **Reversible walks do not by themselves remove information.**  The natural
   configuration graph with a full value stack has \(K^{\Theta(h)}\) states,
   so a vertex name and a universal traversal already cost
   \(\Theta(h\ell)\) bits.  The smaller graph on candidate states
   \((u,a)\) loses the AND condition between the two children.  Uniqueness of
   the final evaluation does not turn this AND-hypergraph into ordinary
   reachability.

The most worthwhile computational experiment is therefore not another search
for a static code.  It is finite-state minimization of small CIR executions:
enumerate reachable zero-start register states, quotient them by all legal
future continuations, and see whether the number of classes grows like
\(K^{O(1)}\) or like \(K^{\Theta(h)}\).

## 1. A quantitative filter for recursive information schemes

Consider a clean recursive template whose one-level routine

- makes \(q=q(\ell)\) calls to its two child oracles,
- leaves \(b=b(\ell)\) persistent control bits in the current frame during
  those calls, and
- uses \(A(\ell)\) bits of global accumulator state.

Its straightforward recursion has time at least of the shape \(q^h\) and
space at least of the shape \(A+hb\).  In the balanced regime,
\(N=2^{\Theta(\ell)}\) and \(h=\Theta(\ell)\).  Therefore

\[
  q^h\le N^{O(1)} \quad\Longrightarrow\quad q=O(1),
\]

and, if \(A=O(\ell)\),

\[
  A+hb=O(\ell) \quad\Longrightarrow\quad b=O(1).
\]

This is not a lower bound on nonrecursive algorithms.  It is a useful
pass/fail test for PIR, LDC, sketching, and recomputation proposals.  A
\(\operatorname{poly}(\ell)\)-query local decoder or a fresh
\(\Theta(\ell)\)-bit seed at every level cannot simply be recursively
expanded: it gives \(\operatorname{poly}(\ell)^h\) time or
\(\Theta(h\ell)\) state.  The method needs constant effective child calls and
constant per-level persistent state.

This exactly explains why constant-server CIR is relevant.  It controls both
quantities simultaneously.

## 2. A finite-state CIR target

### 2.1 Direct conditional consequence of CIR

Henzinger--Pyne--Ragavan define catalytic information retrieval (CIR).  In
their Theorem 4.5, a scheme with \(s\) servers, reconstruction state of
\(|\mathsf{st}|\) bits, and a mutable ring element gives TreeEval bounds of
the form

\[
\begin{aligned}
  S_{\rm free}
    &=O\bigl(h|\mathsf{st}|+h\log s+\ell\bigr),\\
  T
    &=O(s)^h\operatorname{poly}
       (2^\ell,\text{register size},|\mathsf{st}|).
\end{aligned}
\]

Their Remark 4.6 explicitly says that the ring can be replaced by an
arbitrary universe with reversible updates.

**Conditional lemma (finite-state CIR).**  Suppose there is a uniform CIR for
\(K\)-record labels satisfying all of the following.

1. The number of servers is a fixed constant.
2. The reconstruction state has \(O(1)\) bits.
3. A constant number of mutable query/output registers together occupy
   \(O(\ell)\) bits, have a canonical initial state, and support the required
   update, inverse-update, and server-answer operations in
   \(\operatorname{poly}(K)\) time and \(O(\ell)\) scratch space.

Then TreeEval is computable in deterministic \(O(h+\ell)\) space and
polynomial time.

**Proof.**  Run the recursive algorithm from Theorem 4.5, counting the CIR
registers as ordinary workspace and initializing them to their canonical
state.  Items 1 and 2 give \(O(h)\) recursive control and
\(2^{O(h)}\operatorname{poly}(K)\) time.  Item 3 gives \(O(\ell)\) global
state.  Since \(2^{O(h)}K^{O(1)}=N^{O(1)}\), the resulting bounds are
\(O(h+\ell)=O(\log N)\) space and polynomial time. \(\square\)

Initializing the registers matters.  A catalytic tape must be interpretable
from an adversarial initial bit string and therefore may need redundancy to
represent a valid ring element.  An ordinary simulation may allocate a valid
all-zero register directly.  Thus the right target is the number of bits in
the *logical zero-start register state*, not the robust encoding overhead for
an arbitrary catalyst.

The matching-vector instantiation has constant server count and constant
per-level state when its modulus has constantly many constant prime factors.
Its obstacle is register dimension.  For a family of size \(2^\ell\) over a
constant modulus, the Bhowmick--Dvir--Lovett bound, together with the now
proved polynomial Freiman--Ruzsa input, gives

\[
  d=\Omega(\ell\log\ell).
\]

So a materialized matching-vector register cannot have \(O(\ell)\) bits.
This lower bound does not apply to an arbitrary nonlinear reversible state
machine.

### 2.2 Quotient only the reachable trajectories

The known algorithm is required to work for every initial catalyst, but an
ordinary algorithm can start from zero.  This suggests minimizing the
zero-start transition system rather than representing its ambient vector
space.

Let \(\mathcal R_{h,\ell}\) be the set of tuples of CIR-register states
reachable from zero during legal recursive executions on height at most
\(h\).  Legal moves include every update and inverse update that the CIR
routine can request, and every table-dependent answer operation.

> **Reachable-quotient target.**  Find equivalence relations
> \(\equiv_{h,\ell}\) on \(\mathcal R_{h,\ell}\) such that:
>
> 1. there are at most \(K^C\) classes for one fixed constant \(C\),
>    independent of \(h\) in the unresolved range;
> 2. every legal update and inverse update respects the equivalence;
> 3. every legal server answer and final output depends only on the class;
> 4. class identifiers and class transitions are computable uniformly in
>    \(O(h+\ell)\) space and polynomial time, without preprocessing the
>    particular TreeEval answer; and a transition indexed by an unevaluated
>    child is implemented through the same clean recursive-oracle interface,
>    retaining only \(O(1)\) bits at that level rather than receiving the
>    child's label in the clear.

**Conditional lemma (trajectory quotient).**  The reachable-quotient target
implies deterministic \(O(h+\ell)\)-space TreeEval.

**Proof.**  Store only the \(O(\log K^C)=O(\ell)\)-bit class identifier for
the global registers and simulate every transition on classes.  Conditions 2
and 3 make this simulation behaviorally exact; condition 4 supplies
uniformity.  The remaining recursive control is \(O(h)\), and constant-server
branching gives polynomial time as above. \(\square\)

This target is meaningfully weaker than a low-dimensional linear
representation.  The relation may be nonlinear, need only cover legal
zero-start histories, and need preserve a whole fused answer computation
rather than every coordinate or inner product.  Conversely, if the quotient
is required to preserve every inner product with every matching vector, it
essentially becomes a quotient of the bilinear representation and returns to
rank/dimension barriers.  Any successful quotient must use the restricted
order in which tests occur.

There is a Myhill--Nerode interpretation: two reachable catalyst states are
equivalent if no legal future recursive continuation distinguishes them.
The hard part is to show that this semantic relation has few classes *and* to
compute its transitions without first solving the instance.

### 2.3 Why a normal dynamic sketch is too strong

Suppose a passive simulation treats the live updates as a set of labels and
supports arbitrary exact point queries against that set.

**Lemma (exact active-set state).**  Let \(t\le K/2\), and let a state
\(z(S)\) represent an arbitrary \(t\)-element subset \(S\subseteq[K]\).  If,
from \(z(S)\) and
\(i\in[K]\), a deterministic algorithm can answer whether \(i\in S\) for
every \(i\), then

\[
  |\{z(S)\}|\ge {K\choose t},
  \qquad
  |z|\ge \log {K\choose t}
       =\Omega\bigl(t\log(K/t)\bigr).
\]

**Proof.**  The vector of all point-query answers is the characteristic
vector of \(S\), so two different sets cannot share a state.  Counting states
gives the bound. \(\square\)

For \(K=2^\ell\) and \(t=h=\Theta(\ell)\), this is
\(\Omega(\ell^2)\) bits.  The same argument covers exact frequency sketches
by restricting to distinct inserted labels.  It rules out a zero-error Bloom
filter, a succinct exact dictionary, and any idealized accumulator
\(x=\sum_{a\in S}e_a\) from which all coordinates can be recovered.

This is only a barrier to a particular interface.  The CIR routine should not
need to reveal old labels or arbitrary membership bits.  Its opportunity is
to combine the table scan, the masked query, and all server answers into one
reversible operation.  In other words, the useful quotient must preserve
**aggregate answer semantics**, not a random-access view of the active
stack.

## 3. Can the read-only input be a passive catalyst?

The truth tables provide an enormous immutable string.  One can derive a
base mask \(\tau\) from that string coordinate by coordinate, so the initial
contents of a catalytic vector need not be stored.  The difficulty is the
current state

\[
  \tau+\Delta,
\]

where \(\Delta\) is the sum of nested value-dependent updates.  The input
still provides \(\tau_i\), but it does not provide \(\Delta_i\).

Three variants were checked.

### 3.1 Recompute each coordinate of every live update

Represent \(\Delta\) by its update transcript.  When a server needs one
coordinate, rescan the active recursive path and recompute every update's
contribution to that coordinate.

The transcript has a short *control* description, but each update is indexed
by a subtree value.  Recomputing a coordinate of the codeword of that value is
not automatically easier than recomputing the value itself.

**Lemma (feature universality).**  Let
\(\phi:[K]\to A\) be any nonconstant feature, such as one informative
coordinate of a codeword.  For every Boolean predicate
\(P:[K]^2\to\{0,1\}\), there is a table
\(f:[K]^2\to[K]\) such that \(\phi(f(a,b))\) determines \(P(a,b)\).

**Proof.**  Choose \(c_0,c_1\) with
\(\phi(c_0)\ne\phi(c_1)\), and set
\(f(a,b)=c_{P(a,b)}\). \(\square\)

Thus arbitrary tables can make even one informative code coordinate an
arbitrary predicate of the two full child labels.  Coordinate-on-demand
virtualization does not produce a decreasing recursive subproblem.  Scanning
\(h\) updates and recursively recomputing their labels for every server test
also recreates a nonconstant or growing branching factor per level; in the
balanced case a factor such as \(h^h\) is superpolynomial in \(N\).

### 3.2 Compress the active update list additively

Suppose the active context is summarized as

\[
  Z(a_1,\ldots,a_t)=\sum_{r=1}^t E_r(a_r)
\]

in a small group.  If later continuations can recover every saved label
\(a_r\), then the map \(Z\) must be injective and the group has at least
\(K^t\) elements.  This costs \(t\ell\) bits.  More generally, the active-set
lemma above applies whenever the interface supports arbitrary membership or
frequency queries.

This does not rule out a Cook--Mertz/CIR-style accumulator, because such an
accumulator is never required to decode the stack.  It does rule out the
common proposal "store all live labels in one exact linear sketch and query
them later."  Random fingerprints can be smaller only by permitting error;
TreeEval asks for an exact deterministic answer.

### 3.3 Fold the history through a finite monoid

The surviving passive-catalyst formulation is to view the legal update
history as a word \(W\) and seek a homomorphism

\[
  H(W_1W_2)=H(W_1)\circ H(W_2)
\]

into a state set of size \(K^{O(1)}\), where \(H(W)\) suffices to perform the
*entire next CIR answer* but not arbitrary point queries.  Insertions and
deletions must be inverse transitions so that recursive calls are clean.

This is another form of the reachable-quotient target.  It is genuinely
offbeat: the "data structure" is specialized to the protocol's legal query
language rather than to ordinary lookup.  A generic exact dictionary lower
bound does not apply unless the legal query language can separate all active
sets.

## 4. Why ordinary LDC/PIR coding does not fix the address problem

An LDC encodes a database so that a decoder, **given an index**, can recover
the indexed symbol from a few probes even if the codeword is partly
corrupted.  In TreeEval the table is uncorrupted and explicitly stored.  The
unknown index \((a,b)\) is the problem.

The following elementary lemma remains true even if the summaries and decoder
are specialized to the table.

**Lemma (exact separate-address summaries).**  Let \(K\) be a finite group
and fix the Latin-square table

\[
  D(a,b)=a+b.
\]

Suppose a deterministic decoder, knowing \(D\), always computes \(D(a,b)\)
from separate messages \(\alpha(a)\) and \(\beta(b)\).  Then both
\(\alpha\) and \(\beta\) are injective.  Each message therefore contains at
least \(\log K=\ell\) bits.

**Proof.**  If \(\alpha(a)=\alpha(a')\) for \(a\ne a'\), pair both messages
with \(\beta(0)\).  The decoder receives identical data but must output the
distinct values \(a\) and \(a'\).  The argument for \(\beta\) is symmetric.
\(\square\)

For an arbitrary database and a single combined address summary, an even
simpler adversarial argument makes the summary injective on all \(K^2\)
addresses.  Encoding the database cannot change this: two colliding addresses
can be assigned different records.

These statements are local and compatible with the target bound: two
\(\ell\)-bit messages fit in \(O(\ell)\) space at one gate.  The unsolved issue
is cleanly reusing that same state across \(h\) nested gates.  Proving that
the local bounds direct-sum for arbitrary machines would be a major lower
bound, so this note does not claim it.

### 4.1 Enumerating decoder randomness

A randomized local decoder can sometimes be made deterministic on an
uncorrupted codeword by enumerating all seeds and taking a majority.  In a
recursive evaluator this is not free.  If there are
\(\operatorname{poly}(\ell)\) effective probes or seeds at each level, naive
expansion takes \(\operatorname{poly}(\ell)^h\) time, which is
superpolynomial in balanced instances.  If a seed of \(\Theta(\ell)\) bits is
retained at every active level, space returns to \(\Theta(h\ell)\).

Thus the relevant coding object is not merely a constant-query LDC.  It needs
a constant-phase, clean, recursively composable decoder—precisely the extra
structure captured by CIR.

### 4.2 Conditional disclosure and distributed point functions

Conditional disclosure of secrets (CDS) is conceptually close to a parent
gate: messages depend separately on \(a\) and \(b\), and reconstruction
reveals something conditioned on a predicate of \((a,b)\).  Distributed
point functions similarly split an address selector among servers.

The useful hypothetical object here would be a **reversible batch CDS**:

- it handles a multi-valued arbitrary table \(f:[K]^2\to[K]\) in a constant
  number of message phases;
- child-dependent messages are produced by reversible updates rather than
  materialized strings;
- reconstruction performs
  \(z\mapsto z\oplus\operatorname{Enc}(f(a,b))\);
- all message state is uncomputed; and
- total mutable state is \(O(\ell)\) bits with \(O(1)\) bits retained per
  recursive level.

Such an object would imply L by Section 1.  Existing CDS/PIR communication
bounds do not automatically supply it: a short transcript may still be too
long to materialize, may require many child calls to generate coordinate by
coordinate, and need not support inverse updates or recursive closure.
Computational PIR/DPF security assumptions are also beside the point for an
unconditional exact deterministic algorithm.  HPR's CIR abstraction is the
cleanest current formalization of the missing properties.

## 5. What a data-structure or cell-probe approach would have to do

For one parent truth table, the standard input is already a direct-access
array.  Once \((a,b)\) is known, one probe conceptually returns
\(f(a,b)\).  Faster table lookup, preprocessing, perfect hashing, and cell
sampling therefore do not address the bottleneck.  The memory cost is in
*generating and preserving the query address* while its two halves are
computed recursively.

Preprocessing a single table cannot generally shrink both halves: the
Latin-square lemma applies even to table-specialized messages.  Preprocessing
the whole TreeEval instance into a table of every subtree value certainly
works and uses only polynomial output length, but computing that index is the
original problem.  A logspace-uniform virtual preprocessing must let each
requested preprocessing bit be generated without already evaluating the
relevant subtree; otherwise it is circular.

The right data-structure target is consequently unusual:

> Given two *procedures* that can cleanly add encodings of \(a\) and \(b\) to
> a shared state, compile the explicit table \(f\) into a constant-phase
> reversible transducer that changes the state by an encoding of \(f(a,b)\),
> while restoring every temporary component.

This is a query compiler, not a conventional static data structure.  It is
equivalent in spirit to finite-state CIR or to a reversible/CDS composition
law.  Cell-probe upper bounds that assume the query address is already in
memory, and lower bounds that count only probes after preprocessing, measure
the wrong resource for this target.

## 6. Parking information in input-head positions or in the clock

A read-only input head can be useful storage: parking it at the table entry
\((u,a,b)\) implicitly remembers a node path and two labels using one
\(O(\log N)\)-bit position.  This neatly stores one frame.  It does not pack
an arbitrary value stack.

With a fixed number of input heads and a polynomially bounded clock, there are
only

\[
  N^{O(1)}=2^{O(h+\ell)}
\]

possible passive address/phase states.  An explicit stack of \(h\) arbitrary
labels has

\[
  K^h=2^{h\ell}
\]

possibilities.  In the balanced regime, polynomially many read-only positions
cannot name all such stacks.  Polynomially padding the input only changes the
constant in \(O(\log N)\); appending a cell for every stack would require
superpolynomial length.

Likewise, encoding the stack into an elapsed-time phase requires a period of
at least \(K^h\).  In balanced instances this is superpolynomial in \(N\),
and a halting deterministic logspace machine cannot traverse that many
distinct configurations.

**Caution.**  This is not a TreeEval space lower bound.  A successful
algorithm need not represent the DFS stack at all.  The calculation only
rules out proposals whose claimed compression is literally "put the same
stack into one ROM address, one cycle phase, or a constant number of heads."
Cook--Mertz and CIR evade the premise by algebraically consuming values
without preserving a decodable stack.

One can also imagine appending all snapshots of a polynomial-time catalytic
trajectory to the read-only input.  There are only polynomially many
snapshots along one fixed run, but producing their bits requires simulating
the large-register computation.  Unless each snapshot bit has an independent
logspace generator, this preprocessing simply hides the desired computation
in the input transformation.

## 7. Reversible walks and cycle finding

Floyd-style cycle finding stores only a constant number of vertices, but it
still stores each vertex name.  Reingold's undirected-connectivity theorem
similarly uses space logarithmic in the size of the graph being traversed.

### 7.1 The large natural graph

A reversible version of depth-first evaluation can make a configuration
record the current node, traversal phase, and all already-computed sibling
labels.  There are \(K^{\Theta(h)}\) such configurations.  Therefore

\[
  \log |V|=\Theta(h\ell),
\]

and both naming a vertex and a polynomial-length universal traversal lose the
target bound.  Cycle finding saves a visited set; it does not compress the
current state.

### 7.2 The small graph loses conjunction

A more tempting graph has vertices \((u,c)\), meaning "node \(u\) has
candidate value \(c\)," and local pair vertices \((u,a,b)\) satisfying
\(f_u(a,b)=c\).  This graph has only \(O(2^hK^2)\) locally nameable states.

But correctness is the hypergraph recurrence

\[
  (u,c)\text{ is true}
  \iff
  \exists a,b:
    f_u(a,b)=c
    \qquad \mathbf{and}\qquad
    (u0,a)\text{ is true}
    \qquad \mathbf{and}\qquad
    (u1,b)\text{ is true}.
\]

An ordinary path can visit either child; it does not certify both and return
with the pair \((a,b)\) intact.  Turning the two checks into a series gadget
requires a return state remembering the chosen pair, and nesting those gadgets
reconstructs the value stack.

The evaluated labeling of the whole tree is unique because the leaves are
fixed and every gate is functional.  That does not make local decompositions
unique: a false candidate \(c\) may have many pairs \((a,b)\) with
\(f_u(a,b)=c\).  Hence unique global evaluation does not turn the AND--OR
hypergraph into undirected reachability or a one-token unique-sink walk.

The graph route would become useful if one found a polynomial-size reversible
gadget that implements this AND composition without carrying nested
candidate pairs.  Such a gadget is another presentation of constant-state
clean composition, not something supplied by cycle finding itself.

## 8. Concrete next experiments

### Experiment A: minimize zero-start CIR automata

For small \(K\), small height, and a fixed matching-vector construction:

1. enumerate all register tuples reachable from zero under legal update and
   inverse-update sequences;
2. include the table-dependent tests used by the server-answer routine;
3. apply partition refinement, identifying states with identical behavior
   under every legal continuation;
4. measure the number of classes as \(h\) grows.

Growth near \(K^{O(1)}\) would point to a real nonlinear quotient.  Growth
near \(K^{\Theta(h)}\) would identify a semantic active-stack barrier.  It is
important to minimize under the *legal protocol language*, not under all
vector additions and all inner products; the latter is likely to recover the
full matching-vector rank by construction.

### Experiment B: synthesize a tiny generalized CIR

Use SAT/SMT or exhaustive group search for \(K=2,3,4\).  The unknowns are a
polynomial-size state set, reversible label-dependent query transitions, a
constant number of server phases, and table-dependent streaming answer
transitions.  Enforce exact output addition and complete cleanup for every
small truth table.  Counterexample-guided synthesis can add tables only when
the current machine fails.

The aim is not evidence from \(K=2\), which is already easy.  The useful
output would be a stable algebraic pattern whose state exponent and number of
phases do not grow with \(K\).

### Experiment C: fuse the database scan before exposing point queries

Attempt to compute the sum of all CIR server answers directly from a succinct
update history, using cancellations across database positions, without ever
asking for \(\langle x,v_i\rangle\) separately.  The active-set lemma says
that an intermediate interface supporting arbitrary exact membership is too
powerful.  A successful computation should expose only the final aggregate
selected record.

This is analogous to replacing a data structure for every Fourier coefficient
by a circuit that computes one prescribed inverse transform value.  The
arbitrary table prevents obvious stationarity, but the constant-size residue
set in matching-vector protocols is a concrete place to search for a global
finite-difference identity.

### Experiment D: reversible batch CDS

Translate recent multi-party CDS constructions into the operational cost
model of Section 1.  Count child-oracle invocations and persistent state, not
only communication.  Look specifically for protocols whose reconstruction is
linear/additive, whose shared randomness can be replaced by an arbitrary
mask, and whose messages admit inverse updates.  Most constructions will
fail one of these tests quickly; a survivor would provide a non-matching-vector
CIR candidate.

## 9. Primary sources

- Alexandra Henzinger, Edward Pyne, and Seyoon Ragavan,
  [*Catalytic Tree Evaluation From Matching
  Vectors*](https://eccc.weizmann.ac.il/report/2026/022/), ECCC TR26-022,
  2026.  The relevant pieces are Theorem 3.1, the CIR definition in Section
  4.2, Theorem 4.5, and the arbitrary-universe observation in Remark 4.6.
- Benny Chor, Oded Goldreich, Eyal Kushilevitz, and Madhu Sudan,
  [*Private Information
  Retrieval*](https://madhu.seas.harvard.edu/papers/1995/pir-journ.pdf),
  JACM 45(6), 1998.
- Jonathan Katz and Luca Trevisan,
  [*On the Efficiency of Local Decoding Procedures for Error-Correcting
  Codes*](https://doi.org/10.1145/335305.335315), STOC 2000.
- Romain Gay, Iordanis Kerenidis, and Hoeteck Wee,
  [*Communication Complexity of Conditional Disclosure of Secrets and
  Attribute-Based Encryption*](https://eprint.iacr.org/2015/665), CRYPTO
  2015.
- Abhishek Bhowmick, Zeev Dvir, and Shachar Lovett,
  [*New Lower Bounds for Matching Vector
  Codes*](https://arxiv.org/abs/1204.1367), SICOMP 2014.
- W. T. Gowers, Ben Green, Freddie Manners, and Terence Tao,
  [*On a Conjecture of
  Marton*](https://doi.org/10.4007/annals.2025.201.2.5), Annals of
  Mathematics 201(2), 2025.
- Omer Reingold,
  [*Undirected Connectivity in
  Log-Space*](https://doi.org/10.1145/1391289.1391291), JACM 55(4), 2008.
- Charles H. Bennett,
  [*Logical Reversibility of
  Computation*](https://www.cs.princeton.edu/courses/archive/fall06/cos576/papers/bennett73.html),
  IBM Journal of Research and Development 17(6), 1973.
