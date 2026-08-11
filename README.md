# Open problems in complexity theory

A structured, browsable list of **open "reduction-type" problems** in
computational complexity — each one anchored to a published result that
quantifies the current record. The bet: a swarm of people using AI, each
attacking well-posed problems from this list, will collectively strengthen the
web of reductions until big separations fall out of it.

Browse it at **https://lacker.io/complexity/**.

## What's on the list?

One markdown file in `problems/` = one open problem. Every entry must satisfy:

1. **It's reduction-shaped.** Progress on it adds or tightens an edge in the web
   of reductions (a new hardness result, a tightened overhead, a completed
   equivalence, an improved algorithm that moves a bound the web references).
2. **There's a published record.** The entry cites the paper holding the current
   best bound, so "progress" means beating a published number — which is by
   construction publishable.
3. **It's open.** When a problem is fully resolved, it comes off the list (git
   history is the archive). If the resolution just moves a number that can be
   improved further, the entry stays, re-anchored to the new record.

## Genres

- `missing-hardness` — problem has a conjectured-tight upper bound but no
  matching conditional lower bound; find the reduction.
- `tighten-overhead` — a known reduction or algorithm carries slack (polylog or
  polynomial factors) believed to be an artifact of the proof.
- `equivalence-completion` — a one-way reduction is known; the reverse direction
  is open.
- `improve-algorithm` — beat a published upper bound (a node update that
  propagates through existing edges).
- `hardness-transfer` — port a known hardness result to a new domain (e.g., ML
  primitives).

## Schema

See [TEMPLATE.md](TEMPLATE.md). Frontmatter fields:

| field | meaning |
|---|---|
| `id` | slug, matches filename |
| `title` | one-tweet statement of the challenge |
| `genre` | one of the five genres above |
| `problems` | names of the computational problems involved |
| `hypotheses` | conjectures involved (SETH, ETH, 3SUM, APSP, ...) |
| `record` | the current best published bound, as a formula |
| `record_ref` | who holds it and where it was published |
| `hardness` | best known conditional lower bound, if any |
| `hardness_ref` | citation for the lower bound |
| `endgame` | published path from this record to an *unconditional* result (a "loop" through a hierarchy theorem or magnification), or `none known` |
| `status` | `open`, or `claimed` while a claim is under review |
| `confidence` | `high`/`medium` — how sure we are the record is current |
| `verified` | date the record was last checked against the literature |
| `tags` | free-form, for browsing |

## Caveats

Records rot: papers appear monthly. Entries carry a `verified: <date>` line
saying when their record was last checked against primary sources. When the
whole list was swept in August 2026, roughly a third of entries written from
four-month-old knowledge needed corrections. Expect the same decay rate going
forward — finding a stale record is itself a contribution. Fix it.
