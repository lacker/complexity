# Offbeat logic-side attacks on Tree Evaluation

Research note, 2026-08-12.

This note looks at Tree Evaluation through unique CSPs, Horn programs,
fixed-point logics, alternating games, tree automata, knowledge compilation,
proof certificates, and connectivity/reconfiguration.  The goal is not to
rename the usual recursion, but to find an indirect theorem which would imply
an ordinary deterministic $O(h+\ell)$-space algorithm, where

\[
  \ell=\lceil\log k\rceil,
  \qquad
  N=\Theta(2^h k^2\ell),
  \qquad
  \log N=\Theta(h+\ell).
\]

## 0. Verdict

I did **not** obtain a logspace algorithm.  The most useful outcomes are four
precise reformulations and two fairly decisive warnings.

1. Tree Evaluation is a very special definite Horn entailment problem.  Its
   rule-dependency hypergraph follows the input tree, every rule has two
   premises, and the least model contains exactly one value atom per tree
   node.  Thus every true root claim has a unique semantic proof.

2. Equivalently, it is evaluation of a complete, structured,
   deterministic-decomposable partition circuit of width $k$.  This is a
   more informative automata/knowledge-compilation normal form than merely
   saying that the computation is a tree CSP.

3. It has a logspace alternating verifier in which every true existential
   configuration has exactly one winning move.  The unresolved resource is
   conjunction: after choosing the two child values, both recursive claims
   must hold.

4. A polynomial-size, *reusable* compilation of these unique two-premise
   proofs into undirected connectivity would put Tree Evaluation in L by
   Reingold's theorem.  Naive series/parallel compilation expands to
   $k^{\Theta(h)}$, while sharing proof subgraphs admits false "hybrid"
   paths.  Avoiding that cross-talk is a concrete graph-gadget problem.

The warnings are:

- semantic unambiguity by itself is essentially no restriction.  A linear
  dual-rail transformation makes the OR gates of an arbitrary Boolean circuit
  mutually exclusive on its input; consequently, a theorem using only
  "at most one true OR child" would collapse the P-complete Circuit Value
  Problem to L;
- the bounded-treewidth appearance is misleading.  The variable/factor
  skeleton is a tree, but an extensional encoding of one arbitrary table has
  a $K_{k,k}$ incidence minor.  Fixed-formula logspace versions of
  Courcelle's theorem therefore do not apply.

The best offbeat research targets left standing are the **port-isolating
connectivity compiler** in Section 6, a **partition-sensitive limited
recursion operator** in Section 4, and a **polynomial-state two-way tree
walker** in Section 7.

## 1. Exact unique-Horn and fixed-point normal form

For every tree node $u$ and value $c\in[k]$, introduce an atom

\[
  X_{u,c}\quad\text{meaning}\quad \operatorname{val}(u)=c.
\]

For a leaf $z$ whose input label is $c_z$, add the fact $X_{z,c_z}$.
For every internal node $u$, every $a,b\in[k]$, and
$c=f_u(a,b)$, add the definite Horn rule

\[
  X_{u_L,a}\wedge X_{u_R,b}\longrightarrow X_{u,c}.
  \tag{H}
\]

There are $\Theta(2^h k^2)$ rules, so this program is polynomial in the
explicit Tree Evaluation input and is streamable from it in logspace.

### Proposition 1 (proved): the least model is one-hot

The least model of (H) contains exactly one atom $X_{u,c}$ for each node
$u$, and its $c$ is the Tree Evaluation value at $u$.

**Proof.**  Induct upward from the leaves.  The assertion holds at every
leaf because there is one fact.  If the only derived atoms for the children
of $u$ are $X_{u_L,a_*}$ and $X_{u_R,b_*}$, exactly the rule indexed by
$(a_*,b_*)$ has both premises in the least model.  It derives
$X_{u,f_u(a_*,b_*)}$; every other rule for $u$ has a missing premise.
\(\square\)

This is stronger than the generic fact that a definite Horn program has a
least model: the derived relation is functional in $u$, and every derived
atom has one semantically successful proof rule.  A table can map many pairs
to the same $c$, but only the pair of actual child values has two true
premises.

The same statement has a compact least-fixed-point formulation.  On a
relational encoding with relations `Leaf`, `Left`, `Right`, and
$T(u,a,b,c)\iff f_u(a,b)=c$, define

\[
\begin{split}
 \Phi(R;u,c) \equiv {}& \operatorname{Leaf}(u,c)\\
 &\lor\exists l,r,a,b\,[
   \operatorname{Left}(u,l)\wedge\operatorname{Right}(u,r)
   \wedge R(l,a)\wedge R(r,b)\wedge T(u,a,b,c)].
\end{split}
\tag{LFP}
\]

The least fixed point of $\Phi$ is the value relation.  It stabilizes after
$h+1$ rounds and is one-hot at every stage.

### Why this is not deterministic transitive closure

The essential syntactic feature of (LFP) is the pair

\[
  R(l,a)\wedge R(r,b).
\]

Linear Datalog/linear recursion permits at most one recursive atom in a rule
body and can be reduced to transitive closure.  Here the *result* of the fixed
point is functional, but its local predecessor search is not: deciding which
pair is the successful one already asks for both child values.  Deterministic
transitive closure requires a locally definable functional successor; it
cannot infer a successor from the promised uniqueness of the eventual fixed
point.

Thus the exact logical target is:

> Evaluate an acyclic, tree-partitioned, two-premise Horn program in which
> the least model derives exactly one member of every $k$-atom block.

A logspace theorem for this class would solve Tree Evaluation.  The
tree-partition and one-hot promises are both essential; Section 2 shows that
semantic uniqueness alone is far too weak.

## 2. Alternation and why "unique proof" alone is insufficient

### 2.1 A uniquely winning alternating verifier

For a claim $(u,c)$, consider the following alternating procedure.

1. At a leaf, accept exactly when its label is $c$.
2. At an internal node, existentially choose $a,b\in[k]$.
3. Reject this choice unless $f_u(a,b)=c$.
4. Universally choose left or right and recurse on respectively
   $(u_L,a)$ or $(u_R,b)$.

Along one computation branch it stores a node address, $(a,b,c)$, and finite
control, hence $O(h+\ell)$ bits.  It uses $O(h)$ alternations.  By induction,
a claim is true exactly when the procedure accepts it.  Moreover:

### Proposition 2 (proved): existential winning moves are unique

At every true claim $(u,c)$, exactly one existential pair $(a,b)$ makes
both universal successors accept: the actual child-value pair.  At a false
claim there is no winning pair.

This is not an ordinary UL computation.  Universal branching remains, and a
losing pair may fail on either child.  A useful name for the normal form is a
**tree-decomposable, existentially unambiguous alternating game**.

The tempting missing theorem would say that such games can be solved in L.
That statement must include the tree decomposition; unambiguity alone is
P-hard, as the next lemma shows.

### 2.2 Dual-rail warning: unique OR choices can encode every circuit

Take any acyclic Boolean circuit with a fixed input.  For every gate $g$,
construct two gates $T_g,F_g$, maintaining that exactly one is true.  For
an input, use the corresponding constants.  Use the identities

\[
\begin{array}{rclcrcl}
g=\neg x:&T_g&=F_x,&&F_g&=T_x,\\[2mm]
g=x\wedge y:&T_g&=T_x\wedge T_y,
&&F_g&=F_x\vee(T_x\wedge F_y),\\[2mm]
g=x\vee y:&T_g&=T_x\vee(F_x\wedge T_y),
&&F_g&=F_x\wedge F_y.
\end{array}
\tag{DR}
\]

Every introduced OR is deterministic: its two children cannot both be true.
For example, $F_x$ and $T_x\wedge F_y$ are mutually exclusive.  The
transformation is linear-size and logspace-uniform, and induction proves the
dual-rail invariant.

### Proposition 3 (proved): semantic unique-OR circuit value is P-hard

Evaluating circuits promised to have at most one true child at every OR gate
is P-hard under logspace reductions.

**Reason.** Apply (DR) to the P-complete Circuit Value Problem and ask for
$T_{g_{out}}$.

Consequently, none of the following is enough on its own:

- a unique accepting proof;
- at most one winning move at each existential/OR node;
- deterministic disjunctions in a proof DAG;
- a promise that all local claims have Boolean complements.

Any useful theorem has to exploit that Tree Evaluation's AND gates combine
*disjoint subtrees* and that the $k$ claims at a node form a complete
partition.

### 2.3 A unique locally checkable certificate is also generic

The full list of node values is a unique certificate of length
$\Theta(2^h\ell)$.  Given random access to that certificate, a logspace
verifier can scan all nodes and check every table constraint.

This observation gives no special leverage.  Every accepting deterministic
polynomial-time computation has a unique computation tableau, and a
logspace verifier with a two-way read-only certificate can check local
transitions of that tableau.  Thus "unique polynomial-size certificate,
locally checkable in logspace" already describes all of P in this sense.
The missing resource is not verification but *producing or locally decoding*
the certificate without being given it.

PCP or interactive-proof ideas have the same gap: they can make a supplied
proof locally testable, but the Tree Evaluation input does not contain the
proof, and computing the honest proof contains the desired root value.

## 3. Tree automata and a structured partition circuit

Tree Evaluation can be viewed as combined evaluation of a deterministic
bottom-up tree automaton whose state set is $[k]$ and whose transition table
is allowed to vary with the node and is part of the input.  Fixed-automaton
tree-language results correspond to constant $k$, which is already an easy
L regime.  Here the number of states grows and each transition is an arbitrary
explicit map $[k]^2\to[k]$.

There is a useful Boolean compilation.  Treat each leaf label as $\ell$
input bits, and let $Q_{z,c}$ test that leaf $z$ equals $c$.  Recursively
define

\[
  Q_{u,c}
   =\bigvee_{(a,b):f_u(a,b)=c}
      \left(Q_{u_L,a}\wedge Q_{u_R,b}\right).
  \tag{P}
\]

Create one AND gate for each table pair and route it to the OR gate named by
the table output.  This is polynomial-size in the explicit input.

### Proposition 4 (proved): (P) is a complete structured partition circuit

At every node $u$, the $k$ outputs $Q_{u,1},\ldots,Q_{u,k}$ partition all
assignments to the leaves below $u$: exactly one is true.  Every AND gate
combines circuits on disjoint leaf-variable sets, and the disjuncts of every
OR are mutually exclusive.  The decomposition respects the original binary
tree (a vtree in knowledge-compilation terminology).

So (P) is deterministic and decomposable in the sense of d-DNNF, but it has
additional structure that matters:

- each vtree node exposes a complete one-hot family of $k$ states;
- every pair of child states is routed by a *total function* to one parent
  state;
- all sharing stays inside this state-partition architecture.

Conversely, evaluating this exact kind of width-$k$ partition circuit is
literally Tree Evaluation.  This identifies a possible bridge to structured
knowledge compilation, but does not by itself lower the space.

### d-DNNF alone is not a space theorem

After replacing the inputs of an arbitrary Circuit Value instance by
constants, the dual-rail construction (DR) is a deterministic decomposable
NNF: all variable supports are empty, so every AND is vacuously decomposable,
and every OR is deterministic.  Hence even promised d-DNNF value evaluation,
when the circuit itself is part of the input and constants are allowed,
inherits P-hardness.  The familiar linear-time queries for compiled d-DNNFs
are time statements, not automatic logarithmic-workspace statements.

The useful object is therefore not generic d-DNNF, but the stronger
**complete vtree-partition circuit** above.

### Why reversing the bottom-up automaton does not work

Given a desired parent state $c$, a top-down machine can enumerate
$f_u^{-1}(c)$, and exactly one pair will be globally consistent.  But it
cannot choose that pair from the parent label and $c$ alone.  For example,
if $f_u$ is the constant-zero function, two inputs with child values
$(0,0)$ and $(1,1)$ have the same parent label and parent state but require
different child states.  Thus a deterministic top-down automaton with no
lookahead cannot implement the reversal, regardless of how it names $c$.

The reverse automaton is unambiguous only after inspecting both subtrees,
which returns to Proposition 2.  A two-way walker with controlled lookahead
is a more plausible target; Section 7 makes that target precise.

## 4. Limited recursion: a numerical stress test

Grohe, Grußien, Hernich, and Laubner's logic LREC has logspace data
complexity.  One motivation in their paper is the following sufficient
condition for circuit evaluation.  A circuit has the $m$-path property if,
on every directed path, the product of the indegrees of all but the first
node is at most $m$.  Circuits with a $|C|^{O(1)}$-path property can be
evaluated in logspace: the logarithms of the branching factors telescope into
$O(\log |C|)$ resource.

Apply this test to the direct claim circuit (P).  A claim gate $Q_{u,c}$ has
indegree

\[
  |f_u^{-1}(c)|,
\]

and the selected pair gate has indegree two.  Even for the simple projection
table $f(a,b)=a$, every output has $k$ preimages.  A root-to-leaf circuit
path therefore has indegree product at least

\[
  (2k)^h.
\]

Meanwhile the whole direct circuit has

\[
  |C|=\Theta(2^h k^2)
\]

gates up to lower-order equality-test circuitry.  In the balanced regime
$h=\Theta(\ell)$,

\[
  \log (2k)^h=\Theta(\ell^2),
  \qquad
  \log |C|=\Theta(\ell).
\]

Thus the direct circuit is far outside the polynomial path-product condition.
This is only a failure of that sufficient criterion, not a lower bound:
projection tables themselves are easy and their circuits can be simplified.
It nevertheless pinpoints why applying LREC mechanically does not solve the
general problem.

There is an intriguing semantic mismatch.  Although $Q_{u,c}$ has up to
$k^2$ syntactic predecessors, at most one predecessor is true.  If the LREC
resource divided by the number of *live* predecessors, its path product would
be constant per level.  But identifying the live predecessor is exactly Tree
Evaluation, and Proposition 3 shows that a generic "live indegree one"
operator would be P-hard.

### Concrete missing logic theorem

A non-circular target is a limited-recursion operator specialized to circuits
with all three properties below:

1. live indegree at most one at sum/OR gates;
2. disjoint vtree regions at product/AND gates;
3. a complete one-hot partition of each vtree region into $k$ states.

Call this hypothetical operator **partition-LREC**.  Proving that its data
complexity is in L would solve Tree Evaluation; embedding arbitrary Circuit
Value into it with polynomial width would refute the hoped-for distinction.
The first useful project is therefore not to write a new syntax, but to test
whether dual-rail Circuit Value can be forced into a complete vtree partition
of only polynomial width.  The obvious construction needs a state for the
joint values crossing a vtree cut and grows exponentially with cut width.

## 5. The bounded-treewidth trap

As a CSP, the variables are the node values and every constraint relates a
parent to its two children.  Its factor graph is a tree (and its primal graph
has constant treewidth).  This makes it tempting to invoke a logspace version
of Courcelle's theorem.

The catch is that each factor carries an arbitrary extensional relation of
size $k^2$, over an input-dependent domain of size $k$.  Courcelle-style
theorems fix the logical formula and finite relational vocabulary; they do
not treat an arbitrary $k^2$-entry transition table as one constant-size
node label.

Expanding the table destroys bounded width.  Separate the left and right
value roles into vertices $L_a,R_b$, and create an entry vertex $e_{a,b}$
adjacent to $L_a$ and $R_b$.  The resulting incidence subgraph for one
table is the one-subdivision of $K_{k,k}$.  Contracting the subdivided edges
recovers $K_{k,k}$, so its treewidth is at least $k$.  If values are shared
in one sort and table tuples are represented directly, the Gaifman graph is
at least as dense.

Encoding the raw input as a path/string keeps structural width small, but a
fixed MSO formula over a path cannot perform arbitrary binary-address table
lookup; the missing lookup power has simply moved into the formula or an
order/arithmetic relation.

Therefore the Elberfeld--Jakoby--Tantau logspace Courcelle theorem does not
apply to general Tree Evaluation.  It does explain the fixed-$k$ case: when
the state alphabet/table gadget is constant, the width blowup is constant.

## 6. Connectivity and reconfiguration: the main weird route

Undirected $s$-$t$ connectivity is in deterministic logspace.  This makes
the following indirect plan attractive:

> Compile the unique Horn proof of a root claim into a polynomial-size
> undirected graph in which two designated vertices are connected exactly
> when the claim is true.

If the graph has $2^h k^{O(1)}=\operatorname{poly}(N)$ vertices and its
adjacency predicate is computable from the Tree Evaluation input in
$O(h+\ell)$ space, Reingold's algorithm gives the desired bound.

### 6.1 Why the formula expansion is too large

For a proof *tree*, OR is parallel composition and AND is series composition.
Expanding (P) this way is correct.  But every occurrence of a child claim is
copied once for every table pair that uses it.  The naive recurrence has a
factor $k^{\Omega(1)}$ per tree level, producing

\[
  k^{\Theta(h)}
\]

or more vertices.  At $h=\Theta(\ell)$, this is
$2^{\Theta(\ell^2)}$, superpolynomial in
$N=2^{\Theta(\ell)}$.

### 6.2 Why simply sharing a proof subgraph is unsound

Series/parallel proof networks are context-sensitive.  Reusing one
two-terminal subgraph in different series contexts allows a path to enter
through the prefix of one occurrence and leave through the suffix of another.

A tiny schematic example is

\[
  q=(p\wedge r)\vee(s\wedge p).
\]

Let the shared gadget for $p$ have terminals $A,B$.  The first term gives
an unconditional route from the global source to $A$, followed after $B$
by the $r$-gadget.  The second term puts the $s$-gadget before $A$ and
gives an unconditional route from $B$ to the global sink.  If $p$ is true
but $r,s$ are false, the hybrid path

\[
  \text{source}\to A\xrightarrow{p}B\to\text{sink}
\]

exists even though $q$ is false.  Copying $p$ by occurrence prevents the
hybrid, but returns to exponential expansion.

The same issue appears in a reconfiguration graph of partial proof states.
If a state remembers every selected table pair on the active recursion path,
there are $k^{\Theta(h)}$ states and its vertex name costs
$\Theta(h\ell)$ bits.  If it forgets ancestor contexts, different partial
proofs merge and can splice into a false proof.

### 6.3 A precise sufficient gadget lemma

The following is the cleanest surviving offbeat target.

**Port-isolating composition conjecture.**  There is a logspace-uniform
family of undirected graph modules with these properties.

- A subtree module exposes $k$ named value ports and satisfies an exact
  one-hot connectivity invariant: port $c$ is enabled iff the subtree value
  is $c$.
- Given two child modules and an arbitrary explicit table
  $f:[k]^2\to[k]$, a table-local gadget with $k^{O(1)}$ new vertices
  produces the parent's $k$ ports with enabled port $f(a,b)$.
- Child modules are reused rather than copied, and no path can enter a child
  under one table-pair context and leave under another.
- The invariant is closed under arbitrary-height composition, and adjacency
  in the final graph is computable locally without already knowing the child
  values.

This conjecture immediately implies Tree Evaluation in L: the final graph has
$2^h k^{O(1)}$ vertices, its root-value ports can be tested by undirected
connectivity, and the logarithm of its size is $O(h+\ell)$.

The hard clause is the third one.  The universal cover that tags every proof
context is sound but has $k^{\Theta(h)}$ sheets.  A weird possible attack is
to replace full tags by a finite graph cover or voltage-group label of only
$k^{O(1)}$ states.  The group label would have to forbid all hybrid paths for
*every* sequence of arbitrary tables.  Any exact small quotient which safely
identifies context words would prove the conjecture; an adversarial-table
construction forcing two identified words to create a hybrid would refute a
given quotient scheme.

This is close in spirit to permutation-program approaches, but it packages
the missing phenomenon as **context isolation under graph sharing**, making
Reingold's theorem the final engine.

### 6.4 Why ordinary reachability does not already encode the Horn program

Replacing a hyperedge $\{p,r\}\to q$ by incidence edges makes $q$
reachable when *either* premise is reachable; it changes AND to OR.  Directed
reachability has the same existential-path issue.  Alternating reachability
represents the rule correctly, but general alternating reachability is the
circuit/fixed-point computation we started with.  The port compiler must
implement conjunction, not merely orient edges.

## 7. A two-way tree-walking target

There is another automata-theoretic sufficient condition which is narrower
than an arbitrary logspace algorithm and may admit structural attacks.

**Polynomial-state walker target.**  For every $k$, construct uniformly a
deterministic two-way tree-walking machine with $k^{O(1)}$ control states
(or a constant number of movable pebbles plus $k^{O(1)}$ states) which,
given read access to the node-specific tables, halts with the root value on
every height-$h$ complete tree.

Such a walker can be simulated in

\[
  O(\log 2^h+\log k^{O(1)})=O(h+\ell)
\]

space: store its current node/pebble addresses and control state.  If its
transition system is halting, its polynomial number of configurations also
gives polynomial time.

The no-lookahead top-down obstruction in Section 3 shows that the walker must
inspect and return from subtrees.  The standard walk remembers one
$k$-valued left result at every active ancestor, corresponding to
$k^h$ crossing states.  The research question is whether repeated two-way
inspection, canonization, or a finite crossing-sequence quotient can reduce
that to $k^{O(1)}$ states without allowing context splicing.  This is the
same isolation problem as Section 6 in automata language.

LREC captures L on directed trees, but that theorem does not directly supply
the walker: when the arbitrary tables and their value ports are expanded into
the input structure, it is no longer a bounded-width tree structure
(Section 5).

## 8. Dead ends and surviving tests

### Dead ends established here

- **"The assignment is unique, so use UL."**  The natural verifier needs
  universal branching to check both children.  Unique existential strategy
  is not a UL path.
- **"Turn the proof DAG into reachability."**  Reachability implements OR;
  AND needs series composition, whose reusable form has cross-talk.
- **"Use fixed-point logic."**  The direct operator is nonlinear LFP, the
  logic that captures P on ordered structures.  Its one-hot output does not
  make its predecessor relation functional.
- **"Use Courcelle because the CSP graph is a tree."**  The arbitrary table
  is an input-sized label; expanding it introduces a $K_{k,k}$ minor.
- **"Use d-DNNF because the proof is deterministic and decomposable."**
  Generic promised d-DNNF value remains P-hard via constants and dual rail.
- **"Reverse the bottom-up automaton."**  Parent state and table label do not
  determine child states; reverse determinism requires the values being
  sought.
- **"Supply/check the unique labeling."**  The certificate is not supplied,
  and unique locally checkable tableaux are generic for deterministic P.

### Three falsifiable research projects

1. **Build or break a port-isolating cover.**  Start with height two and
   search exhaustively for small undirected modules whose one-hot ports
   compose for every $f:[k]^2\to[k]$.  Then test closure when the same child
   module occurs in two ancestor contexts.  A size $k^{O(1)}$ family with a
   proof of arbitrary-height closure gives L; a lower bound for exact graph
   covers would kill this particular route.

2. **Separate partition-LREC from dual rail.**  Formalize complete
   vtree-partition circuits and try to embed general Circuit Value at
   polynomial width.  Polynomial embedding is a barrier; failure traceable
   to an exponential number of cut states is evidence that the class is a
   genuine L candidate.

3. **Search for a finite crossing-sequence algebra.**  For table-oracle
   two-way walkers, characterize the transformations a subtree induces on a
   $k^{O(1)}$-state boundary.  Closure under arbitrary tables and tree
   composition would yield the walker target.  State growth to $k^h$ on an
   explicit adversarial family would explain why this automata restriction is
   too weak without proving a general Tree Evaluation lower bound.

## 9. Primary sources checked

- Stephen Cook, Pierre McKenzie, Dustin Wehr, Mark Braverman, and Rahul
  Santhanam, [*Pebbles and Branching Programs for Tree
  Evaluation*](https://arxiv.org/abs/1005.2642).  Defines the problem and its
  LogDCFL upper bound.
- Neil Immerman, [*Relational Queries Computable in Polynomial
  Time*](https://doi.org/10.1016/S0019-9958(86)80029-8).  Least-fixed-point
  logic captures polynomial time on ordered structures.
- Moshe Vardi, [*The Complexity of Relational Query
  Languages*](https://www.cs.rice.edu/~vardi/papers/stoc82.pdf).  Independent
  fixed-point/data-complexity characterization.
- H. V. Jagadish, Rakesh Agrawal, and Linda Ness,
  [*A Study of Transitive Closure as a Recursion
  Mechanism*](https://doi.org/10.1145/38714.38750).  Relates linear recursive
  queries to transitive closure.
- Martin Grohe, Berit Grußien, André Hernich, and Bastian Laubner,
  [*L-Recursion and a New Logic for Logarithmic
  Space*](https://arxiv.org/abs/1212.6567).  Introduces LREC, proves its
  logspace data complexity, and gives the circuit path-product motivation.
- Michael Elberfeld, Andreas Jakoby, and Till Tantau,
  [*Logspace Versions of the Theorems of Bodlaender and
  Courcelle*](https://eccc.weizmann.ac.il/report/2010/062/).  The applicable
  theorem fixes the formula and treewidth bound; Section 5 explains why the
  arbitrary table encoding violates that setting.
- Adnan Darwiche, [*Decomposable Negation Normal
  Form*](https://doi.org/10.1145/502090.502091).  Background for the
  deterministic/decomposable circuit lens.
- Richard Ladner, [*The Circuit Value Problem Is Log Space Complete for
  P*](https://doi.org/10.1145/990518.990519).  Used in the dual-rail warning.
- Omer Reingold, [*Undirected Connectivity in
  Log-Space*](https://doi.org/10.1145/1391289.1391291).  Supplies the final
  algorithm if the port-isolating graph compilation exists.
