# Sparse-wire threshold SAT: reconstruction and parameter audit

Last updated: 2026-08-12

## Status and headline

**Established:** Chen--Santhanam--Srinivasan (CSS) give a randomized
better-than-brute-force SAT algorithm for depth-\(d\) LTF circuits with
\(n^{1+\varepsilon_d}\) wires.  The parameters actually used in their proof
are

\[
  \varepsilon_d=B^{-(2d-1)},\qquad
  \delta_d=B\varepsilon_d,
\]

for one sufficiently large absolute constant \(B\).  Thus the wire surplus
falls by a factor \(B^2\) per layer.  At depth three the published proof
handles

\[
  W\le n^{1+B^{-5}},
\]

not an arbitrary polynomial number of wires.

**Important nomenclature correction:** CSS Theorem 6.4 is formally stated as
a satisfiability theorem, not a counting theorem.  Its algorithm is
zero-error in spirit: it explicitly checks bad restriction leaves and
enumerates all exceptions caused by replacing biased gates.  Later papers
describe it as a zero-error algorithm and, in one case, as extending to
exact counting.  A completely explicit published exact-counting theorem for
the same LTF regime is obtained by specializing Kabanets--Lu's PTF
\(\#\mathrm{SAT}\) theorem to degree one.  Claims below say SAT or
\(\#\mathrm{SAT}\) according to what the cited theorem literally states.

**Derived:** CSS's proof of its single-gate restriction lemma supports the
explicit parameters

\[
  t=p^{-1/16},\qquad
  \Pr[\text{\(t\)-balanced after a \(p\)-restriction}]
       =O(p^{1/8}).
\]

Their asymptotic theorem statement hides these constants.

**Derived improvement:** Re-optimizing exactly the same critical-index proof
gives the stronger, self-contained statement

\[
  t=p^{-1/6},\qquad
  \Pr[\text{\(t\)-balanced}]
       =O\!\left(p^{1/3}\log^2(1/p)\right).
\]

Also, changing CSS's \(n^{\varepsilon_d}\)-ratio fan-in buckets to dyadic
buckets removes an avoidable factor \(n^{\varepsilon_d}\) from the
balanced-wire bound.  On the restriction/simplification side, these two
changes lower the required parameter separation from roughly \(B>32\) to
\(B>6\).  This is a proof-level quantitative sharpening, not a published
theorem I found.  The full SAT theorem may require a larger \(B\) to absorb
the base-case algorithm.

**Bottom line:** This pass did not produce SAT for polynomial-size depth-3
\(\mathrm{TC}^0\).  The restriction framework remains intrinsically a
near-linear-wire method.  It did expose two concrete sharpenings and a
plausible hybrid with the Tamaki depth-2 counting algorithm.  The hybrid
appears to yield a better explicit depth-3 sparse-wire constant, but still
does not approach arbitrary polynomial size and needs a full counting
bookkeeping audit before being claimed as a theorem.

## 1. Primary sources

1. Ruiwen Chen, Rahul Santhanam, and Srikanth Srinivasan,
   [Average-Case Lower Bounds and Satisfiability Algorithms for Small
   Threshold Circuits](https://theoryofcomputing.org/articles/v014a009/),
   Theory of Computing 14(9), 2018; CCC 2016 special issue.  The exact
   theorem, restriction lemmas, depth reduction, and SAT sketch below are
   from the journal paper and its official LaTeX source.
2. R. Ryan Williams,
   [New Algorithms and Lower Bounds for Circuits With Linear Threshold
   Gates](https://theoryofcomputing.org/articles/v014a017/), Theory of
   Computing 14(17), 2018.  CSS use its
   \(\mathrm{ACC}^0\circ\mathrm{THR}\) SAT/counting algorithm as the base
   case.  It also gives \(0\)-\(1\) ILP feasibility in
   \(2^{n-\Omega(n/\log^4(sM\log n))}\operatorname{poly}(s,n,M)\) time.
3. Suguru Tamaki,
   [A Satisfiability Algorithm for Depth Two Circuits with a Sub-Quadratic
   Number of Symmetric and Threshold Gates](https://eccc.weizmann.ac.il/report/2016/100/download),
   ECCC TR16-100.  For \(N\) variables and \(G\) gates it exactly counts in
   time
   \[
     2^{N-\Omega((N/(\sqrt G\,\operatorname{polylog}N))^{a_T})}
   \]
   for an absolute constant \(a_T>0\).
4. Valentine Kabanets and Zhenjian Lu,
   [Satisfiability and Derandomization for Small Polynomial Threshold
   Circuits](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.APPROX-RANDOM.2018.46),
   APPROX/RANDOM 2018; full version ECCC TR18-115.  This gives a formal
   zero-error exact-counting recurrence extending CSS to sparse PTF gates.
5. Swapnam Bajpai, Vaibhav Krishan, Deepanshu Kush, Nutan Limaye, and
   Srikanth Srinivasan,
   [A #SAT Algorithm for Small Constant-Depth Circuits with PTF
   Gates](https://eccc.weizmann.ac.il/report/2018/162/), ECCC TR18-162;
   journal version Algorithmica 84 (2022).  This removes the monomial
   sparsity restriction for constant-degree PTF gates, but does not make
   the wire exponent dense.
6. Roei Tell,
   [Quantified Derandomization of Linear Threshold
   Circuits](https://eccc.weizmann.ac.il/report/2017/145/), ECCC TR17-145 /
   STOC 2018.  This is a useful comparison point but is a promise
   derandomization theorem, not SAT.
7. Daniel Kane and R. Ryan Williams,
   [Super-Linear Gate and Super-Quadratic Wire Lower Bounds for Depth-Two
   and Depth-Three Threshold Circuits](https://arxiv.org/abs/1511.07860),
   STOC 2016.  CSS Section 9 reconstructs their restriction phenomenon via
   a strengthened small-junta imbalance lemma.

## 2. Model and depth convention

An LTF is

\[
  \phi(x)=\operatorname{sgn}\!\left(\sum_i w_i x_i-\theta\right).
\]

CSS count wires, not gates.  A depth-\(d\) threshold circuit has \(d\)
layers of LTF gates; depth one is a single LTF and depth three is
\(\mathrm{THR}\circ\mathrm{THR}\circ\mathrm{THR}\).  Their algorithm assumes
integer weights and thresholds of polynomial bit complexity.  This is
without loss for an individual Boolean LTF and is needed for an algorithmic
statement.

A \(p\)-random restriction \(\rho\sim\mathcal R_p^n\) independently leaves
each variable alive with probability \(p\), and otherwise fixes it to a
uniform random sign.

If the restricted gate is labeled by \((w',\theta')\), it is
\(t\)-balanced when

\[
  |\theta'|\le t\lVert w'\rVert_2.
\]

Otherwise it is \(t\)-imbalanced.  Hoeffding immediately implies that an
imbalanced gate disagrees with its more likely constant on at most
\(\exp(-\Omega(t^2))\) of the remaining inputs.

## 3. The CSS single-gate restriction theorem

### 3.1 Published statement

**Theorem (CSS Lemma 4.4).**  There is an absolute \(p_0>0\) such that for
every LTF \(\phi\) and \(p\le p_0\),

\[
  \Pr_{\rho\sim\mathcal R_p^n}
  [\phi|_\rho\text{ is }p^{-\Omega(1)}\text{-balanced}]
  \le p^{\Omega(1)}.
\]

This is deliberately qualitative in the paper's statement.

### 3.2 Exact parameters present in the proof

**Derived directly from the CSS proof.**  CSS set

\[
  \eta=p^{1/8},\qquad t=p^{-1/16},
  \qquad L=100\log^2(1/\eta)/\eta^2.
\]

Their regular-case lemma says that, for an \(\eta\)-regular weight vector,

\[
  \Pr[\text{\(t\)-balanced}]
  \le O(t\sqrt p+\eta).
\]

For critical index \(K\le L\), the probability that any of the first \(K\)
coordinates survives is at most

\[
  pK\le pL=\widetilde O(p^{3/4}),
\]

and, conditioned on none surviving, the remaining weight vector is
\(\eta\)-regular.  The regular-case probability is

\[
  O(p^{7/16}+p^{1/8})=O(p^{1/8}).
\]

For \(K>L\), their critical-index proposition makes the gate
\(1/\eta\)-imbalanced except with probability at most
\(\eta^{10}\), after the first \(L\) coordinates are assigned.  Since
\(t\le1/\eta\), this also bounds the \(t\)-balanced event.  Including the
head-survival event gives

\[
  \boxed{\quad t=p^{-1/16},\qquad q:=\Pr[t\text{-balanced}]
      =O(p^{1/8}).\quad}
\]

Consequently, a typical imbalanced gate is approximated by a constant with
error

\[
  \exp(-\Omega(t^2))=\exp(-\Omega(p^{-1/8})).
\]

## 4. CSS depth reduction, exactly reconstructed

CSS define, for a sufficiently large absolute \(B>2\),

\[
  \varepsilon_d=B^{-(2d-1)},\qquad
  \delta_d=B\varepsilon_d.
\]

Thus

\[
  \varepsilon_{d-1}=B^2\varepsilon_d.
\]

Let \(C\) have depth \(d\), \(n\) variables, and
\(W\le n^{1+\varepsilon_d}\) wires.

### Phase 1: bounded read

Set at most \(n/2\) variables so that each remaining variable feeds at most

\[
  2c=2n^{\varepsilon_d}
\]

bottom gates.  This is just Markov's inequality applied to variable read
counts.  Every leaf of this first restriction tree has this read bound.

### Phase 2: random restriction and fan-in bins

Call a bottom gate large if its fan-in is at least \(n^{\delta_d}\).
There are at most

\[
  n^{1+\varepsilon_d-\delta_d}\le n
\]

large gates.  Apply

\[
  p=n^{-\delta_d/2}.
\]

For each large gate, CSS have \(t=p^{-\Omega(1)}\) and
\(q=p^{\Omega(1)}\) such that it is \(t\)-balanced with probability at most
\(q\).  The proof-level choices from the preceding section are

\[
  t=n^{\delta_d/32},\qquad q=O(n^{-\delta_d/16}).
\]

Condition on a generic live-variable set \(I\): it has at least \(pn/4\)
variables after Phase 1, and every large gate retains at most twice its
expected fan-in.  The failure probability of genericity is at most
\(\exp(-n^{\delta_d/4})\).

For the exponentially reliable depth-reduction lemma, CSS put large gates
into at most \(1/\varepsilon_d\) bins.  Bin \(j\) contains gates whose
original fan-in is in

\[
  [n^{\delta_d+(j-1)\varepsilon_d},
    n^{\delta_d+j\varepsilon_d}).
\]

The indicators that the restricted gates are balanced are read-
\(2n^{\varepsilon_d}\) random variables.  A bounded-read Chernoff bound
therefore gives

\[
  \Pr[Z_j\ge2q\ell_j]
    \le\exp(-\Omega(q\ell_j/n^{\varepsilon_d})).
\]

If \(\ell_j<n^{3\delta_d/4}\), CSS simply retain all potentially balanced
gates in that bin.  Otherwise Chernoff makes
\(Z_j\le2q\ell_j\) except with probability
\(\exp(-2n^{\varepsilon_d})\).

### Phase 3: remove, retain, and simplify

On a good leaf:

1. Replace every imbalanced large gate by its likely constant.  The total
   approximation error is at most
   \[
     n\exp(-n^{\Omega(\delta_d)})
       \le\exp(-n^{\varepsilon_d}).
   \]
2. For dense fan-in bins, set every variable feeding a balanced gate.
   CSS's bin width contributes an extra \(n^{\varepsilon_d}\), giving the
   bound
   \[
     \frac{4pq\,n^{1+2\varepsilon_d}}{\varepsilon_d}
   \]
   on the number of balanced surviving wires to remove.
3. Sparse bins leave at most
   \[
     (1/\varepsilon_d)n^{3\delta_d/4}\le n^{\delta_d}
   \]
   balanced gates.  Their output values are guessed later.
4. The original small-fan-in gates have fan-in at most
   \(n^{\delta_d}\).  The circuit is read-\(2n^{\varepsilon_d}\), so the
   independent-set proposition leaves a set of variables on which each
   small gate depends on at most one variable.

At least

\[
  m\ge n^{1-2\delta_d}
\]

variables survive.  The resulting circuit is
\(\exp(-n^{\varepsilon_d})\)-approximated by an

\[
  (n^{\delta_d},\,d-1,\,n^{1+\varepsilon_d})\text{-simple}
\]

circuit: after fixing the outputs of at most \(n^{\delta_d}\) residual LTFs,
the exceptional circuit has depth \(d-1\).

The probability of a bad leaf is at most
\(\exp(-n^{\varepsilon_d})\).  This is CSS Lemma 4.11.

### Exact wire renormalization

To invoke the induction hypothesis on \(m\) variables, CSS need

\[
  n^{1+\varepsilon_d}\le m^{1+\varepsilon_{d-1}}.
\]

It suffices that

\[
  \frac{1+\varepsilon_d}{1-2\delta_d}
     \le1+\varepsilon_{d-1}.
\]

Substituting \(\delta_d=B\varepsilon_d\) and
\(\varepsilon_{d-1}=B^2\varepsilon_d\), this reduces to

\[
  1+\varepsilon_d
   \le(1-2B\varepsilon_d)(1+B^2\varepsilon_d).
\]

For \(d\ge2\), \(B\ge3\) already suffices for this particular inequality.
The much larger required \(B\) comes from balanced-wire cleanup, not from
wire renormalization.

## 5. Reconstructed SAT recurrence

CSS only sketch Theorem 6.4, so the following recurrence is **derived** from
Lemma 4.11 and the algorithmic discussion.

Let \(T_d(n,t)\) be the worst randomized running time for a depth-\(d\)
\(\mathrm{AND}\circ\mathrm{THR}\)-skew instance with \(n\) variables and
\(t\) accumulated LTF side constraints.  Put

\[
  m=n^{1-2\delta_d}.
\]

Ignoring polynomial factors and harmless changes to \(t\),

\[
\begin{split}
T_d(n,t)\ \lesssim
  2^{n-m}\big(
      2^{n^{\delta_d}}T_{d-1}(m,t+O(n))
      +2^{m-n^{\Omega(\varepsilon_d)}}
    \big)
  +2^{n-n^{\varepsilon_d}}.
\end{split}
\]

The three terms are, respectively:

1. all good restriction leaves, all guesses for the residual balanced
   gates, and a recursive call;
2. enumeration of all minority assignments lost when imbalanced gates are
   replaced by constants;
3. brute force on the exponentially rare bad leaves.

The base case is conjunctions of LTFs.  Williams supplies

\[
  T_1(m,\operatorname{poly}(n))
    \le2^{m-m^{\eta_0}}\operatorname{poly}(n)
\]

for a fixed \(\eta_0>0\); for decision SAT, his \(0\)-\(1\) ILP theorem gives
the stronger near-linear saving \(m/\operatorname{polylog}m\) for
polynomially many constraints.

The recursive saving is

\[
  m^{\varepsilon_{d-1}}
   \ge n^{(1-2\delta_d)\varepsilon_{d-1}}
   =n^{(1-2B\varepsilon_d)B^2\varepsilon_d},
\]

whereas guessing residual gates costs \(2^{n^{B\varepsilon_d}}\).  For
large \(B\), the former exponent is much larger than the latter.  Bad
leaves and minority enumeration each cost at most
\(2^{n-n^{\Omega(\varepsilon_d)}}\).  This yields

\[
  T_d(n,0)=2^{n-n^{\Omega(\varepsilon_d)}}\operatorname{poly}(n).
\]

### Counting subtlety

For SAT, enumerating minority assignments and stopping when a witness is
found is immediate.  Exact counting requires disjointness or deduplication:
minority sets for different gates can overlap, and the majority region must
include constraints asserting that every replaced gate takes its chosen
value.  Kabanets--Lu make this recurrence explicitly count-preserving by
partitioning on residual gate values and carrying the old gate predicates
as skew side constraints.  This is the cleanest primary source for the
formal \(\#\mathrm{SAT}\) version.

## 6. Depth three: exact ledger and bottleneck

For \(d=3\), CSS use

\[
  \varepsilon_3=B^{-5},\qquad
  \delta_3=B^{-4},\qquad
  p=n^{-B^{-4}/2}.
\]

The resulting ledger is:

| quantity | exponent in the original \(n\) |
|---|---:|
| input wires | \(1+B^{-5}\) |
| live variables after one layer | at least \(1-2B^{-4}\) |
| gates whose values may be guessed | at most \(B^{-4}\) |
| explicit CSS imbalance \(t\) | \(B^{-4}/32\) |
| explicit CSS balance probability \(q\) | \(-B^{-4}/16\) |
| constant-approximation error exponent \(t^2\) | \(B^{-4}/16\) |
| next-layer wire allowance | \(1+B^{-3}\) |

The decisive inequality in the published bucketing calculation is

\[
  p q\, n^{1+2\varepsilon_3}
     \ll pn,
\]

or, with the explicit \(q=p^{1/8}\),

\[
  2\varepsilon_3<\delta_3/16.
\]

Thus the restriction part wants \(B>32\).  The base-case saving may force
an even larger \(B\).  If one illustratively used \(B=33\), then

\[
  \varepsilon_3=33^{-5}\approx2.55\cdot10^{-8}.
\]

The theorem does not state a numerical \(B\), so this number is only an
illustration of how conservative the displayed proof parameters are.

### Why this does not approach polynomial-size depth-3 TC0

Write the wire count as \(n^{1+\alpha}\) and keep a
\(p=n^{-r}\) fraction of variables.  Suppose a restriction theorem makes a
gate balanced with probability at most \(q=n^{-vr}\).  Even with ideal
fan-in bucketing, balanced-wire cleanup requires

\[
  p q\,n^{1+\alpha}\ll pn,
\]

hence

\[
  \boxed{\alpha<vr.}
\]

One must have \(r<1\) to leave \(n^{\Omega(1)}\) variables.  The optimized
critical-index argument below has \(v\le1/3\) while retaining a polynomial
imbalance parameter.  Therefore this entire template cannot even pass
\(\alpha=1/3\), before accounting for small-gate cleanup, recursive
renormalization, residual-gate branching, or the base algorithm.  Arbitrary
polynomial-size depth-3 circuits may have \(n^K\) wires for any fixed \(K\).
This is the central quantitative wall.

There is also a read bottleneck.  Phase 1 leaves read
\(n^\alpha\).  Eliminating gates of fan-in at most \(n^f\) by an independent
set costs a factor \(n^{\alpha+f}\) in live variables.  For \(\alpha\) not
small, this step alone destroys the recursive instance.

## 7. Later extensions and what they do not improve

### 7.1 Kabanets--Lu: exact counting for sparse PTFs

**Established.**  Kabanets--Lu give a zero-error exact-counting algorithm
for depth-\(d\) circuits whose gates are
\(n^{2-1/c}\)-sparse PTFs and whose wire complexity is
\(n^{1+\epsilon_d}\), with

\[
  \epsilon_d=c^{-3^d}
\]

after their theorem-level reparameterization.  The full proof sets

\[
  \epsilon_d=E^{-3^{d-1}},\qquad
  \beta_d=E\epsilon_d.
\]

Its simplification lemma leaves \(n^{1-2\beta_d}\) variables, at most
\(n^{\beta_d}\) non-concentrated bottom gates, and fails with probability
\(\exp(-n^{\epsilon_d})\).

Their exact recurrence is

\[
\begin{split}
T(d,n,t,s)\le&
 2^{n-n^{1-2\beta_d}}\,2^{n^{\beta_d}}\,
 T(d-1,n^{1-2\beta_d},t+2n,s)\\
&+\operatorname{poly}(n)\,
 2^{n-n^{\Omega(\beta_d^3)}}.
\end{split}
\]

For low-degree gates they obtain better parameters.  Their proof-level
settings are

\[
  \epsilon_{d,\Delta}=(E\Delta)^{-(2d-1)},\qquad
  \beta_{d,\Delta}=E\Delta^2\epsilon_{d,\Delta}.
\]

At \(\Delta=1\), this is the clean formal exact-counting version of the CSS
LTF regime.  It extends gate expressiveness; it does not increase general
LTF wire density beyond \(n^{1+2^{-O(d)}}\).

### 7.2 Bajpai--Krishan--Kush--Limaye--Srinivasan: arbitrary
constant-degree PTFs

**Established.**  This work removes Kabanets--Lu's subquadratic monomial
sparsity restriction for constant-degree \(k\)-PTF gates.  It again keeps
only a slightly superlinear number of wires.

With large absolute constants \(A,B\), it sets

\[
 \zeta=\min(1,A/(2Bk^2)),\qquad
 \beta_i=A\epsilon_i,\qquad
 \epsilon_i=\left(\frac{\zeta}{10A(k+1)}\right)^i
 \quad(2\le i\le d).
\]

Its simplification leaves \(n^{1-2\beta_d}\) variables, at most
\(n^{\beta_d}\) non-biased gates, and has bias error

\[
  \delta=\exp(-n^{\beta_d/(Bk^2)}).
\]

The final saving exponent is

\[
  \epsilon_{k,d}
   =\frac{\zeta\epsilon_d}{2(k+1)}.
\]

This is a major extension in gate type and makes exact counting explicit,
but for \(k=1\) it does not yield a denser LTF circuit class.

### 7.3 Tell: stronger promise, not SAT

**Established.**  Tell handles depth-\(d\) LTF circuits with
\(n^{1+\exp(-d)}\) wires in almost-polynomial time under the promise that
one output value occurs on at most

\[
  2^{n^{1-1/(5d)}}
\]

inputs.  The algorithm identifies the majority value.  Tell also proves
that improving the wire exponent to \(1+O(1/d)\), with appropriate running
time, would bootstrap to standard TC0 derandomization.  This is highly
relevant structurally but does not decide SAT, where the accepting set may
have arbitrary density.

### 7.4 Tamaki and Alman--Chan--Williams: denser depth two only

**Established.**  Tamaki exactly counts depth-2 circuits with a
subquadratic number of symmetric/LTF gates.  Alman--Chan--Williams handle
classes such as
\(\mathrm{AC}^0[m]\circ\mathrm{LTF}\circ\mathrm{LTF}\) with a
subquadratic bottom LTF layer.  These are substantially denser results, but
they do not compose automatically through an arbitrary LTF top layer.  A
possible one-step composition with CSS is analyzed in Section 10.

I found no later primary-source theorem that raises the wire exponent for
general depth-\(d>2\) LTF SAT above the qualitative
\(n^{1+2^{-O(d)}}\) regime.  Later results extend the gate type, improve a
promise problem, or handle denser depth-two classes.

## 8. Derived sharpening I: optimize the critical-index lemma

This subsection is a **complete derived calculation using only CSS Lemma
5.5 and Proposition 5.6**.  I did not find it stated in this form in a
source.

Let

\[
  \eta=p^a,\qquad t=p^{-b},\qquad
  L=100\log^2(1/\eta)/\eta^2.
\]

The same CSS case split gives four error terms:

\[
  pL=\widetilde O(p^{1-2a}),\quad
  t\sqrt p=p^{1/2-b},\quad
  \eta=p^a,\quad
  \eta^{10}=p^{10a}.
\]

The high-critical-index case requires \(t\le1/\eta\), so \(b\le a\).
Therefore

\[
  \Pr[t\text{-balanced}]
  \le\widetilde O\!\left(
       p^{\min\{1-2a,\;1/2-b,\;a\}}
     \right).
\]

Choose

\[
  a=\frac13,\qquad b=\frac16.
\]

Then every displayed exponent is at least \(1/3\), and

\[
  \boxed{
  \Pr_{\rho\sim\mathcal R_p^n}
  [\phi|_\rho\text{ is }p^{-1/6}\text{-balanced}]
  \le O(p^{1/3}\log^2(1/p)).
  }
\]

The imbalanced gate's minority density is

\[
  \exp(-\Omega(p^{-1/3})).
\]

Within this exact critical-index template, \(1/3\) is optimal: balancing
the unavoidable regularity error \(p^a\) with the probability
\(pL\approx p^{1-2a}\) forces \(a=1/3\).  To get a balance probability
closer to \(p^{1/2}\), one needs either a small-junta conclusion (CSS
Section 9) or a new way to avoid the surviving-heavy-coordinate event.

## 9. Derived sharpening II: use dyadic fan-in buckets

CSS use buckets with multiplicative width \(n^{\varepsilon_d}\).  That is
why their balanced-wire total has \(n^{1+2\varepsilon_d}\) rather than the
actual wire budget \(n^{1+\varepsilon_d}\).

**Derived replacement.**  Bucket the large gates by powers of two.  If
bin \(j\) contains gates of original fan-in in \([F_j,2F_j)\), genericity
ensures each restricted gate has fan-in at most \(4pF_j\).  On a good bin,
\(Z_j\le2q\ell_j\), so its balanced surviving wires are at most

\[
  8pq\,\ell_jF_j
   \le 8pq\,W_j,
\]

where \(W_j\) is the original wire mass in that bin.  Summing over
\(O(\log n)\) bins gives

\[
  O(pqW),
\]

with no \(n^{\varepsilon_d}\) loss.

The bounded-read Chernoff argument still works.  There are only
\(O(\log n)\) bins, so the union bound preserves exponential failure.
Bins with fewer than \(n^{3\delta_d/4}\) gates leave at most

\[
  O(\log n)n^{3\delta_d/4}\le n^{\delta_d}
\]

residual gates.

Combine dyadic buckets with the optimized single-gate lemma.  With

\[
  p=n^{-\delta_d/2},\quad
  q=n^{-\delta_d/6+o(1)},\quad
  t=n^{\delta_d/12},
\]

the main checks become:

1. balanced wires fit:
   \[
     pq\,n^{1+\varepsilon_d}\ll pn
     \quad\Longleftrightarrow\quad
     \varepsilon_d<\delta_d/6;
   \]
2. constant approximation is accurate enough:
   \[
     t^2=n^{\delta_d/6}\ge n^{\varepsilon_d};
   \]
3. dense-bin Chernoff exponent:
   \[
     3\delta_d/4-\delta_d/6-\varepsilon_d
       =7\delta_d/12-\varepsilon_d
       \ge\varepsilon_d;
   \]
4. generic-live-set failure:
   \[
     \delta_d/4\ge\varepsilon_d.
   \]

Thus \(\delta_d=B\varepsilon_d\) needs only \(B>6\) on the
restriction/simplification side.  The small-gate and wire-renormalization
checks need only \(B\ge3\).

**Candidate consequence, not yet promoted to a theorem:** the CSS
simplification lemma should go through with any fixed \(B>6\), using the
same schedule

\[
  \varepsilon_d=B^{-(2d-1)}.
\]

For decision SAT, the near-linear-saving \(0\)-\(1\) ILP base case appears
strong enough that \(B=7\) is plausible.  For exact counting, Williams's
stated \(\mathrm{ACC}^0\circ\mathrm{THR}\) exponent is not numerically
specified; the full recurrence requires

\[
  (1-2/B^2)\eta_0>1/B^2
\]

for its base exponent \(\eta_0\).  A complete write-up should retain
\[
  B>\max\{6,\sqrt{2+1/\eta_0}\}
\]
with slack.

## 10. Candidate hybrid: one CSS reduction followed by Tamaki

This is the most promising quantitative composition found in this pass.
It is a **candidate theorem**, not an established result.

Suppose the input is a depth-3 LTF circuit with

\[
  W=n^{1+\alpha}
\]

wires.  Use a \(p=n^{-r}\) restriction and call fan-in at least \(n^f\)
large.  With the optimized constant-approximation lemma and dyadic bins,
the exponent constraints are:

\[
\begin{array}{ll}
\text{balanced-wire cleanup:}& \alpha<r/3,\\
\text{large-gate concentration:}& f>r,\\
\text{live variables:}&
   N=n^\lambda,\quad \lambda=1-r-\alpha-f,\\
\text{read-\(n^\alpha\) Chernoff:}&
   h>\alpha+r/3,
\end{array}
\]

where \(n^h\) is an upper bound on the residual balanced gates to branch
on.  The error and bad-leaf savings can be kept \(n^{\Omega(\alpha)}\).

After fixing residual bottom-gate outputs, the exceptional circuit has
depth two.  The accumulated LTF side constraints can be flattened into
the top LTF: if

\[
  F(x)=\operatorname{sgn}\left(\sum_j a_jg_j(x)-\theta\right)
\]

and one also requires \(h_i(x)=b_i\) for every \(i\), choose a weight \(M\)
larger than the full range of the first linear form and write one top
threshold enforcing the \(h_i=b_i\) face lexicographically before testing
\(F\).  The resulting circuit is still depth two, has polynomial-bit
weights, and has \(G=O(W)\) gates.

Tamaki's base saving, expressed in the original \(n\), is

\[
  n^{a_T(\lambda-(1+\alpha)/2)-o(1)}.
\]

It must dominate the \(n^h\) branching exponent.  Take

\[
  r=(3+o(1))\alpha,\qquad
  f=(3+o(1))\alpha,\qquad
  h=(2+o(1))\alpha.
\]

Then

\[
  \lambda=1-(7+o(1))\alpha
\]

and the sufficient inequality becomes

\[
  2\alpha<a_T(1/2-15\alpha/2).
\]

Equivalently,

\[
  \boxed{\alpha<\frac{a_T}{4+15a_T}}
\]

with constant slack.

If all exact-counting bookkeeping composes as expected, this would give
\[
  2^{n-n^{\Omega(\alpha)}}
\]
time for a quantitatively denser depth-3 sparse-wire class.

**Gap to close before claiming this:**

1. write the Kabanets--Lu disjoint counting recurrence with Tamaki as the
   terminal routine, rather than relying on the CSS SAT sketch;
2. verify that every accumulated side constraint is absorbed by the
   lexicographic top-LTF construction without increasing the gate count
   beyond \(O(W+n)\);
3. retain all polylogarithmic losses in Tamaki's theorem and all
   \(o(1)\) losses in the optimized restriction bound;
4. determine whether this quantitative composition already appears in a
   later source.

Even if valid, this remains \(n^{1+\alpha}\) wires for one small absolute
\(\alpha\); it is not polynomial-size depth-3 TC0.

## 11. CSS Section 9: a small-junta alternative

**Established single-gate theorem.**  CSS prove a later strengthened
restriction lemma.  A gate is \((t,k)\)-imbalanced if there is a set \(S\)
of at most \(k\) surviving variables such that, for every setting of \(S\),
the remaining gate is \(t\)-imbalanced.  For

\[
  t=(1/p)^{o(1)},\qquad k=\omega(1),
\]

they prove

\[
  \Pr[\text{not \((t,k)\)-imbalanced}]
     \le p^{1/2-o(1)}.
\]

Moreover the gate is approximated, with error
\(\exp(-\Omega(t^2))\), by the LTF obtained by retaining only the variables
in \(S\).  This recovers the Kane--Williams lower-bound restriction
phenomenon.

**Possible SAT use.**  Set \(k=(\log n)^{1/3}\) and
\(t=\exp((\log n)^{2/3})\).  Then witnesses can be checked by enumerating
\(2^k=n^{o(1)}\) assignments, the balance failure is
\(p^{1/2-o(1)}\), and exception enumeration saves
\(\exp(\Theta((\log n)^{2/3}))\) in the exponent.  This is subpolynomial
but far larger than every polylogarithm, so it is sufficient for the
\(2^n/n^{\omega(1)}\) lower-bound pipeline.

A parameter calculation analogous to Section 10 gives:

\[
\alpha<r/2,\qquad f>\alpha+r,\qquad
\lambda=1-r-\alpha-f,\qquad
h>\alpha+r/2.
\]

Taking \(r\approx2\alpha\), \(f\approx3\alpha\), and
\(h\approx2\alpha\), a Tamaki terminal call would require

\[
  \alpha<\frac{a_T}{4+13a_T}.
\]

The overall saving would be
\[
  2^{n-\exp((\log n)^{\Omega(1)})},
\]
not \(2^{n-n^\gamma}\).

**Gaps:** CSS do not algorithmize this lemma for SAT.  One must extract
the witness set \(S\), enumerate all disagreements with the \(S\)-junta
without double counting, handle the small population of gates for which
no witness exists, and prove a simultaneous bounded-read concentration
statement.  The proof appears compatible with witness extraction, but the
full recursive algorithm is not written here.

## 12. Other explored directions

### 12.1 Multi-switching

**Dead end in its exact form.**  Håstad-style switching cannot directly
turn arbitrary LTFs into shallow exact decision trees while preserving the
number of variables needed here.  Consider majority on \(n\) inputs and a
\(p\)-restriction with \(p\gg n^{-1/2}\).  The fixed offset is typically
\(\Theta(\sqrt n)\), while the number of live unit-weight inputs is
\(\Theta(pn)\gg\sqrt n\).  The restricted majority gate is therefore
nonconstant with probability \(1-o(1)\), and its exact decision-tree depth
is linear in its live fan-in.  Many disjoint majority gates make a
simultaneous exact switching conclusion impossible.

An approximate multi-switching lemma would be meaningful, but CSS's
bounded-read Chernoff argument is already an aggregate approximate
simplification theorem.  To improve the exponent it would have to beat
the per-gate balance probability or exploit correlations among balanced
events beyond bounded read.  No such theorem was found.

### 12.2 Biased fixed values

**Dead end for worst-case LTFs without a new minimax argument.**  Assigning
fixed bits with a common bias can shift some thresholds farther from zero,
but an adversarial LTF can recenter its threshold against that bias.  A
circuit may contain both a gate and its negation, so a global bias that
helps one direction need not help the other.

There is a second algorithmic issue.  CSS translate probability of bad
restriction leaves into the number of leaves of a uniform restriction
tree.  Under biased branch probabilities, a small probability mass need
not mean a small number of leaves; correcting by inverse leaf weights can
lose an exponential factor.  Any biased-restriction proposal must specify
both a worst-case anti-concentration theorem and a counting measure that
preserves the runtime bound.

Variable-dependent star probabilities \(p_i\) are more plausible, but a
regular bounded-read incidence graph is symmetric and gives no aggregate
advantage over uniform \(p\).  Heavy-coordinate targeting is discussed
next.

### 12.3 Simultaneous regularization

**Established special case.**  If every relevant LTF is already
\(\tau\)-regular, CSS Lemma 5.5 gives

\[
  q=O(t\sqrt p+\tau).
\]

For \(t=p^{-b}\) and
\(\tau\le p^{1/2-b}\), this is \(q=O(p^{1/2-b})\), better than the universal
critical-index exponent.

**Candidate idea:** explicitly force the critical-index prefixes of all
large gates to be assigned.  If the prefix length is
\(L=p^{-2a}\operatorname{polylog}(1/p)\), the number of heavy-coordinate
incidences is at most

\[
  n^{1+\alpha-f+2ar+o(1)}.
\]

It is sublinear when \(f>\alpha+2ar\).  This removes the random event that a
heavy coordinate survives and could allow a balance exponent closer to
\(1/2\).

**Gap:** a high-critical-index gate becomes imbalanced after its prefix is
assigned, but a subsequent restriction of its tail can shift its threshold
back toward zero.  A sufficiently strong bias-preservation lemma under
further restrictions is needed simultaneously for all gates.  This is
related to the bias-preservation machinery in Kabanets--Lu, but the needed
parameter statement for arbitrary LTF circuits has not been verified.

### 12.4 Bottom-gate fan-in bucketing

**Positive:** dyadic bucketing is the cleanest immediate quantitative
improvement found; see Section 9.

**Limit:** bucketing only removes a factor caused by proof granularity.  It
does not remove the fundamental \(qW\) term.  When wire mass is spread
across many comparably large gates, every bucketing scheme must still pay
for roughly the balance probability times the wire mass.

One can branch on the outputs of very few extremely high-fan-in gates
instead of killing all their live wires.  This helps circuits whose wire
mass is concentrated in a sparse exceptional set, but worst-case
polynomial-size depth-3 circuits can distribute the mass across too many
gates.  A useful intermediate theorem could parameterize the algorithm by
the number of high-fan-in bottom gates.

## 13. Strongest conclusions

1. **No full solution:** none of the tested restriction variants reaches
   polynomial-size depth-3 TC0.
2. **Exact published frontier:** CSS use
   \(\varepsilon_d=B^{-(2d-1)}\); depth three means
   \(n^{1+B^{-5}}\) wires.
3. **Exact bottleneck:** balanced-wire cleanup imposes
   \(\alpha<vr\), and the read/small-fan-in cleanup loses a further
   \(n^{\alpha+f}\) in surviving variables.
4. **Reusable proof sharpening:** the CSS critical-index proof gives
   \(t=p^{-1/6}\) and
   \(q=O(p^{1/3}\log^2(1/p))\), and dyadic buckets remove one
   \(n^{\varepsilon_d}\) factor.  These lower the simplification-side
   separation from \(B>32\) to \(B>6\).
5. **Most concrete next proof task:** formalize the one-step
   CSS-to-Tamaki recurrence in Section 10.  It has a short list of
   checkable gaps and could yield a quantitatively denser depth-3
   sparse-wire theorem.
6. **Most ambitious next structural task:** algorithmize the CSS Section 9
   \((t,k)\)-imbalance lemma.  Its \(p^{1/2-o(1)}\) failure rate is the
   best restriction exponent in this line, and its subpolynomial
   approximation saving is already sufficient for the
   \(2^n/n^{\omega(1)}\) lower-bound criterion.
