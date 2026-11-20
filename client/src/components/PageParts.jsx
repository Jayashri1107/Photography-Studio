import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Quote, Star } from 'lucide-react';
import { Img, Reveal } from './Motion';
import { categories } from '../data/categories';
import { projects, reviews, reviewsNote } from '../data/content';
import { site } from '../data/site';
import { imgUrl } from '../lib/img';

const ease = [0.22, 1, 0.36, 1];

// ---------- Services: a numbered list with one photo that changes as you point at each line ----------
export function ServiceShowcase() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const c = categories[active];
  return (
    <>
      {/* Phones: swipeable cards */}
      <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 lg:hidden [scrollbar-width:none]">
        {categories.map((cat, i) => (
          <Link key={cat.slug} to={cat.path} className="group relative aspect-[3/4] w-[62%] shrink-0 snap-start overflow-hidden rounded-xl bg-cream sm:w-[38%]">
            <Img image={cat.card} sizes="(min-width:640px) 38vw, 62vw" width={700} />
            <span className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-4">
              <span className="font-serif text-sm text-butter">0{i + 1}</span>
              <span className="block font-serif text-2xl leading-tight text-warm">{cat.short}</span>
              <span className="mt-1 block text-xs text-warm/80">{cat.description}</span>
            </span>
          </Link>
        ))}
      </div>

      {/* Desktop: list on the left, photo on the right */}
      <div className="hidden items-center gap-14 lg:grid lg:grid-cols-12">
        <ul className="lg:col-span-7">
          {categories.map((cat, i) => {
            const on = i === active;
            return (
              <li key={cat.slug} className="border-b border-charcoal/10 first:border-t">
                <Link
                  to={cat.path}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-center gap-6 py-4"
                >
                  <span className={`w-10 font-serif text-lg transition-colors duration-300 ${on ? 'text-olive' : 'text-charcoal/35'}`}>0{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className={`block font-serif text-[2rem] leading-tight transition-all duration-500 ease-lux ${on ? 'translate-x-2 text-olive' : 'text-charcoal'}`}>{cat.short}</span>
                    <span className={`block overflow-hidden text-sm text-charcoal-soft transition-all duration-500 ease-lux ${on ? 'max-h-8 translate-x-2 opacity-100' : 'max-h-0 opacity-0'}`}>{cat.description}</span>
                  </span>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-lux ${on ? 'rotate-45 border-olive bg-olive text-warm' : 'border-charcoal/15 text-charcoal'}`}>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] max-h-[560px] overflow-hidden rounded-soft bg-cream shadow-[0_40px_80px_-40px_rgba(65,68,61,0.55)]">
            <AnimatePresence initial={false}>
              <motion.div
                key={c.slug}
                className="absolute inset-0"
                initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0%)' }}
                animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.8, ease }}
              >
                <motion.div className="h-full w-full" initial={reduce ? false : { scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease }}>
                  <Img image={c.card} sizes="40vw" eager />
                </motion.div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/75 to-transparent p-6">
              <p className="text-[0.65rem] font-semibold uppercase tracking-label text-butter">{c.title}</p>
              <p className="mt-1 font-serif text-2xl text-warm">{c.tagline}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ---------- A short "reel": plays the studio's video when there is one, otherwise a moving photo slideshow ----------
export function Reel({ images, className = '' }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const SLIDE = 3600;
  useEffect(() => {
    if (site.video || reduce) return;
    images.forEach((im) => { const p = new Image(); p.referrerPolicy = 'no-referrer'; p.src = imgUrl(im, 900); });
    const id = setInterval(() => setI((v) => (v + 1) % images.length), SLIDE);
    return () => clearInterval(id);
  }, [images, reduce]);
  if (site.video) {
    return (
      <div className={`relative overflow-hidden rounded-soft bg-charcoal ${className}`}>
        <video src={site.video} poster={imgUrl(images[0], 900)} autoPlay muted loop playsInline className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden rounded-soft bg-charcoal ${className}`} aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1 }}>
          <motion.div className="h-full w-full" initial={reduce ? false : { scale: 1.18, x: i % 2 ? '3%' : '-3%' }} animate={{ scale: 1.02, x: '0%' }} transition={{ duration: SLIDE / 1000 + 1.2, ease: 'linear' }}>
            <Img image={images[i]} sizes="(min-width:1024px) 40vw, 100vw" width={900} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/50" />
      {/* story-style progress bars */}
      <div className="absolute inset-x-4 top-4 flex gap-1.5">
        {images.map((_, k) => (
          <span key={k} className="h-[3px] flex-1 overflow-hidden rounded-full bg-warm/30">
            {k === i && <motion.span key={i} className="block h-full origin-left bg-warm" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduce ? 0 : SLIDE / 1000, ease: 'linear' }} />}
            {k < i && <span className="block h-full bg-warm" />}
          </span>
        ))}
      </div>
      <div className="absolute bottom-4 left-4 flex items-center gap-2.5">
        <span className="h-8 w-8 overflow-hidden rounded-full border-2 border-warm"><img src={site.logo} alt="" className="h-full w-full scale-[1.16] object-cover" /></span>
        <span className="text-sm font-semibold text-warm">{site.instagramHandle}</span>
      </div>
    </div>
  );
}

// ---------- Reviews: two rows of cards sliding past ----------
function Stars({ n }) {
  return (
    <span className="flex gap-0.5 text-[#C9A13B]" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, k) => (
        <motion.span key={k} initial={{ scale: 0, rotate: -45 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.1 + k * 0.08 }}>
          <Star size={14} fill={k < n ? 'currentColor' : 'none'} aria-hidden="true" />
        </motion.span>
      ))}
    </span>
  );
}

function ReviewCard({ r }) {
  const initials = r.name.split(/\s|&/).filter(Boolean).map((w) => w[0]).slice(0, 2).join('');
  return (
    <figure className="relative w-[290px] shrink-0 rounded-2xl border border-charcoal/8 bg-warm p-5 shadow-[0_20px_40px_-30px_rgba(65,68,61,0.45)] transition-transform duration-500 hover:-translate-y-1 sm:w-[340px] sm:p-6">
      <Quote size={26} className="absolute right-5 top-5 text-olive/15" aria-hidden="true" />
      <Stars n={r.rating} />
      <blockquote className="mt-3 text-[0.95rem] leading-relaxed text-charcoal">“{r.text}”</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-sage font-serif text-lg text-olive">{initials}</span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold">{r.name}</span>
          <span className="block text-xs text-charcoal-soft">{r.event}</span>
        </span>
        {r.sample && <span className="ml-auto rounded-full bg-butter px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-label text-olive">Sample</span>}
      </figcaption>
    </figure>
  );
}

function ReviewRow({ items, reverse, duration }) {
  return (
    <div className="marquee overflow-hidden py-2">
      <div className={`marquee-track flex w-max gap-3 ${reverse ? 'marquee-reverse' : ''}`} style={{ animationDuration: `${duration}s` }}>
        {[...items, ...items].map((r, k) => (
          <div key={k} aria-hidden={k >= items.length}><ReviewCard r={r} /></div>
        ))}
      </div>
    </div>
  );
}

export function Reviews({ className = '' }) {
  const half = Math.ceil(reviews.length / 2);
  return (
    <section className={`section overflow-hidden bg-cream/70 ${className}`}>
      <div className="container-lux mb-8 text-center sm:mb-10">
        <Reveal><p className="eyebrow">Reviews</p></Reveal>
        <Reveal delay={0.05}><h2 className="mt-3 font-serif text-[2.1rem] sm:text-5xl">Kind Words From Our Couples.</h2></Reveal>
        <Reveal delay={0.1}><p className="mt-3 text-xs text-charcoal-soft">{reviewsNote}</p></Reveal>
      </div>
      <div className="space-y-2">
        <ReviewRow items={reviews.slice(0, half)} duration={60} />
        <ReviewRow items={reviews.slice(half)} reverse duration={70} />
      </div>
    </section>
  );
}

// ---------- Featured shoots as three small cards ----------
export function StoryCards({ items = projects }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
      {items.map((p, i) => (
        <Reveal key={p.slug} delay={i * 0.1}>
          <Link to={`/stories/${p.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-cream">
              <Img image={p.cover} className="img-zoom" sizes="(min-width:640px) 30vw, 100vw" width={700} />
              <span className="absolute left-3 top-3 rounded-full bg-warm/90 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-label text-olive">{p.category}</span>
            </div>
            <h3 className="mt-3 font-serif text-2xl transition-colors group-hover:text-olive">{p.title}</h3>
            <p className="mt-1 flex items-center gap-2 text-sm text-charcoal-soft">{p.summary}</p>
            <span className="link-underline mt-2 text-sm">View story <ArrowRight size={14} aria-hidden="true" /></span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
