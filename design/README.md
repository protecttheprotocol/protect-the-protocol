Protect the Protocol is a grassroots campaign from the Farcaster community, launched at Devcon Mumbai. The system is built on one found object: the **"I VOTED NO for Decentralization Theater"** sticker. Everything else is the paperwork around it: a ballot, a notice, a receipt. Violet is the ink, white is the paper, red is the NO.

## Voice

- Write like a ballot. Short declarative lines, real yes/no questions, plain words. "Cast your vote." "Should an open social protocol depend on the permission of a single company?"
- The campaign speaks as **we** (the Farcaster community) to **you** (the Ethereum community). Never as a brand.
- Irony stays in the theater metaphor and is used once per surface: "Bravo." for a YES vote, "a tragedy in one act". Never sneer at people.
- Uppercase for display lines and labels only. Sentence case everywhere else. No emoji. No exclamation marks except the one in **Protect the Protocol!**
- Avoid stock campaign language and anything that reads machine-written: no "join the movement", no "not X, but Y", no em-dash asides.
- Placeholders are bracketed and uppercase: `[SUPPORTING PARTY]`, `[LOGO]`. Never invent names, numbers or quotes.

Real lines to reuse:

| Use | Copy |
| --- | --- |
| Headline | Vote no on decentralization theater. |
| Mission | Protect the Protocol! |
| Question | Should an open social protocol depend on the permission of a single company? |
| Statement | A door is not an exit if someone else holds the key. |
| Kicker | A permission that can be revoked is not freedom. |
| Ask | Ethereum, stand with us. |
| Where | The Onchain Art Community Hub |

## Color

- `paper` is the ground; `ink` is reading text on it. `violet` does everything structural: headlines, labels, rules, boxes, links.
- `red` means NO and appears at most three times per surface: the word NO (or the `!`), the checked box, the vote button. On hook posters the turn of the line may sit on a red **marker** band (`on-red` text, 40px+ only), and then nothing else on that surface is red except the `!`. Red text on paper stays 24px+ or bold 19px+; smaller red text uses `red-ink`.
- `field` is a solid violet block (frames, status bar, footer, callouts). Text on it is `on-field`; its one red note is `on-field-accent`.
- `paper-tint` separates bands. Do not add other colors, gradients or photos-as-texture.
- The Night theme keeps `field` violet and lightens the ink colors. Text on a red fill flips to `on-red` (dark) there.

## Type

- **Archivo** (display family) for headlines, labels, buttons and numbers, weights 700–900. Uppercase display lines at tight leading (0.9) and slight negative tracking.
- **Source Serif 4** (serif family) for anything a person reads in full: questions, statements, measures, updates. It echoes the serif on the sticker.
- Styles: `t-display-xl` hero, `t-display-l` poster headline, `t-headline` section title, `t-title` notice values, `t-ui` buttons, `t-label` eyebrows, `t-question`, `t-lead`, `t-body`, `t-small`.
- Fonts ship as variable woff2 under `fonts/` (SIL Open Font License). Archivo's width axis (62–125) is available for posters that need a condensed headline.

## Shapes and layout

- Square corners (`radius-0`) on every box. Only round things are round (`radius-round`): sticker, badges, play button.
- Borders, not shadows. `stroke-heavy` for the ballot and header rules, `stroke-box` for cards and buttons, `stroke-rule` for dividers.
- The **sheet**: white paper inside a violet frame (`stroke-frame` on the web, about 5% of the short side on posters). It is the poster format and the video frame.
- The **sticker** is slapped on, never placed: tilt `-6deg` to `-8deg`, `shadow-sticker`, overlapping a frame edge or a block corner. It must never cover a headline word. One sticker per surface.
- Page width `measure` (1160px), gutter `space-5`, sections `space-8` apart.

## Components

Status bar, Wordmark, Button, Ballot, Measure, Notice, Sticker, Receipt, Endorsement, Update, Links (`pp-links`: big rows that leave the page, each with a stroke arrow). Class names start with `pp-` and live in `components/bundle.css` (`css/components.css` in the site repo). Each card below has its markup.

## Motion

- The check draws itself (`stroke-dashoffset`, 450ms ease-out). The sticker slaps down (scale 1.9 → 1, rotate -24° → -6°, 420ms overshoot). The film curtain opens once.
- Nothing loops. Respect `prefers-reduced-motion`: checks appear drawn, stickers appear placed.

## Iconography

- The **mark** (`assets/Logos/mark.svg`): a violet ballot box with a red check breaking out of it. Use it as favicon, avatar and beside the wordmark. On violet use `mark-reverse.svg` (white box, `on-field-accent` check).
- The **sticker** (`assets/Logos/sticker.png`) is the original artwork, cut out. The source is 1280px, which holds up to about A3. For A2 and larger, get the vector original from its designer.
- Icons are drawn inline as heavy strokes in `currentColor`: check, play triangle, arrow. No icon font, no emoji.

## Print and screens

- Poster masters are HTML at a base size, rendered by `print/render.mjs`: ISO portrait as vector PDF (A2) plus PNG at 4962×7013 (A2 300 dpi). Scale either to A3/A1; the ratio holds across the A series.
- Screens: 3840×2160. Social: 2160×2160.
- Hook posters come from one template (`print/hooks.html`), copy in its `HOOKS` list, each hook as poster, square and screen. The headline is fitted to the space, so edit copy freely and re-render. Lines: the first states the familiar idea (often `violet-soft` or struck through), the second turns it, on the marker. One serif sentence of context names Farcaster plainly.
- Every printed piece carries a QR to the hub and the URL written out beneath it, lowercase without `https://`: protecttheprotocol.org. The QR (`img/qr.svg`, from `print/qr.mjs`) encodes `HTTPS://PROTECTTHEPROTOCOL.ORG/` in capitals, which keeps it to 25 × 25 modules so it scans from further away. Ink on white, 4 modules of white around it, never recolored or tilted.
