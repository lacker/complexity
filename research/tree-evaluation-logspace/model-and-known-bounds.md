# Tree Evaluation: exact model and known space bounds

Research note, 2026-08-12.  This file is deliberately conservative about
epistemic status:

- **Theorem / definition** means the statement appears in the cited primary
  source.
- **Derived corollary** means it follows directly by substituting parameters
  into a cited theorem, but I did not find it stated in that form.
- **Interpretation** is an explanation of where a term in a bound comes from.

All logarithms are base two.  Write

\[
  \ell=\lceil\log k\rceil
\]

for the number of bits in a node value, and write \(N\) for the total bit
length of the explicitly represented Tree Evaluation instance.  Logarithms
such as \(\log\ell\) below should be read as \(\max\{1,\log\ell\}\), to avoid
irrelevant small-constant pathologies.

## 1. Exact problem and encoding

**Definition (Cook--McKenzie--Wehr--Braverman--Santhanam 2012).**  An instance
of \(FT_d^h(k)\) consists of a complete, balanced \(d\)-ary tree.  Every leaf
is labelled by an element of \([k]\).  Every internal node \(u\) is labelled
by an arbitrary, explicitly tabulated function

\[
  f_u:[k]^d\longrightarrow[k].
\]

The value at an internal node is its function applied to its children's
values.  The function problem asks for the root value.  The decision problem
\(BT_d^h(k)\) asks whether that value is 1.  The original paper defines height
as the number of levels, whereas most recent papers define height as the
root-to-leaf distance.  This changes \(h\) by one and has no asymptotic effect.

For fixed \(d\), the original paper's binary encoding has

\[
  N=\Theta(d^h k^d\log k).
\]

In the modern binary convention (\(d=2\), leaves at depth \(h\)), there are
\(2^h\) leaves and \(\Theta(2^h)\) internal tables.  Each table contains
\(2^{2\ell}=k^2\) outputs of \(\ell\) bits.  Consequently

\[
  N=\Theta(2^h\,2^{2\ell}\ell)
   =\Theta(2^h k^2\log k),
  \qquad
  \log N=\Theta(h+\ell).
\]

The exact first display is Equation (5) of the 2012 paper; the binary
\(\ell\)-bit display is also stated explicitly in Henzinger--Pyne--Ragavan
(2026).  In particular, the estimate \(N\approx4^h k^2\log k\) sometimes used
in informal descriptions is not the standard explicit-input size; its tree
factor should be \(2^h\), up to the height convention.

**Theorem (Cook et al. 2012, Theorem 7).**  The decision problem is in
\(\mathsf{LogDCFL}\), even when \(d\) is supplied as part of the input.  The
proof uses a deterministic logspace auxiliary pushdown automaton: the stack
holds the depth-first evaluation stack, while the ordinary work tape holds
the \(d\) child values of the current node.  Hence Tree Evaluation is in P.

The question ``TreeEval in L'' is normally about a deterministic logspace
transducer computing the root (or the corresponding decision version).
The node functions are not succinct circuits: their entire truth tables occur
in the read-only input.  Cook--Mertz's register programs are an intermediate,
uniform model and their final bounds are ordinary deterministic space bounds;
they are not bounds that hide an uncounted catalytic tape.

## 2. Baseline and progression of upper bounds

The ordinary depth-first algorithm retains one already-computed sibling value
at each level and therefore uses

\[
  O(h\ell+h+\ell)
\]

bits for a binary tree.  The original program hoped to prove that the
\(h\ell\) term was inherent, via branching-program lower bounds.  That
intuition is false for unrestricted algorithms.

**Theorem (Cook--Mertz 2020/2021, as summarized in Cook--Mertz 2024).**  Their
first catalytic-style ordinary-space algorithm uses roughly
\(O(h\log k/\log h)\) space in its main regime and gives the worst-case bound
\(O(\log^2N/\log\log N)\).

**Theorem (Cook--Mertz 2024, Theorems 10 and 15).**  For binary Tree
Evaluation,

\[
  S_{CM}(h,\ell)=O(\ell+h\log\ell).
\]

The paper first proves \(O((h+\ell)\log\ell)\) (Theorem 10), then reduces the
space occupied by the algebraic registers and obtains the displayed sharper
parameterized bound (Theorem 15).  Since \(\log N=\Theta(h+\ell)\), this is at
most \(O(\log N\log\log N)\).  Their explicit recursive register program has
worst-case running time \(N^{O(\log\log N)}\), so this is a pure-space result,
not a polynomial-time result.

**Theorem (Goldreich 2024, TR24-109).**  Goldreich gives a direct global-storage
and interpolation exposition of the same sharper shape

\[
  O(\ell+h\log\ell).
\]

For the \(d\)-ary generalization he isolates the bound

\[
  S_d(h,\ell)=O(d\ell+h\log(d\ell)).
\]

This improves the \(O((h+d\ell)\log(d\ell))\) form in Cook--Mertz's stated
general-arity theorem by avoiding multiplication of the global storage by the
per-level local-space factor.

**Theorem (Goldreich 2024, TR24-124, Theorem 2).**  For every integer block
height \(t\in[1,h]\), binary Tree Evaluation can be solved in

\[
  S_G(h,\ell;t)
   =O\!\left(h+2^t\ell+\frac{h}{t}\log\ell\right)
  \tag{G}
\]

space.  Taking, for example,
\(t=0.99\log\log\ell\), and using the Cook--Mertz bound in the small-height
edge cases, gives

\[
  S_G(N)
   =O\!\left(
       \frac{\log N\,\log\log N}{\log\log\log N}
     \right)
   =o(\log N\log\log N).
\]

This is the best published *ordinary deterministic space* bound I found.  The
result was independently observed earlier by Manuel Stoeckl; Goldreich credits
him explicitly.  Goldreich's ECCC report appeared in 2024 and the article
version appeared in a 2025 LNCS collection.

Thus the strongest useful parameterized summary is

\[
  S(h,\ell)=O\!\left(
    \min\left\{
      \ell+h\log\ell,
      \min_{1\le t\le h}
      \left(h+2^t\ell+\frac{h}{t}\log\ell\right)
    \right\}
  \right).
  \tag{*}
\]

## 3. Where every logarithmic factor comes from

### 3.1 Cook--Mertz

The clean-computation primitive starts with registers containing arbitrary
masks, adds a desired value to one output register, and restores every other
register.  An arbitrary node table is represented by low-degree polynomials.
An averaging/interpolation identity over a field \(K\) streams through
evaluations at multiplicatively shifted points and cancels every unwanted
positive-degree term.  This is what permits a child value to be temporarily
written over live storage and then erased.

The polynomial representing an arbitrary binary node function has degree
\(\Theta(\ell)\).  The interpolation field must have more elements than this
degree, so

\[
  |K|=\operatorname{poly}(\ell),
  \qquad \log|K|=\Theta(\log\ell).
\]

Cook--Mertz's Proposition 4 converts a uniform register program of length
\(T\), with \(q\) registers over \(K\), to ordinary space

\[
  O(\log T+q\log|K|+\text{uniformity space}).
\]

For their sharper Theorem 15, labels are split into symbols over a subfield
\(F=\mathbb F_{2^r}\), with \(r\asymp\log\ell\), while the working field is a
constant-degree extension \(K=\mathbb F_{2^{rs}}\), \(s=O(1)\).  Therefore:

- there are \(q=\Theta(\ell/r)\) live registers, so their contents cost
  \(q\log|K|=\Theta(\ell)\) bits;
- each tree level multiplies the register-program length by
  \(|K|^{O(1)}=\ell^{O(1)}\), so
  \(\log T=O(h\log\ell+\ell)\).

**Interpretation.**  The remaining \(\log\ell\) is no longer the cost of
storing each of \(h\) ordinary child values.  It is the number of bits needed
to identify an interpolation iteration / position in a polynomial-length
per-level expansion.  The field-symbol trick already reduces the actual
algebraic register contents to \(O(\ell)\) total bits.

### 3.2 Goldreich's height compression

Group \(t\) consecutive binary levels into one supernode.  The new tree has
height \(h/t\) and arity \(d=2^t\).  Substitution in the generalized bound
gives

\[
  d\ell+\frac ht\log(d\ell)
  =2^t\ell+\frac ht(t+\log\ell)
  =h+2^t\ell+\frac ht\log\ell,
\]

which is (G).  The three terms have distinct sources:

- \(h\): node-addressing overhead, including
  \((h/t)\log d=(h/t)t\);
- \(2^t\ell\): the generalized clean procedure keeps one \(\ell\)-bit global
  vector for each of the \(d=2^t\) children;
- \((h/t)\log\ell\): one interpolation-loop index of
  \(\Theta(\log\ell)\) bits for each compressed recursive level.

For the balanced hard regime \(h=\Theta(\ell)\), increasing \(t\) reduces the
last term linearly but increases child storage exponentially.  The crossover
is at \(t=\Theta(\log\log\ell)\), leaving

\[
  O\!\left(\ell\frac{\log\ell}{\log\log\ell}\right).
\]

Since then \(\ell=\Theta(\log N)\), the numerator \(\log\ell\) becomes
\(\log\log N\) and the height-compression gain \(\log\log\ell\) becomes
\(\log\log\log N\).  This precisely accounts for every iterated logarithm in
the record bound.  Within this implementation, eliminating the remaining
factor means avoiding the tradeoff ``one small local interpolation counter per
compressed level versus \(2^t\) simultaneously represented children.''

## 4. Parameter regimes already in L

This matters because some informal problem statements propose fixed \(k\) as
an open warm-up.  It is not open.

**Theorem / explicit observation (Cook et al. 2012, Introduction).**  For every
constant \(k=k_0\ge2\), \(BT_d(h,k_0)\) is an easy generalization of balanced
Boolean Formula Value and is in \(\mathsf{NC}^1\), hence in L.  Directly, the
ordinary depth-first algorithm uses \(O(h\log k_0)=O(h)=O(\log N)\) bits.

**Theorem (Cook--Mertz 2024, Theorem 16).**  TreeEval is in L whenever

\[
  h\le \frac{\log k}{\log\log k}
   =\frac{\ell}{\log\ell}.
\]

Indeed, \(\ell+h\log\ell=O(\ell)=O(h+\ell)=O(\log N)\).  This includes every
constant-height family and a much larger short-tree regime.

**Derived corollary from Goldreich's Theorem 2.**  For every fixed constant
\(\delta>0\), TreeEval is also in L in the very-tall-tree regime

\[
  h\ge \ell^{1+\delta}=(\log k)^{1+\delta}.
\]

To see this, take \(t=\lfloor\delta\log\ell\rfloor\) in (G).  Then
\(2^t\ell\le\ell^{1+\delta}\le h\) and
\((h/t)\log\ell=O_\delta(h)\), so the total is
\(O_\delta(h)=O(\log N)\).  A particularly simple instance is
\(h\ge\ell^2\), using \(t=\lfloor\log\ell\rfloor\).

The last corollary is a parameter substitution, not a separately advertised
theorem in Goldreich's note.  It requires a *fixed* polynomial gap.  It does
not cover \(h=\ell^{1+o(1)}\) uniformly.

Consequently, the cleanest currently unresolved window is roughly

\[
  \omega(\ell/\log\ell)
  \ \le h\le\
  \ell^{1+o(1)}.
\]

with the canonical worst-balanced case \(h=\Theta(\ell)=\Theta(\log k)\).
That is the regime an attempted full logspace proof must genuinely address.

## 5. Relevant 2025--2026 work: what changes and what does not

**Theorem (Henzinger--Pyne--Ragavan 2026, Theorem 1.1 / Corollary 3.2).**  For
every fixed \(\varepsilon>0\), binary TreeEval can be solved in polynomial time
using

\[
  O(h+\ell)=O(\log N)\text{ free bits}
  \quad\text{and}\quad
  \exp(O(\ell^\varepsilon))
   =2^{O(\log^\varepsilon N)}
  \text{ catalytic bits}.
\]

The catalytic tape starts in an arbitrary state, may be modified, and must be
restored at the end.  It is a real additional resource.  Therefore this result
does **not** place TreeEval in ordinary L: counting the catalytic tape as normal
space gives a subpolynomial, not logarithmic, bound.  The construction replaces
finite-field interpolation by a matching-vector / private-information-retrieval
mechanism and provides a genuinely new possible attack surface.  The same paper
explicitly still identifies Cook--Mertz plus the Stoeckl--Goldreich
\(\log\log\log N\) improvement as the lowest ordinary-space procedure.

**2025 consequences, not improvements to TreeEval.**  Williams (STOC 2025)
uses Cook--Mertz Tree Evaluation inside the simulation
\(\mathrm{TIME}[T]\subseteq\mathrm{SPACE}[O(\sqrt{T\log T})]\).  Shalunov
(ECCC TR25-078) gives a direct reduction from size-\(S\) circuit evaluation to
a TreeEval instance with \(h,\ell=O(\sqrt S)\), yielding
\(O(\sqrt{S\log S})\) circuit-evaluation space.  These amplify the importance
of a logspace TreeEval algorithm but do not improve the general TreeEval space
bound itself.

**Withdrawn claim (must not be used).**  Asadi--Cleve, arXiv:2604.02606,
claimed a polynomial-time \(O(\log^{1+\varepsilon}N)\)-space catalytic-pebbling
algorithm.  The authors withdrew the paper on 7 April 2026 because the degree
of the polynomial associated with each subtree was miscalculated; the claimed
polynomial running time does not follow.  It is not part of the known record.

## 6. Primary sources

- Stephen Cook, Pierre McKenzie, Dustin Wehr, Mark Braverman, and Rahul
  Santhanam, [*Pebbles and Branching Programs for Tree Evaluation*](https://doi.org/10.1145/2077336.2077337),
  ACM TOCT 3(2), 2012.  [Author PDF](https://www.cs.toronto.edu/~sacook/homepage/pebbles2.pdf).
- James Cook and Ian Mertz,
  [*Tree Evaluation Is in Space \(O(\log n\cdot\log\log n)\)*](https://eccc.weizmann.ac.il/report/2023/174/),
  ECCC TR23-174 / STOC 2024.  [STOC DOI](https://doi.org/10.1145/3618260.3649664);
  [SICOMP journal version](https://doi.org/10.1137/24M1690126), 2025.
- Oded Goldreich,
  [*On the Cook--Mertz Tree Evaluation Procedure*](https://eccc.weizmann.ac.il/report/2024/109/),
  ECCC TR24-109, 2024.
- Oded Goldreich,
  [*Solving Tree Evaluation in \(o(\log n\cdot\log\log n)\) Space*](https://eccc.weizmann.ac.il/report/2024/124/),
  ECCC TR24-124, 2024; article version 2025.
- Ryan Williams,
  [*Simulating Time With Square-Root Space*](https://arxiv.org/abs/2502.17779),
  STOC 2025.
- Yakov Shalunov,
  [*Improved Bounds on the Space Complexity of Circuit Evaluation*](https://eccc.weizmann.ac.il/report/2025/078/),
  ECCC TR25-078, 2025.
- Alexandra Henzinger, Edward Pyne, and Seyoon Ragavan,
  [*Catalytic Tree Evaluation From Matching Vectors*](https://eccc.weizmann.ac.il/report/2026/022/),
  ECCC TR26-022, 2026.
- Vahid R. Asadi and Richard Cleve,
  [withdrawn arXiv:2604.02606](https://arxiv.org/abs/2604.02606), 2026.  The
  withdrawal notice identifies the polynomial-degree error.
