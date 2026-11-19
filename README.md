# Photography Studio — website

A multi-page, premium photography studio website.

- **client/** — React 18 + Vite, Tailwind CSS, Framer Motion, GSAP ScrollTrigger, React Router, Lucide icons
- **server/** — Node + Express API that stores booking enquiries in MongoDB

## Run it on this computer

1. Make sure MongoDB is running (Windows service `MongoDB`).
2. Install once: `npm run install:all`
3. Copy `server/.env.example` to `server/.env` (and optionally `client/.env.example` to `client/.env`).
4. In two terminals:
   - `npm run dev:server` → API on http://localhost:5050
   - `npm run dev:client` → website on http://localhost:5601

Production: `npm run build`, then `npm start` — the API also serves the built website from `client/dist`.

## Pages

Home · About · Portfolio · 7 photography pages (wedding, pre-wedding, portrait, maternity, baby & newborn,
birthday & events, fashion & commercial) · Services & Packages · Contact / Book a Shoot · FAQ · project stories
(`/stories/:slug`) · 404.

## Where to change content

| What | File |
| --- | --- |
| Studio name, phone, email, address, Instagram, Facebook | `client/src/data/site.js` |
| WhatsApp number | `VITE_WHATSAPP_NUMBER` in `client/.env` |
| All photos (one library) | `client/src/data/images.js` |
| Photography categories and their page text | `client/src/data/categories.js` |
| Featured stories, packages, testimonials, FAQ, Instagram grid | `client/src/data/content.js` |
| Colours and fonts | `client/tailwind.config.js` |

### Placeholders still to replace

- Phone, email, address, social links — placeholders in `site.js`.
- Package prices — shown as "Price on request" until the studio provides them.
- Testimonials — clearly marked sample reviews; star ratings only appear when `verified: true`.
- Featured story names and the About-page story are sample text.
- Photos are free Unsplash images (Unsplash licence) used as stand-ins. Replace with the studio's own work
  (or add a `cloudinary` public id per image and set `VITE_CLOUDINARY_CLOUD_NAME`).
- Instagram grid links to the profile; a live feed needs Instagram API credentials.

## Booking enquiries

`POST /api/enquiries` validates the form on the server too, rate-limits (10 per 15 min per connection), has a
spam honeypot, and saves to the `enquiries` collection. The form only shows success after the server confirms
the save. There is deliberately no public endpoint to list enquiries — add a login-protected admin view before
exposing them.
