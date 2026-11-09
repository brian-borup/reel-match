# Reel Match

A Progressive Web App matching game, a sibling of Mix & Match: match each movie to its director, its star or the year it came out.

**Use it:** https://brian-borup.github.io/reel-match/

On an iPhone, open that link in Safari, tap **Share → Add to Home Screen**. It then runs full-screen and works offline. Best scores are saved only on the device.

## Playing

- A game is five reels (rounds). Each reel has films down the left and their matches down the right, shuffled. Tap a film, then its match (or the other way round). A right match turns both cards green and gives them the same number.
- Match by **Directors**, **Stars**, **Years**, or **Mixed**, which changes category from reel to reel and always includes all three.
- **Matinee** has 4 pairs per reel from the best-known films. **Feature** has 5 pairs and adds classics and deeper cuts. **Director's Cut** has 6 pairs and wrong guesses cost double.
- Each right match scores 100 points plus 20 for every match in your current streak (up to +100). A wrong guess costs 25 (50 in Director's Cut) and resets the streak. Clear a reel without a wrong guess for a 150 point bonus.
- After each reel you see the correct answers. The final screen gives a 1 to 5 star rating from your accuracy and lists every answer. The best score for each setting is remembered.

No reel ever has two cards with the same answer, and in Stars reels no film features the star given for another film on the board, so every film has exactly one right answer.

## Films

The films live in `data.js` as `Title|Year|Director|Star;Star|tier`. Tier 1 is well known, tier 2 is for Feature and Director's Cut only. List a film's best-known stars first, and spell each name the same way every time. After editing, run:

```
node tools/check-data.js
```

It counts the films per decade and tier and lists duplicates, odd years and names spelled more than one way.

## Icons

The icons are drawn by `tools/make-icons.ps1` (Windows):

```
pwsh tools/make-icons.ps1
```

## Developing

Plain HTML, CSS and JavaScript, no build step.

```
node serve.js
```

then open http://localhost:8085. When you change any app file, bump `CACHE` in `sw.js` so installed copies pick up the update.
