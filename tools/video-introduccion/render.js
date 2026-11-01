// Renders public/media/pensil-pos/introduccion.{mp4,jpg,es.vtt}. See README.md.
// Usage: node render.js            (whole video)
//        node render.js 4 27 62    (only those instants, as preview-<t>.png)
const { chromium } = require('playwright');
const { execFileSync, spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { DURATION } = require('./scenes.js');

const FPS = 30;
const SCREENS = path.resolve(__dirname, '../../../pensilpos-frontend/src/assets/images');
const OUT = path.resolve(__dirname, '../../public/media/pensil-pos');
const ASSETS = path.join(__dirname, 'assets');

function copyScreens() {
  fs.mkdirSync(ASSETS, { recursive: true });
  for (const name of fs.readdirSync(path.join(SCREENS, 'landing'))) {
    if (!name.includes('-dark'))
      fs.copyFileSync(path.join(SCREENS, 'landing', name), path.join(ASSETS, name));
  }
  fs.copyFileSync(
    path.join(SCREENS, 'brand/pensilpos-logo.png'),
    path.join(ASSETS, 'pensilpos-logo.png'),
  );
}

(async () => {
  copyScreens();
  const instants = process.argv.slice(2).map(Number);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('file://' + path.join(__dirname, 'index.html'));
  await page.evaluate(() => window.ready);
  if (instants.length > 0) {
    for (const t of instants) {
      await page.evaluate((time) => window.renderAt(time), t);
      await page.screenshot({ path: path.join(__dirname, `preview-${t}.png`) });
    }
  } else {
    const video = path.join(OUT, 'introduccion.mp4');
    const ffmpeg = spawn(
      'ffmpeg',
      [
        '-y',
        '-loglevel',
        'error',
        '-f',
        'image2pipe',
        '-framerate',
        String(FPS),
        '-c:v',
        'mjpeg',
        '-i',
        '-',
        '-c:v',
        'libx264',
        '-preset',
        'slow',
        '-crf',
        '27',
        '-pix_fmt',
        'yuv420p',
        '-movflags',
        '+faststart',
        '-r',
        String(FPS),
        video,
      ],
      { stdio: ['pipe', 'inherit', 'inherit'] },
    );
    const frames = Math.round(DURATION * FPS);
    for (let i = 0; i < frames; i++) {
      await page.evaluate((time) => window.renderAt(time), i / FPS);
      const jpeg = await page.screenshot({ type: 'jpeg', quality: 92 });
      if (!ffmpeg.stdin.write(jpeg))
        await new Promise((resolve) => ffmpeg.stdin.once('drain', resolve));
      if (i % 300 === 0) console.log(`cuadro ${i}/${frames}`);
    }
    ffmpeg.stdin.end();
    await new Promise((resolve) => ffmpeg.on('close', resolve));
    execFileSync('ffmpeg', [
      '-y',
      '-loglevel',
      'error',
      '-ss',
      '3.5',
      '-i',
      video,
      '-frames:v',
      '1',
      '-vf',
      'scale=1280:-1',
      '-q:v',
      '3',
      path.join(OUT, 'introduccion.jpg'),
    ]);
    fs.writeFileSync(
      path.join(OUT, 'introduccion.es.vtt'),
      execFileSync('node', [path.join(__dirname, 'vtt.js')]),
    );
  }
  await browser.close();
})();
