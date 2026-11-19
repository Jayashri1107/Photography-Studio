import { images as im } from './images';
import { categories } from './categories';

// ---------- Portfolio (masonry gallery) ----------
// Built from each category's gallery so new photos only need adding in one place.
const projectNames = {
  wedding: ['Ananya & Rohan', 'Meera & Kabir', 'Isha & Arjun'],
  'pre-wedding': ['Udaipur Mornings', 'Lakeside Promise', 'Goa Golden Hour'],
  portrait: ['Quiet Strength', 'Studio Light Series', 'Family Heirlooms'],
  maternity: ['Awaiting Aarav', 'Green Season', 'Soft Mornings'],
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

// Interleave categories so the "All" view feels curated rather than grouped.
export function interleaved(items) {
  const groups = categories.map((c) => items.filter((p) => p.category === c.slug));
  const out = [];
  const max = Math.max(...groups.map((g) => g.length));
  for (let i = 0; i < max; i++) groups.forEach((g) => g[i] && out.push(g[i]));
  return out;
}

// ---------- Featured projects / stories ----------
export const projects = [
  {
    slug: 'ananya-rohan-udaipur',
    title: 'Ananya & Rohan',
    category: 'Wedding',
    categorySlug: 'wedding',
    location: 'Udaipur, Rajasthan',
    cover: im.weddingRiver,
    summary: 'A three-day lakeside celebration of marigolds, music and two very large families.',
    story: [
      'Ananya and Rohan wanted their wedding to feel like a family reunion. Over three days we followed the haldi in the courtyard, a sangeet that went past midnight, and pheras at sunset by the water.',
      'We kept our footprint small, working with available light wherever possible so the rituals were never interrupted.',
    ],
    gallery: [im.weddingRitual, im.hennaHands, im.brideJewels, im.sherwaniKiss],
  },
  {
    slug: 'meera-kabir-goa',
    title: 'Meera & Kabir',
    category: 'Pre-Wedding',
    categorySlug: 'pre-wedding',
    location: 'Goa',
    cover: im.coupleBoat,
    summary: 'A slow golden-hour session on the backwaters, the week before their wedding.',
    story: [
      'Meera and Kabir chose the river where they first met. We timed the session to the last hour of light and let the boat drift.',
      'There was very little posing — mostly conversation, a borrowed dupatta, and a lot of laughing.',
    ],
    gallery: [im.coupleBoatClose, im.coupleSilhouette, im.coupleBeach],
  },
  {
    slug: 'awaiting-aarav',
    title: 'Awaiting Aarav',
    category: 'Maternity',
    categorySlug: 'maternity',
    location: 'Pune, Maharashtra',
    cover: im.maternityGreen,
    summary: 'A calm studio-and-garden session for a first-time mother at thirty-two weeks.',
    story: [
      'We began in the studio with soft window light and finished in the garden as the evening cooled.',
      'Six weeks later we welcomed Aarav back for his newborn session.',
    ],
    gallery: [im.maternityStudio, im.maternityMono, im.maternityHold],
  },
  {
    slug: 'festive-edit',
    title: 'The Festive Edit',
    category: 'Fashion',
    categorySlug: 'fashion',
    location: 'Jaipur, Rajasthan',
    cover: im.fashionSari,
    summary: 'A festive-season campaign for an independent handloom label.',
    story: [
      'The brief was heritage without nostalgia. We paired handwoven saris with open greens and clean architecture.',
      'The final set was delivered for print, web and social, sized and colour-matched for each.',
    ],
    gallery: [im.fashionGowns, im.fashionBlue, im.fashionRedGold],
  },
];

// ---------- Approach ----------
export const approach = [
  { icon: 'BookOpen', title: 'Creative Storytelling', text: 'We look for the narrative — the nervous laugh, the grandparent’s blessing — and build each gallery like a story with a beginning, middle and end.' },
  { icon: 'Camera', title: 'Professional Photography', text: 'Professional full-frame cameras, fast lenses and backup equipment at every shoot, so nothing important is ever missed.' },
  { icon: 'Gem', title: 'Attention to Every Detail', text: 'Jewellery, mehendi, décor and the light on a face — we notice the small things that make your day yours.' },
  { icon: 'Palette', title: 'Beautiful Photo Editing', text: 'Every image is hand-edited for true skin tones and soft, timeless colour that will not date.' },
];

// ---------- Packages (no prices until the studio provides them) ----------
export const packages = [
  {
    name: 'Essential',
    price: 'Price on request',
    ideal: 'Intimate ceremonies, portraits and short sessions',
    inclusions: ['One photographer', 'Up to 4 hours coverage', 'Hand-edited online gallery', 'Selection of high-resolution images', 'Delivery in 3 weeks'],
  },
  {
    name: 'Signature',
    price: 'Price on request',
    ideal: 'Full-day weddings and celebrations',
    featured: true,
    inclusions: ['Lead photographer + associate', 'Full-day coverage', 'Pre-event planning call', 'Hand-edited online gallery', 'Next-day preview set', 'Premium photo album'],
  },
  {
    name: 'Luxury',
    price: 'Price on request',
    ideal: 'Multi-day weddings and destination events',
    inclusions: ['Senior team of three', 'Multi-day coverage', 'Pre-wedding session', 'Cinematic highlight film (optional)', 'Two heirloom albums', 'Priority delivery'],
  },
];
export const packagesNote = 'Prices will be published once the studio confirms them. Every package can be tailored — ask us for a quote.';

// ---------- Testimonials (placeholders — replace with genuine reviews) ----------
// `verified: true` shows a star rating; only set it for reviews you can verify.
export const testimonials = [
  { quote: 'Sample review: they were calm, kind and almost invisible, and the photographs made our families cry happy tears.', name: 'Sample client', event: 'Wedding', rating: 5, verified: false, image: im.bridePosing },
  { quote: 'Sample review: our maternity session felt relaxed from start to finish. We love how natural the images feel.', name: 'Sample client', event: 'Maternity', rating: 5, verified: false, image: im.maternityGarden },
  { quote: 'Sample review: the team understood our brand immediately and delivered campaign images we still use every season.', name: 'Sample client', event: 'Fashion campaign', rating: 5, verified: false, image: im.fashionBrown },
];
export const testimonialsNote = 'Placeholder reviews shown until genuine client testimonials are added.';

// ---------- Instagram grid ----------
export const instagramGrid = [im.brideGold, im.coupleStairs, im.newbornCap, im.portraitElder, im.mehendiParty, im.fashionGreen];

// ---------- FAQ ----------
export const faqs = [
  { group: 'Booking', q: 'How far in advance should we book?', a: 'For weddings, six to twelve months ahead is ideal, especially during the wedding season (November to February). Portrait, maternity and newborn sessions can usually be booked two to four weeks ahead.' },
  { group: 'Booking', q: 'How do we confirm a date?', a: 'Send an enquiry through the booking form or WhatsApp. We will check availability, share a proposal, and confirm your date once the agreement is signed and the advance is received.' },
  { group: 'Booking', q: 'Do you travel for destination weddings?', a: 'Yes. We photograph across India and abroad. Travel and stay are quoted separately and kept transparent.' },
  { group: 'Sessions', q: 'What should we wear for a pre-wedding or portrait shoot?', a: 'We share a styling guide after booking. Solid, soft colours and one traditional outfit usually work beautifully. We are happy to review options with you.' },
  { group: 'Sessions', q: 'Is newborn photography safe?', a: 'Safety comes first. We follow baby-led posing, keep the studio warm, sanitise props between sessions, and never attempt a pose that is not safe and comfortable.' },
  { group: 'Sessions', q: 'When is the best time for a maternity shoot?', a: 'Between 28 and 34 weeks of pregnancy is usually most comfortable, but we will plan around how you feel.' },
  { group: 'Delivery', q: 'When will we receive our photographs?', a: 'Portrait and family sessions are delivered within about three weeks; weddings within six to eight weeks, with a preview set shortly after the event.' },
  { group: 'Delivery', q: 'Do you provide albums?', a: 'Yes. Signature and Luxury packages include albums, and albums can be added to any package.' },
  { group: 'Pricing', q: 'What are your prices?', a: 'Pricing depends on the type of shoot, coverage and location. Send us your details and we will share a tailored quote.' },
];
