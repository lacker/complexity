# Checked primary sources

Last checked: 2026-08-12.

The bibliography is ordered by its role in the notebook. Links go to author,
publisher, arXiv, or ECCC copies rather than secondary summaries.

## Definition, baseline, and restricted lower bounds

- Stephen Cook, Pierre McKenzie, Dustin Wehr, Mark Braverman, and Rahul
  Santhanam, [*Pebbles and Branching Programs for Tree
  Evaluation*](https://arxiv.org/abs/1005.2642), ACM TOCT 3(2), 2012.
  Defines the explicit problem, gives the input-size convention and
  \(\mathsf{LogDCFL}\) upper bound, and develops pebbling/thrifty branching
  programs.
- Kazuo Iwama and Atsuki Nagao,
  [*Read-Once Branching Programs for Tree Evaluation
  Problems*](https://doi.org/10.4230/LIPIcs.STACS.2014.409), STACS 2014.
- Balagopal Komarath and Jayalal Sarma,
  [*Pebbling, Entropy and Branching Program Size Lower
  Bounds*](https://eccc.weizmann.ac.il/report/2013/006/), ECCC TR13-006.
- Jeff Edmonds, Venkatesh Medabalimi, and Toniann Pitassi,
  [*Hardness of Function Composition for Semantic Read Once Branching
  Programs*](https://doi.org/10.4230/LIPIcs.CCC.2018.15), CCC 2018.

## Ordinary-space upper bounds

- James Cook and Ian Mertz,
  [*Catalytic Approaches to the Tree Evaluation
  Problem*](https://eccc.weizmann.ac.il/report/2020/056/), ECCC TR20-056 /
  STOC 2020.
- James Cook and Ian Mertz,
  [*Encodings and the Tree Evaluation
  Problem*](https://eccc.weizmann.ac.il/report/2021/054/), ECCC TR21-054.
  Theorem 1 gives uniform branching programs of size
  \(k^{O(h/\log h)}\) for \(k\ge h\) and \(2^{O(h)}\) for \(k\le h\).
- James Cook and Ian Mertz,
  [*Tree Evaluation Is in Space
  \(O(\log n\log\log n)\)*](https://eccc.weizmann.ac.il/report/2023/174/),
  ECCC TR23-174 / STOC 2024 / SICOMP 2025. The parameterized theorems used
  here are \(O((h+\ell)\log\ell)\) and the sharper
  \(O(\ell+h\log\ell)\).
- Oded Goldreich,
  [*On the Cook--Mertz Tree Evaluation
  Procedure*](https://eccc.weizmann.ac.il/report/2024/109/), ECCC TR24-109.
  Gives the global-storage/interpolation exposition and explicitly isolates
  \(O(\ell+h\log\ell)\) and \(O(d\ell+h\log(d\ell))\).
- Oded Goldreich,
  [*Solving Tree Evaluation in
  \(o(\log n\log\log n)\) Space*](https://eccc.weizmann.ac.il/report/2024/124/),
  ECCC TR24-124. Theorem 2 yields
  \(O(h+2^t\ell+(h/t)\log\ell)\) after grouping \(t\) binary levels.

## Catalytic and time-space developments

- Ryan Williams,
  [*Simulating Time With Square-Root
  Space*](https://arxiv.org/abs/2502.17779), STOC 2025. Uses TreeEval as the
  central reduction target; it does not improve the general TreeEval bound.
- Yakov Shalunov,
  [*Improved Bounds on the Space Complexity of Circuit
  Evaluation*](https://eccc.weizmann.ac.il/report/2025/078/), ECCC TR25-078.
- Alexandra Henzinger, Edward Pyne, and Seyoon Ragavan,
  [*Catalytic Tree Evaluation From Matching
  Vectors*](https://eccc.weizmann.ac.il/report/2026/022/), ECCC TR26-022.
  Gives \(O(h+\ell)\) free space, \(2^{O(\ell^\varepsilon)}\) catalytic
  space, polynomial time, and the CIR formulation.
- Vahid R. Asadi and Richard Cleve,
  [*Polynomial-Time Almost Log-Space Tree Evaluation by Catalytic
  Pebbling*](https://eccc.weizmann.ac.il/report/2026/044/), ECCC TR26-044.
  **Withdrawn 7 April 2026:** the official revision identifies a polynomial
  degree error and says the claimed polynomial-time bound does not follow.

## Matching-vector barrier used in the attack

- Abhishek Bhowmick, Zeev Dvir, and Shachar Lovett,
  [*New Lower Bounds for Matching Vector
  Codes*](https://arxiv.org/abs/1204.1367), 2012/2014.
- W. T. Gowers, Ben Green, Freddie Manners, and Terence Tao,
  [*On a Conjecture of
  Marton*](https://doi.org/10.4007/annals.2025.201.2.5), Annals of
  Mathematics 201(2), 2025. Proves the polynomial Freiman--Ruzsa input used
  to make the relevant constant-modulus matching-vector dimension barrier
  unconditional. Henzinger--Pyne--Ragavan state this consequence explicitly
  in Footnote 4.

## Permutation-program route

- David A. Barrington,
  *Bounded-Width Polynomial-Size Branching Programs Recognize Exactly Those
  Languages in NC\(^{1}\)*, JCSS 38(1), 1989. This is conceptual background
  for the fixed-width factorization target; the notebook does not claim that
  the classical Boolean theorem supplies the needed \(k\)-valued closure.
- Martin W. Liebeck, E. A. O'Brien, Aner Shalev, and Pham Huu Tiep,
  [*The Ore Conjecture*](https://ems.press/journals/jems/articles/3979),
  JEMS 12(4), 2010. Establishes that every element of a finite nonabelian
  simple group is a commutator. The one-level gadget can alternatively use
  explicit disjoint constant-size commutators and does not rely on the full
  theorem.
