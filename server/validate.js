// Server-side checks for a booking enquiry (mirrors the website form).
export const CATEGORIES = ['wedding', 'pre-wedding', 'portrait', 'maternity', 'newborn', 'events', 'fashion'];
export const PACKAGES = ['', 'Essential', 'Signature', 'Luxury'];

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export function cleanEnquiry(body = {}) {
  return {
    name: str(body.name, 120),
    phone: str(body.phone, 20),
    email: str(body.email, 160).toLowerCase(),
    category: str(body.category, 40),
    date: str(body.date, 10),
    location: str(body.location, 160),
    package: str(body.package, 20),
    message: typeof body.message === 'string' ? body.message.trim() : '',
    website: str(body.website, 200), // honeypot
  };
}

export function validateEnquiry(v) {
  const e = {};
  if (v.name.length < 2) e.name = 'Please enter your full name.';
  if (!/^(\+?91)?[6-9]\d{9}$/.test(v.phone.replace(/[\s()-]/g, ''))) e.phone = 'Please enter a valid 10-digit Indian mobile number.';
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = 'Please enter a valid email address.';
  if (!CATEGORIES.includes(v.category)) e.category = 'Please choose a photography category.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v.date) || Number.isNaN(Date.parse(v.date))) e.date = 'Please choose a preferred date.';
  else {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    // allow one day of slack for time zones
    if (new Date(`${v.date}T00:00:00Z`) < new Date(today.getTime() - 86400000)) e.date = 'Please choose a date in the future.';
  }
  if (v.location.length < 2) e.location = 'Please tell us the city or venue.';
  if (!PACKAGES.includes(v.package)) e.package = 'Please choose a valid package.';
  if (v.message.length > 1500) e.message = 'Please keep the message under 1500 characters.';
  return e;
}
