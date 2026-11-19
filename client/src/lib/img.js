// One place that turns an image entry into a URL.
// - `gp`: the studio's own photo from the shared Google Photos album (sized with =w<width>)
// - `cloudinary`: used when VITE_CLOUDINARY_CLOUD_NAME is set
// - `unsplash`: stand-in photo
const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export function imgUrl(image, width = 1200) {
  if (!image) return '';
  if (CLOUD && image.cloudinary) {
    return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto:good,c_limit,w_${width}/${image.cloudinary}`;
  }
  if (image.gp) return `${image.gp}=w${width}`;
  if (image.src) return image.src;
  return `https://images.unsplash.com/${image.unsplash}?auto=format&fit=crop&w=${width}&q=80`;
}

// Enough sizes that phones with sharp (2x–3x) screens get a crisp photo without downloading the original.
export function imgSrcSet(image, widths = [400, 640, 900, 1200, 1600, 2000, 2600]) {
  if (!image || (image.src && !image.cloudinary)) return undefined;
  return widths.map((w) => `${imgUrl(image, w)} ${w}w`).join(', ');
}
