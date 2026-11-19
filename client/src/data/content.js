import { album as a, images as im } from './images';
import { categories } from './categories';

// ---------- Portfolio (masonry gallery) ----------
// Built from each category's gallery so new photos only need adding in one place.
const projectNames = {
  wedding: ['Red Bridal Story', 'Window Light', 'Maroon & Gold'],
  'pre-wedding': ['Spring Blossoms', 'Garden Promise', 'Pastel Afternoon'],
  portrait: ['Quiet Moments', 'Soft Light', 'Close & Candid'],
  maternity: ['Green Season', 'Soft Mornings', 'Awaiting'],
  newborn: ['Hello, Little One', 'First Fortnight', 'Sleepy Sundays'],
  events: ['Mehendi Evening', 'Naming Day', 'First Birthday'],
  fashion: ['Festive Edit', 'Handloom Story', 'Monsoon Lookbook'],
};

export const portfolio = categories.flatMap((c) =>
  [c.card, ...c.gallery]
    .filter((img, i, arr) => arr.indexOf(img) === i)
    .map((image, i) => ({
      id: `${c.slug}-${i}`,
      category: c.slug,
      categoryLabel: c.short,
      project: projectNames[c.slug][i % 3],
      image,
    }))
);

// The studio's own photos first, then the stand-in categories, interleaved so "All" feels curated.
export function interleaved(items) {
  const groups = categories.map((c) => items.filter((p) => p.category === c.slug));
  const out = [];
  const max = Math.max(...groups.map((g) => g.length));
  for (let i = 0; i < max; i++) groups.forEach((g) => g[i] && out.push(g[i]));
  return out;
}

// ---------- Featured projects / stories (the studio's own shoots) ----------
// `location` is shown only when filled in.
export const projects = [
  {
    slug: 'red-bridal-story',
    title: 'The Red Bridal Story',
    category: 'Wedding',
    categorySlug: 'wedding',
    location: '',
    cover: a.redGarden,
    summary: 'Red silk, gold and fresh mehendi in a green garden.',
    story: ['A bright, joyful bridal session among the trees — colour, jewellery and laughter.'],
    gallery: [a.brideMehendi, a.redGarden],
  },
  {
    slug: 'window-light',
    title: 'Window Light',
    category: 'Wedding',
    categorySlug: 'wedding',
    location: '',
    cover: a.windowLight,
    summary: 'Maroon, ivory and soft afternoon light through tall windows.',
    story: ['An indoor session shaped by curtains and window light — intimate, warm and quiet.'],
    gallery: [a.maroonEmbrace, a.windowHands, a.monoKiss, a.foreheadKiss],
  },
  {
    slug: 'spring-blossoms',
    title: 'Spring Blossoms',
    category: 'Pre-Wedding',
    categorySlug: 'pre-wedding',
    location: '',
    cover: a.blossomTwo,
    summary: 'Pastel outfits under a hedge of yellow flowers.',
    story: ['A relaxed garden session in soft pastels, framed by yellow blossoms.'],
    gallery: [a.pastelClose, a.blossomFour, a.pastelPortrait, a.gardenWalk],
  },
];

// ---------- Approach ----------
export const approach = [
  { icon: 'BookOpen', title: 'Creative Storytelling', text: 'Every gallery told like a story.' },
  { icon: 'Camera', title: 'Professional Photography', text: 'Pro cameras, fast lenses, full backup.' },
  { icon: 'Gem', title: 'Attention to Detail', text: 'Jewellery, mehendi, light — nothing missed.' },
  { icon: 'Palette', title: 'Beautiful Editing', text: 'Hand-edited, true and timeless colour.' },
];

// ---------- Packages (no prices until the studio provides them) ----------
export const packages = [
  { name: 'Essential', price: 'Price on request', ideal: 'Portraits & short sessions', inclusions: ['One photographer', 'Up to 4 hours', 'Edited online gallery', 'Delivery in 3 weeks'] },
  { name: 'Signature', price: 'Price on request', ideal: 'Full-day weddings', featured: true, inclusions: ['Two photographers', 'Full-day coverage', 'Next-day preview', 'Premium album'] },
  { name: 'Luxury', price: 'Price on request', ideal: 'Multi-day & destination', inclusions: ['Team of three', 'Multi-day coverage', 'Pre-wedding session', 'Two heirloom albums'] },
];
export const packagesNote = 'Prices on request · every package can be tailored.';

// ---------- Testimonials (placeholders — replace with genuine reviews) ----------
// `verified: true` shows a star rating; only set it for reviews you can verify.
export const testimonials = [
  { quote: 'Calm, kind and almost invisible — the photographs made our families cry happy tears.', name: 'Sample client', event: 'Wedding', rating: 5, verified: false, image: a.maroonEmbrace },
  { quote: 'Our pre-wedding shoot felt relaxed from start to finish. The photos feel so natural.', name: 'Sample client', event: 'Pre-wedding', rating: 5, verified: false, image: a.pastelTogether },
  { quote: 'They found the most beautiful light and made us feel completely at ease.', name: 'Sample client', event: 'Portrait session', rating: 5, verified: false, image: a.foreheadKiss },
];
export const testimonialsNote = 'Sample reviews — to be replaced with genuine client testimonials.';

// ---------- Instagram grid ----------
export const instagramGrid = [a.maroonWindow, a.blossomOne, a.windowLight2, a.pastelClose, a.maroonCurtain, a.blossomThree];

// ---------- FAQ ----------
export const faqs = [
  { group: 'Booking', q: 'How far in advance should we book?', a: 'Six to twelve months for weddings, especially November to February. Two to four weeks for portrait, maternity and newborn sessions.' },
  { group: 'Booking', q: 'How do we confirm a date?', a: 'Send an enquiry or WhatsApp us. We confirm availability, share a proposal, and lock the date once the advance is received.' },
  { group: 'Booking', q: 'Do you travel for destination weddings?', a: 'Yes — across India and abroad. Travel and stay are quoted separately.' },
  { group: 'Sessions', q: 'What should we wear?', a: 'We send a styling guide after booking. Soft solid colours plus one traditional outfit work beautifully.' },
  { group: 'Sessions', q: 'Is newborn photography safe?', a: 'Yes. Baby-led posing, a warm studio and sanitised props — never a pose that is not safe and comfortable.' },
  { group: 'Delivery', q: 'When will we receive our photographs?', a: 'Portraits in about three weeks; weddings in six to eight weeks, with a preview soon after.' },
  { group: 'Delivery', q: 'Do you provide albums?', a: 'Yes. Signature and Luxury include albums, and they can be added to any package.' },
  { group: 'Pricing', q: 'What are your prices?', a: 'It depends on the shoot, coverage and location. Send your details for a tailored quote.' },
];
