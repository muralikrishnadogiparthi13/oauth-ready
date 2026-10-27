// OAuth Setup Guides: API + live research agent (Cloudflare Worker).
// Routes:
//   GET  /api/library            curated guides (summary cards) + Composio OAuth toolkit index
//   GET  /api/guide/:slug        a curated or previously generated guide
//   POST /api/generate {app}     live agent run, streamed as Server-Sent Events
// Static UI is served from ../site via the assets binding.

import TOOLKITS from './composio-toolkits.json';
import LIBRARY from './library.js';

const MODEL = '@cf/openai/gpt-oss-120b';
const DAILY_CAP = 80;          // live generations per day (free Workers AI quota guard)
const PER_IP_HOURLY = 6;

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    try {
      if (url.pathname === '/api/library') return json({ guides: LIBRARY.map(card), toolkits: TOOLKITS });
      if (url.pathname.startsWith('/api/guide/')) return getGuide(decodeURIComponent(url.pathname.slice(11)), env);
      if (url.pathname === '/api/generate' && req.method === 'POST') return generate(req, env, ctx);
      return env.ASSETS.fetch(req);
    } catch (e) {
      return json({ error: String(e && e.message || e) }, 500);
    }
  },
};

// ---------- helpers ----------
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
const slugify = s => s.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\.(com|io|dev|net|org|co|ai|app)(\/.*)?$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
const card = g => ({ slug: g.slug, name: g.name, one_liner: g.one_liner, difficulty: g.difficulty, time_to_production: g.time_to_production, time_to_first_test: g.time_to_first_test, curated: true });
const norm = s => (s || '').toLowerCase().replace(/[‘’“”"'`]/g, '').replace(/\s+/g, ' ').trim();

function findToolkit(name) {
  const s = slugify(name), n = norm(name);
  return TOOLKITS.find(t => t.slug === s || norm(t.name) === n) || TOOLKITS.find(t => t.slug.replace(/_/g, '') === s.replace(/-/g, '')) || null;
}

function composioNote(tk) {
  if (!tk) return 'Not found in Composio’s OAuth toolkit list (docs.composio.dev/toolkits/managed-auth). If Composio adds it later, check that page first.';
  return tk.managed
    ? `Composio offers a managed OAuth app for ${tk.name}, so you can start without registering your own. Register your own app when you want your app name on the consent screen, custom scopes, or a separate rate-limit quota (per docs.composio.dev/toolkits/managed-auth).`
    : `Composio does not offer a managed OAuth app for ${tk.name}. You must register your own OAuth app with ${tk.name} and add its client ID and secret as a custom auth config in Composio.`;
}

async function getGuide(slug, env) {
  const g = LIBRARY.find(x => x.slug === slug);
  if (g) return json({ ...g, curated: true });
  const cached = env.GUIDES && await env.GUIDES.get('g:' + slug, 'json');
  if (cached) return json(cached);
  return json({ error: 'not_found' }, 404);
}

// ---------- live agent ----------
async function generate(req, env, ctx) {
  const body = await req.json().catch(() => ({}));
  const app = String(body.app || '').trim().slice(0, 80);
  if (app.length < 2) return json({ error: 'Type an app name or website.' }, 400);
  const slug = slugify(app);

  const { readable, writable } = new TransformStream();
  const w = writable.getWriter();
  const enc = new TextEncoder();
  const send = (event, data) => w.write(enc.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));

  ctx.waitUntil((async () => {
    try {
      const lib = LIBRARY.find(x => x.slug === slug || norm(x.name) === norm(app));
      if (lib && !body.force) { await send('step', { msg: `${lib.name} is already in the library. Opening the reviewed guide.` }); await send('done', { slug: lib.slug, guide: { ...lib, curated: true } }); return; }
      const cached = !body.force && env.GUIDES && await env.GUIDES.get('g:' + slug, 'json');
      if (cached) { await send('step', { msg: `Found a guide generated on ${cached.last_updated}. Opening it (re-run with "refresh" for a new one).` }); await send('done', { slug, guide: cached }); return; }

      const gate = await rateGate(req, env);
      if (gate) { await send('fail', { msg: gate }); return; }

      const tk = findToolkit(app);
      await send('step', { msg: tk ? `Composio check: ${tk.name} is ${tk.managed ? 'Composio-managed (bring-your-own optional)' : 'bring-your-own OAuth app'}.` : 'Composio check: not in Composio’s OAuth toolkit list.' });

      const name = tk ? tk.name : app;
      const token = slugify(name).split('-')[0];
      // 1) find the provider's own docs domain, 2) search only inside it, 3) add Composio's toolkit page
      await send('step', { msg: `Finding ${name}\u2019s official developer docs\u2026` });
      const first = await search(`${name} developer OAuth documentation`);
      const domain = officialDomain(first, token);
      const queries = domain
        ? [`site:${domain} OAuth app client ID redirect URI`, `site:${domain} app review publish marketplace listing approval`, `site:${domain} OAuth scopes permissions verification limits`]
        : [`${name} OAuth app create client id redirect URI developer documentation`, `${name} OAuth app review approval publish marketplace requirements`, `${name} API OAuth scopes verification production users limit`];
      if (domain) await send('step', { msg: `Official docs look like ${domain}. Searching inside it.` });
      const hits = [...first];
      for (const q of queries) {
        await send('step', { msg: `Searching: ${q}` });
        hits.push(...await search(q));
      }
      const picked = pickSources(hits, name, 6, domain);
      if (tk) picked.push({ url: `https://docs.composio.dev/toolkits/${tk.slug}`, title: `Composio ${tk.name} toolkit docs` });
      if (!picked.length) { await send('fail', { msg: 'Search returned no usable pages. Try the provider\u2019s website, for example "developer.example.com".' }); return; }

      const pages = [];
      for (const h of picked) {
        await send('step', { msg: `Reading ${h.url}` });
        const text = await fetchText(h.url);
        if (text && text.length > 400) pages.push({ id: 'S' + (pages.length + 1), url: h.url, title: h.title, text, excerpt: excerpt(text) });
      }
      if (!pages.length) { await send('fail', { msg: 'Could not read any of the source pages (they may block bots). Try again later.' }); return; }

      await send('step', { msg: `Drafting the guide from ${pages.length} sources with ${MODEL.split('/').pop()}…` });
      const draft = await draftGuide(env, name, tk, pages);

      await send('step', { msg: 'Checking every quoted line against the pages it cites…' });
      const guide = verifyGuide(draft, pages, { slug, name, tk });

      if (env.GUIDES) await env.GUIDES.put('g:' + slug, JSON.stringify(guide), { expirationTtl: 60 * 60 * 24 * 30 });
      await send('done', { slug, guide });
    } catch (e) {
      await send('fail', { msg: 'The agent hit an error: ' + (e && e.message || e) });
    } finally {
      w.close();
    }
  })());

  return new Response(readable, { headers: { 'content-type': 'text/event-stream', 'cache-control': 'no-store' } });
}

async function rateGate(req, env) {
  if (!env.GUIDES) return null;
  const day = new Date().toISOString().slice(0, 10);
  const ip = req.headers.get('cf-connecting-ip') || 'x';
  const hour = new Date().toISOString().slice(0, 13);
  const [d, h] = await Promise.all([env.GUIDES.get('cap:' + day), env.GUIDES.get(`ip:${ip}:${hour}`)]);
  if (+d >= DAILY_CAP) return 'Daily limit for live generations reached (this demo runs on a free AI quota). The reviewed guides still work.';
  if (+h >= PER_IP_HOURLY) return 'You have run several generations this hour. Try again in a bit.';
  await Promise.all([
    env.GUIDES.put('cap:' + day, String(+d + 1), { expirationTtl: 172800 }),
    env.GUIDES.put(`ip:${ip}:${hour}`, String(+h + 1), { expirationTtl: 7200 }),
  ]);
  return null;
}

async function search(q) {
  // lite.duckduckgo.com answers requests from Workers; html.duckduckgo.com often returns a 202 challenge.
  const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';
  const out = [];
  for (const base of ['https://lite.duckduckgo.com/lite/?q=', 'https://html.duckduckgo.com/html/?q=']) {
    try {
      const res = await fetch(base + encodeURIComponent(q), { headers: { 'user-agent': UA, 'accept-language': 'en-US,en;q=0.9' } });
      if (res.status !== 200) continue;
      const h = await res.text();
      const re = /<a[^>]+href="([^"]+)"[^>]*class=['"](?:result-link|result__a)['"][^>]*>([\s\S]*?)<\/a>|<a[^>]+class=['"](?:result-link|result__a)['"][^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
      let m;
      while ((m = re.exec(h))) {
        let href = (m[1] || m[3]).replace(/&amp;/g, '&');
        const u = href.match(/uddg=([^&]+)/);
        if (u) href = decodeURIComponent(u[1]);
        if (href.startsWith('//')) href = 'https:' + href;
        if (!/^https?:/.test(href) || /duckduckgo\.com/.test(href)) continue;
        out.push({ url: href, title: (m[2] || m[4] || '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").trim() });
      }
      if (out.length) return out;
    } catch { /* try next endpoint */ }
  }
  return out;
}

function registrable(host) { const p = host.split('.'); return p.slice(-2).join('.'); }
function officialDomain(hits, token) {
  const count = {};
  for (const h of hits) { try { const host = new URL(h.url).hostname; if (host.includes(token)) { const d = registrable(host); count[d] = (count[d] || 0) + 1; } } catch {} }
  const best = Object.entries(count).sort((a, b) => b[1] - a[1])[0];
  return best ? best[0] : null;
}

function pickSources(hits, name, n, domain) {
  const token = slugify(name).split('-')[0];
  const seen = new Set();
  const scored = [];
  for (const h of hits) {
    let u;
    try { u = new URL(h.url); } catch { continue; }
    const key = u.hostname + u.pathname.replace(/\/$/, '');
    if (seen.has(key)) continue;
    seen.add(key);
    const host = u.hostname;
    if (domain && !host.endsWith(domain)) continue; // stay on the provider's own docs
    if (/^api\./.test(host) || /authorize|oauth_auth|\/token\b/.test(u.pathname) && u.search) continue; // endpoints, not docs
    let s = 0;
    if (host.includes(token)) s += 3;
    if (/^(developer|developers|dev|docs|api|help|support|learn|cloud)\./.test(host)) s += 2;
    if (/oauth|auth|app|review|publish|distribut|scope|verif|marketplace|listing/i.test(u.pathname)) s += 2;
    if (/composio\.dev/.test(host)) s += 1;
    if (/reddit|medium|stackoverflow|youtube|quora|linkedin|facebook|twitter|x\.com/.test(host)) s -= 3;
    if (/\.pdf$/i.test(u.pathname)) s -= 2;
    scored.push({ ...h, s });
  }
  scored.sort((a, b) => b.s - a.s);
  // at most 3 pages per host so one site can't crowd out the rest
  const perHost = {};
  return scored.filter(h => { const host = new URL(h.url).hostname; perHost[host] = (perHost[host] || 0) + 1; return perHost[host] <= 3 && h.s >= 0; }).slice(0, n);
}

async function fetchText(url) {
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; OAuthGuideAgent/1.0)', accept: 'text/html,text/plain' }, cf: { cacheTtl: 3600 }, signal: AbortSignal.timeout(9000) });
    if (!res.ok) return '';
    const ct = res.headers.get('content-type') || '';
    if (!/html|text|markdown/.test(ct)) return '';
    let h = await res.text();
    h = h.slice(0, 900000)
      .replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
      .replace(/<(br|p|li|h[1-6]|tr|div)[^>]*>/gi, '\n').replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;|&rsquo;/g, "'").replace(/&quot;|&ldquo;|&rdquo;/g, '"');
    return h.replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim().slice(0, 80000);
  } catch { return ''; }
}

const KEYWORDS = /oauth|client id|client secret|redirect|callback|scope|review|approv|verif|publish|distribut|marketplace|directory|listing|production|limit|users|days|weeks|business|privacy policy|terms|security assessment|quota|install|admin|consent|refresh token|expire/i;
function excerpt(text, max = 3800) {
  const chunks = text.split(/\n/).map(s => s.trim()).filter(s => s.length > 40);
  const scored = chunks.map((c, i) => ({ c, i, s: (c.match(new RegExp(KEYWORDS.source, 'gi')) || []).length }));
  const top = scored.filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 18).sort((a, b) => a.i - b.i);
  let out = '';
  for (const x of top) { if (out.length + x.c.length > max) break; out += x.c.slice(0, 600) + '\n'; }
  return out || text.slice(0, max);
}

const SYSTEM = `You write OAuth app setup guides for developers building AI agents whose end users will connect a third-party app.
Use ONLY the numbered sources given. Never invent numbers, wait times, prices, user caps or URLs.
Every concrete claim (a number, a requirement, a review step) needs a source quote: copy a short phrase EXACTLY, character for character, from that source.
If the sources do not state something (for example review wait time), write exactly "Not published by the provider" in that field and add it to verification.could_not_verify. Never write the word could_not_verify inside a field.
Only use sources about the exact product asked for. If a page is about a different product of the same company (for example a separate developer platform), ignore it.
Write plainly for a developer. No marketing language. No em dashes.
Reply with ONE JSON object and nothing else, with these keys:
{"one_liner": str, "difficulty": "easy"|"moderate"|"hard"|"very_hard", "difficulty_reason": str,
 "time_to_first_test": str, "time_to_production": str,
 "approval": {"required_for": str, "who_reviews": str, "typical_wait": str, "cost": str},
 "account_prerequisites": [str],
 "steps": [{"title": str, "detail": str, "who": "you"|"agent"|"either", "url": str}],
 "nuances": [str], "blockers": [{"blocker": str, "how_to_proceed": str}],
 "agent_can_do": [str], "you_must_do": [str],
 "sources": [{"id": "S1", "quote": str, "supports": str}],
 "verification": {"verified": [str], "inferred": [str], "could_not_verify": [str]}}
Difficulty guide: easy = self-serve, no review; moderate = review only for public listing or scale; hard = mandatory review before real users; very_hard = mandatory paid or security assessment, or legal-entity checks that take weeks.`;

async function draftGuide(env, name, tk, pages) {
  const src = pages.map(p => `[${p.id}] ${p.title || ''}\nURL: ${p.url}\n${p.excerpt}`).join('\n\n---\n\n');
  const user = `App: ${name}\nComposio status: ${composioNote(tk)}\n\nSOURCES:\n${src}\n\nWrite the guide JSON for getting a production OAuth app approved for ${name} so that end users of an AI agent can connect their ${name} accounts.`;
  const r = await env.AI.run(MODEL, { instructions: SYSTEM, input: [{ role: 'user', content: user }], reasoning: { effort: 'low' } });
  const text = extractText(r);
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error('model returned no JSON');
  return JSON.parse(m[0]);
}

function extractText(r) {
  if (!r) return '';
  if (typeof r === 'string') return r;
  if (r.response) return typeof r.response === 'string' ? r.response : JSON.stringify(r.response);
  if (Array.isArray(r.output)) {
    const parts = [];
    for (const o of r.output) if (o.type === 'message') for (const c of o.content || []) if (c.text) parts.push(c.text);
    if (parts.length) return parts.join('\n');
  }
  if (r.output_text) return r.output_text;
  return JSON.stringify(r);
}

// Deterministic evidence check: a quote only counts if it really appears on the page it cites.
const UNK = 'Not published by the provider';
function clean(v) { if (typeof v === 'string') return /^(could_not_verify|unknown|n\/a|not published.*)$/i.test(v.trim()) ? UNK : v; if (Array.isArray(v)) return v.map(clean); if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, clean(x)])); return v; }

function verifyGuide(d, pages, { slug, name, tk }) {
  d = clean(d);
  const byId = Object.fromEntries(pages.map(p => [p.id, p]));
  const sources = [];
  let matched = 0, unmatched = 0;
  for (const s of d.sources || []) {
    const p = byId[s.id];
    if (!p) continue;
    const ok = quoteFound(s.quote, p.text);
    ok ? matched++ : unmatched++;
    sources.push({ title: p.title || p.url, url: p.url, quote: s.quote, supports: s.supports, quote_found: ok });
  }
  // pages that were read but never cited are still listed, for transparency
  for (const p of pages) if (!sources.some(s => s.url === p.url)) sources.push({ title: p.title || p.url, url: p.url, quote: '', supports: 'Read by the agent, not cited', quote_found: null });
  const v = d.verification || {};
  const flagged = (d.sources || []).filter(s => byId[s.id] && !quoteFound(s.quote, byId[s.id].text)).map(s => `Quote not found on ${byId[s.id].url}: "${(s.quote || '').slice(0, 120)}" (treat "${s.supports}" as unverified)`);
  return {
    slug, name, website: '', category: tk ? tk.category : '',
    one_liner: d.one_liner, difficulty: d.difficulty, difficulty_reason: d.difficulty_reason,
    time_to_first_test: d.time_to_first_test, time_to_production: d.time_to_production,
    approval: d.approval || {}, account_prerequisites: d.account_prerequisites || [], steps: d.steps || [],
    nuances: d.nuances || [], blockers: d.blockers || [], agent_can_do: d.agent_can_do || [], you_must_do: d.you_must_do || [],
    composio_note: composioNote(tk), sources,
    verification: {
      checked_on: new Date().toISOString().slice(0, 10),
      method: `Generated live by an agent: web search, read ${pages.length} pages, drafted with ${MODEL.split('/').pop()}, then every quote was string-matched against the page it cites. Not reviewed by a human.`,
      verified: v.verified || [], inferred: v.inferred || [], could_not_verify: [...(v.could_not_verify || []), ...flagged],
      corrections: [], quotes_matched: matched, quotes_unmatched: unmatched,
    },
    generated: true, model: MODEL, last_updated: new Date().toISOString().slice(0, 10),
  };
}

function quoteFound(q, text) {
  const a = norm(q), t = norm(text);
  if (!a || a.length < 8) return false;
  if (t.includes(a)) return true;
  // tolerate small punctuation/ellipsis differences: 85% of 5-word shingles present
  const w = a.split(' ');
  if (w.length < 6) return false;
  let hit = 0, n = 0;
  for (let i = 0; i + 5 <= w.length; i++) { n++; if (t.includes(w.slice(i, i + 5).join(' '))) hit++; }
  return n > 0 && hit / n >= 0.85;
}

