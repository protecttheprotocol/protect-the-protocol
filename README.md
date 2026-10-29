# Protect the Protocol

Devcon Mumbai hub and print kit for the Farcaster community campaign. Plain HTML and CSS, no build step.

```
index.html          the hub: film → vote → why we're here → link-outs → print kit
css/tokens.css      design tokens: colors (light + dark), spacing, strokes, fonts, type styles
css/components.css  pp-* components, shared by the site and the posters
css/site.css        page layout for index.html
js/ballot.js        the one-tap ballot
js/film.js          hero film controls (pause, sound)
js/downloads.js     print kit links: plain downloads, or the save prompt inside a claude.ai artifact
fonts/              Archivo + Source Serif 4, variable woff2 (SIL OFL)
img/                mark.svg, mark-reverse.svg, sticker.png (cut-out), qr.svg, share.png (link preview)
design/             README.md (brand rules) + tokens.json (source for the design system)
print/              poster sources (*.html), qr.mjs and render.mjs; masters land in print/out/ (committed: the print kit links to them)
```

The site lives at https://protecttheprotocol.org/.

## Run the site

Open `index.html` directly, or serve the folder:

```sh
npx serve .
```

Deploy the repo root as a static site. `print/` and `design/` can be excluded from the deploy.

## Edit the site

Everything is in `index.html`, in four commented blocks. Edit them in GitHub's web editor or in a PR.

- **Film.** Host the video on a streaming service (Mux, Cloudflare Stream, Livepeer), not in git. Add its MP4 URL as a `<source>` inside the `<video>` and a still as `poster="…"`. Until there is a source, the page shows a `[Campaign film]` placeholder and hides the buttons. The film plays muted, once, and ends; visitors can pause it or turn the sound on (which restarts it). With reduced motion it starts paused.
- **Vote.** One tap, no backend. Voting NO prints a receipt and asks people to cast it on Farcaster: the cast is the vote of record. To count votes, send each one to a counter from `pick()` in `js/ballot.js`.
- **Why we're here.** One statement line, a few paragraphs, the three measures.
- **Link-outs.** One `<li>` per link in the `pp-links` list, most important first.

## Render the posters

```sh
cd print
npm install
node render.mjs                 # all masters
node render.mjs vote-square     # just one
```

`render.mjs` also writes `img/share.png` (1200 px, the site's link preview). If the URL ever changes, edit it in `qr.mjs`, run `node qr.mjs` to regenerate `img/qr.svg`, and update the written-out URL in the poster HTML files.

This drives the installed Edge or Chrome through playwright-core (set `BROWSER` to a browser path to pick one). About 15 seconds.

| File | Size |
| --- | --- |
| `ballot-poster.pdf`, `notice-poster.pdf` | vector, A2 420 x 594 mm (scales to any A size) |
| `ballot-poster.png`, `notice-poster.png` | 4962 x 7013 px (A2 at 300 dpi) |
| `notice-screen.png` | 3840 x 2160 |
| `vote-square.png` | 2160 x 2160 |

### Hook posters

`print/hooks.html` is one template for all hooks. The copy lives in its `HOOKS` list; the headline is sized to fit, so you can edit lines freely. Preview one in a browser with `print/hooks.html?h=door&f=poster` (`f` = `poster`, `square` or `screen`).

```sh
node render.mjs hooks          # all 6 hooks x 3 formats -> out/hooks/
node render.mjs hooks/door     # one hook
```

To add a hook, add an entry to `HOOKS` in `hooks.html` and its id to `HOOKS` in `render.mjs`.

## Before Devcon

- Fill in the film, the "Why we're here" paragraphs and the four link-out URLs (`[STATEMENT URL]`, `[CHANNEL URL]`, `[POSTERS URL]`, `[CONTACT URL]`) in `index.html`.
- Test-print one poster and scan its QR from a couple of meters away before the full print run.
- The sticker PNG is 912 px across, cut from a 1280 px JPG. It prints cleanly up to about A3. For A2 and up, get the vector original from whoever made it and drop it in as `img/sticker.svg` (then update the `src` attributes).

## Hosting

GitHub Pages serves the repo root from `main` (Settings → Pages → Deploy from a branch → `main`, `/ (root)`). `CNAME` holds the custom domain and `.nojekyll` makes Pages serve the files as they are. DNS for protecttheprotocol.org:

```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
CNAME www  protecttheprotocol.github.io
```

Once the certificate is issued, tick "Enforce HTTPS". Every push to `main` redeploys within a minute or two.

## License

The campaign materials are licensed under CC BY-SA 4.0 (see `LICENSE.md`). The fonts in `fonts/` keep their own license, the SIL Open Font License 1.1.
