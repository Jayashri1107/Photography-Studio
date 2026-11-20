// Downloads every photo in src/data/images.js into public/photos/ so the site no longer
// depends on the Google Photos album or Unsplash links.
// Run from the client folder:  node scripts/download-photos.mjs
// Each photo is saved in three widths (WebP): <group>-<key>-480.webp, -960.webp, -1280.webp.
// Existing files are skipped, so it is safe to run again after adding photos.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, '..', 'public', 'photos');
const { album, images } = await import(pathToFileURL(path.join(here, '..', 'src', 'data', 'images.js')).href);
export const WIDTHS = [480, 960, 1280];

const remote = (img, w) =>
  img.gp
    ? `${img.gp}=w${w}-rw`
    : `https://images.unsplash.com/${img.unsplash}?auto=format&fit=crop&w=${w}&q=72&fm=webp`;

fs.mkdirSync(out, { recursive: true });
const jobs = [];
for (const [group, set] of [['album', album], ['stock', images]]) {
  for (const [key, img] of Object.entries(set)) {
    if (!img.gp && !img.unsplash) continue;
    for (const w of WIDTHS) jobs.push({ file: path.join(out, `${group}-${key}-${w}.webp`), url: remote(img, w) });
  }
}

let done = 0, skipped = 0, failed = [];
async function get(job) {
  if (fs.existsSync(job.file)) return skipped++;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(job.url, { headers: { Accept: 'image/webp,image/*' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const type = res.headers.get('content-type') || '';
      if (!type.startsWith('image/')) throw new Error(`not an image (${type})`);
      fs.writeFileSync(job.file, Buffer.from(await res.arrayBuffer()));
      return done++;
    } catch (e) {
      if (attempt === 3) failed.push(`${path.basename(job.file)}: ${e.message}`);
    }
  }
}
// a few at a time, to be polite to the image servers
for (let i = 0; i < jobs.length; i += 6) await Promise.all(jobs.slice(i, i + 6).map(get));

const bytes = fs.readdirSync(out).reduce((n, f) => n + fs.statSync(path.join(out, f)).size, 0);
console.log(`downloaded ${done}, already there ${skipped}, failed ${failed.length}; folder size ${(bytes / 1048576).toFixed(1)} MB`);
if (failed.length) { console.log(failed.join('\n')); process.exitCode = 1; }
