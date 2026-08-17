# Offbeat algebraic attacks on logspace Tree Evaluation

Date: 2026-08-12

This note explores algebraic routes that do not repeat the
Cook--Mertz interpolation argument.  None of them solves unrestricted Tree
Evaluation.  They do produce one fairly broad tractable class and several
exact obstructions to natural group-, cocycle-, tensor-, and semigroup-based
plans.

Throughout, the alphabet has size \(K\), an alphabet element takes
\(\ell=\lceil\log K\rceil\) bits, the binary tree has height \(h\), and the
explicit input length satisfies

\[
  N=\Theta(2^hK^2\ell),\qquad \log N=\Theta(h+\ell).
\]

The epistemic labels in this note have their literal meanings.

- **Proved here** means that a complete proof is included.
- **Obstruction** rules out only the stated representation or composition
  invariant.  It is not a lower bound for arbitrary TreeEval algorithms.
- **Open target** is a possible line of attack, not a claimed theorem.

## 1. Results in one page

1. **A flattening theorem.**  Suppose the alphabet is a common monoid and
   every gate has the form

   \[
      f_u(x,y)=\alpha_u(x)c_u\beta_u(y),
      \tag{1}
   \]

   where \(\alpha_u,\beta_u\) are succinctly composable monoid
   endomorphisms.  Then TreeEval is in deterministic
   \(O(h+\ell)\) space.  The operations may vary from node to node.  The
   proof expands the tree to a word without ever materializing that word.
   Modular-affine gates

   \[
      f_u(x,y)=a_ux+b_uy+c_u\pmod K
   \]

   are an immediate concrete corollary.  A noncommutative corollary covers
   independently conjugated children in a common group.

2. **A cocycle lookup works once, but forces huge state.**  For an odd prime
   \(p\), every table \(F:[p]^2\to\mathbb F_p\) can be encoded exactly as

   \[
      [X_a,Y_b]=Z^{F(a,b)}
   \]

   in a two-step nilpotent group.  If \(F\) has full matrix rank, however,
   every permutation action in which the central output \(Z\) acts
   nontrivially has degree at least \(p^{p+1}\).  Merely storing the current
   point then costs \(\Omega(p\log p)\), exponentially more than
   \(\ell=\log p\).  This gives a rigorous failure certificate for the most
   direct cohomological/Heisenberg-group attack.

3. **Abelian curvature cannot express arbitrary lookup.**  In any
   alternating row/column factorization, passing to an abelian quotient makes
   the output matrix have zero rectangle derivative.  An arbitrary lookup
   table need not.  Consequently the universal permutation-factorization
   proposal from `permutation-program-route.md` can only work in a perfect
   group; every nontrivial solvable group is ruled out.  One row factor and
   one column factor are impossible even in a nonabelian group.

   More generally, a \(d\)-dimensional linear representation turns a
   \(q\)-alternation factorization into scalar matrices of rank at most
   \(d^{2q-1}\).  Equality lookup forces rank \(K-1\).  Thus the output
   signals must also evade all representations of dimension
   \(o(K^{1/(2q-1)})\).

4. **Constant-call factorization needs degree at least linear in the
   alphabet.**  A counting argument shows that a \(q\)-round universal
   row/column factorization acting on \(w\) points must satisfy

   \[
      w\log w\;\ge\;\frac{K\log K}{2q}.
   \]

   Thus constant \(q\) cannot use classical constant width or even
   \(\operatorname{poly}(\ell)\) degree.  Degree \(K^{O(1)}\), whose point
   names still take \(O(\ell)\) bits, remains possible.

5. **Holographic basis changes do not lower worst-case local rank.**  After
   every invertible change of bases, a deterministic equality-style gate has
   an output slice of matrix rank at least \(K-1\).  Hence a scheme that
   batches a gate as a sum of separable left/right pieces must either keep
   \(\Omega(K)\) amplitudes or stream \(\Omega(K)\) recursive pieces.  The
   former is exponentially too much space and the latter gives
   \(K^{\Theta(h)}\) time under direct recursion.

6. **Faithfully retaining all ancestor contexts costs the original stack.**
   The relevant context group contains an iterated wreath product with
   \((K!)^{K^{h-1}}\) elements.  Any faithful permutation action has
   \(\log w=\Omega(h\log K)\).  This explains, for a broad class of
   context-faithful group/semigroup compilers, why copying the payload space
   by a factor \(K\) per level is structural.  An actual solution must
   quotient contexts using the particular input, rather than represent all
   of them faithfully.

## 2. A universal-algebraic positive result: flattenable gates

The useful algebraic property is not associativity of each node's private
table.  It is a common multiplication through which all descendant
operations distribute.

### 2.1 Endomorphism-separable monoids

Let \((M,\cdot,1)\) be a finite monoid of size \(K\).  Let \(E\) be a monoid
of endomorphisms of \(M\).  Assume the following uniform representation.

1. An element of \(M\) and a name for a member of \(E\) each use
   \(O(\ell)\) bits.
2. Multiplication in \(M\), applying an endomorphism, and composing two
   endomorphism names use \(O(\ell)\) workspace and polynomial time.
3. There are at most \(K^{O(1)}\) canonical endomorphism names, so a promised
   factorization can, if necessary, be recovered by exhaustive search and a
   scan of the explicit gate table.

Call a TreeEval instance **endomorphism-separable** if every internal table
has a factorization of the form (1), with \(c_u\in M\) and
\(\alpha_u,\beta_u\in E\).

**Theorem (proved here).**  Endomorphism-separable TreeEval is computable in
deterministic \(O(h+\ell)\) workspace and polynomial time.

**Proof.**  Give each node \(v\) an inherited endomorphism \(\Theta_v\).
Set \(\Theta_{\rm root}=\mathrm{id}\).  If \(v\) is the left child of
\(u\), put

\[
   \Theta_v=\Theta_u\circ\alpha_u;
\]

if it is the right child, put

\[
   \Theta_v=\Theta_u\circ\beta_u.
\]

Now form a conceptual token at every tree node.  A leaf \(v\), whose input
label is \(x_v\), contributes \(\Theta_v(x_v)\).  An internal node \(u\)
contributes \(\Theta_u(c_u)\).  List these tokens in the recursive inorder

```text
tokens(left subtree), token(u), tokens(right subtree).
```

Their ordered monoid product is the root value.  This follows by induction:
for any endomorphism \(\Theta\),

\[
\begin{aligned}
 \Theta(f_u(x,y))
   &=\Theta(\alpha_u(x))\,\Theta(c_u)\,\Theta(\beta_u(y))\\
   &=(\Theta\circ\alpha_u)(x)\,\Theta(c_u)\,
     (\Theta\circ\beta_u)(y).
\end{aligned}
\]

The algorithm never writes the expanded word.  It enumerates the
\(2^{h+1}-1\) nodes in inorder.  For the current token, it rescans the
root-to-node path and composes the corresponding endomorphism names to obtain
\(\Theta_v\), applies it to the token, and multiplies the result into one
accumulator.  A path/node address costs \(O(h)\) bits and the endomorphism
name, token, and accumulator cost \(O(\ell)\) bits.  Ordinary input offsets
cost \(O(\log N)=O(h+\ell)\).  Repeated scans and exhaustive recovery of a
factorization remain polynomial in the explicit input size.  \(\square\)

This theorem is a clone-theoretic sufficient condition: the generated tree
terms are *linear words decorated by endomorphisms*.  The tree
parenthesization disappears because every decoration distributes through the
common monoid product.

### 2.2 Concrete commutative corollary: modular-affine tables

Take the additive monoid \(M=\mathbb Z/K\mathbb Z\) and endomorphisms
\(x\mapsto ax\).  If every node is promised to satisfy

\[
   f_u(x,y)=a_ux+b_uy+c_u\pmod K,
   \tag{2}
\]

then the theorem gives \(O(h+\ell)\) space.  The parameters are recoverable
directly:

\[
   c_u=f_u(0,0),\quad
   a_u=f_u(1,0)-c_u,\quad
   b_u=f_u(0,1)-c_u\pmod K,

\]

followed, if the input is not promised, by one scan verifying (2).

Equivalently, the root is a sum of one contribution per leaf and one per
internal-node constant.  The coefficient of a token is the product of the
left/right edge coefficients on its root path.  Enumerating tokens and
recomputing that path product uses one \(\ell\)-bit coefficient and one
\(\ell\)-bit accumulator.

### 2.3 Concrete noncommutative corollary: inner group actions

Let \(G\) be a logspace-uniform family of finite groups, with elements using
\(\ell\) bits.  Suppose every gate has the form

\[
 f_u(x,y)=g_uxg_u^{-1}\;c_u\;r_uyr_u^{-1}.
 \tag{3}
\]

Inner automorphisms have succinct composition:

\[
 C_q\circ C_g=C_{qg}.

\]

Thus (3) is another instance of the theorem.  Its conceptual expanded word
contains each internal \(c_u\) between the words of its two subtrees, with
every token conjugated by the product of the edge conjugators on its path.
One current conjugator and one group accumulator suffice.

For a fixed uniform group law, the three gate parameters can be found in
polynomial time by enumerating \(g,r\in G\), setting
\(c=f(e,e)\), and verifying the table.  This gives a genuinely
noncommutative tractable class; commutativity is not what makes the flattening
work.

### 2.4 Why this cannot be a normal form for arbitrary gates

If the common algebra and its succinctly named endomorphisms are fixed, an
\(O(\ell)\)-bit tuple \((\alpha,c,\beta)\) describes only
\(2^{O(\ell)}=K^{O(1)}\) possible binary operations.  There are

\[
   K^{K^2}=2^{K^2\log K}

\]

arbitrary tables \([K]^2\to[K]\).  Therefore no fixed succinct
endomorphism-separable normal form covers all gates.  A general algorithm
must either access the large table lazily, as the permutation block gadget
does, or use a representation whose description is itself large but whose
*dynamic state* remains small.

## 3. A cohomological one-level gadget—and a sharp obstruction

A natural offbeat idea is to store the gate table in a 2-cocycle.  This works
perfectly at one level.

Let \(p\) be an odd prime and let \(F\in\mathbb F_p^{p\times p}\) be the
matrix of a gate \(F:[p]^2\to\mathbb F_p\).  Define a group

\[
 H_F=\{(x,y,z):x,y\in\mathbb F_p^p, z\in\mathbb F_p\}

\]

with multiplication

\[
 (x,y,z)(x',y',z')=
 (x+x',y+y',z+z'+x^{\mathsf T}Fy').
 \tag{4}

\]

Associativity is exactly the 2-cocycle identity for the bilinear term
\(x^{\mathsf T}Fy'\).  Let \(e_a\) denote the \(a\)-th standard basis vector
and set

\[
 X_a=(e_a,0,0),\qquad Y_b=(0,e_b,0),\qquad Z=(0,0,1).

\]

With the commutator convention \([x,y]=xyx^{-1}y^{-1}\), direct
calculation gives

\[
    [X_a,Y_b]=Z^{F(a,b)}.
    \tag{5}

\]

Thus an arbitrary table lookup becomes a four-letter group word with one
row-dependent and one column-dependent signal.

The bad news is unusually clean.  It is not merely that the displayed normal
form contains \(2p+1\) field coordinates.

**Theorem (proved here).**  If \(F\) is nonsingular, every permutation action
of \(H_F\) in which \(Z\) acts nontrivially has degree at least

\[
    p^{p+1}.
    \tag{6}

\]

Consequently a current point in such an action needs at least
\((p+1)\log p=\Omega(p\log p)\) bits.

**Proof.**  Nonsingularity of \(F\) makes the commutator form on
\(H_F/\langle Z\rangle\cong\mathbb F_p^{2p}\)

\[
 \omega((x,y),(x',y'))=x^{\mathsf T}Fy'-{x'}^{\mathsf T}Fy

\]

nondegenerate.  The center and commutator subgroup of \(H_F\) are both the
order-\(p\) group \(\langle Z\rangle\).

Consider an action in which \(Z\) is nontrivial.  Some point has a stabilizer
\(S\) with \(S\cap\langle Z\rangle=1\).  Since all commutators are central,

\[
   [S,S]\subseteq S\cap\langle Z\rangle=1.

\]

The image of \(S\) in the symplectic vector space
\(H_F/\langle Z\rangle\) is therefore isotropic.  A totally isotropic
subspace of a nondegenerate \(2p\)-dimensional symplectic space has dimension
at most \(p\).  Hence \(|S|\le p^p\).  The orbit of the point has size

\[
  [H_F:S]\ge \frac{p^{2p+1}}{p^p}=p^{p+1},

\]

proving (6).  \(\square\)

For example, take the legal TreeEval table
\(F(a,b)=1\) when \(a=b\) and \(0\) otherwise.  Its matrix is the identity,
so the theorem applies.  To distinguish the \(p\) possible central outputs
in (5), \(Z\) must act nontrivially.  Therefore even a lazily generated
permutation implementation of this cocycle gadget has exponentially too much
point state.

This is a useful design lesson.  A central extension can absorb arbitrary
rectangle curvature, but a full-rank table forces a symplectic space with one
independent row and column direction per alphabet symbol.  The table has
moved into the group action rather than disappeared.

## 4. Rectangle curvature for permutation factorizations

The existing permutation note asks for a constant \(q\) and a permutation
group \(G\le S_w\) such that, for every table \(f:[K]^2\to[K]\) and every
target tuple \(T_1,\ldots,T_K\in G\),

\[
 T_{f(a,b)}=
 A^{(1)}_aB^{(1)}_b\cdots A^{(q)}_aB^{(q)}_b.
 \tag{7}

\]

The factors may depend on \(f\) and on the whole target tuple.  This section
adds three restrictions on any such universal alternating factorization.

### 4.1 Every abelian quotient is fatal

**Proposition (proved here).**  If (7) holds for all target tuples and all
tables with \(K\ge2\), then \(G\) is perfect:
\(G=[G,G]\).

**Proof.**  Suppose \(\phi:G\to A\) is a nontrivial homomorphism to an
abelian group, written additively.  Choose target elements \(T_0,T_1\) with
\(\phi(T_0)\ne\phi(T_1)\).  After applying \(\phi\), the right side of (7)
collapses, for every \(q\), to

\[
     R(a)+C(b).

\]

Every such matrix has zero rectangle derivative:

\[
 M(a_0,b_0)-M(a_0,b_1)-M(a_1,b_0)+M(a_1,b_1)=0.
 \tag{8}

\]

Choose a table whose selected \(2\times2\) submatrix of outputs is

\[
 \begin{pmatrix}0&0\\0&1\end{pmatrix}.

\]

The derivative in (8) is
\(\phi(T_1)-\phi(T_0)\ne0\), a contradiction.  Taking
\(A=G/[G,G]\) proves the claim.  \(\square\)

In cohomological language, row-plus-column data are flat 1-cochains and an
arbitrary lookup table has nonzero rectangle curvature.  Nonabelian
commutators are not decorative here; they are necessary.  In particular, no
nontrivial solvable, nilpotent, abelian, or cyclic group can satisfy (7), no
matter how many constant alternating factors are allowed.  This is consistent
with the alternating-group gadget in the existing note: alternating groups
of degree at least five are perfect.

### 4.2 One alternation is impossible in every group

This stronger statement for \(q=1\) needs no quotient.

If \(M_{ab}=A_aB_b\), then every rectangle obeys the nonabelian identity

\[
 M_{00}M_{10}^{-1}M_{11}M_{01}^{-1}=1.
 \tag{9}

\]

For the output pattern
\(\bigl(\begin{smallmatrix}T_0&T_0\\T_0&T_1\end{smallmatrix}\bigr)\),
the left side of (9) is \(T_1T_0^{-1}\), which is nonidentity when the two
signals are distinct.  Thus every universal construction needs at least two
row/column alternations.  Perfectness only removes the first obstruction; it
does not itself supply the needed factorization.

### 4.3 Low-dimensional representations are also fatal

The abelian-quotient argument is the one-dimensional case of a more general
rank obstruction.

**Proposition (proved here).**  Let
\(\rho:G\to\operatorname{GL}_d(\mathbb F)\) be a linear representation.
Fix vectors \(u,v\in\mathbb F^d\), and write

\[
   s_c=u^{\mathsf T}\rho(T_c)v.
\]

If (7) holds with \(q\) alternations, then for every table \(f\) the scalar
matrix

\[
   S(a,b)=s_{f(a,b)}
\]

has rank at most \(d^{2q-1}\).  Consequently, if two target signals are
separated by this matrix coefficient, universality forces

\[
    d^{2q-1}\ge K-1.
    \tag{R}
\]

**Proof.**  Apply \(\rho\) to (7) and take the indicated matrix coefficient.
Expand the product of the \(2q\) alternating \(d\)-by-\(d\) matrices over its
\(2q-1\) intermediate indices.  For every fixed index tuple, the product of
all entries from the \(A\)-matrices depends only on \(a\), and the product of
all entries from the \(B\)-matrices depends only on \(b\).  Thus the
expansion is a sum of at most \(d^{2q-1}\) separated rank-one matrices.

Now choose labels \(r,s\) with \(s_r\ne s_s\) and the equality-style table

\[
 f(a,b)=\begin{cases}r,&a=b,\\s,&a\ne b.\end{cases}
\]

Then

\[
 S=(s_r-s_s)I+s_sJ
\]

has rank at least \(K-1\), proving (R).  \(\square\)

Because the universal property quantifies over every target tuple, any
nontrivial representation lets us choose two targets separated by one of its
matrix coefficients.  Thus, for constant \(q\), every nontrivial
representation of a successful group must have dimension at least
\((K-1)^{1/(2q-1)}\).  The perfectness requirement merely removes dimension
one.  This points toward highly quasirandom perfect groups, and away from
solvable matrix groups of small degree.  It also shows that the
group-factorization and holographic rank obstructions in Section 5 are two
forms of the same phenomenon.

### 4.4 A degree lower bound by counting

**Proposition (proved here).**  Suppose the target tuple is injective and
(7) works for every table.  Then

\[
   K^{K^2}\le |G|^{2qK}.
   \tag{10}

\]

If \(G\le S_w\), it follows that

\[
   w\log w\ge\frac{K\log K}{2q}.
   \tag{11}

\]

**Proof.**  There are \(K^{K^2}\) tables.  Injectivity of the target tuple
means distinct tables give distinct \(K\times K\) matrices in (7).  A choice
of factors consists of only \(2qK\) group elements, proving (10).  Finally
\(|G|\le w!\le w^w\), which gives (11).  \(\square\)

For constant \(q\), (11) forces \(w=\Omega(K)\).  This rules out a
constant-width Barrington imitation and even degree
\(\operatorname{poly}(\ell)\).  It does **not** rule out the desired regime
\(w=K^{O(1)}\), because a point of such a permutation action still takes
only \(O(\ell)\) bits.  It says that any successful construction must use the
large symmetric/alternating group very seriously, rather than a tiny fixed
group with more elaborate label encodings.

The same counting argument applies to noninvertible transformations on
\([w]\): the full transformation monoid has only \(w^w\) elements.  Reset
maps do not permit sublinear degree in a constant-call universal
factorization.

## 5. Holographic and tensor basis changes

Represent a deterministic gate by its order-three tensor over an arbitrary
field \(\mathbb F\):

\[
   T_f(a,b,c)=\mathbf 1[c=f(a,b)].

\]

A holographic algorithm might hope that invertible basis changes on the two
child legs and output leg make every gate low-rank or separable.  The
following elementary example prevents this.

**Proposition (proved here).**  Let \(K\ge2\).  There is a deterministic gate
such that after *every* invertible basis change on all three legs, at least
one output slice has left-right matrix rank at least \(K-1\).

**Proof.**  Choose distinct output labels \(r,s\), and set

\[
 f(a,b)=
 \begin{cases}
   r,&a=b,\\
   s,&a\ne b.
 \end{cases}
 \tag{12}

\]

Contract the output leg against a covector \(\mu\in\mathbb F^K\).  The
resulting child matrix is

\[
 M_\mu=(\mu_r-\mu_s)I+\mu_sJ,
 \tag{13}

\]

where \(J\) is all ones.  In any invertible output basis, at least one basis
covector separates \(r\) and \(s\); otherwise the two output basis vectors
would be indistinguishable.  For that covector the first coefficient in (13)
is nonzero.  Since \(\mu_sJ\) has rank at most one,

\[
   \operatorname{rank}M_\mu
      \ge \operatorname{rank}((\mu_r-\mu_s)I)
          -\operatorname{rank}(\mu_sJ)
      \ge K-1.

\]

Invertible changes of basis on the child legs multiply \(M_\mu\) by
invertible matrices on the left and right and cannot change its rank.
\(\square\)

Therefore an exact expansion of the relevant slice into separated terms

\[
   M(a,b)=\sum_{i=1}^R u_i(a)v_i(b)

\]

requires \(R\ge K-1\).  This creates a precise two-horn obstruction for the
most direct tensor contraction strategy.

- Materializing the \(R\) amplitudes uses \(\Omega(K)\) field elements,
  exponentially more than \(O(\ell)\) bits.
- Streaming the \(R\) terms and recursively evaluating both sides creates
  at least \(K^{\Theta(h)}\) direct-recursion time.  At balanced
  \(h=\Theta(\ell)\), this is \(2^{\Theta(\ell^2)}\), while
  \(N=2^{\Theta(\ell)}\).  A halting deterministic \(O(\log N)\)-space
  machine automatically has only polynomially many configurations and hence
  polynomial running time.

This proposition does not rule out nonlinear encodings, implicit application
of a high-rank matrix, or cancellations spanning several tree levels.  It
does rule out the hope that a clever local invertible basis makes all
arbitrary deterministic gate tensors bounded-rank matchgate-like objects.

## 6. Wreath products: the cost of preserving every context

The failed recursive block gadget copies a payload space by a factor \(K\)
per level.  For methods that insist on representing *every possible ancestor
context faithfully*, this exponential degree is unavoidable.

Let \(W_h\) be the \(h\)-fold iterated wreath product of \(S_K\) in its
natural action on a rooted \(K\)-ary tree.  Operationally, it describes
context-dependent alphabet permutations: at the bottom layer one may apply
an independent permutation for each of the \(K^{h-1}\) possible ancestor
contexts.  In particular,

\[
   W_h\supseteq (S_K)^{K^{h-1}},

\]

and hence

\[
   |W_h|\ge (K!)^{K^{h-1}}.
   \tag{14}

\]

**Proposition (proved here).**  For \(K\ge4\), every faithful permutation
representation \(W_h\hookrightarrow S_w\) satisfies

\[
   \log w=\Omega(h\log K).
   \tag{15}

\]

**Proof.**  From (14), \(w!\ge(K!)^{K^{h-1}}\).  The elementary estimates
\(\log w!\le w\log w\) and
\(\log K!=\Omega(K\log K)\) give

\[
    w\log w=\Omega(K^h\log K).

\]

If \(w\ge K^h\), (15) is immediate.  Otherwise
\(\log w<h\log K\), so the last display gives
\(w=\Omega(K^h/h)\), and therefore
\(\log w\ge h\log K-O(\log h)=\Omega(h\log K)\).
\(\square\)

Why is this group relevant?  A row of an arbitrary TreeEval table may be an
arbitrary permutation of the other child's alphabet.  If a compositional
compiler represents a subtree by its action under all possible values of all
future ancestors, independently chosen row permutations generate exactly
this wreath-product cascade.  Faithful representation then costs
\(\Omega(h\ell)\) point bits, the original value-stack scale.

This is deliberately a conditional obstruction.  Root evaluation asks for
one value on one concrete instance; it does not ask for a faithful action of
all contexts.  Cook--Mertz already demonstrates that algebraic cancellation
can quotient information that pebbling keeps.  A successful group or
semigroup algorithm must similarly identify context actions that are
irrelevant for the actual input, instead of embedding the entire wreath
product.

Noninvertible resets do not change this conclusion for a
context-**faithful** transformation-semigroup method: its unit group still
contains the same permutation cascade.  They could matter only if the reset
collapses contexts in an input-sensitive way while retaining enough
information to undo or certify that collapse.

## 7. What these experiments point toward

The algebraic search space is narrower after these tests.

### 7.1 Plausible target: perfect-group closure with controlled forgetting

The universal factorization route must use a perfect group, at least linear
permutation degree, and two or more nonabelian alternations.  Alternating
groups of degree \(K^{O(1)}\) meet the first two requirements and retain
\(O(\ell)\)-bit point names.  The missing ingredient is an input-sensitive,
nonfaithful closure operation: it must forget most of the wreath-product
context without passing through an abelian quotient and without copying a
payload block per context.

This formulation suggests searching for bounded products of conjugacy
classes, double-coset factorizations, or highly mixing word maps in
\(A_{K^c}\), rather than more central-commutator gadgets.  Central extensions
are precisely what the symplectic lower bound makes expensive.

### 7.2 Plausible target: recognize and peel off flattenable structure

The endomorphism-separable theorem handles a broad structured component
exactly.  One could ask whether every explicit table admits

\[
    f=\text{``few nonlinear defects'' over a flattenable algebra}

\]

where the defects compose with constant branching.  Ordinary tensor rank is
not the right measure: Section 5 forces rank \(\Omega(K)\).  A useful defect
measure would have to be nonlinear and stable under recursive substitution,
perhaps based on a small number of permutation conjugacy classes rather than
separable linear summands.

### 7.3 Plausible target: exploit only the realized orbit

Both the cocycle action and the wreath-product action represent far more than
the computation uses.  The root follows one realized orbit determined by the
leaf labels.  If that orbit could be navigated with a succinct canonical
representative, while table scans generate the next action lazily, the large
ambient group degree might not matter.  The difficulty is clean return:
canonicalization must be reversible or independently checkable without
retaining the discarded context.  This is the algebraic analogue of the
dynamic succinct-register problem in the matching-vector approach.

## 8. Bottom line

No unrestricted \(O(h+\ell)\)-space algorithm was found.

The strongest positive statement is the endomorphism-separable flattening
theorem, which covers varying modular-affine gates and a noncommutative family
of conjugation-decorated group gates.  The strongest negative statement is
the cocycle obstruction: an exact one-commutator encoding of a full-rank
lookup table naturally creates a group whose smallest output-sensitive
permutation action already needs \(\Omega(K\log K)\) point bits.

Together with the curvature, tensor-rank, and wreath-product calculations,
this says that a viable offbeat algebraic solution would have to combine all
three of the following:

1. genuinely nonabelian perfect-group behavior;
2. degree \(K^{O(1)}\), but without faithfully retaining all contexts; and
3. a nonlinear, input-sensitive forgetting mechanism that remains clean
   under recursive composition.

That is a more specific target than “try group theory” or “try a holographic
basis,” and each excluded shortcut has an explicit counterexample or
inequality behind it.
