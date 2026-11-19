// Studio details. Leave a value empty ('') to hide it on the site.
const wa = import.meta.env.VITE_WHATSAPP_NUMBER || '917038096447';

export const site = {
  name: 'Rupak Camatography',
  logo: '/logo.png',
  tagline: 'Every Frame Tells Your Story.',
  intro: 'Timeless wedding and portrait photography, made with warmth.',
  phones: [
    { label: '70380 96447', href: 'tel:+917038096447' },
    { label: '95612 20713', href: 'tel:+919561220713' },
  ],
  email: '', // waiting for the full address from the studio
  address: 'Mahadev Mandir, Bajajnagar, Chhatrapati Sambhajinagar',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mahadev+Mandir+Bajajnagar+Chhatrapati+Sambhajinagar',
  hours: '',
  instagram: 'https://www.instagram.com/rupak_camatography/?hl=en',
  instagramHandle: '@rupak_camatography',
  facebook: '', // the studio has no Facebook page; the icon stays hidden while this is empty
};

export function whatsappLink(message = `Hello ${site.name}, I would like to enquire about a photoshoot.`) {
  return `https://wa.me/${wa}?text=${encodeURIComponent(message)}`;
}

export const mainNav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];
