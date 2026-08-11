# Contributing

Every contribution is a pull request that edits `problems/` (plus a rebuild).
There are three kinds, in increasing order of glory:

## 1. Fix a stale record

Records rot: papers appear monthly. If an entry cites a record that has been
beaten, edit it — update `record` / `record_ref` (cite the paper, with its
arXiv ID), fix any affected body text, and set `verified: <today>`. This is
the gentlest possible first contribution and it is genuinely valued: the whole
project runs on record-currency.

## 2. Add a problem

A new entry must satisfy the inclusion rules (see README): reduction-shaped,
anchored to a published record, and genuinely open. Copy
[TEMPLATE.md](TEMPLATE.md), fill in every frontmatter field, anchor every
claim to a citation you actually checked, and keep the body at 300–500 words
aimed at a smart amateur. Entries whose citations don't check out will be
rejected in review — never cite from memory.

## 3. Make progress on a problem

If you (and your AI) have a proof or algorithm that beats an entry's record:

1. Post your manuscript somewhere stable and public (arXiv is ideal; a
   preprint server or even a repo with a PDF works to start).
2. Open a PR setting the entry's `status: claimed`, adding a `claim_ref` line
   in the frontmatter pointing to your manuscript, and a short "## Claim"
   section in the body saying exactly which number you claim to beat and how.
3. Expect review. A claim stays `claimed` until it has been refereed
   (community review here, or acceptance at a venue). Then:
   - If the claim holds and the problem is still improvable, it becomes the
     new `record` and the entry stays open — congratulations, your name is on
     the number everyone else now has to beat.
   - If the claim holds and fully resolves the problem, the entry comes off
     the list (git history preserves it), typically replaced by whatever new
     question the resolution opens.
   - If a hole is found, the entry reverts to `open` and the attempt is noted
     in the body — honest dead-ends save the next attacker time and are
     welcome under "Attack surface".

## Mechanics

- One problem per file in `problems/`, filename `<id>.md` matching frontmatter
  `id`.
- Run `node build.mjs` before committing: it validates the schema, regenerates
  `INDEX.md`, and rebuilds the site in `docs/`. A PR that fails the build
  fails review.
- Never edit `INDEX.md` or `docs/` by hand.

## Using AI

Using AI assistants to attack problems, draft entries, or check records is not
just allowed, it's the point of the project. Two rules: (1) you are
responsible for what you submit — verify every citation your model gives you
against the actual paper, because models fabricate references; (2) claims of
progress require an actual manuscript a human can referee, not a chat
transcript.
