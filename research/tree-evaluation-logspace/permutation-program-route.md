# A permutation-program route to logspace Tree Evaluation

Date: 2026-08-12

This note records a Barrington-style attack that arose after the interpolation
and matching-vector routes were audited. It does **not** solve TreeEval. It
does, however, isolate a concrete algebraic sufficient condition and a
constant-call one-level lookup gadget. The gadget's failure under naive
recursion is explicit, rather than a vague appeal to "garbage."

Write \(K=k=2^\ell\). A program below acts by permutations on a point set
\([w]\). Storing the current point costs \(\log w\) bits, even though a
permutation of the point set may contain much more information and may be
applied by scanning the explicit input table.

## 1. The fixed-width factorization target

For a group \(G\leq S_w\), consider the following property.

> **Universal alternating factorization (UAF).** There is a constant \(q\)
> such that, for every tuple \(T_1,\ldots,T_K\in G\) and every function
> \(f:[K]^2\to[K]\), one can find tuples
> \(A^{(i)}_a,B^{(i)}_b\in G\), for \(i\in[q]\), satisfying
>
> \[
> T_{f(a,b)}=
> A^{(1)}_aB^{(1)}_b A^{(2)}_aB^{(2)}_b\cdots
> A^{(q)}_aB^{(q)}_b
> \tag{UAF}
> \]
>
> for every \(a,b\in[K]\). The factors and their actions must be uniformly
> generable in \(O(\ell)\) space from the tables and the target tuple.

**Conditional lemma.** If UAF holds for a uniformly represented group with
\(w=K^{O(1)}\), then binary TreeEval is in deterministic
\(O(h+\ell)\) space and polynomial time.

**Proof.** Inductively compile a subtree into a permutation program that
produces \(T_{\operatorname{val}(u)}\), for any requested target tuple \(T\).
At a leaf, query its label and apply the corresponding target permutation. At
an internal node, use (UAF) and concatenate the \(2q\) child programs requested
by the factor tuples. The length is at most
\((2q)^h\operatorname{poly}(K)\), which is
\(2^{O(h+\ell)}=\operatorname{poly}(N)\). Keep the current tree path, one of
constantly many phases per level, and one point of \([w]\). This costs
\(O(h+\log w)=O(h+\ell)\) bits. Inverses are obtained by reversing the program
and inverting its permutations. At the root, choose a tuple whose action on a
known starting point reveals the root label. \(\square\)

The important quantifier in UAF is "for every target tuple." Barrington's
Boolean construction gets an analogous closure from a fixed nonabelian simple
group. Merely finding one encoding of the \(K\) output labels is not enough:
recursive calls are asked to produce the row and selector actions created by
their parents.

## 2. A constant-call one-level lookup gadget

The following shows that constant recursive branching is not intrinsically
incompatible with an arbitrary \(K\times K\) table. The catch appears only
when the gadget is recursively closed.

Choose distinct even permutations

\[
  \tau_1,\ldots,\tau_K\in A_m
\]

for \(m=O(\ell)\); for example, use products of disjoint 3-cycles to encode the
bits of the label. Each element of the alternating group \(A_m\), \(m\ge5\),
is a commutator, so fix

\[
  [x_c,y_c]=x_cy_cx_c^{-1}y_c^{-1}=\tau_c.
\]

It is not necessary to invoke the full commutator theorem for a concrete bit
encoding: one can choose a constant-size commutator gadget per bit and take
their direct product on disjoint supports.

Make two banks of \(K\) disjoint \(m\)-point blocks,

\[
  D^x_1,\ldots,D^x_K,
  \qquad
  D^y_1,\ldots,D^y_K,
\]

and one common \(m\)-point block \(C\). The total degree is
\(w=(2K+1)m=O(K\ell)\), so a point still needs only \(O(\ell)\) bits.

For a left value \(a\), define row permutations

\[
 P^x_a=\prod_{j=1}^K (x_{f(a,j)}\text{ acting on }D^x_j),
 \qquad
 P^y_a=\prod_{j=1}^K (y_{f(a,j)}\text{ acting on }D^y_j).
\]

For a right value \(b\), let \(S^x_b\) swap the whole blocks \(D^x_b\) and
\(C\), and define \(S^y_b\) analogously using \(D^y_b\) and \(C\). Padding the
block size if needed makes these block swaps even permutations.

The extraction word

\[
 E_x(a,b)=(P^x_a)^{-1}S^x_bP^x_a(S^x_b)^{-1}
\]

acts as \(x_{f(a,b)}\) on \(C\), as \(x_{f(a,b)}^{-1}\) on \(D^x_b\), and as
the identity everywhere else. All unselected row entries cancel. Similarly,
\(E_y(a,b)\) acts as \(y_{f(a,b)}\) on \(C\), with its inverse garbage confined
to the disjoint block \(D^y_b\).

The two garbage actions have disjoint supports. Therefore

\[
 [E_x(a,b),E_y(a,b)]
 = [x_{f(a,b)},y_{f(a,b)}]\text{ on }C
 = \tau_{f(a,b)}\text{ on }C,
\]

and is the identity off \(C\). This uses only a constant number of calls to
the four value-dependent families \(P^x_a,P^y_a,S^x_b,S^y_b\). It is exact,
deterministic, reversible, and independent of the point on which the resulting
permutation acts.

The row permutations can be applied uniformly without materializing them:
the current point identifies its block \(j\), after which the program reads
the explicit table entry \(f(a,j)\) and applies the corresponding small-block
permutation. This observation handles local uniformity but does not supply
the value \(a\); that value dependence is delegated to the left-child action.

## 3. Why this is not yet recursive

The output of the gadget is the canonical signal \(\tau_{f(a,b)}\). But its
left recursive calls must produce \(P^x_a\) and \(P^y_a\), while its right
recursive calls must produce \(S^x_b\) and \(S^y_b\). These are not members
of the original small signal tuple in any evident closed way.

One can generalize the block extraction to an arbitrary requested tuple of
permutations \(T_c\in S_s\): put a copy of the appropriate commutator factors
of \(T_{f(a,j)}\) in each selected data block. The resulting child actions
then live on \(O(Ks)\) points. Repeating this construction through \(h\)
levels gives

\[
  w_h=K^{\Theta(h)}
  \quad\Longrightarrow\quad
  \log w_h=\Theta(h\ell),
\]

which is exactly the ordinary value-stack bound in permutation language.
The inverse garbage has been canceled; the problem is failure of
**fixed-width closure**, not failure of reversibility.

Trying to store only a table row in a permutation does not by itself close
the gap. A permutation on \(K^{O(1)}\) points has enough counting capacity to
encode a row (indeed an entire \(K\times K\) table for a sufficiently large
constant exponent), but the recursive invariant requires a uniformly
decodable alternating factorization such as UAF. Capacity is not a
factorization theorem.

## 4. Status and useful next question

- **Proved here:** the UAF sufficient condition and the constant-call
  one-level block-extraction gadget.
- **Failed:** recursively copying the payload space; it costs
  \(\Theta(h\ell)\) bits.
- **Open algebraic target:** find a closed class of \(K\)-tuples in
  \(A_{K^{O(1)}}\) satisfying a constant-length version of UAF, or prove that
  no such class can contain the row/selector tuples for all explicit tables.

This target has the right two quantitative properties simultaneously:
constant child-call branching gives polynomial time, and permutation degree
\(K^{O(1)}\) gives \(O(\ell)\) global state. It is therefore a sharper version
of "try Barrington's theorem," but at present it is only a reformulation of
the missing composition phenomenon, not a solution.
