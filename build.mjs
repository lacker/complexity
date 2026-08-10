// Build the static site (docs/) and INDEX.md from cards/*.md frontmatter.
// Usage: node build.mjs
import { marked } from 'marked';
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync } from 'fs';
import { join, basename } from 'path';

const CARDS_DIR = 'cards';
const OUT_DIR = 'docs';

const GENRES = {
  'improve-algorithm': 'Improve an algorithm',
  'missing-hardness': 'Find the missing hardness',
  'equivalence-completion': 'Complete an equivalence',
  'tighten-overhead': 'Tighten an overhead',
  'hardness-transfer': 'Transfer hardness',
};

function parseFrontmatter(text, file) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`no frontmatter in ${file}`);
  const meta = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) continue;
    let [, key, val] = kv;
    val = val.trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      meta[key] = val.slice(1, -1).split(',').map(s => s.trim().replace(/^"|"$/g, '')).filter(Boolean);
    } else {
      meta[key] = val.replace(/^"|"$/g, '');
    }
  }
  return { meta, body: m[2] };
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const cards = readdirSync(CARDS_DIR).filter(f => f.endsWith('.md')).map(f => {
  const { meta, body } = parseFrontmatter(readFileSync(join(CARDS_DIR, f), 'utf8'), f);
  if (meta.id !== basename(f, '.md')) throw new Error(`id/filename mismatch: ${f}`);
  if (!GENRES[meta.genre]) throw new Error(`bad genre in ${f}: ${meta.genre}`);
  return { ...meta, body, file: f };
});

const CSS = `
:root { --bg:#fff; --fg:#1a1a1a; --muted:#666; --line:#e2e2e2; --accent:#0b5cad; --chip:#f0f4f8; --open:#0a7a3d; --solved:#8a5a00; }
@media (prefers-color-scheme: dark) {
  :root { --bg:#14161a; --fg:#e6e6e6; --muted:#9a9a9a; --line:#2c2f35; --accent:#6fb3ef; --chip:#1f242b; --open:#4cc07f; --solved:#d8a742; }
}
* { box-sizing: border-box; }
body { margin:0; background:var(--bg); color:var(--fg); font:16px/1.6 -apple-system, "Segoe UI", Roboto, sans-serif; }
main { max-width: 46rem; margin: 0 auto; padding: 2rem 1.25rem 4rem; }
a { color: var(--accent); text-decoration: none; } a:hover { text-decoration: underline; }
h1 { font-size: 1.6rem; line-height: 1.3; } h2 { font-size: 1.15rem; margin-top: 2rem; }
.tagline { color: var(--muted); }
.card-link { display:block; padding: .8rem 0; border-bottom: 1px solid var(--line); }
.card-link .t { font-weight: 600; }
.chips { margin-top: .15rem; }
.chip { display:inline-block; background:var(--chip); color:var(--muted); border-radius: 4px; padding: 0 .45em; font-size: .78rem; margin-right: .35em; }
.chip.open { color: var(--open); } .chip.solved { color: var(--solved); } .chip.verified { color: var(--accent); }
.facts { border:1px solid var(--line); border-radius:8px; padding: .9rem 1.1rem; margin: 1.2rem 0; font-size:.92rem; }
.facts dt { font-weight:600; color:var(--muted); font-size:.8rem; text-transform:uppercase; letter-spacing:.03em; margin-top:.6rem; }
.facts dt:first-child { margin-top:0; } .facts dd { margin:0; }
pre, code { background: var(--chip); border-radius:4px; }
code { padding: .1em .3em; font-size: .9em; }
.crumb { font-size:.85rem; color:var(--muted); margin-bottom:1.5rem; display:block; }
footer { margin-top:3rem; color:var(--muted); font-size:.85rem; border-top:1px solid var(--line); padding-top:1rem; }
`;

const page = (title, body) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title><style>${CSS}</style></head>
<body><main>${body}<footer>Records reflect the cited literature; found a stale one? That's a contribution — open a PR.</footer></main></body></html>`;

function chips(c) {
  const out = [`<span class="chip ${c.status}">${esc(c.status)}</span>`, `<span class="chip">${esc(GENRES[c.genre])}</span>`, `<span class="chip">confidence: ${esc(c.confidence)}</span>`];
  if (c.verified) out.push(`<span class="chip verified">verified ${esc(c.verified)}</span>`);
  for (const t of c.tags || []) out.push(`<span class="chip">${esc(t)}</span>`);
  return `<div class="chips">${out.join('')}</div>`;
}

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(join(OUT_DIR, 'cards'), { recursive: true });

// Card pages
for (const c of cards) {
  const facts = [
    ['Record', c.record], ['Record held by', c.record_ref],
    ['Hardness', c.hardness], ['Hardness from', c.hardness_ref],
    ['Hypotheses', (c.hypotheses || []).join(', ')], ['Problems', (c.problems || []).join(', ')],
  ].filter(([, v]) => v);
  const factsHtml = `<dl class="facts">${facts.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>`;
  const body = `<a class="crumb" href="../index.html">&larr; all problems</a><h1>${esc(c.title)}</h1>${chips(c)}${factsHtml}${marked(c.body)}`;
  writeFileSync(join(OUT_DIR, 'cards', `${c.id}.html`), page(c.title, body));
}

// Index page + INDEX.md
const order = Object.keys(GENRES);
cards.sort((a, b) => order.indexOf(a.genre) - order.indexOf(b.genre) || a.id.localeCompare(b.id));
let idxHtml = `<h1>Open problems in complexity theory</h1>
<p class="tagline">${cards.length} reduction-shaped open problems, each anchored to a published record.
Beat the number on any card and you have a publishable result. Records are community-maintained; corrections are contributions.</p>`;
let idxMd = `# Card Index\n\n${cards.length} open problems, each anchored to a published record. Generated by \`node build.mjs\` — do not edit by hand.\n`;
for (const g of order) {
  const group = cards.filter(c => c.genre === g);
  if (!group.length) continue;
  idxHtml += `<h2>${esc(GENRES[g])} (${group.length})</h2>`;
  idxMd += `\n## ${GENRES[g]} (${group.length})\n\n| Card | Status | Confidence | Challenge |\n|---|---|---|---|\n`;
  for (const c of group) {
    idxHtml += `<a class="card-link" href="cards/${c.id}.html"><span class="t">${esc(c.title)}</span>${chips(c)}</a>`;
    idxMd += `| [${c.id}](cards/${c.id}.md) | ${c.status} | ${c.confidence} | ${c.title.replace(/\|/g, '\\|')} |\n`;
  }
}
writeFileSync(join(OUT_DIR, 'index.html'), page('Open problems in complexity theory', idxHtml));
writeFileSync('INDEX.md', idxMd);
console.log(`built ${cards.length} cards -> ${OUT_DIR}/, INDEX.md regenerated`);
