// Renders the poster masters with Edge or Chrome via playwright-core.
//   PNG: base layout x device scale factor
//   PDF: vector, page size from each file's @page rule (ISO posters only)
// Usage: cd print && npm install && node render.mjs [name ...]
import { chromium } from 'playwright-core';
import { existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, 'out');
mkdirSync(out, { recursive: true });

const candidates = [
  process.env.BROWSER,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));
if (!executablePath) throw new Error('No Chrome or Edge found. Set BROWSER to its path.');

// ISO portrait 600 x 848 at 8.27 = 4962 x 7013 px (A2 at 300 dpi). Screen and square at 4x.
const jobs = [
  { name: 'ballot-poster', w: 600, h: 848, scale: 8.27, pdf: true },
  { name: 'notice-poster', w: 600, h: 848, scale: 8.27, pdf: true },
  { name: 'notice-screen', w: 960, h: 540, scale: 4 },
  { name: 'vote-square', w: 540, h: 540, scale: 4 },
  // Flag: 3.2 : 1, vector PDF at 96 x 30 in. The PNG stops at 15x (14400 x 4500)
  // because Chrome tiles and corrupts a capture past 16384 px; for the full
  // 28800 x 9000 raster, rasterise the PDF: pdftoppm -r 300 -png.
  { name: 'vote-horizontal', w: 960, h: 300, scale: 15, pdf: true },
  // Link preview image for the site (og:image), 1200 px.
  { name: 'share', file: 'vote-square.html', w: 540, h: 540, scale: 1200 / 540, png: path.join(here, '../img/share.png') },
];
// Hooks: one template (hooks.html), every hook in three formats, into out/hooks/.
const HOOKS = ['cant-be-evil', 'ban-you', 'theater', 'door', 'one-admin', 'so-did-we'];
const FORMATS = {
  poster: { w: 600, h: 848, scale: 8.27, pdf: true },
  square: { w: 540, h: 540, scale: 4 },
  screen: { w: 960, h: 540, scale: 4 },
};
for (const h of HOOKS) {
  for (const [f, size] of Object.entries(FORMATS)) {
    jobs.push({ name: `hooks/${h}-${f}`, file: 'hooks.html', query: `?h=${h}&f=${f}`, group: 'hooks', ...size });
  }
}
mkdirSync(path.join(out, 'hooks'), { recursive: true });

// Args filter by name prefix: `node render.mjs hooks/door` or `node render.mjs hooks`.
const only = process.argv.slice(2);

const browser = await chromium.launch({ executablePath });
try {
  for (const job of jobs.filter((j) => !only.length || only.some((o) => j.name.startsWith(o)))) {
    const url = pathToFileURL(path.join(here, job.file ?? `${job.name}.html`)).href + (job.query ?? '');
    const page = await browser.newPage({ viewport: { width: job.w, height: job.h }, deviceScaleFactor: job.scale });
    await page.goto(url, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    if (job.group) await page.waitForSelector('html[data-ready]');
    const png = job.png ?? path.join(out, `${job.name}.png`);
    await page.screenshot({ path: png });
    console.log(path.relative(here, png));
    if (job.pdf) {
      await page.emulateMedia({ media: 'print' });
      await page.pdf({ path: path.join(out, `${job.name}.pdf`), preferCSSPageSize: true, printBackground: true });
      console.log(`out/${job.name}.pdf`);
    }
    await page.close();
  }
} finally {
  await browser.close();
}
