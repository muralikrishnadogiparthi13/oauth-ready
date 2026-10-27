// Second pass for quotes not found in raw HTML: render the page in headless Chromium and re-check.
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW_PATH || 'playwright');
const d = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const norm = s => (s || '').toLowerCase().replace(/[‘’“”"'`*]/g, '').replace(/[‐-―]/g, '-').replace(/\s+/g, ' ').trim();
const qf = (q, t) => { const parts = String(q).split(/\s*(?:\.\.\.|…)\s*/).filter(x => x.trim().length >= 8); if (parts.length > 1) return parts.every(p => qf(p, t)); const a = norm(q); if (t.includes(a)) return true; const w = a.split(' '); if (w.length < 6) return false; let h = 0, n = 0; for (let i = 0; i + 5 <= w.length; i++) { n++; if (t.includes(w.slice(i, i + 5).join(' '))) h++; } return n > 0 && h / n >= 0.85; };
const b = await chromium.launch();
const ctx = await b.newContext({ userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36' });
const out = {};
for (const [url, qs] of Object.entries(d)) {
  const p = await ctx.newPage();
  let t = '';
  try { await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 }); await p.waitForTimeout(2500); t = norm(await p.evaluate(() => document.body.innerText)); } catch (e) { t = ''; }
  out[url] = { rendered_chars: t.length, quotes: qs.map(q => ({ q, found: t ? qf(q, t) : null })) };
  console.log((t ? '' : 'UNRENDERED ') + url, out[url].quotes.map(x => x.found ? 'Y' : 'N').join(''));
  await p.close();
}
await b.close();
fs.writeFileSync('tools/rendered-check.json', JSON.stringify(out, null, 1));
