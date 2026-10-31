# Protect the Protocol — brand kit

One page of fonts, colours and usage rules for the Devcon Mumbai ballot campaign.

This is `README.md` (the brand rules) and `tokens.json` (the values) flattened into a single sheet,
for people making campaign material **outside this repo**: Canva, Figma, slides, a print vendor.
It is written by hand, not generated. `tokens.json` stays the source of truth — if a value changes
there, change it here too, or delete the row rather than let it drift.

The whole system is built on one found object: the **"I VOTED NO for Decentralization Theater"** sticker.
Everything else is the paperwork around it — a ballot, a notice, a receipt.
**Violet is the ink, white is the paper, red is the NO.**

---

## 1. Fonts

| Role | Family | Weights used | Where it comes from |
| --- | --- | --- | --- |
| Display / UI | **Archivo** (variable) | 700–900, width axis 62–125 | `fonts/Archivo-Variable.woff2`, SIL Open Font License |
| Reading | **Source Serif 4** (variable, roman + italic) | 400–500 | `fonts/SourceSerif4-Variable.woff2`, SIL OFL |

```css
--font-display: "Archivo", "Arial Black", "Helvetica Neue", system-ui, sans-serif;
--font-serif:   "Source Serif 4", Georgia, "Times New Roman", serif;
```

**Division of labour.** Archivo does headlines, labels, buttons and numbers — anything stated.
Source Serif 4 does anything a person reads in full: questions, statements, measures, updates.
The serif echoes the serif on the sticker; that is the reason it is there.

**Rules.**
- Uppercase for display lines and labels only. Sentence case everywhere else.
- Display lines run tight: line-height 0.9–1, slight negative tracking.
- Archivo's width axis is available for poster headlines that need condensing. Don't fake it with scaling.
- Both are open-licensed, so they can ship in the repo, in Canva, and to a printer.

### Type scale

| Style | Family | Size | Line-height | Weight | Tracking | Use |
| --- | --- | --- | --- | --- | --- | --- |
| `t-display-xl` | Archivo | 112px | 0.9 | 900 | -0.025em | Hero line, one per page. UPPERCASE. Drops to 48px on phones. |
| `t-display-l` | Archivo | 72px | 0.92 | 900 | -0.02em | Poster headline. UPPERCASE. |
| `t-headline` | Archivo | 40px | 1 | 900 | -0.01em | Section titles. UPPERCASE. |
| `t-title` | Archivo | 28px | 1.1 | 800 | — | Notice values, card titles. Sentence case. |
| `t-ui` | Archivo | 17px | 1.2 | 700 | — | Buttons. |
| `t-label` | Archivo | 13px | 1.2 | 700 | +0.08em | Eyebrows, ballot labels. UPPERCASE. |
| `t-question` | Source Serif 4 | 28px | 1.2 | 500 | — | Ballot questions. |
| `t-lead` | Source Serif 4 | 21px | 1.4 | 400 | — | Standfirsts, poster kickers. |
| `t-body` | Source Serif 4 | 18px | 1.55 | 400 | — | Body copy. |
| `t-small` | Source Serif 4 | 15px | 1.5 | 400 | — | Fine print, receipts. |

Sizes are the web/base-size values. Posters are rendered from HTML at a base size and scaled, so the
ratios hold at A2 and A1 — scale the whole sheet, never one element.

---

## 2. Colour

Two themes: **Ballot** (light) and **Night** (dark). `field` violet is the same in both.

| Token | Light | Night | What it's for |
| --- | --- | --- | --- |
| `paper` | `#ffffff` | `#120e2e` | Page ground and the ballot sheet inside the violet frame. |
| `paper-tint` | `#f1efff` | `#1c1745` | Alternate bands (endorsements, result panel). Same text tokens as paper. |
| `ink` | `#1b1640` | `#ffffff` | Body copy, questions, statements. 17:1 light, 18:1 dark. |
| `ink-muted` | `#4a4570` | `#b7aee6` | Fine print, timestamps, placeholders. 7.8:1+. |
| `violet` | `#482ade` | `#9d8cff` | **The ballot ink.** Headlines, labels, rules, boxes, outline buttons, links. 7.9:1 / 6.8:1. |
| `violet-deep` | `#2a1ea6` | `#c2b8ff` | Hover / pressed on violet links and outline buttons. |
| `violet-soft` | `#6b5fd0` | `#b7aee6` | Notice keys (WHO, MISSION, GOAL) so the values lead. 5:1 on white. |
| `field` | `#482ade` | `#482ade` | Solid violet fill: poster frames, status bar, footer, callout bars. |
| `on-field` | `#ffffff` | `#ffffff` | Text and marks on `field`. 7.9:1. |
| `on-field-accent` | `#ff8a98` | `#ff8a98` | The one red note on violet: a full stop, the live dot, the reversed check. Graphic or 24px+ only (3.5:1). |
| `red` | `#f0243c` | `#ff5468` | **The NO.** Display words, the checked box, the vote button fill. 4.2:1 on white. |
| `red-ink` | `#d41530` | `#ff5468` | Red text under 19px, and vote-button hover. 5.3:1 on white. |
| `on-red` | `#ffffff` | `#120e2e` | Text on a red fill. Keep it 19px bold or larger. |
| `rule` | `#d9d3fa` | `#3a3270` | Hairline dividers between notice rows. Decorative only. |
| `focus` | `#1b1640` | `#ffffff` | Keyboard focus ring: 3px solid, 3px offset. On `field`, use `on-field`. |

### Colour rules

- **Violet does everything structural.** If an element is holding the layout together, it is violet.
- **Red is rationed: at most three appearances per surface** — the word NO (or the `!`), the checked box,
  the vote button. Nothing else.
- **Red text has a size floor.** 24px+, or bold at 19px+. Smaller red text uses `red-ink`.
- On a hook poster the turn of the line may sit on a red **marker band** (`on-red` text, 40px+ only).
  When it does, nothing else on that surface is red except the `!`.
- `paper-tint` is the only way to separate bands. **No other colours, no gradients, no photo textures.**
- Night keeps `field` violet and lightens the inks. Text on a red fill flips to dark (`on-red`).

---

## 3. Shape, space, stroke

**Borders carry the system. No shadows on boxes.**

| Token | Value | Use |
| --- | --- | --- |
| `radius-0` | `0px` | Everything rectangular: buttons, ballots, cards, frames. |
| `radius-round` | `9999px` | Round things only: sticker, endorsement badges, play button, live dot. |
| `stroke-rule` | `2px` | Row dividers, update rows. |
| `stroke-box` | `3px` | Cards, outline buttons, small ballot boxes. |
| `stroke-heavy` | `4px` | The ballot form, header rules, large check boxes. |
| `stroke-frame` | `14px` | Violet frame around a sheet on the web. Posters: ~5% of the short side. |
| `shadow-sticker` | `0 8px 18px rgba(20,10,80,.35)` (dark: `rgba(0,0,0,.5)`) | **Only** on stickers and badges — things slapped onto the page. |

Spacing scale: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`px (`space-1`…`space-9`).
Page gutter `space-5` (24px), sections `space-8` (64px) apart, max content width `measure` 1160px.

**The sheet.** White paper inside a violet frame. That is the poster format and the video frame.

**The sticker.** Slapped on, never placed: tilt `-6deg` to `-8deg` (range -6 to -8), `shadow-sticker`,
overlapping a frame edge or a block corner. **One sticker per surface. It must never cover a headline word.**
Source artwork is 1280px, good to about A3. A2 and larger needs the vector original from its designer.

**The mark.** Violet ballot box, red check breaking out of it (`mark.svg`). Favicon, avatar, beside the
wordmark. On violet use `mark-reverse.svg` (white box, `on-field-accent` check).

**Icons** are drawn inline as heavy strokes in `currentColor`: check, play triangle, arrow.
No icon font, no emoji.

---

## 4. Motion

- The check **draws itself** — `stroke-dashoffset`, 450ms ease-out.
- The sticker **slaps down** — scale 1.9 → 1, rotate -24° → -6°, 420ms with overshoot.
- The film curtain opens once.
- **Nothing loops.** With `prefers-reduced-motion`, checks appear already drawn and stickers already placed.

---

## 5. Voice

- Write like a ballot. Short declarative lines, real yes/no questions, plain words.
- The campaign speaks as **we** (the Farcaster community) to **you** (the Ethereum community). Never as a brand.
- Irony lives in the theater metaphor and is used **once per surface** ("Bravo.", "a tragedy in one act").
  Never sneer at people.
- No emoji. No exclamation marks except the one in **Protect the Protocol!**
- No stock campaign language ("join the movement"), no "not X, but Y", no em-dash asides.
- Placeholders are bracketed and uppercase: `[SUPPORTING PARTY]`, `[LOGO]`. Never invent names, numbers or quotes.

Lines that already exist — reuse rather than rewrite:

| Use | Copy |
| --- | --- |
| Headline | Vote no on decentralization theater. |
| Mission | Protect the Protocol! |
| Question | Should an open social protocol depend on the permission of a single company? |
| Statement | A door is not an exit if someone else holds the key. |
| Kicker | A permission that can be revoked is not freedom. |
| Ask | Ethereum, stand with us. |
| Where | The Onchain Art Community Hub |

---

## 6. Output sizes

| Piece | Spec |
| --- | --- |
| Poster (vector) | PDF, A2 420 × 594mm — scales across the A series |
| Poster (raster) | PNG 4962 × 7013 (A2 at 300dpi) |
| Screen | 3840 × 2160 |
| Social | 2160 × 2160 |
| Link preview | `img/share.png`, 1200px |

Posters are rendered from HTML masters in `print/` via `node render.mjs` (drives installed Edge/Chrome,
~15s). Hook posters all come from `print/hooks.html` — edit copy in its `HOOKS` list and re-render;
the headline refits itself.

**QR.** Every printed piece carries the QR to the hub plus the URL written out beneath it, lowercase and
without `https://`: `protecttheprotocol.org`. The QR encodes `HTTPS://PROTECTTHEPROTOCOL.ORG/` in capitals
to stay at 25 × 25 modules, so it scans from further away. Ink on white, 4 modules of white around it,
**never recoloured, never tilted.**

**Printing the PDFs.** Text is embedded as subset Type 3 fonts, so the masters print correctly on a machine
with neither Archivo nor Source Serif 4 installed. Send the PDF, not the HTML.

---

## 7. Quick checklist before anything ships

- [ ] Violet frame, white sheet, square corners.
- [ ] Red used three times at most — and is one of them the word NO?
- [ ] Red text 24px+, or bold 19px+ (otherwise `red-ink`).
- [ ] One sticker, tilted -6° to -8°, covering no headline word.
- [ ] Display lines uppercase; reading text in Source Serif 4, sentence case.
- [ ] No gradients, no box shadows, no emoji, no invented facts or names.
- [ ] QR present, upright, ink-on-white, URL written out beneath it.
- [ ] Checked at narrow width and in Night theme.
