import { site } from '../data/site';

// The logo file (231×240) has white space around the cream circle, and the circle sits a little
// right of centre (x 33–220, y 30–216). These numbers crop the file exactly to the circle,
// so the round logo shows with no white sliver at any size.
const crop = { width: '123.5%', height: '128.3%', left: '-17.6%', top: '-15.8%', maxWidth: 'none' };

export function LogoMark({ className = '', alt = '' }) {
  return (
    <span className={`relative block overflow-hidden rounded-full bg-[#F4E9D8] ${className}`}>
      <img src={site.logo} alt={alt} className="absolute" style={crop} />
    </span>
  );
}
