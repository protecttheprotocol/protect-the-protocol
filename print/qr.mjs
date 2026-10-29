// Writes img/qr.svg, the QR code on every printed piece.
// Uppercase so it encodes in alphanumeric mode: version 2 (25 x 25), large modules, scans from further away.
// Usage: cd print && node qr.mjs
import QRCode from 'qrcode';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const HUB = 'HTTPS://PROTECTTHEPROTOCOL.ORG/';

const svg = await QRCode.toString(HUB, {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 4,
  color: { dark: '#1b1640', light: '#ffffff' },
});
const qr = QRCode.create(HUB, { errorCorrectionLevel: 'M' });
writeFileSync(fileURLToPath(new URL('../img/qr.svg', import.meta.url)), svg.replace('<svg ', '<svg role="img" aria-label="QR code for protecttheprotocol.org" '));
console.log(`img/qr.svg: version ${qr.version}, ${qr.modules.size} x ${qr.modules.size} modules`);
