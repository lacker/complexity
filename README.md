# Complexity Atlas (working name)

A structured, browsable set of **open "reduction-type" problems** in computational
complexity — each one anchored to a published result that quantifies the current
record. The bet: a swarm of people using AI, each attacking well-posed cards from
this list, will collectively strengthen the web of reductions until big
separations fall out of it.

## What's a card?

One markdown file in `cards/` = one open problem. Every card must satisfy:

1. **It's reduction-shaped.** Progress on it adds or tightens an edge in the web
   of reductions (a new hardness result, a tightened overhead, a completed
   equivalence, an improved algorithm that moves a bound the web references).
2. **There's a published record.** The card cites the paper holding the current
   best bound, so "progress" means beating a published number — which is by
   construction publishable.

## Card genres

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
| `problems` | names of the problems this card touches |
| `hypotheses` | conjectures involved (SETH, ETH, 3SUM, APSP, ...) |
| `record` | the current best published bound, as a formula |
| `record_ref` | who holds it and where it was published |
| `hardness` | best known conditional lower bound, if any |
| `hardness_ref` | citation for the lower bound |
| `status` | `open` / `claimed` / `solved` |
| `confidence` | `high`/`medium` — how sure we are the record is current |
| `tags` | free-form, for browsing |

## Caveats

Records were seeded from early-2026 knowledge; on **2026-08-10** a web
verification sweep checked 25 of the 41 cards against current literature (all
cards that were medium-confidence, plus the fast-moving famous records). Cards
carry a `verified: <date>` frontmatter line when a sweep has confirmed or
corrected them against primary sources. The sweep caught 4 stale records, 2
solved cards, and several misattributions — expect the same decay rate going
forward: records rot, and finding a stale card is itself a contribution. Fix it.
