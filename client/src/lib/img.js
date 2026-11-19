// One place that turns an image entry into a URL.
// Each entry in data/images.js has an Unsplash photo id and, optionally, a Cloudinary public id.
// When VITE_CLOUDINARY_CLOUD_NAME is set and an entry has `cloudinary`, Cloudinary is used.
const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export function imgUrl(image, width = 1200) {
  if (!image) return '';
  if (CLOUD && image.cloudinary) {
    return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,c_fill,w_${width}/${image.cloudinary}`;
  }
  if (image.src) return image.src;
  return `https://images.unsplash.com/${image.unsplash}?auto=format&fit=crop&w=${width}&q=75`;
}

export function imgSrcSet(image, widths = [480, 800, 1200, 1800]) {
  if (!image || (image.src && !image.cloudinary)) return undefined;
  return widths.map((w) => `${imgUrl(image, w)} ${w}w`).join(', ');
}
