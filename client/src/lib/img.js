// One place that turns an image entry into a URL.
// - `local`: the photo saved in public/photos/ (scripts/download-photos.mjs) — used for every photo now
// - `cloudinary`: used when VITE_CLOUDINARY_CLOUD_NAME is set
// - `gp` / `unsplash`: the original online source, used only if a photo has no local copy
const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const BASE = import.meta.env.BASE_URL;
// The widths saved for each photo (keep in step with WIDTHS in scripts/download-photos.mjs).
export const LOCAL_WIDTHS = [480, 960, 1280];

const nearestLocal = (width) => LOCAL_WIDTHS.find((w) => w >= width) || LOCAL_WIDTHS[LOCAL_WIDTHS.length - 1];

export function imgUrl(image, width = 1200) {
  if (!image) return '';
  if (CLOUD && image.cloudinary) {
    return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto:good,c_limit,w_${width}/${image.cloudinary}`;
  }
  if (image.local) return `${BASE}photos/${image.local}-${nearestLocal(width)}.webp`;
  if (image.gp) return `${image.gp}=w${width}`;
  if (image.src) return image.src;
  return `https://images.unsplash.com/${image.unsplash}?auto=format&fit=crop&w=${width}&q=80`;
}

// Enough sizes that phones with sharp (2x–3x) screens get a crisp photo without downloading the largest file.
export function imgSrcSet(image, widths = [400, 640, 900, 1200, 1600, 2000, 2600]) {
  if (!image || (image.src && !image.cloudinary)) return undefined;
  if (image.local && !(CLOUD && image.cloudinary)) {
    return LOCAL_WIDTHS.map((w) => `${BASE}photos/${image.local}-${w}.webp ${w}w`).join(', ');
  }
  return widths.map((w) => `${imgUrl(image, w)} ${w}w`).join(', ');
}
