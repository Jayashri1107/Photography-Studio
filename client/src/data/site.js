// Studio details — replace the placeholders when the business provides them.
const wa = import.meta.env.VITE_WHATSAPP_NUMBER;

export const site = {
  name: 'Photography Studio',
  tagline: 'Every Frame Tells Your Story.',
  intro:
    'An Indian photography studio crafting timeless, editorial imagery for weddings, families and brands — with warmth, patience and an eye for the quiet moments.',
  phone: '+91 00000 00000',
  phoneHref: 'tel:+910000000000',
  email: 'hello@yourstudio.com',
  address: 'Studio address, Area, City, State – PIN',
  hours: 'Mon – Sat, 10:00 am – 7:00 pm',
  instagram: 'https://www.instagram.com/',
  instagramHandle: '@yourstudio',
  facebook: 'https://www.facebook.com/',
  placeholderNote: 'Contact details shown are placeholders until the studio provides them.',
};

export function whatsappLink(message = 'Hello Photography Studio, I would like to enquire about a photoshoot.') {
  const text = encodeURIComponent(message);
  return wa ? `https://wa.me/${wa}?text=${text}` : `https://wa.me/?text=${text}`;
}

export const mainNav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];
