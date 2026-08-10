# Contributing

Every contribution to this repo is a pull request that edits `cards/` (plus a
rebuild). There are four kinds, in increasing order of glory:

## 1. Fix a stale record

Records rot: papers appear monthly. If a card cites a record that has been
beaten, edit the card — update `record` / `record_ref` (cite the paper, with
its arXiv ID), fix any affected body text, and set `verified: <today>`. This
is the gentlest possible first contribution and it is genuinely valued: the
whole project runs on record-currency.

## 2. Add a card

A new card must satisfy the two inclusion rules (see README): it is
reduction-shaped, and a published result quantifies the current best. Copy
[TEMPLATE.md](TEMPLATE.md), fill in every frontmatter field, anchor every
claim to a citation you actually checked, and keep the body at 300–500 words
aimed at a smart amateur. Cards whose citations don't check out will be
rejected in review — never cite from memory.

## 3. Claim progress on a card

If you (and your AI) have a proof or algorithm that beats a card's record:

1. Post your manuscript somewhere stable and public (arXiv is ideal; a
   preprint server or even a repo with a PDF works to start).
2. Open a PR setting the card's `status: claimed`, adding a `claim_ref` line
   in the frontmatter pointing to your manuscript, and a short "## Claim"
   section in the body saying exactly which number you claim to beat and how.
3. Expect review. A claim stays `claimed` until it has either been refereed
   (community review here, or acceptance at a venue), after which it becomes
   the new `record` — or a hole is found, in which case the card reverts to
   `open` and the claim is noted in the card's history. Withdrawn and refuted
   claims are recorded, not erased: they are evidence the card is live, and
   they save the next attacker a dead end.

Honest failure reports are welcome in card bodies under "Attack surface" —
"we tried X, it breaks at Y" is real information.

## 4. Solve a card

Same as claiming, but the gap actually closes. The card becomes
`status: solved`, keeps its full text, and gains a "## Resolution" section.
Solved cards are the trophy room — they stay on the site forever.

## Mechanics

- One card per file in `cards/`, filename `<id>.md` matching frontmatter `id`.
- Run `node build.mjs` before committing: it validates the schema, regenerates
  `INDEX.md`, and rebuilds the site in `docs/`. A PR that fails the build
  fails review.
- Never edit `INDEX.md` or `docs/` by hand.

## Using AI

Using AI assistants to attack cards, draft cards, or check records is not
just allowed, it's the point of the project. Two rules: (1) you are
responsible for what you submit — verify every citation your model gives you
against the actual paper, because models fabricate references; (2) claims of
progress require an actual manuscript a human can referee, not a chat
transcript.
