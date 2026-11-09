// Checks the film list in data.js:  node tools/check-data.js
// Counts films per decade and tier, and lists duplicate titles, odd years,
// films with no stars, and names that differ only in case or spacing.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const src = fs.readFileSync(path.join(__dirname, '..', 'data.js'), 'utf8');
const ctx = {};
vm.runInNewContext(src + '\nthis.FILMS = FILMS;', ctx);
const films = ctx.FILMS;
const problems = [];

const decades = {};
const tiers = {};
for (const f of films) {
  const d = Math.floor(f.year / 10) * 10;
  decades[d] = (decades[d] || 0) + 1;
  tiers[f.tier] = (tiers[f.tier] || 0) + 1;
  if (!(f.year >= 1900 && f.year <= new Date().getFullYear())) problems.push(`Odd year: ${f.title} (${f.year})`);
  if (!f.dir) problems.push(`No director: ${f.title}`);
  if (!f.cast.length) problems.push(`No stars (skipped in Stars rounds): ${f.title}`);
}

const seen = new Map();
for (const f of films) {
  const k = f.title.toLowerCase();
  if (seen.has(k)) problems.push(`Duplicate title: ${f.title}`);
  seen.set(k, f);
}

const names = new Map();
for (const n of films.flatMap(f => [f.dir, ...f.cast])) {
  const k = n.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!names.has(k)) names.set(k, new Set());
  names.get(k).add(n);
}
for (const set of names.values()) if (set.size > 1) problems.push(`Spelled more than one way: ${[...set].join(' / ')}`);

console.log(`${films.length} films`);
console.log('By decade:', Object.entries(decades).map(([d, n]) => `${d}s ${n}`).join(', '));
console.log('By tier:', Object.entries(tiers).map(([t, n]) => `tier ${t}: ${n}`).join(', '));
console.log(problems.length ? '\n' + problems.join('\n') : '\nNo problems found.');
