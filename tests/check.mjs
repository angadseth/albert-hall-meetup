// Sanity checks for the page: the sun times are plausible for Jaipur in October,
// and every file the page references exists.  Run with: node tests/check.mjs
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const Sun = require('../js/sun.js');

let failed = 0;
const ok = (cond, msg) => { console.log((cond ? 'ok   ' : 'FAIL ') + msg); if (!cond) failed++; };
const ist = d => d.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });

const e = Sun.evening();
ok(e.golden < e.sunset && e.sunset < e.blue && e.blue < e.dusk, 'light events are in order');
ok(ist(e.sunset) >= '17:55' && ist(e.sunset) <= '18:10', `sunset ${ist(e.sunset)} is around 6 PM`);
ok((e.dusk - e.sunset) / 60000 > 15 && (e.dusk - e.sunset) / 60000 < 35, 'civil twilight lasts 15 to 35 minutes');
ok(new Date('2026-10-10T12:00:00+05:30').toLocaleDateString('en-IN', { weekday: 'long', timeZone: 'Asia/Kolkata' }) === 'Saturday', '10 October 2026 is a Saturday');

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
for (const [, path] of html.matchAll(/(?:src|href)="((?:css|js|assets)\/[^"]+)"/g)) {
  ok(existsSync(new URL('../' + path, import.meta.url)), `file exists: ${path}`);
}
process.exit(failed ? 1 : 0);
