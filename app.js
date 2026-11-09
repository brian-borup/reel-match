const CATS = {
  director: { prompt: 'Match each film to its director', col: 'Directors', verb: 'directed by' },
  actor:    { prompt: 'Match each film to one of its stars', col: 'Stars', verb: 'starring' },
  year:     { prompt: 'Match each film to its release year', col: 'Years', verb: 'released in' },
};
const DIFFS = {
  matinee: { label: 'Matinee', pairs: 4, maxTier: 1, penalty: 25 },
  feature: { label: 'Feature', pairs: 5, maxTier: 2, penalty: 25 },
  cut:     { label: "Director's Cut", pairs: 6, maxTier: 2, penalty: 50 },
};
const ROUNDS = 5;

const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Picks films whose answers are unambiguous within the round:
// answers are unique, and in Stars mode no film in the round also features another film's star.
function buildRound(cat, n, pool, used) {
  const picks = [];
  for (const f of shuffle(pool.slice())) {
    if (picks.length === n) break;
    if (used.has(f.title)) continue;
    let answer = null;
    if (cat === 'director') answer = f.dir;
    else if (cat === 'year') answer = String(f.year);
    else {
      if (!f.cast.length || picks.some(p => f.cast.includes(p.answer))) continue;
      answer = f.cast.find(c => !picks.some(p => p.cast.includes(c))) || null;
    }
    if (!answer || picks.some(p => p.answer === answer)) continue;
    picks.push({ title: f.title, year: f.year, cast: f.cast, answer });
  }
  picks.forEach(p => used.add(p.title));
  const idx = picks.map((_, i) => i);
  return {
    cat,
    pairs: picks.map(({ title, year, answer }) => ({ title, year, answer })),
    filmOrder: shuffle(idx.slice()),
    ansOrder: shuffle(idx.slice()),
    badge: picks.map(() => 0),
    misses: 0,
  };
}

function makeGame(catChoice, diffKey) {
  const d = DIFFS[diffKey];
  const pool = FILMS.filter(f => f.tier <= d.maxTier);
  let cats;
  if (catChoice === 'mixed') {
    const keys = Object.keys(CATS);
    cats = shuffle([...keys, ...shuffle(keys.slice()).slice(0, ROUNDS - keys.length)]);
  } else cats = Array(ROUNDS).fill(catChoice);
  const used = new Set();
  return {
    catChoice, diffKey,
    rounds: cats.map(c => buildRound(c, d.pairs, pool, used)),
    round: 0, score: 0, streak: 0, bestStreak: 0, misses: 0, correct: 0,
    sel: null, phase: 'play', bonus: 0, msg: '', msgKind: '', newBest: false,
  };
}

let state;
let flash = null; // transient: tiles to animate as wrong

const bestKey = s => `reelmatch-best-${s.diffKey}-${s.catChoice}`;
function readBest(s) { try { return Number(localStorage.getItem(bestKey(s))) || 0; } catch { return 0; } }
function writeBest(s, v) { try { localStorage.setItem(bestKey(s), String(v)); } catch {} }

const $ = id => document.getElementById(id);
const board = $('board');

function renderHud() {
  const s = state;
  $('h-reel').textContent = `${Math.min(s.round + 1, ROUNDS)}/${ROUNDS}`;
  $('h-dots').innerHTML = s.rounds.map((_, i) =>
    `<i class="${i < s.round || s.phase === 'end' ? 'done' : i === s.round ? 'now' : ''}"></i>`).join('');
  $('h-score').textContent = s.score.toLocaleString();
  $('h-streak').textContent = s.streak ? `×${s.streak}` : '0';
  $('h-miss').textContent = s.misses;
  const best = readBest(s);
  $('h-best').textContent = best ? best.toLocaleString() : '–';
}

function renderPlay() {
  const s = state, r = s.rounds[s.round], c = CATS[r.cat];
  const sel = s.sel;
  const film = i => {
    const p = r.pairs[i], m = r.badge[i];
    const cls = ['tile', 'film', m ? 'ok' : '', sel && sel.side === 'f' && sel.i === i ? 'sel' : '', flash && flash.f === i ? 'bad' : ''].join(' ');
    const meta = r.cat === 'year' ? '' : `<span class="film-meta">${p.year}</span>`;
    return `<button type="button" class="${cls}" data-side="f" data-i="${i}" ${m ? 'disabled' : ''}
      aria-pressed="${!!(sel && sel.side === 'f' && sel.i === i)}">
      <span class="stub" aria-hidden="true">${m ? '#' + m : ''}</span>
      <span class="film-body"><span class="film-title">${esc(p.title)}</span>${meta}</span></button>`;
  };
  const ans = i => {
    const p = r.pairs[i], m = r.badge[i];
    const cls = ['tile', 'answer', r.cat === 'year' ? 'yr' : '', m ? 'ok' : '', sel && sel.side === 'a' && sel.i === i ? 'sel' : '', flash && flash.a === i ? 'bad' : ''].join(' ');
    return `<button type="button" class="${cls}" data-side="a" data-i="${i}" ${m ? 'disabled' : ''}
      aria-pressed="${!!(sel && sel.side === 'a' && sel.i === i)}">
      <span class="txt">${esc(p.answer)}</span><span class="badge" aria-hidden="true">${m ? '#' + m : ''}</span></button>`;
  };
  board.innerHTML = `
    <div class="prompt"><h2>${c.prompt}</h2><p>Pick a film, then its match. Either side works first.</p></div>
    <div class="cols">
      <div class="col films"><div class="col-head">Films</div>${r.filmOrder.map(film).join('')}</div>
      <div class="col answers"><div class="col-head">${c.col}</div>${r.ansOrder.map(ans).join('')}</div>
    </div>
    <p class="status ${s.msgKind}" role="status" aria-live="polite">${esc(s.msg)}</p>`;
}

function renderRoundEnd() {
  const s = state, r = s.rounds[s.round], c = CATS[r.cat];
  const last = s.round === ROUNDS - 1;
  board.innerHTML = `
    <section class="panel" aria-live="polite">
      <h3><small>Reel ${s.round + 1} of ${ROUNDS}</small>${r.misses ? "That's a wrap" : 'Perfect take'}</h3>
      ${s.bonus ? `<p class="bonus">+${s.bonus} clean-reel bonus</p>` : `<p class="bonus" style="color:var(--muted)">${r.misses} miss${r.misses === 1 ? '' : 'es'} this reel</p>`}
      <ul class="credits">${r.pairs.map(p => `<li><span>${esc(p.title)}</span><span>${c.verb} ${esc(p.answer)}</span></li>`).join('')}</ul>
      <div class="row"><button type="button" class="btn primary" id="next">${last ? 'See the reviews' : `Roll reel ${s.round + 2}`}</button></div>
    </section>`;
  $('next').focus();
}

function verdictFor(stars) {
  return [
    'Rough cut. The projector jammed a few times, but every reel got screened.',
    'Mixed reviews. You know your way around the multiplex.',
    'A solid crowd-pleaser. Critics call it a fun night out.',
    'Two thumbs way up. A real film buff.',
    'Instant classic. You could program a repertory cinema.',
  ][stars - 1];
}

function renderEnd() {
  const s = state;
  const total = s.correct + s.misses;
  const acc = total ? s.correct / total : 0;
  const stars = acc >= 0.95 ? 5 : acc >= 0.85 ? 4 : acc >= 0.7 ? 3 : acc >= 0.5 ? 2 : 1;
  board.innerHTML = `
    <section class="panel" aria-live="polite">
      <h3><small>${DIFFS[s.diffKey].label} · ${s.catChoice === 'mixed' ? 'Mixed' : CATS[s.catChoice].col}</small>The reviews are in</h3>
      <div class="final">
        <div><p class="label">Final score</p><div class="big">${s.score.toLocaleString()}</div></div>
        <div><p class="label">Rating</p><div class="stars" aria-label="${stars} of 5 stars">${'★'.repeat(stars)}<span class="off">${'★'.repeat(5 - stars)}</span></div></div>
        <div><p class="label">Accuracy</p><b style="font:700 20px var(--f-mono)">${Math.round(acc * 100)}%</b></div>
        <div><p class="label">Best streak</p><b style="font:700 20px var(--f-mono)">×${s.bestStreak}</b></div>
      </div>
      ${s.newBest ? '<p><span class="newbest">New best for this setup</span></p>' : ''}
      <p class="verdict">${verdictFor(stars)}</p>
      <ul class="credits">${s.rounds.map((r, i) =>
        `<li class="rh"><span>Reel ${i + 1} · ${CATS[r.cat].col}</span></li>` +
        r.pairs.map(p => `<li><span>${esc(p.title)}</span><span>${CATS[r.cat].verb} ${esc(p.answer)}</span></li>`).join('')
      ).join('')}</ul>
      <div class="row"><button type="button" class="btn primary" id="again">Play again</button></div>
    </section>`;
  $('again').focus();
}

function render() {
  renderHud();
  if (state.phase === 'play') renderPlay();
  else if (state.phase === 'roundEnd') renderRoundEnd();
  else renderEnd();
}

function pick(side, i) {
  const s = state, r = s.rounds[s.round];
  if (r.badge[i] && (side === 'f' || side === 'a')) return;
  if (!s.sel || s.sel.side === side) {
    s.sel = s.sel && s.sel.i === i && s.sel.side === side ? null : { side, i };
    s.msg = ''; s.msgKind = '';
    render(); refocus(side, i);
    return;
  }
  const f = side === 'f' ? i : s.sel.i;
  const a = side === 'a' ? i : s.sel.i;
  s.sel = null;
  const d = DIFFS[s.diffKey];
  if (f === a) {
    const gain = 100 + 20 * Math.min(s.streak, 5);
    s.streak++; s.bestStreak = Math.max(s.bestStreak, s.streak);
    s.correct++; s.score += gain;
    r.badge[f] = r.badge.filter(Boolean).length + 1;
    s.msg = `+${gain}  ${r.pairs[f].title}, ${CATS[r.cat].verb} ${r.pairs[f].answer}.`;
    s.msgKind = 'ok';
    if (r.badge.every(Boolean)) {
      render();
      setTimeout(finishRound, 650);
      return;
    }
  } else {
    s.streak = 0; s.misses++; r.misses++;
    s.score = Math.max(0, s.score - d.penalty);
    s.msg = `No match. ${r.pairs[f].title} isn't ${CATS[r.cat].verb} ${r.pairs[a].answer}. −${d.penalty}`;
    s.msgKind = 'bad';
    flash = { f, a };
  }
  render();
  flash = null;
  refocusNext();
}

function finishRound() {
  const s = state, r = s.rounds[s.round];
  s.bonus = r.misses ? 0 : 150;
  s.score += s.bonus;
  s.msg = ''; s.msgKind = '';
  s.phase = 'roundEnd';
  render();
}

function nextRound() {
  const s = state;
  if (s.round === ROUNDS - 1) {
    s.phase = 'end';
    if (s.score > readBest(s)) { writeBest(s, s.score); s.newBest = true; }
  } else {
    s.round++; s.phase = 'play'; s.bonus = 0;
  }
  render();
  if (s.phase === 'play') refocusNext();
}

function refocus(side, i) {
  const el = board.querySelector(`[data-side="${side}"][data-i="${i}"]`);
  if (el && !el.disabled) el.focus();
}
function refocusNext() {
  const el = board.querySelector('.tile:not(:disabled)');
  if (el) el.focus({ preventScroll: true });
}

board.addEventListener('click', e => {
  const t = e.target.closest('.tile');
  if (t && !t.disabled && state.phase === 'play') return pick(t.dataset.side, Number(t.dataset.i));
  if (e.target.closest('#next')) return nextRound();
  if (e.target.closest('#again')) return startNew();
});

function startNew() {
  const f = $('controls');
  state = makeGame(f.cat.value, f.diff.value);
  render();
}
$('controls').addEventListener('submit', e => { e.preventDefault(); startNew(); });
$('controls').addEventListener('change', () => startNew());

startNew();

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => { /* offline caching unavailable */ });
  });
}
