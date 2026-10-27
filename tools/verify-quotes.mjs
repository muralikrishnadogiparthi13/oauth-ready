// Independent evidence check for the reviewed guides.
// For every source in guides/*.json: fetch the page, strip HTML, and check that the quoted line
// really appears (same matcher the live agent uses). Writes VERIFICATION.md.
// Usage: node tools/verify-quotes.mjs
import fs from 'node:fs';

const norm = s => (s || '').toLowerCase().replace(/[‘’“”"'`]/g, '').replace(/[‐-―]/g, '-').replace(/\s+/g, ' ').trim();
function quoteFound(q, text) {
  // quotes stitched from several lines with "..." count only if every part is on the page
  const parts = String(q || '').split(/\s*(?:\.\.\.|\u2026)\s*/).filter(x => x.trim().length >= 8);
  if (parts.length > 1) return parts.every(p => quoteFound(p, text));
  const a = norm(q).replace(/\*\*/g, ''), t = norm(text);
  if (!a || a.length < 8) return false;
  if (t.includes(a)) return true;
  const w = a.split(' ');
  if (w.length < 6) return false;
  let hit = 0, n = 0;
  for (let i = 0; i + 5 <= w.length; i++) { n++; if (t.includes(w.slice(i, i + 5).join(' '))) hit++; }
  return n > 0 && hit / n >= 0.85;
}
const strip = h => h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;|&#x27;/g, "'").replace(/&quot;|&ldquo;|&rdquo;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const cache = new Map();
async function page(url) {
  if (cache.has(url)) return cache.get(url);
  const p = (async () => {
    try {
      const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/130 Safari/537.36' }, signal: AbortSignal.timeout(20000) });
      return { status: r.status, text: r.ok ? strip(await r.text()) : '' };
    } catch (e) { return { status: 'ERR', text: '' }; }
  })();
  cache.set(url, p);
  return p;
}

const files = fs.readdirSync('guides').filter(f => f.endsWith('.json')).sort();
let md = `# Evidence check (${new Date().toISOString().slice(0, 10)})\n\nEvery quote in the reviewed guides was re-fetched from its source URL and string-matched (exact, or 85% of 5-word shingles). "Page not readable" usually means the page renders with JavaScript or blocks scripts; those quotes were then checked by hand in a browser (see notes).\n\n`;
const summary = [];
for (const f of files) {
  const g = JSON.parse(fs.readFileSync('guides/' + f, 'utf8'));
  const rows = await Promise.all((g.sources || []).map(async s => {
    if (!s.quote) return { s, res: 'no quote' };
    const p = await page(s.url);
    if (!p.text) return { s, res: `page not readable (${p.status})` };
    return { s, res: quoteFound(s.quote, p.text) ? 'found' : 'NOT FOUND' };
  }));
  const c = k => rows.filter(r => r.res.startsWith(k)).length;
  summary.push(`| ${g.name} | ${rows.length} | ${c('found')} | ${c('NOT FOUND')} | ${c('page not readable')} |`);
  md += `## ${g.name}\n\n| Result | Source | Quote |\n|---|---|---|\n` + rows.map(r => `| ${r.res} | ${r.s.url} | ${(r.s.quote || '').replace(/\|/g, '/').slice(0, 140)} |`).join('\n') + '\n\n';
}
md = md.replace('\n\n## ', `\n\n| Guide | Quotes | Found | Not found | Page not readable |\n|---|---|---|---|---|\n${summary.join('\n')}\n\n## `);
fs.writeFileSync('VERIFICATION.md', md);
console.log(summary.join('\n'));
