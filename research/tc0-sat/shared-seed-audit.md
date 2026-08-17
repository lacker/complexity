# Shared-seed probabilistic polynomials for a sparse depth-3 majority interface

Date: 2026-08-12

## Verdict

The proposed lemma is **valid**, after making the circuit model and the
representation convention explicit.  In fact, the shared-seed step is sound in
a slightly stronger form than proposed: independence is not needed either
between different gates or between the two majority layers.  One may align all
the samplers to one uniform seed space and use one common seed.  Using an
independent pair of seeds, one for the middle layer and one for the top layer,
is also valid and has the same \(O(\log ^2 n)\) total seed length.

The result is best described as an **unstated corollary of ACW Theorem 1.1 and
CTW Lemma 5.3**, not as a new probabilistic-polynomial lemma.  ACW already use
one seed for many majority gates in Section 7.3, and CTW use a common seed for
two separately constructed symmetric-gate approximators in Theorem 5.4.  I did
not find the exact depth-3 product-of-fan-ins statement in either paper.  It is
not literally subsumed by their headline circuit classes.

The conclusion is deterministic CAPP, not SAT: averaging all seeds preserves
acceptance probability up to inverse-polynomial additive error, but need not
preserve a unique satisfying assignment.

## 1. Precise theorem

Fix constants \(0<\varepsilon<2\) and \(a>0\), and positive integers
\(M,S\).  Let

\[
  C(x)=C_0(x)\oplus C_1(x),\qquad x\in\{0,1\}^n,
\]

where, for \(b\in\{0,1\}\),

\[
  C_b(x)=\operatorname{MAJ}_{m_b}
  \bigl(G_{b,1}(x),\ldots,G_{b,m_b}(x)\bigr)
\]

and

\[
  G_{b,j}(x)=\operatorname{MAJ}_{s_{b,j}}
  \bigl(T_{b,j,1}(x),\ldots,T_{b,j,s_{b,j}}(x)\bigr).
\]

Assume

\[
  m_b\le M,\qquad s_{b,j}\le S,\qquad
  MS\le n^{2-\varepsilon}.
\]

Each \(T_{b,j,k}\) is an \(n\)-input LTF.  Repetitions and complemented wires
are permitted and are counted as occurrences.  LTF weights have ordinary
finite, polynomial-bit descriptions.  Majority uses a specified tie
convention; strict majority is covered by changing the unweighted threshold.

Then a deterministic algorithm outputs a number \(\widetilde p\) satisfying

\[
  \left|\widetilde p-
  \Pr_{x\sim\{0,1\}^n}[C(x)=1]\right|\le n^{-a}
\]

in time

\[
  2^{\,n-n^{\Omega(\varepsilon)}}.
\]

A parameter-level version is as follows.  Let \(\gamma>0\) be a sufficiently
small constant with \(\gamma\le\varepsilon\), chosen within the constant range
used by CTW.  The running time is

\[
  2^{\,n-\Omega(n^{\gamma/50})}.
\]

For arbitrary fixed \(\varepsilon\), one can take

\[
  \gamma=\min\{\varepsilon,\gamma_0\}
\]

for an absolute sufficiently small \(\gamma_0>0\).  This is the intended
meaning of the displayed \(n^{\Omega(\varepsilon)}\) saving.

The same proof permits gate-specific unweighted thresholds
\(\operatorname{TH}_{\theta}\), not only the half threshold.  It does **not**
replace the two majority layers by arbitrary weighted LTF layers.

## 2. Exact source interfaces

### ACW Theorem 1.1

Alman--Chan--Williams prove that an \(N\)-input unweighted threshold function
has an \(\mathbb F_2\)-probabilistic polynomial with error \(1/q\), degree

\[
  O\!\left(\sqrt{N\log q}\right),
\]

and seed length

\[
  O(\log N\,\log(Nq)).
\]

The construction is explicit.  In particular, ACW Section 7.3 instantiate it
over \(\mathbb F_2\), expand each sampled polynomial, and use the **same seed
\(r\)** when replacing all the majority gates in their circuit.  Their chosen
per-gate error and a union bound make the majority vote over all seeds exactly
equivalent to the original circuit.  Thus sharing a seed among many majority
gates is not an extrapolation beyond the source.

Source: Josh Alman, Timothy M. Chan, and R. Ryan Williams,
[*Polynomial Representations of Threshold Functions and Algorithmic
Applications*](https://arxiv.org/abs/1608.04355), Theorem 1.1 and Sections
7.3--7.4.

### CTW Lemma 5.3

For a sufficiently small fixed \(\gamma>0\), CTW give a deterministic

\[
  O\!\left(2^{n-n^{\gamma/50}}\right)
\]

algorithm which, given an

\[
  \operatorname{POLY}_{\mathbb F_2}[n^{1-\gamma/8}]
  \circ\operatorname{THR}
\]

circuit with polynomially many distinct bottom LTFs and a set
\(I\subseteq[n]\) of size \(n^{\gamma/10}\), outputs the exact acceptance
probability on every column obtained by fixing the variables outside \(I\).
Summing those exact column answers gives the exact global acceptance
probability.

The partition has no pseudorandomness requirement in Lemma 5.3.  For the
present application one may simply choose any \(I\) of the prescribed size and
reuse it for every seed.  CTW's good-column restriction machinery is not being
invoked.

The proof expands an arbitrary degree-\(n^{1-\gamma/8}\) top polynomial into
at most

\[
  2^{O(n^{1-\gamma/8}\log n)}
\]

monomials.  Thus the lemma is not restricted to a polynomial-sparsity top
polynomial.

Source: Lijie Chen, Avishay Tal, and Yichuan Wang,
[*Super-quadratic Lower Bounds for Depth-2 Linear Threshold
Circuits*](https://eccc.weizmann.ac.il/report/2026/039/), Lemma 5.3 and
Appendix A.4.

CTW explicitly say that Lemma 5.3 was implicitly used in ACW.  Their Theorem
5.4 also aligns two separately constructed symmetric-gate approximation
families by a common seed \(r\) and applies a union bound.  This is a second
published precedent for the relevant quantifier maneuver.

## 3. Quantifier audit and the shared seed

Let the desired final error be

\[
  \xi=n^{-a}.
\]

There are at most \(2M\) middle majority gates.  Give each middle gate error

\[
  \delta_{\mathrm{mid}}=\frac{\xi}{8M}
\]

and each of the two top gates error

\[
  \delta_{\mathrm{top}}=\frac{\xi}{8}.
\]

For each middle gate \(G_{b,j}\), let
\(P^{b,j}_r\) be its sampled ACW polynomial.  Let \(Q^b_r\) be the sampled
polynomial for top gate \(b\).  Families with shorter seeds can ignore trailing
bits, so all are indexed by one common uniform seed space.  Alternatively use
an independent seed pair \((r_{\mathrm{mid}},r_{\mathrm{top}})\).

Fix an original assignment \(x\).  Crucially, define failure against the
**true semantic input** of each gate:

\[
\begin{aligned}
 E_{b,j}(x,r)&:=
 \bigl[P^{b,j}_r(T_{b,j,1}(x),\ldots,T_{b,j,s_{b,j}}(x))
       \ne G_{b,j}(x)\bigr],\\
 F_b(x,r)&:=
 \bigl[Q^b_r(G_{b,1}(x),\ldots,G_{b,m_b}(x))
       \ne C_b(x)\bigr].
\end{aligned}
\]

Every vector displayed here is fixed once \(x\) is fixed.  ACW therefore
gives the marginal bounds

\[
  \Pr_r[E_{b,j}(x,r)]\le\delta_{\mathrm{mid}},\qquad
  \Pr_r[F_b(x,r)]\le\delta_{\mathrm{top}}.
\]

If none of these events occurs, substituting the middle polynomials into the
top polynomials computes both branches correctly, and hence computes their XOR
correctly.  Therefore, with no independence assumption,

\[
\begin{aligned}
 \Pr_r[\widetilde C_r(x)\ne C(x)]
 &\le \sum_{b,j}\Pr_r[E_{b,j}(x,r)]
      +\sum_b\Pr_r[F_b(x,r)]\\
 &\le 2M\cdot\frac{\xi}{8M}
      +2\cdot\frac{\xi}{8}\\
 &\le \frac{\xi}{2}.
\end{aligned}
\]

This proves exactly the needed quantifier order:

\[
  \forall x\quad
  \Pr_r[\widetilde C_r(x)\ne C(x)]\le\xi/2.
\]

It does **not** claim

\[
  \Pr_r[\forall x:\widetilde C_r(x)=C(x)]\approx1,
\]

nor is such a global seed required.  Averaging over \(x\) and \(r\) gives

\[
 \left|
   \mathbb E_r\Pr_x[\widetilde C_r(x)=1]
     -\Pr_x[C(x)=1]
 \right|\le\xi/2.
\]

Enumerating the seed space and exactly counting each
\(\widetilde C_r\) is consequently a deterministic CAPP algorithm.

### Why cross-layer correlation is harmless

At first sight, the top polynomial is evaluated on a vector produced using the
same seed, which looks adaptive.  The preceding semantic-event formulation is
the repair: if any middle value is wrong, that seed is already charged to a
middle event; otherwise the top polynomial is evaluated on the fixed vector of
true middle outputs.  Its fixed-input ACW guarantee applies directly.  Thus
even a single seed shared across both layers is sound.

## 4. Degree and seed ledger

Because \(M,S\le n^{2-\varepsilon}\) and all error parameters are inverse
polynomial,

\[
  \log(1/\delta_{\mathrm{mid}}),
  \log(1/\delta_{\mathrm{top}})=O(\log n).
\]

ACW gives degrees

\[
  d_{\mathrm{mid}}
   =O\!\left(\sqrt{S\log n}\right),
  \qquad
  d_{\mathrm{top}}
   =O\!\left(\sqrt{M\log n}\right).
\]

Substitution multiplies degrees, while the final XOR takes their maximum:

\[
\begin{aligned}
  D
  &\le d_{\mathrm{top}}d_{\mathrm{mid}}\\
  &=O\!\left(\sqrt{MS}\,\log n\right)\\
  &\le O\!\left(n^{1-\varepsilon/2}\log n\right).
\end{aligned}
\]

For any fixed \(0<\gamma\le\varepsilon\), and all sufficiently large \(n\),

\[
  D<n^{1-\gamma/8}.
\]

There is abundant slack: for \(\gamma=\varepsilon\), the polynomial factor
\(\log n\) is absorbed by the gap between \(\varepsilon/2\) and
\(\varepsilon/8\).

Each ACW sampler uses

\[
 O(\log n\cdot\log n)=O(\log^2 n)
\]

random bits.  Aligning all gate samplers to one seed uses \(O(\log^2 n)\) bits
total.  Using independent middle/top seeds still uses only \(O(\log^2 n)\)
bits total.  Thus the phrase “enumerate the seed pairs” means enumerating

\[
  2^{O(\log^2 n)}=n^{O(\log n)}
\]

pairs, not \(O(\log^2 n)\) pairs.

## 5. Representation and construction audit

For a fixed seed, substitute every middle polynomial into the corresponding
top polynomial, add the two branch polynomials over \(\mathbb F_2\), identify
repeated bottom-gate occurrences, and multilinearize.  Negating an input or an
output is the affine substitution \(z\mapsto1+z\) over \(\mathbb F_2\), so it
does not increase degree.

There are at most

\[
  B\le 2MS\le2n^{2-\varepsilon}
\]

bottom LTF occurrences and hence at most that many distinct bottom LTFs.  A
degree-\(D\) multilinear polynomial in \(B\) variables has at most

\[
  \sum_{i=0}^D\binom Bi
  \le B^{O(D)}
  =2^{O(D\log n)}
  =2^{n^{1-\Omega(\varepsilon)}}
\]

monomials.  The ACW recursion is constructive, and ACW Section 7.3 explicitly
uses the corresponding monomial expansion.  Hence each composed top
polynomial can be generated and expanded within this subexponential bound.

This explicit expansion is the representation detail that should not be
omitted.  Merely saying “the composed function has low degree” would not by
itself provide an input to CTW Lemma 5.3.  After expansion, however, its size is
\(2^{o(n)}\), much smaller than the final near-\(2^n\) running time.  CTW's own
proof allows the same \(2^{O(D\log n)}\)-scale expansion.

Repeated wires cause powers of the same bottom-gate output after substitution;
Boolean multilinearization \(z^k=z\) only decreases degree.  A complemented
bottom LTF may either remain as \(1+T(x)\) in the top polynomial or be replaced
by its complementary LTF.  Input negations can be absorbed into the LTF's
weights and threshold.

## 6. Invoking CTW and the total running time

Fix one set \(I\subseteq[n]\) of size \(n^{\gamma/10}\).  For every common seed
or seed pair:

1. construct the explicit multilinear polynomial \(R_r\) described above;
2. invoke CTW Lemma 5.3 on
   \(R_r\circ(T_1,\ldots,T_B)\);
3. sum the exact answers over all columns to obtain
   \(\Pr_x[R_r(T(x))=1]\);
4. average these exact probabilities over all seeds.

One CTW call costs

\[
  O\!\left(2^{n-n^{\gamma/50}}\right).
\]

Multiplying by the seed count gives

\[
\begin{aligned}
  2^{O(\log^2 n)}
  O\!\left(2^{n-n^{\gamma/50}}\right)
  &=2^{n-n^{\gamma/50}+O(\log^2 n)}\\
  &=2^{n-\Omega(n^{\gamma/50})}.
\end{aligned}
\]

Generating all explicit top polynomials takes only

\[
  2^{n^{1-\Omega(\varepsilon)}}
\]

time up to quasipolynomial factors and is dominated.  The column-output scan
is also included in CTW's bound.  All exact counts and averages have only
\(O(n+\log |R|)\) bits in their denominators/numerators, so rational arithmetic
does not alter the exponent.

## 7. Fan-in, tie, and negation conventions

- The condition must count **wire occurrences**.  If one bottom LTF is used in
  many middle gates, each use contributes to the relevant middle fan-in even
  though CTW later counts it only once as a distinct bottom gate.
- Gates of fan-in below \(M\) or \(S\) can be handled with their own ACW
  sampler and a padded seed.  There is no need to pad the gate itself.  If one
  does pad inputs with constants, its threshold must be adjusted to preserve
  the chosen tie convention.
- ACW handle every unweighted threshold \(\operatorname{TH}_\theta\).  Thus
  even-fan-in majority with ties accepted, strict majority, and gate-specific
  unweighted thresholds are all covered.
- Free NOT gates on wires are harmless affine substitutions over
  \(\mathbb F_2\).  This does not justify arbitrary weights in either majority
  layer; ACW Theorem 1.1 is being used for unweighted threshold functions.
- Polynomial-bit LTF weights are part of the algorithmic model.  Arbitrary
  real weights without finite descriptions do not define a finite input to
  the evaluator.

## 8. Is this already in the literature?

### What is explicitly present

1. **ACW Theorem 1.1** supplies exactly the degree, pointwise error, short
   seed, and constructibility needed here.
2. **ACW Section 7.3** explicitly shares one seed across many majority gates
   and uses a union bound.
3. **ACW Theorem 1.9 / Section 7.4** compose probabilistic representations at
   two majority/threshold levels, although their stronger \(6/5\)-fan-in SAT
   theorem uses a real probabilistic PTF at the top and remains randomized.
4. **CTW Lemma 5.3** supplies the deterministic exact evaluator for each fixed
   composed \(\mathbb F_2\) polynomial.
5. **CTW Theorem 5.4** shares one seed index between two separately built
   symmetric approximators and union-bounds their errors.

### Why the headline theorems do not literally subsume the statement

- ACW Theorem 1.8 is deterministic SAT for
  \(\mathrm{AC}^0[m]\circ\mathrm{LTF}\circ\mathrm{LTF}\) with a
  subquadratic bottom LTF layer.  A top majority is not an
  \(\mathrm{AC}^0[m]\) gate, and the present circuit has two majority layers
  above the bottom LTFs.
- ACW Theorem 1.9 is randomized SAT for a more expressive class under
  separate \(n^{6/5-\eta}\) fan-in bounds.  It covers some parameter choices
  here, but it is not a deterministic CAPP theorem and does not state the
  \(MS<n^2\) tradeoff.
- CTW Theorems 5.4 and 6.1 concern
  \(\oplus_2\circ\mathrm{SYM}\circ\mathrm{THR}\) and
  \(\oplus_2\circ\mathrm{THR}\circ\mathrm{THR}\), respectively.  Grouped
  majority-of-majority is generally neither a symmetric function nor a single
  LTF of the raw bottom outputs, so those are not syntactic containments.

For example, with three blocks of three raw bits, block-weight pattern
\((2,2,0)\) is accepted by majority-of-majorities while \((3,1,0)\) is rejected.
The function is invariant under all within-block and block permutations.  If
it had any LTF representation, averaging a strict separating hyperplane over
that symmetry group would give equal weight to every raw coordinate, which is
impossible because the accepted and rejected examples both have total weight
\(4\).

### Novelty assessment

I found no theorem in the inspected ACW or CTW papers with the exact form

\[
  \oplus_2\circ\mathrm{MAJ}_M\circ
  \mathrm{MAJ}_S\circ\mathrm{THR},\qquad MS\le n^{2-\varepsilon}.
\]

Targeted searches for that class and for a product-of-fan-ins CAPP statement
did not locate another primary-source statement.  This is not proof of
literature novelty.  More importantly, the derivation needs no new technical
ingredient beyond elementary probabilistic-polynomial composition and the two
published interfaces.  The conservative description is therefore:

> a useful, apparently unstated corollary/closure property of ACW Theorem 1.1
> and CTW Lemma 5.3.

## 9. What this does and does not advance

**It does prove:** a deterministic inverse-polynomial-error nontrivial CAPP
algorithm for a genuinely depth-3, pure-threshold subclass whose product of
the two majority fan-ins is subquadratic.

**It does not prove:**

1. deterministic SAT or exact counting for the original circuit;
2. CAPP for arbitrary weighted middle or top LTF gates;
3. CAPP once \(MS\) reaches \(n^{2+\Omega(1)}\), because the elementary
   composed degree becomes superlinear;
4. CAPP for unrestricted polynomial-size depth-3 \(\mathrm{TC}^0\), where the
   fan-in product can be an arbitrarily large polynomial;
5. a global seed whose sampled polynomial agrees with the circuit on every
   assignment.

The clean frontier exposed by the proof is degree, not seed length:

\[
  \operatorname{pdeg}(\mathrm{MAJ}_M\circ\mathrm{MAJ}_S)
  \le \widetilde O(\sqrt{MS}).
\]

Short shared seeds make deterministic enumeration cheap; CTW makes each fixed
polynomial countable.  Passing the quadratic product threshold would require a
better-than-black-box composition theorem or a stronger batch evaluator.
