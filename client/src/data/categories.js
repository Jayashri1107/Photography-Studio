import { images as im } from './images';

// Every photography category page is built from one entry here.
export const categories = [
  {
    slug: 'wedding',
    path: '/wedding-photography',
    title: 'Wedding Photography',
    short: 'Wedding',
    tagline: 'Rituals, laughter and the glances in between.',
    description:
      'From the haldi to the vidaai, we document every ritual of your Indian wedding with quiet presence and an editorial eye.',
    seo: 'Luxury Indian wedding photography — candid, traditional and editorial coverage of every ritual, from haldi and mehendi to pheras and vidaai.',
    cover: im.weddingCanopy,
    card: im.weddingRiver,
    intro: [
      'An Indian wedding is many days of colour, emotion and family. We plan alongside you so that each ceremony is covered without interrupting a single moment.',
      'Our approach blends candid storytelling with a few unhurried, beautifully composed portraits — the images your family will return to for generations.',
    ],
    highlights: ['Haldi, mehendi and sangeet', 'Baraat and pheras', 'Couple portraits', 'Family and group portraits', 'Reception and vidaai', 'Heirloom albums'],
    gallery: [im.weddingRitual, im.brideRed, im.hennaHands, im.sherwaniKiss, im.brideJewels, im.weddingFlorals, im.bridePosing, im.ringHands, im.brideGold],
  },
  {
    slug: 'pre-wedding',
    path: '/pre-wedding-photography',
    title: 'Pre-Wedding Photography',
    short: 'Pre-Wedding',
    tagline: 'Your story, before the wedding begins.',
    description:
      'Relaxed, cinematic couple sessions at locations that mean something to you — the start of your wedding story.',
    seo: 'Pre-wedding photoshoots in India — cinematic couple sessions at meaningful locations, styled and directed with warmth.',
    cover: im.coupleBeach,
    card: im.coupleSmile,
    intro: [
      'A pre-wedding shoot is a chance to be yourselves in front of the camera before the big day. We help with location, styling and timing so the light works for you.',
      'Many couples tell us it also makes the wedding day easier — you already know how we work.',
    ],
    highlights: ['Location scouting', 'Outfit and styling guidance', 'Golden-hour sessions', 'Save-the-date edits', 'Gentle, natural direction', 'Film-inspired colour'],
    gallery: [im.coupleSilhouette, im.coupleOutdoors, im.coupleStairs, im.coupleBeach, im.coupleWoods, im.coupleBoatClose],
  },
  {
    slug: 'portrait',
    path: '/portrait-photography',
    title: 'Portrait Photography',
    short: 'Portrait',
    tagline: 'Character, light and quiet confidence.',
    description:
      'Personal, family and professional portraits made with patience — in our studio or at a place you love.',
    seo: 'Portrait photography in India — personal, family and professional headshots with natural light and thoughtful direction.',
    cover: im.portraitRedWall,
    card: im.portraitScarf,
    intro: [
      'A good portrait feels like you on your best day. We take time to talk, to find the right light and to let you settle in.',
      'Sessions suit individuals, families, artists and professionals who need images with presence.',
    ],
    highlights: ['Personal portraits', 'Family portraits', 'Professional headshots', 'Artist and author portraits', 'Studio or on location', 'Retouching with restraint'],
    gallery: [im.portraitTurban, im.portraitElder, im.portraitRedWall, im.portraitMan, im.portraitScarf],
  },
  {
    slug: 'maternity',
    path: '/maternity-photography',
    title: 'Maternity Photography',
    short: 'Maternity',
    tagline: 'Celebrating the season of waiting.',
    description:
      'Graceful maternity portraits that honour the anticipation, tenderness and strength of motherhood.',
    seo: 'Maternity photography in India — graceful, comfortable studio and outdoor sessions celebrating motherhood.',
    cover: im.maternityGreen,
    card: im.maternityLace,
    intro: [
      'We keep maternity sessions calm and comfortable, with breaks whenever you need them and gowns available on request.',
      'Partners and older siblings are always welcome — these are family photographs as much as portraits.',
    ],
    highlights: ['Best between 28 and 34 weeks', 'Studio or outdoor', 'Gown wardrobe available', 'Partner and family frames', 'Soft, natural retouching', 'Private online gallery'],
    gallery: [im.maternityStudio, im.maternityHold, im.maternityMono, im.maternityGarden, im.maternityLace],
  },
  {
    slug: 'newborn',
    path: '/baby-newborn-photography',
    title: 'Baby & Newborn Photography',
    short: 'Newborn',
    tagline: 'Tiny fingers, sleepy smiles, fleeting days.',
    description:
      'Safe, gentle newborn and baby sessions that capture the details you will want to remember forever.',
    seo: 'Newborn and baby photography in India — safe, gentle sessions focused on comfort, hygiene and timeless images.',
    cover: im.newbornBlanket,
    card: im.newbornCap,
    intro: [
      'Baby’s comfort and safety come first. Sessions are unhurried, the studio is kept warm, and every prop is cleaned between families.',
      'We photograph newborns in the first weeks and return for sitter and first-birthday milestones.',
    ],
    highlights: ['Newborn (5–15 days)', 'Sitter milestone', 'First-year milestones', 'Parent and sibling frames', 'Hygiene-first studio', 'Baby-led pace'],
    gallery: [im.babyEyes, im.newbornBlanket, im.babyLooking, im.babyCurious, im.newbornCap],
  },
  {
    slug: 'events',
    path: '/birthday-event-photography',
    title: 'Birthday & Event Photography',
    short: 'Events',
    tagline: 'The joy of the gathering, kept.',
    description:
      'Birthdays, naming ceremonies, anniversaries and family celebrations — documented candidly and beautifully.',
    seo: 'Birthday and event photography in India — candid coverage of birthdays, naming ceremonies, anniversaries and family celebrations.',
    cover: im.haldiCrowd,
    card: im.birthdayCake,
    intro: [
      'Celebrations move fast. We move quietly with them, catching the laughter, the décor, the elders’ blessings and the cake moment.',
      'Coverage can be a couple of hours or the full day, with a quick preview set the next morning.',
    ],
    highlights: ['Birthdays and first birthdays', 'Naming ceremonies', 'Anniversaries', 'Mehendi and haldi functions', 'Décor and detail shots', 'Next-day preview'],
    gallery: [im.mehendiParty, im.birthdayGirl, im.canopyCelebration, im.balloonCake, im.birthdayCake],
  },
  {
    slug: 'fashion',
    path: '/fashion-commercial-photography',
    title: 'Fashion & Commercial Photography',
    short: 'Fashion',
    tagline: 'Images that sell, with soul.',
    description:
      'Lookbooks, campaigns, designer collections and brand imagery crafted with a refined editorial sensibility.',
    seo: 'Fashion and commercial photography in India — lookbooks, campaigns, designer collections and brand imagery.',
    cover: im.fashionGowns,
    card: im.fashionSari,
    intro: [
      'We work with designers, labels and businesses to create images that feel premium and stay true to the brand.',
      'From mood board to final delivery, we plan crew, location and styling so the shoot day runs smoothly.',
    ],
    highlights: ['Lookbooks and catalogues', 'Designer collections', 'Campaign imagery', 'E-commerce sets', 'Brand and team portraits', 'Usage-ready delivery'],
    gallery: [im.fashionBlue, im.fashionBrown, im.fashionRedGold, im.fashionGreen, im.fashionSari],
  },
];

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
