const { SCENES } = require('./scenes.js');
const MAX = 84;
const chunks = (text) => {
  const parts = text
    .split(/(?<=[.:,])\s+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const out = [];
  for (const part of parts) {
    const last = out[out.length - 1];
    if (last && (last + ' ' + part).length <= MAX) out[out.length - 1] = last + ' ' + part;
    else out.push(part);
  }
  return out;
};
const stamp = (s) => {
  const ms = Math.round(s * 1000);
  const h = String(Math.floor(ms / 3600000)).padStart(2, '0');
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
  const sec = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  return `${h}:${m}:${sec}.${String(ms % 1000).padStart(3, '0')}`;
};
let vtt = 'WEBVTT\n\n';
let n = 1;
for (const scene of SCENES) {
  const lines = chunks(scene.caption);
  const total = lines.reduce((t, l) => t + l.length, 0);
  let t = scene.start + 0.3;
  const span = scene.end - 0.2 - t;
  for (const line of lines) {
    const d = (span * line.length) / total;
    vtt += `${n++}\n${stamp(t)} --> ${stamp(t + d)}\n${line}\n\n`;
    t += d;
  }
}
process.stdout.write(vtt);
