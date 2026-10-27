import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW_PATH);
const base = process.argv[2] || 'https://oauth-guides.muralikd.workers.dev';
const b = await chromium.launch();
for (const [w, tag] of [[390, 'phone'], [1280, 'desktop']]) {
  const p = await b.newPage({ viewport: { width: w, height: 844 }, deviceScaleFactor: 2 });
  for (const [path, name] of [['/', 'home'], ['/g/google-gmail', 'gmail'], ['/g/calendly', 'calendly']]) {
    await p.goto(base + path, { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
    await p.screenshot({ path: `tools/shots/${tag}-${name}.png`, fullPage: name !== 'home' ? false : true });
  }
  const sw = await p.evaluate(() => document.documentElement.scrollWidth); console.log(tag, 'scrollWidth', sw);
}
await b.close();
